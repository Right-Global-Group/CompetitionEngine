<script setup>
import { ref, onMounted } from 'vue';
import { gsap } from 'gsap';

const mobileMenuOpen = ref(false);
const cogRef = ref(null);

const scrollToSection = (sectionId) => {
    const element = document.getElementById(sectionId);
    if (element) {
        element.scrollIntoView({ behavior: 'smooth' });
        mobileMenuOpen.value = false;
    }
};

onMounted(() => {
    // Continuous rotation animation for the cog
    if (cogRef.value) {
        gsap.to(cogRef.value, {
            rotation: 360,
            duration: 20,
            repeat: -1,
            ease: 'none'
        });
    }
});
</script>

<template>
    <header class="fixed top-0 left-0 right-0 z-50 glass-effect">
        <div class="container mx-auto px-4 sm:px-6 py-4">
            <div class="grid grid-cols-3 items-center">
                <!-- Left: Logo (takes equal space) -->
                <div class="flex items-center cursor-pointer justify-start group" @click="scrollToSection('hero')">
                    <!-- Animated Gear SVG matching ModernPlatform style -->
                    <svg class="w-10 h-10 md:w-12 md:h-12 mr-2 md:mr-3" viewBox="0 0 100 100">
                        <g ref="cogRef" transform-origin="50 50">
                            <!-- Outer glow circle -->
                            <circle cx="50" cy="50" r="35" fill="#A020F0" opacity="0.2"/>
                            
                            <!-- Gear teeth (8 teeth) -->
                            <path d="M 50 10 L 53 18 L 47 18 Z 
                                     M 73 17 L 71 25 L 67 19 Z 
                                     M 90 50 L 82 53 L 82 47 Z 
                                     M 73 83 L 67 81 L 71 75 Z 
                                     M 50 90 L 47 82 L 53 82 Z 
                                     M 27 83 L 29 75 L 33 81 Z 
                                     M 10 50 L 18 47 L 18 53 Z 
                                     M 27 17 L 33 19 L 29 25 Z" 
                                  fill="#6A3FF4" 
                                  opacity="0.7"/>
                            
                            <!-- Main gear circle -->
                            <circle cx="50" cy="50" r="25" fill="none" stroke="#6A3FF4" stroke-width="3"/>
                            
                            <!-- Inner circle -->
                            <circle cx="50" cy="50" r="15" fill="#A020F0"/>
                            
                            <!-- Center hub -->
                            <circle cx="50" cy="50" r="8" fill="#11052C"/>
                            
                            <!-- Letter E in center -->
                            <text x="50" y="57" font-family="Arial, sans-serif" font-size="12" font-weight="bold" fill="#6A3FF4" text-anchor="middle">E</text>
                        </g>
                    </svg>
                    <span class="text-xl md:text-2xl font-bold text-white whitespace-nowrap">Competition Engine</span>
                </div>

                <!-- Center: Navigation (perfectly centered) -->
                <nav class="hidden md:flex items-center justify-center space-x-8">
                    <button @click="scrollToSection('ecosystem')" class="text-gray-300 hover:text-accent-purple transition whitespace-nowrap">Features</button>
                    <button @click="scrollToSection('comparison')" class="text-gray-300 hover:text-accent-purple transition whitespace-nowrap">Comparison</button>
                    <button @click="scrollToSection('pricing')" class="text-gray-300 hover:text-accent-purple transition whitespace-nowrap">Pricing</button>
                    <button @click="scrollToSection('faq')" class="text-gray-300 hover:text-accent-purple transition whitespace-nowrap">FAQ</button>
                </nav>

                <!-- Right: Book Demo Button (takes equal space, aligned right) -->
                <div class="flex justify-end">
                    <button 
                        @click="scrollToSection('booking')" 
                        class="hidden md:inline-block bg-accent-purple text-white font-semibold px-5 py-2 rounded-lg hover:bg-accent-orange transition glow-button whitespace-nowrap"
                    >
                        Book a Demo
                    </button>

                    <!-- Mobile Menu Button -->
                    <button 
                        @click="mobileMenuOpen = !mobileMenuOpen"
                        class="md:hidden text-white"
                    >
                        <svg class="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 6h16M4 12h16M4 18h16"/>
                        </svg>
                    </button>
                </div>
            </div>
        </div>

        <!-- Mobile Menu -->
        <div v-show="mobileMenuOpen" class="md:hidden glass-effect">
            <nav class="container mx-auto px-4 py-4 space-y-3">
                <button @click="scrollToSection('ecosystem')" class="block w-full text-left text-gray-300 hover:text-accent-purple transition py-2">Features</button>
                <button @click="scrollToSection('comparison')" class="block w-full text-left text-gray-300 hover:text-accent-purple transition py-2">Comparison</button>
                <button @click="scrollToSection('pricing')" class="block w-full text-left text-gray-300 hover:text-accent-purple transition py-2">Pricing</button>
                <button @click="scrollToSection('faq')" class="block w-full text-left text-gray-300 hover:text-accent-purple transition py-2">FAQ</button>
                <button @click="scrollToSection('booking')" class="bg-accent-purple text-white font-semibold px-5 py-2 rounded-lg hover:bg-accent-orange transition w-full mt-2">Book a Demo</button>
            </nav>
        </div>
    </header>
</template>