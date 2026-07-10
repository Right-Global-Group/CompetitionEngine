<script setup>
import { inject, computed, ref, onMounted } from 'vue';
import { useReveal } from '@/Composables/useReveal';
import ScratchGame from '@/Components/Games/ScratchGame.vue';
import SpinGame from '@/Components/Games/SpinGame.vue';

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
        text: getText('ecosystem.feat_wallets_text', 'Two wallets, not one. Cash on one side which players can withdraw from. Site Credit on the other which does not allow players to withdraw. Create instant wins and prizes with one or even both of these options together. Track the usage of both in a clear picture, perfect for accounting purposes and tracking.'),
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
        text: getText('ecosystem.feat_upsell_text', `Triggers automatically at the exact right point in the buy flow. Adds an average +£${Math.round(upsellStats.value?.avg_uplift_gbp ?? 23)} to every ticket order. ${Math.round(upsellStats.value?.modal_acceptance_pct ?? 87)}% of buyers take the offer.`),
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
        text: getText('ecosystem.feat_builder_text', 'Our competition builder makes creating competitions effortless. Ditch the csv files for adding instant wins, no more copy and pasting. Create your competitions with promotions, discounts and addons other sites simply cannot produce.'),
        hideMore: true,
    },
    {
        size: 'std', mini: null, featured: false,
        icon: getText('ecosystem.feat_payouts_icon', '⚡'),
        title: getText('ecosystem.feat_payouts_title', 'Automated Payouts & Prize Management'),
        text: getText('ecosystem.feat_payouts_text', 'Winner choice → instant cash, site credit, or tracked prize fulfilment. End-to-end automated.'),
        more: getText('ecosystem.feat_payouts_more', 'See the prize flow →'),
    },
    {
        size: 'std', mini: 'rng', featured: false,
        icon: getText('ecosystem.feat_rng_icon', '✅'),
        title: getText('ecosystem.feat_rng_title', 'GLI RNG Certified'),
        text: getText('ecosystem.feat_rng_text', 'Our GLI certificate ensures that not only are our draws and ticket distribution verifiable they are certified by an independent third party with true experience. No cutting corners.'),
        more: getText('ecosystem.feat_rng_more', 'See the certification →'),
    },
    {
        size: 'std', mini: null, featured: false,
        icon: getText('ecosystem.feat_notify_icon', '📱🔔'),
        title: getText('ecosystem.feat_notify_title', 'Built-in Notifications'),
        text: getText('ecosystem.feat_notify_text', 'Winner alerts, customer updates and direct marketing all built into the platform creating a more engaging experience even without an app.'),
        hideMore: true,
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

/* ============== Game demo assets for the hero card ============== */
const demoScratchAssets = {
    textColour: '#FFFFFF',
    wonTextColour: '#00FF00',
    loseTextColour: '#FF4444',
    accentColour: '#FFD700',
};
const demoSpinAssets = {
    titleText: 'SPIN & WIN',
    titleColor: '#FFD700',
    wheelEdgeColor: '#F59E0B',
};

/* ============== Wallet split bar ============== */
const walletCashLabel = computed(() => getText('ecosystem.wallet_cash_label', 'Cash 68%'));
const walletCreditLabel = computed(() => getText('ecosystem.wallet_credit_label', 'Credit 32%'));
const walletWithdrawLabel = computed(() => getText('ecosystem.wallet_withdraw_label', 'Withdrawable'));
const walletCashSub = computed(() => getText('ecosystem.wallet_cash_sub', 'Cash wallet'));
const walletPromoLabel = computed(() => getText('ecosystem.wallet_promo_label', 'Promo / prize'));
const walletCreditSub = computed(() => getText('ecosystem.wallet_credit_sub', 'Site credit'));

/* ============== "Why we built it this way" wallet modal ============== */
const showWalletModal = ref(false);
const walletModalTitle = computed(() => getText('ecosystem.wallet_modal_title', 'Why we built it this way'));
const walletModalBody1 = computed(() => getText('ecosystem.wallet_modal_body1', "Most competition platforms use a single wallet for everything — cash, promotional credit, game winnings, referral bonuses. That means the moment you want to run a promotion or reward players through games, there's nothing stopping them withdrawing it straight back out as cash. It blunts your marketing capabilities."));
const walletModalBody2 = computed(() => getText('ecosystem.wallet_modal_body2', 'Site Credit lives in its own wallet and can never be withdrawn — only spent on entries. That frees you up to run instant-win games, promotional top-ups, referral rewards and prize giveaways using credit, without ever risking it leaving as cash. Your Cash wallet stays exactly what it should be: real money players can withdraw whenever they like.'));
function closeWalletModal() { showWalletModal.value = false; }

/* ============== VCOC compliance stamp ============== */
const vcocLabel = computed(() => getText('ecosystem.vcoc_label', 'UK Voluntary Code'));
const vcocValue = computed(() => getText('ecosystem.vcoc_value', 'Mapped end-to-end · since May 2026'));
const vcocUrl = 'https://www.gov.uk/government/publications/voluntary-code-of-good-practice-for-prize-draw-operators/voluntary-code-of-good-practice-for-prize-draw-operators';

/* ============== RNG certification link ============== */
const rngCertUrl = 'https://access.gaminglabs.com/Certificate/Index?i=618';

/* ============== Mini bars chart ============== */
const barHeights = [30, 42, 38, 55, 50, 72, 88, 100];
const barsTrend = computed(() => getText('ecosystem.bars_trend', '↗ +34% MoM growth'));

/* ============== Smart Upsell demo image ============== */
const upsellImage = computed(() => getText('ecosystem.upsell_image', '/images/upsell/upsell.png'));
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
                    <div class="games-demo-wrapper" @click.stop>
                        <div class="game-demo-col">
                            <ScratchGame :demoMode="true" previewMode="mobile" :scratchAssets="demoScratchAssets" :tickets="[]" />
                        </div>
                        <div class="game-demo-col">
                            <SpinGame :demoMode="true" previewMode="mobile" :spinAssets="demoSpinAssets" :tickets="[]" />
                        </div>
                    </div>
                </template>

                <!-- INTERACTIVE: Smart Upsell -->
                <template v-else-if="f.size === 'interactive'">
                    <div>
                        <span v-if="f.featured" class="badge" style="position:relative; top:0; right:0; display:inline-block; margin-bottom:14px;">{{ f.badge }}</span>
                        <span class="icon">{{ f.icon }}</span>
                        <h4>{{ f.title }}</h4>
                        <p>{{ f.text }}</p>
                    </div>
                    <div class="upsell-image-wrap">
                        <img :src="upsellImage" alt="Smart upsell modal example" class="upsell-image" loading="lazy" />
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

                    <div
                        v-if="f.mini === 'wallet'"
                        class="more clickable"
                        @click.stop="showWalletModal = true"
                    >{{ f.more }}</div>
                    <a
                        v-else-if="f.mini === 'compliance'"
                        class="more"
                        :href="vcocUrl"
                        target="_blank"
                        rel="noopener noreferrer"
                        @click.stop
                    >{{ f.more }}</a>
                    <a
                        v-else-if="f.mini === 'rng'"
                        class="more"
                        :href="rngCertUrl"
                        target="_blank"
                        rel="noopener noreferrer"
                        @click.stop
                    >{{ f.more }}</a>
                    <div v-else-if="!f.hideMore" class="more">{{ f.more }}</div>
                </template>
            </div>
        </div>
        <div class="grid-lure"><span class="arr">👆</span>&nbsp;&nbsp;{{ gridLureText }}&nbsp;&nbsp;<span class="arr">👆</span></div>
    </section>

    <Teleport to="body">
        <Transition name="wallet-modal-fade">
            <div v-if="showWalletModal" class="wallet-modal-overlay" @click.self="closeWalletModal">
                <div class="wallet-modal-card">
                    <button class="wallet-modal-close" @click="closeWalletModal" aria-label="Close">✕</button>
                    <div class="wallet-modal-icon">💵</div>
                    <h3 class="wallet-modal-title">{{ walletModalTitle }}</h3>
                    <p class="wallet-modal-text">{{ walletModalBody1 }}</p>
                    <p class="wallet-modal-text">{{ walletModalBody2 }}</p>
                    <button class="wallet-modal-cta" @click="closeWalletModal">Got it</button>
                </div>
            </div>
        </Transition>
    </Teleport>
</template>

<style scoped>
.feature-card.pressed {
    transform: scale(0.985);
}
.games-demo-wrapper {
    display: flex;
    gap: 12px;
    width: 170%;
    transform-origin: top center;
    transform: scale(0.59);
    margin-left: -35%;
    margin-bottom: -230px;
    pointer-events: none;
}
.game-demo-col {
    flex: 1;
    min-width: 0;
    height: 550px;
    overflow: hidden;
    border-radius: 12px;
}
/* strip the hardcoded dark backgrounds from both game components */
.games-demo-wrapper :deep(.scratch-game-container),
.games-demo-wrapper :deep(.spin-game-wrapper) {
    background-color: transparent !important;
    background-image: none !important;
}
@media (max-width: 900px) {
    .games-demo-wrapper { transform: scale(0.48); margin-bottom: -290px; }
}
.more.clickable {
    cursor: pointer;
    text-decoration: underline;
    text-underline-offset: 3px;
}
.more.clickable:hover {
    color: var(--orange);
}
.wallet-modal-overlay {
    position: fixed;
    inset: 0;
    z-index: 9999;
    display: flex;
    align-items: center;
    justify-content: center;
    background: rgba(10, 4, 24, 0.72);
    backdrop-filter: blur(3px);
    padding: 20px;
}
.wallet-modal-card {
    position: relative;
    max-width: 520px;
    width: 100%;
    background: linear-gradient(180deg, var(--bg-2), var(--bg-1));
    border: 1px solid var(--border-strong);
    border-radius: 20px;
    padding: 32px 28px 28px;
    box-shadow: 0 24px 60px rgba(0,0,0,.5);
}
.wallet-modal-close {
    position: absolute;
    top: 14px;
    right: 14px;
    width: 32px;
    height: 32px;
    border-radius: 50%;
    background: rgba(255,255,255,.08);
    color: var(--text-1);
    font-size: 14px;
}
.wallet-modal-close:hover {
    background: rgba(255,255,255,.16);
}
.wallet-modal-icon {
    font-size: 28px;
    margin-bottom: 10px;
}
.wallet-modal-title {
    font-size: 22px;
    font-weight: 800;
    color: var(--text-1);
    margin-bottom: 14px;
}
.wallet-modal-text {
    font-size: 15px;
    line-height: 1.65;
    color: var(--text-2);
    margin-bottom: 14px;
}
.wallet-modal-cta {
    margin-top: 6px;
    padding: 10px 24px;
    border-radius: 12px;
    font-weight: 800;
    font-size: 14px;
    color: #06223a;
    background: linear-gradient(135deg, var(--orange), var(--coral) 55%, var(--pink));
}
.wallet-modal-fade-enter-active,
.wallet-modal-fade-leave-active {
    transition: opacity .25s ease;
}
.wallet-modal-fade-enter-from,
.wallet-modal-fade-leave-to {
    opacity: 0;
}
</style>
