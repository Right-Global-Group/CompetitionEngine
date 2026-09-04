import { defineComponent, ref, computed, onMounted, mergeProps, useSSRContext, resolveComponent, withCtx, createTextVNode, reactive, watch, onUnmounted, createBlock, openBlock } from "vue";
import { ssrRenderAttrs, ssrRenderStyle, ssrRenderClass, ssrInterpolate, ssrRenderList, ssrRenderAttr, ssrRenderTeleport, ssrRenderComponent } from "vue/server-renderer";
import { g as gsapWithCSS, _ as _export_sfc } from "../ssr.js";
import { usePage } from "@inertiajs/vue3";
import "three";
import "axios";
import "@inertiajs/vue3/server";
const _sfc_main$2 = /* @__PURE__ */ defineComponent({
  __name: "SpinGame",
  __ssrInlineRender: true,
  props: {
    demoMode: { type: Boolean },
    previewMode: {},
    spinAssets: {},
    tickets: {},
    playedTickets: {}
  },
  emits: ["ticket-played", "prize-won"],
  setup(__props, { emit: __emit }) {
    const props = __props;
    const isSpinning = ref(false);
    const isAnimating = ref(false);
    ref(null);
    ref(null);
    const staticSegmentText = ref("TAP TO SPIN");
    const showResult = ref(false);
    const currentTicketNumber = ref("");
    const resultComplete = ref(false);
    const segments = [
      { index: 0, color: "#ffffff", text: "UNLUCKY", isWin: false },
      { index: 1, color: "#f3e8ff", text: "WINNER", isWin: true },
      { index: 2, color: "#ffffff", text: "UNLUCKY", isWin: false },
      { index: 3, color: "#f3e8ff", text: "LUCKY", isWin: true },
      { index: 4, color: "#ffffff", text: "UNLUCKY", isWin: false },
      { index: 5, color: "#f3e8ff", text: "WINNER", isWin: true },
      { index: 6, color: "#ffffff", text: "UNLUCKY", isWin: false },
      { index: 7, color: "#f3e8ff", text: "LUCKY", isWin: true },
      { index: 8, color: "#ffffff", text: "UNLUCKY", isWin: false },
      { index: 9, color: "#f3e8ff", text: "WINNER", isWin: true },
      { index: 10, color: "#ffffff", text: "UNLUCKY", isWin: false },
      { index: 11, color: "#ffffff", text: "UNLUCKY", isWin: false }
    ];
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
    const canSpin = computed(() => spinsLeft.value > 0 && !isSpinning.value && !isAnimating.value && !showResult.value && resultComplete.value);
    const maskSize = computed(() => props.previewMode === "mobile" ? "70%" : "35%");
    const maskEdge = computed(() => props.previewMode === "mobile" ? "75%" : "40%");
    const isDesktop = computed(() => props.previewMode === "desktop");
    const isMobile = computed(() => props.previewMode === "mobile");
    const getStaticSegmentFill = computed(() => {
      if (showResult.value) {
        if (staticSegmentText.value === "UNLUCKY") {
          return "#ff0000";
        } else if (staticSegmentText.value === "WINNER" || staticSegmentText.value === "LUCKY") {
          return "#00ff00";
        }
      }
      return props.spinAssets.wheelEdgeColor || "#00aeffff";
    });
    const titleStyle = computed(() => ({
      color: props.spinAssets.titleColor,
      textShadow: `0 0 5px ${props.spinAssets.titleColor}, 0 0 10px ${props.spinAssets.titleColor}, 0 0 15px ${props.spinAssets.titleColor}, 0 0 20px ${props.spinAssets.wheelEdgeColor || "#00aeffff"}`
    }));
    const titleClasses = computed(() => {
      const baseClasses = isMobile.value ? "" : "animate-pulse";
      return isDesktop.value ? `${baseClasses} desktop-title` : `${baseClasses} mobile-title`;
    });
    onMounted(() => {
      resultComplete.value = true;
      if (canSpin.value) {
        setTimeout(animateTapToSpin, 200);
      }
    });
    const animateText = () => {
      if (isSpinning.value || isAnimating.value || showResult.value || !canSpin.value || isMobile.value) {
        return;
      }
      const tapToSpinText = document.querySelector(".tap-to-spin-text");
      const tapToSpinLetters = document.querySelectorAll(".tap-to-spin-letter");
      const trianglePointer = document.querySelector(".triangle-pointer");
      const centerHub = document.querySelector('circle[cx="90"], circle[cx="75"]');
      const centerDiamond = document.querySelector('g:has(path[d*="M90 150"], path[d*="M75 125"])');
      if (tapToSpinText || tapToSpinLetters.length > 0) {
        const textElements = tapToSpinText ? [tapToSpinText] : Array.from(tapToSpinLetters);
        const pointerElements = [trianglePointer, centerHub, centerDiamond].filter(Boolean);
        gsapWithCSS.killTweensOf([...textElements, ...pointerElements]);
        gsapWithCSS.fromTo(
          textElements,
          {
            opacity: 0,
            y: 15,
            scale: 0.9
          },
          {
            opacity: 1,
            y: 0,
            scale: 1,
            duration: 0.8,
            ease: "back.out(1.2)",
            stagger: 0.1,
            onComplete: () => startPulseAnimation(textElements, pointerElements)
          }
        );
      }
    };
    const startPulseAnimation = (textElements, pointerElements) => {
      if (isMobile.value) {
        return;
      }
      const casinoPulse = () => {
        if (isSpinning.value || isAnimating.value || showResult.value || !canSpin.value) {
          return;
        }
        const tl = gsapWithCSS.timeline();
        tl.to([...textElements, ...pointerElements], {
          scale: 1.2,
          duration: 0.25,
          ease: "power2.out",
          transformOrigin: "center center"
        }).to(
          [...textElements, ...pointerElements],
          {
            scale: 1,
            duration: 0.5,
            ease: "elastic.out(1, 0.4)",
            transformOrigin: "center center"
          },
          "-=0.1"
        );
        setTimeout(() => {
          if (!isSpinning.value && !isAnimating.value && !showResult.value && canSpin.value) {
            casinoPulse();
          }
        }, 2e3);
      };
      setTimeout(casinoPulse, 1e3);
      gsapWithCSS.to(textElements, {
        y: -3,
        duration: 1.5,
        ease: "power2.inOut",
        repeat: -1,
        yoyo: true,
        stagger: 0.1
      });
    };
    const animateTapToSpin = () => {
      if (resultComplete.value && canSpin.value && staticSegmentText.value === "TAP TO SPIN") {
        animateText();
      }
    };
    const generateSvgWheel = () => {
      const segmentCount = segments.length;
      const anglePerSegment = 360 / segmentCount;
      return segments.map((segment, index) => ({
        ...segment,
        startAngle: index * anglePerSegment,
        endAngle: index * anglePerSegment + anglePerSegment,
        centerAngle: index * anglePerSegment + anglePerSegment / 2
      }));
    };
    const createSvgPath = (segment, cx, cy, r, anglePerSegment) => {
      const deg2rad = (deg) => deg * Math.PI / 180;
      const startRad = deg2rad(segment.startAngle);
      const endRad = deg2rad(segment.endAngle);
      const x1 = cx + r * Math.cos(startRad);
      const y1 = cy + r * Math.sin(startRad);
      const x2 = cx + r * Math.cos(endRad);
      const y2 = cy + r * Math.sin(endRad);
      const arcFlag = anglePerSegment <= 180 ? 0 : 1;
      return [`M ${cx},${cy}`, `L ${x1},${y1}`, `A ${r},${r} 0 ${arcFlag},1 ${x2},${y2}`, "Z"].join(" ");
    };
    const getSegmentTextPosition = (segment, cx, cy, r) => {
      const deg2rad = (deg) => deg * Math.PI / 180;
      const centerAngleRad = deg2rad(segment.centerAngle);
      const textRadius = r * 0.7;
      return {
        x: cx + textRadius * Math.cos(centerAngleRad),
        y: cy + textRadius * Math.sin(centerAngleRad)
      };
    };
    const createStaticSegmentPath = (cx, cy, r, anglePerSegment) => {
      const deg2rad = (deg) => deg * Math.PI / 180;
      const extendedRadius = r + 3;
      const startAngle = 270 - anglePerSegment / 2;
      const endAngle = 270 + anglePerSegment / 2;
      const startRad = deg2rad(startAngle);
      const endRad = deg2rad(endAngle);
      const x1 = cx + extendedRadius * Math.cos(startRad);
      const y1 = cy + extendedRadius * Math.sin(startRad);
      const x2 = cx + extendedRadius * Math.cos(endRad);
      const y2 = cy + extendedRadius * Math.sin(endRad);
      const arcFlag = anglePerSegment <= 180 ? 0 : 1;
      return [`M ${cx},${cy}`, `L ${x1},${y1}`, `A ${extendedRadius},${extendedRadius} 0 ${arcFlag},1 ${x2},${y2}`, "Z"].join(" ");
    };
    return (_ctx, _push, _parent, _attrs) => {
      _push(`<div${ssrRenderAttrs(mergeProps({ class: "flex-1 flex flex-col relative overflow-hidden" }, _attrs))} data-v-4c9c7034><div class="flex-1 flex flex-col justify-center items-center relative z-20" style="${ssrRenderStyle({ marginTop: isDesktop.value ? "40px" : "30px" })}" data-v-4c9c7034><div class="wheel-title mb-4" data-v-4c9c7034><span class="${ssrRenderClass(titleClasses.value)}" style="${ssrRenderStyle(titleStyle.value)}" data-v-4c9c7034>${ssrInterpolate(__props.spinAssets.titleText)}</span></div></div><div class="relative w-full h-3/5 overflow-hidden" style="${ssrRenderStyle({ marginTop: isMobile.value ? "80px" : "0" })}" data-v-4c9c7034><div class="absolute left-1/2 transform -translate-x-1/2 overflow-hidden rounded-full" style="${ssrRenderStyle(`bottom: -70%; width: 180%; height: 160%; mask: radial-gradient(circle at center, white ${maskSize.value}, transparent ${maskEdge.value}); -webkit-mask: radial-gradient(circle at center, white ${maskSize.value}, transparent ${maskEdge.value});`)}" data-v-4c9c7034><div class="absolute inset-0 rounded-full" style="${ssrRenderStyle(isMobile.value ? `background: radial-gradient(circle, transparent 35%, ${__props.spinAssets.wheelEdgeColor || "#00aeffff"} 65%, transparent 80%); opacity: 0.5;` : `background: radial-gradient(circle, ${__props.spinAssets.wheelEdgeColor || "#00aeffff"} 0%, transparent 70%); opacity: 0.2; filter: blur(30px);`)}" data-v-4c9c7034></div><div class="relative w-full h-full overflow-hidden rounded-full" data-v-4c9c7034><div class="relative w-full h-full rounded-full shadow-2xl overflow-hidden" style="${ssrRenderStyle(`transform-origin: 50% 50%; mask: radial-gradient(circle, white ${maskSize.value === "70%" ? "65%" : "45%"}, transparent ${maskSize.value === "70%" ? "70%" : "50%"}); -webkit-mask: radial-gradient(circle, white ${maskSize.value === "70%" ? "65%" : "45%"}, transparent ${maskSize.value === "70%" ? "70%" : "50%"});`)}" data-v-4c9c7034><svg viewBox="0 0 264 264" class="w-full h-full absolute inset-0 z-10" xmlns="http://www.w3.org/2000/svg" style="${ssrRenderStyle(`mask: radial-gradient(circle, white ${maskSize.value === "70%" ? "65%" : "45%"}, transparent ${maskSize.value === "70%" ? "70%" : "50%"}); -webkit-mask: radial-gradient(circle, white ${maskSize.value === "70%" ? "65%" : "45%"}, transparent ${maskSize.value === "70%" ? "70%" : "50%"});`)}" data-v-4c9c7034><defs data-v-4c9c7034><clipPath id="wheelClip" data-v-4c9c7034><circle cx="132" cy="132" r="120" data-v-4c9c7034></circle></clipPath>`);
      if (!isMobile.value) {
        _push(`<linearGradient id="neonPurpleGradient" x1="0%" y1="0%" x2="100%" y2="100%" data-v-4c9c7034><stop offset="0%" style="${ssrRenderStyle(`stop-color: ${__props.spinAssets.wheelEdgeColor || "#db07f2"}`)}" data-v-4c9c7034></stop><stop offset="50%" style="${ssrRenderStyle(`stop-color: ${__props.spinAssets.wheelEdgeColor || "#a855f7"}`)}" data-v-4c9c7034></stop><stop offset="100%" style="${ssrRenderStyle(`stop-color: ${__props.spinAssets.wheelEdgeColor || "#7c3aed"}`)}" data-v-4c9c7034></stop></linearGradient>`);
      } else {
        _push(`<!---->`);
      }
      if (!isMobile.value) {
        _push(`<filter id="neonGlow" x="-50%" y="-50%" width="200%" height="200%" data-v-4c9c7034><feGaussianBlur stdDeviation="3" result="coloredBlur" data-v-4c9c7034></feGaussianBlur><feMerge data-v-4c9c7034><feMergeNode in="coloredBlur" data-v-4c9c7034></feMergeNode><feMergeNode in="SourceGraphic" data-v-4c9c7034></feMergeNode></feMerge></filter>`);
      } else {
        _push(`<!---->`);
      }
      _push(`<radialGradient id="explosiveRim" data-v-4c9c7034><stop offset="75%" style="${ssrRenderStyle({ "stop-color": "transparent" })}" data-v-4c9c7034></stop><stop offset="88%" style="${ssrRenderStyle(isMobile.value ? `stop-color: ${__props.spinAssets.wheelEdgeColor || "#00aeffff"}; stop-opacity: 0.7` : `stop-color: ${__props.spinAssets.wheelEdgeColor || "#00aeffff"}; stop-opacity: 0.6`)}" data-v-4c9c7034></stop><stop offset="95%" style="${ssrRenderStyle(isMobile.value ? `stop-color: ${__props.spinAssets.wheelEdgeColor || "#00aeffff"}; stop-opacity: 0.9` : "stop-color: #ffffff; stop-opacity: 1")}" data-v-4c9c7034></stop><stop offset="100%" style="${ssrRenderStyle(isMobile.value ? "stop-color: #ffffff; stop-opacity: 0.8" : "stop-color: #ffffff; stop-opacity: 1")}" data-v-4c9c7034></stop></radialGradient></defs><g clip-path="url(#wheelClip)" data-v-4c9c7034><circle cx="132" cy="132" r="120" fill="#ffffff" stroke="none" data-v-4c9c7034></circle><g class="wheel-segments" data-v-4c9c7034><!--[-->`);
      ssrRenderList(generateSvgWheel(), (segment) => {
        _push(`<g data-v-4c9c7034><path${ssrRenderAttr("d", createSvgPath(segment, 132, 132, 120, 360 / segments.length))}${ssrRenderAttr("fill", segment.color)} stroke="#ffffff"${ssrRenderAttr("stroke-width", isDesktop.value ? "2" : "1")} opacity="1" data-v-4c9c7034></path>`);
        if (segment.isWin) {
          _push(`<g data-v-4c9c7034>`);
          if (__props.spinAssets.logo) {
            _push(`<g data-v-4c9c7034><defs data-v-4c9c7034><clipPath${ssrRenderAttr("id", `logoClip${segment.index}`)} data-v-4c9c7034><circle${ssrRenderAttr("cx", getSegmentTextPosition(segment, 132, 132, 120).x - 8)}${ssrRenderAttr("cy", getSegmentTextPosition(segment, 132, 132, 120).y)}${ssrRenderAttr("r", isDesktop.value ? "4" : "3")} data-v-4c9c7034></circle></clipPath></defs><image${ssrRenderAttr("x", getSegmentTextPosition(segment, 132, 132, 120).x - 12)}${ssrRenderAttr("y", getSegmentTextPosition(segment, 132, 132, 120).y - 4)}${ssrRenderAttr("width", isDesktop.value ? "8" : "6")}${ssrRenderAttr("height", isDesktop.value ? "8" : "6")}${ssrRenderAttr("href", __props.spinAssets.logo)}${ssrRenderAttr("clip-path", `url(#logoClip${segment.index})`)}${ssrRenderAttr("transform", `rotate(${segment.centerAngle}, ${getSegmentTextPosition(segment, 132, 132, 120).x - 8}, ${getSegmentTextPosition(segment, 132, 132, 120).y})`)} data-v-4c9c7034></image></g>`);
          } else {
            _push(`<g data-v-4c9c7034><circle${ssrRenderAttr("cx", getSegmentTextPosition(segment, 132, 132, 120).x - 8)}${ssrRenderAttr("cy", getSegmentTextPosition(segment, 132, 132, 120).y)}${ssrRenderAttr("r", isDesktop.value ? "4" : "3")}${ssrRenderAttr("fill", isMobile.value ? __props.spinAssets.wheelEdgeColor || "#00aeffff" : "url(#neonPurpleGradient)")}${ssrRenderAttr("filter", isMobile.value ? "none" : "url(#neonGlow)")}${ssrRenderAttr("transform", `rotate(${segment.centerAngle}, ${getSegmentTextPosition(segment, 132, 132, 120).x - 8}, ${getSegmentTextPosition(segment, 132, 132, 120).y})`)} data-v-4c9c7034></circle><path${ssrRenderAttr("d", `M${getSegmentTextPosition(segment, 132, 132, 120).x - 8} ${getSegmentTextPosition(segment, 132, 132, 120).y - 2}
                                  L${getSegmentTextPosition(segment, 132, 132, 120).x - 6} ${getSegmentTextPosition(segment, 132, 132, 120).y}
                                  L${getSegmentTextPosition(segment, 132, 132, 120).x - 8} ${getSegmentTextPosition(segment, 132, 132, 120).y + 2}
                                  L${getSegmentTextPosition(segment, 132, 132, 120).x - 10} ${getSegmentTextPosition(segment, 132, 132, 120).y} Z`)} fill="#ffffff"${ssrRenderAttr("transform", `rotate(${segment.centerAngle}, ${getSegmentTextPosition(segment, 132, 132, 120).x - 8}, ${getSegmentTextPosition(segment, 132, 132, 120).y})`)} data-v-4c9c7034></path></g>`);
          }
          _push(`<text${ssrRenderAttr("x", getSegmentTextPosition(segment, 132, 132, 120).x + 4)}${ssrRenderAttr("y", getSegmentTextPosition(segment, 132, 132, 120).y)} text-anchor="middle" dominant-baseline="central"${ssrRenderAttr("font-size", isDesktop.value ? "7" : "5")} font-family="Arial Black, sans-serif" font-weight="900"${ssrRenderAttr("fill", isMobile.value ? __props.spinAssets.wheelEdgeColor || "#00aeffff" : "url(#neonPurpleGradient)")}${ssrRenderAttr("filter", isMobile.value ? "none" : "url(#neonGlow)")} stroke="#ffffff"${ssrRenderAttr("stroke-width", isDesktop.value ? "0.3" : "0.2")}${ssrRenderAttr("transform", `rotate(${segment.centerAngle}, ${getSegmentTextPosition(segment, 132, 132, 120).x + 4}, ${getSegmentTextPosition(segment, 132, 132, 120).y})`)} data-v-4c9c7034>${ssrInterpolate(segment.text)}</text></g>`);
        } else {
          _push(`<g data-v-4c9c7034><text${ssrRenderAttr("x", getSegmentTextPosition(segment, 132, 132, 120).x)}${ssrRenderAttr("y", getSegmentTextPosition(segment, 132, 132, 120).y)} text-anchor="middle" dominant-baseline="central"${ssrRenderAttr("font-size", isDesktop.value ? "7" : "5")} font-family="Arial, sans-serif" font-weight="400" fill="#9ca3af" stroke="#ffffff"${ssrRenderAttr("stroke-width", isDesktop.value ? "0.2" : "0.1")}${ssrRenderAttr("transform", `rotate(${segment.centerAngle}, ${getSegmentTextPosition(segment, 132, 132, 120).x}, ${getSegmentTextPosition(segment, 132, 132, 120).y})`)} data-v-4c9c7034>${ssrInterpolate(segment.text)}</text></g>`);
        }
        _push(`</g>`);
      });
      _push(`<!--]--></g><circle cx="132" cy="132" r="120" fill="url(#explosiveRim)" stroke="none" data-v-4c9c7034></circle></g></svg></div></div><svg viewBox="0 0 264 264" class="w-full h-full absolute inset-0 z-30 rounded-full pointer-events-none" xmlns="http://www.w3.org/2000/svg" data-v-4c9c7034><defs data-v-4c9c7034><clipPath id="staticClip" data-v-4c9c7034><circle cx="132" cy="132" r="125" data-v-4c9c7034></circle></clipPath></defs><g clip-path="url(#staticClip)" data-v-4c9c7034><path${ssrRenderAttr("d", createStaticSegmentPath(132, 132, 120, 360 / segments.length))}${ssrRenderAttr("fill", isSpinning.value ? "rgba(255, 255, 255, 0.1)" : getStaticSegmentFill.value)} stroke="#ffffff"${ssrRenderAttr("stroke-width", isSpinning.value ? isDesktop.value ? "4" : "3" : isDesktop.value ? "3" : "2")}${ssrRenderAttr("stroke-opacity", isSpinning.value ? "0.8" : "1")} class="${ssrRenderClass([{
        "clickable-segment": canSpin.value && resultComplete.value,
        "disabled-segment": !canSpin.value || !resultComplete.value || isSpinning.value || isAnimating.value || showResult.value,
        "spinning-fade": isSpinning.value
      }, "static-highlight-segment"])}" style="${ssrRenderStyle({ "pointer-events": "all" })}" data-v-4c9c7034></path><rect x="102" y="12" width="60" height="60" fill="transparent" class="${ssrRenderClass({ "clickable-overlay": canSpin.value && resultComplete.value && !isSpinning.value && !isAnimating.value && !showResult.value })}" style="${ssrRenderStyle({
        pointerEvents: "all",
        cursor: canSpin.value && resultComplete.value && !isSpinning.value && !isAnimating.value && !showResult.value ? "pointer" : "not-allowed"
      })}" data-v-4c9c7034></rect><g transform="translate(132, 30)" class="static-text-container" data-v-4c9c7034>`);
      if (staticSegmentText.value === "TAP TO SPIN") {
        _push(`<text text-anchor="middle" class="tap-to-spin-text" style="${ssrRenderStyle({
          fontSize: isDesktop.value ? "11px" : "9px",
          fontFamily: "Arial Black, sans-serif",
          fontWeight: 900,
          perspective: "100px"
        })}" fill="#ffffff" transform="rotate(-8)" data-v-4c9c7034><tspan x="0" dy="2" class="tap-to-spin-letter tap-to-line" data-v-4c9c7034>TAP TO</tspan><tspan x="0" dy="10" class="tap-to-spin-letter spin-word-main" data-v-4c9c7034>SPIN</tspan></text>`);
      } else if (staticSegmentText.value === "NO SPINS") {
        _push(`<text text-anchor="middle" style="${ssrRenderStyle({
          fontSize: isDesktop.value ? "9px" : "7px",
          fontFamily: "Arial Black, sans-serif",
          fontWeight: 900
        })}" fill="#ff6b6b" data-v-4c9c7034><tspan x="0" dy="0" data-v-4c9c7034>NO</tspan><tspan x="0" dy="10" data-v-4c9c7034>SPINS</tspan><tspan x="0" dy="20" data-v-4c9c7034>LEFT</tspan></text>`);
      } else if (staticSegmentText.value && showResult.value) {
        _push(`<text text-anchor="middle" class="${ssrRenderClass([[staticSegmentText.value === "WINNER" || staticSegmentText.value === "LUCKY" ? "winner-text" : staticSegmentText.value === "UNLUCKY" ? "unlucky-text" : "", showResult.value ? "result-reveal" : ""], "result-text"])}" style="${ssrRenderStyle({
          fontSize: isDesktop.value ? "9px" : "7px",
          fontFamily: "Arial, sans-serif",
          fontWeight: "bold"
        })}" fill="#ffffff" data-v-4c9c7034><tspan x="0" dy="6" data-v-4c9c7034>${ssrInterpolate(staticSegmentText.value)}</tspan>`);
        if (currentTicketNumber.value) {
          _push(`<tspan x="0" dy="12" style="${ssrRenderStyle({ fontSize: isDesktop.value ? "7px" : "5px" })}" class="ticket-number" data-v-4c9c7034>${ssrInterpolate(currentTicketNumber.value)}</tspan>`);
        } else {
          _push(`<!---->`);
        }
        _push(`</text>`);
      } else {
        _push(`<!---->`);
      }
      _push(`</g></g></svg><div class="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 z-40" data-v-4c9c7034><div class="flex flex-col items-center pointer-container" data-v-4c9c7034><svg${ssrRenderAttr("width", isDesktop.value ? "180" : "150")}${ssrRenderAttr("height", isDesktop.value ? "288" : "240")}${ssrRenderAttr("viewBox", isDesktop.value ? "0 0 180 288" : "0 0 150 240")} class="${ssrRenderClass(isMobile.value ? "" : "drop-shadow-2xl filter brightness-125")}" data-v-4c9c7034><defs data-v-4c9c7034>`);
      if (isDesktop.value) {
        _push(`<linearGradient id="ultimateTriangle" x1="0%" y1="0%" x2="0%" y2="100%" data-v-4c9c7034><stop offset="0%" style="${ssrRenderStyle({ "stop-color": "#ffffff", "stop-opacity": "1" })}" data-v-4c9c7034></stop><stop offset="10%" style="${ssrRenderStyle({ "stop-color": "#ffff00", "stop-opacity": "1" })}" data-v-4c9c7034></stop><stop offset="30%" style="${ssrRenderStyle(`stop-color: ${__props.spinAssets.wheelEdgeColor || "#00aeffff"}; stop-opacity: 1`)}" data-v-4c9c7034></stop><stop offset="60%" style="${ssrRenderStyle(`stop-color: ${__props.spinAssets.wheelEdgeColor || "#00aeffff"}; stop-opacity: 1`)}" data-v-4c9c7034></stop><stop offset="100%" style="${ssrRenderStyle({ "stop-color": "#000000", "stop-opacity": "1" })}" data-v-4c9c7034></stop></linearGradient>`);
      } else {
        _push(`<linearGradient id="ultimateTriangle" x1="0%" y1="0%" x2="0%" y2="100%" data-v-4c9c7034><stop offset="0%" style="${ssrRenderStyle({ "stop-color": "#ffffff" })}" data-v-4c9c7034></stop><stop offset="50%" style="${ssrRenderStyle(`stop-color: ${__props.spinAssets.wheelEdgeColor || "#00aeffff"}`)}" data-v-4c9c7034></stop><stop offset="100%" style="${ssrRenderStyle(`stop-color: ${__props.spinAssets.wheelEdgeColor || "#00aeffff"}`)}" data-v-4c9c7034></stop></linearGradient>`);
      }
      if (isDesktop.value) {
        _push(`<radialGradient id="ultimateCircle" data-v-4c9c7034><stop offset="0%" style="${ssrRenderStyle({ "stop-color": "#ffffff" })}" data-v-4c9c7034></stop><stop offset="20%" style="${ssrRenderStyle({ "stop-color": "#ffff00" })}" data-v-4c9c7034></stop><stop offset="50%" style="${ssrRenderStyle(`stop-color: ${__props.spinAssets.wheelEdgeColor || "#00aeffff"}`)}" data-v-4c9c7034></stop><stop offset="80%" style="${ssrRenderStyle(`stop-color: ${__props.spinAssets.wheelEdgeColor || "#00aeffff"}`)}" data-v-4c9c7034></stop><stop offset="100%" style="${ssrRenderStyle({ "stop-color": "#000000" })}" data-v-4c9c7034></stop></radialGradient>`);
      } else {
        _push(`<radialGradient id="ultimateCircle" data-v-4c9c7034><stop offset="0%" style="${ssrRenderStyle({ "stop-color": "#ffffff" })}" data-v-4c9c7034></stop><stop offset="50%" style="${ssrRenderStyle(`stop-color: ${__props.spinAssets.wheelEdgeColor || "#00aeffff"}`)}" data-v-4c9c7034></stop><stop offset="100%" style="${ssrRenderStyle(`stop-color: ${__props.spinAssets.wheelEdgeColor || "#00aeffff"}`)}" data-v-4c9c7034></stop></radialGradient>`);
      }
      if (!isMobile.value) {
        _push(`<filter id="ultimateShadow" x="-50%" y="-50%" width="200%" height="200%" data-v-4c9c7034><feDropShadow${ssrRenderAttr("dx", isDesktop.value ? "8" : "2")}${ssrRenderAttr("dy", isDesktop.value ? "10" : "3")}${ssrRenderAttr("stdDeviation", isDesktop.value ? "15" : "4")} flood-color="#000000"${ssrRenderAttr("flood-opacity", isDesktop.value ? "0.9" : "0.5")} data-v-4c9c7034></feDropShadow></filter>`);
      } else {
        _push(`<!---->`);
      }
      if (isDesktop.value) {
        _push(`<filter id="ultimateGlow" x="-100%" y="-100%" width="300%" height="300%" data-v-4c9c7034><feGaussianBlur stdDeviation="8" result="coloredBlur" data-v-4c9c7034></feGaussianBlur><feMerge data-v-4c9c7034><feMergeNode in="coloredBlur" data-v-4c9c7034></feMergeNode><feMergeNode in="SourceGraphic" data-v-4c9c7034></feMergeNode></feMerge></filter>`);
      } else {
        _push(`<!---->`);
      }
      _push(`</defs><path${ssrRenderAttr("d", isDesktop.value ? "M90 -12 Q74 50 55 108 Q82 96 90 100 Q98 96 125 108 Q106 50 90 -12 Z" : "M75 -10 Q62 42 46 90 Q68 80 75 83 Q82 80 104 90 Q88 42 75 -10 Z")} fill="url(#ultimateTriangle)" stroke="#000000"${ssrRenderAttr("stroke-width", isDesktop.value ? "4" : "2")} stroke-linejoin="round" stroke-linecap="round"${ssrRenderAttr("filter", isMobile.value ? "none" : "url(#ultimateShadow)")}${ssrRenderAttr("transform", isDesktop.value ? "translate(0, 42)" : "translate(0, 35)")} class="triangle-pointer" data-v-4c9c7034></path><circle${ssrRenderAttr("cx", isDesktop.value ? "90" : "75")}${ssrRenderAttr("cy", isDesktop.value ? "168" : "140")}${ssrRenderAttr("r", isDesktop.value ? "48" : "40")} fill="url(#ultimateCircle)" stroke="#000000"${ssrRenderAttr("stroke-width", isDesktop.value ? "5" : "2")}${ssrRenderAttr("filter", isMobile.value ? "none" : "url(#ultimateShadow)")} data-v-4c9c7034></circle>`);
      if (isDesktop.value) {
        _push(`<circle${ssrRenderAttr("cx", 90)}${ssrRenderAttr("cy", 168)}${ssrRenderAttr("r", 38)} fill="url(#ultimateTriangle)" opacity="0.9" filter="url(#ultimateGlow)" data-v-4c9c7034></circle>`);
      } else {
        _push(`<!---->`);
      }
      _push(`<g${ssrRenderAttr("filter", isDesktop.value && !isMobile.value ? "url(#ultimateGlow)" : "none")} data-v-4c9c7034><path${ssrRenderAttr("d", isDesktop.value ? "M90 150 L106 168 L90 186 L74 168 Z" : "M75 125 L88 140 L75 155 L62 140 Z")} fill="#ffffff" opacity="1" data-v-4c9c7034></path><path${ssrRenderAttr("d", isDesktop.value ? "M90 156 L100 168 L90 180 L80 168 Z" : "M75 130 L83 140 L75 150 L67 140 Z")} fill="#ffff00" opacity="0.9" data-v-4c9c7034></path><circle${ssrRenderAttr("cx", isDesktop.value ? "90" : "75")}${ssrRenderAttr("cy", isDesktop.value ? "168" : "140")}${ssrRenderAttr("r", isDesktop.value ? "4" : "3")}${ssrRenderAttr("fill", __props.spinAssets.wheelEdgeColor || "#00aeffff")} data-v-4c9c7034></circle></g>`);
      if (!isMobile.value) {
        _push(`<g class="static-sparkles" data-v-4c9c7034><circle${ssrRenderAttr("cx", isDesktop.value ? "48" : "40")}${ssrRenderAttr("cy", isDesktop.value ? "144" : "120")}${ssrRenderAttr("r", isDesktop.value ? "4" : "3")} fill="#ffff00" opacity="0.6" data-v-4c9c7034></circle><circle${ssrRenderAttr("cx", isDesktop.value ? "132" : "110")}${ssrRenderAttr("cy", isDesktop.value ? "150" : "125")}${ssrRenderAttr("r", isDesktop.value ? "3" : "2")}${ssrRenderAttr("fill", __props.spinAssets.wheelEdgeColor || "#00aeffff")} opacity="0.5" data-v-4c9c7034></circle><circle${ssrRenderAttr("cx", isDesktop.value ? "54" : "45")}${ssrRenderAttr("cy", isDesktop.value ? "186" : "155")}${ssrRenderAttr("r", isDesktop.value ? "4" : "3.5")} fill="#ffffff" opacity="0.7" data-v-4c9c7034></circle><circle${ssrRenderAttr("cx", isDesktop.value ? "126" : "105")}${ssrRenderAttr("cy", isDesktop.value ? "180" : "150")}${ssrRenderAttr("r", isDesktop.value ? "3" : "2.5")} fill="#00ff88" opacity="0.4" data-v-4c9c7034></circle></g>`);
      } else {
        _push(`<!---->`);
      }
      _push(`</svg></div></div></div></div></div>`);
    };
  }
});
const _sfc_setup$2 = _sfc_main$2.setup;
_sfc_main$2.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("resources/js/Components/Games/SpinGame.vue");
  return _sfc_setup$2 ? _sfc_setup$2(props, ctx) : void 0;
};
const SpinGame = /* @__PURE__ */ _export_sfc(_sfc_main$2, [["__scopeId", "data-v-4c9c7034"]]);
const _sfc_main$1 = /* @__PURE__ */ defineComponent({
  __name: "TicketRevealModal",
  __ssrInlineRender: true,
  props: {
    modelValue: { type: Boolean },
    tickets: {},
    playedTickets: {}
  },
  emits: ["update:modelValue"],
  setup(__props, { emit: __emit }) {
    const props = __props;
    const emit = __emit;
    const page = usePage();
    const currentTenant = computed(() => page.props.currentTenant || "");
    const totalWinners = computed(() => ticketsWithStatus.value.filter((t) => t.isWinner));
    const close = () => {
      emit("update:modelValue", false);
    };
    const ticketsWithStatus = computed(() => {
      return props.tickets.map((ticket) => {
        var _a;
        const ticketId = ticket.id;
        const isPlayed = props.playedTickets.includes(ticketId);
        const isWinner = Boolean(ticket.instant_win && ticket.instant_win.prize);
        return {
          ...ticket,
          ticketId,
          isPlayed,
          isWinner,
          prize: ((_a = ticket.instant_win) == null ? void 0 : _a.prize) || null
        };
      });
    });
    const unplayedTickets = computed(() => {
      const tickets = ticketsWithStatus.value.filter((t) => !t.isPlayed);
      return [...tickets].sort((a, b) => (b.isWinner ? 1 : 0) - (a.isWinner ? 1 : 0));
    });
    const playedWinners = computed(() => ticketsWithStatus.value.filter((t) => t.isPlayed && t.isWinner));
    const playedLosers = computed(() => ticketsWithStatus.value.filter((t) => t.isPlayed && !t.isWinner));
    const resolvePrizeValue = (prize, value) => {
      const numeric = parseFloat(String(value));
      if (!isNaN(numeric) && numeric > 0) return numeric;
      if (!prize) return 0;
      const match = prize.match(/£([\d,.]+)/);
      return match ? parseFloat(match[1].replace(",", "")) : 0;
    };
    const totalWinValue = computed(() => {
      const total = ticketsWithStatus.value.reduce((sum, t) => {
        var _a, _b, _c;
        if (!t.isWinner) return sum;
        if (((_a = t.instant_win) == null ? void 0 : _a.prize_type) === "ticket_bundle") return sum;
        return sum + resolvePrizeValue((_b = t.instant_win) == null ? void 0 : _b.prize, (_c = t.instant_win) == null ? void 0 : _c.value);
      }, 0);
      return isNaN(total) ? 0 : total;
    });
    return (_ctx, _push, _parent, _attrs) => {
      const _component_UiButton = resolveComponent("UiButton");
      ssrRenderTeleport(_push, (_push2) => {
        if (__props.modelValue) {
          _push2(`<div class="fixed inset-0 z-[9999] bg-black/90 flex items-center justify-center p-4" tabindex="0" data-v-459f2b5a><div class="bg-gray-900 rounded-xl shadow-2xl max-w-4xl w-full max-h-[90vh] overflow-hidden" data-v-459f2b5a><div class="bg-primary p-6 flex justify-between items-center" data-v-459f2b5a><div data-v-459f2b5a><h2 class="text-2xl font-bold text-white" data-v-459f2b5a>All Your Tickets</h2><p class="text-white/80 mt-1" data-v-459f2b5a>${ssrInterpolate(__props.tickets.length)} total tickets</p></div><div class="flex items-center gap-4" data-v-459f2b5a>`);
          if (totalWinners.value.length > 0) {
            _push2(`<div class="text-right" data-v-459f2b5a><div class="text-white/70 text-xs uppercase tracking-wide" data-v-459f2b5a>Total Won</div><div class="text-yellow-300 font-bold text-xl" data-v-459f2b5a>£${ssrInterpolate(Number(totalWinValue.value).toFixed(2))}</div></div>`);
          } else {
            _push2(`<!---->`);
          }
          _push2(ssrRenderComponent(_component_UiButton, {
            onClick: close,
            class: "text-white/80 hover:text-white text-3xl font-bold transition-colors",
            "aria-label": "Close modal"
          }, {
            default: withCtx((_, _push3, _parent2, _scopeId) => {
              if (_push3) {
                _push3(` ✕ `);
              } else {
                return [
                  createTextVNode(" ✕ ")
                ];
              }
            }),
            _: 1
          }, _parent));
          _push2(`</div></div><div class="p-6 overflow-y-auto max-h-[calc(90vh-120px)]" data-v-459f2b5a>`);
          if (unplayedTickets.value.length > 0) {
            _push2(`<div class="mb-8" data-v-459f2b5a><h3 class="text-xl font-semibold text-white mb-4 flex items-center" data-v-459f2b5a><span class="w-3 h-3 bg-blue-500 rounded-full mr-2" data-v-459f2b5a></span> Available Tickets (${ssrInterpolate(unplayedTickets.value.length)}) </h3><div class="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4" data-v-459f2b5a><!--[-->`);
            ssrRenderList(unplayedTickets.value, (ticket) => {
              var _a, _b, _c;
              _push2(`<div class="bg-primary rounded-lg p-4 text-center shadow-lg hover:shadow-xl transition-shadow duration-200" data-v-459f2b5a><div class="text-white font-bold text-lg mb-1" data-v-459f2b5a>#${ssrInterpolate(ticket.number || ticket.ticketId)}</div>`);
              if (currentTenant.value !== "madmac") {
                _push2(`<div class="text-white/70 text-sm" data-v-459f2b5a>Ready to spin</div>`);
              } else {
                _push2(`<!---->`);
              }
              if (ticket.isWinner) {
                _push2(`<div class="mt-2 text-xs text-yellow-300 font-medium" data-v-459f2b5a> 🎁 `);
                if (((_a = ticket.instant_win) == null ? void 0 : _a.prize_type) === "ticket_bundle") {
                  _push2(`<!--[-->${ssrInterpolate(Math.floor(((_b = ticket.instant_win) == null ? void 0 : _b.value) || 0))} Free Ticket${ssrInterpolate((((_c = ticket.instant_win) == null ? void 0 : _c.value) || 0) !== 1 ? "s" : "")}<!--]-->`);
                } else {
                  _push2(`<!--[-->${ssrInterpolate(ticket.prize)}<!--]-->`);
                }
                _push2(`</div>`);
              } else {
                _push2(`<!---->`);
              }
              _push2(`</div>`);
            });
            _push2(`<!--]--></div></div>`);
          } else {
            _push2(`<!---->`);
          }
          if (playedWinners.value.length > 0) {
            _push2(`<div class="mb-8" data-v-459f2b5a><h3 class="text-xl font-semibold text-white mb-4 flex items-center" data-v-459f2b5a><span class="w-3 h-3 bg-green-500 rounded-full mr-2" data-v-459f2b5a></span> Winners (${ssrInterpolate(playedWinners.value.length)}) </h3><div class="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4" data-v-459f2b5a><!--[-->`);
            ssrRenderList(playedWinners.value, (ticket) => {
              _push2(`<div class="bg-green-600 rounded-lg p-4 text-center shadow-lg border-2 border-green-400" data-v-459f2b5a><div class="text-white font-bold text-lg mb-1" data-v-459f2b5a>#${ssrInterpolate(ticket.number || ticket.ticketId)}</div><div class="text-white/90 text-sm mb-2" data-v-459f2b5a>🏆 WINNER</div><div class="text-yellow-200 text-xs font-medium" data-v-459f2b5a>${ssrInterpolate(ticket.prize)}</div></div>`);
            });
            _push2(`<!--]--></div></div>`);
          } else {
            _push2(`<!---->`);
          }
          if (playedLosers.value.length > 0) {
            _push2(`<div class="mb-4" data-v-459f2b5a><h3 class="text-xl font-semibold text-white mb-4 flex items-center" data-v-459f2b5a><span class="w-3 h-3 bg-gray-500 rounded-full mr-2" data-v-459f2b5a></span> Used Tickets (${ssrInterpolate(playedLosers.value.length)}) </h3><div class="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4" data-v-459f2b5a><!--[-->`);
            ssrRenderList(playedLosers.value, (ticket) => {
              _push2(`<div class="bg-secondary rounded-lg p-4 text-center shadow-lg opacity-75" data-v-459f2b5a><div class="text-white font-bold text-lg mb-1" data-v-459f2b5a>#${ssrInterpolate(ticket.number || ticket.ticketId)}</div><div class="text-white/70 text-sm" data-v-459f2b5a>No prize</div></div>`);
            });
            _push2(`<!--]--></div></div>`);
          } else {
            _push2(`<!---->`);
          }
          if (__props.tickets.length === 0) {
            _push2(`<div class="text-center py-12" data-v-459f2b5a><div class="text-6xl mb-4" data-v-459f2b5a>🎫</div><h3 class="text-xl font-semibold text-white mb-2" data-v-459f2b5a>No Tickets Available</h3><p class="text-white/70" data-v-459f2b5a>You don&#39;t have any tickets to reveal.</p></div>`);
          } else {
            _push2(`<!---->`);
          }
          _push2(`</div><div class="bg-gray-800 px-6 py-4 flex justify-between items-center" data-v-459f2b5a><div class="text-white/70 text-sm" data-v-459f2b5a>${ssrInterpolate(unplayedTickets.value.length)} remaining • ${ssrInterpolate(playedWinners.value.length)} won • ${ssrInterpolate(playedLosers.value.length)} used</div>`);
          _push2(ssrRenderComponent(_component_UiButton, {
            onClick: close,
            class: "bg-primary hover:bg-primary/80 text-white px-6 py-2 rounded-lg font-medium transition-colors"
          }, {
            default: withCtx((_, _push3, _parent2, _scopeId) => {
              if (_push3) {
                _push3(` Close `);
              } else {
                return [
                  createTextVNode(" Close ")
                ];
              }
            }),
            _: 1
          }, _parent));
          _push2(`</div></div></div>`);
        } else {
          _push2(`<!---->`);
        }
      }, "body", false, _parent);
    };
  }
});
const _sfc_setup$1 = _sfc_main$1.setup;
_sfc_main$1.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("resources/js/Components/Games/TicketRevealModal.vue");
  return _sfc_setup$1 ? _sfc_setup$1(props, ctx) : void 0;
};
const TicketRevealModal = /* @__PURE__ */ _export_sfc(_sfc_main$1, [["__scopeId", "data-v-459f2b5a"]]);
const _sfc_main = /* @__PURE__ */ defineComponent({
  __name: "SpinnyModal",
  __ssrInlineRender: true,
  props: {
    modelValue: { type: Boolean },
    demoMode: { type: Boolean },
    assets: {},
    tickets: {}
  },
  emits: ["update:modelValue"],
  setup(__props, { emit: __emit }) {
    const props = __props;
    const emit = __emit;
    const demoPreviewMode = ref("mobile");
    const playedTickets = ref([]);
    const currentPrize = ref("");
    const isWinning = ref(false);
    const showWinnerCard = ref(false);
    const hideFloatingCard = ref(false);
    const winCounter = ref(0);
    const showWinNotification = ref(false);
    const isCardAnimatingToCorner = ref(false);
    const showTicketReveal = ref(false);
    const isLoadingTickets = ref(false);
    const allTickets = ref([]);
    ref(false);
    const spinAssets = reactive({
      titleText: props.assets.titleText || "SPIN WHEEL",
      titleColor: props.assets.titleColor || "#793181",
      logo: props.assets.logo || "",
      wheelEdgeColor: props.assets.wheelEdgeColor || "#00aeffff"
    });
    const spinsLeft = computed(() => {
      if (props.demoMode) {
        return 9;
      }
      if (!props.tickets) {
        return 0;
      }
      return props.tickets.length - playedTickets.value.length;
    });
    const isMobileDevice = computed(() => {
      if (typeof window === "undefined") {
        return false;
      }
      return window.innerWidth < 768;
    });
    const actualPreviewMode = computed(() => {
      return props.demoMode ? demoPreviewMode.value : isMobileDevice.value ? "mobile" : "desktop";
    });
    const modalStyle = computed(() => {
      if (!props.demoMode) {
        return { width: "100vw", height: "100vh" };
      }
      return actualPreviewMode.value === "mobile" ? {
        width: "375px",
        height: "667px",
        backgroundImage: `url("data:image/svg+xml;charset=utf-8,${encodeURIComponent(`
          <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 375 667">
            <rect width="375" height="667" fill="#000"/>
            <rect x="10" y="30" width="355" height="25" rx="12" fill="#333"/>
            <circle cx="30" cy="42" r="3" fill="#666"/>
            <circle cx="345" cy="42" r="3" fill="#666"/>
          </svg>
        `)}")`
      } : {
        width: "800px",
        height: "600px",
        background: "linear-gradient(135deg, #1e3c72 0%, #2a5298 100%)",
        border: "3px solid #333",
        borderRadius: "12px"
      };
    });
    const containerClasses = computed(() => {
      if (!props.demoMode) {
        return ["w-full h-full"];
      }
      return ["relative overflow-hidden shadow-2xl", actualPreviewMode.value === "mobile" ? "bg-gradient-to-b from-gray-900 to-black rounded-xl" : "bg-gradient-to-b from-gray-800 to-gray-900 rounded-xl"];
    });
    const winnerCardSize = computed(() => {
      if (props.demoMode) {
        return actualPreviewMode.value === "mobile" ? { width: "200px", height: "130px" } : { width: "200px", height: "130px" };
      }
      return isMobileDevice.value ? { width: "300px", height: "190px" } : { width: "400px", height: "250px" };
    });
    watch(
      () => props.assets.titleText,
      (newVal) => {
        spinAssets.titleText = newVal || "SPIN WHEEL";
      },
      { immediate: true }
    );
    watch(
      () => props.assets.titleColor,
      (newVal) => {
        spinAssets.titleColor = newVal || "#793181";
      },
      { immediate: true }
    );
    watch(
      () => props.assets.logo,
      (newVal) => {
        spinAssets.logo = newVal || "";
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
      () => props.assets.wheelEdgeColor,
      (newVal) => {
        spinAssets.wheelEdgeColor = newVal || "#00aeffff";
      },
      { immediate: true }
    );
    const onPrizeWon = (prize) => {
      currentPrize.value = prize;
      isWinning.value = true;
      hideFloatingCard.value = true;
      setTimeout(() => {
        showWinnerCard.value = true;
      }, 200);
      setTimeout(() => {
        isCardAnimatingToCorner.value = true;
      }, 2500);
      setTimeout(() => {
        showWinnerCard.value = false;
        winCounter.value++;
        showWinNotification.value = true;
        setTimeout(() => {
          isCardAnimatingToCorner.value = false;
          hideFloatingCard.value = false;
          isWinning.value = false;
          currentPrize.value = "";
        }, 300);
        setTimeout(() => {
          showWinNotification.value = false;
        }, 3e3);
      }, 2900);
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
    const togglePreviewMode = () => {
      demoPreviewMode.value = demoPreviewMode.value === "mobile" ? "desktop" : "mobile";
    };
    const onTicketPlayed = (ticketId) => {
      if (!playedTickets.value.includes(ticketId)) {
        playedTickets.value.push(ticketId);
      }
    };
    const openTicketReveal = async () => {
      allTickets.value = props.tickets || [];
      showTicketReveal.value = true;
    };
    onMounted(() => window.addEventListener("keydown", onEsc));
    onUnmounted(() => window.removeEventListener("keydown", onEsc));
    return (_ctx, _push, _parent, _attrs) => {
      const _component_UiButton = resolveComponent("UiButton");
      _push(`<!--[-->`);
      ssrRenderTeleport(_push, (_push2) => {
        if (__props.modelValue) {
          _push2(`<div class="${ssrRenderClass(["z-[9999] flex flex-col items-center justify-center", __props.demoMode ? "relative max-w-full max-h-[80vh] mx-auto" : "fixed inset-0 bg-black/80"])}" data-v-cf729e6b>`);
          if (__props.demoMode) {
            _push2(`<div class="mb-4 flex items-center space-x-3 bg-gray-800 rounded-lg p-2" data-v-cf729e6b><span class="text-white text-sm font-medium" data-v-cf729e6b>Preview Mode:</span>`);
            _push2(ssrRenderComponent(_component_UiButton, {
              onClick: togglePreviewMode,
              class: ["px-3 py-1 rounded text-sm font-medium transition-colors", actualPreviewMode.value === "mobile" ? "bg-blue-500 text-white" : "bg-gray-600 text-gray-300 hover:bg-gray-500"]
            }, {
              default: withCtx((_, _push3, _parent2, _scopeId) => {
                if (_push3) {
                  _push3(` 📱 Mobile `);
                } else {
                  return [
                    createTextVNode(" 📱 Mobile ")
                  ];
                }
              }),
              _: 1
            }, _parent));
            _push2(ssrRenderComponent(_component_UiButton, {
              onClick: togglePreviewMode,
              class: ["px-3 py-1 rounded text-sm font-medium transition-colors", actualPreviewMode.value === "desktop" ? "bg-blue-500 text-white" : "bg-gray-600 text-gray-300 hover:bg-gray-500"]
            }, {
              default: withCtx((_, _push3, _parent2, _scopeId) => {
                if (_push3) {
                  _push3(` 💻 Desktop `);
                } else {
                  return [
                    createTextVNode(" 💻 Desktop ")
                  ];
                }
              }),
              _: 1
            }, _parent));
            _push2(`</div>`);
          } else {
            _push2(`<!---->`);
          }
          _push2(`<div class="${ssrRenderClass([containerClasses.value, { "demo-mode": __props.demoMode }])}" style="${ssrRenderStyle(modalStyle.value)}" data-v-cf729e6b>`);
          if (__props.demoMode) {
            _push2(`<!--[-->`);
            if (actualPreviewMode.value === "mobile") {
              _push2(`<div class="h-8 bg-black flex items-center justify-between px-4 text-white text-sm" data-v-cf729e6b><span data-v-cf729e6b>9:41</span><div class="flex space-x-1" data-v-cf729e6b><div class="w-4 h-2 border border-white rounded-sm" data-v-cf729e6b></div><div class="w-1 h-2 bg-white rounded-sm" data-v-cf729e6b></div></div></div>`);
            } else {
              _push2(`<!---->`);
            }
            if (actualPreviewMode.value === "desktop") {
              _push2(`<div class="h-10 bg-gray-700 flex items-center justify-between px-4 text-white text-sm border-b border-gray-600" data-v-cf729e6b><div class="flex items-center space-x-2" data-v-cf729e6b><div class="flex space-x-1" data-v-cf729e6b><div class="w-3 h-3 bg-red-500 rounded-full" data-v-cf729e6b></div><div class="w-3 h-3 bg-yellow-500 rounded-full" data-v-cf729e6b></div><div class="w-3 h-3 bg-green-500 rounded-full" data-v-cf729e6b></div></div><span class="ml-4 text-gray-300" data-v-cf729e6b> Spin Games - Spin to Win</span></div><div class="text-gray-400 text-xs" data-v-cf729e6b>Chrome</div></div>`);
            } else {
              _push2(`<!---->`);
            }
            _push2(`<!--]-->`);
          } else {
            _push2(`<!---->`);
          }
          if (!__props.demoMode) {
            _push2(ssrRenderComponent(_component_UiButton, {
              class: "absolute top-4 right-4 text-gray-400 hover:text-white focus:outline-none text-3xl z-50",
              onClick: close,
              "aria-label": "Close modal"
            }, {
              default: withCtx((_, _push3, _parent2, _scopeId) => {
                if (_push3) {
                  _push3(` ✕ `);
                } else {
                  return [
                    createTextVNode(" ✕ ")
                  ];
                }
              }),
              _: 1
            }, _parent));
          } else {
            _push2(`<!---->`);
          }
          if (!__props.demoMode && __props.tickets && __props.tickets.length > 0) {
            _push2(ssrRenderComponent(_component_UiButton, {
              onClick: openTicketReveal,
              class: "absolute top-4 left-4 text-white px-4 py-2 rounded-lg font-medium transition-colors z-50 text-sm",
              style: {
                backgroundColor: spinAssets.titleColor || "#793181",
                boxShadow: `0 4px 12px ${spinAssets.titleColor || "#793181"}40`
              },
              disabled: isLoadingTickets.value
            }, {
              default: withCtx((_, _push3, _parent2, _scopeId) => {
                if (_push3) {
                  if (isLoadingTickets.value) {
                    _push3(`<span data-v-cf729e6b${_scopeId}>⏳ Loading...</span>`);
                  } else {
                    _push3(`<span data-v-cf729e6b${_scopeId}>🎫 Reveal All</span>`);
                  }
                } else {
                  return [
                    isLoadingTickets.value ? (openBlock(), createBlock("span", { key: 0 }, "⏳ Loading...")) : (openBlock(), createBlock("span", { key: 1 }, "🎫 Reveal All"))
                  ];
                }
              }),
              _: 1
            }, _parent));
          } else {
            _push2(`<!---->`);
          }
          if (winCounter.value > 0) {
            _push2(`<div class="${ssrRenderClass(["absolute z-50 transition-all duration-500", __props.demoMode ? "top-2 left-2" : "top-20 left-4", showWinNotification.value ? "animate-bounce" : ""])}" data-v-cf729e6b><div class="win-counter-badge" data-v-cf729e6b><div class="win-counter-icon" data-v-cf729e6b>🎉</div><div class="win-counter-number" data-v-cf729e6b>${ssrInterpolate(winCounter.value)}</div></div></div>`);
          } else {
            _push2(`<!---->`);
          }
          _push2(`<div class="h-full flex flex-col relative" style="${ssrRenderStyle({
            backgroundImage: __props.assets.background ? `url(${__props.assets.background})` : "linear-gradient(135deg, #667eea 0%, #764ba2 100%)",
            backgroundSize: "cover",
            backgroundPosition: "center"
          })}" data-v-cf729e6b><div class="${ssrRenderClass(["absolute left-4 right-4 z-10", __props.demoMode ? "top-4" : "top-8"])}" data-v-cf729e6b>`);
          if (__props.assets.header) {
            _push2(`<img${ssrRenderAttr("src", __props.assets.header)} alt="Header" class="${ssrRenderClass(["w-full object-contain", __props.demoMode && actualPreviewMode.value === "mobile" ? "h-12" : __props.demoMode && actualPreviewMode.value === "desktop" ? "h-20" : isMobileDevice.value ? "h-16" : "h-24"])}" data-v-cf729e6b>`);
          } else {
            _push2(`<div class="text-center" data-v-cf729e6b><p class="text-red-400 text-sm" data-v-cf729e6b>!! Great Prizes To Be Won !!</p></div>`);
          }
          _push2(`</div>`);
          _push2(ssrRenderComponent(SpinGame, {
            spinAssets,
            demoMode: __props.demoMode,
            previewMode: actualPreviewMode.value,
            tickets: __props.tickets,
            playedTickets: playedTickets.value,
            onTicketPlayed,
            onPrizeWon,
            class: "flex-1"
          }, null, _parent));
          _push2(`<div class="${ssrRenderClass(["absolute right-4 bg-white/20 backdrop-blur-sm rounded px-3 py-1 z-10", __props.demoMode ? "top-20" : "top-24"])}" data-v-cf729e6b><span class="text-white text-sm font-semibold" data-v-cf729e6b>${ssrInterpolate(spinsLeft.value)} Spin${ssrInterpolate(spinsLeft.value === 1 ? "" : "s")} left</span></div>`);
          if (!hideFloatingCard.value) {
            _push2(`<div class="${ssrRenderClass(["absolute inset-0 flex items-start justify-center pointer-events-none z-20 transition-all duration-500", __props.demoMode && actualPreviewMode.value === "mobile" ? "pt-36" : __props.demoMode && actualPreviewMode.value === "desktop" ? "pt-38" : !__props.demoMode && isMobileDevice.value ? "pt-50" : "pt-60"])}" data-v-cf729e6b><div class="floating-credit-card" data-v-cf729e6b><div class="credit-card-3d" data-v-cf729e6b><div class="credit-card-front" data-v-cf729e6b><div class="card-gradient" style="${ssrRenderStyle({ background: `linear-gradient(135deg, ${__props.assets.walletColor || "#8b5cf6"} 0%, ${__props.assets.walletColor || "#8b5cf6"} 100%)` })}" data-v-cf729e6b><div class="card-header-section" data-v-cf729e6b><div class="brand-title" data-v-cf729e6b><h3 class="brand-text" data-v-cf729e6b>${ssrInterpolate(__props.assets.walletText || "SPIN WALLET")}</h3></div><div class="card-chip" data-v-cf729e6b></div></div><div class="card-body" data-v-cf729e6b><div class="prize-message" data-v-cf729e6b>Win Incredible Prizes</div></div><div class="card-footer" data-v-cf729e6b><div class="card-number" data-v-cf729e6b>**** 1234</div></div><div class="card-shine-effect" data-v-cf729e6b></div></div></div></div></div></div>`);
          } else {
            _push2(`<!---->`);
          }
          if (showWinnerCard.value) {
            _push2(`<div class="${ssrRenderClass(["fixed z-[60] flex items-start justify-center pointer-events-none", "inset-0", isMobileDevice.value || __props.demoMode && actualPreviewMode.value === "mobile" ? "pt-32" : "pt-24"])}" style="${ssrRenderStyle({ "background": "rgba(0, 0, 0, 0.3)" })}" data-v-cf729e6b><div style="${ssrRenderStyle(winnerCardSize.value)}" class="${ssrRenderClass([{
              "slide-to-corner": isCardAnimatingToCorner.value && !isMobileDevice.value && !(__props.demoMode && actualPreviewMode.value === "mobile"),
              "slide-to-corner-mobile": isCardAnimatingToCorner.value && (isMobileDevice.value || __props.demoMode && actualPreviewMode.value === "mobile")
            }, "winner-card-container"])}" data-v-cf729e6b><div class="winner-card" data-v-cf729e6b><div class="card-inner" data-v-cf729e6b><div class="card-front" data-v-cf729e6b><div class="card-content" style="${ssrRenderStyle({ background: `linear-gradient(135deg, ${__props.assets.walletColor || "#8b5cf6"} 0%, ${__props.assets.walletColor || "#8b5cf6"} 100%)` })}" data-v-cf729e6b><div class="card-header" data-v-cf729e6b><div class="brand-section" data-v-cf729e6b><h2 class="brand-text" data-v-cf729e6b>${ssrInterpolate(__props.assets.walletText || "SPIN WALLET")}</h2></div><div class="card-chip" data-v-cf729e6b></div></div><div class="prize-section" data-v-cf729e6b><div class="prize-amount" data-v-cf729e6b>${ssrInterpolate(currentPrize.value)}</div></div><div class="card-footer" data-v-cf729e6b><div class="card-number" data-v-cf729e6b>**** 1234</div></div></div></div></div></div></div></div>`);
          } else {
            _push2(`<!---->`);
          }
          _push2(`</div></div>`);
          if (__props.demoMode) {
            _push2(`<div class="mt-2 text-center text-gray-400 text-xs" data-v-cf729e6b>${ssrInterpolate(actualPreviewMode.value === "mobile" ? "📱 Mobile Preview (375x667)" : "💻 Desktop Preview (800x600)")}</div>`);
          } else {
            _push2(`<!---->`);
          }
          _push2(`</div>`);
        } else {
          _push2(`<!---->`);
        }
      }, "body", __props.demoMode, _parent);
      _push(ssrRenderComponent(TicketRevealModal, {
        modelValue: showTicketReveal.value,
        "onUpdate:modelValue": ($event) => showTicketReveal.value = $event,
        tickets: allTickets.value,
        playedTickets: playedTickets.value
      }, null, _parent));
      _push(`<!--]-->`);
    };
  }
});
const _sfc_setup = _sfc_main.setup;
_sfc_main.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("resources/js/Components/Games/SpinnyModal.vue");
  return _sfc_setup ? _sfc_setup(props, ctx) : void 0;
};
const SpinnyModal = /* @__PURE__ */ _export_sfc(_sfc_main, [["__scopeId", "data-v-cf729e6b"]]);
export {
  SpinnyModal as default
};
