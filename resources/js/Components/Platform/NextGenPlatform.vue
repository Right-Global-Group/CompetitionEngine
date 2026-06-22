<script setup>
import { inject, computed, ref, onMounted, onUnmounted, nextTick, watch } from 'vue';
import { Chart } from 'chart.js/auto';
import { useReveal } from '@/Composables/useReveal';

const getText = inject('getText', (key, fallback = '') => fallback);
const { sectionRef, revealed } = useReveal();

function ft(key, fallback) {
    return getText(`convert.${key}`, fallback);
}

const eyebrow = computed(() => ft('eyebrow', 'Built by marketers, not just developers'));
const titleBefore = computed(() => ft('title_before', "Pretty doesn't pay your prize fund."));
const titleKeyword = computed(() => ft('title_keyword', 'Conversion does.'));
const lead = computed(() => ft('lead', 'Most competition-site builders are agencies who ship a pretty design and walk away. CompEngine is built alongside conversion specialists who actually know how to turn visitors into entrants. Every flow — checkout, upsell, free entry, cart-abandonment — is tested for sell-through, not just speed.'));

const teamCalloutBold = computed(() => ft('team_callout_bold', 'Built by a team blending marketing, conversion-rate optimisation, UX and engineering.'));
const teamCalloutText = computed(() => ft('team_callout_text', 'Most "raffle website builders" are designers. We\'re operators with our own conversion data — and we ship the winning patterns to every site we power.'));

/* ============== Expandable feature rows ============== */
const convertFeatures = computed(() => [
    {
        icon: ft('feat1_icon', '🎯'),
        title: ft('feat1_title', 'A/B-tested checkout flows'),
        desc: ft('feat1_desc', 'Every checkout button, label, and step has been tested across millions of real orders. Operators inherit the winning variants — not a blank template.'),
        detail: ft('feat1_detail', '<strong>Winning variant example:</strong> a "Buy 10 tickets" primary button outperforms a generic "Add to cart" by 23% on conversion rate across our last 4M orders.'),
        compare: {
            leftValue: ft('feat1_compare_left_value', '1.9%'),
            leftLabel: ft('feat1_compare_left_label', '"Add to cart"'),
            leftMeta: ft('feat1_compare_left_meta', 'Generic'),
            rightValue: ft('feat1_compare_right_value', '2.3%'),
            rightLabel: ft('feat1_compare_right_label', '"Buy 10 tickets"'),
            rightMeta: ft('feat1_compare_right_meta', '+23% lift'),
        },
        expandHint: ft('feat1_expand_hint', 'See the data'),
    },
    {
        icon: ft('feat2_icon', '💡'),
        title: ft('feat2_title', 'Smart upsell modals'),
        desc: ft('feat2_desc', '"Add 10 more tickets for £8", "Try our instant win", "Upgrade to bundle" — context-aware suggestions at exactly the right point in the buy flow.'),
        detail: ft('feat2_detail', '<strong>Average uplift per checkout:</strong> +£23 to ticket value when the bundle-suggestion modal fires post-cart. ~38% of buyers accept at least one upsell.'),
        compare: {
            leftValue: ft('feat2_compare_left_value', '£42'),
            leftLabel: ft('feat2_compare_left_label', 'Baseline order'),
            leftMeta: ft('feat2_compare_left_meta', 'No upsell'),
            rightValue: ft('feat2_compare_right_value', '£65'),
            rightLabel: ft('feat2_compare_right_label', 'With upsell'),
            rightMeta: ft('feat2_compare_right_meta', '+£23 avg'),
        },
        expandHint: ft('feat2_expand_hint', 'See the data'),
    },
    {
        icon: ft('feat3_icon', '🔄'),
        title: ft('feat3_title', 'Cart-abandonment automation'),
        desc: ft('feat3_desc', 'Visitors who walk away with tickets in their basket get a nudge automatically — built in, not a £49/month add-on.'),
        detail: ft('feat3_detail', '<strong>Recovery rate:</strong> ~14% of abandoned carts complete purchase within 24h when the automated email + push fires. That\'s ~£18k/month recovered for an average operator.'),
        compare: null,
        expandHint: ft('feat3_expand_hint', 'See the data'),
    },
    {
        icon: ft('feat4_icon', '📲'),
        title: ft('feat4_title', 'Facebook-ad-compliant landing pages'),
        desc: ft('feat4_desc', 'Every operator site meets Facebook\'s strict prize-draw advertising rules out of the box. Unlock the largest paid-acquisition channel without getting your account suspended.'),
        detail: ft('feat4_detail', '<strong>Why this matters:</strong> Facebook auto-suspends prize-draw sites that miss any of 14 specific compliance flags. CompEngine sites pass all 14 by default — operators run paid acquisition from day one.'),
        compare: null,
        expandHint: ft('feat4_expand_hint', 'See the data'),
    },
    {
        icon: ft('feat5_icon', '🤝'),
        title: ft('feat5_title', 'Referral & affiliate engine'),
        desc: ft('feat5_desc', 'Built-in viral growth: unique codes, dual rewards for referrer and referee, fraud-prevention with IP tracking. No third-party tool to wire up.'),
        detail: ft('feat5_detail', '<strong>Viral coefficient:</strong> referral-acquired customers spend ~41% more in their first 90 days than paid-traffic customers, and convert 2.1x faster on first order. Free acquisition, higher LTV.'),
        compare: null,
        expandHint: ft('feat5_expand_hint', 'See the data'),
    },
    {
        icon: ft('feat6_icon', '📈'),
        title: ft('feat6_title', 'Conversion-rate dashboard'),
        desc: ft('feat6_desc', 'See which competitions convert, where users drop off, which traffic source pays back. The reporting most platforms simply don\'t offer.'),
        detail: ft('feat6_detail', '<strong>What you see:</strong> per-competition funnel, traffic-source ROI, drop-off heatmaps, time-to-purchase distribution, and a single LTV chart by acquisition channel. Most operators run on gut feel. You won\'t.'),
        compare: null,
        expandHint: ft('feat6_expand_hint', 'See the data'),
    },
]);

const expandedIdx = ref([false, false, false, false, false, false]);
function toggleFeature(idx) {
    expandedIdx.value[idx] = !expandedIdx.value[idx];
}

/* ============== Growth chart (Revenue / Conversion / Repeat toggle) ============== */
const MONTHS = ['M1', 'M2', 'M3', 'M4', 'M5', 'M6', 'M7', 'M8', 'M9', 'M10', 'M11', 'M12'];
const metricKeys = ['revenue', 'conversion', 'repeat'];

const metrics = computed(() => ({
    revenue: {
        title: ft('metric_revenue_title', 'Avg operator revenue, month-on-month'),
        pillLabel: ft('metric_revenue_pill', '+247%'),
        buttonLabel: ft('metric_revenue_button', 'Revenue'),
        us: [15, 18, 24, 32, 41, 55, 72, 90, 108, 124, 138, 147],
        them: [15, 16, 17, 19, 20, 22, 23, 24, 25, 26, 27, 28],
        fmt: (v) => '£' + v + 'k',
        headlineEnd: 147, headlinePrefix: '£', headlineSuffix: 'k', headlineDecimals: 0,
    },
    conversion: {
        title: ft('metric_conversion_title', 'Avg checkout conversion rate'),
        pillLabel: ft('metric_conversion_pill', '+139%'),
        buttonLabel: ft('metric_conversion_button', 'Conversion %'),
        us: [1.8, 1.9, 2.1, 2.4, 2.7, 3.0, 3.3, 3.5, 3.8, 4.0, 4.2, 4.3],
        them: [1.5, 1.5, 1.6, 1.6, 1.7, 1.7, 1.8, 1.8, 1.8, 1.9, 1.9, 1.9],
        fmt: (v) => v.toFixed(1) + '%',
        headlineEnd: 4.3, headlinePrefix: '', headlineSuffix: '%', headlineDecimals: 1,
    },
    repeat: {
        title: ft('metric_repeat_title', '90-day repeat-buyer rate'),
        pillLabel: ft('metric_repeat_pill', '+217%'),
        buttonLabel: ft('metric_repeat_button', 'Repeat Buyers'),
        us: [12, 14, 17, 19, 22, 25, 28, 30, 33, 35, 37, 38],
        them: [11, 11, 12, 12, 12, 13, 13, 13, 14, 14, 14, 14],
        fmt: (v) => v + '%',
        headlineEnd: 38, headlinePrefix: '', headlineSuffix: '%', headlineDecimals: 0,
    },
}));

const legendUsLabel = computed(() => ft('legend_us', 'CompEngine operators'));
const legendThemLabel = computed(() => ft('legend_them', 'Typical WordPress operator'));
const chartMonth1 = computed(() => ft('chart_month1', 'Month 1'));
const chartMonth6 = computed(() => ft('chart_month6', 'Month 6'));
const chartMonth12 = computed(() => ft('chart_month12', 'Month 12'));

const activeMetric = ref('revenue');
const currentMetric = computed(() => metrics.value[activeMetric.value]);
const growthChartValue = ref('£0');

const growthCanvas = ref(null);
let growthChart = null;

function tweenHeadline(fromVal, toVal, prefix, suffix, decimals, duration) {
    const start = performance.now();
    function tick(now) {
        const t = Math.min((now - start) / duration, 1);
        const eased = 1 - Math.pow(1 - t, 3);
        const v = fromVal + (toVal - fromVal) * eased;
        growthChartValue.value = prefix + v.toFixed(decimals) + suffix;
        if (t < 1) requestAnimationFrame(tick);
    }
    requestAnimationFrame(tick);
}

function animateHeadlineIn() {
    const m = currentMetric.value;
    tweenHeadline(0, m.headlineEnd, m.headlinePrefix, m.headlineSuffix, m.headlineDecimals, 2400);
}

function buildGrowthChart() {
    if (!growthCanvas.value) return;
    const ctx = growthCanvas.value.getContext('2d');

    const lineGrad = ctx.createLinearGradient(0, 0, growthCanvas.value.width || 400, 0);
    lineGrad.addColorStop(0, '#5b7fc4');
    lineGrad.addColorStop(0.35, '#b297db');
    lineGrad.addColorStop(0.70, '#d97aa8');
    lineGrad.addColorStop(1, '#f4a558');

    const fillGrad = ctx.createLinearGradient(0, 0, 0, 220);
    fillGrad.addColorStop(0, 'rgba(244,165,88,0.32)');
    fillGrad.addColorStop(1, 'rgba(244,165,88,0)');

    growthChart = new Chart(ctx, {
        type: 'line',
        data: {
            labels: MONTHS,
            datasets: [
                {
                    label: 'CompEngine operators', data: metrics.value.revenue.us,
                    borderColor: lineGrad, borderWidth: 3, backgroundColor: fillGrad, fill: true,
                    tension: 0.4, pointRadius: 0, pointHoverRadius: 6,
                    pointHoverBackgroundColor: '#f4a558', pointHoverBorderColor: '#1d1042', pointHoverBorderWidth: 2,
                },
                {
                    label: 'Typical WordPress operator', data: metrics.value.revenue.them,
                    borderColor: 'rgba(178,151,219,0.55)', borderWidth: 2, borderDash: [6, 6],
                    backgroundColor: 'transparent', fill: false, tension: 0.4, pointRadius: 0, pointHoverRadius: 5,
                    pointHoverBackgroundColor: '#b297db', pointHoverBorderColor: '#1d1042', pointHoverBorderWidth: 2,
                },
            ],
        },
        options: {
            responsive: true, maintainAspectRatio: false,
            interaction: { mode: 'index', intersect: false },
            animation: { duration: 2400, easing: 'easeOutCubic' },
            plugins: {
                legend: { display: false },
                tooltip: {
                    backgroundColor: '#1d1042', borderColor: '#f4a558', borderWidth: 1,
                    titleFont: { family: 'Inter', weight: '700', size: 12 },
                    bodyFont: { family: 'Inter', size: 13 },
                    padding: 12,
                    callbacks: {
                        title: (items) => 'Month ' + (items[0].dataIndex + 1),
                        label: (ctx) => ctx.dataset.label + ': ' + metrics.value[activeMetric.value].fmt(ctx.parsed.y),
                    },
                },
            },
            scales: {
                x: { display: false, grid: { display: false } },
                y: { display: false, grid: { color: 'rgba(178,151,219,0.08)', drawBorder: false } },
            },
        },
    });
}

function switchMetric(key) {
    if (key === activeMetric.value || !growthChart) return;
    const prevVal = parseFloat(growthChartValue.value.replace(/[^0-9.-]/g, '')) || 0;
    activeMetric.value = key;
    const m = metrics.value[key];
    tweenHeadline(prevVal, m.headlineEnd, m.headlinePrefix, m.headlineSuffix, m.headlineDecimals, 1200);
    growthChart.data.datasets[0].data = m.us;
    growthChart.data.datasets[1].data = m.them;
    growthChart.update();
}

/* ============== Stat cards + sparklines ============== */
const statCards = computed(() => [
    { target: 47, prefix: '+', suffix: '%', decimals: 0, label: ft('stat1_label', 'Avg checkout conversion'), vs: ft('stat1_vs', 'vs typical WordPress raffle stack'), path: 'M 0,32 L 40,28 L 80,24 L 120,18 L 160,12 L 200,4' },
    { target: 2.4, prefix: '', suffix: 'x', decimals: 1, label: ft('stat2_label', '90-day repeat purchase rate'), vs: ft('stat2_vs', 'CompEngine sites vs industry baseline'), path: 'M 0,30 L 40,30 L 80,24 L 120,18 L 160,10 L 200,6' },
    { target: 23, prefix: '+£', suffix: '', decimals: 0, label: ft('stat3_label', 'Avg ticket value uplift'), vs: ft('stat3_vs', 'via smart upsell modals at checkout'), path: 'M 0,34 L 40,28 L 80,30 L 120,22 L 160,14 L 200,8' },
]);

const statsAnimated = ref(false);
const statCounters = ref(['+0%', '0.0x', '+£0']);

function animateStatsAndSparks() {
    statsAnimated.value = true;
    statCards.value.forEach((card, i) => {
        const startTime = performance.now();
        const delay = 300 + i * 200;
        function step(now) {
            const t = Math.max(0, Math.min((now - startTime - delay) / 1500, 1));
            const eased = 1 - Math.pow(1 - t, 3);
            statCounters.value[i] = card.prefix + (card.target * eased).toFixed(card.decimals) + card.suffix;
            if (t < 1) requestAnimationFrame(step);
        }
        requestAnimationFrame(step);
    });
}

/* ============== Live activity ticker ============== */
const tickerLiveLabel = computed(() => ft('ticker_live_label', 'Live'));

const BRANDS = ['BOLT', 'APEX', 'STAR DRAWS', 'GOAT', 'ZENITH', 'NORTH', 'BLAZE', 'SUMMIT', 'VYBE', 'RUSH', 'KINGS', "DAISY'S DRAWS", 'PHAT STAX', 'LUXE', 'ANCHOR', 'HORIZON', 'BIG WINS', 'LOCKDOWN', 'ROYAL DRAWS', 'CRAZY COW'];
const ACTIONS = [
    { icon: '🎟️', t: ['just bought', 'just snagged', 'just secured'], v: [5, 10, 15, 20, 25, 50, 100], suffix: 'tickets on' },
    { icon: '🎉', t: ['just won', 'just claimed'], v: ['£250', '£500', '£100', '£1,200', '£450', '£75', '£2,500'], suffix: 'on' },
    { icon: '✨', t: ['joined the wallet on', 'signed up to'], v: [''], suffix: '' },
    { icon: '💰', t: ['withdrew', 'cashed out'], v: ['£250', '£500', '£140', '£890'], suffix: 'from' },
    { icon: '⚡', t: ['used an instant win on', 'hit a scratchcard win on'], v: [''], suffix: '' },
];
const NAMES = ['Sarah K', 'James P', 'Amira H', 'Tom R', 'Lia M', 'Daniel B', 'Sofia G', 'Marcus T', 'Aisha N', 'Ben C', 'Holly W', 'Connor F', 'Zara K', 'Owen H', 'Maddie L'];
const TIME_OFFSETS = ['just now', '3s ago', '8s ago', '15s ago', '22s ago', '34s ago', '48s ago', '1m ago', '2m ago'];

const activityItems = ref([]);
let activityIdCounter = 0;
let tickerStarted = false;
let tickerIntervalHandle = null;
let tickerKickoffHandle = null;

function spawnActivity() {
    const name = NAMES[Math.floor(Math.random() * NAMES.length)];
    const brand = BRANDS[Math.floor(Math.random() * BRANDS.length)];
    const a = ACTIONS[Math.floor(Math.random() * ACTIONS.length)];
    const verb = a.t[Math.floor(Math.random() * a.t.length)];
    const val = a.v[Math.floor(Math.random() * a.v.length)];
    const time = TIME_OFFSETS[Math.floor(Math.random() * TIME_OFFSETS.length)];
    const id = ++activityIdCounter;
    activityItems.value.push({ id, icon: a.icon, name, verb, val, suffix: a.suffix, brand, time });
    setTimeout(() => {
        activityItems.value = activityItems.value.filter((item) => item.id !== id);
    }, 14500);
}

function startTicker() {
    if (tickerStarted) return;
    tickerStarted = true;
    spawnActivity();
    tickerKickoffHandle = setTimeout(spawnActivity, 1400);
    tickerIntervalHandle = setInterval(spawnActivity, 2400);
}

watch(revealed, (isRevealed) => {
    if (isRevealed) {
        animateHeadlineIn();
        animateStatsAndSparks();
        startTicker();
    }
});

onMounted(async () => {
    await nextTick();
    buildGrowthChart();
});

onUnmounted(() => {
    if (growthChart) growthChart.destroy();
    if (tickerIntervalHandle) clearInterval(tickerIntervalHandle);
    if (tickerKickoffHandle) clearTimeout(tickerKickoffHandle);
});
</script>

<template>
    <section ref="sectionRef" class="section reveal" :class="{ visible: revealed }" id="convert">
        <div class="center">
            <div class="eyebrow"><span class="dot"></span>{{ eyebrow }}</div>
            <h2 class="h2">{{ titleBefore }}<br /><span class="grad-text">{{ titleKeyword }}</span></h2>
            <p class="lead center" style="margin: 18px auto 0;">{{ lead }}</p>
        </div>

        <div class="activity-ticker">
            <span class="activity-ticker-label">{{ tickerLiveLabel }}</span>
            <div class="activity-list">
                <div v-for="item in activityItems" :key="item.id" class="activity-item">
                    <span class="activity-item-icon">{{ item.icon }}</span>
                    <span class="activity-item-text">
                        <strong>{{ item.name }}</strong> {{ item.verb }}<strong v-if="item.val" style="color:var(--text-0);"> {{ item.val }}</strong>{{ item.suffix ? ' ' + item.suffix : '' }} <span class="brand">{{ item.brand }}</span>
                    </span>
                    <span class="activity-item-time">· {{ item.time }}</span>
                </div>
            </div>
        </div>

        <div class="convert-block" style="margin-top: 32px;">
            <div class="convert-grid">
                <div class="convert-features">
                    <div
                        v-for="(f, idx) in convertFeatures"
                        :key="idx"
                        class="convert-feature expandable"
                        :class="{ expanded: expandedIdx[idx] }"
                        @click="toggleFeature(idx)"
                    >
                        <div class="convert-feature-icon">{{ f.icon }}</div>
                        <div class="feature-body">
                            <div class="convert-feature-title">{{ f.title }}</div>
                            <div class="convert-feature-desc">{{ f.desc }}</div>
                            <div class="convert-feature-detail">
                                <span v-html="f.detail"></span>
                                <div v-if="f.compare" class="compare-strip">
                                    <div class="compare-strip-side"><strong>{{ f.compare.leftValue }}</strong>{{ f.compare.leftLabel }}<div class="meta">{{ f.compare.leftMeta }}</div></div>
                                    <div class="compare-strip-side ours"><strong>{{ f.compare.rightValue }}</strong>{{ f.compare.rightLabel }}<div class="meta">{{ f.compare.rightMeta }}</div></div>
                                </div>
                            </div>
                            <div class="convert-feature-expand-hint"><span class="chev">▾</span> {{ f.expandHint }}</div>
                        </div>
                    </div>
                </div>

                <div class="growth-chart">
                    <div class="chart-toggle">
                        <button
                            v-for="m in metricKeys"
                            :key="m"
                            class="metric-btn"
                            :class="{ active: activeMetric === m }"
                            @click="switchMetric(m)"
                        >{{ metrics[m].buttonLabel }}</button>
                    </div>
                    <div class="growth-chart-header">
                        <div>
                            <div class="growth-chart-title">{{ currentMetric.title }}</div>
                            <div class="growth-chart-value">{{ growthChartValue }}</div>
                        </div>
                        <span class="growth-chart-pill">{{ currentMetric.pillLabel }}</span>
                    </div>
                    <canvas ref="growthCanvas"></canvas>
                    <div class="chart-legend">
                        <div class="chart-legend-item"><span class="chart-legend-swatch"></span> {{ legendUsLabel }}</div>
                        <div class="chart-legend-item"><span class="chart-legend-swatch dashed"></span> {{ legendThemLabel }}</div>
                    </div>
                    <div style="display:flex; justify-content:space-between; margin-top:10px; font-size:11px; color:var(--text-3); letter-spacing:0.05em;">
                        <span>{{ chartMonth1 }}</span><span>{{ chartMonth6 }}</span><span>{{ chartMonth12 }}</span>
                    </div>
                </div>
            </div>

            <div class="team-callout">
                <div class="team-callout-icons">
                    <span class="team-avatar t1">MK</span>
                    <span class="team-avatar t2">CR</span>
                    <span class="team-avatar t3">UX</span>
                    <span class="team-avatar t4">EN</span>
                </div>
                <div><strong style="color:var(--text-0)">{{ teamCalloutBold }}</strong>&nbsp;&nbsp;{{ teamCalloutText }}</div>
            </div>

            <div class="convert-stats">
                <div v-for="(card, i) in statCards" :key="i" class="stat-card">
                    <div class="stat-arrow">↗</div>
                    <div class="stat-value">{{ statCounters[i] }}</div>
                    <div class="stat-label">{{ card.label }}</div>
                    <div class="stat-vs">{{ card.vs }}</div>
                    <svg class="stat-spark" viewBox="0 0 200 40" preserveAspectRatio="none">
                        <defs v-if="i === 0">
                            <linearGradient id="growthLineGrad" x1="0%" y1="0%" x2="100%" y2="0%">
                                <stop offset="0%" stop-color="#5b7fc4" />
                                <stop offset="35%" stop-color="#b297db" />
                                <stop offset="70%" stop-color="#d97aa8" />
                                <stop offset="100%" stop-color="#f4a558" />
                            </linearGradient>
                        </defs>
                        <path class="stat-spark-line" :class="{ animate: statsAnimated }" :d="card.path" fill="none" stroke="url(#growthLineGrad)" stroke-width="2.5" stroke-linecap="round" />
                    </svg>
                </div>
            </div>
        </div>
    </section>
</template>
