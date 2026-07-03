<script setup lang="ts">
import { computed, nextTick, onBeforeUnmount, reactive, ref, watch } from 'vue';
import gsap from 'gsap';
import SpriteCharacter from '@/Components/Games/SpriteCharacter.vue';

const props = withDefaults(defineProps<{
    modelValue?: boolean;
    demoMode?: boolean;
    previewMode?: 'mobile' | 'desktop';
    assets?: Record<string, any>;
    tickets?: any[];
    instant_win_categories?: any[];
}>(), {
    modelValue: false, demoMode: false, previewMode: 'desktop',
    assets: () => ({}), tickets: () => [], instant_win_categories: () => [],
});
const emit = defineEmits<{ 'update:modelValue': [boolean]; 'wins-collected': [any[]] }>();

const a = computed(() => props.assets || {});

// ── responsive frame ──
const demoPreviewMode = ref<'mobile' | 'desktop'>('mobile');
const togglePreviewMode = () => { demoPreviewMode.value = demoPreviewMode.value === 'mobile' ? 'desktop' : 'mobile'; };
const actualPreviewMode = computed(() => props.demoMode ? demoPreviewMode.value : (props.previewMode || 'desktop'));
const frameClass = computed(() => props.demoMode ? (actualPreviewMode.value === 'mobile' ? 'is-mobile' : 'is-desktop') : '');
const CORE = { x: 32, y: 10, w: 936, h: 1404 };
const CORE_CX = CORE.x + CORE.w / 2;
const stageEl = ref<HTMLElement | null>(null);
const stageAspect = ref(CORE.w / CORE.h);
let stageRO: ResizeObserver | null = null;
watch(stageEl, (el) => {
    stageRO?.disconnect();
    if (el && typeof ResizeObserver !== 'undefined') {
        stageRO = new ResizeObserver((entries) => {
            const r = entries[0]?.contentRect;
            if (r && r.width > 0 && r.height > 0) stageAspect.value = r.width / r.height;
        });
        stageRO.observe(el);
    }
}, { flush: 'post' });

const view = computed(() => {
    const ar = stageAspect.value;
    const coreAspect = CORE.w / CORE.h;
    if (ar >= coreAspect) {
        const h = CORE.h, w = h * ar;
        return { x: CORE_CX - w / 2, y: CORE.y, w, h };
    }
    const w = CORE.w, h = w / ar;
    return { x: CORE.x, y: CORE.y, w, h };
});
const sceneViewBox = computed(() => `${view.value.x} ${view.value.y} ${view.value.w} ${view.value.h}`);

const bg = computed(() => {
    const v = view.value;
    return { x: v.x - 200, w: v.w + 400, top: v.y - 100, bottom: v.y + v.h + 200, floor: v.y + v.h };
});

// ── settings ──
const titleText = computed(() => a.value.titleText || 'Cast to Win!');
const winText = computed(() => a.value.winText || 'Reeled in a winner! 🎣');
const loseText = computed(() => a.value.loseText || 'The one that got away…');
const accent = computed(() => a.value.accentColor || '#ffd54f');
const primary = computed(() => a.value.primaryColor || '#0277bd');
const textColor = computed(() => a.value.textColor || '#ffffff');
const sunEnabled = computed(() => a.value.sunEnabled !== false);
const sunImage = computed(() => a.value.sunImage || '/games/fishing/sun-default.png?v=1');
const cloudsEnabled = computed(() => a.value.cloudsEnabled !== false);
const showTopPrize = computed(() => a.value.showTopPrize === true);

const boatImage = computed(() => a.value.boatImage || '/games/fishing/boat-default.png?v=2');
const fishImage = computed(() => a.value.fishImage || '/games/fishing/fish-default.png?v=1');
const fishImgs = computed(() => [a.value.fish1, a.value.fish2, a.value.fish3].filter(Boolean) as string[]);
const fishFaceSign = computed(() => (a.value.fishFaceLeft ? -1 : 1));
const fishermanSheet = computed(() => a.value.fishermanSheet || '');
const spriteChroma = computed(() => a.value.spriteChroma === true);
const fishermanFrames = computed(() => { const n = Number(a.value.fishermanFrames) || 0; return n > 0 ? n : 1; });
const boatOk = ref(true);

// intro
const introEnabled = computed(() => a.value.introEnabled !== false);
const introTitleImage = computed(() => a.value.introTitleImage || '');
const introSubtitle = computed(() => a.value.introSubtitle || 'Cast your line to reel in instant prizes');
const introButtonText = computed(() => a.value.introButtonText || 'Cast Off 🎣');
const introVoiceEnabled = computed(() => a.value.introVoiceEnabled === true);
const gameName = computed(() => a.value.name || '');
const welcomeMsg = computed(() => (a.value.introWelcomeText || 'Welcome to {name}').replace('{name}', gameName.value || 'the catch'));
const showIntro = ref(false);

// ── theme palette ──
const THEMES: Record<string, Record<string, string>> = {
    chill:   { skyTop: '#7ecbff', skyBot: '#cdeeff', surfTop: '#3fb6e0', surfBot: '#1f8fc0', deepTop: '#1f8fc0', deepBot: '#063a63', sand: '#e6cf86', weed: '#1f8f5a', sun: '#fff2a8', glow: '#ffe55c', foam: '#f2fcff' },
    sunset:  { skyTop: '#3a2a66', skyBot: '#ffb27a', surfTop: '#e0795f', surfBot: '#9c4a6e', deepTop: '#7a3a6a', deepBot: '#241036', sand: '#caa05e', weed: '#7a5a2a', sun: '#fff1c2', glow: '#ff9d5c', foam: '#ffe9d6' },
    night:   { skyTop: '#050a1f', skyBot: '#122a4a', surfTop: '#14405e', surfBot: '#0a2a40', deepTop: '#0a2a40', deepBot: '#02101c', sand: '#2a3d4a', weed: '#14564a', sun: '#eaf4ff', glow: '#9fd0ff', foam: '#bcd8ec' },
    stormy:  { skyTop: '#2e3742', skyBot: '#6b7b85', surfTop: '#3c5560', surfBot: '#24383f', deepTop: '#24383f', deepBot: '#0c181c', sand: '#5a5f52', weed: '#3e5a44', sun: '#b9c6cd', glow: '#d2dbe0', foam: '#dbe4e8' },
};
const pal = computed(() => THEMES[String(a.value.theme || 'stormy')] || THEMES.stormy);
const underwaterImage = computed(() => a.value.underwaterImage || '/games/fishing/underwater-default.png?v=1');

// ── decorative underwater fish ──
const FISH_PALETTE = ['#ffb74d', '#ff8a65', '#4fc3f7', '#ba68c8', '#aed581', '#fff176'];
const bubbles = Array.from({ length: 24 }, (_, i) => ({
    id: i, x: 40 + ((i * 137) % 920), r: 3 + ((i * 7) % 5) * 1.6, dur: 5 + ((i * 3) % 6), delay: -((i * 1.7) % 7),
}));
const weeds = Array.from({ length: 9 }, (_, i) => ({ id: i, x: 70 + i * 108 + ((i * 13) % 30), h: 90 + ((i * 29) % 90), delay: -((i * 0.6) % 3) }));

// ── per-ticket casts ──
type Cast = { id: any; number: string; win: boolean; prize: string; value: number; image: string; isBundle: boolean };
const casts = ref<Cast[]>([]);
const index = ref(0);
const phase = ref<'ready' | 'casting' | 'waiting' | 'reeling' | 'result' | 'done'>('ready');
const showPrize = ref(false);

const isWin = (t: any) => !!(t?.instant_win && t.instant_win.prize && t.instant_win.prize !== 'NO WIN');
function categoryFor(iw: any) {
    const cats = props.instant_win_categories || [];
    if (!iw) return null;
    return (iw.category_id != null ? cats.find((c: any) => c.id === iw.category_id) : null)
        || cats.find((c: any) => c.name && (c.name === iw.prize || c.name === iw.name)) || null;
}
function buildCasts() {
    casts.value = (props.tickets || []).map((t) => {
        const iw = t?.instant_win; const won = isWin(t); const cat: any = won ? categoryFor(iw) : null;
        return {
            id: t.id ?? t.number, number: String(t.number ?? t.id ?? ''), win: won,
            prize: won ? String(iw.prize) : '',
            value: Number(iw?.value || cat?.value || 0),
            image: iw?.image_path || cat?.image_path || '',
            isBundle: won && ((iw?.prize_type ?? cat?.prize_type) === 'ticket_bundle'),
        };
    });
    index.value = 0; caughtIds.value = []; resetCast(); rebuildSwimmers();
}
const mode = ref<'all' | 'winners' | 'auto'>('all');
const speed = ref<1 | 1.5 | 2>(1);
const playList = computed(() => mode.value === 'winners' ? casts.value.filter((c) => c.win) : casts.value);
const current = computed<Cast | null>(() => playList.value[index.value] ?? null);
const total = computed(() => playList.value.length);
const caught = computed(() => playList.value.slice(0, phase.value === 'done' ? total.value : index.value + (phase.value === 'result' ? 1 : 0)).filter((c) => c.win).length);
const wins = computed(() => casts.value.filter((c) => c.win));

const caughtIds = ref<any[]>([]);
const catKey = (w: any) => String(w.image || w.prize || w.id);
const decoFish = ref<any[]>([]);
function makeSwimmer(id: string, image: string, i: number, chance = false, value = 0) {
    const baseY = 700 + Math.random() * 600;
    return {
        id, image, chance, value,
        color: FISH_PALETTE[i % FISH_PALETTE.length],
        x: 80 + Math.random() * 840, baseY, y: baseY,
        bobAmp: 30 + Math.random() * 80, bobSpeed: 0.3 + Math.random() * 0.5,
        phase: Math.random() * Math.PI * 2, size: 0.9 + Math.random() * 0.5,
        dir: Math.random() < 0.5 ? 1 : -1, speed: 48 + Math.random() * 70,
        hooked: false, caught: false, haloR: 70, haloDelay: -(i * 0.5),
        wDur: 0.5 + (i % 4) * 0.13, wDelay: -(i * 0.17),
    };
}
function rebuildSwimmers() {
    const seen = new Set<string>();
    const distinct = wins.value
        .filter((w) => { const k = catKey(w); if (seen.has(k)) return false; seen.add(k); return true; })
        .filter((w) => wins.value.some((x) => catKey(x) === catKey(w) && !caughtIds.value.includes(x.id)));
    const list: any[] = distinct.map((w, i) => makeSwimmer(catKey(w), w.image || introTitleImage.value || fishImage.value, i, false, Number(w.value) || 0));
    const winKeys = new Set(list.map((s) => s.id));
    const chanceSeen = new Set<string>();
    let ci = list.length;
    for (const c of (props.instant_win_categories || []) as any[]) {
        if (!c || (c.available !== undefined && c.available <= 0)) continue;
        const key = String(c.image_path || c.name || c.id);
        if (winKeys.has(key) || chanceSeen.has(key)) continue;
        chanceSeen.add(key);
        list.push(makeSwimmer('chance:' + key, c.image_path || introTitleImage.value || fishImage.value, ci++, true, Number(c.value) || 0));
        if (list.length >= distinct.length + 8) break;
    }
    if (!list.length) {
        const imgs = fishImgs.value;
        for (let i = 0; i < 5; i++) list.push(makeSwimmer('amb:' + i, imgs.length ? imgs[i % imgs.length] : '', i, true));
    }
    const topVal = Math.max(1, ...list.map((f) => Number(f.value) || 0));
    list.forEach((f) => { f.haloR = 60 + Math.pow(Math.min(1, (Number(f.value) || 0) / topVal), 0.55) * 95; });
    decoFish.value = list;
}
let swimRAF = 0; let swimLast = 0;
function stepSwim(t: number) {
    const dt = swimLast ? Math.min(0.05, (t - swimLast) / 1000) : 0; swimLast = t;
    const v = view.value, left = v.x - 140, right = v.x + v.w + 140;
    for (const sw of decoFish.value) {
        if (sw.hooked) continue;
        sw.x += sw.speed * sw.dir * dt;
        if (sw.x > right) sw.x = left; else if (sw.x < left) sw.x = right;
        sw.y = sw.baseY + Math.sin(t / 1000 * sw.bobSpeed + sw.phase) * sw.bobAmp;
    }
    swimRAF = requestAnimationFrame(stepSwim);
}
function startSwim() { stopSwim(); swimLast = 0; swimRAF = requestAnimationFrame(stepSwim); }
function stopSwim() { if (swimRAF) { cancelAnimationFrame(swimRAF); swimRAF = 0; } }
function respawnOrRemove(sw: any) {
    if (wins.value.some((w) => catKey(w) === sw.id && !caughtIds.value.includes(w.id))) { sw.hooked = false; sw.caught = false; const v = view.value; sw.x = sw.dir === 1 ? v.x - 120 : v.x + v.w + 120; }
    else { decoFish.value = decoFish.value.filter((s) => s !== sw); }
}

const topPrize = computed(() => {
    const list = (props.instant_win_categories || []).filter((c: any) => c && Number(c.value) > 0 && (c.available === undefined || c.available > 0));
    if (!list.length) return null;
    const nonBundle = list.filter((c: any) => c.prize_type !== 'ticket_bundle');
    const pool = nonBundle.length ? nonBundle : list;
    return pool.reduce((best: any, c: any) => (Number(c.value) > Number(best.value) ? c : best));
});
const topPrizeLabel = computed(() => {
    const p: any = topPrize.value; if (!p) return '';
    const name = String(p.name || '').trim(); const v = Number(p.value);
    if (p.prize_type === 'ticket_bundle') return (!v || /ticket/i.test(name)) ? name : `${name ? name + ' · ' : ''}${Math.floor(v)} Free Ticket${v == 1 ? '' : 's'}`;
    const money = v ? `£${v % 1 === 0 ? v : v.toFixed(2)}` : '';
    return (!money || /£\s*\d/.test(name)) ? name : `${name} · ${money}`;
});
const currentValueLabel = computed(() => {
    const p: any = current.value; const v = Number(p?.value || 0); if (!v) return '';
    if (p?.isBundle) return /ticket/i.test(p?.prize || '') ? '' : `${Math.floor(v)} Free Ticket${v == 1 ? '' : 's'}`;
    if (/£\s*\d/.test(p?.prize || '')) return '';
    return `£${v % 1 === 0 ? v : v.toFixed(2)}`;
});

// ── scene anchors + animated state ──
const SURFACE_Y = 580;
const rodTipLocal = computed(() => ({ x: 745, y: -64 }));
const HOOK_REST = { x: 745, y: 400 };
const HOOK_DEPTH = { x: 690, y: 1000 };
const boatWaterline = computed(() => Number(a.value.boatWaterline) || 0);
const boatBaseY = computed(() => SURFACE_Y - 185 + boatWaterline.value);

const SEG = 240;
const waveSpan = computed(() => {
    const v = view.value;
    return { x0: Math.floor((v.x - 480) / 480) * 480, x1: v.x + v.w + 480 };
});
function tiledWave(y: number, a1: number, a2: number) {
    const { x0, x1 } = waveSpan.value;
    let d = `M${x0} ${y}`;
    for (let x = x0, i = 0; x < x1; x += SEG, i++) { const amp = i % 2 ? a2 : a1; d += ` c 53 ${amp} 187 ${amp} ${SEG} 0`; }
    return d;
}
const waveBackPath = computed(() => tiledWave(SURFACE_Y - 4, -50, -76) + ` V${SURFACE_Y + 210} H${waveSpan.value.x0} Z`);
const waveFrontFill = computed(() => tiledWave(SURFACE_Y + 8, -68, -42) + ` V${SURFACE_Y + 210} H${waveSpan.value.x0} Z`);
const waveFrontLine = computed(() => tiledWave(SURFACE_Y + 8, -68, -42));
function seabed(top: number) {
    const v = view.value, x0 = v.x - 200, x1 = v.x + v.w + 200, floor = bg.value.floor;
    let d = `M${x0} ${top} q 250 -64 500 0`;
    for (let x = x0 + 500; x < x1; x += 500) d += ` t 500 0`;
    return d + ` V${floor} H${x0} Z`;
}
const sandPath = computed(() => seabed(bg.value.floor - 118));
const ridgePath = computed(() => seabed(bg.value.floor - 165));
const scene = reactive({ rodAngle: 0, hookX: HOOK_REST.x, hookY: HOOK_REST.y, fishO: 0, fishX: HOOK_DEPTH.x, fishY: HOOK_DEPTH.y });
const boat = reactive({ rot: 0, y: 0, x: 0, sy: 1 });
const sunSpin = reactive({ a: 0 });
let ambient: gsap.core.Timeline | null = null;
let castTl: gsap.core.Timeline | null = null;

function startAmbient() {
    stopAmbient();
    ambient = gsap.timeline();
    gsap.to(sunSpin, { a: 360, duration: 70, repeat: -1, ease: 'none' });
    gsap.to(boat, { rot: 2.6, duration: 2.9, repeat: -1, yoyo: true, ease: 'sine.inOut' });
    gsap.to(boat, { y: 12, duration: 3.5, repeat: -1, yoyo: true, ease: 'sine.inOut' });
    gsap.fromTo(boat, { x: -75 }, { x: 75, duration: 8, repeat: -1, yoyo: true, ease: 'sine.inOut' });
    gsap.to(boat, { sy: 1.04, duration: 3.4, repeat: -1, yoyo: true, ease: 'sine.inOut' });
}
function stopAmbient() { gsap.killTweensOf([sunSpin, boat]); ambient?.kill(); ambient = null; }
function resetCast() {
    castTl?.kill(); castTl = null;
    phase.value = 'ready'; showPrize.value = false;
    Object.assign(scene, { rodAngle: 0, hookX: HOOK_REST.x, hookY: HOOK_REST.y, fishO: 0, fishX: HOOK_DEPTH.x, fishY: HOOK_DEPTH.y });
}
const rodTip = computed(() => {
    const ra = (scene.rodAngle || 0) * Math.PI / 180, rc = Math.cos(ra), rs = Math.sin(ra);
    const RT = rodTipLocal.value;
    let lx = (RT.x - 527) * rc - (RT.y - 24) * rs + 527;
    let ly = (RT.x - 527) * rs + (RT.y - 24) * rc + 24;
    lx -= 500;
    ly = (ly + boat.y) * boat.sy;
    const r = boat.rot * Math.PI / 180, c = Math.cos(r), s = Math.sin(r);
    return { x: lx * c - ly * s + 500 + boat.x, y: lx * s + ly * c + boatBaseY.value };
});
const linePath = computed(() => { const rt = rodTip.value; return `M ${rt.x} ${rt.y} Q ${(rt.x + scene.hookX) / 2} ${(rt.y + scene.hookY) / 2 + 18}, ${scene.hookX} ${scene.hookY}`; });

function castNow() {
    if (phase.value !== 'ready') return;
    if (!current.value) { finish(); return; }
    const c = current.value;
    let target = c.win ? decoFish.value.find((sw) => sw.id === catKey(c) && !sw.hooked && !sw.chance) : null;
    if (c.win && !target) {
        target = { id: catKey(c), image: c.image || introTitleImage.value || fishImage.value, color: FISH_PALETTE[0],
                   x: 120 + Math.random() * 760, baseY: 760, y: 760, bobAmp: 0, bobSpeed: 0, phase: 0,
                   size: 1.1, dir: 1, speed: 0, hooked: true, wDur: 0.6, wDelay: 0 };
        decoFish.value.push(target);
    }
    let tx: number, ty: number;
    if (target) {
        target.hooked = true;
        tx = Math.max(150, Math.min(850, target.x));
        ty = Math.max(640, Math.min(1340, target.y));
        target.x = tx; target.y = ty;
    } else {
        tx = 260 + Math.round(Math.random() * 480);
        ty = 880 + Math.round(Math.random() * 460);
    }
    play(a.value.castSound);
    phase.value = 'casting';
    castTl?.kill();
    const tl = gsap.timeline(); castTl = tl; tl.timeScale(speed.value);
    tl.to(scene, { rodAngle: -28, duration: 0.22, ease: 'power2.out' })
      .to(scene, { rodAngle: 22, duration: 0.16, ease: 'power3.in' });
    tl.to(scene, { hookX: tx, duration: 0.9, ease: 'power1.inOut' }, '<')
      .to(scene, { hookY: SURFACE_Y - 6, duration: 0.32, ease: 'power2.out' }, '<')
      .add(() => play(a.value.splashSound))
      .to(scene, { hookY: ty, duration: 1.1, ease: 'power1.in' });
    tl.to(scene, { rodAngle: 4, duration: 0.4, ease: 'sine.out' }, '<');
    tl.add(() => { phase.value = 'waiting'; });
    tl.to(scene, { hookY: ty + 16, duration: 0.5, repeat: 1, yoyo: true, ease: 'sine.inOut' });
    if (target) tl.to(target, { y: ty + 16, duration: 0.5, repeat: 1, yoyo: true, ease: 'sine.inOut' }, '<');
    tl.add(() => { phase.value = 'reeling'; play(a.value.reelSound); if (target) target.caught = true; });
    if (target) {
        tl.to(scene, { hookX: HOOK_REST.x, hookY: HOOK_REST.y + 30, duration: 1.2, ease: 'power2.inOut',
                       onUpdate: () => { target.x = scene.hookX; target.y = scene.hookY + 22; } });
    } else {
        tl.to(scene, { hookX: HOOK_REST.x, hookY: HOOK_REST.y, duration: 1.2, ease: 'power2.inOut' });
    }
    tl.add(() => {
        phase.value = 'result';
        play(c.win ? a.value.winSound : a.value.lossSound);
        if (c.win) { showPrize.value = true; if (!caughtIds.value.includes(c.id)) caughtIds.value.push(c.id); if (target) respawnOrRemove(target); }
        if (mode.value === 'auto') { clearAuto(); autoTimer = setTimeout(() => next(), (c.win ? 1700 : 750) / speed.value); }
    });
}
function next() {
    clearAuto();
    showPrize.value = false;
    if (index.value < total.value - 1) { index.value += 1; resetCast(); }
    else { finish(); return; }
    if (mode.value === 'auto') { autoTimer = setTimeout(() => castNow(), 500 / speed.value); }
}
function finish() { phase.value = 'done'; showPrize.value = false; emit('wins-collected', wins.value.map((w) => ({ prize: w.prize, value: w.value }))); }
const prompt = computed(() => phase.value === 'ready' ? titleText.value
    : phase.value === 'casting' ? 'Casting…' : phase.value === 'waiting' ? 'Wait for a bite…'
    : phase.value === 'reeling' ? 'Reel it in!' : phase.value === 'result' ? (current.value?.win ? winText.value : loseText.value) : '');

let audio: HTMLAudioElement | null = null;
function play(src?: string) { if (!src || props.demoMode) return; try { audio = new Audio(src); audio.volume = 0.85; void audio.play(); } catch { /* */ } }
function playWelcome() {
    if (a.value.welcomeSound) { play(a.value.welcomeSound); return; }
    if (!introVoiceEnabled.value || typeof window === 'undefined' || !window.speechSynthesis) return;
    try { const u = new SpeechSynthesisUtterance(welcomeMsg.value); u.rate = 1; u.pitch = 1.05; window.speechSynthesis.cancel(); window.speechSynthesis.speak(u); } catch { /* */ }
}
function cancelSpeech() { try { window.speechSynthesis?.cancel(); } catch { /* */ } }
const introCard = ref<HTMLElement | null>(null);
let autoTimer: ReturnType<typeof setTimeout> | null = null;
function clearAuto() { if (autoTimer) { clearTimeout(autoTimer); autoTimer = null; } }
let demoTimer: ReturnType<typeof setTimeout> | null = null;
function clearDemo() { if (demoTimer) { clearTimeout(demoTimer); demoTimer = null; } }
function startGame() {
    clearDemo();
    showIntro.value = false;
    index.value = 0; resetCast();
    if (mode.value === 'winners' && !playList.value.length) { finish(); return; }
    if (mode.value === 'auto') { clearAuto(); autoTimer = setTimeout(() => castNow(), 500 / speed.value); }
}

watch(() => props.tickets, buildCasts, { immediate: true, deep: true });
watch(() => props.modelValue, (open) => {
    if (open) {
        mode.value = 'all'; clearAuto(); clearDemo(); buildCasts(); startAmbient(); startSwim();
        showIntro.value = introEnabled.value;
        if (showIntro.value && !props.demoMode) playWelcome();
        if (props.demoMode) demoTimer = setTimeout(() => { mode.value = 'auto'; startGame(); }, introEnabled.value ? 2200 : 500);
    } else { stopAmbient(); stopSwim(); castTl?.kill(); clearAuto(); clearDemo(); cancelSpeech(); }
}, { immediate: true });
watch(phase, (p) => { if (props.demoMode && p === 'done') { clearDemo(); demoTimer = setTimeout(() => { buildCasts(); mode.value = 'auto'; startGame(); }, 1600); } });
watch(showIntro, (on) => {
    if (!on) return;
    nextTick(() => {
        const el = introCard.value; if (!el) return;
        gsap.killTweensOf(el);
        const tl = gsap.timeline();
        tl.from(el, { scale: 0.3, opacity: 0, duration: 0.45, ease: 'back.out(2.2)' })
          .to(el, { scale: 1.04, duration: 0.1, yoyo: true, repeat: 1, ease: 'sine.inOut' })
          .from(el.querySelectorAll('.fsh-intro-logo, .fsh-intro-welcome, .fsh-set-label'), { y: 16, opacity: 0, duration: 0.3, stagger: 0.05, ease: 'power2.out' }, '-=0.3')
          .from(el.querySelectorAll('.fsh-chip'), { y: 22, scale: 0.7, opacity: 0, duration: 0.32, stagger: 0.05, ease: 'back.out(2)' }, '-=0.18')
          .from(el.querySelector('.fsh-intro-start'), { y: 20, opacity: 0, duration: 0.3, ease: 'back.out(2)' }, '-=0.06');
    });
});
watch(() => a.value.boatImage, () => { boatOk.value = true; });
watch(introEnabled, (on) => { if (props.demoMode) showIntro.value = on; });
onBeforeUnmount(() => { stopAmbient(); stopSwim(); castTl?.kill(); clearAuto(); clearDemo(); cancelSpeech(); stageRO?.disconnect(); });
function close() {
    clearAuto(); cancelSpeech();
    if (props.demoMode) {
        mode.value = 'all'; speed.value = 1; buildCasts(); showIntro.value = introEnabled.value;
        return;
    }
    stopAmbient();
    emit('update:modelValue', false);
}
</script>

<template>
    <teleport to="body" :disabled="demoMode">
        <div v-if="modelValue || demoMode" class="fsh-root" :class="frameClass">
            <div class="fsh-frame">
                <button v-if="!demoMode" class="fsh-close" @click="close" aria-label="Close">✕</button>

                <div class="fsh-hud">
                    <div class="fsh-hud-left">CAST {{ Math.min(index + 1, total) }}/{{ total }} · 🎣 {{ caught }}</div>
                    <div class="fsh-hud-title" :style="{ color: textColor }">{{ gameName || 'Fishing' }}</div>
                </div>
                <div v-if="showTopPrize && topPrizeLabel" class="fsh-topprize" :style="{ borderColor: accent }">
                    <span class="fsh-topprize-pill" :style="{ background: accent }">£</span>
                    <span class="fsh-topprize-val"><b :style="{ color: accent }">TOP PRIZE</b> {{ topPrizeLabel }}</span>
                </div>

                <div ref="stageEl" class="fsh-stage" @click="phase === 'ready' && mode !== 'auto' && castNow()">
                    <svg class="fsh-svg" :viewBox="sceneViewBox" preserveAspectRatio="xMidYMid slice">
                        <defs>
                            <linearGradient id="fsh-sky" x1="0" y1="0" x2="0" y2="1"><stop offset="0" :stop-color="pal.skyTop" /><stop offset="1" :stop-color="pal.skyBot" /></linearGradient>
                            <linearGradient id="fsh-deep" x1="0" y1="0" x2="0" y2="1"><stop offset="0" :stop-color="pal.surfTop" /><stop offset="0.25" :stop-color="pal.deepTop" /><stop offset="1" :stop-color="pal.deepBot" /></linearGradient>
                            <radialGradient id="fsh-sun" cx="0.5" cy="0.5" r="0.5"><stop offset="0" :stop-color="pal.sun" /><stop offset="0.55" :stop-color="pal.glow" /><stop offset="1" :stop-color="pal.glow" stop-opacity="0" /></radialGradient>
                            <linearGradient id="fsh-ray" x1="0" y1="0" x2="0" y2="1"><stop offset="0" :stop-color="pal.glow" stop-opacity="0.28" /><stop offset="1" :stop-color="pal.glow" stop-opacity="0" /></linearGradient>
                            <filter id="fsh-glow" x="-60%" y="-60%" width="220%" height="220%"><feDropShadow dx="0" dy="0" stdDeviation="7" :flood-color="pal.glow" flood-opacity="0.9" /></filter>
                            <filter id="fsh-ripple" x="-8%" y="-8%" width="116%" height="116%">
                                <feTurbulence type="fractalNoise" baseFrequency="0.01 0.018" numOctaves="2" seed="5" result="n"><animate attributeName="baseFrequency" dur="13s" values="0.01 0.018;0.017 0.032;0.01 0.018" repeatCount="indefinite" /></feTurbulence>
                                <feDisplacementMap in="SourceGraphic" in2="n" scale="36" xChannelSelector="R" yChannelSelector="G" result="d" />
                                <feGaussianBlur in="d" stdDeviation="1.2" />
                            </filter>
                            <filter id="fsh-ripple-fish" x="-60%" y="-60%" width="220%" height="220%">
                                <feTurbulence type="fractalNoise" baseFrequency="0.02 0.03" numOctaves="2" seed="9" result="n"><animate attributeName="baseFrequency" dur="8s" values="0.02 0.03;0.03 0.044;0.02 0.03" repeatCount="indefinite" /></feTurbulence>
                                <feDisplacementMap in="SourceGraphic" in2="n" scale="15" xChannelSelector="R" yChannelSelector="G" result="d" />
                                <feDropShadow in="d" dx="0" dy="0" stdDeviation="7" :flood-color="pal.glow" flood-opacity="0.8" />
                            </filter>
                            <filter id="fsh-fishglow" x="-55%" y="-55%" width="210%" height="210%">
                                <feDropShadow dx="0" dy="0" stdDeviation="8" :flood-color="pal.glow" flood-opacity="0.75" />
                            </filter>
                            <filter id="fsh-catchglow" x="-160%" y="-160%" width="420%" height="420%">
                                <feDropShadow dx="0" dy="0" stdDeviation="18" :flood-color="accent" flood-opacity="0.98" result="s1" />
                                <feDropShadow in="s1" dx="0" dy="0" stdDeviation="46" :flood-color="accent" flood-opacity="0.55" />
                            </filter>
                            <radialGradient id="fsh-halo" cx="0.5" cy="0.5" r="0.5"><stop offset="0" :stop-color="accent" stop-opacity="0.6" /><stop offset="0.45" :stop-color="accent" stop-opacity="0.3" /><stop offset="1" :stop-color="accent" stop-opacity="0" /></radialGradient>
                            <linearGradient id="fsh-blend" x1="0" y1="0" x2="0" y2="1"><stop offset="0" :stop-color="pal.surfBot" stop-opacity="0.95" /><stop offset="0.5" :stop-color="pal.surfBot" stop-opacity="0.35" /><stop offset="1" :stop-color="pal.surfBot" stop-opacity="0" /></linearGradient>
                            <clipPath id="fsh-underclip"><rect :x="bg.x" :y="SURFACE_Y" :width="bg.w" :height="bg.bottom - SURFACE_Y" /></clipPath>
                            <linearGradient id="fsh-depth" x1="0" y1="0" x2="0" y2="1"><stop offset="0" :stop-color="pal.deepBot" stop-opacity="0" /><stop offset="0.55" :stop-color="pal.deepBot" stop-opacity="0" /><stop offset="1" :stop-color="pal.deepBot" stop-opacity="0.6" /></linearGradient>
                            <linearGradient id="fsh-surf-a" x1="0" y1="0" x2="0" y2="1"><stop offset="0" :stop-color="pal.surfTop" stop-opacity="0.92" /><stop offset="1" :stop-color="pal.surfTop" stop-opacity="0" /></linearGradient>
                            <linearGradient id="fsh-surf-b" x1="0" y1="0" x2="0" y2="1"><stop offset="0" :stop-color="pal.surfBot" stop-opacity="0.85" /><stop offset="1" :stop-color="pal.surfBot" stop-opacity="0" /></linearGradient>
                        </defs>

                        <rect :x="bg.x" :y="bg.top" :width="bg.w" :height="SURFACE_Y - bg.top + 20" fill="url(#fsh-sky)" />
                        <g v-if="sunEnabled" transform="translate(815 120)">
                            <g class="fsh-sunglow">
                                <circle r="158" fill="url(#fsh-sun)" opacity="0.38" />
                                <circle r="104" fill="url(#fsh-sun)" opacity="0.6" />
                            </g>
                            <image v-if="sunImage" :href="sunImage" x="-90" y="-90" width="180" height="180" preserveAspectRatio="xMidYMid meet" filter="url(#fsh-glow)" />
                            <g v-else filter="url(#fsh-glow)">
                                <g :transform="`rotate(${sunSpin.a})`" opacity="0.5"><rect v-for="r in 12" :key="'ray'+r" x="-3" y="-150" width="6" height="56" rx="3" :fill="pal.sun" :transform="`rotate(${r*30})`" /></g>
                                <circle r="54" :fill="pal.sun" />
                            </g>
                        </g>
                        <g v-if="cloudsEnabled" :fill="pal.foam">
                            <g class="fsh-cloud fsh-cloud-a"><ellipse cx="0" cy="0" rx="60" ry="26" /><ellipse cx="48" cy="9" rx="42" ry="22" /><ellipse cx="-46" cy="10" rx="38" ry="20" /></g>
                            <g class="fsh-cloud fsh-cloud-b" opacity="0.8"><ellipse cx="0" cy="0" rx="46" ry="20" /><ellipse cx="38" cy="7" rx="34" ry="17" /></g>
                        </g>

                        <image v-if="underwaterImage" :href="underwaterImage" :x="bg.x" :y="SURFACE_Y - 16" :width="bg.w" :height="bg.bottom - SURFACE_Y + 16" preserveAspectRatio="xMidYMid slice" filter="url(#fsh-ripple)" clip-path="url(#fsh-underclip)" />
                        <template v-else>
                            <rect :x="bg.x" :y="SURFACE_Y" :width="bg.w" :height="bg.bottom - SURFACE_Y" fill="url(#fsh-deep)" />
                            <g opacity="0.55"><polygon :points="`700,${SURFACE_Y} 760,${SURFACE_Y} 1020,1180 880,1180`" fill="url(#fsh-ray)" /><polygon :points="`320,${SURFACE_Y} 380,${SURFACE_Y} 240,1180 120,1180`" fill="url(#fsh-ray)" /></g>
                            <path :d="ridgePath" :fill="pal.deepBot" opacity="0.55" />
                            <path :d="sandPath" :fill="pal.sand" />
                            <g :fill="pal.deepBot" opacity="0.8"><ellipse cx="170" :cy="bg.floor-100" rx="62" ry="26" /><ellipse cx="830" :cy="bg.floor-92" rx="74" ry="30" /><ellipse cx="540" :cy="bg.floor-80" rx="42" ry="17" /></g>
                            <g :fill="pal.weed">
                                <g v-for="w in weeds" :key="'w'+w.id" class="fsh-weed" :style="{ '--delay': w.delay+'s' }" :transform="`translate(${w.x} ${bg.floor-108})`"><path :d="`M0 0 q-14 ${-w.h*0.5} 2 ${-w.h} q14 ${w.h*0.4} -2 0 Z`" /></g>
                            </g>
                        </template>
                        <rect :x="bg.x" :y="SURFACE_Y" :width="bg.w" height="180" fill="url(#fsh-blend)" />
                        <rect :x="bg.x" :y="SURFACE_Y" :width="bg.w" :height="bg.bottom - SURFACE_Y" fill="url(#fsh-depth)" />
                        <g class="fsh-caustics" :fill="pal.foam">
                            <ellipse class="fsh-caustic c1" cx="300" :cy="SURFACE_Y+150" rx="250" ry="22" />
                            <ellipse class="fsh-caustic c2" cx="720" :cy="SURFACE_Y+330" rx="290" ry="26" />
                            <ellipse class="fsh-caustic c3" cx="430" :cy="SURFACE_Y+540" rx="230" ry="20" />
                        </g>
                        <g v-for="f in decoFish" :key="f.id" :transform="`translate(${f.x} ${f.y})`">
                            <circle class="fsh-prizehalo" :r="f.haloR" :style="{ animationDelay: f.haloDelay.toFixed(2) + 's' }" fill="url(#fsh-halo)" />
                            <g v-if="f.caught" class="fsh-catch-fx" :fill="accent">
                                <circle class="fsh-catch-ring" r="70" fill="none" :stroke="accent" stroke-width="4" />
                                <g v-for="s in 8" :key="'s'+s" :transform="`rotate(${s * 45}) translate(0 -76)`">
                                    <path class="fsh-spark" :style="{ animationDelay: (s * 0.09).toFixed(2) + 's' }" d="M0 -11 L3 -3 L11 0 L3 3 L0 11 L-3 3 L-11 0 L-3 -3 Z" />
                                </g>
                            </g>
                            <g :transform="`scale(${(f.image ? 1 : f.dir * fishFaceSign) * f.size} ${f.size})`">
                                <g class="fsh-wiggle" :style="{ animationDuration: f.wDur.toFixed(2) + 's', animationDelay: f.wDelay.toFixed(2) + 's' }">
                                    <g v-if="f.image" :filter="f.caught ? 'url(#fsh-catchglow)' : 'url(#fsh-fishglow)'"><foreignObject x="-52" y="-38" width="104" height="76"><img :src="f.image" style="width:100%;height:100%;object-fit:contain" alt="" /></foreignObject></g>
                                    <g v-else :filter="f.caught ? 'url(#fsh-catchglow)' : 'url(#fsh-ripple-fish)'">
                                        <ellipse cx="0" cy="0" rx="26" ry="14" :fill="f.color" />
                                        <path d="M-22 0 l-20 -13 v26 z" :fill="f.color" />
                                        <circle cx="14" cy="-3" r="3" fill="#10202e" />
                                    </g>
                                </g>
                            </g>
                        </g>
                        <circle v-for="b in bubbles" :key="'b'+b.id" class="fsh-bubble" :cx="b.x" :cy="bg.floor - 120" :r="b.r" :fill="pal.foam" :style="{ '--dur': b.dur+'s', '--delay': b.delay+'s' }" />

                        <path :d="linePath" fill="none" :stroke="textColor" stroke-width="2" opacity="0.85" />
                        <g :transform="`translate(${scene.hookX} ${scene.hookY})`">
                            <path d="M0 0 v16 a9 9 0 1 0 9 -9" fill="none" :stroke="textColor" stroke-width="3" stroke-linecap="round" />
                        </g>

                        <g class="fsh-wave fsh-wave-back"><path :d="waveBackPath" fill="url(#fsh-surf-a)" /></g>

                        <g :transform="`translate(${500 + boat.x} ${boatBaseY}) rotate(${boat.rot}) scale(1 ${boat.sy}) translate(-500 ${boat.y})`">
                            <foreignObject v-if="boatImage && boatOk" x="90" y="-150" width="820" height="385"><img :src="boatImage" style="width:100%;height:100%;object-fit:contain;object-position:center bottom" alt="" @error="boatOk = false" /></foreignObject>
                            <g v-else>
                                <path d="M250 150 q250 96 500 0 l-58 104 q-190 70 -384 0 z" :fill="primary" />
                                <path d="M250 150 q250 96 500 0 l-12 22 q-238 86 -476 0 z" fill="#fff" opacity="0.22" />
                            </g>
                            <foreignObject v-if="fishermanSheet" x="452" y="-118" width="150" height="180"><SpriteCharacter :sheet="fishermanSheet" :frames="fishermanFrames" :frame="0" :chroma-key="spriteChroma" /></foreignObject>
                            <g v-else transform="translate(540 30)">
                                <rect x="-16" y="-4" width="34" height="20" rx="7" fill="#34495e" />
                                <path d="M-16 -4 q16 -14 32 0 l-5 -46 q-11 -8 -22 0 z" :fill="primary" />
                                <circle cx="0" cy="-58" r="15" fill="#e9b489" />
                                <path d="M-15 -62 a15 10 0 0 1 30 0 z" fill="#caa15e" /><rect x="-19" y="-63" width="38" height="5" rx="2" fill="#caa15e" />
                            </g>
                            <g :transform="`rotate(${scene.rodAngle} 527 24)`">
                                <line x1="527" y1="24" :x2="rodTipLocal.x" :y2="rodTipLocal.y" stroke="#6d4c33" stroke-width="7" stroke-linecap="round" />
                                <circle :cx="rodTipLocal.x" :cy="rodTipLocal.y" r="4" :fill="accent" />
                            </g>
                        </g>

                        <g class="fsh-wave fsh-wave-front"><path :d="waveFrontFill" fill="url(#fsh-surf-b)" /></g>
                        <g class="fsh-wave fsh-wave-front"><path :d="waveFrontLine" fill="none" :stroke="pal.foam" stroke-width="6" stroke-linecap="round" opacity="0.6" /></g>
                    </svg>

                    <div class="fsh-prompt" :style="{ color: textColor }">{{ prompt }}</div>
                    <div class="fsh-controls">
                        <button v-if="phase === 'ready' && mode !== 'auto'" class="fsh-cta fsh-cast-pulse" :style="{ background: accent }" @click="castNow">CAST 🎣</button>
                        <button v-else-if="phase === 'result' && current && !current.win && mode !== 'auto'" class="fsh-cta" :style="{ background: primary, color: textColor }" @click="next">{{ index < total - 1 ? 'Cast again →' : 'Finish' }}</button>
                        <button v-if="!demoMode && phase !== 'done'" class="fsh-skip" @click="finish">Skip remaining</button>
                    </div>
                </div>

                <transition name="fsh-fade">
                    <div v-if="showIntro" class="fsh-overlay fsh-intro">
                        <div class="fsh-dive-bubbles">
                            <span v-for="n in 16" :key="n" class="fsh-dive-bub" :style="{ left: ((n * 61) % 100) + '%', width: (7 + ((n * 5) % 5) * 3) + 'px', animationDelay: (-((n * 0.37) % 4)).toFixed(2) + 's', animationDuration: (2.3 + ((n * 7) % 10) * 0.16).toFixed(2) + 's' }" />
                        </div>
                        <div ref="introCard" class="fsh-intro-card" :style="{ '--glow': accent, borderColor: accent }">
                            <img v-if="introTitleImage" :src="introTitleImage" class="fsh-intro-logo" alt="" />
                            <div class="fsh-intro-welcome" :style="{ color: textColor }">{{ welcomeMsg }}</div>
                            <div class="fsh-intro-sub">{{ introSubtitle }}</div>
                            <div class="fsh-set-label">Choose your settings</div>
                            <div class="fsh-chip-row">
                                <button class="fsh-chip" :style="mode !== 'auto' ? { borderColor: accent, background: accent, color: '#06223a' } : {}" @click="mode = 'all'">🎣 Manual</button>
                                <button class="fsh-chip" :style="mode === 'auto' ? { borderColor: accent, background: accent, color: '#06223a' } : {}" @click="mode = 'auto'">⚡ Auto</button>
                            </div>
                            <div class="fsh-set-label">Speed</div>
                            <div class="fsh-chip-row">
                                <button class="fsh-chip" :style="speed === 1 ? { borderColor: accent, background: accent, color: '#06223a' } : {}" @click="speed = 1">1×</button>
                                <button class="fsh-chip" :style="speed === 1.5 ? { borderColor: accent, background: accent, color: '#06223a' } : {}" @click="speed = 1.5">1.5×</button>
                                <button class="fsh-chip" :style="speed === 2 ? { borderColor: accent, background: accent, color: '#06223a' } : {}" @click="speed = 2">2×</button>
                            </div>
                            <button class="fsh-cta fsh-intro-start fsh-cast-pulse" :style="{ background: accent }" @click="startGame">{{ introButtonText }}</button>
                        </div>
                    </div>
                </transition>
                <transition name="fsh-fade">
                    <div v-if="showPrize && current" class="fsh-overlay">
                        <div class="fsh-card" :style="{ borderColor: accent }">
                            <div class="fsh-card-top" :style="{ color: accent }">{{ winText }}</div>
                            <div class="fsh-card-visual"><img v-if="current.image" :src="current.image" alt="prize" /><span v-else>🏆</span></div>
                            <div class="fsh-card-name" :style="{ color: accent }">{{ current.prize }}</div>
                            <div v-if="currentValueLabel" class="fsh-card-val" :style="{ color: textColor }">{{ currentValueLabel }}</div>
                            <button class="fsh-cta" :style="{ background: primary, color: textColor }" @click="next">{{ index < total - 1 ? 'Next cast →' : 'Collect 🎉' }}</button>
                        </div>
                    </div>
                </transition>
                <transition name="fsh-fade">
                    <div v-if="phase === 'done'" class="fsh-overlay">
                        <div class="fsh-card" :style="{ borderColor: accent }">
                            <div class="fsh-card-top" :style="{ color: accent }">{{ wins.length ? 'All cast!' : 'All cast' }}</div>
                            <template v-if="wins.length">
                                <div class="fsh-card-name" :style="{ color: textColor }">You landed {{ caught }} {{ caught === 1 ? 'catch' : 'catches' }}! 🎣</div>
                                <ul class="fsh-winlist"><li v-for="(w, i) in wins" :key="i" :style="{ color: textColor }"><span :style="{ color: accent }">🐟</span> {{ w.prize }}<span v-if="w.isBundle && w.value && !/ticket/i.test(w.prize)"> — {{ Math.floor(w.value) }} Free Ticket{{ w.value == 1 ? '' : 's' }}</span><span v-else-if="w.value && !w.isBundle"> — £{{ w.value }}</span></li></ul>
                            </template>
                            <div v-else class="fsh-card-name" :style="{ color: textColor }">No catch this time — tight lines next round! 🎣</div>
                            <button class="fsh-cta" :style="{ background: primary, color: textColor }" @click="close">Close</button>
                        </div>
                    </div>
                </transition>
            </div>
        </div>
    </teleport>
</template>

<style scoped>
.fsh-root { position: fixed; inset: 0; z-index: 9999; display: flex; align-items: center; justify-content: center; background: #07203a; padding: 0; }
.fsh-root.is-mobile, .fsh-root.is-desktop { position: relative; inset: auto; background: transparent; padding: 0; }
.fsh-frame { position: relative; width: 100%; height: 100%; overflow: hidden; background: #07203a; }
.is-mobile .fsh-frame, .is-desktop .fsh-frame { width: auto; height: min(660px, 84vh); max-width: 94vw; border-radius: 18px; box-shadow: 0 24px 60px rgba(0,0,0,.5); transition: height .28s ease, width .28s ease; }
.is-mobile .fsh-frame { aspect-ratio: 1000 / 1500; }
.is-desktop .fsh-frame { height: min(560px, 80vh); aspect-ratio: 1500 / 1000; }
.fsh-preview-toggle { position: absolute; top: 8px; left: 50%; transform: translateX(-50%); z-index: 20; display: flex; gap: 6px; align-items: center; background: rgba(0,0,0,.5); padding: 5px 9px; border-radius: 10px; color: #fff; font-size: 12px; }
.fsh-preview-toggle button { padding: 3px 9px; border-radius: 7px; background: #2a3a4f; color: #cdd8e6; }
.fsh-preview-toggle button.on { background: #2f7fff; color: #fff; }
.fsh-close { position: absolute; top: 10px; right: 12px; z-index: 20; width: 34px; height: 34px; border-radius: 50%; background: rgba(0,0,0,.45); color: #fff; font-size: 15px; }
.fsh-hud { position: absolute; top: 0; left: 0; right: 0; z-index: 12; display: flex; justify-content: space-between; align-items: center; padding: 0.7rem 0.9rem; pointer-events: none; }
.fsh-hud-left { font-size: 0.72rem; font-weight: 800; letter-spacing: .4px; color: rgba(255,255,255,.9); text-transform: uppercase; }
.fsh-hud-title { font-size: 1.05rem; font-weight: 900; text-shadow: 0 2px 8px rgba(0,0,0,.5); }
.fsh-topprize { position: absolute; top: 2.5rem; left: 50%; transform: translateX(-50%); z-index: 12; display: flex; align-items: center; gap: 8px; background: rgba(6,14,26,.72); border: 2px solid; border-radius: 999px; padding: 5px 14px 5px 5px; }
.fsh-topprize-pill { width: 26px; height: 26px; border-radius: 8px; display: grid; place-items: center; font-weight: 900; color: #06223a; }
.fsh-topprize-val { font-size: 0.78rem; font-weight: 700; color: #fff; white-space: nowrap; }
.fsh-stage { position: absolute; inset: 0; }
.fsh-svg { width: 100%; height: 100%; display: block; }
.fsh-prompt { position: absolute; bottom: 4.8rem; left: 0; right: 0; text-align: center; font-size: 1.05rem; font-weight: 800; text-shadow: 0 2px 8px rgba(0,0,0,.7); pointer-events: none; }
.fsh-controls { position: absolute; bottom: 1.1rem; left: 0; right: 0; display: flex; flex-direction: column; align-items: center; gap: 8px; }
.fsh-cta { padding: 0.7rem 1.9rem; border-radius: 12px; font-weight: 900; font-size: 1rem; color: #06223a; box-shadow: 0 8px 20px rgba(0,0,0,.4); transition: transform .12s; }
.fsh-cta:active { transform: scale(.95); }
.fsh-skip { font-size: 0.78rem; color: rgba(255,255,255,.7); text-decoration: underline; }
.fsh-overlay { position: absolute; inset: 0; z-index: 16; display: flex; flex-direction: column; align-items: center; justify-content: center; gap: 12px; background: rgba(4,12,22,.62); backdrop-filter: blur(2px); padding: 1.2rem; text-align: center; }
.fsh-card { background: rgba(8,22,38,.95); border: 2px solid; border-radius: 18px; padding: 1.4rem 1.6rem; display: flex; flex-direction: column; align-items: center; gap: 10px; max-width: 86%; box-shadow: 0 18px 50px rgba(0,0,0,.55); }
.fsh-card-top { font-size: 1.3rem; font-weight: 900; }
.fsh-card-visual { width: 92px; height: 92px; display: grid; place-items: center; font-size: 3rem; }
.fsh-card-visual img { max-width: 100%; max-height: 100%; object-fit: contain; }
.fsh-card-name { font-size: 1.15rem; font-weight: 900; }
.fsh-card-val { font-size: 1rem; font-weight: 700; }
.fsh-winlist { list-style: none; padding: 0; margin: 4px 0; display: flex; flex-direction: column; gap: 5px; font-size: 0.9rem; font-weight: 700; }
.fsh-intro-logo { max-width: 60%; max-height: 110px; object-fit: contain; }
.fsh-intro-welcome { font-size: 1.4rem; font-weight: 900; text-shadow: 0 2px 10px rgba(0,0,0,.6); }
.fsh-intro-sub { font-size: 0.9rem; color: rgba(255,255,255,.85); }
.fsh-intro { overflow: hidden; }
.fsh-intro-card { position: relative; z-index: 2; background: rgba(6,18,32,.9); border: 2px solid; border-radius: 22px; padding: 1.3rem 1.3rem 1.5rem; display: flex; flex-direction: column; align-items: center; gap: 6px; max-width: 92%; --glow: #ffd54f; animation: fsh-glow-pulse 2.6s ease-in-out infinite; }
@keyframes fsh-glow-pulse { 0%,100% { box-shadow: 0 0 20px -6px var(--glow); } 50% { box-shadow: 0 0 48px 0 var(--glow); } }
.fsh-set-label { margin-top: 10px; font-size: 0.72rem; font-weight: 800; letter-spacing: .8px; text-transform: uppercase; color: rgba(255,255,255,.62); }
.fsh-chip-row { display: flex; gap: 8px; width: 100%; justify-content: center; }
.fsh-chip { flex: 1; padding: 0.5rem 0.5rem; border-radius: 12px; border: 2px solid rgba(255,255,255,.18); background: rgba(255,255,255,.07); color: #fff; font-weight: 800; font-size: 0.82rem; cursor: pointer; transition: transform .12s, background .15s, border-color .15s; }
.fsh-chip:hover { background: rgba(255,255,255,.16); }
.fsh-chip:active { transform: scale(.95); }
.fsh-intro-start { margin-top: 14px; width: 100%; }
.fsh-dive-bubbles { position: absolute; inset: 0; pointer-events: none; overflow: hidden; }
.fsh-dive-bub { position: absolute; bottom: -24px; aspect-ratio: 1; border-radius: 50%; background: rgba(255,255,255,.28); animation: fsh-dive-rise linear infinite; }
@keyframes fsh-dive-rise { 0% { transform: translateY(0) scale(.5); opacity: 0; } 12% { opacity: .5; } 100% { transform: translateY(-115vh) scale(1.1); opacity: 0; } }
.fsh-cast-pulse { animation: fsh-cast-pulse 1.5s ease-in-out infinite; }
@keyframes fsh-cast-pulse { 0%,100% { transform: scale(1); box-shadow: 0 6px 16px rgba(0,0,0,.4); } 50% { transform: scale(1.05); box-shadow: 0 8px 28px 1px rgba(255,255,255,.45); } }
.fsh-fade-enter-active, .fsh-fade-leave-active { transition: opacity .3s; }
.fsh-fade-enter-from, .fsh-fade-leave-to { opacity: 0; }
.fsh-cloud { animation: fsh-drift-cloud linear infinite; }
.fsh-cloud-a { animation-duration: 46s; transform: translate(200px, 110px); }
.fsh-cloud-b { animation-duration: 64s; animation-delay: -20s; transform: translate(560px, 188px); }
@keyframes fsh-drift-cloud { from { transform: translate(-160px, var(--cy, 110px)); } to { transform: translate(1160px, var(--cy, 110px)); } }
.fsh-cloud-a { --cy: 110px; } .fsh-cloud-b { --cy: 188px; }
.fsh-wiggle { transform-box: fill-box; transform-origin: center; animation: fsh-wiggle ease-in-out infinite; }
@keyframes fsh-wiggle { 0%, 100% { transform: skewX(0deg) scaleY(1); } 25% { transform: skewX(9deg) scaleY(0.93); } 75% { transform: skewX(-9deg) scaleY(0.93); } }
.fsh-sunglow { transform-box: fill-box; transform-origin: center; animation: fsh-sunglow 5s ease-in-out infinite; }
@keyframes fsh-sunglow { 0%, 100% { opacity: 0.85; transform: scale(1); } 50% { opacity: 1; transform: scale(1.07); } }
.fsh-prizehalo { transform-box: fill-box; transform-origin: center; mix-blend-mode: screen; animation: fsh-prizehalo 2.6s ease-in-out infinite; }
@keyframes fsh-prizehalo { 0%, 100% { opacity: 0.5; transform: scale(0.86); } 50% { opacity: 0.96; transform: scale(1.16); } }
.fsh-catch-fx { pointer-events: none; }
.fsh-catch-ring { transform-box: fill-box; transform-origin: center; animation: fsh-catch-ring 1.1s ease-out infinite; }
@keyframes fsh-catch-ring { 0% { transform: scale(0.45); opacity: 0.95; } 100% { transform: scale(1.9); opacity: 0; } }
.fsh-spark { transform-box: fill-box; transform-origin: center; animation: fsh-spark 0.8s ease-in-out infinite; }
@keyframes fsh-spark { 0%, 100% { opacity: 0; transform: scale(0.2); } 50% { opacity: 1; transform: scale(1); } }
.fsh-bubble { animation: fsh-rise ease-in infinite; animation-duration: var(--dur); animation-delay: var(--delay); opacity: 0; }
@keyframes fsh-rise { 0% { transform: translateY(0); opacity: 0; } 15% { opacity: 0.5; } 100% { transform: translateY(-760px) translateX(18px); opacity: 0; } }
.fsh-weed { transform-box: fill-box; transform-origin: bottom center; animation: fsh-sway 3.6s ease-in-out infinite; animation-delay: var(--delay); }
@keyframes fsh-sway { 0%,100% { transform: rotate(-7deg); } 50% { transform: rotate(7deg); } }
.fsh-wave path { animation: fsh-roll linear infinite; }
.fsh-wave-back path { animation-duration: 7s; }
.fsh-wave-front path { animation-duration: 4.5s; }
.fsh-wave { animation: fsh-swell ease-in-out infinite; }
.fsh-wave-back { animation-duration: 6s; }
.fsh-wave-front { animation-duration: 4s; animation-delay: -1s; }
@keyframes fsh-roll { from { transform: translateX(0); } to { transform: translateX(-480px); } }
@keyframes fsh-swell { 0%,100% { transform: translateY(0); } 50% { transform: translateY(12px); } }
.fsh-caustic { mix-blend-mode: screen; opacity: 0; animation: fsh-caustic 8s ease-in-out infinite; }
.fsh-caustic.c2 { animation-duration: 10.5s; animation-delay: -3s; }
.fsh-caustic.c3 { animation-duration: 13s; animation-delay: -6s; }
@keyframes fsh-caustic { 0%,100% { opacity: 0.05; transform: translateX(-48px); } 50% { opacity: 0.22; transform: translateX(48px); } }
</style>
