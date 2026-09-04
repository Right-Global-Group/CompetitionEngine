<script setup lang="ts">
import { onMounted, onUnmounted, watch, ref, computed, reactive } from 'vue';
import BingoGame from './BingoGame.vue';

interface PatternRule {
    from: number;
    to: number;
    pattern: number;
}

interface Assets {
    background?: string;
    header?: string;
    cardCover?: string;
    diamondEmoji?: string;
    // Theme colors
    bgStart?: string;
    bgEnd?: string;
    frameColor?: string;
    frameGlow?: string;
    squareBg?: string;
    squareText?: string;
    diamond1?: string;
    diamond2?: string;
    winnerGlow?: string;
    winnerBg?: string;
    popupStart?: string;
    popupEnd?: string;
    // Sounds
    revealSound?: string;
    winSound?: string;
    lossSound?: string;
    // Pattern rules
    patternRules?: PatternRule[];
}

interface InstantWin {
    id: number;
    name: string;
    prize: string;
    value: number;
    claimed: boolean;
    image_path: string | null;
    won_date: string | null;
    category_id: number;
}

interface Ticket {
    id: number;
    number: string;
    competition_id: number;
    instant_win: InstantWin | false;
}

interface InstantWinCategory {
    id: number;
    name: string;
    image_path: string;
    value: number;
    no_auto_credit?: boolean;
}

interface Prize {
    id: number;
    name: string;
    image: string;
    value: number;
    no_auto_credit?: boolean;
}

interface Props {
    modelValue: boolean;
    demoMode?: boolean;
    assets: Assets;
    tickets?: Ticket[];
    previewMode?: 'mobile' | 'desktop';
    instant_win_categories?: InstantWinCategory[];
}

const props = withDefaults(defineProps<Props>(), {
    demoMode: false,
    previewMode: 'mobile',
});

const emit = defineEmits<{
    'update:modelValue': [value: boolean];
}>();

const demoPreviewMode = ref<'mobile' | 'desktop'>('mobile');
const playedTickets = ref<number[]>([]);

// Reactive bingo assets for watchers
const bingoAssets = reactive({
    background: props.assets.background || '',
    header: props.assets.header || '',
    cardCover: props.assets.cardCover || '',
    diamondEmoji: props.assets.diamondEmoji || '💎',
    bgStart: props.assets.bgStart || '#1e3a8a',
    bgEnd: props.assets.bgEnd || '#1e40af',
    frameColor: props.assets.frameColor || '#3b82f6',
    frameGlow: props.assets.frameGlow || '#60a5fa',
    squareBg: props.assets.squareBg || '#374151',
    squareText: props.assets.squareText || '#e5e7eb',
    diamond1: props.assets.diamond1 || '#06b6d4',
    diamond2: props.assets.diamond2 || '#67e8f9',
    winnerGlow: props.assets.winnerGlow || '#10b981',
    winnerBg: props.assets.winnerBg || '#059669',
    popupStart: props.assets.popupStart || '#10b981',
    popupEnd: props.assets.popupEnd || '#059669',
    revealSound: props.assets.revealSound || '',
    winSound: props.assets.winSound || '',
    lossSound: props.assets.lossSound || '',
    patternRules: props.assets.patternRules || [],
});

const isMobileDevice = computed(() => {
    if (typeof window === 'undefined') {
        return false;
    }
    return window.innerWidth < 768;
});

const actualPreviewMode = computed(() => {
    return props.demoMode ? demoPreviewMode.value : props.previewMode || (isMobileDevice.value ? 'mobile' : 'desktop');
});

const modalStyle = computed(() => {
    if (!props.demoMode) {
        return { width: '100vw', height: '100vh' };
    }

    return actualPreviewMode.value === 'mobile'
        ? {
              width: '420px',
              height: '650px',
              border: '1px solid #444',
              borderRadius: '12px',
          }
        : {
              width: '700px',
              height: '650px',
              border: '1px solid #444',
              borderRadius: '4px',
          };
});

const containerClasses = computed(() => {
    return ['relative', props.demoMode ? 'shadow-lg overflow-hidden' : 'w-full h-full overflow-hidden'];
});

// Map instant win categories to prizes
const prizes = computed<Prize[]>(() => {
    if (!props.instant_win_categories || props.instant_win_categories.length === 0) {
        return [];
    }

    return props.instant_win_categories.map(category => ({
        id: category.id,
        name: category.name,
        image: category.image_path,
        value: category.value,
        no_auto_credit: category.no_auto_credit,
    }));
});

// Get available tickets
const availableTickets = computed(() => {
    if (props.demoMode || !props.tickets) {
        return [];
    }
    return props.tickets.filter(ticket => !playedTickets.value.includes(ticket.id));
});

// Watch for asset changes
watch(() => props.assets.background, (newVal) => { bingoAssets.background = newVal || ''; }, { immediate: true });
watch(() => props.assets.header, (newVal) => { bingoAssets.header = newVal || ''; }, { immediate: true });
watch(() => props.assets.cardCover, (newVal) => { bingoAssets.cardCover = newVal || ''; }, { immediate: true });
watch(() => props.assets.diamondEmoji, (newVal) => { bingoAssets.diamondEmoji = newVal || '💎'; }, { immediate: true });
watch(() => props.assets.bgStart, (newVal) => { bingoAssets.bgStart = newVal || '#1e3a8a'; }, { immediate: true });
watch(() => props.assets.bgEnd, (newVal) => { bingoAssets.bgEnd = newVal || '#1e40af'; }, { immediate: true });
watch(() => props.assets.frameColor, (newVal) => { bingoAssets.frameColor = newVal || '#3b82f6'; }, { immediate: true });
watch(() => props.assets.frameGlow, (newVal) => { bingoAssets.frameGlow = newVal || '#60a5fa'; }, { immediate: true });
watch(() => props.assets.squareBg, (newVal) => { bingoAssets.squareBg = newVal || '#374151'; }, { immediate: true });
watch(() => props.assets.squareText, (newVal) => { bingoAssets.squareText = newVal || '#e5e7eb'; }, { immediate: true });
watch(() => props.assets.diamond1, (newVal) => { bingoAssets.diamond1 = newVal || '#06b6d4'; }, { immediate: true });
watch(() => props.assets.diamond2, (newVal) => { bingoAssets.diamond2 = newVal || '#67e8f9'; }, { immediate: true });
watch(() => props.assets.winnerGlow, (newVal) => { bingoAssets.winnerGlow = newVal || '#10b981'; }, { immediate: true });
watch(() => props.assets.winnerBg, (newVal) => { bingoAssets.winnerBg = newVal || '#059669'; }, { immediate: true });
watch(() => props.assets.popupStart, (newVal) => { bingoAssets.popupStart = newVal || '#10b981'; }, { immediate: true });
watch(() => props.assets.popupEnd, (newVal) => { bingoAssets.popupEnd = newVal || '#059669'; }, { immediate: true });
watch(() => props.assets.revealSound, (newVal) => { bingoAssets.revealSound = newVal || ''; }, { immediate: true });
watch(() => props.assets.winSound, (newVal) => { bingoAssets.winSound = newVal || ''; }, { immediate: true });
watch(() => props.assets.lossSound, (newVal) => { bingoAssets.lossSound = newVal || ''; }, { immediate: true });
watch(() => props.assets.patternRules, (newVal) => { bingoAssets.patternRules = newVal || []; }, { immediate: true });

// Reset played tickets when tickets change or modal reopens
watch(() => props.tickets, () => { playedTickets.value = []; });
watch(() => props.modelValue, (open) => { if (open) playedTickets.value = []; });

const close = (): void => {
    if (!props.demoMode) {
        emit('update:modelValue', false);
    }
};

const onEsc = (e: KeyboardEvent): void => {
    if (e.key === 'Escape' && !props.demoMode) {
        close();
    }
};

const togglePreviewMode = (): void => {
    demoPreviewMode.value = demoPreviewMode.value === 'mobile' ? 'desktop' : 'mobile';
};

const handleTicketPlayed = (ticketId: number): void => {
    if (!playedTickets.value.includes(ticketId)) {
        playedTickets.value.push(ticketId);
    }
};

onMounted(() => window.addEventListener('keydown', onEsc));
onUnmounted(() => window.removeEventListener('keydown', onEsc));
</script>

<template>
    <Teleport to="body" :disabled="demoMode">
        <transition name="fade">
            <div
                v-if="modelValue"
                :class="[
                    'z-[9999] flex flex-col items-center justify-center',
                    demoMode ? 'relative max-w-full max-h-[80vh] mx-auto' : 'fixed inset-0'
                ]"
                :style="{
                    background: demoMode ? 'transparent' : 'rgba(0, 0, 0, 0.5)',
                    backdropFilter: demoMode ? 'none' : 'blur(8px)'
                }"
                @click.self="close"
            >
            <!-- Preview Mode Toggle (Demo Only) -->
            <div v-if="demoMode" class="mb-4 flex items-center space-x-3 bg-gray-800 rounded-lg p-2">
                <span class="text-white text-sm font-medium">Preview Mode:</span>
                <button
                    @click="togglePreviewMode"
                    :class="[
                        'px-3 py-1 rounded text-sm font-medium transition-colors',
                        actualPreviewMode === 'mobile'
                            ? 'bg-blue-500 text-white'
                            : 'bg-gray-600 text-gray-300 hover:bg-gray-500'
                    ]"
                >
                    📱 Mobile
                </button>
                <button
                    @click="togglePreviewMode"
                    :class="[
                        'px-3 py-1 rounded text-sm font-medium transition-colors',
                        actualPreviewMode === 'desktop'
                            ? 'bg-blue-500 text-white'
                            : 'bg-gray-600 text-gray-300 hover:bg-gray-500'
                    ]"
                >
                    💻 Desktop
                </button>
            </div>

            <!-- Main Container -->
            <div
                :class="[containerClasses, { 'demo-mode': demoMode }, 'modal-zoom-in']"
                :style="modalStyle"
                @click.stop
            >
                <!-- Device Chrome (Demo Mode) -->
                <template v-if="demoMode">
                    <!-- Mobile Status Bar -->
                    <div
                        v-if="actualPreviewMode === 'mobile'"
                        class="h-8 bg-black flex items-center justify-between px-4 text-white text-sm"
                    >
                        <span>9:41</span>
                        <div class="flex space-x-1">
                            <div class="w-4 h-2 border border-white rounded-sm"></div>
                            <div class="w-1 h-2 bg-white rounded-sm"></div>
                        </div>
                    </div>

                    <!-- Desktop Browser Bar -->
                    <div
                        v-if="actualPreviewMode === 'desktop'"
                        class="h-10 bg-gray-700 flex items-center justify-between px-4 text-white text-sm border-b border-gray-600"
                    >
                        <div class="flex items-center space-x-2">
                            <div class="flex space-x-1">
                                <div class="w-3 h-3 bg-red-500 rounded-full"></div>
                                <div class="w-3 h-3 bg-yellow-500 rounded-full"></div>
                                <div class="w-3 h-3 bg-green-500 rounded-full"></div>
                            </div>
                            <span class="ml-4 text-gray-300">🎯 Bingo Game - Match to Win</span>
                        </div>
                        <div class="text-gray-400 text-xs">Chrome</div>
                    </div>
                </template>

                <!-- Close Button (Not in demo mode) -->
                <button
                    v-if="!demoMode"
                    class="absolute top-4 right-4 text-gray-700 bg-white/90 hover:bg-white rounded-full w-10 h-10 flex items-center justify-center focus:outline-none text-2xl z-50 shadow-lg transition-all duration-200 hover:scale-110"
                    @click="close"
                    aria-label="Close modal"
                >
                    ✕
                </button>

                <!-- Bingo Game Content -->
                <div :class="['flex flex-col relative bingo-game-wrapper overflow-hidden', demoMode ? 'flex-1' : 'h-full']" style="z-index: 1;">
                    <BingoGame
                        :assets="bingoAssets"
                        :prizes="prizes"
                        :tickets="availableTickets"
                        :demoMode="demoMode"
                        :previewMode="actualPreviewMode"
                        @ticket-played="handleTicketPlayed"
                    />
                </div>
            </div>

            <!-- Preview Size Info -->
            <div v-if="demoMode" class="mt-2 text-center text-gray-400 text-xs">
                {{ actualPreviewMode === 'mobile' ? '📱 Mobile Preview (420x650)' : '💻 Desktop Preview (700x650)' }}
            </div>
            </div>
        </transition>
    </Teleport>
</template>

<style scoped>
.fade-enter-active,
.fade-leave-active {
    transition: opacity 0.3s;
}

.fade-enter-from,
.fade-leave-to {
    opacity: 0;
}

/* Modal Zoom In Animation */
.modal-zoom-in {
    animation: modal-zoom-entrance 0.6s cubic-bezier(0.34, 1.56, 0.64, 1);
}

@keyframes modal-zoom-entrance {
    0% {
        transform: scale(0.3);
        opacity: 0;
    }
    100% {
        transform: scale(1);
        opacity: 1;
    }
}

/* Demo mode: ensure content fills container properly */
.demo-mode {
    display: flex;
    flex-direction: column;
}

.demo-mode .bingo-game-wrapper {
    flex: 1;
    min-height: 0;
    overflow: hidden;
}
</style>
