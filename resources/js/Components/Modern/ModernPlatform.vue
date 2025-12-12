<script setup>
import { onMounted } from 'vue';
import { gsap } from 'gsap';

const features = [
    'Blazing Fast Performance',
    'Ironclad Security',
    'Infinitely Scalable',
    'Fully Customizable & Brandable'
];

onMounted(() => {
    // Rotate the gears continuously
    gsap.to('#gear1', {
        rotation: 360,
        duration: 8,
        repeat: -1,
        ease: 'none'
    });

    gsap.to('#gear2', {
        rotation: -360,
        duration: 6,
        repeat: -1,
        ease: 'none'
    });

    gsap.to('#gear3', {
        rotation: 360,
        duration: 10,
        repeat: -1,
        ease: 'none'
    });
});
</script>

<template>
    <section id="wordpress-alternative" class="py-20">
        <div class="container mx-auto px-4 sm:px-6 grid md:grid-cols-2 gap-12 items-center">
            <!-- Content -->
            <div class="text-center md:text-left">
                <h2 class="text-3xl md:text-4xl font-bold text-white mb-4">
                    <span class="keyword-animate">Bye Bye, WordPress.</span>
                </h2>
                <p class="text-4xl md:text-5xl font-extrabold gradient-text mb-6">
                    Hello, Modern Platform.
                </p>
                <p class="text-lg text-gray-400 mb-4">
                    Tired of slow, insecure, and clunky WordPress plugins? Competition Engine is built from the ground up for one purpose: to run flawless competitions at scale.
                </p>
                <ul class="space-y-3 text-left text-gray-300">
                    <li 
                        v-for="(feature, index) in features"
                        :key="index"
                        class="flex items-center"
                    >
                        <svg class="w-6 h-6 mr-2 text-green-400 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 13l4 4L19 7"></path>
                        </svg>
                        {{ feature }}
                    </li>
                </ul>
            </div>

            <!-- Animated Gears Graphic -->
            <div class="relative h-80 order-first md:order-last">
                <!-- Glow effect -->
                <div class="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-96 h-96 bg-[#A020F0] rounded-full opacity-20 blur-3xl"></div>
                
                <!-- Multiple interconnected gears -->
                <svg class="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-full h-full" viewBox="0 0 400 400">
                    <!-- Large gear (center-left) -->
                    <g id="gear1" transform-origin="140 200">
                        <circle cx="140" cy="200" r="60" fill="#A020F0" opacity="0.2"/>
                        <path d="M 140 130 L 145 140 L 135 140 Z M 180 165 L 175 175 L 170 165 Z M 195 200 L 185 205 L 185 195 Z M 180 235 L 170 235 L 175 225 Z M 140 270 L 135 260 L 145 260 Z M 100 235 L 105 225 L 110 235 Z M 85 200 L 95 195 L 95 205 Z M 100 165 L 110 165 L 105 175 Z" fill="#A020F0" opacity="0.6"/>
                        <circle cx="140" cy="200" r="40" fill="none" stroke="#A020F0" stroke-width="3"/>
                        <circle cx="140" cy="200" r="15" fill="#A020F0"/>
                    </g>

                    <!-- Medium gear (top-right) -->
                    <g id="gear2" transform-origin="260 140">
                        <circle cx="260" cy="140" r="45" fill="#FF9900" opacity="0.2"/>
                        <path d="M 260 90 L 264 98 L 256 98 Z M 293 115 L 289 123 L 285 115 Z M 305 140 L 297 144 L 297 136 Z M 293 165 L 285 165 L 289 157 Z M 260 190 L 256 182 L 264 182 Z M 227 165 L 231 157 L 235 165 Z M 215 140 L 223 136 L 223 144 Z M 227 115 L 235 115 L 231 123 Z" fill="#FF9900" opacity="0.6"/>
                        <circle cx="260" cy="140" r="30" fill="none" stroke="#FF9900" stroke-width="2.5"/>
                        <circle cx="260" cy="140" r="12" fill="#FF9900"/>
                    </g>

                    <!-- Small gear (bottom-right) -->
                    <g id="gear3" transform-origin="270 260">
                        <circle cx="270" cy="260" r="35" fill="#6A3FF4" opacity="0.2"/>
                        <path d="M 270 220 L 273 227 L 267 227 Z M 298 240 L 295 247 L 291 240 Z M 305 260 L 298 263 L 298 257 Z M 298 280 L 291 280 L 295 273 Z M 270 300 L 267 293 L 273 293 Z M 242 280 L 245 273 L 249 280 Z M 235 260 L 242 257 L 242 263 Z M 242 240 L 249 240 L 245 247 Z" fill="#6A3FF4" opacity="0.6"/>
                        <circle cx="270" cy="260" r="22" fill="none" stroke="#6A3FF4" stroke-width="2"/>
                        <circle cx="270" cy="260" r="9" fill="#6A3FF4"/>
                    </g>

                    <!-- Connection lines (subtle) -->
                    <line x1="180" y1="180" x2="230" y2="150" stroke="#A020F0" stroke-width="1" opacity="0.3"/>
                    <line x1="250" y1="175" x2="260" y2="225" stroke="#FF9900" stroke-width="1" opacity="0.3"/>
                </svg>

                <!-- Floating particles around gears -->
                <div class="absolute top-1/4 left-1/4 w-2 h-2 bg-purple-400 rounded-full animate-ping" style="animation-delay: 0s;"></div>
                <div class="absolute top-3/4 right-1/3 w-2 h-2 bg-orange-400 rounded-full animate-ping" style="animation-delay: 1s;"></div>
                <div class="absolute top-1/2 right-1/4 w-2 h-2 bg-purple-400 rounded-full animate-ping" style="animation-delay: 2s;"></div>
            </div>
        </div>
    </section>
</template>