<script setup lang="ts">
import { computed, onBeforeUnmount, ref, watch } from 'vue';
import { createFootballSfx } from '@/games/footballSfx';
import SpriteCharacter from '@/Components/Games/SpriteCharacter.vue';

/**
 * Football — original penalty shootout (our own design). Cinematic stadium, animated crowd,
 * a striker who runs up and strikes, a diving keeper, a ball with a motion trail, and a GOAL
 * explosion (confetti + flash + shake + crowd roar) with a slow-mo prize reveal.
 *
 * Flow: Step up → pick a corner → power meter → strike. The OUTCOME is the server-decided result
 * on each ticket (aim/power are for feel only): a winning ticket = keeper dives the wrong way →
 * GOAL + prize popup; a no-win ticket = the keeper SAVES it. Same prop contract as other players.
 */
const props = withDefaults(defineProps<{
    modelValue?: boolean;
    demoMode?: boolean;
    previewMode?: 'mobile' | 'desktop';
    assets?: Record<string, any>;
    tickets?: any[];
    instant_win_categories?: any[];
    ads?: any[];
}>(), {
    modelValue: false, demoMode: false, previewMode: 'mobile', assets: () => ({}), tickets: () => [], instant_win_categories: () => [], ads: () => [],
});
const emit = defineEmits<{ 'update:modelValue': [boolean]; 'wins-collected': [any[]] }>();

// ── Studio preview device-frame (demoMode only) — mirrors the other game modals so football
// previews inside a phone/desktop chrome instead of sprawling. The mobile/desktop layout is driven
// by this toggle (a prop), NOT viewport media queries, so it stays correct inside the narrow pane.
const demoPreviewMode = ref<'mobile' | 'desktop'>('mobile');
const togglePreviewMode = () => { demoPreviewMode.value = demoPreviewMode.value === 'mobile' ? 'desktop' : 'mobile'; };
const actualPreviewMode = computed(() => props.demoMode ? demoPreviewMode.value : (props.previewMode || 'desktop'));
const frameClass = computed(() => props.demoMode ? (actualPreviewMode.value === 'mobile' ? 'is-mobile' : 'is-desktop') : '');
const frameStyle = computed(() => actualPreviewMode.value === 'mobile'
    ? { width: '420px', maxWidth: '100%', height: '650px', border: '1px solid #444', borderRadius: '12px' }
    : { width: '700px', maxWidth: '100%', height: '650px', border: '1px solid #444', borderRadius: '4px' });

const a = computed(() => props.assets || {});
const titleText = computed(() => a.value.titleText || 'Step up to the spot');
const winText = computed(() => a.value.winText || 'GOAL! Back of the net!');
const loseText = computed(() => a.value.loseText || 'Saved! So close…');
const ballImage = computed(() => a.value.ballImage || '');
const strikerFlag = computed(() => a.value.strikerFlag || '');
const keeperFlag = computed(() => a.value.keeperFlag || '');
const keeperSheet = computed(() => a.value.keeperSheet || '/games/football/keeper-default.png?v=12'); // built-in sprite keeper; admin upload overrides
const strikerSheet = computed(() => a.value.strikerSheet || '/games/football/striker-default.png?v=4'); // built-in sprite striker; admin upload overrides
const spriteChroma = computed(() => a.value.spriteChroma === true); // strip near-black bg from sheets
const keeperSheetOk = ref(true);                                 // falls back to the drawn figure on load error
const strikerSheetOk = ref(true);

// Auto-detect frame count from the sheet's aspect ratio, so a single AI image (one tall pose) OR a
// horizontal strip both "just work" with no setup. A Frames value in the studio always overrides it.
const keeperAutoFrames = ref(1);
const strikerAutoFrames = ref(1);
function detectFrames(url: string, target: { value: number }) {
    if (!url || typeof Image === 'undefined') { target.value = 1; return; }
    const im = new Image();
    im.onload = () => { const ar = im.naturalWidth / Math.max(1, im.naturalHeight); target.value = ar < 1.4 ? 1 : Math.max(1, Math.round(ar)); }; // square-ish frames: total aspect ≈ frame count
    im.onerror = () => { target.value = 1; };
    im.src = url;
}
watch(() => a.value.keeperSheet, (u) => detectFrames(u || '', keeperAutoFrames), { immediate: true });
watch(strikerSheet, (u) => detectFrames(u, strikerAutoFrames), { immediate: true });
// Uploaded sheet → explicit Frames if set, else auto. No keeper upload → built-in 8-frame sheet.
const keeperFrames = computed(() => { if (!a.value.keeperSheet) return 5; const set = Number(a.value.keeperFrames) || 0; return set > 0 ? set : keeperAutoFrames.value; });
const strikerFrames = computed(() => { if (!a.value.strikerSheet) return 3; const set = Number(a.value.strikerFrames) || 0; return set > 0 ? set : strikerAutoFrames.value; });
const keeperImage = computed(() => a.value.keeperImage || '');
const strikerImage = computed(() => a.value.strikerImage || '');
const kitColor = computed(() => a.value.primaryColor || '#e11d48');     // striker kit
const accent = computed(() => a.value.accentColor || '#22e1b3');         // our accent (teal)
const keeperKit = computed(() => a.value.goalColor && a.value.goalColor !== '#eeeeee' ? a.value.goalColor : '#f59e0b');
const textColor = computed(() => a.value.textColor || '#ffffff');

// ── Theme palette — drives the pitch, stadium backdrop and sky. Each option ships a complete
// look out of the box (the Theme dropdown picks it; defaults to Classic daytime). ──
// `glowOp` = floodlight intensity, `line` = pitch-marking colour (kept high-contrast vs the grass
// so the markings stay readable on every theme). Grass is deliberately NOT pushed too bright or the
// white lines wash out.
const THEMES: Record<string, Record<string, string>> = {
    // glowA/glowB = the two neon-glow colours (cyan for ball/goal/lines, magenta for keeper/striker);
    // only used when the Neon theme is on, but defined on every theme so the bindings never go empty.
    // Bright sunny afternoon — vivid blue sky, natural green pitch, gentle daytime light.
    classic: { skyTop: '#3f8fd6', skyMid: '#79bef0', skyBot: '#bfe3fb', backdrop: '#1f4f86', standTop: '#275595', standBot: '#5083bd', grassTop: '#3fb866', grassBot: '#207a42', glow: '#ffffff', glowOp: '0.26', line: '#ffffff', glowA: '#ffffff', glowB: '#ffffff' },
    // Floodlit night — deep navy stadium, cooler pitch, bright cold floodlight glow.
    night:   { skyTop: '#04061a', skyMid: '#0a1838', skyBot: '#11214a', backdrop: '#080f24', standTop: '#050a1c', standBot: '#131f40', grassTop: '#2aa055', grassBot: '#125a2e', glow: '#cfeaff', glowOp: '0.5', line: '#ffffff', glowA: '#cfeaff', glowB: '#cfeaff' },
    // Retro sepia dusk — warm amber sky, faded olive turf, golden-hour wash.
    retro:   { skyTop: '#7c3d0e', skyMid: '#e08a24', skyBot: '#f6cf72', backdrop: '#4a3416', standTop: '#3f2a12', standBot: '#785322', grassTop: '#7d9c38', grassBot: '#4a661f', glow: '#ffb13a', glowOp: '0.42', line: '#fff4dc', glowA: '#ffd27a', glowB: '#ffb13a' },
    // Neon arcade — electric purple stadium, DARK pitch so the glow pops, hot magenta wash. The
    // ball/goal/lines glow cyan and the keeper/striker glow magenta (see glowA/glowB).
    neon:    { skyTop: '#16052e', skyMid: '#4a0f86', skyBot: '#8c1fc4', backdrop: '#1d063c', standTop: '#120428', standBot: '#430f7a', grassTop: '#0c5a3c', grassBot: '#04301f', glow: '#ff2fe0', glowOp: '0.6', line: '#bafff4', glowA: '#3df5ff', glowB: '#ff3df0' },
};
const pal = computed(() => THEMES[String(a.value.theme || 'classic')] || THEMES.classic);
// Neon Arcade gets the full treatment: a dark pitch with glowing ball/goal/lines (cyan) and a
// glowing keeper/striker (magenta). Only neon turns these on, so other themes stay clean.
const isNeon = computed(() => String(a.value.theme || 'classic') === 'neon');

// ── Interactive intro config ──
const introEnabled = computed(() => a.value.introEnabled !== false);
const introTitleImage = computed(() => a.value.introTitleImage || '');
const introSubtitle = computed(() => a.value.introSubtitle || '');
const introButtonText = computed(() => a.value.introButtonText || 'Kick Off ⚽');
const introVoiceEnabled = computed(() => a.value.introVoiceEnabled !== false);
const gameName = computed(() => a.value.name || '');
const welcomeMsg = computed(() => (a.value.introWelcomeText || 'Welcome to {name}').replace('{name}', gameName.value || 'the Shootout'));
const showIntro = ref(false);

// ── Top Prize banner — the highest-value instant win that can STILL be won on this competition.
// `instant_win_categories` is scoped to the competition; `available` = count of unclaimed wins. ──
const showTopPrize = computed(() => a.value.showTopPrize !== false);
const topPrize = computed(() => {
    const list = (props.instant_win_categories || []).filter(
        (c: any) => c && Number(c.value) > 0 && (c.available === undefined || c.available > 0)
    );
    if (!list.length) return null;
    // Prefer non-bundle categories — ticket bundles carry a ticket COUNT, not a £ value, so they'd
    // skew the "top prize" banner (a 50-ticket bundle would read as "£50").
    const nonBundle = list.filter((c: any) => c.prize_type !== 'ticket_bundle');
    const pool = nonBundle.length ? nonBundle : list;
    return pool.reduce((best: any, c: any) => (Number(c.value) > Number(best.value) ? c : best));
});
const topPrizeLabel = computed(() => {
    const p: any = topPrize.value;
    if (!p) return '';
    const name = String(p.name || '').trim();
    const v = Number(p.value);
    // Ticket bundles are not a cash prize — show the ticket count, never a £ amount.
    if (p.prize_type === 'ticket_bundle') {
        if (!v || /ticket/i.test(name)) return name;
        return `${name ? name + ' · ' : ''}${Math.floor(v)} Free Ticket${v == 1 ? '' : 's'}`;
    }
    const money = v ? `£${v % 1 === 0 ? v : v.toFixed(2)}` : '';
    // Avoid showing the amount twice when the prize name already includes a £ figure (e.g. "£0.10 Cash").
    return (!money || /£\s*\d/.test(name)) ? name : `${name} · ${money}`;
});

// Default sound kit — procedural Web Audio (crowd, cheer, whistle, kick): zero assets, zero
// licensing. Any uploaded sound for a cue overrides the matching synth default.
const sfx = createFootballSfx();

// geometry (viewBox 0 0 1000 600)
const GOAL = { x1: 300, y1: 120, x2: 700, y2: 330 };
const SPOT = { x: 545, y: 705 };
const KEEP = { x: 500, y: 268 };

// Camera framing. Mobile uses a PORTRAIT window (ratio ~0.5) centred on the goal + penalty spot, so
// the scene FILLS a phone screen edge-to-edge while keeping the whole goal in view; desktop shows the
// full wide pitch. Driven by the same mobile/desktop signal as the rest of the layout.
// NOTE: viewBox min MUST stay 0,0 — a non-zero origin breaks transform-box:view-box transforms
// (keeper dive pivot + ball/striker scale origins shift). Mobile framing comes from `slice`, not a viewBox offset.
// Origin MUST stay 0,0 (see note above). To zoom OUT on mobile we make the viewBox TALLER, not
// offset it: `slice` then scales the scene DOWN to cover the phone, showing more with smaller players.
// The grass is extended below y600 so this taller window stays filled (no black bars).
const sceneViewBox = computed(() => actualPreviewMode.value === 'mobile' ? '0 0 1000 880' : '0 0 1000 600');

// Crowd — a densely packed, distance-desaturated stadium mass (thousands of tiny specks read as
// a real crowd far better than spaced stick-figures), with occasional bright team-colour flecks.
const fans = (() => {
    const out: any[] = [];
    const pal = ['#2f3a57', '#3b4a6b', '#4a5578', '#586079', '#6b7280', '#8a93a8', '#b9c0d0', '#7a3b46', '#a05a64', '#3b5a7a', '#c9b27a', '#d6dae3'];
    const bright = [accent.value, '#ffd54f', '#ff6fae', '#5b7cff', '#26c6da', '#ffffff'];
    let i = 0;
    for (let y = 16; y <= 116; y += 8) {
        const depth = (y - 16) / 100; // rows nearer the pitch sit a touch brighter/larger
        for (let x = 6; x < 994; x += 12) {
            const jx = ((i * 13) % 6) - 3;
            const jy = ((i * 7) % 5) - 2;
            const isBright = (i * 17) % 19 === 0;
            const col = isBright ? bright[(i * 3) % bright.length] : pal[(i * 5) % pal.length];
            out.push({ x: +(x + jx).toFixed(1), y: +(y + jy).toFixed(1), c: col, r: +(1.05 + ((i * 11) % 3) * 0.2 + depth * 0.35).toFixed(2) });
            i++;
        }
    }
    return out;
})();

// Camera flashes — sporadic bright pops scattered across the crowd, like phones & cameras going off.
const flashes = (() => {
    const out: any[] = [];
    for (let i = 0; i < 95; i++) {
        const mega = i % 6 === 0;
        out.push({
            x: +(6 + ((i * 137) % 988)).toFixed(1),
            y: +(14 + ((i * 53) % 104)).toFixed(1),
            r: +((mega ? 8 : 3.6) + ((i * 7) % 4) * 1.2).toFixed(2),
            delay: -((i * 0.37) % 5).toFixed(2),
            dur: (2 + ((i * 0.19) % 2.4)).toFixed(2),
        });
    }
    return out;
})();

// pitchside LED ad boards (other live competitions)
const ads = computed<any[]>(() => (props.ads && props.ads.length ? props.ads.slice(0, 3) : []));
// Repeat enough times to always cover the full 1000-wide board area (no mid-screen gap),
// then scroll by exactly ONE set width so it loops seamlessly right-to-left.
const adCopies = computed(() => { const w = ads.value.length * 224; return w > 0 ? Math.max(2, Math.ceil(1200 / w) + 1) : 0; });
const adStrip = computed(() => Array.from({ length: adCopies.value }, () => ads.value).flat());
const adSetWidth = computed(() => ads.value.length * 224);
const trunc = (s: string, n = 20) => (s && s.length > n ? s.slice(0, n - 1) + '…' : (s || ''));
// Vivid single-colour LED panels (like real perimeter advertising), cycled per board.
const adLed = ['#0b3d91', '#9b1c1c', '#0f766e', '#6d28d9', '#b45309', '#1d4ed8', '#be123c'];
const ledColor = (i: number) => adLed[i % adLed.length];

// penalties
type Pen = { id: any; number: string; win: boolean; prize: string; value: number; image: string; isBundle: boolean };
const pens = ref<Pen[]>([]);
const index = ref(0);
const phase = ref<'ready' | 'aim' | 'power' | 'shooting' | 'result' | 'done'>('ready');
const showPrize = ref(false);
const aim = ref({ x: 500, y: 210 });
const shotTarget = ref({ x: 500, y: 210 }); // where the ball actually goes — aim.x + power-driven height
const shotPower = ref(50); // captured power 0-100 at SHOOT — drives shot height AND speed
const power = ref(0);
const flash = ref(false);
const shake = ref(false);
const roar = ref(false);
const netHit = ref(false);
const saved = ref(false);   // ball thudded off the keeper's gloves → fires the impact squash too
const kicked = ref(false); // ball launched / keeper committed — set AFTER the striker's run-up
const particles = ref<any[]>([]);
const wow = ref(false);
// Goal celebration camera-flash pops — localised bright bursts (NOT a full-screen strobe).
const goalFlashes = (() => {
    const out: any[] = [];
    for (let i = 0; i < 30; i++) {
        out.push({ x: (i * 47) % 100, y: (i * 71) % 98, size: 60 + ((i * 13) % 5) * 16, delay: +(((i * 0.11) % 1.5)).toFixed(2), dur: +(0.7 + ((i * 0.07) % 0.7)).toFixed(2) });
    }
    return out;
})();
let rafId = 0; let powerDir = 1;

const isWin = (t: any) => !!(t?.instant_win && t.instant_win.prize && t.instant_win.prize !== 'NO WIN');
// Match a won ticket to its instant-win category (by id, else by name) so the prize popup can show
// the category's IMAGE and VALUE even when the ticket's own instant_win doesn't carry them.
function categoryFor(iw: any) {
    const cats = props.instant_win_categories || [];
    if (!iw) return null;
    return (iw.category_id != null ? cats.find((c: any) => c.id === iw.category_id) : null)
        || cats.find((c: any) => c.name && (c.name === iw.prize || c.name === iw.name))
        || null;
}
function buildPens() {
    pens.value = (props.tickets || []).map((t) => {
        const iw = t?.instant_win;
        const won = isWin(t);
        const cat: any = won ? categoryFor(iw) : null;
        return {
            id: t.id ?? t.number,
            number: String(t.number ?? t.id ?? ''),
            win: won,
            prize: won ? String(iw.prize) : '',
            value: Number(iw?.value || cat?.value || 0),
            image: iw?.image_path || cat?.image_path || '',
            // Ticket bundles carry a ticket count, not a £ value — flagged so the reveal never shows £.
            isBundle: won && ((iw?.prize_type ?? cat?.prize_type) === 'ticket_bundle'),
        };
    });
    index.value = 0; resetShot();
}
function resetShot() { phase.value = 'ready'; showPrize.value = false; aim.value = { x: 500, y: 210 }; shotTarget.value = { x: 500, y: 210 }; power.value = 0; flash.value = shake.value = roar.value = netHit.value = saved.value = kicked.value = false; particles.value = []; }
watch(() => props.tickets, buildPens, { immediate: true, deep: true });
watch(() => props.modelValue, (o) => { if (o) buildPens(); else stopPower(); });

// Intro: show on open; play the welcome (live opens come from a click, so audio is allowed).
watch(() => props.modelValue, (o) => {
    if (o) { showIntro.value = introEnabled.value; if (showIntro.value && !props.demoMode) playWelcome(); }
    else { showIntro.value = false; cancelSpeech(); sfx.stopCrowd(); }
}, { immediate: true });
// Studio preview: toggling "Show Intro Screen" (a click) re-shows it AND plays the welcome so the
// admin can see + hear it; swapping the title image just re-shows it.
watch(introEnabled, (on) => { if (props.demoMode) { showIntro.value = on; if (on) playWelcome(); } });
watch(introTitleImage, () => { if (props.demoMode && introEnabled.value) showIntro.value = true; });

const current = computed<Pen | null>(() => pens.value[index.value] ?? null);
const total = computed(() => pens.value.length);
const scored = computed(() => pens.value.slice(0, phase.value === 'done' ? total.value : index.value + (phase.value === 'result' ? 1 : 0)).filter((p) => p.win).length);
const wins = computed(() => pens.value.filter((p) => p.win));
const totalWon = computed(() => wins.value.filter((w: any) => !w.isBundle).reduce((sum: number, w: any) => sum + (Number(w.value) || 0), 0));
// Live tracker: the attempts already taken (each resolved penalty), and the running winnings.
const playedCount = computed(() => phase.value === 'done' ? total.value : index.value + (phase.value === 'result' ? 1 : 0));
const playedPens = computed(() => pens.value.slice(0, playedCount.value));
const wonSoFar = computed(() => playedPens.value.filter((p: any) => p.win && !p.isBundle).reduce((sum: number, p: any) => sum + (Number(p.value) || 0), 0));
const trackerView = computed(() => playedPens.value.map((p, gi) => ({ p, gi })).slice(-9)); // only the most recent stay on screen (older ones drop off)
const trackLabel = (p: any) => {
    if (p.isBundle && p.value && !/ticket/i.test(p.prize)) return `${Math.floor(p.value)} FT`;
    if (p.value && !p.isBundle) return `£${p.value % 1 === 0 ? p.value : Number(p.value).toFixed(2)}`;
    return 'WON';
};
const prompt = computed(() => phase.value === 'ready' ? titleText.value : phase.value === 'aim' ? 'Pick your corner 🎯' : phase.value === 'power' ? 'Time your power…' : phase.value === 'shooting' ? '' : current.value?.win ? winText.value : loseText.value);
// Win-card value line: formatted to 2dp, but hidden when the prize name already shows a £ amount
// (e.g. "£0.10 Cash") so the figure never appears twice.
const currentValueLabel = computed(() => {
    const p: any = current.value;
    const v = Number(p?.value || 0);
    if (!v) return '';
    // Ticket bundles aren't a cash prize — show the ticket count, never a £ amount (and skip it
    // entirely when the prize name already mentions tickets, so it isn't shown twice).
    if (p?.isBundle) return /ticket/i.test(p?.prize || '') ? '' : `${Math.floor(v)} Free Ticket${v == 1 ? '' : 's'}`;
    if (/£\s*\d/.test(p?.prize || '')) return '';
    return `£${v % 1 === 0 ? v : v.toFixed(2)}`;
});

// ── Host commentator — drawn pundit with a mic + speech cloud that reacts to the game ──
const hostEnabled = computed(() => a.value.hostEnabled !== false);
const hostImage = computed(() => a.value.hostImage || '/games/football/commentator-default.png?v=1'); // built-in commentator; admin upload overrides
const hostImageOk = ref(true);                                   // falls back to the drawn pundit if the image fails to load
watch(() => a.value.hostImage, () => { hostImageOk.value = true; }); // reset when a new image is chosen (studio preview)
const hostLine = computed(() => {
    if (showIntro.value) return '';
    switch (phase.value) {
        case 'ready': return index.value === 0 ? 'Big moment — step up!' : 'Next one… keep your nerve!';
        case 'aim': return 'Pick your corner…';
        case 'power': return 'Time the power just right!';
        case 'shooting': return 'He strikes it…';
        case 'result': return current.value?.win ? 'GOAL! Get in there! 🎉' : 'Saved! Oh so close!';
        case 'done': return scored.value > 0 ? `Full time — ${scored.value} in the net!` : 'Full time! Unlucky that time.';
        default: return '';
    }
});

const keepLand = ref({ x: 500, y: 268 });
const moving = computed(() => phase.value === 'shooting' || phase.value === 'result');
// Ball + keeper only commit once the striker's run-up reaches the ball (`kicked`), so the ball
// waits on the spot until he actually strikes it. Ball is a touch smaller now.
const ballTf = computed(() => {
    if (!kicked.value) return `translate(${SPOT.x}px, ${SPOT.y}px) scale(0.66)`;
    const t = current.value && !current.value.win ? keepLand.value : shotTarget.value;
    return `translate(${t.x}px, ${t.y}px) scale(0.5)`;
});
// High power = faster flight (shorter), low power = slower. The result wait below stays in sync.
const ballDurMs = computed(() => Math.round(920 - (shotPower.value / 100) * 460)); // ~460ms (max) … 920ms (min)
const ballDur = computed(() => (ballDurMs.value / 1000).toFixed(2));
const keepTf = computed(() => {
    if (!kicked.value) return 'translate(0px, 0px)';
    // Dive toward the ball, but shift his BODY back from the dive direction by a glove's reach, so his
    // OUTSTRETCHED GLOVES (not his chest) land on the ball — that's what makes it read as a hand save.
    const raw = keepLand.value.x - KEEP.x;
    const glove = raw < -25 ? 46 : raw > 25 ? -46 : 0;
    // lift him up ~28px so his reaching gloves meet the ball's height (the horizontal dive otherwise
    // sits at body height and a higher shot sails over his hands).
    const dx = raw + glove, dy = keepLand.value.y - KEEP.y - 20;
    return `translate(${dx}px, ${dy}px)`;
});
// Shadow stays flat on the ground — slides horizontally with the dive only (no lift, no rotation).
const keepShadowTf = computed(() => kicked.value ? `translate(${keepLand.value.x - KEEP.x}px, 0px)` : `translate(${(Math.sin(keeperPhase.value) * 65).toFixed(1)}px, 0px)`);
// Each arm ROTATES from its own (fixed) shoulder so only the glove tip lifts — never detaching.
const keepArmLTf = computed(() => kicked.value ? 'rotate(58deg)' : '');
const keepArmRTf = computed(() => kicked.value ? 'rotate(-58deg)' : '');
// Sprite frames are drawn facing/stepping LEFT. The LAST frame is the dive; the frames before it are
// the walk cycle. To walk or dive RIGHT we just MIRROR the same frames (flipX) — so a sheet only needs
// one walking direction + one dive, half as many frames for the AI to keep consistent.
const keeperWalk = ref(0); // steady flip-book tick — even timing keeps the leg cycle from stuttering
let keeperRaf = 0, keeperT0 = 0;
const keeperPhase = ref(2.5);
// Patrol: starts ~60% right, walks LEFT, switches and walks RIGHT. Position glides every frame on the
// GPU (translate3d); the leg frames flip-book over the top at a steady rate — the competitor's recipe.
function keeperLoop(t: number) {
    if (!keeperT0) keeperT0 = t;
    const elapsed = (t - keeperT0) / 1000;
    keeperPhase.value = 2.5 + elapsed * 0.9;
    if (!kicked.value) keeperWalk.value = Math.floor(elapsed * 7); // ~7fps leg cycle
    keeperRaf = requestAnimationFrame(keeperLoop);
}
keeperRaf = requestAnimationFrame(keeperLoop);
const keeperMovingRight = computed(() => Math.cos(keeperPhase.value) >= 0);
// Idle = he PATROLS his line: glides right→left→right (the body translation is what reads as travel),
// his legs cycle while he moves, and he settles to a stand at each turn. GPU-composited so it's smooth.
const keeperShuffleTf = computed(() => kicked.value
    ? 'translate3d(0,0,0)'
    : `translate3d(${(Math.sin(keeperPhase.value) * 65).toFixed(1)}px,0,0)`);
const keeperFrame = computed(() => {
    const n = Math.max(2, keeperFrames.value);     // 5-frame sheet: 0-3 walk cycle, 4 dive
    if (kicked.value) return n - 1;                // dive = last frame (mirrored for a right dive)
    return keeperWalk.value % Math.max(1, n - 1);  // cycle the walk frames continuously as he patrols
});
// Frames are drawn facing LEFT — mirror the whole sprite when he travels right; dive flips by the ball.
const keeperFlip = computed(() => kicked.value ? (keepLand.value.x - KEEP.x) > 25 : keeperMovingRight.value);
// striker frames: 0 stand, 1 run, 2 kick.
const strikerFrame = computed(() => (!moving.value ? 0 : !kicked.value ? Math.min(1, strikerFrames.value - 1) : Math.min(2, strikerFrames.value - 1)));
const trailTf = computed(() => kicked.value ? `translate(${SPOT.x}px, ${SPOT.y}px)` : '');
// Striker: stands by behind-left of the ball, then runs onto it when he strikes (the .run kick swings).
const strikerSvgTf = computed(() => moving.value
    ? 'translate(395px, 385px) scale(2.25, 3.2)'
    : 'translate(308px, 502px) scale(1.95, 2.85)');
// Flat ground shadow under the striker's feet (kept OUTSIDE his group so it doesn't stretch with him).
const strikerShadowTf = computed(() => moving.value ? 'translate(485px, 769px)' : 'translate(386px, 844px)');

function play(u?: string) { if (!u) return; try { const x = new Audio(u); x.volume = props.demoMode ? 0.35 : 0.75; void x.play().catch(() => {}); } catch { /* */ } }
const wait = (ms: number) => new Promise((r) => setTimeout(r, ms));

// Sound cue: play the uploaded clip if set, else the procedural default.
function cue(type: 'whistle' | 'kick' | 'cheer' | 'save', url?: string) {
    if (url) { play(url); return; }
    sfx.resume();
    sfx[type]();
}
function speak(text: string) {
    try {
        const synth = (window as any).speechSynthesis;
        if (!synth || !text) return;
        synth.cancel();
        const u = new SpeechSynthesisUtterance(text);
        u.rate = 0.98; u.pitch = 1.05; u.volume = props.demoMode ? 0.6 : 0.95;
        synth.speak(u);
    } catch { /* */ }
}
function cancelSpeech() { try { (window as any).speechSynthesis?.cancel(); } catch { /* */ } }
function playWelcome() {
    if (a.value.welcomeSound) { play(a.value.welcomeSound); return; }
    if (introVoiceEnabled.value) speak(welcomeMsg.value);
}
function startGame() { cancelSpeech(); showIntro.value = false; sfx.resume(); }

function step() { console.log('[FB] step()', { phase: phase.value }); if (phase.value === 'ready') { sfx.resume(); phase.value = 'aim'; console.log('[FB] phase -> aim'); } }
function onAim(e: PointerEvent) {
    if (phase.value !== 'aim') { console.log('[FB] onAim ignored, phase=', phase.value); return; }
    // Map the tap to SVG user-space via the live coordinate matrix, so the ball flies EXACTLY where
    // you tapped regardless of how the scene is scaled/letterboxed (contain/cover/any viewBox).
    const el = e.currentTarget as SVGGraphicsElement;
    const svg = el.ownerSVGElement;
    const ctm = svg?.getScreenCTM?.();
    if (!svg || !ctm) return;
    const pt = svg.createSVGPoint();
    pt.x = e.clientX; pt.y = e.clientY;
    const loc = pt.matrixTransform(ctm.inverse());
    aim.value = { x: Math.max(GOAL.x1 + 34, Math.min(GOAL.x2 - 34, loc.x)), y: Math.max(GOAL.y1 + 30, Math.min(GOAL.y2 - 18, loc.y)) };
    console.log('[FB] onAim TAP', { client: [Math.round(e.clientX), Math.round(e.clientY)], loc: [Math.round(loc.x), Math.round(loc.y)], aim: JSON.stringify(aim.value) });
    startPower();
}
function startPower() {
    console.log('[FB] startPower() -> phase=power, aim=', JSON.stringify(aim.value));
    phase.value = 'power'; power.value = 0; powerDir = 1;
    const loop = () => { power.value += powerDir * 3; if (power.value >= 100) { power.value = 100; powerDir = -1; } if (power.value <= 0) { power.value = 0; powerDir = 1; } rafId = requestAnimationFrame(loop); };
    rafId = requestAnimationFrame(loop);
}
function stopPower() { if (rafId) cancelAnimationFrame(rafId); rafId = 0; }

function makeParticles() {
    const cols = [accent.value, '#ffd54f', '#fff', kitColor.value, '#5b7cff'];
    particles.value = Array.from({ length: 28 }, (_, i) => {
        const ang = (Math.PI * 2 * i) / 28 + Math.random() * 0.4;
        const d = 60 + Math.random() * 120;
        return { dx: Math.cos(ang) * d, dy: Math.sin(ang) * d - 30, col: cols[i % cols.length], rot: Math.random() * 360, delay: Math.random() * 0.08 };
    });
}

async function strike() {
    if (phase.value !== 'power' || !current.value) return;
    stopPower();
    phase.value = 'shooting';                       // striker starts his run-up to the ball
    cue('whistle', a.value.whistleSound);
    shotPower.value = power.value;                  // capture the power level (drives height + speed)
    // Power controls HEIGHT: high power lifts the shot toward the top of the goal, low power keeps it low.
    const span = (GOAL.y2 - GOAL.y1) / 2 - 22;
    const py = Math.max(GOAL.y1 + 22, Math.min(GOAL.y2 - 22, aim.value.y - ((shotPower.value - 50) / 50) * span));
    shotTarget.value = { x: aim.value.x, y: py };
    const mirror = 1000 - shotTarget.value.x;
    keepLand.value = current.value.win
        ? { x: Math.max(GOAL.x1 + 26, Math.min(GOAL.x2 - 26, mirror)), y: shotTarget.value.y + 26 }
        : { x: shotTarget.value.x, y: shotTarget.value.y };
    await wait(360);                                // run-up: the ball waits on the spot
    cue('kick', a.value.kickSound);                 // contact
    kicked.value = true;                            // NOW the ball launches + the keeper dives
    await wait(ballDurMs.value);
    phase.value = 'result';
    if (current.value.win) {
        netHit.value = true; flash.value = true; shake.value = true; roar.value = true; wow.value = true; makeParticles();
        cue('cheer', a.value.winSound || a.value.crowdSound);
        await wait(1800);
        showPrize.value = true;          // card slides in WHILE the strobe + mega shake keep raging behind it
        await wait(4700);
        shake.value = false; wow.value = false; flash.value = false;
    } else {
        saved.value = true; shake.value = true;     // earthquake jolt + impact squash on the block
        cue('save', a.value.lossSound);
        await wait(1150);
        if (phase.value === 'result' && current.value && !current.value.win) next();
    }
}
function next() { console.log('[FB] next()', { index: index.value, total: total.value }); showPrize.value = false; if (index.value < total.value - 1) { index.value++; resetShot(); } else finish(); }
function skipAll() { finish(); }
function finish() { console.log('[FB] finish() -> done, wins=', wins.value.length); phase.value = 'done'; showPrize.value = false; emit('wins-collected', wins.value.map((w) => ({ prize: w.prize, value: w.value }))); }
function close() {
    stopPower(); cancelSpeech(); sfx.stopCrowd();
    if (props.demoMode) { buildPens(); showIntro.value = introEnabled.value; return; }
    emit('update:modelValue', false);
}
onBeforeUnmount(() => { stopPower(); cancelSpeech(); sfx.dispose(); cancelAnimationFrame(keeperRaf); });
</script>

<template>
    <Teleport to="body" :disabled="demoMode">
    <div v-if="modelValue" class="fbg-root" :class="demoMode ? 'fbg-demo' : 'fbg-fixed'">

        <div :class="demoMode ? 'fbg-demo-device fbg-modal-zoom' : 'contents'" :style="demoMode ? frameStyle : undefined">
            <div v-if="demoMode && actualPreviewMode === 'mobile'" class="fbg-demo-statusbar">
                <span>9:41</span>
                <span class="fbg-demo-sigs"><span class="fbg-demo-sig-a"></span><span class="fbg-demo-sig-b"></span></span>
            </div>
            <div v-else-if="demoMode" class="fbg-demo-browserbar">
                <span class="fbg-demo-dots"><span></span><span></span><span></span></span>
                <span class="fbg-demo-url">⚽ Football — Take Your Shot</span>
            </div>

            <div :class="demoMode ? 'fbg-demo-scroll' : 'contents'">
    <div class="fbg" :class="frameClass" :style="{ '--ac': accent }">
        <button v-if="!demoMode" class="fbg-x" :style="{ color: textColor }" @click="close" aria-label="Close">×</button>
        <div class="fbg-top">
            <p class="fbg-eyebrow" :style="{ color: accent }">Penalty Shootout</p>
            <p class="fbg-prompt" :style="{ color: textColor }">{{ prompt }}</p>
            <div v-if="showTopPrize && topPrize" class="fbg-topprize" :style="{ borderColor: accent, color: textColor }">
                <img v-if="topPrize.image_path" :src="topPrize.image_path" class="fbg-topprize-img" alt="" />
                <span v-else class="fbg-topprize-emoji">🏆</span>
                <span :style="{ color: accent }">TOP PRIZE</span>
                <span class="fbg-topprize-val">{{ topPrizeLabel }}</span>
            </div>
        </div>

        <div class="fbg-stage" :class="{ shake, megashake: wow }">
            <svg class="fbg-svg" :viewBox="sceneViewBox" preserveAspectRatio="xMidYMid slice">
                <defs>
                    <linearGradient id="fbg-sky" x1="0" y1="0" x2="0" y2="1"><stop offset="0" :stop-color="pal.skyTop" /><stop offset="0.6" :stop-color="pal.skyMid" /><stop offset="1" :stop-color="pal.skyBot" /></linearGradient>
                    <linearGradient id="fbg-stand" x1="0" y1="0" x2="0" y2="1"><stop offset="0" :stop-color="pal.standTop" /><stop offset="1" :stop-color="pal.standBot" /></linearGradient>
                    <linearGradient id="fbg-grass" x1="0" y1="0" x2="0" y2="1"><stop offset="0" :stop-color="pal.grassTop" /><stop offset="1" :stop-color="pal.grassBot" /></linearGradient>
                    <radialGradient id="fbg-flood" cx="0.5" cy="0.5" r="0.5"><stop offset="0" :stop-color="pal.glow" :stop-opacity="pal.glowOp" /><stop offset="1" stop-opacity="0" /></radialGradient>
                    <radialGradient id="fbg-ball" cx="0.36" cy="0.3" r="0.9"><stop offset="0" stop-color="#fff" /><stop offset="0.7" stop-color="#eef1f6" /><stop offset="1" stop-color="#c4cad6" /></radialGradient>
                    <radialGradient id="fbg-ball-edge" cx="0.4" cy="0.34" r="0.66"><stop offset="0.5" stop-color="#000" stop-opacity="0" /><stop offset="1" stop-color="#0a0e16" stop-opacity="0.36" /></radialGradient>
                    <linearGradient id="fbg-trail" x1="0" y1="0" x2="1" y2="0"><stop offset="0" :stop-color="accent" stop-opacity="0" /><stop offset="1" :stop-color="accent" stop-opacity="0.8" /></linearGradient>
                    <pattern id="fbg-net" width="14" height="14" patternUnits="userSpaceOnUse"><path d="M0 0H14M0 0V14" stroke="rgba(214,230,255,.55)" stroke-width="1.3" fill="none" /></pattern>
                    <radialGradient id="fbg-flashglow" cx="0.5" cy="0.5" r="0.5"><stop offset="0" stop-color="#ffffff" /><stop offset="0.35" stop-color="#fdfeff" stop-opacity="0.82" /><stop offset="1" stop-color="#dfe8ff" stop-opacity="0" /></radialGradient>
                    <filter id="fbg-glow" x="-60%" y="-60%" width="220%" height="220%"><feGaussianBlur stdDeviation="5" result="b" /><feMerge><feMergeNode in="b" /><feMergeNode in="SourceGraphic" /></feMerge></filter>
                    <filter id="fbg-soft" x="-60%" y="-60%" width="220%" height="220%"><feGaussianBlur stdDeviation="3.5" /></filter>
                    <!-- Neon-arcade glows: cyan (ball/goal/lines) + magenta (keeper/striker), colours from the theme palette. -->
                    <filter id="fbg-neonC" x="-70%" y="-70%" width="240%" height="240%"><feDropShadow dx="0" dy="0" stdDeviation="6" :flood-color="pal.glowA" flood-opacity="0.95" /></filter>
                    <filter id="fbg-neonM" x="-70%" y="-70%" width="240%" height="240%"><feDropShadow dx="0" dy="0" stdDeviation="6" :flood-color="pal.glowB" flood-opacity="0.95" /></filter>
                </defs>

                <rect x="0" y="0" width="1000" height="200" fill="url(#fbg-sky)" />
                <ellipse cx="150" cy="14" rx="320" ry="160" fill="url(#fbg-flood)" />
                <ellipse cx="850" cy="14" rx="320" ry="160" fill="url(#fbg-flood)" />
                <rect x="0" y="0" width="1000" height="146" fill="url(#fbg-grass)" opacity="0" />
                <rect x="0" y="0" width="1000" height="146" :fill="pal.backdrop" />
                <rect x="0" y="0" width="1000" height="13" fill="#000" opacity="0.4" />
                <g stroke="rgba(0,0,0,.28)" stroke-width="2.4"><line x1="0" y1="34" x2="1000" y2="34" /><line x1="0" y1="60" x2="1000" y2="60" /><line x1="0" y1="88" x2="1000" y2="88" /><line x1="0" y1="118" x2="1000" y2="118" /></g>

                <!-- crowd: graded stand backdrop, packed speckle crowd, roof shadow for depth -->
                <rect x="0" y="14" width="1000" height="104" fill="url(#fbg-stand)" opacity="0.9" />
                <g class="fbg-crowd" :class="{ roar }">
                    <circle v-for="(f, i) in fans" :key="i" :cx="f.x" :cy="f.y" :r="f.r" :fill="f.c" />
                </g>
                <rect x="0" y="13" width="1000" height="34" fill="#000" opacity="0.3" />
                <rect x="0" y="13" width="1000" height="4" fill="#000" opacity="0.55" />

                <!-- camera flashes — sporadic bright pops across the crowd -->
                <g class="fbg-camflashes">
                    <circle v-for="(cf, i) in flashes" :key="'cf'+i" class="fbg-camflash" fill="url(#fbg-flashglow)" :cx="cf.x" :cy="cf.y" :r="cf.r"
                        :style="{ animationDelay: cf.delay + 's', animationDuration: cf.dur + 's' }" />
                </g>

                <!-- pitchside LED ad boards — dynamic live competitions, styled like real perimeter advertising -->
                <g v-if="ads.length">
                    <clipPath id="fbg-hoard"><rect x="0" y="120" width="1000" height="26" /></clipPath>
                    <rect x="0" y="118" width="1000" height="3" fill="#000" opacity="0.55" />
                    <rect x="0" y="120" width="1000" height="26" fill="#04060d" />
                    <g clip-path="url(#fbg-hoard)">
                        <g :key="ads.length">
                            <g v-for="(ad, i) in adStrip" :key="i" :transform="`translate(${i * 224}, 121)`">
                                <rect width="216" height="24" rx="2" :fill="ledColor(i)" />
                                <rect width="216" height="11" rx="2" fill="#fff" opacity="0.13" />
                                <rect x="0.5" y="0.5" width="215" height="23" rx="2" fill="none" stroke="#fff" stroke-opacity="0.16" />
                                <rect v-if="ad.image" x="4" y="3" width="20" height="18" rx="2" fill="#000" opacity="0.28" />
                                <image v-if="ad.image" :href="ad.image" x="5" y="4" width="18" height="16" preserveAspectRatio="xMidYMid slice" />
                                <text :x="ad.image ? 30 : 11" y="16" fill="#fff" font-size="11" font-weight="800" letter-spacing="0.4">{{ trunc(ad.name) }}</text>
                            </g>
                            <animateTransform attributeName="transform" type="translate" from="0 0" :to="`-${adSetWidth} 0`" :dur="`${Math.max(14, ads.length * 4)}s`" repeatCount="indefinite" />
                        </g>
                    </g>
                    <rect x="0" y="145" width="1000" height="2" :fill="accent" opacity="0.22" />
                </g>

                <!-- pitch -->
                <rect x="0" y="146" width="1000" height="860" fill="url(#fbg-grass)" />
                <rect v-for="s in 9" :key="'st'+s" :x="(s-1)*112" y="146" width="56" height="860" fill="#fff" opacity="0.03" />
                <g fill="none" :stroke="pal.line" stroke-width="3.5" opacity="0.7" :filter="isNeon ? 'url(#fbg-neonC)' : undefined"><path d="M110 600 L110 430 L890 430 L890 600" /><path d="M360 430 A150 56 0 0 0 640 430" /></g>

                <!-- goal -->
                <rect :x="GOAL.x1 + 7" :y="GOAL.y1 + 7" :width="GOAL.x2 - GOAL.x1 - 14" :height="GOAL.y2 - GOAL.y1 - 7" fill="url(#fbg-net)" :class="{ ripple: netHit }" />
                <g fill="none" :stroke="textColor" stroke-width="8" stroke-linejoin="round" :style="netHit ? { filter: 'url(#fbg-glow)' } : (isNeon ? { filter: 'url(#fbg-neonC)' } : {})">
                    <path :d="`M${GOAL.x1} ${GOAL.y2} L${GOAL.x1} ${GOAL.y1} L${GOAL.x2} ${GOAL.y1} L${GOAL.x2} ${GOAL.y2}`" />
                </g>

                <!-- keeper shadow — stays flat on the ground, just slides sideways with the dive -->
                <ellipse cx="500" cy="350" rx="46" ry="10" fill="#000" opacity="0.34" filter="url(#fbg-soft)"
                    :style="{ transform: keepShadowTf, transformBox: 'view-box', transformOrigin: '500px 350px', transition: kicked ? 'transform .5s cubic-bezier(.3,.7,.4,1)' : 'none' }" />

                <!-- GOALKEEPER -->
                <g :filter="isNeon ? 'url(#fbg-neonM)' : undefined" :style="{ transform: keepTf, transformBox: 'view-box', transformOrigin: '500px 268px', transition: kicked ? 'transform .5s cubic-bezier(.3,.7,.4,1)' : 'none' }">
                    <g v-if="keeperSheet && keeperSheetOk" :style="{ transform: keeperShuffleTf, willChange: 'transform' }">
                        <foreignObject x="425" y="160" width="150" height="190">
                            <SpriteCharacter :sheet="keeperSheet" :frames="keeperFrames" :frame="keeperFrame" :flip-x="keeperFlip" :chroma-key="spriteChroma" @error="keeperSheetOk = false" />
                        </foreignObject>
                    </g>
                    <image v-else-if="keeperImage" :href="keeperImage" x="448" y="196" width="104" height="140" />
                    <g v-else class="fbg-keeper-tall">
                      <g :class="{ 'fbg-keeper-idle': !kicked }">
                        <!-- legs -->
                        <path d="M490 300 q-6 18 -10 30" stroke="#222a3f" stroke-width="13" stroke-linecap="round" fill="none" />
                        <path d="M510 300 q6 18 10 30" stroke="#222a3f" stroke-width="13" stroke-linecap="round" fill="none" />
                        <!-- arms FIRST (drawn behind), each pivots at its OWN shoulder so only the glove tip
                             moves (bobs up/down on standby, lifts on the dive); the shoulders stay put. -->
                        <g class="fbg-arm" :class="{ 'arm-idle-l': !kicked }" :style="kicked ? { transform: keepArmLTf, transformBox: 'view-box', transformOrigin: '484px 276px', transition: 'transform .35s ease' } : undefined">
                            <path d="M483 274 q-24 2 -40 18" :stroke="keeperKit" stroke-width="12" stroke-linecap="round" fill="none" />
                            <circle cx="441" cy="294" r="11" :fill="accent" filter="url(#fbg-glow)" />
                        </g>
                        <g class="fbg-arm" :class="{ 'arm-idle-r': !kicked }" :style="kicked ? { transform: keepArmRTf, transformBox: 'view-box', transformOrigin: '516px 276px', transition: 'transform .35s ease' } : undefined">
                            <path d="M517 274 q24 2 40 18" :stroke="keeperKit" stroke-width="12" stroke-linecap="round" fill="none" />
                            <circle cx="559" cy="294" r="11" :fill="accent" filter="url(#fbg-glow)" />
                        </g>
                        <!-- torso — drawn OVER the arm roots so the arms look attached at the shoulders -->
                        <path d="M478 262 q22 -12 44 0 l-3 42 q-19 8 -38 0 z" :fill="keeperKit" />
                        <path d="M478 262 q22 -12 44 0 l-2 12 q-20 -8 -40 0 z" :fill="accent" opacity="0.9" />
                        <clipPath id="fbg-keeper-shirt"><path d="M478 262 q22 -12 44 0 l-3 42 q-19 8 -38 0 z" /></clipPath>
                        <image v-if="keeperFlag" :href="keeperFlag" x="477" y="258" width="46" height="48" preserveAspectRatio="xMidYMid slice" clip-path="url(#fbg-keeper-shirt)" />
                        <!-- head -->
                        <circle cx="500" cy="248" r="16" fill="#e9b489" />
                        <path d="M485 244 q15 -16 30 0 q-15 -8 -30 0z" fill="#2b2016" />
                      </g>
                    </g>
                </g>

                <!-- aim reticle -->
                <g v-if="phase === 'aim' || phase === 'power'" :stroke="accent" stroke-width="3" fill="none" filter="url(#fbg-glow)">
                    <circle :cx="aim.x" :cy="aim.y" r="6" :fill="accent" />
                    <circle :cx="aim.x" :cy="aim.y" r="22" opacity="0.8" />
                    <line :x1="aim.x - 34" :y1="aim.y" :x2="aim.x - 24" :y2="aim.y" /><line :x1="aim.x + 24" :y1="aim.y" :x2="aim.x + 34" :y2="aim.y" />
                    <line :x1="aim.x" :y1="aim.y - 34" :x2="aim.x" :y2="aim.y - 24" /><line :x1="aim.x" :y1="aim.y + 24" :x2="aim.x" :y2="aim.y + 34" />
                </g>

                <!-- ball motion trail -->
                <line v-if="kicked" :x1="SPOT.x" :y1="SPOT.y" :x2="current && !current.win ? keepLand.x : shotTarget.x" :y2="current && !current.win ? keepLand.y : shotTarget.y"
                    stroke="url(#fbg-trail)" stroke-width="6" stroke-linecap="round" opacity="0.55" class="fbg-trail" />

                <!-- striker ground shadow — flat, slides to his feet as he runs up -->
                <ellipse cx="0" cy="0" rx="44" ry="11" fill="#000" opacity="0.3" filter="url(#fbg-soft)"
                    :style="{ transform: strikerShadowTf, transformBox: 'view-box', transformOrigin: '0px 0px', transition: 'transform .5s cubic-bezier(.4,.1,.3,1)' }" />
                <!-- STRIKER (in-scene so it scales & stays aligned with the pitch at any framing) -->
                <g class="fbg-striker-svg" :class="{ run: moving }" :filter="isNeon ? 'url(#fbg-neonM)' : undefined" :style="{ transform: strikerSvgTf, transformBox: 'view-box', transformOrigin: '0px 0px', transition: 'transform .5s cubic-bezier(.4,.1,.3,1)' }">
                    <foreignObject v-if="strikerSheet && strikerSheetOk" x="0" y="0" width="80" height="120">
                        <SpriteCharacter :sheet="strikerSheet" :frames="strikerFrames" :frame="strikerFrame" :chroma-key="spriteChroma" @error="strikerSheetOk = false" />
                    </foreignObject>
                    <image v-else-if="strikerImage" :href="strikerImage" x="0" y="0" width="80" height="120" />
                    <g v-else>
                        <path d="M40 60 q-4 22 -10 40" stroke="#e9b489" stroke-width="9" stroke-linecap="round" fill="none" />
                        <g class="kick"><path d="M44 60 q14 6 26 2" stroke="#e9b489" stroke-width="9" stroke-linecap="round" fill="none" /><rect x="66" y="56" width="14" height="7" rx="3" fill="#111" /></g>
                        <rect x="26" y="80" width="14" height="7" rx="3" fill="#111" />
                        <path d="M30 52 l22 0 l-3 12 l-16 0 z" fill="#fff" />
                        <path d="M30 26 q11 -7 22 0 l1 28 l-24 0 z" :fill="kitColor" />
                        <path d="M38 22 l7 1 l1 31 l-9 0 z" :fill="accent" opacity="0.9" />
                        <clipPath id="fbg-striker-shirt"><path d="M30 26 q11 -7 22 0 l1 28 l-24 0 z" /></clipPath>
                        <image v-if="strikerFlag" :href="strikerFlag" x="29" y="24" width="24" height="33" preserveAspectRatio="xMidYMid slice" clip-path="url(#fbg-striker-shirt)" />
                        <path d="M32 30 q-12 6 -16 18" stroke="#e9b489" stroke-width="7" stroke-linecap="round" fill="none" />
                        <path d="M50 30 q12 4 16 12" stroke="#e9b489" stroke-width="7" stroke-linecap="round" fill="none" />
                        <circle cx="41" cy="15" r="10" fill="#e9b489" />
                        <path d="M31 13 q10 -11 20 0 q-10 -6 -20 0z" fill="#241608" />
                    </g>
                </g>

                <!-- BALL -->
                <g :style="{ transform: ballTf, transformBox: 'view-box', transition: kicked ? `transform ${ballDur}s cubic-bezier(.2,.55,.3,1)` : 'none' }">
                    <circle v-if="netHit" class="fbg-ball-glow" r="42" :fill="accent" filter="url(#fbg-glow)" />
                    <ellipse cx="0" cy="31" rx="30" ry="7" fill="#000" opacity="0.32" filter="url(#fbg-soft)" />
                    <g :class="{ 'fbg-ball-arc': kicked }" :style="{ animationDuration: ballDur + 's' }">
                    <g :class="{ 'fbg-ball-impact': netHit || saved }">
                    <g :class="{ spin: kicked }" :filter="isNeon ? 'url(#fbg-neonC)' : undefined">
                        <image v-if="ballImage" :href="ballImage" x="-32" y="-32" width="64" height="64" />
                        <g v-else>
                            <circle r="32" fill="url(#fbg-ball)" stroke="#aab0bd" stroke-width="1.3" />
                            <path d="M0 -13 L12.4 -4 L7.6 10.5 L-7.6 10.5 L-12.4 -4 Z" fill="#1b1e25" />
                            <g fill="#1b1e25">
                                <path d="M0 -31 L8 -24.5 L4 -16 L-4 -16 L-8 -24.5 Z" />
                                <path d="M29.5 -9.6 L24.5 -2.5 L16 -4 L19 -12 L27 -15 Z" />
                                <path d="M18.2 25.1 L9.5 22.5 L8 13.5 L17.5 14.5 L22 21.5 Z" />
                                <path d="M-18.2 25.1 L-9.5 22.5 L-8 13.5 L-17.5 14.5 L-22 21.5 Z" />
                                <path d="M-29.5 -9.6 L-24.5 -2.5 L-16 -4 L-19 -12 L-27 -15 Z" />
                            </g>
                            <path d="M0 -13 L0 -24.5 M12.4 -4 L24 -9.6 M7.6 10.5 L14.5 21 M-7.6 10.5 L-14.5 21 M-12.4 -4 L-24 -9.6" stroke="#1b1e25" stroke-width="1.8" fill="none" opacity="0.85" />
                            <circle r="32" fill="url(#fbg-ball-edge)" />
                            <ellipse cx="-11" cy="-13" rx="10" ry="6.5" fill="#fff" opacity="0.6" />
                        </g>
                    </g>
                    </g>
                    </g>
                </g>

                <!-- goal confetti burst -->
                <g v-if="particles.length" :transform="`translate(${aim.x}, ${aim.y})`">
                    <rect v-for="(p, i) in particles" :key="i" class="fbg-particle" x="-3" y="-3" width="6" height="9" :fill="p.col"
                        :style="{ '--dx': p.dx + 'px', '--dy': p.dy + 'px', '--rot': p.rot + 'deg', animationDelay: p.delay + 's' }" />
                </g>

                <!-- aim capture — CTM-mapped so the ball flies exactly where you tap, at any framing -->
                <rect v-if="phase === 'aim'" x="-3000" y="-3000" width="7000" height="7000" fill="transparent" style="cursor: crosshair" @pointerdown="onAim" />
            </svg>

            <div class="fbg-hud">PENALTY {{ Math.min(index + 1, total) }}/{{ total }} <span :style="{ color: accent }">·</span> ⚽ {{ scored }}</div>
            <div class="fbg-flash" :class="{ on: flash }"></div>
        </div>

        <!-- live left-side penalty tracker: green circle = goal (+value box), X = saved; keeps a running total -->
        <div v-if="trackerView.length" class="fbg-tracker">
            <transition-group name="fbg-track" tag="div" class="fbg-tracker-list">
                <div v-for="item in trackerView" :key="item.gi" class="fbg-track">
                    <span class="fbg-track-dot" :class="item.p.win ? 'won' : 'miss'"><template v-if="!item.p.win">✗</template></span>
                    <span v-if="item.p.win" class="fbg-track-box" :style="{ borderColor: accent, color: accent }">{{ trackLabel(item.p) }}</span>
                </div>
            </transition-group>
        </div>

        <!-- vertical power meter beside the footballer (fills bottom->top, fast) -->
        <div v-if="phase === 'power'" class="fbg-vmeter">
            <span class="fbg-vmeter-label" :style="{ color: textColor }">POWER</span>
            <div class="fbg-vmeter-bar"><div class="fbg-vmeter-grad"></div><div class="fbg-vmeter-marker" :style="{ bottom: power + '%' }"></div></div>
        </div>

        <div class="fbg-lower">
            <button v-if="phase === 'ready'" class="fbg-cta" :style="{ background: kitColor, color: textColor }" @click="step">Step up ⚽</button>
            <p v-else-if="phase === 'aim'" class="fbg-hint" :style="{ color: textColor }">Tap where you want to place it 🎯</p>
            <button v-else-if="phase === 'power'" class="fbg-cta fbg-shoot" :style="{ background: accent, color: '#04231b' }" @click="strike">SHOOT! 💥</button>
            <button v-else-if="phase === 'shooting'" class="fbg-cta" disabled :style="{ color: textColor }">Striking…</button>
            <button v-if="phase === 'ready' && total > 1" class="fbg-skip" :style="{ color: textColor }" @click="skipAll">Skip remaining</button>
        </div>

        <!-- Host commentator — drawn pundit with a headset mic + speech cloud; reacts to the game, wiggles -->
        <div v-if="hostEnabled && !showIntro" class="fbg-host">
            <transition name="fbg-bubble">
                <div v-if="hostLine" class="fbg-host-bubble">{{ hostLine }}</div>
            </transition>
            <img v-if="hostImage && hostImageOk" :src="hostImage" class="fbg-host-avatar fbg-host-img" alt="" @error="hostImageOk = false" />
            <svg v-else class="fbg-host-avatar" viewBox="0 0 64 70" aria-hidden="true">
                <path d="M16 32 a16 16 0 0 1 32 0" fill="none" stroke="#1f2937" stroke-width="4" />
                <circle cx="32" cy="36" r="15" fill="#e9b489" />
                <path d="M18 32 q14 -16 28 0 q-14 -7 -28 0z" fill="#3a2a18" />
                <rect x="13" y="31" width="7" height="12" rx="3" fill="#111827" />
                <rect x="44" y="31" width="7" height="12" rx="3" fill="#111827" />
                <circle cx="27" cy="36" r="1.8" fill="#1b1b1b" /><circle cx="37" cy="36" r="1.8" fill="#1b1b1b" />
                <path d="M27 42 q5 4 10 0" stroke="#1b1b1b" stroke-width="2" fill="none" stroke-linecap="round" />
                <path d="M17 41 q-6 9 2 18" stroke="#111827" stroke-width="3" fill="none" />
                <circle cx="21" cy="59" r="5" :fill="accent" stroke="#0b1220" stroke-width="2" />
            </svg>
        </div>

        <transition name="fade">
            <div v-if="showIntro" class="fbg-overlay fbg-intro" @click.self="startGame">
                <div class="fbg-intro-inner">
                    <img v-if="introTitleImage" :src="introTitleImage" class="fbg-intro-logo" alt="" />
                    <div v-else class="fbg-intro-ball">⚽</div>
                    <h2 class="fbg-intro-title" :style="{ color: accent }">{{ welcomeMsg }}</h2>
                    <p v-if="introSubtitle" class="fbg-intro-sub" :style="{ color: textColor }">{{ introSubtitle }}</p>
                    <button class="fbg-cta fbg-intro-cta" :style="{ background: kitColor, color: textColor }" @click="startGame">{{ introButtonText }}</button>
                </div>
            </div>
        </transition>
        <div v-if="wow" class="fbg-wow"></div>
        <div v-if="wow" class="fbg-goalflashes">
            <span v-for="(gf, i) in goalFlashes" :key="'gf'+i" class="fbg-goalflash" :style="{ left: gf.x + '%', top: gf.y + '%', width: gf.size + 'px', height: gf.size + 'px', animationDelay: gf.delay + 's', animationDuration: gf.dur + 's' }"></span>
        </div>
        <div v-if="wow && !showPrize" class="fbg-goalshout" :style="{ color: accent }">GOAAL!!</div>

        <transition name="fade">
            <div v-if="showPrize && current" class="fbg-overlay">
                <div class="fbg-card" :style="{ borderColor: accent }">
                    <div class="fbg-goal" :style="{ color: accent }">GOAL! ⚽��</div>
                    <div class="fbg-visual"><img v-if="current.image" :src="current.image" alt="prize" /><img v-else-if="introTitleImage" :src="introTitleImage" alt="logo" /><span v-else>🏆</span></div>
                    <div class="fbg-won" :style="{ color: textColor }">{{ winText }}</div>
                    <div class="fbg-name" :style="{ color: accent }">{{ current.prize }}</div>
                    <div v-if="currentValueLabel" class="fbg-value" :style="{ color: textColor }">{{ currentValueLabel }}</div>
                    <button class="fbg-cta" :style="{ background: kitColor, color: textColor }" @click="next">{{ index < total - 1 ? 'Next penalty →' : 'Collect 🎉' }}</button>
                </div>
            </div>
        </transition>
        <transition name="fade">
            <div v-if="phase === 'done'" class="fbg-overlay">
                <div class="fbg-card" :style="{ borderColor: accent }">
                    <div class="fbg-goal" :style="{ color: accent }">Full time! ⚽</div>
                    <div class="fbg-won" :style="{ color: textColor }">You scored {{ scored }} of {{ total }}</div>
                    <div v-if="totalWon" class="fbg-fulltotal" :style="{ color: accent }">Total won: £{{ totalWon % 1 === 0 ? totalWon : totalWon.toFixed(2) }}</div>

                    <!-- scorecard: one dot per penalty -->
                    <div class="fbg-scorecard">
                        <span v-for="(p, i) in pens" :key="i" class="fbg-scoredot" :class="p.win ? 'goal' : 'miss'" :style="p.win ? { background: accent, color: '#04231b', borderColor: accent } : {}">{{ p.win ? '⚽' : '✗' }}</span>
                    </div>

                    <!-- full history: every penalty, win or no-win -->
                    <ul class="fbg-history">
                        <li v-for="(p, i) in pens" :key="i" :class="p.win ? 'win' : 'miss'">
                            <span class="fbg-hist-n">{{ i + 1 }}</span>
                            <span v-if="p.win" class="fbg-hist-res"><b :style="{ color: accent }">GOAL</b> · {{ p.prize }}<span v-if="p.isBundle && p.value && !/ticket/i.test(p.prize)"> ({{ Math.floor(p.value) }} Free Ticket{{ p.value == 1 ? '' : 's' }})</span><span v-else-if="p.value && !p.isBundle"> · £{{ p.value }}</span></span>
                            <span v-else class="fbg-hist-res fbg-hist-miss">Saved — no win</span>
                        </li>
                    </ul>
                    <button class="fbg-cta" :style="{ background: kitColor, color: textColor }" @click="close">Close</button>
                </div>
            </div>
        </transition>
    </div>
            </div>
        </div>
        <div v-if="demoMode" class="fbg-demo-info">{{ actualPreviewMode === 'mobile' ? '📱 Mobile Preview (420×650)' : '💻 Desktop Preview (700×650)' }}</div>
    </div>
    </Teleport>
</template>

<style scoped>

.fbg-demo-device {
    min-width: 0;
    max-width: 100%;
}

/* LIVE: full-screen modal overlay (teleported to body). PREVIEW (demoMode): inline in the pane. */
.fbg-fixed { position: fixed; inset: 0; z-index: 9999; display: flex; align-items: center; justify-content: center; padding: 0; background: #070b1c; }
.fbg-fixed .fbg { width: 100%; max-width: min(1560px, 100vw); height: 100dvh; max-height: 100dvh; border-radius: 0; display: flex; flex-direction: column; overflow: hidden; }
/* Stage flex-grows to fill the card; the pitch SVG (xMidYMid slice) COVERS it — no bars, no gaps.
   Every container here is taller than 5/3, so cover scales by height → striker/keeper stay aligned. */
.fbg-fixed .fbg-stage { width: 100%; }
.fbg-inline { position: relative; width: 100%; }

/* ── Studio preview device-frame (demoMode) — phone/desktop chrome, like the other game modals ── */
.fbg-demo { 
    display: flex; 
    flex-direction: column; 
    align-items: center;
    width: 100%;          /* ADD THIS */
    min-width: 0;         /* ADD THIS */
    overflow: hidden;     /* ADD THIS */
}

.fbg-demo-bar { 
    margin-bottom: 1rem; 
    display: flex; 
    align-items: center; 
    gap: 0.75rem; 
    background: #1f2937; 
    border-radius: 0.5rem; 
    padding: 0.5rem 0.75rem;
    width: 100%;          /* ADD THIS */
    box-sizing: border-box; /* ADD THIS */
    flex-wrap: wrap;      /* ADD THIS */
}
.fbg-demo-bar-label { color: #fff; font-size: 0.875rem; font-weight: 500; }
.fbg-demo-btn { padding: 0.25rem 0.75rem; border: none; border-radius: 0.25rem; font-size: 0.875rem; font-weight: 500; cursor: pointer; transition: background-color .15s ease; }
.fbg-demo-btn.is-on { background: #3b82f6; color: #fff; }
.fbg-demo-btn.is-off { background: #4b5563; color: #d1d5db; }
.fbg-demo-btn.is-off:hover { background: #6b7280; }
.fbg-demo-device { position: relative; overflow: hidden; display: flex; flex-direction: column; background: #070b1c; box-shadow: 0 10px 25px rgba(0,0,0,.45); }
.fbg-demo-statusbar { height: 2rem; flex-shrink: 0; background: #000; display: flex; align-items: center; justify-content: space-between; padding: 0 1rem; color: #fff; font-size: 0.8rem; }
.fbg-demo-sigs { display: flex; gap: 0.25rem; align-items: center; }
.fbg-demo-sig-a { width: 1rem; height: 0.5rem; border: 1px solid #fff; border-radius: 2px; display: inline-block; }
.fbg-demo-sig-b { width: 0.25rem; height: 0.5rem; background: #fff; border-radius: 2px; display: inline-block; }
.fbg-demo-browserbar { height: 2.5rem; flex-shrink: 0; background: #374151; display: flex; align-items: center; gap: 1rem; padding: 0 1rem; color: #d1d5db; font-size: 0.8rem; border-bottom: 1px solid #4b5563; }
.fbg-demo-dots { display: flex; gap: 0.35rem; }
.fbg-demo-dots span { width: 0.75rem; height: 0.75rem; border-radius: 9999px; }
.fbg-demo-dots span:nth-child(1) { background: #ef4444; }
.fbg-demo-dots span:nth-child(2) { background: #eab308; }
.fbg-demo-dots span:nth-child(3) { background: #22c55e; }
.fbg-demo-scroll { flex: 1; overflow-y: auto; display: flex; flex-direction: column; }
/* Fill the device frame so the scene reads full-screen (no dead navy space below) — the content is
   centered vertically exactly like the live full-screen modal does. Grows + scrolls if it overflows. */
.fbg-demo-scroll .fbg { flex: 1 0 auto; display: flex; flex-direction: column; justify-content: center; }
.fbg-demo-info { margin-top: 0.5rem; text-align: center; color: #9ca3af; font-size: 0.75rem; }
.fbg-modal-zoom { animation: fbg-modal-zoom 0.5s cubic-bezier(.34,1.56,.64,1); }
@keyframes fbg-modal-zoom { 0% { transform: scale(.4); opacity: 0; } 100% { transform: scale(1); opacity: 1; } }

/* preview text/sizing driven by the toggle (prop), not the viewport — so it's right inside the pane.
   The stage stays 5/3 in BOTH modes (matches the SVG viewBox) so `meet` fills it with no letterbox
   and the HTML striker/aim layer stay aligned with the goal — only fonts/sizes change. */
.fbg.is-mobile .fbg-prompt { font-size: 1.02rem; }
.fbg.is-mobile .fbg-eyebrow { font-size: 0.62rem; letter-spacing: 0.2em; }
.fbg.is-mobile .fbg-striker { height: 30%; }
.fbg.is-mobile .fbg-cta { padding: 0.62rem 1.3rem; font-size: 0.92rem; }
.fbg.is-mobile .fbg-card { padding: 1.2rem 1.05rem; max-width: 300px; }
.fbg.is-mobile .fbg-goal { font-size: 1.35rem; }
.fbg.is-mobile .fbg-hud { font-size: 0.55rem; }
.fbg.is-desktop .fbg-prompt { font-size: 1.42rem; }
.fbg.is-desktop .fbg-striker { height: 24%; }

.fbg { position: relative; width: 100%; background: #070b1c; border-radius: 0; overflow: hidden; padding: 0; }
/* Title overlaid on the pitch (no separate navy band) with a top scrim for legibility. */
.fbg-top { position: absolute; top: 0; left: 0; right: 0; z-index: 10; padding: 0.55rem 0.9rem 1.5rem; text-align: center; pointer-events: none; background: linear-gradient(to bottom, rgba(0,0,0,.55), rgba(0,0,0,0)); }
.fbg-x { position: absolute; top: 0.5rem; right: 0.7rem; background: transparent; border: none; font-size: 1.8rem; line-height: 1; cursor: pointer; z-index: 30; opacity: 0.85; }
.fbg-eyebrow { text-align: center; font-size: 0.68rem; letter-spacing: 0.26em; text-transform: uppercase; font-weight: 900; margin: 0.15rem 0 0; }
.fbg-prompt { text-align: center; font-size: 1.22rem; font-weight: 800; margin: 0.1rem 0 0.5rem; min-height: 1.4rem; text-shadow: 0 2px 6px rgba(0,0,0,.5); }
.fbg-topprize { display: inline-flex; align-items: center; gap: 0.4rem; margin-top: 0.1rem; padding: 0.22rem 0.75rem; font-size: 0.72rem; font-weight: 800; letter-spacing: 0.03em; border: 1px solid; border-radius: 999px; background: rgba(0,0,0,.5); text-shadow: 0 1px 4px rgba(0,0,0,.7); }
.fbg-topprize span { font-weight: 900; letter-spacing: 0.08em; }
.fbg-topprize-val { letter-spacing: 0.02em; }
.fbg-topprize-emoji { font-size: 1.2rem; letter-spacing: 0 !important; display: inline-block; transform-origin: center bottom; animation: fbg-wiggle 2.2s ease-in-out infinite; }
/* the actual prize image, wiggling so players notice what's up for grabs */
.fbg-topprize-img { width: 2rem; height: 2rem; object-fit: contain; border-radius: 5px; transform-origin: center bottom; animation: fbg-wiggle 2.2s ease-in-out infinite; filter: drop-shadow(0 2px 5px rgba(0,0,0,.5)); }

.fbg-stage { position: absolute; inset: 0; border-radius: 0; overflow: hidden; background: linear-gradient(180deg, #070b1c 0%, #14254a 33%, #2f8a4e 47%, #1c6f3a 100%); box-shadow: inset 0 0 70px rgba(0,0,0,.55); }
.fbg-stage.shake { animation: fbg-shake 0.55s cubic-bezier(.36,.07,.19,.97); }
@keyframes fbg-shake { 0%,100% { transform: translate(0,0) rotate(0); } 10% { transform: translate(-13px,8px) rotate(-1.1deg); } 24% { transform: translate(12px,-7px) rotate(1deg); } 40% { transform: translate(-11px,6px) rotate(-0.9deg); } 56% { transform: translate(9px,-5px) rotate(0.7deg); } 72% { transform: translate(-6px,3px) rotate(-0.4deg); } 88% { transform: translate(3px,-2px) rotate(0.2deg); } }
/* GOAL celebration: mega shake (slight zoom hides the edges) + blackout/paparazzi strobe */
.fbg-stage.megashake { animation: fbg-megashake 0.8s cubic-bezier(.36,.07,.19,.97) infinite; }
@keyframes fbg-megashake { 0% { transform: translate(0,0) scale(1); } 8% { transform: translate(-18px,10px) rotate(-2deg) scale(1.12); } 18% { transform: translate(16px,-12px) rotate(1.8deg) scale(1.13); } 28% { transform: translate(-18px,9px) rotate(-2.4deg) scale(1.12); } 38% { transform: translate(16px,-10px) rotate(2deg) scale(1.13); } 50% { transform: translate(-12px,6px) rotate(-1.4deg) scale(1.1); } 64% { transform: translate(9px,-5px) rotate(1deg) scale(1.08); } 80% { transform: translate(-5px,2px) rotate(-0.4deg) scale(1.04); } 100% { transform: translate(0,0) scale(1); } }
.fbg-wow { position: absolute; inset: 0; z-index: 38; pointer-events: none; background: rgba(2,4,12,0.58); animation: fbg-wow-pulse 1.5s ease-in-out infinite; }
@keyframes fbg-wow-pulse { 0%,100% { opacity: 0.5; } 50% { opacity: 0.66; } }
.fbg-goalflashes { position: absolute; inset: 0; z-index: 39; pointer-events: none; overflow: hidden; }
.fbg-goalflash { position: absolute; border-radius: 50%; background: radial-gradient(circle, rgba(255,255,255,1) 0%, rgba(255,255,255,0.72) 30%, rgba(255,255,255,0) 70%); transform: translate(-50%,-50%) scale(0); opacity: 0; animation-name: fbg-goalflash; animation-iteration-count: infinite; animation-timing-function: ease-out; }
@keyframes fbg-goalflash { 0% { transform: translate(-50%,-50%) scale(0.2); opacity: 0; } 9% { transform: translate(-50%,-50%) scale(1.25); opacity: 1; } 32% { transform: translate(-50%,-50%) scale(0.85); opacity: 0.28; } 60%,100% { transform: translate(-50%,-50%) scale(0.4); opacity: 0; } }
.fbg-goalshout { position: absolute; inset: 0; z-index: 41; display: flex; align-items: center; justify-content: center; pointer-events: none; font-size: clamp(2.6rem, 15vw, 6.5rem); font-weight: 900; letter-spacing: 0.02em; text-transform: uppercase; -webkit-text-stroke: 2px rgba(0,0,0,.55); text-shadow: 0 6px 28px rgba(0,0,0,.85), 0 0 46px currentColor; animation: fbg-goalshout-in 0.45s cubic-bezier(.34,1.56,.64,1) both, fbg-goalshout-pulse 0.6s ease-in-out 0.45s infinite; }
@keyframes fbg-goalshout-in { 0% { transform: scale(0.3) rotate(-10deg); opacity: 0; } 60% { transform: scale(1.25) rotate(4deg); opacity: 1; } 100% { transform: scale(1) rotate(0); opacity: 1; } }
@keyframes fbg-goalshout-pulse { 0%,100% { transform: scale(1) rotate(-1deg); } 50% { transform: scale(1.1) rotate(1deg); } }
.fbg-svg { position: absolute; inset: 0; width: 100%; height: 100%; }
.fbg-aimlayer { position: absolute; inset: 0; width: 100%; height: 100%; cursor: crosshair; z-index: 8; }

.fbg-striker { position: absolute; left: 50%; bottom: 12%; height: 27%; width: auto; transform: translateX(-138%); z-index: 7; transition: transform 0.5s cubic-bezier(.4,.1,.3,1); }
.fbg-striker.run { transform: translateX(-80%); }
.fbg-striker .kick { transform-box: fill-box; transform-origin: 0% 55%; transform: rotate(20deg); }
.fbg-striker.run .kick { animation: fbg-kick 0.5s cubic-bezier(.45,.05,.25,1) both; }
/* in-scene striker (embedded in the pitch SVG, scales with the scene) */
.fbg-striker-svg .kick { transform-box: fill-box; transform-origin: 0% 50%; transform: rotate(62deg); }
.fbg-striker-svg.run .kick { animation: fbg-kick-swing 0.55s cubic-bezier(.45,.05,.25,1) both; }
@keyframes fbg-kick-swing { 0% { transform: rotate(62deg); } 28% { transform: rotate(82deg); } 60% { transform: rotate(-36deg); } 100% { transform: rotate(8deg); } }
.fbg-keeper-idle { transform-box: fill-box; transform-origin: center bottom; animation: fbg-keeper-sway 2.1s ease-in-out infinite; }
@keyframes fbg-keeper-sway { 0%,100% { transform: translateX(-13px); } 50% { transform: translateX(13px); } }
/* Sprite keeper shuffles along his line while you aim (bigger travel + a slight bob), then the dive (keepTf) takes over. */
.fbg-keeper-shuffle { animation: fbg-keeper-shuffle 2.6s ease-in-out infinite; }
@keyframes fbg-keeper-shuffle {
  0%,100% { transform: translateX(-48px); }
  25%     { transform: translateX(0) translateY(-4px); }
  50%     { transform: translateX(48px); }
  75%     { transform: translateX(0) translateY(-4px); }
}
@keyframes fbg-kick { 0% { transform: rotate(24deg); } 40% { transform: rotate(-64deg); } 72% { transform: rotate(-44deg); } 100% { transform: rotate(-38deg); } }
/* keeper a bit taller + slimmer (less "small and fat") — scales up from the feet */
.fbg-keeper-tall { transform-box: fill-box; transform-origin: 50% 100%; transform: scale(0.9, 1.46); }
/* per-arm idle: each glove tip bobs up/down by rotating around its OWN shoulder (shoulders stay fixed) */
.fbg-arm.arm-idle-l { transform-box: view-box; transform-origin: 484px 276px; animation: fbg-arm-l 2s ease-in-out infinite; }
.fbg-arm.arm-idle-r { transform-box: view-box; transform-origin: 516px 276px; animation: fbg-arm-r 2s ease-in-out infinite; }
@keyframes fbg-arm-l { 0%,100% { transform: rotate(0deg); } 50% { transform: rotate(15deg); } }
@keyframes fbg-arm-r { 0%,100% { transform: rotate(0deg); } 50% { transform: rotate(-15deg); } }

.fbg-crowd { transform-box: view-box; transform-origin: center; }
.fbg-crowd.roar { animation: fbg-roar 0.5s ease 2; }
@keyframes fbg-roar { 0%,100% { transform: translateY(0); } 45% { transform: translateY(-3px); } }
.fbg-camflash { opacity: 0; transform-box: fill-box; transform-origin: center; animation-name: fbg-camflash; animation-iteration-count: infinite; animation-timing-function: ease-out; }
@keyframes fbg-camflash { 0%, 100% { opacity: 0; transform: scale(0.2); } 1.5% { opacity: 1; transform: scale(2.9); } 5% { opacity: 0.65; transform: scale(1.4); } 14% { opacity: 0; transform: scale(0.4); } }
/* ball impact glow — pops behind the ball when it hits the net */
.fbg-ball-glow { transform-box: fill-box; transform-origin: center; animation: fbg-ballglow 0.7s ease-out forwards; }
@keyframes fbg-ballglow { 0% { opacity: 0; transform: scale(0.3); } 25% { opacity: 0.9; transform: scale(1.3); } 100% { opacity: 0; transform: scale(2); } }
/* ball impact squash — the ball flattens then pops back when it hits (the "shakeout") */
.fbg-ball-impact { transform-box: fill-box; transform-origin: center; animation: fbg-ball-impact 0.35s ease-out; }
@keyframes fbg-ball-impact { 0% { transform: scale(1,1); } 28% { transform: scale(1.35,0.66); } 58% { transform: scale(0.9,1.12); } 100% { transform: scale(1,1); } }
/* ball flight arc — bows the ball UP above the straight line so the shot curves (lifts off its shadow) */
.fbg-ball-arc { transform-box: fill-box; transform-origin: center; animation-name: fbg-ball-arc; animation-timing-function: ease-out; animation-fill-mode: forwards; }
@keyframes fbg-ball-arc { 0% { transform: translateY(0); } 50% { transform: translateY(-52px); } 100% { transform: translateY(0); } }

/* ── host commentator ── */
.fbg-host { position: absolute; right: 0.55rem; top: 2.2rem; z-index: 12; display: flex; flex-direction: column-reverse; align-items: flex-end; gap: 5px; pointer-events: none; max-width: 64%; }
.fbg-host-bubble { max-width: 180px; background: #fff; color: #16203a; border-radius: 13px; padding: 0.45rem 0.65rem; font-size: 0.72rem; font-weight: 700; line-height: 1.25; text-align: center; box-shadow: 0 5px 16px rgba(0,0,0,.45); position: relative; }
.fbg-host-bubble::after { content: ''; position: absolute; top: -7px; right: 16px; border: 8px solid transparent; border-bottom-color: #fff; }
.fbg-host-avatar { width: 50px; height: 55px; margin-right: 4px; filter: drop-shadow(0 4px 8px rgba(0,0,0,.5)); transform-origin: center bottom; animation: fbg-host-wiggle 2.2s ease-in-out infinite; }
.fbg-host-img { width: 56px; height: 56px; object-fit: contain; }
@keyframes fbg-host-wiggle { 0%,100% { transform: rotate(-5deg) translateY(0); } 50% { transform: rotate(5deg) translateY(-3px); } }
.fbg-bubble-enter-active, .fbg-bubble-leave-active { transition: opacity .25s ease, transform .25s ease; }
.fbg-bubble-enter-from, .fbg-bubble-leave-to { opacity: 0; transform: translateY(8px) scale(.92); }
.spin { animation: fbg-spin 0.45s linear infinite; transform-box: fill-box; transform-origin: center; }
@keyframes fbg-spin { to { transform: rotate(360deg); } }
.ripple { animation: fbg-ripple 0.5s ease; }
@keyframes fbg-ripple { 0% { opacity: 1; } 35% { transform: scaleY(1.08); } 100% { transform: scaleY(1); } }
.fbg-trail { animation: fbg-trailfade 0.7s ease forwards; }
@keyframes fbg-trailfade { 0% { opacity: 0.6; } 100% { opacity: 0; } }
.fbg-particle { transform-box: fill-box; transform-origin: center; animation: fbg-burst 0.9s ease-out forwards; }
@keyframes fbg-burst { 0% { transform: translate(0,0) rotate(0); opacity: 1; } 100% { transform: translate(var(--dx), var(--dy)) rotate(var(--rot)); opacity: 0; } }

.fbg-hud { position: absolute; top: 8px; left: 10px; font-size: 0.6rem; font-weight: 800; letter-spacing: 0.1em; color: rgba(255,255,255,.88); background: rgba(0,0,0,.35); padding: 3px 8px; border-radius: 5px; }
.fbg-flash { position: absolute; inset: 0; background: #fff; opacity: 0; pointer-events: none; }
.fbg-flash.on { animation: fbg-flash 0.4s ease; }
@keyframes fbg-flash { 0% { opacity: 0; } 18% { opacity: 0.75; } 100% { opacity: 0; } }

.fbg-lower { position: absolute; bottom: 0; left: 0; right: 0; z-index: 10; padding: 1.4rem 0.9rem 0.9rem; text-align: center; background: linear-gradient(to top, rgba(0,0,0,.62), rgba(0,0,0,0)); }
.fbg-cta { border: none; border-radius: 0.72rem; padding: 0.72rem 1.9rem; font-weight: 900; font-size: 1rem; letter-spacing: 0.03em; cursor: pointer; transition: transform .12s ease; box-shadow: 0 6px 20px rgba(0,0,0,.35); }
.fbg-cta:not(:disabled):hover { transform: translateY(-2px); }
.fbg-cta:disabled { opacity: 0.7; cursor: default; }
.fbg-shoot { margin-top: 0.6rem; width: 100%; font-size: 1.12rem; }
.fbg-hint { font-size: 1.18rem; font-weight: 800; opacity: 1; text-shadow: 0 2px 6px rgba(0,0,0,.6); }
.fbg-meter-wrap { max-width: 340px; margin: 0 auto; }
.fbg-meter-top { display: flex; justify-content: space-between; font-size: 0.72rem; font-weight: 700; opacity: 0.85; margin-bottom: 0.25rem; }
.fbg-meter { position: relative; height: 16px; border-radius: 8px; overflow: hidden; background: rgba(255,255,255,.12); }
.fbg-meter-grad { position: absolute; inset: 0; background: linear-gradient(90deg, #22c55e, #eab308, #ef4444); }
.fbg-meter-marker { position: absolute; top: -3px; width: 4px; height: 22px; background: #fff; border-radius: 2px; box-shadow: 0 0 6px rgba(0,0,0,.5); transform: translateX(-50%); }
.fbg-vmeter { position: absolute; right: 0.7rem; top: 32%; bottom: 23%; z-index: 14; display: flex; flex-direction: column; align-items: center; gap: 0.4rem; pointer-events: none; }
.fbg-vmeter-label { font-size: 0.66rem; font-weight: 900; letter-spacing: 0.14em; text-shadow: 0 1px 4px rgba(0,0,0,.75); }
.fbg-vmeter-bar { position: relative; flex: 1; width: 18px; border-radius: 9px; overflow: hidden; background: rgba(0,0,0,.4); box-shadow: 0 4px 16px rgba(0,0,0,.5), inset 0 0 0 1px rgba(255,255,255,.15); }
.fbg-vmeter-grad { position: absolute; inset: 0; background: linear-gradient(0deg, #22c55e, #eab308, #ef4444); }
.fbg-vmeter-marker { position: absolute; left: -4px; right: -4px; height: 5px; background: #fff; border-radius: 3px; box-shadow: 0 0 8px rgba(255,255,255,.7), 0 0 4px rgba(0,0,0,.6); transform: translateY(50%); }
.fbg-skip { display: block; margin: 0.5rem auto 0; background: transparent; border: none; font-size: 0.72rem; opacity: 0.55; cursor: pointer; text-decoration: underline; }

.fbg-overlay { position: absolute; inset: 0; background: rgba(0,0,0,.4); backdrop-filter: blur(1.5px); display: flex; align-items: center; justify-content: center; z-index: 40; padding: 1rem; }
.fbg-card { background: transparent; border: none; padding: 1.4rem 1.2rem; text-align: center; max-width: 360px; width: 100%; text-shadow: 0 3px 14px rgba(0,0,0,.92), 0 0 6px rgba(0,0,0,.7); animation: fbg-card-slide 0.72s cubic-bezier(.16,.8,.3,1) both; }
@keyframes fbg-card-slide { 0% { transform: translateX(135%); opacity: 0; } 78% { transform: translateX(-2%); opacity: 1; } 100% { transform: translateX(0); opacity: 1; } }
.fade-enter-active { transition: opacity 0.45s ease; }
.fade-enter-from { opacity: 0; }
.fbg-goal { font-size: 1.6rem; font-weight: 900; margin-bottom: 0.4rem; animation: fbg-pop 0.5s ease; }
.fbg-visual { font-size: 3.4rem; line-height: 1; margin: 0.3rem 0; }
.fbg-visual img { width: 132px; height: 132px; object-fit: contain; margin: 0 auto; filter: drop-shadow(0 8px 20px rgba(0,0,0,.5)); transform-origin: center bottom; animation: fbg-wiggle 1.6s ease-in-out infinite; }
.fbg-won { font-size: 0.92rem; opacity: 0.85; margin-top: 0.25rem; }
.fbg-name { font-size: 1.3rem; font-weight: 800; margin-top: 0.1rem; }
.fbg-value { font-size: 1.55rem; font-weight: 900; margin-top: 0.25rem; }
.fbg-winlist { list-style: none; padding: 0; margin: 0.6rem 0 0.4rem; text-align: left; max-height: 150px; overflow-y: auto; }
.fbg-winlist li { font-size: 0.9rem; padding: 0.15rem 0; font-weight: 600; }
.fbg-fulltotal { font-size: 1.1rem; font-weight: 900; margin-top: 0.15rem; }
.fbg-scorecard { display: flex; flex-wrap: wrap; gap: 5px; justify-content: center; margin: 0.7rem 0 0.55rem; }
.fbg-scoredot { width: 24px; height: 24px; border-radius: 50%; display: inline-flex; align-items: center; justify-content: center; font-size: 0.7rem; font-weight: 800; border: 1.5px solid rgba(255,255,255,.28); background: rgba(255,255,255,.08); color: rgba(255,255,255,.55); }
.fbg-history { list-style: none; padding: 0.35rem 0.6rem; margin: 0 0 0.3rem; text-align: left; max-height: 180px; overflow-y: auto; background: rgba(0,0,0,.45); border-radius: 0.7rem; }
.fbg-history li { display: flex; align-items: center; gap: 0.55rem; font-size: 0.82rem; font-weight: 600; padding: 0.3rem 0.1rem; border-bottom: 1px solid rgba(255,255,255,.07); }
.fbg-history li:last-child { border-bottom: none; }
.fbg-hist-n { flex: 0 0 22px; height: 22px; border-radius: 50%; background: rgba(255,255,255,.12); display: inline-flex; align-items: center; justify-content: center; font-size: 0.68rem; font-weight: 800; }
.fbg-hist-res { flex: 1; }
.fbg-hist-miss { opacity: 0.58; }
.fbg-tracker { position: absolute; left: 0.55rem; top: 17%; z-index: 14; display: flex; flex-direction: column; align-items: flex-start; gap: 5px; pointer-events: none; max-height: 68%; }
.fbg-tracker-list { display: flex; flex-direction: column; gap: 5px; overflow: hidden; }
.fbg-track { display: flex; align-items: center; gap: 5px; }
.fbg-track-enter-active, .fbg-track-leave-active { transition: all 0.42s cubic-bezier(.34,1.56,.64,1); }
.fbg-track-enter-from { opacity: 0; transform: translateX(-26px) scale(0.4); }
.fbg-track-leave-to { opacity: 0; transform: translateX(-22px) scale(0.5); }
.fbg-track-leave-active { position: absolute; }
.fbg-track-dot { width: 19px; height: 19px; border-radius: 50%; display: inline-flex; align-items: center; justify-content: center; font-size: 0.62rem; font-weight: 900; flex-shrink: 0; box-shadow: 0 2px 6px rgba(0,0,0,.55); }
.fbg-track-dot.won { background: #22c55e; border: 2px solid #16a34a; }
.fbg-track-dot.miss { background: rgba(18,22,32,.9); border: 2px solid #ef4444; color: #ef4444; }
.fbg-track-box { font-size: 0.62rem; font-weight: 900; padding: 2px 6px; border-radius: 5px; background: rgba(4,7,15,.82); border: 1px solid; white-space: nowrap; box-shadow: 0 2px 6px rgba(0,0,0,.5); }
.fbg-tracker-total { margin-top: 3px; font-size: 0.74rem; font-weight: 900; padding: 3px 9px; border-radius: 6px; box-shadow: 0 3px 10px rgba(0,0,0,.55); }
.fbg-card .fbg-cta { margin-top: 1rem; width: 100%; }
@keyframes fbg-pop { 0% { transform: scale(0.5); } 60% { transform: scale(1.15); } 100% { transform: scale(1); } }
.pop-enter-active { transition: transform .3s cubic-bezier(.34,1.56,.64,1), opacity .3s ease; }
.pop-enter-from { transform: scale(0.6); opacity: 0; }

/* ── interactive intro ── */
.fbg-intro { flex-direction: column; background: rgba(4,7,15,.84); backdrop-filter: blur(5px); cursor: pointer; }
.fbg-intro-inner { text-align: center; max-width: 90%; padding: 1rem; animation: fbg-introup 0.5s cubic-bezier(.34,1.56,.64,1); }
.fbg-intro-logo { display: block; margin: 0 auto 1rem; max-width: min(80%, 340px); max-height: 220px; object-fit: contain; filter: drop-shadow(0 10px 28px rgba(0,0,0,.55)); transform-origin: center bottom; animation: fbg-wiggle 2.4s ease-in-out infinite; }
.fbg-intro-ball { font-size: 3.4rem; margin-bottom: 0.4rem; animation: fbg-introbounce 1.6s ease-in-out infinite; }
.fbg-intro-title { font-size: clamp(1.4rem, 5vw, 2.3rem); font-weight: 900; margin: 0.2rem 0; text-shadow: 0 2px 12px rgba(0,0,0,.6); }
.fbg-intro-sub { font-size: 0.95rem; opacity: 0.86; margin: 0.3rem 0 1.3rem; }
.fbg-intro-cta { padding: 0.85rem 2.4rem; font-size: 1.12rem; }
@keyframes fbg-introbounce { 0%,100% { transform: translateY(0) rotate(0deg); } 50% { transform: translateY(-14px) rotate(180deg); } }
@keyframes fbg-introup { 0% { transform: translateY(26px) scale(.92); opacity: 0; } 100% { transform: translateY(0) scale(1); opacity: 1; } }
/* gentle wiggle for an uploaded title image (rock + bob — no full spin, so logos stay upright) */
@keyframes fbg-wiggle { 0%, 100% { transform: translateY(0) rotate(-4deg); } 50% { transform: translateY(-10px) rotate(4deg); } }

/* ---- responsive: mobile vs desktop ---- */
@media (max-width: 600px) {
    /* True full-screen on mobile — edge to edge, content vertically centered (framed). */
    .fbg-fixed { padding: 0; }
    .fbg-fixed .fbg { width: 100%; max-width: 100%; height: 100dvh; max-height: none; border-radius: 0; justify-content: center; gap: 0.35rem; padding: 1rem 0.6rem; }
    .fbg-fixed .fbg-stage { max-height: none; max-width: 100%; }
    .fbg-prompt { font-size: 1.02rem; }
    .fbg-eyebrow { font-size: 0.62rem; letter-spacing: 0.2em; }
    .fbg-striker { height: 30%; }
    .fbg-cta { padding: 0.62rem 1.3rem; font-size: 0.92rem; }
    .fbg-card { padding: 1.2rem 1.05rem; max-width: 300px; }
    .fbg-goal { font-size: 1.35rem; }
    .fbg-hud { font-size: 0.55rem; }
}
@media (min-width: 900px) {
    .fbg-prompt { font-size: 1.42rem; }
    .fbg-striker { height: 24%; }
}
</style>