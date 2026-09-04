<script setup lang="ts">
import { onMounted, reactive, onUnmounted, watch, ref, computed } from 'vue';
import SlotsGame from './SlotsGame.vue';

interface Assets {
    name?: string;
    background: string;
    header: string;
    machineImage: string;
    footerImage: string;
    titleText: string;
    titleColor: string;
    titleImage?: string;
    spinButtonImage?: string;
    primaryColor?: string;
    secondaryColor?: string;
    accentColor?: string;
    textColor?: string;
    theme?: string;
    welcomeSound?: string;
    spinSound?: string;
    winSound?: string;
    lossSound?: string;
    machineBgColor?: string;
    inventoryEmoji?: string;
    inventoryButtonColor?: string;
    matchTextColor?: string;
    prizesModalBgColor?: string;
    prizesTitleColor?: string;
    prizesCardBorderColor?: string;
    prizesCardBgColor?: string;
    prizesValueColor?: string;
    winGlowColor?: string;
    machineBorderColor?: string;
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
const welcomeAudio = ref<HTMLAudioElement | null>(null);
const introVideoRef = ref<HTMLVideoElement | null>(null);
const showSlotsGame = ref(true); // Always show to display title
const showSlotsMachine = ref(props.demoMode); // In demo mode, show immediately. In live mode, show after intro

// Check if there's an intro video
const hasIntroVideo = computed(() => {
    if (!props.assets.background) return false;
    const videoExtensions = ['.mp4', '.webm', '.ogg', '.mov'];
    const isVideo = videoExtensions.some(ext => props.assets.background.toLowerCase().endsWith(ext));
    return isVideo;
});

const slotsAssets = reactive({
    titleText: props.assets.titleText || '🐟 LUCKY FISH 🐟',
    titleColor: props.assets.titleColor || '#00FFFF',
    titleImage: props.assets.titleImage || '',
    spinButtonImage: props.assets.spinButtonImage || '',
    machineImage: props.assets.machineImage || '',
    footerImage: props.assets.footerImage || '',
    background: '', // Will be set by watcher
    header: props.assets.header || '',
    primaryColor: props.assets.primaryColor || '#00CED1',
    secondaryColor: props.assets.secondaryColor || '#1a5a7a',
    accentColor: props.assets.accentColor || '#00FFFF',
    textColor: props.assets.textColor || '#FFFFFF',
    theme: props.assets.theme || 'underwater',
    welcomeSound: props.assets.welcomeSound || '',
    spinSound: props.assets.spinSound || '',
    winSound: props.assets.winSound || '',
    lossSound: props.assets.lossSound || '',
    machineBgColor: props.assets.machineBgColor || '#1a5a7a',
    inventoryEmoji: props.assets.inventoryEmoji || '🎣',
    inventoryButtonColor: props.assets.inventoryButtonColor || '#FFD700',
    matchTextColor: props.assets.matchTextColor || '#7FDBFF',
    prizesModalBgColor: props.assets.prizesModalBgColor || '#1F2937',
    prizesTitleColor: props.assets.prizesTitleColor || '#FFD700',
    prizesCardBorderColor: props.assets.prizesCardBorderColor || '#FFD700',
    prizesCardBgColor: props.assets.prizesCardBgColor || '#374151',
    prizesValueColor: props.assets.prizesValueColor || '#10B981',
    winGlowColor: props.assets.winGlowColor || '#FFD700',
    machineBorderColor: props.assets.machineBorderColor || '#00BFFF',
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

// Watch for asset changes
watch(
    () => props.assets.titleText,
    (newVal) => { slotsAssets.titleText = newVal || 'SPIN THE SLOTS!'; },
    { immediate: true }
);

watch(
    () => props.assets.titleColor,
    (newVal) => { slotsAssets.titleColor = newVal || '#FFD700'; },
    { immediate: true }
);

watch(
    () => props.assets.machineImage,
    (newVal) => { slotsAssets.machineImage = newVal || ''; },
    { immediate: true }
);

watch(
    () => props.assets.footerImage,
    (newVal) => { slotsAssets.footerImage = newVal || ''; },
    { immediate: true }
);

watch(
    () => props.assets.background,
    (newVal) => {
        slotsAssets.background = newVal || '';
    },
    { immediate: true }
);

watch(
    () => props.assets.header,
    (newVal) => { slotsAssets.header = newVal || ''; },
    { immediate: true }
);

watch(
    () => props.assets.primaryColor,
    (newVal) => { slotsAssets.primaryColor = newVal || '#F59E0B'; },
    { immediate: true }
);

watch(
    () => props.assets.secondaryColor,
    (newVal) => { slotsAssets.secondaryColor = newVal || '#1F2937'; },
    { immediate: true }
);

watch(
    () => props.assets.accentColor,
    (newVal) => { slotsAssets.accentColor = newVal || '#EF4444'; },
    { immediate: true }
);

watch(
    () => props.assets.textColor,
    (newVal) => { slotsAssets.textColor = newVal || '#FFFFFF'; },
    { immediate: true }
);

watch(
    () => props.assets.titleImage,
    (newVal) => { slotsAssets.titleImage = newVal || ''; },
    { immediate: true }
);

watch(
    () => props.assets.spinButtonImage,
    (newVal) => { slotsAssets.spinButtonImage = newVal || ''; },
    { immediate: true }
);

watch(
    () => props.assets.welcomeSound,
    (newVal) => { slotsAssets.welcomeSound = newVal || ''; },
    { immediate: true }
);

watch(
    () => props.assets.spinSound,
    (newVal) => { slotsAssets.spinSound = newVal || ''; },
    { immediate: true }
);

watch(
    () => props.assets.winSound,
    (newVal) => { slotsAssets.winSound = newVal || ''; },
    { immediate: true }
);

watch(
    () => props.assets.lossSound,
    (newVal) => { slotsAssets.lossSound = newVal || ''; },
    { immediate: true }
);

watch(
    () => props.assets.theme,
    (newVal) => { slotsAssets.theme = newVal || 'underwater'; },
    { immediate: true }
);

// Watch for customization field changes
watch(
    () => props.assets.machineBgColor,
    (newVal) => {
        slotsAssets.machineBgColor = newVal || '#1a5a7a';
    },
    { immediate: true }
);

watch(
    () => props.assets.inventoryEmoji,
    (newVal) => {
        slotsAssets.inventoryEmoji = newVal || '🎣';
    },
    { immediate: true }
);

watch(
    () => props.assets.inventoryButtonColor,
    (newVal) => {
        slotsAssets.inventoryButtonColor = newVal || '#FFD700';
    },
    { immediate: true }
);

watch(
    () => props.assets.matchTextColor,
    (newVal) => {
        slotsAssets.matchTextColor = newVal || '#7FDBFF';
    },
    { immediate: true }
);

// Watch for prizes modal customization changes
watch(
    () => props.assets.prizesModalBgColor,
    (newVal) => {
        slotsAssets.prizesModalBgColor = newVal || '#1F2937';
    },
    { immediate: true }
);

watch(
    () => props.assets.prizesTitleColor,
    (newVal) => {
        slotsAssets.prizesTitleColor = newVal || '#FFD700';
    },
    { immediate: true }
);

watch(
    () => props.assets.prizesCardBorderColor,
    (newVal) => {
        slotsAssets.prizesCardBorderColor = newVal || '#FFD700';
    },
    { immediate: true }
);

watch(
    () => props.assets.prizesCardBgColor,
    (newVal) => {
        slotsAssets.prizesCardBgColor = newVal || '#374151';
    },
    { immediate: true }
);

watch(
    () => props.assets.prizesValueColor,
    (newVal) => {
        slotsAssets.prizesValueColor = newVal || '#10B981';
    },
    { immediate: true }
);

watch(
    () => props.assets.winGlowColor,
    (newVal) => {
        slotsAssets.winGlowColor = newVal || '#FFD700';
    },
    { immediate: true }
);

watch(
    () => props.assets.machineBorderColor,
    (newVal) => {
        slotsAssets.machineBorderColor = newVal || '#00BFFF';
    },
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
            // In demo mode, skip intro video and show everything immediately
            if (props.demoMode) {
                showSlotsGame.value = true;
                showSlotsMachine.value = true;
            }
            // Play intro video if available (live mode only)
            else if (hasIntroVideo.value) {
                // Show title immediately, but hide machine
                showSlotsGame.value = true;
                showSlotsMachine.value = false;

                // Wait for video element to be rendered
                await new Promise(resolve => setTimeout(resolve, 100));

                if (introVideoRef.value) {
                    // Pause video at 5 seconds and show slot machine with gentle animation
                    setTimeout(() => {
                        if (introVideoRef.value) {
                            introVideoRef.value.pause();
                            // Show slot machine with gentle animation
                            showSlotsMachine.value = true;
                        }
                    }, 5000);
                }
            } else {
                // No video, show everything immediately
                showSlotsGame.value = true;
                showSlotsMachine.value = true;
            }

            // Play welcome sound (only in live mode, not in demo mode)
            if (slotsAssets.welcomeSound && !props.demoMode) {
                // Wait for next tick to ensure audio element is rendered
                await new Promise(resolve => setTimeout(resolve, 100));

                if (welcomeAudio.value) {
                    try {
                        welcomeAudio.value.load(); // Ensure audio is loaded
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
            // Reset visibility
            showSlotsGame.value = true;
            showSlotsMachine.value = !hasIntroVideo.value;
        }
    }
);

const onPrizeWon = (): void => {
    // Prize won - handled by reel animation
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
                            <span class="ml-4 text-gray-300">🎰 Slots Game - Spin to Win</span>
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

                <!-- Video Background (always rendered if video exists) -->
                <div v-if="hasIntroVideo" class="video-background" :style="{ zIndex: 0 }">
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

                <!-- Slots Game Content -->
                <div v-if="showSlotsGame" :class="['flex flex-col relative slots-game-wrapper overflow-hidden', demoMode ? 'flex-1' : 'h-full']" :style="{ zIndex: 1 }">                    <!-- Game Section - takes full space -->
                    <SlotsGame
                        :slotsAssets="slotsAssets"
                        :demoMode="demoMode"
                        :previewMode="actualPreviewMode"
                        :tickets="tickets"
                        :playedTickets="playedTickets"
                        :instant_win_categories="instant_win_categories"
                        :animateTitle="hasIntroVideo"
                        :showMachine="showSlotsMachine"
                        @ticket-played="onTicketPlayed"
                        @prize-won="onPrizeWon"
                    />
                </div>

            </div>

            <!-- Preview Size Info -->
            <div v-if="demoMode" class="mt-2 text-center text-gray-400 text-xs">
                {{ actualPreviewMode === 'mobile' ? '📱 Mobile Preview (420x650)' : '💻 Desktop Preview (700x650)' }}
            </div>

            <!-- Welcome Sound -->
            <audio v-if="slotsAssets.welcomeSound" ref="welcomeAudio" :src="slotsAssets.welcomeSound" preload="auto"></audio>
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

/* Win card entrance */
.win-card {
    animation: win-card-entrance 0.4s cubic-bezier(0.34, 1.56, 0.64, 1);
}

@keyframes win-card-entrance {
    0% {
        transform: scale(0.9);
        opacity: 0;
    }
    100% {
        transform: scale(1);
        opacity: 1;
    }
}

/* Stagger delays for bounce animation */
.delay-100 {
    animation-delay: 0.1s;
}

.delay-200 {
    animation-delay: 0.2s;
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

/* Farm sky background - clean and simple */
.slots-game-bg-farm {
    position: relative;
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

.demo-mode .slots-game-wrapper {
    flex: 1;
    min-height: 0; /* Important for flex children to shrink properly */
    overflow: hidden;
}
</style>
