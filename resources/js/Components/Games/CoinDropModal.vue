<script setup lang="ts">
import { onMounted, reactive, onUnmounted, watch, ref, computed } from 'vue';
import CoinDropGame from './CoinDropGame.vue';

interface Assets {
    name?: string;
    background: string;
    header: string;
    titleText: string;
    titleColor: string;
    titleImage?: string;
    dropButtonImage?: string;
    primaryColor?: string;
    secondaryColor?: string;
    accentColor?: string;
    textColor?: string;
    welcomeSound?: string;
    dropSound?: string;
    winSound?: string;
    lossSound?: string;
    boardBgColor?: string;
    pegColor?: string;
    pegGlowColor?: string;
    ballColor?: string;
    ballGlowColor?: string;
    ballImage?: string;
    winBucketColor?: string;
    loseBucketColor?: string;
    winBucketImage?: string;
    loseBucketImage?: string;
    tubeImage?: string;
    trailColor?: string;
    gameBackground?: string;
    pegShape?: string;
    machineImage?: string;
    footerImage?: string;
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
const welcomeAudio = ref<HTMLAudioElement | null>(null);
const introVideoRef = ref<HTMLVideoElement | null>(null);
const showCoinDropGame = ref(true);
const showGameBoard = ref(false);
const showLobby = ref(false);
const showHowToPlay = ref(false);
const showIntroVideo = ref(false); // Only show video during intro, hide after
let introTimeoutId: ReturnType<typeof setTimeout> | null = null; // Track intro timeout

// Check if there's an intro video
const hasIntroVideo = computed(() => {
    if (!props.assets.background) return false;
    const videoExtensions = ['.mp4', '.webm', '.ogg', '.mov'];
    const isVideo = videoExtensions.some(ext => props.assets.background.toLowerCase().endsWith(ext));
    return isVideo;
});

const coinDropAssets = reactive({
    titleText: props.assets.titleText || 'COIN DROP!',
    titleColor: props.assets.titleColor || '#FFD700',
    titleImage: props.assets.titleImage || '',
    dropButtonImage: props.assets.dropButtonImage || '',
    background: '',
    header: props.assets.header || '',
    primaryColor: props.assets.primaryColor || '#e94560',
    secondaryColor: props.assets.secondaryColor || '#1a1a2e',
    accentColor: props.assets.accentColor || '#ffd700',
    textColor: props.assets.textColor || '#FFFFFF',
    welcomeSound: props.assets.welcomeSound || '',
    dropSound: props.assets.dropSound || '',
    winSound: props.assets.winSound || '',
    lossSound: props.assets.lossSound || '',
    boardBgColor: props.assets.boardBgColor || '#1a1a2e',
    pegColor: props.assets.pegColor || '#ffffff',
    pegGlowColor: props.assets.pegGlowColor || '#e94560',
    ballColor: props.assets.ballColor || '#ffd700',
    ballGlowColor: props.assets.ballGlowColor || '#ffaa00',
    ballImage: props.assets.ballImage || '',
    winBucketColor: props.assets.winBucketColor || '#00ff88',
    loseBucketColor: props.assets.loseBucketColor || '#ff4444',
    winBucketImage: props.assets.winBucketImage || '',
    loseBucketImage: props.assets.loseBucketImage || '',
    tubeImage: props.assets.tubeImage || '',
    trailColor: props.assets.trailColor || '#e94560',
    gameBackground: props.assets.gameBackground || '',
    pegShape: props.assets.pegShape || 'hexagon',
    machineImage: props.assets.machineImage || '',
    footerImage: props.assets.footerImage || '',
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
              height: '750px',
              border: '1px solid #444',
              borderRadius: '12px',
          }
        : {
              width: '700px',
              height: '750px',
              border: '1px solid #444',
              borderRadius: '4px',
          };
});

const containerClasses = computed(() => {
    return ['relative', props.demoMode ? 'shadow-lg overflow-hidden' : 'w-full h-full overflow-hidden'];
});

// Watch for asset changes
watch(
    () => props.assets.titleText,
    (newVal) => { coinDropAssets.titleText = newVal || 'COIN DROP!'; },
    { immediate: true }
);

watch(
    () => props.assets.titleColor,
    (newVal) => { coinDropAssets.titleColor = newVal || '#FFD700'; },
    { immediate: true }
);

watch(
    () => props.assets.background,
    (newVal) => { coinDropAssets.background = newVal || ''; },
    { immediate: true }
);

watch(
    () => props.assets.header,
    (newVal) => { coinDropAssets.header = newVal || ''; },
    { immediate: true }
);

watch(
    () => props.assets.primaryColor,
    (newVal) => { coinDropAssets.primaryColor = newVal || '#e94560'; },
    { immediate: true }
);

watch(
    () => props.assets.secondaryColor,
    (newVal) => { coinDropAssets.secondaryColor = newVal || '#1a1a2e'; },
    { immediate: true }
);

watch(
    () => props.assets.accentColor,
    (newVal) => { coinDropAssets.accentColor = newVal || '#ffd700'; },
    { immediate: true }
);

watch(
    () => props.assets.textColor,
    (newVal) => { coinDropAssets.textColor = newVal || '#FFFFFF'; },
    { immediate: true }
);

watch(
    () => props.assets.titleImage,
    (newVal) => { coinDropAssets.titleImage = newVal || ''; },
    { immediate: true }
);

watch(
    () => props.assets.dropButtonImage,
    (newVal) => { coinDropAssets.dropButtonImage = newVal || ''; },
    { immediate: true }
);

watch(
    () => props.assets.welcomeSound,
    (newVal) => { coinDropAssets.welcomeSound = newVal || ''; },
    { immediate: true }
);

watch(
    () => props.assets.dropSound,
    (newVal) => { coinDropAssets.dropSound = newVal || ''; },
    { immediate: true }
);

watch(
    () => props.assets.winSound,
    (newVal) => { coinDropAssets.winSound = newVal || ''; },
    { immediate: true }
);

watch(
    () => props.assets.lossSound,
    (newVal) => { coinDropAssets.lossSound = newVal || ''; },
    { immediate: true }
);

watch(
    () => props.assets.boardBgColor,
    (newVal) => { coinDropAssets.boardBgColor = newVal || '#1a1a2e'; },
    { immediate: true }
);

watch(
    () => props.assets.pegColor,
    (newVal) => { coinDropAssets.pegColor = newVal || '#ffffff'; },
    { immediate: true }
);

watch(
    () => props.assets.pegGlowColor,
    (newVal) => { coinDropAssets.pegGlowColor = newVal || '#e94560'; },
    { immediate: true }
);

watch(
    () => props.assets.ballColor,
    (newVal) => { coinDropAssets.ballColor = newVal || '#ffd700'; },
    { immediate: true }
);

watch(
    () => props.assets.ballGlowColor,
    (newVal) => { coinDropAssets.ballGlowColor = newVal || '#ffaa00'; },
    { immediate: true }
);

watch(
    () => props.assets.ballImage,
    (newVal) => { coinDropAssets.ballImage = newVal || ''; },
    { immediate: true }
);

watch(
    () => props.assets.winBucketColor,
    (newVal) => { coinDropAssets.winBucketColor = newVal || '#00ff88'; },
    { immediate: true }
);

watch(
    () => props.assets.loseBucketColor,
    (newVal) => { coinDropAssets.loseBucketColor = newVal || '#ff4444'; },
    { immediate: true }
);

watch(
    () => props.assets.winBucketImage,
    (newVal) => { coinDropAssets.winBucketImage = newVal || ''; },
    { immediate: true }
);

watch(
    () => props.assets.loseBucketImage,
    (newVal) => { coinDropAssets.loseBucketImage = newVal || ''; },
    { immediate: true }
);

watch(
    () => props.assets.tubeImage,
    (newVal) => { coinDropAssets.tubeImage = newVal || ''; },
    { immediate: true }
);

watch(
    () => props.assets.trailColor,
    (newVal) => { coinDropAssets.trailColor = newVal || '#e94560'; },
    { immediate: true }
);

watch(
    () => props.assets.gameBackground,
    (newVal) => { coinDropAssets.gameBackground = newVal || ''; },
    { immediate: true }
);

watch(
    () => props.assets.pegShape,
    (newVal) => { coinDropAssets.pegShape = newVal || 'hexagon'; },
    { immediate: true }
);

watch(
    () => props.assets.machineImage,
    (newVal) => { coinDropAssets.machineImage = newVal || ''; },
    { immediate: true }
);

watch(
    () => props.assets.footerImage,
    (newVal) => { coinDropAssets.footerImage = newVal || ''; },
    { immediate: true }
);

// Reset played tickets when tickets change
watch(
    () => props.tickets,
    () => { playedTickets.value = []; }
);

// Play intro video and welcome sound when modal opens
watch(
    () => props.modelValue,
    async (newVal) => {
        if (newVal) {
            // Reset states first
            showCoinDropGame.value = true;
            showGameBoard.value = false;
            showLobby.value = false;
            showHowToPlay.value = false;

            // Check if there's an intro video to show
            if (hasIntroVideo.value) {
                // Show video intro
                showIntroVideo.value = true;

                // In demo mode, use shorter intro (3s), in live mode use full intro (5s)
                const introDuration = props.demoMode ? 3000 : 5000;

                // ALWAYS set up timeout to show lobby after intro - regardless of video ref
                introTimeoutId = setTimeout(() => {
                    // Only show lobby if intro video is still showing (not skipped)
                    if (showIntroVideo.value) {
                        // Try to pause video if ref exists
                        if (introVideoRef.value) {
                            introVideoRef.value.pause();
                        }
                        // Hide video and show lobby with gradient background
                        showIntroVideo.value = false;
                        showLobby.value = true;
                    }
                    introTimeoutId = null;
                }, introDuration);
            } else {
                // No video, show lobby immediately
                showIntroVideo.value = false;
                showLobby.value = true;
            }

            // Play welcome sound (only in live mode, not in demo mode)
            if (coinDropAssets.welcomeSound && !props.demoMode) {
                // Wait for next tick to ensure audio element is rendered
                await new Promise(resolve => setTimeout(resolve, 100));

                if (welcomeAudio.value) {
                    try {
                        welcomeAudio.value.load();
                        welcomeAudio.value.currentTime = 0;
                        await welcomeAudio.value.play();
                    } catch (e) {
                        // Silently fail if audio can't play
                    }
                }
            }
        } else {
            // Reset intro video when modal closes
            if (introVideoRef.value) {
                introVideoRef.value.currentTime = 0;
                introVideoRef.value.pause();
            }
            // Reset all visibility states
            showCoinDropGame.value = true;
            showGameBoard.value = false;
            showLobby.value = false;
            showHowToPlay.value = false;
            showIntroVideo.value = false;
        }
    },
    { immediate: true }
);

// Start game from lobby
const startGame = () => {
    showLobby.value = false;
    showGameBoard.value = true;
};

// Back to lobby (demo mode)
const backToLobby = () => {
    showGameBoard.value = false;
    showLobby.value = true;
};

// Toggle how to play overlay
const toggleHowToPlay = () => {
    showHowToPlay.value = !showHowToPlay.value;
};

// Skip intro and go straight to lobby
const skipIntro = () => {
    // Clear the auto-transition timeout
    if (introTimeoutId) {
        clearTimeout(introTimeoutId);
        introTimeoutId = null;
    }
    // Stop video
    if (introVideoRef.value) {
        introVideoRef.value.pause();
    }
    // Go to lobby
    showIntroVideo.value = false;
    showLobby.value = true;
};

const onPrizeWon = (): void => {
    // Prize won - handled by game
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

onMounted(() => {
    window.addEventListener('keydown', onEsc);

    // Safety check: if modal is open and nothing is showing, force show lobby
    if (props.modelValue && !showIntroVideo.value && !showLobby.value && !showGameBoard.value) {
        showLobby.value = true;
    }
});

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
            <div v-if="demoMode" class="mb-4 flex items-center justify-center">
                <div class="flex items-center space-x-3 bg-gray-800 rounded-lg p-2">
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
                        Mobile
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
                        Desktop
                    </button>
                </div>
            </div>

            <!-- Main Container with unified background -->
            <div
                :class="[containerClasses, { 'demo-mode': demoMode }, 'modal-zoom-in', 'unified-bg']"
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
                            <span class="ml-4 text-gray-300">Coin Drop - Drop to Win!</span>
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
                    X
                </button>

                <!-- Video Background (only visible during intro) -->
                <Transition name="video-fade">
                    <div v-if="showIntroVideo" class="video-background" :style="{ zIndex: 0 }">
                        <video
                            ref="introVideoRef"
                            class="intro-video"
                            playsinline
                            autoplay
                            muted
                            preload="auto"
                            :src="props.assets.background"
                        >
                        </video>
                    </div>
                </Transition>

                <!-- Floating Title During Intro Video -->
                <Transition name="title-fade">
                    <div v-if="showIntroVideo" class="intro-title-floating" :style="{ zIndex: 3 }">
                        <img
                            v-if="coinDropAssets.titleImage"
                            :src="coinDropAssets.titleImage"
                            alt="Game Title"
                            class="intro-title-image"
                        />
                        <h1 v-else class="intro-title-text" :style="{ color: coinDropAssets.titleColor }">
                            {{ coinDropAssets.titleText || 'COIN DROP' }}
                        </h1>
                        <p class="intro-title-subtitle" :style="{ color: coinDropAssets.accentColor }">
                            Drop the coin to win!
                        </p>
                    </div>
                </Transition>

                <!-- Skip Intro Button -->
                <Transition name="fade">
                    <button
                        v-if="showIntroVideo"
                        @click="skipIntro"
                        class="skip-intro-btn"
                    >
                        Skip Intro →
                    </button>
                </Transition>

                <!-- Lobby Screen - MUST show before game board -->
                <Transition name="lobby-fade">
                    <div
                        v-if="showLobby"
                        class="lobby-screen"
                        :style="{
                            '--lobby-primary': coinDropAssets.primaryColor || '#e94560',
                            '--lobby-secondary': coinDropAssets.secondaryColor || '#1a1a2e'
                        }"
                    >
                        <div class="lobby-content">
                            <!-- Game Logo/Title -->
                            <div class="lobby-title-area">
                                <img
                                    v-if="coinDropAssets.titleImage"
                                    :src="coinDropAssets.titleImage"
                                    alt="Game Title"
                                    class="lobby-title-image"
                                />
                                <h1 v-else class="lobby-title" :style="{ color: coinDropAssets.titleColor }">
                                    {{ coinDropAssets.titleText || 'COIN DROP' }}
                                </h1>
                                <p class="lobby-subtitle" :style="{ color: coinDropAssets.accentColor }">
                                    Drop coins to win prizes!
                                </p>
                            </div>

                            <!-- Action Buttons -->
                            <div class="lobby-buttons">
                                <button
                                    @click="toggleHowToPlay"
                                    class="lobby-btn lobby-btn-secondary"
                                    :style="{
                                        '--btn-color': coinDropAssets.secondaryColor,
                                        '--btn-border': coinDropAssets.accentColor
                                    }"
                                >
                                    <svg class="btn-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                                        <circle cx="12" cy="12" r="10"/>
                                        <path d="M9.09 9a3 3 0 0 1 5.83 1c0 2-3 3-3 3"/>
                                        <line x1="12" y1="17" x2="12.01" y2="17"/>
                                    </svg>
                                    How to Play
                                </button>

                                <button
                                    @click="startGame"
                                    class="lobby-btn lobby-btn-primary"
                                    :style="{
                                        '--btn-color': coinDropAssets.primaryColor,
                                        '--btn-glow': coinDropAssets.accentColor
                                    }"
                                >
                                    <svg class="btn-icon" viewBox="0 0 24 24" fill="currentColor">
                                        <polygon points="5 3 19 12 5 21 5 3"/>
                                    </svg>
                                    Play {{ assets.name || 'Coin Drop' }}
                                </button>
                            </div>

                            <!-- Ticket Count Info -->
                            <div v-if="tickets && tickets.length > 0" class="lobby-ticket-info">
                                <span class="ticket-icon">🎟️</span>
                                <span>You have <strong :style="{ color: coinDropAssets.accentColor }">{{ tickets.length }}</strong> {{ tickets.length === 1 ? 'drop' : 'drops' }} available!</span>
                            </div>
                        </div>

                        <!-- How to Play Overlay -->
                        <Transition name="how-to-play-fade">
                            <div
                                v-if="showHowToPlay"
                                class="how-to-play-overlay"
                                @click.self="toggleHowToPlay"
                                :style="{
                                    '--htp-primary': coinDropAssets.primaryColor || '#e94560',
                                    '--htp-secondary': coinDropAssets.secondaryColor || '#1a1a2e'
                                }"
                            >
                                <div class="how-to-play-modal">
                                    <button @click="toggleHowToPlay" class="how-to-play-close">✕</button>

                                    <h2 class="how-to-play-title" :style="{ color: coinDropAssets.accentColor }">
                                        How to Play
                                    </h2>

                                    <div class="how-to-play-steps">
                                        <div class="step">
                                            <div class="step-number" :style="{ background: coinDropAssets.primaryColor }">1</div>
                                            <div class="step-content">
                                                <h3>Drop Your Coin</h3>
                                                <p>Tap the <strong>DROP</strong> button to release a coin from the top of the board.</p>
                                            </div>
                                        </div>

                                        <div class="step">
                                            <div class="step-number" :style="{ background: coinDropAssets.primaryColor }">2</div>
                                            <div class="step-content">
                                                <h3>Watch it Bounce</h3>
                                                <p>The coin bounces off pegs as it falls down the board.</p>
                                            </div>
                                        </div>

                                        <div class="step">
                                            <div class="step-number" :style="{ background: coinDropAssets.primaryColor }">3</div>
                                            <div class="step-content">
                                                <h3>Land in a Bucket</h3>
                                                <p>If your coin lands in a <strong :style="{ color: coinDropAssets.winBucketColor }">WIN</strong> bucket, you win a prize!</p>
                                            </div>
                                        </div>
                                    </div>

                                    <div class="how-to-play-tip">
                                        <span class="tip-icon">💡</span>
                                        <span>Each ticket gives you one drop. Good luck!</span>
                                    </div>

                                    <button
                                        @click="toggleHowToPlay"
                                        class="how-to-play-got-it"
                                        :style="{ background: coinDropAssets.primaryColor }"
                                    >
                                        Got it!
                                    </button>
                                </div>
                            </div>
                        </Transition>
                    </div>
                </Transition>

                <!-- Coin Drop Game Content -->
                <div
                    v-if="showCoinDropGame && showGameBoard"
                    :class="['flex flex-col relative coin-drop-game-wrapper overflow-hidden', demoMode ? 'flex-1' : 'h-full']"
                    :style="{
                        zIndex: 1,
                        '--game-bg': coinDropAssets.boardBgColor || '#1a1a2e',
                        '--game-primary': coinDropAssets.primaryColor || '#e94560',
                        '--game-accent': coinDropAssets.accentColor || '#ffd700'
                    }"
                >
                    <!-- Back to Lobby Button (Demo Mode) -->
                    <button
                        v-if="demoMode"
                        @click="backToLobby"
                        class="demo-back-btn"
                    >
                        ← Back to Lobby
                    </button>
                    <!-- Game Section - takes full space -->
                    <CoinDropGame
                        :coinDropAssets="coinDropAssets"
                        :demoMode="demoMode"
                        :previewMode="actualPreviewMode"
                        :tickets="tickets"
                        :playedTickets="playedTickets"
                        :instant_win_categories="instant_win_categories"
                        :animateTitle="hasIntroVideo"
                        :showGameBoard="showGameBoard"
                        @ticket-played="onTicketPlayed"
                        @prize-won="onPrizeWon"
                    />
                </div>

            </div>

            <!-- Preview Size Info -->
            <div v-if="demoMode" class="mt-2 text-center text-gray-400 text-xs">
                {{ actualPreviewMode === 'mobile' ? 'Mobile Preview (420x750)' : 'Desktop Preview (700x750)' }}
            </div>

            <!-- Welcome Sound -->
            <audio v-if="coinDropAssets.welcomeSound" ref="welcomeAudio" :src="coinDropAssets.welcomeSound" preload="auto"></audio>
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

/* Video fade out transition */
.video-fade-enter-active {
    transition: opacity 0.3s ease-out;
}

.video-fade-leave-active {
    transition: opacity 0.8s ease-out;
}

.video-fade-enter-from,
.video-fade-leave-to {
    opacity: 0;
}

/* ============================================
   SKIP INTRO BUTTON
   ============================================ */

.skip-intro-btn {
    position: absolute;
    bottom: 30px;
    right: 30px;
    z-index: 100;
    padding: 12px 24px;
    background: rgba(255, 255, 255, 0.15);
    backdrop-filter: blur(10px);
    border: 1px solid rgba(255, 255, 255, 0.3);
    border-radius: 30px;
    color: white;
    font-size: 14px;
    font-weight: 600;
    letter-spacing: 1px;
    cursor: pointer;
    transition: all 0.3s ease;
}

.skip-intro-btn:hover {
    background: rgba(255, 255, 255, 0.25);
    transform: translateX(5px);
}

/* ============================================
   LOBBY SCREEN
   ============================================ */

.lobby-screen {
    --lobby-primary: #e94560;
    --lobby-secondary: #1a1a2e;

    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    display: flex;
    align-items: center;
    justify-content: center;
    /* Transparent - uses unified background from parent */
    background: transparent;
    z-index: 50;
}

.lobby-content {
    text-align: center;
    padding: 30px;
    max-width: 400px;
    width: 100%;
}

.lobby-title-area {
    margin-bottom: 40px;
}

.lobby-title-image {
    max-width: 280px;
    max-height: 120px;
    margin: 0 auto 15px;
    filter: drop-shadow(0 0 30px rgba(255,215,0,0.5));
    animation: lobbyTitleFloat 3s ease-in-out infinite;
}

.lobby-title {
    font-size: 2.5rem;
    font-weight: 900;
    text-transform: uppercase;
    letter-spacing: 4px;
    margin: 0 0 15px 0;
    text-shadow:
        0 0 30px currentColor,
        0 0 60px currentColor,
        4px 4px 0 rgba(0,0,0,0.5);
    animation: lobbyTitleFloat 3s ease-in-out infinite;
}

.lobby-subtitle {
    font-size: 1.1rem;
    font-weight: 600;
    letter-spacing: 2px;
    text-transform: uppercase;
    margin: 0;
    opacity: 0.9;
}

@keyframes lobbyTitleFloat {
    0%, 100% { transform: translateY(0); }
    50% { transform: translateY(-8px); }
}

/* Lobby Buttons */
.lobby-buttons {
    display: flex;
    flex-direction: column;
    gap: 15px;
    margin-bottom: 30px;
}

.lobby-btn {
    display: flex;
    align-items: center;
    justify-content: center;
    gap: 12px;
    padding: 18px 30px;
    font-size: 1.1rem;
    font-weight: 800;
    letter-spacing: 1px;
    text-transform: uppercase;
    border: none;
    border-radius: 50px;
    cursor: pointer;
    transition: all 0.3s ease;
    position: relative;
    overflow: hidden;
}

.lobby-btn .btn-icon {
    width: 24px;
    height: 24px;
    flex-shrink: 0;
}

.lobby-btn-primary {
    --btn-color: #e94560;
    --btn-glow: #ffd700;

    background: linear-gradient(180deg, var(--btn-color) 0%, color-mix(in srgb, var(--btn-color) 70%, black) 100%);
    color: white;
    box-shadow:
        0 6px 0 color-mix(in srgb, var(--btn-color) 50%, black),
        0 10px 30px rgba(0, 0, 0, 0.4),
        0 0 40px color-mix(in srgb, var(--btn-glow) 50%, transparent);
    animation: primaryBtnPulse 2s ease-in-out infinite;
}

@keyframes primaryBtnPulse {
    0%, 100% {
        box-shadow:
            0 6px 0 color-mix(in srgb, var(--btn-color) 50%, black),
            0 10px 30px rgba(0, 0, 0, 0.4),
            0 0 40px color-mix(in srgb, var(--btn-glow) 50%, transparent);
        transform: scale(1);
    }
    50% {
        box-shadow:
            0 6px 0 color-mix(in srgb, var(--btn-color) 50%, black),
            0 10px 30px rgba(0, 0, 0, 0.4),
            0 0 60px color-mix(in srgb, var(--btn-glow) 70%, transparent);
        transform: scale(1.02);
    }
}

.lobby-btn-primary:hover {
    transform: translateY(-3px) scale(1.02);
    box-shadow:
        0 9px 0 color-mix(in srgb, var(--btn-color) 50%, black),
        0 15px 40px rgba(0, 0, 0, 0.5),
        0 0 60px var(--btn-glow);
}

.lobby-btn-primary:active {
    transform: translateY(2px);
    box-shadow:
        0 3px 0 color-mix(in srgb, var(--btn-color) 50%, black),
        0 5px 15px rgba(0, 0, 0, 0.4);
}

.lobby-btn-secondary {
    --btn-color: rgba(255,255,255,0.1);
    --btn-border: #ffd700;

    background: var(--btn-color);
    color: white;
    border: 2px solid var(--btn-border);
    box-shadow: 0 0 20px color-mix(in srgb, var(--btn-border) 30%, transparent);
}

.lobby-btn-secondary:hover {
    background: rgba(255,255,255,0.2);
    box-shadow: 0 0 30px color-mix(in srgb, var(--btn-border) 50%, transparent);
    transform: scale(1.02);
}

/* Ticket Info */
.lobby-ticket-info {
    display: flex;
    align-items: center;
    justify-content: center;
    gap: 10px;
    padding: 15px 25px;
    background: rgba(255,255,255,0.1);
    border-radius: 30px;
    font-size: 1rem;
    color: rgba(255,255,255,0.9);
    backdrop-filter: blur(10px);
    border: 1px solid rgba(255,255,255,0.1);
}

.ticket-icon {
    font-size: 1.5rem;
}

/* ============================================
   HOW TO PLAY OVERLAY
   ============================================ */

.how-to-play-overlay {
    --htp-primary: #e94560;
    --htp-secondary: #1a1a2e;

    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    background: radial-gradient(ellipse at center, color-mix(in srgb, var(--htp-secondary) 90%, black) 0%, rgba(0,0,0,0.95) 100%);
    backdrop-filter: blur(8px);
    display: flex;
    align-items: center;
    justify-content: center;
    z-index: 100;
    padding: 20px;
}

.how-to-play-modal {
    background:
        radial-gradient(ellipse at top, color-mix(in srgb, var(--htp-primary) 20%, transparent) 0%, transparent 50%),
        linear-gradient(180deg, color-mix(in srgb, var(--htp-secondary) 100%, #2a2a4a) 0%, var(--htp-secondary) 100%);
    border-radius: 24px;
    padding: 35px;
    max-width: 400px;
    width: 100%;
    position: relative;
    box-shadow:
        0 25px 80px rgba(0,0,0,0.5),
        0 0 0 1px rgba(255,255,255,0.1);
    animation: modalSlideIn 0.4s cubic-bezier(0.34, 1.56, 0.64, 1);
}

@keyframes modalSlideIn {
    0% {
        transform: scale(0.8) translateY(30px);
        opacity: 0;
    }
    100% {
        transform: scale(1) translateY(0);
        opacity: 1;
    }
}

.how-to-play-close {
    position: absolute;
    top: 15px;
    right: 15px;
    width: 36px;
    height: 36px;
    border: none;
    background: rgba(255,255,255,0.1);
    color: white;
    font-size: 1.2rem;
    border-radius: 50%;
    cursor: pointer;
    transition: all 0.2s;
    display: flex;
    align-items: center;
    justify-content: center;
}

.how-to-play-close:hover {
    background: rgba(255,255,255,0.2);
    transform: scale(1.1);
}

.how-to-play-title {
    font-size: 1.8rem;
    font-weight: 900;
    text-transform: uppercase;
    letter-spacing: 3px;
    text-align: center;
    margin: 0 0 30px 0;
    text-shadow: 0 0 20px currentColor;
}

.how-to-play-steps {
    display: flex;
    flex-direction: column;
    gap: 20px;
    margin-bottom: 25px;
}

.step {
    display: flex;
    gap: 15px;
    align-items: flex-start;
}

.step-number {
    width: 36px;
    height: 36px;
    border-radius: 50%;
    display: flex;
    align-items: center;
    justify-content: center;
    font-weight: 900;
    font-size: 1.1rem;
    color: white;
    flex-shrink: 0;
    box-shadow: 0 4px 15px rgba(0,0,0,0.3);
}

.step-content h3 {
    font-size: 1rem;
    font-weight: 700;
    color: white;
    margin: 0 0 5px 0;
}

.step-content p {
    font-size: 0.9rem;
    color: rgba(255,255,255,0.7);
    margin: 0;
    line-height: 1.5;
}

.how-to-play-tip {
    display: flex;
    align-items: center;
    gap: 10px;
    padding: 15px;
    background: rgba(255,215,0,0.1);
    border-radius: 12px;
    border: 1px solid rgba(255,215,0,0.2);
    margin-bottom: 25px;
    font-size: 0.9rem;
    color: rgba(255,255,255,0.9);
}

.tip-icon {
    font-size: 1.3rem;
}

.how-to-play-got-it {
    width: 100%;
    padding: 16px;
    font-size: 1.1rem;
    font-weight: 800;
    text-transform: uppercase;
    letter-spacing: 2px;
    color: white;
    border: none;
    border-radius: 50px;
    cursor: pointer;
    transition: all 0.3s;
    box-shadow: 0 4px 20px rgba(0,0,0,0.3);
}

.how-to-play-got-it:hover {
    transform: translateY(-2px);
    box-shadow: 0 8px 30px rgba(0,0,0,0.4);
}

/* ============================================
   TRANSITIONS
   ============================================ */

.lobby-fade-enter-active {
    animation: lobbyFadeIn 0.5s ease-out;
}

.lobby-fade-leave-active {
    animation: lobbyFadeIn 0.3s ease-in reverse;
}

@keyframes lobbyFadeIn {
    0% {
        opacity: 0;
    }
    100% {
        opacity: 1;
    }
}

.how-to-play-fade-enter-active {
    transition: opacity 0.3s;
}

.how-to-play-fade-leave-active {
    transition: opacity 0.2s;
}

.how-to-play-fade-enter-from,
.how-to-play-fade-leave-to {
    opacity: 0;
}

/* ============================================
   INTRO TITLE (During Video)
   ============================================ */

.intro-title-floating {
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
    text-align: center;
    z-index: 3;
    pointer-events: none;
}

.intro-title-image {
    max-width: 350px;
    max-height: 150px;
    margin-bottom: 15px;
    filter: drop-shadow(0 0 40px rgba(255,215,0,0.6));
    animation: introTitleZoom 1.2s cubic-bezier(0.34, 1.56, 0.64, 1) forwards;
}

.intro-title-text {
    font-size: 3.5rem;
    font-weight: 900;
    text-transform: uppercase;
    letter-spacing: 6px;
    margin: 0 0 15px 0;
    text-shadow:
        0 0 40px currentColor,
        0 0 80px currentColor,
        5px 5px 0 rgba(0,0,0,0.5);
    animation: introTitleZoom 1.2s cubic-bezier(0.34, 1.56, 0.64, 1) forwards;
}

.intro-title-subtitle {
    font-size: 1.3rem;
    font-weight: 700;
    text-transform: uppercase;
    letter-spacing: 3px;
    margin: 0;
    text-shadow: 0 0 20px currentColor;
    animation: introSubtitleFade 1s ease-out 0.5s both;
}

@keyframes introTitleZoom {
    0% {
        transform: scale(3);
        opacity: 0;
        filter: brightness(2) drop-shadow(0 0 60px rgba(255,215,0,0.8));
    }
    30% {
        opacity: 1;
    }
    60% {
        transform: scale(0.95);
    }
    100% {
        transform: scale(1);
        opacity: 1;
        filter: brightness(1) drop-shadow(0 0 40px rgba(255,215,0,0.6));
    }
}

@keyframes introSubtitleFade {
    0% {
        opacity: 0;
        transform: translateY(20px);
    }
    100% {
        opacity: 1;
        transform: translateY(0);
    }
}

.title-fade-enter-active {
    animation: titleFadeIn 0.3s ease-out;
}

.title-fade-leave-active {
    animation: titleFadeOut 0.5s ease-in forwards;
}

@keyframes titleFadeIn {
    from { opacity: 0; }
    to { opacity: 1; }
}

@keyframes titleFadeOut {
    0% {
        opacity: 1;
        transform: translate(-50%, -50%) scale(1);
    }
    100% {
        opacity: 0;
        transform: translate(-50%, -50%) scale(0.8);
    }
}

/* Mobile responsive */
@media (max-width: 550px) {
    .intro-title-image {
        max-width: 250px;
        max-height: 100px;
    }

    .intro-title-text {
        font-size: 2.2rem;
        letter-spacing: 4px;
    }

    .intro-title-subtitle {
        font-size: 1rem;
    }
}

/* ============================================
   GAME BOARD BACKGROUND - transparent, uses parent bg
   ============================================ */

.coin-drop-game-wrapper {
    --game-bg: #1a1a2e;
    --game-primary: #e94560;
    --game-accent: #ffd700;

    background: transparent;
}

/* Demo Back Button */
.demo-back-btn {
    position: absolute;
    top: 10px;
    left: 10px;
    z-index: 50;
    padding: 8px 16px;
    font-size: 0.85rem;
    font-weight: 600;
    color: rgba(255,255,255,0.9);
    background: rgba(0,0,0,0.6);
    border: 1px solid rgba(255,255,255,0.2);
    border-radius: 20px;
    cursor: pointer;
    transition: all 0.2s;
    backdrop-filter: blur(10px);
}

.demo-back-btn:hover {
    background: rgba(0,0,0,0.8);
    border-color: rgba(255,255,255,0.4);
    transform: translateX(-2px);
}

/* Video Background - stays as background after pausing */
.video-background {
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    z-index: 0;
    background: #000;
    display: flex;
    align-items: center;
    justify-content: center;
    overflow: hidden;
}

.intro-video {
    width: 100%;
    height: 100%;
    object-fit: cover;
    min-height: 100%;
    min-width: 100%;
}

/* Demo mode: video should cover entire container including chrome */
.demo-mode .video-background {
    top: 0;
    bottom: 0;
    left: 0;
    right: 0;
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

/* Unified background for entire modal */
.unified-bg {
    background:
        radial-gradient(ellipse at center top, rgba(255, 215, 0, 0.12) 0%, transparent 40%),
        radial-gradient(ellipse at center bottom, rgba(233, 69, 96, 0.15) 0%, transparent 50%),
        linear-gradient(180deg, #1a1a2e 0%, #0f0f1a 100%);
}

/* Demo mode: ensure content fills container properly */
.demo-mode {
    display: flex;
    flex-direction: column;
}

.demo-mode .coin-drop-game-wrapper {
    flex: 1;
    min-height: 0;
    overflow: hidden;
}
</style>
