<script setup>
/**
 * Game Studio — nine squares, each running the real game in demo mode and playing
 * itself. Tap any square (or "Build your own game") to open the studio, where the
 * platform's own settings form and live preview let visitors customise it.
 */
import { ref, reactive, onMounted, onBeforeUnmount } from 'vue';
import GameEmbed from '@/Components/Ultra/GameEmbed.vue';
import UltraStudioModal from '@/Components/Ultra/UltraStudioModal.vue';
import { defaultsFor } from '@/games/studioSchemas';

const CALENDLY = 'https://calendly.com/contact-compengine/30min';
const CYCLE_MS = 4200;

const GAMES = [
    { key: 'slots',       name: 'Slots',        tag: 'Match 3 to win', icon: 'spark' },
    { key: 'scratchy',    name: 'Scratch',      tag: 'Scratch to reveal', icon: 'gift' },
    { key: 'spinny',      name: 'Spinny',       tag: 'Spin the wheel', icon: 'target' },
    { key: 'bingo',       name: 'Bingo',        tag: 'Complete the line', icon: 'dice' },
    { key: 'coindrop',    name: 'Coin Drop',    tag: 'Drop and bounce', icon: 'cash' },
    { key: 'popgame',     name: 'Balloon Pop',  tag: 'Pop to win', icon: 'star' },
    { key: 'football',    name: 'Football',     tag: 'Take the shot', icon: 'target' },
    { key: 'fishing',     name: 'Fishing',      tag: 'Cast and reel', icon: 'fish' },
    { key: 'ticketeater', name: 'Ticket Eater', tag: 'Feed the machine', icon: 'doc' },
];

// live config per game (studio edits flow back into the tiles)
const configs = reactive(Object.fromEntries(GAMES.map((g) => [g.key, defaultsFor(g.key)])));

const wallEl = ref(null);
const gridEl = ref(null);
const tileEls = ref([]);
const active = ref(GAMES.map(() => false));
const cur = ref(-1);
const studioOpen = ref(false);
const studioGame = ref('slots');
let cycleTimer = null, visible = false, tileIo = null, wallIo = null;
const reduced = () => window.matchMedia('(prefers-reduced-motion: reduce)').matches;
const isPhone = () => window.matchMedia('(max-width: 639px)').matches;

function focus(i) {
    cur.value = i;
    clearTimeout(cycleTimer);
    if (isPhone() && !studioOpen.value) tileEls.value[i]?.scrollIntoView({ behavior: reduced() ? 'auto' : 'smooth', block: 'nearest', inline: 'center' });
    if (visible && !reduced()) cycleTimer = setTimeout(() => focus((cur.value + 1) % GAMES.length), CYCLE_MS);
}
function openStudio(key) {
    studioGame.value = key;
    studioOpen.value = true;
    clearTimeout(cycleTimer);
    if (typeof window.ceTrack === 'function') window.ceTrack('game_studio_open', { game: key });
}
function onStudioChange({ game, config }) { Object.assign(configs[game], config); }
// the autopilot presses the games' own buttons with synthetic clicks; those must not open the studio
function onTileClick(e, key) { if (e.target && e.target.closest && e.target.closest('.gplay')) return; openStudio(key); }

onMounted(() => {
    tileIo = new IntersectionObserver((entries) => {
        entries.forEach((e) => { if (e.isIntersecting) { active.value[+e.target.dataset.i] = true; tileIo.unobserve(e.target); } });
    }, { rootMargin: '360px 0px' });
    tileEls.value.forEach((el) => el && tileIo.observe(el));
    wallIo = new IntersectionObserver((entries) => {
        entries.forEach((e) => { visible = e.isIntersecting; if (visible) focus(cur.value > -1 ? cur.value : 0); else clearTimeout(cycleTimer); });
    }, { threshold: 0.15 });
    if (wallEl.value) wallIo.observe(wallEl.value);
});
onBeforeUnmount(() => { clearTimeout(cycleTimer); tileIo?.disconnect(); wallIo?.disconnect(); });
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

  <div ref="wallEl" class="wrap gamewall" id="gamewall" :style="{ '--sc-dur': CYCLE_MS + 'ms' }">
    <div class="gw-head">
      <span class="tag" id="gw-live"><i class="dot green"></i>All nine games, playing live</span>
      <div class="gw-build">
        <span class="pb-clickme"><span class="cm-txt">Click me!</span><svg class="cm-arrow" viewBox="0 0 56 58" aria-hidden="true"><path d="M6 8 C34 10, 46 24, 40 46" fill="none" stroke="currentColor" stroke-width="3.2" stroke-linecap="round"/><path d="M32 37 L40 49 L48 36" fill="none" stroke="currentColor" stroke-width="3.2" stroke-linecap="round" stroke-linejoin="round"/></svg></span>
        <button type="button" class="pb-open" id="gw-build" data-track="game_studio_build_own" @click="openStudio('slots')">Build your own game <span class="arw">→</span></button>
      </div>
    </div>
    <div ref="gridEl" class="gw-grid" id="gw-grid">
      <div
        v-for="(g, i) in GAMES" :key="g.key"
        :ref="(el) => (tileEls[i] = el)"
        class="g-tile" role="button" tabindex="0" :data-i="i"
        :class="{ on: cur === i }"
        :aria-label="'Customise ' + g.name"
        :data-track="'gamewall_' + g.key"
        @click="onTileClick($event, g.key)" @keydown.enter.prevent="openStudio(g.key)" @keydown.space.prevent="openStudio(g.key)"
      >
        <span class="lbl"><span class="lbl-name"><i class="ic" :data-i="g.icon"></i>{{ g.name }}</span><small>{{ g.tag }}</small></span>
        <div class="gv">
          <GameEmbed :game="g.key" :config="configs[g.key]" mode="tile" :active="active[i]" />
        </div>
        <span class="play"><i class="ic" data-i="pen"></i><b>Customise</b></span>
        <i class="bar"></i>
      </div>
    </div>
    <p class="gw-note hand">every one of these is yours to theme — tap a square to make it your own</p>
  </div>

  <div class="wrap gs-cta"><a :href="CALENDLY" target="_blank" rel="noopener" class="btn btn-ghost" data-track="game_studio_book_demo" data-calendly>Book a Demo</a><button type="button" class="btn btn-primary" data-track="game_studio_build_cta" @click="openStudio('slots')">Build your own game</button></div>

  <UltraStudioModal v-model="studioOpen" :game="studioGame" @change="onStudioChange" />
</section>
</template>
