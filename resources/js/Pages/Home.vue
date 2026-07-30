<script setup>
import { Head } from '@inertiajs/vue3';
import AppLayout from '@/Layouts/AppLayout.vue';
import HeroSection from '@/Components/Hero/HeroSection.vue';
import StatsSection from '@/Components/Stats/StatsSection.vue';
import GameConfigurator from '@/Components/Configurator/GameConfigurator.vue';
import EcosystemFeatures from '@/Components/Ecosystem/EcosystemFeatures.vue';
import NextGenPlatform from '@/Components/Platform/NextGenPlatform.vue';
import CertifiedDraws from '@/Components/Draws/CertifiedDraws.vue';
import WhyOurFee from '@/Components/Fee/WhyOurFee.vue';
import ComparisonTable from '@/Components/Comparison/ComparisonTable.vue';
import AIFeatures from '@/Components/Platform/AIFeatures.vue';
import PricingCards from '@/Components/Pricing/PricingCards.vue';
import FAQSection from '@/Components/FAQ/FAQSection.vue';
import BookingSection from '@/Components/Booking/BookingSection.vue';
import MobileStickyBar from '@/Components/CTA/MobileStickyBar.vue';

import '../../css/home-redesign.css';

import { onMounted } from 'vue';

onMounted(() => {
    // Check if there's a hash in the URL
    const hash = window.location.hash;
    if (hash) {
        // Wait a bit for the page to fully render
        setTimeout(() => {
            const element = document.getElementById(hash.substring(1));
            if (element) {
                element.scrollIntoView({ behavior: 'smooth' });
            }
        }, 100);
    }
});
</script>

<template>
    <Head>
        <title>Competition Engine - Ultimate Competition Platform</title>
        <meta name="description" content="Build, manage, and scale engaging competitions with Competition Engine — the ultimate competition platform built for operators. No code needed." head-key="description" />
    </Head>

    <AppLayout>
        <div class="ce-home">
            <div class="bg-fx"></div>

            <!-- Shared gear-logo SVG symbol, referenced via <use href="#gear-logo"/> in several sections below -->
            <svg width="0" height="0" style="position:absolute" aria-hidden="true">
                <defs>
                    <linearGradient id="gearGrad" x1="0%" y1="0%" x2="100%" y2="100%">
                        <stop offset="0%"  stop-color="#5b7fc4"/>
                        <stop offset="22%" stop-color="#8a5fb8"/>
                        <stop offset="45%" stop-color="#b297db"/>
                        <stop offset="68%" stop-color="#d97aa8"/>
                        <stop offset="85%" stop-color="#ec8a82"/>
                        <stop offset="100%" stop-color="#f4a558"/>
                    </linearGradient>
                    <symbol id="gear-logo" viewBox="0 0 100 100">
                        <path fill="none" stroke="url(#gearGrad)" stroke-width="3.5" stroke-linejoin="round" d="
                            M 50 4
                            L 56 4 L 58 14
                            A 36 36 0 0 1 65 16
                            L 71 8 L 76 12
                            L 73 21
                            A 36 36 0 0 1 79 25
                            L 88 22 L 92 27
                            L 86 35
                            A 36 36 0 0 1 88 42
                            L 96 44 L 96 50 L 96 56
                            L 88 58
                            A 36 36 0 0 1 86 65
                            L 92 73 L 88 78
                            L 79 75
                            A 36 36 0 0 1 73 79
                            L 76 88 L 71 92
                            L 65 84
                            A 36 36 0 0 1 58 86
                            L 56 96 L 50 96 L 44 96
                            L 42 86
                            A 36 36 0 0 1 35 84
                            L 29 92 L 24 88
                            L 27 79
                            A 36 36 0 0 1 21 75
                            L 12 78 L 8 73
                            L 14 65
                            A 36 36 0 0 1 12 58
                            L 4 56 L 4 50 L 4 44
                            L 12 42
                            A 36 36 0 0 1 14 35
                            L 8 27 L 12 22
                            L 21 25
                            A 36 36 0 0 1 27 21
                            L 24 12 L 29 8
                            L 35 16
                            A 36 36 0 0 1 42 14
                            L 44 4 Z
                        "/>
                        <circle cx="50" cy="50" r="32" fill="none" stroke="url(#gearGrad)" stroke-width="1.5" opacity="0.9"/>
                        <circle cx="50" cy="50" r="28" fill="none" stroke="url(#gearGrad)" stroke-width="1" opacity="0.55"/>
                    </symbol>
                </defs>
            </svg>

            <HeroSection />
            <GameConfigurator />
            <EcosystemFeatures />
            <NextGenPlatform />
            <CertifiedDraws />
            <WhyOurFee />
            <ComparisonTable />
            <AIFeatures />
            <PricingCards />
            <FAQSection />
            <BookingSection />
            <MobileStickyBar />
        </div>
    </AppLayout>
</template>
