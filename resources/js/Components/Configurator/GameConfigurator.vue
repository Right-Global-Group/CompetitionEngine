<script setup>
import { ref, inject, computed } from 'vue';
import SlotsGame from '@/Components/Games/SlotsGame.vue';
import SpinGame from '@/Components/Games/SpinGame.vue';
import ScratchGame from '@/Components/Games/ScratchGame.vue';
import BingoGame from '@/Components/Games/BingoGame.vue';
import CoinDropGame from '@/Components/Games/CoinDropGame.vue';
import BalloonPopGame from '@/Components/Games/PopGame.vue';

const activeTab = ref('slots');

const getText = inject('getText', (key, fallback = '') => fallback);
const siteTexts = inject('siteTexts');

// Get heading parts
const headingParts = computed(() => {
    const parts = [];
    
    const before = getText('configurator.heading_before', 'Build Your Game');
    const keyword = getText('configurator.heading_keyword', '');
    const after = getText('configurator.heading_after', '');
    
    if (before && before.trim()) {
        parts.push({ text: before + ' ', isKeyword: false });
    }
    
    if (keyword && keyword.trim()) {
        parts.push({ text: keyword, isKeyword: true });
    }
    
    if (after && after.trim()) {
        parts.push({ text: ' ' + after, isKeyword: false });
    }
    
    return parts;
});
    

const tabs = [
    { id: 'slots', name: 'Slots', icon: '🎰' },
    { id: 'scratch', name: 'Scratch', icon: '🎫' },
    { id: 'spin', name: 'Spinny', icon: '🎡' },
    { id: 'bingo', name: 'Bingo', icon: '🎱' },
    { id: 'coindrop', name: 'Coin Drop', icon: '🪙' },
    { id: 'balloonpop', name: 'Balloon Pop', icon: '🎈' }
];

// Image uploads (stored as blob URLs)
const slotsImages = ref({
    titleImage: '',
    background: '',
    spinButtonImage: ''
});

const spinImages = ref({
    background: ''
});

const scratchImages = ref({
    overlay: '',
    background: '',
    header: ''
});

const bingoImages = ref({
    background: '',
    header: '',
    cardCover: ''
});

const coinDropImages = ref({
    background: '',
    header: '',
    titleImage: '',
    dropButtonImage: '',
    ballImage: '',
    winBucketImage: '',
    loseBucketImage: '',
    tubeImage: '',
    machineImage: '',
    footerImage: ''
});

const balloonPopImages = ref({
    background: '',
    header: '',
    titleImage: '',
    popItemImage: ''
});

// Handle image upload - specific handlers for each
const handleSlotsTitleImage = (event) => {
    const file = event.target.files?.[0];
    if (file) {
        if (slotsImages.value.titleImage) URL.revokeObjectURL(slotsImages.value.titleImage);
        slotsImages.value.titleImage = URL.createObjectURL(file);
    }
};

const handleSlotsBackground = (event) => {
    const file = event.target.files?.[0];
    if (file) {
        if (slotsImages.value.background) URL.revokeObjectURL(slotsImages.value.background);
        slotsImages.value.background = URL.createObjectURL(file);
    }
};

const handleSlotsSpinButton = (event) => {
    const file = event.target.files?.[0];
    if (file) {
        if (slotsImages.value.spinButtonImage) URL.revokeObjectURL(slotsImages.value.spinButtonImage);
        slotsImages.value.spinButtonImage = URL.createObjectURL(file);
    }
};

const handleSpinBackground = (event) => {
    const file = event.target.files?.[0];
    if (file) {
        if (spinImages.value.background) URL.revokeObjectURL(spinImages.value.background);
        spinImages.value.background = URL.createObjectURL(file);
    }
};

const handleScratchOverlay = (event) => {
    const file = event.target.files?.[0];
    if (file) {
        if (scratchImages.value.overlay) URL.revokeObjectURL(scratchImages.value.overlay);
        scratchImages.value.overlay = URL.createObjectURL(file);
    }
};

const handleScratchBackground = (event) => {
    const file = event.target.files?.[0];
    if (file) {
        if (scratchImages.value.background) URL.revokeObjectURL(scratchImages.value.background);
        scratchImages.value.background = URL.createObjectURL(file);
    }
};

const handleScratchHeader = (event) => {
    const file = event.target.files?.[0];
    if (file) {
        if (scratchImages.value.header) URL.revokeObjectURL(scratchImages.value.header);
        scratchImages.value.header = URL.createObjectURL(file);
    }
};

const handleBingoBackground = (event) => {
    const file = event.target.files?.[0];
    if (file) {
        if (bingoImages.value.background) URL.revokeObjectURL(bingoImages.value.background);
        bingoImages.value.background = URL.createObjectURL(file);
    }
};

const handleBingoHeader = (event) => {
    const file = event.target.files?.[0];
    if (file) {
        if (bingoImages.value.header) URL.revokeObjectURL(bingoImages.value.header);
        bingoImages.value.header = URL.createObjectURL(file);
    }
};

const handleBingoCardCover = (event) => {
    const file = event.target.files?.[0];
    if (file) {
        if (bingoImages.value.cardCover) URL.revokeObjectURL(bingoImages.value.cardCover);
        bingoImages.value.cardCover = URL.createObjectURL(file);
    }
};

// Clear image helpers
const clearSlotsTitleImage = () => {
    if (slotsImages.value.titleImage) URL.revokeObjectURL(slotsImages.value.titleImage);
    slotsImages.value.titleImage = '';
};

const clearSlotsBackground = () => {
    if (slotsImages.value.background) URL.revokeObjectURL(slotsImages.value.background);
    slotsImages.value.background = '';
};

const clearSlotsSpinButton = () => {
    if (slotsImages.value.spinButtonImage) URL.revokeObjectURL(slotsImages.value.spinButtonImage);
    slotsImages.value.spinButtonImage = '';
};

const clearSpinBackground = () => {
    if (spinImages.value.background) URL.revokeObjectURL(spinImages.value.background);
    spinImages.value.background = '';
};

const clearScratchOverlay = () => {
    if (scratchImages.value.overlay) URL.revokeObjectURL(scratchImages.value.overlay);
    scratchImages.value.overlay = '';
};

const clearScratchBackground = () => {
    if (scratchImages.value.background) URL.revokeObjectURL(scratchImages.value.background);
    scratchImages.value.background = '';
};

const clearScratchHeader = () => {
    if (scratchImages.value.header) URL.revokeObjectURL(scratchImages.value.header);
    scratchImages.value.header = '';
};

const clearBingoBackground = () => {
    if (bingoImages.value.background) URL.revokeObjectURL(bingoImages.value.background);
    bingoImages.value.background = '';
};

const clearBingoHeader = () => {
    if (bingoImages.value.header) URL.revokeObjectURL(bingoImages.value.header);
    bingoImages.value.header = '';
};

const clearBingoCardCover = () => {
    if (bingoImages.value.cardCover) URL.revokeObjectURL(bingoImages.value.cardCover);
    bingoImages.value.cardCover = '';
};

// Coin Drop image handlers
const handleCoinDropBackground = (event) => {
    const file = event.target.files?.[0];
    if (file) {
        if (coinDropImages.value.background) URL.revokeObjectURL(coinDropImages.value.background);
        coinDropImages.value.background = URL.createObjectURL(file);
    }
};

const handleCoinDropHeader = (event) => {
    const file = event.target.files?.[0];
    if (file) {
        if (coinDropImages.value.header) URL.revokeObjectURL(coinDropImages.value.header);
        coinDropImages.value.header = URL.createObjectURL(file);
    }
};

const handleCoinDropTitleImage = (event) => {
    const file = event.target.files?.[0];
    if (file) {
        if (coinDropImages.value.titleImage) URL.revokeObjectURL(coinDropImages.value.titleImage);
        coinDropImages.value.titleImage = URL.createObjectURL(file);
    }
};

// Add these handlers after your existing Coin Drop handlers:

const handleCoinDropBallImage = (event) => {
    const file = event.target.files?.[0];
    if (file) {
        if (coinDropImages.value.ballImage) URL.revokeObjectURL(coinDropImages.value.ballImage);
        coinDropImages.value.ballImage = URL.createObjectURL(file);
    }
};

const handleCoinDropDropButton = (event) => {
    const file = event.target.files?.[0];
    if (file) {
        if (coinDropImages.value.dropButtonImage) URL.revokeObjectURL(coinDropImages.value.dropButtonImage);
        coinDropImages.value.dropButtonImage = URL.createObjectURL(file);
    }
};

const handleCoinDropWinBucket = (event) => {
    const file = event.target.files?.[0];
    if (file) {
        if (coinDropImages.value.winBucketImage) URL.revokeObjectURL(coinDropImages.value.winBucketImage);
        coinDropImages.value.winBucketImage = URL.createObjectURL(file);
    }
};

const handleCoinDropLoseBucket = (event) => {
    const file = event.target.files?.[0];
    if (file) {
        if (coinDropImages.value.loseBucketImage) URL.revokeObjectURL(coinDropImages.value.loseBucketImage);
        coinDropImages.value.loseBucketImage = URL.createObjectURL(file);
    }
};

const handleCoinDropTube = (event) => {
    const file = event.target.files?.[0];
    if (file) {
        if (coinDropImages.value.tubeImage) URL.revokeObjectURL(coinDropImages.value.tubeImage);
        coinDropImages.value.tubeImage = URL.createObjectURL(file);
    }
};

const handleCoinDropMachine = (event) => {
    const file = event.target.files?.[0];
    if (file) {
        if (coinDropImages.value.machineImage) URL.revokeObjectURL(coinDropImages.value.machineImage);
        coinDropImages.value.machineImage = URL.createObjectURL(file);
    }
};

const handleCoinDropFooter = (event) => {
    const file = event.target.files?.[0];
    if (file) {
        if (coinDropImages.value.footerImage) URL.revokeObjectURL(coinDropImages.value.footerImage);
        coinDropImages.value.footerImage = URL.createObjectURL(file);
    }
};

// Balloon Pop image handlers
const handleBalloonPopBackground = (event) => {
    const file = event.target.files?.[0];
    if (file) {
        if (balloonPopImages.value.background) URL.revokeObjectURL(balloonPopImages.value.background);
        balloonPopImages.value.background = URL.createObjectURL(file);
    }
};

const handleBalloonPopHeader = (event) => {
    const file = event.target.files?.[0];
    if (file) {
        if (balloonPopImages.value.header) URL.revokeObjectURL(balloonPopImages.value.header);
        balloonPopImages.value.header = URL.createObjectURL(file);
    }
};

const handleBalloonPopTitleImage = (event) => {
    const file = event.target.files?.[0];
    if (file) {
        if (balloonPopImages.value.titleImage) URL.revokeObjectURL(balloonPopImages.value.titleImage);
        balloonPopImages.value.titleImage = URL.createObjectURL(file);
    }
};

const handleBalloonPopItemImage = (event) => {
    const file = event.target.files?.[0];
    if (file) {
        if (balloonPopImages.value.popItemImage) URL.revokeObjectURL(balloonPopImages.value.popItemImage);
        balloonPopImages.value.popItemImage = URL.createObjectURL(file);
    }
};

// Slots Configuration
const slotsConfig = ref({
    titleText: 'LUCKY SLOTS',
    titleColor: '#00FFFF',
    primaryColor: '#00CED1',
    secondaryColor: '#1a5a7a',
    accentColor: '#00FFFF',
    textColor: '#FFFFFF',
    machineBgColor: '#1a5a7a',
    matchTextColor: '#7FDBFF',
    inventoryEmoji: '🎣',
    inventoryButtonColor: '#FFD700',
    prizesModalBgColor: '#1F2937',
    prizesTitleColor: '#FFD700',
    prizesCardBorderColor: '#FFD700',
    prizesCardBgColor: '#374151',
    prizesValueColor: '#10B981'
});

// Scratch Configuration
const scratchConfig = ref({
    textColour: '#FFFFFF',
    wonTextColour: '#00FF00',
    loseTextColour: '#FF4444',
    accentColour: '#FFD700'
});

// Spin Configuration
const spinConfig = ref({
    titleText: 'SPIN TO WIN',
    titleColor: '#FFD700',
    wheelEdgeColor: '#00aeff',
    walletText: '',
    walletColor: '#8b5cf6'
});

// Bingo Configuration
const bingoConfig = ref({
    bgStart: '#1e3a8a',
    bgEnd: '#1e40af',
    frameColor: '#3b82f6',
    frameGlow: '#60a5fa',
    squareBg: '#374151',
    squareText: '#e5e7eb',
    diamond1: '#06b6d4',
    diamond2: '#67e8f9',
    winnerGlow: '#10b981',
    winnerBg: '#059669',
    popupStart: '#10b981',
    popupEnd: '#059669',
    diamondEmoji: '💎'
});

// Coin Drop Configuration
const coinDropConfig = ref({
    titleText: 'COIN DROP!',
    titleColor: '#FFD700',
    primaryColor: '#e94560',
    secondaryColor: '#1a1a2e',
    accentColor: '#ffd700',
    boardBgColor: '#1a1a2e',
    pegColor: '#ffffff',
    pegGlowColor: '#e94560',
    ballColor: '#ffd700',
    ballGlowColor: '#ffaa00',
    winBucketColor: '#00ff88',
    loseBucketColor: '#ff4444',
    trailColor: '#e94560',
    pegShape: 'hexagon'
});

// Balloon Pop Configuration
const balloonPopConfig = ref({
    titleText: 'POP TO WIN!',
    titleColor: '#FFD700',
    primaryColor: '#e94560',
    secondaryColor: '#1a1a2e',
    accentColor: '#ffd700',
    popBgColor: '#1a1a2e',
    popItemType: 'balloon',
    popWinColor: '#00ff88',
    popLoseColor: '#ff4444',
    popSubtitleText: 'Pop balloons to reveal your prize!'
});

// Computed assets for each game
const slotsAssets = computed(() => ({
    titleText: slotsConfig.value.titleText,
    titleColor: slotsConfig.value.titleColor,
    primaryColor: slotsConfig.value.primaryColor,
    secondaryColor: slotsConfig.value.secondaryColor,
    accentColor: slotsConfig.value.accentColor,
    textColor: slotsConfig.value.textColor,
    machineBgColor: slotsConfig.value.machineBgColor,
    matchTextColor: slotsConfig.value.matchTextColor,
    inventoryEmoji: slotsConfig.value.inventoryEmoji,
    inventoryButtonColor: slotsConfig.value.inventoryButtonColor,
    prizesModalBgColor: slotsConfig.value.prizesModalBgColor,
    prizesTitleColor: slotsConfig.value.prizesTitleColor,
    prizesCardBorderColor: slotsConfig.value.prizesCardBorderColor,
    prizesCardBgColor: slotsConfig.value.prizesCardBgColor,
    prizesValueColor: slotsConfig.value.prizesValueColor,
    // Images
    titleImage: slotsImages.value.titleImage,
    background: slotsImages.value.background,
    spinButtonImage: slotsImages.value.spinButtonImage,
    machineImage: '',
    footerImage: '',
    header: ''
}));

const spinAssets = computed(() => ({
    titleText: spinConfig.value.titleText,
    titleColor: spinConfig.value.titleColor,
    wheelEdgeColor: spinConfig.value.wheelEdgeColor,
    walletText: spinConfig.value.walletText,
    walletColor: spinConfig.value.walletColor,
    background: spinImages.value.background
}));

const scratchAssets = computed(() => ({
    background: scratchImages.value.background,
    overlay: scratchImages.value.overlay,
    header: scratchImages.value.header,
    textColour: scratchConfig.value.textColour,
    wonTextColour: scratchConfig.value.wonTextColour,
    loseTextColour: scratchConfig.value.loseTextColour,
    accentColour: scratchConfig.value.accentColour
}));

const bingoAssets = computed(() => ({
    background: bingoImages.value.background,
    header: bingoImages.value.header,
    cardCover: bingoImages.value.cardCover,
    bgStart: bingoConfig.value.bgStart,
    bgEnd: bingoConfig.value.bgEnd,
    frameColor: bingoConfig.value.frameColor,
    frameGlow: bingoConfig.value.frameGlow,
    squareBg: bingoConfig.value.squareBg,
    squareText: bingoConfig.value.squareText,
    diamond1: bingoConfig.value.diamond1,
    diamond2: bingoConfig.value.diamond2,
    winnerGlow: bingoConfig.value.winnerGlow,
    winnerBg: bingoConfig.value.winnerBg,
    popupStart: bingoConfig.value.popupStart,
    popupEnd: bingoConfig.value.popupEnd,
    diamondEmoji: bingoConfig.value.diamondEmoji
}));

const coinDropAssets = computed(() => ({
    name: 'Coin Drop',
    titleText: coinDropConfig.value.titleText,
    titleColor: coinDropConfig.value.titleColor,
    primaryColor: coinDropConfig.value.primaryColor,
    secondaryColor: coinDropConfig.value.secondaryColor,
    accentColor: coinDropConfig.value.accentColor,
    textColor: '#FFFFFF',
    boardBgColor: coinDropConfig.value.boardBgColor,
    pegColor: coinDropConfig.value.pegColor,
    pegGlowColor: coinDropConfig.value.pegGlowColor,
    ballColor: coinDropConfig.value.ballColor,
    ballGlowColor: coinDropConfig.value.ballGlowColor,
    winBucketColor: coinDropConfig.value.winBucketColor,
    loseBucketColor: coinDropConfig.value.loseBucketColor,
    trailColor: coinDropConfig.value.trailColor,
    pegShape: coinDropConfig.value.pegShape,
    background: coinDropImages.value.background || '',
    header: coinDropImages.value.header || '',
    titleImage: coinDropImages.value.titleImage || '',
    dropButtonImage: coinDropImages.value.dropButtonImage || '',
    ballImage: coinDropImages.value.ballImage || '',
    winBucketImage: coinDropImages.value.winBucketImage || '',
    loseBucketImage: coinDropImages.value.loseBucketImage || '',
    tubeImage: coinDropImages.value.tubeImage || '',
    machineImage: '',
    footerImage: '',
    gameBackground: coinDropImages.value.background || '',
    welcomeSound: '',
    dropSound: '',
    winSound: '',
    lossSound: ''
}));

const balloonPopAssets = computed(() => ({
    name: 'Balloon Pop',
    titleText: balloonPopConfig.value.titleText,
    titleColor: balloonPopConfig.value.titleColor,
    primaryColor: balloonPopConfig.value.primaryColor,
    secondaryColor: balloonPopConfig.value.secondaryColor,
    accentColor: balloonPopConfig.value.accentColor,
    textColor: '#FFFFFF',
    popBgColor: balloonPopConfig.value.popBgColor,
    popItemType: balloonPopConfig.value.popItemType,
    popWinColor: balloonPopConfig.value.popWinColor,
    popLoseColor: balloonPopConfig.value.popLoseColor,
    popSubtitleText: balloonPopConfig.value.popSubtitleText,
    background: balloonPopImages.value.background || '',
    header: balloonPopImages.value.header || '',
    titleImage: balloonPopImages.value.titleImage || '',
    popItemImage: balloonPopImages.value.popItemImage || '',
    popItemColors: ['#FF4C4C', '#FFEB3B', '#64B5F6', '#81C784', '#9575CD', '#FF8A80', '#FFB74D', '#4DD0E1', '#F06292', '#FFD700'],
    popConfettiColors: ['#FFD700', '#FF6B6B', '#4ECDC4', '#45B7D1', '#96CEB4', '#FFEAA7'],
    popSound: '',
    welcomeSound: '',
    winSound: '',
    lossSound: '',
    popItemLabel: ''
}));

// Emoji options for inventory button
const emojiOptions = ['🎣', '🎁', '🏆', '💎', '⭐', '🎯', '🎪', '🎲'];

// Color presets
const colorPresets = {
    slots: [
        { name: 'Ocean', primary: '#00CED1', secondary: '#1a5a7a', accent: '#00FFFF', machine: '#1a5a7a' },
        { name: 'Royal', primary: '#9333EA', secondary: '#581C87', accent: '#A855F7', machine: '#581C87' },
        { name: 'Fire', primary: '#EF4444', secondary: '#7F1D1D', accent: '#F97316', machine: '#7F1D1D' },
        { name: 'Forest', primary: '#22C55E', secondary: '#14532D', accent: '#4ADE80', machine: '#14532D' },
        { name: 'Gold', primary: '#F59E0B', secondary: '#78350F', accent: '#FCD34D', machine: '#78350F' }
    ],
    spin: [
        { name: 'Neon Blue', edge: '#00aeff', title: '#FFD700' },
        { name: 'Purple Glow', edge: '#9333EA', title: '#F0ABFC' },
        { name: 'Fire Red', edge: '#EF4444', title: '#FCD34D' },
        { name: 'Emerald', edge: '#10B981', title: '#FFFFFF' },
        { name: 'Sunset', edge: '#F97316', title: '#FEF3C7' }
    ],
    coindrop: [
        { name: 'Classic', primary: '#e94560', accent: '#ffd700', ball: '#ffd700' },
        { name: 'Emerald', primary: '#10B981', accent: '#34D399', ball: '#6EE7B7' },
        { name: 'Purple', primary: '#9333EA', accent: '#C084FC', ball: '#E9D5FF' },
        { name: 'Fire', primary: '#EF4444', accent: '#F97316', ball: '#FBBF24' }
    ],
    balloonpop: [
        { name: 'Classic', primary: '#e94560', accent: '#ffd700' },
        { name: 'Ocean', primary: '#06B6D4', accent: '#67E8F9' },
        { name: 'Forest', primary: '#22C55E', accent: '#86EFAC' },
        { name: 'Sunset', primary: '#F97316', accent: '#FCD34D' }
    ]
};

const applySlotPreset = (preset) => {
    slotsConfig.value.primaryColor = preset.primary;
    slotsConfig.value.secondaryColor = preset.secondary;
    slotsConfig.value.accentColor = preset.accent;
    slotsConfig.value.machineBgColor = preset.machine;
    slotsConfig.value.titleColor = preset.accent;
};

const applySpinPreset = (preset) => {
    spinConfig.value.wheelEdgeColor = preset.edge;
    spinConfig.value.titleColor = preset.title;
};

const applyCoinDropPreset = (preset) => {
    coinDropConfig.value.primaryColor = preset.primary;
    coinDropConfig.value.accentColor = preset.accent;
    coinDropConfig.value.ballColor = preset.ball;
    coinDropConfig.value.ballGlowColor = preset.ball;
};

const applyBalloonPopPreset = (preset) => {
    balloonPopConfig.value.primaryColor = preset.primary;
    balloonPopConfig.value.accentColor = preset.accent;
};
</script>

<template>
    <section id="configurator" class="configurator-section py-12 md:py-20 relative overflow-hidden">
        <!-- Minimal Background -->
        <div class="absolute inset-0 bg-gradient-to-b from-[#0c0c14] via-[#12121c] to-[#0c0c14]"></div>
        <div class="absolute inset-0 opacity-[0.02]" style="background-image: radial-gradient(circle at 1px 1px, white 1px, transparent 0); background-size: 40px 40px;"></div>

        <div class="container mx-auto px-4 relative z-10">
            <!-- Clean Header -->
            <div class="text-center mb-10 md:mb-14">
                <p class="text-purple-400 text-sm font-medium tracking-widest uppercase mb-3">Game Studio</p>
                <h2 class="text-3xl md:text-5xl font-bold text-white mb-3">
                    <template v-for="(part, index) in headingParts" :key="`heading-part-${index}`">
                        <span v-if="part.isKeyword" class="keyword-animate">{{ part.text }}</span>
                        <template v-else>{{ part.text }}</template>
                    </template>
                </h2>
                <p class="text-gray-500 text-sm md:text-base">Customize every detail in real-time</p>
            </div>

            <div class="grid lg:grid-cols-12 gap-5 max-w-[1400px] mx-auto">
                <!-- Configurator Panel -->
                <div class="lg:col-span-5 xl:col-span-4">
                    <div class="config-card">
                        <!-- Clean Tab Pills -->
                        <div class="tab-container">
                            <button
                                v-for="tab in tabs"
                                :key="tab.id"
                                @click="activeTab = tab.id"
                                :class="['tab-pill', activeTab === tab.id ? 'active' : '']"
                            >
                                <span class="tab-icon">{{ tab.icon }}</span>
                                <span class="tab-label">{{ tab.name }}</span>
                            </button>
                        </div>

                        <div class="config-content custom-scrollbar">

                    <!-- SLOTS Configuration -->
                    <div v-if="activeTab === 'slots'" class="config-sections">
                        <!-- Theme Presets -->
                        <div class="config-section">
                            <div class="section-header">
                                <span class="section-title">Theme</span>
                            </div>
                            <div class="preset-grid">
                                <button
                                    v-for="preset in colorPresets.slots"
                                    :key="preset.name"
                                    @click="applySlotPreset(preset)"
                                    class="preset-btn"
                                    :style="{ '--preset-color': preset.primary }"
                                >
                                    <span class="preset-dot" :style="{ background: preset.primary }"></span>
                                    {{ preset.name }}
                                </button>
                            </div>
                        </div>

                        <!-- Branding -->
                        <div class="config-section">
                            <div class="section-header">
                                <span class="section-title">Branding</span>
                            </div>
                            <div class="input-group">
                                <label>Title</label>
                                <input type="text" v-model="slotsConfig.titleText" class="text-input" />
                            </div>
                            <div class="upload-row">
                                <label class="upload-box" :class="{ 'has-image': slotsImages.titleImage }">
                                    <img v-if="slotsImages.titleImage" :src="slotsImages.titleImage" />
                                    <span v-else class="upload-placeholder">+ Logo</span>
                                    <input type="file" accept="image/*" @change="handleSlotsTitleImage" />
                                </label>
                                <label class="upload-box" :class="{ 'has-image': slotsImages.background }">
                                    <img v-if="slotsImages.background" :src="slotsImages.background" />
                                    <span v-else class="upload-placeholder">+ BG</span>
                                    <input type="file" accept="image/*" @change="handleSlotsBackground" />
                                </label>
                                <label class="upload-box" :class="{ 'has-image': slotsImages.spinButtonImage }">
                                    <img v-if="slotsImages.spinButtonImage" :src="slotsImages.spinButtonImage" />
                                    <span v-else class="upload-placeholder">+ Btn</span>
                                    <input type="file" accept="image/*" @change="handleSlotsSpinButton" />
                                </label>
                            </div>
                        </div>

                        <!-- Colors -->
                        <div class="config-section">
                            <div class="section-header">
                                <span class="section-title">Colors</span>
                            </div>
                            <div class="color-grid">
                                <div class="color-item">
                                    <input type="color" v-model="slotsConfig.primaryColor" class="color-picker" />
                                    <span>Primary</span>
                                </div>
                                <div class="color-item">
                                    <input type="color" v-model="slotsConfig.accentColor" class="color-picker" />
                                    <span>Accent</span>
                                </div>
                                <div class="color-item">
                                    <input type="color" v-model="slotsConfig.titleColor" class="color-picker" />
                                    <span>Title</span>
                                </div>
                                <div class="color-item">
                                    <input type="color" v-model="slotsConfig.machineBgColor" class="color-picker" />
                                    <span>Machine</span>
                                </div>
                            </div>
                        </div>

                        <!-- Inventory -->
                        <div class="config-section">
                            <div class="section-header">
                                <span class="section-title">Inventory Button</span>
                            </div>
                            <div class="emoji-row">
                                <button
                                    v-for="emoji in emojiOptions"
                                    :key="emoji"
                                    @click="slotsConfig.inventoryEmoji = emoji"
                                    :class="['emoji-btn', slotsConfig.inventoryEmoji === emoji ? 'active' : '']"
                                >{{ emoji }}</button>
                            </div>
                            <div class="color-item inline-color">
                                <input type="color" v-model="slotsConfig.inventoryButtonColor" class="color-picker" />
                                <span>Button Color</span>
                            </div>
                        </div>
                    </div>

                    <!-- SCRATCH Configuration -->
                    <div v-if="activeTab === 'scratch'" class="config-sections">
                        <div class="config-section">
                            <div class="section-header">
                                <span class="section-title">Images</span>
                            </div>
                            <div class="upload-row">
                                <label class="upload-box" :class="{ 'has-image': scratchImages.header }">
                                    <img v-if="scratchImages.header" :src="scratchImages.header" />
                                    <span v-else class="upload-placeholder">+ Header</span>
                                    <input type="file" accept="image/*" @change="handleScratchHeader" />
                                </label>
                                <label class="upload-box" :class="{ 'has-image': scratchImages.background }">
                                    <img v-if="scratchImages.background" :src="scratchImages.background" />
                                    <span v-else class="upload-placeholder">+ BG</span>
                                    <input type="file" accept="image/*" @change="handleScratchBackground" />
                                </label>
                                <label class="upload-box" :class="{ 'has-image': scratchImages.overlay }">
                                    <img v-if="scratchImages.overlay" :src="scratchImages.overlay" />
                                    <span v-else class="upload-placeholder">+ Overlay</span>
                                    <input type="file" accept="image/*" @change="handleScratchOverlay" />
                                </label>
                            </div>
                        </div>

                        <div class="config-section">
                            <div class="section-header">
                                <span class="section-title">Colors</span>
                            </div>
                            <div class="color-grid">
                                <div class="color-item">
                                    <input type="color" v-model="scratchConfig.wonTextColour" class="color-picker" />
                                    <span>Win</span>
                                </div>
                                <div class="color-item">
                                    <input type="color" v-model="scratchConfig.loseTextColour" class="color-picker" />
                                    <span>Lose</span>
                                </div>
                                <div class="color-item">
                                    <input type="color" v-model="scratchConfig.accentColour" class="color-picker" />
                                    <span>Accent</span>
                                </div>
                            </div>
                        </div>
                    </div>

                    <!-- SPIN Configuration -->
                    <div v-if="activeTab === 'spin'" class="config-sections">
                        <div class="config-section">
                            <div class="section-header">
                                <span class="section-title">Theme</span>
                            </div>
                            <div class="preset-grid">
                                <button
                                    v-for="preset in colorPresets.spin"
                                    :key="preset.name"
                                    @click="applySpinPreset(preset)"
                                    class="preset-btn"
                                    :style="{ '--preset-color': preset.edge }"
                                >
                                    <span class="preset-dot" :style="{ background: preset.edge }"></span>
                                    {{ preset.name }}
                                </button>
                            </div>
                        </div>

                        <div class="config-section">
                            <div class="section-header">
                                <span class="section-title">Branding</span>
                            </div>
                            <div class="input-group">
                                <label>Title</label>
                                <input type="text" v-model="spinConfig.titleText" class="text-input" />
                            </div>
                            <div class="upload-row single">
                                <label class="upload-box wide" :class="{ 'has-image': spinImages.background }">
                                    <img v-if="spinImages.background" :src="spinImages.background" />
                                    <span v-else class="upload-placeholder">+ Background Image</span>
                                    <input type="file" accept="image/*" @change="handleSpinBackground" />
                                </label>
                            </div>
                        </div>

                        <div class="config-section">
                            <div class="section-header">
                                <span class="section-title">Colors</span>
                            </div>
                            <div class="color-grid">
                                <div class="color-item">
                                    <input type="color" v-model="spinConfig.titleColor" class="color-picker" />
                                    <span>Title</span>
                                </div>
                                <div class="color-item">
                                    <input type="color" v-model="spinConfig.wheelEdgeColor" class="color-picker" />
                                    <span>Wheel</span>
                                </div>
                            </div>
                        </div>

                        <div class="config-section">
                            <div class="section-header">
                                <span class="section-title">Wallet Card</span>
                                <span class="section-hint">Leave empty to hide</span>
                            </div>
                            <div class="input-group">
                                <label>Brand Text</label>
                                <input type="text" v-model="spinConfig.walletText" placeholder="YOUR BRAND" class="text-input" />
                            </div>
                            <div class="color-item inline-color">
                                <input type="color" v-model="spinConfig.walletColor" class="color-picker" />
                                <span>Card Color</span>
                            </div>
                        </div>
                    </div>

                    <!-- BINGO Configuration -->
                    <div v-if="activeTab === 'bingo'" class="config-sections">
                        <div class="config-section">
                            <div class="section-header">
                                <span class="section-title">Images</span>
                            </div>
                            <div class="upload-row">
                                <label class="upload-box" :class="{ 'has-image': bingoImages.header }">
                                    <img v-if="bingoImages.header" :src="bingoImages.header" />
                                    <span v-else class="upload-placeholder">+ Header</span>
                                    <input type="file" accept="image/*" @change="handleBingoHeader" />
                                </label>
                                <label class="upload-box" :class="{ 'has-image': bingoImages.cardCover }">
                                    <img v-if="bingoImages.cardCover" :src="bingoImages.cardCover" />
                                    <span v-else class="upload-placeholder">+ Card</span>
                                    <input type="file" accept="image/*" @change="handleBingoCardCover" />
                                </label>
                                <label class="upload-box" :class="{ 'has-image': bingoImages.background }">
                                    <img v-if="bingoImages.background" :src="bingoImages.background" />
                                    <span v-else class="upload-placeholder">+ BG</span>
                                    <input type="file" accept="image/*" @change="handleBingoBackground" />
                                </label>
                            </div>
                        </div>

                        <div class="config-section">
                            <div class="section-header">
                                <span class="section-title">Icon</span>
                            </div>
                            <div class="input-group">
                                <label>Diamond Emoji</label>
                                <input type="text" v-model="bingoConfig.diamondEmoji" class="text-input text-center text-2xl" />
                            </div>
                        </div>

                        <div class="config-section">
                            <div class="section-header">
                                <span class="section-title">Colors</span>
                            </div>
                            <div class="color-grid">
                                <div class="color-item">
                                    <input type="color" v-model="bingoConfig.bgStart" class="color-picker" />
                                    <span>BG Start</span>
                                </div>
                                <div class="color-item">
                                    <input type="color" v-model="bingoConfig.bgEnd" class="color-picker" />
                                    <span>BG End</span>
                                </div>
                                <div class="color-item">
                                    <input type="color" v-model="bingoConfig.frameColor" class="color-picker" />
                                    <span>Frame</span>
                                </div>
                                <div class="color-item">
                                    <input type="color" v-model="bingoConfig.diamond1" class="color-picker" />
                                    <span>Diamond 1</span>
                                </div>
                                <div class="color-item">
                                    <input type="color" v-model="bingoConfig.diamond2" class="color-picker" />
                                    <span>Diamond 2</span>
                                </div>
                                <div class="color-item">
                                    <input type="color" v-model="bingoConfig.winnerGlow" class="color-picker" />
                                    <span>Winner</span>
                                </div>
                            </div>
                        </div>
                    </div>

                    <!-- COIN DROP Configuration -->
                    <div v-if="activeTab === 'coindrop'" class="config-sections">
                        <div class="config-section">
                            <div class="section-header">
                                <span class="section-title">Theme</span>
                            </div>
                            <div class="preset-grid">
                                <button
                                    v-for="preset in colorPresets.coindrop"
                                    :key="preset.name"
                                    @click="applyCoinDropPreset(preset)"
                                    class="preset-btn"
                                    :style="{ '--preset-color': preset.primary }"
                                >
                                    <span class="preset-dot" :style="{ background: preset.primary }"></span>
                                    {{ preset.name }}
                                </button>
                            </div>
                        </div>

                        <div class="config-section">
                            <div class="section-header">
                                <span class="section-title">Branding</span>
                            </div>
                            <div class="input-group">
                                <label>Title</label>
                                <input type="text" v-model="coinDropConfig.titleText" class="text-input" />
                            </div>
                            <div class="upload-row">
                                <label class="upload-box" :class="{ 'has-image': coinDropImages.header }">
                                    <img v-if="coinDropImages.header" :src="coinDropImages.header" />
                                    <span v-else class="upload-placeholder">+ Header</span>
                                    <input type="file" accept="image/*" @change="handleCoinDropHeader" />
                                </label>
                                <label class="upload-box" :class="{ 'has-image': coinDropImages.background }">
                                    <img v-if="coinDropImages.background" :src="coinDropImages.background" />
                                    <span v-else class="upload-placeholder">+ BG</span>
                                    <input type="file" accept="image/*" @change="handleCoinDropBackground" />
                                </label>
                                <label class="upload-box" :class="{ 'has-image': coinDropImages.titleImage }">
                                    <img v-if="coinDropImages.titleImage" :src="coinDropImages.titleImage" />
                                    <span v-else class="upload-placeholder">+ Logo</span>
                                    <input type="file" accept="image/*" @change="handleCoinDropTitleImage" />
                                </label>
                            </div>
                        </div>

                        <div class="config-section">
                            <div class="section-header">
                                <span class="section-title">Colors</span>
                            </div>
                            <div class="color-grid">
                                <div class="color-item">
                                    <input type="color" v-model="coinDropConfig.titleColor" class="color-picker" />
                                    <span>Title</span>
                                </div>
                                <div class="color-item">
                                    <input type="color" v-model="coinDropConfig.ballColor" class="color-picker" />
                                    <span>Ball</span>
                                </div>
                                <div class="color-item">
                                    <input type="color" v-model="coinDropConfig.pegColor" class="color-picker" />
                                    <span>Pegs</span>
                                </div>
                                <div class="color-item">
                                    <input type="color" v-model="coinDropConfig.winBucketColor" class="color-picker" />
                                    <span>Win Bucket</span>
                                </div>
                            </div>
                        </div>

                        <div class="config-section">
                            <div class="section-header">
                                <span class="section-title">Peg Shape</span>
                            </div>
                            <div class="preset-grid">
                                <button
                                    @click="coinDropConfig.pegShape = 'circle'"
                                    class="preset-btn"
                                    :class="{ 'active': coinDropConfig.pegShape === 'circle' }"
                                >
                                    Circle
                                </button>
                                <button
                                    @click="coinDropConfig.pegShape = 'hexagon'"
                                    class="preset-btn"
                                    :class="{ 'active': coinDropConfig.pegShape === 'hexagon' }"
                                >
                                    Hexagon
                                </button>
                            </div>
                        </div>
                    </div>

                    <!-- BALLOON POP Configuration -->
                    <div v-if="activeTab === 'balloonpop'" class="config-sections">
                        <div class="config-section">
                            <div class="section-header">
                                <span class="section-title">Theme</span>
                            </div>
                            <div class="preset-grid">
                                <button
                                    v-for="preset in colorPresets.balloonpop"
                                    :key="preset.name"
                                    @click="applyBalloonPopPreset(preset)"
                                    class="preset-btn"
                                    :style="{ '--preset-color': preset.primary }"
                                >
                                    <span class="preset-dot" :style="{ background: preset.primary }"></span>
                                    {{ preset.name }}
                                </button>
                            </div>
                        </div>

                        <div class="config-section">
                            <div class="section-header">
                                <span class="section-title">Branding</span>
                            </div>
                            <div class="input-group">
                                <label>Title</label>
                                <input type="text" v-model="balloonPopConfig.titleText" class="text-input" />
                            </div>
                            <div class="input-group">
                                <label>Subtitle</label>
                                <input type="text" v-model="balloonPopConfig.popSubtitleText" class="text-input" placeholder="Pop balloons to reveal your prize!" />
                            </div>
                            <div class="upload-row">
                                <label class="upload-box" :class="{ 'has-image': balloonPopImages.header }">
                                    <img v-if="balloonPopImages.header" :src="balloonPopImages.header" />
                                    <span v-else class="upload-placeholder">+ Header</span>
                                    <input type="file" accept="image/*" @change="handleBalloonPopHeader" />
                                </label>
                                <label class="upload-box" :class="{ 'has-image': balloonPopImages.background }">
                                    <img v-if="balloonPopImages.background" :src="balloonPopImages.background" />
                                    <span v-else class="upload-placeholder">+ BG</span>
                                    <input type="file" accept="image/*" @change="handleBalloonPopBackground" />
                                </label>
                                <label class="upload-box" :class="{ 'has-image': balloonPopImages.titleImage }">
                                    <img v-if="balloonPopImages.titleImage" :src="balloonPopImages.titleImage" />
                                    <span v-else class="upload-placeholder">+ Logo</span>
                                    <input type="file" accept="image/*" @change="handleBalloonPopTitleImage" />
                                </label>
                            </div>
                        </div>

                        <div class="config-section">
                            <div class="section-header">
                                <span class="section-title">Colors</span>
                            </div>
                            <div class="color-grid">
                                <div class="color-item">
                                    <input type="color" v-model="balloonPopConfig.titleColor" class="color-picker" />
                                    <span>Title</span>
                                </div>
                                <div class="color-item">
                                    <input type="color" v-model="balloonPopConfig.primaryColor" class="color-picker" />
                                    <span>Primary</span>
                                </div>
                                <div class="color-item">
                                    <input type="color" v-model="balloonPopConfig.popWinColor" class="color-picker" />
                                    <span>Win</span>
                                </div>
                                <div class="color-item">
                                    <input type="color" v-model="balloonPopConfig.popLoseColor" class="color-picker" />
                                    <span>Lose</span>
                                </div>
                            </div>
                        </div>

                        <div class="config-section">
                            <div class="section-header">
                                <span class="section-title">Item Type</span>
                            </div>
                            <div class="preset-grid">
                                <button
                                    @click="balloonPopConfig.popItemType = 'balloon'"
                                    class="preset-btn"
                                    :class="{ 'active': balloonPopConfig.popItemType === 'balloon' }"
                                >
                                    🎈 Balloon
                                </button>
                                <button
                                    @click="balloonPopConfig.popItemType = 'bubble'"
                                    class="preset-btn"
                                    :class="{ 'active': balloonPopConfig.popItemType === 'bubble' }"
                                >
                                    🫧 Bubble
                                </button>
                            </div>
                        </div>
                    </div>
                        </div>
                    </div>
                </div>

                <!-- Preview Panel -->
                <div class="lg:col-span-7 xl:col-span-8">
                    <div class="preview-card">
                        <div class="preview-header">
                            <span class="preview-title">Preview</span>
                            <span class="preview-badge">
                                {{ tabs.find(t => t.id === activeTab)?.icon }} {{ tabs.find(t => t.id === activeTab)?.name }}
                            </span>
                        </div>
                        <div class="preview-container">
                            <div v-if="activeTab === 'slots'" class="preview-game">
                                <SlotsGame :demoMode="true" previewMode="desktop" :slotsAssets="slotsAssets" :showMachine="true" />
                            </div>
                            <div v-if="activeTab === 'scratch'" class="preview-game">
                                <ScratchGame :demoMode="true" previewMode="desktop" :scratchAssets="scratchAssets" />
                            </div>
                            <div v-if="activeTab === 'spin'" class="preview-game">
                                <SpinGame :demoMode="true" previewMode="desktop" :spinAssets="spinAssets" />
                            </div>
                            <div v-if="activeTab === 'bingo'" class="preview-game">
                                <BingoGame :demoMode="true" previewMode="desktop" :assets="bingoAssets" :prizes="[]" :tickets="[]" />
                            </div>
                            <div v-if="activeTab === 'coindrop'" class="preview-game">
                                <CoinDropGame :demoMode="true" previewMode="desktop" :coinDropAssets="coinDropAssets" :tickets="[]" :showGameBoard="true"
                                /> 
                            </div>
                            <div v-if="activeTab === 'balloonpop'" class="preview-game">
                                <BalloonPopGame :demoMode="true" previewMode="desktop" :popGameAssets="balloonPopAssets" :tickets="[]" :showGameBoard="true"/>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </section>
</template>

<style scoped>
/* =========================================
   BASE
   ========================================= */
.configurator-section {
    min-height: 100vh;
}

/* =========================================
   CONFIG CARD
   ========================================= */
.config-card {
    background: rgba(18, 18, 28, 0.95);
    border: 1px solid rgba(255, 255, 255, 0.06);
    border-radius: 16px;
    overflow: hidden;
}

/* =========================================
   TABS
   ========================================= */
.tab-container {
    display: grid;
    grid-template-columns: repeat(3, 1fr);
    gap: 4px;
    padding: 12px;
    background: rgba(0, 0, 0, 0.3);
    border-bottom: 1px solid rgba(255, 255, 255, 0.05);
}

.tab-pill {
    display: flex;
    align-items: center;
    justify-content: center;
    gap: 6px;
    padding: 10px 12px;
    border-radius: 10px;
    border: none;
    background: transparent;
    color: rgba(255, 255, 255, 0.5);
    font-size: 13px;
    font-weight: 500;
    cursor: pointer;
    transition: all 0.2s ease;
}

.tab-pill:hover {
    background: rgba(255, 255, 255, 0.05);
    color: rgba(255, 255, 255, 0.8);
}

.tab-pill.active {
    background: linear-gradient(135deg, #6366f1, #8b5cf6);
    color: white;
    box-shadow: 0 4px 12px rgba(99, 102, 241, 0.3);
}

.tab-icon {
    font-size: 16px;
    display: none;
}

.tab-label {
    display: inline;
    font-size: 11px;
}

@media (min-width: 640px) {
    .tab-icon {
        display: inline;
    }
    .tab-label {
        font-size: 13px;
    }
}

/* =========================================
   CONFIG CONTENT
   ========================================= */
.config-content {
    padding: 16px;
    max-height: 600px;
    overflow-y: auto;
}

.config-sections {
    display: flex;
    flex-direction: column;
    gap: 20px;
}

.config-section {
    display: flex;
    flex-direction: column;
    gap: 12px;
}

.section-header {
    display: flex;
    align-items: center;
    justify-content: space-between;
}

.section-title {
    font-size: 11px;
    font-weight: 600;
    text-transform: uppercase;
    letter-spacing: 1px;
    color: rgba(255, 255, 255, 0.4);
}

.section-hint {
    font-size: 10px;
    color: rgba(255, 255, 255, 0.25);
}

/* =========================================
   PRESET BUTTONS
   ========================================= */
.preset-grid {
    display: flex;
    flex-wrap: wrap;
    gap: 8px;
}

.preset-btn {
    display: flex;
    align-items: center;
    gap: 6px;
    padding: 8px 14px;
    border-radius: 8px;
    border: 1px solid rgba(255, 255, 255, 0.08);
    background: rgba(255, 255, 255, 0.03);
    color: rgba(255, 255, 255, 0.7);
    font-size: 12px;
    font-weight: 500;
    cursor: pointer;
    transition: all 0.2s ease;
}

.preset-btn:hover {
    background: rgba(255, 255, 255, 0.08);
    border-color: var(--preset-color, rgba(255, 255, 255, 0.2));
    transform: translateY(-1px);
}

.preset-btn.active {
    background: linear-gradient(135deg, #6366f1, #8b5cf6);
    border-color: transparent;
    color: white;
}

.preset-dot {
    width: 10px;
    height: 10px;
    border-radius: 50%;
}

/* =========================================
   INPUT GROUP
   ========================================= */
.input-group {
    display: flex;
    flex-direction: column;
    gap: 6px;
}

.input-group label {
    font-size: 11px;
    color: rgba(255, 255, 255, 0.4);
}

.text-input {
    width: 100%;
    padding: 10px 14px;
    border-radius: 10px;
    border: 1px solid rgba(255, 255, 255, 0.08);
    background: rgba(0, 0, 0, 0.3);
    color: white;
    font-size: 14px;
    outline: none;
    transition: all 0.2s ease;
}

.text-input:focus {
    border-color: rgba(99, 102, 241, 0.5);
    box-shadow: 0 0 0 3px rgba(99, 102, 241, 0.1);
}

.text-input::placeholder {
    color: rgba(255, 255, 255, 0.25);
}

/* =========================================
   UPLOAD BOXES
   ========================================= */
.upload-row {
    display: grid;
    grid-template-columns: repeat(3, 1fr);
    gap: 10px;
}

.upload-row.single {
    grid-template-columns: 1fr;
}

.upload-box {
    position: relative;
    display: flex;
    align-items: center;
    justify-content: center;
    height: 60px;
    border-radius: 10px;
    border: 1px dashed rgba(255, 255, 255, 0.12);
    background: rgba(0, 0, 0, 0.2);
    cursor: pointer;
    overflow: hidden;
    transition: all 0.2s ease;
}

.upload-box:hover {
    border-color: rgba(99, 102, 241, 0.5);
    background: rgba(99, 102, 241, 0.05);
}

.upload-box.wide {
    height: 50px;
}

.upload-box.has-image {
    border-style: solid;
    border-color: rgba(99, 102, 241, 0.3);
}

.upload-box img {
    max-width: 100%;
    max-height: 100%;
    object-fit: contain;
}

.upload-box input {
    display: none;
}

.upload-placeholder {
    font-size: 11px;
    color: rgba(255, 255, 255, 0.3);
    font-weight: 500;
}

/* =========================================
   COLOR GRID
   ========================================= */
.color-grid {
    display: grid;
    grid-template-columns: repeat(4, 1fr);
    gap: 12px;
}

.color-item {
    display: flex;
    flex-direction: column;
    align-items: center;
    gap: 6px;
}

.color-item span {
    font-size: 10px;
    color: rgba(255, 255, 255, 0.35);
    text-align: center;
}

.color-item.inline-color {
    flex-direction: row;
    gap: 10px;
    margin-top: 8px;
}

.color-item.inline-color span {
    font-size: 12px;
}

.color-picker {
    width: 36px;
    height: 36px;
    padding: 0;
    border: 2px solid rgba(255, 255, 255, 0.1);
    border-radius: 10px;
    background: transparent;
    cursor: pointer;
    transition: all 0.2s ease;
}

.color-picker:hover {
    transform: scale(1.1);
    border-color: rgba(255, 255, 255, 0.2);
}

.color-picker::-webkit-color-swatch-wrapper {
    padding: 3px;
}

.color-picker::-webkit-color-swatch {
    border-radius: 6px;
    border: none;
}

/* =========================================
   EMOJI ROW
   ========================================= */
.emoji-row {
    display: flex;
    flex-wrap: wrap;
    gap: 6px;
}

.emoji-btn {
    width: 38px;
    height: 38px;
    display: flex;
    align-items: center;
    justify-content: center;
    border-radius: 10px;
    border: 1px solid rgba(255, 255, 255, 0.08);
    background: rgba(0, 0, 0, 0.2);
    font-size: 18px;
    cursor: pointer;
    transition: all 0.2s ease;
}

.emoji-btn:hover {
    background: rgba(255, 255, 255, 0.08);
    transform: scale(1.05);
}

.emoji-btn.active {
    background: linear-gradient(135deg, #6366f1, #8b5cf6);
    border-color: transparent;
    box-shadow: 0 2px 8px rgba(99, 102, 241, 0.3);
}

/* =========================================
   PREVIEW CARD
   ========================================= */
.preview-card {
    background: rgba(18, 18, 28, 0.95);
    border: 1px solid rgba(255, 255, 255, 0.06);
    border-radius: 16px;
    overflow: hidden;
    height: 100%;
    display: flex;
    flex-direction: column;
}

.preview-header {
    display: flex;
    align-items: center;
    justify-content: space-between;
    padding: 14px 18px;
    border-bottom: 1px solid rgba(255, 255, 255, 0.05);
}

.preview-title {
    font-size: 14px;
    font-weight: 600;
    color: white;
}

.preview-badge {
    font-size: 11px;
    padding: 5px 12px;
    border-radius: 20px;
    background: rgba(255, 255, 255, 0.06);
    color: rgba(255, 255, 255, 0.6);
}

.preview-container {
    flex: 1;
    min-height: 650px;
    background: #0a0a12;
    position: relative;
    overflow: hidden;
}

.preview-game {
    position: absolute;
    inset: 0;
    display: flex;
    align-items: flex-start;
    justify-content: center;
    padding-top: 10px;
}

/* =========================================
   SCROLLBAR
   ========================================= */
.custom-scrollbar::-webkit-scrollbar {
    width: 4px;
}

.custom-scrollbar::-webkit-scrollbar-track {
    background: transparent;
}

.custom-scrollbar::-webkit-scrollbar-thumb {
    background: rgba(255, 255, 255, 0.1);
    border-radius: 4px;
}

.custom-scrollbar::-webkit-scrollbar-thumb:hover {
    background: rgba(255, 255, 255, 0.2);
}
</style>
