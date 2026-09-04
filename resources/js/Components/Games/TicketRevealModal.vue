<script setup lang="ts">
import { computed } from 'vue';
import { usePage } from '@inertiajs/vue3';

interface Ticket {
    number?: number;
    id: number;
    instant_win?: { prize: string; value?: number; prize_type?: string };
}

interface Props {
    demoMode?: boolean;
    modelValue: boolean;
    tickets: Ticket[];
    playedTickets: number[];
}

const props = defineProps<Props>();
const emit = defineEmits<{
    'update:modelValue': [value: boolean];
}>();

const page = usePage();
const currentTenant = computed(() => (page.props.currentTenant as string) || '');
const totalWinners = computed(() => ticketsWithStatus.value.filter(t => t.isWinner));

const close = (): void => {
    emit('update:modelValue', false);
};

const onEsc = (e: KeyboardEvent): void => {
    if (e.key === 'Escape') {
        close();
    }
};

const ticketsWithStatus = computed(() => {
    return props.tickets.map((ticket) => {
        const ticketId = ticket.id;
        const isPlayed = props.playedTickets.includes(ticketId);
        const isWinner = Boolean(ticket.instant_win && ticket.instant_win.prize);

        return {
            ...ticket,
            ticketId,
            isPlayed,
            isWinner,
            prize: ticket.instant_win?.prize || null,
        };
    });
});

const unplayedTickets = computed(() => {
    const tickets = ticketsWithStatus.value.filter((t) => !t.isPlayed);
    return [...tickets].sort((a, b) => (b.isWinner ? 1 : 0) - (a.isWinner ? 1 : 0));
});
const playedWinners = computed(() => ticketsWithStatus.value.filter((t) => t.isPlayed && t.isWinner));
const playedLosers = computed(() => ticketsWithStatus.value.filter((t) => t.isPlayed && !t.isWinner));

const resolvePrizeValue = (prize: string | null | undefined, value: number | undefined): number => {
    // value field is the source of truth — coerce to number in case it's a string
    const numeric = parseFloat(String(value));
    if (!isNaN(numeric) && numeric > 0) return numeric;
    // fallback: try to parse £ from prize string
    if (!prize) return 0;
    const match = prize.match(/£([\d,.]+)/);
    return match ? parseFloat(match[1].replace(',', '')) : 0;
};

const totalWinValue = computed(() => {
    const total = ticketsWithStatus.value.reduce((sum, t) => {
        if (!t.isWinner) return sum;
        if (t.instant_win?.prize_type === 'ticket_bundle') return sum;
        return sum + resolvePrizeValue(t.instant_win?.prize, t.instant_win?.value);
    }, 0);
    return isNaN(total) ? 0 : total;
});
</script>

<template>
    <Teleport to="body" :disabled="props.demoMode">
        <transition name="fade">
            <div v-if="modelValue" class="fixed inset-0 z-[9999] bg-black/90 flex items-center justify-center p-4"
                @click.self="close" @keydown="onEsc" tabindex="0">
            <div class="bg-gray-900 rounded-xl shadow-2xl max-w-4xl w-full max-h-[90vh] overflow-hidden" @click.stop>
                <div class="bg-primary p-6 flex justify-between items-center">
                    <div>
                        <h2 class="text-2xl font-bold text-white">All Your Tickets</h2>
                        <p class="text-white/80 mt-1">{{ tickets.length }} total tickets</p>
                    </div>
                    <div class="flex items-center gap-4">
                        <div v-if="totalWinners.length > 0" class="text-right">
                            <div class="text-white/70 text-xs uppercase tracking-wide">Total Won</div>
                            <div class="text-yellow-300 font-bold text-xl">£{{ Number(totalWinValue).toFixed(2) }}</div>
                        </div>
                        <UiButton @click="close" class="text-white/80 hover:text-white text-3xl font-bold transition-colors"
                            aria-label="Close modal"> ✕ </UiButton>
                    </div>
                </div>

                <div class="p-6 overflow-y-auto max-h-[calc(90vh-120px)]">
                    <div v-if="unplayedTickets.length > 0" class="mb-8">
                        <h3 class="text-xl font-semibold text-white mb-4 flex items-center">
                            <span class="w-3 h-3 bg-blue-500 rounded-full mr-2"></span>
                            Available Tickets ({{ unplayedTickets.length }})
                        </h3>
                        <div class="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4">
                            <div v-for="ticket in unplayedTickets" :key="ticket.ticketId"
                                class="bg-primary rounded-lg p-4 text-center shadow-lg hover:shadow-xl transition-shadow duration-200">
                                <div class="text-white font-bold text-lg mb-1">#{{ ticket.number || ticket.ticketId }}
                                </div>
                                <div v-if="currentTenant !== 'madmac'" class="text-white/70 text-sm">Ready to spin</div>
                                <div v-if="ticket.isWinner" class="mt-2 text-xs text-yellow-300 font-medium">
                                    🎁 
                                    <template v-if="ticket.instant_win?.prize_type === 'ticket_bundle'">
                                        {{ Math.floor(ticket.instant_win?.value || 0) }} Free Ticket{{ (ticket.instant_win?.value || 0) !== 1 ? 's' : '' }}
                                    </template>
                                    <template v-else>{{ ticket.prize }}</template>
                                </div>
                            </div>
                        </div>
                    </div>

                    <div v-if="playedWinners.length > 0" class="mb-8">
                        <h3 class="text-xl font-semibold text-white mb-4 flex items-center">
                            <span class="w-3 h-3 bg-green-500 rounded-full mr-2"></span>
                            Winners ({{ playedWinners.length }})
                        </h3>
                        <div class="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4">
                            <div v-for="ticket in playedWinners" :key="ticket.ticketId"
                                class="bg-green-600 rounded-lg p-4 text-center shadow-lg border-2 border-green-400">
                                <div class="text-white font-bold text-lg mb-1">#{{ ticket.number || ticket.ticketId }}
                                </div>
                                <div class="text-white/90 text-sm mb-2">🏆 WINNER</div>
                                <div class="text-yellow-200 text-xs font-medium">
                                    {{ ticket.prize }}
                                </div>
                            </div>
                        </div>
                    </div>

                    <div v-if="playedLosers.length > 0" class="mb-4">
                        <h3 class="text-xl font-semibold text-white mb-4 flex items-center">
                            <span class="w-3 h-3 bg-gray-500 rounded-full mr-2"></span>
                            Used Tickets ({{ playedLosers.length }})
                        </h3>
                        <div class="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4">
                            <div v-for="ticket in playedLosers" :key="ticket.ticketId"
                                class="bg-secondary rounded-lg p-4 text-center shadow-lg opacity-75">
                                <div class="text-white font-bold text-lg mb-1">#{{ ticket.number || ticket.ticketId }}
                                </div>
                                <div class="text-white/70 text-sm">No prize</div>
                            </div>
                        </div>
                    </div>

                    <div v-if="tickets.length === 0" class="text-center py-12">
                        <div class="text-6xl mb-4">🎫</div>
                        <h3 class="text-xl font-semibold text-white mb-2">No Tickets Available</h3>
                        <p class="text-white/70">You don't have any tickets to reveal.</p>
                    </div>
                </div>

                <div class="bg-gray-800 px-6 py-4 flex justify-between items-center">
                    <div class="text-white/70 text-sm">{{ unplayedTickets.length }} remaining • {{ playedWinners.length
                    }} won • {{ playedLosers.length }} used</div>
                    <UiButton @click="close"
                        class="bg-primary hover:bg-primary/80 text-white px-6 py-2 rounded-lg font-medium transition-colors">
                        Close </UiButton>
                </div>
            </div>
            </div>
        </transition>
    </Teleport>
</template>

<style scoped>
.fade-enter-active,
.fade-leave-active {
    transition: opacity 0.3s ease;
}

.fade-enter-from,
.fade-leave-to {
    opacity: 0;
}

.overflow-y-auto::-webkit-scrollbar {
    width: 8px;
}

.overflow-y-auto::-webkit-scrollbar-track {
    background: #374151;
    border-radius: 4px;
}

.overflow-y-auto::-webkit-scrollbar-thumb {
    background: #6b7280;
    border-radius: 4px;
}

.overflow-y-auto::-webkit-scrollbar-thumb:hover {
    background: #9ca3af;
}
</style>
