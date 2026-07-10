<script setup>
import { inject, computed } from 'vue';

const getText = inject('getText');

const eyebrowBefore = computed(() => getText('logowall.eyebrow_before', "Powering some of the UK's"));
const eyebrowAccent = computed(() => getText('logowall.eyebrow_accent', 'leading competition operators'));
const footerText = computed(() => getText('logowall.footer_text', 'more UK operators trust CompEngine with their draws'));

const tenants = [
    { label: 'S2A', img: '/images/tenant-icons/s2a.png' },
    { label: 'Lust Raffles', img: '/images/tenant-icons/lustraffles.png' },
    { label: 'AutoComps', img: '/images/tenant-icons/autocomps.png' },
    { label: 'Auwins', img: '/images/tenant-icons/auwins.png' },
    { label: 'WestCoast', img: '/images/tenant-icons/westcoast.png' },
    { label: 'LuckyDucky', img: '/images/tenant-icons/luckyducky.png' },
    { label: 'Lightning', img: '/images/tenant-icons/lightning.png' },
    { label: 'MsMoneyPenny', img: '/images/tenant-icons/msmoneypenny.png' },
    { label: 'Vortex', img: '/images/tenant-icons/vortex.png', large: true },
    { label: 'Jolly', img: '/images/tenant-icons/jolly.png' },
    { label: 'MadMac', img: '/images/tenant-icons/madmac.png' },
    { label: 'Ritas', img: '/images/tenant-icons/ritas.png' },
    { label: 'Winner Winner', img: '/images/tenant-icons/winnerwinner.png' },
    { label: 'Prize Party', img: '/images/tenant-icons/prizeparty.png' },
    { label: 'Karma', img: '/images/tenant-icons/karma.png' },
    { label: 'Deluxe Comps', img: '/images/tenant-icons/deluxe.png' },
    { label: 'Luxsy Wins', img: '/images/tenant-icons/luxsy.png' },
    { label: 'WinThisNow', img: '/images/tenant-icons/winthisnow.png' },
    { label: 'Top Banana', img: '/images/tenant-icons/topbanana.png' },
    { label: 'MixItUp', img: '/images/tenant-icons/mixitup.png' },
    // { label: 'Oche Prizes', img: '/images/tenant-icons/ocheprizes.png' },
    { label: 'SmashDrop', img: '/images/tenant-icons/smashdrop.png' },
    { label: 'Wrights', img: '/images/tenant-icons/wrights.png' },
    { label: 'SunnyGiveaways', img: '/images/tenant-icons/sunnygiveaways.png' },
    { label: 'House of Hope', img: '/images/tenant-icons/hope.png' },
    { label: 'Vincere', img: '/images/tenant-icons/vincere.png' },
    { label: 'MPComps', img: '/images/tenant-icons/mpower.png' },
    { label: 'Podium', img: '/images/tenant-icons/podium.png' },
    { label: 'CrazyCat', img: '/images/tenant-icons/crazycat.png' },
    { label: 'Padel Comps', img: '/images/tenant-icons/padel.png' },
    { label: 'Belter Competition', img: '/images/tenant-icons/belter.png' },
    { label: 'Prize Hunter', img: '/images/tenant-icons/prizehunter.png' },
];

const shuffle = (arr) => {
    const a = [...arr];
    for (let i = a.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [a[i], a[j]] = [a[j], a[i]];
    }
    return a;
};

function buildRow1() {
    const vortex = tenants.find((t) => t.label === 'Vortex');
    const others = shuffle(tenants.filter((t) => t.label !== 'Vortex'));
    const middle = Math.floor(others.length / 2);
    others.splice(middle, 0, vortex);
    return others;
}

const tenantsRow1 = buildRow1();
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
                    >
                        <img :src="tenant.img" :alt="tenant.label" :class="{ 'bl-large': tenant.large }" />
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
                    >
                        <img :src="tenant.img" :alt="tenant.label" :class="{ 'bl-large': tenant.large }" />
                    </div>
                </template>
            </div>
        </div>

        <div style="text-align:center; margin-top: 22px; font-size: 12px; color: var(--text-3); letter-spacing: 0.08em;">
            <span style="color:var(--orange); font-weight:700;">+ 200</span>&nbsp;&nbsp;{{ footerText }}
        </div>
    </section>
</template>
