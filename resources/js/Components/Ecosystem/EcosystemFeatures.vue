<script setup>
import { inject, computed, ref, onMounted, onUnmounted } from 'vue';
import { useReveal } from '@/Composables/useReveal';
import { popConfettiFromEvent } from '@/Composables/useConfettiPop';
import BingoGame from '@/Components/Games/BingoGame.vue';

const getText = inject('getText', (key, fallback = '') => fallback);
const { sectionRef, revealed } = useReveal();

const eyebrow = computed(() => getText('ecosystem.eyebrow', 'Your complete raffle ecosystem'));
const titleBefore = computed(() => getText('ecosystem.title_before', 'Everything you need.'));
const titleKeyword = computed(() => getText('ecosystem.title_keyword', 'Nine modules. Zero plugins.'));
const lead = computed(() => getText('ecosystem.lead', 'Built ground-up over five years of operating — not duct-taped from generic e-commerce plugins. Click any module for the operator-side detail.'));
const gridLureText = computed(() => getText('ecosystem.grid_lure_text', 'Tap any card for more detail'));

const badgeHero = computed(() => getText('ecosystem.badge_hero', '✦ Only on CompEngine ✦'));
const badgeInteractive = computed(() => getText('ecosystem.badge_interactive', '✦ Hands-on demo ✦'));
const badgeStandard = computed(() => getText('ecosystem.badge_standard', 'Only on CompEngine'));

const features = computed(() => [
    {
        size: 'hero', mini: 'slot', featured: true, badge: badgeHero.value,
        icon: getText('ecosystem.feat_gamestudio_icon', '🎮'),
        title: getText('ecosystem.feat_gamestudio_title', 'Game Studio — design your own instant-win games'),
        text: getText('ecosystem.feat_gamestudio_text', 'Build and preview competition games in real time. Theme, brand, inventory, button text — every detail, live. No developers, no delays, no limits. The only studio of its kind in the UK competition category.'),
        more: getText('ecosystem.feat_gamestudio_more', '🎮 Try it live below'),
    },
    {
        size: 'wide', mini: 'wallet', featured: true, badge: badgeStandard.value,
        icon: getText('ecosystem.feat_wallets_icon', '💵'),
        title: getText('ecosystem.feat_wallets_title', 'Separate Cash & Site-Credit Wallets'),
        text: getText('ecosystem.feat_wallets_text', 'Two wallets, not one. Cash on one side. Site credit on the other. Clearer for operators, cleaner for compliance, simpler for chargebacks. Single-wallet platforms quietly mix everything together.'),
        more: getText('ecosystem.feat_wallets_more', 'Why we built it this way →'),
    },
    {
        size: 'wide', mini: 'compliance', featured: true, badge: badgeStandard.value,
        icon: getText('ecosystem.feat_compliance_icon', '📝'),
        title: getText('ecosystem.feat_compliance_title', 'Free Entry Compliance & Management'),
        text: getText('ecosystem.feat_compliance_text', 'Built-in free-entry system designed to meet UK compliance requirements end-to-end. Full tracking, full management, full audit trail. No manual handling. No workarounds.'),
        more: getText('ecosystem.feat_compliance_more', 'See VCOC alignment →'),
    },
    {
        size: 'interactive', mini: 'upsell', featured: true, badge: badgeInteractive.value,
        icon: getText('ecosystem.feat_upsell_icon', '📱🚀'),
        title: getText('ecosystem.feat_upsell_title', 'Smart Upsell — built into every checkout'),
        text: getText('ecosystem.feat_upsell_text', `Triggers automatically at the exact right point in the buy flow. Adds an average +£${Math.round(upsellStats.value?.avg_uplift_gbp ?? 23)} to every ticket order. ${Math.round(upsellStats.value?.modal_acceptance_pct ?? 87)}% of buyers take the offer. Click "Pay" on the right to see it fire — exactly as your customers will.`),
        more: getText('ecosystem.feat_upsell_more', 'Click Pay below to test it →'),
    },
    {
        size: 'std', mini: 'bars', featured: false,
        icon: getText('ecosystem.feat_reporting_icon', '👍📈'),
        title: getText('ecosystem.feat_reporting_title', 'Best-in-class reporting'),
        text: getText('ecosystem.feat_reporting_text', 'Detailed insights on order patterns, customer LTV, prize cost, P&L per competition.'),
        more: getText('ecosystem.feat_reporting_more', 'See the dashboard →'),
    },
    {
        size: 'std', mini: null, featured: false,
        icon: getText('ecosystem.feat_builder_icon', '🏗️'),
        title: getText('ecosystem.feat_builder_title', 'Competition Builder'),
        text: getText('ecosystem.feat_builder_text', 'Create once, save templates, launch faster every time.'),
        more: getText('ecosystem.feat_builder_more', 'See template library →'),
    },
    {
        size: 'std', mini: null, featured: false,
        icon: getText('ecosystem.feat_payouts_icon', '⚡'),
        title: getText('ecosystem.feat_payouts_title', 'Automated Payouts & Prize Management'),
        text: getText('ecosystem.feat_payouts_text', 'Winner choice → instant cash, site credit, or tracked prize fulfilment. End-to-end automated.'),
        more: getText('ecosystem.feat_payouts_more', 'See the prize flow →'),
    },
    {
        size: 'std', mini: null, featured: false,
        icon: getText('ecosystem.feat_rng_icon', '✅'),
        title: getText('ecosystem.feat_rng_title', 'RNG-Certified Draws'),
        text: getText('ecosystem.feat_rng_text', 'GLI-certified RNG. Every result independently verifiable, full audit trail, live-stream mode.'),
        more: getText('ecosystem.feat_rng_more', 'See the certification →'),
    },
    {
        size: 'std', mini: null, featured: false,
        icon: getText('ecosystem.feat_notify_icon', '📱🔔'),
        title: getText('ecosystem.feat_notify_title', 'Built-in Notifications'),
        text: getText('ecosystem.feat_notify_text', 'Winner alerts, customer updates, direct marketing — no third-party email tool to wire up.'),
        more: getText('ecosystem.feat_notify_more', 'See the message flow →'),
    },
]);

/* ============== Upsell stats (fetched from tenant weekly snapshot) ============== */
const upsellStats = ref(null);
async function fetchUpsellStats() {
    try {
        const res = await fetch('/api/upsell-stats/latest');
        if (res.ok) {
            const data = await res.json();
            if (data.stat) upsellStats.value = data.stat;
        }
    } catch {}
}

onMounted(() => fetchUpsellStats());

/* ============== Card press feedback ============== */
const pressedIdx = ref(null);
function pulseCard(idx) {
    pressedIdx.value = idx;
    setTimeout(() => { if (pressedIdx.value === idx) pressedIdx.value = null; }, 150);
}

/* ============== Bingo demo assets for the hero card ============== */
const demoBingoAssets = {
    bgStart: '#1e3a8a', bgEnd: '#1e40af',
    frameColor: '#3b82f6', frameGlow: '#60a5fa',
    squareBg: '#374151', squareText: '#e5e7eb',
    diamond1: '#06b6d4', diamond2: '#67e8f9',
    winnerGlow: '#10b981', winnerBg: '#059669',
    popupStart: '#10b981', popupEnd: '#059669',
    diamondEmoji: '💎',
};

/* ============== Wallet split bar ============== */
const walletCashLabel = computed(() => getText('ecosystem.wallet_cash_label', 'Cash 68%'));
const walletCreditLabel = computed(() => getText('ecosystem.wallet_credit_label', 'Credit 32%'));
const walletWithdrawLabel = computed(() => getText('ecosystem.wallet_withdraw_label', 'Withdrawable'));
const walletCashSub = computed(() => getText('ecosystem.wallet_cash_sub', 'Cash wallet'));
const walletPromoLabel = computed(() => getText('ecosystem.wallet_promo_label', 'Promo / prize'));
const walletCreditSub = computed(() => getText('ecosystem.wallet_credit_sub', 'Site credit'));

/* ============== VCOC compliance stamp ============== */
const vcocLabel = computed(() => getText('ecosystem.vcoc_label', 'UK Voluntary Code'));
const vcocValue = computed(() => getText('ecosystem.vcoc_value', 'Mapped end-to-end · since May 2026'));

/* ============== Mini bars chart ============== */
const barHeights = [30, 42, 38, 55, 50, 72, 88, 100];
const barsTrend = computed(() => getText('ecosystem.bars_trend', '↗ +34% MoM growth'));

/* ============== Smart Upsell checkout demo ============== */
const checkoutLabel = computed(() => getText('ecosystem.checkout_label', 'Your basket · STAR DRAWS'));
const checkoutRow1Label = computed(() => getText('ecosystem.checkout_row1_label', 'Friday Cash Draw × 5'));
const checkoutRow1Price = computed(() => getText('ecosystem.checkout_row1_price', '£10.00'));
const checkoutRow2Label = computed(() => getText('ecosystem.checkout_row2_label', 'Instant Win — Scratch'));
const checkoutRow2Price = computed(() => getText('ecosystem.checkout_row2_price', '£2.50'));
const checkoutTotal = computed(() => getText('ecosystem.checkout_total', '£12.50'));
const checkoutPayLabel = computed(() => getText('ecosystem.checkout_pay_label', 'Pay £12.50 →'));

const upsellTitle = computed(() => getText('ecosystem.upsell_title', 'Wait — quick offer.'));
const upsellDesc = computed(() => getText('ecosystem.upsell_desc', `Add <strong>10 more tickets for just £8 extra</strong>. <strong>${Math.round(upsellStats.value?.modal_acceptance_pct ?? 87)}%</strong> of buyers take this offer.`));
const upsellYesLabel = computed(() => getText('ecosystem.upsell_yes_label', 'Add 10 · £20.50'));
const upsellNoLabel = computed(() => getText('ecosystem.upsell_no_label', 'No thanks'));
const upsellMeta = computed(() => getText('ecosystem.upsell_meta', `A/B test winner · <strong>+${Math.round(upsellStats.value?.aov_uplift_pct ?? 38)}% AOV</strong> at checkout`));

const upsellResultDefault = computed(() => getText('ecosystem.upsell_result_default', 'Click Pay above to see the upsell trigger →'));
const upsellResultTriggered = computed(() => getText('ecosystem.upsell_result_triggered', 'Smart upsell modal triggered…'));
const upsellResultWin = computed(() => getText('ecosystem.upsell_result_win', '🎉 Smart upsell live. Operator just banked an extra <strong>£8.00</strong>.'));
const upsellResultNo = computed(() => getText('ecosystem.upsell_result_no', 'No worries — that\'s exactly the kind of choice we <strong>A/B test</strong> for our operators.'));
const upsellResultRearm = computed(() => getText('ecosystem.upsell_result_rearm', 'Click Pay to see the upsell trigger'));

const upsellShown = ref(false);
const upsellResultWinState = ref(false);
const upsellResultText = ref(upsellResultDefault.value);
let upsellRearmTimer = null;

function handlePay() {
    upsellShown.value = true;
    upsellResultWinState.value = false;
    upsellResultText.value = upsellResultTriggered.value;
}

function handlePick(pick, event) {
    upsellShown.value = false;
    if (pick === 'yes') {
        upsellResultWinState.value = true;
        upsellResultText.value = upsellResultWin.value;
        popConfettiFromEvent(event);
    } else {
        upsellResultWinState.value = false;
        upsellResultText.value = upsellResultNo.value;
    }
    clearTimeout(upsellRearmTimer);
    upsellRearmTimer = setTimeout(() => {
        upsellResultWinState.value = false;
        upsellResultText.value = upsellResultRearm.value;
    }, 6000);
}

onUnmounted(() => clearTimeout(upsellRearmTimer));
</script>

<template>
    <section ref="sectionRef" class="section reveal" :class="{ visible: revealed }" id="ecosystem">
        <div class="center">
            <div class="eyebrow"><span class="dot"></span>{{ eyebrow }}</div>
            <h2 class="h2">{{ titleBefore }}<br /><span class="grad-text">{{ titleKeyword }}</span></h2>
            <p class="lead center" style="margin: 18px auto 0;">{{ lead }}</p>
        </div>

        <div class="feature-grid">
            <div
                v-for="(f, idx) in features"
                :key="idx"
                :class="['feature-card', f.size, { featured: f.featured, pressed: pressedIdx === idx }]"
                @click="pulseCard(idx)"
            >
                <!-- HERO: Game Studio -->
                <template v-if="f.size === 'hero'">
                    <div>
                        <span v-if="f.featured" class="badge" style="position:relative; top:0; right:0; display:inline-block; margin-bottom:14px;">{{ f.badge }}</span>
                        <span class="icon">{{ f.icon }}</span>
                        <h4>{{ f.title }}</h4>
                        <p>{{ f.text }}</p>
                        <a href="#game-studio" class="more">{{ f.more }}</a>
                    </div>
                    <div class="bingo-demo-wrapper" @click.stop>
                        <BingoGame :demoMode="true" :assets="demoBingoAssets" :prizes="[]" :tickets="[]" />
                    </div>
                </template>

                <!-- INTERACTIVE: Smart Upsell -->
                <template v-else-if="f.size === 'interactive'">
                    <div>
                        <span v-if="f.featured" class="badge" style="position:relative; top:0; right:0; display:inline-block; margin-bottom:14px;">{{ f.badge }}</span>
                        <span class="icon">{{ f.icon }}</span>
                        <h4>{{ f.title }}</h4>
                        <p>{{ f.text }}</p>
                        <span class="more">{{ f.more }}</span>
                    </div>
                    <div>
                        <div class="checkout-mock">
                            <div class="checkout-mock-label">{{ checkoutLabel }}</div>
                            <div class="checkout-row"><span>{{ checkoutRow1Label }}</span><span class="v">{{ checkoutRow1Price }}</span></div>
                            <div class="checkout-row"><span>{{ checkoutRow2Label }}</span><span class="v">{{ checkoutRow2Price }}</span></div>
                            <div class="checkout-row total"><span>Total</span><span class="v">{{ checkoutTotal }}</span></div>
                            <button class="checkout-btn" @click="handlePay">{{ checkoutPayLabel }}</button>
                            <div class="upsell-modal" :class="{ shown: upsellShown }">
                                <div class="upsell-modal-icon">🎁</div>
                                <div class="upsell-modal-title">{{ upsellTitle }}</div>
                                <div class="upsell-modal-desc" v-html="upsellDesc"></div>
                                <div class="upsell-modal-buttons">
                                    <button class="upsell-btn primary" @click="handlePick('yes', $event)">{{ upsellYesLabel }}</button>
                                    <button class="upsell-btn secondary" @click="handlePick('no', $event)">{{ upsellNoLabel }}</button>
                                </div>
                                <div class="upsell-meta" v-html="upsellMeta"></div>
                            </div>
                        </div>
                        <div class="upsell-result-inline" :class="{ win: upsellResultWinState }" v-html="upsellResultText"></div>
                    </div>
                </template>

                <!-- WIDE / STD cards -->
                <template v-else>
                    <span v-if="f.featured" class="badge">{{ f.badge }}</span>
                    <span class="icon">{{ f.icon }}</span>
                    <h4>{{ f.title }}</h4>
                    <p>{{ f.text }}</p>

                    <template v-if="f.mini === 'wallet'">
                        <div class="wallet-split" :class="{ animate: revealed }">
                            <div class="wallet-seg cash">{{ walletCashLabel }}</div>
                            <div class="wallet-seg credit">{{ walletCreditLabel }}</div>
                        </div>
                        <div class="wallet-labels">
                            <span><strong>{{ walletWithdrawLabel }}</strong> · {{ walletCashSub }}</span>
                            <span><strong>{{ walletPromoLabel }}</strong> · {{ walletCreditSub }}</span>
                        </div>
                    </template>

                    <div v-else-if="f.mini === 'compliance'" class="vcoc-stamp">
                        <div class="tick">✓</div>
                        <div>
                            <div class="vcoc-stamp-label">{{ vcocLabel }}</div>
                            <div class="vcoc-stamp-value">{{ vcocValue }}</div>
                        </div>
                    </div>

                    <template v-else-if="f.mini === 'bars'">
                        <div class="mini-bars" :class="{ animate: revealed }">
                            <div v-for="(h, i) in barHeights" :key="i" :style="{ height: h + '%' }"></div>
                        </div>
                        <div class="chart-trend" style="margin-top:8px; display:inline-flex; align-items:center; gap:4px; font-size:12px; font-weight:700; color:var(--orange);">{{ barsTrend }}</div>
                    </template>

                    <div class="more">{{ f.more }}</div>
                </template>
            </div>
        </div>
        <div class="grid-lure"><span class="arr">👆</span>&nbsp;&nbsp;{{ gridLureText }}&nbsp;&nbsp;<span class="arr">👆</span></div>
    </section>
</template>

<style scoped>
.feature-card.pressed {
    transform: scale(0.985);
}
.bingo-demo-wrapper {
    width: 100%;
    border-radius: 12px;
    transform-origin: top center;
    transform: scale(0.62);
    /* negative margin-bottom compensates for the layout space (natural height)
       that the scaled-down game still occupies — pulls card content up */
    margin-bottom: -200px;
    pointer-events: none;
}
@media (max-width: 900px) {
    .bingo-demo-wrapper { transform: scale(0.52); margin-bottom: -240px; }
}
</style>
