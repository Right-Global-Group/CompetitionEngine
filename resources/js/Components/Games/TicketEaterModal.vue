<script setup lang="ts">
import { computed, nextTick, onBeforeUnmount, ref, watch } from 'vue';
import gsap from 'gsap';

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

// ── asset helpers ──
const titleText = computed(() => a.value.titleText || 'Feed the Eater!');
const winText = computed(() => a.value.winText || '🎉 Winner!');
const loseText = computed(() => a.value.loseText || 'No prize this time…');
const accent = computed(() => a.value.accentColor || '#ff9800');
const primary = computed(() => a.value.primaryColor || '#1a0a3f');
const textColor = computed(() => a.value.textColor || '#ffffff');
const gameName = computed(() => a.value.name || '');
const theme = computed(() => String(a.value.theme || 'arcade'));

const THEMES: Record<string, { bg: string; panel: string; track: string; glow: string; particle: string }> = {
    arcade:  { bg: '#0d0722', panel: '#1a0a3f', track: '#2b1560', glow: '#ff00ff', particle: '#ffe000' },
    cave:    { bg: '#0e0b07', panel: '#1c1609', track: '#2e230e', glow: '#ff8c00', particle: '#ffdd77' },
    candy:   { bg: '#1a0328', panel: '#320550', track: '#4a0870', glow: '#ff47c0', particle: '#ffe1f0' },
    spooky:  { bg: '#07100d', panel: '#0b1c16', track: '#0f2a1f', glow: '#39ff14', particle: '#d4f7bc' },
};
const pal = computed(() => THEMES[theme.value] || THEMES.arcade);

// ── ticket data ──
type Cast = { id: any; number: string; win: boolean; prize: string; value: number; image: string; isBundle: boolean };
const casts = ref<Cast[]>([]);
const index = ref(0);
const phase = ref<'ready' | 'feeding' | 'chew' | 'result' | 'done'>('ready');
const showPrize = ref(false);

function isWin(t: any) { return !!(t?.instant_win && t.instant_win.prize && t.instant_win.prize !== 'NO WIN'); }
function categoryFor(iw: any) {
    const cats = props.instant_win_categories || [];
    if (!iw) return null;
    return (iw.category_id != null ? cats.find((c: any) => c.id === iw.category_id) : null)
        || cats.find((c: any) => c.name && (c.name === iw.prize || c.name === iw.name)) || null;
}
function buildCasts() {
    if (props.demoMode) {
        const n = 30;
        const cats = props.instant_win_categories || [];
        const winPos = new Set([9, 19, 29]);
        casts.value = Array.from({ length: n }, (_, i) => {
            const won = winPos.has(i) && cats.length > 0;
            const cat: any = won ? cats[i % cats.length] : null;
            return { id: i, number: String(i + 1), win: won, prize: won ? String(cat?.name || 'Prize') : '', value: Number(cat?.value || 0), image: cat?.image_path || '', isBundle: won && (cat?.prize_type === 'ticket_bundle') };
        });
    } else {
        casts.value = (props.tickets || []).map((t) => {
            const iw = t?.instant_win; const won = isWin(t); const cat: any = won ? categoryFor(iw) : null;
            return { id: t.id ?? t.number, number: String(t.number ?? t.id ?? ''), win: won, prize: won ? String(iw.prize) : '', value: Number(iw?.value || cat?.value || 0), image: iw?.image_path || cat?.image_path || '', isBundle: won && ((iw?.prize_type ?? cat?.prize_type) === 'ticket_bundle') };
        });
    }
    index.value = 0; resetPhase();
}
const mode = ref<'all' | 'auto'>('all');
const speed = ref<1 | 1.5 | 2>(1);
const playList = computed(() => casts.value);
const current = computed<Cast | null>(() => playList.value[index.value] ?? null);
const total = computed(() => playList.value.length);
const caught = computed(() => playList.value.slice(0, index.value + (phase.value === 'result' ? 1 : 0)).filter((c) => c.win).length);
const wins = computed(() => casts.value.filter((c) => c.win));
const currentValueLabel = computed(() => {
    const p = current.value; const v = Number(p?.value || 0); if (!v) return '';
    if (p?.isBundle) return /ticket/i.test(p?.prize || '') ? '' : `${Math.floor(v)} Free Ticket${v == 1 ? '' : 's'}`;
    if (/£\s*\d/.test(p?.prize || '')) return '';
    return `£${v % 1 === 0 ? v : v.toFixed(2)}`;
});

// ── eater mouth animation state ──
const mouthOpen = ref(false);
const chewing = ref(false);
const mouthScale = ref(1);
const eyeWobble = ref(false);
const shakeEl = ref<HTMLElement | null>(null);
const particles = ref<any[]>([]);
let particleId = 0;
function spawnParticles(win: boolean) {
    const n = win ? 18 : 8;
    for (let i = 0; i < n; i++) {
        const id = particleId++;
        const angle = Math.random() * Math.PI * 2;
        const dist = 60 + Math.random() * 100;
        const color = win ? [pal.value.particle, accent.value, '#fff'][Math.floor(Math.random() * 3)] : '#888';
        particles.value.push({ id, color, x: 0, y: 0, tx: Math.cos(angle) * dist, ty: Math.sin(angle) * dist, scale: 0.6 + Math.random() * 0.8, opacity: 1 });
        setTimeout(() => { particles.value = particles.value.filter((p) => p.id !== id); }, 900);
    }
}

// ── the feed sequence ──
let feedTl: gsap.core.Timeline | null = null;
let autoTimer: ReturnType<typeof setTimeout> | null = null;
function clearAuto() { if (autoTimer) { clearTimeout(autoTimer); autoTimer = null; } }
function resetPhase() { feedTl?.kill(); feedTl = null; phase.value = 'ready'; showPrize.value = false; mouthOpen.value = false; chewing.value = false; eyeWobble.value = false; }
function feedNow() {
    if (phase.value !== 'ready' || !current.value) { if (!current.value) finish(); return; }
    const c = current.value;
    phase.value = 'feeding';
    mouthOpen.value = true;
    feedTl?.kill();
    const tl = gsap.timeline(); feedTl = tl; tl.timeScale(speed.value);
    tl.to(mouthScale, { value: 1.18, duration: 0.25, ease: 'back.out(2)' })
      .to(mouthScale, { value: 1, duration: 0.2, ease: 'sine.in' });
    tl.add(() => { phase.value = 'chew'; chewing.value = true; eyeWobble.value = true; });
    tl.to(mouthScale, { value: 0.85, duration: 0.18, repeat: 2, yoyo: true, ease: 'sine.inOut' });
    tl.add(() => {
        phase.value = 'result'; chewing.value = false; mouthOpen.value = false; mouthScale.value = 1;
        spawnParticles(c.win);
        if (c.win) showPrize.value = true;
        eyeWobble.value = false;
        if (shakeEl.value && c.win) gsap.fromTo(shakeEl.value, { x: -8 }, { x: 0, duration: 0.55, ease: 'elastic.out(1,0.3)' });
        if (mode.value === 'auto') { clearAuto(); autoTimer = setTimeout(() => next(), (c.win ? 1600 : 700) / speed.value); }
    });
}
function next() {
    clearAuto(); showPrize.value = false;
    if (index.value < total.value - 1) { index.value += 1; resetPhase(); }
    else { finish(); return; }
    if (mode.value === 'auto') { autoTimer = setTimeout(() => feedNow(), 420 / speed.value); }
}
function finish() { phase.value = 'done'; showPrize.value = false; emit('wins-collected', wins.value.map((w) => ({ prize: w.prize, value: w.value }))); }
const prompt = computed(() => phase.value === 'ready' ? titleText.value : phase.value === 'feeding' ? 'Feeding…' : phase.value === 'chew' ? 'Chewing…' : phase.value === 'result' ? (current.value?.win ? winText.value : loseText.value) : '');

// ── intro / done overlays ──
const showIntro = ref(false);
const introEnabled = computed(() => a.value.introEnabled !== false);
const introSubtitle = computed(() => a.value.introSubtitle || 'Feed your tickets and win instant prizes!');
const introButtonText = computed(() => a.value.introButtonText || 'Feed Me! 👹');
const welcomeMsg = computed(() => (a.value.introWelcomeText || 'Welcome to {name}').replace('{name}', gameName.value || 'Ticket Eater'));
const introTitleImage = computed(() => a.value.introTitleImage || '');
let demoTimer: ReturnType<typeof setTimeout> | null = null;
function clearDemo() { if (demoTimer) { clearTimeout(demoTimer); demoTimer = null; } }
function startGame() { clearDemo(); showIntro.value = false; index.value = 0; resetPhase(); if (mode.value === 'auto') { clearAuto(); autoTimer = setTimeout(() => feedNow(), 500 / speed.value); } }

watch(() => props.tickets, buildCasts, { immediate: true, deep: true });
watch(() => props.modelValue, (open) => {
    if (open) {
        clearAuto(); clearDemo(); buildCasts();
        showIntro.value = introEnabled.value;
        if (props.demoMode) { demoTimer = setTimeout(() => { mode.value = 'auto'; startGame(); }, introEnabled.value ? 2000 : 400); }
    }
}, { immediate: true });
watch(phase, (p) => { if (props.demoMode && p === 'done') { clearDemo(); demoTimer = setTimeout(() => { buildCasts(); mode.value = 'auto'; startGame(); }, 1600); } });
onBeforeUnmount(() => { feedTl?.kill(); clearAuto(); clearDemo(); });
function close() {
    clearAuto();
    if (props.demoMode) { buildCasts(); showIntro.value = introEnabled.value; return; }
    emit('update:modelValue', false);
}

// ── ticket strip ──
const VISIBLE = 7;
const stripStart = computed(() => Math.max(0, index.value - 2));
const visibleTickets = computed(() => playList.value.slice(stripStart.value, stripStart.value + VISIBLE));
const ticketOffset = computed(() => index.value - stripStart.value);
const ticketCardW = 58;
const stripTx = computed(() => -(ticketOffset.value * ticketCardW) + ticketCardW * 2.5);

// ── eater SVG geometry ──
const mouthY = computed(() => mouthOpen.value ? 42 : 28);
const mouthPath = computed(() => {
    const y = mouthY.value * mouthScale.value;
    return `M-70 0 Q-55 ${y} 0 ${y} Q55 ${y} 70 0`;
});
const glowColor = computed(() => a.value.theme === 'spooky' ? '#39ff14' : a.value.theme === 'candy' ? '#ff47c0' : a.value.theme === 'cave' ? '#ff8c00' : '#ff00ff');
</script>

<template>
    <teleport to="body" :disabled="demoMode">
        <div v-if="modelValue || demoMode" class="te-root" :class="frameClass" :style="{ '--te-bg': pal.bg, '--te-panel': pal.panel, '--te-track': pal.track, '--te-glow': glowColor, '--te-particle': pal.particle, '--accent': accent, '--primary': primary, '--text': textColor }">
            <div class="te-frame">
                <button v-if="!demoMode" class="te-close" @click="close">✕</button>

                <div class="te-hud">
                    <div class="te-hud-l">TICKET {{ Math.min(index + 1, total) }}/{{ total }} · 🏆 {{ caught }}</div>
                    <div class="te-hud-title">{{ gameName || 'Ticket Eater' }}</div>
                </div>

                <!-- Ticket strip -->
                <div class="te-strip-wrap">
                    <div class="te-strip" :style="{ transform: `translateX(${stripTx}px)` }">
                        <div v-for="(t, si) in visibleTickets" :key="t.id" class="te-ticket" :class="{ 'is-active': si + stripStart === index, 'is-past': si + stripStart < index }">
                            <div class="te-ticket-num">#{{ t.number }}</div>
                        </div>
                    </div>
                    <div class="te-strip-arrow">▼</div>
                </div>

                <!-- Eater face -->
                <div ref="shakeEl" class="te-eater-wrap" @click="phase === 'ready' && mode !== 'auto' && feedNow()">
                    <div class="te-eater" :class="{ 'is-chewing': chewing, 'is-win': phase === 'result' && current?.win }">
                        <svg class="te-face" viewBox="-120 -140 240 240" xmlns="http://www.w3.org/2000/svg">
                            <defs>
                                <radialGradient id="te-face-grad" cx="40%" cy="35%" r="70%">
                                    <stop offset="0" :stop-color="accent" stop-opacity="0.85" />
                                    <stop offset="1" :stop-color="primary" stop-opacity="0.95" />
                                </radialGradient>
                                <filter id="te-glow-f" x="-60%" y="-60%" width="220%" height="220%">
                                    <feDropShadow dx="0" dy="0" stdDeviation="10" :flood-color="glowColor" flood-opacity="0.95" />
                                </filter>
                                <filter id="te-eye-f" x="-80%" y="-80%" width="260%" height="260%">
                                    <feDropShadow dx="0" dy="0" stdDeviation="5" :flood-color="glowColor" flood-opacity="0.9" />
                                </filter>
                                <radialGradient id="te-pupil-grad" cx="35%" cy="30%" r="65%">
                                    <stop offset="0" stop-color="#fff" stop-opacity="0.5" />
                                    <stop offset="1" stop-color="#000" />
                                </radialGradient>
                            </defs>
                            <!-- Body -->
                            <circle cx="0" cy="-20" r="112" fill="url(#te-face-grad)" filter="url(#te-glow-f)" />
                            <!-- Horns -->
                            <g :fill="accent" opacity="0.9">
                                <polygon points="-72,-120 -56,-58 -88,-60" />
                                <polygon points="72,-120 88,-60 56,-58" />
                            </g>
                            <!-- Eyes -->
                            <g :class="{ 'te-eye-wobble': eyeWobble }" filter="url(#te-eye-f)">
                                <ellipse cx="-42" cy="-52" rx="22" ry="26" fill="#fff" />
                                <circle cx="-42" cy="-50" r="15" fill="url(#te-pupil-grad)" />
                                <circle cx="-36" cy="-57" r="5" fill="#fff" opacity="0.7" />
                                <ellipse cx="42" cy="-52" rx="22" ry="26" fill="#fff" />
                                <circle cx="42" cy="-50" r="15" fill="url(#te-pupil-grad)" />
                                <circle cx="48" cy="-57" r="5" fill="#fff" opacity="0.7" />
                            </g>
                            <!-- Brow -->
                            <g stroke="#333" stroke-width="4" stroke-linecap="round" fill="none" :class="{ 'te-brow-angry': chewing }">
                                <line x1="-64" y1="-78" x2="-22" y2="-70" />
                                <line x1="64" y1="-78" x2="22" y2="-70" />
                            </g>
                            <!-- Nose dots -->
                            <g :fill="primary" opacity="0.7">
                                <circle cx="-12" cy="-24" r="5" />
                                <circle cx="12" cy="-24" r="5" />
                            </g>
                            <!-- Mouth -->
                            <g transform="translate(0 4)">
                                <path :d="mouthPath" :fill="primary" stroke="#333" stroke-width="2" />
                                <!-- Teeth -->
                                <g v-if="mouthOpen" fill="#fffde7" opacity="0.95">
                                    <polygon points="-54,0 -40,0 -47,14" />
                                    <polygon points="-28,0 -14,0 -21,18" />
                                    <polygon points="-2,0 12,0 5,20" />
                                    <polygon points="24,0 38,0 31,18" />
                                    <polygon points="50,0 64,0 57,14" />
                                </g>
                                <!-- Tongue -->
                                <ellipse v-if="mouthOpen" cx="0" :cy="mouthY * mouthScale * 0.7" rx="26" ry="11" fill="#e91e63" opacity="0.85" />
                            </g>
                            <!-- Blush -->
                            <ellipse cx="-82" cy="-14" rx="16" ry="10" fill="#ff4081" opacity="0.35" />
                            <ellipse cx="82" cy="-14" rx="16" ry="10" fill="#ff4081" opacity="0.35" />
                        </svg>
                        <!-- particles -->
                        <div class="te-particles">
                            <div v-for="p in particles" :key="p.id" class="te-particle" :style="{ '--tx': p.tx + 'px', '--ty': p.ty + 'px', '--pc': p.color, '--ps': p.scale }"></div>
                        </div>
                    </div>
                </div>

                <div class="te-prompt">{{ prompt }}</div>
                <div class="te-controls">
                    <button v-if="phase === 'ready' && mode !== 'auto'" class="te-cta te-pulse" :style="{ background: accent }" @click="feedNow">FEED 👹</button>
                    <button v-else-if="phase === 'result' && current && !current.win && mode !== 'auto'" class="te-cta" :style="{ background: primary, color: textColor }" @click="next">{{ index < total - 1 ? 'Next →' : 'Finish' }}</button>
                    <button v-if="!demoMode && phase !== 'done'" class="te-skip" @click="finish">Skip remaining</button>
                </div>

                <!-- Win overlay -->
                <transition name="te-fade">
                    <div v-if="showPrize && current" class="te-overlay">
                        <div class="te-card" :style="{ borderColor: accent }">
                            <div class="te-card-top" :style="{ color: accent }">{{ winText }}</div>
                            <div class="te-card-visual"><img v-if="current.image" :src="current.image" alt="prize" /><span v-else>🏆</span></div>
                            <div class="te-card-name" :style="{ color: accent }">{{ current.prize }}</div>
                            <div v-if="currentValueLabel" class="te-card-val" :style="{ color: textColor }">{{ currentValueLabel }}</div>
                            <button class="te-cta" :style="{ background: primary, color: textColor }" @click="next">{{ index < total - 1 ? 'Next ticket →' : 'Collect 🎉' }}</button>
                        </div>
                    </div>
                </transition>

                <!-- Done overlay -->
                <transition name="te-fade">
                    <div v-if="phase === 'done'" class="te-overlay">
                        <div class="te-card" :style="{ borderColor: accent }">
                            <div class="te-card-top" :style="{ color: accent }">{{ wins.length ? 'All done!' : 'All done' }}</div>
                            <template v-if="wins.length">
                                <div class="te-card-name" :style="{ color: textColor }">You won {{ caught }} {{ caught === 1 ? 'prize' : 'prizes' }}! 🎉</div>
                                <ul class="te-winlist"><li v-for="(w, i) in wins" :key="i" :style="{ color: textColor }"><span :style="{ color: accent }">🏆</span> {{ w.prize }}<span v-if="w.isBundle && w.value && !/ticket/i.test(w.prize)"> — {{ Math.floor(w.value) }} Free Ticket{{ w.value == 1 ? '' : 's' }}</span><span v-else-if="w.value && !w.isBundle"> — £{{ w.value }}</span></li></ul>
                            </template>
                            <div v-else class="te-card-name" :style="{ color: textColor }">No prizes this time — better luck next time!</div>
                            <button class="te-cta" :style="{ background: primary, color: textColor }" @click="close">Close</button>
                        </div>
                    </div>
                </transition>

                <!-- Intro overlay -->
                <transition name="te-fade">
                    <div v-if="showIntro" class="te-overlay te-intro">
                        <div class="te-intro-card" :style="{ '--glow': accent, borderColor: accent }">
                            <img v-if="introTitleImage" :src="introTitleImage" class="te-intro-logo" alt="" />
                            <div class="te-intro-welcome" :style="{ color: textColor }">{{ welcomeMsg }}</div>
                            <div class="te-intro-sub">{{ introSubtitle }}</div>
                            <div class="te-set-label">Mode</div>
                            <div class="te-chip-row">
                                <button class="te-chip" :style="mode !== 'auto' ? { borderColor: accent, background: accent, color: primary } : {}" @click="mode = 'all'">👆 Manual</button>
                                <button class="te-chip" :style="mode === 'auto' ? { borderColor: accent, background: accent, color: primary } : {}" @click="mode = 'auto'">⚡ Auto</button>
                            </div>
                            <div class="te-set-label">Speed</div>
                            <div class="te-chip-row">
                                <button class="te-chip" :style="speed === 1 ? { borderColor: accent, background: accent, color: primary } : {}" @click="speed = 1">1×</button>
                                <button class="te-chip" :style="speed === 1.5 ? { borderColor: accent, background: accent, color: primary } : {}" @click="speed = 1.5">1.5×</button>
                                <button class="te-chip" :style="speed === 2 ? { borderColor: accent, background: accent, color: primary } : {}" @click="speed = 2">2×</button>
                            </div>
                            <button class="te-cta te-pulse te-intro-start" :style="{ background: accent, color: primary }" @click="startGame">{{ introButtonText }}</button>
                        </div>
                    </div>
                </transition>
            </div>
        </div>
    </teleport>
</template>

<style scoped>
.te-root { position: fixed; inset: 0; z-index: 9999; display: flex; align-items: center; justify-content: center; background: var(--te-bg); }
.te-root.is-mobile, .te-root.is-desktop { position: relative; inset: auto; background: transparent; }
.te-frame { position: relative; width: 100%; height: 100%; background: var(--te-bg); display: flex; flex-direction: column; align-items: center; justify-content: flex-start; overflow: hidden; padding-top: 2.8rem; gap: 0; }
.is-mobile .te-frame, .is-desktop .te-frame { border-radius: 18px; box-shadow: 0 24px 60px rgba(0,0,0,.5); transition: height .28s ease, width .28s ease; }
.is-mobile .te-frame { height: min(660px, 84vh); aspect-ratio: 1000 / 1500; max-width: 94vw; }
.is-desktop .te-frame { height: min(520px, 80vh); aspect-ratio: 1500 / 1000; }
.te-preview-toggle { position: absolute; top: 8px; left: 50%; transform: translateX(-50%); z-index: 20; display: flex; gap: 6px; align-items: center; background: rgba(0,0,0,.5); padding: 5px 9px; border-radius: 10px; color: #fff; font-size: 12px; }
.te-preview-toggle button { padding: 3px 9px; border-radius: 7px; background: rgba(255,255,255,.1); color: rgba(255,255,255,.8); }
.te-preview-toggle button.on { background: var(--accent); color: #000; }
.te-close { position: absolute; top: 10px; right: 12px; z-index: 20; width: 34px; height: 34px; border-radius: 50%; background: rgba(0,0,0,.45); color: #fff; font-size: 15px; }
.te-hud { position: absolute; top: 0; left: 0; right: 0; z-index: 12; display: flex; justify-content: space-between; align-items: center; padding: 0.7rem 0.9rem; pointer-events: none; }
.te-hud-l { font-size: 0.72rem; font-weight: 800; letter-spacing: .4px; color: rgba(255,255,255,.9); text-transform: uppercase; }
.te-hud-title { font-size: 1.05rem; font-weight: 900; color: var(--accent); text-shadow: 0 0 14px var(--te-glow); }

/* ticket strip */
.te-strip-wrap { width: 100%; max-width: 420px; overflow: hidden; position: relative; height: 68px; display: flex; align-items: center; justify-content: center; margin-top: 0.4rem; }
.te-strip { display: flex; gap: 6px; transition: transform 0.28s cubic-bezier(.3,1.4,.6,1); }
.te-ticket { width: 52px; height: 56px; border-radius: 8px; background: var(--te-track); border: 2px solid rgba(255,255,255,.1); display: flex; align-items: center; justify-content: center; flex-direction: column; font-size: 0.72rem; font-weight: 800; color: rgba(255,255,255,.55); transition: all .25s; flex-shrink: 0; }
.te-ticket.is-active { border-color: var(--accent); color: var(--text); box-shadow: 0 0 18px var(--accent); transform: scale(1.08); }
.te-ticket.is-past { opacity: 0.35; }
.te-ticket-num { font-size: 0.65rem; color: rgba(255,255,255,.5); }
.te-strip-arrow { position: absolute; bottom: 2px; left: 50%; transform: translateX(-50%); color: var(--accent); font-size: 0.85rem; animation: te-arrow-pulse 1.2s ease-in-out infinite; }
@keyframes te-arrow-pulse { 0%,100% { opacity: 0.5; transform: translateX(-50%) translateY(0); } 50% { opacity: 1; transform: translateX(-50%) translateY(3px); } }

/* eater */
.te-eater-wrap { flex: 1; display: flex; align-items: center; justify-content: center; cursor: pointer; padding: 0.5rem 1rem 0; }
.te-eater { position: relative; display: flex; align-items: center; justify-content: center; transition: transform .18s; }
.te-face { width: min(200px, 36vw); height: min(200px, 36vw); }
.is-desktop .te-face { width: min(180px, 24vw); height: min(180px, 24vw); }
.te-eater.is-chewing { animation: te-chew 0.2s ease-in-out infinite; }
@keyframes te-chew { 0%,100% { transform: scale(1); } 50% { transform: scale(1.04) translateY(-4px); } }
.te-eater.is-win .te-face { filter: drop-shadow(0 0 20px var(--accent)); }
.te-eye-wobble { animation: te-eye-wobble 0.18s ease-in-out infinite; transform-box: fill-box; transform-origin: center; }
@keyframes te-eye-wobble { 0%,100% { transform: scaleY(1); } 50% { transform: scaleY(0.7); } }
.te-brow-angry { animation: te-brow 0.15s ease-in-out infinite; }
@keyframes te-brow { 0%,100% { transform: translateY(0); } 50% { transform: translateY(-4px); } }
.te-particles { position: absolute; inset: 0; pointer-events: none; }
.te-particle { position: absolute; left: 50%; top: 50%; width: 10px; height: 10px; border-radius: 50%; background: var(--pc); transform: scale(var(--ps)); animation: te-particle-fly 0.8s ease-out forwards; }
@keyframes te-particle-fly { 0% { transform: translate(-50%, -50%) scale(var(--ps)); opacity: 1; } 100% { transform: translate(calc(-50% + var(--tx)), calc(-50% + var(--ty))) scale(0); opacity: 0; } }

/* prompt + controls */
.te-prompt { font-size: 1.05rem; font-weight: 800; color: var(--text); text-shadow: 0 2px 8px rgba(0,0,0,.7); text-align: center; min-height: 1.6rem; padding: 0.3rem 1rem; }
.te-controls { display: flex; flex-direction: column; align-items: center; gap: 8px; padding: 0.5rem 0 0.8rem; }
.te-cta { padding: 0.7rem 1.9rem; border-radius: 12px; font-weight: 900; font-size: 1rem; box-shadow: 0 8px 20px rgba(0,0,0,.4); transition: transform .12s; }
.te-cta:active { transform: scale(.95); }
.te-skip { font-size: 0.78rem; color: rgba(255,255,255,.65); text-decoration: underline; cursor: pointer; }
.te-pulse { animation: te-pulse 1.5s ease-in-out infinite; }
@keyframes te-pulse { 0%,100% { transform: scale(1); box-shadow: 0 6px 16px rgba(0,0,0,.4); } 50% { transform: scale(1.05); box-shadow: 0 8px 28px 2px var(--te-glow); } }

/* overlays */
.te-overlay { position: absolute; inset: 0; z-index: 16; display: flex; flex-direction: column; align-items: center; justify-content: center; background: rgba(0,0,0,.65); backdrop-filter: blur(3px); padding: 1.2rem; text-align: center; }
.te-card { background: rgba(10,5,28,.96); border: 2px solid; border-radius: 18px; padding: 1.4rem 1.6rem; display: flex; flex-direction: column; align-items: center; gap: 10px; max-width: 86%; box-shadow: 0 18px 50px rgba(0,0,0,.55); }
.te-card-top { font-size: 1.3rem; font-weight: 900; }
.te-card-visual { width: 88px; height: 88px; display: grid; place-items: center; font-size: 3rem; }
.te-card-visual img { max-width: 100%; max-height: 100%; object-fit: contain; }
.te-card-name { font-size: 1.15rem; font-weight: 900; }
.te-card-val { font-size: 1rem; font-weight: 700; }
.te-winlist { list-style: none; padding: 0; margin: 4px 0; display: flex; flex-direction: column; gap: 5px; font-size: 0.9rem; font-weight: 700; }
.te-intro { overflow: hidden; }
.te-intro-card { position: relative; z-index: 2; background: rgba(8,4,22,.92); border: 2px solid; border-radius: 22px; padding: 1.3rem 1.3rem 1.5rem; display: flex; flex-direction: column; align-items: center; gap: 6px; max-width: 92%; animation: te-intro-glow 2.6s ease-in-out infinite; }
@keyframes te-intro-glow { 0%,100% { box-shadow: 0 0 20px -6px var(--glow); } 50% { box-shadow: 0 0 48px 0 var(--glow); } }
.te-intro-logo { max-width: 60%; max-height: 100px; object-fit: contain; margin-bottom: 4px; }
.te-intro-welcome { font-size: 1.4rem; font-weight: 900; color: var(--text); }
.te-intro-sub { font-size: 0.9rem; color: rgba(255,255,255,.8); }
.te-set-label { margin-top: 10px; font-size: 0.72rem; font-weight: 800; letter-spacing: .8px; text-transform: uppercase; color: rgba(255,255,255,.6); }
.te-chip-row { display: flex; gap: 8px; width: 100%; justify-content: center; }
.te-chip { flex: 1; padding: 0.5rem; border-radius: 12px; border: 2px solid rgba(255,255,255,.18); background: rgba(255,255,255,.07); color: #fff; font-weight: 800; font-size: 0.82rem; cursor: pointer; transition: transform .12s, background .15s; }
.te-chip:active { transform: scale(.95); }
.te-intro-start { margin-top: 14px; width: 100%; }
.te-fade-enter-active, .te-fade-leave-active { transition: opacity .3s; }
.te-fade-enter-from, .te-fade-leave-to { opacity: 0; }
</style>
