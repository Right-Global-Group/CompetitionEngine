import { defineComponent, ref, computed, watch, nextTick, onMounted, onUnmounted, mergeProps, useSSRContext, reactive } from "vue";
import { ssrRenderAttrs, ssrRenderAttr, ssrRenderClass, ssrRenderStyle, ssrInterpolate, ssrIncludeBooleanAttr, ssrRenderList, ssrRenderTeleport, ssrRenderComponent } from "vue/server-renderer";
import { usePage } from "@inertiajs/vue3";
import { _ as _export_sfc } from "../ssr.js";
import "three";
import "axios";
import "@inertiajs/vue3/server";
const GRAVITY = 0.15;
const FRICTION = 0.995;
const BOUNCE = 0.45;
const PEG_RADIUS = 4.5;
const MIN_BOUNCE_VELOCITY = 0.8;
const TERMINAL_VELOCITY = 5;
const PRIZE_CARD_DISPLAY_LIMIT = 150;
const PEG_SOUND_COOLDOWN = 100;
const _sfc_main$1 = /* @__PURE__ */ defineComponent({
  __name: "CoinDropGame",
  __ssrInlineRender: true,
  props: {
    demoMode: { type: Boolean },
    previewMode: {},
    coinDropAssets: {},
    tickets: {},
    playedTickets: {},
    instant_win_categories: {},
    animateTitle: { type: Boolean },
    showGameBoard: { type: Boolean }
  },
  emits: ["ticket-played", "prize-won"],
  setup(__props, { emit: __emit }) {
    const props = __props;
    const emit = __emit;
    const canvasRef = ref(null);
    const containerRef = ref(null);
    const isDropping = ref(false);
    const winCounter = ref(0);
    const showWinReveal = ref(false);
    const currentWinningPrize = ref(null);
    const lastWin = ref(0);
    const gameInitialized = ref(false);
    const hasClickedDrop = ref(false);
    ref(null);
    const winSound = ref(null);
    const lossSound = ref(null);
    const ballImageLoaded = ref(null);
    const winBucketImageLoaded = ref(null);
    const loseBucketImageLoaded = ref(null);
    const tubeImageLoaded = ref(null);
    let pegs = [];
    let balls = [];
    let buckets = [];
    let particles = [];
    let animationFrameId = null;
    let ctx = null;
    let canvasWidth = 420;
    let canvasHeight = 620;
    const dropsLeft = computed(() => {
      var _a;
      if (props.demoMode) {
        return 10;
      }
      if (!props.tickets) {
        return 0;
      }
      return props.tickets.length - (((_a = props.playedTickets) == null ? void 0 : _a.length) || 0);
    });
    const canDrop = computed(() => dropsLeft.value > 0);
    const isMobile = computed(() => props.previewMode === "mobile");
    const topPrize = computed(() => {
      if (!props.instant_win_categories || props.instant_win_categories.length === 0) {
        return null;
      }
      const nonBundle = props.instant_win_categories.filter((cat) => cat.prize_type !== "ticket_bundle");
      const pool = nonBundle.length > 0 ? nonBundle : props.instant_win_categories;
      const top = pool.reduce((max, cat) => cat.value > ((max == null ? void 0 : max.value) || 0) ? cat : max, pool[0]);
      return top ? { ...top, isNoAutoCredit: top.no_auto_credit === true, isTicketBundle: top.prize_type === "ticket_bundle" } : null;
    });
    const showPrizesModal = ref(false);
    const showRevealWinsModal = ref(false);
    const showAllPrizeCards = ref(false);
    function isWinningTicket(ticket) {
      return ticket.instant_win !== false && !!ticket.instant_win && ticket.instant_win.prize !== "NO WIN";
    }
    const visiblePrizeCardTickets = computed(() => {
      if (!props.tickets) return [];
      const playedIds = new Set(props.playedTickets || []);
      const rank = (t) => {
        if (!playedIds.has(t.id)) return 2;
        return isWinningTicket(t) ? 0 : 1;
      };
      const sorted = [...props.tickets].sort((a, b) => rank(a) - rank(b));
      if (showAllPrizeCards.value || sorted.length <= PRIZE_CARD_DISPLAY_LIMIT) {
        return sorted;
      }
      return sorted.slice(0, PRIZE_CARD_DISPLAY_LIMIT);
    });
    function initPegs() {
      pegs = [];
      const isSmallMobile = isMobile.value && canvasWidth <= 365;
      const startY = isSmallMobile ? 50 : 70;
      const tenant = Object.keys(usePage().props.tenantFeatures ?? {})[0] ?? "";
      const baseRows = isSmallMobile ? 8 : isMobile.value ? 10 : 14;
      const rows = tenant === "winnerwinner" ? baseRows - 1 : baseRows;
      const spacing = isSmallMobile ? 24 : isMobile.value ? 28 : 32;
      const rowSpacing = isSmallMobile ? 32 : isMobile.value ? 40 : 42;
      for (let row = 0; row < rows; row++) {
        const pegsInRow = row + 3;
        const rowWidth = (pegsInRow - 1) * spacing;
        const startX = (canvasWidth - rowWidth) / 2;
        for (let col = 0; col < pegsInRow; col++) {
          pegs.push({
            x: startX + col * spacing,
            y: startY + row * rowSpacing,
            radius: PEG_RADIUS,
            hit: false,
            hitTime: 0
          });
        }
      }
    }
    function initBuckets() {
      buckets = [];
      const numBuckets = 7;
      const bucketWidth = canvasWidth / numBuckets;
      const bucketHeight = isMobile.value ? 40 : 45;
      const bucketY = canvasHeight - bucketHeight - 5;
      for (let i = 0; i < numBuckets; i++) {
        const isWin = i === 0 || i === 6;
        buckets.push({
          x: i * bucketWidth,
          y: bucketY,
          width: bucketWidth,
          height: bucketHeight,
          isWin,
          label: isWin ? "WIN" : "",
          color: isWin ? props.coinDropAssets.winBucketColor || "#00ff88" : props.coinDropAssets.loseBucketColor || "#ff4444",
          bounceOffset: 0,
          bounceTime: 0
        });
      }
    }
    function createParticles(x, y, color, count = 10) {
      for (let i = 0; i < count; i++) {
        particles.push({
          x,
          y,
          vx: (Math.random() - 0.5) * 10,
          vy: (Math.random() - 0.5) * 10 - 3,
          radius: Math.random() * 4 + 2,
          color,
          life: 1
        });
      }
    }
    let audioCtx = null;
    function initAudio() {
      if (!audioCtx) {
        audioCtx = new (window.AudioContext || window.webkitAudioContext)();
      }
    }
    let lastPegSoundTime = 0;
    function playPegSound() {
      const now = performance.now();
      if (now - lastPegSoundTime < PEG_SOUND_COOLDOWN) return;
      lastPegSoundTime = now;
      initAudio();
      if (!audioCtx) return;
      const osc = audioCtx.createOscillator();
      const gain = audioCtx.createGain();
      osc.connect(gain);
      gain.connect(audioCtx.destination);
      osc.frequency.value = 800 + Math.random() * 400;
      osc.type = "sine";
      gain.gain.setValueAtTime(0.05, audioCtx.currentTime);
      gain.gain.exponentialRampToValueAtTime(0.01, audioCtx.currentTime + 0.03);
      osc.start();
      osc.stop(audioCtx.currentTime + 0.03);
    }
    function playWinSound() {
      if (winSound.value && props.coinDropAssets.winSound) {
        winSound.value.currentTime = 0;
        winSound.value.play().catch(() => {
        });
      } else {
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
    }
    function playLossSound() {
      if (lossSound.value && props.coinDropAssets.lossSound) {
        lossSound.value.currentTime = 0;
        lossSound.value.play().catch(() => {
        });
      }
    }
    function shadeColor(color, percent) {
      const num = parseInt(color.replace("#", ""), 16);
      const amt = Math.round(2.55 * percent);
      const R = Math.max(0, Math.min(255, (num >> 16) + amt));
      const G = Math.max(0, Math.min(255, (num >> 8 & 255) + amt));
      const B = Math.max(0, Math.min(255, (num & 255) + amt));
      return "#" + (16777216 + R * 65536 + G * 256 + B).toString(16).slice(1);
    }
    function lightenColor(color, percent) {
      return shadeColor(color, percent);
    }
    function update() {
      var _a;
      const now = Date.now();
      for (let i = balls.length - 1; i >= 0; i--) {
        const ball = balls[i];
        ball.trail.push({ x: ball.x, y: ball.y });
        if (ball.trail.length > 30) ball.trail.shift();
        ball.vy += GRAVITY;
        ball.vx *= FRICTION;
        if (ball.vy > TERMINAL_VELOCITY) ball.vy = TERMINAL_VELOCITY;
        if (ball.lastY === void 0) ball.lastY = ball.y;
        if (ball.stuckFrames === void 0) ball.stuckFrames = 0;
        if (ball.maxYReached === void 0) ball.maxYReached = ball.y;
        const bucketAreaY = canvasHeight - 80;
        if (ball.y > ball.maxYReached) {
          ball.maxYReached = ball.y;
          ball.stuckFrames = 0;
        } else {
          ball.stuckFrames++;
          if (ball.y >= bucketAreaY) {
            if (ball.stuckFrames >= 20) {
              const bucketWidth = canvasWidth / 7;
              const currentBucketIndex = Math.floor(ball.x / bucketWidth);
              const targetBucketCenter = (currentBucketIndex + 0.5) * bucketWidth;
              ball.vx = (targetBucketCenter - ball.x) * 0.3;
              ball.vy = 3;
              ball.stuckFrames = 0;
            }
          } else {
            if (ball.stuckFrames === 30) {
              ball.vy = Math.max(ball.vy, 2);
              ball.vx += (Math.random() - 0.5) * 2;
            }
            if (ball.stuckFrames === 60) {
              ball.vy = 4 + Math.random() * 2;
              ball.vx = (Math.random() - 0.5) * 4;
            }
            if (ball.stuckFrames >= 90) {
              ball.y = ball.maxYReached + 30;
              ball.vy = TERMINAL_VELOCITY;
              ball.vx = (Math.random() - 0.5) * 2;
              ball.stuckFrames = 0;
              ball.maxYReached = ball.y;
            }
          }
        }
        ball.lastY = ball.y;
        const targetBucket = buckets[ball.targetBucketIndex];
        if (targetBucket) {
          const targetX = targetBucket.x + targetBucket.width / 2;
          const dx = targetX - ball.x;
          const progressDown = ball.y / canvasHeight;
          const distanceToTarget = Math.abs(dx);
          const bucketHalfWidth = targetBucket.width / 2;
          if (ball.isWinner) {
            const remainingDrop = 1 - progressDown;
            const framesRemaining = remainingDrop * canvasHeight / TERMINAL_VELOCITY;
            const velocityNeeded = framesRemaining > 0 ? distanceToTarget / framesRemaining : 4;
            ball.vx += Math.sign(dx) * 0.06;
            if (progressDown > 0.3 && distanceToTarget > 100) {
              ball.vx += Math.sign(dx) * 0.05;
            }
            if (progressDown > 0.45 && distanceToTarget > 80) {
              ball.vx += Math.sign(dx) * 0.07;
            }
            if (progressDown > 0.6 && distanceToTarget > 60) {
              ball.vx += Math.sign(dx) * 0.1;
              const targetVx = Math.sign(dx) * Math.min(3.5, velocityNeeded * 0.9);
              ball.vx = ball.vx * 0.6 + targetVx * 0.4;
            }
            if (progressDown > 0.7 && distanceToTarget > bucketHalfWidth) {
              const targetVx = Math.sign(dx) * Math.min(5, velocityNeeded * 1.1);
              ball.vx = ball.vx * 0.2 + targetVx * 0.8;
            }
            if (progressDown > 0.8 && distanceToTarget > bucketHalfWidth * 0.5) {
              ball.vx = Math.sign(dx) * Math.min(6, velocityNeeded * 1.2);
            }
            if (progressDown > 0.9 && distanceToTarget > bucketHalfWidth * 0.3) {
              ball.vx = Math.sign(dx) * Math.min(8, distanceToTarget * 0.12);
            }
          } else {
            const bucket0RightEdge = buckets[0].x + buckets[0].width;
            const bucket6LeftEdge = buckets[6].x;
            const distToLeftWin = ball.x - bucket0RightEdge;
            const distToRightWin = bucket6LeftEdge - ball.x;
            const winBucketSafeZone = 40;
            ball.vx += Math.sign(dx) * 0.025;
            if (distToLeftWin < winBucketSafeZone && distToLeftWin > -30) {
              ball.vx += 0.15;
            }
            if (distToRightWin < winBucketSafeZone && distToRightWin > -30) {
              ball.vx -= 0.15;
            }
            if (progressDown > 0.5 && distanceToTarget > bucketHalfWidth * 0.5) {
              ball.vx += Math.sign(dx) * 0.05;
            }
            if (progressDown > 0.65 && distanceToTarget > bucketHalfWidth * 0.4) {
              ball.vx += Math.sign(dx) * 0.07;
            }
            if (progressDown > 0.8 && distanceToTarget > bucketHalfWidth * 0.3) {
              const nudge = Math.sign(dx) * Math.min(2.5, distanceToTarget * 0.06);
              ball.vx = ball.vx * 0.5 + nudge * 0.5;
            }
            if (progressDown > 0.88) {
              if (distToLeftWin < winBucketSafeZone * 2) {
                ball.vx = Math.max(ball.vx, 2.5);
              }
              if (distToRightWin < winBucketSafeZone * 2) {
                ball.vx = Math.min(ball.vx, -2.5);
              }
            }
          }
        }
        ball.x += ball.vx;
        ball.y += ball.vy;
        ball.rotation += ball.vx * 0.1;
        if (ball.x - ball.radius < 5) {
          ball.x = ball.radius + 6;
          ball.vx = Math.abs(ball.vx) * 0.5 + 1;
        }
        if (ball.x + ball.radius > canvasWidth - 5) {
          ball.x = canvasWidth - ball.radius - 6;
          ball.vx = -Math.abs(ball.vx) * 0.5 - 1;
        }
        for (const peg of pegs) {
          const dx = ball.x - peg.x;
          const dy = ball.y - peg.y;
          const dist = Math.sqrt(dx * dx + dy * dy);
          const minDist = ball.radius + peg.radius + 1;
          if (dist < minDist && dist > 0) {
            const angle = Math.atan2(dy, dx);
            ball.x = peg.x + Math.cos(angle) * (minDist + 0.5);
            ball.y = peg.y + Math.sin(angle) * (minDist + 0.5);
            const nx = dx / dist;
            const ny = dy / dist;
            const dot = ball.vx * nx + ball.vy * ny;
            ball.vx = (ball.vx - 2 * dot * nx) * BOUNCE;
            ball.vy = (ball.vy - 2 * dot * ny) * BOUNCE;
            ball.vx += (Math.random() - 0.5) * 0.8;
            if (ball.vy < MIN_BOUNCE_VELOCITY) {
              ball.vy = MIN_BOUNCE_VELOCITY;
            }
            peg.hit = true;
            peg.hitTime = now;
            playPegSound();
            createParticles(peg.x, peg.y, props.coinDropAssets.pegGlowColor || "#e94560", 2);
          }
        }
        const bucketDetectY = isMobile.value ? canvasHeight - 60 : canvasHeight - 70;
        if (ball.y > bucketDetectY) {
          for (let bucketIdx = 0; bucketIdx < buckets.length; bucketIdx++) {
            const bucket = buckets[bucketIdx];
            if (ball.x > bucket.x && ball.x < bucket.x + bucket.width) {
              if (ball.isWinner) {
                winCounter.value++;
                lastWin.value = ((_a = ball.prize) == null ? void 0 : _a.value) || 0;
                currentWinningPrize.value = ball.prize || null;
                showWinReveal.value = true;
                setTimeout(() => {
                  showWinReveal.value = false;
                }, 2500);
                if (ball.prize) {
                  emit("prize-won", ball.prize);
                }
                playWinSound();
                createParticles(ball.x, ball.y, props.coinDropAssets.winBucketColor || "#00ff88", 15);
              } else {
                lastWin.value = 0;
                playLossSound();
                createParticles(ball.x, ball.y, props.coinDropAssets.loseBucketColor || "#ff4444", 10);
              }
              bucket.bounceOffset = -15;
              bucket.bounceTime = now;
              balls.splice(i, 1);
              break;
            }
          }
        }
        if (ball.y > canvasHeight + 50) {
          balls.splice(i, 1);
        }
      }
      for (let i = particles.length - 1; i >= 0; i--) {
        const p = particles[i];
        p.x += p.vx;
        p.y += p.vy;
        p.vy += 0.2;
        p.life -= 0.08;
        if (p.life <= 0) {
          particles.splice(i, 1);
        }
      }
      if (particles.length > 50) {
        particles.splice(0, particles.length - 50);
      }
      for (const peg of pegs) {
        if (peg.hit && now - peg.hitTime > 150) {
          peg.hit = false;
        }
      }
      for (const bucket of buckets) {
        if (bucket.bounceOffset !== 0) {
          const elapsed = now - bucket.bounceTime;
          if (elapsed > 400) {
            bucket.bounceOffset = 0;
          } else {
            bucket.bounceOffset = -20 * Math.cos(elapsed / 400 * Math.PI * 2.5) * Math.exp(-elapsed / 200);
          }
        }
      }
    }
    function draw() {
      if (!ctx) return;
      const pegGlowColor = props.coinDropAssets.pegGlowColor || "#e94560";
      const ballColor = props.coinDropAssets.ballColor || "#ffd700";
      ctx.clearRect(0, 0, canvasWidth, canvasHeight);
      const tubeWidth = tubeImageLoaded.value ? 60 : 40;
      const tubeHeight = tubeImageLoaded.value ? 45 : 30;
      const tubeX = (canvasWidth - tubeWidth) / 2;
      const tubeY = 0;
      if (tubeImageLoaded.value) {
        ctx.drawImage(tubeImageLoaded.value, tubeX, tubeY, tubeWidth, tubeHeight);
      } else {
        ctx.fillStyle = "rgba(80, 80, 100, 0.8)";
        ctx.beginPath();
        ctx.roundRect(tubeX, tubeY, tubeWidth, tubeHeight, [0, 0, 8, 8]);
        ctx.fill();
        ctx.fillStyle = "rgba(120, 120, 140, 0.6)";
        ctx.fillRect(tubeX + 4, tubeY, tubeWidth - 8, 4);
        ctx.fillStyle = "rgba(0, 0, 0, 0.4)";
        ctx.fillRect(tubeX + 8, tubeHeight - 10, tubeWidth - 16, 10);
      }
      for (const bucket of buckets) {
        const bounceY = bucket.y + bucket.bounceOffset;
        const bucketImg = bucket.isWin ? winBucketImageLoaded.value : loseBucketImageLoaded.value;
        if (bucketImg) {
          ctx.drawImage(
            bucketImg,
            bucket.x + 2,
            bounceY,
            bucket.width - 4,
            bucket.height
          );
        } else {
          ctx.fillStyle = bucket.color;
          ctx.fillRect(bucket.x + 1, bounceY, bucket.width - 2, bucket.height);
          ctx.fillStyle = lightenColor(bucket.color, 40);
          ctx.fillRect(bucket.x + 1, bounceY, bucket.width - 2, 4);
          if (bucket.isWin) {
            ctx.fillStyle = "#fff";
            ctx.font = "bold 12px Arial, sans-serif";
            ctx.textAlign = "center";
            ctx.fillText("WIN", bucket.x + bucket.width / 2, bounceY + 35);
          }
        }
        ctx.fillStyle = "rgba(0,0,0,0.6)";
        ctx.fillRect(bucket.x, bounceY, 2, bucket.height);
      }
      const pegBorderColor = props.coinDropAssets.pegColor || "#00ffff";
      const pegCenterColor = "#000000";
      const pegShape = props.coinDropAssets.pegShape || "hexagon";
      for (const peg of pegs) {
        const size = peg.radius * 1.8;
        const isHit = peg.hit;
        const borderColor = isHit ? pegGlowColor : pegBorderColor;
        const lineWidth = isHit ? 3.5 : 3;
        if (isHit) {
          ctx.save();
          ctx.shadowColor = pegGlowColor;
          ctx.shadowBlur = 12;
        }
        ctx.beginPath();
        if (pegShape === "hexagon") {
          for (let i = 0; i < 6; i++) {
            const angle = Math.PI / 3 * i - Math.PI / 2;
            const x = peg.x + size * Math.cos(angle);
            const y = peg.y + size * Math.sin(angle);
            if (i === 0) ctx.moveTo(x, y);
            else ctx.lineTo(x, y);
          }
          ctx.closePath();
        } else if (pegShape === "circle") {
          ctx.arc(peg.x, peg.y, size, 0, Math.PI * 2);
        } else {
          const halfSize = size * 0.85;
          ctx.rect(peg.x - halfSize, peg.y - halfSize, halfSize * 2, halfSize * 2);
        }
        ctx.fillStyle = borderColor;
        ctx.fill();
        ctx.strokeStyle = borderColor;
        ctx.lineWidth = lineWidth;
        ctx.stroke();
        if (isHit) ctx.restore();
        const innerSize = size * 0.65;
        ctx.beginPath();
        if (pegShape === "hexagon") {
          for (let i = 0; i < 6; i++) {
            const angle = Math.PI / 3 * i - Math.PI / 2;
            const x = peg.x + innerSize * Math.cos(angle);
            const y = peg.y + innerSize * Math.sin(angle);
            if (i === 0) ctx.moveTo(x, y);
            else ctx.lineTo(x, y);
          }
          ctx.closePath();
        } else if (pegShape === "circle") {
          ctx.arc(peg.x, peg.y, innerSize, 0, Math.PI * 2);
        } else {
          const halfInner = innerSize * 0.85;
          ctx.rect(peg.x - halfInner, peg.y - halfInner, halfInner * 2, halfInner * 2);
        }
        ctx.fillStyle = pegCenterColor;
        ctx.fill();
      }
      const trailColor = props.coinDropAssets.trailColor || props.coinDropAssets.primaryColor || "#e94560";
      for (const ball of balls) {
        for (let i = 0; i < ball.trail.length; i += 2) {
          const t = ball.trail[i];
          const progress = i / ball.trail.length;
          const alpha = progress * 0.7;
          const radius = progress * ball.radius * 1.2;
          ctx.beginPath();
          ctx.arc(t.x, t.y, radius, 0, Math.PI * 2);
          ctx.fillStyle = `${trailColor}${Math.floor(alpha * 255).toString(16).padStart(2, "0")}`;
          ctx.fill();
        }
      }
      for (const ball of balls) {
        ctx.save();
        if (ballImageLoaded.value) {
          ctx.translate(ball.x, ball.y);
          ctx.rotate(ball.rotation);
          const imgSize = ball.radius * 2.2;
          ctx.drawImage(
            ballImageLoaded.value,
            -imgSize / 2,
            -imgSize / 2,
            imgSize,
            imgSize
          );
        } else {
          ctx.beginPath();
          ctx.arc(ball.x, ball.y, ball.radius, 0, Math.PI * 2);
          ctx.fillStyle = ballColor;
          ctx.fill();
          ctx.strokeStyle = shadeColor(ballColor, -30);
          ctx.lineWidth = 1.5;
          ctx.stroke();
          ctx.beginPath();
          ctx.arc(ball.x - ball.radius * 0.3, ball.y - ball.radius * 0.3, ball.radius * 0.3, 0, Math.PI * 2);
          ctx.fillStyle = "rgba(255,255,255,0.6)";
          ctx.fill();
        }
        ctx.restore();
      }
      for (const p of particles) {
        ctx.globalAlpha = p.life;
        ctx.beginPath();
        ctx.arc(p.x, p.y, p.radius, 0, Math.PI * 2);
        ctx.fillStyle = p.color;
        ctx.fill();
      }
      ctx.globalAlpha = 1;
    }
    function gameLoop() {
      update();
      draw();
      animationFrameId = requestAnimationFrame(gameLoop);
    }
    function initGame() {
      if (!canvasRef.value) return;
      ctx = canvasRef.value.getContext("2d");
      if (!ctx) return;
      const container = containerRef.value;
      if (container) {
        const isSmallMobile = window.innerWidth <= 380;
        const availableHeight = window.innerHeight * (isSmallMobile ? 0.65 : 0.75);
        canvasWidth = Math.min(container.clientWidth - 10, isSmallMobile ? 360 : isMobile.value ? 420 : 520);
        canvasHeight = Math.min(availableHeight, isSmallMobile ? 420 : isMobile.value ? 550 : 700);
        canvasRef.value.width = canvasWidth;
        canvasRef.value.height = canvasHeight;
      }
      initPegs();
      initBuckets();
      gameInitialized.value = true;
      if (animationFrameId === null) {
        gameLoop();
      }
    }
    function loadBallImage(src) {
      if (!src) {
        ballImageLoaded.value = null;
        return;
      }
      const img = new Image();
      img.onload = () => {
        ballImageLoaded.value = img;
      };
      img.onerror = () => {
        ballImageLoaded.value = null;
      };
      img.src = src;
    }
    watch(() => props.coinDropAssets.ballImage, (newVal) => {
      loadBallImage(newVal || "");
    }, { immediate: true });
    function loadBucketImage(src, isWin) {
      if (!src) {
        if (isWin) {
          winBucketImageLoaded.value = null;
        } else {
          loseBucketImageLoaded.value = null;
        }
        return;
      }
      const img = new Image();
      img.onload = () => {
        if (isWin) {
          winBucketImageLoaded.value = img;
        } else {
          loseBucketImageLoaded.value = img;
        }
      };
      img.onerror = () => {
        if (isWin) {
          winBucketImageLoaded.value = null;
        } else {
          loseBucketImageLoaded.value = null;
        }
      };
      img.src = src;
    }
    watch(() => props.coinDropAssets.winBucketImage, (newVal) => {
      loadBucketImage(newVal || "", true);
    }, { immediate: true });
    watch(() => props.coinDropAssets.loseBucketImage, (newVal) => {
      loadBucketImage(newVal || "", false);
    }, { immediate: true });
    function loadTubeImage(src) {
      if (!src) {
        tubeImageLoaded.value = null;
        return;
      }
      const img = new Image();
      img.onload = () => {
        tubeImageLoaded.value = img;
      };
      img.onerror = () => {
        tubeImageLoaded.value = null;
      };
      img.src = src;
    }
    watch(() => props.coinDropAssets.tubeImage, (newVal) => {
      loadTubeImage(newVal || "");
    }, { immediate: true });
    watch(() => props.showGameBoard, (newVal) => {
      if (newVal && !gameInitialized.value) {
        nextTick(() => {
          setTimeout(() => {
            initGame();
          }, 100);
        });
      }
    }, { immediate: true });
    onMounted(() => {
      if (props.showGameBoard) {
        nextTick(() => {
          initGame();
        });
      }
    });
    onUnmounted(() => {
      if (animationFrameId !== null) {
        cancelAnimationFrame(animationFrameId);
        animationFrameId = null;
      }
    });
    return (_ctx, _push, _parent, _attrs) => {
      var _a;
      _push(`<div${ssrRenderAttrs(mergeProps({
        ref_key: "containerRef",
        ref: containerRef,
        class: ["coin-drop-container", { "coin-drop-container-demo": __props.demoMode, "video-intro-active": __props.animateTitle && !__props.showGameBoard }],
        style: __props.coinDropAssets.gameBackground ? { backgroundImage: `url(${__props.coinDropAssets.gameBackground})`, backgroundSize: "cover", backgroundPosition: "center" } : {}
      }, _attrs))} data-v-8f3e02dd>`);
      if (!__props.showGameBoard) {
        _push(`<div class="title-floating" data-v-8f3e02dd>`);
        if (__props.coinDropAssets.titleImage) {
          _push(`<img${ssrRenderAttr("src", __props.coinDropAssets.titleImage)} alt="Game Title" class="${ssrRenderClass(["title-image", { "title-zoom-animation": __props.animateTitle }])}" data-v-8f3e02dd>`);
        } else {
          _push(`<h1 style="${ssrRenderStyle({ color: __props.coinDropAssets.titleColor })}" class="${ssrRenderClass(["title-text", { "title-zoom-animation": __props.animateTitle }])}" data-v-8f3e02dd>${ssrInterpolate(__props.coinDropAssets.titleText)}</h1>`);
        }
        _push(`<p class="title-subtitle" style="${ssrRenderStyle({ color: __props.coinDropAssets.accentColor })}" data-v-8f3e02dd>Drop the coin to win!</p></div>`);
      } else {
        _push(`<!---->`);
      }
      if (__props.showGameBoard) {
        _push(`<div class="game-wrapper" style="${ssrRenderStyle({ "--primary-color": __props.coinDropAssets.primaryColor, "--secondary-color": __props.coinDropAssets.secondaryColor, "--accent-color": __props.coinDropAssets.accentColor })}" data-v-8f3e02dd>`);
        if (__props.coinDropAssets.machineImage) {
          _push(`<div class="machine-frame" data-v-8f3e02dd><img${ssrRenderAttr("src", __props.coinDropAssets.machineImage)} alt="" class="machine-bg" data-v-8f3e02dd></div>`);
        } else {
          _push(`<!---->`);
        }
        _push(`<div class="game-content" data-v-8f3e02dd><div class="game-header" data-v-8f3e02dd>`);
        if (__props.coinDropAssets.titleImage) {
          _push(`<img${ssrRenderAttr("src", __props.coinDropAssets.titleImage)} alt="Game Title" class="header-title-image" data-v-8f3e02dd>`);
        } else {
          _push(`<h2 class="header-title" style="${ssrRenderStyle({ color: __props.coinDropAssets.titleColor })}" data-v-8f3e02dd>${ssrInterpolate(__props.coinDropAssets.titleText)}</h2>`);
        }
        _push(`</div><div class="stats-bar" data-v-8f3e02dd><div class="stat-item" data-v-8f3e02dd><span class="stat-label" data-v-8f3e02dd>DROPS</span><span class="stat-value" style="${ssrRenderStyle({ color: __props.coinDropAssets.accentColor })}" data-v-8f3e02dd>${ssrInterpolate(dropsLeft.value)}</span></div><div class="stat-item" data-v-8f3e02dd><span class="stat-label" data-v-8f3e02dd>WINS</span><span class="stat-value stat-wins" style="${ssrRenderStyle({ color: __props.coinDropAssets.winBucketColor })}" data-v-8f3e02dd>${ssrInterpolate(winCounter.value)}</span></div><div class="stat-item" data-v-8f3e02dd><span class="stat-label" data-v-8f3e02dd>LAST WIN</span><span class="stat-value" style="${ssrRenderStyle({ color: __props.coinDropAssets.accentColor })}" data-v-8f3e02dd>`);
        if (currentWinningPrize.value && currentWinningPrize.value.no_auto_credit) {
          _push(`<!--[-->${ssrInterpolate(currentWinningPrize.value.name)}<!--]-->`);
        } else if (lastWin.value > 0) {
          _push(`<!--[-->£${ssrInterpolate(lastWin.value)}<!--]-->`);
        } else {
          _push(`<!--[-->---<!--]-->`);
        }
        _push(`</span></div></div><div class="canvas-container" style="${ssrRenderStyle({ "--board-bg": __props.coinDropAssets.boardBgColor || "#1a1a2e" })}" data-v-8f3e02dd>`);
        if (__props.tickets && __props.tickets.length > 0) {
          _push(`<button class="reveal-wins-corner-btn" style="${ssrRenderStyle({ "--btn-accent": __props.coinDropAssets.winBucketColor || "#00ff88" })}" data-v-8f3e02dd><span data-v-8f3e02dd>REVEAL</span></button>`);
        } else {
          _push(`<!---->`);
        }
        _push(`<button class="instant-wins-corner-btn" style="${ssrRenderStyle({ "--btn-accent": __props.coinDropAssets.accentColor || "#ffd700" })}" data-v-8f3e02dd><span data-v-8f3e02dd>PRIZES</span></button><canvas class="game-canvas" data-v-8f3e02dd></canvas></div><div class="button-container" data-v-8f3e02dd>`);
        if (!hasClickedDrop.value && canDrop.value) {
          _push(`<div class="drop-arrow-hint" data-v-8f3e02dd><svg viewBox="0 0 24 24" fill="currentColor" class="arrow-icon" data-v-8f3e02dd><path d="M12 16l-6-6h12l-6 6z" data-v-8f3e02dd></path></svg><span class="arrow-text" data-v-8f3e02dd>TAP HERE!</span></div>`);
        } else {
          _push(`<div class="arrow-placeholder" data-v-8f3e02dd></div>`);
        }
        _push(`<button${ssrIncludeBooleanAttr(!canDrop.value) ? " disabled" : ""} class="${ssrRenderClass([{ "is-dropping": isDropping.value, "has-image": __props.coinDropAssets.dropButtonImage }, "drop-button"])}" style="${ssrRenderStyle({
          "--btn-color": __props.coinDropAssets.primaryColor,
          "--btn-glow": __props.coinDropAssets.accentColor
        })}" data-v-8f3e02dd>`);
        if (__props.coinDropAssets.dropButtonImage) {
          _push(`<img${ssrRenderAttr("src", __props.coinDropAssets.dropButtonImage)} alt="Drop" class="drop-btn-img" data-v-8f3e02dd>`);
        } else {
          _push(`<span class="btn-label" data-v-8f3e02dd>${ssrInterpolate(isDropping.value ? "DROPPING..." : "DROP COIN")}</span>`);
        }
        _push(`</button>`);
        if (topPrize.value) {
          _push(`<div class="top-prize-display" data-v-8f3e02dd><div class="top-prize-label" data-v-8f3e02dd>TOP PRIZE</div><div class="top-prize-content" data-v-8f3e02dd>`);
          if (topPrize.value.image_path) {
            _push(`<img${ssrRenderAttr("src", topPrize.value.image_path)}${ssrRenderAttr("alt", topPrize.value.name)} class="top-prize-img" data-v-8f3e02dd>`);
          } else {
            _push(`<!---->`);
          }
          _push(`<div class="top-prize-info" data-v-8f3e02dd><span class="top-prize-name" data-v-8f3e02dd>${ssrInterpolate(topPrize.value.name)}</span><span class="top-prize-value" style="${ssrRenderStyle({ color: __props.coinDropAssets.accentColor })}" data-v-8f3e02dd>`);
          if (topPrize.value.isTicketBundle) {
            _push(`<!--[-->${ssrInterpolate(Math.floor(topPrize.value.value))} Free Ticket${ssrInterpolate(topPrize.value.value != 1 ? "s" : "")}<!--]-->`);
          } else {
            _push(`<!--[-->${ssrInterpolate(topPrize.value.isNoAutoCredit ? "Up to " : "")}£${ssrInterpolate(topPrize.value.value)}<!--]-->`);
          }
          _push(`</span></div></div></div>`);
        } else {
          _push(`<!---->`);
        }
        _push(`</div></div>`);
        if (__props.coinDropAssets.footerImage) {
          _push(`<div class="machine-footer" data-v-8f3e02dd><img${ssrRenderAttr("src", __props.coinDropAssets.footerImage)} alt="" class="footer-bg" data-v-8f3e02dd></div>`);
        } else {
          _push(`<!---->`);
        }
        _push(`</div>`);
      } else {
        _push(`<!---->`);
      }
      if (showWinReveal.value && currentWinningPrize.value) {
        _push(`<div class="win-toast" style="${ssrRenderStyle({ "--accent": __props.coinDropAssets.accentColor })}" data-v-8f3e02dd><div class="win-toast-content" data-v-8f3e02dd><div class="win-toast-title" data-v-8f3e02dd>WINNER!</div><div class="win-toast-prize" data-v-8f3e02dd>${ssrInterpolate(currentWinningPrize.value.name)}</div>`);
        if (!currentWinningPrize.value.no_auto_credit) {
          _push(`<div class="win-toast-value" data-v-8f3e02dd>£${ssrInterpolate(currentWinningPrize.value.value)}</div>`);
        } else {
          _push(`<!---->`);
        }
        _push(`</div>`);
        if (currentWinningPrize.value.image) {
          _push(`<img${ssrRenderAttr("src", currentWinningPrize.value.image)}${ssrRenderAttr("alt", currentWinningPrize.value.name)} class="win-toast-img" data-v-8f3e02dd>`);
        } else {
          _push(`<!---->`);
        }
        _push(`</div>`);
      } else {
        _push(`<!---->`);
      }
      if (showPrizesModal.value) {
        _push(`<div class="prizes-modal-overlay" data-v-8f3e02dd><div class="prizes-modal" style="${ssrRenderStyle({ "--modal-accent": __props.coinDropAssets.accentColor, "--modal-primary": __props.coinDropAssets.primaryColor })}" data-v-8f3e02dd><button class="prizes-modal-close" data-v-8f3e02dd>✕</button><h2 class="prizes-modal-title" data-v-8f3e02dd>INSTANT WINS</h2><p class="reveal-wins-subtitle" data-v-8f3e02dd>These prizes can be won!</p>`);
        if (__props.instant_win_categories && __props.instant_win_categories.length > 0) {
          _push(`<div class="prizes-grid" data-v-8f3e02dd><!--[-->`);
          ssrRenderList(__props.instant_win_categories, (prize) => {
            _push(`<div class="${ssrRenderClass([{ "top-prize-card": topPrize.value && prize.id === topPrize.value.id }, "prize-card"])}" data-v-8f3e02dd>`);
            if (topPrize.value && prize.id === topPrize.value.id) {
              _push(`<div class="top-badge" data-v-8f3e02dd>TOP PRIZE</div>`);
            } else {
              _push(`<!---->`);
            }
            if (prize.image_path) {
              _push(`<img${ssrRenderAttr("src", prize.image_path)}${ssrRenderAttr("alt", prize.name)} class="prize-card-img" data-v-8f3e02dd>`);
            } else {
              _push(`<div class="prize-card-placeholder" data-v-8f3e02dd>?</div>`);
            }
            _push(`<div class="prize-card-name" data-v-8f3e02dd>${ssrInterpolate(prize.name)}</div><div class="prize-card-value" style="${ssrRenderStyle({ color: __props.coinDropAssets.accentColor })}" data-v-8f3e02dd>`);
            if (prize.prize_type === "ticket_bundle") {
              _push(`<!--[-->${ssrInterpolate(Math.floor(prize.value))} Free Ticket${ssrInterpolate(prize.value !== 1 ? "s" : "")}<!--]-->`);
            } else {
              _push(`<!--[-->${ssrInterpolate(prize.no_auto_credit ? "Up to " : "")}£${ssrInterpolate(prize.value)}<!--]-->`);
            }
            _push(`</div></div>`);
          });
          _push(`<!--]--></div>`);
        } else {
          _push(`<div class="no-tickets-message" data-v-8f3e02dd><p data-v-8f3e02dd>No instant win prizes available</p></div>`);
        }
        _push(`</div></div>`);
      } else {
        _push(`<!---->`);
      }
      if (showRevealWinsModal.value) {
        _push(`<div class="prizes-modal-overlay" data-v-8f3e02dd><div class="prizes-modal reveal-wins-modal" style="${ssrRenderStyle({ "--modal-accent": __props.coinDropAssets.winBucketColor || "#00ff88", "--modal-primary": __props.coinDropAssets.primaryColor })}" data-v-8f3e02dd><button class="prizes-modal-close" data-v-8f3e02dd>✕</button><h2 class="prizes-modal-title" style="${ssrRenderStyle({ "color": "#00ff88" })}" data-v-8f3e02dd>YOUR INSTANT WINS</h2><p class="reveal-wins-subtitle" data-v-8f3e02dd>These are the prizes waiting for you!</p>`);
        if (!__props.demoMode && ((_a = __props.tickets) == null ? void 0 : _a.some((t) => {
          var _a2;
          return !((_a2 = __props.playedTickets) == null ? void 0 : _a2.includes(t.id));
        }))) {
          _push(`<button class="reveal-all-claim-btn" style="${ssrRenderStyle({ color: __props.coinDropAssets.winBucketColor, borderColor: __props.coinDropAssets.winBucketColor })}" data-v-8f3e02dd> Reveal All Remaining </button>`);
        } else {
          _push(`<!---->`);
        }
        if (__props.tickets && __props.tickets.length > 0) {
          _push(`<div class="prizes-grid" data-v-8f3e02dd><!--[-->`);
          ssrRenderList(visiblePrizeCardTickets.value, (ticket) => {
            var _a2, _b, _c, _d;
            _push(`<div class="${ssrRenderClass([{
              "winner-card": ((_a2 = __props.playedTickets) == null ? void 0 : _a2.includes(ticket.id)) && ticket.instant_win !== false && ticket.instant_win && ticket.instant_win.prize !== "NO WIN",
              "played-card": (_b = __props.playedTickets) == null ? void 0 : _b.includes(ticket.id)
            }, "prize-card"])}" data-v-8f3e02dd>`);
            if ((_c = __props.playedTickets) == null ? void 0 : _c.includes(ticket.id)) {
              _push(`<div class="played-badge" data-v-8f3e02dd>PLAYED</div>`);
            } else {
              _push(`<!---->`);
            }
            if (!((_d = __props.playedTickets) == null ? void 0 : _d.includes(ticket.id))) {
              _push(`<!--[--><div class="prize-card-placeholder" style="${ssrRenderStyle({ "opacity": "0.4" })}" data-v-8f3e02dd>?</div><div class="prize-card-name" style="${ssrRenderStyle({ "opacity": "0.4" })}" data-v-8f3e02dd>Not yet played</div><!--]-->`);
            } else if (ticket.instant_win !== false && ticket.instant_win && ticket.instant_win.prize !== "NO WIN") {
              _push(`<!--[--><div class="winner-badge" data-v-8f3e02dd>WINNER!</div>`);
              if (ticket.instant_win.image_path) {
                _push(`<img${ssrRenderAttr("src", ticket.instant_win.image_path)}${ssrRenderAttr("alt", ticket.instant_win.prize)} class="prize-card-img" data-v-8f3e02dd>`);
              } else {
                _push(`<div class="prize-card-placeholder winner-placeholder" data-v-8f3e02dd>WIN</div>`);
              }
              _push(`<div class="prize-card-name" data-v-8f3e02dd>`);
              if (ticket.instant_win.prize_type === "ticket_bundle") {
                _push(`<!--[-->${ssrInterpolate(Math.floor(ticket.instant_win.value))} Free Ticket${ssrInterpolate(ticket.instant_win.value !== 1 ? "s" : "")}<!--]-->`);
              } else {
                _push(`<!--[-->${ssrInterpolate(ticket.instant_win.prize)}<!--]-->`);
              }
              _push(`</div><div class="prize-card-value" style="${ssrRenderStyle({ "color": "#00ff88" })}" data-v-8f3e02dd>`);
              if (ticket.instant_win.prize_type === "ticket_bundle") {
                _push(`<!--[-->${ssrInterpolate(Math.floor(ticket.instant_win.value))} Free Ticket${ssrInterpolate(ticket.instant_win.value !== 1 ? "s" : "")}<!--]-->`);
              } else {
                _push(`<!--[-->£${ssrInterpolate(ticket.instant_win.value)}<!--]-->`);
              }
              _push(`</div><!--]-->`);
            } else {
              _push(`<!--[--><div class="prize-card-placeholder" data-v-8f3e02dd>X</div><div class="prize-card-name" style="${ssrRenderStyle({ "opacity": "0.5" })}" data-v-8f3e02dd>No Win</div><!--]-->`);
            }
            _push(`<div class="ticket-number" data-v-8f3e02dd>Ticket #${ssrInterpolate(ticket.number)}</div></div>`);
          });
          _push(`<!--]--></div>`);
        } else {
          _push(`<!---->`);
        }
        if (__props.tickets && __props.tickets.length > PRIZE_CARD_DISPLAY_LIMIT && !showAllPrizeCards.value) {
          _push(`<button class="reveal-all-claim-btn" style="${ssrRenderStyle({ color: __props.coinDropAssets.winBucketColor, borderColor: __props.coinDropAssets.winBucketColor })}" data-v-8f3e02dd> Show all ${ssrInterpolate(__props.tickets.length)} tickets </button>`);
        } else {
          _push(`<!---->`);
        }
        if (!__props.tickets || __props.tickets.length === 0) {
          _push(`<div class="no-tickets-message" data-v-8f3e02dd><p data-v-8f3e02dd>No tickets available</p></div>`);
        } else {
          _push(`<!---->`);
        }
        _push(`</div></div>`);
      } else {
        _push(`<!---->`);
      }
      if (__props.coinDropAssets.dropSound) {
        _push(`<audio${ssrRenderAttr("src", __props.coinDropAssets.dropSound)} preload="auto" data-v-8f3e02dd></audio>`);
      } else {
        _push(`<!---->`);
      }
      if (__props.coinDropAssets.winSound) {
        _push(`<audio${ssrRenderAttr("src", __props.coinDropAssets.winSound)} preload="auto" data-v-8f3e02dd></audio>`);
      } else {
        _push(`<!---->`);
      }
      if (__props.coinDropAssets.lossSound) {
        _push(`<audio${ssrRenderAttr("src", __props.coinDropAssets.lossSound)} preload="auto" data-v-8f3e02dd></audio>`);
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
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("resources/js/Components/Games/CoinDropGame.vue");
  return _sfc_setup$1 ? _sfc_setup$1(props, ctx) : void 0;
};
const CoinDropGame = /* @__PURE__ */ _export_sfc(_sfc_main$1, [["__scopeId", "data-v-8f3e02dd"]]);
const _sfc_main = /* @__PURE__ */ defineComponent({
  __name: "CoinDropModal",
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
    const showCoinDropGame = ref(true);
    const showGameBoard = ref(false);
    const showLobby = ref(false);
    const showHowToPlay = ref(false);
    const showIntroVideo = ref(false);
    const hasIntroVideo = computed(() => {
      if (!props.assets.background) return false;
      const videoExtensions = [".mp4", ".webm", ".ogg", ".mov"];
      const isVideo = videoExtensions.some((ext) => props.assets.background.toLowerCase().endsWith(ext));
      return isVideo;
    });
    const coinDropAssets = reactive({
      titleText: props.assets.titleText || "COIN DROP!",
      titleColor: props.assets.titleColor || "#FFD700",
      titleImage: props.assets.titleImage || "",
      dropButtonImage: props.assets.dropButtonImage || "",
      background: "",
      header: props.assets.header || "",
      primaryColor: props.assets.primaryColor || "#e94560",
      secondaryColor: props.assets.secondaryColor || "#1a1a2e",
      accentColor: props.assets.accentColor || "#ffd700",
      textColor: props.assets.textColor || "#FFFFFF",
      welcomeSound: props.assets.welcomeSound || "",
      dropSound: props.assets.dropSound || "",
      winSound: props.assets.winSound || "",
      lossSound: props.assets.lossSound || "",
      boardBgColor: props.assets.boardBgColor || "#1a1a2e",
      pegColor: props.assets.pegColor || "#ffffff",
      pegGlowColor: props.assets.pegGlowColor || "#e94560",
      ballColor: props.assets.ballColor || "#ffd700",
      ballGlowColor: props.assets.ballGlowColor || "#ffaa00",
      ballImage: props.assets.ballImage || "",
      winBucketColor: props.assets.winBucketColor || "#00ff88",
      loseBucketColor: props.assets.loseBucketColor || "#ff4444",
      winBucketImage: props.assets.winBucketImage || "",
      loseBucketImage: props.assets.loseBucketImage || "",
      tubeImage: props.assets.tubeImage || "",
      trailColor: props.assets.trailColor || "#e94560",
      gameBackground: props.assets.gameBackground || "",
      pegShape: props.assets.pegShape || "hexagon",
      machineImage: props.assets.machineImage || "",
      footerImage: props.assets.footerImage || ""
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
    watch(
      () => props.assets.titleText,
      (newVal) => {
        coinDropAssets.titleText = newVal || "COIN DROP!";
      },
      { immediate: true }
    );
    watch(
      () => props.assets.titleColor,
      (newVal) => {
        coinDropAssets.titleColor = newVal || "#FFD700";
      },
      { immediate: true }
    );
    watch(
      () => props.assets.background,
      (newVal) => {
        coinDropAssets.background = newVal || "";
      },
      { immediate: true }
    );
    watch(
      () => props.assets.header,
      (newVal) => {
        coinDropAssets.header = newVal || "";
      },
      { immediate: true }
    );
    watch(
      () => props.assets.primaryColor,
      (newVal) => {
        coinDropAssets.primaryColor = newVal || "#e94560";
      },
      { immediate: true }
    );
    watch(
      () => props.assets.secondaryColor,
      (newVal) => {
        coinDropAssets.secondaryColor = newVal || "#1a1a2e";
      },
      { immediate: true }
    );
    watch(
      () => props.assets.accentColor,
      (newVal) => {
        coinDropAssets.accentColor = newVal || "#ffd700";
      },
      { immediate: true }
    );
    watch(
      () => props.assets.textColor,
      (newVal) => {
        coinDropAssets.textColor = newVal || "#FFFFFF";
      },
      { immediate: true }
    );
    watch(
      () => props.assets.titleImage,
      (newVal) => {
        coinDropAssets.titleImage = newVal || "";
      },
      { immediate: true }
    );
    watch(
      () => props.assets.dropButtonImage,
      (newVal) => {
        coinDropAssets.dropButtonImage = newVal || "";
      },
      { immediate: true }
    );
    watch(
      () => props.assets.welcomeSound,
      (newVal) => {
        coinDropAssets.welcomeSound = newVal || "";
      },
      { immediate: true }
    );
    watch(
      () => props.assets.dropSound,
      (newVal) => {
        coinDropAssets.dropSound = newVal || "";
      },
      { immediate: true }
    );
    watch(
      () => props.assets.winSound,
      (newVal) => {
        coinDropAssets.winSound = newVal || "";
      },
      { immediate: true }
    );
    watch(
      () => props.assets.lossSound,
      (newVal) => {
        coinDropAssets.lossSound = newVal || "";
      },
      { immediate: true }
    );
    watch(
      () => props.assets.boardBgColor,
      (newVal) => {
        coinDropAssets.boardBgColor = newVal || "#1a1a2e";
      },
      { immediate: true }
    );
    watch(
      () => props.assets.pegColor,
      (newVal) => {
        coinDropAssets.pegColor = newVal || "#ffffff";
      },
      { immediate: true }
    );
    watch(
      () => props.assets.pegGlowColor,
      (newVal) => {
        coinDropAssets.pegGlowColor = newVal || "#e94560";
      },
      { immediate: true }
    );
    watch(
      () => props.assets.ballColor,
      (newVal) => {
        coinDropAssets.ballColor = newVal || "#ffd700";
      },
      { immediate: true }
    );
    watch(
      () => props.assets.ballGlowColor,
      (newVal) => {
        coinDropAssets.ballGlowColor = newVal || "#ffaa00";
      },
      { immediate: true }
    );
    watch(
      () => props.assets.ballImage,
      (newVal) => {
        coinDropAssets.ballImage = newVal || "";
      },
      { immediate: true }
    );
    watch(
      () => props.assets.winBucketColor,
      (newVal) => {
        coinDropAssets.winBucketColor = newVal || "#00ff88";
      },
      { immediate: true }
    );
    watch(
      () => props.assets.loseBucketColor,
      (newVal) => {
        coinDropAssets.loseBucketColor = newVal || "#ff4444";
      },
      { immediate: true }
    );
    watch(
      () => props.assets.winBucketImage,
      (newVal) => {
        coinDropAssets.winBucketImage = newVal || "";
      },
      { immediate: true }
    );
    watch(
      () => props.assets.loseBucketImage,
      (newVal) => {
        coinDropAssets.loseBucketImage = newVal || "";
      },
      { immediate: true }
    );
    watch(
      () => props.assets.tubeImage,
      (newVal) => {
        coinDropAssets.tubeImage = newVal || "";
      },
      { immediate: true }
    );
    watch(
      () => props.assets.trailColor,
      (newVal) => {
        coinDropAssets.trailColor = newVal || "#e94560";
      },
      { immediate: true }
    );
    watch(
      () => props.assets.gameBackground,
      (newVal) => {
        coinDropAssets.gameBackground = newVal || "";
      },
      { immediate: true }
    );
    watch(
      () => props.assets.pegShape,
      (newVal) => {
        coinDropAssets.pegShape = newVal || "hexagon";
      },
      { immediate: true }
    );
    watch(
      () => props.assets.machineImage,
      (newVal) => {
        coinDropAssets.machineImage = newVal || "";
      },
      { immediate: true }
    );
    watch(
      () => props.assets.footerImage,
      (newVal) => {
        coinDropAssets.footerImage = newVal || "";
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
          showCoinDropGame.value = true;
          showGameBoard.value = false;
          showLobby.value = false;
          showHowToPlay.value = false;
          if (hasIntroVideo.value) {
            showIntroVideo.value = true;
            const introDuration = props.demoMode ? 3e3 : 5e3;
            setTimeout(() => {
              if (showIntroVideo.value) {
                if (introVideoRef.value) {
                  introVideoRef.value.pause();
                }
                showIntroVideo.value = false;
                showLobby.value = true;
              }
            }, introDuration);
          } else {
            showIntroVideo.value = false;
            showLobby.value = true;
          }
          if (coinDropAssets.welcomeSound && !props.demoMode) {
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
          showCoinDropGame.value = true;
          showGameBoard.value = false;
          showLobby.value = false;
          showHowToPlay.value = false;
          showIntroVideo.value = false;
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
    const onTicketPlayed = (ticketId) => {
      if (!playedTickets.value.includes(ticketId)) {
        playedTickets.value.push(ticketId);
      }
    };
    onMounted(() => {
      window.addEventListener("keydown", onEsc);
      if (props.modelValue && !showIntroVideo.value && !showLobby.value && !showGameBoard.value) {
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
          })}" data-v-ee50c360>`);
          if (__props.demoMode) {
            _push2(`<div class="mb-4 flex items-center justify-center" data-v-ee50c360><div class="flex items-center space-x-3 bg-gray-800 rounded-lg p-2" data-v-ee50c360><span class="text-white text-sm font-medium" data-v-ee50c360>Preview Mode:</span><button class="${ssrRenderClass([
              "px-3 py-1 rounded text-sm font-medium transition-colors",
              actualPreviewMode.value === "mobile" ? "bg-blue-500 text-white" : "bg-gray-600 text-gray-300 hover:bg-gray-500"
            ])}" data-v-ee50c360> Mobile </button><button class="${ssrRenderClass([
              "px-3 py-1 rounded text-sm font-medium transition-colors",
              actualPreviewMode.value === "desktop" ? "bg-blue-500 text-white" : "bg-gray-600 text-gray-300 hover:bg-gray-500"
            ])}" data-v-ee50c360> Desktop </button></div></div>`);
          } else {
            _push2(`<!---->`);
          }
          _push2(`<div class="${ssrRenderClass([containerClasses.value, { "demo-mode": __props.demoMode }, "modal-zoom-in", "unified-bg"])}" style="${ssrRenderStyle(modalStyle.value)}" data-v-ee50c360>`);
          if (__props.demoMode) {
            _push2(`<!--[-->`);
            if (actualPreviewMode.value === "mobile") {
              _push2(`<div class="h-8 bg-black flex items-center justify-between px-4 text-white text-sm" data-v-ee50c360><span data-v-ee50c360>9:41</span><div class="flex space-x-1" data-v-ee50c360><div class="w-4 h-2 border border-white rounded-sm" data-v-ee50c360></div><div class="w-1 h-2 bg-white rounded-sm" data-v-ee50c360></div></div></div>`);
            } else {
              _push2(`<!---->`);
            }
            if (actualPreviewMode.value === "desktop") {
              _push2(`<div class="h-10 bg-gray-700 flex items-center justify-between px-4 text-white text-sm border-b border-gray-600" data-v-ee50c360><div class="flex items-center space-x-2" data-v-ee50c360><div class="flex space-x-1" data-v-ee50c360><div class="w-3 h-3 bg-red-500 rounded-full" data-v-ee50c360></div><div class="w-3 h-3 bg-yellow-500 rounded-full" data-v-ee50c360></div><div class="w-3 h-3 bg-green-500 rounded-full" data-v-ee50c360></div></div><span class="ml-4 text-gray-300" data-v-ee50c360>Coin Drop - Drop to Win!</span></div><div class="text-gray-400 text-xs" data-v-ee50c360>Chrome</div></div>`);
            } else {
              _push2(`<!---->`);
            }
            _push2(`<!--]-->`);
          } else {
            _push2(`<!---->`);
          }
          if (!__props.demoMode) {
            _push2(`<button class="absolute top-4 right-4 text-gray-700 bg-white/90 hover:bg-white rounded-full w-10 h-10 flex items-center justify-center focus:outline-none text-2xl z-50 shadow-lg transition-all duration-200 hover:scale-110" aria-label="Close modal" data-v-ee50c360> X </button>`);
          } else {
            _push2(`<!---->`);
          }
          if (showIntroVideo.value) {
            _push2(`<div class="video-background" style="${ssrRenderStyle({ zIndex: 0 })}" data-v-ee50c360><video class="intro-video" playsinline autoplay muted preload="auto"${ssrRenderAttr("src", props.assets.background)} data-v-ee50c360></video></div>`);
          } else {
            _push2(`<!---->`);
          }
          if (showIntroVideo.value) {
            _push2(`<div class="intro-title-floating" style="${ssrRenderStyle({ zIndex: 3 })}" data-v-ee50c360>`);
            if (coinDropAssets.titleImage) {
              _push2(`<img${ssrRenderAttr("src", coinDropAssets.titleImage)} alt="Game Title" class="intro-title-image" data-v-ee50c360>`);
            } else {
              _push2(`<h1 class="intro-title-text" style="${ssrRenderStyle({ color: coinDropAssets.titleColor })}" data-v-ee50c360>${ssrInterpolate(coinDropAssets.titleText || "COIN DROP")}</h1>`);
            }
            _push2(`<p class="intro-title-subtitle" style="${ssrRenderStyle({ color: coinDropAssets.accentColor })}" data-v-ee50c360> Drop the coin to win! </p></div>`);
          } else {
            _push2(`<!---->`);
          }
          if (showIntroVideo.value) {
            _push2(`<button class="skip-intro-btn" data-v-ee50c360> Skip Intro → </button>`);
          } else {
            _push2(`<!---->`);
          }
          if (showLobby.value) {
            _push2(`<div class="lobby-screen" style="${ssrRenderStyle({
              "--lobby-primary": coinDropAssets.primaryColor || "#e94560",
              "--lobby-secondary": coinDropAssets.secondaryColor || "#1a1a2e"
            })}" data-v-ee50c360><div class="lobby-content" data-v-ee50c360><div class="lobby-title-area" data-v-ee50c360>`);
            if (coinDropAssets.titleImage) {
              _push2(`<img${ssrRenderAttr("src", coinDropAssets.titleImage)} alt="Game Title" class="lobby-title-image" data-v-ee50c360>`);
            } else {
              _push2(`<h1 class="lobby-title" style="${ssrRenderStyle({ color: coinDropAssets.titleColor })}" data-v-ee50c360>${ssrInterpolate(coinDropAssets.titleText || "COIN DROP")}</h1>`);
            }
            _push2(`<p class="lobby-subtitle" style="${ssrRenderStyle({ color: coinDropAssets.accentColor })}" data-v-ee50c360> Drop coins to win prizes! </p></div><div class="lobby-buttons" data-v-ee50c360><button class="lobby-btn lobby-btn-secondary" style="${ssrRenderStyle({
              "--btn-color": coinDropAssets.secondaryColor,
              "--btn-border": coinDropAssets.accentColor
            })}" data-v-ee50c360><svg class="btn-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" data-v-ee50c360><circle cx="12" cy="12" r="10" data-v-ee50c360></circle><path d="M9.09 9a3 3 0 0 1 5.83 1c0 2-3 3-3 3" data-v-ee50c360></path><line x1="12" y1="17" x2="12.01" y2="17" data-v-ee50c360></line></svg> How to Play </button><button class="lobby-btn lobby-btn-primary" style="${ssrRenderStyle({
              "--btn-color": coinDropAssets.primaryColor,
              "--btn-glow": coinDropAssets.accentColor
            })}" data-v-ee50c360><svg class="btn-icon" viewBox="0 0 24 24" fill="currentColor" data-v-ee50c360><polygon points="5 3 19 12 5 21 5 3" data-v-ee50c360></polygon></svg> Play ${ssrInterpolate(__props.assets.name || "Coin Drop")}</button></div>`);
            if (__props.tickets && __props.tickets.length > 0) {
              _push2(`<div class="lobby-ticket-info" data-v-ee50c360><span class="ticket-icon" data-v-ee50c360>🎟️</span><span data-v-ee50c360>You have <strong style="${ssrRenderStyle({ color: coinDropAssets.accentColor })}" data-v-ee50c360>${ssrInterpolate(__props.tickets.length)}</strong> ${ssrInterpolate(__props.tickets.length === 1 ? "drop" : "drops")} available!</span></div>`);
            } else {
              _push2(`<!---->`);
            }
            _push2(`</div>`);
            if (showHowToPlay.value) {
              _push2(`<div class="how-to-play-overlay" style="${ssrRenderStyle({
                "--htp-primary": coinDropAssets.primaryColor || "#e94560",
                "--htp-secondary": coinDropAssets.secondaryColor || "#1a1a2e"
              })}" data-v-ee50c360><div class="how-to-play-modal" data-v-ee50c360><button class="how-to-play-close" data-v-ee50c360>✕</button><h2 class="how-to-play-title" style="${ssrRenderStyle({ color: coinDropAssets.accentColor })}" data-v-ee50c360> How to Play </h2><div class="how-to-play-steps" data-v-ee50c360><div class="step" data-v-ee50c360><div class="step-number" style="${ssrRenderStyle({ background: coinDropAssets.primaryColor })}" data-v-ee50c360>1</div><div class="step-content" data-v-ee50c360><h3 data-v-ee50c360>Drop Your Coin</h3><p data-v-ee50c360>Tap the <strong data-v-ee50c360>DROP</strong> button to release a coin from the top of the board.</p></div></div><div class="step" data-v-ee50c360><div class="step-number" style="${ssrRenderStyle({ background: coinDropAssets.primaryColor })}" data-v-ee50c360>2</div><div class="step-content" data-v-ee50c360><h3 data-v-ee50c360>Watch it Bounce</h3><p data-v-ee50c360>The coin bounces off pegs as it falls down the board.</p></div></div><div class="step" data-v-ee50c360><div class="step-number" style="${ssrRenderStyle({ background: coinDropAssets.primaryColor })}" data-v-ee50c360>3</div><div class="step-content" data-v-ee50c360><h3 data-v-ee50c360>Land in a Bucket</h3><p data-v-ee50c360>If your coin lands in a <strong style="${ssrRenderStyle({ color: coinDropAssets.winBucketColor })}" data-v-ee50c360>WIN</strong> bucket, you win a prize!</p></div></div></div><div class="how-to-play-tip" data-v-ee50c360><span class="tip-icon" data-v-ee50c360>💡</span><span data-v-ee50c360>Each ticket gives you one drop. Good luck!</span></div><button class="how-to-play-got-it" style="${ssrRenderStyle({ background: coinDropAssets.primaryColor })}" data-v-ee50c360> Got it! </button></div></div>`);
            } else {
              _push2(`<!---->`);
            }
            _push2(`</div>`);
          } else {
            _push2(`<!---->`);
          }
          if (showCoinDropGame.value && showGameBoard.value) {
            _push2(`<div class="${ssrRenderClass(["flex flex-col relative coin-drop-game-wrapper overflow-hidden", __props.demoMode ? "flex-1" : "h-full"])}" style="${ssrRenderStyle({
              zIndex: 1,
              "--game-bg": coinDropAssets.boardBgColor || "#1a1a2e",
              "--game-primary": coinDropAssets.primaryColor || "#e94560",
              "--game-accent": coinDropAssets.accentColor || "#ffd700"
            })}" data-v-ee50c360>`);
            if (__props.demoMode) {
              _push2(`<button class="demo-back-btn" data-v-ee50c360> ← Back to Lobby </button>`);
            } else {
              _push2(`<!---->`);
            }
            _push2(ssrRenderComponent(CoinDropGame, {
              coinDropAssets,
              demoMode: __props.demoMode,
              previewMode: actualPreviewMode.value,
              tickets: __props.tickets,
              playedTickets: playedTickets.value,
              instant_win_categories: __props.instant_win_categories,
              animateTitle: hasIntroVideo.value,
              showGameBoard: showGameBoard.value,
              onTicketPlayed,
              onPrizeWon
            }, null, _parent));
            _push2(`</div>`);
          } else {
            _push2(`<!---->`);
          }
          _push2(`</div>`);
          if (__props.demoMode) {
            _push2(`<div class="mt-2 text-center text-gray-400 text-xs" data-v-ee50c360>${ssrInterpolate(actualPreviewMode.value === "mobile" ? "Mobile Preview (420x750)" : "Desktop Preview (700x750)")}</div>`);
          } else {
            _push2(`<!---->`);
          }
          if (coinDropAssets.welcomeSound) {
            _push2(`<audio${ssrRenderAttr("src", coinDropAssets.welcomeSound)} preload="auto" data-v-ee50c360></audio>`);
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
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("resources/js/Components/Games/CoinDropModal.vue");
  return _sfc_setup ? _sfc_setup(props, ctx) : void 0;
};
const CoinDropModal = /* @__PURE__ */ _export_sfc(_sfc_main, [["__scopeId", "data-v-ee50c360"]]);
export {
  CoinDropModal as default
};
