<script setup>
import { inject, computed, ref, onMounted, onUnmounted, nextTick } from 'vue';

const getText = inject('getText');

const eyebrowBefore = computed(() => getText('logowall.eyebrow_before', "Powering some of the UK's"));
const eyebrowAccent = computed(() => getText('logowall.eyebrow_accent', 'leading competition operators'));
const footerText = computed(() => getText('logowall.footer_text', 'more UK operators trust CompEngine with their draws'));

const tenants = [
    { label: 'S2A', img: '/images/tenant-icons/s2a.png', w: 1068, h: 684 },
    { label: 'AutoComps', img: '/images/tenant-icons/autocomps.png', w: 1181, h: 591 },
    { label: 'Auwins', img: '/images/tenant-icons/auwins.png', w: 150, h: 150 },
    { label: 'WestCoast', img: '/images/tenant-icons/westcoast.png', w: 397, h: 201 },
    { label: 'LuckyDucky', img: '/images/tenant-icons/luckyducky.png', w: 505, h: 494 },
    { label: 'Lightning', img: '/images/tenant-icons/lightning.png', w: 321, h: 172 },
    { label: 'MsMoneyPenny', img: '/images/tenant-icons/msmoneypenny.png', w: 507, h: 353 },
    { label: 'Vortex', img: '/images/tenant-icons/vortex.png', large: true, w: 370, h: 110 },
    { label: 'Jolly', img: '/images/tenant-icons/jolly.png', w: 1200, h: 700 },
    { label: 'MadMac', img: '/images/tenant-icons/madmac.png', w: 1769, h: 1308 },
    { label: 'Ritas', img: '/images/tenant-icons/ritas.png', w: 2079, h: 1667 },
    { label: 'Winner Winner', img: '/images/tenant-icons/winnerwinner.png', w: 1024, h: 560 },
    { label: 'Prize Party', img: '/images/tenant-icons/prizeparty.png', w: 4320, h: 3616 },
    { label: 'Karma', img: '/images/tenant-icons/karma.png', w: 1179, h: 445 },
    { label: 'Deluxe Comps', img: '/images/tenant-icons/deluxe.png', w: 343, h: 257 },
    { label: 'Luxsy Wins', img: '/images/tenant-icons/luxsy.png', w: 512, h: 512 },
    { label: 'WinThisNow', img: '/images/tenant-icons/winthisnow.png', w: 124, h: 136 },
    { label: 'Top Banana', img: '/images/tenant-icons/topbanana.png', w: 1024, h: 1024 },
    { label: 'MixItUp', img: '/images/tenant-icons/mixitup.png', w: 5028, h: 2706 },
    // { label: 'Oche Prizes', img: '/images/tenant-icons/ocheprizes.png' },
    { label: 'SmashDrop', img: '/images/tenant-icons/smashdrop.png', w: 1000, h: 469 },
    { label: 'Wrights', img: '/images/tenant-icons/wrights.png', w: 2560, h: 891 },
    { label: 'SunnyGiveaways', img: '/images/tenant-icons/sunnygiveaways.png', w: 600, h: 400 },
    { label: 'House of Hope', img: '/images/tenant-icons/hope.png', w: 1024, h: 1024 },
    { label: 'Vincere', img: '/images/tenant-icons/vincere.png', w: 1997, h: 609 },
    { label: 'MPComps', img: '/images/tenant-icons/mpower.png', w: 680, h: 264 },
    { label: 'Podium', img: '/images/tenant-icons/podium.png', w: 1404, h: 456 },
    { label: 'CrazyCat', img: '/images/tenant-icons/crazycat.png', w: 1100, h: 1100 },
    { label: 'Padel Comps', img: '/images/tenant-icons/padel.png', w: 926, h: 610 },
    { label: 'Belter Competition', img: '/images/tenant-icons/belter.png', w: 206, h: 127 },
    { label: 'Prize Hunter', img: '/images/tenant-icons/prizehunter.png', w: 1267, h: 659 },
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

/* ============== Precisely centre the Vortex logo in the top row on load ============== */
const rail1Ref = ref(null);
const track1Ref = ref(null);
const vortexReady = ref(false);

function centerVortex() {
    const track = track1Ref.value;
    const rail = rail1Ref.value;
    if (!track || !rail) return;

    const children = Array.from(track.children).slice(0, tenantsRow1.length);
    const gap = parseFloat(getComputedStyle(track).columnGap) || 0;

    let cumulativeLeft = 0;
    let vortexLeft = null;
    let vortexWidth = 0;
    for (const child of children) {
        if (vortexLeft === null) {
            const img = child.querySelector('img');
            if (img && img.alt === 'Vortex') {
                vortexLeft = cumulativeLeft;
                vortexWidth = child.offsetWidth;
            }
        }
        cumulativeLeft += child.offsetWidth + gap;
    }
    if (vortexLeft === null) return;

    const railWidth = rail.clientWidth;
    const vortexCenter = vortexLeft + vortexWidth / 2;
    const startX = railWidth / 2 - vortexCenter;
    track.style.setProperty('--start-x', startX + 'px');
    vortexReady.value = true;
}

let resizeTimer = null;
function onResize() {
    clearTimeout(resizeTimer);
    resizeTimer = setTimeout(centerVortex, 120);
}

onMounted(() => {
    nextTick(centerVortex);
    setTimeout(() => { vortexReady.value = true; }, 200);
    window.addEventListener('resize', onResize);
});

onUnmounted(() => {
    window.removeEventListener('resize', onResize);
    clearTimeout(resizeTimer);
});
</script>

<template>
    <section class="logo-wall" id="logo-wall">
        <div class="logo-wall-eyebrow">
            {{ eyebrowBefore }} <span class="accent">{{ eyebrowAccent }}</span>
            <span class="live-pill">Live</span>
        </div>

        <div class="logo-rail row1" :class="{ ready: vortexReady }" ref="rail1Ref">
            <div class="logo-track" ref="track1Ref">
                <template v-for="n in 2" :key="`row1-${n}`">
                    <div
                        v-for="(tenant, i) in tenantsRow1"
                        :key="`row1-${n}-${i}`"
                        class="brand-logo"
                    >
                        <img :src="tenant.img" :alt="tenant.label" :width="tenant.w" :height="tenant.h" :class="{ 'bl-large': tenant.large }" />
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
                        <img :src="tenant.img" :alt="tenant.label" :width="tenant.w" :height="tenant.h" :class="{ 'bl-large': tenant.large }" />
                    </div>
                </template>
            </div>
        </div>

        <div style="text-align:center; margin-top: 22px; font-size: 12px; color: var(--text-3); letter-spacing: 0.08em;">
            <span style="color:var(--orange); font-weight:700;">+ 200</span>&nbsp;&nbsp;{{ footerText }}
        </div>
    </section>
</template>
