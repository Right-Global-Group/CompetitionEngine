<script setup>
import { onMounted } from 'vue';
import { gsap } from 'gsap';

const scrollToBooking = () => {
    const element = document.getElementById('booking');
    if (element) {
        element.scrollIntoView({ behavior: 'smooth' });
    }
};

onMounted(() => {
    gsap.from('.hero-title', {
        opacity: 0,
        y: 50,
        duration: 1,
        ease: 'power3.out'
    });

    gsap.from('.hero-subtitle', {
        opacity: 0,
        y: 30,
        duration: 1,
        delay: 0.3,
        ease: 'power3.out'
    });

    gsap.from('.hero-buttons', {
        opacity: 0,
        y: 20,
        duration: 0.8,
        delay: 0.6,
        ease: 'power3.out'
    });
});
</script>

<template>
    <section id="hero" class="relative min-h-screen flex items-center justify-center text-center overflow-hidden">
        <div class="relative z-10 p-4 sm:p-6">
            <h1 class="hero-title text-4xl sm:text-5xl md:text-7xl font-extrabold text-white mb-4 leading-tight">
                The <span class="keyword-animate">Ultimate Competition</span> Platform
            </h1>
            <p class="hero-subtitle text-base sm:text-lg md:text-xl text-gray-300 max-w-3xl mx-auto mb-8">
                Effortlessly create, manage, and scale engaging competitions that your audience will love. No code, no hassle.
            </p>
            <div class="hero-buttons flex flex-col sm:flex-row justify-center items-center gap-4">
                <button 
                    @click="scrollToBooking"
                    class="w-full sm:w-auto bg-accent-purple text-white font-semibold px-8 py-3 sm:py-4 rounded-lg hover:bg-accent-orange transition-all duration-300 transform hover:scale-105 glow-button"
                >
                    Book a Demo
                </button>
                <button 
                    class="w-full sm:w-auto glass-effect text-white font-semibold px-8 py-3 sm:py-4 rounded-lg hover:bg-opacity-80 transition-all duration-300 transform hover:scale-105"
                >
                    View Live Demo
                </button>
            </div>
        </div>
    </section>
</template>