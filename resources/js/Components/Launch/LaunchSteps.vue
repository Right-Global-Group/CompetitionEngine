<script setup>
import { onMounted } from 'vue';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

const steps = [
    {
        number: 1,
        title: 'Choose Your Game',
        description: 'Select from a variety of engaging competition types like scratch cards, spin wheels, and more.'
    },
    {
        number: 2,
        title: 'Customize Everything',
        description: 'Brand your competition with your logos, colors, and unique messaging to make it truly yours.'
    },
    {
        number: 3,
        title: 'Define the Rules',
        description: 'Define entry criteria, prize allocation, and competition duration with our intuitive rule-builder.'
    },
    {
        number: 4,
        title: 'Go Live!',
        description: 'Launch and watch the engagement roll in. Monitor everything from your powerful dashboard.'
    }
];

onMounted(() => {
    gsap.from('.timeline-item', {
        opacity: 0,
        x: -50,
        duration: 0.8,
        stagger: 0.2,
        ease: 'power3.out',
        scrollTrigger: {
            trigger: '#launch',
            start: 'top 70%',
        }
    });
});
</script>

<template>
    <section id="launch" class="py-20 bg-[#161B22]">
        <div class="container mx-auto px-4 sm:px-6">
            <div class="text-center mb-12">
                <h2 class="text-3xl md:text-4xl font-bold text-white mb-4">
                    Launch in <span class="keyword-animate">Minutes</span>
                </h2>
                <p class="text-lg text-gray-400 max-w-2xl mx-auto">
                    A straightforward path from idea to live competition.
                </p>
            </div>
            <div class="max-w-3xl mx-auto">
                <div 
                    v-for="step in steps" 
                    :key="step.number"
                    class="timeline-item"
                >
                    <div class="timeline-dot">
                        <span class="text-white text-xs font-bold">{{ step.number }}</span>
                    </div>
                    <div class="liquid-glass rounded-xl p-6">
                        <h3 class="text-xl font-bold text-white mb-2">{{ step.title }}</h3>
                        <p class="text-gray-400">{{ step.description }}</p>
                    </div>
                </div>
            </div>
        </div>
    </section>
</template>