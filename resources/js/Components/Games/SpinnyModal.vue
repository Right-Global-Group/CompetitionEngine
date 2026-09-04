<script setup lang="ts">
import { onMounted, reactive, onUnmounted, watch, ref, computed } from 'vue';

import SpinGame from './SpinGame.vue';
import TicketRevealModal from './TicketRevealModal.vue';

interface Assets {
    background: string;
    header: string;
    titleText: string;
    titleColor: string;
    logo?: string;
    walletText?: string;
    walletColor?: string;
    wheelEdgeColor?: string;
}

interface Ticket {
    id: number;
    number?: number;
    instant_win?: { prize: string; value?: number; prize_type?: string };
}

interface Props {
    modelValue: boolean;
    demoMode?: boolean;
    assets: Assets;
    tickets?: Ticket[];
}

const props = defineProps<Props>();
const emit = defineEmits<{
    'update:modelValue': [value: boolean];
}>();

const demoPreviewMode = ref<'mobile' | 'desktop'>('mobile');
const playedTickets = ref<number[]>([]);
const currentPrize = ref('');
const isWinning = ref(false);
const showWinnerCard = ref(false);
const hideFloatingCard = ref(false);
const winCounter = ref(0);
const showWinNotification = ref(false);
const isCardAnimatingToCorner = ref(false);
const showTicketReveal = ref(false);
const isLoadingTickets = ref(false);
const allTickets = ref<Ticket[]>([]);
const ticketsLoaded = ref(false);

const spinAssets = reactive({
    titleText: props.assets.titleText || 'SPIN WHEEL',
    titleColor: props.assets.titleColor || '#793181',
    logo: props.assets.logo || '',
    wheelEdgeColor: props.assets.wheelEdgeColor || '#00aeffff',
});

const spinsLeft = computed(() => {
    if (props.demoMode) {
        return 9;
    }
    if (!props.tickets) {
        return 0;
    }
    return props.tickets.length - playedTickets.value.length;
});

const isMobileDevice = computed(() => {
    if (typeof window === 'undefined') {
        return false;
    }
    return window.innerWidth < 768;
});

const actualPreviewMode = computed(() => {
    return props.demoMode ? demoPreviewMode.value : isMobileDevice.value ? 'mobile' : 'desktop';
});

const modalStyle = computed(() => {
    if (!props.demoMode) {
        return { width: '100vw', height: '100vh' };
    }

    return actualPreviewMode.value === 'mobile'
        ? {
            width: '375px',
            height: '667px',
            backgroundImage: `url("data:image/svg+xml;charset=utf-8,${encodeURIComponent(`
          <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 375 667">
            <rect width="375" height="667" fill="#000"/>
            <rect x="10" y="30" width="355" height="25" rx="12" fill="#333"/>
            <circle cx="30" cy="42" r="3" fill="#666"/>
            <circle cx="345" cy="42" r="3" fill="#666"/>
          </svg>
        `)}")`,
        }
        : {
            width: '800px',
            height: '600px',
            background: 'linear-gradient(135deg, #1e3c72 0%, #2a5298 100%)',
            border: '3px solid #333',
            borderRadius: '12px',
        };
});

const containerClasses = computed(() => {
    if (!props.demoMode) {
        return ['w-full h-full'];
    }

    return ['relative overflow-hidden shadow-2xl', actualPreviewMode.value === 'mobile' ? 'bg-gradient-to-b from-gray-900 to-black rounded-xl' : 'bg-gradient-to-b from-gray-800 to-gray-900 rounded-xl'];
});

const winnerCardSize = computed(() => {
    if (props.demoMode) {
        return actualPreviewMode.value === 'mobile' ? { width: '200px', height: '130px' } : { width: '200px', height: '130px' };
    }
    return isMobileDevice.value ? { width: '300px', height: '190px' } : { width: '400px', height: '250px' };
});

watch(
    () => props.assets.titleText,
    (newVal) => {
        spinAssets.titleText = newVal || 'SPIN WHEEL';
    },
    { immediate: true }
);

watch(
    () => props.assets.titleColor,
    (newVal) => {
        spinAssets.titleColor = newVal || '#793181';
    },
    { immediate: true }
);

watch(
    () => props.assets.logo,
    (newVal) => {
        spinAssets.logo = newVal || '';
    },
    { immediate: true }
);

watch(
    () => props.tickets,
    () => {
        playedTickets.value = [];
    }
);

watch(
    () => props.assets.wheelEdgeColor,
    (newVal) => {
        spinAssets.wheelEdgeColor = newVal || '#00aeffff';
    },
    { immediate: true }
);

const onPrizeWon = (prize: string): void => {
    currentPrize.value = prize;
    isWinning.value = true;
    hideFloatingCard.value = true;

    setTimeout(() => {
        showWinnerCard.value = true;
    }, 200);

    setTimeout(() => {
        isCardAnimatingToCorner.value = true;
    }, 2500);

    setTimeout(() => {
        showWinnerCard.value = false;
        winCounter.value++;
        showWinNotification.value = true;

        setTimeout(() => {
            isCardAnimatingToCorner.value = false;
            hideFloatingCard.value = false;
            isWinning.value = false;
            currentPrize.value = '';
        }, 300);

        setTimeout(() => {
            showWinNotification.value = false;
        }, 3000);
    }, 2900);
};

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

const onTicketPlayed = (ticketId: number): void => {
    if (!playedTickets.value.includes(ticketId)) {
        playedTickets.value.push(ticketId);
    }
};

const openTicketReveal = async (): Promise<void> => {
    allTickets.value = props.tickets || [];
    showTicketReveal.value = true;
};

onMounted(() => window.addEventListener('keydown', onEsc));
onUnmounted(() => window.removeEventListener('keydown', onEsc));
</script>

<template>
    <Teleport to="body" :disabled="demoMode">
        <transition name="fade">
            <div v-if="modelValue"
                :class="['z-[9999] flex flex-col items-center justify-center', demoMode ? 'relative max-w-full max-h-[80vh] mx-auto' : 'fixed inset-0 bg-black/80']"
                @click.self="close">
            <div v-if="demoMode" class="mb-4 flex items-center space-x-3 bg-gray-800 rounded-lg p-2">
                <span class="text-white text-sm font-medium">Preview Mode:</span>
                <UiButton @click="togglePreviewMode"
                    :class="['px-3 py-1 rounded text-sm font-medium transition-colors', actualPreviewMode === 'mobile' ? 'bg-blue-500 text-white' : 'bg-gray-600 text-gray-300 hover:bg-gray-500']">
                    📱 Mobile </UiButton>
                <UiButton @click="togglePreviewMode"
                    :class="['px-3 py-1 rounded text-sm font-medium transition-colors', actualPreviewMode === 'desktop' ? 'bg-blue-500 text-white' : 'bg-gray-600 text-gray-300 hover:bg-gray-500']">
                    💻 Desktop </UiButton>
            </div>

            <div :class="[containerClasses, { 'demo-mode': demoMode }]" :style="modalStyle" @click.stop>
                <template v-if="demoMode">
                    <div v-if="actualPreviewMode === 'mobile'"
                        class="h-8 bg-black flex items-center justify-between px-4 text-white text-sm">
                        <span>9:41</span>
                        <div class="flex space-x-1">
                            <div class="w-4 h-2 border border-white rounded-sm"></div>
                            <div class="w-1 h-2 bg-white rounded-sm"></div>
                        </div>
                    </div>

                    <div v-if="actualPreviewMode === 'desktop'"
                        class="h-10 bg-gray-700 flex items-center justify-between px-4 text-white text-sm border-b border-gray-600">
                        <div class="flex items-center space-x-2">
                            <div class="flex space-x-1">
                                <div class="w-3 h-3 bg-red-500 rounded-full"></div>
                                <div class="w-3 h-3 bg-yellow-500 rounded-full"></div>
                                <div class="w-3 h-3 bg-green-500 rounded-full"></div>
                            </div>
                            <span class="ml-4 text-gray-300"> Spin Games - Spin to Win</span>
                        </div>
                        <div class="text-gray-400 text-xs">Chrome</div>
                    </div>
                </template>

                <UiButton v-if="!demoMode"
                    class="absolute top-4 right-4 text-gray-400 hover:text-white focus:outline-none text-3xl z-50"
                    @click="close" aria-label="Close modal"> ✕ </UiButton>

                <UiButton v-if="!demoMode && tickets && tickets.length > 0" @click="openTicketReveal"
                    class="absolute top-4 left-4 text-white px-4 py-2 rounded-lg font-medium transition-colors z-50 text-sm"
                    :style="{
                        backgroundColor: spinAssets.titleColor || '#793181',
                        boxShadow: `0 4px 12px ${spinAssets.titleColor || '#793181'}40`
                    }" :disabled="isLoadingTickets">
                    <span v-if="isLoadingTickets">⏳ Loading...</span>
                    <span v-else>🎫 Reveal All</span>
                </UiButton>

                <div v-if="winCounter > 0"
                    :class="['absolute z-50 transition-all duration-500', demoMode ? 'top-2 left-2' : 'top-20 left-4', showWinNotification ? 'animate-bounce' : '']">
                    <div class="win-counter-badge">
                        <div class="win-counter-icon">🎉</div>
                        <div class="win-counter-number">{{ winCounter }}</div>
                    </div>
                </div>

                <div class="h-full flex flex-col relative" :style="{
                    backgroundImage: assets.background ? `url(${assets.background})` : 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
                    backgroundSize: 'cover',
                    backgroundPosition: 'center',
                }">
                    <div :class="['absolute left-4 right-4 z-10', demoMode ? 'top-4' : 'top-8']">
                        <img v-if="assets.header" :src="assets.header" alt="Header"
                            :class="['w-full object-contain', demoMode && actualPreviewMode === 'mobile' ? 'h-12' : demoMode && actualPreviewMode === 'desktop' ? 'h-20' : isMobileDevice ? 'h-16' : 'h-24']" />
                        <div v-else class="text-center">
                            <p class="text-red-400 text-sm">!! Great Prizes To Be Won !!</p>
                        </div>
                    </div>

                    <SpinGame :spinAssets="spinAssets" :demoMode="demoMode" :previewMode="actualPreviewMode"
                        :tickets="tickets" :playedTickets="playedTickets" @ticket-played="onTicketPlayed"
                        @prize-won="onPrizeWon" class="flex-1" />

                    <div
                        :class="['absolute right-4 bg-white/20 backdrop-blur-sm rounded px-3 py-1 z-10', demoMode ? 'top-20' : 'top-24']">
                        <span class="text-white text-sm font-semibold">{{ spinsLeft }} Spin{{ spinsLeft === 1 ? '' : 's'
                        }} left</span>
                    </div>

                    <div v-if="!hideFloatingCard"
                        :class="['absolute inset-0 flex items-start justify-center pointer-events-none z-20 transition-all duration-500', demoMode && actualPreviewMode === 'mobile' ? 'pt-36' : demoMode && actualPreviewMode === 'desktop' ? 'pt-38' : !demoMode && isMobileDevice ? 'pt-50' : 'pt-60']">
                        <div class="floating-credit-card">
                            <div class="credit-card-3d">
                                <div class="credit-card-front">
                                    <div class="card-gradient"
                                        :style="{ background: `linear-gradient(135deg, ${assets.walletColor || '#8b5cf6'} 0%, ${assets.walletColor || '#8b5cf6'} 100%)` }">
                                        <div class="card-header-section">
                                            <div class="brand-title">
                                                <h3 class="brand-text">{{ assets.walletText || 'SPIN WALLET' }}</h3>
                                            </div>
                                            <div class="card-chip"></div>
                                        </div>

                                        <div class="card-body">
                                            <div class="prize-message">Win Incredible Prizes</div>
                                        </div>

                                        <div class="card-footer">
                                            <div class="card-number">**** 1234</div>
                                        </div>

                                        <div class="card-shine-effect"></div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>

                    <div v-if="showWinnerCard"
                        :class="['fixed z-[60] flex items-start justify-center pointer-events-none', 'inset-0', isMobileDevice || (demoMode && actualPreviewMode === 'mobile') ? 'pt-32' : 'pt-24']"
                        style="background: rgba(0, 0, 0, 0.3)">
                        <div class="winner-card-container" :style="winnerCardSize" :class="{
                            'slide-to-corner': isCardAnimatingToCorner && !isMobileDevice && !(demoMode && actualPreviewMode === 'mobile'),
                            'slide-to-corner-mobile': isCardAnimatingToCorner && (isMobileDevice || (demoMode && actualPreviewMode === 'mobile')),
                        }">
                            <div class="winner-card">
                                <div class="card-inner">
                                    <div class="card-front">
                                        <div class="card-content"
                                            :style="{ background: `linear-gradient(135deg, ${assets.walletColor || '#8b5cf6'} 0%, ${assets.walletColor || '#8b5cf6'} 100%)` }">
                                            <div class="card-header">
                                                <div class="brand-section">
                                                    <h2 class="brand-text">{{ assets.walletText || 'SPIN WALLET' }}</h2>
                                                </div>
                                                <div class="card-chip"></div>
                                            </div>

                                            <div class="prize-section">
                                                <div class="prize-amount">{{ currentPrize }}</div>
                                            </div>

                                            <div class="card-footer">
                                                <div class="card-number">**** 1234</div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            <div v-if="demoMode" class="mt-2 text-center text-gray-400 text-xs">
                {{ actualPreviewMode === 'mobile' ? '📱 Mobile Preview (375x667)' : '💻 Desktop Preview (800x600)' }}
            </div>
            </div>
        </transition>
    </Teleport>

    <TicketRevealModal v-model="showTicketReveal" :tickets="allTickets" :playedTickets="playedTickets" />
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

.win-counter-badge {
    display: flex;
    align-items: center;
    background: linear-gradient(135deg, #10b981, #059669);
    border-radius: 20px;
    padding: 8px 12px;
    box-shadow: 0 4px 12px rgba(16, 185, 129, 0.4);
    border: 2px solid rgba(255, 255, 255, 0.3);
}

.win-counter-icon {
    font-size: 18px;
    margin-right: 6px;
}

.win-counter-number {
    color: white;
    font-weight: 900;
    font-size: 16px;
    text-shadow: 1px 1px 2px rgba(0, 0, 0, 0.5);
    min-width: 20px;
    text-align: center;
}

.floating-credit-card {
    perspective: 1000px;
    animation: cardFloat 3s ease-in-out infinite;
}

.credit-card-3d {
    width: 140px;
    height: 90px;
    transform-style: preserve-3d;
    animation: cardRotate 6s ease-in-out infinite;
    transition: transform 0.3s ease;
}

.credit-card-front {
    position: absolute;
    width: 100%;
    height: 100%;
    backface-visibility: hidden;
    border-radius: 12px;
    overflow: hidden;
    box-shadow:
        0 15px 30px rgba(0, 0, 0, 0.4),
        0 0 20px rgba(219, 7, 242, 0.3);
}

.card-gradient {
    width: 100%;
    height: 100%;
    position: relative;
    display: flex;
    flex-direction: column;
    justify-content: space-between;
    padding: 6px;
    color: white;
    transition: background 0.5s ease-in-out;
}

.card-header-section {
    display: flex;
    justify-content: space-between;
    align-items: flex-start;
}

.brand-title {
    flex: 1;
}

.brand-text {
    font-size: 12px;
    font-weight: 900;
    letter-spacing: 0.5px;
    margin: 0;
    text-shadow: 1px 1px 2px rgba(0, 0, 0, 0.8);
    color: white;
    line-height: 1;
}

.card-chip {
    width: 18px;
    height: 13px;
    background: linear-gradient(135deg, #f3f4f6, #d1d5db);
    border-radius: 2px;
    border: 1px solid #9ca3af;
    box-shadow: 0 1px 3px rgba(0, 0, 0, 0.3);
}

.card-body {
    text-align: center;
    flex: 1;
    display: flex;
    align-items: center;
    justify-content: center;
    margin: 4px 0;
}

.prize-message {
    font-size: 13px;
    font-weight: 700;
    color: white;
    text-shadow:
        1px 1px 2px rgba(0, 0, 0, 0.8),
        0 0 8px rgba(255, 255, 255, 0.6);
    letter-spacing: 0.3px;
    text-align: center;
    line-height: 1.1;
}

.card-footer {
    display: flex;
    justify-content: flex-end;
    align-items: flex-end;
}

.card-number {
    font-size: 9px;
    font-family: 'Courier New', monospace;
    letter-spacing: 1px;
    opacity: 0.9;
    color: white;
    text-shadow: 1px 1px 2px rgba(0, 0, 0, 0.6);
}

.card-shine-effect {
    position: absolute;
    top: -50%;
    left: -50%;
    width: 200%;
    height: 200%;
    background: linear-gradient(45deg, transparent 30%, rgba(255, 255, 255, 0.2) 50%, transparent 70%);
    animation: cardShineMove 4s ease-in-out infinite;
    pointer-events: none;
}

.winner-card-container {
    perspective: 1000px;
    animation: slideInFromRight 0.5s ease-out forwards;
}

.winner-card-container.slide-to-corner {
    animation: slideToCorner 0.4s ease-out forwards;
}

.winner-card-container.slide-to-corner-mobile {
    animation: slideToCornerMobile 0.4s ease-out forwards;
}

.winner-card {
    width: 100%;
    height: 100%;
    transform-style: preserve-3d;
}

.card-inner {
    width: 100%;
    height: 100%;
    transform-style: preserve-3d;
    animation: flipReveal3D 0.6s ease-out forwards;
}

.card-front {
    position: absolute;
    width: 100%;
    height: 100%;
    backface-visibility: hidden;
    border-radius: 20px;
    overflow: hidden;
    box-shadow:
        0 25px 50px rgba(0, 0, 0, 0.6),
        0 0 40px rgba(219, 7, 242, 0.5),
        inset 0 1px 0 rgba(255, 255, 255, 0.3);
    border: 2px solid rgba(255, 255, 255, 0.2);
    transform: perspective(800px) rotateX(-5deg) rotateY(8deg);
}

.card-content {
    width: 100%;
    height: 100%;
    position: relative;
    display: flex;
    flex-direction: column;
    justify-content: space-between;
    padding: 16px;
    color: white;
}

.card-header {
    display: flex;
    justify-content: space-between;
    align-items: flex-start;
    margin-bottom: 8px;
}

.brand-section {
    flex: 1;
}

.brand-section .brand-text {
    font-size: 20px;
    font-weight: 900;
    letter-spacing: 1.5px;
    margin: 0;
    text-shadow: 2px 2px 4px rgba(0, 0, 0, 0.5);
    color: white;
}

.card-header .card-chip {
    width: 32px;
    height: 22px;
    background: linear-gradient(135deg, #f3f4f6, #d1d5db);
    border-radius: 6px;
    border: 1px solid #9ca3af;
    box-shadow: 0 4px 8px rgba(0, 0, 0, 0.3);
}

.prize-section {
    text-align: center;
    flex: 1;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
}

.prize-amount {
    font-size: 42px;
    font-weight: 900;
    color: #ffffff;
    text-shadow:
        3px 3px 6px rgba(0, 0, 0, 0.8),
        0 0 20px rgba(255, 255, 255, 0.8);
    letter-spacing: -1px;
    animation: prizeGlow 1.5s ease-in-out infinite;
}

.card-footer .card-number {
    font-size: 12px;
    font-family: 'Courier New', monospace;
    letter-spacing: 1.5px;
    opacity: 0.9;
    text-shadow: 1px 1px 2px rgba(0, 0, 0, 0.4);
    color: white;
}

@keyframes slideInFromRight {
    0% {
        transform: translateX(100px) rotateY(-15deg);
        opacity: 0;
    }

    100% {
        transform: translateX(0) rotateY(0deg);
        opacity: 1;
    }
}

@keyframes flipReveal3D {
    0% {
        transform: perspective(800px) rotateY(-90deg) rotateX(-10deg) translateZ(-50px);
        opacity: 0;
    }

    50% {
        transform: perspective(800px) rotateY(-20deg) rotateX(-5deg) translateZ(20px);
        opacity: 0.8;
    }

    100% {
        transform: perspective(800px) rotateY(0deg) rotateX(0deg) translateZ(0px);
        opacity: 1;
    }
}

@keyframes slideToCorner {
    0% {
        transform: translateX(0) translateY(0) scale(1);
        opacity: 1;
    }

    100% {
        transform: translateX(-400px) translateY(-300px) scale(0.2);
        opacity: 0;
    }
}

@keyframes slideToCornerMobile {
    0% {
        transform: translateX(0) translateY(0) scale(1);
        opacity: 1;
    }

    100% {
        transform: translateX(-150px) translateY(-150px) scale(0.2);
        opacity: 0;
    }
}

@keyframes prizeGlow {

    0%,
    100% {
        text-shadow:
            3px 3px 6px rgba(0, 0, 0, 0.8),
            0 0 20px rgba(255, 255, 255, 0.8);
    }

    50% {
        text-shadow:
            3px 3px 6px rgba(0, 0, 0, 0.8),
            0 0 30px rgba(255, 255, 255, 1),
            0 0 50px rgba(251, 191, 36, 0.7);
    }
}

@keyframes cardFloat {

    0%,
    100% {
        transform: translateY(0px) scale(1);
    }

    25% {
        transform: translateY(-8px) scale(1.02);
    }

    50% {
        transform: translateY(-4px) scale(1.01);
    }

    75% {
        transform: translateY(-12px) scale(1.03);
    }
}

@keyframes cardRotate {

    0%,
    100% {
        transform: rotateY(0deg) rotateX(0deg) rotateZ(0deg);
    }

    25% {
        transform: rotateY(5deg) rotateX(2deg) rotateZ(1deg);
    }

    50% {
        transform: rotateY(0deg) rotateX(4deg) rotateZ(-1deg);
    }

    75% {
        transform: rotateY(-5deg) rotateX(2deg) rotateZ(1deg);
    }
}

@keyframes cardShineMove {
    0% {
        transform: translateX(-100%) translateY(-100%) rotate(45deg);
    }

    25% {
        transform: translateX(-50%) translateY(-50%) rotate(45deg);
    }

    50% {
        transform: translateX(0%) translateY(0%) rotate(45deg);
    }

    75% {
        transform: translateX(50%) translateY(50%) rotate(45deg);
    }

    100% {
        transform: translateX(100%) translateY(100%) rotate(45deg);
    }
}

@media (max-width: 768px) {
    .credit-card-3d {
        width: 130px;
        height: 85px;
    }

    .card-gradient {
        padding: 6px;
    }

    .brand-text {
        font-size: 10px;
        line-height: 1;
    }

    .prize-message {
        font-size: 11px;
        line-height: 1.1;
    }

    .card-number {
        font-size: 7px;
    }

    .card-chip {
        width: 16px;
        height: 11px;
    }

    .card-body {
        margin: 2px 0;
    }

    .prize-amount {
        font-size: 32px;
    }

    .brand-section .brand-text {
        font-size: 16px;
    }

    .win-counter-badge {
        padding: 6px 10px;
    }

    .win-counter-icon {
        font-size: 16px;
    }

    .win-counter-number {
        font-size: 14px;
    }
}

.demo-mode .credit-card-3d {
    width: 110px;
    height: 70px;
}

.demo-mode .brand-text {
    font-size: 6px;
    line-height: 1;
}

.demo-mode .prize-message {
    font-size: 7px;
    line-height: 1;
}

.demo-mode .card-number {
    font-size: 4px;
}

.demo-mode .card-chip {
    width: 12px;
    height: 8px;
}

.demo-mode .card-gradient {
    padding: 4px;
}

.demo-mode .card-body {
    margin: 1px 0;
}

.demo-mode .winner-card-container {
    width: 200px;
    height: 130px;
    max-width: 200px;
    max-height: 130px;
}

.demo-mode .brand-section .brand-text {
    font-size: 12px;
}

.demo-mode .prize-amount {
    font-size: 20px;
}

.demo-mode .card-header .card-chip {
    width: 18px;
    height: 12px;
}

.demo-mode .card-footer .card-number {
    font-size: 8px;
}

.demo-mode .card-content {
    padding: 8px;
}

.demo-mode .win-counter-badge {
    padding: 4px 8px;
}

.demo-mode .win-counter-icon {
    font-size: 12px;
    margin-right: 4px;
}

.demo-mode .win-counter-number {
    font-size: 12px;
}
</style>
