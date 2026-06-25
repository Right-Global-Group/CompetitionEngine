<script setup>
import { inject, computed } from 'vue';

const getText = inject('getText');

const eyebrowBefore = computed(() => getText('logowall.eyebrow_before', "Powering some of the UK's"));
const eyebrowAccent = computed(() => getText('logowall.eyebrow_accent', 'leading competition operators'));
const footerText = computed(() => getText('logowall.footer_text', 'more UK operators trust CompEngine with their draws'));

const tenants = [
    { label: 'S2A · Competitions' },
    { label: 'Lust Raffles', emoji: '💋 ', cls: 'bl-condensed' },
    { label: 'AutoComps', cls: 'bl-stack', color: '#FFD700', },
    { label: 'Auwins', cls: 'bl-mono', color: '#ff0000' },
    { label: 'WestCoast', emoji: '🌊', color: '#eab308' },
    { label: 'LuckyDucky', emoji: '🦆', color: '#FFDD00' },
    { label: 'Lightning ⚡', cls: 'bl-condensed', color: '#c8920a' },
    { label: 'MsMoneyPenny', emoji: '💰', color: '#7c3aed' },
    { label: 'Vortex', img: '/images/tenant-icons/vortexfavicon.png', color: '#793181', large: true, imgSize: 52, fontSize: '2.5em', height: '58px' },
    { label: 'Jolly', img: '/images/tenant-icons/jolly.png', color: '#D4AF37', },
    { label: 'MadMac', img: '/images/tenant-icons/madmac.png', color: '#FF00FF', alt: 'UK' },
    { label: 'Ritas', img: '/images/tenant-icons/ritas.png', color: '#D4AF37', cls: 'bl-condensed', large: true },
    { label: 'Winner Winner', emoji: '🏆 ', color: '#FF1F1F', },
    { label: 'Prize Party', emoji: '🎊', cls: 'bl-spaced', color: '#FF6B00' },
    { label: 'Karma', emoji: '✨', color: '#D4AF37' },
    { label: 'Deluxe Comps', emoji: '⭐', color: '#c9a227' },
    { label: 'Luxsy Wins', emoji: '✨', cls: 'bl-mono', color: '#ec4899' },
    { label: 'WinThisNow', img: '/images/tenant-icons/winthisnow.png', color: '#0ea5e9', },
    { label: 'Top Banana', emoji: '🍌', cls: 'bl-serif' },
    { label: 'Oche Prizes' },
    { label: 'SmashDrop', cls: 'bl-condensed' },
    { label: 'Wrights', cls: 'bl-serif' },
    { label: 'SunnyGiveaways', emoji: '☀️', color: '#f59e0b' },
    { label: 'House of Hope Comps', emoji: '🏠', cls: 'bl-mono' },
    { label: 'Vincere', emoji: '🏅', cls: 'bl-spaced' },
    { label: 'MPComps', color: '#0ea5e9' },
    { label: 'Podium', emoji: '🏆', cls: 'bl-rounded' },
    { label: 'CrazyCat', cls: 'bl-script' },
    { label: 'Padel Comps', },
    { label: 'Belter Competition', color: '#ffffff' },
    { label: 'Prize Hunter Competitions', color: '#ffffff' },
];

const shuffle = (arr) => {
    const a = [...arr];
    for (let i = a.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [a[i], a[j]] = [a[j], a[i]];
    }
    return a;
};

const tenantsRow1 = shuffle(tenants);
const tenantsRow2 = shuffle(tenants);
</script>

<template>
    <section class="logo-wall" id="logo-wall">
        <div class="logo-wall-eyebrow">
            {{ eyebrowBefore }} <span class="accent">{{ eyebrowAccent }}</span>
            <span class="live-pill">Live</span>
        </div>

        <div class="logo-rail">
            <div class="logo-track">
                <template v-for="n in 2" :key="`row1-${n}`">
                    <div
                        v-for="(tenant, i) in tenantsRow1"
                        :key="`row1-${n}-${i}`"
                        class="brand-logo"
                        :class="tenant.cls"
                        :style="{ color: tenant.color, fontSize: tenant.fontSize || (tenant.large ? '2em' : undefined), gap: tenant.img ? '7px' : undefined, height: tenant.height || undefined }"
                    >
                        <img v-if="tenant.img" :src="tenant.img" :width="tenant.imgSize || 40" :height="tenant.imgSize || 40" :alt="tenant.label" />
                        <template v-else-if="tenant.emoji">{{ tenant.emoji }} </template>{{ tenant.label }}<span v-if="tenant.alt" class="alt">{{ tenant.alt }}</span>
                    </div>
                </template>
            </div>
        </div>

        <div class="logo-rail reverse">
            <div class="logo-track">
                <template v-for="n in 2" :key="`row2-${n}`">
                    <div
                        v-for="(tenant, i) in tenantsRow2"
                        :key="`row2-${n}-${i}`"
                        class="brand-logo"
                        :class="tenant.cls"
                        :style="{ color: tenant.color, fontSize: tenant.fontSize || (tenant.large ? '2em' : undefined), gap: tenant.img ? '7px' : undefined, height: tenant.height || undefined }"
                    >
                        <img v-if="tenant.img" :src="tenant.img" :width="tenant.imgSize || 40" :height="tenant.imgSize || 40" :alt="tenant.label" />
                        <template v-else-if="tenant.emoji">{{ tenant.emoji }} </template>{{ tenant.label }}<span v-if="tenant.alt" class="alt">{{ tenant.alt }}</span>
                    </div>
                </template>
            </div>
        </div>

        <div style="text-align:center; margin-top: 22px; font-size: 12px; color: var(--text-3); letter-spacing: 0.08em;">
            <span style="color:var(--orange); font-weight:700;">+ 200</span>&nbsp;&nbsp;{{ footerText }}
        </div>
    </section>
</template>
