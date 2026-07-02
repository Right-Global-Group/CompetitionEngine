<script setup>
import { ref, inject, computed } from 'vue';
import SlotsGame from '@/Components/Games/SlotsGame.vue';
import SpinGame from '@/Components/Games/SpinGame.vue';
import ScratchGame from '@/Components/Games/ScratchGame.vue';
import BingoGame from '@/Components/Games/BingoGame.vue';
import CoinDropGame from '@/Components/Games/CoinDropGame.vue';
import BalloonPopGame from '@/Components/Games/PopGame.vue';
import FootballModal from '@/Components/Games/FootballModal.vue';
import { useReveal } from '@/Composables/useReveal';

const activeTab = ref('slots');

const getText = inject('getText', (key, fallback = '') => fallback);
const siteTexts = inject('siteTexts');
const { sectionRef, revealed } = useReveal();

const badgeText = computed(() => getText('gamestudio.badge', 'Only on CompEngine'));
const titleBefore = computed(() => getText('gamestudio.title_before', 'Game Studio.'));
const titleKeyword = computed(() => getText('gamestudio.title_keyword', 'Built by you.'));
const lead = computed(() => getText('gamestudio.lead', 'Other UK competition platforms give operators a handful of fixed game presets. We give a studio. Pick a game, theme it, brand it, preview every change live.'));
const tryMeText = computed(() => getText('gamestudio.try_me', '🎮 Try it — no signup needed'));


const tabs = [
    { id: 'slots', name: 'Slots', icon: '🎰' },
    { id: 'scratch', name: 'Scratch', icon: '🎫' },
    { id: 'spin', name: 'Spinny', icon: '🎡' },
    { id: 'bingo', name: 'Bingo', icon: '🎱' },
    { id: 'coindrop', name: 'Coin Drop', icon: '🪙' },
    { id: 'balloonpop', name: 'Balloon Pop', icon: '🎈' },
    { id: 'football', name: 'Football', icon: '⚽' },
    { id: 'fishing', name: 'Fishing', icon: '🎣' }
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

// Football Configuration
const footballConfig = ref({
    theme: 'classic',
    titleText: 'Take Your Shot!',
    winText: 'GOAL! You scored!',
    loseText: 'Saved! Unlucky…',
    primaryColor: '#1b5e20',
    accentColor: '#ffeb3b',
    goalColor: '#f59e0b',
    showTopPrize: true,
    hostEnabled: true,
});

const footballMedia = ref({
    hostImage: '',
    kickSound: '',
    whistleSound: '',
    crowdSound: '',
    winSound: '',
    lossSound: '',
});

// Demo tickets for the football configurator preview
const footballDemoTickets = [
    { id: 1, number: '001', instant_win: { id: 1, prize: '£50 Cash', value: 50, claimed: false, image_path: null } },
    { id: 2, number: '002', instant_win: false },
];


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

// Football media handlers
const handleFootballHostImage = (event) => {
    const file = event.target.files?.[0];
    if (file) {
        if (footballMedia.value.hostImage) URL.revokeObjectURL(footballMedia.value.hostImage);
        footballMedia.value.hostImage = URL.createObjectURL(file);
    }
};

const handleFootballAudio = (key) => (event) => {
    const file = event.target.files?.[0];
    if (file) {
        if (footballMedia.value[key]) URL.revokeObjectURL(footballMedia.value[key]);
        footballMedia.value[key] = URL.createObjectURL(file);
    }
};

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
    ],
    football: [
        { name: 'Classic', theme: 'classic', primary: '#1b5e20', accent: '#ffeb3b' },
        { name: 'Night', theme: 'night', primary: '#1b5e20', accent: '#cfeaff' },
        { name: 'Retro', theme: 'retro', primary: '#4a3416', accent: '#ffd27a' },
        { name: 'Neon', theme: 'neon', primary: '#0c5a3c', accent: '#3df5ff' },
    ],
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

const applyFootballPreset = (preset) => {
    footballConfig.value.theme = preset.theme;
    footballConfig.value.primaryColor = preset.primary;
    footballConfig.value.accentColor = preset.accent;
};


const footballAssets = computed(() => ({
    theme: footballConfig.value.theme,
    titleText: footballConfig.value.titleText,
    winText: footballConfig.value.winText,
    loseText: footballConfig.value.loseText,
    primaryColor: footballConfig.value.primaryColor,
    accentColor: footballConfig.value.accentColor,
    goalColor: footballConfig.value.goalColor,
    showTopPrize: footballConfig.value.showTopPrize,
    hostEnabled: footballConfig.value.hostEnabled,
    hostImage: footballMedia.value.hostImage,
    kickSound: footballMedia.value.kickSound,
    whistleSound: footballMedia.value.whistleSound,
    crowdSound: footballMedia.value.crowdSound,
    winSound: footballMedia.value.winSound,
    lossSound: footballMedia.value.lossSound,
}));
</script>

<template>
    <section ref="sectionRef" id="game-studio" class="section reveal" :class="{ visible: revealed }" style="position:relative;">
        <div class="center" style="margin-bottom: 24px; position:relative;">
            <div class="mega-badge"><span class="spark">✦</span> {{ badgeText }} <span class="spark">✦</span></div>
            <h2 class="h2">{{ titleBefore }} <span class="grad-text">{{ titleKeyword }}</span></h2>
            <p class="lead center" style="margin: 18px auto 0;">{{ lead }}</p>
            <div style="margin-top: 22px;">
                <a href="#game-studio" class="try-me">{{ tryMeText }}</a>
            </div>
        </div>

        <div class="gs-block">
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

                    <!-- FOOTBALL Configuration -->
                    <div v-if="activeTab === 'football'" class="config-sections">
                        <div class="config-section">
                            <div class="section-header">
                                <span class="section-title">Theme</span>
                            </div>
                            <div class="preset-grid">
                                <button
                                    v-for="preset in colorPresets.football"
                                    :key="preset.name"
                                    @click="applyFootballPreset(preset)"
                                    class="preset-btn"
                                    :class="{ 'active': footballConfig.theme === preset.theme }"
                                >
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
                                <input type="text" v-model="footballConfig.titleText" class="text-input" />
                            </div>
                        </div>

                        <div class="config-section">
                            <div class="section-header">
                                <span class="section-title">Text</span>
                            </div>
                            <div class="input-group">
                                <label>Win Message</label>
                                <input type="text" v-model="footballConfig.winText" class="text-input" />
                            </div>
                            <div class="input-group">
                                <label>Lose Message</label>
                                <input type="text" v-model="footballConfig.loseText" class="text-input" />
                            </div>
                        </div>

                        <div class="config-section">
                            <div class="section-header">
                                <span class="section-title">Display Options</span>
                            </div>
                            <label class="toggle-row">
                                <input type="checkbox" v-model="footballConfig.showTopPrize" class="toggle-check" />
                                <span class="toggle-label">Show Top Prize Banner</span>
                            </label>
                            <label class="toggle-row">
                                <input type="checkbox" v-model="footballConfig.hostEnabled" class="toggle-check" />
                                <span class="toggle-label">Show Commentator (host + mic)</span>
                            </label>
                            <div class="input-group" style="margin-top:4px;">
                                <label>Commentator Image</label>
                                <label class="upload-box wide" :class="{ 'has-image': footballMedia.hostImage }">
                                    <img v-if="footballMedia.hostImage" :src="footballMedia.hostImage" />
                                    <span v-else class="upload-placeholder">Select image</span>
                                    <input type="file" accept="image/*" @change="handleFootballHostImage" />
                                </label>
                                <span class="section-hint">Optional — upload your own host / mascot (PNG, transparent). Defaults to a drawn pundit.</span>
                            </div>
                        </div>

                        <div class="config-section">
                            <div class="section-header">
                                <span class="section-title">Sound Effects</span>
                            </div>
                            <div class="audio-upload-grid">
                                <label v-for="cue in [
                                    { key: 'kickSound',    label: 'Kick' },
                                    { key: 'whistleSound', label: 'Whistle' },
                                    { key: 'crowdSound',   label: 'Crowd' },
                                    { key: 'winSound',     label: 'Win (cheer)' },
                                    { key: 'lossSound',    label: 'Loss' },
                                ]" :key="cue.key" class="audio-box" :class="{ 'has-audio': footballMedia[cue.key] }">
                                    <span class="audio-label">{{ footballMedia[cue.key] ? '✓' : '🔊' }} {{ cue.label }}</span>
                                    <input type="file" accept="audio/*" @change="handleFootballAudio(cue.key)($event)" />
                                </label>
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

                    <!-- FISHING Configuration -->
                    <div v-if="activeTab === 'fishing'" class="config-sections">
                        <div class="config-section">
                            <div class="section-header">
                                <span class="section-title">Features</span>
                            </div>
                            <div class="feature-list">
                                <div class="feature-item">🎨 4 ocean themes — Chill, Sunset, Night, Stormy</div>
                                <div class="feature-item">🖼️ Custom boat, fish & underwater backdrop images</div>
                                <div class="feature-item">🎣 Cast & reel animated reveal gameplay</div>
                                <div class="feature-item">🔊 Custom sound effects (cast, splash, reel, win)</div>
                                <div class="feature-item">✨ Animated fish, bubbles, waves & caustics</div>
                                <div class="feature-item">🏆 Prize-glow swimmers that match your prizes</div>
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
                            <div v-if="activeTab === 'football'" class="preview-game-football">
                                <FootballModal :model-value="true" :demoMode="true" previewMode="desktop" :assets="footballAssets" :tickets="footballDemoTickets" />
                            </div>
                            <div v-if="activeTab === 'fishing'" class="preview-game-video">
                                <div class="fish-video-frame">
                                    <div class="fish-video-body">
                                        <div class="fish-video-placeholder">
                                            <span class="fish-placeholder-emoji">🎣</span>
                                            <span class="fish-placeholder-text">Fishing Game</span>
                                            <span class="fish-placeholder-hint">Demo video loading…</span>
                                        </div>
                                        <video autoplay loop muted playsinline class="fish-video-el">
                                            <source src="/games/fishing/demo.mp4" type="video/mp4" />
                                        </video>
                                    </div>
                                </div>
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
   CONFIG CARD
   ========================================= */
.config-card {
    background: var(--bg-card);
    border: 1px solid var(--border);
    border-radius: 16px;
    overflow: hidden;
}

/* =========================================
   TABS
   ========================================= */
.tab-container {
    display: grid;
    grid-template-columns: repeat(3, minmax(0, 1fr));
    gap: 4px;
    padding: 12px;
    background: rgba(0, 0, 0, 0.3);
    border-bottom: 1px solid var(--border);
}

@media (max-width: 480px) {
    .tab-container {
        grid-template-columns: repeat(2, minmax(0, 1fr));
    }
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
    color: var(--text-3);
    font-size: 13px;
    font-weight: 500;
    cursor: pointer;
    transition: all 0.2s ease;
    min-width: 0;
    overflow: hidden;
}

.tab-pill:hover {
    background: var(--bg-card-hover);
    color: var(--text-0);
}

.tab-pill.active {
    background: linear-gradient(135deg, var(--orange), var(--coral));
    color: white;
    box-shadow: 0 4px 12px -2px var(--orange-glow);
}

.tab-icon {
    font-size: 16px;
    display: none;
}

.tab-label {
    display: inline;
    font-size: 11px;
    overflow: hidden;
    text-overflow: ellipsis;
    white-space: nowrap;
    min-width: 0;
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
    color: var(--text-3);
}

.section-hint {
    font-size: 10px;
    color: var(--text-3);
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
    border: 1px solid var(--border);
    background: rgba(255, 255, 255, 0.03);
    color: var(--text-2);
    font-size: 12px;
    font-weight: 500;
    cursor: pointer;
    transition: all 0.2s ease;
}

.preset-btn:hover {
    background: var(--bg-card-hover);
    border-color: var(--preset-color, var(--border-strong));
    transform: translateY(-1px);
}

.preset-btn.active {
    background: linear-gradient(135deg, var(--orange), var(--coral));
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
    color: var(--text-3);
}

.text-input {
    width: 100%;
    padding: 10px 14px;
    border-radius: 10px;
    border: 1px solid var(--border);
    background: rgba(0, 0, 0, 0.3);
    color: var(--text-0);
    font-size: 14px;
    outline: none;
    transition: all 0.2s ease;
}

.text-input:focus {
    border-color: var(--orange);
    box-shadow: 0 0 0 3px rgba(244, 165, 88, 0.12);
}

.text-input::placeholder {
    color: var(--text-3);
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
    border: 1px dashed var(--border);
    background: rgba(0, 0, 0, 0.2);
    cursor: pointer;
    overflow: hidden;
    transition: all 0.2s ease;
}

.upload-box:hover {
    border-color: var(--orange);
    background: rgba(244, 165, 88, 0.06);
}

.upload-box.wide {
    height: 50px;
}

.upload-box.has-image {
    border-style: solid;
    border-color: rgba(244, 165, 88, 0.35);
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
    color: var(--text-3);
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
    color: var(--text-3);
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
    border: 2px solid var(--border);
    border-radius: 10px;
    background: transparent;
    cursor: pointer;
    transition: all 0.2s ease;
}

.color-picker:hover {
    transform: scale(1.1);
    border-color: var(--border-strong);
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
    border: 1px solid var(--border);
    background: rgba(0, 0, 0, 0.2);
    font-size: 18px;
    cursor: pointer;
    transition: all 0.2s ease;
}

.emoji-btn:hover {
    background: var(--bg-card-hover);
    transform: scale(1.05);
}

.emoji-btn.active {
    background: linear-gradient(135deg, var(--orange), var(--coral));
    border-color: transparent;
    box-shadow: 0 2px 8px -2px var(--orange-glow);
}

/* =========================================
   PREVIEW CARD
   ========================================= */
.preview-card {
    background: var(--bg-1);
    border: 1px solid var(--border);
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
    border-bottom: 1px solid var(--border);
}

.preview-title {
    font-size: 14px;
    font-weight: 600;
    color: var(--text-0);
}

.preview-badge {
    font-size: 11px;
    padding: 5px 12px;
    border-radius: 20px;
    background: var(--bg-card-hover);
    color: var(--text-2);
}

.preview-container {
    flex: 1;
    min-height: 650px;
    background: var(--bg-0);
    position: relative;
    overflow: hidden;
    overflow-y: auto;
}

.preview-game {
    position: absolute;
    inset: 0;
    display: flex;
    align-items: flex-start;
    justify-content: center;
    padding-top: 10px;
}


.preview-game-football {
    position: absolute;
    inset: 0;
    overflow-x: hidden;
    overflow-y: auto;
    display: flex;
    align-items: flex-start;
    justify-content: center;
    padding-top: 10px;
}

.preview-game-football :deep(.fbg-demo-device) {
    max-width: 100% !important;
}

.preview-game-football :deep(.fbg-demo-bar) {
    max-width: 100%;
    flex-wrap: wrap;
    row-gap: 4px;
}

.preview-game-video {
    position: absolute;
    inset: 0;
    display: flex;
    align-items: center;
    justify-content: center;
    padding: 20px;
    background: #07203a;
}

.fish-video-frame {
    width: 100%;
    max-width: 380px;
    height: 100%;
    max-height: 600px;
    border: 2px solid var(--fish-accent, #ffd54f);
    border-radius: 18px;
    overflow: hidden;
    display: flex;
    flex-direction: column;
    background: #07203a;
    box-shadow: 0 0 40px -8px var(--fish-accent, #ffd54f);
    transition: border-color 0.3s, box-shadow 0.3s;
}

.fish-video-header {
    padding: 12px 16px;
    background: var(--fish-primary, #0277bd);
    text-align: center;
    flex-shrink: 0;
    transition: background 0.3s;
}

.fish-video-title {
    color: var(--fish-accent, #ffd54f);
    font-weight: 900;
    font-size: 1rem;
    letter-spacing: 0.4px;
    transition: color 0.3s;
}

.fish-video-body {
    flex: 1;
    position: relative;
    overflow: hidden;
    background: #07203a;
}

.fish-video-placeholder {
    position: absolute;
    inset: 0;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    gap: 8px;
    z-index: 0;
}

.fish-placeholder-emoji {
    font-size: 3.5rem;
}

.fish-placeholder-text {
    font-size: 1rem;
    font-weight: 700;
    color: rgba(255, 255, 255, 0.7);
}

.fish-placeholder-hint {
    font-size: 0.75rem;
    color: rgba(255, 255, 255, 0.35);
}

.fish-video-el {
    position: absolute;
    inset: 0;
    width: 100%;
    height: 100%;
    object-fit: cover;
    z-index: 1;
}

.fish-video-footer {
    padding: 10px 16px;
    background: rgba(0, 0, 0, 0.4);
    text-align: center;
    font-size: 0.78rem;
    font-weight: 700;
    color: var(--fish-accent, #ffd54f);
    border-top: 1px solid rgba(255, 255, 255, 0.08);
    flex-shrink: 0;
    transition: color 0.3s;
}

.feature-list {
    display: flex;
    flex-direction: column;
    gap: 6px;
}

.feature-item {
    font-size: 12px;
    color: var(--text-2);
    padding: 6px 8px;
    border-radius: 8px;
    background: rgba(255, 255, 255, 0.03);
    border: 1px solid var(--border);
    line-height: 1.4;
}

/* =========================================
   TOGGLE ROW
   ========================================= */
.toggle-row {
    display: flex;
    align-items: center;
    gap: 10px;
    cursor: pointer;
    padding: 4px 0;
}

.toggle-check {
    width: 16px;
    height: 16px;
    accent-color: var(--orange);
    cursor: pointer;
    flex-shrink: 0;
}

.toggle-label {
    font-size: 13px;
    color: var(--text-2);
}

/* =========================================
   AUDIO UPLOAD
   ========================================= */
.audio-upload-grid {
    display: grid;
    grid-template-columns: repeat(3, 1fr);
    gap: 8px;
}

.audio-box {
    position: relative;
    display: flex;
    align-items: center;
    justify-content: center;
    height: 48px;
    border-radius: 10px;
    border: 1px dashed var(--border);
    background: rgba(0, 0, 0, 0.2);
    cursor: pointer;
    overflow: hidden;
    transition: all 0.2s ease;
}

.audio-box:hover {
    border-color: var(--orange);
    background: rgba(244, 165, 88, 0.06);
}

.audio-box.has-audio {
    border-style: solid;
    border-color: rgba(244, 165, 88, 0.35);
    background: rgba(244, 165, 88, 0.05);
}

.audio-label {
    font-size: 11px;
    color: var(--text-3);
    font-weight: 500;
    text-align: center;
    padding: 0 4px;
}

.audio-box.has-audio .audio-label {
    color: var(--orange);
}

.audio-box input {
    display: none;
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
