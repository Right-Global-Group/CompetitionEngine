<script setup lang="ts">
import { computed, nextTick, onBeforeUnmount, reactive, ref, watch } from 'vue';
import gsap from 'gsap';

/**
 * Ticket Eater — a "feed & reveal" instant-win game. Outcome is server-decided (lives on each
 * ticket's instant_win); the run is purely the animated reveal. Config-native (everything lives in
 * game_settings.config — ZERO dedicated columns, exactly like Football & Fishing).
 *
 * THE LOOK (settled with the operator): dead simple, nothing flashy. An intro pop-up (floating title
 * image, "Welcome to X", how-it-works, Manual/Auto + speed), then ONE ticket sitting still whose
 * number rolls fast through every real backend ticket number — pausing to reveal a prize on a win.
 */
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

// ── responsive scene framing ──
const CORE = { x: 0, y: 0, w: 1000, h: 1400 };
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
    if (ar >= coreAspect) { const h = CORE.h, w = h * ar; return { x: CORE_CX - w / 2, y: CORE.y, w, h }; }
    const w = CORE.w, h = w / ar; return { x: CORE.x, y: CORE.y, w, h };
});
const sceneViewBox = computed(() => `${view.value.x} ${view.value.y} ${view.value.w} ${view.value.h}`);
const bg = computed(() => { const v = view.value; return { x: v.x - 200, w: v.w + 400, top: v.y - 100, bottom: v.y + v.h + 200, floor: v.y + v.h }; });

// ── settings ──
const titleText = computed(() => a.value.titleText || 'Feed the Eater!');
const accent = computed(() => a.value.accentColor || '#ffd54f');
const primary = computed(() => a.value.primaryColor || '#6c5ce7');
const textColor = computed(() => a.value.textColor || '#ffffff');
const showTopPrize = computed(() => a.value.showTopPrize === true);
const gameName = computed(() => a.value.name || '');

// ── art (all optional) ──
const ticketImage = computed(() => a.value.ticketImage || '');        // the main reader ticket
const risingTicketImage = computed(() => a.value.risingTicketImage || '');   // the small tickets flowing up (different art)
const backgroundImage = computed(() => a.value.backgroundImage || '');
const prizeImage = computed(() => a.value.prizeImage || '');
const titleImage = computed(() => a.value.introTitleImage || '');      // your logo (intro + top of game)
const mascotImage = computed(() => a.value.mascotImage || '');         // character above the tickets, reacts to wins

// ── intro ──
const introEnabled = computed(() => a.value.introEnabled !== false);
const introSubtitle = computed(() => a.value.introSubtitle || 'Roll through your tickets to reveal instant prizes');
const introButtonText = computed(() => a.value.introButtonText || 'Start 👹');
const welcomeMsg = computed(() => (a.value.introWelcomeText || 'Welcome to {name}').replace('{name}', gameName.value || 'the game'));
const showIntro = ref(false);
const introPhase = ref<'splash' | 'settings'>('splash');   // splash = title card; then the settings
const introCard = ref<HTMLElement | null>(null);
const splashEl = ref<HTMLElement | null>(null);

// ── theme palette ──
const THEMES: Record<string, Record<string, string>> = {
    arcade: { bgTop: '#1b1040', bgBot: '#2a1a52', ticket: '#fff8e6', edge: '#c79a1f', num: '#241026', glow: '#ffd54f' },
    cave:   { bgTop: '#1c2a2e', bgBot: '#0c1719', ticket: '#eafff5', edge: '#3f9c78', num: '#0c2a1c', glow: '#8effc8' },
    candy:  { bgTop: '#ff9ec4', bgBot: '#ffcfe3', ticket: '#ffffff', edge: '#cf4d83', num: '#5e1638', glow: '#fff36b' },
    spooky: { bgTop: '#14121f', bgBot: '#241f38', ticket: '#f0ffe6', edge: '#5a9c33', num: '#14121f', glow: '#9dff5c' },
};
const pal = computed(() => THEMES[String(a.value.theme || 'arcade')] || THEMES.arcade);
const numberColor = computed(() => a.value.numberColor || pal.value.num);   // rolling ticket number colour (theme default)

// ── tickets → casts ──
type Cast = { id: any; number: string; win: boolean; prize: string; value: number; image: string; isBundle: boolean };
const casts = ref<Cast[]>([]);
function isWin(t: any): boolean { const iw = t?.instant_win; return !!(iw && (iw.prize || Number(iw.value) > 0 || iw.image_path || iw.category_id != null)); }
function categoryFor(iw: any) {
    const cats = props.instant_win_categories || [];
    if (!iw) return null;
    return (iw.category_id != null ? cats.find((c: any) => c.id === iw.category_id) : null)
        || cats.find((c: any) => c.name && (c.name === iw.prize || c.name === iw.name)) || null;
}
function buildCasts() {
    if (props.demoMode) {
        // preview: ~200 tickets with 3 wins inside the first 30 (at 9/19/29) so a manual play-through
        // quickly cycles all 3 mascot frames (1 win → frame 2, 3 wins → frame 3)
        const cats = props.instant_win_categories || [];
        const n = 200;
        const winPos = new Set([9, 19, 29]);
        casts.value = Array.from({ length: n }, (_, i) => {
            const won = winPos.has(i) && cats.length > 0;
            const cat: any = won ? cats[i % cats.length] : null;
            return {
                id: i + 1, number: String(1 + Math.floor(Math.random() * 150000)), win: !!won,   // random, shuffled — like real tickets
                prize: won ? String(cat.name) : '', value: won ? Number(cat.value || 0) : 0,
                image: won ? (cat.image_path || '') : '', isBundle: false,
            };
        });
        resetRun();
        return;
    }
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
    resetRun();
}
const total = computed(() => casts.value.length);
const wins = computed(() => casts.value.filter((c) => c.win));

// ── play settings (chosen on the intro) ──
const mode = ref<'manual' | 'auto'>('auto');   // manual = tap Start to roll; auto = hands-free
const speed = ref<1 | 1.5 | 2 | 5>(1);          // auto speed multiplier (scales the whole run)

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

// ── scene geometry ──
const TICKET = { x: 500, y: 470 };   // the big reader "stage" — high up so feeder tickets get a long ride
const TRAY = { x: 852, y: 372 };
const scene = reactive({ winFlash: 0, heat: 0, readerY: 0, releaseY: 0, releaseO: 0, prizeX: TICKET.x, prizeY: 540, prizeO: 0, prizeScale: 0, prizeRot: 0 });
const releaseIdx = ref(0);   // manual mode: index of the next ticket to release onto the band
const showReaderNum = ref(true);   // reader number hidden until a ticket reaches it
const readerFlash = ref(false);    // brief WINNER! flash on the reader when a winning ticket is read
// MANUAL = an airport-style conveyor: each Release drops a small ticket that rides slowly up to the
// reader, and MANY can be on the band at once (rapid-fire). `band` holds the in-flight tickets.
const band = ref<any[]>([]);
let bandSeq = 0;
const BAND_START = 1380;   // tickets enter at the bottom edge...
const BAND_DUR = 1.3;      // ...and ride up to the reader (snappy, so a spammed queue drains fast — not "infinite")
const BAND_GAP = 90;       // spacing between tickets so a spammed queue still reads as separate cards
const BAND_MAX = 12;       // generous cap so normal clicking never stalls; only machine-gun spam hits it
const BAND_SPEED = (BAND_START - TICKET.y) / BAND_DUR;   // constant px/sec for every ticket (so gaps never close)
const bandTweens = new Map<number, gsap.core.Tween>();   // per-ticket travel tween (kept out of the reactive object)
let pendingBandTicket: any = null;                        // the winning ticket frozen under a manual flip reveal
function pauseBand() { bandTweens.forEach((tw) => tw.pause()); }
function resumeBand() { bandTweens.forEach((tw) => tw.resume()); }
function killBand() { bandTweens.forEach((tw) => tw.kill()); bandTweens.clear(); pendingBandTicket = null; band.value.forEach((t: any) => gsap.killTweensOf(t)); band.value = []; }
// AUTO mode rides the SAME conveyor as Manual — it just spawns the tickets itself, one per real ticket,
// so what you SEE flowing in is exactly the count (no decorative loop that can't keep up).
let autoTimer: ReturnType<typeof setInterval> | null = null;
let autoRiseDur = 0.8;
function stopAuto() { if (autoTimer) { clearInterval(autoTimer); autoTimer = null; } }
// spawn one ticket rising into the reader (shared by Manual clicks + the Auto stream)
function spawnRise(i: number, startY: number, dur: number) {
    const c = casts.value[i];
    const t = reactive({ key: bandSeq++, idx: i, y: startY, o: 1 });
    band.value.push(t);
    const tw = gsap.to(t, { y: TICKET.y, duration: dur, ease: 'none', onComplete: () => bandArrive(t, c, i) });
    bandTweens.set(t.key, tw);
}
function autoTick() {
    if (reveal.on) return;                                          // frozen while a win flip is up
    if (releaseIdx.value >= total.value) { stopAuto(); maybeFinish(); return; }
    spawnRise(releaseIdx.value++, BAND_START, autoRiseDur);
}

// ── run state ──
const phase = ref<'ready' | 'feasting' | 'done'>('ready');
const hud = reactive({ eaten: 0 });
const collected = ref<Cast[]>([]);
const dropPrize = ref<Cast | null>(null);
const eatenDisplay = computed(() => Math.min(total.value, Math.round(hud.eaten)));
// the mascot glows bigger + wiggles faster the more wins are banked
const titleGlow = computed(() => Math.min(70, 8 + collected.value.length * 9));
const titleWiggleDur = computed(() => Math.max(1.3, 3 - collected.value.length * 0.28));
// 3-frame mascot: frame 1 normal → frame 2 after the 1st win → frame 3 at 3+ wins (each falls back to the prior)
const mascotSrc = computed(() => {
    const n = collected.value.length;
    const f1 = a.value.mascotImage || '';
    const f2 = a.value.mascotImage2 || f1;
    const f3 = a.value.mascotImage3 || f2;
    return n >= 3 ? f3 : (n >= 1 ? f2 : f1);
});
// PERF: the rolling number reads from a THROTTLED index (~14fps) not the 60fps counter, so the
// SVG text isn't re-rendering ~100x/sec on a big fast pile. The HUD counter still races smoothly.
const streamBase = ref(0);
let streamTimer: ReturnType<typeof setInterval> | null = null;
function startStreamTick() { stopStreamTick(); streamTimer = setInterval(() => { streamBase.value = eatenDisplay.value; }, Math.max(90, Math.round(RISER_DUR / RISER_COUNT * 1000 / speed.value))); }  // reveal cadence scales with the speed chip so 2x actually rolls faster
function stopStreamTick() { if (streamTimer) { clearInterval(streamTimer); streamTimer = null; } }
const rollIdx = computed(() => { const n = casts.value.length; return n ? Math.min(n - 1, streamBase.value) : 0; });
const rollNumber = computed(() => casts.value.length ? (casts.value[rollIdx.value]?.number ?? '—') : '—');
const rollIsWin = computed(() => casts.value.length ? !!casts.value[rollIdx.value]?.win : false);
// rising feeder tickets — BLANK cards stream up ONE BY ONE (spaced out so they're clearly separate)
const RISER_DUR = 1.8, RISER_COUNT = 3;   // a ticket reaches the middle every RISER_DUR/RISER_COUNT = 0.6s (at 1x)
// risers ride faster on a higher speed chip so the visible flow keeps up with the counter
const risers = computed(() => Array.from({ length: RISER_COUNT }, (_, i) => ({ id: i, delay: (-(i * RISER_DUR / RISER_COUNT / speed.value)).toFixed(2) + 's', dur: (RISER_DUR / speed.value).toFixed(2) + 's' })));

// ── win reveal: the roll pauses, screen blacks out, a card flips to reveal the REAL won prize,
//    you collect it, and it drops into the (customisable) pouch ──
const POUCH = { x: 838, y: 1118 };
const pouchImage = computed(() => a.value.pouchImage || '');
const pouchPulse = ref(0);
const showPouch = ref(false);   // tap the pouch to open your won-prizes inventory
// pretty value label for a won prize (free tickets vs £)
function valueLabel(c: any): string {
    if (!c || !c.value) return '';
    const v = Number(c.value);
    if (c.isBundle) return /ticket/i.test(String(c.prize || '')) ? '' : `${Math.floor(v)} Free Ticket${v == 1 ? '' : 's'}`;
    return `£${v % 1 === 0 ? v : v.toFixed(2)}`;
}
const reveal = reactive({ on: false, flipped: false, collectable: false, collecting: false });
let pendingWin = -1;
let revealTimers: ReturnType<typeof setTimeout>[] = [];
function clearReveal() { revealTimers.forEach((t) => clearTimeout(t)); revealTimers = []; }
function openReveal(wi: number) {
    pendingWin = wi; dropPrize.value = casts.value[wi] ?? null;
    reveal.on = true; reveal.flipped = false; reveal.collectable = false; reveal.collecting = false;
    play(a.value.winSound);
    // show the "?" card first, then a slow, gentle flip to the REAL instant-win image
    revealTimers.push(setTimeout(() => { reveal.flipped = true; }, 650));
    // the prize then glows + floats; you click Collect to bank it (no auto-dismiss)
    revealTimers.push(setTimeout(() => { reveal.collectable = true; }, 1850));
    if (props.demoMode) revealTimers.push(setTimeout(() => { if (reveal.collectable) collect(); }, 6000));   // preview safety so the showcase never hard-freezes
}
function collect() {
    if (!reveal.collectable) return;
    clearReveal();
    reveal.collectable = false; reveal.collecting = true;                      // card flies to the pouch
    play(a.value.collectSound || a.value.winSound);
    revealTimers.push(setTimeout(() => {
        if (dropPrize.value) collected.value.push(dropPrize.value);
        pouchPulse.value++;
        reveal.on = false; reveal.collecting = false; scene.heat = 0;          // reset the build-up glow
        hud.eaten = pendingWin + 1;
        resumeBand();                                      // both modes: the conveyor rolls on
        const bt = pendingBandTicket; pendingBandTicket = null;
        if (bt) gsap.to(bt, { y: TICKET.y - 70, o: 0, duration: 0.5, ease: 'power1.in', onComplete: () => { bandTweens.delete(bt.key); band.value = band.value.filter((x: any) => x.key !== bt.key); maybeFinish(); } });
        else maybeFinish();
    }, 520));
}

function resetRun() {
    clearReveal(); reveal.on = false; reveal.flipped = false; reveal.collectable = false; reveal.collecting = false;
    runTl?.kill(); stopAuto(); stopStreamTick(); gsap.killTweensOf(scene); gsap.killTweensOf(hud); killBand();
    hud.eaten = 0; streamBase.value = 0; collected.value = []; dropPrize.value = null; releaseIdx.value = 0; readerFlash.value = false; showReaderNum.value = true;
    Object.assign(scene, { winFlash: 0, heat: 0, readerY: 0, prizeX: TICKET.x, prizeY: 540, prizeO: 0, prizeScale: 0, prizeRot: 0 });
    confetti.value = [];
    phase.value = 'ready';
}

// ── small confetti on a win ──
const CONF = ['#ff5c8a', '#ffd54f', '#4fc3f7', '#7cf29b', '#ba68c8', '#ff8a65'];
const confetti = ref<any[]>([]);
let confSeq = 0;
function burstConfetti(cx: number, cy: number) {
    const pieces = Array.from({ length: 16 }, (_, i) => ({ id: confSeq++, x: cx, y: cy, rot: Math.random() * 360, o: 1, w: 8 + Math.random() * 9, h: 11 + Math.random() * 11, color: CONF[i % CONF.length] }));
    confetti.value = pieces;
    pieces.forEach((p) => {
        const ang = -Math.PI / 2 + (Math.random() - 0.5) * 2.2;
        const dist = 130 + Math.random() * 220;
        gsap.to(p, { x: cx + Math.cos(ang) * dist, y: cy + Math.sin(ang) * dist + 110, rot: p.rot + (Math.random() - 0.5) * 540, o: 0, duration: 0.9 + Math.random() * 0.5, ease: 'power2.out' });
    });
}

// ── the run: AUTO rides the same conveyor as Manual — it spawns one real ticket per ticket so the
//    visible stream IS the count (no decorative loop racing ahead). The speed chip scales the cadence. ──
let runTl: gsap.core.Timeline | null = null;   // (legacy; unused now — kept so finishRun's ?.kill() stays a no-op)
function startRun() {
    if (phase.value === 'feasting') return;
    if (!casts.value.length) { finishRun(); return; }
    resetRun();
    phase.value = 'feasting';
    play(a.value.feedSound);
    const n = total.value;
    const runMs = 20000 / speed.value;                          // ~20s at 1x (relaxed); the speed chip scales it down
    const interval = Math.min(420, Math.max(16, runMs / n));    // one real ticket per slot (floored so huge piles stay sane)
    autoRiseDur = Math.min(1.2, Math.max(0.4, interval * 9 / 1000));   // ~9 tickets in flight; clamped so each stays visible
    stopAuto();
    autoTimer = setInterval(autoTick, interval);
}
function finishRun() {
    runTl?.kill(); stopAuto(); stopStreamTick(); clearReveal(); reveal.on = false; gsap.killTweensOf(scene); killBand();
    hud.eaten = total.value; scene.winFlash = 0;
    phase.value = 'done';
    emit('wins-collected', wins.value.map((w) => ({ prize: w.prize, value: w.value })));
}
function skipRun() {
    runTl?.kill(); stopStreamTick(); clearReveal(); reveal.on = false; gsap.killTweensOf(scene); gsap.killTweensOf(hud);
    collected.value = wins.value.slice();
    finishRun();
}
// MANUAL: drop one small ticket onto the conveyor band. It rides up to the reader on its own, and
// many can be in flight at once (spam Release to stack the band). It's READ when it docks at the reader.
function releaseOne() {
    if (band.value.length >= BAND_MAX) return;   // band's full — ignore extra clicks so the queue can't run away
    const i = releaseIdx.value;
    if (i >= total.value) return;       // nothing left to release — the band just drains, then we finish
    releaseIdx.value++;
    // queue behind the last ticket so a spammed run lines up with a visible gap, all riding the same speed
    const prev = band.value[band.value.length - 1];
    const startY = (prev && prev.y > BAND_START - BAND_GAP) ? prev.y + BAND_GAP : BAND_START;
    play(a.value.feedSound);
    spawnRise(i, startY, (startY - TICKET.y) / BAND_SPEED);
}
// a ticket reached the reader: reveal its number. A win FREEZES the band and flips the card to the
// real prize (auto-dismisses after a couple of seconds → drops into the pouch → band rolls on).
function bandArrive(t: any, c: any, i: number) {
    streamBase.value = i; showReaderNum.value = true; hud.eaten = Math.max(hud.eaten, i + 1);
    if (c.win) {
        pauseBand();                 // freeze the conveyor while we show the prize
        pendingBandTicket = t;
        openReveal(i);               // flip → hold ~2.4s → collect() drops it into the pouch + resumes
        return;
    }
    readerFlash.value = false; play(a.value.gulpSound);
    gsap.to(t, { y: TICKET.y - 70, o: 0, duration: 0.5, delay: 0.55, ease: 'power1.in', onComplete: () => {
        bandTweens.delete(t.key);
        band.value = band.value.filter((x: any) => x.key !== t.key);
        maybeFinish();
    } });
}
function maybeFinish() {
    if (releaseIdx.value >= total.value && band.value.length === 0) { stopAuto(); finishRun(); }
}
// the tap: drop a ticket onto the band (manual — rapid-fire) or start the whole roll (auto)
function onReady() {
    if (mode.value === 'manual') releaseOne();
    else startRun();
}
const canTap = computed(() => phase.value === 'done' ? false : (mode.value === 'manual' ? (releaseIdx.value < total.value && !reveal.on) : phase.value === 'ready'));
const prompt = computed(() => phase.value === 'ready' ? titleText.value : phase.value === 'feasting' ? (rollIsWin.value ? 'WINNER!' : 'Rolling…') : '');

// ── sound (uploaded clips only; voice OFF by default) ──
let audio: HTMLAudioElement | null = null;
function play(src?: string) { if (!src) return; try { audio = new Audio(src); audio.volume = 0.85; void audio.play(); } catch { /* */ } }   // plays in preview too so uploaded clips can be tested
function playWelcome() {
    if (a.value.welcomeSound) play(a.value.welcomeSound);   // only the uploaded sound — no device voice
}
function cancelSpeech() { try { window.speechSynthesis?.cancel(); } catch { /* */ } }

let demoTimer: ReturnType<typeof setTimeout> | null = null;
function clearDemo() { if (demoTimer) { clearTimeout(demoTimer); demoTimer = null; } }
let introSeq: ReturnType<typeof setTimeout> | null = null;
function clearIntroSeq() { if (introSeq) { clearTimeout(introSeq); introSeq = null; } }
// touching a setting (even in the studio preview) cancels the auto-play so YOUR choice drives it
function pickMode(m: 'manual' | 'auto') { clearDemo(); mode.value = m; }
function pickSpeed(s: 1 | 1.5 | 2 | 5) { clearDemo(); speed.value = s; }
function startGame() { clearDemo(); showIntro.value = false; if (mode.value === 'auto') startRun(); else { resetRun(); showReaderNum.value = false; } }

watch(() => props.tickets, buildCasts, { immediate: true, deep: true });
watch(() => props.modelValue, (open) => {
    if (open) {
        clearDemo(); buildCasts();
        showIntro.value = introEnabled.value;
        if (showIntro.value) playWelcome();
        // preview: if there's an intro, leave it up so you can watch/test it (no auto-play — tap START);
        // only auto-showcase the gameplay when there's no intro to look at.
        if (props.demoMode && !introEnabled.value) demoTimer = setTimeout(() => startGame(), 600);
    } else { runTl?.kill(); stopStreamTick(); gsap.killTweensOf(scene); gsap.killTweensOf(hud); clearDemo(); cancelSpeech(); }
}, { immediate: true });
watch(phase, (p) => { if (props.demoMode && p === 'done') { clearDemo(); demoTimer = setTimeout(() => { buildCasts(); if (introEnabled.value) showIntro.value = true; else startGame(); }, 1800); } });
// Intro: a plain title card for ~2.6s, then the settings. (Fancy animations stripped — to be redone.)
watch(showIntro, (on) => {
    clearIntroSeq();
    if (!on) return;
    introPhase.value = 'splash';
    introSeq = setTimeout(() => { introPhase.value = 'settings'; }, 2600);
}, { immediate: true });   // preview mounts with modelValue already true, so fire on the initial value too
watch(introEnabled, (on) => { if (props.demoMode) showIntro.value = on; });
onBeforeUnmount(() => { runTl?.kill(); stopStreamTick(); clearReveal(); clearIntroSeq(); gsap.killTweensOf(scene); gsap.killTweensOf(hud); clearDemo(); cancelSpeech(); stageRO?.disconnect(); });
function close() {
    clearDemo(); cancelSpeech(); clearReveal(); clearIntroSeq();
    if (props.demoMode) { mode.value = 'auto'; speed.value = 1; buildCasts(); showIntro.value = introEnabled.value; return; }
    runTl?.kill(); stopStreamTick();
    emit('update:modelValue', false);
}
</script>

<template>
    <teleport to="body" :disabled="demoMode">
        <div v-if="modelValue || demoMode" class="te-root" :class="frameClass">
            <div class="te-frame" :style="{ background: pal.bgBot }">
                <div v-if="demoMode" class="te-preview-toggle">
                    <span>Preview:</span>
                    <button :class="{ on: actualPreviewMode === 'mobile' }" @click="togglePreviewMode">Mobile</button>
                    <button :class="{ on: actualPreviewMode === 'desktop' }" @click="togglePreviewMode">Desktop</button>
                </div>
                <button v-if="!demoMode" class="te-close" @click="close" aria-label="Close">✕</button>

                <div class="te-hud">
                    <div class="te-hud-left">🎟️ {{ eatenDisplay }}/{{ total }} · 🏆 {{ collected.length }}</div>
                    <div class="te-hud-title" :style="{ color: textColor }">{{ gameName || 'Ticket Eater' }}</div>
                </div>
                <div v-if="showTopPrize && topPrizeLabel" class="te-topprize" :style="{ borderColor: accent }">
                    <span class="te-topprize-pill" :style="{ background: accent }">£</span>
                    <span class="te-topprize-val"><b :style="{ color: accent }">TOP PRIZE</b> {{ topPrizeLabel }}</span>
                </div>

                <div ref="stageEl" class="te-stage" @click="canTap && onReady()">
                    <svg class="te-svg" :viewBox="sceneViewBox" preserveAspectRatio="xMidYMid slice">
                        <defs>
                            <linearGradient id="te-bg" x1="0" y1="0" x2="0" y2="1"><stop offset="0%" :stop-color="pal.bgTop" /><stop offset="100%" :stop-color="pal.bgBot" /></linearGradient>
                            <radialGradient id="te-glow" cx="50%" cy="50%" r="50%"><stop offset="0%" :stop-color="pal.glow" stop-opacity="0.9" /><stop offset="100%" :stop-color="pal.glow" stop-opacity="0" /></radialGradient>
                            <radialGradient id="te-vig" cx="50%" cy="42%" r="80%"><stop offset="62%" stop-color="#000" stop-opacity="0" /><stop offset="100%" stop-color="#000" stop-opacity="0.42" /></radialGradient>
                            <radialGradient id="te-treasure" cx="50%" cy="50%" r="50%"><stop offset="0%" :stop-color="accent" stop-opacity="0.85" /><stop offset="100%" :stop-color="accent" stop-opacity="0" /></radialGradient>
                        </defs>

                        <rect :x="bg.x" :y="bg.top" :width="bg.w" :height="bg.bottom - bg.top" fill="url(#te-bg)" />
                        <image v-if="backgroundImage" :href="backgroundImage" :x="bg.x" :y="bg.top" :width="bg.w" :height="bg.bottom - bg.top" preserveAspectRatio="xMidYMid slice" opacity="0.9" />
                        <!-- title image (branding) at the top -->
                        <foreignObject v-if="titleImage" x="290" y="62" width="420" height="150"><img :src="titleImage" style="width:100%;height:100%;object-fit:contain" alt="" /></foreignObject>
                        <!-- mascot (3 frames: normal → after 1st win → 3+ wins); lights up + wiggles more with each win -->
                        <foreignObject v-if="mascotSrc" x="210" y="214" width="580" height="260" style="overflow: visible"><img :src="mascotSrc" class="te-gametitle" :class="{ 'te-glowing': collected.length > 0 }" :style="{ width: '100%', height: '100%', objectFit: 'contain', objectPosition: 'center bottom', '--gw': titleGlow + 'px', '--tglow': accent, '--wdur': titleWiggleDur + 's' }" alt="" /></foreignObject>
                        <circle :cx="TICKET.x" :cy="TICKET.y" r="320" fill="url(#te-glow)" opacity="0.12" />

                        <!-- MANUAL: small tickets ride the conveyor band up to the reader — many at once (rapid-fire) -->
                        <g v-for="t in band" :key="'b' + t.key" :transform="`translate(${TICKET.x} ${t.y})`" :opacity="t.o">
                            <image v-if="risingTicketImage" :href="risingTicketImage" x="-88" y="-44" width="176" height="88" preserveAspectRatio="xMidYMid meet" transform="rotate(90)" />
                            <template v-else>
                                <rect x="-44" y="-88" width="88" height="176" rx="11" :fill="pal.ticket" :stroke="pal.edge" stroke-width="3.5" />
                                <rect x="-34" y="-78" width="68" height="156" rx="7" fill="none" :stroke="pal.edge" stroke-width="2" stroke-dasharray="2 9" opacity="0.4" />
                                <circle cx="-44" cy="0" r="9" :fill="pal.bgBot" /><circle cx="44" cy="0" r="9" :fill="pal.bgBot" />
                            </template>
                        </g>

                        <!-- THE TICKET (reader): fixed in the middle, ON TOP — the number is revealed here (scaled down a touch so the mascot behind shows) -->
                        <g :transform="`translate(${TICKET.x} ${TICKET.y}) scale(0.84)`">
                            <foreignObject v-if="ticketImage" x="-240" y="-150" width="480" height="300"><img :src="ticketImage" style="width:100%;height:100%;object-fit:contain" alt="" /></foreignObject>
                            <template v-else>
                                <rect x="-240" y="-150" width="480" height="300" rx="30" :fill="pal.ticket" :stroke="rollIsWin ? accent : pal.edge" :stroke-width="rollIsWin ? 11 : 6" />
                                <rect x="-208" y="-118" width="416" height="236" rx="20" fill="none" :stroke="pal.edge" stroke-width="2.5" stroke-dasharray="2 13" opacity="0.4" />
                                <circle cx="-240" cy="0" r="28" :fill="pal.bgBot" /><circle cx="240" cy="0" r="28" :fill="pal.bgBot" />
                            </template>
                            <text v-if="!ticketImage" x="0" y="-78" text-anchor="middle" font-size="26" font-weight="900" :fill="pal.edge" font-family="system-ui, sans-serif" style="letter-spacing:9px">★ TICKET ★</text>
                            <text v-if="showReaderNum" x="0" y="24" text-anchor="middle" font-size="46" font-weight="900" :fill="rollIsWin ? accent : numberColor" font-family="ui-monospace, monospace" style="letter-spacing:-1px">{{ rollNumber }}</text>
                            <text v-if="showReaderNum && rollIsWin && (phase === 'feasting' || readerFlash)" x="0" y="118" text-anchor="middle" font-size="30" font-weight="900" :fill="accent" font-family="system-ui, sans-serif" style="letter-spacing:3px">WINNER!</text>
                            <text v-if="showReaderNum && !rollIsWin && (phase === 'feasting' || (mode === 'manual' && hud.eaten > 0))" x="0" y="116" text-anchor="middle" font-size="25" font-weight="800" fill="#9aa0ad" font-family="system-ui, sans-serif" style="letter-spacing:3px">No win</text>
                        </g>

                        <!-- small confetti on a win -->
                        <rect v-for="p in confetti" :key="'c'+p.id" :x="p.x" :y="p.y" :width="p.w" :height="p.h" rx="2" :fill="p.color" :opacity="p.o" :transform="`rotate(${p.rot} ${p.x + p.w / 2} ${p.y + p.h / 2})`" />

                        <!-- the (customisable) pouch — only appears once the 1st prize lands, then glows + wiggles -->
                        <g v-if="collected.length" :transform="`translate(${POUCH.x} ${POUCH.y})`" style="cursor: pointer" @click.stop="showPouch = true">
                            <circle v-if="collected.length" cx="0" cy="6" r="210" fill="url(#te-glow)" class="te-pouch-glow" />
                            <g v-if="collected.length" class="te-pouch-spark" :fill="accent">
                                <circle cx="-104" cy="-72" r="6" :style="{ animationDelay: '0s' }" />
                                <circle cx="110" cy="-48" r="7" :style="{ animationDelay: '-0.4s' }" />
                                <circle cx="84" cy="-112" r="5" :style="{ animationDelay: '-0.8s' }" />
                                <circle cx="-84" cy="-118" r="6" :style="{ animationDelay: '-0.6s' }" />
                            </g>
                            <g :key="pouchPulse" class="te-pouch-shake">
                                <!-- glow halo so the pouch pops off the background (depth) -->
                                <circle cx="0" cy="8" r="138" fill="url(#te-treasure)" class="te-crate-shine" />
                                <!-- contact shadow so it sits on something, not floating flat -->
                                <ellipse cx="0" cy="120" rx="88" ry="15" fill="#000" opacity="0.3" />
                                <!-- uploaded art: lifted with a drop-shadow + gentle bob so it reads as 3D, not a flat sticker -->
                                <foreignObject v-if="pouchImage" x="-124" y="-124" width="248" height="248" style="overflow: visible">
                                    <img :src="pouchImage" class="te-pouch-img3d" :style="{ width: '100%', height: '100%', objectFit: 'contain', '--pg': accent }" alt="" />
                                </foreignObject>
                                <!-- default: an open treasure crate, gold brimming over the rim -->
                                <g v-else transform="scale(1.36)">
                                    <g transform="translate(0 -30) rotate(-13)">
                                        <rect x="-76" y="-34" width="152" height="42" rx="11" fill="#6f4626" stroke="#3c2410" stroke-width="4" />
                                        <rect x="-76" y="-34" width="152" height="15" rx="7" fill="#8c5c30" />
                                        <rect x="-7" y="-34" width="14" height="42" fill="#caa23f" opacity="0.9" />
                                    </g>
                                    <g class="te-crate-gold">
                                        <ellipse cx="0" cy="-10" rx="64" ry="22" :fill="accent" />
                                        <circle cx="-38" cy="-14" r="12" :fill="accent" /><circle cx="-12" cy="-20" r="13" :fill="accent" />
                                        <circle cx="18" cy="-16" r="12" :fill="accent" /><circle cx="44" cy="-10" r="10" :fill="accent" />
                                        <circle cx="-12" cy="-22" r="4" fill="#fff" opacity="0.75" /><circle cx="18" cy="-18" r="3.5" fill="#fff" opacity="0.7" />
                                    </g>
                                    <rect x="-78" y="-6" width="156" height="74" rx="13" fill="#6f4626" stroke="#3c2410" stroke-width="4" />
                                    <rect x="-70" y="2" width="140" height="9" rx="4" fill="#8c5c30" opacity="0.85" />
                                    <rect x="-78" y="40" width="156" height="9" fill="#caa23f" />
                                    <rect x="-7" y="-6" width="14" height="74" fill="#caa23f" />
                                    <rect x="-13" y="20" width="26" height="24" rx="5" fill="#e6ad42" stroke="#3c2410" stroke-width="2.5" />
                                    <circle cx="0" cy="31" r="4.5" fill="#3c2410" />
                                </g>
                            </g>
                            <g v-if="collected.length"><circle cx="98" cy="-98" r="34" fill="#e11d2a" stroke="#fff" stroke-width="3" class="te-pouch-tag" /><text x="98" y="-86" text-anchor="middle" font-size="32" font-weight="900" fill="#fff" font-family="system-ui, sans-serif">{{ collected.length }}</text></g>
                            <text x="0" y="150" text-anchor="middle" font-size="22" font-weight="900" :fill="accent" font-family="system-ui, sans-serif">POUCH</text>
                        </g>

                        <rect :x="bg.x" :y="bg.top" :width="bg.w" :height="bg.bottom - bg.top" fill="url(#te-vig)" pointer-events="none" />
                    </svg>

                    <div class="te-prompt" :style="{ color: textColor }">{{ prompt }}</div>
                    <div class="te-controls">
                        <button v-if="canTap" class="te-cta te-release" :style="{ background: accent }" @click="onReady">{{ mode === 'manual' ? 'Release 🎟️' : 'START 👹' }}</button>
                        <button v-if="(phase === 'feasting' || (mode === 'manual' && releaseIdx > 0 && releaseIdx < total)) && !demoMode" class="te-skip" @click="skipRun">Skip to results</button>
                    </div>
                </div>

                <!-- WIN REVEAL: blackout, a card flips to the real won prize, collect it into the pouch -->
                <transition name="te-fade">
                    <div v-if="reveal.on" class="te-reveal">
                        <div class="te-flip" :class="{ flipped: reveal.flipped, collecting: reveal.collecting }">
                            <div class="te-flip-in">
                                <div class="te-flip-face te-flip-back" :style="{ borderColor: accent }">
                                    <span class="te-flip-q" :style="{ color: accent }">?</span>
                                </div>
                                <div class="te-flip-face te-flip-front" :style="{ borderColor: accent }">
                                    <div class="te-flip-glow" :style="{ background: 'radial-gradient(circle at 50% 42%, ' + accent + '55, transparent 68%)' }"></div>
                                    <div class="te-flip-won" :style="{ color: accent }">WINNER!</div>
                                    <div class="te-flip-img" :style="{ '--pacc': accent }">
                                        <img v-if="dropPrize && dropPrize.image" :src="dropPrize.image" alt="" />
                                        <img v-else-if="prizeImage" :src="prizeImage" alt="" />
                                        <span v-else>🏆</span>
                                    </div>
                                    <div class="te-flip-name" :style="{ color: textColor }">{{ dropPrize?.prize }}</div>
                                    <button v-if="reveal.collectable && !reveal.collecting" class="te-cta te-flip-collect" :style="{ background: accent }" @click.stop="collect">Collect 🏆</button>
                                    <div v-else class="te-flip-hint" :style="{ color: accent }">✦</div>
                                </div>
                            </div>
                        </div>
                    </div>
                </transition>

                <!-- POUCH inventory: the prizes you've won this game -->
                <transition name="te-fade">
                    <div v-if="showPouch" class="te-overlay" @click.self="showPouch = false">
                        <div class="te-pouch-panel" :style="{ borderColor: accent }">
                            <div class="te-pouch-title" :style="{ color: accent }">🏆 Your Pouch · {{ collected.length }}</div>
                            <div v-if="collected.length" class="te-pouch-grid">
                                <div v-for="(c, i) in collected" :key="i" class="te-pouch-item">
                                    <div class="te-pouch-img">
                                        <img v-if="c.image" :src="c.image" alt="" />
                                        <img v-else-if="prizeImage" :src="prizeImage" alt="" />
                                        <span v-else>🏆</span>
                                    </div>
                                    <div class="te-pouch-name" :style="{ color: textColor }">#{{ c.number }} · {{ c.prize }}</div>
                                    <div v-if="valueLabel(c)" class="te-pouch-val" :style="{ color: accent }">{{ valueLabel(c) }}</div>
                                </div>
                            </div>
                            <div v-else class="te-pouch-empty">Nothing in here yet — win some prizes!</div>
                            <button class="te-cta" :style="{ background: primary, color: textColor }" @click="showPouch = false">Close</button>
                        </div>
                    </div>
                </transition>

                <div v-if="showIntro" class="te-overlay te-intro">
                    <!-- BEAT 1: title splash on a cool graphic, ~2.6s, then it disappears -->
                    <transition name="te-splash-t">
                        <div v-if="introPhase === 'splash'" class="te-splash">
                            <div class="te-splash-title" :style="{ '--tglow': accent }">
                                <img v-if="titleImage" :src="titleImage" alt="" />
                                <span v-else :style="{ color: textColor }">{{ gameName || 'Ticket Eater' }}</span>
                            </div>
                        </div>
                    </transition>
                    <!-- BEAT 2: the settings -->
                    <transition name="te-fade">
                        <div v-if="introPhase === 'settings'" class="te-intro-card" :style="{ '--acc': accent, '--tglow': accent }">
                            <div class="te-intro-welcome" :style="{ color: textColor }">{{ welcomeMsg }}</div>
                            <div class="te-intro-sub">{{ introSubtitle }}</div>
                            <div class="te-howto">
                                <span><b>1</b> We roll through every one of your tickets</span>
                                <span><b>2</b> Each ticket number flashes up in turn</span>
                                <span><b>3</b> Winners reveal their prize 🏆</span>
                            </div>
                            <div class="te-set-label">Choose your settings</div>
                            <div class="te-chip-row">
                                <button class="te-chip" :class="{ on: mode === 'manual' }" @click="pickMode('manual')">👆 Manual</button>
                                <button class="te-chip" :class="{ on: mode === 'auto' }" @click="pickMode('auto')">⚡ Auto</button>
                            </div>
                            <template v-if="mode === 'auto'">
                                <div class="te-set-label">Speed</div>
                                <div class="te-chip-row">
                                    <button class="te-chip" :class="{ on: speed === 1 }" @click="pickSpeed(1)">1×</button>
                                    <button class="te-chip" :class="{ on: speed === 1.5 }" @click="pickSpeed(1.5)">1.5×</button>
                                    <button class="te-chip" :class="{ on: speed === 2 }" @click="pickSpeed(2)">2×</button>
                                    <button class="te-chip" :class="{ on: speed === 5 }" @click="pickSpeed(5)">5×</button>
                                </div>
                            </template>
                            <button class="te-cta te-intro-start" :style="{ background: accent }" @click="startGame">{{ introButtonText }}</button>
                        </div>
                    </transition>
                </div>
                <transition name="te-fade">
                    <div v-if="phase === 'done'" class="te-overlay">
                        <div class="te-card" :style="{ borderColor: accent }">
                            <div class="te-card-top" :style="{ color: accent }">{{ wins.length ? 'All done 🎉' : 'All done' }}</div>
                            <template v-if="wins.length">
                                <div class="te-card-name" :style="{ color: textColor }">Rolled through {{ total }} {{ total === 1 ? 'ticket' : 'tickets' }} — {{ wins.length }} {{ wins.length === 1 ? 'winner' : 'winners' }}!</div>
                                <ul class="te-winlist"><li v-for="(w, i) in wins" :key="i" :style="{ color: textColor }"><span :style="{ color: accent }">★</span> #{{ w.number }} · {{ w.prize }}<span v-if="w.isBundle && w.value && !/ticket/i.test(w.prize)"> — {{ Math.floor(w.value) }} Free Ticket{{ w.value == 1 ? '' : 's' }}</span><span v-else-if="w.value && !w.isBundle"> — £{{ w.value }}</span></li></ul>
                            </template>
                            <div v-else class="te-card-name" :style="{ color: textColor }">Rolled through all {{ total }} — no winners this time. Good luck next round!</div>
                            <button class="te-cta" :style="{ background: primary, color: textColor }" @click="close">Close</button>
                        </div>
                    </div>
                </transition>
            </div>
        </div>
    </teleport>
</template>

<style scoped>
.te-root { position: fixed; inset: 0; z-index: 9999; display: flex; align-items: center; justify-content: center; background: #120a26; padding: 0; }
.te-root.is-mobile, .te-root.is-desktop { position: relative; inset: auto; background: transparent; padding: 0; }
.te-frame { position: relative; width: 100%; height: 100%; overflow: hidden; }
.is-mobile .te-frame, .is-desktop .te-frame { width: auto; height: min(660px, 84vh); max-width: 94vw; border-radius: 18px; box-shadow: 0 24px 60px rgba(0,0,0,.5); transition: height .28s ease, width .28s ease; }
.is-mobile .te-frame { aspect-ratio: 1000 / 1400; }
.is-desktop .te-frame { height: min(560px, 80vh); aspect-ratio: 1400 / 1000; }
.te-preview-toggle { position: absolute; top: 8px; left: 50%; transform: translateX(-50%); z-index: 20; display: flex; gap: 6px; align-items: center; background: rgba(0,0,0,.5); padding: 5px 9px; border-radius: 10px; color: #fff; font-size: 12px; }
.te-preview-toggle button { padding: 3px 9px; border-radius: 7px; background: #3a2a5f; color: #d8cdf0; }
.te-preview-toggle button.on { background: #8a5cff; color: #fff; }
.te-close { position: absolute; top: 10px; right: 12px; z-index: 20; width: 34px; height: 34px; border-radius: 50%; background: rgba(0,0,0,.45); color: #fff; font-size: 15px; }
.te-hud { position: absolute; top: 0; left: 0; right: 0; z-index: 12; display: flex; justify-content: space-between; align-items: center; padding: 0.7rem 0.9rem; pointer-events: none; }
.te-hud-left { font-size: 0.72rem; font-weight: 800; letter-spacing: .3px; color: rgba(255,255,255,.92); }
.te-hud-title { font-size: 1.05rem; font-weight: 900; text-shadow: 0 2px 8px rgba(0,0,0,.5); }
.te-topprize { position: absolute; top: 2.5rem; left: 50%; transform: translateX(-50%); z-index: 12; display: flex; align-items: center; gap: 8px; background: rgba(10,6,22,.72); border: 2px solid; border-radius: 999px; padding: 5px 14px 5px 5px; }
.te-topprize-pill { width: 26px; height: 26px; border-radius: 8px; display: grid; place-items: center; font-weight: 900; color: #241026; }
.te-topprize-val { font-size: 0.78rem; font-weight: 700; color: #fff; white-space: nowrap; }
.te-stage { position: absolute; inset: 0; }
.te-svg { width: 100%; height: 100%; display: block; }
.te-prompt { position: absolute; bottom: 4.8rem; left: 0; right: 0; text-align: center; font-size: 1.05rem; font-weight: 800; text-shadow: 0 2px 8px rgba(0,0,0,.7); pointer-events: none; }
.te-controls { position: absolute; bottom: 1.1rem; left: 0; right: 0; display: flex; flex-direction: column; align-items: center; gap: 8px; }
.te-cta { padding: 0.7rem 1.9rem; border-radius: 12px; font-weight: 900; font-size: 1rem; color: #241026; box-shadow: 0 8px 20px rgba(0,0,0,.4); transition: transform .12s; }
.te-cta:active { transform: scale(.95); }
.te-skip { font-size: 0.8rem; color: rgba(255,255,255,.8); text-decoration: underline; }
.te-overlay { position: absolute; inset: 0; z-index: 16; display: flex; flex-direction: column; align-items: center; justify-content: center; gap: 12px; background: rgba(6,3,14,.66); backdrop-filter: blur(3px); padding: 1.2rem; text-align: center; }
.te-card { background: rgba(14,8,28,.95); border: 2px solid; border-radius: 18px; padding: 1.4rem 1.6rem; display: flex; flex-direction: column; align-items: center; gap: 10px; max-width: 86%; box-shadow: 0 18px 50px rgba(0,0,0,.55); }
.te-card-top { font-size: 1.3rem; font-weight: 900; }
.te-card-name { font-size: 1.12rem; font-weight: 900; }
.te-winlist { list-style: none; padding: 0; margin: 4px 0; display: flex; flex-direction: column; gap: 5px; font-size: 0.9rem; font-weight: 700; max-height: 40vh; overflow-y: auto; }
.te-intro-logo { max-width: 70%; max-height: 130px; object-fit: contain; }
.te-intro-welcome { font-size: 2rem; font-weight: 900; line-height: 1.12; text-shadow: 0 0 24px var(--tglow, #ffd54f), 0 2px 6px rgba(0,0,0,.5); }
.te-intro-sub { font-size: 0.9rem; color: rgba(255,255,255,.6); margin-bottom: 2px; }
.te-intro { overflow: hidden; background: #04020a; backdrop-filter: none; }
/* boxless game menu — no container, content floats on the blackout */
.te-intro-card { position: relative; z-index: 2; display: flex; flex-direction: column; align-items: center; gap: 10px; width: 360px; max-width: 92%; padding: 0 1rem; text-align: center; }
.te-howto { display: flex; flex-direction: column; gap: 8px; margin: 10px 0 4px; font-size: 0.84rem; font-weight: 600; color: rgba(255,255,255,.78); }
.te-howto span { display: flex; align-items: center; gap: 11px; text-align: left; }
.te-howto b { flex: none; display: inline-grid; place-items: center; width: 24px; height: 24px; border-radius: 50%; background: var(--acc, #ffd54f); color: #1a0e1e; font-size: 0.8rem; }
.te-set-label { margin-top: 10px; font-size: 0.7rem; font-weight: 800; letter-spacing: 1.6px; text-transform: uppercase; color: rgba(255,255,255,.45); }
.te-chip-row { display: flex; gap: 10px; width: 100%; justify-content: center; }
.te-chip { flex: 1; padding: 0.66rem 0.4rem; border-radius: 999px; border: 2px solid rgba(255,255,255,.16); background: rgba(255,255,255,.05); color: #fff; font-weight: 800; font-size: 0.86rem; cursor: pointer; transition: transform .12s, background .15s, border-color .15s, box-shadow .15s; }
.te-chip:hover { background: rgba(255,255,255,.12); border-color: rgba(255,255,255,.32); }
.te-chip:active { transform: scale(.95); }
.te-chip.on { background: var(--acc, #ffd54f); border-color: var(--acc, #ffd54f); color: #1a0e1e; box-shadow: 0 0 22px -2px var(--acc, #ffd54f); transform: translateY(-1px); }
.te-intro-start { margin-top: 20px; width: 100%; padding: 0.95rem 1.9rem; font-size: 1.12rem; border-radius: 999px; box-shadow: 0 0 28px -4px var(--acc, #ffd54f), 0 8px 22px rgba(0,0,0,.45); }
.te-intro-start:hover { filter: brightness(1.08); }
/* title splash (beat 1) — plain for now, to be redone */
.te-splash { position: absolute; inset: 0; display: flex; align-items: center; justify-content: center; }
.te-splash-title { position: relative; max-width: 84%; animation: te-wiggle 3s ease-in-out infinite; }
.te-splash-title img { display: block; max-width: 100%; max-height: 44vh; object-fit: contain; animation: te-tglow 1.8s ease-in-out infinite; }
.te-splash-title span { display: block; text-align: center; font-size: clamp(2rem, 11vw, 4.2rem); font-weight: 900; letter-spacing: 1px; animation: te-tglow-text 1.8s ease-in-out infinite; }
@keyframes te-tglow { 0%,100% { filter: drop-shadow(0 0 12px var(--tglow, #ffd54f)) drop-shadow(0 0 24px var(--tglow, #ffd54f)); } 50% { filter: drop-shadow(0 0 22px var(--tglow, #ffd54f)) drop-shadow(0 0 46px var(--tglow, #ffd54f)); } }
@keyframes te-tglow-text { 0%,100% { text-shadow: 0 0 14px var(--tglow, #ffd54f), 0 0 28px var(--tglow, #ffd54f); } 50% { text-shadow: 0 0 24px var(--tglow, #ffd54f), 0 0 50px var(--tglow, #ffd54f); } }
@keyframes te-wiggle {
    0%   { transform: translate(0, 0) rotate(0deg); }
    25%  { transform: translate(-12px, -9px) rotate(-2.5deg); }
    50%  { transform: translate(10px, -5px) rotate(2.5deg); }
    75%  { transform: translate(-7px, 9px) rotate(-1.5deg); }
    100% { transform: translate(0, 0) rotate(0deg); }
}
.te-splash-t-enter-active, .te-splash-t-leave-active { transition: opacity .35s ease; }
.te-splash-t-enter-from, .te-splash-t-leave-to { opacity: 0; }
/* win reveal: blackout + 3D flip card */
.te-reveal { position: absolute; inset: 0; z-index: 17; display: flex; align-items: center; justify-content: center; background: rgba(2,1,8,.93); backdrop-filter: blur(4px); }
.te-flip { width: min(74%, 320px); aspect-ratio: 3 / 4.2; perspective: 1300px; }
.te-flip-in { position: relative; width: 100%; height: 100%; transform-style: preserve-3d; transition: transform 1.15s cubic-bezier(.45,.05,.2,1); transform: rotateY(0deg); }   /* shows the "?" back first */
.te-flip.flipped .te-flip-in { transform: rotateY(180deg); }   /* gentle, slow flip to the real prize */
.te-flip-face { position: absolute; inset: 0; backface-visibility: hidden; border: 3px solid; border-radius: 22px; display: flex; flex-direction: column; align-items: center; justify-content: center; gap: 12px; padding: 1.2rem; box-shadow: 0 20px 60px rgba(0,0,0,.6); overflow: hidden; }
.te-flip-back { background: linear-gradient(150deg, #2a1a52, #120a26); transform: rotateY(0deg); }
.te-flip-front { background: rgba(12,6,26,.98); transform: rotateY(180deg); }
.te-flip-q { font-size: 5rem; font-weight: 900; }
.te-flip-glow { position: absolute; inset: 0; pointer-events: none; }
.te-flip-won { position: relative; font-size: 1.4rem; font-weight: 900; letter-spacing: 2px; }
.te-flip-img { position: relative; width: 58%; aspect-ratio: 1; display: grid; place-items: center; }
.te-flip-img img, .te-flip-img span { animation: te-prize-float 2.6s ease-in-out infinite; }
.te-flip-img img { max-width: 100%; max-height: 100%; object-fit: contain; }
.te-flip-img span { font-size: 4.4rem; }
/* the won prize glows + floats gently up and down */
@keyframes te-prize-float {
    0%, 100% { transform: translateY(-7px); filter: drop-shadow(0 8px 16px rgba(0,0,0,.5)) drop-shadow(0 0 12px var(--pacc, #ffd54f)); }
    50% { transform: translateY(9px); filter: drop-shadow(0 0 30px var(--pacc, #ffd54f)) drop-shadow(0 0 14px #fff); }
}
.te-flip-name { position: relative; font-size: 1.18rem; font-weight: 900; text-align: center; }
.te-flip-collect { position: relative; }
.te-flip-hint { position: relative; font-size: 1.4rem; opacity: .7; }
.te-flip.collecting { transition: transform .5s ease-in, opacity .5s ease-in; transform: translate(30vw, 42vh) scale(.12) rotate(18deg); opacity: 0; }
.te-fade-enter-active, .te-fade-leave-active { transition: opacity .3s; }
.te-fade-enter-from, .te-fade-leave-to { opacity: 0; }
/* in-game title above the reader — static until the first win, then wiggles + glows (scaling with wins) */
.te-gametitle { transition: filter .6s ease; }
.te-gametitle.te-glowing { animation: te-wiggle var(--wdur, 3s) ease-in-out infinite; filter: drop-shadow(0 0 var(--gw, 8px) var(--tglow, #ffd54f)) drop-shadow(0 0 calc(var(--gw, 8px) * 1.9) var(--tglow, #ffd54f)); }
/* rising feeder tickets streaming up to the reader */
.te-riser { transform-box: view-box; opacity: 0; animation-name: te-rise; animation-timing-function: linear; animation-iteration-count: infinite; }
@keyframes te-rise { 0% { transform: translate(500px, 1340px); opacity: 0; } 12% { opacity: 1; } 82% { opacity: 1; } 100% { transform: translate(500px, 470px); opacity: 0; } }

/* pouch — glows, sparkles + shakes when it's holding prizes */
.te-pouch-glow { transform-box: fill-box; transform-origin: center; mix-blend-mode: screen; animation: te-pglow 1.7s ease-in-out infinite; }
@keyframes te-pglow { 0%, 100% { opacity: 0.45; transform: scale(0.85); } 50% { opacity: 0.95; transform: scale(1.22); } }
.te-pouch-shake { transform-box: fill-box; transform-origin: center bottom; animation: te-pshake 0.85s ease-in-out infinite; }
@keyframes te-pshake { 0%, 100% { transform: rotate(0deg); } 25% { transform: rotate(-5.5deg); } 75% { transform: rotate(5.5deg); } }
.te-pouch-spark circle { transform-box: fill-box; transform-origin: center; animation: te-pspark 1.3s ease-in-out infinite; }
@keyframes te-pspark { 0%, 100% { opacity: 0; transform: scale(0.4); } 50% { opacity: 1; transform: scale(1); } }
.te-pouch-tag { transform-box: fill-box; transform-origin: center; animation: te-ptag 0.7s ease-in-out infinite; }
@keyframes te-ptag { 0%, 100% { transform: scale(1); } 50% { transform: scale(1.14); } }
/* always-on treasure glow behind the pouch (depth, even when empty) */
.te-crate-shine { transform-box: fill-box; transform-origin: center; mix-blend-mode: screen; animation: te-cshine 2.4s ease-in-out infinite; }
@keyframes te-cshine { 0%, 100% { opacity: 0.5; transform: scale(0.88); } 50% { opacity: 0.95; transform: scale(1.12); } }
.te-crate-gold { animation: te-cgold 2.2s ease-in-out infinite; }
@keyframes te-cgold { 0%, 100% { opacity: 0.94; } 50% { opacity: 1; } }
/* uploaded pouch art: drop-shadow + gold halo + gentle float so it reads as 3D, not a flat sticker */
.te-pouch-img3d { filter: drop-shadow(0 7px 10px rgba(0, 0, 0, 0.55)) drop-shadow(0 0 16px var(--pg, #ffd54f)); animation: te-pbob 2.6s ease-in-out infinite; will-change: transform; }
@keyframes te-pbob { 0%, 100% { transform: translateY(0); } 50% { transform: translateY(-7px); } }

/* pouch inventory panel */
.te-pouch-panel { position: relative; background: rgba(14, 8, 28, 0.96); border: 2px solid; border-radius: 18px; padding: 1.3rem 1.3rem 1.1rem; width: min(88%, 460px); max-height: 80%; overflow-y: auto; box-shadow: 0 18px 50px rgba(0, 0, 0, 0.55); display: flex; flex-direction: column; gap: 14px; align-items: center; }
.te-pouch-title { font-size: 1.3rem; font-weight: 900; letter-spacing: 0.5px; }
.te-pouch-grid { display: grid; grid-template-columns: repeat(2, 1fr); gap: 12px; width: 100%; }
.te-pouch-item { display: flex; flex-direction: column; align-items: center; gap: 5px; background: rgba(255, 255, 255, 0.06); border-radius: 12px; padding: 12px 8px; }
.te-pouch-img { width: 66px; height: 66px; display: grid; place-items: center; }
.te-pouch-img img { max-width: 100%; max-height: 100%; object-fit: contain; }
.te-pouch-img span { font-size: 2rem; }
.te-pouch-name { font-size: 0.8rem; font-weight: 800; text-align: center; line-height: 1.2; }
.te-pouch-val { font-size: 0.85rem; font-weight: 900; }
.te-pouch-empty { color: rgba(255, 255, 255, 0.7); font-weight: 700; padding: 1rem 0; }
</style>
