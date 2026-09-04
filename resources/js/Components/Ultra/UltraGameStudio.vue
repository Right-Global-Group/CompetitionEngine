<script setup>
/**
 * Game Studio — the nine-square game wall from the homepage build, running the real
 * game components (the same ones operators get) instead of mock animations.
 * Tap a square to open the customiser: theme, title, win text and inventory icon
 * change the live game on the right.
 */
import { ref, reactive, computed, onMounted, onBeforeUnmount, nextTick } from 'vue';
import SlotsGame from '@/Components/Games/SlotsGame.vue';
import SpinGame from '@/Components/Games/SpinGame.vue';
import ScratchGame from '@/Components/Games/ScratchGame.vue';
import BingoGame from '@/Components/Games/BingoGame.vue';
import CoinDropGame from '@/Components/Games/CoinDropGame.vue';
import BalloonPopGame from '@/Components/Games/PopGame.vue';
import FootballModal from '@/Components/Games/FootballModal.vue';
import FishingModal from '@/Components/Games/FishingModal.vue';
import TicketEaterModal from '@/Components/Games/TicketEaterModal.vue';

const CALENDLY = 'https://calendly.com/contact-compengine/30min';
const TILE_BOX = 420;    // natural width the tile games are laid out at, then zoomed to fit
const PANEL_BOX = 600;   // same for the customiser preview
const CYCLE_MS = 3200;

const THEMES = [
    { name: 'Ocean',  primary: '#00CED1', secondary: '#1a5a7a', accent: '#00FFFF', machine: '#1a5a7a' },
    { name: 'Royal',  primary: '#9333EA', secondary: '#581C87', accent: '#A855F7', machine: '#581C87' },
    { name: 'Fire',   primary: '#EF4444', secondary: '#7F1D1D', accent: '#F97316', machine: '#7F1D1D' },
    { name: 'Forest', primary: '#22C55E', secondary: '#14532D', accent: '#4ADE80', machine: '#14532D' },
    { name: 'Gold',   primary: '#F59E0B', secondary: '#78350F', accent: '#FCD34D', machine: '#78350F' },
];
const EMOJI = ['🎣', '🎁', '🏆', '💎', '⭐', '🎯', '🎪', '🎲'];

const GAMES = [
    { id: 'slots',       name: 'Slots',        tag: 'Match 3', icon: 'spark',  comp: SlotsGame,        titleKey: 'titleText', emoji: true },
    { id: 'scratch',     name: 'Scratch',      tag: 'Reveal',  icon: 'gift',   comp: ScratchGame },
    { id: 'spin',        name: 'Spinny',       tag: 'Spin',    icon: 'target', comp: SpinGame,         titleKey: 'titleText' },
    { id: 'bingo',       name: 'Bingo',        tag: 'Line',    icon: 'dice',   comp: BingoGame },
    { id: 'coindrop',    name: 'Coin Drop',    tag: 'Drop',    icon: 'cash',   comp: CoinDropGame,     titleKey: 'titleText' },
    { id: 'balloonpop',  name: 'Balloon Pop',  tag: 'Pop',     icon: 'star',   comp: BalloonPopGame,   titleKey: 'titleText', subKey: 'popSubtitleText' },
    { id: 'football',    name: 'Football',     tag: 'Shoot',   icon: 'target', comp: FootballModal,    titleKey: 'titleText', winKey: 'winText' },
    { id: 'fishing',     name: 'Fishing',      tag: 'Hook',    icon: 'fish',   comp: FishingModal,     titleKey: 'titleText', winKey: 'winText' },
    { id: 'ticketeater', name: 'Ticket Eater', tag: 'Feed',    icon: 'doc',    comp: TicketEaterModal, titleKey: 'titleText' },
];

/* ---------- per-game configuration (same defaults as the studio configurator) ---------- */
const cfg = reactive({
    slots: { titleText: 'LUCKY SLOTS', titleColor: '#00FFFF', primaryColor: '#00CED1', secondaryColor: '#1a5a7a', accentColor: '#00FFFF', textColor: '#FFFFFF', machineBgColor: '#1a5a7a', matchTextColor: '#7FDBFF', inventoryEmoji: '🎣', inventoryButtonColor: '#FFD700', prizesModalBgColor: '#1F2937', prizesTitleColor: '#FFD700', prizesCardBorderColor: '#FFD700', prizesCardBgColor: '#374151', prizesValueColor: '#10B981' },
    scratch: { textColour: '#FFFFFF', wonTextColour: '#00FF00', loseTextColour: '#FF4444', accentColour: '#FFD700' },
    spin: { titleText: 'SPIN TO WIN', titleColor: '#FFD700', wheelEdgeColor: '#00aeff', walletText: '', walletColor: '#8b5cf6' },
    bingo: { bgStart: '#1e3a8a', bgEnd: '#1e40af', frameColor: '#3b82f6', frameGlow: '#60a5fa', squareBg: '#374151', squareText: '#e5e7eb', diamond1: '#06b6d4', diamond2: '#67e8f9', winnerGlow: '#10b981', winnerBg: '#059669', popupStart: '#10b981', popupEnd: '#059669', diamondEmoji: '💎' },
    coindrop: { titleText: 'COIN DROP!', titleColor: '#FFD700', primaryColor: '#e94560', secondaryColor: '#1a1a2e', accentColor: '#ffd700', boardBgColor: '#1a1a2e', pegColor: '#ffffff', pegGlowColor: '#e94560', ballColor: '#ffd700', ballGlowColor: '#ffaa00', winBucketColor: '#00ff88', loseBucketColor: '#ff4444', trailColor: '#e94560', pegShape: 'hexagon' },
    balloonpop: { titleText: 'POP TO WIN!', titleColor: '#FFD700', primaryColor: '#e94560', secondaryColor: '#1a1a2e', accentColor: '#ffd700', popBgColor: '#1a1a2e', popItemType: 'balloon', popWinColor: '#00ff88', popLoseColor: '#ff4444', popSubtitleText: 'Pop balloons to reveal your prize!' },
    football: { theme: 'classic', titleText: 'Take Your Shot!', winText: 'GOAL! You scored!', loseText: 'Saved! Unlucky…', primaryColor: '#1b5e20', accentColor: '#ffeb3b', goalColor: '#f59e0b', showTopPrize: true, hostEnabled: true },
    fishing: { theme: 'stormy', titleText: 'Cast to Win!', winText: 'Reeled in a winner! 🎣', loseText: 'The one that got away…', accentColor: '#ffd54f', primaryColor: '#0277bd', sunEnabled: true, cloudsEnabled: true, showTopPrize: false, introEnabled: true },
    ticketeater: { theme: 'arcade', titleText: 'Feed the Eater!', accentColor: '#ffd54f', primaryColor: '#6c5ce7', showTopPrize: false, introEnabled: true, introWelcomeText: 'Welcome to {name}', introSubtitle: 'Roll through your tickets to reveal instant prizes', introButtonText: 'Start 👹' },
});
const themeIdx = reactive({ slots: 0, scratch: 4, spin: 0, bingo: 0, coindrop: 2, balloonpop: 2, football: 3, fishing: 0, ticketeater: 1 });

function applyTheme(id, t) {
    const c = cfg[id];
    switch (id) {
        case 'slots': Object.assign(c, { primaryColor: t.primary, secondaryColor: t.secondary, accentColor: t.accent, machineBgColor: t.machine, titleColor: t.accent }); break;
        case 'scratch': c.accentColour = t.accent; break;
        case 'spin': Object.assign(c, { wheelEdgeColor: t.primary, titleColor: t.accent, walletColor: t.primary }); break;
        case 'bingo': Object.assign(c, { bgStart: t.secondary, bgEnd: t.machine, frameColor: t.primary, frameGlow: t.accent, diamond1: t.primary, diamond2: t.accent, winnerGlow: t.accent, winnerBg: t.primary, popupStart: t.primary, popupEnd: t.secondary }); break;
        case 'coindrop': Object.assign(c, { primaryColor: t.primary, accentColor: t.accent, ballColor: t.accent, ballGlowColor: t.accent, pegGlowColor: t.primary, trailColor: t.primary, boardBgColor: t.secondary }); break;
        case 'balloonpop': Object.assign(c, { primaryColor: t.primary, accentColor: t.accent, popBgColor: t.secondary }); break;
        default: Object.assign(c, { primaryColor: t.primary, accentColor: t.accent });
    }
}

const demo = {
    footballTickets: [
        { id: 1, number: '001', instant_win: { id: 1, prize: '£50 Cash', value: 50, claimed: false, image_path: null } },
        { id: 2, number: '002', instant_win: false },
    ],
    fishingTickets: [
        { id: 1, number: '001', instant_win: { id: 1, prize: '£25 Cash', value: 25, claimed: false, image_path: null } },
        { id: 2, number: '002', instant_win: false },
        { id: 3, number: '003', instant_win: false },
        { id: 4, number: '004', instant_win: { id: 2, prize: '£10 Cash', value: 10, claimed: false, image_path: null } },
        { id: 5, number: '005', instant_win: false },
    ],
    fishingCategories: [
        { id: 1, name: '£25 Cash', value: 25, prize_type: 'cash', image_path: null, available: 1 },
        { id: 2, name: '£10 Cash', value: 10, prize_type: 'cash', image_path: null, available: 1 },
    ],
    eaterCategories: [
        { id: 1, name: '£50 Cash', value: 50, prize_type: 'cash', image_path: null, available: 1 },
        { id: 2, name: 'Free Tickets', value: 5, prize_type: 'ticket_bundle', image_path: null, available: 1 },
        { id: 3, name: '£20 Voucher', value: 20, prize_type: 'voucher', image_path: null, available: 1 },
    ],
};

const noImages = { titleImage: '', background: '', spinButtonImage: '', machineImage: '', footerImage: '', header: '' };
const assets = {
    slots: computed(() => ({ ...cfg.slots, ...noImages })),
    scratch: computed(() => ({ background: '', overlay: '', header: '', ...cfg.scratch })),
    spin: computed(() => ({ ...cfg.spin, background: '' })),
    bingo: computed(() => ({ background: '', header: '', cardCover: '', ...cfg.bingo })),
    coindrop: computed(() => ({ name: 'Coin Drop', textColor: '#FFFFFF', ...cfg.coindrop, background: '', header: '', titleImage: '', dropButtonImage: '', ballImage: '', winBucketImage: '', loseBucketImage: '', tubeImage: '', machineImage: '', footerImage: '', gameBackground: '', welcomeSound: '', dropSound: '', winSound: '', lossSound: '' })),
    balloonpop: computed(() => ({ name: 'Balloon Pop', textColor: '#FFFFFF', ...cfg.balloonpop, background: '', header: '', titleImage: '', popItemImage: '', popItemColors: ['#FF4C4C', '#FFEB3B', '#64B5F6', '#81C784', '#9575CD', '#FF8A80', '#FFB74D', '#4DD0E1', '#F06292', '#FFD700'], popConfettiColors: ['#FFD700', '#FF6B6B', '#4ECDC4', '#45B7D1', '#96CEB4', '#FFEAA7'], popSound: '', welcomeSound: '', winSound: '', lossSound: '', popItemLabel: '' })),
    football: computed(() => ({ ...cfg.football, hostImage: '', kickSound: '', whistleSound: '', crowdSound: '', winSound: '', lossSound: '' })),
    fishing: computed(() => ({ ...cfg.fishing, boatImage: '', underwaterImage: '', introTitleImage: '', fish1: '', fish2: '', fish3: '', castSound: '', splashSound: '', reelSound: '', winSound: '', lossSound: '' })),
    ticketeater: computed(() => ({ ...cfg.ticketeater, introTitleImage: '', mascotImage: '', mascotImage2: '', mascotImage3: '', ticketImage: '', risingTicketImage: '', backgroundImage: '', pouchImage: '', prizeImage: '', feedSound: '', gulpSound: '', winSound: '', collectSound: '', welcomeSound: '' })),
};

function gameProps(id, mode) {
    const base = { demoMode: true, previewMode: mode };
    switch (id) {
        case 'slots': return { ...base, slotsAssets: assets.slots.value, showMachine: true };
        case 'scratch': return { ...base, scratchAssets: assets.scratch.value };
        case 'spin': return { ...base, spinAssets: assets.spin.value };
        case 'bingo': return { ...base, assets: assets.bingo.value, prizes: [], tickets: [] };
        case 'coindrop': return { ...base, coinDropAssets: assets.coindrop.value, tickets: [], showGameBoard: true };
        case 'balloonpop': return { ...base, popGameAssets: assets.balloonpop.value, tickets: [], showGameBoard: true };
        case 'football': return { ...base, modelValue: true, assets: assets.football.value, tickets: demo.footballTickets };
        case 'fishing': return { ...base, modelValue: true, assets: assets.fishing.value, tickets: demo.fishingTickets, instant_win_categories: demo.fishingCategories };
        case 'ticketeater': return { ...base, modelValue: true, assets: assets.ticketeater.value, instant_win_categories: demo.eaterCategories };
    }
    return base;
}

/* ---------- wall state ---------- */
const wallEl = ref(null);
const gridEl = ref(null);
const previewEl = ref(null);
const panelEl = ref(null);
const tileEls = ref([]);
const mounted = ref(GAMES.map(() => false));   // tiles mount their game as they scroll near
const cur = ref(-1);                           // auto-cycle highlight
const sel = ref(-1);                           // open customiser
const tileZoom = ref(1);
const previewZoom = ref(1);
let cycleTimer = null, visible = false, ro = null, tileIo = null, wallIo = null;
const reduced = () => window.matchMedia('(prefers-reduced-motion: reduce)').matches;

const tileTitle = (g) => (g.titleKey ? cfg[g.id][g.titleKey] : g.name).toString().toUpperCase();
const themeOf = (id) => THEMES[themeIdx[id]];
const selected = computed(() => (sel.value > -1 ? GAMES[sel.value] : null));
const selCfg = computed(() => (selected.value ? cfg[selected.value.id] : null));

function fit() {
    const t = tileEls.value[0];
    if (t) { const w = t.getBoundingClientRect().width; if (w) tileZoom.value = Math.max(0.3, Math.min(1.2, w / TILE_BOX)); }
    const p = previewEl.value;
    if (p) { const w = p.getBoundingClientRect().width; if (w) previewZoom.value = Math.max(0.3, Math.min(1.2, w / PANEL_BOX)); }
}
function focus(i) {
    cur.value = i;
    clearTimeout(cycleTimer);
    if (visible && !reduced()) cycleTimer = setTimeout(() => focus((cur.value + 1) % GAMES.length), CYCLE_MS);
}
function track(name, payload) { if (typeof window.ceTrack === 'function') window.ceTrack(name, payload); }

async function open(i) {
    focus(i);
    sel.value = i;
    await nextTick();
    fit();
    if (!window.matchMedia('(min-width: 1024px)').matches) {
        setTimeout(() => panelEl.value?.scrollIntoView({ behavior: reduced() ? 'auto' : 'smooth', block: 'start' }), 50);
    }
    track('game_studio_customise_open', { game: GAMES[i].name });
}
function close() {
    const i = sel.value;
    sel.value = -1;
    if (i > -1) tileEls.value[i]?.focus();
    nextTick(fit);
}
function pickTheme(k) {
    if (!selected.value) return;
    themeIdx[selected.value.id] = k;
    applyTheme(selected.value.id, THEMES[k]);
    track('game_studio_theme', { game: selected.value.name, theme: THEMES[k].name });
}
function pickEmoji(e) { if (selected.value) cfg[selected.value.id].inventoryEmoji = e; }

onMounted(() => {
    fit();
    ro = new ResizeObserver(fit);
    if (gridEl.value) ro.observe(gridEl.value);
    if (previewEl.value) ro.observe(previewEl.value);

    tileIo = new IntersectionObserver((entries) => {
        entries.forEach((e) => {
            if (e.isIntersecting) { const i = +e.target.dataset.i; mounted.value[i] = true; tileIo.unobserve(e.target); }
        });
    }, { rootMargin: '320px 0px' });
    tileEls.value.forEach((el) => el && tileIo.observe(el));

    wallIo = new IntersectionObserver((entries) => {
        entries.forEach((e) => {
            visible = e.isIntersecting;
            if (visible) focus(cur.value > -1 ? cur.value : 0);
            else clearTimeout(cycleTimer);
        });
    }, { threshold: 0.2 });
    if (wallEl.value) wallIo.observe(wallEl.value);
});

onBeforeUnmount(() => {
    clearTimeout(cycleTimer);
    ro?.disconnect(); tileIo?.disconnect(); wallIo?.disconnect();
});
</script>

<template>
<section id="game-studio">
  <div class="wrap">
    <div class="sec-head center">
      <span class="eyebrow"><i class="dot"></i>✦ Only on CompEngine ✦</span>
      <h2>Game Studio. <span class="grad">Built by you.</span></h2>
      <p class="lead">Other UK competition platforms give operators a handful of fixed game presets. We give a studio. Pick a game, theme it, brand it, preview every change live.</p>
    </div>
  </div>

  <div ref="wallEl" class="wrap gamewall" :class="{ open: sel > -1 }" id="gamewall" :style="{ '--sc-dur': CYCLE_MS + 'ms', '--z': tileZoom }">
    <div class="gw-head"><span class="tag" id="gw-live"><i class="dot"></i>All nine games, live</span><span class="hand">tap any square to play it</span></div>
    <div class="gw-body">
      <div ref="gridEl" class="gw-grid" id="gw-grid">
        <div
          v-for="(g, i) in GAMES" :key="g.id"
          :ref="(el) => (tileEls[i] = el)"
          class="g-tile" role="button" tabindex="0" :data-i="i"
          :class="{ on: cur === i, sel: sel === i }"
          :style="{ '--gp': themeOf(g.id).primary, '--ga': themeOf(g.id).accent }"
          :aria-label="'Customise ' + g.name"
          :data-track="'gamewall_' + g.id"
          @click="open(i)" @keydown.enter.prevent="open(i)" @keydown.space.prevent="open(i)"
        >
          <div class="gv">
            <div class="gbox" :style="{ '--gw': TILE_BOX + 'px' }">
              <div class="gplay">
                <component v-if="mounted[i]" :is="g.comp" v-bind="gameProps(g.id, 'mobile')" />
              </div>
            </div>
          </div>
          <span class="lbl"><span><i class="ic" :data-i="g.icon"></i> <span class="tt">{{ tileTitle(g) }}</span></span><small>{{ g.tag }}</small></span>
          <span class="play"><i class="ic" data-i="pen"></i></span>
          <i class="bar"></i>
        </div>
      </div>

      <div ref="panelEl" class="gw-panel card" id="gw-panel" v-show="sel > -1">
        <div class="gw-ph"><div><small class="muted">Customise</small><b id="gw-pname">{{ selected ? selected.name : '' }}</b></div><button type="button" class="gw-x" id="gw-close" aria-label="Close customiser" @click="close"><i class="ic" data-i="x"></i></button></div>
        <div ref="previewEl" class="gw-preview" id="gw-preview" :style="{ '--gp': selected ? themeOf(selected.id).primary : null, '--z': previewZoom }">
          <div class="gv">
            <div class="gbox" :style="{ '--gw': PANEL_BOX + 'px' }">
              <div class="gplay">
                <component v-if="selected" :is="selected.comp" :key="selected.id" v-bind="gameProps(selected.id, 'desktop')" />
              </div>
            </div>
          </div>
        </div>
        <p class="gw-hint">This is the real game — play it. Every change below updates it live.</p>
        <div class="gs-row"><label>Theme</label><div class="chips" id="gw-themes">
          <button v-for="(t, k) in THEMES" :key="t.name" type="button" class="chip" :class="{ on: selected && themeIdx[selected.id] === k }" @click="pickTheme(k)"><i class="sw" :style="{ '--c': t.primary }"></i>{{ t.name }}</button>
        </div></div>
        <div v-if="selected && selected.titleKey" class="gs-row"><label for="gw-title">Title</label><input class="gw-input" id="gw-title" maxlength="24" autocomplete="off" spellcheck="false" v-model="selCfg[selected.titleKey]"></div>
        <div v-if="selected && selected.winKey" class="gs-row"><label for="gw-win">Win message</label><input class="gw-input" id="gw-win" maxlength="32" autocomplete="off" spellcheck="false" v-model="selCfg[selected.winKey]"></div>
        <div v-if="selected && selected.subKey" class="gs-row"><label for="gw-sub">Subtitle</label><input class="gw-input" id="gw-sub" maxlength="40" autocomplete="off" spellcheck="false" v-model="selCfg[selected.subKey]"></div>
        <div v-if="selected && selected.emoji" class="gs-row"><label>Inventory icon</label><div class="chips" id="gw-icons">
          <button v-for="e in EMOJI" :key="e" type="button" class="chip gw-emoji" :class="{ on: selCfg.inventoryEmoji === e }" @click="pickEmoji(e)">{{ e }}</button>
        </div></div>
        <div class="gw-foot"><a :href="CALENDLY" target="_blank" rel="noopener" class="btn btn-primary" data-track="game_studio_panel_book_demo" data-calendly>Ship this on my site</a><span class="muted small">Live in 1–2 weeks. No developers.</span></div>
      </div>
    </div>
  </div>

  <div class="wrap gs-cta"><a :href="CALENDLY" target="_blank" rel="noopener" class="btn btn-ghost" data-track="game_studio_book_demo" data-calendly>Book a Demo</a><span class="hand">every one of these, yours to theme</span></div>
</section>
</template>
