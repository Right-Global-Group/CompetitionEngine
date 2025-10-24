<script setup>
import { ref } from 'vue';

const mobileMenuOpen = ref(false);

const scrollToSection = (sectionId) => {
    const element = document.getElementById(sectionId);
    if (element) {
        element.scrollIntoView({ behavior: 'smooth' });
        mobileMenuOpen.value = false;
    }
};
</script>

<template>
    <header class="fixed top-0 left-0 right-0 z-50 glass-effect">
        <div class="container mx-auto px-4 sm:px-6 py-4">
            <div class="grid grid-cols-3 items-center">
                <!-- Left: Logo (takes equal space) -->
                <div class="flex items-center cursor-pointer justify-start" @click="scrollToSection('hero')">
                    <svg class="w-8 h-8 md:w-10 md:h-10 mr-2 md:mr-3 text-accent-purple" viewBox="0 0 24 24" fill="currentColor">
                        <path d="M19.43 12.98c.04-.32.07-.64.07-.98s-.03-.66-.07-.98l2.11-1.65c.19-.15.24-.42.12-.64l-2-3.46c-.12-.22-.39-.3-.61-.22l-2.49 1c-.52-.4-1.08-.73-1.69-.98l-.38-2.65C14.46 2.18 14.25 2 14 2h-4c-.25 0-.46.18-.49.42l-.38 2.65c-.61-.25-1.17.59-1.69-.98l-2.49-1c-.23-.09-.49 0-.61.22l-2 3.46c-.13.22-.07.49.12.64l2.11 1.65c-.04.32-.07.65-.07.98s.03.66.07.98l-2.11 1.65c-.19.15-.24-.42-.12-.64l2 3.46c.12.22.39.3.61.22l2.49-1c.52.4 1.08.73 1.69.98l.38 2.65c.03.24.24.42.49.42h4c.25 0 .46-.18.49-.42l.38-2.65c.61-.25 1.17-.59 1.69-.98l2.49 1c.23-.09.49 0 .61-.22l2-3.46c.12-.22-.07-.49-.12-.64l-2.11-1.65zM12 15.5c-1.93 0-3.5-1.57-3.5-3.5s1.57-3.5 3.5-3.5 3.5 1.57 3.5 3.5-1.57 3.5-3.5 3.5z"/>
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