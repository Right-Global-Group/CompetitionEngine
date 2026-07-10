<script setup>
import { inject, computed, ref, onMounted, onUnmounted, watch, nextTick } from 'vue';

import LogoWall from '@/Components/LogoWall/LogoWall.vue';

const getText = inject('getText', (key, fallback = '') => fallback);
const siteTexts = inject('siteTexts');

const eyebrow = computed(() => getText('hero.eyebrow', 'Proven. Certified. UK Voluntary Code Signatory.'));
const titleBefore = computed(() => getText('hero.title_before', "Don't Blend In."));
const titleKeyword = computed(() => getText('hero.title_keyword', 'Stand Out.'));
const titleAfter = computed(() => getText('hero.title_after', ''));
const subtitle = computed(() => getText('hero.subtitle', 'The UK competition platform that\'s already survived <strong style="color:var(--text-0)">five years</strong> of draw nights. Powered by the only <strong style="color:var(--text-0)">Game Studio</strong> in the category. Built for operators who want to look nothing like the last raffle site you saw.'));
const buttonPrimary = computed(() => getText('hero.button_primary', 'Book a draw-night demo'));
const buttonSecondary = computed(() => getText('hero.button_secondary', 'Try Game Studio →'));
const growthPromise = computed(() => getText('hero.growth_promise', 'Operators on CompEngine grow revenue <strong>+47%</strong>&nbsp;on average in their first 90 days'));

const ordersTarget = computed(() => parseInt(getText('stats.value_orders', '245000'), 10) || 0);
const ticketsTarget = computed(() => parseInt(getText('stats.value_tickets', '13250000'), 10) || 0);

const ordersDisplay = ref('0');
const ticketsDisplay = ref('0');
let countersStarted = false;

function animateCount(displayRef, target, dur = 1600) {
    const start = performance.now();
    function tick(now) {
        const t = Math.min((now - start) / dur, 1);
        const eased = 1 - Math.pow(1 - t, 3);
        displayRef.value = Math.round(target * eased).toLocaleString();
        if (t < 1) requestAnimationFrame(tick);
    }
    requestAnimationFrame(tick);
}

function startCounters() {
    if (countersStarted) return;
    countersStarted = true;
    animateCount(ordersDisplay, ordersTarget.value);
    animateCount(ticketsDisplay, ticketsTarget.value);
}

const scrollToBooking = () => {
    const element = document.getElementById('cta');
    if (element) {
        element.scrollIntoView({ behavior: 'smooth' });
    }
};

/* ============== Keep the hero title on one line, shrinking to fit ============== */
const titleRef = ref(null);
const MIN_TITLE_FONT = 22;

function fitHeroTitle() {
    const el = titleRef.value;
    if (!el) return;
    el.style.fontSize = '';
    let size = parseFloat(getComputedStyle(el).fontSize);
    let guard = 0;
    while (el.scrollWidth > el.clientWidth + 1 && size > MIN_TITLE_FONT && guard < 60) {
        size -= 1;
        el.style.fontSize = size + 'px';
        guard++;
    }
}

let resizeTimer = null;
function onResize() {
    clearTimeout(resizeTimer);
    resizeTimer = setTimeout(fitHeroTitle, 120);
}

onMounted(() => {
    if (!siteTexts.loading) {
        startCounters();
    }
    nextTick(fitHeroTitle);
    window.addEventListener('resize', onResize);
});

onUnmounted(() => {
    window.removeEventListener('resize', onResize);
    clearTimeout(resizeTimer);
});

watch(() => siteTexts.loading, (loading) => {
    if (!loading) {
        startCounters();
        nextTick(fitHeroTitle);
    }
});

watch([titleBefore, titleKeyword, titleAfter], () => nextTick(fitHeroTitle));
</script>

<template>
    <section id="hero" class="hero">
        <svg class="hero-logo-big spin-slow" aria-hidden="true"><use href="#gear-logo"/></svg>

        <div class="eyebrow"><span class="dot"></span>{{ eyebrow }}</div>

        <h1 ref="titleRef" class="h1 h1-oneline">{{ titleBefore }} <span class="grad-text">{{ titleKeyword }}</span><template v-if="titleAfter">{{ ' ' + titleAfter }}</template></h1>

        <p class="lead" style="margin: 28px auto 0;" v-html="subtitle"></p>

        <div class="hero-cta">
            <button @click="scrollToBooking" class="btn btn-primary btn-large">{{ buttonPrimary }}</button>
            <a href="#game-studio" class="btn btn-ghost btn-large">{{ buttonSecondary }}</a>
        </div>

        <div class="growth-promise">
            <span class="arr">↗</span>
            <span v-html="growthPromise"></span>
        </div>

        <LogoWall />

        <div class="hero-mini-stats">
            <div class="mini-stat"><strong>{{ ordersDisplay }}</strong>&nbsp;orders <span class="pill">last 30d</span></div>
            <div class="mini-stat"><strong>{{ ticketsDisplay }}</strong>&nbsp;tickets <span class="pill">last 30d</span></div>
            <div class="mini-stat"><strong>5+ yrs</strong>&nbsp;operating</div>
        </div>

        <div class="trust-bar">
            <div class="trust-item" title="Gaming Laboratories International — certifies regulated casino systems in 480+ jurisdictions.">
                <svg class="trust-icon" viewBox="0 0 24 24" fill="none" stroke="#f4a558" stroke-width="1.5"><path d="M12 2L3 7v5c0 5.5 3.8 10.6 9 12 5.2-1.4 9-6.5 9-12V7l-9-5z"/><path d="M9 12l2 2 4-4" stroke="#ec8a82"/></svg>
                <div class="trust-title">GLI Certified</div>
                <div class="trust-sub">RNG independently verified</div>
            </div>
            <div class="trust-item" title="Penetration tested by an independent UK firm. Findings closed, re-tested on cycle.">
                <svg class="trust-icon" viewBox="0 0 24 24" fill="none" stroke="#f4a558" stroke-width="1.5"><rect x="3" y="11" width="18" height="11" rx="2"/><path d="M7 11V7a5 5 0 0110 0v4"/></svg>
                <div class="trust-title">Pen Tested</div>
                <div class="trust-sub">By an independent firm</div>
            </div>
            <div class="trust-item" title="Signed up from day one to the UK Voluntary Code of Good Practice for Prize Draw Operators (20 May 2026).">
                <svg class="trust-icon" viewBox="0 0 24 24" fill="none" stroke="#f4a558" stroke-width="1.5"><path d="M9 12l2 2 4-4M21 12a9 9 0 11-18 0 9 9 0 0118 0z"/></svg>
                <div class="trust-title">VCOC Signatory</div>
                <div class="trust-sub">UK Voluntary Code, May 2026</div>
            </div>
            <div class="trust-item" title="5+ years operating in the UK competition category — the most experienced independent platform.">
                <svg class="trust-icon" viewBox="0 0 24 24" fill="none" stroke="#f4a558" stroke-width="1.5"><polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2"/></svg>
                <div class="trust-title">Industry Recognised</div>
                <div class="trust-sub">Industry Proven</div>
            </div>
        </div>

        <div class="scroll-hint">
            The fun bit's below
            <svg viewBox="0 0 24 24" fill="none" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><polyline points="6 9 12 15 18 9"/></svg>
        </div>
    </section>
</template>



<style scoped>
.h1-oneline {
    white-space: nowrap;
    overflow: hidden;
    max-width: 100%;
    display: inline-block;
}

@media (max-width: 820px) {
    .trust-bar {
        display: grid !important;
        grid-template-columns: 1fr 1fr !important;
        gap: 12px !important;
        width: 100% !important;
        max-width: 100% !important;
        margin-inline: auto !important;
        justify-content: center !important;
        justify-items: center !important;
        overflow: visible !important;
        flex-wrap: wrap !important;
    }
    .trust-item {
        width: auto !important;
        min-width: 0 !important;
        flex: none !important;
    }
}

@media (max-width: 820px) {
    .hero-mini-stats {
        display: grid !important;
        grid-template-columns: 1fr 1fr !important;
        gap: 12px !important;
        justify-items: center !important;
    }
    .hero-mini-stats .mini-stat:nth-child(3) {
        grid-column: 1 / -1 !important;
    }
}
</style>