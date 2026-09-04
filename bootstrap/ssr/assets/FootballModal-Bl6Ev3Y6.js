import { defineComponent, ref, computed, watch, onBeforeUnmount, unref, useSSRContext } from "vue";
import { ssrRenderTeleport, ssrRenderClass, ssrRenderStyle, ssrInterpolate, ssrRenderAttr, ssrRenderList, ssrRenderAttrs } from "vue/server-renderer";
import { s as siteCreditLabel } from "./prizeLabel-Z9qw9N7H.js";
import { u as useSpriteFrames } from "./spriteFrames-D9HXy9dn.js";
import { _ as _export_sfc } from "../ssr.js";
import "@inertiajs/vue3";
import "three";
import "axios";
import "@inertiajs/vue3/server";
function createFootballSfx() {
  let ctx = null;
  let master = null;
  let crowd = null;
  function ac() {
    if (typeof window === "undefined") return null;
    const AC = window.AudioContext || window.webkitAudioContext;
    if (!AC) return null;
    if (!ctx) {
      ctx = new AC();
      master = ctx.createGain();
      master.gain.value = 1;
      master.connect(ctx.destination);
    }
    return ctx;
  }
  function resume() {
    try {
      const c = ac();
      if (c && c.state === "suspended") void c.resume();
    } catch {
    }
  }
  function noise(c, seconds) {
    const len = Math.max(1, Math.floor(c.sampleRate * seconds));
    const buf = c.createBuffer(1, len, c.sampleRate);
    const d = buf.getChannelData(0);
    for (let i = 0; i < len; i++) d[i] = Math.random() * 2 - 1;
    return buf;
  }
  function whistle(vol = 0.45) {
    const c = ac();
    if (!c || !master) return;
    const t = c.currentTime;
    const o = c.createOscillator();
    o.type = "triangle";
    o.frequency.setValueAtTime(2300, t);
    o.frequency.linearRampToValueAtTime(2520, t + 0.14);
    const lfo = c.createOscillator();
    lfo.frequency.value = 26;
    const lfoGain = c.createGain();
    lfoGain.gain.value = 110;
    lfo.connect(lfoGain).connect(o.frequency);
    const g = c.createGain();
    g.gain.setValueAtTime(0, t);
    g.gain.linearRampToValueAtTime(vol, t + 0.02);
    g.gain.setValueAtTime(vol, t + 0.18);
    g.gain.linearRampToValueAtTime(0, t + 0.27);
    o.connect(g).connect(master);
    o.start(t);
    lfo.start(t);
    o.stop(t + 0.28);
    lfo.stop(t + 0.28);
  }
  function kick(vol = 0.7) {
    const c = ac();
    if (!c || !master) return;
    const t = c.currentTime;
    const o = c.createOscillator();
    o.type = "sine";
    o.frequency.setValueAtTime(190, t);
    o.frequency.exponentialRampToValueAtTime(58, t + 0.13);
    const g = c.createGain();
    g.gain.setValueAtTime(vol, t);
    g.gain.exponentialRampToValueAtTime(1e-3, t + 0.2);
    o.connect(g).connect(master);
    o.start(t);
    o.stop(t + 0.22);
    const n = c.createBufferSource();
    n.buffer = noise(c, 0.05);
    const hp = c.createBiquadFilter();
    hp.type = "highpass";
    hp.frequency.value = 1400;
    const ng = c.createGain();
    ng.gain.setValueAtTime(vol * 0.5, t);
    ng.gain.exponentialRampToValueAtTime(1e-3, t + 0.05);
    n.connect(hp).connect(ng).connect(master);
    n.start(t);
    n.stop(t + 0.06);
  }
  function cheer(vol = 0.9) {
    const c = ac();
    if (!c || !master) return;
    const t = c.currentTime;
    const n = c.createBufferSource();
    n.buffer = noise(c, 2.4);
    const bp = c.createBiquadFilter();
    bp.type = "bandpass";
    bp.Q.value = 0.7;
    bp.frequency.setValueAtTime(360, t);
    bp.frequency.linearRampToValueAtTime(1150, t + 0.55);
    const g = c.createGain();
    g.gain.setValueAtTime(0, t);
    g.gain.linearRampToValueAtTime(vol, t + 0.28);
    g.gain.setValueAtTime(vol, t + 1.2);
    g.gain.linearRampToValueAtTime(0, t + 2.3);
    n.connect(bp).connect(g).connect(master);
    n.start(t);
    n.stop(t + 2.4);
    const o = c.createOscillator();
    o.type = "sawtooth";
    o.frequency.setValueAtTime(170, t);
    o.frequency.linearRampToValueAtTime(300, t + 0.45);
    const lp = c.createBiquadFilter();
    lp.type = "lowpass";
    lp.frequency.value = 900;
    const og = c.createGain();
    og.gain.setValueAtTime(0, t);
    og.gain.linearRampToValueAtTime(vol * 0.22, t + 0.3);
    og.gain.linearRampToValueAtTime(0, t + 1.7);
    o.connect(lp).connect(og).connect(master);
    o.start(t);
    o.stop(t + 1.8);
  }
  function save(vol = 0.8) {
    const c = ac();
    if (!c || !master) return;
    const t = c.currentTime;
    const o = c.createOscillator();
    o.type = "triangle";
    o.frequency.setValueAtTime(190, t);
    o.frequency.exponentialRampToValueAtTime(60, t + 0.1);
    const g = c.createGain();
    g.gain.setValueAtTime(vol, t);
    g.gain.exponentialRampToValueAtTime(1e-3, t + 0.16);
    o.connect(g).connect(master);
    o.start(t);
    o.stop(t + 0.18);
    const ns = c.createBufferSource();
    ns.buffer = noise(c, 0.09);
    const bp = c.createBiquadFilter();
    bp.type = "bandpass";
    bp.frequency.value = 700;
    bp.Q.value = 1.2;
    const ng = c.createGain();
    ng.gain.setValueAtTime(vol * 0.6, t);
    ng.gain.exponentialRampToValueAtTime(1e-3, t + 0.1);
    ns.connect(bp).connect(ng).connect(master);
    ns.start(t);
    ns.stop(t + 0.11);
    const gr = c.createBufferSource();
    gr.buffer = noise(c, 1);
    const lp2 = c.createBiquadFilter();
    lp2.type = "lowpass";
    lp2.frequency.value = 650;
    const gg = c.createGain();
    gg.gain.setValueAtTime(0, t + 0.05);
    gg.gain.linearRampToValueAtTime(vol * 0.3, t + 0.2);
    gg.gain.linearRampToValueAtTime(0, t + 1);
    gr.connect(lp2).connect(gg).connect(master);
    gr.start(t + 0.05);
    gr.stop(t + 1.05);
  }
  function startCrowd(vol = 0.1) {
    const c = ac();
    if (!c || !master || crowd) return;
    const src = c.createBufferSource();
    src.buffer = noise(c, 4);
    src.loop = true;
    const lp = c.createBiquadFilter();
    lp.type = "lowpass";
    lp.frequency.value = 680;
    lp.Q.value = 0.3;
    const g = c.createGain();
    g.gain.value = 0;
    g.gain.linearRampToValueAtTime(vol, c.currentTime + 1.2);
    src.connect(lp).connect(g).connect(master);
    src.start();
    crowd = { src, gain: g };
  }
  function stopCrowd() {
    if (!ctx || !crowd) return;
    try {
      const t = ctx.currentTime;
      crowd.gain.gain.cancelScheduledValues(t);
      crowd.gain.gain.linearRampToValueAtTime(0, t + 0.4);
      crowd.src.stop(t + 0.5);
    } catch {
    }
    crowd = null;
  }
  function dispose() {
    stopCrowd();
    try {
      void (ctx == null ? void 0 : ctx.close());
    } catch {
    }
    ctx = null;
    master = null;
  }
  return { resume, whistle, kick, cheer, save, startCrowd, stopCrowd, dispose };
}
const _sfc_main = /* @__PURE__ */ defineComponent({
  __name: "FootballModal",
  __ssrInlineRender: true,
  props: {
    modelValue: { type: Boolean, default: false },
    demoMode: { type: Boolean, default: false },
    previewMode: { default: "mobile" },
    assets: { default: () => ({}) },
    tickets: { default: () => [] },
    instant_win_categories: { default: () => [] },
    ads: { default: () => [] }
  },
  emits: ["update:modelValue", "wins-collected"],
  setup(__props, { emit: __emit }) {
    const props = __props;
    const demoPreviewMode = ref("mobile");
    const actualPreviewMode = computed(() => props.demoMode ? demoPreviewMode.value : props.previewMode || "desktop");
    const frameClass = computed(() => props.demoMode ? actualPreviewMode.value === "mobile" ? "is-mobile" : "is-desktop" : "");
    const frameStyle = computed(() => actualPreviewMode.value === "mobile" ? { width: "420px", height: "650px", border: "1px solid #444", borderRadius: "12px" } : { width: "700px", height: "650px", border: "1px solid #444", borderRadius: "4px" });
    const a = computed(() => props.assets || {});
    const titleText = computed(() => a.value.titleText || "Step up to the spot");
    const winText = computed(() => a.value.winText || "GOAL! Back of the net!");
    const loseText = computed(() => a.value.loseText || "Saved! So close…");
    const ballImage = computed(() => a.value.ballImage || "");
    const strikerFlag = computed(() => a.value.strikerFlag || "");
    const keeperFlag = computed(() => a.value.keeperFlag || "");
    const keeperSheet = computed(() => a.value.keeperSheet || "/games/football/keeper-default.png?v=12");
    const strikerSheet = computed(() => a.value.strikerSheet || "/games/football/striker-default.png?v=4");
    const spriteChroma = computed(() => a.value.spriteChroma === true);
    const keeperSheetOk = ref(true);
    const strikerSheetOk = ref(true);
    const keeperAutoFrames = ref(1);
    const strikerAutoFrames = ref(1);
    function detectFrames(url, target) {
      if (!url || typeof Image === "undefined") {
        target.value = 1;
        return;
      }
      const im = new Image();
      im.onload = () => {
        const ar = im.naturalWidth / Math.max(1, im.naturalHeight);
        target.value = ar < 1.4 ? 1 : Math.max(1, Math.round(ar));
      };
      im.onerror = () => {
        target.value = 1;
      };
      im.src = url;
    }
    watch(() => a.value.keeperSheet, (u) => detectFrames(u || "", keeperAutoFrames), { immediate: true });
    watch(strikerSheet, (u) => detectFrames(u, strikerAutoFrames), { immediate: true });
    const keeperFrames = computed(() => {
      if (!a.value.keeperSheet) return 5;
      const set = Number(a.value.keeperFrames) || 0;
      return set > 0 ? set : keeperAutoFrames.value;
    });
    const strikerFrames = computed(() => {
      if (!a.value.strikerSheet) return 3;
      const set = Number(a.value.strikerFrames) || 0;
      return set > 0 ? set : strikerAutoFrames.value;
    });
    const keeperImage = computed(() => a.value.keeperImage || "");
    const strikerImage = computed(() => a.value.strikerImage || "");
    const { urls: keeperFrameUrls } = useSpriteFrames(
      () => keeperSheet.value,
      () => keeperFrames.value,
      () => spriteChroma.value,
      () => {
        keeperSheetOk.value = false;
      }
    );
    const { urls: strikerFrameUrls } = useSpriteFrames(
      () => strikerSheet.value,
      () => strikerFrames.value,
      () => spriteChroma.value,
      () => {
        strikerSheetOk.value = false;
      }
    );
    const kitColor = computed(() => a.value.primaryColor || "#e11d48");
    const accent = computed(() => a.value.accentColor || "#22e1b3");
    const keeperKit = computed(() => a.value.goalColor && a.value.goalColor !== "#eeeeee" ? a.value.goalColor : "#f59e0b");
    const textColor = computed(() => a.value.textColor || "#ffffff");
    const THEMES = {
      // glowA/glowB = the two neon-glow colours (cyan for ball/goal/lines, magenta for keeper/striker);
      // only used when the Neon theme is on, but defined on every theme so the bindings never go empty.
      // Bright sunny afternoon — vivid blue sky, natural green pitch, gentle daytime light.
      classic: { skyTop: "#3f8fd6", skyMid: "#79bef0", skyBot: "#bfe3fb", backdrop: "#1f4f86", standTop: "#275595", standBot: "#5083bd", grassTop: "#3fb866", grassBot: "#207a42", glow: "#ffffff", glowOp: "0.26", line: "#ffffff", glowA: "#ffffff", glowB: "#ffffff" },
      // Floodlit night — deep navy stadium, cooler pitch, bright cold floodlight glow.
      night: { skyTop: "#04061a", skyMid: "#0a1838", skyBot: "#11214a", backdrop: "#080f24", standTop: "#050a1c", standBot: "#131f40", grassTop: "#2aa055", grassBot: "#125a2e", glow: "#cfeaff", glowOp: "0.5", line: "#ffffff", glowA: "#cfeaff", glowB: "#cfeaff" },
      // Retro sepia dusk — warm amber sky, faded olive turf, golden-hour wash.
      retro: { skyTop: "#7c3d0e", skyMid: "#e08a24", skyBot: "#f6cf72", backdrop: "#4a3416", standTop: "#3f2a12", standBot: "#785322", grassTop: "#7d9c38", grassBot: "#4a661f", glow: "#ffb13a", glowOp: "0.42", line: "#fff4dc", glowA: "#ffd27a", glowB: "#ffb13a" },
      // Neon arcade — electric purple stadium, DARK pitch so the glow pops, hot magenta wash. The
      // ball/goal/lines glow cyan and the keeper/striker glow magenta (see glowA/glowB).
      neon: { skyTop: "#16052e", skyMid: "#4a0f86", skyBot: "#8c1fc4", backdrop: "#1d063c", standTop: "#120428", standBot: "#430f7a", grassTop: "#0c5a3c", grassBot: "#04301f", glow: "#ff2fe0", glowOp: "0.6", line: "#bafff4", glowA: "#3df5ff", glowB: "#ff3df0" }
    };
    const pal = computed(() => THEMES[String(a.value.theme || "classic")] || THEMES.classic);
    const isNeon = computed(() => String(a.value.theme || "classic") === "neon");
    const introEnabled = computed(() => a.value.introEnabled !== false);
    const introTitleImage = computed(() => a.value.introTitleImage || "");
    const introSubtitle = computed(() => a.value.introSubtitle || "");
    const introButtonText = computed(() => a.value.introButtonText || "Kick Off ⚽");
    const introVoiceEnabled = computed(() => a.value.introVoiceEnabled !== false);
    const gameName = computed(() => a.value.name || "");
    const welcomeMsg = computed(() => (a.value.introWelcomeText || "Welcome to {name}").replace("{name}", gameName.value || "the Shootout"));
    const showIntro = ref(false);
    const showTopPrize = computed(() => a.value.showTopPrize !== false);
    const topPrize = computed(() => {
      const list = (props.instant_win_categories || []).filter(
        (c) => c && Number(c.value) > 0 && (c.available === void 0 || c.available > 0)
      );
      if (!list.length) return null;
      const nonBundle = list.filter((c) => c.prize_type !== "ticket_bundle");
      const pool = nonBundle.length ? nonBundle : list;
      return pool.reduce((best, c) => Number(c.value) > Number(best.value) ? c : best);
    });
    const topPrizeLabel = computed(() => {
      const p = topPrize.value;
      if (!p) return "";
      const name = String(p.name || "").trim();
      const v = Number(p.value);
      if (p.prize_type === "ticket_bundle") {
        if (!v || /ticket/i.test(name)) return name;
        return `${name ? name + " · " : ""}${Math.floor(v)} Free Ticket${v == 1 ? "" : "s"}`;
      }
      const sc = siteCreditLabel(p.prize_type, v);
      if (sc) return sc;
      const money = v ? `£${v % 1 === 0 ? v : v.toFixed(2)}` : "";
      return !money || /£\s*\d/.test(name) ? name : `${name} · ${money}`;
    });
    const sfx = createFootballSfx();
    const GOAL = { x1: 300, y1: 120, x2: 700, y2: 330 };
    const SPOT = { x: 545, y: 705 };
    const KEEP = { x: 500, y: 268 };
    const sceneViewBox = computed(() => actualPreviewMode.value === "mobile" ? "0 0 1000 880" : "0 0 1000 600");
    const fans = (() => {
      const out = [];
      const pal2 = ["#2f3a57", "#3b4a6b", "#4a5578", "#586079", "#6b7280", "#8a93a8", "#b9c0d0", "#7a3b46", "#a05a64", "#3b5a7a", "#c9b27a", "#d6dae3"];
      const bright = [accent.value, "#ffd54f", "#ff6fae", "#5b7cff", "#26c6da", "#ffffff"];
      let i = 0;
      for (let y = 16; y <= 116; y += 8) {
        const depth = (y - 16) / 100;
        for (let x = 6; x < 994; x += 12) {
          const jx = i * 13 % 6 - 3;
          const jy = i * 7 % 5 - 2;
          const isBright = i * 17 % 19 === 0;
          const col = isBright ? bright[i * 3 % bright.length] : pal2[i * 5 % pal2.length];
          out.push({ x: +(x + jx).toFixed(1), y: +(y + jy).toFixed(1), c: col, r: +(1.05 + i * 11 % 3 * 0.2 + depth * 0.35).toFixed(2) });
          i++;
        }
      }
      return out;
    })();
    const flashes = (() => {
      const out = [];
      for (let i = 0; i < 48; i++) {
        const mega = i % 6 === 0;
        out.push({
          x: +(6 + i * 137 % 988).toFixed(1),
          y: +(14 + i * 53 % 104).toFixed(1),
          r: +((mega ? 8 : 3.6) + i * 7 % 4 * 1.2).toFixed(2),
          delay: -(i * 0.37 % 5).toFixed(2),
          dur: (2 + i * 0.19 % 2.4).toFixed(2)
        });
      }
      return out;
    })();
    const ads = computed(() => props.ads && props.ads.length ? props.ads.slice(0, 3) : []);
    const adCopies = computed(() => {
      const w = ads.value.length * 224;
      return w > 0 ? Math.max(2, Math.ceil(1200 / w) + 1) : 0;
    });
    const adStrip = computed(() => Array.from({ length: adCopies.value }, () => ads.value).flat());
    const adSetWidth = computed(() => ads.value.length * 224);
    const trunc = (s, n = 20) => s && s.length > n ? s.slice(0, n - 1) + "…" : s || "";
    const adLed = ["#0b3d91", "#9b1c1c", "#0f766e", "#6d28d9", "#b45309", "#1d4ed8", "#be123c"];
    const ledColor = (i) => adLed[i % adLed.length];
    const pens = ref([]);
    const index = ref(0);
    const phase = ref("ready");
    const showPrize = ref(false);
    const aim = ref({ x: 500, y: 210 });
    const shotTarget = ref({ x: 500, y: 210 });
    const shotPower = ref(50);
    const power = ref(0);
    const flash = ref(false);
    const shake = ref(false);
    const roar = ref(false);
    const netHit = ref(false);
    const saved = ref(false);
    const kicked = ref(false);
    const particles = ref([]);
    const wow = ref(false);
    const goalFlashes = (() => {
      const out = [];
      for (let i = 0; i < 30; i++) {
        out.push({ x: i * 47 % 100, y: i * 71 % 98, size: 60 + i * 13 % 5 * 16, delay: +(i * 0.11 % 1.5).toFixed(2), dur: +(0.7 + i * 0.07 % 0.7).toFixed(2) });
      }
      return out;
    })();
    let rafId = 0;
    const isWin = (t) => !!((t == null ? void 0 : t.instant_win) && t.instant_win.prize && t.instant_win.prize !== "NO WIN");
    function categoryFor(iw) {
      const cats = props.instant_win_categories || [];
      if (!iw) return null;
      return (iw.category_id != null ? cats.find((c) => c.id === iw.category_id) : null) || cats.find((c) => c.name && (c.name === iw.prize || c.name === iw.name)) || null;
    }
    function buildPens() {
      pens.value = (props.tickets || []).map((t) => {
        const iw = t == null ? void 0 : t.instant_win;
        const won = isWin(t);
        const cat = won ? categoryFor(iw) : null;
        const val = Number((iw == null ? void 0 : iw.value) || (cat == null ? void 0 : cat.value) || 0);
        const pType = (iw == null ? void 0 : iw.prize_type) ?? (cat == null ? void 0 : cat.prize_type);
        return {
          id: t.id ?? t.number,
          number: String(t.number ?? t.id ?? ""),
          win: won,
          prize: won ? siteCreditLabel(pType, val) ?? String(iw.prize) : "",
          value: val,
          image: (iw == null ? void 0 : iw.image_path) || (cat == null ? void 0 : cat.image_path) || "",
          // Ticket bundles carry a ticket count, not a £ value — flagged so the reveal never shows £.
          isBundle: won && ((iw == null ? void 0 : iw.prize_type) ?? (cat == null ? void 0 : cat.prize_type)) === "ticket_bundle"
        };
      });
      index.value = 0;
      resetShot();
    }
    function resetShot() {
      phase.value = "ready";
      showPrize.value = false;
      aim.value = { x: 500, y: 210 };
      shotTarget.value = { x: 500, y: 210 };
      power.value = 0;
      flash.value = shake.value = roar.value = netHit.value = saved.value = kicked.value = false;
      particles.value = [];
    }
    watch(() => props.tickets, buildPens, { immediate: true, deep: true });
    watch(() => props.modelValue, (o) => {
      if (o) buildPens();
      else stopPower();
    });
    watch(() => props.modelValue, (o) => {
      if (o) {
        showIntro.value = introEnabled.value;
        if (showIntro.value && !props.demoMode) playWelcome();
      } else {
        showIntro.value = false;
        cancelSpeech();
        sfx.stopCrowd();
      }
    }, { immediate: true });
    watch(introEnabled, (on) => {
      if (props.demoMode) {
        showIntro.value = on;
        if (on) playWelcome();
      }
    });
    watch(introTitleImage, () => {
      if (props.demoMode && introEnabled.value) showIntro.value = true;
    });
    const current = computed(() => pens.value[index.value] ?? null);
    const total = computed(() => pens.value.length);
    const scored = computed(() => pens.value.slice(0, phase.value === "done" ? total.value : index.value + (phase.value === "result" ? 1 : 0)).filter((p) => p.win).length);
    const wins = computed(() => pens.value.filter((p) => p.win));
    const totalWon = computed(() => wins.value.filter((w) => !w.isBundle).reduce((sum, w) => sum + (Number(w.value) || 0), 0));
    const playedCount = computed(() => phase.value === "done" ? total.value : index.value + (phase.value === "result" ? 1 : 0));
    const playedPens = computed(() => pens.value.slice(0, playedCount.value));
    computed(() => playedPens.value.filter((p) => p.win && !p.isBundle).reduce((sum, p) => sum + (Number(p.value) || 0), 0));
    const trackerView = computed(() => playedPens.value.map((p, gi) => ({ p, gi })).slice(-9));
    const trackLabel = (p) => {
      if (p.isBundle && p.value && !/ticket/i.test(p.prize)) return `${Math.floor(p.value)} FT`;
      if (p.value && !p.isBundle) return `£${p.value % 1 === 0 ? p.value : Number(p.value).toFixed(2)}`;
      return "WON";
    };
    const prompt = computed(() => {
      var _a;
      return phase.value === "ready" ? titleText.value : phase.value === "aim" ? "Pick your corner 🎯" : phase.value === "power" ? "Time your power…" : phase.value === "shooting" ? "" : ((_a = current.value) == null ? void 0 : _a.win) ? winText.value : loseText.value;
    });
    const currentValueLabel = computed(() => {
      const p = current.value;
      const v = Number((p == null ? void 0 : p.value) || 0);
      if (!v) return "";
      if (p == null ? void 0 : p.isBundle) return /ticket/i.test((p == null ? void 0 : p.prize) || "") ? "" : `${Math.floor(v)} Free Ticket${v == 1 ? "" : "s"}`;
      if (/£\s*\d/.test((p == null ? void 0 : p.prize) || "")) return "";
      return `£${v % 1 === 0 ? v : v.toFixed(2)}`;
    });
    const hostEnabled = computed(() => a.value.hostEnabled !== false);
    const hostImage = computed(() => a.value.hostImage || "/games/football/commentator-default.png?v=1");
    const hostImageOk = ref(true);
    watch(() => a.value.hostImage, () => {
      hostImageOk.value = true;
    });
    const hostLine = computed(() => {
      var _a;
      if (showIntro.value) return "";
      switch (phase.value) {
        case "ready":
          return index.value === 0 ? "Big moment — step up!" : "Next one… keep your nerve!";
        case "aim":
          return "Pick your corner…";
        case "power":
          return "Time the power just right!";
        case "shooting":
          return "He strikes it…";
        case "result":
          return ((_a = current.value) == null ? void 0 : _a.win) ? "GOAL! Get in there! 🎉" : "Saved! Oh so close!";
        case "done":
          return scored.value > 0 ? `Full time — ${scored.value} in the net!` : "Full time! Unlucky that time.";
        default:
          return "";
      }
    });
    const keepLand = ref({ x: 500, y: 268 });
    const moving = computed(() => phase.value === "shooting" || phase.value === "result");
    const ballTf = computed(() => {
      if (!kicked.value) return `translate(${SPOT.x}px, ${SPOT.y}px) scale(0.66)`;
      const t = current.value && !current.value.win ? keepLand.value : shotTarget.value;
      return `translate(${t.x}px, ${t.y}px) scale(0.5)`;
    });
    const ballDurMs = computed(() => Math.round(920 - shotPower.value / 100 * 460));
    const ballDur = computed(() => (ballDurMs.value / 1e3).toFixed(2));
    const keepTf = computed(() => {
      if (!kicked.value) return "translate(0px, 0px)";
      const raw = keepLand.value.x - KEEP.x;
      const glove = raw < -25 ? 46 : raw > 25 ? -46 : 0;
      const dx = raw + glove, dy = keepLand.value.y - KEEP.y - 20;
      return `translate(${dx}px, ${dy}px)`;
    });
    const keepShadowTf = computed(() => kicked.value ? `translate(${keepLand.value.x - KEEP.x}px, 0px)` : `translate(${(Math.sin(keeperPhase.value) * 65).toFixed(1)}px, 0px)`);
    const keepArmLTf = computed(() => kicked.value ? "rotate(58deg)" : "");
    const keepArmRTf = computed(() => kicked.value ? "rotate(-58deg)" : "");
    const keeperWalk = ref(0);
    let keeperRaf = 0, keeperT0 = 0, keeperLast = 0;
    const keeperPhase = ref(2.5);
    function keeperLoop(t) {
      if (!keeperT0) keeperT0 = t;
      if (t - keeperLast >= 33) {
        keeperLast = t;
        const elapsed = (t - keeperT0) / 1e3;
        keeperPhase.value = 2.5 + elapsed * 0.9;
        if (!kicked.value) keeperWalk.value = Math.floor(elapsed * 7);
      }
      keeperRaf = requestAnimationFrame(keeperLoop);
    }
    function startKeeperLoop() {
      if (!keeperRaf) keeperRaf = requestAnimationFrame(keeperLoop);
    }
    function stopKeeperLoop() {
      if (keeperRaf) cancelAnimationFrame(keeperRaf);
      keeperRaf = 0;
    }
    watch(() => props.modelValue, (open) => {
      open ? startKeeperLoop() : stopKeeperLoop();
    }, { immediate: true });
    const keeperMovingRight = computed(() => Math.cos(keeperPhase.value) >= 0);
    const keeperShuffleTf = computed(() => kicked.value ? "translate3d(0,0,0)" : `translate3d(${(Math.sin(keeperPhase.value) * 65).toFixed(1)}px,0,0)`);
    const keeperFrame = computed(() => {
      const n = Math.max(2, keeperFrames.value);
      if (kicked.value) return n - 1;
      return keeperWalk.value % Math.max(1, n - 1);
    });
    const keeperFlip = computed(() => kicked.value ? keepLand.value.x - KEEP.x > 25 : keeperMovingRight.value);
    const strikerFrame = computed(() => !moving.value ? 0 : !kicked.value ? Math.min(1, strikerFrames.value - 1) : Math.min(2, strikerFrames.value - 1));
    const keeperFrameUrl = computed(() => keeperFrameUrls.value[Math.min(keeperFrame.value, keeperFrameUrls.value.length - 1)] || "");
    const strikerFrameUrl = computed(() => strikerFrameUrls.value[Math.min(strikerFrame.value, strikerFrameUrls.value.length - 1)] || "");
    computed(() => kicked.value ? `translate(${SPOT.x}px, ${SPOT.y}px)` : "");
    const strikerSvgTf = computed(() => moving.value ? "translate(395px, 385px) scale(2.25, 3.2)" : "translate(308px, 502px) scale(1.95, 2.85)");
    const strikerShadowTf = computed(() => moving.value ? "translate(485px, 769px)" : "translate(386px, 844px)");
    function play(u) {
      if (!u) return;
      try {
        const x = new Audio(u);
        x.volume = props.demoMode ? 0.35 : 0.75;
        void x.play().catch(() => {
        });
      } catch {
      }
    }
    function speak(text) {
      try {
        const synth = window.speechSynthesis;
        if (!synth || !text) return;
        synth.cancel();
        const u = new SpeechSynthesisUtterance(text);
        u.rate = 0.98;
        u.pitch = 1.05;
        u.volume = props.demoMode ? 0.6 : 0.95;
        synth.speak(u);
      } catch {
      }
    }
    function cancelSpeech() {
      var _a;
      try {
        (_a = window.speechSynthesis) == null ? void 0 : _a.cancel();
      } catch {
      }
    }
    function playWelcome() {
      if (a.value.welcomeSound) {
        play(a.value.welcomeSound);
        return;
      }
      if (introVoiceEnabled.value) speak(welcomeMsg.value);
    }
    const showHints = ref(true);
    function stopPower() {
      if (rafId) cancelAnimationFrame(rafId);
      rafId = 0;
    }
    onBeforeUnmount(() => {
      stopPower();
      cancelSpeech();
      sfx.dispose();
      cancelAnimationFrame(keeperRaf);
    });
    return (_ctx, _push, _parent, _attrs) => {
      ssrRenderTeleport(_push, (_push2) => {
        if (__props.modelValue) {
          _push2(`<div class="${ssrRenderClass([__props.demoMode ? "fbg-demo" : "fbg-fixed", "fbg-root"])}" data-v-0bc4eb40>`);
          if (__props.demoMode) {
            _push2(`<div class="fbg-demo-bar" data-v-0bc4eb40><span class="fbg-demo-bar-label" data-v-0bc4eb40>Preview Mode:</span><button class="${ssrRenderClass([actualPreviewMode.value === "mobile" ? "is-on" : "is-off", "fbg-demo-btn"])}" data-v-0bc4eb40>📱 Mobile</button><button class="${ssrRenderClass([actualPreviewMode.value === "desktop" ? "is-on" : "is-off", "fbg-demo-btn"])}" data-v-0bc4eb40>💻 Desktop</button></div>`);
          } else {
            _push2(`<!---->`);
          }
          _push2(`<div class="${ssrRenderClass(__props.demoMode ? "fbg-demo-device fbg-modal-zoom" : "contents")}" style="${ssrRenderStyle(__props.demoMode ? frameStyle.value : void 0)}" data-v-0bc4eb40>`);
          if (__props.demoMode && actualPreviewMode.value === "mobile") {
            _push2(`<div class="fbg-demo-statusbar" data-v-0bc4eb40><span data-v-0bc4eb40>9:41</span><span class="fbg-demo-sigs" data-v-0bc4eb40><span class="fbg-demo-sig-a" data-v-0bc4eb40></span><span class="fbg-demo-sig-b" data-v-0bc4eb40></span></span></div>`);
          } else if (__props.demoMode) {
            _push2(`<div class="fbg-demo-browserbar" data-v-0bc4eb40><span class="fbg-demo-dots" data-v-0bc4eb40><span data-v-0bc4eb40></span><span data-v-0bc4eb40></span><span data-v-0bc4eb40></span></span><span class="fbg-demo-url" data-v-0bc4eb40>⚽ Football — Take Your Shot</span></div>`);
          } else {
            _push2(`<!---->`);
          }
          _push2(`<div class="${ssrRenderClass(__props.demoMode ? "fbg-demo-scroll" : "contents")}" data-v-0bc4eb40><div class="${ssrRenderClass([frameClass.value, "fbg"])}" style="${ssrRenderStyle({ "--ac": accent.value })}" data-v-0bc4eb40>`);
          if (!__props.demoMode) {
            _push2(`<button class="fbg-x" style="${ssrRenderStyle({ color: textColor.value })}" aria-label="Close" data-v-0bc4eb40>×</button>`);
          } else {
            _push2(`<!---->`);
          }
          _push2(`<div class="fbg-top" data-v-0bc4eb40><p class="fbg-eyebrow" style="${ssrRenderStyle({ color: accent.value })}" data-v-0bc4eb40>Penalty Shootout</p><p class="fbg-prompt" style="${ssrRenderStyle({ color: textColor.value })}" data-v-0bc4eb40>${ssrInterpolate(prompt.value)}</p>`);
          if (showTopPrize.value && topPrize.value) {
            _push2(`<div class="fbg-topprize" style="${ssrRenderStyle({ borderColor: accent.value, color: textColor.value })}" data-v-0bc4eb40>`);
            if (topPrize.value.image_path) {
              _push2(`<img${ssrRenderAttr("src", topPrize.value.image_path)} class="fbg-topprize-img" alt="" data-v-0bc4eb40>`);
            } else {
              _push2(`<span class="fbg-topprize-emoji" data-v-0bc4eb40>🏆</span>`);
            }
            _push2(`<span style="${ssrRenderStyle({ color: accent.value })}" data-v-0bc4eb40>TOP PRIZE</span><span class="fbg-topprize-val" data-v-0bc4eb40>${ssrInterpolate(topPrizeLabel.value)}</span></div>`);
          } else {
            _push2(`<!---->`);
          }
          _push2(`</div><div class="${ssrRenderClass([{ shake: shake.value, megashake: wow.value }, "fbg-stage"])}" data-v-0bc4eb40><svg class="fbg-svg"${ssrRenderAttr("viewBox", sceneViewBox.value)} preserveAspectRatio="xMidYMid slice" data-v-0bc4eb40><defs data-v-0bc4eb40><linearGradient id="fbg-sky" x1="0" y1="0" x2="0" y2="1" data-v-0bc4eb40><stop offset="0"${ssrRenderAttr("stop-color", pal.value.skyTop)} data-v-0bc4eb40></stop><stop offset="0.6"${ssrRenderAttr("stop-color", pal.value.skyMid)} data-v-0bc4eb40></stop><stop offset="1"${ssrRenderAttr("stop-color", pal.value.skyBot)} data-v-0bc4eb40></stop></linearGradient><linearGradient id="fbg-stand" x1="0" y1="0" x2="0" y2="1" data-v-0bc4eb40><stop offset="0"${ssrRenderAttr("stop-color", pal.value.standTop)} data-v-0bc4eb40></stop><stop offset="1"${ssrRenderAttr("stop-color", pal.value.standBot)} data-v-0bc4eb40></stop></linearGradient><linearGradient id="fbg-grass" x1="0" y1="0" x2="0" y2="1" data-v-0bc4eb40><stop offset="0"${ssrRenderAttr("stop-color", pal.value.grassTop)} data-v-0bc4eb40></stop><stop offset="1"${ssrRenderAttr("stop-color", pal.value.grassBot)} data-v-0bc4eb40></stop></linearGradient><radialGradient id="fbg-flood" cx="0.5" cy="0.5" r="0.5" data-v-0bc4eb40><stop offset="0"${ssrRenderAttr("stop-color", pal.value.glow)}${ssrRenderAttr("stop-opacity", pal.value.glowOp)} data-v-0bc4eb40></stop><stop offset="1" stop-opacity="0" data-v-0bc4eb40></stop></radialGradient><radialGradient id="fbg-ball" cx="0.36" cy="0.3" r="0.9" data-v-0bc4eb40><stop offset="0" stop-color="#fff" data-v-0bc4eb40></stop><stop offset="0.7" stop-color="#eef1f6" data-v-0bc4eb40></stop><stop offset="1" stop-color="#c4cad6" data-v-0bc4eb40></stop></radialGradient><radialGradient id="fbg-ball-edge" cx="0.4" cy="0.34" r="0.66" data-v-0bc4eb40><stop offset="0.5" stop-color="#000" stop-opacity="0" data-v-0bc4eb40></stop><stop offset="1" stop-color="#0a0e16" stop-opacity="0.36" data-v-0bc4eb40></stop></radialGradient><linearGradient id="fbg-trail" x1="0" y1="0" x2="1" y2="0" data-v-0bc4eb40><stop offset="0"${ssrRenderAttr("stop-color", accent.value)} stop-opacity="0" data-v-0bc4eb40></stop><stop offset="1"${ssrRenderAttr("stop-color", accent.value)} stop-opacity="0.8" data-v-0bc4eb40></stop></linearGradient><pattern id="fbg-net" width="14" height="14" patternUnits="userSpaceOnUse" data-v-0bc4eb40><path d="M0 0H14M0 0V14" stroke="rgba(214,230,255,.55)" stroke-width="1.3" fill="none" data-v-0bc4eb40></path></pattern><radialGradient id="fbg-flashglow" cx="0.5" cy="0.5" r="0.5" data-v-0bc4eb40><stop offset="0" stop-color="#ffffff" data-v-0bc4eb40></stop><stop offset="0.35" stop-color="#fdfeff" stop-opacity="0.82" data-v-0bc4eb40></stop><stop offset="1" stop-color="#dfe8ff" stop-opacity="0" data-v-0bc4eb40></stop></radialGradient><filter id="fbg-glow" x="-60%" y="-60%" width="220%" height="220%" data-v-0bc4eb40><feGaussianBlur stdDeviation="5" result="b" data-v-0bc4eb40></feGaussianBlur><feMerge data-v-0bc4eb40><feMergeNode in="b" data-v-0bc4eb40></feMergeNode><feMergeNode in="SourceGraphic" data-v-0bc4eb40></feMergeNode></feMerge></filter><filter id="fbg-soft" x="-60%" y="-60%" width="220%" height="220%" data-v-0bc4eb40><feGaussianBlur stdDeviation="3.5" data-v-0bc4eb40></feGaussianBlur></filter><filter id="fbg-neonC" x="-70%" y="-70%" width="240%" height="240%" data-v-0bc4eb40><feDropShadow dx="0" dy="0" stdDeviation="6"${ssrRenderAttr("flood-color", pal.value.glowA)} flood-opacity="0.95" data-v-0bc4eb40></feDropShadow></filter><filter id="fbg-neonM" x="-70%" y="-70%" width="240%" height="240%" data-v-0bc4eb40><feDropShadow dx="0" dy="0" stdDeviation="6"${ssrRenderAttr("flood-color", pal.value.glowB)} flood-opacity="0.95" data-v-0bc4eb40></feDropShadow></filter></defs><rect x="0" y="0" width="1000" height="200" fill="url(#fbg-sky)" data-v-0bc4eb40></rect><ellipse cx="150" cy="14" rx="320" ry="160" fill="url(#fbg-flood)" data-v-0bc4eb40></ellipse><ellipse cx="850" cy="14" rx="320" ry="160" fill="url(#fbg-flood)" data-v-0bc4eb40></ellipse><rect x="0" y="0" width="1000" height="146" fill="url(#fbg-grass)" opacity="0" data-v-0bc4eb40></rect><rect x="0" y="0" width="1000" height="146"${ssrRenderAttr("fill", pal.value.backdrop)} data-v-0bc4eb40></rect><rect x="0" y="0" width="1000" height="13" fill="#000" opacity="0.4" data-v-0bc4eb40></rect><g stroke="rgba(0,0,0,.28)" stroke-width="2.4" data-v-0bc4eb40><line x1="0" y1="34" x2="1000" y2="34" data-v-0bc4eb40></line><line x1="0" y1="60" x2="1000" y2="60" data-v-0bc4eb40></line><line x1="0" y1="88" x2="1000" y2="88" data-v-0bc4eb40></line><line x1="0" y1="118" x2="1000" y2="118" data-v-0bc4eb40></line></g><rect x="0" y="14" width="1000" height="104" fill="url(#fbg-stand)" opacity="0.9" data-v-0bc4eb40></rect><g class="${ssrRenderClass([{ roar: roar.value }, "fbg-crowd"])}" data-v-0bc4eb40><!--[-->`);
          ssrRenderList(unref(fans), (f, i) => {
            _push2(`<circle${ssrRenderAttr("cx", f.x)}${ssrRenderAttr("cy", f.y)}${ssrRenderAttr("r", f.r)}${ssrRenderAttr("fill", f.c)} data-v-0bc4eb40></circle>`);
          });
          _push2(`<!--]--></g><rect x="0" y="13" width="1000" height="34" fill="#000" opacity="0.3" data-v-0bc4eb40></rect><rect x="0" y="13" width="1000" height="4" fill="#000" opacity="0.55" data-v-0bc4eb40></rect><g class="fbg-camflashes" data-v-0bc4eb40><!--[-->`);
          ssrRenderList(unref(flashes), (cf, i) => {
            _push2(`<circle class="fbg-camflash" fill="url(#fbg-flashglow)"${ssrRenderAttr("cx", cf.x)}${ssrRenderAttr("cy", cf.y)}${ssrRenderAttr("r", cf.r)} style="${ssrRenderStyle({ animationDelay: cf.delay + "s", animationDuration: cf.dur + "s" })}" data-v-0bc4eb40></circle>`);
          });
          _push2(`<!--]--></g>`);
          if (ads.value.length) {
            _push2(`<g data-v-0bc4eb40><clipPath id="fbg-hoard" data-v-0bc4eb40><rect x="0" y="120" width="1000" height="26" data-v-0bc4eb40></rect></clipPath><rect x="0" y="118" width="1000" height="3" fill="#000" opacity="0.55" data-v-0bc4eb40></rect><rect x="0" y="120" width="1000" height="26" fill="#04060d" data-v-0bc4eb40></rect><g clip-path="url(#fbg-hoard)" data-v-0bc4eb40><g data-v-0bc4eb40><!--[-->`);
            ssrRenderList(adStrip.value, (ad, i) => {
              _push2(`<g${ssrRenderAttr("transform", `translate(${i * 224}, 121)`)} data-v-0bc4eb40><rect width="216" height="24" rx="2"${ssrRenderAttr("fill", ledColor(i))} data-v-0bc4eb40></rect><rect width="216" height="11" rx="2" fill="#fff" opacity="0.13" data-v-0bc4eb40></rect><rect x="0.5" y="0.5" width="215" height="23" rx="2" fill="none" stroke="#fff" stroke-opacity="0.16" data-v-0bc4eb40></rect>`);
              if (ad.image) {
                _push2(`<rect x="4" y="3" width="20" height="18" rx="2" fill="#000" opacity="0.28" data-v-0bc4eb40></rect>`);
              } else {
                _push2(`<!---->`);
              }
              if (ad.image) {
                _push2(`<image${ssrRenderAttr("href", ad.image)} x="5" y="4" width="18" height="16" preserveAspectRatio="xMidYMid slice" data-v-0bc4eb40></image>`);
              } else {
                _push2(`<!---->`);
              }
              _push2(`<text${ssrRenderAttr("x", ad.image ? 30 : 11)} y="16" fill="#fff" font-size="11" font-weight="800" letter-spacing="0.4" data-v-0bc4eb40>${ssrInterpolate(trunc(ad.name))}</text></g>`);
            });
            _push2(`<!--]--><animateTransform attributeName="transform" type="translate" from="0 0"${ssrRenderAttr("to", `-${adSetWidth.value} 0`)}${ssrRenderAttr("dur", `${Math.max(14, ads.value.length * 4)}s`)} repeatCount="indefinite" data-v-0bc4eb40></animateTransform></g></g><rect x="0" y="145" width="1000" height="2"${ssrRenderAttr("fill", accent.value)} opacity="0.22" data-v-0bc4eb40></rect></g>`);
          } else {
            _push2(`<!---->`);
          }
          _push2(`<rect x="0" y="146" width="1000" height="860" fill="url(#fbg-grass)" data-v-0bc4eb40></rect><!--[-->`);
          ssrRenderList(9, (s) => {
            _push2(`<rect${ssrRenderAttr("x", (s - 1) * 112)} y="146" width="56" height="860" fill="#fff" opacity="0.03" data-v-0bc4eb40></rect>`);
          });
          _push2(`<!--]--><g fill="none"${ssrRenderAttr("stroke", pal.value.line)} stroke-width="3.5" opacity="0.7"${ssrRenderAttr("filter", isNeon.value ? "url(#fbg-neonC)" : void 0)} data-v-0bc4eb40><path d="M110 600 L110 430 L890 430 L890 600" data-v-0bc4eb40></path><path d="M360 430 A150 56 0 0 0 640 430" data-v-0bc4eb40></path></g><rect${ssrRenderAttr("x", GOAL.x1 + 7)}${ssrRenderAttr("y", GOAL.y1 + 7)}${ssrRenderAttr("width", GOAL.x2 - GOAL.x1 - 14)}${ssrRenderAttr("height", GOAL.y2 - GOAL.y1 - 7)} fill="url(#fbg-net)" class="${ssrRenderClass({ ripple: netHit.value })}" data-v-0bc4eb40></rect><g fill="none"${ssrRenderAttr("stroke", textColor.value)} stroke-width="8" stroke-linejoin="round" style="${ssrRenderStyle(netHit.value ? { filter: "url(#fbg-glow)" } : isNeon.value ? { filter: "url(#fbg-neonC)" } : {})}" data-v-0bc4eb40><path${ssrRenderAttr("d", `M${GOAL.x1} ${GOAL.y2} L${GOAL.x1} ${GOAL.y1} L${GOAL.x2} ${GOAL.y1} L${GOAL.x2} ${GOAL.y2}`)} data-v-0bc4eb40></path></g><ellipse cx="500" cy="350" rx="46" ry="10" fill="#000" opacity="0.34" filter="url(#fbg-soft)" style="${ssrRenderStyle({ transform: keepShadowTf.value, transformBox: "view-box", transformOrigin: "500px 350px", transition: kicked.value ? "transform .5s cubic-bezier(.3,.7,.4,1)" : "none" })}" data-v-0bc4eb40></ellipse><g${ssrRenderAttr("filter", isNeon.value ? "url(#fbg-neonM)" : void 0)} style="${ssrRenderStyle({ transform: keepTf.value, transformBox: "view-box", transformOrigin: "500px 268px", transition: kicked.value ? "transform .5s cubic-bezier(.3,.7,.4,1)" : "none" })}" data-v-0bc4eb40>`);
          if (keeperSheet.value && keeperSheetOk.value && keeperFrameUrl.value) {
            _push2(`<g style="${ssrRenderStyle({ transform: keeperShuffleTf.value, willChange: "transform" })}" data-v-0bc4eb40><image${ssrRenderAttr("href", keeperFrameUrl.value)} x="425" y="160" width="150" height="190" preserveAspectRatio="xMidYMax meet"${ssrRenderAttr("transform", keeperFlip.value ? "translate(1000 0) scale(-1 1)" : void 0)} data-v-0bc4eb40></image></g>`);
          } else if (keeperImage.value) {
            _push2(`<image${ssrRenderAttr("href", keeperImage.value)} x="448" y="196" width="104" height="140" data-v-0bc4eb40></image>`);
          } else {
            _push2(`<g class="fbg-keeper-tall" data-v-0bc4eb40><g class="${ssrRenderClass({ "fbg-keeper-idle": !kicked.value })}" data-v-0bc4eb40><path d="M490 300 q-6 18 -10 30" stroke="#222a3f" stroke-width="13" stroke-linecap="round" fill="none" data-v-0bc4eb40></path><path d="M510 300 q6 18 10 30" stroke="#222a3f" stroke-width="13" stroke-linecap="round" fill="none" data-v-0bc4eb40></path><g class="${ssrRenderClass([{ "arm-idle-l": !kicked.value }, "fbg-arm"])}" style="${ssrRenderStyle(kicked.value ? { transform: keepArmLTf.value, transformBox: "view-box", transformOrigin: "484px 276px", transition: "transform .35s ease" } : void 0)}" data-v-0bc4eb40><path d="M483 274 q-24 2 -40 18"${ssrRenderAttr("stroke", keeperKit.value)} stroke-width="12" stroke-linecap="round" fill="none" data-v-0bc4eb40></path><circle cx="441" cy="294" r="11"${ssrRenderAttr("fill", accent.value)} filter="url(#fbg-glow)" data-v-0bc4eb40></circle></g><g class="${ssrRenderClass([{ "arm-idle-r": !kicked.value }, "fbg-arm"])}" style="${ssrRenderStyle(kicked.value ? { transform: keepArmRTf.value, transformBox: "view-box", transformOrigin: "516px 276px", transition: "transform .35s ease" } : void 0)}" data-v-0bc4eb40><path d="M517 274 q24 2 40 18"${ssrRenderAttr("stroke", keeperKit.value)} stroke-width="12" stroke-linecap="round" fill="none" data-v-0bc4eb40></path><circle cx="559" cy="294" r="11"${ssrRenderAttr("fill", accent.value)} filter="url(#fbg-glow)" data-v-0bc4eb40></circle></g><path d="M478 262 q22 -12 44 0 l-3 42 q-19 8 -38 0 z"${ssrRenderAttr("fill", keeperKit.value)} data-v-0bc4eb40></path><path d="M478 262 q22 -12 44 0 l-2 12 q-20 -8 -40 0 z"${ssrRenderAttr("fill", accent.value)} opacity="0.9" data-v-0bc4eb40></path><clipPath id="fbg-keeper-shirt" data-v-0bc4eb40><path d="M478 262 q22 -12 44 0 l-3 42 q-19 8 -38 0 z" data-v-0bc4eb40></path></clipPath>`);
            if (keeperFlag.value) {
              _push2(`<image${ssrRenderAttr("href", keeperFlag.value)} x="477" y="258" width="46" height="48" preserveAspectRatio="xMidYMid slice" clip-path="url(#fbg-keeper-shirt)" data-v-0bc4eb40></image>`);
            } else {
              _push2(`<!---->`);
            }
            _push2(`<circle cx="500" cy="248" r="16" fill="#e9b489" data-v-0bc4eb40></circle><path d="M485 244 q15 -16 30 0 q-15 -8 -30 0z" fill="#2b2016" data-v-0bc4eb40></path></g></g>`);
          }
          _push2(`</g>`);
          if (phase.value === "aim" || phase.value === "power") {
            _push2(`<g${ssrRenderAttr("stroke", accent.value)} stroke-width="3" fill="none" filter="url(#fbg-glow)" data-v-0bc4eb40><circle${ssrRenderAttr("cx", aim.value.x)}${ssrRenderAttr("cy", aim.value.y)} r="6"${ssrRenderAttr("fill", accent.value)} data-v-0bc4eb40></circle><circle${ssrRenderAttr("cx", aim.value.x)}${ssrRenderAttr("cy", aim.value.y)} r="22" opacity="0.8" data-v-0bc4eb40></circle><line${ssrRenderAttr("x1", aim.value.x - 34)}${ssrRenderAttr("y1", aim.value.y)}${ssrRenderAttr("x2", aim.value.x - 24)}${ssrRenderAttr("y2", aim.value.y)} data-v-0bc4eb40></line><line${ssrRenderAttr("x1", aim.value.x + 24)}${ssrRenderAttr("y1", aim.value.y)}${ssrRenderAttr("x2", aim.value.x + 34)}${ssrRenderAttr("y2", aim.value.y)} data-v-0bc4eb40></line><line${ssrRenderAttr("x1", aim.value.x)}${ssrRenderAttr("y1", aim.value.y - 34)}${ssrRenderAttr("x2", aim.value.x)}${ssrRenderAttr("y2", aim.value.y - 24)} data-v-0bc4eb40></line><line${ssrRenderAttr("x1", aim.value.x)}${ssrRenderAttr("y1", aim.value.y + 24)}${ssrRenderAttr("x2", aim.value.x)}${ssrRenderAttr("y2", aim.value.y + 34)} data-v-0bc4eb40></line></g>`);
          } else {
            _push2(`<!---->`);
          }
          if (kicked.value) {
            _push2(`<line${ssrRenderAttr("x1", SPOT.x)}${ssrRenderAttr("y1", SPOT.y)}${ssrRenderAttr("x2", current.value && !current.value.win ? keepLand.value.x : shotTarget.value.x)}${ssrRenderAttr("y2", current.value && !current.value.win ? keepLand.value.y : shotTarget.value.y)} stroke="url(#fbg-trail)" stroke-width="6" stroke-linecap="round" opacity="0.55" class="fbg-trail" data-v-0bc4eb40></line>`);
          } else {
            _push2(`<!---->`);
          }
          _push2(`<ellipse cx="0" cy="0" rx="44" ry="11" fill="#000" opacity="0.3" filter="url(#fbg-soft)" style="${ssrRenderStyle({ transform: strikerShadowTf.value, transformBox: "view-box", transformOrigin: "0px 0px", transition: "transform .5s cubic-bezier(.4,.1,.3,1)" })}" data-v-0bc4eb40></ellipse><g class="${ssrRenderClass([{ run: moving.value }, "fbg-striker-svg"])}"${ssrRenderAttr("filter", isNeon.value ? "url(#fbg-neonM)" : void 0)} style="${ssrRenderStyle({ transform: strikerSvgTf.value, transformBox: "view-box", transformOrigin: "0px 0px", transition: "transform .5s cubic-bezier(.4,.1,.3,1)" })}" data-v-0bc4eb40>`);
          if (strikerSheet.value && strikerSheetOk.value && strikerFrameUrl.value) {
            _push2(`<image${ssrRenderAttr("href", strikerFrameUrl.value)} x="0" y="0" width="80" height="120" preserveAspectRatio="xMidYMax meet" data-v-0bc4eb40></image>`);
          } else if (strikerImage.value) {
            _push2(`<image${ssrRenderAttr("href", strikerImage.value)} x="0" y="0" width="80" height="120" data-v-0bc4eb40></image>`);
          } else {
            _push2(`<g data-v-0bc4eb40><path d="M40 60 q-4 22 -10 40" stroke="#e9b489" stroke-width="9" stroke-linecap="round" fill="none" data-v-0bc4eb40></path><g class="kick" data-v-0bc4eb40><path d="M44 60 q14 6 26 2" stroke="#e9b489" stroke-width="9" stroke-linecap="round" fill="none" data-v-0bc4eb40></path><rect x="66" y="56" width="14" height="7" rx="3" fill="#111" data-v-0bc4eb40></rect></g><rect x="26" y="80" width="14" height="7" rx="3" fill="#111" data-v-0bc4eb40></rect><path d="M30 52 l22 0 l-3 12 l-16 0 z" fill="#fff" data-v-0bc4eb40></path><path d="M30 26 q11 -7 22 0 l1 28 l-24 0 z"${ssrRenderAttr("fill", kitColor.value)} data-v-0bc4eb40></path><path d="M38 22 l7 1 l1 31 l-9 0 z"${ssrRenderAttr("fill", accent.value)} opacity="0.9" data-v-0bc4eb40></path><clipPath id="fbg-striker-shirt" data-v-0bc4eb40><path d="M30 26 q11 -7 22 0 l1 28 l-24 0 z" data-v-0bc4eb40></path></clipPath>`);
            if (strikerFlag.value) {
              _push2(`<image${ssrRenderAttr("href", strikerFlag.value)} x="29" y="24" width="24" height="33" preserveAspectRatio="xMidYMid slice" clip-path="url(#fbg-striker-shirt)" data-v-0bc4eb40></image>`);
            } else {
              _push2(`<!---->`);
            }
            _push2(`<path d="M32 30 q-12 6 -16 18" stroke="#e9b489" stroke-width="7" stroke-linecap="round" fill="none" data-v-0bc4eb40></path><path d="M50 30 q12 4 16 12" stroke="#e9b489" stroke-width="7" stroke-linecap="round" fill="none" data-v-0bc4eb40></path><circle cx="41" cy="15" r="10" fill="#e9b489" data-v-0bc4eb40></circle><path d="M31 13 q10 -11 20 0 q-10 -6 -20 0z" fill="#241608" data-v-0bc4eb40></path></g>`);
          }
          _push2(`</g><g style="${ssrRenderStyle({ transform: ballTf.value, transformBox: "view-box", transition: kicked.value ? `transform ${ballDur.value}s cubic-bezier(.2,.55,.3,1)` : "none" })}" data-v-0bc4eb40>`);
          if (netHit.value) {
            _push2(`<circle class="fbg-ball-glow" r="42"${ssrRenderAttr("fill", accent.value)} filter="url(#fbg-glow)" data-v-0bc4eb40></circle>`);
          } else {
            _push2(`<!---->`);
          }
          _push2(`<ellipse cx="0" cy="31" rx="30" ry="7" fill="#000" opacity="0.32" filter="url(#fbg-soft)" data-v-0bc4eb40></ellipse><g class="${ssrRenderClass({ "fbg-ball-arc": kicked.value })}" style="${ssrRenderStyle({ animationDuration: ballDur.value + "s" })}" data-v-0bc4eb40><g class="${ssrRenderClass({ "fbg-ball-impact": netHit.value || saved.value })}" data-v-0bc4eb40><g class="${ssrRenderClass({ spin: kicked.value })}"${ssrRenderAttr("filter", isNeon.value ? "url(#fbg-neonC)" : void 0)} data-v-0bc4eb40>`);
          if (ballImage.value) {
            _push2(`<image${ssrRenderAttr("href", ballImage.value)} x="-32" y="-32" width="64" height="64" data-v-0bc4eb40></image>`);
          } else {
            _push2(`<g data-v-0bc4eb40><circle r="32" fill="url(#fbg-ball)" stroke="#aab0bd" stroke-width="1.3" data-v-0bc4eb40></circle><path d="M0 -13 L12.4 -4 L7.6 10.5 L-7.6 10.5 L-12.4 -4 Z" fill="#1b1e25" data-v-0bc4eb40></path><g fill="#1b1e25" data-v-0bc4eb40><path d="M0 -31 L8 -24.5 L4 -16 L-4 -16 L-8 -24.5 Z" data-v-0bc4eb40></path><path d="M29.5 -9.6 L24.5 -2.5 L16 -4 L19 -12 L27 -15 Z" data-v-0bc4eb40></path><path d="M18.2 25.1 L9.5 22.5 L8 13.5 L17.5 14.5 L22 21.5 Z" data-v-0bc4eb40></path><path d="M-18.2 25.1 L-9.5 22.5 L-8 13.5 L-17.5 14.5 L-22 21.5 Z" data-v-0bc4eb40></path><path d="M-29.5 -9.6 L-24.5 -2.5 L-16 -4 L-19 -12 L-27 -15 Z" data-v-0bc4eb40></path></g><path d="M0 -13 L0 -24.5 M12.4 -4 L24 -9.6 M7.6 10.5 L14.5 21 M-7.6 10.5 L-14.5 21 M-12.4 -4 L-24 -9.6" stroke="#1b1e25" stroke-width="1.8" fill="none" opacity="0.85" data-v-0bc4eb40></path><circle r="32" fill="url(#fbg-ball-edge)" data-v-0bc4eb40></circle><ellipse cx="-11" cy="-13" rx="10" ry="6.5" fill="#fff" opacity="0.6" data-v-0bc4eb40></ellipse></g>`);
          }
          _push2(`</g></g></g></g>`);
          if (particles.value.length) {
            _push2(`<g${ssrRenderAttr("transform", `translate(${aim.value.x}, ${aim.value.y})`)} data-v-0bc4eb40><!--[-->`);
            ssrRenderList(particles.value, (p, i) => {
              _push2(`<rect class="fbg-particle" x="-3" y="-3" width="6" height="9"${ssrRenderAttr("fill", p.col)} style="${ssrRenderStyle({ "--dx": p.dx + "px", "--dy": p.dy + "px", "--rot": p.rot + "deg", animationDelay: p.delay + "s" })}" data-v-0bc4eb40></rect>`);
            });
            _push2(`<!--]--></g>`);
          } else {
            _push2(`<!---->`);
          }
          if (phase.value === "aim" || phase.value === "power") {
            _push2(`<rect x="-3000" y="-3000" width="7000" height="7000" fill="transparent" style="${ssrRenderStyle({ "cursor": "crosshair" })}" data-v-0bc4eb40></rect>`);
          } else {
            _push2(`<!---->`);
          }
          if (phase.value === "aim" && showHints.value) {
            _push2(`<g pointer-events="none" data-v-0bc4eb40><circle${ssrRenderAttr("cx", GOAL.x1 + 95)}${ssrRenderAttr("cy", GOAL.y1 + 70)} fill="none"${ssrRenderAttr("stroke", accent.value)} stroke-width="5" data-v-0bc4eb40><animate attributeName="r" values="12;44" dur="1.1s" repeatCount="indefinite" data-v-0bc4eb40></animate><animate attributeName="opacity" values="0.95;0" dur="1.1s" repeatCount="indefinite" data-v-0bc4eb40></animate></circle><circle${ssrRenderAttr("cx", GOAL.x1 + 95)}${ssrRenderAttr("cy", GOAL.y1 + 70)} r="9"${ssrRenderAttr("fill", accent.value)} opacity="0.9" data-v-0bc4eb40></circle><text${ssrRenderAttr("x", GOAL.x1 + 112)}${ssrRenderAttr("y", GOAL.y1 + 132)} font-size="52" text-anchor="middle" data-v-0bc4eb40> 👆 <animateTransform attributeName="transform" type="translate" values="0 0; 0 -14; 0 0" dur="0.9s" repeatCount="indefinite" data-v-0bc4eb40></animateTransform></text></g>`);
          } else {
            _push2(`<!---->`);
          }
          _push2(`</svg><div class="fbg-hud" data-v-0bc4eb40>PENALTY ${ssrInterpolate(Math.min(index.value + 1, total.value))}/${ssrInterpolate(total.value)} <span style="${ssrRenderStyle({ color: accent.value })}" data-v-0bc4eb40>·</span> ⚽ ${ssrInterpolate(scored.value)}</div><div class="${ssrRenderClass([{ on: flash.value }, "fbg-flash"])}" data-v-0bc4eb40></div></div>`);
          if (trackerView.value.length) {
            _push2(`<div class="fbg-tracker" data-v-0bc4eb40><div${ssrRenderAttrs({
              name: "fbg-track",
              class: "fbg-tracker-list"
            })} data-v-0bc4eb40>`);
            ssrRenderList(trackerView.value, (item) => {
              _push2(`<div class="fbg-track" data-v-0bc4eb40><span class="${ssrRenderClass([item.p.win ? "won" : "miss", "fbg-track-dot"])}" data-v-0bc4eb40>`);
              if (!item.p.win) {
                _push2(`<!--[-->✗<!--]-->`);
              } else {
                _push2(`<!---->`);
              }
              _push2(`</span>`);
              if (item.p.win) {
                _push2(`<span class="fbg-track-box" style="${ssrRenderStyle({ borderColor: accent.value, color: accent.value })}" data-v-0bc4eb40>${ssrInterpolate(trackLabel(item.p))}</span>`);
              } else {
                _push2(`<!---->`);
              }
              _push2(`</div>`);
            });
            _push2(`</div></div>`);
          } else {
            _push2(`<!---->`);
          }
          if (phase.value === "power") {
            _push2(`<div class="fbg-vmeter" data-v-0bc4eb40><span class="fbg-vmeter-label" style="${ssrRenderStyle({ color: textColor.value })}" data-v-0bc4eb40>POWER</span><div class="fbg-vmeter-bar" data-v-0bc4eb40><div class="fbg-vmeter-grad" data-v-0bc4eb40></div><div class="fbg-vmeter-marker" style="${ssrRenderStyle({ bottom: power.value + "%" })}" data-v-0bc4eb40></div></div></div>`);
          } else {
            _push2(`<!---->`);
          }
          _push2(`<div class="fbg-lower" data-v-0bc4eb40>`);
          if (showHints.value && (phase.value === "ready" || phase.value === "power")) {
            _push2(`<div class="fbg-finger" aria-hidden="true" data-v-0bc4eb40>👆</div>`);
          } else {
            _push2(`<!---->`);
          }
          if (phase.value === "ready") {
            _push2(`<button class="fbg-cta" style="${ssrRenderStyle({ background: kitColor.value, color: textColor.value })}" data-v-0bc4eb40>Step up ⚽</button>`);
          } else if (phase.value === "aim") {
            _push2(`<p class="fbg-hint" style="${ssrRenderStyle({ color: textColor.value })}" data-v-0bc4eb40>Tap the goal where you want the ball 🎯</p>`);
          } else if (phase.value === "power") {
            _push2(`<button class="fbg-cta fbg-shoot" style="${ssrRenderStyle({ background: accent.value, color: "#04231b" })}" data-v-0bc4eb40>SHOOT! 💥</button>`);
          } else if (phase.value === "shooting") {
            _push2(`<button class="fbg-cta" disabled style="${ssrRenderStyle({ color: textColor.value })}" data-v-0bc4eb40>Striking…</button>`);
          } else {
            _push2(`<!---->`);
          }
          if (phase.value === "power") {
            _push2(`<p class="fbg-subhint" style="${ssrRenderStyle({ color: textColor.value })}" data-v-0bc4eb40>Not happy? Tap the goal to re-aim</p>`);
          } else {
            _push2(`<!---->`);
          }
          if (phase.value === "ready" && total.value > 1) {
            _push2(`<button class="fbg-skip" style="${ssrRenderStyle({ color: textColor.value })}" data-v-0bc4eb40>Skip remaining</button>`);
          } else {
            _push2(`<!---->`);
          }
          _push2(`</div>`);
          if (hostEnabled.value && !showIntro.value) {
            _push2(`<div class="fbg-host" data-v-0bc4eb40>`);
            if (hostLine.value) {
              _push2(`<div class="fbg-host-bubble" data-v-0bc4eb40>${ssrInterpolate(hostLine.value)}</div>`);
            } else {
              _push2(`<!---->`);
            }
            if (hostImage.value && hostImageOk.value) {
              _push2(`<img${ssrRenderAttr("src", hostImage.value)} class="fbg-host-avatar fbg-host-img" alt="" data-v-0bc4eb40>`);
            } else {
              _push2(`<svg class="fbg-host-avatar" viewBox="0 0 64 70" aria-hidden="true" data-v-0bc4eb40><path d="M16 32 a16 16 0 0 1 32 0" fill="none" stroke="#1f2937" stroke-width="4" data-v-0bc4eb40></path><circle cx="32" cy="36" r="15" fill="#e9b489" data-v-0bc4eb40></circle><path d="M18 32 q14 -16 28 0 q-14 -7 -28 0z" fill="#3a2a18" data-v-0bc4eb40></path><rect x="13" y="31" width="7" height="12" rx="3" fill="#111827" data-v-0bc4eb40></rect><rect x="44" y="31" width="7" height="12" rx="3" fill="#111827" data-v-0bc4eb40></rect><circle cx="27" cy="36" r="1.8" fill="#1b1b1b" data-v-0bc4eb40></circle><circle cx="37" cy="36" r="1.8" fill="#1b1b1b" data-v-0bc4eb40></circle><path d="M27 42 q5 4 10 0" stroke="#1b1b1b" stroke-width="2" fill="none" stroke-linecap="round" data-v-0bc4eb40></path><path d="M17 41 q-6 9 2 18" stroke="#111827" stroke-width="3" fill="none" data-v-0bc4eb40></path><circle cx="21" cy="59" r="5"${ssrRenderAttr("fill", accent.value)} stroke="#0b1220" stroke-width="2" data-v-0bc4eb40></circle></svg>`);
            }
            _push2(`</div>`);
          } else {
            _push2(`<!---->`);
          }
          if (showIntro.value) {
            _push2(`<div class="fbg-overlay fbg-intro" data-v-0bc4eb40><div class="fbg-intro-inner" data-v-0bc4eb40>`);
            if (introTitleImage.value) {
              _push2(`<img${ssrRenderAttr("src", introTitleImage.value)} class="fbg-intro-logo" alt="" data-v-0bc4eb40>`);
            } else {
              _push2(`<div class="fbg-intro-ball" data-v-0bc4eb40>⚽</div>`);
            }
            _push2(`<h2 class="fbg-intro-title" style="${ssrRenderStyle({ color: accent.value })}" data-v-0bc4eb40>${ssrInterpolate(welcomeMsg.value)}</h2>`);
            if (introSubtitle.value) {
              _push2(`<p class="fbg-intro-sub" style="${ssrRenderStyle({ color: textColor.value })}" data-v-0bc4eb40>${ssrInterpolate(introSubtitle.value)}</p>`);
            } else {
              _push2(`<!---->`);
            }
            _push2(`<button class="fbg-cta fbg-intro-cta" style="${ssrRenderStyle({ background: kitColor.value, color: textColor.value })}" data-v-0bc4eb40>${ssrInterpolate(introButtonText.value)}</button></div></div>`);
          } else {
            _push2(`<!---->`);
          }
          if (wow.value) {
            _push2(`<div class="fbg-wow" data-v-0bc4eb40></div>`);
          } else {
            _push2(`<!---->`);
          }
          if (wow.value) {
            _push2(`<div class="fbg-goalflashes" data-v-0bc4eb40><!--[-->`);
            ssrRenderList(unref(goalFlashes), (gf, i) => {
              _push2(`<span class="fbg-goalflash" style="${ssrRenderStyle({ left: gf.x + "%", top: gf.y + "%", width: gf.size + "px", height: gf.size + "px", animationDelay: gf.delay + "s", animationDuration: gf.dur + "s" })}" data-v-0bc4eb40></span>`);
            });
            _push2(`<!--]--></div>`);
          } else {
            _push2(`<!---->`);
          }
          if (wow.value && !showPrize.value) {
            _push2(`<div class="fbg-goalshout" style="${ssrRenderStyle({ color: accent.value })}" data-v-0bc4eb40>GOAAL!!</div>`);
          } else {
            _push2(`<!---->`);
          }
          if (showPrize.value && current.value) {
            _push2(`<div class="fbg-overlay" data-v-0bc4eb40><div class="fbg-card" style="${ssrRenderStyle({ borderColor: accent.value })}" data-v-0bc4eb40><div class="fbg-goal" style="${ssrRenderStyle({ color: accent.value })}" data-v-0bc4eb40>GOAL! ⚽🔥</div><div class="fbg-visual" data-v-0bc4eb40>`);
            if (current.value.image) {
              _push2(`<img${ssrRenderAttr("src", current.value.image)} alt="prize" data-v-0bc4eb40>`);
            } else if (introTitleImage.value) {
              _push2(`<img${ssrRenderAttr("src", introTitleImage.value)} alt="logo" data-v-0bc4eb40>`);
            } else {
              _push2(`<span data-v-0bc4eb40>🏆</span>`);
            }
            _push2(`</div><div class="fbg-won" style="${ssrRenderStyle({ color: textColor.value })}" data-v-0bc4eb40>${ssrInterpolate(winText.value)}</div><div class="fbg-name" style="${ssrRenderStyle({ color: accent.value })}" data-v-0bc4eb40>${ssrInterpolate(current.value.prize)}</div>`);
            if (currentValueLabel.value) {
              _push2(`<div class="fbg-value" style="${ssrRenderStyle({ color: textColor.value })}" data-v-0bc4eb40>${ssrInterpolate(currentValueLabel.value)}</div>`);
            } else {
              _push2(`<!---->`);
            }
            _push2(`<button class="fbg-cta" style="${ssrRenderStyle({ background: kitColor.value, color: textColor.value })}" data-v-0bc4eb40>${ssrInterpolate(index.value < total.value - 1 ? "Next penalty →" : "Collect 🎉")}</button></div></div>`);
          } else {
            _push2(`<!---->`);
          }
          if (phase.value === "done") {
            _push2(`<div class="fbg-overlay" data-v-0bc4eb40><div class="fbg-card" style="${ssrRenderStyle({ borderColor: accent.value })}" data-v-0bc4eb40><div class="fbg-goal" style="${ssrRenderStyle({ color: accent.value })}" data-v-0bc4eb40>Full time! ⚽</div><div class="fbg-won" style="${ssrRenderStyle({ color: textColor.value })}" data-v-0bc4eb40>You scored ${ssrInterpolate(scored.value)} of ${ssrInterpolate(total.value)}</div>`);
            if (totalWon.value) {
              _push2(`<div class="fbg-fulltotal" style="${ssrRenderStyle({ color: accent.value })}" data-v-0bc4eb40>Total won: £${ssrInterpolate(totalWon.value % 1 === 0 ? totalWon.value : totalWon.value.toFixed(2))}</div>`);
            } else {
              _push2(`<!---->`);
            }
            _push2(`<div class="fbg-scorecard" data-v-0bc4eb40><!--[-->`);
            ssrRenderList(pens.value, (p, i) => {
              _push2(`<span class="${ssrRenderClass([p.win ? "goal" : "miss", "fbg-scoredot"])}" style="${ssrRenderStyle(p.win ? { background: accent.value, color: "#04231b", borderColor: accent.value } : {})}" data-v-0bc4eb40>${ssrInterpolate(p.win ? "⚽" : "✗")}</span>`);
            });
            _push2(`<!--]--></div><ul class="fbg-history" data-v-0bc4eb40><!--[-->`);
            ssrRenderList(pens.value, (p, i) => {
              _push2(`<li class="${ssrRenderClass(p.win ? "win" : "miss")}" data-v-0bc4eb40><span class="fbg-hist-n" data-v-0bc4eb40>${ssrInterpolate(i + 1)}</span>`);
              if (p.win) {
                _push2(`<span class="fbg-hist-res" data-v-0bc4eb40><b style="${ssrRenderStyle({ color: accent.value })}" data-v-0bc4eb40>GOAL</b> · ${ssrInterpolate(p.prize)}`);
                if (p.isBundle && p.value && !/ticket/i.test(p.prize)) {
                  _push2(`<span data-v-0bc4eb40> (${ssrInterpolate(Math.floor(p.value))} Free Ticket${ssrInterpolate(p.value == 1 ? "" : "s")})</span>`);
                } else if (p.value && !p.isBundle) {
                  _push2(`<span data-v-0bc4eb40> · £${ssrInterpolate(p.value)}</span>`);
                } else {
                  _push2(`<!---->`);
                }
                _push2(`</span>`);
              } else {
                _push2(`<span class="fbg-hist-res fbg-hist-miss" data-v-0bc4eb40>Saved — no win</span>`);
              }
              _push2(`</li>`);
            });
            _push2(`<!--]--></ul><button class="fbg-cta" style="${ssrRenderStyle({ background: kitColor.value, color: textColor.value })}" data-v-0bc4eb40>Close</button></div></div>`);
          } else {
            _push2(`<!---->`);
          }
          _push2(`</div></div></div>`);
          if (__props.demoMode) {
            _push2(`<div class="fbg-demo-info" data-v-0bc4eb40>${ssrInterpolate(actualPreviewMode.value === "mobile" ? "📱 Mobile Preview (420×650)" : "💻 Desktop Preview (700×650)")}</div>`);
          } else {
            _push2(`<!---->`);
          }
          _push2(`</div>`);
        } else {
          _push2(`<!---->`);
        }
      }, "body", __props.demoMode, _parent);
    };
  }
});
const _sfc_setup = _sfc_main.setup;
_sfc_main.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("resources/js/Components/Games/FootballModal.vue");
  return _sfc_setup ? _sfc_setup(props, ctx) : void 0;
};
const FootballModal = /* @__PURE__ */ _export_sfc(_sfc_main, [["__scopeId", "data-v-0bc4eb40"]]);
export {
  FootballModal as default
};
