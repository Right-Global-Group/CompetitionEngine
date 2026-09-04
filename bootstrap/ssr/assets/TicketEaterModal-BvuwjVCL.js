import { defineComponent, computed, ref, watch, reactive, onBeforeUnmount, useSSRContext } from "vue";
import { ssrRenderTeleport, ssrRenderClass, ssrRenderStyle, ssrInterpolate, ssrRenderAttr, ssrRenderList } from "vue/server-renderer";
import { g as gsapWithCSS, _ as _export_sfc } from "../ssr.js";
import "@inertiajs/vue3";
import "three";
import "axios";
import "@inertiajs/vue3/server";
const BAND_START = 1380;
const RISER_DUR = 1.8, RISER_COUNT = 3;
const _sfc_main = /* @__PURE__ */ defineComponent({
  __name: "TicketEaterModal",
  __ssrInlineRender: true,
  props: {
    modelValue: { type: Boolean, default: false },
    demoMode: { type: Boolean, default: false },
    previewMode: { default: "desktop" },
    assets: { default: () => ({}) },
    tickets: { default: () => [] },
    instant_win_categories: { default: () => [] }
  },
  emits: ["update:modelValue", "wins-collected"],
  setup(__props, { emit: __emit }) {
    const props = __props;
    const emit = __emit;
    const a = computed(() => props.assets || {});
    const demoPreviewMode = ref("mobile");
    const actualPreviewMode = computed(() => props.demoMode ? demoPreviewMode.value : props.previewMode || "desktop");
    const frameClass = computed(() => props.demoMode ? actualPreviewMode.value === "mobile" ? "is-mobile" : "is-desktop" : "");
    const CORE = { x: 0, y: 0, w: 1e3, h: 1400 };
    const CORE_CX = CORE.x + CORE.w / 2;
    const stageEl = ref(null);
    const stageAspect = ref(CORE.w / CORE.h);
    let stageRO = null;
    watch(stageEl, (el) => {
      stageRO == null ? void 0 : stageRO.disconnect();
      if (el && typeof ResizeObserver !== "undefined") {
        stageRO = new ResizeObserver((entries) => {
          var _a;
          const r = (_a = entries[0]) == null ? void 0 : _a.contentRect;
          if (r && r.width > 0 && r.height > 0) stageAspect.value = r.width / r.height;
        });
        stageRO.observe(el);
      }
    }, { flush: "post" });
    const view = computed(() => {
      const ar = stageAspect.value;
      const coreAspect = CORE.w / CORE.h;
      if (ar >= coreAspect) {
        const h2 = CORE.h, w2 = h2 * ar;
        return { x: CORE_CX - w2 / 2, y: CORE.y, w: w2, h: h2 };
      }
      const w = CORE.w, h = w / ar;
      return { x: CORE.x, y: CORE.y, w, h };
    });
    const sceneViewBox = computed(() => `${view.value.x} ${view.value.y} ${view.value.w} ${view.value.h}`);
    const bg = computed(() => {
      const v = view.value;
      return { x: v.x - 200, w: v.w + 400, top: v.y - 100, bottom: v.y + v.h + 200, floor: v.y + v.h };
    });
    const titleText = computed(() => a.value.titleText || "Feed the Eater!");
    const accent = computed(() => a.value.accentColor || "#ffd54f");
    const primary = computed(() => a.value.primaryColor || "#6c5ce7");
    const textColor = computed(() => a.value.textColor || "#ffffff");
    const showTopPrize = computed(() => a.value.showTopPrize === true);
    const gameName = computed(() => a.value.name || "");
    const ticketImage = computed(() => a.value.ticketImage || "");
    const risingTicketImage = computed(() => a.value.risingTicketImage || "");
    const backgroundImage = computed(() => a.value.backgroundImage || "");
    const prizeImage = computed(() => a.value.prizeImage || "");
    const titleImage = computed(() => a.value.introTitleImage || "");
    computed(() => a.value.mascotImage || "");
    const introEnabled = computed(() => a.value.introEnabled !== false);
    const introSubtitle = computed(() => a.value.introSubtitle || "Roll through your tickets to reveal instant prizes");
    const introButtonText = computed(() => a.value.introButtonText || "Start 👹");
    const welcomeMsg = computed(() => (a.value.introWelcomeText || "Welcome to {name}").replace("{name}", gameName.value || "the game"));
    const showIntro = ref(false);
    const introPhase = ref("splash");
    ref(null);
    ref(null);
    const THEMES = {
      arcade: { bgTop: "#1b1040", bgBot: "#2a1a52", ticket: "#fff8e6", edge: "#c79a1f", num: "#241026", glow: "#ffd54f" },
      cave: { bgTop: "#1c2a2e", bgBot: "#0c1719", ticket: "#eafff5", edge: "#3f9c78", num: "#0c2a1c", glow: "#8effc8" },
      candy: { bgTop: "#ff9ec4", bgBot: "#ffcfe3", ticket: "#ffffff", edge: "#cf4d83", num: "#5e1638", glow: "#fff36b" },
      spooky: { bgTop: "#14121f", bgBot: "#241f38", ticket: "#f0ffe6", edge: "#5a9c33", num: "#14121f", glow: "#9dff5c" }
    };
    const pal = computed(() => THEMES[String(a.value.theme || "arcade")] || THEMES.arcade);
    const numberColor = computed(() => a.value.numberColor || pal.value.num);
    const casts = ref([]);
    function isWin(t) {
      const iw = t == null ? void 0 : t.instant_win;
      return !!(iw && (iw.prize || Number(iw.value) > 0 || iw.image_path || iw.category_id != null));
    }
    function categoryFor(iw) {
      const cats = props.instant_win_categories || [];
      if (!iw) return null;
      return (iw.category_id != null ? cats.find((c) => c.id === iw.category_id) : null) || cats.find((c) => c.name && (c.name === iw.prize || c.name === iw.name)) || null;
    }
    function buildCasts() {
      if (props.demoMode) {
        const cats = props.instant_win_categories || [];
        const n = 200;
        const winPos = /* @__PURE__ */ new Set([9, 19, 29]);
        casts.value = Array.from({ length: n }, (_, i) => {
          const won = winPos.has(i) && cats.length > 0;
          const cat = won ? cats[i % cats.length] : null;
          return {
            id: i + 1,
            number: String(1 + Math.floor(Math.random() * 15e4)),
            win: !!won,
            // random, shuffled — like real tickets
            prize: won ? String(cat.name) : "",
            value: won ? Number(cat.value || 0) : 0,
            image: won ? cat.image_path || "" : "",
            isBundle: false
          };
        });
        resetRun();
        return;
      }
      casts.value = (props.tickets || []).map((t) => {
        const iw = t == null ? void 0 : t.instant_win;
        const won = isWin(t);
        const cat = won ? categoryFor(iw) : null;
        return {
          id: t.id ?? t.number,
          number: String(t.number ?? t.id ?? ""),
          win: won,
          prize: won ? String(iw.prize) : "",
          value: Number((iw == null ? void 0 : iw.value) || (cat == null ? void 0 : cat.value) || 0),
          image: (iw == null ? void 0 : iw.image_path) || (cat == null ? void 0 : cat.image_path) || "",
          isBundle: won && ((iw == null ? void 0 : iw.prize_type) ?? (cat == null ? void 0 : cat.prize_type)) === "ticket_bundle"
        };
      });
      resetRun();
    }
    const total = computed(() => casts.value.length);
    const wins = computed(() => casts.value.filter((c) => c.win));
    const mode = ref("auto");
    const speed = ref(1);
    const topPrize = computed(() => {
      const list = (props.instant_win_categories || []).filter((c) => c && Number(c.value) > 0 && (c.available === void 0 || c.available > 0));
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
      if (p.prize_type === "ticket_bundle") return !v || /ticket/i.test(name) ? name : `${name ? name + " · " : ""}${Math.floor(v)} Free Ticket${v == 1 ? "" : "s"}`;
      const money = v ? `£${v % 1 === 0 ? v : v.toFixed(2)}` : "";
      return !money || /£\s*\d/.test(name) ? name : `${name} · ${money}`;
    });
    const TICKET = { x: 500, y: 470 };
    const scene = reactive({ winFlash: 0, heat: 0, readerY: 0, releaseY: 0, releaseO: 0, prizeX: TICKET.x, prizeY: 540, prizeO: 0, prizeScale: 0, prizeRot: 0 });
    const releaseIdx = ref(0);
    const showReaderNum = ref(true);
    const readerFlash = ref(false);
    const band = ref([]);
    let bandSeq = 0;
    const bandTweens = /* @__PURE__ */ new Map();
    let pendingBandTicket = null;
    function pauseBand() {
      bandTweens.forEach((tw) => tw.pause());
    }
    function resumeBand() {
      bandTweens.forEach((tw) => tw.resume());
    }
    function killBand() {
      bandTweens.forEach((tw) => tw.kill());
      bandTweens.clear();
      pendingBandTicket = null;
      band.value.forEach((t) => gsapWithCSS.killTweensOf(t));
      band.value = [];
    }
    let autoTimer = null;
    let autoRiseDur = 0.8;
    function stopAuto() {
      if (autoTimer) {
        clearInterval(autoTimer);
        autoTimer = null;
      }
    }
    function spawnRise(i, startY, dur) {
      const c = casts.value[i];
      const t = reactive({ key: bandSeq++, idx: i, y: startY, o: 1 });
      band.value.push(t);
      const tw = gsapWithCSS.to(t, { y: TICKET.y, duration: dur, ease: "none", onComplete: () => bandArrive(t, c, i) });
      bandTweens.set(t.key, tw);
    }
    function autoTick() {
      if (reveal.on) return;
      if (releaseIdx.value >= total.value) {
        stopAuto();
        maybeFinish();
        return;
      }
      spawnRise(releaseIdx.value++, BAND_START, autoRiseDur);
    }
    const phase = ref("ready");
    const hud = reactive({ eaten: 0 });
    const collected = ref([]);
    const dropPrize = ref(null);
    const eatenDisplay = computed(() => Math.min(total.value, Math.round(hud.eaten)));
    const titleGlow = computed(() => Math.min(70, 8 + collected.value.length * 9));
    const titleWiggleDur = computed(() => Math.max(1.3, 3 - collected.value.length * 0.28));
    const mascotSrc = computed(() => {
      const n = collected.value.length;
      const f1 = a.value.mascotImage || "";
      const f2 = a.value.mascotImage2 || f1;
      const f3 = a.value.mascotImage3 || f2;
      return n >= 3 ? f3 : n >= 1 ? f2 : f1;
    });
    const streamBase = ref(0);
    const rollIdx = computed(() => {
      const n = casts.value.length;
      return n ? Math.min(n - 1, streamBase.value) : 0;
    });
    const rollNumber = computed(() => {
      var _a;
      return casts.value.length ? ((_a = casts.value[rollIdx.value]) == null ? void 0 : _a.number) ?? "—" : "—";
    });
    const rollIsWin = computed(() => {
      var _a;
      return casts.value.length ? !!((_a = casts.value[rollIdx.value]) == null ? void 0 : _a.win) : false;
    });
    computed(() => Array.from({ length: RISER_COUNT }, (_, i) => ({ id: i, delay: (-(i * RISER_DUR / RISER_COUNT / speed.value)).toFixed(2) + "s", dur: (RISER_DUR / speed.value).toFixed(2) + "s" })));
    const POUCH = { x: 838, y: 1118 };
    const pouchImage = computed(() => a.value.pouchImage || "");
    const pouchPulse = ref(0);
    const showPouch = ref(false);
    function valueLabel(c) {
      if (!c || !c.value) return "";
      const v = Number(c.value);
      if (c.isBundle) return /ticket/i.test(String(c.prize || "")) ? "" : `${Math.floor(v)} Free Ticket${v == 1 ? "" : "s"}`;
      return `£${v % 1 === 0 ? v : v.toFixed(2)}`;
    }
    const reveal = reactive({ on: false, flipped: false, collectable: false, collecting: false });
    let pendingWin = -1;
    let revealTimers = [];
    function clearReveal() {
      revealTimers.forEach((t) => clearTimeout(t));
      revealTimers = [];
    }
    function openReveal(wi) {
      pendingWin = wi;
      dropPrize.value = casts.value[wi] ?? null;
      reveal.on = true;
      reveal.flipped = false;
      reveal.collectable = false;
      reveal.collecting = false;
      play(a.value.winSound);
      revealTimers.push(setTimeout(() => {
        reveal.flipped = true;
      }, 650));
      revealTimers.push(setTimeout(() => {
        reveal.collectable = true;
      }, 1850));
      if (props.demoMode) revealTimers.push(setTimeout(() => {
        if (reveal.collectable) collect();
      }, 6e3));
    }
    function collect() {
      if (!reveal.collectable) return;
      clearReveal();
      reveal.collectable = false;
      reveal.collecting = true;
      play(a.value.collectSound || a.value.winSound);
      revealTimers.push(setTimeout(() => {
        if (dropPrize.value) collected.value.push(dropPrize.value);
        pouchPulse.value++;
        reveal.on = false;
        reveal.collecting = false;
        scene.heat = 0;
        hud.eaten = pendingWin + 1;
        resumeBand();
        const bt = pendingBandTicket;
        pendingBandTicket = null;
        if (bt) gsapWithCSS.to(bt, { y: TICKET.y - 70, o: 0, duration: 0.5, ease: "power1.in", onComplete: () => {
          bandTweens.delete(bt.key);
          band.value = band.value.filter((x) => x.key !== bt.key);
          maybeFinish();
        } });
        else maybeFinish();
      }, 520));
    }
    function resetRun() {
      clearReveal();
      reveal.on = false;
      reveal.flipped = false;
      reveal.collectable = false;
      reveal.collecting = false;
      stopAuto();
      gsapWithCSS.killTweensOf(scene);
      gsapWithCSS.killTweensOf(hud);
      killBand();
      hud.eaten = 0;
      streamBase.value = 0;
      collected.value = [];
      dropPrize.value = null;
      releaseIdx.value = 0;
      readerFlash.value = false;
      showReaderNum.value = true;
      Object.assign(scene, { winFlash: 0, heat: 0, readerY: 0, prizeX: TICKET.x, prizeY: 540, prizeO: 0, prizeScale: 0, prizeRot: 0 });
      confetti.value = [];
      phase.value = "ready";
    }
    const confetti = ref([]);
    function startRun() {
      if (phase.value === "feasting") return;
      if (!casts.value.length) {
        finishRun();
        return;
      }
      resetRun();
      phase.value = "feasting";
      play(a.value.feedSound);
      const n = total.value;
      const runMs = 2e4 / speed.value;
      const interval = Math.min(420, Math.max(16, runMs / n));
      autoRiseDur = Math.min(1.2, Math.max(0.4, interval * 9 / 1e3));
      stopAuto();
      autoTimer = setInterval(autoTick, interval);
    }
    function finishRun() {
      stopAuto();
      clearReveal();
      reveal.on = false;
      gsapWithCSS.killTweensOf(scene);
      killBand();
      hud.eaten = total.value;
      scene.winFlash = 0;
      phase.value = "done";
      emit("wins-collected", wins.value.map((w) => ({ prize: w.prize, value: w.value })));
    }
    function bandArrive(t, c, i) {
      streamBase.value = i;
      showReaderNum.value = true;
      hud.eaten = Math.max(hud.eaten, i + 1);
      if (c.win) {
        pauseBand();
        pendingBandTicket = t;
        openReveal(i);
        return;
      }
      readerFlash.value = false;
      play(a.value.gulpSound);
      gsapWithCSS.to(t, { y: TICKET.y - 70, o: 0, duration: 0.5, delay: 0.55, ease: "power1.in", onComplete: () => {
        bandTweens.delete(t.key);
        band.value = band.value.filter((x) => x.key !== t.key);
        maybeFinish();
      } });
    }
    function maybeFinish() {
      if (releaseIdx.value >= total.value && band.value.length === 0) {
        stopAuto();
        finishRun();
      }
    }
    const canTap = computed(() => phase.value === "done" ? false : mode.value === "manual" ? releaseIdx.value < total.value && !reveal.on : phase.value === "ready");
    const prompt = computed(() => phase.value === "ready" ? titleText.value : phase.value === "feasting" ? rollIsWin.value ? "WINNER!" : "Rolling…" : "");
    let audio = null;
    function play(src) {
      if (!src) return;
      try {
        audio = new Audio(src);
        audio.volume = 0.85;
        void audio.play();
      } catch {
      }
    }
    function playWelcome() {
      if (a.value.welcomeSound) play(a.value.welcomeSound);
    }
    function cancelSpeech() {
      var _a;
      try {
        (_a = window.speechSynthesis) == null ? void 0 : _a.cancel();
      } catch {
      }
    }
    let demoTimer = null;
    function clearDemo() {
      if (demoTimer) {
        clearTimeout(demoTimer);
        demoTimer = null;
      }
    }
    let introSeq = null;
    function clearIntroSeq() {
      if (introSeq) {
        clearTimeout(introSeq);
        introSeq = null;
      }
    }
    function startGame() {
      clearDemo();
      showIntro.value = false;
      if (mode.value === "auto") startRun();
      else {
        resetRun();
        showReaderNum.value = false;
      }
    }
    watch(() => props.tickets, buildCasts, { immediate: true, deep: true });
    watch(() => props.modelValue, (open) => {
      if (open) {
        clearDemo();
        buildCasts();
        showIntro.value = introEnabled.value;
        if (showIntro.value) playWelcome();
        if (props.demoMode && !introEnabled.value) demoTimer = setTimeout(() => startGame(), 600);
      } else {
        gsapWithCSS.killTweensOf(scene);
        gsapWithCSS.killTweensOf(hud);
        clearDemo();
        cancelSpeech();
      }
    }, { immediate: true });
    watch(phase, (p) => {
      if (props.demoMode && p === "done") {
        clearDemo();
        demoTimer = setTimeout(() => {
          buildCasts();
          if (introEnabled.value) showIntro.value = true;
          else startGame();
        }, 1800);
      }
    });
    watch(showIntro, (on) => {
      clearIntroSeq();
      if (!on) return;
      introPhase.value = "splash";
      introSeq = setTimeout(() => {
        introPhase.value = "settings";
      }, 2600);
    }, { immediate: true });
    watch(introEnabled, (on) => {
      if (props.demoMode) showIntro.value = on;
    });
    onBeforeUnmount(() => {
      clearReveal();
      clearIntroSeq();
      gsapWithCSS.killTweensOf(scene);
      gsapWithCSS.killTweensOf(hud);
      clearDemo();
      cancelSpeech();
      stageRO == null ? void 0 : stageRO.disconnect();
    });
    return (_ctx, _push, _parent, _attrs) => {
      ssrRenderTeleport(_push, (_push2) => {
        var _a;
        if (__props.modelValue || __props.demoMode) {
          _push2(`<div class="${ssrRenderClass([frameClass.value, "te-root"])}" data-v-3643a4e2><div class="te-frame" style="${ssrRenderStyle({ background: pal.value.bgBot })}" data-v-3643a4e2>`);
          if (__props.demoMode) {
            _push2(`<div class="te-preview-toggle" data-v-3643a4e2><span data-v-3643a4e2>Preview:</span><button class="${ssrRenderClass({ on: actualPreviewMode.value === "mobile" })}" data-v-3643a4e2>Mobile</button><button class="${ssrRenderClass({ on: actualPreviewMode.value === "desktop" })}" data-v-3643a4e2>Desktop</button></div>`);
          } else {
            _push2(`<!---->`);
          }
          if (!__props.demoMode) {
            _push2(`<button class="te-close" aria-label="Close" data-v-3643a4e2>✕</button>`);
          } else {
            _push2(`<!---->`);
          }
          _push2(`<div class="te-hud" data-v-3643a4e2><div class="te-hud-left" data-v-3643a4e2>🎟️ ${ssrInterpolate(eatenDisplay.value)}/${ssrInterpolate(total.value)} · 🏆 ${ssrInterpolate(collected.value.length)}</div><div class="te-hud-title" style="${ssrRenderStyle({ color: textColor.value })}" data-v-3643a4e2>${ssrInterpolate(gameName.value || "Ticket Eater")}</div></div>`);
          if (showTopPrize.value && topPrizeLabel.value) {
            _push2(`<div class="te-topprize" style="${ssrRenderStyle({ borderColor: accent.value })}" data-v-3643a4e2><span class="te-topprize-pill" style="${ssrRenderStyle({ background: accent.value })}" data-v-3643a4e2>£</span><span class="te-topprize-val" data-v-3643a4e2><b style="${ssrRenderStyle({ color: accent.value })}" data-v-3643a4e2>TOP PRIZE</b> ${ssrInterpolate(topPrizeLabel.value)}</span></div>`);
          } else {
            _push2(`<!---->`);
          }
          _push2(`<div class="te-stage" data-v-3643a4e2><svg class="te-svg"${ssrRenderAttr("viewBox", sceneViewBox.value)} preserveAspectRatio="xMidYMid slice" data-v-3643a4e2><defs data-v-3643a4e2><linearGradient id="te-bg" x1="0" y1="0" x2="0" y2="1" data-v-3643a4e2><stop offset="0%"${ssrRenderAttr("stop-color", pal.value.bgTop)} data-v-3643a4e2></stop><stop offset="100%"${ssrRenderAttr("stop-color", pal.value.bgBot)} data-v-3643a4e2></stop></linearGradient><radialGradient id="te-glow" cx="50%" cy="50%" r="50%" data-v-3643a4e2><stop offset="0%"${ssrRenderAttr("stop-color", pal.value.glow)} stop-opacity="0.9" data-v-3643a4e2></stop><stop offset="100%"${ssrRenderAttr("stop-color", pal.value.glow)} stop-opacity="0" data-v-3643a4e2></stop></radialGradient><radialGradient id="te-vig" cx="50%" cy="42%" r="80%" data-v-3643a4e2><stop offset="62%" stop-color="#000" stop-opacity="0" data-v-3643a4e2></stop><stop offset="100%" stop-color="#000" stop-opacity="0.42" data-v-3643a4e2></stop></radialGradient><radialGradient id="te-treasure" cx="50%" cy="50%" r="50%" data-v-3643a4e2><stop offset="0%"${ssrRenderAttr("stop-color", accent.value)} stop-opacity="0.85" data-v-3643a4e2></stop><stop offset="100%"${ssrRenderAttr("stop-color", accent.value)} stop-opacity="0" data-v-3643a4e2></stop></radialGradient></defs><rect${ssrRenderAttr("x", bg.value.x)}${ssrRenderAttr("y", bg.value.top)}${ssrRenderAttr("width", bg.value.w)}${ssrRenderAttr("height", bg.value.bottom - bg.value.top)} fill="url(#te-bg)" data-v-3643a4e2></rect>`);
          if (backgroundImage.value) {
            _push2(`<image${ssrRenderAttr("href", backgroundImage.value)}${ssrRenderAttr("x", bg.value.x)}${ssrRenderAttr("y", bg.value.top)}${ssrRenderAttr("width", bg.value.w)}${ssrRenderAttr("height", bg.value.bottom - bg.value.top)} preserveAspectRatio="xMidYMid slice" opacity="0.9" data-v-3643a4e2></image>`);
          } else {
            _push2(`<!---->`);
          }
          if (titleImage.value) {
            _push2(`<foreignObject x="290" y="62" width="420" height="150" data-v-3643a4e2><img${ssrRenderAttr("src", titleImage.value)} style="${ssrRenderStyle({ "width": "100%", "height": "100%", "object-fit": "contain" })}" alt="" data-v-3643a4e2></foreignObject>`);
          } else {
            _push2(`<!---->`);
          }
          if (mascotSrc.value) {
            _push2(`<foreignObject x="210" y="214" width="580" height="260" style="${ssrRenderStyle({ "overflow": "visible" })}" data-v-3643a4e2><img${ssrRenderAttr("src", mascotSrc.value)} class="${ssrRenderClass([{ "te-glowing": collected.value.length > 0 }, "te-gametitle"])}" style="${ssrRenderStyle({ width: "100%", height: "100%", objectFit: "contain", objectPosition: "center bottom", "--gw": titleGlow.value + "px", "--tglow": accent.value, "--wdur": titleWiggleDur.value + "s" })}" alt="" data-v-3643a4e2></foreignObject>`);
          } else {
            _push2(`<!---->`);
          }
          _push2(`<circle${ssrRenderAttr("cx", TICKET.x)}${ssrRenderAttr("cy", TICKET.y)} r="320" fill="url(#te-glow)" opacity="0.12" data-v-3643a4e2></circle><!--[-->`);
          ssrRenderList(band.value, (t) => {
            _push2(`<g${ssrRenderAttr("transform", `translate(${TICKET.x} ${t.y})`)}${ssrRenderAttr("opacity", t.o)} data-v-3643a4e2>`);
            if (risingTicketImage.value) {
              _push2(`<image${ssrRenderAttr("href", risingTicketImage.value)} x="-88" y="-44" width="176" height="88" preserveAspectRatio="xMidYMid meet" transform="rotate(90)" data-v-3643a4e2></image>`);
            } else {
              _push2(`<!--[--><rect x="-44" y="-88" width="88" height="176" rx="11"${ssrRenderAttr("fill", pal.value.ticket)}${ssrRenderAttr("stroke", pal.value.edge)} stroke-width="3.5" data-v-3643a4e2></rect><rect x="-34" y="-78" width="68" height="156" rx="7" fill="none"${ssrRenderAttr("stroke", pal.value.edge)} stroke-width="2" stroke-dasharray="2 9" opacity="0.4" data-v-3643a4e2></rect><circle cx="-44" cy="0" r="9"${ssrRenderAttr("fill", pal.value.bgBot)} data-v-3643a4e2></circle><circle cx="44" cy="0" r="9"${ssrRenderAttr("fill", pal.value.bgBot)} data-v-3643a4e2></circle><!--]-->`);
            }
            _push2(`</g>`);
          });
          _push2(`<!--]--><g${ssrRenderAttr("transform", `translate(${TICKET.x} ${TICKET.y}) scale(0.84)`)} data-v-3643a4e2>`);
          if (ticketImage.value) {
            _push2(`<foreignObject x="-240" y="-150" width="480" height="300" data-v-3643a4e2><img${ssrRenderAttr("src", ticketImage.value)} style="${ssrRenderStyle({ "width": "100%", "height": "100%", "object-fit": "contain" })}" alt="" data-v-3643a4e2></foreignObject>`);
          } else {
            _push2(`<!--[--><rect x="-240" y="-150" width="480" height="300" rx="30"${ssrRenderAttr("fill", pal.value.ticket)}${ssrRenderAttr("stroke", rollIsWin.value ? accent.value : pal.value.edge)}${ssrRenderAttr("stroke-width", rollIsWin.value ? 11 : 6)} data-v-3643a4e2></rect><rect x="-208" y="-118" width="416" height="236" rx="20" fill="none"${ssrRenderAttr("stroke", pal.value.edge)} stroke-width="2.5" stroke-dasharray="2 13" opacity="0.4" data-v-3643a4e2></rect><circle cx="-240" cy="0" r="28"${ssrRenderAttr("fill", pal.value.bgBot)} data-v-3643a4e2></circle><circle cx="240" cy="0" r="28"${ssrRenderAttr("fill", pal.value.bgBot)} data-v-3643a4e2></circle><!--]-->`);
          }
          if (!ticketImage.value) {
            _push2(`<text x="0" y="-78" text-anchor="middle" font-size="26" font-weight="900"${ssrRenderAttr("fill", pal.value.edge)} font-family="system-ui, sans-serif" style="${ssrRenderStyle({ "letter-spacing": "9px" })}" data-v-3643a4e2>★ TICKET ★</text>`);
          } else {
            _push2(`<!---->`);
          }
          if (showReaderNum.value) {
            _push2(`<text x="0" y="24" text-anchor="middle" font-size="46" font-weight="900"${ssrRenderAttr("fill", rollIsWin.value ? accent.value : numberColor.value)} font-family="ui-monospace, monospace" style="${ssrRenderStyle({ "letter-spacing": "-1px" })}" data-v-3643a4e2>${ssrInterpolate(rollNumber.value)}</text>`);
          } else {
            _push2(`<!---->`);
          }
          if (showReaderNum.value && rollIsWin.value && (phase.value === "feasting" || readerFlash.value)) {
            _push2(`<text x="0" y="118" text-anchor="middle" font-size="30" font-weight="900"${ssrRenderAttr("fill", accent.value)} font-family="system-ui, sans-serif" style="${ssrRenderStyle({ "letter-spacing": "3px" })}" data-v-3643a4e2>WINNER!</text>`);
          } else {
            _push2(`<!---->`);
          }
          if (showReaderNum.value && !rollIsWin.value && (phase.value === "feasting" || mode.value === "manual" && hud.eaten > 0)) {
            _push2(`<text x="0" y="116" text-anchor="middle" font-size="25" font-weight="800" fill="#9aa0ad" font-family="system-ui, sans-serif" style="${ssrRenderStyle({ "letter-spacing": "3px" })}" data-v-3643a4e2>No win</text>`);
          } else {
            _push2(`<!---->`);
          }
          _push2(`</g><!--[-->`);
          ssrRenderList(confetti.value, (p) => {
            _push2(`<rect${ssrRenderAttr("x", p.x)}${ssrRenderAttr("y", p.y)}${ssrRenderAttr("width", p.w)}${ssrRenderAttr("height", p.h)} rx="2"${ssrRenderAttr("fill", p.color)}${ssrRenderAttr("opacity", p.o)}${ssrRenderAttr("transform", `rotate(${p.rot} ${p.x + p.w / 2} ${p.y + p.h / 2})`)} data-v-3643a4e2></rect>`);
          });
          _push2(`<!--]-->`);
          if (collected.value.length) {
            _push2(`<g${ssrRenderAttr("transform", `translate(${POUCH.x} ${POUCH.y})`)} style="${ssrRenderStyle({ "cursor": "pointer" })}" data-v-3643a4e2>`);
            if (collected.value.length) {
              _push2(`<circle cx="0" cy="6" r="210" fill="url(#te-glow)" class="te-pouch-glow" data-v-3643a4e2></circle>`);
            } else {
              _push2(`<!---->`);
            }
            if (collected.value.length) {
              _push2(`<g class="te-pouch-spark"${ssrRenderAttr("fill", accent.value)} data-v-3643a4e2><circle cx="-104" cy="-72" r="6" style="${ssrRenderStyle({ animationDelay: "0s" })}" data-v-3643a4e2></circle><circle cx="110" cy="-48" r="7" style="${ssrRenderStyle({ animationDelay: "-0.4s" })}" data-v-3643a4e2></circle><circle cx="84" cy="-112" r="5" style="${ssrRenderStyle({ animationDelay: "-0.8s" })}" data-v-3643a4e2></circle><circle cx="-84" cy="-118" r="6" style="${ssrRenderStyle({ animationDelay: "-0.6s" })}" data-v-3643a4e2></circle></g>`);
            } else {
              _push2(`<!---->`);
            }
            _push2(`<g class="te-pouch-shake" data-v-3643a4e2><circle cx="0" cy="8" r="138" fill="url(#te-treasure)" class="te-crate-shine" data-v-3643a4e2></circle><ellipse cx="0" cy="120" rx="88" ry="15" fill="#000" opacity="0.3" data-v-3643a4e2></ellipse>`);
            if (pouchImage.value) {
              _push2(`<foreignObject x="-124" y="-124" width="248" height="248" style="${ssrRenderStyle({ "overflow": "visible" })}" data-v-3643a4e2><img${ssrRenderAttr("src", pouchImage.value)} class="te-pouch-img3d" style="${ssrRenderStyle({ width: "100%", height: "100%", objectFit: "contain", "--pg": accent.value })}" alt="" data-v-3643a4e2></foreignObject>`);
            } else {
              _push2(`<g transform="scale(1.36)" data-v-3643a4e2><g transform="translate(0 -30) rotate(-13)" data-v-3643a4e2><rect x="-76" y="-34" width="152" height="42" rx="11" fill="#6f4626" stroke="#3c2410" stroke-width="4" data-v-3643a4e2></rect><rect x="-76" y="-34" width="152" height="15" rx="7" fill="#8c5c30" data-v-3643a4e2></rect><rect x="-7" y="-34" width="14" height="42" fill="#caa23f" opacity="0.9" data-v-3643a4e2></rect></g><g class="te-crate-gold" data-v-3643a4e2><ellipse cx="0" cy="-10" rx="64" ry="22"${ssrRenderAttr("fill", accent.value)} data-v-3643a4e2></ellipse><circle cx="-38" cy="-14" r="12"${ssrRenderAttr("fill", accent.value)} data-v-3643a4e2></circle><circle cx="-12" cy="-20" r="13"${ssrRenderAttr("fill", accent.value)} data-v-3643a4e2></circle><circle cx="18" cy="-16" r="12"${ssrRenderAttr("fill", accent.value)} data-v-3643a4e2></circle><circle cx="44" cy="-10" r="10"${ssrRenderAttr("fill", accent.value)} data-v-3643a4e2></circle><circle cx="-12" cy="-22" r="4" fill="#fff" opacity="0.75" data-v-3643a4e2></circle><circle cx="18" cy="-18" r="3.5" fill="#fff" opacity="0.7" data-v-3643a4e2></circle></g><rect x="-78" y="-6" width="156" height="74" rx="13" fill="#6f4626" stroke="#3c2410" stroke-width="4" data-v-3643a4e2></rect><rect x="-70" y="2" width="140" height="9" rx="4" fill="#8c5c30" opacity="0.85" data-v-3643a4e2></rect><rect x="-78" y="40" width="156" height="9" fill="#caa23f" data-v-3643a4e2></rect><rect x="-7" y="-6" width="14" height="74" fill="#caa23f" data-v-3643a4e2></rect><rect x="-13" y="20" width="26" height="24" rx="5" fill="#e6ad42" stroke="#3c2410" stroke-width="2.5" data-v-3643a4e2></rect><circle cx="0" cy="31" r="4.5" fill="#3c2410" data-v-3643a4e2></circle></g>`);
            }
            _push2(`</g>`);
            if (collected.value.length) {
              _push2(`<g data-v-3643a4e2><circle cx="98" cy="-98" r="34" fill="#e11d2a" stroke="#fff" stroke-width="3" class="te-pouch-tag" data-v-3643a4e2></circle><text x="98" y="-86" text-anchor="middle" font-size="32" font-weight="900" fill="#fff" font-family="system-ui, sans-serif" data-v-3643a4e2>${ssrInterpolate(collected.value.length)}</text></g>`);
            } else {
              _push2(`<!---->`);
            }
            _push2(`<text x="0" y="150" text-anchor="middle" font-size="22" font-weight="900"${ssrRenderAttr("fill", accent.value)} font-family="system-ui, sans-serif" data-v-3643a4e2>POUCH</text></g>`);
          } else {
            _push2(`<!---->`);
          }
          _push2(`<rect${ssrRenderAttr("x", bg.value.x)}${ssrRenderAttr("y", bg.value.top)}${ssrRenderAttr("width", bg.value.w)}${ssrRenderAttr("height", bg.value.bottom - bg.value.top)} fill="url(#te-vig)" pointer-events="none" data-v-3643a4e2></rect></svg><div class="te-prompt" style="${ssrRenderStyle({ color: textColor.value })}" data-v-3643a4e2>${ssrInterpolate(prompt.value)}</div><div class="te-controls" data-v-3643a4e2>`);
          if (canTap.value) {
            _push2(`<button class="te-cta te-release" style="${ssrRenderStyle({ background: accent.value })}" data-v-3643a4e2>${ssrInterpolate(mode.value === "manual" ? "Release 🎟️" : "START 👹")}</button>`);
          } else {
            _push2(`<!---->`);
          }
          if ((phase.value === "feasting" || mode.value === "manual" && releaseIdx.value > 0 && releaseIdx.value < total.value) && !__props.demoMode) {
            _push2(`<button class="te-skip" data-v-3643a4e2>Skip to results</button>`);
          } else {
            _push2(`<!---->`);
          }
          _push2(`</div></div>`);
          if (reveal.on) {
            _push2(`<div class="te-reveal" data-v-3643a4e2><div class="${ssrRenderClass([{ flipped: reveal.flipped, collecting: reveal.collecting }, "te-flip"])}" data-v-3643a4e2><div class="te-flip-in" data-v-3643a4e2><div class="te-flip-face te-flip-back" style="${ssrRenderStyle({ borderColor: accent.value })}" data-v-3643a4e2><span class="te-flip-q" style="${ssrRenderStyle({ color: accent.value })}" data-v-3643a4e2>?</span></div><div class="te-flip-face te-flip-front" style="${ssrRenderStyle({ borderColor: accent.value })}" data-v-3643a4e2><div class="te-flip-glow" style="${ssrRenderStyle({ background: "radial-gradient(circle at 50% 42%, " + accent.value + "55, transparent 68%)" })}" data-v-3643a4e2></div><div class="te-flip-won" style="${ssrRenderStyle({ color: accent.value })}" data-v-3643a4e2>WINNER!</div><div class="te-flip-img" style="${ssrRenderStyle({ "--pacc": accent.value })}" data-v-3643a4e2>`);
            if (dropPrize.value && dropPrize.value.image) {
              _push2(`<img${ssrRenderAttr("src", dropPrize.value.image)} alt="" data-v-3643a4e2>`);
            } else if (prizeImage.value) {
              _push2(`<img${ssrRenderAttr("src", prizeImage.value)} alt="" data-v-3643a4e2>`);
            } else {
              _push2(`<span data-v-3643a4e2>🏆</span>`);
            }
            _push2(`</div><div class="te-flip-name" style="${ssrRenderStyle({ color: textColor.value })}" data-v-3643a4e2>${ssrInterpolate((_a = dropPrize.value) == null ? void 0 : _a.prize)}</div>`);
            if (reveal.collectable && !reveal.collecting) {
              _push2(`<button class="te-cta te-flip-collect" style="${ssrRenderStyle({ background: accent.value })}" data-v-3643a4e2>Collect 🏆</button>`);
            } else {
              _push2(`<div class="te-flip-hint" style="${ssrRenderStyle({ color: accent.value })}" data-v-3643a4e2>✦</div>`);
            }
            _push2(`</div></div></div></div>`);
          } else {
            _push2(`<!---->`);
          }
          if (showPouch.value) {
            _push2(`<div class="te-overlay" data-v-3643a4e2><div class="te-pouch-panel" style="${ssrRenderStyle({ borderColor: accent.value })}" data-v-3643a4e2><div class="te-pouch-title" style="${ssrRenderStyle({ color: accent.value })}" data-v-3643a4e2>🏆 Your Pouch · ${ssrInterpolate(collected.value.length)}</div>`);
            if (collected.value.length) {
              _push2(`<div class="te-pouch-grid" data-v-3643a4e2><!--[-->`);
              ssrRenderList(collected.value, (c, i) => {
                _push2(`<div class="te-pouch-item" data-v-3643a4e2><div class="te-pouch-img" data-v-3643a4e2>`);
                if (c.image) {
                  _push2(`<img${ssrRenderAttr("src", c.image)} alt="" data-v-3643a4e2>`);
                } else if (prizeImage.value) {
                  _push2(`<img${ssrRenderAttr("src", prizeImage.value)} alt="" data-v-3643a4e2>`);
                } else {
                  _push2(`<span data-v-3643a4e2>🏆</span>`);
                }
                _push2(`</div><div class="te-pouch-name" style="${ssrRenderStyle({ color: textColor.value })}" data-v-3643a4e2>#${ssrInterpolate(c.number)} · ${ssrInterpolate(c.prize)}</div>`);
                if (valueLabel(c)) {
                  _push2(`<div class="te-pouch-val" style="${ssrRenderStyle({ color: accent.value })}" data-v-3643a4e2>${ssrInterpolate(valueLabel(c))}</div>`);
                } else {
                  _push2(`<!---->`);
                }
                _push2(`</div>`);
              });
              _push2(`<!--]--></div>`);
            } else {
              _push2(`<div class="te-pouch-empty" data-v-3643a4e2>Nothing in here yet — win some prizes!</div>`);
            }
            _push2(`<button class="te-cta" style="${ssrRenderStyle({ background: primary.value, color: textColor.value })}" data-v-3643a4e2>Close</button></div></div>`);
          } else {
            _push2(`<!---->`);
          }
          if (showIntro.value) {
            _push2(`<div class="te-overlay te-intro" data-v-3643a4e2>`);
            if (introPhase.value === "splash") {
              _push2(`<div class="te-splash" data-v-3643a4e2><div class="te-splash-title" style="${ssrRenderStyle({ "--tglow": accent.value })}" data-v-3643a4e2>`);
              if (titleImage.value) {
                _push2(`<img${ssrRenderAttr("src", titleImage.value)} alt="" data-v-3643a4e2>`);
              } else {
                _push2(`<span style="${ssrRenderStyle({ color: textColor.value })}" data-v-3643a4e2>${ssrInterpolate(gameName.value || "Ticket Eater")}</span>`);
              }
              _push2(`</div></div>`);
            } else {
              _push2(`<!---->`);
            }
            if (introPhase.value === "settings") {
              _push2(`<div class="te-intro-card" style="${ssrRenderStyle({ "--acc": accent.value, "--tglow": accent.value })}" data-v-3643a4e2><div class="te-intro-welcome" style="${ssrRenderStyle({ color: textColor.value })}" data-v-3643a4e2>${ssrInterpolate(welcomeMsg.value)}</div><div class="te-intro-sub" data-v-3643a4e2>${ssrInterpolate(introSubtitle.value)}</div><div class="te-howto" data-v-3643a4e2><span data-v-3643a4e2><b data-v-3643a4e2>1</b> We roll through every one of your tickets</span><span data-v-3643a4e2><b data-v-3643a4e2>2</b> Each ticket number flashes up in turn</span><span data-v-3643a4e2><b data-v-3643a4e2>3</b> Winners reveal their prize 🏆</span></div><div class="te-set-label" data-v-3643a4e2>Choose your settings</div><div class="te-chip-row" data-v-3643a4e2><button class="${ssrRenderClass([{ on: mode.value === "manual" }, "te-chip"])}" data-v-3643a4e2>👆 Manual</button><button class="${ssrRenderClass([{ on: mode.value === "auto" }, "te-chip"])}" data-v-3643a4e2>⚡ Auto</button></div>`);
              if (mode.value === "auto") {
                _push2(`<!--[--><div class="te-set-label" data-v-3643a4e2>Speed</div><div class="te-chip-row" data-v-3643a4e2><button class="${ssrRenderClass([{ on: speed.value === 1 }, "te-chip"])}" data-v-3643a4e2>1×</button><button class="${ssrRenderClass([{ on: speed.value === 1.5 }, "te-chip"])}" data-v-3643a4e2>1.5×</button><button class="${ssrRenderClass([{ on: speed.value === 2 }, "te-chip"])}" data-v-3643a4e2>2×</button><button class="${ssrRenderClass([{ on: speed.value === 5 }, "te-chip"])}" data-v-3643a4e2>5×</button></div><!--]-->`);
              } else {
                _push2(`<!---->`);
              }
              _push2(`<button class="te-cta te-intro-start" style="${ssrRenderStyle({ background: accent.value })}" data-v-3643a4e2>${ssrInterpolate(introButtonText.value)}</button></div>`);
            } else {
              _push2(`<!---->`);
            }
            _push2(`</div>`);
          } else {
            _push2(`<!---->`);
          }
          if (phase.value === "done") {
            _push2(`<div class="te-overlay" data-v-3643a4e2><div class="te-card" style="${ssrRenderStyle({ borderColor: accent.value })}" data-v-3643a4e2><div class="te-card-top" style="${ssrRenderStyle({ color: accent.value })}" data-v-3643a4e2>${ssrInterpolate(wins.value.length ? "All done 🎉" : "All done")}</div>`);
            if (wins.value.length) {
              _push2(`<!--[--><div class="te-card-name" style="${ssrRenderStyle({ color: textColor.value })}" data-v-3643a4e2>Rolled through ${ssrInterpolate(total.value)} ${ssrInterpolate(total.value === 1 ? "ticket" : "tickets")} — ${ssrInterpolate(wins.value.length)} ${ssrInterpolate(wins.value.length === 1 ? "winner" : "winners")}!</div><ul class="te-winlist" data-v-3643a4e2><!--[-->`);
              ssrRenderList(wins.value, (w, i) => {
                _push2(`<li style="${ssrRenderStyle({ color: textColor.value })}" data-v-3643a4e2><span style="${ssrRenderStyle({ color: accent.value })}" data-v-3643a4e2>★</span> #${ssrInterpolate(w.number)} · ${ssrInterpolate(w.prize)}`);
                if (w.isBundle && w.value && !/ticket/i.test(w.prize)) {
                  _push2(`<span data-v-3643a4e2> — ${ssrInterpolate(Math.floor(w.value))} Free Ticket${ssrInterpolate(w.value == 1 ? "" : "s")}</span>`);
                } else if (w.value && !w.isBundle) {
                  _push2(`<span data-v-3643a4e2> — £${ssrInterpolate(w.value)}</span>`);
                } else {
                  _push2(`<!---->`);
                }
                _push2(`</li>`);
              });
              _push2(`<!--]--></ul><!--]-->`);
            } else {
              _push2(`<div class="te-card-name" style="${ssrRenderStyle({ color: textColor.value })}" data-v-3643a4e2>Rolled through all ${ssrInterpolate(total.value)} — no winners this time. Good luck next round!</div>`);
            }
            _push2(`<button class="te-cta" style="${ssrRenderStyle({ background: primary.value, color: textColor.value })}" data-v-3643a4e2>Close</button></div></div>`);
          } else {
            _push2(`<!---->`);
          }
          _push2(`</div></div>`);
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
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("resources/js/Components/Games/TicketEaterModal.vue");
  return _sfc_setup ? _sfc_setup(props, ctx) : void 0;
};
const TicketEaterModal = /* @__PURE__ */ _export_sfc(_sfc_main, [["__scopeId", "data-v-3643a4e2"]]);
export {
  TicketEaterModal as default
};
