import { defineComponent, computed, ref, watch, onMounted, mergeProps, useSSRContext, reactive, onUnmounted } from "vue";
import { ssrRenderAttrs, ssrRenderStyle, ssrRenderAttr, ssrRenderClass, ssrInterpolate, ssrIncludeBooleanAttr, ssrRenderList, ssrRenderTeleport, ssrRenderComponent } from "vue/server-renderer";
import axios from "axios";
import { s as siteCreditLabel } from "./prizeLabel-Z9qw9N7H.js";
import { usePage } from "@inertiajs/vue3";
import { _ as _export_sfc } from "../ssr.js";
import "three";
import "@inertiajs/vue3/server";
const DECOY_ID = -1;
const _sfc_main$3 = /* @__PURE__ */ defineComponent({
  __name: "SlotsReels",
  __ssrInlineRender: true,
  props: {
    isSpinning: { type: Boolean },
    prizes: { default: () => [] },
    winningPrize: { default: null },
    demoMode: { type: Boolean, default: false },
    canSpin: { type: Boolean, default: true },
    colors: { default: () => ({
      primary: "#00CED1",
      secondary: "#1a5a7a",
      accent: "#00FFFF",
      text: "#FFFFFF"
    }) },
    lastWin: { default: 0 },
    totalFreeTickets: { default: 0 },
    spinsLeft: { default: 0 },
    spinButtonImage: { default: "" },
    titleImage: { default: "" },
    background: { default: "" },
    animateTitle: { type: Boolean, default: false },
    showMachine: { type: Boolean, default: true },
    machineBgColor: { default: "#1a5a7a" },
    inventoryEmoji: { default: "🎣" },
    inventoryButtonColor: { default: "#FFD700" },
    matchTextColor: { default: "#7FDBFF" },
    prizesModalBgColor: { default: "#1F2937" },
    prizesTitleColor: { default: "#FFD700" },
    prizesCardBorderColor: { default: "#FFD700" },
    prizesCardBgColor: { default: "#374151" },
    prizesValueColor: { default: "#10B981" },
    winGlowColor: { default: "#FFD700" },
    machineBorderColor: { default: "#00BFFF" }
  },
  emits: ["spin-complete", "spin"],
  setup(__props, { emit: __emit }) {
    const props = __props;
    function hexToRgb(hex) {
      const h = hex.replace("#", "");
      const r = parseInt(h.substring(0, 2), 16);
      const g = parseInt(h.substring(2, 4), 16);
      const b = parseInt(h.substring(4, 6), 16);
      return `${r}, ${g}, ${b}`;
    }
    const winGlowRgb = computed(() => hexToRgb(props.winGlowColor || "#FFD700"));
    const emit = __emit;
    const page = usePage();
    const reel1 = ref(null);
    const reel2 = ref(null);
    const reel3 = ref(null);
    const isAnimating = ref(false);
    const bubblesContainer = ref(null);
    const showPrizesModal = ref(false);
    const showWinReveal = ref(false);
    const showGoldFlames = ref(false);
    const currentTenant = computed(() => page.props.currentTenant || "vortex");
    let audioCtx = null;
    function initAudio() {
      if (!audioCtx) {
        audioCtx = new (window.AudioContext || window.webkitAudioContext)();
      }
    }
    function playSound(freq, dur, type = "sine", vol = 0.3) {
      if (!audioCtx) return;
      const osc = audioCtx.createOscillator();
      const gain = audioCtx.createGain();
      osc.connect(gain);
      gain.connect(audioCtx.destination);
      osc.frequency.value = freq;
      osc.type = type;
      gain.gain.setValueAtTime(vol, audioCtx.currentTime);
      gain.gain.exponentialRampToValueAtTime(0.01, audioCtx.currentTime + dur);
      osc.start();
      osc.stop(audioCtx.currentTime + dur);
    }
    function playTick() {
      playSound(300 + Math.random() * 200, 0.05, "square", 0.1);
    }
    function playStop() {
      playSound(200, 0.15, "triangle", 0.2);
    }
    const luckyFishTheme = computed(() => ({
      bg: "linear-gradient(180deg, #006994 0%, #004466 50%, #002233 100%)",
      title: "🐟 LUCKY FISH 🐟",
      machine: "linear-gradient(145deg, #1a5a7a 0%, #0d3d52 50%, #082530 100%)",
      border: props.machineBorderColor || "#00BFFF",
      reelBg: "linear-gradient(180deg, #000 0%, #0a1929 50%, #000 100%)"
    }));
    const demoEmojis = ["🍒", "🍋", "🍊", "🍉", "🍇", "🍓", "💎", "⭐", "🔔", "7️⃣", "💰", "🎰"];
    function emojiSvg(emoji) {
      return `data:image/svg+xml,${encodeURIComponent(`<svg xmlns="http://www.w3.org/2000/svg" width="100" height="100"><text x="50%" y="50%" text-anchor="middle" dominant-baseline="central" font-size="60">${emoji}</text></svg>`)}`;
    }
    const decoyPrize = {
      id: DECOY_ID,
      name: "❌",
      image: emojiSvg("❌"),
      value: 0,
      no_auto_credit: true
    };
    const decoyPrizes = computed(() => {
      var _a;
      const real = ((_a = props.prizes) == null ? void 0 : _a.length) ?? 0;
      return real > 0 && real < 3 ? [decoyPrize] : [];
    });
    const reelPool = computed(() => [...props.prizes ?? [], ...decoyPrizes.value]);
    function getRandomPrize() {
      if (!props.prizes || props.prizes.length === 0) {
        const emoji = demoEmojis[Math.floor(Math.random() * demoEmojis.length)];
        return {
          id: Math.random(),
          name: emoji,
          image: `data:image/svg+xml,${encodeURIComponent(`<svg xmlns="http://www.w3.org/2000/svg" width="100" height="100"><text x="50%" y="50%" text-anchor="middle" dominant-baseline="central" font-size="60">${emoji}</text></svg>`)}`,
          value: 0
        };
      }
      const pool = reelPool.value;
      const prize = pool[Math.floor(Math.random() * pool.length)];
      if (!prize || !prize.image || prize.image.trim() === "") {
        const emoji = demoEmojis[Math.floor(Math.random() * demoEmojis.length)];
        return {
          id: (prize == null ? void 0 : prize.id) ?? Math.random(),
          name: (prize == null ? void 0 : prize.name) ?? emoji,
          image: `data:image/svg+xml,${encodeURIComponent(`<svg xmlns="http://www.w3.org/2000/svg" width="100" height="100"><text x="50%" y="50%" text-anchor="middle" dominant-baseline="central" font-size="60">${emoji}</text></svg>`)}`,
          value: (prize == null ? void 0 : prize.value) ?? 0
        };
      }
      return prize;
    }
    async function spin() {
      if (isAnimating.value) {
        return;
      }
      initAudio();
      isAnimating.value = true;
      document.querySelectorAll(".symbol.winner").forEach((s) => s.classList.remove("winner"));
      showGoldFlames.value = false;
      let reel1Target;
      let reel2Target;
      let reel3Target;
      if (props.winningPrize) {
        reel1Target = props.winningPrize;
        reel2Target = props.winningPrize;
        reel3Target = props.winningPrize;
      } else {
        const availablePrizes = reelPool.value.length > 0 ? [...reelPool.value] : demoEmojis.map((emoji, index) => ({
          id: index,
          name: emoji,
          image: emojiSvg(emoji),
          value: 0
        }));
        const teasePrizes = props.prizes.length > 0 ? [...props.prizes] : availablePrizes;
        const rand = Math.random();
        if (rand < 0.166) {
          const matchingPrize = teasePrizes[Math.floor(Math.random() * teasePrizes.length)];
          reel1Target = matchingPrize;
          reel2Target = matchingPrize;
          const reel3Options = availablePrizes.filter((p) => p.id !== matchingPrize.id);
          reel3Target = reel3Options.length > 0 ? reel3Options[Math.floor(Math.random() * reel3Options.length)] : availablePrizes[0];
        } else if (rand < 0.332) {
          const matchingPrize = teasePrizes[Math.floor(Math.random() * teasePrizes.length)];
          reel2Target = matchingPrize;
          reel3Target = matchingPrize;
          const reel1Options = availablePrizes.filter((p) => p.id !== matchingPrize.id);
          reel1Target = reel1Options.length > 0 ? reel1Options[Math.floor(Math.random() * reel1Options.length)] : availablePrizes[0];
        } else if (rand < 0.5) {
          const matchingPrize = teasePrizes[Math.floor(Math.random() * teasePrizes.length)];
          reel1Target = matchingPrize;
          reel3Target = matchingPrize;
          const reel2Options = availablePrizes.filter((p) => p.id !== matchingPrize.id);
          reel2Target = reel2Options.length > 0 ? reel2Options[Math.floor(Math.random() * reel2Options.length)] : availablePrizes[0];
        } else if (availablePrizes.length < 3) {
          const realPrize = teasePrizes[Math.floor(Math.random() * teasePrizes.length)];
          const decoy = availablePrizes.find((p) => p.id !== realPrize.id) ?? decoyPrize;
          const realReel = Math.floor(Math.random() * 3);
          reel1Target = realReel === 0 ? realPrize : decoy;
          reel2Target = realReel === 1 ? realPrize : decoy;
          reel3Target = realReel === 2 ? realPrize : decoy;
        } else {
          reel1Target = availablePrizes[Math.floor(Math.random() * availablePrizes.length)];
          const reel2Options = availablePrizes.filter((p) => p.id !== reel1Target.id);
          reel2Target = reel2Options.length > 0 ? reel2Options[Math.floor(Math.random() * reel2Options.length)] : availablePrizes[0];
          const reel3Options = availablePrizes.filter((p) => p.id !== reel1Target.id && p.id !== reel2Target.id);
          reel3Target = reel3Options.length > 0 ? reel3Options[Math.floor(Math.random() * reel3Options.length)] : availablePrizes[Math.min(1, availablePrizes.length - 1)];
        }
      }
      const spinPromises = [
        spinReel(1, 3e3, reel1Target),
        // Stops first
        spinReel(2, 4200, reel2Target),
        // Stops second (1200ms later)
        spinReel(3, 5400, reel3Target)
        // Stops last (2400ms after first)
      ];
      await Promise.all(spinPromises);
      if (props.winningPrize) {
        showGoldFlames.value = true;
        setTimeout(() => {
          showWinReveal.value = true;
          setTimeout(() => {
            showWinReveal.value = false;
          }, 6e3);
        }, 500);
      } else {
        showGoldFlames.value = false;
      }
      isAnimating.value = false;
      try {
        const paylineMatch = (reel1Target == null ? void 0 : reel1Target.id) === (reel2Target == null ? void 0 : reel2Target.id) && (reel2Target == null ? void 0 : reel2Target.id) === (reel3Target == null ? void 0 : reel3Target.id);
        emit("spin-complete", {
          reel1: reel1Target,
          reel2: reel2Target,
          reel3: reel3Target,
          paylineMatch
        });
      } catch (e) {
        emit("spin-complete", {
          reel1: reel1Target,
          reel2: reel2Target,
          reel3: reel3Target,
          paylineMatch: false
        });
      }
    }
    const imagesPreloaded = ref(false);
    function preloadImages(prizes) {
      return Promise.all(
        prizes.map((prize) => new Promise((resolve) => {
          if (!prize.image || prize.image.startsWith("data:")) {
            resolve();
            return;
          }
          const img = new Image();
          img.onload = () => resolve();
          img.onerror = () => resolve();
          img.src = prize.image;
        }))
      );
    }
    function spinReel(reelNum, duration, targetPrize) {
      return new Promise((resolve) => {
        var _a;
        const inner = reelNum === 1 ? reel1.value : reelNum === 2 ? reel2.value : reel3.value;
        if (!inner) return resolve(getRandomPrize());
        const SYMBOL_HEIGHT = window.innerWidth <= 550 ? 75 : 100;
        const currentTransform = inner.style.transform;
        let currentY = currentTransform ? parseInt(((_a = currentTransform.match(/-?\d+/)) == null ? void 0 : _a[0]) || `-${SYMBOL_HEIGHT}`) : -SYMBOL_HEIGHT;
        const RESET_THRESHOLD = 150;
        const currentIndex = Math.abs(Math.floor(currentY / SYMBOL_HEIGHT));
        let didReset = false;
        if (currentIndex > RESET_THRESHOLD) {
          currentY = -(20 * SYMBOL_HEIGHT);
          didReset = true;
        }
        const symbolsToSpin = 19;
        const resetCurrentIndex = Math.abs(Math.floor(currentY / SYMBOL_HEIGHT));
        const targetIndex = resetCurrentIndex + 1 + symbolsToSpin;
        const existingSymbols = Array.from(inner.querySelectorAll(".symbol img"));
        const existingCount = existingSymbols.length;
        let newSymbols = [];
        let shouldReplaceHTML = false;
        if (didReset || existingCount === 0) {
          shouldReplaceHTML = true;
          const symbolsNeeded = 300;
          for (let j = 0; j < symbolsNeeded; j++) {
            newSymbols.push(getRandomPrize());
          }
        } else {
          for (let i = 0; i < existingCount; i++) {
            const img = existingSymbols[i];
            const prizeName = img.alt;
            const prize = reelPool.value.find((p) => p.name === prizeName) || getRandomPrize();
            newSymbols.push(prize);
          }
          const symbolsNeeded = Math.max(targetIndex + 100, existingCount + 30);
          for (let j = existingCount; j < symbolsNeeded; j++) {
            newSymbols.push(getRandomPrize());
          }
        }
        const RESULT_INDEX = targetIndex;
        newSymbols[RESULT_INDEX] = targetPrize;
        const resultPrize = newSymbols[RESULT_INDEX];
        inner.style.transition = "none";
        if (didReset) {
          inner.style.transform = `translateY(${currentY}px)`;
        }
        const buildSymbolHTML = (prize) => {
          const fallbackSvg = `data:image/svg+xml,${encodeURIComponent('<svg xmlns="http://www.w3.org/2000/svg" width="100" height="100"><text x="50%" y="50%" text-anchor="middle" dominant-baseline="central" font-size="60">🎰</text></svg>')}`;
          return `<div class="symbol"><img src="${prize.image}" alt="${prize.name}" onerror="this.onerror=null;this.src='${fallbackSvg}'" /></div>`;
        };
        if (shouldReplaceHTML) {
          let html = "";
          for (const prize of newSymbols) {
            html += buildSymbolHTML(prize);
          }
          inner.innerHTML = html;
        } else {
          if (RESULT_INDEX < existingCount) {
            const targetSymbolImg = existingSymbols[RESULT_INDEX];
            if (targetSymbolImg) {
              targetSymbolImg.src = targetPrize.image;
              targetSymbolImg.alt = targetPrize.name;
            }
          }
          newSymbols.length - existingCount;
          let appendHTML = "";
          for (let i = existingCount; i < newSymbols.length; i++) {
            const prize = newSymbols[i];
            appendHTML += buildSymbolHTML(prize);
          }
          inner.insertAdjacentHTML("beforeend", appendHTML);
        }
        const symbolElements = inner.querySelectorAll(".symbol");
        if (shouldReplaceHTML) {
          symbolElements.forEach((el) => {
            const symbol = el;
            symbol.style.height = `${SYMBOL_HEIGHT}px`;
            symbol.style.minHeight = `${SYMBOL_HEIGHT}px`;
            symbol.style.maxHeight = `${SYMBOL_HEIGHT}px`;
            symbol.style.width = `${SYMBOL_HEIGHT}px`;
            symbol.style.display = "block";
            symbol.style.overflow = "hidden";
            symbol.style.margin = "0";
            symbol.style.padding = "0";
            symbol.style.boxSizing = "border-box";
            symbol.style.flexShrink = "0";
          });
        } else {
          for (let i = existingCount; i < symbolElements.length; i++) {
            const symbol = symbolElements[i];
            symbol.style.height = `${SYMBOL_HEIGHT}px`;
            symbol.style.minHeight = `${SYMBOL_HEIGHT}px`;
            symbol.style.maxHeight = `${SYMBOL_HEIGHT}px`;
            symbol.style.width = `${SYMBOL_HEIGHT}px`;
            symbol.style.display = "block";
            symbol.style.overflow = "hidden";
            symbol.style.margin = "0";
            symbol.style.padding = "0";
            symbol.style.boxSizing = "border-box";
            symbol.style.flexShrink = "0";
          }
        }
        inner.offsetHeight;
        const tickInterval = setInterval(playTick, 70);
        const spinDistance = symbolsToSpin * SYMBOL_HEIGHT;
        const newPosition = currentY - spinDistance;
        inner.style.transition = `transform ${duration}ms cubic-bezier(0.33, 0.0, 0.2, 1)`;
        inner.style.transform = `translateY(${newPosition}px)`;
        setTimeout(() => {
          var _a2;
          clearInterval(tickInterval);
          playStop();
          inner.style.transition = "none";
          const symbols = inner.querySelectorAll(".symbol");
          (_a2 = symbols[RESULT_INDEX]) == null ? void 0 : _a2.classList.add("winner");
          resolve(resultPrize);
        }, duration);
      });
    }
    function createBubbles() {
      if (!bubblesContainer.value) return;
      for (let i = 0; i < 15; i++) {
        const bubble = document.createElement("div");
        bubble.className = "bubble";
        const size = 8 + Math.random() * 25;
        bubble.style.width = size + "px";
        bubble.style.height = size + "px";
        bubble.style.left = Math.random() * 100 + "%";
        bubble.style.animationDuration = 6 + Math.random() * 8 + "s";
        bubble.style.animationDelay = -Math.random() * 8 + "s";
        bubblesContainer.value.appendChild(bubble);
      }
    }
    watch(() => props.isSpinning, (newVal) => {
      if (newVal && !isAnimating.value) {
        spin();
      }
    });
    const reelsInitialized = ref(false);
    function initializeReels() {
      if (reelsInitialized.value) return;
      const SYMBOL_HEIGHT = window.innerWidth <= 550 ? 75 : 100;
      const reels = [reel1, reel2, reel3];
      for (let i = 0; i < 3; i++) {
        const inner = reels[i].value;
        if (!inner) continue;
        const fallbackSvg = `data:image/svg+xml,${encodeURIComponent('<svg xmlns="http://www.w3.org/2000/svg" width="100" height="100"><text x="50%" y="50%" text-anchor="middle" dominant-baseline="central" font-size="60">🎰</text></svg>')}`;
        let html = "";
        const initialSymbols = [];
        for (let j = 0; j < 200; j++) {
          const prize = getRandomPrize();
          html += `<div class="symbol"><img src="${prize.image}" alt="${prize.name}" onerror="this.onerror=null;this.src='${fallbackSvg}'" /></div>`;
          initialSymbols.push(prize.name);
        }
        inner.innerHTML = html;
        const symbolElements = inner.querySelectorAll(".symbol");
        symbolElements.forEach((el) => {
          const symbol = el;
          symbol.style.height = `${SYMBOL_HEIGHT}px`;
          symbol.style.minHeight = `${SYMBOL_HEIGHT}px`;
          symbol.style.maxHeight = `${SYMBOL_HEIGHT}px`;
          symbol.style.width = `${SYMBOL_HEIGHT}px`;
          symbol.style.display = "block";
          symbol.style.overflow = "hidden";
          symbol.style.margin = "0";
          symbol.style.padding = "0";
          symbol.style.boxSizing = "border-box";
          symbol.style.flexShrink = "0";
        });
        inner.style.transform = `translateY(-${SYMBOL_HEIGHT}px)`;
      }
      reelsInitialized.value = true;
    }
    watch(() => props.showMachine, async (newVal) => {
      if (newVal && !reelsInitialized.value) {
        if (!imagesPreloaded.value) {
          imagesPreloaded.value = false;
          await preloadImages(props.prizes);
          imagesPreloaded.value = true;
        }
        setTimeout(() => {
          initializeReels();
        }, 100);
      }
    });
    watch(() => props.prizes, async (newPrizes, oldPrizes) => {
      if (newPrizes) {
        imagesPreloaded.value = false;
        await preloadImages(newPrizes);
        imagesPreloaded.value = true;
        if (props.showMachine && newPrizes.length > 0) {
          if (!oldPrizes || oldPrizes.length === 0 || oldPrizes.length !== newPrizes.length) {
            reelsInitialized.value = false;
            setTimeout(() => initializeReels(), 100);
          }
        }
      }
    });
    onMounted(async () => {
      createBubbles();
      imagesPreloaded.value = false;
      await preloadImages(props.prizes);
      imagesPreloaded.value = true;
      if (props.showMachine) {
        initializeReels();
      }
    });
    return (_ctx, _push, _parent, _attrs) => {
      _push(`<div${ssrRenderAttrs(mergeProps({
        class: ["slots-container", { "slots-container-demo": __props.demoMode }],
        style: {
          background: __props.background ? `url(${__props.background}) center/cover no-repeat` : luckyFishTheme.value.bg,
          "--win-glow": __props.winGlowColor,
          "--win-glow-rgb": winGlowRgb.value,
          "--machine-border": __props.machineBorderColor
        }
      }, _attrs))} data-v-dcbeafff>`);
      if (!__props.background) {
        _push(`<div class="bubbles" data-v-dcbeafff></div>`);
      } else {
        _push(`<!---->`);
      }
      if (!__props.background) {
        _push(`<div class="swimming-fish" style="${ssrRenderStyle({ "top": "15%", "animation-duration": "25s" })}" data-v-dcbeafff>🐠</div>`);
      } else {
        _push(`<!---->`);
      }
      if (!__props.background) {
        _push(`<div class="swimming-fish" style="${ssrRenderStyle({ "top": "75%", "animation-duration": "30s", "animation-delay": "-10s" })}" data-v-dcbeafff>🐟</div>`);
      } else {
        _push(`<!---->`);
      }
      if (!__props.background) {
        _push(`<div class="swimming-fish" style="${ssrRenderStyle({ "top": "45%", "animation-duration": "35s", "animation-delay": "-20s", "font-size": "35px" })}" data-v-dcbeafff>🦈</div>`);
      } else {
        _push(`<!---->`);
      }
      if (!__props.showMachine) {
        _push(`<div class="title title-floating-only" data-v-dcbeafff>`);
        if (__props.titleImage) {
          _push(`<img${ssrRenderAttr("src", __props.titleImage)} alt="Game Title" class="${ssrRenderClass(["title-image", { "title-zoom-animation": __props.animateTitle }])}" data-v-dcbeafff>`);
        } else {
          _push(`<h1 style="${ssrRenderStyle({ color: luckyFishTheme.value.border })}" class="${ssrRenderClass({ "title-zoom-animation": __props.animateTitle })}" data-v-dcbeafff>${ssrInterpolate(luckyFishTheme.value.title)}</h1>`);
        }
        _push(`<p style="${ssrRenderStyle({ color: __props.matchTextColor })}" data-v-dcbeafff>Match 3 in a row to win!</p></div>`);
      } else {
        _push(`<!---->`);
      }
      if (__props.showMachine) {
        _push(`<div class="${ssrRenderClass([{ "slot-machine-win": showGoldFlames.value, "slot-machine-demo": __props.demoMode }, "slot-machine"])}" style="${ssrRenderStyle({ background: __props.machineBgColor, border: `5px solid ${luckyFishTheme.value.border}` })}" data-v-dcbeafff><div class="title" data-v-dcbeafff>`);
        if (__props.titleImage) {
          _push(`<img${ssrRenderAttr("src", __props.titleImage)} alt="Game Title" class="title-image" data-v-dcbeafff>`);
        } else {
          _push(`<h1 style="${ssrRenderStyle({ color: luckyFishTheme.value.border })}" data-v-dcbeafff>${ssrInterpolate(luckyFishTheme.value.title)}</h1>`);
        }
        _push(`<p style="${ssrRenderStyle({ color: __props.matchTextColor })}" data-v-dcbeafff>Match 3 in a row to win!</p></div>`);
        if (__props.showMachine) {
          _push(`<div data-v-dcbeafff><div class="balance-bar" data-v-dcbeafff><div class="balance-box" data-v-dcbeafff><div class="label" data-v-dcbeafff>Spins Left</div><div class="value" data-v-dcbeafff>${ssrInterpolate(__props.spinsLeft)}</div></div><div class="balance-box" data-v-dcbeafff><div class="label" data-v-dcbeafff>Total Win</div><div class="value win-value" data-v-dcbeafff>${ssrInterpolate(__props.lastWin.toFixed(2))}</div>`);
          if (__props.totalFreeTickets > 0) {
            _push(`<div class="value free-tickets-value" data-v-dcbeafff>🎟️ +${ssrInterpolate(__props.totalFreeTickets)}</div>`);
          } else {
            _push(`<!---->`);
          }
          _push(`</div><button class="chest-btn" title="View all prizes" style="${ssrRenderStyle({ background: `linear-gradient(180deg, ${__props.inventoryButtonColor} 0%, ${__props.inventoryButtonColor}dd 100%)` })}" data-v-dcbeafff>`);
          if (currentTenant.value === "auwins") {
            _push(`<span style="${ssrRenderStyle({ "display": "block", "font-size": "0.5rem", "font-weight": "900", "letter-spacing": "0.05em", "text-transform": "uppercase", "color": "#000", "margin-bottom": "2px", "line-height": "1" })}" data-v-dcbeafff> Instant Wins </span>`);
          } else {
            _push(`<!---->`);
          }
          _push(` ${ssrInterpolate(__props.inventoryEmoji)}</button></div></div>`);
        } else {
          _push(`<!---->`);
        }
        _push(`<div class="slot-window" style="${ssrRenderStyle({
          background: luckyFishTheme.value.reelBg,
          border: `4px solid ${luckyFishTheme.value.border}`,
          opacity: __props.showMachine ? 1 : 0,
          transform: __props.showMachine ? "scale(1)" : "scale(0.95)",
          transition: "opacity 0.8s ease, transform 0.8s ease",
          pointerEvents: __props.showMachine ? "auto" : "none"
        })}" data-v-dcbeafff><div class="payline-indicator" data-v-dcbeafff></div><div class="${ssrRenderClass([{ "reels-spinning": isAnimating.value, "reels-winning": showGoldFlames.value }, "reels-container"])}" data-v-dcbeafff><div class="${ssrRenderClass([{ "reel-winning": showGoldFlames.value }, "reel"])}" data-v-dcbeafff><div class="reel-inner" data-v-dcbeafff></div></div><div class="${ssrRenderClass([{ "reel-winning": showGoldFlames.value }, "reel"])}" data-v-dcbeafff><div class="reel-inner" data-v-dcbeafff></div></div><div class="${ssrRenderClass([{ "reel-winning": showGoldFlames.value }, "reel"])}" data-v-dcbeafff><div class="reel-inner" data-v-dcbeafff></div></div></div></div>`);
        if (__props.showMachine) {
          _push(`<div data-v-dcbeafff><div class="controls" data-v-dcbeafff><button${ssrIncludeBooleanAttr(!__props.canSpin || isAnimating.value || !imagesPreloaded.value) ? " disabled" : ""} class="${ssrRenderClass([{ "spin-btn-image": __props.spinButtonImage, "btn-spinning": isAnimating.value }, "spin-btn spin-btn-full"])}" style="${ssrRenderStyle({
            background: isAnimating.value ? "linear-gradient(180deg, #555 0%, #333 100%)" : !imagesPreloaded.value ? "linear-gradient(180deg, #555 0%, #333 100%)" : `linear-gradient(180deg, ${__props.colors.primary} 0%, ${__props.colors.secondary} 50%, #006666 100%)`,
            borderColor: luckyFishTheme.value.border
          })}" data-v-dcbeafff>`);
          if (__props.spinButtonImage && imagesPreloaded.value) {
            _push(`<img${ssrRenderAttr("src", __props.spinButtonImage)} alt="Spin" class="spin-btn-img" data-v-dcbeafff>`);
          } else {
            _push(`<span data-v-dcbeafff>${ssrInterpolate(isAnimating.value ? "🌊 SPINNING... 🌊" : !imagesPreloaded.value ? "⏳ LOADING..." : "🌊 SPIN 🌊")}</span>`);
          }
          _push(`</button></div></div>`);
        } else {
          _push(`<!---->`);
        }
        _push(`</div>`);
      } else {
        _push(`<!---->`);
      }
      if (showPrizesModal.value) {
        _push(`<div class="modal-overlay" data-v-dcbeafff><div class="modal-content" style="${ssrRenderStyle({
          background: `linear-gradient(180deg, ${__props.prizesModalBgColor} 0%, ${__props.prizesModalBgColor}dd 100%)`,
          border: `4px solid ${__props.prizesCardBorderColor}`,
          boxShadow: `0 0 50px ${__props.prizesCardBorderColor}80, 0 20px 60px rgba(0,0,0,0.8)`
        })}" data-v-dcbeafff><button class="modal-close" data-v-dcbeafff>✕</button><h2 class="modal-title" style="${ssrRenderStyle({
          color: __props.prizesTitleColor,
          textShadow: `0 0 20px ${__props.prizesTitleColor}80`
        })}" data-v-dcbeafff>${ssrInterpolate(__props.inventoryEmoji)} Available Prizes ${ssrInterpolate(__props.inventoryEmoji)}</h2><div class="prizes-grid" data-v-dcbeafff><!--[-->`);
        ssrRenderList(__props.prizes, (prize) => {
          _push(`<div class="prize-card" style="${ssrRenderStyle({
            background: `${__props.prizesCardBgColor}cc`,
            border: `3px solid ${__props.prizesCardBorderColor}99`
          })}" data-v-dcbeafff><img${ssrRenderAttr("src", prize.image)}${ssrRenderAttr("alt", prize.name)} class="prize-image" data-v-dcbeafff><div class="prize-name" data-v-dcbeafff>${ssrInterpolate(prize.no_auto_credit ? prize.category_name || prize.name : prize.name)}</div><div class="prize-value" style="${ssrRenderStyle({ color: __props.prizesValueColor })}" data-v-dcbeafff>`);
          if (prize.no_auto_credit) {
            _push(`<!--[-->${ssrInterpolate(prize.name)}<!--]-->`);
          } else {
            _push(`<!--[-->£${ssrInterpolate(prize.value)}<!--]-->`);
          }
          _push(`</div></div>`);
        });
        _push(`<!--]--></div></div></div>`);
      } else {
        _push(`<!---->`);
      }
      if (showWinReveal.value && __props.winningPrize) {
        _push(`<div class="win-reveal-overlay" data-v-dcbeafff><div class="win-reveal-content" data-v-dcbeafff><div class="reels-merge" data-v-dcbeafff><div class="merge-reel merge-reel-1" data-v-dcbeafff></div><div class="merge-reel merge-reel-2" data-v-dcbeafff></div><div class="merge-reel merge-reel-3" data-v-dcbeafff></div></div><div class="prize-reveal" data-v-dcbeafff><div class="win-text" data-v-dcbeafff>🎉 YOU WON! 🎉</div><div class="prize-image-container" data-v-dcbeafff><img${ssrRenderAttr("src", __props.winningPrize.image)}${ssrRenderAttr("alt", __props.winningPrize.name)} class="prize-reveal-image" data-v-dcbeafff></div><div class="prize-reveal-name" data-v-dcbeafff>${ssrInterpolate(__props.winningPrize.name)}</div>`);
        if (!__props.winningPrize.no_auto_credit) {
          _push(`<div class="prize-reveal-value" data-v-dcbeafff>£${ssrInterpolate(__props.winningPrize.value)}</div>`);
        } else {
          _push(`<!---->`);
        }
        _push(`</div><div class="explosion-particles" data-v-dcbeafff><!--[-->`);
        ssrRenderList(20, (i) => {
          _push(`<div class="particle" style="${ssrRenderStyle({ "--angle": i * 18 + "deg" })}" data-v-dcbeafff>💥</div>`);
        });
        _push(`<!--]--></div></div></div>`);
      } else {
        _push(`<!---->`);
      }
      _push(`</div>`);
    };
  }
});
const _sfc_setup$3 = _sfc_main$3.setup;
_sfc_main$3.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("resources/js/Components/Games/SlotsReels.vue");
  return _sfc_setup$3 ? _sfc_setup$3(props, ctx) : void 0;
};
const SlotsReels = /* @__PURE__ */ _export_sfc(_sfc_main$3, [["__scopeId", "data-v-dcbeafff"]]);
const _sfc_main$2 = /* @__PURE__ */ defineComponent({
  __name: "SlotsInventoryModal",
  __ssrInlineRender: true,
  props: {
    modelValue: { type: Boolean },
    wonPrizes: { default: () => [] },
    availablePrizes: { default: () => [] },
    slotsAssets: { default: () => ({
      inventoryEmoji: "🎣",
      prizesModalBgColor: "#1F2937",
      prizesTitleColor: "#FFD700",
      prizesCardBorderColor: "#FFD700",
      prizesCardBgColor: "#374151",
      prizesValueColor: "#10B981"
    }) }
  },
  emits: ["update:modelValue"],
  setup(__props, { emit: __emit }) {
    const props = __props;
    const totalWonValue = computed(() => {
      return props.wonPrizes.reduce((sum, prize) => sum + prize.value, 0);
    });
    const formattedTotalValue = computed(() => {
      return `£${totalWonValue.value.toLocaleString()}`;
    });
    const modalBgColor = computed(() => props.slotsAssets.prizesModalBgColor || "#1F2937");
    const titleColor = computed(() => props.slotsAssets.prizesTitleColor || "#FFD700");
    const cardBorderColor = computed(() => props.slotsAssets.prizesCardBorderColor || "#FFD700");
    const cardBgColor = computed(() => props.slotsAssets.prizesCardBgColor || "#374151");
    const valueColor = computed(() => props.slotsAssets.prizesValueColor || "#10B981");
    const emoji = computed(() => props.slotsAssets.inventoryEmoji || "🎣");
    const containerStyle = computed(() => ({
      background: `linear-gradient(to bottom right, ${modalBgColor.value}, ${modalBgColor.value}DD, ${modalBgColor.value})`,
      borderColor: `${cardBorderColor.value}80`,
      boxShadow: `0 0 40px ${cardBorderColor.value}4D`
    }));
    const titleDividerStyle = computed(() => ({
      background: `linear-gradient(to right, transparent, ${titleColor.value}80, transparent)`
    }));
    const titleTextStyle = computed(() => ({
      color: titleColor.value,
      fontFamily: "Impact, sans-serif",
      textShadow: `0 0 10px ${titleColor.value}`
    }));
    const prizeCardStyle = computed(() => ({
      background: `linear-gradient(to bottom right, ${cardBgColor.value}DD, ${cardBgColor.value}, ${cardBgColor.value}DD)`,
      borderColor: cardBorderColor.value
    }));
    const valueTextStyle = computed(() => ({
      color: valueColor.value,
      fontFamily: "Impact, sans-serif",
      textShadow: `0 0 8px ${valueColor.value}`
    }));
    const contentStyle = computed(() => ({
      backgroundColor: `${modalBgColor.value}DD`
    }));
    const headerStyle = computed(() => ({
      background: `linear-gradient(to right, ${cardBorderColor.value}40, ${modalBgColor.value}40, ${cardBorderColor.value}40)`,
      borderColor: `${cardBorderColor.value}30`
    }));
    const footerStyle = computed(() => ({
      background: `linear-gradient(to right, ${cardBorderColor.value}40, ${modalBgColor.value}40, ${cardBorderColor.value}40)`,
      borderColor: `${cardBorderColor.value}30`
    }));
    const scanningLineStyle = computed(() => ({
      background: `linear-gradient(to right, transparent, ${cardBorderColor.value}, transparent)`
    }));
    return (_ctx, _push, _parent, _attrs) => {
      ssrRenderTeleport(_push, (_push2) => {
        if (__props.modelValue) {
          _push2(`<div class="fixed inset-0 z-[80] flex items-center justify-center p-4" style="${ssrRenderStyle({ backgroundColor: `${modalBgColor.value}1A` })}" data-v-ece98b8b><div class="relative w-full max-w-4xl max-h-[90vh] rounded-xl border-2 shadow-2xl overflow-hidden" style="${ssrRenderStyle(containerStyle.value)}" data-v-ece98b8b><div class="absolute top-0 left-0 right-0 h-px animate-scan-horizontal" style="${ssrRenderStyle(scanningLineStyle.value)}" data-v-ece98b8b></div><div class="relative border-b-2 px-6 py-4" style="${ssrRenderStyle(headerStyle.value)}" data-v-ece98b8b><div class="flex items-center justify-between" data-v-ece98b8b><div class="flex items-center gap-3" data-v-ece98b8b><div class="text-3xl animate-pulse" data-v-ece98b8b>${ssrInterpolate(emoji.value)}</div><div data-v-ece98b8b><h2 class="text-2xl font-black uppercase tracking-wider" style="${ssrRenderStyle({
            color: titleColor.value,
            fontFamily: "Impact, sans-serif",
            textShadow: `0 0 15px ${titleColor.value}, 2px 2px 0 ${modalBgColor.value}`
          })}" data-v-ece98b8b> PRIZE INVENTORY </h2><p class="text-xs uppercase tracking-widest" style="${ssrRenderStyle({
            color: titleColor.value,
            fontFamily: "Courier New, monospace",
            textShadow: `0 0 5px ${titleColor.value}`
          })}" data-v-ece98b8b> YOUR WINS &amp; AVAILABLE PRIZES </p></div></div><button class="rounded-full w-10 h-10 flex items-center justify-center transition-all duration-300 border-2 group" style="${ssrRenderStyle({
            backgroundColor: `${cardBgColor.value}80`,
            borderColor: `${cardBorderColor.value}30`,
            color: titleColor.value
          })}" aria-label="Close inventory" data-v-ece98b8b><span class="text-xl group-hover:rotate-90 transition-transform duration-300" data-v-ece98b8b>✕</span></button></div>`);
          if (__props.wonPrizes.length > 0) {
            _push2(`<div class="mt-3 border rounded-lg px-4 py-2 flex items-center justify-between" style="${ssrRenderStyle({
              background: `linear-gradient(to right, ${cardBgColor.value}66, ${cardBgColor.value}99, ${cardBgColor.value}66)`,
              borderColor: `${cardBorderColor.value}80`
            })}" data-v-ece98b8b><span class="text-sm font-bold uppercase tracking-wider" style="${ssrRenderStyle({
              color: titleColor.value,
              fontFamily: "Courier New, monospace",
              textShadow: `0 0 8px ${titleColor.value}`
            })}" data-v-ece98b8b> 💰 TOTAL WINNINGS </span><span class="text-xl font-black" style="${ssrRenderStyle({
              color: valueColor.value,
              fontFamily: "Impact, sans-serif",
              textShadow: `0 0 12px ${valueColor.value}, 2px 2px 0 ${valueColor.value}DD`
            })}" data-v-ece98b8b>${ssrInterpolate(formattedTotalValue.value)}</span></div>`);
          } else {
            _push2(`<!---->`);
          }
          _push2(`</div><div class="relative overflow-y-auto max-h-[calc(90vh-200px)] px-6 py-4 custom-scrollbar" style="${ssrRenderStyle(contentStyle.value)}" data-v-ece98b8b>`);
          if (__props.wonPrizes.length > 0) {
            _push2(`<div class="mb-6" data-v-ece98b8b><div class="flex items-center gap-2 mb-3" data-v-ece98b8b><div class="h-px flex-1" style="${ssrRenderStyle(titleDividerStyle.value)}" data-v-ece98b8b></div><h3 class="text-lg font-black uppercase tracking-wider flex items-center gap-2" style="${ssrRenderStyle(titleTextStyle.value)}" data-v-ece98b8b><span class="text-2xl" data-v-ece98b8b>${ssrInterpolate(emoji.value)}</span> YOUR WINS (${ssrInterpolate(__props.wonPrizes.length)}) <span class="text-2xl" data-v-ece98b8b>${ssrInterpolate(emoji.value)}</span></h3><div class="h-px flex-1" style="${ssrRenderStyle(titleDividerStyle.value)}" data-v-ece98b8b></div></div><div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4" data-v-ece98b8b><!--[-->`);
            ssrRenderList(__props.wonPrizes, (prize) => {
              _push2(`<div class="group relative border-2 rounded-lg overflow-hidden hover:shadow-lg transition-all duration-300" style="${ssrRenderStyle(prizeCardStyle.value)}" data-v-ece98b8b><div class="absolute top-2 right-2 z-10 text-xs font-black px-2 py-1 rounded-full uppercase tracking-wider animate-pulse" style="${ssrRenderStyle({
                backgroundColor: valueColor.value,
                color: "#FFFFFF"
              })}" data-v-ece98b8b> ✓ WON </div>`);
              if (prize.ticketNumber) {
                _push2(`<div class="absolute top-2 left-2 z-10 text-xs font-black px-2 py-1 rounded border-2 uppercase tracking-wider" style="${ssrRenderStyle({
                  backgroundColor: `${cardBorderColor.value}E6`,
                  color: "#FFFFFF",
                  borderColor: cardBorderColor.value,
                  fontFamily: "Courier New, monospace"
                })}" data-v-ece98b8b> 🎫 ${ssrInterpolate(prize.ticketNumber)}</div>`);
              } else {
                _push2(`<!---->`);
              }
              _push2(`<div class="relative h-40 overflow-hidden" style="${ssrRenderStyle({ backgroundColor: `${cardBgColor.value}66` })}" data-v-ece98b8b>`);
              if (prize.image) {
                _push2(`<img${ssrRenderAttr("src", prize.image)}${ssrRenderAttr("alt", prize.name)} class="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500" data-v-ece98b8b>`);
              } else {
                _push2(`<div class="w-full h-full flex items-center justify-center" style="${ssrRenderStyle({
                  background: `linear-gradient(to bottom right, ${cardBgColor.value}, ${cardBgColor.value}DD)`
                })}" data-v-ece98b8b><span class="text-xs font-bold uppercase text-center px-2" style="${ssrRenderStyle({ color: "#FFFFFF" })}" data-v-ece98b8b>${ssrInterpolate(prize.name)}</span></div>`);
              }
              _push2(`<div class="absolute inset-0" style="${ssrRenderStyle({
                background: `linear-gradient(to top, ${cardBgColor.value}CC, transparent, transparent)`
              })}" data-v-ece98b8b></div></div><div class="p-3" data-v-ece98b8b><h4 class="font-bold text-sm mb-1 line-clamp-2" style="${ssrRenderStyle({ color: "#FFFFFF" })}" data-v-ece98b8b>${ssrInterpolate(prize.name)}</h4>`);
              if (prize.description) {
                _push2(`<p class="text-xs mb-2 line-clamp-1" style="${ssrRenderStyle({ color: "#FFFFFF99" })}" data-v-ece98b8b>${ssrInterpolate(prize.description)}</p>`);
              } else {
                _push2(`<!---->`);
              }
              _push2(`<div class="flex items-center justify-between" data-v-ece98b8b><span class="text-xs font-bold uppercase tracking-wider" style="${ssrRenderStyle({
                color: titleColor.value,
                fontFamily: "Courier New, monospace",
                textShadow: `0 0 5px ${titleColor.value}`
              })}" data-v-ece98b8b> Value </span>`);
              if (!prize.no_auto_credit) {
                _push2(`<span class="font-black text-lg" style="${ssrRenderStyle(valueTextStyle.value)}" data-v-ece98b8b> £${ssrInterpolate(prize.value.toLocaleString())}</span>`);
              } else {
                _push2(`<span class="font-black text-lg" style="${ssrRenderStyle(valueTextStyle.value)}" data-v-ece98b8b>${ssrInterpolate(prize.name)}</span>`);
              }
              _push2(`</div></div><div style="${ssrRenderStyle({
                backgroundColor: `${cardBorderColor.value}00`
              })}" class="${ssrRenderClass([{ "group-hover:bg-opacity-10": true }, "absolute inset-0 transition-all duration-300 pointer-events-none"])}" data-v-ece98b8b></div></div>`);
            });
            _push2(`<!--]--></div></div>`);
          } else {
            _push2(`<!---->`);
          }
          _push2(`<div class="${ssrRenderClass(__props.wonPrizes.length > 0 ? "" : "mt-0")}" data-v-ece98b8b><div class="flex items-center gap-2 mb-3" data-v-ece98b8b><div class="h-px flex-1" style="${ssrRenderStyle(titleDividerStyle.value)}" data-v-ece98b8b></div><h3 class="text-lg font-black uppercase tracking-wider flex items-center gap-2" style="${ssrRenderStyle(titleTextStyle.value)}" data-v-ece98b8b><span class="text-2xl" data-v-ece98b8b>${ssrInterpolate(emoji.value)}</span> AVAILABLE PRIZES (${ssrInterpolate(__props.availablePrizes.length)}) <span class="text-2xl" data-v-ece98b8b>${ssrInterpolate(emoji.value)}</span></h3><div class="h-px flex-1" style="${ssrRenderStyle(titleDividerStyle.value)}" data-v-ece98b8b></div></div><div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4" data-v-ece98b8b><!--[-->`);
          ssrRenderList(__props.availablePrizes, (prize) => {
            _push2(`<div class="group relative border-2 rounded-lg overflow-hidden hover:shadow-lg transition-all duration-300" style="${ssrRenderStyle(prizeCardStyle.value)}" data-v-ece98b8b><div class="relative h-40 overflow-hidden" style="${ssrRenderStyle({ backgroundColor: `${cardBgColor.value}66` })}" data-v-ece98b8b>`);
            if (prize.image) {
              _push2(`<img${ssrRenderAttr("src", prize.image)}${ssrRenderAttr("alt", prize.name)} class="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500 opacity-80 group-hover:opacity-100" data-v-ece98b8b>`);
            } else {
              _push2(`<div class="w-full h-full flex items-center justify-center" style="${ssrRenderStyle({
                background: `linear-gradient(to bottom right, ${cardBgColor.value}, ${cardBgColor.value}DD)`
              })}" data-v-ece98b8b><span class="text-xs font-bold uppercase text-center px-2" style="${ssrRenderStyle({ color: "#FFFFFF" })}" data-v-ece98b8b>${ssrInterpolate(prize.name)}</span></div>`);
            }
            _push2(`<div class="absolute inset-0" style="${ssrRenderStyle({
              background: `linear-gradient(to top, ${cardBgColor.value}CC, transparent, transparent)`
            })}" data-v-ece98b8b></div></div><div class="p-3" data-v-ece98b8b><h4 class="font-bold text-sm mb-1 line-clamp-2" style="${ssrRenderStyle({ color: "#FFFFFF" })}" data-v-ece98b8b>${ssrInterpolate(prize.name)}</h4>`);
            if (prize.description) {
              _push2(`<p class="text-xs mb-2 line-clamp-1" style="${ssrRenderStyle({ color: "#FFFFFF99" })}" data-v-ece98b8b>${ssrInterpolate(prize.description)}</p>`);
            } else {
              _push2(`<!---->`);
            }
            _push2(`<div class="flex items-center justify-between" data-v-ece98b8b><span class="text-xs font-bold uppercase tracking-wider" style="${ssrRenderStyle({
              color: titleColor.value,
              fontFamily: "Courier New, monospace",
              textShadow: `0 0 5px ${titleColor.value}`
            })}" data-v-ece98b8b> Value </span><span class="font-black text-lg" style="${ssrRenderStyle(valueTextStyle.value)}" data-v-ece98b8b>${ssrInterpolate(prize.no_auto_credit ? "Up to " : "")}£${ssrInterpolate(prize.value.toLocaleString())}</span></div></div><div style="${ssrRenderStyle({
              backgroundColor: `${cardBorderColor.value}00`
            })}" class="${ssrRenderClass([{ "group-hover:bg-opacity-10": true }, "absolute inset-0 transition-all duration-300 pointer-events-none"])}" data-v-ece98b8b></div></div>`);
          });
          _push2(`<!--]--></div></div></div><div class="relative border-t-2 px-6 py-3" style="${ssrRenderStyle(footerStyle.value)}" data-v-ece98b8b><div class="flex items-center justify-between" data-v-ece98b8b><p class="text-xs uppercase tracking-widest" style="${ssrRenderStyle({
            color: titleColor.value,
            fontFamily: "Courier New, monospace",
            textShadow: `0 0 5px ${titleColor.value}`
          })}" data-v-ece98b8b>${ssrInterpolate(emoji.value)} KEEP SPINNING TO WIN MORE PRIZES! </p><button class="px-4 py-2 font-bold text-sm uppercase tracking-wider rounded border-2 transition-all duration-300 shadow-lg" style="${ssrRenderStyle({
            background: `linear-gradient(to right, ${cardBorderColor.value}, ${cardBorderColor.value}DD)`,
            color: "#FFFFFF",
            borderColor: `${cardBorderColor.value}80`,
            fontFamily: "Impact, sans-serif",
            boxShadow: `0 0 15px ${cardBorderColor.value}66`
          })}" data-v-ece98b8b> CLOSE </button></div></div></div></div>`);
        } else {
          _push2(`<!---->`);
        }
      }, "body", false, _parent);
    };
  }
});
const _sfc_setup$2 = _sfc_main$2.setup;
_sfc_main$2.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("resources/js/Components/Games/SlotsInventoryModal.vue");
  return _sfc_setup$2 ? _sfc_setup$2(props, ctx) : void 0;
};
const SlotsInventoryModal = /* @__PURE__ */ _export_sfc(_sfc_main$2, [["__scopeId", "data-v-ece98b8b"]]);
const _sfc_main$1 = /* @__PURE__ */ defineComponent({
  __name: "SlotsGame",
  __ssrInlineRender: true,
  props: {
    demoMode: { type: Boolean },
    previewMode: {},
    slotsAssets: {},
    tickets: {},
    playedTickets: {},
    instant_win_categories: {},
    animateTitle: { type: Boolean },
    showMachine: { type: Boolean }
  },
  emits: ["ticket-played", "prize-won"],
  setup(__props, { emit: __emit }) {
    const props = __props;
    const emit = __emit;
    const isSpinning = ref(false);
    const winCounter = ref(0);
    const showInventory = ref(false);
    const availablePrizes = ref([]);
    const wonPrizes = ref([]);
    const currentWinningPrize = ref(null);
    const lastWin = ref(0);
    const totalFreeTickets = ref(0);
    const spinSound = ref(null);
    const winSound = ref(null);
    const lossSound = ref(null);
    let audioCtx = null;
    function initAudio() {
      if (!audioCtx) {
        audioCtx = new (window.AudioContext || window.webkitAudioContext)();
      }
    }
    function playWin() {
      initAudio();
      if (!audioCtx) return;
      const notes = [523, 659, 784, 1047];
      notes.forEach((freq, i) => {
        setTimeout(() => {
          const osc = audioCtx.createOscillator();
          const gain = audioCtx.createGain();
          osc.connect(gain);
          gain.connect(audioCtx.destination);
          osc.frequency.value = freq;
          osc.type = "sine";
          gain.gain.setValueAtTime(0.3, audioCtx.currentTime);
          gain.gain.exponentialRampToValueAtTime(0.01, audioCtx.currentTime + 0.3);
          osc.start();
          osc.stop(audioCtx.currentTime + 0.3);
        }, i * 100);
      });
    }
    function playBigWin() {
      initAudio();
      if (!audioCtx) return;
      const notes = [523, 587, 659, 784, 880, 988, 1047, 1319];
      notes.forEach((freq, i) => {
        setTimeout(() => {
          const osc = audioCtx.createOscillator();
          const gain = audioCtx.createGain();
          osc.connect(gain);
          gain.connect(audioCtx.destination);
          osc.frequency.value = freq;
          osc.type = "sine";
          gain.gain.setValueAtTime(0.35, audioCtx.currentTime);
          gain.gain.exponentialRampToValueAtTime(0.01, audioCtx.currentTime + 0.35);
          osc.start();
          osc.stop(audioCtx.currentTime + 0.35);
        }, i * 80);
      });
    }
    const spinsLeft = computed(() => {
      var _a;
      if (props.demoMode) {
        return 9;
      }
      if (!props.tickets) {
        return 0;
      }
      return props.tickets.length - (((_a = props.playedTickets) == null ? void 0 : _a.length) || 0);
    });
    const jackpot = computed(() => {
      if (props.demoMode) {
        return { value: 1e4, name: "MEGA JACKPOT" };
      }
      if (availablePrizes.value.length === 0) {
        return { value: 0, name: "NO PRIZE" };
      }
      const highestPrize = availablePrizes.value.reduce(
        (max, prize) => prize.value > max.value ? prize : max
      );
      return { value: highestPrize.value, name: highestPrize.name };
    });
    const canSpin = computed(() => spinsLeft.value > 0 && !isSpinning.value);
    computed(() => {
      if (props.demoMode) {
        return "DEMO";
      }
      const nextTicket = getNextTicket();
      return nextTicket ? nextTicket.number : null;
    });
    const isMobile = computed(() => props.previewMode === "mobile");
    computed(() => ({
      color: props.slotsAssets.titleColor,
      textShadow: `0 0 10px ${props.slotsAssets.titleColor}, 0 0 20px ${props.slotsAssets.titleColor}`
    }));
    computed(() => {
      const baseClasses = "font-black uppercase tracking-widest drop-shadow-lg text-center";
      return isMobile.value ? `${baseClasses} text-2xl` : `${baseClasses} text-4xl animate-pulse`;
    });
    const extractPrizesFromTickets = () => {
      if (props.instant_win_categories && props.instant_win_categories.length > 0) {
        return props.instant_win_categories.map((cat, index) => {
          const isBundle = cat.prize_type === "ticket_bundle";
          console.log(`[Slots] category id=${cat.id} name=${cat.name} prize_type=${cat.prize_type} isBundle=${isBundle}`);
          return {
            id: cat.id,
            name: isBundle ? `${Math.floor(cat.value)} Free Ticket${cat.value !== 1 ? "s" : ""}` : siteCreditLabel(cat.prize_type, cat.value) ?? cat.name,
            category_name: cat.name,
            image: cat.image_path && cat.image_path.trim() !== "" ? cat.image_path : `data:image/svg+xml,...`,
            value: isBundle ? 0 : cat.value,
            no_auto_credit: cat.no_auto_credit || isBundle,
            is_ticket_bundle: isBundle
          };
        });
      }
      if (!props.tickets || props.tickets.length === 0) {
        return generateDemoPrizes();
      }
      const uniquePrizes = /* @__PURE__ */ new Map();
      props.tickets.forEach((ticket) => {
        if (ticket.instant_win && ticket.instant_win !== false) {
          const instantWin = ticket.instant_win;
          const categoryId = instantWin.category_id;
          if (categoryId && !uniquePrizes.has(categoryId)) {
            uniquePrizes.set(categoryId, {
              id: categoryId,
              name: siteCreditLabel(instantWin.prize_type, instantWin.value) ?? (instantWin.name || instantWin.prize),
              image: instantWin.image_path || "",
              value: parseFloat(String(instantWin.value)) || 0
            });
          }
        }
      });
      const prizesArray = Array.from(uniquePrizes.values());
      const prizesWithImages = prizesArray.filter((p) => p.image && p.image.trim() !== "");
      if (prizesWithImages.length > 0) {
        return prizesWithImages;
      }
      if (prizesArray.length > 0) {
        const emojiList2 = ["🍒", "🍋", "🍊", "🍉", "🍇", "🍓", "💎", "⭐", "🔔", "7️⃣", "💰", "🎰"];
        return prizesArray.map((prize, index) => ({
          ...prize,
          image: `data:image/svg+xml,${encodeURIComponent(`<svg xmlns="http://www.w3.org/2000/svg" width="100" height="100"><text x="50%" y="50%" text-anchor="middle" dominant-baseline="central" font-size="60">${emojiList2[index % emojiList2.length]}</text></svg>`)}`
        }));
      }
      return generateDemoPrizes();
    };
    const generateDemoPrizes = () => {
      const emojiPrizes = [
        { emoji: "💎", name: "Diamond", value: 1e3 },
        { emoji: "🍒", name: "Cherry", value: 100 },
        { emoji: "⭐", name: "Star", value: 250 },
        { emoji: "7️⃣", name: "Lucky Seven", value: 777 },
        { emoji: "🔔", name: "Bell", value: 300 },
        { emoji: "🍋", name: "Lemon", value: 150 },
        { emoji: "🍊", name: "Orange", value: 200 },
        { emoji: "🍉", name: "Watermelon", value: 350 },
        { emoji: "🍇", name: "Grapes", value: 180 },
        { emoji: "💰", name: "Money Bag", value: 500 },
        { emoji: "🎰", name: "Jackpot", value: 5e3 },
        { emoji: "🍓", name: "Strawberry", value: 220 }
      ];
      return emojiPrizes.map((prize, index) => ({
        id: index + 1,
        name: prize.name,
        // Use SVG data URL to render emoji as image
        image: `data:image/svg+xml,${encodeURIComponent(`<svg xmlns="http://www.w3.org/2000/svg" width="100" height="100"><text x="50%" y="50%" text-anchor="middle" dominant-baseline="central" font-size="60">${prize.emoji}</text></svg>`)}`,
        value: prize.value
      }));
    };
    const getNextTicket = () => {
      if (!props.tickets || props.demoMode) {
        return null;
      }
      const playedIds = props.playedTickets || [];
      const unplayedTickets = props.tickets.filter((ticket) => !playedIds.includes(ticket.id));
      return unplayedTickets.length > 0 ? unplayedTickets[0] : null;
    };
    const handleSpin = () => {
      if (!canSpin.value || isSpinning.value) {
        return;
      }
      isSpinning.value = true;
      currentWinningPrize.value = null;
      if (spinSound.value) {
        spinSound.value.currentTime = 0;
        spinSound.value.play().catch(() => {
        });
      }
      const currentTicket = getNextTicket();
      if (props.demoMode) {
        const isWinner = Math.random() > 0.5;
        if (isWinner) {
          const demoPrizes = generateDemoPrizes();
          const randomPrize = demoPrizes[Math.floor(Math.random() * demoPrizes.length)];
          currentWinningPrize.value = randomPrize;
        }
      } else if (currentTicket) {
        currentWinningPrize.value = resolveWinningPrize(currentTicket);
        emit("ticket-played", currentTicket.id);
      } else {
        isSpinning.value = false;
        return;
      }
    };
    function resolveWinningPrize(ticket) {
      var _a;
      const instantWinData = ticket.instant_win;
      const hasInstantWin = instantWinData !== false && instantWinData !== null;
      const prizeText = hasInstantWin ? instantWinData.prize : null;
      const isWinner = hasInstantWin && prizeText !== "NO WIN";
      if (!isWinner || !hasInstantWin) return null;
      const instantWin = instantWinData;
      const isNoAutoCredit = instantWin.category_id && ((_a = props.instant_win_categories) == null ? void 0 : _a.length) ? props.instant_win_categories.some((c) => c.id === instantWin.category_id && c.no_auto_credit) : false;
      let matchingPrize = availablePrizes.value.find(
        (p) => p.id === instantWin.category_id
      );
      if (!matchingPrize) {
        matchingPrize = {
          id: instantWin.category_id || instantWin.id,
          name: instantWin.prize || "Winner!",
          image: instantWin.image_path || "",
          value: parseFloat(String(instantWin.value)) || 0,
          no_auto_credit: isNoAutoCredit
        };
      } else {
        matchingPrize = {
          ...matchingPrize,
          no_auto_credit: isNoAutoCredit
        };
      }
      const isTicketBundle = instantWin.prize_type === "ticket_bundle";
      if (isTicketBundle) {
        matchingPrize = {
          ...matchingPrize,
          value: 0,
          is_ticket_bundle: true,
          no_auto_credit: true
        };
      }
      const scLabel = siteCreditLabel(instantWin.prize_type, matchingPrize.value ?? instantWin.value);
      if (scLabel) matchingPrize = { ...matchingPrize, name: scLabel };
      return matchingPrize;
    }
    const handleSpinComplete = (payload) => {
      var _a, _b, _c, _d, _e, _f, _g;
      const playedIds = props.playedTickets || [];
      const lastPlayedTicketId = playedIds[playedIds.length - 1];
      const lastTicket = (_a = props.tickets) == null ? void 0 : _a.find((t) => t.id === lastPlayedTicketId);
      try {
        if (!props.demoMode && payload && lastTicket) {
          axios.post("/api/games/slot-spin-log", {
            competition_id: lastTicket.competition_id,
            ticket_id: lastTicket.id,
            ticket_number: String(lastTicket.number ?? ""),
            reel1_prize_id: ((_b = payload.reel1) == null ? void 0 : _b.id) ?? null,
            reel2_prize_id: ((_c = payload.reel2) == null ? void 0 : _c.id) ?? null,
            reel3_prize_id: ((_d = payload.reel3) == null ? void 0 : _d.id) ?? null,
            reel1_image: ((_e = payload.reel1) == null ? void 0 : _e.image) ?? null,
            reel2_image: ((_f = payload.reel2) == null ? void 0 : _f.image) ?? null,
            reel3_image: ((_g = payload.reel3) == null ? void 0 : _g.image) ?? null,
            client_payline_match: !!payload.paylineMatch,
            spun_at: (/* @__PURE__ */ new Date()).toISOString()
          }).catch(() => {
          });
        }
      } catch (e) {
      }
      if (currentWinningPrize.value) {
        const ticketNumber = (lastTicket == null ? void 0 : lastTicket.number) || "UNKNOWN";
        const winAmount = currentWinningPrize.value.value;
        lastWin.value = Math.round((lastWin.value + winAmount) * 100) / 100;
        if (currentWinningPrize.value.is_ticket_bundle && lastTicket) {
          const iw = lastTicket.instant_win;
          totalFreeTickets.value += Math.floor(parseFloat(String(iw.value)) || 0);
        }
        const prizeWithTicket = {
          ...currentWinningPrize.value,
          ticketNumber
        };
        wonPrizes.value.push(prizeWithTicket);
        winCounter.value++;
        emit("prize-won", currentWinningPrize.value);
        if (winSound.value && props.slotsAssets.winSound) {
          winSound.value.currentTime = 0;
          winSound.value.play().catch(() => {
          });
        } else if (winAmount >= 100) {
          playBigWin();
        } else {
          playWin();
        }
        setTimeout(() => {
          highlightWinners();
        }, 100);
      } else {
        if (lossSound.value && props.slotsAssets.lossSound) {
          lossSound.value.currentTime = 0;
          lossSound.value.play().catch(() => {
          });
        }
      }
      isSpinning.value = false;
      if (currentWinningPrize.value) {
        setTimeout(() => {
          currentWinningPrize.value = null;
        }, 6e3);
      }
    };
    function highlightWinners() {
      for (let i = 1; i <= 3; i++) {
        const reel = document.querySelector(`#reel${i} .reel-inner`);
        if (reel) {
          const symbols = reel.querySelectorAll(".symbol");
          if (symbols[1]) {
            symbols[1].classList.add("winner");
          }
        }
      }
    }
    watch(() => props.tickets, () => {
      if (props.tickets && props.tickets.length > 0) {
        availablePrizes.value = extractPrizesFromTickets();
      }
    }, { immediate: true });
    onMounted(() => {
    });
    return (_ctx, _push, _parent, _attrs) => {
      _push(`<div${ssrRenderAttrs(mergeProps({
        class: ["flex-1 flex flex-col relative", __props.demoMode ? "" : "overflow-hidden"]
      }, _attrs))} data-v-0885d6fc>`);
      _push(ssrRenderComponent(SlotsReels, {
        isSpinning: isSpinning.value,
        prizes: availablePrizes.value,
        winningPrize: currentWinningPrize.value,
        demoMode: props.demoMode,
        canSpin: canSpin.value,
        colors: {
          primary: "#00CED1",
          secondary: "#1a5a7a",
          accent: "#00FFFF",
          text: "#FFFFFF"
        },
        spinsLeft: spinsLeft.value,
        lastWin: lastWin.value,
        totalFreeTickets: totalFreeTickets.value,
        spinButtonImage: __props.slotsAssets.spinButtonImage,
        titleImage: __props.slotsAssets.titleImage,
        background: __props.slotsAssets.background,
        animateTitle: props.animateTitle,
        showMachine: props.showMachine,
        machineBgColor: __props.slotsAssets.machineBgColor,
        inventoryEmoji: __props.slotsAssets.inventoryEmoji,
        inventoryButtonColor: __props.slotsAssets.inventoryButtonColor,
        matchTextColor: __props.slotsAssets.matchTextColor,
        prizesModalBgColor: __props.slotsAssets.prizesModalBgColor,
        prizesTitleColor: __props.slotsAssets.prizesTitleColor,
        prizesCardBorderColor: __props.slotsAssets.prizesCardBorderColor,
        prizesCardBgColor: __props.slotsAssets.prizesCardBgColor,
        prizesValueColor: __props.slotsAssets.prizesValueColor,
        winGlowColor: __props.slotsAssets.winGlowColor,
        machineBorderColor: __props.slotsAssets.machineBorderColor,
        onSpinComplete: handleSpinComplete,
        onSpin: handleSpin
      }, null, _parent));
      if (!__props.demoMode && spinsLeft.value > 0) {
        _push(`<button class="slots-reveal-all-btn" style="${ssrRenderStyle({ color: __props.slotsAssets.primaryColor, borderColor: __props.slotsAssets.primaryColor })}" data-v-0885d6fc> Reveal All </button>`);
      } else {
        _push(`<!---->`);
      }
      _push(`<div class="hidden absolute bottom-0 left-0 right-0 z-20 border-t-4 px-4 py-4 shadow-2xl" style="${ssrRenderStyle({
        background: "linear-gradient(to top, rgba(101, 67, 33, 0.95), rgba(101, 67, 33, 0.85), transparent)",
        borderColor: "#DAA520",
        boxShadow: "0 -10px 40px rgba(218,165,32,0.4), inset 0 2px 10px rgba(255,255,255,0.1)"
      })}" data-v-0885d6fc><div class="max-w-4xl mx-auto flex items-center justify-between gap-4" data-v-0885d6fc><div class="flex flex-col items-center transform transition-all duration-300 hover:scale-110" data-v-0885d6fc><span class="text-xs sm:text-sm font-bold uppercase tracking-wide" style="${ssrRenderStyle({ color: "#DAA520" })}" data-v-0885d6fc>Spins</span><span class="text-2xl sm:text-3xl font-black transition-all duration-300" style="${ssrRenderStyle({
        color: __props.slotsAssets.primaryColor,
        textShadow: `0 0 20px ${__props.slotsAssets.primaryColor}, 0 4px 12px ${__props.slotsAssets.primaryColor}60`
      })}" data-v-0885d6fc>${ssrInterpolate(spinsLeft.value)}</span></div><div class="flex flex-col items-center transform transition-all duration-300 hover:scale-110" data-v-0885d6fc><span class="text-xs sm:text-sm font-bold uppercase tracking-wide" style="${ssrRenderStyle({ color: "#DAA520" })}" data-v-0885d6fc>Wins</span><span class="text-2xl sm:text-3xl font-black transition-all duration-300" style="${ssrRenderStyle({
        color: __props.slotsAssets.accentColor,
        textShadow: `0 0 20px ${__props.slotsAssets.accentColor}, 0 4px 12px ${__props.slotsAssets.accentColor}60`
      })}" data-v-0885d6fc>${ssrInterpolate(winCounter.value)}</span></div><div class="flex flex-col items-center flex-1 relative overflow-hidden rounded-lg p-2 transform transition-all duration-300 hover:scale-105" data-v-0885d6fc><span class="text-xs sm:text-sm font-bold uppercase tracking-wide" style="${ssrRenderStyle({ color: "#DAA520" })}" data-v-0885d6fc>Top Prize</span><span class="text-xl sm:text-2xl font-black relative z-10" style="${ssrRenderStyle({
        background: `linear-gradient(135deg, ${__props.slotsAssets.primaryColor}, ${__props.slotsAssets.accentColor}, ${__props.slotsAssets.primaryColor})`,
        backgroundSize: "200% 100%",
        WebkitBackgroundClip: "text",
        WebkitTextFillColor: "transparent",
        animation: "shimmer 3s ease-in-out infinite"
      })}" data-v-0885d6fc> £${ssrInterpolate(jackpot.value.value.toLocaleString())}</span></div><button class="relative flex flex-col items-center justify-center px-4 py-2 rounded-xl transition-all duration-300 hover:scale-110 active:scale-95 shadow-lg" style="${ssrRenderStyle({
        background: `linear-gradient(135deg, ${__props.slotsAssets.primaryColor}30, ${__props.slotsAssets.accentColor}30)`,
        color: __props.slotsAssets.primaryColor,
        border: `2px solid ${__props.slotsAssets.primaryColor}`,
        boxShadow: `0 0 20px ${__props.slotsAssets.primaryColor}40`
      })}" data-v-0885d6fc>`);
      if (wonPrizes.value.length > 0) {
        _push(`<span class="absolute -top-2 -right-2 w-6 h-6 rounded-full flex items-center justify-center text-xs font-black text-white shadow-lg" style="${ssrRenderStyle({
          background: `linear-gradient(135deg, ${__props.slotsAssets.accentColor}, ${__props.slotsAssets.primaryColor})`
        })}" data-v-0885d6fc>${ssrInterpolate(wonPrizes.value.length)}</span>`);
      } else {
        _push(`<!---->`);
      }
      _push(`<svg class="w-6 h-6 sm:w-7 sm:h-7" fill="none" stroke="currentColor" viewBox="0 0 24 24" data-v-0885d6fc><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2.5" d="M20 7l-8-4-8 4m16 0l-8 4m8-4v10l-8 4m0-10L4 7m8 4v10M4 7v10l8 4" data-v-0885d6fc></path></svg><span class="text-xs font-black mt-1" data-v-0885d6fc>PRIZES</span></button></div></div>`);
      _push(ssrRenderComponent(SlotsInventoryModal, {
        modelValue: showInventory.value,
        "onUpdate:modelValue": ($event) => showInventory.value = $event,
        wonPrizes: wonPrizes.value,
        availablePrizes: availablePrizes.value,
        slotsAssets: __props.slotsAssets
      }, null, _parent));
      if (__props.slotsAssets.spinSound) {
        _push(`<audio${ssrRenderAttr("src", __props.slotsAssets.spinSound)} preload="auto" data-v-0885d6fc></audio>`);
      } else {
        _push(`<!---->`);
      }
      if (__props.slotsAssets.winSound) {
        _push(`<audio${ssrRenderAttr("src", __props.slotsAssets.winSound)} preload="auto" data-v-0885d6fc></audio>`);
      } else {
        _push(`<!---->`);
      }
      if (__props.slotsAssets.lossSound) {
        _push(`<audio${ssrRenderAttr("src", __props.slotsAssets.lossSound)} preload="auto" data-v-0885d6fc></audio>`);
      } else {
        _push(`<!---->`);
      }
      _push(`</div>`);
    };
  }
});
const _sfc_setup$1 = _sfc_main$1.setup;
_sfc_main$1.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("resources/js/Components/Games/SlotsGame.vue");
  return _sfc_setup$1 ? _sfc_setup$1(props, ctx) : void 0;
};
const SlotsGame = /* @__PURE__ */ _export_sfc(_sfc_main$1, [["__scopeId", "data-v-0885d6fc"]]);
const _sfc_main = /* @__PURE__ */ defineComponent({
  __name: "SlotsModal",
  __ssrInlineRender: true,
  props: {
    modelValue: { type: Boolean },
    demoMode: { type: Boolean, default: false },
    assets: {},
    tickets: {},
    previewMode: { default: "mobile" },
    instant_win_categories: {}
  },
  emits: ["update:modelValue"],
  setup(__props, { emit: __emit }) {
    const props = __props;
    const emit = __emit;
    const demoPreviewMode = ref("mobile");
    const playedTickets = ref([]);
    const welcomeAudio = ref(null);
    const introVideoRef = ref(null);
    const showSlotsGame = ref(true);
    const showSlotsMachine = ref(props.demoMode);
    const hasIntroVideo = computed(() => {
      if (!props.assets.background) return false;
      const videoExtensions = [".mp4", ".webm", ".ogg", ".mov"];
      const isVideo = videoExtensions.some((ext) => props.assets.background.toLowerCase().endsWith(ext));
      return isVideo;
    });
    const slotsAssets = reactive({
      titleText: props.assets.titleText || "🐟 LUCKY FISH 🐟",
      titleColor: props.assets.titleColor || "#00FFFF",
      titleImage: props.assets.titleImage || "",
      spinButtonImage: props.assets.spinButtonImage || "",
      machineImage: props.assets.machineImage || "",
      footerImage: props.assets.footerImage || "",
      background: "",
      // Will be set by watcher
      header: props.assets.header || "",
      primaryColor: props.assets.primaryColor || "#00CED1",
      secondaryColor: props.assets.secondaryColor || "#1a5a7a",
      accentColor: props.assets.accentColor || "#00FFFF",
      textColor: props.assets.textColor || "#FFFFFF",
      theme: props.assets.theme || "underwater",
      welcomeSound: props.assets.welcomeSound || "",
      spinSound: props.assets.spinSound || "",
      winSound: props.assets.winSound || "",
      lossSound: props.assets.lossSound || "",
      machineBgColor: props.assets.machineBgColor || "#1a5a7a",
      inventoryEmoji: props.assets.inventoryEmoji || "🎣",
      inventoryButtonColor: props.assets.inventoryButtonColor || "#FFD700",
      matchTextColor: props.assets.matchTextColor || "#7FDBFF",
      prizesModalBgColor: props.assets.prizesModalBgColor || "#1F2937",
      prizesTitleColor: props.assets.prizesTitleColor || "#FFD700",
      prizesCardBorderColor: props.assets.prizesCardBorderColor || "#FFD700",
      prizesCardBgColor: props.assets.prizesCardBgColor || "#374151",
      prizesValueColor: props.assets.prizesValueColor || "#10B981",
      winGlowColor: props.assets.winGlowColor || "#FFD700",
      machineBorderColor: props.assets.machineBorderColor || "#00BFFF"
    });
    const isMobileDevice = computed(() => {
      if (typeof window === "undefined") {
        return false;
      }
      return window.innerWidth < 768;
    });
    const actualPreviewMode = computed(() => {
      return props.demoMode ? demoPreviewMode.value : props.previewMode || (isMobileDevice.value ? "mobile" : "desktop");
    });
    const modalStyle = computed(() => {
      if (!props.demoMode) {
        return { width: "100vw", height: "100vh" };
      }
      return actualPreviewMode.value === "mobile" ? {
        width: "420px",
        height: "650px",
        border: "1px solid #444",
        borderRadius: "12px"
      } : {
        width: "700px",
        height: "650px",
        border: "1px solid #444",
        borderRadius: "4px"
      };
    });
    const containerClasses = computed(() => {
      return ["relative", props.demoMode ? "shadow-lg overflow-hidden" : "w-full h-full overflow-hidden"];
    });
    watch(
      () => props.assets.titleText,
      (newVal) => {
        slotsAssets.titleText = newVal || "SPIN THE SLOTS!";
      },
      { immediate: true }
    );
    watch(
      () => props.assets.titleColor,
      (newVal) => {
        slotsAssets.titleColor = newVal || "#FFD700";
      },
      { immediate: true }
    );
    watch(
      () => props.assets.machineImage,
      (newVal) => {
        slotsAssets.machineImage = newVal || "";
      },
      { immediate: true }
    );
    watch(
      () => props.assets.footerImage,
      (newVal) => {
        slotsAssets.footerImage = newVal || "";
      },
      { immediate: true }
    );
    watch(
      () => props.assets.background,
      (newVal) => {
        slotsAssets.background = newVal || "";
      },
      { immediate: true }
    );
    watch(
      () => props.assets.header,
      (newVal) => {
        slotsAssets.header = newVal || "";
      },
      { immediate: true }
    );
    watch(
      () => props.assets.primaryColor,
      (newVal) => {
        slotsAssets.primaryColor = newVal || "#F59E0B";
      },
      { immediate: true }
    );
    watch(
      () => props.assets.secondaryColor,
      (newVal) => {
        slotsAssets.secondaryColor = newVal || "#1F2937";
      },
      { immediate: true }
    );
    watch(
      () => props.assets.accentColor,
      (newVal) => {
        slotsAssets.accentColor = newVal || "#EF4444";
      },
      { immediate: true }
    );
    watch(
      () => props.assets.textColor,
      (newVal) => {
        slotsAssets.textColor = newVal || "#FFFFFF";
      },
      { immediate: true }
    );
    watch(
      () => props.assets.titleImage,
      (newVal) => {
        slotsAssets.titleImage = newVal || "";
      },
      { immediate: true }
    );
    watch(
      () => props.assets.spinButtonImage,
      (newVal) => {
        slotsAssets.spinButtonImage = newVal || "";
      },
      { immediate: true }
    );
    watch(
      () => props.assets.welcomeSound,
      (newVal) => {
        slotsAssets.welcomeSound = newVal || "";
      },
      { immediate: true }
    );
    watch(
      () => props.assets.spinSound,
      (newVal) => {
        slotsAssets.spinSound = newVal || "";
      },
      { immediate: true }
    );
    watch(
      () => props.assets.winSound,
      (newVal) => {
        slotsAssets.winSound = newVal || "";
      },
      { immediate: true }
    );
    watch(
      () => props.assets.lossSound,
      (newVal) => {
        slotsAssets.lossSound = newVal || "";
      },
      { immediate: true }
    );
    watch(
      () => props.assets.theme,
      (newVal) => {
        slotsAssets.theme = newVal || "underwater";
      },
      { immediate: true }
    );
    watch(
      () => props.assets.machineBgColor,
      (newVal) => {
        slotsAssets.machineBgColor = newVal || "#1a5a7a";
      },
      { immediate: true }
    );
    watch(
      () => props.assets.inventoryEmoji,
      (newVal) => {
        slotsAssets.inventoryEmoji = newVal || "🎣";
      },
      { immediate: true }
    );
    watch(
      () => props.assets.inventoryButtonColor,
      (newVal) => {
        slotsAssets.inventoryButtonColor = newVal || "#FFD700";
      },
      { immediate: true }
    );
    watch(
      () => props.assets.matchTextColor,
      (newVal) => {
        slotsAssets.matchTextColor = newVal || "#7FDBFF";
      },
      { immediate: true }
    );
    watch(
      () => props.assets.prizesModalBgColor,
      (newVal) => {
        slotsAssets.prizesModalBgColor = newVal || "#1F2937";
      },
      { immediate: true }
    );
    watch(
      () => props.assets.prizesTitleColor,
      (newVal) => {
        slotsAssets.prizesTitleColor = newVal || "#FFD700";
      },
      { immediate: true }
    );
    watch(
      () => props.assets.prizesCardBorderColor,
      (newVal) => {
        slotsAssets.prizesCardBorderColor = newVal || "#FFD700";
      },
      { immediate: true }
    );
    watch(
      () => props.assets.prizesCardBgColor,
      (newVal) => {
        slotsAssets.prizesCardBgColor = newVal || "#374151";
      },
      { immediate: true }
    );
    watch(
      () => props.assets.prizesValueColor,
      (newVal) => {
        slotsAssets.prizesValueColor = newVal || "#10B981";
      },
      { immediate: true }
    );
    watch(
      () => props.assets.winGlowColor,
      (newVal) => {
        slotsAssets.winGlowColor = newVal || "#FFD700";
      },
      { immediate: true }
    );
    watch(
      () => props.assets.machineBorderColor,
      (newVal) => {
        slotsAssets.machineBorderColor = newVal || "#00BFFF";
      },
      { immediate: true }
    );
    watch(
      () => props.tickets,
      () => {
        playedTickets.value = [];
      }
    );
    watch(
      () => props.modelValue,
      async (newVal) => {
        if (newVal) {
          if (props.demoMode) {
            showSlotsGame.value = true;
            showSlotsMachine.value = true;
          } else if (hasIntroVideo.value) {
            showSlotsGame.value = true;
            showSlotsMachine.value = false;
            await new Promise((resolve) => setTimeout(resolve, 100));
            if (introVideoRef.value) {
              setTimeout(() => {
                if (introVideoRef.value) {
                  introVideoRef.value.pause();
                  showSlotsMachine.value = true;
                }
              }, 5e3);
            }
          } else {
            showSlotsGame.value = true;
            showSlotsMachine.value = true;
          }
          if (slotsAssets.welcomeSound && !props.demoMode) {
            await new Promise((resolve) => setTimeout(resolve, 100));
            if (welcomeAudio.value) {
              try {
                welcomeAudio.value.load();
                welcomeAudio.value.currentTime = 0;
                await welcomeAudio.value.play();
              } catch (e) {
              }
            }
          }
        } else {
          if (introVideoRef.value) {
            introVideoRef.value.currentTime = 0;
            introVideoRef.value.pause();
          }
          showSlotsGame.value = true;
          showSlotsMachine.value = !hasIntroVideo.value;
        }
      }
    );
    const onPrizeWon = () => {
    };
    const close = () => {
      if (!props.demoMode) {
        emit("update:modelValue", false);
      }
    };
    const onEsc = (e) => {
      if (e.key === "Escape" && !props.demoMode) {
        close();
      }
    };
    const onTicketPlayed = (ticketId) => {
      if (!playedTickets.value.includes(ticketId)) {
        playedTickets.value.push(ticketId);
      }
    };
    onMounted(() => window.addEventListener("keydown", onEsc));
    onUnmounted(() => window.removeEventListener("keydown", onEsc));
    return (_ctx, _push, _parent, _attrs) => {
      ssrRenderTeleport(_push, (_push2) => {
        if (__props.modelValue) {
          _push2(`<div class="${ssrRenderClass([
            "z-[9999] flex flex-col items-center justify-center",
            __props.demoMode ? "relative max-w-full max-h-[80vh] mx-auto" : "fixed inset-0"
          ])}" style="${ssrRenderStyle({
            background: __props.demoMode ? "transparent" : "rgba(0, 0, 0, 0.5)",
            backdropFilter: __props.demoMode ? "none" : "blur(8px)"
          })}" data-v-1e24670f>`);
          if (__props.demoMode) {
            _push2(`<div class="mb-4 flex items-center space-x-3 bg-gray-800 rounded-lg p-2" data-v-1e24670f><span class="text-white text-sm font-medium" data-v-1e24670f>Preview Mode:</span><button class="${ssrRenderClass([
              "px-3 py-1 rounded text-sm font-medium transition-colors",
              actualPreviewMode.value === "mobile" ? "bg-blue-500 text-white" : "bg-gray-600 text-gray-300 hover:bg-gray-500"
            ])}" data-v-1e24670f> 📱 Mobile </button><button class="${ssrRenderClass([
              "px-3 py-1 rounded text-sm font-medium transition-colors",
              actualPreviewMode.value === "desktop" ? "bg-blue-500 text-white" : "bg-gray-600 text-gray-300 hover:bg-gray-500"
            ])}" data-v-1e24670f> 💻 Desktop </button></div>`);
          } else {
            _push2(`<!---->`);
          }
          _push2(`<div class="${ssrRenderClass([containerClasses.value, { "demo-mode": __props.demoMode }, "modal-zoom-in"])}" style="${ssrRenderStyle(modalStyle.value)}" data-v-1e24670f>`);
          if (__props.demoMode) {
            _push2(`<!--[-->`);
            if (actualPreviewMode.value === "mobile") {
              _push2(`<div class="h-8 bg-black flex items-center justify-between px-4 text-white text-sm" data-v-1e24670f><span data-v-1e24670f>9:41</span><div class="flex space-x-1" data-v-1e24670f><div class="w-4 h-2 border border-white rounded-sm" data-v-1e24670f></div><div class="w-1 h-2 bg-white rounded-sm" data-v-1e24670f></div></div></div>`);
            } else {
              _push2(`<!---->`);
            }
            if (actualPreviewMode.value === "desktop") {
              _push2(`<div class="h-10 bg-gray-700 flex items-center justify-between px-4 text-white text-sm border-b border-gray-600" data-v-1e24670f><div class="flex items-center space-x-2" data-v-1e24670f><div class="flex space-x-1" data-v-1e24670f><div class="w-3 h-3 bg-red-500 rounded-full" data-v-1e24670f></div><div class="w-3 h-3 bg-yellow-500 rounded-full" data-v-1e24670f></div><div class="w-3 h-3 bg-green-500 rounded-full" data-v-1e24670f></div></div><span class="ml-4 text-gray-300" data-v-1e24670f>🎰 Slots Game - Spin to Win</span></div><div class="text-gray-400 text-xs" data-v-1e24670f>Chrome</div></div>`);
            } else {
              _push2(`<!---->`);
            }
            _push2(`<!--]-->`);
          } else {
            _push2(`<!---->`);
          }
          if (!__props.demoMode) {
            _push2(`<button class="absolute top-4 right-4 text-gray-700 bg-white/90 hover:bg-white rounded-full w-10 h-10 flex items-center justify-center focus:outline-none text-2xl z-50 shadow-lg transition-all duration-200 hover:scale-110" aria-label="Close modal" data-v-1e24670f> ✕ </button>`);
          } else {
            _push2(`<!---->`);
          }
          if (hasIntroVideo.value) {
            _push2(`<div class="video-background" style="${ssrRenderStyle({ zIndex: 0 })}" data-v-1e24670f><video class="intro-video" playsinline autoplay muted preload="auto"${ssrRenderAttr("src", props.assets.background)} data-v-1e24670f></video></div>`);
          } else {
            _push2(`<!---->`);
          }
          if (showSlotsGame.value) {
            _push2(`<div class="${ssrRenderClass(["flex flex-col relative slots-game-wrapper overflow-hidden", __props.demoMode ? "flex-1" : "h-full"])}" style="${ssrRenderStyle({ zIndex: 1 })}" data-v-1e24670f>`);
            _push2(ssrRenderComponent(SlotsGame, {
              slotsAssets,
              demoMode: __props.demoMode,
              previewMode: actualPreviewMode.value,
              tickets: __props.tickets,
              playedTickets: playedTickets.value,
              instant_win_categories: __props.instant_win_categories,
              animateTitle: hasIntroVideo.value,
              showMachine: showSlotsMachine.value,
              onTicketPlayed,
              onPrizeWon
            }, null, _parent));
            _push2(`</div>`);
          } else {
            _push2(`<!---->`);
          }
          _push2(`</div>`);
          if (__props.demoMode) {
            _push2(`<div class="mt-2 text-center text-gray-400 text-xs" data-v-1e24670f>${ssrInterpolate(actualPreviewMode.value === "mobile" ? "📱 Mobile Preview (420x650)" : "💻 Desktop Preview (700x650)")}</div>`);
          } else {
            _push2(`<!---->`);
          }
          if (slotsAssets.welcomeSound) {
            _push2(`<audio${ssrRenderAttr("src", slotsAssets.welcomeSound)} preload="auto" data-v-1e24670f></audio>`);
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
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("resources/js/Components/Games/SlotsModal.vue");
  return _sfc_setup ? _sfc_setup(props, ctx) : void 0;
};
const SlotsModal = /* @__PURE__ */ _export_sfc(_sfc_main, [["__scopeId", "data-v-1e24670f"]]);
export {
  SlotsModal as default
};
