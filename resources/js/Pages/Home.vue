<script setup>
import { Head } from '@inertiajs/vue3';
import { inject, onMounted, onBeforeUnmount } from 'vue';

import UltraNav from '@/Components/Ultra/UltraNav.vue';
import UltraHero from '@/Components/Ultra/UltraHero.vue';
import UltraLogoWall from '@/Components/Ultra/UltraLogoWall.vue';
import GameConfigurator from '@/Components/Configurator/GameConfigurator.vue';
import UltraEcosystem from '@/Components/Ultra/UltraEcosystem.vue';
import UltraEasy from '@/Components/Ultra/UltraEasy.vue';
import UltraConvert from '@/Components/Ultra/UltraConvert.vue';
import UltraCertifiedDraws from '@/Components/Ultra/UltraCertifiedDraws.vue';
import UltraWhyFee from '@/Components/Ultra/UltraWhyFee.vue';
import UltraComparison from '@/Components/Ultra/UltraComparison.vue';
import UltraRoadmap from '@/Components/Ultra/UltraRoadmap.vue';
import UltraPricing from '@/Components/Ultra/UltraPricing.vue';
import UltraFaq from '@/Components/Ultra/UltraFaq.vue';
import UltraBooking from '@/Components/Ultra/UltraBooking.vue';
import UltraFooter from '@/Components/Ultra/UltraFooter.vue';
import UltraSticky from '@/Components/Ultra/UltraSticky.vue';

import { initUltraHome } from '@/ultra/homeFx';

// Legacy styles only scope the real Game Studio block (.ce-legacy); everything else is home-ultra.css
import '../../css/home-redesign.css';
import '../../css/home-ultra.css';

const getText = inject('getText', (key, fallback = '') => fallback);

// Rolling 30-day figures — editable in the admin under Site Texts (stats.value_orders / stats.value_tickets)
const orders = parseInt(getText('stats.value_orders', '1500000'), 10) || 1500000;
const tickets = parseInt(getText('stats.value_tickets', '120000000'), 10) || 120000000;

let destroyFx = null;

onMounted(() => {
    destroyFx = initUltraHome({ orders, tickets });

    const hash = window.location.hash;
    if (hash) {
        setTimeout(() => {
            const el = document.getElementById(hash.substring(1));
            if (el) el.scrollIntoView({ behavior: 'smooth' });
        }, 150);
    }
});

onBeforeUnmount(() => {
    if (destroyFx) destroyFx();
});
</script>

<template>
    <Head>
        <title>Competition Engine - Ultimate Competition Platform</title>
        <meta name="description" content="CompEngine — the UK competition platform. Game Studio, GLI-certified draws, separate wallets, compliant free entry. Book a 30-min demo." head-key="description" />
    </Head>

    <div class="ce-home" id="ce-home">
        <div class="haze" aria-hidden="true"></div>
        <div class="progress" id="progress" aria-hidden="true"></div>
        <svg width="0" height="0" style="position:absolute" aria-hidden="true">
            <defs>
                <linearGradient id="ce-gg" x1="0" y1="0" x2="1" y2="1">
                    <stop offset="0" stop-color="#5b7fc4"/><stop offset=".25" stop-color="#8a5fb8"/><stop offset=".5" stop-color="#b297db"/><stop offset=".72" stop-color="#d97aa8"/><stop offset=".88" stop-color="#ec8a82"/><stop offset="1" stop-color="#f4a558"/>
                </linearGradient>
                <linearGradient id="ce-spark-fill" x1="0" y1="0" x2="0" y2="1"><stop offset="0" stop-color="#f4a558" stop-opacity=".35"/><stop offset="1" stop-color="#f4a558" stop-opacity="0"/></linearGradient>
                <linearGradient id="ce-chart-fill" x1="0" y1="0" x2="0" y2="1"><stop offset="0" stop-color="#f4a558" stop-opacity=".28"/><stop offset="1" stop-color="#f4a558" stop-opacity="0"/></linearGradient>
            </defs>
        </svg>

        <div class="page">
            <UltraNav />
            <UltraHero :orders="orders" :tickets="tickets" />
            <UltraLogoWall />
        </div>
    </div>

    <!-- The real Game Studio (nine playable games) keeps its own styles -->
    <div class="ce-legacy">
        <GameConfigurator />
    </div>

    <div class="ce-home">
        <div class="page">
            <UltraEcosystem />
            <UltraEasy />
            <UltraConvert />
            <UltraCertifiedDraws />
            <UltraWhyFee />
            <UltraComparison />
            <UltraRoadmap />
            <UltraPricing />
            <UltraFaq />
            <UltraBooking />
            <UltraFooter />
        </div>
        <UltraSticky />
    </div>
</template>
