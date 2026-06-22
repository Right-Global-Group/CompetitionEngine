<script setup>
import { inject, computed, ref, onMounted, onUnmounted, watch, nextTick } from 'vue';
import { Chart } from 'chart.js/auto';
import { useReveal } from '@/Composables/useReveal';

const getText = inject('getText', (key, fallback = '') => fallback);
const { sectionRef, revealed } = useReveal();

const eyebrow = computed(() => getText('stats.eyebrow', 'Trusted by the operators who chose proven over promised'));
const titleBefore = computed(() => getText('stats.title_before', 'The numbers that other platforms'));
const titleKeyword = computed(() => getText('stats.title_keyword', "don't publish."));
const lead = computed(() => getText('stats.lead', 'Every stat below is real, rolling-30-day data from operators running on CompEngine right now. Click any segment of the chart to drill into where your revenue actually flows.'));

const blockTitle = computed(() => getText('stats.block_title', 'A real Tuesday on CompEngine'));
const blockSubtitle = computed(() => getText('stats.block_subtitle', 'Not a load test. Not a sales deck. Just a 30-day rolling snapshot.'));

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

watch(revealed, (isRevealed) => {
    if (isRevealed) startCounters();
});

/* ============== Revenue pie chart ============== */
const pieCanvas = ref(null);
let pieChart = null;
const activeKey = ref(null);
const lureOn = ref(true);

const REVENUE = computed(() => [
    { key: 'card',   label: getText('stats.pie_card_label', 'Card payments'), value: parseInt(getText('stats.pie_card_value', '980000'), 10), color: '#f4a558', detail: getText('stats.pie_card_detail', '69% of GMV — 3DS-authenticated, full chargeback evidence pack on every order.') },
    { key: 'wallet', label: getText('stats.pie_wallet_label', 'Cash Wallet'), value: parseInt(getText('stats.pie_wallet_value', '285000'), 10), color: '#d97aa8', detail: getText('stats.pie_wallet_detail', '20% of GMV — withdrawable funds, kept separate from credit by design.') },
    { key: 'credit', label: getText('stats.pie_credit_label', 'Site Credit'), value: parseInt(getText('stats.pie_credit_value', '110000'), 10), color: '#b297db', detail: getText('stats.pie_credit_detail', '8% of GMV — promo, referral and prize credit. Non-withdrawable, never lumped with cash.') },
    { key: 'free',   label: getText('stats.pie_free_label', 'Free Entry'), value: parseInt(getText('stats.pie_free_value', '45000'), 10), color: '#5b7fc4', detail: getText('stats.pie_free_detail', '3% of entries — fully compliant, automated tracking, no manual handling.') },
]);

const total = computed(() => REVENUE.value.reduce((s, r) => s + r.value, 0));

function fmtMoney(v) {
    if (v >= 1e6) return '£' + (v / 1e6).toFixed(2) + 'M';
    if (v >= 1e3) return '£' + Math.round(v / 1e3) + 'k';
    return '£' + v.toLocaleString();
}

const pieCenterValue = computed(() => {
    const r = REVENUE.value.find((x) => x.key === activeKey.value);
    return r ? fmtMoney(r.value) : fmtMoney(total.value);
});
const pieCenterLabel = computed(() => {
    const r = REVENUE.value.find((x) => x.key === activeKey.value);
    return r ? r.label.toUpperCase() : 'Total Processed';
});
const pieDesc = computed(() => {
    const r = REVENUE.value.find((x) => x.key === activeKey.value);
    return r ? r.detail : getText('stats.pie_desc_default', 'Where the money actually goes. Click a segment to see the operator-side breakdown.');
});

function setActiveLegend(key) {
    activeKey.value = key;
    lureOn.value = false;
}

function buildChart() {
    if (!pieCanvas.value) return;
    if (pieChart) pieChart.destroy();
    pieChart = new Chart(pieCanvas.value, {
        type: 'doughnut',
        data: {
            labels: REVENUE.value.map((r) => r.label),
            datasets: [{
                data: REVENUE.value.map((r) => r.value),
                backgroundColor: REVENUE.value.map((r) => r.color),
                borderColor: '#1d1042',
                borderWidth: 3,
                hoverOffset: 14,
                hoverBorderColor: '#1d1042',
            }],
        },
        options: {
            cutout: '64%',
            plugins: {
                legend: { display: false },
                tooltip: {
                    backgroundColor: '#1d1042', borderColor: '#f4a558', borderWidth: 1,
                    callbacks: { label: (ctx) => `${ctx.label}: £${ctx.parsed.toLocaleString()} (${Math.round(ctx.parsed / total.value * 100)}%)` },
                },
            },
            onClick: (evt, els) => { setActiveLegend(els.length ? REVENUE.value[els[0].index].key : activeKey.value); },
            onHover: (evt, els) => { evt.native.target.style.cursor = els.length ? 'pointer' : 'default'; },
        },
    });
}

onMounted(async () => {
    await nextTick();
    buildChart();
});

onUnmounted(() => {
    if (pieChart) pieChart.destroy();
});
</script>

<template>
    <section ref="sectionRef" class="section reveal" :class="{ visible: revealed }" id="stats">
        <div class="center" style="margin-bottom: 36px;">
            <div class="eyebrow"><span class="dot"></span>{{ eyebrow }}</div>
            <h2 class="h2">{{ titleBefore }} <span class="grad-text">{{ titleKeyword }}</span></h2>
            <p class="lead center" style="margin: 18px auto 0;">{{ lead }}</p>
        </div>

        <div class="stats-block">
            <div>
                <h3 class="h3">{{ blockTitle }}</h3>
                <p style="color: var(--text-2); margin-top: 8px; font-size: 15px;">{{ blockSubtitle }}</p>
                <div class="big-stats">
                    <div class="big-stat highlight">
                        <div class="num">{{ ordersDisplay }}</div>
                        <div class="label">Orders processed</div>
                    </div>
                    <div class="big-stat highlight">
                        <div class="num">{{ ticketsDisplay }}</div>
                        <div class="label">Tickets sold</div>
                    </div>
                    <div class="big-stat">
                        <div class="num">5<small style="font-size:24px">+ yrs</small></div>
                        <div class="label">In this exact category</div>
                    </div>
                </div>
            </div>

            <div class="pie-card">
                <div style="display:flex; align-items:center; justify-content:space-between; flex-wrap:wrap; gap:8px; margin-bottom:6px;">
                    <h4 style="margin:0;">Revenue Flow — last 30 days</h4>
                    <span class="live-pill">Live data</span>
                </div>
                <div class="desc">{{ pieDesc }}</div>
                <div class="pie-wrap" :class="{ 'lure-on': lureOn }" style="position:relative;">
                    <canvas ref="pieCanvas"></canvas>
                    <div class="pie-center">
                        <div class="v">{{ pieCenterValue }}</div>
                        <div class="k">{{ pieCenterLabel }}</div>
                    </div>
                    <div class="lure" :class="{ 'lure-dismissed': !lureOn }" style="top:-10px; right:-8px;"><span class="arr">👆</span> Click a slice</div>
                </div>
                <div class="pie-legend">
                    <div
                        v-for="r in REVENUE"
                        :key="r.key"
                        class="legend-item"
                        :class="{ active: activeKey === r.key }"
                        @click="setActiveLegend(r.key)"
                    >
                        <div class="legend-dot" :style="{ background: r.color }"></div>
                        <div class="legend-label">{{ r.label }}</div>
                        <div class="legend-val">{{ Math.round(r.value / total * 100) }}%</div>
                    </div>
                </div>
            </div>
        </div>
    </section>
</template>
