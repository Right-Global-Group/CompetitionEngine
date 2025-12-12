<script setup>
import { ref } from 'vue';

const mobileMenuOpen = ref(false);
const calendlyUrl = 'https://calendly.com/rightglobalgroup/website-design-free-consultation';

const scrollToSection = (sectionId) => {
    const element = document.getElementById(sectionId);
    if (element) {
        element.scrollIntoView({ behavior: 'smooth' });
        mobileMenuOpen.value = false;
    }
};

const openCalendly = () => {
    window.open(calendlyUrl, '_blank');
    mobileMenuOpen.value = false;
};
</script>

<template>
    <header class="fixed top-0 left-0 right-0 z-50 glass-effect">
        <div class="container mx-auto px-4 sm:px-6 py-4">
            <div class="grid grid-cols-3 items-center">
                <!-- Left: Logo (takes equal space) -->
                <div class="flex items-center cursor-pointer justify-start group" @click="scrollToSection('hero')">
                    <img src="/images/logo.svg" alt="Competition Engine" class="h-10 md:h-12" />
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
                        @click="openCalendly"
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
                <button @click="openCalendly" class="bg-accent-purple text-white font-semibold px-5 py-2 rounded-lg hover:bg-accent-orange transition w-full mt-2">Book a Demo</button>
            </nav>
        </div>
    </header>
</template>