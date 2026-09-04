import { defineComponent, ref, computed, onMounted, mergeProps, useSSRContext, reactive, watch, onUnmounted } from "vue";
import { ssrRenderAttrs, ssrRenderAttr, ssrRenderClass, ssrRenderStyle, ssrInterpolate, ssrIncludeBooleanAttr, ssrRenderList, ssrRenderTeleport, ssrRenderComponent } from "vue/server-renderer";
import { s as siteCreditLabel } from "./prizeLabel-Z9qw9N7H.js";
import "canvas-confetti";
import { _ as _export_sfc } from "../ssr.js";
import "@inertiajs/vue3";
import "three";
import "axios";
import "@inertiajs/vue3/server";
const CARD_DISPLAY_LIMIT = 150;
const _sfc_main$1 = /* @__PURE__ */ defineComponent({
  __name: "BingoGame",
  __ssrInlineRender: true,
  props: {
    assets: {},
    prizes: {},
    tickets: {},
    demoMode: { type: Boolean, default: false },
    previewMode: { default: "mobile" }
  },
  emits: ["ticket-played"],
  setup(__props, { emit: __emit }) {
    const props = __props;
    const WINNING_PATTERNS = [
      [0, 1, 2],
      // 0: Top row
      [3, 4, 5],
      // 1: Middle row
      [6, 7, 8],
      // 2: Bottom row
      [0, 3, 6],
      // 3: Left column
      [1, 4, 7],
      // 4: Middle column
      [2, 5, 8],
      // 5: Right column
      [0, 4, 8],
      // 6: Diagonal TL-BR
      [2, 4, 6],
      // 7: Diagonal TR-BL
      [0, 2, 4, 6, 8],
      // 8: Cross Pattern (5 squares)
      [0, 1, 2, 3, 4, 5, 6, 7, 8]
      // 9: Full House (all 9)
    ];
    const cards = ref([]);
    const totalWinnings = ref(0);
    const totalPrizes = ref(0);
    const showPopup = ref(false);
    const popupPrize = ref(null);
    const processedTickets = ref(/* @__PURE__ */ new Set());
    const modalContentRef = ref(null);
    const isRevealingAll = ref(false);
    const showEndState = ref(false);
    const showAllCards = ref(false);
    const visibleCards = computed(() => showAllCards.value || cards.value.length <= CARD_DISPLAY_LIMIT ? cards.value : cards.value.slice(0, CARD_DISPLAY_LIMIT));
    const allRevealed = computed(() => cards.value.length > 0 && cards.value.every((c) => c.revealed));
    const storageKey = computed(() => {
      if (!props.tickets || props.tickets.length === 0) return "";
      const ids = props.tickets.map((t) => t.id).sort().join("-");
      return `bingo_state_${ids}`;
    });
    const colors = computed(() => ({
      bgStart: props.assets.bgStart || "#1e3a8a",
      bgEnd: props.assets.bgEnd || "#1e40af",
      frameColor: props.assets.frameColor || "#3b82f6",
      frameGlow: props.assets.frameGlow || "#60a5fa",
      squareBg: props.assets.squareBg || "#374151",
      squareText: props.assets.squareText || "#e5e7eb",
      diamond1: props.assets.diamond1 || "#06b6d4",
      diamond2: props.assets.diamond2 || "#67e8f9",
      winnerGlow: props.assets.winnerGlow || "#10b981",
      winnerBg: props.assets.winnerBg || "#059669",
      popupStart: props.assets.popupStart || "#10b981",
      popupEnd: props.assets.popupEnd || "#059669"
    }));
    const diamondEmoji = computed(() => props.assets.diamondEmoji || "💎");
    const generateCardNumbers = () => {
      const numbers = [];
      const used = /* @__PURE__ */ new Set();
      while (numbers.length < 9) {
        const num = Math.floor(Math.random() * 90) + 1;
        if (!used.has(num)) {
          used.add(num);
          numbers.push(num);
        }
      }
      return numbers;
    };
    const generateLoserDiamonds = () => {
      const safePatterns = [
        [0, 4, 6],
        [1, 3, 8],
        [2, 4, 7],
        [0, 5, 7],
        [1, 6, 8]
      ];
      for (let attempt = 0; attempt < 100; attempt++) {
        const positions = [];
        while (positions.length < 3) {
          const pos = Math.floor(Math.random() * 9);
          if (!positions.includes(pos)) positions.push(pos);
        }
        const formsLine = WINNING_PATTERNS.some(
          (pattern) => pattern.every((pos) => positions.includes(pos))
        );
        if (!formsLine) return positions;
      }
      return safePatterns[Math.floor(Math.random() * safePatterns.length)];
    };
    const generateWinnerDiamonds = (prizeValue) => {
      let patternIndex = -1;
      if (props.assets.patternRules && props.assets.patternRules.length > 0) {
        for (const rule of props.assets.patternRules) {
          if (prizeValue >= rule.from && prizeValue <= rule.to) {
            patternIndex = rule.pattern;
            break;
          }
        }
      }
      if (patternIndex === -1) {
        patternIndex = Math.floor(Math.random() * 8);
      }
      if (patternIndex < 0 || patternIndex >= WINNING_PATTERNS.length) {
        patternIndex = Math.floor(Math.random() * 8);
      }
      return [...WINNING_PATTERNS[patternIndex]];
    };
    const initializeCards = () => {
      if (props.demoMode) {
        cards.value = [
          {
            ticket: { id: 1, number: "001", competition_id: 1, instant_win: false },
            numbers: generateCardNumbers(),
            diamondPositions: generateLoserDiamonds(),
            revealed: false,
            isWinner: false,
            prizeValue: 0,
            prizeNoAutoCredit: false,
            prizeName: "",
            revealedSquares: /* @__PURE__ */ new Set(),
            animating: false
          },
          {
            ticket: { id: 2, number: "002", competition_id: 1, instant_win: { id: 1, name: "Demo Prize", prize: "£25.00", value: 25, claimed: false, image_path: null, category_id: 1 } },
            numbers: generateCardNumbers(),
            diamondPositions: generateWinnerDiamonds(25),
            revealed: false,
            isWinner: true,
            prizeValue: 25,
            prizeNoAutoCredit: false,
            prizeName: "Demo Prize",
            revealedSquares: /* @__PURE__ */ new Set(),
            animating: false
          },
          {
            ticket: { id: 3, number: "003", competition_id: 1, instant_win: false },
            numbers: generateCardNumbers(),
            diamondPositions: generateLoserDiamonds(),
            revealed: false,
            isWinner: false,
            prizeValue: 0,
            prizeNoAutoCredit: false,
            prizeName: "",
            revealedSquares: /* @__PURE__ */ new Set(),
            animating: false
          },
          {
            ticket: { id: 4, number: "004", competition_id: 1, instant_win: { id: 2, name: "Big Prize", prize: "£100.00", value: 100, claimed: false, image_path: null, category_id: 2 } },
            numbers: generateCardNumbers(),
            diamondPositions: [0, 1, 2, 3, 4, 5, 6, 7, 8],
            // Full house demo
            revealed: false,
            isWinner: true,
            prizeValue: 100,
            prizeNoAutoCredit: false,
            prizeName: "Big Prize",
            revealedSquares: /* @__PURE__ */ new Set(),
            animating: false
          },
          {
            ticket: { id: 5, number: "005", competition_id: 1, instant_win: false },
            numbers: generateCardNumbers(),
            diamondPositions: generateLoserDiamonds(),
            revealed: false,
            isWinner: false,
            prizeValue: 0,
            prizeNoAutoCredit: false,
            prizeName: "",
            revealedSquares: /* @__PURE__ */ new Set(),
            animating: false
          },
          {
            ticket: { id: 6, number: "006", competition_id: 1, instant_win: false },
            numbers: generateCardNumbers(),
            diamondPositions: generateLoserDiamonds(),
            revealed: false,
            isWinner: false,
            prizeValue: 0,
            prizeNoAutoCredit: false,
            prizeName: "",
            revealedSquares: /* @__PURE__ */ new Set(),
            animating: false
          }
        ];
      } else {
        cards.value = props.tickets.map((ticket) => {
          const isWinner = ticket.instant_win !== false;
          const instantWinData = isWinner ? ticket.instant_win : null;
          const rawValue = isWinner ? Number(instantWinData.value) || 0 : 0;
          const isTicketBundle = isWinner && (instantWinData == null ? void 0 : instantWinData.prize_type) === "ticket_bundle";
          const categoryId = isWinner ? instantWinData.category_id : 0;
          const prizeNoAutoCredit = (isWinner && categoryId ? props.prizes.some((p) => p.id === categoryId && p.no_auto_credit) : false) || isTicketBundle;
          const rawPrizeName = isWinner ? instantWinData.prize || "" : "";
          const prizeName = isTicketBundle ? `${rawValue > 0 ? Math.floor(rawValue) : ""} Free Ticket${rawValue !== 1 ? "s" : ""}`.trim() : siteCreditLabel(instantWinData == null ? void 0 : instantWinData.prize_type, rawValue) ?? rawPrizeName;
          return {
            ticket,
            numbers: generateCardNumbers(),
            diamondPositions: isWinner ? generateWinnerDiamonds(isTicketBundle ? 0 : rawValue) : generateLoserDiamonds(),
            revealed: false,
            isWinner,
            prizeValue: isTicketBundle ? 0 : rawValue,
            prizeNoAutoCredit,
            prizeName,
            revealedSquares: /* @__PURE__ */ new Set(),
            animating: false
          };
        });
        cards.value.sort(() => Math.random() - 0.5);
        restoreSavedState();
      }
    };
    const isWinningSquare = (card, index) => {
      return card.revealed && card.isWinner && card.diamondPositions.includes(index) && card.revealedSquares.has(index);
    };
    const showDiamond = (card, index) => {
      return card.revealedSquares.has(index) && card.diamondPositions.includes(index);
    };
    const restoreSavedState = () => {
      var _a;
      if (props.demoMode || !storageKey.value) return false;
      try {
        const saved = sessionStorage.getItem(storageKey.value);
        if (!saved) return false;
        const state = JSON.parse(saved);
        if (!state.cardOrder || !state.revealedIndexes) return false;
        const orderedCards = [];
        for (const ticketId of state.cardOrder) {
          const card = cards.value.find((c) => c.ticket.id === ticketId);
          if (card) orderedCards.push(card);
        }
        if (orderedCards.length !== cards.value.length) return false;
        cards.value = orderedCards;
        for (const idx of state.revealedIndexes) {
          if (idx < cards.value.length) {
            cards.value[idx].revealed = true;
            const savedSquares = ((_a = state.revealedSquares) == null ? void 0 : _a[idx]) || [];
            cards.value[idx].revealedSquares = new Set(savedSquares);
          }
        }
        totalWinnings.value = state.totalWinnings || 0;
        totalPrizes.value = state.totalPrizes || 0;
        processedTickets.value = new Set(state.processedTickets || []);
        if (allRevealed.value) {
          showEndState.value = true;
        }
        return true;
      } catch (e) {
        return false;
      }
    };
    onMounted(() => {
      initializeCards();
    });
    return (_ctx, _push, _parent, _attrs) => {
      _push(`<div${ssrRenderAttrs(mergeProps({
        ref_key: "modalContentRef",
        ref: modalContentRef,
        class: "bingo-modal-content relative flex flex-col",
        style: {
          background: __props.assets.background ? `url(${__props.assets.background}) center/cover no-repeat` : `linear-gradient(135deg, ${colors.value.bgStart} 0%, ${colors.value.bgEnd} 50%, ${colors.value.bgStart} 100%)`,
          height: "100%",
          padding: __props.demoMode ? "8px" : "20px 10px",
          overflow: "auto"
        }
      }, _attrs))} data-v-f776846c>`);
      if (__props.assets.header) {
        _push(`<div class="text-center mb-4 flex-shrink-0" data-v-f776846c><img${ssrRenderAttr("src", __props.assets.header)} alt="Header" class="${ssrRenderClass([__props.demoMode ? "max-h-[60px] object-contain" : "", "max-w-[280px] mx-auto"])}" data-v-f776846c></div>`);
      } else {
        _push(`<!---->`);
      }
      _push(`<div class="flex flex-wrap justify-center gap-2 mb-4 flex-shrink-0" data-v-f776846c><div class="${ssrRenderClass([__props.demoMode ? "text-sm" : "text-lg", "total-winnings-display px-4 py-2 rounded-full backdrop-blur-md text-white font-bold"])}" style="${ssrRenderStyle({
        background: "rgba(0, 0, 0, 0.5)",
        border: "2px solid rgba(255, 255, 255, 0.3)"
      })}" data-v-f776846c> Total Winnings: £${ssrInterpolate(totalWinnings.value.toFixed(2))}</div>`);
      if (totalPrizes.value > 0) {
        _push(`<div class="${ssrRenderClass([__props.demoMode ? "text-sm" : "text-lg", "px-4 py-2 rounded-full backdrop-blur-md text-white font-bold"])}" style="${ssrRenderStyle({
          background: "rgba(0, 0, 0, 0.5)",
          border: "2px solid rgba(255, 255, 255, 0.3)"
        })}" data-v-f776846c> Prizes: ${ssrInterpolate(totalPrizes.value)}</div>`);
      } else {
        _push(`<!---->`);
      }
      _push(`</div>`);
      if (!allRevealed.value && !showEndState.value) {
        _push(`<div class="flex justify-center mb-4 flex-shrink-0" data-v-f776846c><button${ssrIncludeBooleanAttr(allRevealed.value) ? " disabled" : ""} class="px-6 py-2 rounded-full font-bold text-sm text-white transition-all" style="${ssrRenderStyle({
          background: `linear-gradient(135deg, ${colors.value.frameColor}, ${colors.value.frameGlow})`,
          cursor: "pointer"
        })}" data-v-f776846c>${ssrInterpolate(isRevealingAll.value ? "Skip" : "Reveal All")}</button></div>`);
      } else {
        _push(`<!---->`);
      }
      _push(`<div class="bingo-grid grid grid-cols-3 gap-1.5 w-full mx-auto" data-v-f776846c><!--[-->`);
      ssrRenderList(visibleCards.value, (card, cardIndex) => {
        _push(`<div${ssrRenderAttr("data-card-index", cardIndex)} class="bingo-card relative rounded-lg overflow-hidden" style="${ssrRenderStyle({
          border: `2px solid ${colors.value.frameColor}`,
          boxShadow: `0 0 6px ${colors.value.frameGlow}40`,
          background: colors.value.squareBg
        })}" data-v-f776846c><div class="bingo-caption text-center py-0.5 px-1 font-bold text-[10px] leading-tight" style="${ssrRenderStyle({
          background: card.revealed ? card.isWinner ? `linear-gradient(145deg, ${colors.value.winnerGlow}, ${colors.value.winnerBg})` : `linear-gradient(145deg, ${colors.value.bgEnd}, ${colors.value.bgStart})` : `linear-gradient(145deg, ${colors.value.bgEnd}, ${colors.value.bgStart})`,
          color: colors.value.squareText,
          borderBottom: `1px solid ${colors.value.frameColor}`,
          height: "28px"
        })}" data-v-f776846c>`);
        if (card.revealed && card.isWinner) {
          _push(`<!--[--><div class="text-[9px]" data-v-f776846c>WIN!</div>`);
          if (!card.prizeNoAutoCredit) {
            _push(`<div data-v-f776846c>£${ssrInterpolate(Number(card.prizeValue).toFixed(2))}</div>`);
          } else {
            _push(`<div class="text-[8px]" data-v-f776846c>${ssrInterpolate(card.prizeName)}</div>`);
          }
          _push(`<!--]-->`);
        } else {
          _push(`<div class="pt-0.5" data-v-f776846c>#${ssrInterpolate(card.ticket.number)}</div>`);
        }
        _push(`</div><div class="relative p-1" data-v-f776846c><div class="grid grid-cols-3 gap-0.5" data-v-f776846c><!--[-->`);
        ssrRenderList(card.numbers, (num, idx) => {
          _push(`<div class="bingo-square bingo-square-tall flex items-center justify-center rounded font-bold text-xs md:text-sm" style="${ssrRenderStyle({
            background: showDiamond(card, idx) ? isWinningSquare(card, idx) ? `linear-gradient(145deg, ${colors.value.winnerGlow}, ${colors.value.winnerBg})` : `linear-gradient(145deg, ${colors.value.diamond1}, ${colors.value.diamond2})` : colors.value.squareBg,
            color: showDiamond(card, idx) ? "#fff" : colors.value.squareText,
            border: `1px solid ${colors.value.frameColor}40`
          })}" data-v-f776846c>`);
          if (showDiamond(card, idx)) {
            _push(`<span class="diamond-emoji text-sm md:text-base" data-v-f776846c>${ssrInterpolate(diamondEmoji.value)}</span>`);
          } else if (card.revealed) {
            _push(`<span data-v-f776846c>${ssrInterpolate(num)}</span>`);
          } else {
            _push(`<span data-v-f776846c>${ssrInterpolate(num)}</span>`);
          }
          _push(`</div>`);
        });
        _push(`<!--]--></div>`);
        if (card.revealed && card.isWinner && card.diamondPositions.length === 9 && card.revealedSquares.size === 9) {
          _push(`<div class="absolute inset-0.5 flex flex-col items-center justify-center rounded pointer-events-none" style="${ssrRenderStyle({ "background": "rgba(0,0,0,0.85)", "z-index": "10" })}" data-v-f776846c><span class="text-yellow-400 font-black text-sm md:text-xl drop-shadow-lg animate-pulse" data-v-f776846c>FULL HOUSE!</span>`);
          if (!card.prizeNoAutoCredit) {
            _push(`<span class="text-white font-semibold text-xs md:text-base" data-v-f776846c>£${ssrInterpolate(Number(card.prizeValue).toFixed(2))}</span>`);
          } else {
            _push(`<span class="text-white font-semibold text-xs md:text-base" data-v-f776846c>${ssrInterpolate(card.prizeName)}</span>`);
          }
          _push(`</div>`);
        } else {
          _push(`<!---->`);
        }
        _push(`</div>`);
        if (!card.revealed && __props.assets.cardCover) {
          _push(`<div class="bingo-cover-overlay absolute inset-0 cursor-pointer hover:opacity-90 transition-opacity flex items-center justify-center rounded-lg z-20" style="${ssrRenderStyle({
            background: `url(${__props.assets.cardCover}) center/cover no-repeat`
          })}" data-v-f776846c><span class="sr-only" data-v-f776846c>Tap to reveal</span></div>`);
        } else if (!card.revealed) {
          _push(`<div class="bingo-cover-overlay absolute left-0 right-0 bottom-0 cursor-pointer flex items-center justify-center text-white font-bold text-[10px] z-20" style="${ssrRenderStyle([{ "top": "28px" }, {
            background: `linear-gradient(145deg, ${colors.value.bgStart}, ${colors.value.bgEnd})`
          }])}" data-v-f776846c><span class="tap-text" data-v-f776846c>TAP TO REVEAL</span></div>`);
        } else {
          _push(`<!---->`);
        }
        _push(`</div>`);
      });
      _push(`<!--]--></div>`);
      if (cards.value.length > CARD_DISPLAY_LIMIT && !showAllCards.value) {
        _push(`<div class="flex justify-center my-3" data-v-f776846c><button class="px-6 py-2 rounded-full font-bold text-sm text-white transition-all" style="${ssrRenderStyle({ background: `linear-gradient(135deg, ${colors.value.frameColor}, ${colors.value.frameGlow})` })}" data-v-f776846c> Show all ${ssrInterpolate(cards.value.length)} tickets </button></div>`);
      } else {
        _push(`<!---->`);
      }
      if (showEndState.value) {
        _push(`<div class="absolute inset-0 flex flex-col items-center justify-center z-30 rounded-lg" style="${ssrRenderStyle({ "background": "rgba(0,0,0,0.9)" })}" data-v-f776846c>`);
        if (totalPrizes.value > 0) {
          _push(`<div class="text-center" data-v-f776846c><div class="text-yellow-400 text-4xl font-black mb-2 animate-pulse" data-v-f776846c>CONGRATULATIONS!</div><div class="text-white text-lg mb-1" data-v-f776846c>You won <span class="text-yellow-400 font-bold" data-v-f776846c>${ssrInterpolate(totalPrizes.value)}</span> ${ssrInterpolate(totalPrizes.value === 1 ? "prize" : "prizes")}!</div><div class="text-3xl font-black mt-2 prize-amount" data-v-f776846c>£${ssrInterpolate(totalWinnings.value.toFixed(2))}</div></div>`);
        } else {
          _push(`<div class="text-center" data-v-f776846c><div class="text-gray-400 text-2xl font-bold mb-2" data-v-f776846c>Better luck next time!</div><div class="text-gray-500 text-sm" data-v-f776846c>No prizes this round</div></div>`);
        }
        _push(`<button class="mt-6 px-6 py-2 rounded-full font-bold text-sm text-white bg-white/20 hover:bg-white/30 transition-colors" data-v-f776846c> Close </button></div>`);
      } else {
        _push(`<!---->`);
      }
      ssrRenderTeleport(_push, (_push2) => {
        if (showPopup.value && popupPrize.value) {
          _push2(`<div class="fixed inset-0 flex items-center justify-center z-[100000] pointer-events-none" data-v-f776846c><div class="win-popup-content text-center p-8 rounded-2xl shadow-2xl" style="${ssrRenderStyle({
            background: `linear-gradient(135deg, ${colors.value.popupStart}, ${colors.value.popupEnd})`,
            boxShadow: `0 10px 40px rgba(0,0,0,0.3), 0 0 80px ${colors.value.popupStart}80`,
            border: "3px solid rgba(255,255,255,0.3)"
          })}" data-v-f776846c><div class="text-white text-2xl font-black tracking-wider mb-2" data-v-f776846c>${ssrInterpolate(popupPrize.value.isFullHouse ? "FULL HOUSE!" : "YOU WON!")}</div>`);
          if (!popupPrize.value.noAutoCredit) {
            _push2(`<div class="text-5xl font-black prize-amount" data-v-f776846c> £${ssrInterpolate(popupPrize.value.value.toFixed(2))}</div>`);
          } else {
            _push2(`<div class="text-3xl font-black prize-amount" data-v-f776846c>${ssrInterpolate(popupPrize.value.prizeName)}</div>`);
          }
          _push2(`<div class="sparkle-container absolute inset-0 pointer-events-none overflow-hidden" data-v-f776846c><!--[-->`);
          ssrRenderList(6, (i) => {
            _push2(`<div class="sparkle" style="${ssrRenderStyle({ "--delay": `${i * 0.1}s`, "--angle": `${i * 60}deg` })}" data-v-f776846c></div>`);
          });
          _push2(`<!--]--></div></div></div>`);
        } else {
          _push2(`<!---->`);
        }
      }, "body", __props.demoMode, _parent);
      _push(`</div>`);
    };
  }
});
const _sfc_setup$1 = _sfc_main$1.setup;
_sfc_main$1.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("resources/js/Components/Games/BingoGame.vue");
  return _sfc_setup$1 ? _sfc_setup$1(props, ctx) : void 0;
};
const BingoGame = /* @__PURE__ */ _export_sfc(_sfc_main$1, [["__scopeId", "data-v-f776846c"]]);
const _sfc_main = /* @__PURE__ */ defineComponent({
  __name: "BingoModal",
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
    const bingoAssets = reactive({
      background: props.assets.background || "",
      header: props.assets.header || "",
      cardCover: props.assets.cardCover || "",
      diamondEmoji: props.assets.diamondEmoji || "💎",
      bgStart: props.assets.bgStart || "#1e3a8a",
      bgEnd: props.assets.bgEnd || "#1e40af",
      frameColor: props.assets.frameColor || "#3b82f6",
      frameGlow: props.assets.frameGlow || "#60a5fa",
      squareBg: props.assets.squareBg || "#374151",
      squareText: props.assets.squareText || "#e5e7eb",
      diamond1: props.assets.diamond1 || "#06b6d4",
      diamond2: props.assets.diamond2 || "#67e8f9",
      winnerGlow: props.assets.winnerGlow || "#10b981",
      winnerBg: props.assets.winnerBg || "#059669",
      popupStart: props.assets.popupStart || "#10b981",
      popupEnd: props.assets.popupEnd || "#059669",
      revealSound: props.assets.revealSound || "",
      winSound: props.assets.winSound || "",
      lossSound: props.assets.lossSound || "",
      patternRules: props.assets.patternRules || []
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
    const prizes = computed(() => {
      if (!props.instant_win_categories || props.instant_win_categories.length === 0) {
        return [];
      }
      return props.instant_win_categories.map((category) => ({
        id: category.id,
        name: category.name,
        image: category.image_path,
        value: category.value,
        no_auto_credit: category.no_auto_credit
      }));
    });
    const availableTickets = computed(() => {
      if (props.demoMode || !props.tickets) {
        return [];
      }
      return props.tickets.filter((ticket) => !playedTickets.value.includes(ticket.id));
    });
    watch(() => props.assets.background, (newVal) => {
      bingoAssets.background = newVal || "";
    }, { immediate: true });
    watch(() => props.assets.header, (newVal) => {
      bingoAssets.header = newVal || "";
    }, { immediate: true });
    watch(() => props.assets.cardCover, (newVal) => {
      bingoAssets.cardCover = newVal || "";
    }, { immediate: true });
    watch(() => props.assets.diamondEmoji, (newVal) => {
      bingoAssets.diamondEmoji = newVal || "💎";
    }, { immediate: true });
    watch(() => props.assets.bgStart, (newVal) => {
      bingoAssets.bgStart = newVal || "#1e3a8a";
    }, { immediate: true });
    watch(() => props.assets.bgEnd, (newVal) => {
      bingoAssets.bgEnd = newVal || "#1e40af";
    }, { immediate: true });
    watch(() => props.assets.frameColor, (newVal) => {
      bingoAssets.frameColor = newVal || "#3b82f6";
    }, { immediate: true });
    watch(() => props.assets.frameGlow, (newVal) => {
      bingoAssets.frameGlow = newVal || "#60a5fa";
    }, { immediate: true });
    watch(() => props.assets.squareBg, (newVal) => {
      bingoAssets.squareBg = newVal || "#374151";
    }, { immediate: true });
    watch(() => props.assets.squareText, (newVal) => {
      bingoAssets.squareText = newVal || "#e5e7eb";
    }, { immediate: true });
    watch(() => props.assets.diamond1, (newVal) => {
      bingoAssets.diamond1 = newVal || "#06b6d4";
    }, { immediate: true });
    watch(() => props.assets.diamond2, (newVal) => {
      bingoAssets.diamond2 = newVal || "#67e8f9";
    }, { immediate: true });
    watch(() => props.assets.winnerGlow, (newVal) => {
      bingoAssets.winnerGlow = newVal || "#10b981";
    }, { immediate: true });
    watch(() => props.assets.winnerBg, (newVal) => {
      bingoAssets.winnerBg = newVal || "#059669";
    }, { immediate: true });
    watch(() => props.assets.popupStart, (newVal) => {
      bingoAssets.popupStart = newVal || "#10b981";
    }, { immediate: true });
    watch(() => props.assets.popupEnd, (newVal) => {
      bingoAssets.popupEnd = newVal || "#059669";
    }, { immediate: true });
    watch(() => props.assets.revealSound, (newVal) => {
      bingoAssets.revealSound = newVal || "";
    }, { immediate: true });
    watch(() => props.assets.winSound, (newVal) => {
      bingoAssets.winSound = newVal || "";
    }, { immediate: true });
    watch(() => props.assets.lossSound, (newVal) => {
      bingoAssets.lossSound = newVal || "";
    }, { immediate: true });
    watch(() => props.assets.patternRules, (newVal) => {
      bingoAssets.patternRules = newVal || [];
    }, { immediate: true });
    watch(() => props.tickets, () => {
      playedTickets.value = [];
    });
    watch(() => props.modelValue, (open) => {
      if (open) playedTickets.value = [];
    });
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
    const handleTicketPlayed = (ticketId) => {
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
          })}" data-v-a24bbc6f>`);
          if (__props.demoMode) {
            _push2(`<div class="mb-4 flex items-center space-x-3 bg-gray-800 rounded-lg p-2" data-v-a24bbc6f><span class="text-white text-sm font-medium" data-v-a24bbc6f>Preview Mode:</span><button class="${ssrRenderClass([
              "px-3 py-1 rounded text-sm font-medium transition-colors",
              actualPreviewMode.value === "mobile" ? "bg-blue-500 text-white" : "bg-gray-600 text-gray-300 hover:bg-gray-500"
            ])}" data-v-a24bbc6f> 📱 Mobile </button><button class="${ssrRenderClass([
              "px-3 py-1 rounded text-sm font-medium transition-colors",
              actualPreviewMode.value === "desktop" ? "bg-blue-500 text-white" : "bg-gray-600 text-gray-300 hover:bg-gray-500"
            ])}" data-v-a24bbc6f> 💻 Desktop </button></div>`);
          } else {
            _push2(`<!---->`);
          }
          _push2(`<div class="${ssrRenderClass([containerClasses.value, { "demo-mode": __props.demoMode }, "modal-zoom-in"])}" style="${ssrRenderStyle(modalStyle.value)}" data-v-a24bbc6f>`);
          if (__props.demoMode) {
            _push2(`<!--[-->`);
            if (actualPreviewMode.value === "mobile") {
              _push2(`<div class="h-8 bg-black flex items-center justify-between px-4 text-white text-sm" data-v-a24bbc6f><span data-v-a24bbc6f>9:41</span><div class="flex space-x-1" data-v-a24bbc6f><div class="w-4 h-2 border border-white rounded-sm" data-v-a24bbc6f></div><div class="w-1 h-2 bg-white rounded-sm" data-v-a24bbc6f></div></div></div>`);
            } else {
              _push2(`<!---->`);
            }
            if (actualPreviewMode.value === "desktop") {
              _push2(`<div class="h-10 bg-gray-700 flex items-center justify-between px-4 text-white text-sm border-b border-gray-600" data-v-a24bbc6f><div class="flex items-center space-x-2" data-v-a24bbc6f><div class="flex space-x-1" data-v-a24bbc6f><div class="w-3 h-3 bg-red-500 rounded-full" data-v-a24bbc6f></div><div class="w-3 h-3 bg-yellow-500 rounded-full" data-v-a24bbc6f></div><div class="w-3 h-3 bg-green-500 rounded-full" data-v-a24bbc6f></div></div><span class="ml-4 text-gray-300" data-v-a24bbc6f>🎯 Bingo Game - Match to Win</span></div><div class="text-gray-400 text-xs" data-v-a24bbc6f>Chrome</div></div>`);
            } else {
              _push2(`<!---->`);
            }
            _push2(`<!--]-->`);
          } else {
            _push2(`<!---->`);
          }
          if (!__props.demoMode) {
            _push2(`<button class="absolute top-4 right-4 text-gray-700 bg-white/90 hover:bg-white rounded-full w-10 h-10 flex items-center justify-center focus:outline-none text-2xl z-50 shadow-lg transition-all duration-200 hover:scale-110" aria-label="Close modal" data-v-a24bbc6f> ✕ </button>`);
          } else {
            _push2(`<!---->`);
          }
          _push2(`<div class="${ssrRenderClass(["flex flex-col relative bingo-game-wrapper overflow-hidden", __props.demoMode ? "flex-1" : "h-full"])}" style="${ssrRenderStyle({ "z-index": "1" })}" data-v-a24bbc6f>`);
          _push2(ssrRenderComponent(BingoGame, {
            assets: bingoAssets,
            prizes: prizes.value,
            tickets: availableTickets.value,
            demoMode: __props.demoMode,
            previewMode: actualPreviewMode.value,
            onTicketPlayed: handleTicketPlayed
          }, null, _parent));
          _push2(`</div></div>`);
          if (__props.demoMode) {
            _push2(`<div class="mt-2 text-center text-gray-400 text-xs" data-v-a24bbc6f>${ssrInterpolate(actualPreviewMode.value === "mobile" ? "📱 Mobile Preview (420x650)" : "💻 Desktop Preview (700x650)")}</div>`);
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
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("resources/js/Components/Games/BingoModal.vue");
  return _sfc_setup ? _sfc_setup(props, ctx) : void 0;
};
const BingoModal = /* @__PURE__ */ _export_sfc(_sfc_main, [["__scopeId", "data-v-a24bbc6f"]]);
export {
  BingoModal as default
};
