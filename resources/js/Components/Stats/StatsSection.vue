<script setup>
import { ref, onMounted } from 'vue';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

const stat1Value = ref(0);
const stat2Value = ref(0);
const stat3Value = ref(0);

onMounted(() => {
    gsap.to(stat1Value, {
        value: 42000,
        duration: 2,
        ease: 'power2.out',
        scrollTrigger: {
            trigger: '#stats',
            start: 'top 80%',
        },
        onUpdate: function() {
            stat1Value.value = Math.round(this.targets()[0].value);
        }
    });

    gsap.to(stat2Value, {
        value: 1250000,
        duration: 2,
        ease: 'power2.out',
        scrollTrigger: {
            trigger: '#stats',
            start: 'top 80%',
        },
        onUpdate: function() {
            stat2Value.value = Math.round(this.targets()[0].value);
        }
    });

    gsap.to(stat3Value, {
        value: 99.9,
        duration: 2,
        ease: 'power2.out',
        scrollTrigger: {
            trigger: '#stats',
            start: 'top 80%',
        },
        onUpdate: function() {
            stat3Value.value = this.targets()[0].value.toFixed(1);
        }
    });
});
</script>

<template>
    <section id="stats" class="py-20 bg-black bg-opacity-20 overflow-hidden">
        <div class="container mx-auto px-4 sm:px-6">
            <div class="text-center mb-12">
                <h2 class="text-3xl md:text-4xl font-bold text-white mb-4">
                    Trusted by the <span class="keyword-animate">Best</span>
                </h2>
                <p class="text-lg text-gray-400 max-w-2xl mx-auto">
                    Our platform powers successful competitions at scale, every single day.
                </p>
            </div>
            <div class="relative max-w-5xl mx-auto flex flex-col lg:flex-row items-center justify-center gap-8">
                <!-- Side Stat 1 -->
                <div class="liquid-glass p-6 rounded-2xl text-center w-full max-w-sm lg:absolute lg:left-0 lg:-translate-x-1/4">
                    <div class="flex justify-center mb-3">
                        <svg class="w-10 h-10 text-orange-500" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M3 10h18M7 15h1m4 0h1m-7 4h12a3 3 0 003-3V8a3 3 0 00-3-3H6a3 3 0 00-3 3v8a3 3 0 003 3z" />
                        </svg>
                    </div>
                    <h3 class="text-4xl md:text-5xl font-bold text-white">{{ stat1Value.toLocaleString() }}</h3>
                    <p class="text-gray-400 mt-2">Orders Processed</p>
                </div>

                <!-- Central Stat (Highlighted) -->
                <div class="liquid-glass p-8 rounded-2xl text-center w-full max-w-sm lg:max-w-md z-10 border-2 border-orange-500 shadow-2xl shadow-orange-500/20">
                    <div class="flex justify-center mb-4">
                        <svg class="w-12 h-12 text-orange-500" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 5v2m0 4v2m0 4v2M5 5a2 2 0 00-2 2v3a2 2 0 002 2h14a2 2 0 002-2V7a2 2 0 00-2-2H5z"/>
                        </svg>
                    </div>
                    <h3 class="text-5xl md:text-6xl font-bold text-white">{{ stat2Value.toLocaleString() }}</h3>
                    <p class="text-gray-300 mt-2 text-lg">Tickets Sold This Month</p>
                </div>

                <!-- Side Stat 2 -->
                <div class="liquid-glass p-6 rounded-2xl text-center w-full max-w-sm lg:absolute lg:right-0 lg:translate-x-1/4">
                    <div class="flex justify-center mb-3">
                        <svg class="w-10 h-10 text-orange-500" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M13 10V3L4 14h7v7l9-11h-7z"/>
                        </svg>
                    </div>
                    <h3 class="text-4xl md:text-5xl font-bold text-white">{{ stat3Value }}%</h3>
                    <p class="text-gray-400 mt-2">Uptime Percentage</p>
                </div>
            </div>
        </div>
    </section>
</template>
