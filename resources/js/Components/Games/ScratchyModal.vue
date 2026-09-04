<script setup lang="ts">
import { computed, nextTick, onMounted, onUnmounted, ref, watch } from 'vue';
import ScratchyGame from './ScratchyGame.vue';
import { Swiper, SwiperSlide } from 'swiper/vue';
import { Pagination, Autoplay, Navigation } from 'swiper/modules';
import 'swiper/css';
import 'swiper/css/pagination';

interface ScratchyAssets {
    name?: string;
    background?: string;
    overlay?: string;
    header?: string;
    textColour?: string;
    wonTextColour?: string;
    loseTextColour?: string;
    accentColour?: string;
    scratchyLayout?: string;
    scratchyCardBg?: string;
    scratchyCardBorder?: string;
    scratchyTitleText?: string;
    scratchyTitleColor?: string;
    scratchSound?: string;
    welcomeSound?: string;
    winSound?: string;
    lossSound?: string;
    scratchySurfaceColor?: string;
    scratchyContainerBg?: string;
    scratchyButtonColor?: string;
    scratchyIntroVideo?: string;
    scratchyShowTopPrize?: boolean;
}

const props = withDefaults(defineProps<{
    modelValue: boolean;
    demoMode?: boolean;
    assets: ScratchyAssets;
    tickets: any[];
    instant_win_categories?: any[];
    previewMode?: 'mobile' | 'desktop';
}>(), {
    demoMode: false,
    previewMode: 'desktop',
});

const emit = defineEmits(['update:modelValue']);

// State
const showLobby = ref(true);
const showGameBoard = ref(false);
const showHowToPlay = ref(false);
const introPhase = ref(true); // Logo-only black screen phase
const demoPreviewMode = ref<'mobile' | 'desktop'>('mobile');
let welcomeAudio: HTMLAudioElement | null = null;
let introTimeout: ReturnType<typeof setTimeout> | null = null;

// Win summary state
interface CollectedWin {
    ticketNumber: string;
    prize: string;
    value: number;
    image: string;
    categoryName: string;
}

const showWinSummary = ref(false);
const collectedWins = ref<CollectedWin[]>([]);
const swiperModules = [Pagination, Autoplay, Navigation];

const totalWinnings = computed(() => {
    return collectedWins.value.reduce((sum, w) => sum + w.value, 0);
});

function onWinsCollected(wins: CollectedWin[]) {
    if (wins.length === 0) return;
    collectedWins.value = wins;
    showWinSummary.value = true;
}

function closeWinSummary() {
    showWinSummary.value = false;
}

const actualPreviewMode = computed(() => {
    if (props.demoMode) return demoPreviewMode.value;
    return props.previewMode || 'desktop';
});

const modalStyle = computed(() => {
    if (!props.demoMode) {
        return { width: '100vw', height: '100vh' };
    }
    return actualPreviewMode.value === 'mobile'
        ? { width: '420px', height: '750px', border: '1px solid #444', borderRadius: '12px' }
        : { width: '700px', height: '750px', border: '1px solid #444', borderRadius: '4px' };
});

const containerClasses = computed(() => {
    return ['relative', props.demoMode ? 'shadow-lg overflow-hidden' : 'w-full h-full overflow-hidden'];
});

// Pass all fields through to the game
const gameAssets = computed(() => ({
    overlay: props.assets.overlay || '',
    textColour: props.assets.textColour || '#eeeeee',
    wonTextColour: props.assets.wonTextColour || '#ffffff',
    loseTextColour: props.assets.loseTextColour || '#000000',
    accentColour: props.assets.accentColour || '#52b77b',
    scratchyLayout: props.assets.scratchyLayout || 'single',
    scratchyCardBg: props.assets.scratchyCardBg || 'transparent',
    scratchyCardBorder: props.assets.scratchyCardBorder || 'transparent',
    scratchyTitleText: props.assets.scratchyTitleText || '',
    scratchyTitleColor: props.assets.scratchyTitleColor || '#ffffff',
    scratchSound: props.assets.scratchSound || '',
    welcomeSound: props.assets.welcomeSound || '',
    winSound: props.assets.winSound || '',
    lossSound: props.assets.lossSound || '',
    scratchySurfaceColor: props.assets.scratchySurfaceColor || '',
    scratchyContainerBg: props.assets.scratchyContainerBg || 'transparent',
    scratchyButtonColor: props.assets.scratchyButtonColor || '',
}));

const introVideoRef = ref<HTMLVideoElement | null>(null);
const showIntroVideo = ref(false);

// Mobile scroll arrows for the game board (single-canvas scratch layout blocks native touch-drag scroll).
// The actual scrolling element isn't always the .game-wrapper div itself — on some mobile browsers
// (iOS Safari's dynamic toolbar in particular) percentage/vh heights inside the fixed modal don't
// resolve to a definite height, so the wrapper never actually overflows and the *document* scrolls
// instead. Detect whichever element is really scrollable at the time and act on that one.
const gameWrapperRef = ref<HTMLElement | null>(null);
const isAtTop = ref(true);
const isAtBottom = ref(false);
let resizeObserver: ResizeObserver | null = null;

function getScrollEl(): HTMLElement | null {
    const el = gameWrapperRef.value;
    if (el && el.scrollHeight - el.clientHeight > 2) return el;
    const doc = document.scrollingElement as HTMLElement | null;
    if (doc && doc.scrollHeight - doc.clientHeight > 2) return doc;
    // Neither is actually scrollable right now — still return the wrapper (if present)
    // so scrollBy/disabled-state calls have a consistent, harmless target.
    return el ?? doc;
}

function updateScrollState() {
    const el = getScrollEl();
    if (!el) {
        isAtTop.value = true;
        isAtBottom.value = true;
        return;
    }
    isAtTop.value = el.scrollTop <= 1;
    isAtBottom.value = el.scrollTop + el.clientHeight >= el.scrollHeight - 1;
}

function scrollGameWrapper(amount: number) {
    const el = getScrollEl();
    if (!el) return;
    el.scrollBy({ top: amount, behavior: 'smooth' });
    // The scroll may complete asynchronously (smooth scroll) or the 'scroll' event may lag —
    // recheck a few times shortly after so the disabled state can't get stuck.
    requestAnimationFrame(updateScrollState);
    setTimeout(updateScrollState, 150);
    setTimeout(updateScrollState, 400);
}

watch(showGameBoard, async (val) => {
    window.removeEventListener('scroll', updateScrollState);
    gameWrapperRef.value?.removeEventListener('scroll', updateScrollState);
    if (resizeObserver) {
        resizeObserver.disconnect();
        resizeObserver = null;
    }
    if (val) {
        await nextTick();
        window.addEventListener('scroll', updateScrollState, { passive: true });
        gameWrapperRef.value?.addEventListener('scroll', updateScrollState, { passive: true });
        // Content (canvases/images) can keep resizing after mount — recompute whenever it does,
        // instead of trusting a single post-mount measurement.
        resizeObserver = new ResizeObserver(() => updateScrollState());
        if (gameWrapperRef.value) resizeObserver.observe(gameWrapperRef.value);
        updateScrollState();
    }
});

// Check if there's an intro video/animation
const hasIntroVideo = computed(() => {
    if (!props.assets.scratchyIntroVideo) return false;
    return true;
});

const isIntroVideoType = computed(() => {
    if (!props.assets.scratchyIntroVideo) return false;
    const videoExtensions = ['.mp4', '.webm', '.ogg', '.mov'];
    return videoExtensions.some(ext => props.assets.scratchyIntroVideo!.toLowerCase().endsWith(ext));
});

const showTopPrize = computed(() => props.assets.scratchyShowTopPrize !== false);
const accentColor = computed(() => props.assets.accentColour || '#52b77b');
const titleColor = computed(() => props.assets.scratchyTitleColor || '#ffffff');
const bgColor = computed(() => props.assets.scratchyContainerBg || 'transparent');
const cardBorder = computed(() => props.assets.scratchyCardBorder || 'transparent');

// Top prize from instant_win_categories (same pattern as CoinDropGame.vue)
const topPrize = computed(() => {
    if (!props.instant_win_categories || props.instant_win_categories.length === 0) return null;
    // Prefer non-ticket-bundle categories for top prize (bundles have ticket counts, not £ values)
    const nonBundle = props.instant_win_categories.filter((cat: any) => cat.prize_type !== 'ticket_bundle');
    const pool = nonBundle.length > 0 ? nonBundle : props.instant_win_categories;
    const top = pool.reduce((max: any, cat: any) =>
        (cat.value > (max?.value || 0)) ? cat : max, pool[0]);
    return top ? {
        ...top,
        isNoAutoCredit: top.no_auto_credit === true || top.physical_prize === true,
        isTicketBundle: top.prize_type === 'ticket_bundle',
    } : null;
});

// Animated ticket count (counts up from 0)
const displayTicketCount = ref(0);
let countInterval: ReturnType<typeof setInterval> | null = null;

// Start the lobby sequence (logo intro + count-up)
function startLobbySequence() {
    showLobby.value = true;
    showGameBoard.value = false;
    showHowToPlay.value = false;
    introPhase.value = true;

    // Play welcome sound
    const soundUrl = props.assets.welcomeSound;
    if (soundUrl) {
        try {
            welcomeAudio = new Audio(soundUrl);
            welcomeAudio.volume = 0.5;
            welcomeAudio.play().catch(() => {});
        } catch { /* silent */ }
    }

    // After intro, reveal full lobby
    if (introTimeout) clearTimeout(introTimeout);
    introTimeout = setTimeout(() => {
        introPhase.value = false;
        // Start count-up animation after intro
        displayTicketCount.value = 0;
        if (countInterval) clearInterval(countInterval);
        const target = props.tickets?.length || 0;
        if (target > 0) {
            const step = Math.max(1, Math.floor(target / 20));
            const delay = Math.max(30, Math.floor(600 / target));
            countInterval = setInterval(() => {
                displayTicketCount.value = Math.min(displayTicketCount.value + step, target);
                if (displayTicketCount.value >= target) {
                    displayTicketCount.value = target;
                    if (countInterval) clearInterval(countInterval);
                }
            }, delay);
        }
    }, 1800);
}

// Reset when modal opens
watch(
    () => props.modelValue,
    async (newVal) => {
        if (newVal) {
            // Show intro video as background (also in demo mode so admins can preview)
            if (hasIntroVideo.value) {
                showIntroVideo.value = true;

                // Wait for video element to render
                await new Promise(resolve => setTimeout(resolve, 100));

                if (isIntroVideoType.value && introVideoRef.value) {
                    const videoEl = introVideoRef.value;
                    videoEl.currentTime = 0;
                    // Try with audio first (works if user gesture is recent), fall back to muted
                    videoEl.muted = false;
                    videoEl.play().catch(() => {
                        videoEl.muted = true;
                        videoEl.play().catch(() => {});
                    });
                }

                // Fade out intro video after 5 seconds
                setTimeout(() => {
                    showIntroVideo.value = false;
                    if (isIntroVideoType.value && introVideoRef.value) {
                        introVideoRef.value.pause();
                    }
                }, 5000);
            } else {
                showIntroVideo.value = false;
            }

            // Start lobby simultaneously (logo + content animate on top of video)
            startLobbySequence();
        } else {
            showIntroVideo.value = false;
            if (isIntroVideoType.value && introVideoRef.value) {
                introVideoRef.value.currentTime = 0;
                introVideoRef.value.pause();
            }
            if (countInterval) clearInterval(countInterval);
            if (introTimeout) clearTimeout(introTimeout);
            if (welcomeAudio) { welcomeAudio.pause(); welcomeAudio = null; }
        }
    },
    { immediate: true }
);

function startGame() {
    showLobby.value = false;
    showGameBoard.value = true;
}

function backToLobby() {
    showGameBoard.value = false;
    startLobbySequence();
}

function toggleHowToPlay() {
    showHowToPlay.value = !showHowToPlay.value;
}

function togglePreviewMode() {
    demoPreviewMode.value = demoPreviewMode.value === 'mobile' ? 'desktop' : 'mobile';
}

function close() {
    if (!props.demoMode) {
        emit('update:modelValue', false);
    }
}

function onEsc(e: KeyboardEvent) {
    if (e.key === 'Escape' && !props.demoMode) close();
}

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
                    demoMode ? 'relative max-w-full mx-auto' : 'fixed inset-0'
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
                            actualPreviewMode === 'mobile' ? 'bg-blue-500 text-white' : 'bg-gray-600 text-gray-300 hover:bg-gray-500'
                        ]"
                    >Mobile</button>
                    <button
                        @click="togglePreviewMode"
                        :class="[
                            'px-3 py-1 rounded text-sm font-medium transition-colors',
                            actualPreviewMode === 'desktop' ? 'bg-blue-500 text-white' : 'bg-gray-600 text-gray-300 hover:bg-gray-500'
                        ]"
                    >Desktop</button>
                </div>

                <!-- Main Container -->
                <div
                    :class="[containerClasses, { 'demo-mode': demoMode }, 'modal-zoom-in', 'unified-bg']"
                    :style="{
                        ...modalStyle,
                        '--bg-image': assets.background ? `url(${assets.background})` : 'none',
                        '--bg-color': '#1a1a2e',
                        '--accent': accentColor,
                        '--card-border': cardBorder,
                    }"
                    @click.stop
                >
                    <!-- Device Chrome (Demo Mode) -->
                    <template v-if="demoMode">
                        <div v-if="actualPreviewMode === 'mobile'" class="h-8 bg-black flex items-center justify-between px-4 text-white text-sm">
                            <span>9:41</span>
                            <div class="flex space-x-1">
                                <div class="w-4 h-2 border border-white rounded-sm"></div>
                                <div class="w-1 h-2 bg-white rounded-sm"></div>
                            </div>
                        </div>
                        <div v-if="actualPreviewMode === 'desktop'" class="h-10 bg-gray-700 flex items-center justify-between px-4 text-white text-sm border-b border-gray-600">
                            <div class="flex items-center space-x-2">
                                <div class="flex space-x-1">
                                    <div class="w-3 h-3 bg-red-500 rounded-full"></div>
                                    <div class="w-3 h-3 bg-yellow-500 rounded-full"></div>
                                    <div class="w-3 h-3 bg-green-500 rounded-full"></div>
                                </div>
                                <span class="ml-4 text-gray-300">Scratch Card - Scratch to Win!</span>
                            </div>
                            <div class="text-gray-400 text-xs">Chrome</div>
                        </div>
                    </template>

                    <!-- Close Button -->
                    <button
                        v-if="!demoMode"
                        class="absolute top-4 right-4 text-gray-700 bg-white/90 hover:bg-white rounded-full w-10 h-10 flex items-center justify-center focus:outline-none text-2xl z-50 shadow-lg transition-all duration-200 hover:scale-110"
                        @click="close"
                        aria-label="Close"
                    >X</button>

                    <!-- ========== INTRO VIDEO ========== -->
                    <Transition name="fade">
                        <div v-if="showIntroVideo && hasIntroVideo" class="intro-video-overlay">
                            <video
                                v-if="isIntroVideoType"
                                ref="introVideoRef"
                                class="intro-video"
                                playsinline
                                preload="auto"
                                :src="assets.scratchyIntroVideo"
                            />
                            <img
                                v-else
                                :src="assets.scratchyIntroVideo"
                                class="intro-video"
                                alt="Intro"
                            />
                        </div>
                    </Transition>

                    <!-- ========== LOBBY SCREEN ========== -->
                    <Transition name="lobby-fade">
                        <div
                            v-if="showLobby"
                            class="lobby-screen"
                            :style="{
                                '--lobby-accent': accentColor,
                                '--lobby-border': cardBorder,
                            }"
                        >
                            <!-- Shimmer particles background -->
                            <div class="shimmer-particles" :class="{ 'shimmer-visible': !introPhase }">
                                <div v-for="n in 8" :key="'shimmer-'+n" class="shimmer-dot" :style="{ '--shimmer-i': n, '--shimmer-accent': accentColor }" />
                            </div>

                            <!-- ===== INTRO PHASE: Logo Only on Black ===== -->
                            <div class="lobby-content" :class="{ 'intro-active': introPhase }">
                                <!-- Header Image with Glow Halo — always visible, centered during intro -->
                                <div v-if="assets.header" class="lobby-logo-wrapper" :class="{ 'logo-intro': introPhase, 'logo-settled': !introPhase }" :style="{ '--accent': accentColor }">
                                    <img
                                        :src="assets.header"
                                        alt="Game Header"
                                        class="lobby-header-image"
                                    />
                                </div>

                                <!-- Everything below only appears after intro phase ends -->
                                <Transition name="lobby-reveal">
                                    <div v-if="!introPhase" class="lobby-rest">
                                        <!-- Title Area (only if custom title text is set) -->
                                        <div v-if="assets.scratchyTitleText" class="lobby-title-area lobby-stagger-1">
                                            <div class="title-banner">
                                                <h1 class="lobby-title" :style="{ color: titleColor }">
                                                    {{ assets.scratchyTitleText }}
                                                </h1>
                                            </div>
                                        </div>

                                        <!-- Top Prize Badge -->
                                        <div v-if="topPrize && showTopPrize" class="top-prize-badge lobby-stagger-2" :style="{ '--prize-accent': accentColor }">
                                            <div class="prize-sparkle-ring">
                                                <img v-if="topPrize.image_path" :src="topPrize.image_path" :alt="topPrize.name" class="prize-image" />
                                                <img v-else-if="assets.header" :src="assets.header" :alt="topPrize.name" class="prize-image" />
                                                <div v-else class="prize-placeholder" :style="{ color: accentColor }">&#9733;</div>
                                            </div>
                                            <div class="prize-details">
                                                <span class="prize-label">TOP PRIZE</span>
                                                <span class="prize-value" :style="{ color: accentColor }">
                                                    <template v-if="topPrize.isTicketBundle">{{ Math.floor(topPrize.value) }} Free Ticket{{ topPrize.value != 1 ? 's' : '' }}</template>
                                                    <template v-else>{{ topPrize.isNoAutoCredit ? 'Up to ' : '' }}&pound;{{ topPrize.value }}</template>
                                                </span>
                                                <span class="prize-name">{{ topPrize.name }}</span>
                                            </div>
                                        </div>

                                        <!-- Ticket Counter -->
                                        <div v-if="tickets && tickets.length > 0" class="lobby-ticket-display lobby-stagger-3">
                                            <div class="ticket-count-circle" :style="{ '--circle-color': accentColor }">
                                                <span class="ticket-number">{{ displayTicketCount }}</span>
                                                <span class="ticket-label">cards</span>
                                            </div>
                                            <p class="ticket-prompt">waiting to be scratched!</p>
                                        </div>

                                        <!-- Action Buttons -->
                                        <div class="lobby-buttons lobby-stagger-4">
                                            <button
                                                @click="startGame"
                                                class="lobby-btn lobby-btn-primary"
                                                :style="{
                                                    '--btn-color': accentColor,
                                                    '--btn-glow': accentColor
                                                }"
                                            >
                                                <span class="btn-icon">
                                                    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5"><path d="M12 2L15 8H9L12 2Z" stroke-linecap="round" stroke-linejoin="round"/><circle cx="12" cy="14" r="6"/><path d="M9 14L11 16L15 12" stroke-linecap="round" stroke-linejoin="round"/></svg>
                                                </span>
                                                <span class="btn-text">Let's Scratch!</span>
                                            </button>

                                            <button
                                                @click="toggleHowToPlay"
                                                class="lobby-btn-help"
                                                :style="{ '--help-color': accentColor }"
                                            >
                                                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                                                    <circle cx="12" cy="12" r="10"/>
                                                    <path d="M9.09 9a3 3 0 0 1 5.83 1c0 2-3 3-3 3"/>
                                                    <line x1="12" y1="17" x2="12.01" y2="17"/>
                                                </svg>
                                                How to Play
                                            </button>
                                        </div>
                                    </div>
                                </Transition>
                            </div>

                            <!-- How to Play Overlay -->
                            <Transition name="htp-fade">
                                <div
                                    v-if="showHowToPlay"
                                    class="htp-overlay"
                                    @click.self="toggleHowToPlay"
                                >
                                    <div class="htp-modal">
                                        <button @click="toggleHowToPlay" class="htp-close">X</button>

                                        <h2 class="htp-title" :style="{ color: accentColor }">How to Play</h2>

                                        <div class="htp-steps">
                                            <div class="step">
                                                <div class="step-number" :style="{ background: accentColor }">1</div>
                                                <div class="step-content">
                                                    <h3>Scratch the Surface</h3>
                                                    <p>Drag your finger or mouse across the silver surface to scratch it off.</p>
                                                </div>
                                            </div>
                                            <div class="step">
                                                <div class="step-number" :style="{ background: accentColor }">2</div>
                                                <div class="step-content">
                                                    <h3>Reveal Your Prize</h3>
                                                    <p>Once enough is scratched, the card auto-reveals what's underneath!</p>
                                                </div>
                                            </div>
                                            <div class="step">
                                                <div class="step-number" :style="{ background: accentColor }">3</div>
                                                <div class="step-content">
                                                    <h3>Collect Winnings</h3>
                                                    <p>Winning tickets are added to your account instantly!</p>
                                                </div>
                                            </div>
                                        </div>

                                        <div class="htp-tip">
                                            <span class="tip-icon">💡</span>
                                            <span>Use "Reveal All" to scratch all cards at once!</span>
                                        </div>

                                        <button @click="toggleHowToPlay" class="htp-got-it" :style="{ background: accentColor }">
                                            Got it!
                                        </button>
                                    </div>
                                </div>
                            </Transition>
                        </div>
                    </Transition>

                    <!-- Mobile scroll arrows (single-canvas scratch layout blocks native touch-drag scroll) -->
                    <button
                        v-if="showGameBoard"
                        type="button"
                        class="game-scroll-arrow game-scroll-arrow-up md:hidden"
                        :disabled="isAtTop"
                        @click="scrollGameWrapper(-300)"
                        aria-label="Scroll up"
                    >
                        <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round"><polyline points="18 15 12 9 6 15"/></svg>
                    </button>
                    <button
                        v-if="showGameBoard"
                        type="button"
                        class="game-scroll-arrow game-scroll-arrow-down md:hidden"
                        :disabled="isAtBottom"
                        @click="scrollGameWrapper(300)"
                        aria-label="Scroll down"
                    >
                        <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round"><polyline points="6 9 12 15 18 9"/></svg>
                    </button>

                    <!-- ========== GAME BOARD ========== -->
                    <div
                        v-if="showGameBoard"
                        ref="gameWrapperRef"
                        :class="['flex flex-col relative game-wrapper overflow-y-auto overflow-x-hidden', demoMode ? 'flex-1' : 'h-full']"
                    >
                        <!-- Back to Lobby (Demo Mode) -->
                        <button v-if="demoMode" @click="backToLobby" class="demo-back-btn">Back to Lobby</button>

                        <!-- Header Image -->
                        <img
                            v-if="assets.header"
                            :src="assets.header"
                            class="mx-auto max-w-[200px] w-auto h-auto object-contain mt-2 mb-1 pointer-events-none relative z-10"
                            alt="Game Header"
                        />

                        <!-- Game -->
                        <div class="flex items-center justify-center relative z-10">
                            <ScratchyGame :assets="gameAssets" :tickets="tickets" :instant_win_categories="instant_win_categories" @wins-collected="onWinsCollected" />
                        </div>

                        <!-- Top Prize Banner -->
                        <div v-if="topPrize && showTopPrize" class="top-prize-banner relative z-10 mx-4 my-2">
                            <div class="flex items-center justify-center gap-3 px-4 py-2.5 rounded-xl" :style="{ backgroundColor: 'rgba(0,0,0,0.5)', border: `2px solid ${accentColor}`, boxShadow: `0 0 15px ${accentColor}40` }">
                                <img v-if="topPrize.image_path" :src="topPrize.image_path" :alt="topPrize.name" class="w-10 h-10 object-contain rounded-lg" />
                                <img v-else-if="assets.header" :src="assets.header" :alt="topPrize.name" class="w-10 h-10 object-contain rounded-lg" />
                                <div class="flex flex-col items-center">
                                    <span class="text-[10px] uppercase tracking-widest font-bold text-gray-300">Top Prize</span>
                                    <span class="text-lg font-black" :style="{ color: accentColor }">
                                        <template v-if="topPrize.isTicketBundle">{{ Math.floor(topPrize.value) }} Free Ticket{{ topPrize.value != 1 ? 's' : '' }}</template>
                                        <template v-else>{{ topPrize.isNoAutoCredit ? 'Up to ' : '' }}&pound;{{ topPrize.value }}</template>
                                    </span>
                                </div>
                                <span class="text-xs font-semibold text-white/80">{{ topPrize.name }}</span>
                            </div>
                        </div>

                        <!-- Close button at bottom -->
                        <div v-if="!demoMode" class="flex justify-center pt-2 pb-4 relative z-10">
                            <UiButton @click="close" variant="danger" class="px-6 py-2">Close</UiButton>
                        </div>
                    </div>

                    <!-- ========== WIN SUMMARY OVERLAY ========== -->
                    <Transition name="win-summary">
                        <div v-if="showWinSummary" class="win-summary-overlay" @click.self="closeWinSummary">
                            <div class="win-summary-modal" :style="{ '--ws-accent': accentColor }">
                                <!-- Close -->
                                <button class="win-summary-close" @click="closeWinSummary">X</button>

                                <!-- Header -->
                                <div class="win-summary-header">
                                    <h2 class="win-summary-title" :style="{ color: accentColor }">You Won!</h2>
                                    <p class="win-summary-subtitle">{{ collectedWins.length }} win{{ collectedWins.length !== 1 ? 's' : '' }} from {{ tickets.length }} cards</p>
                                </div>

                                <!-- Swiper Carousel -->
                                <div class="win-summary-carousel">
                                    <Swiper
                                        :modules="swiperModules"
                                        :pagination="{ type: 'fraction' }"
                                        :navigation="{ nextEl: '.win-nav-next', prevEl: '.win-nav-prev' }"
                                        :autoplay="{ delay: 3000, disableOnInteraction: true }"
                                        :space-between="20"
                                        :slides-per-view="1"
                                        class="win-swiper"
                                    >
                                        <SwiperSlide v-for="(win, idx) in collectedWins" :key="idx">
                                            <div class="win-slide">
                                                <div class="win-slide-row">
                                                    <button class="win-nav-prev win-nav-arrow" :style="{ color: accentColor }">
                                                        <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round"><polyline points="15 18 9 12 15 6"/></svg>
                                                    </button>
                                                    <div class="win-slide-image-wrap" :style="{ borderColor: accentColor }">
                                                        <img :src="win.image" :alt="win.categoryName" class="win-slide-image" />
                                                    </div>
                                                    <button class="win-nav-next win-nav-arrow" :style="{ color: accentColor }">
                                                        <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round"><polyline points="9 18 15 12 9 6"/></svg>
                                                    </button>
                                                </div>
                                                <div class="win-slide-prize" :style="{ color: accentColor }">{{ win.prize }}</div>
                                                <div class="win-slide-ticket">Ticket #{{ win.ticketNumber }}</div>
                                            </div>
                                        </SwiperSlide>
                                    </Swiper>
                                </div>

                                <!-- Total -->
                                <div v-if="totalWinnings > 0" class="win-summary-total" :style="{ borderColor: accentColor + '40' }">
                                    <span class="win-total-label">Total Winnings</span>
                                    <span class="win-total-value" :style="{ color: accentColor }">&pound;{{ totalWinnings.toFixed(2) }}</span>
                                </div>

                                <!-- Continue Button -->
                                <button class="win-summary-btn" :style="{ background: accentColor }" @click="closeWinSummary">
                                    Continue
                                </button>
                            </div>
                        </div>
                    </Transition>
                </div>

                <!-- Preview Size Info -->
                <div v-if="demoMode" class="mt-2 text-center text-gray-400 text-xs">
                    {{ actualPreviewMode === 'mobile' ? 'Mobile Preview (420x750)' : 'Desktop Preview (700x750)' }}
                </div>
            </div>
        </transition>
    </Teleport>
</template>

<style scoped>
.fade-enter-active,
.fade-leave-active { transition: opacity 0.3s; }
.fade-enter-from,
.fade-leave-to { opacity: 0; }

/* ===== MODAL ENTRANCE ===== */
.modal-zoom-in {
    animation: modal-zoom-entrance 0.6s cubic-bezier(0.34, 1.56, 0.64, 1);
}

@keyframes modal-zoom-entrance {
    0% { transform: scale(0.3); opacity: 0; }
    100% { transform: scale(1); opacity: 1; }
}

/* ===== UNIFIED BACKGROUND ===== */
.unified-bg {
    --bg-image: none;
    --bg-color: #1a1a2e;

    background-color: var(--bg-color);
    background-image: var(--bg-image);
    background-size: cover;
    background-position: center;
    background-repeat: no-repeat;
    position: relative;
}

.unified-bg::before {
    content: '';
    position: absolute;
    top: 0; left: 0; right: 0; bottom: 0;
    background:
        radial-gradient(ellipse at center top, rgba(255,255,255,0.08) 0%, transparent 40%),
        radial-gradient(ellipse at center bottom, rgba(82,183,123,0.12) 0%, transparent 50%);
    pointer-events: none;
    z-index: 0;
}

.unified-bg[style*="url("]::before {
    background: linear-gradient(180deg, rgba(0,0,0,0.3) 0%, rgba(0,0,0,0.5) 100%);
}

.demo-mode { display: flex; flex-direction: column; }
.demo-mode .game-wrapper { flex: 1; min-height: 0; overflow-y: auto; }
.game-wrapper { min-height: 0; background: transparent; position: relative; z-index: 1; }

/* ===== LOBBY SCREEN ===== */
.lobby-screen {
    --lobby-accent: #52b77b;
    --lobby-border: #c7c6cf;

    position: absolute;
    top: 0; left: 0; right: 0; bottom: 0;
    display: flex;
    align-items: center;
    justify-content: center;
    background: transparent;
    z-index: 1;
    overflow: hidden;
}

/* ===== SHIMMER PARTICLES ===== */
.shimmer-particles {
    position: absolute;
    top: 0; left: 0; right: 0; bottom: 0;
    pointer-events: none;
    z-index: 0;
    overflow: hidden;
    opacity: 0;
    transition: opacity 1s ease;
}

.shimmer-particles.shimmer-visible {
    opacity: 1;
}

.shimmer-dot {
    --shimmer-i: 1;
    --shimmer-accent: #52b77b;
    position: absolute;
    width: 4px;
    height: 4px;
    border-radius: 50%;
    background: var(--shimmer-accent);
    opacity: 0;
    animation: shimmerFloat 6s ease-in-out infinite;
    animation-delay: calc(var(--shimmer-i) * 0.7s);
    left: calc(var(--shimmer-i) * 12% + 2%);
    top: calc(var(--shimmer-i) * 10% + 5%);
    filter: blur(1px);
}

.shimmer-dot:nth-child(odd) {
    width: 3px;
    height: 3px;
    animation-duration: 8s;
}

@keyframes shimmerFloat {
    0%, 100% { opacity: 0; transform: translateY(0) scale(1); }
    20% { opacity: 0.7; }
    50% { opacity: 0.4; transform: translateY(-30px) scale(1.5); }
    80% { opacity: 0.6; }
}

/* ===== LOBBY CONTENT ===== */
.lobby-content {
    text-align: center;
    padding: 30px;
    max-width: 400px;
    width: 100%;
    position: relative;
    z-index: 1;
    display: flex;
    flex-direction: column;
    align-items: center;
}

/* During intro: center the logo vertically */
.lobby-content.intro-active {
    justify-content: center;
    height: 100%;
}

.lobby-rest {
    width: 100%;
}

/* ===== LOGO WRAPPER WITH GLOW HALO ===== */
.lobby-logo-wrapper {
    position: relative;
    display: inline-block;
    margin: 0 auto 15px;
    transition: transform 0.8s cubic-bezier(0.34, 1.56, 0.64, 1);
}

/* Intro phase: logo is larger, centered, dramatic */
.lobby-logo-wrapper.logo-intro {
    transform: scale(1.3);
    margin-bottom: 0;
}

/* After intro: logo settles into normal position */
.lobby-logo-wrapper.logo-settled {
    transform: scale(1);
}

.lobby-logo-wrapper::before {
    content: '';
    position: absolute;
    inset: -25px;
    background: radial-gradient(circle, var(--accent, #52b77b) 0%, transparent 70%);
    opacity: 0;
    border-radius: 50%;
    filter: blur(25px);
    pointer-events: none;
    animation: logoGlow 3s ease-in-out 0.3s infinite;
}

.lobby-header-image {
    display: block;
    max-width: 240px;
    max-height: 100px;
    margin: 0 auto;
    position: relative;
    z-index: 1;
    filter: drop-shadow(0 0 25px rgba(255,255,255,0.4));
    animation:
        logoEntrance 1s cubic-bezier(0.34, 1.56, 0.64, 1) both,
        logoWiggle 3s ease-in-out 1s infinite;
}

.lobby-header-image:hover {
    transform: scale(1.08);
    filter: drop-shadow(0 0 35px rgba(255,255,255,0.6));
    transition: transform 0.3s ease, filter 0.3s ease;
}

@keyframes logoEntrance {
    0% { transform: translateY(-50px) scale(0.3) rotate(-15deg); opacity: 0; }
    40% { transform: translateY(0) scale(1.15) rotate(5deg); opacity: 1; }
    60% { transform: translateY(-5px) scale(0.95) rotate(-3deg); opacity: 1; }
    80% { transform: translateY(2px) scale(1.05) rotate(1deg); opacity: 1; }
    100% { transform: translateY(0) scale(1) rotate(0); opacity: 1; }
}

@keyframes logoWiggle {
    0%, 100% { transform: rotate(-2deg) scale(1); }
    15% { transform: rotate(3deg) scale(1.04); }
    30% { transform: rotate(-2.5deg) scale(1.01); }
    45% { transform: rotate(2deg) scale(1.03); }
    60% { transform: rotate(-1.5deg) scale(1); }
    75% { transform: rotate(1.5deg) scale(1.02); }
}

@keyframes logoGlow {
    0%, 100% { opacity: 0.2; transform: scale(1); }
    50% { opacity: 0.45; transform: scale(1.15); }
}

.lobby-title-area { margin-bottom: 20px; }

/* ===== LOBBY REVEAL TRANSITION ===== */
.lobby-reveal-enter-active {
    animation: lobbyRevealIn 0.8s cubic-bezier(0.34, 1.56, 0.64, 1) both;
}
.lobby-reveal-leave-active {
    animation: lobbyRevealIn 0.3s ease-in reverse both;
}

@keyframes lobbyRevealIn {
    0% { opacity: 0; transform: translateY(30px) scale(0.9); }
    100% { opacity: 1; transform: translateY(0) scale(1); }
}

/* ===== STAGGERED ENTRANCE ANIMATIONS ===== */
.lobby-stagger-1 { animation: staggerFadeIn 0.6s cubic-bezier(0.34, 1.56, 0.64, 1) both; animation-delay: 0.05s; }
.lobby-stagger-2 { animation: staggerFadeIn 0.6s cubic-bezier(0.34, 1.56, 0.64, 1) both; animation-delay: 0.2s; }
.lobby-stagger-3 { animation: staggerFadeIn 0.6s cubic-bezier(0.34, 1.56, 0.64, 1) both; animation-delay: 0.35s; }
.lobby-stagger-4 { animation: staggerFadeIn 0.6s cubic-bezier(0.34, 1.56, 0.64, 1) both; animation-delay: 0.5s; }

@keyframes staggerFadeIn {
    0% { opacity: 0; transform: translateY(20px) scale(0.95); }
    100% { opacity: 1; transform: translateY(0) scale(1); }
}

/* ===== TOP PRIZE BADGE ===== */
.top-prize-badge {
    --prize-accent: #52b77b;
    display: flex;
    align-items: center;
    gap: 14px;
    margin: 0 auto 20px;
    padding: 12px 20px;
    background:
        radial-gradient(ellipse at left, color-mix(in srgb, var(--prize-accent) 12%, transparent) 0%, transparent 70%),
        rgba(255,255,255,0.06);
    border: 1px solid color-mix(in srgb, var(--prize-accent) 30%, transparent);
    border-radius: 16px;
    max-width: 320px;
    position: relative;
    overflow: hidden;
    backdrop-filter: blur(8px);
}

.top-prize-badge::before {
    content: '';
    position: absolute;
    top: 0; left: -100%; width: 200%; height: 100%;
    background: linear-gradient(90deg, transparent, color-mix(in srgb, var(--prize-accent) 15%, transparent), transparent);
    animation: prizeSweep 4s ease-in-out infinite;
}

@keyframes prizeSweep {
    0%, 100% { transform: translateX(-50%); }
    50% { transform: translateX(50%); }
}

.prize-sparkle-ring {
    width: 56px;
    height: 56px;
    border-radius: 50%;
    background:
        radial-gradient(circle at 30% 30%, rgba(255,255,255,0.3) 0%, transparent 50%),
        linear-gradient(135deg, var(--prize-accent), color-mix(in srgb, var(--prize-accent) 60%, black));
    display: flex;
    align-items: center;
    justify-content: center;
    flex-shrink: 0;
    box-shadow:
        0 0 20px color-mix(in srgb, var(--prize-accent) 40%, transparent),
        inset 0 1px 6px rgba(255,255,255,0.2);
    animation: prizeRingPulse 2.5s ease-in-out infinite;
    position: relative;
    z-index: 1;
}

@keyframes prizeRingPulse {
    0%, 100% { box-shadow: 0 0 20px color-mix(in srgb, var(--prize-accent) 40%, transparent), inset 0 1px 6px rgba(255,255,255,0.2); }
    50% { box-shadow: 0 0 35px color-mix(in srgb, var(--prize-accent) 60%, transparent), inset 0 1px 6px rgba(255,255,255,0.2); }
}

.prize-image {
    width: 40px;
    height: 40px;
    object-fit: contain;
    border-radius: 50%;
    filter: drop-shadow(0 2px 4px rgba(0,0,0,0.3));
}

.prize-placeholder {
    font-size: 1.8rem;
    line-height: 1;
    filter: drop-shadow(0 2px 4px rgba(0,0,0,0.3));
}

.prize-details {
    display: flex;
    flex-direction: column;
    align-items: flex-start;
    position: relative;
    z-index: 1;
}

.prize-label {
    font-size: 0.6rem;
    font-weight: 800;
    text-transform: uppercase;
    letter-spacing: 2px;
    color: rgba(255,255,255,0.6);
}

.prize-value {
    font-size: 1.6rem;
    font-weight: 900;
    line-height: 1.1;
    text-shadow: 0 0 20px currentColor;
}

.prize-name {
    font-size: 0.75rem;
    font-weight: 600;
    color: rgba(255,255,255,0.8);
    margin-top: 2px;
}

.title-banner {
    position: relative;
    display: inline-block;
    animation: bannerBounce 2.5s ease-in-out infinite;
}

.lobby-title {
    font-size: 2.4rem;
    font-weight: 900;
    text-transform: uppercase;
    letter-spacing: 3px;
    margin: 0;
    text-shadow:
        0 0 30px currentColor,
        0 0 60px currentColor,
        3px 3px 0 rgba(0,0,0,0.4);
}

.lobby-subtitle {
    font-size: 1rem;
    font-weight: 600;
    letter-spacing: 2px;
    text-transform: uppercase;
    margin: 15px 0 0 0;
    opacity: 0.9;
}

@keyframes bannerBounce {
    0%, 100% { transform: translateY(0) rotate(-1deg); }
    50% { transform: translateY(-10px) rotate(1deg); }
}

/* ===== TICKET COUNTER ===== */
.lobby-ticket-display {
    margin-bottom: 30px;
    animation: ticketPulse 3s ease-in-out infinite;
}

.ticket-count-circle {
    --circle-color: #52b77b;

    width: 120px;
    height: 120px;
    margin: 0 auto 10px;
    border-radius: 50%;
    background:
        radial-gradient(circle at 30% 30%, rgba(255,255,255,0.2) 0%, transparent 50%),
        linear-gradient(180deg, var(--circle-color) 0%, color-mix(in srgb, var(--circle-color) 60%, black) 100%);
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    box-shadow:
        0 8px 0 color-mix(in srgb, var(--circle-color) 40%, black),
        0 12px 40px rgba(0,0,0,0.4),
        inset 0 2px 10px rgba(255,255,255,0.2);
    border: 3px solid rgba(255,255,255,0.2);
}

.ticket-number {
    font-size: 2.5rem;
    font-weight: 900;
    color: white;
    line-height: 1;
    text-shadow: 0 2px 4px rgba(0,0,0,0.3);
}

.ticket-label {
    font-size: 0.7rem;
    font-weight: 700;
    color: rgba(255,255,255,0.9);
    text-transform: uppercase;
    letter-spacing: 1px;
}

.ticket-prompt {
    font-size: 0.95rem;
    color: rgba(255,255,255,0.8);
    margin: 0;
    font-weight: 500;
}

@keyframes ticketPulse {
    0%, 100% { transform: scale(1); }
    50% { transform: scale(1.03); }
}

/* ===== LOBBY BUTTONS ===== */
.lobby-buttons {
    display: flex;
    flex-direction: column;
    align-items: center;
    gap: 15px;
}

.lobby-btn {
    display: flex;
    align-items: center;
    justify-content: center;
    gap: 12px;
    padding: 20px 50px;
    font-size: 1.2rem;
    font-weight: 800;
    letter-spacing: 2px;
    text-transform: uppercase;
    border: none;
    border-radius: 60px;
    cursor: pointer;
    transition: all 0.3s ease;
    position: relative;
    overflow: hidden;
}

.lobby-btn .btn-text { position: relative; z-index: 1; }
.lobby-btn .btn-icon { position: relative; z-index: 1; display: flex; }

.lobby-btn-primary {
    --btn-color: #52b77b;
    --btn-glow: #52b77b;

    background: linear-gradient(180deg, var(--btn-color) 0%, color-mix(in srgb, var(--btn-color) 70%, black) 100%);
    color: white;
    box-shadow:
        0 6px 0 color-mix(in srgb, var(--btn-color) 50%, black),
        0 12px 30px rgba(0,0,0,0.4),
        0 0 50px color-mix(in srgb, var(--btn-glow) 40%, transparent);
    animation: primaryBtnPulse 2s ease-in-out infinite;
}

.lobby-btn-primary::before {
    content: '';
    position: absolute;
    top: 0; left: -100%; width: 100%; height: 100%;
    background: linear-gradient(90deg, transparent, rgba(255,255,255,0.3), transparent);
    animation: btnShine 3s ease-in-out infinite;
}

@keyframes btnShine {
    0%, 100% { left: -100%; }
    50% { left: 100%; }
}

@keyframes primaryBtnPulse {
    0%, 100% {
        box-shadow:
            0 6px 0 color-mix(in srgb, var(--btn-color) 50%, black),
            0 12px 30px rgba(0,0,0,0.4),
            0 0 50px color-mix(in srgb, var(--btn-glow) 40%, transparent);
        transform: scale(1);
    }
    50% {
        box-shadow:
            0 6px 0 color-mix(in srgb, var(--btn-color) 50%, black),
            0 12px 30px rgba(0,0,0,0.4),
            0 0 70px color-mix(in srgb, var(--btn-glow) 60%, transparent);
        transform: scale(1.02);
    }
}

.lobby-btn-primary:hover { transform: translateY(-3px) scale(1.03); }
.lobby-btn-primary:active {
    transform: translateY(2px) scale(0.98);
    box-shadow: 0 2px 0 color-mix(in srgb, var(--btn-color) 50%, black), 0 4px 15px rgba(0,0,0,0.4);
}

/* Help Button */
.lobby-btn-help {
    --help-color: #52b77b;
    display: flex;
    align-items: center;
    gap: 8px;
    padding: 10px 20px;
    font-size: 0.85rem;
    font-weight: 600;
    color: var(--help-color);
    background: transparent;
    border: 1px solid color-mix(in srgb, var(--help-color) 50%, transparent);
    border-radius: 30px;
    cursor: pointer;
    transition: all 0.2s ease;
}

.lobby-btn-help svg { width: 18px; height: 18px; }
.lobby-btn-help:hover {
    background: color-mix(in srgb, var(--help-color) 15%, transparent);
    border-color: var(--help-color);
}

/* ===== HOW TO PLAY ===== */
.htp-overlay {
    position: absolute;
    top: 0; left: 0; right: 0; bottom: 0;
    background: radial-gradient(ellipse at center, rgba(20,20,40,0.95) 0%, rgba(0,0,0,0.98) 100%);
    backdrop-filter: blur(8px);
    display: flex;
    align-items: center;
    justify-content: center;
    z-index: 100;
    padding: 20px;
}

.htp-modal {
    background:
        radial-gradient(ellipse at top, rgba(82,183,123,0.15) 0%, transparent 50%),
        linear-gradient(180deg, #1e2245 0%, #141428 100%);
    border-radius: 24px;
    padding: 35px;
    max-width: 400px;
    width: 100%;
    position: relative;
    box-shadow: 0 25px 80px rgba(0,0,0,0.5), 0 0 0 1px rgba(255,255,255,0.1);
    animation: modalSlideIn 0.4s cubic-bezier(0.34, 1.56, 0.64, 1);
}

@keyframes modalSlideIn {
    0% { transform: scale(0.8) translateY(30px); opacity: 0; }
    100% { transform: scale(1) translateY(0); opacity: 1; }
}

.htp-close {
    position: absolute;
    top: 15px; right: 15px;
    width: 36px; height: 36px;
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
.htp-close:hover { background: rgba(255,255,255,0.2); transform: scale(1.1); }

.htp-title {
    font-size: 1.8rem;
    font-weight: 900;
    text-transform: uppercase;
    letter-spacing: 3px;
    text-align: center;
    margin: 0 0 30px 0;
    text-shadow: 0 0 20px currentColor;
}

.htp-steps { display: flex; flex-direction: column; gap: 20px; margin-bottom: 25px; }
.step { display: flex; gap: 15px; align-items: flex-start; }
.step-number {
    width: 36px; height: 36px;
    border-radius: 50%;
    display: flex; align-items: center; justify-content: center;
    font-weight: 900; font-size: 1.1rem; color: white;
    flex-shrink: 0;
    box-shadow: 0 4px 15px rgba(0,0,0,0.3);
}
.step-content h3 { font-size: 1rem; font-weight: 700; color: white; margin: 0 0 5px 0; }
.step-content p { font-size: 0.9rem; color: rgba(255,255,255,0.7); margin: 0; line-height: 1.5; }

.htp-tip {
    display: flex; align-items: center; gap: 10px;
    padding: 15px;
    background: rgba(255,215,0,0.1);
    border-radius: 12px;
    border: 1px solid rgba(255,215,0,0.2);
    margin-bottom: 25px;
    font-size: 0.9rem;
    color: rgba(255,255,255,0.9);
}
.tip-icon { font-size: 1.3rem; }

.htp-got-it {
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
.htp-got-it:hover { transform: translateY(-2px); box-shadow: 0 8px 30px rgba(0,0,0,0.4); }

.htp-fade-enter-active { transition: opacity 0.3s; }
.htp-fade-leave-active { transition: opacity 0.2s; }
.htp-fade-enter-from, .htp-fade-leave-to { opacity: 0; }

/* ===== LOBBY TRANSITIONS ===== */
.lobby-fade-enter-active { animation: lobbyFadeIn 0.5s ease-out; }
.lobby-fade-leave-active { animation: lobbyFadeIn 0.3s ease-in reverse; }
@keyframes lobbyFadeIn { 0% { opacity: 0; } 100% { opacity: 1; } }

/* ===== MOBILE GAME SCROLL ARROWS ===== */
.game-scroll-arrow {
    position: fixed;
    left: 50%;
    transform: translateX(-50%);
    z-index: 9999;
    width: 40px;
    height: 40px;
    border-radius: 50%;
    background: rgba(0, 0, 0, 0.4);
    border: 2px solid #ffffff;
    color: #ffffff;
    display: flex;
    align-items: center;
    justify-content: center;
    cursor: pointer;
    transition: opacity 0.2s ease;
    backdrop-filter: blur(4px);
}
.game-scroll-arrow-up { top: 10px; }
.game-scroll-arrow-down { bottom: 10px; }
.game-scroll-arrow:disabled {
    opacity: 0.3;
    cursor: default;
    pointer-events: none;
}

/* ===== DEMO BACK BUTTON ===== */
.demo-back-btn {
    position: absolute;
    top: 10px; left: 10px;
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

/* ===== MOBILE RESPONSIVE ===== */
@media (max-width: 550px) {
    .lobby-title {
        font-size: 1.8rem;
        letter-spacing: 2px;
    }
    .lobby-subtitle {
        font-size: 0.85rem;
    }
    .ticket-count-circle {
        width: 100px;
        height: 100px;
    }
    .ticket-number {
        font-size: 2rem;
    }
    .lobby-btn {
        padding: 16px 40px;
        font-size: 1rem;
    }
}

/* ===== INTRO VIDEO ===== */
.intro-video-overlay {
    position: absolute;
    inset: 0;
    z-index: 1;
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

.fade-enter-active { transition: opacity 0.3s ease; }
.fade-leave-active { transition: opacity 0.8s ease; }
.fade-enter-from, .fade-leave-to { opacity: 0; }

/* ===== TOP PRIZE WIGGLE ===== */
.top-prize-banner {
    animation: prize-wiggle 3s ease-in-out infinite;
    will-change: transform;
}

@keyframes prize-wiggle {
    0%, 100% { transform: rotate(0deg); }
    15% { transform: rotate(-1.5deg); }
    30% { transform: rotate(1.5deg); }
    45% { transform: rotate(-1deg); }
    55% { transform: rotate(1deg); }
    65% { transform: rotate(0deg); }
}

/* ===== WIN SUMMARY OVERLAY ===== */
.win-summary-overlay {
    position: absolute;
    top: 0; left: 0; right: 0; bottom: 0;
    background: rgba(0, 0, 0, 0.85);
    display: flex;
    align-items: center;
    justify-content: center;
    z-index: 200;
    padding: 20px;
    perspective: 1000px;
}

.win-summary-modal {
    --ws-accent: #52b77b;
    background:
        radial-gradient(ellipse at top, color-mix(in srgb, var(--ws-accent) 12%, transparent) 0%, transparent 50%),
        linear-gradient(180deg, #1e2245 0%, #141428 100%);
    border-radius: 24px;
    padding: 30px 25px;
    max-width: 380px;
    width: 100%;
    position: relative;
    box-shadow:
        0 25px 80px rgba(0,0,0,0.6),
        0 0 40px color-mix(in srgb, var(--ws-accent) 30%, transparent),
        0 0 0 1px rgba(255,255,255,0.1);
    text-align: center;
    transform-style: preserve-3d;
    will-change: transform, opacity;
    animation: flipRevealWin 0.7s ease-out forwards;
}

/* 3D flip entrance — same approach as SpinnyModal winner card */
@keyframes flipRevealWin {
    0% {
        transform: rotateY(-90deg) rotateX(-10deg) translateZ(-80px) scale(0.8);
        opacity: 0;
    }
    50% {
        transform: rotateY(-15deg) rotateX(-4deg) translateZ(30px) scale(1.02);
        opacity: 0.9;
    }
    100% {
        transform: rotateY(0deg) rotateX(0deg) translateZ(0px) scale(1);
        opacity: 1;
    }
}

.win-summary-close {
    position: absolute;
    top: 12px; right: 12px;
    width: 36px; height: 36px;
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
    z-index: 1;
}
.win-summary-close:hover { background: rgba(255,255,255,0.2); transform: scale(1.1); }

.win-summary-header { margin-bottom: 20px; }

.win-summary-title {
    font-size: 2rem;
    font-weight: 900;
    text-transform: uppercase;
    letter-spacing: 3px;
    margin: 0 0 6px 0;
    text-shadow: 0 0 30px currentColor;
}

.win-summary-subtitle {
    font-size: 0.9rem;
    color: rgba(255,255,255,0.6);
    margin: 0;
    font-weight: 500;
}

/* Swiper carousel */
.win-summary-carousel {
    margin-bottom: 20px;
}

.win-swiper {
    padding-bottom: 35px;
}

:deep(.win-swiper .swiper-pagination-fraction) {
    color: rgba(255,255,255,0.5);
    font-size: 0.85rem;
    font-weight: 600;
    letter-spacing: 1px;
}

:deep(.win-swiper .swiper-pagination-current) {
    color: var(--ws-accent, #52b77b);
    font-weight: 800;
    font-size: 1rem;
}

.win-slide {
    display: flex;
    flex-direction: column;
    align-items: center;
    gap: 12px;
    padding: 10px;
}

.win-slide-row {
    display: flex;
    align-items: center;
    justify-content: center;
    gap: 16px;
}

.win-nav-arrow {
    background: rgba(255,255,255,0.08);
    border: 1px solid rgba(255,255,255,0.15);
    border-radius: 50%;
    width: 44px;
    height: 44px;
    display: flex;
    align-items: center;
    justify-content: center;
    cursor: pointer;
    transition: all 0.2s;
    flex-shrink: 0;
}
.win-nav-arrow:hover { background: rgba(255,255,255,0.15); transform: scale(1.1); }
.win-nav-arrow.swiper-button-disabled { opacity: 0.2; pointer-events: none; }

.win-slide-image-wrap {
    width: 120px;
    height: 120px;
    border-radius: 20px;
    border: 3px solid;
    background:
        radial-gradient(circle at 30% 30%, rgba(255,255,255,0.15) 0%, transparent 50%),
        rgba(255,255,255,0.05);
    display: flex;
    align-items: center;
    justify-content: center;
    overflow: hidden;
    box-shadow: 0 8px 30px rgba(0,0,0,0.3);
}

.win-slide-image {
    width: 90px;
    height: 90px;
    object-fit: contain;
    filter: drop-shadow(0 2px 8px rgba(0,0,0,0.3));
}

.win-slide-prize {
    font-size: 1.4rem;
    font-weight: 800;
    text-shadow: 0 0 20px currentColor;
}

.win-slide-ticket {
    font-size: 0.8rem;
    font-weight: 600;
    color: rgba(255,255,255,0.5);
    background: rgba(255,255,255,0.08);
    padding: 4px 14px;
    border-radius: 20px;
}

/* Total winnings */
.win-summary-total {
    display: flex;
    align-items: center;
    justify-content: space-between;
    padding: 14px 20px;
    border-top: 1px solid;
    margin-bottom: 20px;
}

.win-total-label {
    font-size: 0.85rem;
    font-weight: 600;
    color: rgba(255,255,255,0.6);
    text-transform: uppercase;
    letter-spacing: 1px;
}

.win-total-value {
    font-size: 1.6rem;
    font-weight: 900;
    text-shadow: 0 0 20px currentColor;
}

/* Continue button */
.win-summary-btn {
    width: 100%;
    padding: 16px;
    font-size: 1.1rem;
    font-weight: 800;
    text-transform: uppercase;
    letter-spacing: 2px;
    color: black;
    border: none;
    border-radius: 50px;
    cursor: pointer;
    transition: all 0.3s;
    box-shadow: 0 4px 20px rgba(0,0,0,0.3);
}
.win-summary-btn:hover { transform: translateY(-2px); box-shadow: 0 8px 30px rgba(0,0,0,0.4); }

/* Vue transition — overlay fades, modal has its own 3D keyframe */
.win-summary-enter-active { animation: overlayReveal 0.4s ease forwards; }
.win-summary-leave-active { transition: opacity 0.3s ease; }
.win-summary-enter-from { opacity: 0; }
.win-summary-leave-to { opacity: 0; }

@keyframes overlayReveal {
    0% { opacity: 0; }
    100% { opacity: 1; }
}
</style>
