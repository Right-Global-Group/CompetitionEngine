<script setup lang="ts">
import { onMounted, reactive, onUnmounted, watch, ref, computed } from 'vue';
import PopGameBoard from './PopGameBoard.vue';

interface Assets {
    name?: string;
    background: string;
    header: string;
    titleText: string;
    titleColor: string;
    titleImage?: string;
    primaryColor?: string;
    secondaryColor?: string;
    accentColor?: string;
    textColor?: string;
    welcomeSound?: string;
    winSound?: string;
    lossSound?: string;
    popItemType?: string;
    popItemImage?: string;
    popSound?: string;
    popBgColor?: string;
    popItemColors?: string[];
    popWinColor?: string;
    popLoseColor?: string;
    popConfettiColors?: string[];
    popSubtitleText?: string;
    popItemLabel?: string;
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
const showPopGame = ref(true);
const showGameBoard = ref(false);
const showLobby = ref(false);
const showHowToPlay = ref(false);

const popGameAssets = reactive({
    titleText: props.assets.titleText || 'POP TO WIN!',
    titleColor: props.assets.titleColor || '#FFD700',
    titleImage: props.assets.titleImage || '',
    background: '',
    header: props.assets.header || '',
    primaryColor: props.assets.primaryColor || '#e94560',
    secondaryColor: props.assets.secondaryColor || '#1a1a2e',
    accentColor: props.assets.accentColor || '#ffd700',
    textColor: props.assets.textColor || '#FFFFFF',
    welcomeSound: props.assets.welcomeSound || '',
    winSound: props.assets.winSound || '',
    lossSound: props.assets.lossSound || '',
    popItemType: props.assets.popItemType || 'balloon',
    popItemImage: props.assets.popItemImage || '',
    popSound: props.assets.popSound || '',
    popBgColor: props.assets.popBgColor || '#1a1a2e',
    popItemColors: props.assets.popItemColors || ['#FF4C4C', '#FFEB3B', '#64B5F6', '#81C784', '#9575CD', '#FF8A80', '#FFB74D', '#4DD0E1', '#F06292', '#FFD700'],
    popWinColor: props.assets.popWinColor || '#00ff88',
    popLoseColor: props.assets.popLoseColor || '#ff4444',
    popConfettiColors: props.assets.popConfettiColors || ['#FFD700', '#FF6B6B', '#4ECDC4', '#45B7D1', '#96CEB4', '#FFEAA7'],
    popSubtitleText: props.assets.popSubtitleText || '',
    popItemLabel: props.assets.popItemLabel || '',
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
watch(() => props.assets.titleText, (newVal) => { popGameAssets.titleText = newVal || 'POP TO WIN!'; }, { immediate: true });
watch(() => props.assets.titleColor, (newVal) => { popGameAssets.titleColor = newVal || '#FFD700'; }, { immediate: true });
watch(() => props.assets.background, (newVal) => { popGameAssets.background = newVal || ''; }, { immediate: true });
watch(() => props.assets.header, (newVal) => { popGameAssets.header = newVal || ''; }, { immediate: true });
watch(() => props.assets.primaryColor, (newVal) => { popGameAssets.primaryColor = newVal || '#e94560'; }, { immediate: true });
watch(() => props.assets.secondaryColor, (newVal) => { popGameAssets.secondaryColor = newVal || '#1a1a2e'; }, { immediate: true });
watch(() => props.assets.accentColor, (newVal) => { popGameAssets.accentColor = newVal || '#ffd700'; }, { immediate: true });
watch(() => props.assets.textColor, (newVal) => { popGameAssets.textColor = newVal || '#FFFFFF'; }, { immediate: true });
watch(() => props.assets.titleImage, (newVal) => { popGameAssets.titleImage = newVal || ''; }, { immediate: true });
watch(() => props.assets.welcomeSound, (newVal) => { popGameAssets.welcomeSound = newVal || ''; }, { immediate: true });
watch(() => props.assets.winSound, (newVal) => { popGameAssets.winSound = newVal || ''; }, { immediate: true });
watch(() => props.assets.lossSound, (newVal) => { popGameAssets.lossSound = newVal || ''; }, { immediate: true });
watch(() => props.assets.popItemType, (newVal) => { popGameAssets.popItemType = newVal || 'balloon'; }, { immediate: true });
watch(() => props.assets.popItemImage, (newVal) => { popGameAssets.popItemImage = newVal || ''; }, { immediate: true });
watch(() => props.assets.popSound, (newVal) => { popGameAssets.popSound = newVal || ''; }, { immediate: true });
watch(() => props.assets.popBgColor, (newVal) => { popGameAssets.popBgColor = newVal || '#1a1a2e'; }, { immediate: true });
watch(() => props.assets.popItemColors, (newVal) => { popGameAssets.popItemColors = newVal || ['#FF4C4C', '#FFEB3B', '#64B5F6', '#81C784', '#9575CD']; }, { immediate: true });
watch(() => props.assets.popWinColor, (newVal) => { popGameAssets.popWinColor = newVal || '#00ff88'; }, { immediate: true });
watch(() => props.assets.popLoseColor, (newVal) => { popGameAssets.popLoseColor = newVal || '#ff4444'; }, { immediate: true });
watch(() => props.assets.popConfettiColors, (newVal) => { popGameAssets.popConfettiColors = newVal || ['#FFD700', '#FF6B6B', '#4ECDC4']; }, { immediate: true });
watch(() => props.assets.popSubtitleText, (newVal) => { popGameAssets.popSubtitleText = newVal || ''; }, { immediate: true });
watch(() => props.assets.popItemLabel, (newVal) => { popGameAssets.popItemLabel = newVal || ''; }, { immediate: true });

// Computed label for items - uses custom label, or falls back to item type name
const itemLabelPlural = computed(() => {
    if (popGameAssets.popItemLabel) return popGameAssets.popItemLabel;
    return popGameAssets.popItemType === 'present' ? 'presents' : popGameAssets.popItemType === 'egg' ? 'eggs' : 'balloons';
});

const itemLabelSingular = computed(() => {
    if (popGameAssets.popItemLabel) return popGameAssets.popItemLabel;
    return popGameAssets.popItemType === 'present' ? 'present' : popGameAssets.popItemType === 'egg' ? 'egg' : 'balloon';
});

// Reset played tickets when tickets change
watch(
    () => props.tickets,
    () => { playedTickets.value = []; }
);

// Show lobby when modal opens
watch(
    () => props.modelValue,
    async (newVal) => {
        if (newVal) {
            // Reset states and go straight to lobby
            showPopGame.value = true;
            showGameBoard.value = false;
            showLobby.value = true;
            showHowToPlay.value = false;

            // Play welcome sound (only in live mode, not in demo mode)
            if (popGameAssets.welcomeSound && !props.demoMode) {
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
            showPopGame.value = true;
            showGameBoard.value = false;
            showLobby.value = false;
            showHowToPlay.value = false;
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

// Floating items for lobby decoration - float from bottom to top
const floatingItems = computed(() => {
    const colors = popGameAssets.popItemColors || ['#FF4C4C', '#FFEB3B', '#64B5F6', '#81C784', '#9575CD'];
    const items = [];
    const count = 15; // Number of floating items

    for (let i = 0; i < count; i++) {
        items.push({
            id: i,
            color: colors[i % colors.length],
            left: `${5 + (i * 7) % 85}%`, // Spread across width
            size: 25 + (i % 5) * 8, // Varying sizes 25-57px
            delay: i * 0.8, // Stagger the start times
            duration: 8 + (i % 5) * 2, // 8-16s to float up (slower = more relaxed)
            swayAmount: 15 + (i % 3) * 10, // Different sway amounts
        });
    }
    return items;
});

const onTicketPlayed = (ticketId: number): void => {
    if (!playedTickets.value.includes(ticketId)) {
        playedTickets.value.push(ticketId);
    }
};

onMounted(() => {
    window.addEventListener('keydown', onEsc);

    if (props.modelValue && !showLobby.value && !showGameBoard.value) {
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

            <!-- Main Container with unified background -->
            <div
                :class="[containerClasses, { 'demo-mode': demoMode }, 'modal-zoom-in', 'unified-bg']"
                :style="{
                    ...modalStyle,
                    '--bg-image': popGameAssets.background ? `url(${popGameAssets.background})` : 'none',
                    '--bg-color': popGameAssets.popBgColor || '#1a1a2e'
                }"
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
                            <span class="ml-4 text-gray-300">Pop Game - Pop to Win!</span>
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

                <!-- Lobby Screen -->
                <Transition name="lobby-fade">
                    <div
                        v-if="showLobby"
                        class="lobby-screen"
                        :style="{
                            '--lobby-primary': popGameAssets.primaryColor || '#e94560',
                            '--lobby-secondary': popGameAssets.secondaryColor || '#1a1a2e',
                            '--lobby-accent': popGameAssets.accentColor || '#ffd700'
                        }"
                    >
                        <!-- Floating Decorative Items -->
                        <div class="floating-items-container">
                            <div
                                v-for="item in floatingItems"
                                :key="item.id"
                                class="floating-item"
                                :style="{
                                    left: item.left,
                                    '--item-color': item.color,
                                    '--item-size': `${item.size}px`,
                                    '--float-delay': `${item.delay}s`,
                                    '--float-duration': `${item.duration}s`,
                                    '--sway-amount': `${item.swayAmount}px`
                                }"
                            >
                                <!-- Custom Image -->
                                <img
                                    v-if="popGameAssets.popItemImage"
                                    :src="popGameAssets.popItemImage"
                                    :width="item.size"
                                    :height="item.size"
                                    class="floating-custom-image"
                                    alt=""
                                />
                                <!-- Balloon SVG -->
                                <svg
                                    v-else-if="popGameAssets.popItemType === 'balloon' || !popGameAssets.popItemType"
                                    :width="item.size"
                                    :height="item.size * 1.3"
                                    viewBox="0 0 50 65"
                                    class="balloon-svg"
                                >
                                    <defs>
                                        <radialGradient :id="'balloonGrad' + item.id" cx="30%" cy="30%" r="70%">
                                            <stop offset="0%" :style="{ stopColor: 'white', stopOpacity: 0.4 }" />
                                            <stop offset="100%" :style="{ stopColor: item.color, stopOpacity: 1 }" />
                                        </radialGradient>
                                    </defs>
                                    <!-- Balloon body - teardrop shape -->
                                    <path
                                        :d="`M25 2 C10 2 3 15 3 25 C3 38 12 47 25 50 C38 47 47 38 47 25 C47 15 40 2 25 2`"
                                        :fill="`url(#balloonGrad${item.id})`"
                                    />
                                    <!-- Knot at bottom -->
                                    <ellipse cx="25" cy="52" rx="3" ry="2" :fill="item.color" />
                                    <!-- String -->
                                    <path d="M25 54 Q22 58 25 62 Q28 58 25 54" stroke="rgba(255,255,255,0.4)" stroke-width="1" fill="none" />
                                </svg>
                                <!-- Present SVG -->
                                <svg
                                    v-else-if="popGameAssets.popItemType === 'present'"
                                    :width="item.size"
                                    :height="item.size"
                                    viewBox="0 0 50 50"
                                    class="present-svg"
                                >
                                    <defs>
                                        <linearGradient :id="'presentGrad' + item.id" x1="0%" y1="0%" x2="100%" y2="100%">
                                            <stop offset="0%" :style="{ stopColor: item.color, stopOpacity: 1 }" />
                                            <stop offset="100%" :style="{ stopColor: item.color, stopOpacity: 0.7 }" />
                                        </linearGradient>
                                    </defs>
                                    <rect x="5" y="18" width="40" height="28" rx="3" :fill="`url(#presentGrad${item.id})`" />
                                    <rect x="3" y="12" width="44" height="10" rx="2" :fill="item.color" />
                                    <rect x="22" y="12" width="6" height="34" fill="rgba(255,255,255,0.4)" />
                                    <rect x="3" y="15" width="44" height="4" fill="rgba(255,255,255,0.4)" />
                                    <circle cx="25" cy="8" r="5" fill="rgba(255,255,255,0.5)" />
                                    <circle cx="20" cy="6" r="4" fill="rgba(255,255,255,0.4)" />
                                    <circle cx="30" cy="6" r="4" fill="rgba(255,255,255,0.4)" />
                                </svg>
                                <!-- Egg SVG -->
                                <svg
                                    v-else-if="popGameAssets.popItemType === 'egg'"
                                    :width="item.size"
                                    :height="item.size * 1.2"
                                    viewBox="0 0 50 60"
                                    class="egg-svg"
                                >
                                    <defs>
                                        <radialGradient :id="'eggGrad' + item.id" cx="35%" cy="30%" r="65%">
                                            <stop offset="0%" :style="{ stopColor: 'white', stopOpacity: 0.5 }" />
                                            <stop offset="100%" :style="{ stopColor: item.color, stopOpacity: 1 }" />
                                        </radialGradient>
                                    </defs>
                                    <!-- Egg shape -->
                                    <ellipse cx="25" cy="32" rx="20" ry="26" :fill="`url(#eggGrad${item.id})`" />
                                    <!-- Decorative zigzag pattern -->
                                    <path
                                        d="M8 30 L12 24 L16 30 L20 24 L24 30 L28 24 L32 30 L36 24 L40 30"
                                        stroke="rgba(255,255,255,0.5)"
                                        stroke-width="2"
                                        fill="none"
                                    />
                                    <!-- Dots decoration -->
                                    <circle cx="15" cy="40" r="3" fill="rgba(255,255,255,0.4)" />
                                    <circle cx="25" cy="45" r="2.5" fill="rgba(255,255,255,0.3)" />
                                    <circle cx="35" cy="40" r="3" fill="rgba(255,255,255,0.4)" />
                                </svg>
                            </div>
                        </div>

                        <div class="lobby-content">
                            <!-- Game Logo/Title with floating banner effect -->
                            <div class="lobby-title-area">
                                <div class="title-banner">
                                    <img
                                        v-if="popGameAssets.titleImage"
                                        :src="popGameAssets.titleImage"
                                        alt="Game Title"
                                        class="lobby-title-image"
                                    />
                                    <h1 v-else class="lobby-title" :style="{ color: popGameAssets.titleColor }">
                                        {{ popGameAssets.titleText || 'POP TO WIN!' }}
                                    </h1>
                                </div>
                                <p class="lobby-subtitle" :style="{ color: popGameAssets.accentColor }">
                                    {{ popGameAssets.popSubtitleText || `Pop ${itemLabelPlural} to win prizes!` }}
                                </p>
                            </div>

                            <!-- Ticket Count - Prominent display -->
                            <div v-if="tickets && tickets.length > 0" class="lobby-ticket-display">
                                <div class="ticket-count-circle" :style="{ '--circle-color': popGameAssets.primaryColor }">
                                    <span class="ticket-number">{{ tickets.length }}</span>
                                    <span class="ticket-label">{{ itemLabelPlural }}</span>
                                </div>
                                <p class="ticket-prompt">waiting to be popped!</p>
                            </div>

                            <!-- Action Buttons - Horizontal on larger screens -->
                            <div class="lobby-buttons">
                                <button
                                    @click="startGame"
                                    class="lobby-btn lobby-btn-primary"
                                    :style="{
                                        '--btn-color': popGameAssets.primaryColor,
                                        '--btn-glow': popGameAssets.accentColor
                                    }"
                                >
                                    <span class="btn-text">Let's Pop!</span>
                                </button>

                                <button
                                    @click="toggleHowToPlay"
                                    class="lobby-btn-help"
                                    :style="{ '--help-color': popGameAssets.accentColor }"
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

                        <!-- How to Play Overlay -->
                        <Transition name="how-to-play-fade">
                            <div
                                v-if="showHowToPlay"
                                class="how-to-play-overlay"
                                @click.self="toggleHowToPlay"
                                :style="{
                                    '--htp-primary': popGameAssets.primaryColor || '#e94560',
                                    '--htp-secondary': popGameAssets.secondaryColor || '#1a1a2e'
                                }"
                            >
                                <div class="how-to-play-modal">
                                    <button @click="toggleHowToPlay" class="how-to-play-close">X</button>

                                    <h2 class="how-to-play-title" :style="{ color: popGameAssets.accentColor }">
                                        How to Play
                                    </h2>

                                    <div class="how-to-play-steps">
                                        <div class="step">
                                            <div class="step-number" :style="{ background: popGameAssets.primaryColor }">1</div>
                                            <div class="step-content">
                                                <h3>Tap to Pop</h3>
                                                <p>Click or tap on any {{ itemLabelSingular }} to pop it and reveal what's inside.</p>
                                            </div>
                                        </div>

                                        <div class="step">
                                            <div class="step-number" :style="{ background: popGameAssets.primaryColor }">2</div>
                                            <div class="step-content">
                                                <h3>Reveal Your Prize</h3>
                                                <p>Each {{ itemLabelSingular }} contains a ticket number - some are instant winners!</p>
                                            </div>
                                        </div>

                                        <div class="step">
                                            <div class="step-number" :style="{ background: popGameAssets.primaryColor }">3</div>
                                            <div class="step-content">
                                                <h3>Collect Winnings</h3>
                                                <p>Winning {{ itemLabelPlural }} show your prize amount immediately!</p>
                                            </div>
                                        </div>
                                    </div>

                                    <div class="how-to-play-tip">
                                        <span class="tip-icon">💡</span>
                                        <span>Pop all {{ itemLabelPlural }} to see your total winnings!</span>
                                    </div>

                                    <button
                                        @click="toggleHowToPlay"
                                        class="how-to-play-got-it"
                                        :style="{ background: popGameAssets.primaryColor }"
                                    >
                                        Got it!
                                    </button>
                                </div>
                            </div>
                        </Transition>
                    </div>
                </Transition>

                <!-- Pop Game Content -->
                <div
                    v-if="showPopGame && showGameBoard"
                    :class="['flex flex-col relative pop-game-wrapper overflow-hidden', demoMode ? 'flex-1' : 'h-full']"
                    :style="{
                        zIndex: 1,
                        '--game-bg': popGameAssets.popBgColor || '#1a1a2e',
                        '--game-primary': popGameAssets.primaryColor || '#e94560',
                        '--game-accent': popGameAssets.accentColor || '#ffd700'
                    }"
                >
                    <!-- Back to Lobby Button (Demo Mode) -->
                    <button
                        v-if="demoMode"
                        @click="backToLobby"
                        class="demo-back-btn"
                    >
                        Back to Lobby
                    </button>
                    <!-- Game Section -->
                    <PopGameBoard
                        :popGameAssets="popGameAssets"
                        :demoMode="demoMode"
                        :previewMode="actualPreviewMode"
                        :tickets="tickets"
                        :playedTickets="playedTickets"
                        :instant_win_categories="instant_win_categories"
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
            <audio v-if="popGameAssets.welcomeSound" ref="welcomeAudio" :src="popGameAssets.welcomeSound" preload="auto"></audio>
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

/* Skip Intro Button */
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

/* Lobby Screen */
.lobby-screen {
    --lobby-primary: #e94560;
    --lobby-secondary: #1a1a2e;
    --lobby-accent: #ffd700;

    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    display: flex;
    align-items: center;
    justify-content: center;
    background: transparent;
    z-index: 1;
    overflow: hidden;
}

/* Floating Items Container */
.floating-items-container {
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    pointer-events: none;
    z-index: 0;
    overflow: hidden;
}

.floating-item {
    position: absolute;
    bottom: -80px; /* Start below the screen */
    opacity: 0;
    animation:
        floatUp var(--float-duration, 10s) linear infinite,
        sway 3s ease-in-out infinite,
        fadeInOut var(--float-duration, 10s) linear infinite;
    animation-delay: var(--float-delay, 0s);
    filter: drop-shadow(0 4px 8px rgba(0,0,0,0.3));
    transform-origin: center center;
}

.floating-item .balloon-svg,
.floating-item .present-svg,
.floating-item .egg-svg {
    display: block;
}

.floating-custom-image {
    object-fit: contain;
    filter: drop-shadow(0 4px 8px rgba(0,0,0,0.3));
}

/* Float from bottom to top - stop well before edge */
@keyframes floatUp {
    0% {
        bottom: -120px;
    }
    100% {
        bottom: 85%;
    }
}

/* Side-to-side sway while floating */
@keyframes sway {
    0%, 100% {
        transform: translateX(0) rotate(-3deg);
    }
    25% {
        transform: translateX(var(--sway-amount, 15px)) rotate(2deg);
    }
    75% {
        transform: translateX(calc(var(--sway-amount, 15px) * -1)) rotate(-2deg);
    }
}

/* Fade in at start, fade out well before top */
@keyframes fadeInOut {
    0% {
        opacity: 0;
    }
    10% {
        opacity: 0.7;
    }
    70% {
        opacity: 0.7;
    }
    90% {
        opacity: 0;
    }
    100% {
        opacity: 0;
    }
}

.lobby-content {
    text-align: center;
    padding: 30px;
    max-width: 400px;
    width: 100%;
    position: relative;
    z-index: 1;
}

.lobby-title-area {
    margin-bottom: 25px;
}

.title-banner {
    position: relative;
    display: inline-block;
    animation: bannerBounce 2.5s ease-in-out infinite;
}

.lobby-title-image {
    max-width: 280px;
    max-height: 120px;
    margin: 0 auto;
    filter: drop-shadow(0 0 30px rgba(255,215,0,0.5));
}

.lobby-title {
    font-size: 2.8rem;
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

/* Ticket Count Display */
.lobby-ticket-display {
    margin-bottom: 30px;
    animation: ticketPulse 3s ease-in-out infinite;
}

.ticket-count-circle {
    --circle-color: #e94560;

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

/* Lobby Buttons */
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

.lobby-btn .btn-text {
    position: relative;
    z-index: 1;
}

.lobby-btn-primary {
    --btn-color: #e94560;
    --btn-glow: #ffd700;

    background: linear-gradient(180deg, var(--btn-color) 0%, color-mix(in srgb, var(--btn-color) 70%, black) 100%);
    color: white;
    box-shadow:
        0 6px 0 color-mix(in srgb, var(--btn-color) 50%, black),
        0 12px 30px rgba(0, 0, 0, 0.4),
        0 0 50px color-mix(in srgb, var(--btn-glow) 40%, transparent);
    animation: primaryBtnPulse 2s ease-in-out infinite;
}

.lobby-btn-primary::before {
    content: '';
    position: absolute;
    top: 0;
    left: -100%;
    width: 100%;
    height: 100%;
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
            0 12px 30px rgba(0, 0, 0, 0.4),
            0 0 50px color-mix(in srgb, var(--btn-glow) 40%, transparent);
        transform: scale(1);
    }
    50% {
        box-shadow:
            0 6px 0 color-mix(in srgb, var(--btn-color) 50%, black),
            0 12px 30px rgba(0, 0, 0, 0.4),
            0 0 70px color-mix(in srgb, var(--btn-glow) 60%, transparent);
        transform: scale(1.02);
    }
}

.lobby-btn-primary:hover {
    transform: translateY(-3px) scale(1.03);
}

.lobby-btn-primary:active {
    transform: translateY(2px) scale(0.98);
    box-shadow:
        0 2px 0 color-mix(in srgb, var(--btn-color) 50%, black),
        0 4px 15px rgba(0, 0, 0, 0.4);
}

/* Help Button - Smaller, subtle */
.lobby-btn-help {
    --help-color: #ffd700;

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

.lobby-btn-help svg {
    width: 18px;
    height: 18px;
}

.lobby-btn-help:hover {
    background: color-mix(in srgb, var(--help-color) 15%, transparent);
    border-color: var(--help-color);
}

/* How to Play Overlay */
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

/* Transitions */
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

/* Intro Title (During Video) */
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

/* Game Board Background */
.pop-game-wrapper {
    --game-bg: #1a1a2e;
    --game-primary: #e94560;
    --game-accent: #ffd700;

    background: transparent;
    position: relative;
    z-index: 1;
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

/* Video Background */
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
    --bg-image: none;
    --bg-color: #1a1a2e;

    background-color: var(--bg-color);
    background-image: var(--bg-image);
    background-size: cover;
    background-position: center;
    background-repeat: no-repeat;
    position: relative;
}

/* Overlay gradient when no background image is set */
.unified-bg::before {
    content: '';
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    background:
        radial-gradient(ellipse at center top, rgba(255, 215, 0, 0.12) 0%, transparent 40%),
        radial-gradient(ellipse at center bottom, rgba(233, 69, 96, 0.15) 0%, transparent 50%);
    pointer-events: none;
    z-index: 0;
}

/* When background image is set, add a subtle dark overlay for readability */
.unified-bg[style*="url("]::before {
    background:
        linear-gradient(180deg, rgba(0,0,0,0.3) 0%, rgba(0,0,0,0.5) 100%);
}

/* Demo mode styling */
.demo-mode {
    display: flex;
    flex-direction: column;
}

.demo-mode .pop-game-wrapper {
    flex: 1;
    min-height: 0;
    overflow: hidden;
}

/* Ensure non-demo mode also scrolls properly */
.pop-game-wrapper {
    min-height: 0;
}
</style>
