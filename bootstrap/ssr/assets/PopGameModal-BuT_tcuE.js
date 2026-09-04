import { defineComponent, ref, computed, watch, mergeProps, useSSRContext, reactive, onMounted, onUnmounted } from "vue";
import { ssrRenderAttrs, ssrInterpolate, ssrRenderClass, ssrRenderList, ssrRenderStyle, ssrRenderAttr, ssrRenderTeleport, ssrRenderComponent } from "vue/server-renderer";
import { s as siteCreditLabel } from "./prizeLabel-Z9qw9N7H.js";
import { _ as _export_sfc } from "../ssr.js";
import "@inertiajs/vue3";
import "three";
import "axios";
import "@inertiajs/vue3/server";
const _sfc_main$1 = /* @__PURE__ */ defineComponent({
  __name: "PopGameBoard",
  __ssrInlineRender: true,
  props: {
    popGameAssets: {},
    demoMode: { type: Boolean, default: false },
    previewMode: { default: "mobile" },
    tickets: {},
    playedTickets: { default: () => [] },
    instant_win_categories: {}
  },
  emits: ["ticket-played", "prize-won"],
  setup(__props, { emit: __emit }) {
    const props = __props;
    ref(null);
    ref(null);
    ref(null);
    const popItems = ref([]);
    const totalWins = ref(0);
    const otherPrizeWins = ref(0);
    const totalPopped = ref(0);
    const confettiParticles = ref([]);
    const showWinToast = ref(false);
    const winToastAmount = ref(0);
    const winToastNoAutoCredit = ref(false);
    const winToastPrizeName = ref("");
    const allPopped = ref(false);
    const isPopAllRunning = ref(false);
    ref(false);
    const demoTickets = computed(() => {
      if (!props.demoMode) return [];
      const tickets = [];
      for (let i = 1; i <= 30; i++) {
        const isWinner = i % 5 === 0;
        tickets.push({
          id: i,
          number: `DEMO-${String(i).padStart(4, "0")}`,
          competition_id: 1,
          instant_win: isWinner ? {
            id: i,
            name: "Demo Prize",
            prize: `£${(Math.random() * 50 + 5).toFixed(2)}`,
            value: Math.random() * 50 + 5,
            claimed: false,
            image_path: null,
            won_date: null,
            category_id: 1
          } : false
        });
      }
      return tickets;
    });
    const activeTickets = computed(() => {
      return props.demoMode ? demoTickets.value : props.tickets || [];
    });
    const displayedItems = computed(() => popItems.value);
    const itemColors = computed(() => {
      return props.popGameAssets.popItemColors || [
        "#FF4C4C",
        "#FFEB3B",
        "#64B5F6",
        "#81C784",
        "#9575CD",
        "#FF8A80",
        "#FFB74D",
        "#4DD0E1",
        "#F06292",
        "#FFD700"
      ];
    });
    computed(() => {
      return props.popGameAssets.popConfettiColors || [
        "#FFD700",
        "#FF6B6B",
        "#4ECDC4",
        "#45B7D1",
        "#96CEB4",
        "#FFEAA7"
      ];
    });
    const initializeItems = () => {
      var _a;
      const colors = itemColors.value;
      popItems.value = activeTickets.value.map((ticket, index) => {
        var _a2, _b;
        const instantWin = ticket.instant_win;
        const isWinner = instantWin !== false && instantWin.prize !== "NO WIN";
        const isNoAutoCredit = isWinner && instantWin && instantWin.category_id && ((_a2 = props.instant_win_categories) == null ? void 0 : _a2.length) ? props.instant_win_categories.some((c) => c.id === instantWin.category_id && c.no_auto_credit) : false;
        const isTicketBundle = isWinner && instantWin && instantWin.prize_type === "ticket_bundle";
        const rawValue = isWinner && instantWin ? parseFloat(String(instantWin.value)) || 0 : 0;
        if (index === 0) console.log("[categories]", JSON.stringify(props.instant_win_categories));
        console.log("[ticket]", ticket.number, "category_id:", instantWin && instantWin !== false ? instantWin.category_id : "N/A", "isWinner:", isWinner, "isNoAutoCredit:", isNoAutoCredit, "prizeValue:", isTicketBundle ? 0 : rawValue);
        return {
          id: index,
          ticketId: ticket.id,
          ticketNumber: ticket.number,
          color: colors[index % colors.length],
          isWinner,
          prize: isWinner && instantWin ? isTicketBundle ? `${Math.floor(rawValue)} Free Ticket${rawValue !== 1 ? "s" : ""}` : siteCreditLabel(instantWin.prize_type, rawValue) ?? instantWin.prize : null,
          prizeValue: isTicketBundle ? 0 : rawValue,
          noAutoCredit: isNoAutoCredit || isTicketBundle,
          popped: ((_b = props.playedTickets) == null ? void 0 : _b.includes(ticket.id)) || false,
          animating: false,
          floatDelay: Math.random() * 2,
          shakeX: Math.random() * 5 - 2.5,
          shakeY: Math.random() * 5 - 2.5
        };
      });
      popItems.value = shuffleArray([...popItems.value]);
      totalPopped.value = ((_a = props.playedTickets) == null ? void 0 : _a.length) || 0;
      allPopped.value = false;
    };
    const shuffleArray = (array) => {
      const shuffled = [...array];
      for (let i = shuffled.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [shuffled[i], shuffled[j]] = [shuffled[j], shuffled[i]];
      }
      return shuffled;
    };
    watch(() => activeTickets.value, () => {
      initializeItems();
    }, { immediate: true });
    return (_ctx, _push, _parent, _attrs) => {
      _push(`<div${ssrRenderAttrs(mergeProps({
        class: "pop-game-board",
        style: {
          "--bg-color": __props.popGameAssets.popBgColor || "#1a1a2e",
          "--bg-image": __props.popGameAssets.background ? `url(${__props.popGameAssets.background})` : "none",
          "--primary-color": __props.popGameAssets.primaryColor || "#e94560",
          "--accent-color": __props.popGameAssets.accentColor || "#ffd700",
          "--win-color": __props.popGameAssets.popWinColor || "#00ff88",
          "--lose-color": __props.popGameAssets.popLoseColor || "#ff4444"
        }
      }, _attrs))} data-v-3f2e00ec><div class="game-header" data-v-3f2e00ec><div class="stat-card" data-v-3f2e00ec><span class="stat-label" data-v-3f2e00ec>Total Wins</span><span class="stat-value win-value" data-v-3f2e00ec>${ssrInterpolate(totalWins.value.toFixed(2))}</span></div><div class="stat-card" data-v-3f2e00ec><span class="stat-label" data-v-3f2e00ec>Popped</span><span class="stat-value" data-v-3f2e00ec>${ssrInterpolate(totalPopped.value)} / ${ssrInterpolate(popItems.value.length)}</span></div></div><div class="game-grid-container" data-v-3f2e00ec><div class="${ssrRenderClass([{ "mobile-grid": __props.previewMode === "mobile" }, "game-grid"])}" data-v-3f2e00ec><!--[-->`);
      ssrRenderList(displayedItems.value, (item) => {
        _push(`<div class="${ssrRenderClass([{
          "popped": item.popped,
          "animating": item.animating,
          "winner": item.popped && item.isWinner,
          "loser": item.popped && !item.isWinner
        }, "pop-item-container"])}" data-v-3f2e00ec>`);
        if (!item.popped) {
          _push(`<div class="pop-item" style="${ssrRenderStyle({
            "--item-color": item.color,
            "--float-delay": item.floatDelay + "s",
            "--shake-x": item.shakeX + "px",
            "--shake-y": item.shakeY + "px"
          })}" data-v-3f2e00ec>`);
          if (__props.popGameAssets.popItemImage) {
            _push(`<img${ssrRenderAttr("src", __props.popGameAssets.popItemImage)} class="custom-item-image" alt="Pop item" data-v-3f2e00ec>`);
          } else if (__props.popGameAssets.popItemType === "balloon" || !__props.popGameAssets.popItemType) {
            _push(`<svg class="balloon-svg" viewBox="0 0 100 150" xmlns="http://www.w3.org/2000/svg" data-v-3f2e00ec><ellipse cx="50" cy="55" rx="40" ry="50"${ssrRenderAttr("fill", item.color)} class="balloon-body" data-v-3f2e00ec></ellipse><ellipse cx="35" cy="40" rx="12" ry="18" fill="rgba(255,255,255,0.3)" class="balloon-highlight" data-v-3f2e00ec></ellipse><polygon points="45,105 55,105 50,115"${ssrRenderAttr("fill", item.color)} data-v-3f2e00ec></polygon><path d="M50 115 Q45 125 50 135 Q55 145 50 150" stroke="#666" stroke-width="2" fill="none" class="balloon-string" data-v-3f2e00ec></path></svg>`);
          } else if (__props.popGameAssets.popItemType === "present") {
            _push(`<div class="present-box" style="${ssrRenderStyle({ "--box-color": item.color })}" data-v-3f2e00ec><div class="present-ribbon" data-v-3f2e00ec></div><div class="present-bow" data-v-3f2e00ec></div></div>`);
          } else if (__props.popGameAssets.popItemType === "egg") {
            _push(`<div class="egg" style="${ssrRenderStyle({ background: item.color })}" data-v-3f2e00ec><div class="egg-pattern" data-v-3f2e00ec></div></div>`);
          } else {
            _push(`<!---->`);
          }
          _push(`</div>`);
        } else {
          _push(`<div class="${ssrRenderClass([{ "is-winner": item.isWinner }, "popped-result"])}" data-v-3f2e00ec><div class="ticket-number" data-v-3f2e00ec>${ssrInterpolate(item.ticketNumber)}</div>`);
          if (item.isWinner && item.prize) {
            _push(`<div class="prize-amount" data-v-3f2e00ec>${ssrInterpolate(item.prize)}</div>`);
          } else {
            _push(`<div class="no-win-text" data-v-3f2e00ec> NO WIN </div>`);
          }
          _push(`</div>`);
        }
        if (item.animating) {
          _push(`<div class="pop-explosion" data-v-3f2e00ec><!--[-->`);
          ssrRenderList(8, (n) => {
            _push(`<div class="explosion-particle" style="${ssrRenderStyle({
              "--rotation": n * 45 + "deg",
              "--color": item.color
            })}" data-v-3f2e00ec></div>`);
          });
          _push(`<!--]--></div>`);
        } else {
          _push(`<!---->`);
        }
        _push(`</div>`);
      });
      _push(`<!--]--></div><div class="confetti-container" data-v-3f2e00ec><!--[-->`);
      ssrRenderList(confettiParticles.value, (particle) => {
        _push(`<div class="confetti-particle" style="${ssrRenderStyle({
          left: particle.x + "%",
          top: particle.y + "%",
          backgroundColor: particle.color,
          transform: `rotate(${particle.rotation}deg) scale(${particle.scale})`
        })}" data-v-3f2e00ec></div>`);
      });
      _push(`<!--]--></div></div><div class="actions" data-v-3f2e00ec>`);
      if (!allPopped.value && displayedItems.value.some((i) => !i.popped) && !isPopAllRunning.value) {
        _push(`<button class="pop-all-btn" data-v-3f2e00ec> Pop All </button>`);
      } else {
        _push(`<!---->`);
      }
      if (isPopAllRunning.value) {
        _push(`<button class="skip-all-btn" data-v-3f2e00ec> Skip </button>`);
      } else {
        _push(`<!---->`);
      }
      _push(`</div>`);
      if (allPopped.value) {
        _push(`<div class="all-popped-message" data-v-3f2e00ec><h3 data-v-3f2e00ec>All Done!</h3>`);
        if (otherPrizeWins.value > 0 && totalWins.value <= 0) {
          _push(`<p data-v-3f2e00ec>You won <strong data-v-3f2e00ec>${ssrInterpolate(otherPrizeWins.value)} prize${ssrInterpolate(otherPrizeWins.value > 1 ? "s" : "")}</strong> — check My Prizes!</p>`);
        } else if (otherPrizeWins.value > 0) {
          _push(`<p data-v-3f2e00ec>You won a total of <strong data-v-3f2e00ec>${ssrInterpolate(totalWins.value.toFixed(2))}</strong> plus <strong data-v-3f2e00ec>${ssrInterpolate(otherPrizeWins.value)} prize${ssrInterpolate(otherPrizeWins.value > 1 ? "s" : "")}</strong>!</p>`);
        } else {
          _push(`<p data-v-3f2e00ec>You won a total of <strong data-v-3f2e00ec>${ssrInterpolate(totalWins.value.toFixed(2))}</strong></p>`);
        }
        _push(`</div>`);
      } else {
        _push(`<!---->`);
      }
      if (showWinToast.value) {
        _push(`<div class="win-toast" data-v-3f2e00ec>`);
        if (winToastNoAutoCredit.value) {
          _push(`<span class="toast-amount" data-v-3f2e00ec>${ssrInterpolate(winToastPrizeName.value)}</span>`);
        } else {
          _push(`<!--[--><span class="toast-icon" data-v-3f2e00ec>+</span><span class="toast-amount" data-v-3f2e00ec>${ssrInterpolate(winToastAmount.value.toFixed(2))}</span><!--]-->`);
        }
        _push(`</div>`);
      } else {
        _push(`<!---->`);
      }
      if (__props.popGameAssets.popSound) {
        _push(`<audio${ssrRenderAttr("src", __props.popGameAssets.popSound)} preload="auto" data-v-3f2e00ec></audio>`);
      } else {
        _push(`<!---->`);
      }
      if (__props.popGameAssets.winSound) {
        _push(`<audio${ssrRenderAttr("src", __props.popGameAssets.winSound)} preload="auto" data-v-3f2e00ec></audio>`);
      } else {
        _push(`<!---->`);
      }
      if (__props.popGameAssets.lossSound) {
        _push(`<audio${ssrRenderAttr("src", __props.popGameAssets.lossSound)} preload="auto" data-v-3f2e00ec></audio>`);
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
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("resources/js/Components/Games/PopGameBoard.vue");
  return _sfc_setup$1 ? _sfc_setup$1(props, ctx) : void 0;
};
const PopGameBoard = /* @__PURE__ */ _export_sfc(_sfc_main$1, [["__scopeId", "data-v-3f2e00ec"]]);
const _sfc_main = /* @__PURE__ */ defineComponent({
  __name: "PopGameModal",
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
    const showPopGame = ref(true);
    const showGameBoard = ref(false);
    const showLobby = ref(false);
    const showHowToPlay = ref(false);
    const popGameAssets = reactive({
      titleText: props.assets.titleText || "POP TO WIN!",
      titleColor: props.assets.titleColor || "#FFD700",
      titleImage: props.assets.titleImage || "",
      background: "",
      header: props.assets.header || "",
      primaryColor: props.assets.primaryColor || "#e94560",
      secondaryColor: props.assets.secondaryColor || "#1a1a2e",
      accentColor: props.assets.accentColor || "#ffd700",
      textColor: props.assets.textColor || "#FFFFFF",
      welcomeSound: props.assets.welcomeSound || "",
      winSound: props.assets.winSound || "",
      lossSound: props.assets.lossSound || "",
      popItemType: props.assets.popItemType || "balloon",
      popItemImage: props.assets.popItemImage || "",
      popSound: props.assets.popSound || "",
      popBgColor: props.assets.popBgColor || "#1a1a2e",
      popItemColors: props.assets.popItemColors || ["#FF4C4C", "#FFEB3B", "#64B5F6", "#81C784", "#9575CD", "#FF8A80", "#FFB74D", "#4DD0E1", "#F06292", "#FFD700"],
      popWinColor: props.assets.popWinColor || "#00ff88",
      popLoseColor: props.assets.popLoseColor || "#ff4444",
      popConfettiColors: props.assets.popConfettiColors || ["#FFD700", "#FF6B6B", "#4ECDC4", "#45B7D1", "#96CEB4", "#FFEAA7"],
      popSubtitleText: props.assets.popSubtitleText || "",
      popItemLabel: props.assets.popItemLabel || ""
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
        height: "750px",
        border: "1px solid #444",
        borderRadius: "12px"
      } : {
        width: "700px",
        height: "750px",
        border: "1px solid #444",
        borderRadius: "4px"
      };
    });
    const containerClasses = computed(() => {
      return ["relative", props.demoMode ? "shadow-lg overflow-hidden" : "w-full h-full overflow-hidden"];
    });
    watch(() => props.assets.titleText, (newVal) => {
      popGameAssets.titleText = newVal || "POP TO WIN!";
    }, { immediate: true });
    watch(() => props.assets.titleColor, (newVal) => {
      popGameAssets.titleColor = newVal || "#FFD700";
    }, { immediate: true });
    watch(() => props.assets.background, (newVal) => {
      popGameAssets.background = newVal || "";
    }, { immediate: true });
    watch(() => props.assets.header, (newVal) => {
      popGameAssets.header = newVal || "";
    }, { immediate: true });
    watch(() => props.assets.primaryColor, (newVal) => {
      popGameAssets.primaryColor = newVal || "#e94560";
    }, { immediate: true });
    watch(() => props.assets.secondaryColor, (newVal) => {
      popGameAssets.secondaryColor = newVal || "#1a1a2e";
    }, { immediate: true });
    watch(() => props.assets.accentColor, (newVal) => {
      popGameAssets.accentColor = newVal || "#ffd700";
    }, { immediate: true });
    watch(() => props.assets.textColor, (newVal) => {
      popGameAssets.textColor = newVal || "#FFFFFF";
    }, { immediate: true });
    watch(() => props.assets.titleImage, (newVal) => {
      popGameAssets.titleImage = newVal || "";
    }, { immediate: true });
    watch(() => props.assets.welcomeSound, (newVal) => {
      popGameAssets.welcomeSound = newVal || "";
    }, { immediate: true });
    watch(() => props.assets.winSound, (newVal) => {
      popGameAssets.winSound = newVal || "";
    }, { immediate: true });
    watch(() => props.assets.lossSound, (newVal) => {
      popGameAssets.lossSound = newVal || "";
    }, { immediate: true });
    watch(() => props.assets.popItemType, (newVal) => {
      popGameAssets.popItemType = newVal || "balloon";
    }, { immediate: true });
    watch(() => props.assets.popItemImage, (newVal) => {
      popGameAssets.popItemImage = newVal || "";
    }, { immediate: true });
    watch(() => props.assets.popSound, (newVal) => {
      popGameAssets.popSound = newVal || "";
    }, { immediate: true });
    watch(() => props.assets.popBgColor, (newVal) => {
      popGameAssets.popBgColor = newVal || "#1a1a2e";
    }, { immediate: true });
    watch(() => props.assets.popItemColors, (newVal) => {
      popGameAssets.popItemColors = newVal || ["#FF4C4C", "#FFEB3B", "#64B5F6", "#81C784", "#9575CD"];
    }, { immediate: true });
    watch(() => props.assets.popWinColor, (newVal) => {
      popGameAssets.popWinColor = newVal || "#00ff88";
    }, { immediate: true });
    watch(() => props.assets.popLoseColor, (newVal) => {
      popGameAssets.popLoseColor = newVal || "#ff4444";
    }, { immediate: true });
    watch(() => props.assets.popConfettiColors, (newVal) => {
      popGameAssets.popConfettiColors = newVal || ["#FFD700", "#FF6B6B", "#4ECDC4"];
    }, { immediate: true });
    watch(() => props.assets.popSubtitleText, (newVal) => {
      popGameAssets.popSubtitleText = newVal || "";
    }, { immediate: true });
    watch(() => props.assets.popItemLabel, (newVal) => {
      popGameAssets.popItemLabel = newVal || "";
    }, { immediate: true });
    const itemLabelPlural = computed(() => {
      if (popGameAssets.popItemLabel) return popGameAssets.popItemLabel;
      return popGameAssets.popItemType === "present" ? "presents" : popGameAssets.popItemType === "egg" ? "eggs" : "balloons";
    });
    const itemLabelSingular = computed(() => {
      if (popGameAssets.popItemLabel) return popGameAssets.popItemLabel;
      return popGameAssets.popItemType === "present" ? "present" : popGameAssets.popItemType === "egg" ? "egg" : "balloon";
    });
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
          showPopGame.value = true;
          showGameBoard.value = false;
          showLobby.value = true;
          showHowToPlay.value = false;
          if (popGameAssets.welcomeSound && !props.demoMode) {
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
          showPopGame.value = true;
          showGameBoard.value = false;
          showLobby.value = false;
          showHowToPlay.value = false;
        }
      },
      { immediate: true }
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
    const floatingItems = computed(() => {
      const colors = popGameAssets.popItemColors || ["#FF4C4C", "#FFEB3B", "#64B5F6", "#81C784", "#9575CD"];
      const items = [];
      const count = 15;
      for (let i = 0; i < count; i++) {
        items.push({
          id: i,
          color: colors[i % colors.length],
          left: `${5 + i * 7 % 85}%`,
          // Spread across width
          size: 25 + i % 5 * 8,
          // Varying sizes 25-57px
          delay: i * 0.8,
          // Stagger the start times
          duration: 8 + i % 5 * 2,
          // 8-16s to float up (slower = more relaxed)
          swayAmount: 15 + i % 3 * 10
          // Different sway amounts
        });
      }
      return items;
    });
    const onTicketPlayed = (ticketId) => {
      if (!playedTickets.value.includes(ticketId)) {
        playedTickets.value.push(ticketId);
      }
    };
    onMounted(() => {
      window.addEventListener("keydown", onEsc);
      if (props.modelValue && !showLobby.value && !showGameBoard.value) {
        showLobby.value = true;
      }
    });
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
          })}" data-v-e22d3019>`);
          if (__props.demoMode) {
            _push2(`<div class="mb-4 flex items-center space-x-3 bg-gray-800 rounded-lg p-2" data-v-e22d3019><span class="text-white text-sm font-medium" data-v-e22d3019>Preview Mode:</span><button class="${ssrRenderClass([
              "px-3 py-1 rounded text-sm font-medium transition-colors",
              actualPreviewMode.value === "mobile" ? "bg-blue-500 text-white" : "bg-gray-600 text-gray-300 hover:bg-gray-500"
            ])}" data-v-e22d3019> Mobile </button><button class="${ssrRenderClass([
              "px-3 py-1 rounded text-sm font-medium transition-colors",
              actualPreviewMode.value === "desktop" ? "bg-blue-500 text-white" : "bg-gray-600 text-gray-300 hover:bg-gray-500"
            ])}" data-v-e22d3019> Desktop </button></div>`);
          } else {
            _push2(`<!---->`);
          }
          _push2(`<div class="${ssrRenderClass([containerClasses.value, { "demo-mode": __props.demoMode }, "modal-zoom-in", "unified-bg"])}" style="${ssrRenderStyle({
            ...modalStyle.value,
            "--bg-image": popGameAssets.background ? `url(${popGameAssets.background})` : "none",
            "--bg-color": popGameAssets.popBgColor || "#1a1a2e"
          })}" data-v-e22d3019>`);
          if (__props.demoMode) {
            _push2(`<!--[-->`);
            if (actualPreviewMode.value === "mobile") {
              _push2(`<div class="h-8 bg-black flex items-center justify-between px-4 text-white text-sm" data-v-e22d3019><span data-v-e22d3019>9:41</span><div class="flex space-x-1" data-v-e22d3019><div class="w-4 h-2 border border-white rounded-sm" data-v-e22d3019></div><div class="w-1 h-2 bg-white rounded-sm" data-v-e22d3019></div></div></div>`);
            } else {
              _push2(`<!---->`);
            }
            if (actualPreviewMode.value === "desktop") {
              _push2(`<div class="h-10 bg-gray-700 flex items-center justify-between px-4 text-white text-sm border-b border-gray-600" data-v-e22d3019><div class="flex items-center space-x-2" data-v-e22d3019><div class="flex space-x-1" data-v-e22d3019><div class="w-3 h-3 bg-red-500 rounded-full" data-v-e22d3019></div><div class="w-3 h-3 bg-yellow-500 rounded-full" data-v-e22d3019></div><div class="w-3 h-3 bg-green-500 rounded-full" data-v-e22d3019></div></div><span class="ml-4 text-gray-300" data-v-e22d3019>Pop Game - Pop to Win!</span></div><div class="text-gray-400 text-xs" data-v-e22d3019>Chrome</div></div>`);
            } else {
              _push2(`<!---->`);
            }
            _push2(`<!--]-->`);
          } else {
            _push2(`<!---->`);
          }
          if (!__props.demoMode) {
            _push2(`<button class="absolute top-4 right-4 text-gray-700 bg-white/90 hover:bg-white rounded-full w-10 h-10 flex items-center justify-center focus:outline-none text-2xl z-50 shadow-lg transition-all duration-200 hover:scale-110" aria-label="Close modal" data-v-e22d3019> X </button>`);
          } else {
            _push2(`<!---->`);
          }
          if (showLobby.value) {
            _push2(`<div class="lobby-screen" style="${ssrRenderStyle({
              "--lobby-primary": popGameAssets.primaryColor || "#e94560",
              "--lobby-secondary": popGameAssets.secondaryColor || "#1a1a2e",
              "--lobby-accent": popGameAssets.accentColor || "#ffd700"
            })}" data-v-e22d3019><div class="floating-items-container" data-v-e22d3019><!--[-->`);
            ssrRenderList(floatingItems.value, (item) => {
              _push2(`<div class="floating-item" style="${ssrRenderStyle({
                left: item.left,
                "--item-color": item.color,
                "--item-size": `${item.size}px`,
                "--float-delay": `${item.delay}s`,
                "--float-duration": `${item.duration}s`,
                "--sway-amount": `${item.swayAmount}px`
              })}" data-v-e22d3019>`);
              if (popGameAssets.popItemImage) {
                _push2(`<img${ssrRenderAttr("src", popGameAssets.popItemImage)}${ssrRenderAttr("width", item.size)}${ssrRenderAttr("height", item.size)} class="floating-custom-image" alt="" data-v-e22d3019>`);
              } else if (popGameAssets.popItemType === "balloon" || !popGameAssets.popItemType) {
                _push2(`<svg${ssrRenderAttr("width", item.size)}${ssrRenderAttr("height", item.size * 1.3)} viewBox="0 0 50 65" class="balloon-svg" data-v-e22d3019><defs data-v-e22d3019><radialGradient${ssrRenderAttr("id", "balloonGrad" + item.id)} cx="30%" cy="30%" r="70%" data-v-e22d3019><stop offset="0%" style="${ssrRenderStyle({ stopColor: "white", stopOpacity: 0.4 })}" data-v-e22d3019></stop><stop offset="100%" style="${ssrRenderStyle({ stopColor: item.color, stopOpacity: 1 })}" data-v-e22d3019></stop></radialGradient></defs><path${ssrRenderAttr("d", `M25 2 C10 2 3 15 3 25 C3 38 12 47 25 50 C38 47 47 38 47 25 C47 15 40 2 25 2`)}${ssrRenderAttr("fill", `url(#balloonGrad${item.id})`)} data-v-e22d3019></path><ellipse cx="25" cy="52" rx="3" ry="2"${ssrRenderAttr("fill", item.color)} data-v-e22d3019></ellipse><path d="M25 54 Q22 58 25 62 Q28 58 25 54" stroke="rgba(255,255,255,0.4)" stroke-width="1" fill="none" data-v-e22d3019></path></svg>`);
              } else if (popGameAssets.popItemType === "present") {
                _push2(`<svg${ssrRenderAttr("width", item.size)}${ssrRenderAttr("height", item.size)} viewBox="0 0 50 50" class="present-svg" data-v-e22d3019><defs data-v-e22d3019><linearGradient${ssrRenderAttr("id", "presentGrad" + item.id)} x1="0%" y1="0%" x2="100%" y2="100%" data-v-e22d3019><stop offset="0%" style="${ssrRenderStyle({ stopColor: item.color, stopOpacity: 1 })}" data-v-e22d3019></stop><stop offset="100%" style="${ssrRenderStyle({ stopColor: item.color, stopOpacity: 0.7 })}" data-v-e22d3019></stop></linearGradient></defs><rect x="5" y="18" width="40" height="28" rx="3"${ssrRenderAttr("fill", `url(#presentGrad${item.id})`)} data-v-e22d3019></rect><rect x="3" y="12" width="44" height="10" rx="2"${ssrRenderAttr("fill", item.color)} data-v-e22d3019></rect><rect x="22" y="12" width="6" height="34" fill="rgba(255,255,255,0.4)" data-v-e22d3019></rect><rect x="3" y="15" width="44" height="4" fill="rgba(255,255,255,0.4)" data-v-e22d3019></rect><circle cx="25" cy="8" r="5" fill="rgba(255,255,255,0.5)" data-v-e22d3019></circle><circle cx="20" cy="6" r="4" fill="rgba(255,255,255,0.4)" data-v-e22d3019></circle><circle cx="30" cy="6" r="4" fill="rgba(255,255,255,0.4)" data-v-e22d3019></circle></svg>`);
              } else if (popGameAssets.popItemType === "egg") {
                _push2(`<svg${ssrRenderAttr("width", item.size)}${ssrRenderAttr("height", item.size * 1.2)} viewBox="0 0 50 60" class="egg-svg" data-v-e22d3019><defs data-v-e22d3019><radialGradient${ssrRenderAttr("id", "eggGrad" + item.id)} cx="35%" cy="30%" r="65%" data-v-e22d3019><stop offset="0%" style="${ssrRenderStyle({ stopColor: "white", stopOpacity: 0.5 })}" data-v-e22d3019></stop><stop offset="100%" style="${ssrRenderStyle({ stopColor: item.color, stopOpacity: 1 })}" data-v-e22d3019></stop></radialGradient></defs><ellipse cx="25" cy="32" rx="20" ry="26"${ssrRenderAttr("fill", `url(#eggGrad${item.id})`)} data-v-e22d3019></ellipse><path d="M8 30 L12 24 L16 30 L20 24 L24 30 L28 24 L32 30 L36 24 L40 30" stroke="rgba(255,255,255,0.5)" stroke-width="2" fill="none" data-v-e22d3019></path><circle cx="15" cy="40" r="3" fill="rgba(255,255,255,0.4)" data-v-e22d3019></circle><circle cx="25" cy="45" r="2.5" fill="rgba(255,255,255,0.3)" data-v-e22d3019></circle><circle cx="35" cy="40" r="3" fill="rgba(255,255,255,0.4)" data-v-e22d3019></circle></svg>`);
              } else {
                _push2(`<!---->`);
              }
              _push2(`</div>`);
            });
            _push2(`<!--]--></div><div class="lobby-content" data-v-e22d3019><div class="lobby-title-area" data-v-e22d3019><div class="title-banner" data-v-e22d3019>`);
            if (popGameAssets.titleImage) {
              _push2(`<img${ssrRenderAttr("src", popGameAssets.titleImage)} alt="Game Title" class="lobby-title-image" data-v-e22d3019>`);
            } else {
              _push2(`<h1 class="lobby-title" style="${ssrRenderStyle({ color: popGameAssets.titleColor })}" data-v-e22d3019>${ssrInterpolate(popGameAssets.titleText || "POP TO WIN!")}</h1>`);
            }
            _push2(`</div><p class="lobby-subtitle" style="${ssrRenderStyle({ color: popGameAssets.accentColor })}" data-v-e22d3019>${ssrInterpolate(popGameAssets.popSubtitleText || `Pop ${itemLabelPlural.value} to win prizes!`)}</p></div>`);
            if (__props.tickets && __props.tickets.length > 0) {
              _push2(`<div class="lobby-ticket-display" data-v-e22d3019><div class="ticket-count-circle" style="${ssrRenderStyle({ "--circle-color": popGameAssets.primaryColor })}" data-v-e22d3019><span class="ticket-number" data-v-e22d3019>${ssrInterpolate(__props.tickets.length)}</span><span class="ticket-label" data-v-e22d3019>${ssrInterpolate(itemLabelPlural.value)}</span></div><p class="ticket-prompt" data-v-e22d3019>waiting to be popped!</p></div>`);
            } else {
              _push2(`<!---->`);
            }
            _push2(`<div class="lobby-buttons" data-v-e22d3019><button class="lobby-btn lobby-btn-primary" style="${ssrRenderStyle({
              "--btn-color": popGameAssets.primaryColor,
              "--btn-glow": popGameAssets.accentColor
            })}" data-v-e22d3019><span class="btn-text" data-v-e22d3019>Let&#39;s Pop!</span></button><button class="lobby-btn-help" style="${ssrRenderStyle({ "--help-color": popGameAssets.accentColor })}" data-v-e22d3019><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" data-v-e22d3019><circle cx="12" cy="12" r="10" data-v-e22d3019></circle><path d="M9.09 9a3 3 0 0 1 5.83 1c0 2-3 3-3 3" data-v-e22d3019></path><line x1="12" y1="17" x2="12.01" y2="17" data-v-e22d3019></line></svg> How to Play </button></div></div>`);
            if (showHowToPlay.value) {
              _push2(`<div class="how-to-play-overlay" style="${ssrRenderStyle({
                "--htp-primary": popGameAssets.primaryColor || "#e94560",
                "--htp-secondary": popGameAssets.secondaryColor || "#1a1a2e"
              })}" data-v-e22d3019><div class="how-to-play-modal" data-v-e22d3019><button class="how-to-play-close" data-v-e22d3019>X</button><h2 class="how-to-play-title" style="${ssrRenderStyle({ color: popGameAssets.accentColor })}" data-v-e22d3019> How to Play </h2><div class="how-to-play-steps" data-v-e22d3019><div class="step" data-v-e22d3019><div class="step-number" style="${ssrRenderStyle({ background: popGameAssets.primaryColor })}" data-v-e22d3019>1</div><div class="step-content" data-v-e22d3019><h3 data-v-e22d3019>Tap to Pop</h3><p data-v-e22d3019>Click or tap on any ${ssrInterpolate(itemLabelSingular.value)} to pop it and reveal what&#39;s inside.</p></div></div><div class="step" data-v-e22d3019><div class="step-number" style="${ssrRenderStyle({ background: popGameAssets.primaryColor })}" data-v-e22d3019>2</div><div class="step-content" data-v-e22d3019><h3 data-v-e22d3019>Reveal Your Prize</h3><p data-v-e22d3019>Each ${ssrInterpolate(itemLabelSingular.value)} contains a ticket number - some are instant winners!</p></div></div><div class="step" data-v-e22d3019><div class="step-number" style="${ssrRenderStyle({ background: popGameAssets.primaryColor })}" data-v-e22d3019>3</div><div class="step-content" data-v-e22d3019><h3 data-v-e22d3019>Collect Winnings</h3><p data-v-e22d3019>Winning ${ssrInterpolate(itemLabelPlural.value)} show your prize amount immediately!</p></div></div></div><div class="how-to-play-tip" data-v-e22d3019><span class="tip-icon" data-v-e22d3019>💡</span><span data-v-e22d3019>Pop all ${ssrInterpolate(itemLabelPlural.value)} to see your total winnings!</span></div><button class="how-to-play-got-it" style="${ssrRenderStyle({ background: popGameAssets.primaryColor })}" data-v-e22d3019> Got it! </button></div></div>`);
            } else {
              _push2(`<!---->`);
            }
            _push2(`</div>`);
          } else {
            _push2(`<!---->`);
          }
          if (showPopGame.value && showGameBoard.value) {
            _push2(`<div class="${ssrRenderClass(["flex flex-col relative pop-game-wrapper overflow-hidden", __props.demoMode ? "flex-1" : "h-full"])}" style="${ssrRenderStyle({
              zIndex: 1,
              "--game-bg": popGameAssets.popBgColor || "#1a1a2e",
              "--game-primary": popGameAssets.primaryColor || "#e94560",
              "--game-accent": popGameAssets.accentColor || "#ffd700"
            })}" data-v-e22d3019>`);
            if (__props.demoMode) {
              _push2(`<button class="demo-back-btn" data-v-e22d3019> Back to Lobby </button>`);
            } else {
              _push2(`<!---->`);
            }
            _push2(ssrRenderComponent(PopGameBoard, {
              popGameAssets,
              demoMode: __props.demoMode,
              previewMode: actualPreviewMode.value,
              tickets: __props.tickets,
              playedTickets: playedTickets.value,
              instant_win_categories: __props.instant_win_categories,
              onTicketPlayed,
              onPrizeWon
            }, null, _parent));
            _push2(`</div>`);
          } else {
            _push2(`<!---->`);
          }
          _push2(`</div>`);
          if (__props.demoMode) {
            _push2(`<div class="mt-2 text-center text-gray-400 text-xs" data-v-e22d3019>${ssrInterpolate(actualPreviewMode.value === "mobile" ? "Mobile Preview (420x750)" : "Desktop Preview (700x750)")}</div>`);
          } else {
            _push2(`<!---->`);
          }
          if (popGameAssets.welcomeSound) {
            _push2(`<audio${ssrRenderAttr("src", popGameAssets.welcomeSound)} preload="auto" data-v-e22d3019></audio>`);
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
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("resources/js/Components/Games/PopGameModal.vue");
  return _sfc_setup ? _sfc_setup(props, ctx) : void 0;
};
const PopGameModal = /* @__PURE__ */ _export_sfc(_sfc_main, [["__scopeId", "data-v-e22d3019"]]);
export {
  PopGameModal as default
};
