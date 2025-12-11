<script setup>
import { ref, computed } from 'vue';
import SlotsGame from '@/Components/Games/SlotsGame.vue';
import SpinGame from '@/Components/Games/SpinGame.vue';

const activeTab = ref('slots');

const tabs = [
    { id: 'slots', name: 'Slots', icon: '🎰' },
    { id: 'scratch', name: 'Scratch', icon: '🎫' },
    { id: 'spin', name: 'Spin', icon: '🎡' }
];

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
    scratchOverlay: '/images/scratch-overlay.png',
    textColour: '#FFFFFF',
    wonTextColour: '#00FF00',
    loseTextColour: '#FF4444',
    accentColour: '#FFD700'
});

// Spin Configuration
const spinConfig = ref({
    titleText: 'SPIN TO WIN',
    titleColor: '#FFD700',
    wheelEdgeColor: '#00aeff'
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
    machineImage: '',
    footerImage: '',
    background: '',
    header: ''
}));

const scratchyAssets = computed(() => ({
    scratchOverlay: scratchConfig.value.scratchOverlay,
    textColour: scratchConfig.value.textColour,
    wonTextColour: scratchConfig.value.wonTextColour,
    loseTextColour: scratchConfig.value.loseTextColour,
    accentColour: scratchConfig.value.accentColour
}));

const spinAssets = computed(() => ({
    titleText: spinConfig.value.titleText,
    titleColor: spinConfig.value.titleColor,
    wheelEdgeColor: spinConfig.value.wheelEdgeColor
}));

// Demo tickets for scratch game
const demoTickets = ref([
    { id: 1, number: '001', instant_win: { prize: '£100 WINNER!' } },
    { id: 2, number: '002', instant_win: null },
    { id: 3, number: '003', instant_win: { prize: '£50 PRIZE!' } },
    { id: 4, number: '004', instant_win: null },
    { id: 5, number: '005', instant_win: null },
    { id: 6, number: '006', instant_win: { prize: '£25 BONUS!' } }
]);

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
</script>

<template>
    <section id="configurator" class="py-20">
        <div class="container mx-auto px-4 sm:px-6">
            <div class="text-center mb-12">
                <h2 class="text-3xl md:text-4xl font-bold text-white mb-4">
                    Design Your <span class="keyword-animate">Instant Win</span> Game
                </h2>
                <p class="text-lg text-gray-400 max-w-3xl mx-auto">
                    Experience the power of our configurator. Customize and preview your game in real-time.
                </p>
            </div>

            <div class="grid lg:grid-cols-5 gap-8 max-w-7xl mx-auto">
                <!-- Configurator Panel -->
                <div class="lg:col-span-2 liquid-glass rounded-xl p-6">
                    <h3 class="text-xl font-bold text-white mb-6">Customize</h3>

                    <!-- Game Type Tabs -->
                    <div class="flex gap-2 mb-6">
                        <button
                            v-for="tab in tabs"
                            :key="tab.id"
                            @click="activeTab = tab.id"
                            :class="[
                                'flex-1 px-4 py-3 rounded-lg font-semibold transition-all flex items-center justify-center gap-2',
                                activeTab === tab.id
                                    ? 'bg-accent-purple text-white shadow-lg shadow-purple-500/30'
                                    : 'bg-gray-700 text-gray-300 hover:bg-gray-600'
                            ]"
                        >
                            <span>{{ tab.icon }}</span>
                            <span class="hidden sm:inline">{{ tab.name }}</span>
                        </button>
                    </div>

                    <!-- SLOTS Configuration -->
                    <div v-if="activeTab === 'slots'" class="space-y-4">
                        <!-- Color Presets -->
                        <div>
                            <label class="block text-gray-300 mb-2 text-sm font-semibold">Quick Presets</label>
                            <div class="flex flex-wrap gap-2">
                                <button
                                    v-for="preset in colorPresets.slots"
                                    :key="preset.name"
                                    @click="applySlotPreset(preset)"
                                    class="px-3 py-1.5 rounded-full text-xs font-semibold transition-all hover:scale-105"
                                    :style="{
                                        background: `linear-gradient(135deg, ${preset.primary}, ${preset.secondary})`,
                                        color: '#fff'
                                    }"
                                >
                                    {{ preset.name }}
                                </button>
                            </div>
                        </div>

                        <div>
                            <label class="block text-gray-300 mb-2 text-sm">Title Text</label>
                            <input
                                type="text"
                                v-model="slotsConfig.titleText"
                                class="w-full bg-gray-700 text-white px-4 py-2 rounded border border-gray-600 focus:border-purple-500 focus:outline-none"
                            />
                        </div>

                        <div class="grid grid-cols-2 gap-3">
                            <div>
                                <label class="block text-gray-300 mb-2 text-sm">Primary Color</label>
                                <div class="flex items-center gap-2">
                                    <input
                                        type="color"
                                        v-model="slotsConfig.primaryColor"
                                        class="w-10 h-10 rounded cursor-pointer border-0"
                                    />
                                    <input
                                        type="text"
                                        v-model="slotsConfig.primaryColor"
                                        class="flex-1 bg-gray-700 text-white px-3 py-2 rounded text-sm border border-gray-600"
                                    />
                                </div>
                            </div>

                            <div>
                                <label class="block text-gray-300 mb-2 text-sm">Accent Color</label>
                                <div class="flex items-center gap-2">
                                    <input
                                        type="color"
                                        v-model="slotsConfig.accentColor"
                                        class="w-10 h-10 rounded cursor-pointer border-0"
                                    />
                                    <input
                                        type="text"
                                        v-model="slotsConfig.accentColor"
                                        class="flex-1 bg-gray-700 text-white px-3 py-2 rounded text-sm border border-gray-600"
                                    />
                                </div>
                            </div>
                        </div>

                        <div class="grid grid-cols-2 gap-3">
                            <div>
                                <label class="block text-gray-300 mb-2 text-sm">Machine Background</label>
                                <div class="flex items-center gap-2">
                                    <input
                                        type="color"
                                        v-model="slotsConfig.machineBgColor"
                                        class="w-10 h-10 rounded cursor-pointer border-0"
                                    />
                                    <input
                                        type="text"
                                        v-model="slotsConfig.machineBgColor"
                                        class="flex-1 bg-gray-700 text-white px-3 py-2 rounded text-sm border border-gray-600"
                                    />
                                </div>
                            </div>

                            <div>
                                <label class="block text-gray-300 mb-2 text-sm">Title Color</label>
                                <div class="flex items-center gap-2">
                                    <input
                                        type="color"
                                        v-model="slotsConfig.titleColor"
                                        class="w-10 h-10 rounded cursor-pointer border-0"
                                    />
                                    <input
                                        type="text"
                                        v-model="slotsConfig.titleColor"
                                        class="flex-1 bg-gray-700 text-white px-3 py-2 rounded text-sm border border-gray-600"
                                    />
                                </div>
                            </div>
                        </div>

                        <div>
                            <label class="block text-gray-300 mb-2 text-sm">Inventory Button Emoji</label>
                            <div class="flex flex-wrap gap-2">
                                <button
                                    v-for="emoji in emojiOptions"
                                    :key="emoji"
                                    @click="slotsConfig.inventoryEmoji = emoji"
                                    :class="[
                                        'w-10 h-10 rounded-lg text-xl transition-all',
                                        slotsConfig.inventoryEmoji === emoji
                                            ? 'bg-purple-600 ring-2 ring-purple-400'
                                            : 'bg-gray-700 hover:bg-gray-600'
                                    ]"
                                >
                                    {{ emoji }}
                                </button>
                            </div>
                        </div>

                        <div>
                            <label class="block text-gray-300 mb-2 text-sm">Inventory Button Color</label>
                            <div class="flex items-center gap-2">
                                <input
                                    type="color"
                                    v-model="slotsConfig.inventoryButtonColor"
                                    class="w-10 h-10 rounded cursor-pointer border-0"
                                />
                                <input
                                    type="text"
                                    v-model="slotsConfig.inventoryButtonColor"
                                    class="flex-1 bg-gray-700 text-white px-3 py-2 rounded text-sm border border-gray-600"
                                />
                            </div>
                        </div>
                    </div>

                    <!-- SCRATCH Configuration -->
                    <div v-if="activeTab === 'scratch'" class="space-y-4">
                        <div class="p-4 bg-gray-700/50 rounded-lg border border-gray-600">
                            <p class="text-gray-300 text-sm">
                                🎫 Scratch cards let players reveal prizes by scratching off a digital overlay.
                            </p>
                        </div>

                        <div>
                            <label class="block text-gray-300 mb-2 text-sm">Win Text Color</label>
                            <div class="flex items-center gap-2">
                                <input
                                    type="color"
                                    v-model="scratchConfig.wonTextColour"
                                    class="w-10 h-10 rounded cursor-pointer border-0"
                                />
                                <input
                                    type="text"
                                    v-model="scratchConfig.wonTextColour"
                                    class="flex-1 bg-gray-700 text-white px-3 py-2 rounded text-sm border border-gray-600"
                                />
                            </div>
                        </div>

                        <div>
                            <label class="block text-gray-300 mb-2 text-sm">Lose Text Color</label>
                            <div class="flex items-center gap-2">
                                <input
                                    type="color"
                                    v-model="scratchConfig.loseTextColour"
                                    class="w-10 h-10 rounded cursor-pointer border-0"
                                />
                                <input
                                    type="text"
                                    v-model="scratchConfig.loseTextColour"
                                    class="flex-1 bg-gray-700 text-white px-3 py-2 rounded text-sm border border-gray-600"
                                />
                            </div>
                        </div>

                        <div>
                            <label class="block text-gray-300 mb-2 text-sm">Accent/Glow Color</label>
                            <div class="flex items-center gap-2">
                                <input
                                    type="color"
                                    v-model="scratchConfig.accentColour"
                                    class="w-10 h-10 rounded cursor-pointer border-0"
                                />
                                <input
                                    type="text"
                                    v-model="scratchConfig.accentColour"
                                    class="flex-1 bg-gray-700 text-white px-3 py-2 rounded text-sm border border-gray-600"
                                />
                            </div>
                        </div>
                    </div>

                    <!-- SPIN Configuration -->
                    <div v-if="activeTab === 'spin'" class="space-y-4">
                        <!-- Color Presets -->
                        <div>
                            <label class="block text-gray-300 mb-2 text-sm font-semibold">Quick Presets</label>
                            <div class="flex flex-wrap gap-2">
                                <button
                                    v-for="preset in colorPresets.spin"
                                    :key="preset.name"
                                    @click="applySpinPreset(preset)"
                                    class="px-3 py-1.5 rounded-full text-xs font-semibold transition-all hover:scale-105 border-2"
                                    :style="{
                                        borderColor: preset.edge,
                                        color: preset.title,
                                        background: 'rgba(0,0,0,0.5)'
                                    }"
                                >
                                    {{ preset.name }}
                                </button>
                            </div>
                        </div>

                        <div>
                            <label class="block text-gray-300 mb-2 text-sm">Title Text</label>
                            <input
                                type="text"
                                v-model="spinConfig.titleText"
                                class="w-full bg-gray-700 text-white px-4 py-2 rounded border border-gray-600 focus:border-purple-500 focus:outline-none"
                            />
                        </div>

                        <div>
                            <label class="block text-gray-300 mb-2 text-sm">Title Color</label>
                            <div class="flex items-center gap-2">
                                <input
                                    type="color"
                                    v-model="spinConfig.titleColor"
                                    class="w-10 h-10 rounded cursor-pointer border-0"
                                />
                                <input
                                    type="text"
                                    v-model="spinConfig.titleColor"
                                    class="flex-1 bg-gray-700 text-white px-3 py-2 rounded text-sm border border-gray-600"
                                />
                            </div>
                        </div>

                        <div>
                            <label class="block text-gray-300 mb-2 text-sm">Wheel Edge Color</label>
                            <div class="flex items-center gap-2">
                                <input
                                    type="color"
                                    v-model="spinConfig.wheelEdgeColor"
                                    class="w-10 h-10 rounded cursor-pointer border-0"
                                />
                                <input
                                    type="text"
                                    v-model="spinConfig.wheelEdgeColor"
                                    class="flex-1 bg-gray-700 text-white px-3 py-2 rounded text-sm border border-gray-600"
                                />
                            </div>
                        </div>
                    </div>
                </div>

                <!-- Preview Panel -->
                <div class="lg:col-span-3 liquid-glass rounded-xl p-4 flex flex-col min-h-[600px]">
                    <div class="flex items-center justify-between mb-4">
                        <h3 class="text-lg font-bold text-white">Live Preview</h3>
                        <span class="text-xs text-gray-400 bg-gray-700 px-3 py-1 rounded-full">
                            {{ activeTab === 'slots' ? '🎰 Slots' : activeTab === 'scratch' ? '🎫 Scratch' : '🎡 Spin' }} Demo Mode
                        </span>
                    </div>

                    <div class="flex-1 rounded-lg overflow-hidden bg-gray-900 relative">
                        <!-- Slots Preview -->
                        <div v-if="activeTab === 'slots'" class="absolute inset-0">
                            <SlotsGame
                                :demoMode="true"
                                previewMode="desktop"
                                :slotsAssets="slotsAssets"
                                :showMachine="true"
                            />
                        </div>

                        <!-- Scratch Preview (Placeholder for now) -->
                        <div v-if="activeTab === 'scratch'" class="absolute inset-0 flex items-center justify-center p-8">
                            <div class="text-center">
                                <div class="grid grid-cols-3 gap-4 mb-6">
                                    <div
                                        v-for="i in 6"
                                        :key="i"
                                        class="aspect-square rounded-xl flex items-center justify-center text-4xl relative overflow-hidden cursor-pointer group"
                                        :style="{
                                            background: 'linear-gradient(135deg, #374151, #1F2937)',
                                            border: `2px solid ${scratchConfig.accentColour}40`
                                        }"
                                    >
                                        <div
                                            class="absolute inset-0 bg-gray-600 flex items-center justify-center text-white font-bold text-2xl group-hover:opacity-80 transition-opacity"
                                            :style="{ boxShadow: `inset 0 0 20px ${scratchConfig.accentColour}40` }"
                                        >
                                            {{ i }}
                                        </div>
                                        <span
                                            class="relative z-10 opacity-0 group-hover:opacity-100 transition-opacity"
                                            :style="{ color: i % 2 === 0 ? scratchConfig.loseTextColour : scratchConfig.wonTextColour }"
                                        >
                                            {{ i % 2 === 0 ? '❌' : '🎉' }}
                                        </span>
                                    </div>
                                </div>
                                <p class="text-gray-400 text-sm">Hover over cards to preview win/lose colors</p>
                                <p
                                    class="text-lg font-bold mt-2"
                                    :style="{ color: scratchConfig.accentColour, textShadow: `0 0 10px ${scratchConfig.accentColour}` }"
                                >
                                    Scratch to reveal your prize!
                                </p>
                            </div>
                        </div>

                        <!-- Spin Preview -->
                        <div v-if="activeTab === 'spin'" class="absolute inset-0">
                            <SpinGame
                                :demoMode="true"
                                previewMode="desktop"
                                :spinAssets="spinAssets"
                            />
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </section>
</template>

<style scoped>
.keyword-animate {
    background: linear-gradient(90deg, #6A3FF4, #00D4FF, #6A3FF4);
    background-size: 200% auto;
    -webkit-background-clip: text;
    -webkit-text-fill-color: transparent;
    animation: gradient-shift 3s ease infinite;
}

@keyframes gradient-shift {
    0% { background-position: 0% center; }
    50% { background-position: 100% center; }
    100% { background-position: 0% center; }
}

.liquid-glass {
    background: rgba(255, 255, 255, 0.05);
    backdrop-filter: blur(10px);
    border: 1px solid rgba(255, 255, 255, 0.1);
}

.bg-accent-purple {
    background: linear-gradient(135deg, #6A3FF4, #8B5CF6);
}
</style>
