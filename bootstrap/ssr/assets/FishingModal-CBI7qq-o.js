import { defineComponent, computed, ref, watch, reactive, nextTick, onBeforeUnmount, unref, useSSRContext } from "vue";
import { ssrRenderTeleport, ssrRenderClass, ssrInterpolate, ssrRenderStyle, ssrRenderAttr, ssrRenderList } from "vue/server-renderer";
import { g as gsapWithCSS, _ as _export_sfc } from "../ssr.js";
import { s as siteCreditLabel } from "./prizeLabel-Z9qw9N7H.js";
import { u as useSpriteFrames } from "./spriteFrames-D9HXy9dn.js";
import "@inertiajs/vue3";
import "three";
import "axios";
import "@inertiajs/vue3/server";
const SURFACE_Y = 580;
const SEG = 240;
const _sfc_main = /* @__PURE__ */ defineComponent({
  __name: "FishingModal",
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
    const CORE = { x: 32, y: 10, w: 936, h: 1404 };
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
    const titleText = computed(() => a.value.titleText || "Cast to Win!");
    const winText = computed(() => a.value.winText || "Reeled in a winner! 🎣");
    const loseText = computed(() => a.value.loseText || "The one that got away…");
    const accent = computed(() => a.value.accentColor || "#ffd54f");
    const primary = computed(() => a.value.primaryColor || "#0277bd");
    const textColor = computed(() => a.value.textColor || "#ffffff");
    const sunEnabled = computed(() => a.value.sunEnabled !== false);
    const sunImage = computed(() => a.value.sunImage || "/games/fishing/sun-default.png?v=1");
    const cloudsEnabled = computed(() => a.value.cloudsEnabled !== false);
    const showTopPrize = computed(() => a.value.showTopPrize === true);
    const boatImage = computed(() => a.value.boatImage || "/games/fishing/boat-default.png?v=2");
    const fishImage = computed(() => a.value.fishImage || "/games/fishing/fish-default.png?v=1");
    const fishermanSheet = computed(() => a.value.fishermanSheet || "");
    const spriteChroma = computed(() => a.value.spriteChroma === true);
    const fishermanFrames = computed(() => {
      const n = Number(a.value.fishermanFrames) || 0;
      return n > 0 ? n : 1;
    });
    const boatOk = ref(true);
    const { urls: fishermanFrameUrls } = useSpriteFrames(
      () => fishermanSheet.value,
      () => fishermanFrames.value,
      () => spriteChroma.value
    );
    const fishermanFrameUrl = computed(() => fishermanFrameUrls.value[0] || "");
    const introEnabled = computed(() => a.value.introEnabled !== false);
    const introTitleImage = computed(() => a.value.introTitleImage || "");
    const introSubtitle = computed(() => a.value.introSubtitle || "Cast your line to reel in instant prizes");
    const introButtonText = computed(() => a.value.introButtonText || "Cast Off 🎣");
    const introVoiceEnabled = computed(() => a.value.introVoiceEnabled === true);
    const gameName = computed(() => a.value.name || "");
    const welcomeMsg = computed(() => (a.value.introWelcomeText || "Welcome to {name}").replace("{name}", gameName.value || "the catch"));
    const showIntro = ref(false);
    const THEMES = {
      // Chill — calm bright day, turquoise water.
      chill: { skyTop: "#7ecbff", skyBot: "#cdeeff", surfTop: "#3fb6e0", surfBot: "#1f8fc0", deepTop: "#1f8fc0", deepBot: "#063a63", sand: "#e6cf86", weed: "#1f8f5a", sun: "#fff2a8", glow: "#ffe55c", foam: "#f2fcff" },
      // Sunset — warm dusk.
      sunset: { skyTop: "#3a2a66", skyBot: "#ffb27a", surfTop: "#e0795f", surfBot: "#9c4a6e", deepTop: "#7a3a6a", deepBot: "#241036", sand: "#caa05e", weed: "#7a5a2a", sun: "#fff1c2", glow: "#ff9d5c", foam: "#ffe9d6" },
      // Night Time — moonlit, deep navy.
      night: { skyTop: "#050a1f", skyBot: "#122a4a", surfTop: "#14405e", surfBot: "#0a2a40", deepTop: "#0a2a40", deepBot: "#02101c", sand: "#2a3d4a", weed: "#14564a", sun: "#eaf4ff", glow: "#9fd0ff", foam: "#bcd8ec" },
      // Stormy — grey, moody, choppy.
      stormy: { skyTop: "#2e3742", skyBot: "#6b7b85", surfTop: "#3c5560", surfBot: "#24383f", deepTop: "#24383f", deepBot: "#0c181c", sand: "#5a5f52", weed: "#3e5a44", sun: "#b9c6cd", glow: "#d2dbe0", foam: "#dbe4e8" }
    };
    const pal = computed(() => THEMES[String(a.value.theme || "stormy")] || THEMES.stormy);
    const underwaterImage = computed(() => a.value.underwaterImage || "/games/fishing/underwater-default.png?v=1");
    const FISH_PALETTE = ["#ffb74d", "#ff8a65", "#4fc3f7", "#ba68c8", "#aed581", "#fff176"];
    const bubbles = Array.from({ length: 24 }, (_, i) => ({
      id: i,
      x: 40 + i * 137 % 920,
      r: 3 + i * 7 % 5 * 1.6,
      dur: 5 + i * 3 % 6,
      delay: -(i * 1.7 % 7)
    }));
    const weeds = Array.from({ length: 9 }, (_, i) => ({ id: i, x: 70 + i * 108 + i * 13 % 30, h: 90 + i * 29 % 90, delay: -(i * 0.6 % 3) }));
    const casts = ref([]);
    const index = ref(0);
    const phase = ref("ready");
    const showPrize = ref(false);
    const isWin = (t) => !!((t == null ? void 0 : t.instant_win) && t.instant_win.prize && t.instant_win.prize !== "NO WIN");
    function categoryFor(iw) {
      const cats = props.instant_win_categories || [];
      if (!iw) return null;
      return (iw.category_id != null ? cats.find((c) => c.id === iw.category_id) : null) || cats.find((c) => c.name && (c.name === iw.prize || c.name === iw.name)) || null;
    }
    function buildCasts() {
      casts.value = (props.tickets || []).map((t) => {
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
          isBundle: won && ((iw == null ? void 0 : iw.prize_type) ?? (cat == null ? void 0 : cat.prize_type)) === "ticket_bundle"
        };
      });
      index.value = 0;
      caughtIds.value = [];
      resetCast();
      rebuildSwimmers();
    }
    const mode = ref("all");
    const speed = ref(1);
    const playList = computed(() => mode.value === "winners" ? casts.value.filter((c) => c.win) : casts.value);
    const current = computed(() => playList.value[index.value] ?? null);
    const total = computed(() => playList.value.length);
    const caught = computed(() => playList.value.slice(0, phase.value === "done" ? total.value : index.value + (phase.value === "result" ? 1 : 0)).filter((c) => c.win).length);
    const wins = computed(() => casts.value.filter((c) => c.win));
    const caughtIds = ref([]);
    const catKey = (w) => String(w.image || w.prize || w.id);
    const decoFish = ref([]);
    function makeSwimmer(id, image, i, chance = false, value = 0) {
      const baseY = 700 + Math.random() * 600;
      return {
        id,
        image,
        chance,
        value,
        color: FISH_PALETTE[i % FISH_PALETTE.length],
        x: 80 + Math.random() * 840,
        // scattered across the width (incl. under the boat)
        baseY,
        y: baseY,
        bobAmp: 30 + Math.random() * 80,
        // slowly roams up/down so depths keep varying
        bobSpeed: 0.3 + Math.random() * 0.5,
        phase: Math.random() * Math.PI * 2,
        size: 0.9 + Math.random() * 0.5,
        dir: Math.random() < 0.5 ? 1 : -1,
        speed: 48 + Math.random() * 70,
        // px/sec drift
        hooked: false,
        // physics: holds still for the incoming hook
        caught: false,
        // visual: glow + sparkle, only once the hook is ON it
        haloR: 70,
        // pulsating prize-glow radius (set per-prize below)
        haloDelay: -(i * 0.5),
        wDur: 0.5 + i % 4 * 0.13,
        wDelay: -(i * 0.17)
      };
    }
    function rebuildSwimmers() {
      const seen = /* @__PURE__ */ new Set();
      const distinct = wins.value.filter((w) => {
        const k = catKey(w);
        if (seen.has(k)) return false;
        seen.add(k);
        return true;
      }).filter((w) => wins.value.some((x) => catKey(x) === catKey(w) && !caughtIds.value.includes(x.id)));
      const list = distinct.map((w, i) => makeSwimmer(catKey(w), w.image || introTitleImage.value || fishImage.value, i, false, Number(w.value) || 0));
      const winKeys = new Set(list.map((s) => s.id));
      const chanceSeen = /* @__PURE__ */ new Set();
      let ci = list.length;
      for (const c of props.instant_win_categories || []) {
        if (!c || c.available !== void 0 && c.available <= 0) continue;
        const key = String(c.image_path || c.name || c.id);
        if (winKeys.has(key) || chanceSeen.has(key)) continue;
        chanceSeen.add(key);
        list.push(makeSwimmer("chance:" + key, c.image_path || introTitleImage.value || fishImage.value, ci++, true, Number(c.value) || 0));
        if (list.length >= distinct.length + 8) break;
      }
      if (!list.length) {
        for (let i = 0; i < 5; i++) list.push(makeSwimmer("amb:" + i, "", i, true));
      }
      const topVal = Math.max(1, ...list.map((f) => Number(f.value) || 0));
      list.forEach((f) => {
        f.haloR = 60 + Math.pow(Math.min(1, (Number(f.value) || 0) / topVal), 0.55) * 95;
      });
      decoFish.value = list;
    }
    let swimRAF = 0;
    let swimLast = 0;
    function stepSwim(t) {
      const dt = swimLast ? Math.min(0.05, (t - swimLast) / 1e3) : 0;
      swimLast = t;
      const v = view.value, left = v.x - 140, right = v.x + v.w + 140;
      for (const sw of decoFish.value) {
        if (sw.hooked) continue;
        sw.x += sw.speed * sw.dir * dt;
        if (sw.x > right) sw.x = left;
        else if (sw.x < left) sw.x = right;
        sw.y = sw.baseY + Math.sin(t / 1e3 * sw.bobSpeed + sw.phase) * sw.bobAmp;
      }
      swimRAF = requestAnimationFrame(stepSwim);
    }
    function startSwim() {
      stopSwim();
      swimLast = 0;
      swimRAF = requestAnimationFrame(stepSwim);
    }
    function stopSwim() {
      if (swimRAF) {
        cancelAnimationFrame(swimRAF);
        swimRAF = 0;
      }
    }
    function respawnOrRemove(sw) {
      if (wins.value.some((w) => catKey(w) === sw.id && !caughtIds.value.includes(w.id))) {
        sw.hooked = false;
        sw.caught = false;
        const v = view.value;
        sw.x = sw.dir === 1 ? v.x - 120 : v.x + v.w + 120;
      } else {
        decoFish.value = decoFish.value.filter((s) => s !== sw);
      }
    }
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
      const sc = siteCreditLabel(p.prize_type, v);
      if (sc) return sc;
      const money = v ? `£${v % 1 === 0 ? v : v.toFixed(2)}` : "";
      return !money || /£\s*\d/.test(name) ? name : `${name} · ${money}`;
    });
    const currentValueLabel = computed(() => {
      const p = current.value;
      const v = Number((p == null ? void 0 : p.value) || 0);
      if (!v) return "";
      if (p == null ? void 0 : p.isBundle) return /ticket/i.test((p == null ? void 0 : p.prize) || "") ? "" : `${Math.floor(v)} Free Ticket${v == 1 ? "" : "s"}`;
      if (/£\s*\d/.test((p == null ? void 0 : p.prize) || "")) return "";
      return `£${v % 1 === 0 ? v : v.toFixed(2)}`;
    });
    const rodTipLocal = computed(() => ({ x: 745, y: -64 }));
    const HOOK_REST = { x: 745, y: 400 };
    const HOOK_DEPTH = { x: 690, y: 1e3 };
    const boatWaterline = computed(() => Number(a.value.boatWaterline) || 0);
    const boatBaseY = computed(() => SURFACE_Y - 185 + boatWaterline.value);
    const waveSpan = computed(() => {
      const v = view.value;
      return { x0: Math.floor((v.x - 480) / 480) * 480, x1: v.x + v.w + 480 };
    });
    function tiledWave(y, a1, a2) {
      const { x0, x1 } = waveSpan.value;
      let d = `M${x0} ${y}`;
      for (let x = x0, i = 0; x < x1; x += SEG, i++) {
        const amp = i % 2 ? a2 : a1;
        d += ` c 53 ${amp} 187 ${amp} ${SEG} 0`;
      }
      return d;
    }
    const waveBackPath = computed(() => tiledWave(SURFACE_Y - 4, -50, -76) + ` V${SURFACE_Y + 210} H${waveSpan.value.x0} Z`);
    const waveFrontFill = computed(() => tiledWave(SURFACE_Y + 8, -68, -42) + ` V${SURFACE_Y + 210} H${waveSpan.value.x0} Z`);
    const waveFrontLine = computed(() => tiledWave(SURFACE_Y + 8, -68, -42));
    function seabed(top) {
      const v = view.value, x0 = v.x - 200, x1 = v.x + v.w + 200, floor = bg.value.floor;
      let d = `M${x0} ${top} q 250 -64 500 0`;
      for (let x = x0 + 500; x < x1; x += 500) d += ` t 500 0`;
      return d + ` V${floor} H${x0} Z`;
    }
    const sandPath = computed(() => seabed(bg.value.floor - 118));
    const ridgePath = computed(() => seabed(bg.value.floor - 165));
    const scene = reactive({
      rodAngle: 0,
      hookX: HOOK_REST.x,
      hookY: HOOK_REST.y,
      fishO: 0,
      fishX: HOOK_DEPTH.x,
      fishY: HOOK_DEPTH.y
      // the hooked (winning) fish
    });
    const boat = reactive({ rot: 0, y: 0, x: 0, sy: 1 });
    const sunSpin = reactive({ a: 0 });
    let ambient = null;
    let castTl = null;
    function startAmbient() {
      stopAmbient();
      ambient = gsapWithCSS.timeline();
      gsapWithCSS.to(sunSpin, { a: 360, duration: 70, repeat: -1, ease: "none" });
      gsapWithCSS.to(boat, { rot: 2.6, duration: 2.9, repeat: -1, yoyo: true, ease: "sine.inOut" });
      gsapWithCSS.to(boat, { y: 12, duration: 3.5, repeat: -1, yoyo: true, ease: "sine.inOut" });
      gsapWithCSS.fromTo(boat, { x: -75 }, { x: 75, duration: 8, repeat: -1, yoyo: true, ease: "sine.inOut" });
      gsapWithCSS.to(boat, { sy: 1.04, duration: 3.4, repeat: -1, yoyo: true, ease: "sine.inOut" });
    }
    function stopAmbient() {
      gsapWithCSS.killTweensOf([sunSpin, boat]);
      ambient == null ? void 0 : ambient.kill();
      ambient = null;
    }
    function resetCast() {
      castTl == null ? void 0 : castTl.kill();
      castTl = null;
      phase.value = "ready";
      showPrize.value = false;
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
    const linePath = computed(() => {
      const rt = rodTip.value;
      return `M ${rt.x} ${rt.y} Q ${(rt.x + scene.hookX) / 2} ${(rt.y + scene.hookY) / 2 + 18}, ${scene.hookX} ${scene.hookY}`;
    });
    function castNow() {
      if (phase.value !== "ready") return;
      if (!current.value) {
        finish();
        return;
      }
      const c = current.value;
      let target = c.win ? decoFish.value.find((sw) => sw.id === catKey(c) && !sw.hooked && !sw.chance) : null;
      if (c.win && !target) {
        target = {
          id: catKey(c),
          image: c.image || introTitleImage.value || fishImage.value,
          color: FISH_PALETTE[0],
          x: 120 + Math.random() * 760,
          baseY: 760,
          y: 760,
          bobAmp: 0,
          bobSpeed: 0,
          phase: 0,
          size: 1.1,
          dir: 1,
          speed: 0,
          hooked: true,
          wDur: 0.6,
          wDelay: 0
        };
        decoFish.value.push(target);
      }
      let tx, ty;
      if (target) {
        target.hooked = true;
        tx = Math.max(150, Math.min(850, target.x));
        ty = Math.max(640, Math.min(1340, target.y));
        target.x = tx;
        target.y = ty;
      } else {
        tx = 260 + Math.round(Math.random() * 480);
        ty = 880 + Math.round(Math.random() * 460);
      }
      play(a.value.castSound);
      phase.value = "casting";
      castTl == null ? void 0 : castTl.kill();
      const tl = gsapWithCSS.timeline();
      castTl = tl;
      tl.timeScale(speed.value);
      tl.to(scene, { rodAngle: -28, duration: 0.22, ease: "power2.out" }).to(scene, { rodAngle: 22, duration: 0.16, ease: "power3.in" });
      tl.to(scene, { hookX: tx, duration: 0.9, ease: "power1.inOut" }, "<").to(scene, { hookY: SURFACE_Y - 6, duration: 0.32, ease: "power2.out" }, "<").add(() => play(a.value.splashSound)).to(scene, { hookY: ty, duration: 1.1, ease: "power1.in" });
      tl.to(scene, { rodAngle: 4, duration: 0.4, ease: "sine.out" }, "<");
      tl.add(() => {
        phase.value = "waiting";
      });
      tl.to(scene, { hookY: ty + 16, duration: 0.5, repeat: 1, yoyo: true, ease: "sine.inOut" });
      if (target) tl.to(target, { y: ty + 16, duration: 0.5, repeat: 1, yoyo: true, ease: "sine.inOut" }, "<");
      tl.add(() => {
        phase.value = "reeling";
        play(a.value.reelSound);
        if (target) target.caught = true;
      });
      if (target) {
        tl.to(scene, {
          hookX: HOOK_REST.x,
          hookY: HOOK_REST.y + 30,
          duration: 1.2,
          ease: "power2.inOut",
          onUpdate: () => {
            target.x = scene.hookX;
            target.y = scene.hookY + 22;
          }
        });
      } else {
        tl.to(scene, { hookX: HOOK_REST.x, hookY: HOOK_REST.y, duration: 1.2, ease: "power2.inOut" });
      }
      tl.add(() => {
        phase.value = "result";
        play(c.win ? a.value.winSound : a.value.lossSound);
        if (c.win) {
          showPrize.value = true;
          if (!caughtIds.value.includes(c.id)) caughtIds.value.push(c.id);
          if (target) respawnOrRemove(target);
        }
        if (mode.value === "auto") {
          clearAuto();
          autoTimer = setTimeout(() => next(), (c.win ? 1700 : 750) / speed.value);
        }
      });
    }
    function next() {
      clearAuto();
      showPrize.value = false;
      if (index.value < total.value - 1) {
        index.value += 1;
        resetCast();
      } else {
        finish();
        return;
      }
      if (mode.value === "auto") {
        autoTimer = setTimeout(() => castNow(), 500 / speed.value);
      }
    }
    function finish() {
      phase.value = "done";
      showPrize.value = false;
      emit("wins-collected", wins.value.map((w) => ({ prize: w.prize, value: w.value })));
    }
    const prompt = computed(() => {
      var _a;
      return phase.value === "ready" ? titleText.value : phase.value === "casting" ? "Casting…" : phase.value === "waiting" ? "Wait for a bite…" : phase.value === "reeling" ? "Reel it in!" : phase.value === "result" ? ((_a = current.value) == null ? void 0 : _a.win) ? winText.value : loseText.value : "";
    });
    let audio = null;
    function play(src) {
      if (!src || props.demoMode) return;
      try {
        audio = new Audio(src);
        audio.volume = 0.85;
        void audio.play();
      } catch {
      }
    }
    function playWelcome() {
      if (a.value.welcomeSound) {
        play(a.value.welcomeSound);
        return;
      }
      if (!introVoiceEnabled.value || typeof window === "undefined" || !window.speechSynthesis) return;
      try {
        const u = new SpeechSynthesisUtterance(welcomeMsg.value);
        u.rate = 1;
        u.pitch = 1.05;
        window.speechSynthesis.cancel();
        window.speechSynthesis.speak(u);
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
    const introCard = ref(null);
    let autoTimer = null;
    function clearAuto() {
      if (autoTimer) {
        clearTimeout(autoTimer);
        autoTimer = null;
      }
    }
    let demoTimer = null;
    function clearDemo() {
      if (demoTimer) {
        clearTimeout(demoTimer);
        demoTimer = null;
      }
    }
    function startGame() {
      clearDemo();
      showIntro.value = false;
      index.value = 0;
      resetCast();
      if (mode.value === "winners" && !playList.value.length) {
        finish();
        return;
      }
      if (mode.value === "auto") {
        clearAuto();
        autoTimer = setTimeout(() => castNow(), 500 / speed.value);
      }
    }
    watch(() => props.tickets, buildCasts, { immediate: true, deep: true });
    watch(() => props.modelValue, (open) => {
      if (open) {
        mode.value = "all";
        clearAuto();
        clearDemo();
        buildCasts();
        startAmbient();
        startSwim();
        showIntro.value = introEnabled.value;
        if (showIntro.value && !props.demoMode) playWelcome();
        if (props.demoMode) demoTimer = setTimeout(() => {
          mode.value = "auto";
          startGame();
        }, introEnabled.value ? 2200 : 500);
      } else {
        stopAmbient();
        stopSwim();
        castTl == null ? void 0 : castTl.kill();
        clearAuto();
        clearDemo();
        cancelSpeech();
      }
    }, { immediate: true });
    watch(phase, (p) => {
      if (props.demoMode && p === "done") {
        clearDemo();
        demoTimer = setTimeout(() => {
          buildCasts();
          mode.value = "auto";
          startGame();
        }, 1600);
      }
    });
    watch(showIntro, (on) => {
      if (!on) return;
      nextTick(() => {
        const el = introCard.value;
        if (!el) return;
        gsapWithCSS.killTweensOf(el);
        const tl = gsapWithCSS.timeline();
        tl.from(el, { scale: 0.3, opacity: 0, duration: 0.45, ease: "back.out(2.2)" }).to(el, { scale: 1.04, duration: 0.1, yoyo: true, repeat: 1, ease: "sine.inOut" }).from(el.querySelectorAll(".fsh-intro-logo, .fsh-intro-welcome, .fsh-set-label"), { y: 16, opacity: 0, duration: 0.3, stagger: 0.05, ease: "power2.out" }, "-=0.3").from(el.querySelectorAll(".fsh-chip"), { y: 22, scale: 0.7, opacity: 0, duration: 0.32, stagger: 0.05, ease: "back.out(2)" }, "-=0.18").from(el.querySelector(".fsh-intro-start"), { y: 20, opacity: 0, duration: 0.3, ease: "back.out(2)" }, "-=0.06");
      });
    });
    watch(() => a.value.boatImage, () => {
      boatOk.value = true;
    });
    watch(introEnabled, (on) => {
      if (props.demoMode) showIntro.value = on;
    });
    onBeforeUnmount(() => {
      stopAmbient();
      stopSwim();
      castTl == null ? void 0 : castTl.kill();
      clearAuto();
      clearDemo();
      cancelSpeech();
      stageRO == null ? void 0 : stageRO.disconnect();
    });
    return (_ctx, _push, _parent, _attrs) => {
      ssrRenderTeleport(_push, (_push2) => {
        if (__props.modelValue || __props.demoMode) {
          _push2(`<div class="${ssrRenderClass([frameClass.value, "fsh-root"])}" data-v-a898ffab><div class="fsh-frame" data-v-a898ffab>`);
          if (__props.demoMode) {
            _push2(`<div class="fsh-preview-toggle" data-v-a898ffab><span data-v-a898ffab>Preview:</span><button class="${ssrRenderClass({ on: demoPreviewMode.value === "mobile" })}" data-v-a898ffab>📱 Mobile</button><button class="${ssrRenderClass({ on: demoPreviewMode.value === "desktop" })}" data-v-a898ffab>🖥 Desktop</button></div>`);
          } else {
            _push2(`<!---->`);
          }
          if (!__props.demoMode) {
            _push2(`<button class="fsh-close" aria-label="Close" data-v-a898ffab>✕</button>`);
          } else {
            _push2(`<!---->`);
          }
          _push2(`<div class="fsh-hud" data-v-a898ffab><div class="fsh-hud-left" data-v-a898ffab>CAST ${ssrInterpolate(Math.min(index.value + 1, total.value))}/${ssrInterpolate(total.value)} · 🎣 ${ssrInterpolate(caught.value)}</div><div class="fsh-hud-title" style="${ssrRenderStyle({ color: textColor.value })}" data-v-a898ffab>${ssrInterpolate(gameName.value || "Fishing")}</div></div>`);
          if (showTopPrize.value && topPrizeLabel.value) {
            _push2(`<div class="fsh-topprize" style="${ssrRenderStyle({ borderColor: accent.value })}" data-v-a898ffab><span class="fsh-topprize-pill" style="${ssrRenderStyle({ background: accent.value })}" data-v-a898ffab>£</span><span class="fsh-topprize-val" data-v-a898ffab><b style="${ssrRenderStyle({ color: accent.value })}" data-v-a898ffab>TOP PRIZE</b> ${ssrInterpolate(topPrizeLabel.value)}</span></div>`);
          } else {
            _push2(`<!---->`);
          }
          _push2(`<div class="fsh-stage" data-v-a898ffab><svg class="fsh-svg"${ssrRenderAttr("viewBox", sceneViewBox.value)} preserveAspectRatio="xMidYMid slice" data-v-a898ffab><defs data-v-a898ffab><linearGradient id="fsh-sky" x1="0" y1="0" x2="0" y2="1" data-v-a898ffab><stop offset="0"${ssrRenderAttr("stop-color", pal.value.skyTop)} data-v-a898ffab></stop><stop offset="1"${ssrRenderAttr("stop-color", pal.value.skyBot)} data-v-a898ffab></stop></linearGradient><linearGradient id="fsh-deep" x1="0" y1="0" x2="0" y2="1" data-v-a898ffab><stop offset="0"${ssrRenderAttr("stop-color", pal.value.surfTop)} data-v-a898ffab></stop><stop offset="0.25"${ssrRenderAttr("stop-color", pal.value.deepTop)} data-v-a898ffab></stop><stop offset="1"${ssrRenderAttr("stop-color", pal.value.deepBot)} data-v-a898ffab></stop></linearGradient><radialGradient id="fsh-sun" cx="0.5" cy="0.5" r="0.5" data-v-a898ffab><stop offset="0"${ssrRenderAttr("stop-color", pal.value.sun)} data-v-a898ffab></stop><stop offset="0.55"${ssrRenderAttr("stop-color", pal.value.glow)} data-v-a898ffab></stop><stop offset="1"${ssrRenderAttr("stop-color", pal.value.glow)} stop-opacity="0" data-v-a898ffab></stop></radialGradient><linearGradient id="fsh-ray" x1="0" y1="0" x2="0" y2="1" data-v-a898ffab><stop offset="0"${ssrRenderAttr("stop-color", pal.value.glow)} stop-opacity="0.28" data-v-a898ffab></stop><stop offset="1"${ssrRenderAttr("stop-color", pal.value.glow)} stop-opacity="0" data-v-a898ffab></stop></linearGradient><filter id="fsh-glow" x="-60%" y="-60%" width="220%" height="220%" data-v-a898ffab><feDropShadow dx="0" dy="0" stdDeviation="7"${ssrRenderAttr("flood-color", pal.value.glow)} flood-opacity="0.9" data-v-a898ffab></feDropShadow></filter><filter id="fsh-ripple" x="-8%" y="-8%" width="116%" height="116%" data-v-a898ffab><feTurbulence type="fractalNoise" baseFrequency="0.01 0.018" numOctaves="2" seed="5" result="n" data-v-a898ffab><animate attributeName="baseFrequency" dur="13s" values="0.01 0.018;0.017 0.032;0.01 0.018" repeatCount="indefinite" data-v-a898ffab></animate></feTurbulence><feDisplacementMap in="SourceGraphic" in2="n" scale="36" xChannelSelector="R" yChannelSelector="G" result="d" data-v-a898ffab></feDisplacementMap><feGaussianBlur in="d" stdDeviation="1.2" data-v-a898ffab></feGaussianBlur></filter><filter id="fsh-ripple-fish" x="-60%" y="-60%" width="220%" height="220%" data-v-a898ffab><feTurbulence type="fractalNoise" baseFrequency="0.02 0.03" numOctaves="2" seed="9" result="n" data-v-a898ffab><animate attributeName="baseFrequency" dur="8s" values="0.02 0.03;0.03 0.044;0.02 0.03" repeatCount="indefinite" data-v-a898ffab></animate></feTurbulence><feDisplacementMap in="SourceGraphic" in2="n" scale="15" xChannelSelector="R" yChannelSelector="G" result="d" data-v-a898ffab></feDisplacementMap><feDropShadow in="d" dx="0" dy="0" stdDeviation="7"${ssrRenderAttr("flood-color", pal.value.glow)} flood-opacity="0.8" data-v-a898ffab></feDropShadow></filter><filter id="fsh-fishglow" x="-55%" y="-55%" width="210%" height="210%" data-v-a898ffab><feDropShadow dx="0" dy="0" stdDeviation="8"${ssrRenderAttr("flood-color", pal.value.glow)} flood-opacity="0.75" data-v-a898ffab></feDropShadow></filter><filter id="fsh-catchglow" x="-160%" y="-160%" width="420%" height="420%" data-v-a898ffab><feDropShadow dx="0" dy="0" stdDeviation="18"${ssrRenderAttr("flood-color", accent.value)} flood-opacity="0.98" result="s1" data-v-a898ffab></feDropShadow><feDropShadow in="s1" dx="0" dy="0" stdDeviation="46"${ssrRenderAttr("flood-color", accent.value)} flood-opacity="0.55" data-v-a898ffab></feDropShadow></filter><radialGradient id="fsh-halo" cx="0.5" cy="0.5" r="0.5" data-v-a898ffab><stop offset="0"${ssrRenderAttr("stop-color", accent.value)} stop-opacity="0.6" data-v-a898ffab></stop><stop offset="0.45"${ssrRenderAttr("stop-color", accent.value)} stop-opacity="0.3" data-v-a898ffab></stop><stop offset="1"${ssrRenderAttr("stop-color", accent.value)} stop-opacity="0" data-v-a898ffab></stop></radialGradient><linearGradient id="fsh-blend" x1="0" y1="0" x2="0" y2="1" data-v-a898ffab><stop offset="0"${ssrRenderAttr("stop-color", pal.value.surfBot)} stop-opacity="0.95" data-v-a898ffab></stop><stop offset="0.5"${ssrRenderAttr("stop-color", pal.value.surfBot)} stop-opacity="0.35" data-v-a898ffab></stop><stop offset="1"${ssrRenderAttr("stop-color", pal.value.surfBot)} stop-opacity="0" data-v-a898ffab></stop></linearGradient><clipPath id="fsh-underclip" data-v-a898ffab><rect${ssrRenderAttr("x", bg.value.x)}${ssrRenderAttr("y", SURFACE_Y)}${ssrRenderAttr("width", bg.value.w)}${ssrRenderAttr("height", bg.value.bottom - SURFACE_Y)} data-v-a898ffab></rect></clipPath><linearGradient id="fsh-depth" x1="0" y1="0" x2="0" y2="1" data-v-a898ffab><stop offset="0"${ssrRenderAttr("stop-color", pal.value.deepBot)} stop-opacity="0" data-v-a898ffab></stop><stop offset="0.55"${ssrRenderAttr("stop-color", pal.value.deepBot)} stop-opacity="0" data-v-a898ffab></stop><stop offset="1"${ssrRenderAttr("stop-color", pal.value.deepBot)} stop-opacity="0.6" data-v-a898ffab></stop></linearGradient><linearGradient id="fsh-surf-a" x1="0" y1="0" x2="0" y2="1" data-v-a898ffab><stop offset="0"${ssrRenderAttr("stop-color", pal.value.surfTop)} stop-opacity="0.92" data-v-a898ffab></stop><stop offset="1"${ssrRenderAttr("stop-color", pal.value.surfTop)} stop-opacity="0" data-v-a898ffab></stop></linearGradient><linearGradient id="fsh-surf-b" x1="0" y1="0" x2="0" y2="1" data-v-a898ffab><stop offset="0"${ssrRenderAttr("stop-color", pal.value.surfBot)} stop-opacity="0.85" data-v-a898ffab></stop><stop offset="1"${ssrRenderAttr("stop-color", pal.value.surfBot)} stop-opacity="0" data-v-a898ffab></stop></linearGradient></defs><rect${ssrRenderAttr("x", bg.value.x)}${ssrRenderAttr("y", bg.value.top)}${ssrRenderAttr("width", bg.value.w)}${ssrRenderAttr("height", SURFACE_Y - bg.value.top + 20)} fill="url(#fsh-sky)" data-v-a898ffab></rect>`);
          if (sunEnabled.value) {
            _push2(`<g transform="translate(815 120)" data-v-a898ffab><g class="fsh-sunglow" data-v-a898ffab><circle r="158" fill="url(#fsh-sun)" opacity="0.38" data-v-a898ffab></circle><circle r="104" fill="url(#fsh-sun)" opacity="0.6" data-v-a898ffab></circle></g>`);
            if (sunImage.value) {
              _push2(`<image${ssrRenderAttr("href", sunImage.value)} x="-90" y="-90" width="180" height="180" preserveAspectRatio="xMidYMid meet" filter="url(#fsh-glow)" data-v-a898ffab></image>`);
            } else {
              _push2(`<g filter="url(#fsh-glow)" data-v-a898ffab><g${ssrRenderAttr("transform", `rotate(${sunSpin.a})`)} opacity="0.5" data-v-a898ffab><!--[-->`);
              ssrRenderList(12, (r) => {
                _push2(`<rect x="-3" y="-150" width="6" height="56" rx="3"${ssrRenderAttr("fill", pal.value.sun)}${ssrRenderAttr("transform", `rotate(${r * 30})`)} data-v-a898ffab></rect>`);
              });
              _push2(`<!--]--></g><circle r="54"${ssrRenderAttr("fill", pal.value.sun)} data-v-a898ffab></circle></g>`);
            }
            _push2(`</g>`);
          } else {
            _push2(`<!---->`);
          }
          if (cloudsEnabled.value) {
            _push2(`<g${ssrRenderAttr("fill", pal.value.foam)} data-v-a898ffab><g class="fsh-cloud fsh-cloud-a" data-v-a898ffab><ellipse cx="0" cy="0" rx="60" ry="26" data-v-a898ffab></ellipse><ellipse cx="48" cy="9" rx="42" ry="22" data-v-a898ffab></ellipse><ellipse cx="-46" cy="10" rx="38" ry="20" data-v-a898ffab></ellipse></g><g class="fsh-cloud fsh-cloud-b" opacity="0.8" data-v-a898ffab><ellipse cx="0" cy="0" rx="46" ry="20" data-v-a898ffab></ellipse><ellipse cx="38" cy="7" rx="34" ry="17" data-v-a898ffab></ellipse></g></g>`);
          } else {
            _push2(`<!---->`);
          }
          if (underwaterImage.value) {
            _push2(`<image${ssrRenderAttr("href", underwaterImage.value)}${ssrRenderAttr("x", bg.value.x)}${ssrRenderAttr("y", SURFACE_Y - 16)}${ssrRenderAttr("width", bg.value.w)}${ssrRenderAttr("height", bg.value.bottom - SURFACE_Y + 16)} preserveAspectRatio="xMidYMid slice" filter="url(#fsh-ripple)" clip-path="url(#fsh-underclip)" data-v-a898ffab></image>`);
          } else {
            _push2(`<!--[--><rect${ssrRenderAttr("x", bg.value.x)}${ssrRenderAttr("y", SURFACE_Y)}${ssrRenderAttr("width", bg.value.w)}${ssrRenderAttr("height", bg.value.bottom - SURFACE_Y)} fill="url(#fsh-deep)" data-v-a898ffab></rect><g opacity="0.55" data-v-a898ffab><polygon${ssrRenderAttr("points", `700,${SURFACE_Y} 760,${SURFACE_Y} 1020,1180 880,1180`)} fill="url(#fsh-ray)" data-v-a898ffab></polygon><polygon${ssrRenderAttr("points", `320,${SURFACE_Y} 380,${SURFACE_Y} 240,1180 120,1180`)} fill="url(#fsh-ray)" data-v-a898ffab></polygon></g><path${ssrRenderAttr("d", ridgePath.value)}${ssrRenderAttr("fill", pal.value.deepBot)} opacity="0.55" data-v-a898ffab></path><path${ssrRenderAttr("d", sandPath.value)}${ssrRenderAttr("fill", pal.value.sand)} data-v-a898ffab></path><g${ssrRenderAttr("fill", pal.value.deepBot)} opacity="0.8" data-v-a898ffab><ellipse cx="170"${ssrRenderAttr("cy", bg.value.floor - 100)} rx="62" ry="26" data-v-a898ffab></ellipse><ellipse cx="830"${ssrRenderAttr("cy", bg.value.floor - 92)} rx="74" ry="30" data-v-a898ffab></ellipse><ellipse cx="540"${ssrRenderAttr("cy", bg.value.floor - 80)} rx="42" ry="17" data-v-a898ffab></ellipse></g><g${ssrRenderAttr("fill", pal.value.weed)} data-v-a898ffab><!--[-->`);
            ssrRenderList(unref(weeds), (w) => {
              _push2(`<g class="fsh-weed" style="${ssrRenderStyle({ "--delay": w.delay + "s" })}"${ssrRenderAttr("transform", `translate(${w.x} ${bg.value.floor - 108})`)} data-v-a898ffab><path${ssrRenderAttr("d", `M0 0 q-14 ${-w.h * 0.5} 2 ${-w.h} q14 ${w.h * 0.4} -2 0 Z`)} data-v-a898ffab></path></g>`);
            });
            _push2(`<!--]--></g><!--]-->`);
          }
          _push2(`<rect${ssrRenderAttr("x", bg.value.x)}${ssrRenderAttr("y", SURFACE_Y)}${ssrRenderAttr("width", bg.value.w)} height="180" fill="url(#fsh-blend)" data-v-a898ffab></rect><rect${ssrRenderAttr("x", bg.value.x)}${ssrRenderAttr("y", SURFACE_Y)}${ssrRenderAttr("width", bg.value.w)}${ssrRenderAttr("height", bg.value.bottom - SURFACE_Y)} fill="url(#fsh-depth)" data-v-a898ffab></rect><g class="fsh-caustics"${ssrRenderAttr("fill", pal.value.foam)} data-v-a898ffab><ellipse class="fsh-caustic c1" cx="300"${ssrRenderAttr("cy", SURFACE_Y + 150)} rx="250" ry="22" data-v-a898ffab></ellipse><ellipse class="fsh-caustic c2" cx="720"${ssrRenderAttr("cy", SURFACE_Y + 330)} rx="290" ry="26" data-v-a898ffab></ellipse><ellipse class="fsh-caustic c3" cx="430"${ssrRenderAttr("cy", SURFACE_Y + 540)} rx="230" ry="20" data-v-a898ffab></ellipse></g><!--[-->`);
          ssrRenderList(decoFish.value, (f) => {
            _push2(`<g${ssrRenderAttr("transform", `translate(${f.x} ${f.y})`)} data-v-a898ffab><circle class="fsh-prizehalo"${ssrRenderAttr("r", f.haloR)} style="${ssrRenderStyle({ animationDelay: f.haloDelay.toFixed(2) + "s" })}" fill="url(#fsh-halo)" data-v-a898ffab></circle>`);
            if (f.caught) {
              _push2(`<g class="fsh-catch-fx"${ssrRenderAttr("fill", accent.value)} data-v-a898ffab><circle class="fsh-catch-ring" r="70" fill="none"${ssrRenderAttr("stroke", accent.value)} stroke-width="4" data-v-a898ffab></circle><!--[-->`);
              ssrRenderList(8, (s) => {
                _push2(`<g${ssrRenderAttr("transform", `rotate(${s * 45}) translate(0 -76)`)} data-v-a898ffab><path class="fsh-spark" style="${ssrRenderStyle({ animationDelay: (s * 0.09).toFixed(2) + "s" })}" d="M0 -11 L3 -3 L11 0 L3 3 L0 11 L-3 3 L-11 0 L-3 -3 Z" data-v-a898ffab></path></g>`);
              });
              _push2(`<!--]--></g>`);
            } else {
              _push2(`<!---->`);
            }
            _push2(`<g${ssrRenderAttr("transform", `scale(${(f.image ? 1 : f.dir) * f.size} ${f.size})`)} data-v-a898ffab><g class="fsh-wiggle" style="${ssrRenderStyle({ animationDuration: f.wDur.toFixed(2) + "s", animationDelay: f.wDelay.toFixed(2) + "s" })}" data-v-a898ffab>`);
            if (f.image) {
              _push2(`<g${ssrRenderAttr("filter", f.caught ? "url(#fsh-catchglow)" : "url(#fsh-fishglow)")} data-v-a898ffab><image${ssrRenderAttr("href", f.image)} x="-52" y="-38" width="104" height="76" preserveAspectRatio="xMidYMid meet" data-v-a898ffab></image></g>`);
            } else {
              _push2(`<g${ssrRenderAttr("filter", f.caught ? "url(#fsh-catchglow)" : "url(#fsh-ripple-fish)")} data-v-a898ffab><ellipse cx="0" cy="0" rx="26" ry="14"${ssrRenderAttr("fill", f.color)} data-v-a898ffab></ellipse><path d="M-22 0 l-20 -13 v26 z"${ssrRenderAttr("fill", f.color)} data-v-a898ffab></path><circle cx="14" cy="-3" r="3" fill="#10202e" data-v-a898ffab></circle></g>`);
            }
            _push2(`</g></g></g>`);
          });
          _push2(`<!--]--><!--[-->`);
          ssrRenderList(unref(bubbles), (b) => {
            _push2(`<circle class="fsh-bubble"${ssrRenderAttr("cx", b.x)}${ssrRenderAttr("cy", bg.value.floor - 120)}${ssrRenderAttr("r", b.r)}${ssrRenderAttr("fill", pal.value.foam)} style="${ssrRenderStyle({ "--dur": b.dur + "s", "--delay": b.delay + "s" })}" data-v-a898ffab></circle>`);
          });
          _push2(`<!--]--><path${ssrRenderAttr("d", linePath.value)} fill="none"${ssrRenderAttr("stroke", textColor.value)} stroke-width="2" opacity="0.85" data-v-a898ffab></path><g${ssrRenderAttr("transform", `translate(${scene.hookX} ${scene.hookY})`)} data-v-a898ffab><path d="M0 0 v16 a9 9 0 1 0 9 -9" fill="none"${ssrRenderAttr("stroke", textColor.value)} stroke-width="3" stroke-linecap="round" data-v-a898ffab></path></g><g class="fsh-wave fsh-wave-back" data-v-a898ffab><path${ssrRenderAttr("d", waveBackPath.value)} fill="url(#fsh-surf-a)" data-v-a898ffab></path></g><g${ssrRenderAttr("transform", `translate(${500 + boat.x} ${boatBaseY.value}) rotate(${boat.rot}) scale(1 ${boat.sy}) translate(-500 ${boat.y})`)} data-v-a898ffab>`);
          if (boatImage.value && boatOk.value) {
            _push2(`<image${ssrRenderAttr("href", boatImage.value)} x="90" y="-150" width="820" height="385" preserveAspectRatio="xMidYMax meet" data-v-a898ffab></image>`);
          } else {
            _push2(`<g data-v-a898ffab><path d="M250 150 q250 96 500 0 l-58 104 q-190 70 -384 0 z"${ssrRenderAttr("fill", primary.value)} data-v-a898ffab></path><path d="M250 150 q250 96 500 0 l-12 22 q-238 86 -476 0 z" fill="#fff" opacity="0.22" data-v-a898ffab></path></g>`);
          }
          if (fishermanFrameUrl.value) {
            _push2(`<image${ssrRenderAttr("href", fishermanFrameUrl.value)} x="452" y="-118" width="150" height="180" preserveAspectRatio="xMidYMax meet" data-v-a898ffab></image>`);
          } else {
            _push2(`<g transform="translate(540 30)" data-v-a898ffab><rect x="-16" y="-4" width="34" height="20" rx="7" fill="#34495e" data-v-a898ffab></rect><path d="M-16 -4 q16 -14 32 0 l-5 -46 q-11 -8 -22 0 z"${ssrRenderAttr("fill", primary.value)} data-v-a898ffab></path><circle cx="0" cy="-58" r="15" fill="#e9b489" data-v-a898ffab></circle><path d="M-15 -62 a15 10 0 0 1 30 0 z" fill="#caa15e" data-v-a898ffab></path><rect x="-19" y="-63" width="38" height="5" rx="2" fill="#caa15e" data-v-a898ffab></rect></g>`);
          }
          _push2(`<g${ssrRenderAttr("transform", `rotate(${scene.rodAngle} 527 24)`)} data-v-a898ffab><line x1="527" y1="24"${ssrRenderAttr("x2", rodTipLocal.value.x)}${ssrRenderAttr("y2", rodTipLocal.value.y)} stroke="#6d4c33" stroke-width="7" stroke-linecap="round" data-v-a898ffab></line><circle${ssrRenderAttr("cx", rodTipLocal.value.x)}${ssrRenderAttr("cy", rodTipLocal.value.y)} r="4"${ssrRenderAttr("fill", accent.value)} data-v-a898ffab></circle></g></g><g class="fsh-wave fsh-wave-front" data-v-a898ffab><path${ssrRenderAttr("d", waveFrontFill.value)} fill="url(#fsh-surf-b)" data-v-a898ffab></path></g><g class="fsh-wave fsh-wave-front" data-v-a898ffab><path${ssrRenderAttr("d", waveFrontLine.value)} fill="none"${ssrRenderAttr("stroke", pal.value.foam)} stroke-width="6" stroke-linecap="round" opacity="0.6" data-v-a898ffab></path></g></svg><div class="fsh-prompt" style="${ssrRenderStyle({ color: textColor.value })}" data-v-a898ffab>${ssrInterpolate(prompt.value)}</div><div class="fsh-controls" data-v-a898ffab>`);
          if (phase.value === "ready" && mode.value !== "auto") {
            _push2(`<button class="fsh-cta fsh-cast-pulse" style="${ssrRenderStyle({ background: accent.value })}" data-v-a898ffab>CAST 🎣</button>`);
          } else if (phase.value === "result" && current.value && !current.value.win && mode.value !== "auto") {
            _push2(`<button class="fsh-cta" style="${ssrRenderStyle({ background: primary.value, color: textColor.value })}" data-v-a898ffab>${ssrInterpolate(index.value < total.value - 1 ? "Cast again →" : "Finish")}</button>`);
          } else {
            _push2(`<!---->`);
          }
          if (!__props.demoMode && phase.value !== "done") {
            _push2(`<button class="fsh-skip" data-v-a898ffab>Skip remaining</button>`);
          } else {
            _push2(`<!---->`);
          }
          _push2(`</div></div>`);
          if (showIntro.value) {
            _push2(`<div class="fsh-overlay fsh-intro" data-v-a898ffab><div class="fsh-dive-bubbles" data-v-a898ffab><!--[-->`);
            ssrRenderList(16, (n) => {
              _push2(`<span class="fsh-dive-bub" style="${ssrRenderStyle({ left: n * 61 % 100 + "%", width: 7 + n * 5 % 5 * 3 + "px", animationDelay: (-(n * 0.37 % 4)).toFixed(2) + "s", animationDuration: (2.3 + n * 7 % 10 * 0.16).toFixed(2) + "s" })}" data-v-a898ffab></span>`);
            });
            _push2(`<!--]--></div><div class="fsh-intro-card" style="${ssrRenderStyle({ "--glow": accent.value, borderColor: accent.value })}" data-v-a898ffab>`);
            if (introTitleImage.value) {
              _push2(`<img${ssrRenderAttr("src", introTitleImage.value)} class="fsh-intro-logo" alt="" data-v-a898ffab>`);
            } else {
              _push2(`<!---->`);
            }
            _push2(`<div class="fsh-intro-welcome" style="${ssrRenderStyle({ color: textColor.value })}" data-v-a898ffab>${ssrInterpolate(welcomeMsg.value)}</div><div class="fsh-intro-sub" data-v-a898ffab>${ssrInterpolate(introSubtitle.value)}</div><div class="fsh-set-label" data-v-a898ffab>Choose your settings</div><div class="fsh-chip-row" data-v-a898ffab><button class="fsh-chip" style="${ssrRenderStyle(mode.value !== "auto" ? { borderColor: accent.value, background: accent.value, color: "#06223a" } : {})}" data-v-a898ffab>🎣 Manual</button><button class="fsh-chip" style="${ssrRenderStyle(mode.value === "auto" ? { borderColor: accent.value, background: accent.value, color: "#06223a" } : {})}" data-v-a898ffab>⚡ Auto</button></div><div class="fsh-set-label" data-v-a898ffab>Speed</div><div class="fsh-chip-row" data-v-a898ffab><button class="fsh-chip" style="${ssrRenderStyle(speed.value === 1 ? { borderColor: accent.value, background: accent.value, color: "#06223a" } : {})}" data-v-a898ffab>1×</button><button class="fsh-chip" style="${ssrRenderStyle(speed.value === 1.5 ? { borderColor: accent.value, background: accent.value, color: "#06223a" } : {})}" data-v-a898ffab>1.5×</button><button class="fsh-chip" style="${ssrRenderStyle(speed.value === 2 ? { borderColor: accent.value, background: accent.value, color: "#06223a" } : {})}" data-v-a898ffab>2×</button></div><button class="fsh-cta fsh-intro-start fsh-cast-pulse" style="${ssrRenderStyle({ background: accent.value })}" data-v-a898ffab>${ssrInterpolate(introButtonText.value)}</button></div></div>`);
          } else {
            _push2(`<!---->`);
          }
          if (showPrize.value && current.value) {
            _push2(`<div class="fsh-overlay" data-v-a898ffab><div class="fsh-card" style="${ssrRenderStyle({ borderColor: accent.value })}" data-v-a898ffab><div class="fsh-card-top" style="${ssrRenderStyle({ color: accent.value })}" data-v-a898ffab>${ssrInterpolate(winText.value)}</div><div class="fsh-card-visual" data-v-a898ffab>`);
            if (current.value.image) {
              _push2(`<img${ssrRenderAttr("src", current.value.image)} alt="prize" data-v-a898ffab>`);
            } else {
              _push2(`<span data-v-a898ffab>🏆</span>`);
            }
            _push2(`</div><div class="fsh-card-name" style="${ssrRenderStyle({ color: accent.value })}" data-v-a898ffab>${ssrInterpolate(current.value.prize)}</div>`);
            if (currentValueLabel.value) {
              _push2(`<div class="fsh-card-val" style="${ssrRenderStyle({ color: textColor.value })}" data-v-a898ffab>${ssrInterpolate(currentValueLabel.value)}</div>`);
            } else {
              _push2(`<!---->`);
            }
            _push2(`<button class="fsh-cta" style="${ssrRenderStyle({ background: primary.value, color: textColor.value })}" data-v-a898ffab>${ssrInterpolate(index.value < total.value - 1 ? "Next cast →" : "Collect 🎉")}</button></div></div>`);
          } else {
            _push2(`<!---->`);
          }
          if (phase.value === "done") {
            _push2(`<div class="fsh-overlay" data-v-a898ffab><div class="fsh-card" style="${ssrRenderStyle({ borderColor: accent.value })}" data-v-a898ffab><div class="fsh-card-top" style="${ssrRenderStyle({ color: accent.value })}" data-v-a898ffab>${ssrInterpolate(wins.value.length ? "All cast!" : "All cast")}</div>`);
            if (wins.value.length) {
              _push2(`<!--[--><div class="fsh-card-name" style="${ssrRenderStyle({ color: textColor.value })}" data-v-a898ffab>You landed ${ssrInterpolate(caught.value)} ${ssrInterpolate(caught.value === 1 ? "catch" : "catches")}! 🎣</div><ul class="fsh-winlist" data-v-a898ffab><!--[-->`);
              ssrRenderList(wins.value, (w, i) => {
                _push2(`<li style="${ssrRenderStyle({ color: textColor.value })}" data-v-a898ffab><span style="${ssrRenderStyle({ color: accent.value })}" data-v-a898ffab>🐟</span> ${ssrInterpolate(w.prize)}`);
                if (w.isBundle && w.value && !/ticket/i.test(w.prize)) {
                  _push2(`<span data-v-a898ffab> — ${ssrInterpolate(Math.floor(w.value))} Free Ticket${ssrInterpolate(w.value == 1 ? "" : "s")}</span>`);
                } else if (w.value && !w.isBundle) {
                  _push2(`<span data-v-a898ffab> — £${ssrInterpolate(w.value)}</span>`);
                } else {
                  _push2(`<!---->`);
                }
                _push2(`</li>`);
              });
              _push2(`<!--]--></ul><!--]-->`);
            } else {
              _push2(`<div class="fsh-card-name" style="${ssrRenderStyle({ color: textColor.value })}" data-v-a898ffab>No catch this time — tight lines next round! 🎣</div>`);
            }
            _push2(`<button class="fsh-cta" style="${ssrRenderStyle({ background: primary.value, color: textColor.value })}" data-v-a898ffab>Close</button></div></div>`);
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
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("resources/js/Components/Games/FishingModal.vue");
  return _sfc_setup ? _sfc_setup(props, ctx) : void 0;
};
const FishingModal = /* @__PURE__ */ _export_sfc(_sfc_main, [["__scopeId", "data-v-a898ffab"]]);
export {
  FishingModal as default
};
