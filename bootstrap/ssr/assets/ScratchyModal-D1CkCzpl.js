import { defineComponent, computed, ref, onMounted, watch, onUnmounted, resolveComponent, mergeProps, withCtx, createTextVNode, toDisplayString, nextTick as nextTick$1, useSSRContext, unref, createVNode, createBlock, openBlock, Fragment, renderList } from "vue";
import { ssrRenderAttrs, ssrRenderStyle, ssrInterpolate, ssrRenderComponent, ssrRenderClass, ssrRenderList, ssrRenderTeleport, ssrRenderAttr, ssrIncludeBooleanAttr } from "vue/server-renderer";
import { f as formatMoney, c as creditWord } from "./prizeLabel-Z9qw9N7H.js";
import { _ as _export_sfc } from "../ssr.js";
import { Swiper, SwiperSlide } from "swiper/vue";
import { Pagination, Autoplay, Navigation } from "swiper/modules";
import "@inertiajs/vue3";
import "three";
import "axios";
import "@inertiajs/vue3/server";
const SCRATCH_DISPLAY_LIMIT = 150;
const SCRATCH_SHOW_MORE_BATCH = 500;
const SINGLE_CANVAS_ID = -1;
const CELL_SIZE = 10;
const EXPAND_BATCH_SIZE = 50;
const _sfc_main$1 = /* @__PURE__ */ defineComponent({
  __name: "ScratchyGame",
  __ssrInlineRender: true,
  props: {
    assets: {},
    tickets: {},
    instant_win_categories: {}
  },
  emits: ["wins-collected"],
  setup(__props, { emit: __emit }) {
    const props = __props;
    const emit = __emit;
    const layout = computed(() => props.assets.scratchyLayout || "single");
    const currentIndex = ref(0);
    computed(() => props.assets.textColour || "#eeeeee");
    const wonTextColour = computed(() => props.assets.wonTextColour || "#ffffff");
    const loseTextColour = computed(() => props.assets.loseTextColour || "#000000");
    const cardBg = computed(() => props.assets.scratchyCardBg || "transparent");
    const cardBorder = computed(() => props.assets.scratchyCardBorder || "transparent");
    const titleText = computed(() => props.assets.scratchyTitleText || "");
    const titleColor = computed(() => props.assets.scratchyTitleColor || "#ffffff");
    const surfaceColor = computed(() => props.assets.scratchySurfaceColor || "");
    const containerBg = computed(
      () => props.assets.overlay ? "transparent" : props.assets.scratchyContainerBg || "transparent"
    );
    const hasBorder = computed(() => cardBorder.value && cardBorder.value !== "transparent");
    const buttonColor = computed(() => props.assets.scratchyButtonColor || "");
    const gridCols = computed(() => {
      var _a;
      const count = ((_a = props.tickets) == null ? void 0 : _a.length) || 0;
      if (count <= 10) return 2;
      if (count <= 30) return 3;
      return 4;
    });
    const cardAspect = computed(() => {
      var _a;
      if (layout.value === "grid" && props.assets.overlay && canvasesReady.value && cachedOverlayImg) {
        return `${cachedOverlayImg.naturalWidth}/${Math.round(cachedOverlayImg.naturalHeight * 1.34)}`;
      }
      const count = ((_a = props.tickets) == null ? void 0 : _a.length) || 0;
      if (count <= 10) return "3/1";
      if (count <= 30) return "2.5/1";
      if (count <= 80) return "2/1";
      return "2/1";
    });
    const cardFontClass = computed(() => {
      var _a;
      const count = ((_a = props.tickets) == null ? void 0 : _a.length) || 0;
      if (count <= 10) return "text-sm md:text-base";
      if (count <= 30) return "text-xs md:text-sm";
      return "text-[10px] md:text-xs";
    });
    const labelFontClass = computed(() => {
      var _a;
      const count = ((_a = props.tickets) == null ? void 0 : _a.length) || 0;
      if (count <= 10) return "text-[9px] md:text-[11px]";
      if (count <= 30) return "text-[8px] md:text-[10px]";
      return "text-[7px] md:text-[9px]";
    });
    const containerMaxWidth = computed(() => {
      var _a;
      const count = ((_a = props.tickets) == null ? void 0 : _a.length) || 0;
      if (layout.value === "single") return "max-w-2xl";
      if (count <= 10) return "max-w-lg";
      if (count <= 30) return "max-w-xl";
      if (count <= 80) return "max-w-2xl";
      return "max-w-3xl";
    });
    const ticketStates = ref([]);
    const canvasRefs = ref({});
    const isRevealing = ref(false);
    const scratchDisplayCount = ref(SCRATCH_DISPLAY_LIMIT);
    const visibleTicketStates = computed(() => ticketStates.value.slice(0, scratchDisplayCount.value));
    let scratchAudio = null;
    let winAudio = null;
    let lossAudio = null;
    function initSounds() {
      if (props.assets.scratchSound) {
        scratchAudio = new Audio(props.assets.scratchSound);
        scratchAudio.loop = true;
        scratchAudio.volume = 0.3;
      }
      if (props.assets.winSound) {
        winAudio = new Audio(props.assets.winSound);
        winAudio.volume = 0.6;
      }
      if (props.assets.lossSound) {
        lossAudio = new Audio(props.assets.lossSound);
        lossAudio.volume = 0.4;
      }
    }
    const drawingState = /* @__PURE__ */ new Map();
    const singleCanvasRef = ref(null);
    const singleCanvasRevealed = ref(false);
    ref(null);
    let gridMoveHandler = null;
    let gridEndHandler = null;
    const scratchedPixels = /* @__PURE__ */ new Map();
    const canvasAreas = /* @__PURE__ */ new Map();
    const canvasDprs = /* @__PURE__ */ new Map();
    const singleIsScratching = ref(false);
    const hasEverScratched = ref(false);
    const canvasesReady = ref(false);
    let cachedOverlayImg = null;
    const emojiList = ["💰", "🎁", "💎", "⭐", "🏆", "🎯", "💵", "🪙", "🎀", "🔔"];
    function makeEmojiSvg(index) {
      const emoji = emojiList[index % emojiList.length];
      return `data:image/svg+xml,${encodeURIComponent(`<svg xmlns="http://www.w3.org/2000/svg" width="100" height="100"><text x="50%" y="50%" text-anchor="middle" dominant-baseline="central" font-size="60">${emoji}</text></svg>`)}`;
    }
    function getWinImage(ticket, index) {
      var _a, _b;
      const iw = ticket.instant_win;
      if (!iw) return makeEmojiSvg(index);
      if (iw.image_path) return iw.image_path;
      if (iw.category_id && ((_a = props.instant_win_categories) == null ? void 0 : _a.length)) {
        const cat = props.instant_win_categories.find((c) => c.id === iw.category_id);
        if (cat == null ? void 0 : cat.image_path) return cat.image_path;
      }
      if (iw.prize && ((_b = props.instant_win_categories) == null ? void 0 : _b.length)) {
        const cat = props.instant_win_categories.find((c) => c.name === iw.prize);
        if (cat == null ? void 0 : cat.image_path) return cat.image_path;
      }
      return makeEmojiSvg(index);
    }
    function checkAllRevealed() {
      const allRevealed = ticketStates.value.every((t) => t.isRevealed);
      if (!allRevealed) return;
      const wins = [];
      ticketStates.value.forEach((ticket, i) => {
        if (!ticket.isWin) return;
        const raw = props.tickets[i];
        const iw = raw == null ? void 0 : raw.instant_win;
        const prize = ticket.prizeText;
        const categoryName = iw && iw.prize ? iw.prize : prize;
        wins.push({
          ticketNumber: ticket.ticketNumber,
          prize,
          value: (raw == null ? void 0 : raw.instant_win) && !raw.instant_win.no_auto_credit && !raw.instant_win.physical_prize && raw.instant_win.prize_type !== "ticket_bundle" ? parseFloat(raw.instant_win.value) || 0 : 0,
          image: getWinImage(raw, i),
          categoryName
        });
      });
      emit("wins-collected", wins);
    }
    function setupGame() {
      drawingState.forEach((state) => {
        cleanupListeners(state);
      });
      drawingState.clear();
      scratchedPixels.clear();
      canvasAreas.clear();
      canvasDprs.clear();
      isRevealing.value = false;
      currentIndex.value = 0;
      singleCanvasRevealed.value = false;
      singleIsScratching.value = false;
      hasEverScratched.value = false;
      canvasesReady.value = false;
      scratchDisplayCount.value = SCRATCH_DISPLAY_LIMIT;
      ticketStates.value = props.tickets.map((ticket, i) => {
        const iw = ticket.instant_win;
        const isWin = !!iw;
        let prize;
        if (isWin) {
          const isPhysical = iw.no_auto_credit === true || iw.physical_prize === true;
          const isTicketBundle = iw.prize_type === "ticket_bundle";
          const val = parseFloat(iw.value) || 0;
          if (isTicketBundle) {
            prize = `${val > 0 ? Math.floor(val) : ""} Free Ticket${val !== 1 ? "s" : ""}`.trim();
          } else {
            prize = isPhysical ? iw.prize ?? "Prize" : val > 0 ? `${formatMoney(val)} ${creditWord(iw.prize_type)}` : iw.prize ?? "Prize";
          }
        } else {
          prize = "NO WIN";
        }
        return {
          id: i,
          ticketNumber: ticket.number ?? (i + 1).toString(),
          prizeText: prize,
          isWin,
          isRevealed: false,
          isScratching: false,
          scratchPercent: 0
        };
      });
      const initAllCanvases = () => {
        nextTick$1(() => {
          if (layout.value === "single") {
            initSingleCanvas();
          } else {
            visibleTicketStates.value.forEach((t) => {
              initCanvas(t.id);
            });
          }
          canvasesReady.value = true;
        });
      };
      if (props.assets.overlay && (!cachedOverlayImg || cachedOverlayImg.src !== props.assets.overlay)) {
        const img = new Image();
        img.onload = () => {
          cachedOverlayImg = img;
          initAllCanvases();
        };
        img.onerror = () => {
          cachedOverlayImg = null;
          initAllCanvases();
        };
        img.src = props.assets.overlay;
      } else {
        initAllCanvases();
      }
    }
    async function expandScratchCards() {
      const target = Math.min(scratchDisplayCount.value + SCRATCH_SHOW_MORE_BATCH, ticketStates.value.length);
      if (target <= scratchDisplayCount.value) return;
      scratchDisplayCount.value = target;
      if (layout.value === "single") return;
      await nextTick$1();
      const remaining = visibleTicketStates.value.filter((t) => !canvasAreas.has(t.id));
      for (let i = 0; i < remaining.length; i += EXPAND_BATCH_SIZE) {
        const batch = remaining.slice(i, i + EXPAND_BATCH_SIZE);
        batch.forEach((t) => initCanvas(t.id));
        await new Promise((resolve) => requestAnimationFrame(resolve));
      }
    }
    function initSingleCanvas() {
      const canvas = singleCanvasRef.value;
      if (!canvas) return;
      const ctx = canvas.getContext("2d");
      if (!ctx) return;
      canvas.style.transition = "none";
      canvas.style.opacity = "1";
      canvas.classList.remove("scratching");
      const rect = canvas.getBoundingClientRect();
      const nativeDpr = window.devicePixelRatio || 1;
      const isMobile = /iPhone|iPad|iPod|Android/i.test(navigator.userAgent);
      const MAX_DIM = isMobile ? 4096 : 16384;
      const dpr = Math.max(0.5, Math.min(nativeDpr, MAX_DIM / rect.width, MAX_DIM / rect.height));
      canvas.width = Math.floor(rect.width * dpr);
      canvas.height = Math.floor(rect.height * dpr);
      ctx.scale(dpr, dpr);
      if (!cachedOverlayImg) {
        drawScratchSurface(ctx, rect.width, rect.height);
      }
      if (cachedOverlayImg) {
        ctx.globalCompositeOperation = "source-over";
        const imgAspect = cachedOverlayImg.naturalWidth / cachedOverlayImg.naturalHeight;
        const tileW = rect.width;
        const tileH = tileW / imgAspect;
        if (tileH >= rect.height * 0.7) {
          ctx.drawImage(cachedOverlayImg, 0, 0, rect.width, rect.height);
        } else {
          let y = 0;
          while (y < rect.height) {
            const remainingH = rect.height - y;
            if (remainingH < tileH) {
              const srcH = cachedOverlayImg.naturalHeight * (remainingH / tileH);
              const srcY = (cachedOverlayImg.naturalHeight - srcH) / 2;
              ctx.drawImage(cachedOverlayImg, 0, srcY, cachedOverlayImg.naturalWidth, srcH, 0, y, tileW, remainingH);
            } else {
              ctx.drawImage(cachedOverlayImg, 0, y, tileW, tileH);
            }
            y += tileH - 25;
          }
        }
      }
      canvasAreas.set(SINGLE_CANVAS_ID, rect.width * rect.height);
      scratchedPixels.set(SINGLE_CANVAS_ID, 0);
      canvasDprs.set(SINGLE_CANVAS_ID, dpr);
      Math.ceil(rect.width / CELL_SIZE);
      Math.ceil(rect.height / CELL_SIZE);
      drawingState.set(SINGLE_CANVAS_ID, {
        isDrawing: false,
        lastX: 0,
        lastY: 0,
        activeTouchId: null,
        checkRAF: null,
        moveHandler: null,
        endHandler: null
      });
    }
    function drawImageFit(ctx, img, canvasW, canvasH) {
      ctx.drawImage(img, 0, 0, canvasW, canvasH);
    }
    function drawScratchSurface(ctx, w, h) {
      if (surfaceColor.value) {
        ctx.fillStyle = surfaceColor.value;
        ctx.fillRect(0, 0, w, h);
      } else {
        const gradient = ctx.createLinearGradient(0, 0, w, 0);
        gradient.addColorStop(0, "#cfced6");
        gradient.addColorStop(0.25, "#e0dfe6");
        gradient.addColorStop(0.5, "#efeef3");
        gradient.addColorStop(0.75, "#e0dfe6");
        gradient.addColorStop(1, "#cfced6");
        ctx.fillStyle = gradient;
        ctx.fillRect(0, 0, w, h);
      }
    }
    function initCanvas(id) {
      const canvas = canvasRefs.value[id];
      if (!canvas) return;
      const ctx = canvas.getContext("2d");
      if (!ctx) return;
      canvas.style.transition = "none";
      canvas.style.opacity = "1";
      canvas.classList.remove("scratching");
      const rect = canvas.getBoundingClientRect();
      const dpr = window.devicePixelRatio || 1;
      canvas.width = rect.width * dpr;
      canvas.height = rect.height * dpr;
      ctx.scale(dpr, dpr);
      if (!cachedOverlayImg) {
        drawScratchSurface(ctx, rect.width, rect.height);
      }
      if (cachedOverlayImg) {
        ctx.globalCompositeOperation = "source-over";
        drawImageFit(ctx, cachedOverlayImg, rect.width, rect.height);
      }
      canvasAreas.set(id, rect.width * rect.height);
      scratchedPixels.set(id, 0);
      canvasDprs.set(id, dpr);
      drawingState.set(id, {
        isDrawing: false,
        lastX: 0,
        lastY: 0,
        activeTouchId: null,
        checkRAF: null,
        moveHandler: null,
        endHandler: null
      });
    }
    function cleanupListeners(state) {
      if (state.moveHandler) {
        window.removeEventListener("mousemove", state.moveHandler);
        window.removeEventListener("touchmove", state.moveHandler);
      }
      if (state.endHandler) {
        window.removeEventListener("mouseup", state.endHandler);
        window.removeEventListener("touchend", state.endHandler);
        window.removeEventListener("touchcancel", state.endHandler);
      }
      state.moveHandler = null;
      state.endHandler = null;
    }
    function cleanupGridListeners() {
      if (gridMoveHandler) {
        window.removeEventListener("mousemove", gridMoveHandler);
        window.removeEventListener("touchmove", gridMoveHandler);
      }
      if (gridEndHandler) {
        window.removeEventListener("mouseup", gridEndHandler);
        window.removeEventListener("touchend", gridEndHandler);
        window.removeEventListener("touchcancel", gridEndHandler);
      }
      gridMoveHandler = null;
      gridEndHandler = null;
    }
    function playRevealSound(isWin) {
      const audio = isWin ? winAudio : lossAudio;
      if (!audio) return;
      audio.currentTime = 0;
      audio.play().catch(() => {
      });
    }
    function revealSingleCanvas(instant) {
      if (singleCanvasRevealed.value) return;
      singleCanvasRevealed.value = true;
      const canvas = singleCanvasRef.value;
      if (canvas) {
        canvas.style.transition = "opacity 0.4s";
        canvas.style.opacity = "0";
      }
      ticketStates.value.forEach((ticket) => {
        ticket.isRevealed = true;
      });
      playRevealSound(ticketStates.value.some((ticket) => ticket.isWin));
      nextTick$1(() => checkAllRevealed());
    }
    function revealAll() {
      if (isRevealing.value) return;
      isRevealing.value = true;
      if (layout.value === "single") {
        revealSingleCanvas();
        isRevealing.value = false;
        return;
      }
      ticketStates.value.forEach((ticket) => {
        const canvas = canvasRefs.value[ticket.id];
        if (canvas) {
          canvas.style.transition = "opacity 0.4s";
          canvas.style.opacity = "0";
        }
        ticket.isRevealed = true;
      });
      playRevealSound(ticketStates.value.some((ticket) => ticket.isWin));
      isRevealing.value = false;
      nextTick$1(() => checkAllRevealed());
    }
    onMounted(() => {
      initSounds();
      setupGame();
    });
    watch(() => props.tickets, () => {
      setupGame();
    });
    watch(() => props.assets, () => {
      setupGame();
    }, { deep: true });
    onUnmounted(() => {
      scratchAudio == null ? void 0 : scratchAudio.pause();
      scratchAudio = null;
      winAudio = null;
      lossAudio = null;
      cleanupGridListeners();
      drawingState.forEach((state) => {
        cleanupListeners(state);
      });
      drawingState.clear();
    });
    return (_ctx, _push, _parent, _attrs) => {
      const _component_UiButton = resolveComponent("UiButton");
      _push(`<div${ssrRenderAttrs(mergeProps({ class: "flex flex-col items-center w-full h-full relative z-10 select-none" }, _attrs))} data-v-1299a941>`);
      if (titleText.value) {
        _push(`<h2 class="text-xl md:text-3xl font-black uppercase tracking-wider text-center mb-3 mt-2" style="${ssrRenderStyle({ color: titleColor.value, textShadow: `0 2px 10px rgba(0,0,0,0.3)` })}" data-v-1299a941>${ssrInterpolate(titleText.value)}</h2>`);
      } else {
        _push(`<!---->`);
      }
      _push(`<div class="flex gap-3 py-4" data-v-1299a941>`);
      _push(ssrRenderComponent(_component_UiButton, {
        variant: buttonColor.value ? "colourless" : "secondary",
        class: "px-6 py-2.5",
        style: buttonColor.value ? { backgroundColor: buttonColor.value, color: "#fff" } : {},
        disabled: isRevealing.value,
        onClick: revealAll
      }, {
        default: withCtx((_, _push2, _parent2, _scopeId) => {
          if (_push2) {
            _push2(` Reveal All `);
          } else {
            return [
              createTextVNode(" Reveal All ")
            ];
          }
        }),
        _: 1
      }, _parent));
      _push(ssrRenderComponent(_component_UiButton, {
        variant: buttonColor.value ? "colourless" : "secondary",
        class: "px-6 py-2.5",
        style: buttonColor.value ? { backgroundColor: buttonColor.value, color: "#fff" } : {},
        disabled: isRevealing.value,
        onClick: setupGame
      }, {
        default: withCtx((_, _push2, _parent2, _scopeId) => {
          if (_push2) {
            _push2(` Replay `);
          } else {
            return [
              createTextVNode(" Replay ")
            ];
          }
        }),
        _: 1
      }, _parent));
      _push(`</div>`);
      if (layout.value === "single") {
        _push(`<div class="${ssrRenderClass([[containerMaxWidth.value, { "invisible": !canvasesReady.value }], "w-full mx-auto relative"])}" data-v-1299a941><div class="w-full relative" data-v-1299a941><div class="grid gap-1 md:gap-1.5" style="${ssrRenderStyle({ gridTemplateColumns: `repeat(${gridCols.value}, minmax(0, 1fr))` })}" data-v-1299a941><!--[-->`);
        ssrRenderList(ticketStates.value, (ticket) => {
          _push(`<div class="scratch-card relative rounded-lg overflow-hidden" style="${ssrRenderStyle({
            aspectRatio: cardAspect.value,
            backgroundColor: cardBg.value,
            padding: "4px 8px",
            border: hasBorder.value ? `1px solid ${cardBorder.value}` : "none"
          })}" data-v-1299a941><div class="relative flex flex-col items-center justify-center text-center z-10 h-full" style="${ssrRenderStyle(canvasesReady.value || ticket.isRevealed ? null : { display: "none" })}" data-v-1299a941><span class="${ssrRenderClass([cardFontClass.value, "ticket-number font-bold"])}" style="${ssrRenderStyle({ color: ticket.isWin ? wonTextColour.value : loseTextColour.value })}" data-v-1299a941>${ssrInterpolate(ticket.ticketNumber)}</span><span class="${ssrRenderClass([labelFontClass.value, "ticket-label font-semibold uppercase tracking-wide"])}" style="${ssrRenderStyle({
            color: ticket.isWin ? wonTextColour.value : loseTextColour.value
          })}" data-v-1299a941>${ssrInterpolate(ticket.prizeText)}</span></div></div>`);
        });
        _push(`<!--]--></div>`);
        if (!singleCanvasRevealed.value) {
          _push(`<div class="${ssrRenderClass([props.assets.overlay ? "rounded-none" : "rounded-xl", "absolute inset-0 z-20 overflow-hidden"])}" data-v-1299a941><canvas class="${ssrRenderClass([[
            props.assets.overlay ? "rounded-none" : "rounded-xl",
            singleIsScratching.value ? "cursor-grabbing" : "cursor-grab"
          ], "absolute inset-0 w-full h-full z-20"])}" style="${ssrRenderStyle({ "touch-action": "none" })}" data-v-1299a941></canvas><div class="scratch-shine absolute inset-0 z-25 pointer-events-none rounded-xl" data-v-1299a941></div></div>`);
        } else {
          _push(`<!---->`);
        }
        _push(`</div></div>`);
      } else {
        _push(`<div class="${ssrRenderClass([[containerMaxWidth.value, { "invisible": !canvasesReady.value }], "w-full mx-auto px-6 md:px-10 pb-8"])}" data-v-1299a941><div class="${ssrRenderClass([props.assets.overlay ? "" : "rounded-xl p-2 md:p-3", "scratch-grid relative overflow-hidden"])}" style="${ssrRenderStyle({ backgroundColor: props.assets.overlay ? "transparent" : containerBg.value })}" data-v-1299a941><div class="grid gap-2 md:gap-3" style="${ssrRenderStyle({ gridTemplateColumns: `repeat(${gridCols.value}, minmax(0, 1fr))` })}" data-v-1299a941><!--[-->`);
        ssrRenderList(visibleTicketStates.value, (ticket) => {
          _push(`<div class="scratch-card relative rounded-lg overflow-hidden card-entrance" style="${ssrRenderStyle({
            aspectRatio: cardAspect.value,
            backgroundColor: cardBg.value,
            padding: "4px 8px",
            animationDelay: `${ticket.id * 30}ms`,
            border: hasBorder.value ? `1px solid ${cardBorder.value}` : "none"
          })}" data-v-1299a941><div class="relative flex flex-col items-center justify-center text-center z-10 h-full" style="${ssrRenderStyle(canvasesReady.value || ticket.isRevealed ? null : { display: "none" })}" data-v-1299a941><span class="${ssrRenderClass([cardFontClass.value, "ticket-number font-bold"])}" style="${ssrRenderStyle({ color: ticket.isWin ? wonTextColour.value : loseTextColour.value })}" data-v-1299a941>${ssrInterpolate(ticket.ticketNumber)}</span><span class="${ssrRenderClass([labelFontClass.value, "ticket-label font-semibold uppercase tracking-wide"])}" style="${ssrRenderStyle({ color: ticket.isWin ? wonTextColour.value : loseTextColour.value })}" data-v-1299a941>${ssrInterpolate(ticket.prizeText)}</span></div>`);
          if (!ticket.isRevealed) {
            _push(`<canvas style="${ssrRenderStyle({ "touch-action": "none" })}" class="${ssrRenderClass([ticket.isScratching ? "cursor-grabbing" : "cursor-grab", "absolute inset-0 w-full h-full z-20 rounded-lg"])}" data-v-1299a941></canvas>`);
          } else {
            _push(`<!---->`);
          }
          _push(`</div>`);
        });
        _push(`<!--]--></div></div>`);
        if (scratchDisplayCount.value < ticketStates.value.length) {
          _push(`<div class="flex justify-center py-4" data-v-1299a941>`);
          _push(ssrRenderComponent(_component_UiButton, {
            variant: buttonColor.value ? "colourless" : "secondary",
            class: "px-6 py-2.5",
            style: buttonColor.value ? { backgroundColor: buttonColor.value, color: "#fff" } : {},
            onClick: expandScratchCards
          }, {
            default: withCtx((_, _push2, _parent2, _scopeId) => {
              if (_push2) {
                _push2(` Show ${ssrInterpolate(Math.min(SCRATCH_SHOW_MORE_BATCH, ticketStates.value.length - scratchDisplayCount.value))} more tickets `);
              } else {
                return [
                  createTextVNode(" Show " + toDisplayString(Math.min(SCRATCH_SHOW_MORE_BATCH, ticketStates.value.length - scratchDisplayCount.value)) + " more tickets ", 1)
                ];
              }
            }),
            _: 1
          }, _parent));
          _push(`</div>`);
        } else {
          _push(`<!---->`);
        }
        _push(`</div>`);
      }
      _push(`</div>`);
    };
  }
});
const _sfc_setup$1 = _sfc_main$1.setup;
_sfc_main$1.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("resources/js/Components/Games/ScratchyGame.vue");
  return _sfc_setup$1 ? _sfc_setup$1(props, ctx) : void 0;
};
const ScratchyGame = /* @__PURE__ */ _export_sfc(_sfc_main$1, [["__scopeId", "data-v-1299a941"]]);
const _sfc_main = /* @__PURE__ */ defineComponent({
  __name: "ScratchyModal",
  __ssrInlineRender: true,
  props: {
    modelValue: { type: Boolean },
    demoMode: { type: Boolean, default: false },
    assets: {},
    tickets: {},
    instant_win_categories: {},
    previewMode: { default: "desktop" }
  },
  emits: ["update:modelValue"],
  setup(__props, { emit: __emit }) {
    const props = __props;
    const emit = __emit;
    const showLobby = ref(true);
    const showGameBoard = ref(false);
    const showHowToPlay = ref(false);
    const introPhase = ref(true);
    const demoPreviewMode = ref("mobile");
    let welcomeAudio = null;
    let introTimeout = null;
    const showWinSummary = ref(false);
    const collectedWins = ref([]);
    const swiperModules = [Pagination, Autoplay, Navigation];
    const totalWinnings = computed(() => {
      return collectedWins.value.reduce((sum, w) => sum + w.value, 0);
    });
    function onWinsCollected(wins) {
      if (wins.length === 0) return;
      collectedWins.value = wins;
      showWinSummary.value = true;
    }
    const actualPreviewMode = computed(() => {
      if (props.demoMode) return demoPreviewMode.value;
      return props.previewMode || "desktop";
    });
    const modalStyle = computed(() => {
      if (!props.demoMode) {
        return { width: "100vw", height: "100vh" };
      }
      return actualPreviewMode.value === "mobile" ? { width: "420px", height: "750px", border: "1px solid #444", borderRadius: "12px" } : { width: "700px", height: "750px", border: "1px solid #444", borderRadius: "4px" };
    });
    const containerClasses = computed(() => {
      return ["relative", props.demoMode ? "shadow-lg overflow-hidden" : "w-full h-full overflow-hidden"];
    });
    const gameAssets = computed(() => ({
      overlay: props.assets.overlay || "",
      textColour: props.assets.textColour || "#eeeeee",
      wonTextColour: props.assets.wonTextColour || "#ffffff",
      loseTextColour: props.assets.loseTextColour || "#000000",
      accentColour: props.assets.accentColour || "#52b77b",
      scratchyLayout: props.assets.scratchyLayout || "single",
      scratchyCardBg: props.assets.scratchyCardBg || "transparent",
      scratchyCardBorder: props.assets.scratchyCardBorder || "transparent",
      scratchyTitleText: props.assets.scratchyTitleText || "",
      scratchyTitleColor: props.assets.scratchyTitleColor || "#ffffff",
      scratchSound: props.assets.scratchSound || "",
      welcomeSound: props.assets.welcomeSound || "",
      winSound: props.assets.winSound || "",
      lossSound: props.assets.lossSound || "",
      scratchySurfaceColor: props.assets.scratchySurfaceColor || "",
      scratchyContainerBg: props.assets.scratchyContainerBg || "transparent",
      scratchyButtonColor: props.assets.scratchyButtonColor || ""
    }));
    const introVideoRef = ref(null);
    const showIntroVideo = ref(false);
    const gameWrapperRef = ref(null);
    const isAtTop = ref(true);
    const isAtBottom = ref(false);
    let resizeObserver = null;
    function getScrollEl() {
      const el = gameWrapperRef.value;
      if (el && el.scrollHeight - el.clientHeight > 2) return el;
      const doc = document.scrollingElement;
      if (doc && doc.scrollHeight - doc.clientHeight > 2) return doc;
      return el ?? doc;
    }
    function updateScrollState() {
      const el = getScrollEl();
      if (!el) {
        isAtTop.value = true;
        isAtBottom.value = true;
        return;
      }
      isAtTop.value = el.scrollTop <= 1;
      isAtBottom.value = el.scrollTop + el.clientHeight >= el.scrollHeight - 1;
    }
    watch(showGameBoard, async (val) => {
      var _a, _b;
      window.removeEventListener("scroll", updateScrollState);
      (_a = gameWrapperRef.value) == null ? void 0 : _a.removeEventListener("scroll", updateScrollState);
      if (resizeObserver) {
        resizeObserver.disconnect();
        resizeObserver = null;
      }
      if (val) {
        await nextTick();
        window.addEventListener("scroll", updateScrollState, { passive: true });
        (_b = gameWrapperRef.value) == null ? void 0 : _b.addEventListener("scroll", updateScrollState, { passive: true });
        resizeObserver = new ResizeObserver(() => updateScrollState());
        if (gameWrapperRef.value) resizeObserver.observe(gameWrapperRef.value);
        updateScrollState();
      }
    });
    const hasIntroVideo = computed(() => {
      if (!props.assets.scratchyIntroVideo) return false;
      return true;
    });
    const isIntroVideoType = computed(() => {
      if (!props.assets.scratchyIntroVideo) return false;
      const videoExtensions = [".mp4", ".webm", ".ogg", ".mov"];
      return videoExtensions.some((ext) => props.assets.scratchyIntroVideo.toLowerCase().endsWith(ext));
    });
    const showTopPrize = computed(() => props.assets.scratchyShowTopPrize !== false);
    const accentColor = computed(() => props.assets.accentColour || "#52b77b");
    const titleColor = computed(() => props.assets.scratchyTitleColor || "#ffffff");
    computed(() => props.assets.scratchyContainerBg || "transparent");
    const cardBorder = computed(() => props.assets.scratchyCardBorder || "transparent");
    const topPrize = computed(() => {
      if (!props.instant_win_categories || props.instant_win_categories.length === 0) return null;
      const nonBundle = props.instant_win_categories.filter((cat) => cat.prize_type !== "ticket_bundle");
      const pool = nonBundle.length > 0 ? nonBundle : props.instant_win_categories;
      const top = pool.reduce((max, cat) => cat.value > ((max == null ? void 0 : max.value) || 0) ? cat : max, pool[0]);
      return top ? {
        ...top,
        isNoAutoCredit: top.no_auto_credit === true || top.physical_prize === true,
        isTicketBundle: top.prize_type === "ticket_bundle"
      } : null;
    });
    const displayTicketCount = ref(0);
    let countInterval = null;
    function startLobbySequence() {
      showLobby.value = true;
      showGameBoard.value = false;
      showHowToPlay.value = false;
      introPhase.value = true;
      const soundUrl = props.assets.welcomeSound;
      if (soundUrl) {
        try {
          welcomeAudio = new Audio(soundUrl);
          welcomeAudio.volume = 0.5;
          welcomeAudio.play().catch(() => {
          });
        } catch {
        }
      }
      if (introTimeout) clearTimeout(introTimeout);
      introTimeout = setTimeout(() => {
        var _a;
        introPhase.value = false;
        displayTicketCount.value = 0;
        if (countInterval) clearInterval(countInterval);
        const target = ((_a = props.tickets) == null ? void 0 : _a.length) || 0;
        if (target > 0) {
          const step = Math.max(1, Math.floor(target / 20));
          const delay = Math.max(30, Math.floor(600 / target));
          countInterval = setInterval(() => {
            displayTicketCount.value = Math.min(displayTicketCount.value + step, target);
            if (displayTicketCount.value >= target) {
              displayTicketCount.value = target;
              if (countInterval) clearInterval(countInterval);
            }
          }, delay);
        }
      }, 1800);
    }
    watch(
      () => props.modelValue,
      async (newVal) => {
        if (newVal) {
          if (hasIntroVideo.value) {
            showIntroVideo.value = true;
            await new Promise((resolve) => setTimeout(resolve, 100));
            if (isIntroVideoType.value && introVideoRef.value) {
              const videoEl = introVideoRef.value;
              videoEl.currentTime = 0;
              videoEl.muted = false;
              videoEl.play().catch(() => {
                videoEl.muted = true;
                videoEl.play().catch(() => {
                });
              });
            }
            setTimeout(() => {
              showIntroVideo.value = false;
              if (isIntroVideoType.value && introVideoRef.value) {
                introVideoRef.value.pause();
              }
            }, 5e3);
          } else {
            showIntroVideo.value = false;
          }
          startLobbySequence();
        } else {
          showIntroVideo.value = false;
          if (isIntroVideoType.value && introVideoRef.value) {
            introVideoRef.value.currentTime = 0;
            introVideoRef.value.pause();
          }
          if (countInterval) clearInterval(countInterval);
          if (introTimeout) clearTimeout(introTimeout);
          if (welcomeAudio) {
            welcomeAudio.pause();
            welcomeAudio = null;
          }
        }
      },
      { immediate: true }
    );
    function close() {
      if (!props.demoMode) {
        emit("update:modelValue", false);
      }
    }
    function onEsc(e) {
      if (e.key === "Escape" && !props.demoMode) close();
    }
    onMounted(() => window.addEventListener("keydown", onEsc));
    onUnmounted(() => window.removeEventListener("keydown", onEsc));
    return (_ctx, _push, _parent, _attrs) => {
      const _component_UiButton = resolveComponent("UiButton");
      ssrRenderTeleport(_push, (_push2) => {
        if (__props.modelValue) {
          _push2(`<div class="${ssrRenderClass([
            "z-[9999] flex flex-col items-center justify-center",
            __props.demoMode ? "relative max-w-full mx-auto" : "fixed inset-0"
          ])}" style="${ssrRenderStyle({
            background: __props.demoMode ? "transparent" : "rgba(0, 0, 0, 0.5)",
            backdropFilter: __props.demoMode ? "none" : "blur(8px)"
          })}" data-v-508775cf>`);
          if (__props.demoMode) {
            _push2(`<div class="mb-4 flex items-center space-x-3 bg-gray-800 rounded-lg p-2" data-v-508775cf><span class="text-white text-sm font-medium" data-v-508775cf>Preview Mode:</span><button class="${ssrRenderClass([
              "px-3 py-1 rounded text-sm font-medium transition-colors",
              actualPreviewMode.value === "mobile" ? "bg-blue-500 text-white" : "bg-gray-600 text-gray-300 hover:bg-gray-500"
            ])}" data-v-508775cf>Mobile</button><button class="${ssrRenderClass([
              "px-3 py-1 rounded text-sm font-medium transition-colors",
              actualPreviewMode.value === "desktop" ? "bg-blue-500 text-white" : "bg-gray-600 text-gray-300 hover:bg-gray-500"
            ])}" data-v-508775cf>Desktop</button></div>`);
          } else {
            _push2(`<!---->`);
          }
          _push2(`<div class="${ssrRenderClass([containerClasses.value, { "demo-mode": __props.demoMode }, "modal-zoom-in", "unified-bg"])}" style="${ssrRenderStyle({
            ...modalStyle.value,
            "--bg-image": __props.assets.background ? `url(${__props.assets.background})` : "none",
            "--bg-color": "#1a1a2e",
            "--accent": accentColor.value,
            "--card-border": cardBorder.value
          })}" data-v-508775cf>`);
          if (__props.demoMode) {
            _push2(`<!--[-->`);
            if (actualPreviewMode.value === "mobile") {
              _push2(`<div class="h-8 bg-black flex items-center justify-between px-4 text-white text-sm" data-v-508775cf><span data-v-508775cf>9:41</span><div class="flex space-x-1" data-v-508775cf><div class="w-4 h-2 border border-white rounded-sm" data-v-508775cf></div><div class="w-1 h-2 bg-white rounded-sm" data-v-508775cf></div></div></div>`);
            } else {
              _push2(`<!---->`);
            }
            if (actualPreviewMode.value === "desktop") {
              _push2(`<div class="h-10 bg-gray-700 flex items-center justify-between px-4 text-white text-sm border-b border-gray-600" data-v-508775cf><div class="flex items-center space-x-2" data-v-508775cf><div class="flex space-x-1" data-v-508775cf><div class="w-3 h-3 bg-red-500 rounded-full" data-v-508775cf></div><div class="w-3 h-3 bg-yellow-500 rounded-full" data-v-508775cf></div><div class="w-3 h-3 bg-green-500 rounded-full" data-v-508775cf></div></div><span class="ml-4 text-gray-300" data-v-508775cf>Scratch Card - Scratch to Win!</span></div><div class="text-gray-400 text-xs" data-v-508775cf>Chrome</div></div>`);
            } else {
              _push2(`<!---->`);
            }
            _push2(`<!--]-->`);
          } else {
            _push2(`<!---->`);
          }
          if (!__props.demoMode) {
            _push2(`<button class="absolute top-4 right-4 text-gray-700 bg-white/90 hover:bg-white rounded-full w-10 h-10 flex items-center justify-center focus:outline-none text-2xl z-50 shadow-lg transition-all duration-200 hover:scale-110" aria-label="Close" data-v-508775cf>X</button>`);
          } else {
            _push2(`<!---->`);
          }
          if (showIntroVideo.value && hasIntroVideo.value) {
            _push2(`<div class="intro-video-overlay" data-v-508775cf>`);
            if (isIntroVideoType.value) {
              _push2(`<video class="intro-video" playsinline preload="auto"${ssrRenderAttr("src", __props.assets.scratchyIntroVideo)} data-v-508775cf></video>`);
            } else {
              _push2(`<img${ssrRenderAttr("src", __props.assets.scratchyIntroVideo)} class="intro-video" alt="Intro" data-v-508775cf>`);
            }
            _push2(`</div>`);
          } else {
            _push2(`<!---->`);
          }
          if (showLobby.value) {
            _push2(`<div class="lobby-screen" style="${ssrRenderStyle({
              "--lobby-accent": accentColor.value,
              "--lobby-border": cardBorder.value
            })}" data-v-508775cf><div class="${ssrRenderClass([{ "shimmer-visible": !introPhase.value }, "shimmer-particles"])}" data-v-508775cf><!--[-->`);
            ssrRenderList(8, (n) => {
              _push2(`<div class="shimmer-dot" style="${ssrRenderStyle({ "--shimmer-i": n, "--shimmer-accent": accentColor.value })}" data-v-508775cf></div>`);
            });
            _push2(`<!--]--></div><div class="${ssrRenderClass([{ "intro-active": introPhase.value }, "lobby-content"])}" data-v-508775cf>`);
            if (__props.assets.header) {
              _push2(`<div class="${ssrRenderClass([{ "logo-intro": introPhase.value, "logo-settled": !introPhase.value }, "lobby-logo-wrapper"])}" style="${ssrRenderStyle({ "--accent": accentColor.value })}" data-v-508775cf><img${ssrRenderAttr("src", __props.assets.header)} alt="Game Header" class="lobby-header-image" data-v-508775cf></div>`);
            } else {
              _push2(`<!---->`);
            }
            if (!introPhase.value) {
              _push2(`<div class="lobby-rest" data-v-508775cf>`);
              if (__props.assets.scratchyTitleText) {
                _push2(`<div class="lobby-title-area lobby-stagger-1" data-v-508775cf><div class="title-banner" data-v-508775cf><h1 class="lobby-title" style="${ssrRenderStyle({ color: titleColor.value })}" data-v-508775cf>${ssrInterpolate(__props.assets.scratchyTitleText)}</h1></div></div>`);
              } else {
                _push2(`<!---->`);
              }
              if (topPrize.value && showTopPrize.value) {
                _push2(`<div class="top-prize-badge lobby-stagger-2" style="${ssrRenderStyle({ "--prize-accent": accentColor.value })}" data-v-508775cf><div class="prize-sparkle-ring" data-v-508775cf>`);
                if (topPrize.value.image_path) {
                  _push2(`<img${ssrRenderAttr("src", topPrize.value.image_path)}${ssrRenderAttr("alt", topPrize.value.name)} class="prize-image" data-v-508775cf>`);
                } else if (__props.assets.header) {
                  _push2(`<img${ssrRenderAttr("src", __props.assets.header)}${ssrRenderAttr("alt", topPrize.value.name)} class="prize-image" data-v-508775cf>`);
                } else {
                  _push2(`<div class="prize-placeholder" style="${ssrRenderStyle({ color: accentColor.value })}" data-v-508775cf>★</div>`);
                }
                _push2(`</div><div class="prize-details" data-v-508775cf><span class="prize-label" data-v-508775cf>TOP PRIZE</span><span class="prize-value" style="${ssrRenderStyle({ color: accentColor.value })}" data-v-508775cf>`);
                if (topPrize.value.isTicketBundle) {
                  _push2(`<!--[-->${ssrInterpolate(Math.floor(topPrize.value.value))} Free Ticket${ssrInterpolate(topPrize.value.value != 1 ? "s" : "")}<!--]-->`);
                } else {
                  _push2(`<!--[-->${ssrInterpolate(topPrize.value.isNoAutoCredit ? "Up to " : "")}£${ssrInterpolate(topPrize.value.value)}<!--]-->`);
                }
                _push2(`</span><span class="prize-name" data-v-508775cf>${ssrInterpolate(topPrize.value.name)}</span></div></div>`);
              } else {
                _push2(`<!---->`);
              }
              if (__props.tickets && __props.tickets.length > 0) {
                _push2(`<div class="lobby-ticket-display lobby-stagger-3" data-v-508775cf><div class="ticket-count-circle" style="${ssrRenderStyle({ "--circle-color": accentColor.value })}" data-v-508775cf><span class="ticket-number" data-v-508775cf>${ssrInterpolate(displayTicketCount.value)}</span><span class="ticket-label" data-v-508775cf>cards</span></div><p class="ticket-prompt" data-v-508775cf>waiting to be scratched!</p></div>`);
              } else {
                _push2(`<!---->`);
              }
              _push2(`<div class="lobby-buttons lobby-stagger-4" data-v-508775cf><button class="lobby-btn lobby-btn-primary" style="${ssrRenderStyle({
                "--btn-color": accentColor.value,
                "--btn-glow": accentColor.value
              })}" data-v-508775cf><span class="btn-icon" data-v-508775cf><svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" data-v-508775cf><path d="M12 2L15 8H9L12 2Z" stroke-linecap="round" stroke-linejoin="round" data-v-508775cf></path><circle cx="12" cy="14" r="6" data-v-508775cf></circle><path d="M9 14L11 16L15 12" stroke-linecap="round" stroke-linejoin="round" data-v-508775cf></path></svg></span><span class="btn-text" data-v-508775cf>Let&#39;s Scratch!</span></button><button class="lobby-btn-help" style="${ssrRenderStyle({ "--help-color": accentColor.value })}" data-v-508775cf><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" data-v-508775cf><circle cx="12" cy="12" r="10" data-v-508775cf></circle><path d="M9.09 9a3 3 0 0 1 5.83 1c0 2-3 3-3 3" data-v-508775cf></path><line x1="12" y1="17" x2="12.01" y2="17" data-v-508775cf></line></svg> How to Play </button></div></div>`);
            } else {
              _push2(`<!---->`);
            }
            _push2(`</div>`);
            if (showHowToPlay.value) {
              _push2(`<div class="htp-overlay" data-v-508775cf><div class="htp-modal" data-v-508775cf><button class="htp-close" data-v-508775cf>X</button><h2 class="htp-title" style="${ssrRenderStyle({ color: accentColor.value })}" data-v-508775cf>How to Play</h2><div class="htp-steps" data-v-508775cf><div class="step" data-v-508775cf><div class="step-number" style="${ssrRenderStyle({ background: accentColor.value })}" data-v-508775cf>1</div><div class="step-content" data-v-508775cf><h3 data-v-508775cf>Scratch the Surface</h3><p data-v-508775cf>Drag your finger or mouse across the silver surface to scratch it off.</p></div></div><div class="step" data-v-508775cf><div class="step-number" style="${ssrRenderStyle({ background: accentColor.value })}" data-v-508775cf>2</div><div class="step-content" data-v-508775cf><h3 data-v-508775cf>Reveal Your Prize</h3><p data-v-508775cf>Once enough is scratched, the card auto-reveals what&#39;s underneath!</p></div></div><div class="step" data-v-508775cf><div class="step-number" style="${ssrRenderStyle({ background: accentColor.value })}" data-v-508775cf>3</div><div class="step-content" data-v-508775cf><h3 data-v-508775cf>Collect Winnings</h3><p data-v-508775cf>Winning tickets are added to your account instantly!</p></div></div></div><div class="htp-tip" data-v-508775cf><span class="tip-icon" data-v-508775cf>💡</span><span data-v-508775cf>Use &quot;Reveal All&quot; to scratch all cards at once!</span></div><button class="htp-got-it" style="${ssrRenderStyle({ background: accentColor.value })}" data-v-508775cf> Got it! </button></div></div>`);
            } else {
              _push2(`<!---->`);
            }
            _push2(`</div>`);
          } else {
            _push2(`<!---->`);
          }
          if (showGameBoard.value) {
            _push2(`<button type="button" class="game-scroll-arrow game-scroll-arrow-up md:hidden"${ssrIncludeBooleanAttr(isAtTop.value) ? " disabled" : ""} aria-label="Scroll up" data-v-508775cf><svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round" data-v-508775cf><polyline points="18 15 12 9 6 15" data-v-508775cf></polyline></svg></button>`);
          } else {
            _push2(`<!---->`);
          }
          if (showGameBoard.value) {
            _push2(`<button type="button" class="game-scroll-arrow game-scroll-arrow-down md:hidden"${ssrIncludeBooleanAttr(isAtBottom.value) ? " disabled" : ""} aria-label="Scroll down" data-v-508775cf><svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round" data-v-508775cf><polyline points="6 9 12 15 18 9" data-v-508775cf></polyline></svg></button>`);
          } else {
            _push2(`<!---->`);
          }
          if (showGameBoard.value) {
            _push2(`<div class="${ssrRenderClass(["flex flex-col relative game-wrapper overflow-y-auto overflow-x-hidden", __props.demoMode ? "flex-1" : "h-full"])}" data-v-508775cf>`);
            if (__props.demoMode) {
              _push2(`<button class="demo-back-btn" data-v-508775cf>Back to Lobby</button>`);
            } else {
              _push2(`<!---->`);
            }
            if (__props.assets.header) {
              _push2(`<img${ssrRenderAttr("src", __props.assets.header)} class="mx-auto max-w-[200px] w-auto h-auto object-contain mt-2 mb-1 pointer-events-none relative z-10" alt="Game Header" data-v-508775cf>`);
            } else {
              _push2(`<!---->`);
            }
            _push2(`<div class="flex items-center justify-center relative z-10" data-v-508775cf>`);
            _push2(ssrRenderComponent(ScratchyGame, {
              assets: gameAssets.value,
              tickets: __props.tickets,
              instant_win_categories: __props.instant_win_categories,
              onWinsCollected
            }, null, _parent));
            _push2(`</div>`);
            if (topPrize.value && showTopPrize.value) {
              _push2(`<div class="top-prize-banner relative z-10 mx-4 my-2" data-v-508775cf><div class="flex items-center justify-center gap-3 px-4 py-2.5 rounded-xl" style="${ssrRenderStyle({ backgroundColor: "rgba(0,0,0,0.5)", border: `2px solid ${accentColor.value}`, boxShadow: `0 0 15px ${accentColor.value}40` })}" data-v-508775cf>`);
              if (topPrize.value.image_path) {
                _push2(`<img${ssrRenderAttr("src", topPrize.value.image_path)}${ssrRenderAttr("alt", topPrize.value.name)} class="w-10 h-10 object-contain rounded-lg" data-v-508775cf>`);
              } else if (__props.assets.header) {
                _push2(`<img${ssrRenderAttr("src", __props.assets.header)}${ssrRenderAttr("alt", topPrize.value.name)} class="w-10 h-10 object-contain rounded-lg" data-v-508775cf>`);
              } else {
                _push2(`<!---->`);
              }
              _push2(`<div class="flex flex-col items-center" data-v-508775cf><span class="text-[10px] uppercase tracking-widest font-bold text-gray-300" data-v-508775cf>Top Prize</span><span class="text-lg font-black" style="${ssrRenderStyle({ color: accentColor.value })}" data-v-508775cf>`);
              if (topPrize.value.isTicketBundle) {
                _push2(`<!--[-->${ssrInterpolate(Math.floor(topPrize.value.value))} Free Ticket${ssrInterpolate(topPrize.value.value != 1 ? "s" : "")}<!--]-->`);
              } else {
                _push2(`<!--[-->${ssrInterpolate(topPrize.value.isNoAutoCredit ? "Up to " : "")}£${ssrInterpolate(topPrize.value.value)}<!--]-->`);
              }
              _push2(`</span></div><span class="text-xs font-semibold text-white/80" data-v-508775cf>${ssrInterpolate(topPrize.value.name)}</span></div></div>`);
            } else {
              _push2(`<!---->`);
            }
            if (!__props.demoMode) {
              _push2(`<div class="flex justify-center pt-2 pb-4 relative z-10" data-v-508775cf>`);
              _push2(ssrRenderComponent(_component_UiButton, {
                onClick: close,
                variant: "danger",
                class: "px-6 py-2"
              }, {
                default: withCtx((_, _push3, _parent2, _scopeId) => {
                  if (_push3) {
                    _push3(`Close`);
                  } else {
                    return [
                      createTextVNode("Close")
                    ];
                  }
                }),
                _: 1
              }, _parent));
              _push2(`</div>`);
            } else {
              _push2(`<!---->`);
            }
            _push2(`</div>`);
          } else {
            _push2(`<!---->`);
          }
          if (showWinSummary.value) {
            _push2(`<div class="win-summary-overlay" data-v-508775cf><div class="win-summary-modal" style="${ssrRenderStyle({ "--ws-accent": accentColor.value })}" data-v-508775cf><button class="win-summary-close" data-v-508775cf>X</button><div class="win-summary-header" data-v-508775cf><h2 class="win-summary-title" style="${ssrRenderStyle({ color: accentColor.value })}" data-v-508775cf>You Won!</h2><p class="win-summary-subtitle" data-v-508775cf>${ssrInterpolate(collectedWins.value.length)} win${ssrInterpolate(collectedWins.value.length !== 1 ? "s" : "")} from ${ssrInterpolate(__props.tickets.length)} cards</p></div><div class="win-summary-carousel" data-v-508775cf>`);
            _push2(ssrRenderComponent(unref(Swiper), {
              modules: swiperModules,
              pagination: { type: "fraction" },
              navigation: { nextEl: ".win-nav-next", prevEl: ".win-nav-prev" },
              autoplay: { delay: 3e3, disableOnInteraction: true },
              "space-between": 20,
              "slides-per-view": 1,
              class: "win-swiper"
            }, {
              default: withCtx((_, _push3, _parent2, _scopeId) => {
                if (_push3) {
                  _push3(`<!--[-->`);
                  ssrRenderList(collectedWins.value, (win, idx) => {
                    _push3(ssrRenderComponent(unref(SwiperSlide), { key: idx }, {
                      default: withCtx((_2, _push4, _parent3, _scopeId2) => {
                        if (_push4) {
                          _push4(`<div class="win-slide" data-v-508775cf${_scopeId2}><div class="win-slide-row" data-v-508775cf${_scopeId2}><button class="win-nav-prev win-nav-arrow" style="${ssrRenderStyle({ color: accentColor.value })}" data-v-508775cf${_scopeId2}><svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round" data-v-508775cf${_scopeId2}><polyline points="15 18 9 12 15 6" data-v-508775cf${_scopeId2}></polyline></svg></button><div class="win-slide-image-wrap" style="${ssrRenderStyle({ borderColor: accentColor.value })}" data-v-508775cf${_scopeId2}><img${ssrRenderAttr("src", win.image)}${ssrRenderAttr("alt", win.categoryName)} class="win-slide-image" data-v-508775cf${_scopeId2}></div><button class="win-nav-next win-nav-arrow" style="${ssrRenderStyle({ color: accentColor.value })}" data-v-508775cf${_scopeId2}><svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round" data-v-508775cf${_scopeId2}><polyline points="9 18 15 12 9 6" data-v-508775cf${_scopeId2}></polyline></svg></button></div><div class="win-slide-prize" style="${ssrRenderStyle({ color: accentColor.value })}" data-v-508775cf${_scopeId2}>${ssrInterpolate(win.prize)}</div><div class="win-slide-ticket" data-v-508775cf${_scopeId2}>Ticket #${ssrInterpolate(win.ticketNumber)}</div></div>`);
                        } else {
                          return [
                            createVNode("div", { class: "win-slide" }, [
                              createVNode("div", { class: "win-slide-row" }, [
                                createVNode("button", {
                                  class: "win-nav-prev win-nav-arrow",
                                  style: { color: accentColor.value }
                                }, [
                                  (openBlock(), createBlock("svg", {
                                    width: "28",
                                    height: "28",
                                    viewBox: "0 0 24 24",
                                    fill: "none",
                                    stroke: "currentColor",
                                    "stroke-width": "2.5",
                                    "stroke-linecap": "round",
                                    "stroke-linejoin": "round"
                                  }, [
                                    createVNode("polyline", { points: "15 18 9 12 15 6" })
                                  ]))
                                ], 4),
                                createVNode("div", {
                                  class: "win-slide-image-wrap",
                                  style: { borderColor: accentColor.value }
                                }, [
                                  createVNode("img", {
                                    src: win.image,
                                    alt: win.categoryName,
                                    class: "win-slide-image"
                                  }, null, 8, ["src", "alt"])
                                ], 4),
                                createVNode("button", {
                                  class: "win-nav-next win-nav-arrow",
                                  style: { color: accentColor.value }
                                }, [
                                  (openBlock(), createBlock("svg", {
                                    width: "28",
                                    height: "28",
                                    viewBox: "0 0 24 24",
                                    fill: "none",
                                    stroke: "currentColor",
                                    "stroke-width": "2.5",
                                    "stroke-linecap": "round",
                                    "stroke-linejoin": "round"
                                  }, [
                                    createVNode("polyline", { points: "9 18 15 12 9 6" })
                                  ]))
                                ], 4)
                              ]),
                              createVNode("div", {
                                class: "win-slide-prize",
                                style: { color: accentColor.value }
                              }, toDisplayString(win.prize), 5),
                              createVNode("div", { class: "win-slide-ticket" }, "Ticket #" + toDisplayString(win.ticketNumber), 1)
                            ])
                          ];
                        }
                      }),
                      _: 2
                    }, _parent2, _scopeId));
                  });
                  _push3(`<!--]-->`);
                } else {
                  return [
                    (openBlock(true), createBlock(Fragment, null, renderList(collectedWins.value, (win, idx) => {
                      return openBlock(), createBlock(unref(SwiperSlide), { key: idx }, {
                        default: withCtx(() => [
                          createVNode("div", { class: "win-slide" }, [
                            createVNode("div", { class: "win-slide-row" }, [
                              createVNode("button", {
                                class: "win-nav-prev win-nav-arrow",
                                style: { color: accentColor.value }
                              }, [
                                (openBlock(), createBlock("svg", {
                                  width: "28",
                                  height: "28",
                                  viewBox: "0 0 24 24",
                                  fill: "none",
                                  stroke: "currentColor",
                                  "stroke-width": "2.5",
                                  "stroke-linecap": "round",
                                  "stroke-linejoin": "round"
                                }, [
                                  createVNode("polyline", { points: "15 18 9 12 15 6" })
                                ]))
                              ], 4),
                              createVNode("div", {
                                class: "win-slide-image-wrap",
                                style: { borderColor: accentColor.value }
                              }, [
                                createVNode("img", {
                                  src: win.image,
                                  alt: win.categoryName,
                                  class: "win-slide-image"
                                }, null, 8, ["src", "alt"])
                              ], 4),
                              createVNode("button", {
                                class: "win-nav-next win-nav-arrow",
                                style: { color: accentColor.value }
                              }, [
                                (openBlock(), createBlock("svg", {
                                  width: "28",
                                  height: "28",
                                  viewBox: "0 0 24 24",
                                  fill: "none",
                                  stroke: "currentColor",
                                  "stroke-width": "2.5",
                                  "stroke-linecap": "round",
                                  "stroke-linejoin": "round"
                                }, [
                                  createVNode("polyline", { points: "9 18 15 12 9 6" })
                                ]))
                              ], 4)
                            ]),
                            createVNode("div", {
                              class: "win-slide-prize",
                              style: { color: accentColor.value }
                            }, toDisplayString(win.prize), 5),
                            createVNode("div", { class: "win-slide-ticket" }, "Ticket #" + toDisplayString(win.ticketNumber), 1)
                          ])
                        ]),
                        _: 2
                      }, 1024);
                    }), 128))
                  ];
                }
              }),
              _: 1
            }, _parent));
            _push2(`</div>`);
            if (totalWinnings.value > 0) {
              _push2(`<div class="win-summary-total" style="${ssrRenderStyle({ borderColor: accentColor.value + "40" })}" data-v-508775cf><span class="win-total-label" data-v-508775cf>Total Winnings</span><span class="win-total-value" style="${ssrRenderStyle({ color: accentColor.value })}" data-v-508775cf>£${ssrInterpolate(totalWinnings.value.toFixed(2))}</span></div>`);
            } else {
              _push2(`<!---->`);
            }
            _push2(`<button class="win-summary-btn" style="${ssrRenderStyle({ background: accentColor.value })}" data-v-508775cf> Continue </button></div></div>`);
          } else {
            _push2(`<!---->`);
          }
          _push2(`</div>`);
          if (__props.demoMode) {
            _push2(`<div class="mt-2 text-center text-gray-400 text-xs" data-v-508775cf>${ssrInterpolate(actualPreviewMode.value === "mobile" ? "Mobile Preview (420x750)" : "Desktop Preview (700x750)")}</div>`);
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
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("resources/js/Components/Games/ScratchyModal.vue");
  return _sfc_setup ? _sfc_setup(props, ctx) : void 0;
};
const ScratchyModal = /* @__PURE__ */ _export_sfc(_sfc_main, [["__scopeId", "data-v-508775cf"]]);
export {
  ScratchyModal as default
};
