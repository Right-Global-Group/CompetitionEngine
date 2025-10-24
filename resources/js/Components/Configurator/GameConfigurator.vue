<script setup>
import { ref } from 'vue';

const activeTab = ref('slots');
const backgroundColor = ref('#11052C');
const textColor = ref('#FFFFFF');
const accentColor = ref('#6A3FF4');
const winningMessage = ref('YOU WIN!');

const tabs = [
    { id: 'slots', name: 'Slots' },
    { id: 'scratch', name: 'Scratch' },
    { id: 'spin', name: 'Spin' }
];
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

            <div class="grid lg:grid-cols-2 gap-8 max-w-6xl mx-auto">
                <!-- Configurator Panel -->
                <div class="liquid-glass rounded-xl p-6">
                    <h3 class="text-xl font-bold text-white mb-6">Customize</h3>
                    
                    <!-- Tabs -->
                    <div class="flex gap-2 mb-6">
                        <button
                            v-for="tab in tabs"
                            :key="tab.id"
                            @click="activeTab = tab.id"
                            :class="[
                                'px-6 py-2 rounded-lg font-semibold transition-all',
                                activeTab === tab.id 
                                    ? 'bg-accent-purple text-white' 
                                    : 'bg-gray-700 text-gray-300 hover:bg-gray-600'
                            ]"
                        >
                            {{ tab.name }}
                        </button>
                    </div>

                    <!-- Color Pickers -->
                    <div class="space-y-4">
                        <div>
                            <label class="block text-gray-300 mb-2">Background Color</label>
                            <div class="flex items-center gap-3">
                                <input 
                                    type="color" 
                                    v-model="backgroundColor"
                                    class="w-12 h-12 rounded cursor-pointer"
                                />
                                <input 
                                    type="text" 
                                    v-model="backgroundColor"
                                    class="flex-1 bg-gray-700 text-white px-4 py-2 rounded"
                                />
                            </div>
                        </div>

                        <div>
                            <label class="block text-gray-300 mb-2">Text Color</label>
                            <div class="flex items-center gap-3">
                                <input 
                                    type="color" 
                                    v-model="textColor"
                                    class="w-12 h-12 rounded cursor-pointer"
                                />
                                <input 
                                    type="text" 
                                    v-model="textColor"
                                    class="flex-1 bg-gray-700 text-white px-4 py-2 rounded"
                                />
                            </div>
                        </div>

                        <div>
                            <label class="block text-gray-300 mb-2">Accent Color</label>
                            <div class="flex items-center gap-3">
                                <input 
                                    type="color" 
                                    v-model="accentColor"
                                    class="w-12 h-12 rounded cursor-pointer"
                                />
                                <input 
                                    type="text" 
                                    v-model="accentColor"
                                    class="flex-1 bg-gray-700 text-white px-4 py-2 rounded"
                                />
                            </div>
                        </div>

                        <div>
                            <label class="block text-gray-300 mb-2">Winning Message</label>
                            <input 
                                type="text" 
                                v-model="winningMessage"
                                class="w-full bg-gray-700 text-white px-4 py-2 rounded"
                            />
                        </div>
                    </div>
                </div>

                <!-- Preview Panel -->
                <div class="liquid-glass rounded-xl p-6 flex items-center justify-center min-h-[400px]">
                    <div 
                        class="w-full max-w-md aspect-square rounded-xl flex items-center justify-center"
                        :style="{ backgroundColor: backgroundColor }"
                    >
                        <div class="text-center p-8">
                            <div 
                                class="text-6xl font-bold mb-4"
                                :style="{ color: accentColor }"
                            >
                                {{ activeTab === 'slots' ? '🎰' : activeTab === 'scratch' ? '🎫' : '🎡' }}
                            </div>
                            <div 
                                class="text-2xl font-bold"
                                :style="{ color: textColor }"
                            >
                                {{ winningMessage }}
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </section>
</template>