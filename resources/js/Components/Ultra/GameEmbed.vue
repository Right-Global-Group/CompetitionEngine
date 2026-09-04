<script setup>
/**
 * One real game, in demo mode, fitted into whatever box it's given.
 *   mode="tile"    – scaled to fit, non-interactive, plays itself (autopilot), remounts when a round ends
 *   mode="preview" – interactive studio preview with the game's own mobile/desktop toggle
 * Config values follow the studio schema (field key → value); assets are derived exactly as the
 * tenant studio does it.
 */
import { ref, computed, watch, onMounted, onBeforeUnmount, nextTick, defineAsyncComponent, shallowRef } from 'vue';
import { gamePlayers, demoCategories, makeDemoTickets } from '@/games/registry';
import { assetsFor } from '@/games/studioSchemas';
import { startAutopilot } from '@/ultra/autopilot';

const props = defineProps({
    game: { type: String, required: true },
    config: { type: Object, default: () => ({}) },
    mode: { type: String, default: 'tile' },        // 'tile' | 'preview'
    autoplay: { type: Boolean, default: true },
    active: { type: Boolean, default: true },       // mount only when true (lazy)
});

const FRAME_W = 440;   // demo frame is 420px wide plus a little breathing room
const FRAME_H = 700;   // 650px frame + status bar
const box = ref(null);
const play = ref(null);
const zoom = ref(1);
const epoch = ref(0);
const Player = shallowRef(null);
let ro = null, stopPilot = null, remountTimer = null;

const assets = computed(() => assetsFor(props.game, props.config));
const tickets = makeDemoTickets(props.game === 'popgame' ? 30 : 10);

function fit() {
    const host = box.value?.parentElement;
    if (!host || props.mode !== 'tile') { zoom.value = 1; return; }
    const r = host.getBoundingClientRect();
    if (!r.width) return;
    zoom.value = Math.max(0.25, Math.min(1.1, Math.min(r.width / FRAME_W, r.height / FRAME_H)));
}
function stop() { if (stopPilot) stopPilot(); stopPilot = null; clearTimeout(remountTimer); }
async function arm() {
    stop();
    if (!props.autoplay || props.mode !== 'tile' || !Player.value) return;
    await nextTick();
    // give the game a moment to render its intro, then drive it
    remountTimer = setTimeout(() => {
        if (!play.value) return;
        stopPilot = startAutopilot(play.value, props.game, () => {
            // round over: fresh tickets after a beat
            remountTimer = setTimeout(() => { epoch.value++; arm(); }, 3500);
        });
    }, 900);
}

watch(() => props.active, async (on) => {
    if (on && !Player.value) {
        const loader = gamePlayers[props.game];
        if (loader) Player.value = defineAsyncComponent(loader);
        await nextTick();
        arm();
    }
}, { immediate: true });

onMounted(() => {
    fit();
    ro = new ResizeObserver(fit);
    if (box.value?.parentElement) ro.observe(box.value.parentElement);
});
onBeforeUnmount(() => { stop(); ro?.disconnect(); });
defineExpose({ restart: () => { epoch.value++; arm(); } });
</script>

<template>
  <div ref="box" class="gbox" :class="'gbox-' + mode" :style="{ '--gw': FRAME_W + 'px', zoom: zoom }">
    <div ref="play" class="gplay" :class="[mode === 'tile' ? 'embed-tile' : 'embed-preview']">
      <component
        v-if="Player"
        :is="Player"
        :key="epoch"
        :modelValue="true"
        :demoMode="true"
        :assets="assets"
        :tickets="tickets"
        :instant_win_categories="demoCategories"
      />
    </div>
  </div>
</template>
