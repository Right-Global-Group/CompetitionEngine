<script setup lang="ts">
import { computed } from 'vue';

interface InstantWin {
    id: number;
    name: string;
    image: string;
    value: number;
    won?: boolean;
    description?: string;
    ticketNumber?: string;
}

interface CoinDropAssets {
    inventoryEmoji?: string;
    prizesModalBgColor?: string;
    prizesTitleColor?: string;
    prizesCardBorderColor?: string;
    prizesCardBgColor?: string;
    prizesValueColor?: string;
    primaryColor?: string;
    accentColor?: string;
    winBucketColor?: string;
}

interface Props {
    modelValue: boolean;
    wonPrizes?: InstantWin[];
    availablePrizes?: InstantWin[];
    coinDropAssets: CoinDropAssets;
}

const props = withDefaults(defineProps<Props>(), {
    wonPrizes: () => [
        {
            id: 1,
            name: 'Gold Coin',
            image: `data:image/svg+xml,${encodeURIComponent('<svg xmlns="http://www.w3.org/2000/svg" width="100" height="100"><text x="50%" y="50%" text-anchor="middle" dominant-baseline="central" font-size="60">🪙</text></svg>')}`,
            value: 500,
            won: true,
            ticketNumber: 'CD-0042'
        },
        {
            id: 2,
            name: 'Diamond Drop',
            image: `data:image/svg+xml,${encodeURIComponent('<svg xmlns="http://www.w3.org/2000/svg" width="100" height="100"><text x="50%" y="50%" text-anchor="middle" dominant-baseline="central" font-size="60">💎</text></svg>')}`,
            value: 1000,
            won: true,
            ticketNumber: 'CD-0137'
        },
        {
            id: 3,
            name: 'Money Bag',
            image: `data:image/svg+xml,${encodeURIComponent('<svg xmlns="http://www.w3.org/2000/svg" width="100" height="100"><text x="50%" y="50%" text-anchor="middle" dominant-baseline="central" font-size="60">💰</text></svg>')}`,
            value: 750,
            won: true,
            ticketNumber: 'CD-0289'
        }
    ],
    availablePrizes: () => [
        {
            id: 102,
            name: 'Diamond Drop',
            image: `data:image/svg+xml,${encodeURIComponent('<svg xmlns="http://www.w3.org/2000/svg" width="100" height="100"><text x="50%" y="50%" text-anchor="middle" dominant-baseline="central" font-size="60">💎</text></svg>')}`,
            value: 1000
        },
        {
            id: 103,
            name: 'Lucky Seven',
            image: `data:image/svg+xml,${encodeURIComponent('<svg xmlns="http://www.w3.org/2000/svg" width="100" height="100"><text x="50%" y="50%" text-anchor="middle" dominant-baseline="central" font-size="60">7️⃣</text></svg>')}`,
            value: 777
        },
        {
            id: 104,
            name: 'Money Bag',
            image: `data:image/svg+xml,${encodeURIComponent('<svg xmlns="http://www.w3.org/2000/svg" width="100" height="100"><text x="50%" y="50%" text-anchor="middle" dominant-baseline="central" font-size="60">💰</text></svg>')}`,
            value: 500
        },
        {
            id: 105,
            name: 'Gold Coin',
            image: `data:image/svg+xml,${encodeURIComponent('<svg xmlns="http://www.w3.org/2000/svg" width="100" height="100"><text x="50%" y="50%" text-anchor="middle" dominant-baseline="central" font-size="60">🪙</text></svg>')}`,
            value: 500
        },
        {
            id: 106,
            name: 'Golden Bell',
            image: `data:image/svg+xml,${encodeURIComponent('<svg xmlns="http://www.w3.org/2000/svg" width="100" height="100"><text x="50%" y="50%" text-anchor="middle" dominant-baseline="central" font-size="60">🔔</text></svg>')}`,
            value: 300
        },
        {
            id: 107,
            name: 'Star Prize',
            image: `data:image/svg+xml,${encodeURIComponent('<svg xmlns="http://www.w3.org/2000/svg" width="100" height="100"><text x="50%" y="50%" text-anchor="middle" dominant-baseline="central" font-size="60">⭐</text></svg>')}`,
            value: 250
        },
    ],
    coinDropAssets: () => ({
        inventoryEmoji: '🪙',
        prizesModalBgColor: '#1a1a2e',
        prizesTitleColor: '#ffd700',
        prizesCardBorderColor: '#ffd700',
        prizesCardBgColor: '#16213e',
        prizesValueColor: '#00ff88',
        primaryColor: '#e94560',
        accentColor: '#ffd700',
        winBucketColor: '#00ff88'
    })
});

const emit = defineEmits<{
    'update:modelValue': [value: boolean];
}>();

const close = (): void => {
    emit('update:modelValue', false);
};

const totalWonValue = computed(() => {
    return props.wonPrizes.reduce((sum, prize) => sum + prize.value, 0);
});

const formattedTotalValue = computed(() => {
    return `£${totalWonValue.value.toLocaleString()}`;
});

// Use computed properties directly from props for better reactivity
const modalBgColor = computed(() => props.coinDropAssets.prizesModalBgColor || '#1a1a2e');
const titleColor = computed(() => props.coinDropAssets.prizesTitleColor || '#ffd700');
const cardBorderColor = computed(() => props.coinDropAssets.prizesCardBorderColor || '#ffd700');
const cardBgColor = computed(() => props.coinDropAssets.prizesCardBgColor || '#16213e');
const valueColor = computed(() => props.coinDropAssets.prizesValueColor || '#00ff88');
const primaryColor = computed(() => props.coinDropAssets.primaryColor || '#e94560');
const accentColor = computed(() => props.coinDropAssets.accentColor || '#ffd700');
const emoji = computed(() => props.coinDropAssets.inventoryEmoji || '🪙');

// Create computed style objects
const containerStyle = computed(() => ({
    background: modalBgColor.value,
    borderColor: cardBorderColor.value,
    boxShadow: `0 0 40px ${cardBorderColor.value}4D`
}));

const titleDividerStyle = computed(() => ({
    background: `linear-gradient(to right, transparent, ${cardBorderColor.value}80, transparent)`
}));

const titleTextStyle = computed(() => ({
    color: titleColor.value,
    fontFamily: 'Impact, sans-serif',
    textShadow: `0 0 10px ${titleColor.value}`
}));

const prizeCardStyle = computed(() => ({
    background: cardBgColor.value,
    borderColor: cardBorderColor.value
}));

const valueTextStyle = computed(() => ({
    color: valueColor.value,
    fontFamily: 'Impact, sans-serif',
    textShadow: `0 0 8px ${valueColor.value}`
}));

const contentStyle = computed(() => ({
    backgroundColor: modalBgColor.value
}));

const headerStyle = computed(() => ({
    background: `linear-gradient(to right, ${cardBorderColor.value}40, ${modalBgColor.value}40, ${cardBorderColor.value}40)`,
    borderColor: `${cardBorderColor.value}30`
}));

const footerStyle = computed(() => ({
    background: `linear-gradient(to right, ${cardBorderColor.value}40, ${modalBgColor.value}40, ${cardBorderColor.value}40)`,
    borderColor: `${cardBorderColor.value}30`
}));

const scanningLineStyle = computed(() => ({
    background: `linear-gradient(to right, transparent, ${cardBorderColor.value}, transparent)`
}));

const coinGlowStyle = computed(() => ({
    filter: `drop-shadow(0 0 8px ${accentColor.value}) drop-shadow(0 0 15px ${accentColor.value}80)`
}));
</script>

<template>
    <Teleport to="body">
        <transition name="fade">
            <div v-if="modelValue" class="fixed inset-0 z-[80] flex items-center justify-center p-4" :style="{ backgroundColor: `${modalBgColor}33` }" @click.self="close">
            <!-- Main Container -->
            <div class="relative w-full max-w-4xl max-h-[90vh] rounded-xl border-2 shadow-2xl overflow-hidden" :style="containerStyle" @click.stop>

                <!-- Animated Scanning Line -->
                <div class="absolute top-0 left-0 right-0 h-px animate-scan-horizontal" :style="scanningLineStyle"></div>

                <!-- Header -->
                <div class="relative border-b-2 px-6 py-4" :style="headerStyle">
                    <div class="flex items-center justify-between">
                        <div class="flex items-center gap-3">
                            <div class="text-3xl animate-pulse">{{ emoji }}</div>
                            <div>
                                <h2 class="text-2xl font-black uppercase tracking-wider" :style="{
                                    color: titleColor,
                                    fontFamily: 'Impact, sans-serif',
                                    textShadow: `0 0 15px ${titleColor}, 2px 2px 0 ${modalBgColor}`
                                }">
                                    PRIZE INVENTORY
                                </h2>
                                <p class="text-xs uppercase tracking-widest" :style="{
                                    color: titleColor,
                                    fontFamily: 'Courier New, monospace',
                                    textShadow: `0 0 5px ${titleColor}`
                                }">
                                    YOUR WINS & AVAILABLE PRIZES
                                </p>
                            </div>
                        </div>

                        <!-- Close Button -->
                        <button
                            @click="close"
                            class="rounded-full w-10 h-10 flex items-center justify-center transition-all duration-300 border-2 group"
                            :style="{
                                backgroundColor: `${cardBgColor}80`,
                                borderColor: `${cardBorderColor}30`,
                                color: titleColor
                            }"
                            aria-label="Close inventory"
                        >
                            <span class="text-xl group-hover:rotate-90 transition-transform duration-300">✕</span>
                        </button>
                    </div>
                </div>

                <!-- Content -->
                <div class="relative overflow-y-auto max-h-[calc(90vh-200px)] px-6 py-4 custom-scrollbar" :style="contentStyle">

                    <!-- AVAILABLE PRIZES Section -->
                    <div :class="wonPrizes.length > 0 ? '' : 'mt-0'">
                        <div class="flex items-center gap-2 mb-3">
                            <div class="h-px flex-1" :style="titleDividerStyle"></div>
                            <h3 class="text-lg font-black uppercase tracking-wider flex items-center gap-2" :style="titleTextStyle">
                                <span class="text-2xl">{{ emoji }}</span>
                                AVAILABLE PRIZES ({{ availablePrizes.length }})
                                <span class="text-2xl">{{ emoji }}</span>
                            </h3>
                            <div class="h-px flex-1" :style="titleDividerStyle"></div>
                        </div>

                        <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                            <div
                                v-for="prize in availablePrizes"
                                :key="'available-' + prize.id"
                                class="group relative border-2 rounded-lg overflow-hidden hover:shadow-lg transition-all duration-300"
                                :style="prizeCardStyle"
                            >
                                <!-- Prize Image -->
                                <div class="relative h-40 overflow-hidden" :style="{ backgroundColor: `${cardBgColor}66` }">
                                    <img
                                        v-if="prize.image"
                                        :src="prize.image"
                                        :alt="prize.name"
                                        class="w-full h-full object-contain group-hover:scale-110 transition-transform duration-500 opacity-80 group-hover:opacity-100"
                                    />
                                    <div v-else class="w-full h-full flex items-center justify-center" :style="{
                                        background: `linear-gradient(to bottom right, ${cardBgColor}, ${cardBgColor}DD)`
                                    }">
                                        <span class="text-xs font-bold uppercase text-center px-2" :style="{ color: '#FFFFFF' }">{{ prize.name }}</span>
                                    </div>

                                    <!-- Gradient Overlay -->
                                    <div class="absolute inset-0" :style="{
                                        background: `linear-gradient(to top, ${cardBgColor}CC, transparent, transparent)`
                                    }"></div>
                                </div>

                                <!-- Prize Info -->
                                <div class="p-3">
                                    <h4 class="font-bold text-sm mb-1 line-clamp-2" :style="{ color: '#FFFFFF' }">
                                        {{ prize.name }}
                                    </h4>
                                    <p v-if="prize.description" class="text-xs mb-2 line-clamp-1" :style="{ color: '#FFFFFF99' }">
                                        {{ prize.description }}
                                    </p>
                                    <div class="flex items-center justify-between">
                                        <span class="text-xs font-bold uppercase tracking-wider" :style="{
                                            color: titleColor,
                                            fontFamily: 'Courier New, monospace',
                                            textShadow: `0 0 5px ${titleColor}`
                                        }">
                                            Value
                                        </span>
                                        <span class="font-black text-lg" :style="valueTextStyle">
                                            £{{ prize.value.toLocaleString() }}
                                        </span>
                                    </div>
                                </div>

                                <!-- Glow Effect -->
                                <div class="absolute inset-0 transition-all duration-300 pointer-events-none" :style="{
                                    backgroundColor: `${cardBorderColor}00`
                                }" :class="{ 'group-hover:bg-opacity-10': true }"></div>
                            </div>
                        </div>
                    </div>
                </div>

                <!-- Footer -->
                <div class="relative border-t-2 px-6 py-3" :style="footerStyle">
                    <div class="flex items-center justify-between">
                        <p class="text-xs uppercase tracking-widest" :style="{
                            color: titleColor,
                            fontFamily: 'Courier New, monospace',
                            textShadow: `0 0 5px ${titleColor}`
                        }">
                            {{ emoji }} KEEP DROPPING TO WIN MORE PRIZES!
                        </p>
                        <button
                            @click="close"
                            class="px-4 py-2 font-bold text-sm uppercase tracking-wider rounded border-2 transition-all duration-300 shadow-lg"
                            :style="{
                                background: `linear-gradient(to right, ${cardBorderColor}, ${cardBorderColor}DD)`,
                                color: '#FFFFFF',
                                borderColor: `${cardBorderColor}80`,
                                fontFamily: 'Impact, sans-serif',
                                boxShadow: `0 0 15px ${cardBorderColor}66`
                            }"
                        >
                            CLOSE
                        </button>
                    </div>
                </div>
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

/* Custom Scrollbar */
.custom-scrollbar::-webkit-scrollbar {
    width: 8px;
}

.custom-scrollbar::-webkit-scrollbar-track {
    background: rgba(0, 0, 0, 0.3);
    border-radius: 4px;
}

.custom-scrollbar::-webkit-scrollbar-thumb {
    background: rgba(255, 255, 255, 0.2);
    border-radius: 4px;
    border: 1px solid rgba(255, 215, 0, 0.3);
}

.custom-scrollbar::-webkit-scrollbar-thumb:hover {
    background: rgba(255, 255, 255, 0.4);
    border-color: rgba(255, 215, 0, 0.5);
}

/* Horizontal Scanning Line */
@keyframes scan-horizontal {
    0% {
        transform: translateX(-100%);
        opacity: 0;
    }
    50% {
        opacity: 1;
    }
    100% {
        transform: translateX(100%);
        opacity: 0;
    }
}

.animate-scan-horizontal {
    animation: scan-horizontal 3s linear infinite;
}

/* Bounce animation with delays */
@keyframes bounce {
    0%, 100% {
        transform: translateY(0);
    }
    50% {
        transform: translateY(-10px);
    }
}

.animate-bounce {
    animation: bounce 2s ease-in-out infinite;
}

.delay-100 {
    animation-delay: 0.1s;
}

.delay-200 {
    animation-delay: 0.2s;
}

.delay-300 {
    animation-delay: 0.3s;
}

/* Line clamp for text overflow */
.line-clamp-1 {
    display: -webkit-box;
    -webkit-line-clamp: 1;
    -webkit-box-orient: vertical;
    overflow: hidden;
}

.line-clamp-2 {
    display: -webkit-box;
    -webkit-line-clamp: 2;
    -webkit-box-orient: vertical;
    overflow: hidden;
}
</style>