<script setup lang="ts">
import { ref, computed, onMounted, onUnmounted, watch, nextTick } from 'vue';

import CoinDropInventoryModal from './CoinDropInventoryModal.vue';

interface InstantWin {
    id: number;
    name: string;
    prize: string;
    value: number;
    claimed: boolean;
    image_path: string | null;
    won_date: string | null;
    category_id: number;
}

interface Ticket {
    id: number;
    number: string;
    competition_id: number;
    instant_win: InstantWin | false;
}

interface CoinDropAssets {
    titleText: string;
    titleColor: string;
    titleImage?: string;
    dropButtonImage?: string;
    background: string;
    header: string;
    primaryColor?: string;
    secondaryColor?: string;
    accentColor?: string;
    textColor?: string;
    welcomeSound?: string;
    dropSound?: string;
    winSound?: string;
    lossSound?: string;
    boardBgColor?: string;
    pegColor?: string;
    pegGlowColor?: string;
    ballColor?: string;
    ballGlowColor?: string;
    ballImage?: string;
    winBucketColor?: string;
    loseBucketColor?: string;
    winBucketImage?: string;
    loseBucketImage?: string;
    tubeImage?: string;
    trailColor?: string;
    gameBackground?: string;
    pegShape?: string;
    machineImage?: string;
    footerImage?: string;
}

interface Prize {
    id: number;
    name: string;
    image: string;
    value: number;
    ticketNumber?: string;
}

interface InstantWinCategory {
    id: number;
    name: string;
    image_path: string;
    value: number;
}

interface Peg {
    x: number;
    y: number;
    radius: number;
    hit: boolean;
    hitTime: number;
}

interface Ball {
    x: number;
    y: number;
    vx: number;
    vy: number;
    radius: number;
    isWinner: boolean;
    ticketId: number;
    trail: { x: number; y: number }[];
    prize?: Prize | null;
    rotation: number;
    targetBucketIndex: number; // Target bucket for guidance
    loggedThresholds?: Set<number>; // Track which progress thresholds we've logged
    lastY?: number; // Track last Y position for stuck detection
    stuckFrames?: number; // Count frames where ball hasn't made downward progress
    maxYReached?: number; // Furthest Y position reached (for stuck detection)
}

interface Bucket {
    x: number;
    y: number;
    width: number;
    height: number;
    isWin: boolean;
    label: string;
    color: string;
    bounceOffset: number;
    bounceTime: number;
}

interface Particle {
    x: number;
    y: number;
    vx: number;
    vy: number;
    radius: number;
    color: string;
    life: number;
}

const props = defineProps<{
    demoMode?: boolean;
    previewMode?: 'mobile' | 'desktop';
    coinDropAssets: CoinDropAssets;
    tickets?: Ticket[];
    playedTickets?: number[];
    instant_win_categories?: InstantWinCategory[];
    animateTitle?: boolean;
    showGameBoard?: boolean;
}>();

const emit = defineEmits<{
    'ticket-played': [ticketId: number];
    'prize-won': [prize: Prize];
}>();

// Canvas refs
const canvasRef = ref<HTMLCanvasElement | null>(null);
const containerRef = ref<HTMLDivElement | null>(null);

// Game state
const isDropping = ref(false);
const winCounter = ref(0);
const showWinReveal = ref(false);
const currentWinningPrize = ref<Prize | null>(null);
const lastWin = ref(0);
const gameInitialized = ref(false);
const hasClickedDrop = ref(false); // Track if user has clicked drop button

// Audio refs
const dropSound = ref<HTMLAudioElement | null>(null);
const winSound = ref<HTMLAudioElement | null>(null);
const lossSound = ref<HTMLAudioElement | null>(null);

// Ball image ref
const ballImageLoaded = ref<HTMLImageElement | null>(null);

// Bucket image refs
const winBucketImageLoaded = ref<HTMLImageElement | null>(null);
const loseBucketImageLoaded = ref<HTMLImageElement | null>(null);

// Tube image ref
const tubeImageLoaded = ref<HTMLImageElement | null>(null);

// Game objects
let pegs: Peg[] = [];
let balls: Ball[] = [];
let buckets: Bucket[] = [];
let particles: Particle[] = [];
let animationFrameId: number | null = null;
let ctx: CanvasRenderingContext2D | null = null;

// Physics constants - SLOW & SMOOTH Plinko
const GRAVITY = 0.15;       // Slower gravity for leisurely drop
const FRICTION = 0.995;     // Very low friction = smooth gliding
const BOUNCE = 0.45;        // Softer bounce
const PEG_RADIUS = 4.5;     // Bigger pegs for visibility
const BALL_RADIUS = 6;      // Bigger ball to match
const MIN_BOUNCE_VELOCITY = 0.8; // Gentler minimum bounce
const TERMINAL_VELOCITY = 5; // Slower max speed

// Canvas dimensions (will be set dynamically)
let canvasWidth = 420;
let canvasHeight = 620;

const dropsLeft = computed(() => {
    if (props.demoMode) {
        return 10;
    }
    if (!props.tickets) {
        return 0;
    }
    return props.tickets.length - (props.playedTickets?.length || 0);
});

// Allow multiple drops - just check if we have drops left (no cooldown)
const canDrop = computed(() => dropsLeft.value > 0);

const isMobile = computed(() => props.previewMode === 'mobile');

// Top prize computed from instant win categories
const topPrize = computed(() => {
    if (!props.instant_win_categories || props.instant_win_categories.length === 0) {
        return null;
    }
    // Find the category with the highest value
    return props.instant_win_categories.reduce((max, cat) =>
        (cat.value > (max?.value || 0)) ? cat : max, props.instant_win_categories[0]);
});

const showInventory = ref(false);

// Show prizes modal
const showPrizesModal = ref(false);

// Show reveal wins modal (shows what instant wins are available on tickets)
const showRevealWinsModal = ref(false);

// Initialize pegs - responsive to screen size
function initPegs() {
    pegs = [];
    // Check for very small screens (iPhone SE = 375px width only, canvas ~360px)
    const isSmallMobile = isMobile.value && canvasWidth <= 365;

    const startY = isSmallMobile ? 50 : 70; // Push pegs lower on canvas
    const rows = isSmallMobile ? 8 : (isMobile.value ? 10 : 14); // 8 rows for iPhone SE, 10 for other mobile
    const spacing = isSmallMobile ? 24 : (isMobile.value ? 28 : 32); // Horizontal spacing
    const rowSpacing = isSmallMobile ? 32 : (isMobile.value ? 40 : 42); // More vertical spacing between rows

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

// Initialize buckets - 2 WIN buckets on edges, 5 LOSE buckets in middle
// Pattern: WIN, LOSE, LOSE, LOSE, LOSE, LOSE, WIN (7 total)
// WIN indices: 0, 6 (left and right edges)
// LOSE indices: 1, 2, 3, 4, 5 (middle)
function initBuckets() {
    buckets = [];
    const numBuckets = 7;
    const bucketWidth = canvasWidth / numBuckets;
    const bucketHeight = isMobile.value ? 40 : 45; // Smaller buckets
    const bucketY = canvasHeight - bucketHeight - 5; // Slight padding from bottom

    for (let i = 0; i < numBuckets; i++) {
        // WIN buckets only at edges (0 and 6)
        const isWin = i === 0 || i === 6;
        buckets.push({
            x: i * bucketWidth,
            y: bucketY,
            width: bucketWidth,
            height: bucketHeight,
            isWin,
            label: isWin ? 'WIN' : '',
            color: isWin
                ? (props.coinDropAssets.winBucketColor || '#00ff88')
                : (props.coinDropAssets.loseBucketColor || '#ff4444'),
            bounceOffset: 0,
            bounceTime: 0
        });
    }
}

// Get the next ticket to play
function getNextTicket(): Ticket | null {
    if (props.demoMode) {
        return null;
    }
    const playedIds = props.playedTickets || [];
    const unplayedTickets = props.tickets?.filter((ticket) => !playedIds.includes(ticket.id)) || [];
    return unplayedTickets.length > 0 ? unplayedTickets[0] : null;
}

// Create a new ball
function createBall() {
    if (!canDrop.value) return;

    const currentTicket = getNextTicket();
    let isWinner = false;
    let prize: Prize | null = null;

    if (props.demoMode) {
        isWinner = Math.random() > 0.5;
    } else if (currentTicket) {
        const instantWinData = currentTicket.instant_win;
        const hasInstantWin = instantWinData !== false && instantWinData !== null;
        const prizeText = hasInstantWin ? (instantWinData as InstantWin).prize : null;
        isWinner = hasInstantWin && prizeText !== 'NO WIN';

        if (isWinner && hasInstantWin) {
            const instantWin = instantWinData as InstantWin;
            prize = {
                id: instantWin.category_id || instantWin.id,
                name: instantWin.prize || 'Winner!',
                image: instantWin.image_path || '',
                value: parseFloat(String(instantWin.value)) || 0,
            };
        }

        emit('ticket-played', currentTicket.id);
    }

    if (dropSound.value) {
        dropSound.value.currentTime = 0;
        dropSound.value.play().catch(() => {});
    }

    // Select target bucket based on win/lose status
    // WIN buckets: indices 0, 6 (edges - green) - 7 buckets total
    // LOSE buckets: indices 1-5 (middle - red)
    const targetBucketIndex = isWinner
        ? [0, 6][Math.floor(Math.random() * 2)]            // WIN buckets (green edges)
        : [1, 2, 3, 4, 5][Math.floor(Math.random() * 5)];  // LOSE buckets (red middle)

    const targetBucket = buckets[targetBucketIndex];

    // All balls start from center with small random offset
    const centerX = canvasWidth / 2;
    const startX = centerX + (Math.random() - 0.5) * 15;

    // Initial velocity: winners get a stronger push toward their target edge
    let initialVx: number;
    if (isWinner) {
        // Stronger push toward target edge - needs to overcome peg chaos
        initialVx = targetBucketIndex === 0 ? -2.0 : 2.0;
        // Add tiny randomness so it doesn't look identical each time
        initialVx += (Math.random() - 0.5) * 0.4;
    } else {
        // Losers: tiny random initial velocity
        initialVx = (Math.random() - 0.5) * 0.5;
    }

    balls.push({
        x: startX,
        y: 25,
        vx: initialVx, // Start with horizontal velocity towards target
        vy: 2.5, // Slower initial drop speed
        radius: BALL_RADIUS,
        isWinner,
        ticketId: currentTicket?.id || 0,
        trail: [],
        prize,
        rotation: 0,
        targetBucketIndex // Store for continuous guidance
    });
}

// Create particles
function createParticles(x: number, y: number, color: string, count = 10) {
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

// Web Audio API for sound effects
let audioCtx: AudioContext | null = null;

function initAudio() {
    if (!audioCtx) {
        audioCtx = new (window.AudioContext || (window as any).webkitAudioContext)();
    }
}

// Throttle peg sounds to avoid audio overload with many balls
let lastPegSoundTime = 0;
const PEG_SOUND_COOLDOWN = 100; // ms between peg sounds (higher = less noise with many balls)

function playPegSound() {
    const now = performance.now();
    if (now - lastPegSoundTime < PEG_SOUND_COOLDOWN) return; // Skip if too soon
    lastPegSoundTime = now;

    initAudio();
    if (!audioCtx) return;

    const osc = audioCtx.createOscillator();
    const gain = audioCtx.createGain();
    osc.connect(gain);
    gain.connect(audioCtx.destination);
    osc.frequency.value = 800 + Math.random() * 400;
    osc.type = 'sine';
    gain.gain.setValueAtTime(0.05, audioCtx.currentTime); // Quieter
    gain.gain.exponentialRampToValueAtTime(0.01, audioCtx.currentTime + 0.03);
    osc.start();
    osc.stop(audioCtx.currentTime + 0.03);
}

function playWinSound() {
    if (winSound.value && props.coinDropAssets.winSound) {
        winSound.value.currentTime = 0;
        winSound.value.play().catch(() => {});
    } else {
        initAudio();
        if (!audioCtx) return;
        const notes = [523, 659, 784, 1047];
        notes.forEach((freq, i) => {
            setTimeout(() => {
                const osc = audioCtx!.createOscillator();
                const gain = audioCtx!.createGain();
                osc.connect(gain);
                gain.connect(audioCtx!.destination);
                osc.frequency.value = freq;
                osc.type = 'sine';
                gain.gain.setValueAtTime(0.3, audioCtx!.currentTime);
                gain.gain.exponentialRampToValueAtTime(0.01, audioCtx!.currentTime + 0.3);
                osc.start();
                osc.stop(audioCtx!.currentTime + 0.3);
            }, i * 100);
        });
    }
}

function playLossSound() {
    if (lossSound.value && props.coinDropAssets.lossSound) {
        lossSound.value.currentTime = 0;
        lossSound.value.play().catch(() => {});
    }
}

// Helper to shade color
function shadeColor(color: string, percent: number): string {
    const num = parseInt(color.replace('#', ''), 16);
    const amt = Math.round(2.55 * percent);
    const R = Math.max(0, Math.min(255, (num >> 16) + amt));
    const G = Math.max(0, Math.min(255, ((num >> 8) & 0x00FF) + amt));
    const B = Math.max(0, Math.min(255, (num & 0x0000FF) + amt));
    return '#' + (0x1000000 + R * 0x10000 + G * 0x100 + B).toString(16).slice(1);
}

function lightenColor(color: string, percent: number): string {
    return shadeColor(color, percent);
}

// Update physics
function update() {
    const now = Date.now();

    for (let i = balls.length - 1; i >= 0; i--) {
        const ball = balls[i];

        ball.trail.push({ x: ball.x, y: ball.y });
        if (ball.trail.length > 30) ball.trail.shift(); // Much longer trail

        ball.vy += GRAVITY;
        ball.vx *= FRICTION;

        // Cap vertical speed at terminal velocity for fast consistent drop
        if (ball.vy > TERMINAL_VELOCITY) ball.vy = TERMINAL_VELOCITY;

        // Robust anti-stuck mechanism: track if ball hasn't progressed downward
        if (ball.lastY === undefined) ball.lastY = ball.y;
        if (ball.stuckFrames === undefined) ball.stuckFrames = 0;
        if (ball.maxYReached === undefined) ball.maxYReached = ball.y;

        // Bucket area Y threshold - balls near buckets need different handling
        const bucketAreaY = canvasHeight - 80;

        // Update max Y reached (furthest down the ball has gone)
        if (ball.y > ball.maxYReached) {
            ball.maxYReached = ball.y;
            ball.stuckFrames = 0; // Reset stuck counter when making progress
        } else {
            // Ball hasn't reached a new low point - might be stuck
            ball.stuckFrames++;

            // Different handling for balls stuck near the bottom vs higher up
            if (ball.y >= bucketAreaY) {
                // Ball is near buckets but stuck (like bouncing between wall and last peg row)
                // Be more aggressive - just push it into a bucket
                if (ball.stuckFrames >= 20) {
                    // Push ball toward center of nearest bucket
                    const bucketWidth = canvasWidth / 7;
                    const currentBucketIndex = Math.floor(ball.x / bucketWidth);
                    const targetBucketCenter = (currentBucketIndex + 0.5) * bucketWidth;
                    ball.vx = (targetBucketCenter - ball.x) * 0.3; // Move toward bucket center
                    ball.vy = 3; // Push down into bucket
                    ball.stuckFrames = 0;
                }
            } else {
                // Ball is higher up - use graduated intervention
                // Mild intervention at 30 frames (~500ms) - gentle nudge
                if (ball.stuckFrames === 30) {
                    ball.vy = Math.max(ball.vy, 2); // Ensure downward momentum
                    ball.vx += (Math.random() - 0.5) * 2; // Small horizontal shake
                }

                // Stronger intervention at 60 frames (~1s) - force it down
                if (ball.stuckFrames === 60) {
                    ball.vy = 4 + Math.random() * 2; // Strong push down
                    ball.vx = (Math.random() - 0.5) * 4; // Random horizontal to escape
                }

                // Emergency at 90 frames (~1.5s) - teleport past the stuck area
                if (ball.stuckFrames >= 90) {
                    ball.y = ball.maxYReached + 30; // Jump down past stuck point
                    ball.vy = TERMINAL_VELOCITY; // Full speed down
                    ball.vx = (Math.random() - 0.5) * 2;
                    ball.stuckFrames = 0;
                    ball.maxYReached = ball.y;
                }
            }
        }
        ball.lastY = ball.y;

        // Natural guidance towards target bucket
        // ULTRA-SUBTLE: barely noticeable bias, like a very slightly tilted table
        const targetBucket = buckets[ball.targetBucketIndex];
        if (targetBucket) {
            const targetX = targetBucket.x + targetBucket.width / 2;
            const dx = targetX - ball.x;
            const progressDown = ball.y / canvasHeight;
            const distanceToTarget = Math.abs(dx);
            const bucketHalfWidth = targetBucket.width / 2;

            // Guidance system for winners to reach edge buckets
            // Key insight: edge buckets are ~150-200px from center, need strong consistent pull
            // Must start early because 15% remaining drop is NOT enough to cover 130+ pixels

            if (ball.isWinner) {
                // Winners MUST reach edge buckets (0 or 6) and land in CENTER
                // These are ~150-200px from center - need consistent strong pull

                // Calculate required velocity to reach target
                const remainingDrop = 1 - progressDown;
                const framesRemaining = remainingDrop * canvasHeight / TERMINAL_VELOCITY;
                const velocityNeeded = framesRemaining > 0 ? distanceToTarget / framesRemaining : 4;

                // Strong constant pull toward edge - always active
                ball.vx += Math.sign(dx) * 0.06;

                // At 30%: if we're very far from target (>100px), start steering early
                if (progressDown > 0.3 && distanceToTarget > 100) {
                    ball.vx += Math.sign(dx) * 0.05;
                }

                // At 45%, if we're still far, increase steering
                if (progressDown > 0.45 && distanceToTarget > 80) {
                    ball.vx += Math.sign(dx) * 0.07;
                }

                // At 60%, if still far, really push
                if (progressDown > 0.6 && distanceToTarget > 60) {
                    ball.vx += Math.sign(dx) * 0.1;
                    const targetVx = Math.sign(dx) * Math.min(3.5, velocityNeeded * 0.9);
                    ball.vx = ball.vx * 0.6 + targetVx * 0.4;
                }

                // At 70%, override velocity if needed - critical intervention
                if (progressDown > 0.7 && distanceToTarget > bucketHalfWidth) {
                    const targetVx = Math.sign(dx) * Math.min(5, velocityNeeded * 1.1);
                    ball.vx = ball.vx * 0.2 + targetVx * 0.8; // Strong blend toward target
                }

                // At 80%, direct velocity control - MUST reach center
                if (progressDown > 0.8 && distanceToTarget > bucketHalfWidth * 0.5) {
                    ball.vx = Math.sign(dx) * Math.min(6, velocityNeeded * 1.2);
                }

                // At 90%, emergency max velocity - absolute must reach
                if (progressDown > 0.9 && distanceToTarget > bucketHalfWidth * 0.3) {
                    ball.vx = Math.sign(dx) * Math.min(8, distanceToTarget * 0.12);
                }
            } else {
                // Losers: guide toward CENTER of target bucket to avoid edge confusion
                // CRITICAL: Must stay away from WIN buckets (0 and 6) at edges!

                const bucket0RightEdge = buckets[0].x + buckets[0].width; // Right edge of left WIN bucket
                const bucket6LeftEdge = buckets[6].x; // Left edge of right WIN bucket
                const distToLeftWin = ball.x - bucket0RightEdge;
                const distToRightWin = bucket6LeftEdge - ball.x;

                // Minimum safe distance from WIN bucket edges
                const winBucketSafeZone = 40; // Stay at least 40px away from WIN buckets

                // Constant pull toward target center
                ball.vx += Math.sign(dx) * 0.025;

                // DANGER ZONE CHECK: If getting too close to WIN buckets, push away hard!
                if (distToLeftWin < winBucketSafeZone && distToLeftWin > -30) {
                    // Too close to left WIN bucket - push RIGHT strongly
                    ball.vx += 0.15;
                }
                if (distToRightWin < winBucketSafeZone && distToRightWin > -30) {
                    // Too close to right WIN bucket - push LEFT strongly
                    ball.vx -= 0.15;
                }

                // At 50%, start guiding toward target center
                if (progressDown > 0.5 && distanceToTarget > bucketHalfWidth * 0.5) {
                    ball.vx += Math.sign(dx) * 0.05;
                }

                // At 65%, stronger correction
                if (progressDown > 0.65 && distanceToTarget > bucketHalfWidth * 0.4) {
                    ball.vx += Math.sign(dx) * 0.07;
                }

                // At 80%, direct velocity nudge toward center
                if (progressDown > 0.8 && distanceToTarget > bucketHalfWidth * 0.3) {
                    const nudge = Math.sign(dx) * Math.min(2.5, distanceToTarget * 0.06);
                    ball.vx = ball.vx * 0.5 + nudge * 0.5;
                }

                // EMERGENCY: At 88%, if heading toward WIN bucket, hard override
                if (progressDown > 0.88) {
                    if (distToLeftWin < winBucketSafeZone * 2) {
                        ball.vx = Math.max(ball.vx, 2.5); // Force right hard
                    }
                    if (distToRightWin < winBucketSafeZone * 2) {
                        ball.vx = Math.min(ball.vx, -2.5); // Force left hard
                    }
                }
            }
        }

        ball.x += ball.vx;
        ball.y += ball.vy;

        // Rotate coin based on horizontal velocity
        ball.rotation += ball.vx * 0.1;

        // Wall collisions - gentler bounce to avoid fighting with guidance
        if (ball.x - ball.radius < 5) {
            ball.x = ball.radius + 6;
            ball.vx = Math.abs(ball.vx) * 0.5 + 1; // Gentle bounce right
        }
        if (ball.x + ball.radius > canvasWidth - 5) {
            ball.x = canvasWidth - ball.radius - 6;
            ball.vx = -Math.abs(ball.vx) * 0.5 - 1; // Gentle bounce left
        }

        for (const peg of pegs) {
            const dx = ball.x - peg.x;
            const dy = ball.y - peg.y;
            const dist = Math.sqrt(dx * dx + dy * dy);
            const minDist = ball.radius + peg.radius + 1;

            if (dist < minDist && dist > 0) {
                const angle = Math.atan2(dy, dx);

                // Smoothly push ball outside peg
                ball.x = peg.x + Math.cos(angle) * (minDist + 0.5);
                ball.y = peg.y + Math.sin(angle) * (minDist + 0.5);

                // Realistic bounce physics - reflect velocity off the peg surface
                const nx = dx / dist; // Normal x
                const ny = dy / dist; // Normal y

                // Dot product of velocity and normal
                const dot = ball.vx * nx + ball.vy * ny;

                // Reflect velocity with bounce dampening
                ball.vx = (ball.vx - 2 * dot * nx) * BOUNCE;
                ball.vy = (ball.vy - 2 * dot * ny) * BOUNCE;

                // Add tiny random kick for natural Plinko chaos
                ball.vx += (Math.random() - 0.5) * 0.8;

                // Ensure minimum downward velocity to keep things moving
                if (ball.vy < MIN_BOUNCE_VELOCITY) {
                    ball.vy = MIN_BOUNCE_VELOCITY;
                }

                peg.hit = true;
                peg.hitTime = now;

                playPegSound();
                createParticles(peg.x, peg.y, props.coinDropAssets.pegGlowColor || '#e94560', 2);
            }
        }

        // Check if ball reached bucket area
        const bucketDetectY = isMobile.value ? canvasHeight - 60 : canvasHeight - 70;
        if (ball.y > bucketDetectY) {
            for (let bucketIdx = 0; bucketIdx < buckets.length; bucketIdx++) {
                const bucket = buckets[bucketIdx];
                if (ball.x > bucket.x && ball.x < bucket.x + bucket.width) {
                    // Win animation is based on ball.isWinner (ticket instant win status)
                    if (ball.isWinner) {
                        winCounter.value++;
                        lastWin.value = ball.prize?.value || 100;
                        currentWinningPrize.value = ball.prize || null;

                        // Show corner toast instead of overlay
                        showWinReveal.value = true;
                        setTimeout(() => {
                            showWinReveal.value = false;
                        }, 2500);

                        if (ball.prize) {
                            emit('prize-won', ball.prize);
                        }

                        playWinSound();
                        createParticles(ball.x, ball.y, props.coinDropAssets.winBucketColor || '#00ff88', 15);
                    } else {
                        lastWin.value = 0;
                        playLossSound();
                        createParticles(ball.x, ball.y, props.coinDropAssets.loseBucketColor || '#ff4444', 10);
                    }

                    // Trigger bucket bounce animation
                    bucket.bounceOffset = -15;
                    bucket.bounceTime = now;

                    balls.splice(i, 1);
                    break;
                }
            }
        }

        // Remove ball if it goes off screen
        if (ball.y > canvasHeight + 50) {
            balls.splice(i, 1);
        }
    }

    for (let i = particles.length - 1; i >= 0; i--) {
        const p = particles[i];
        p.x += p.vx;
        p.y += p.vy;
        p.vy += 0.2;
        p.life -= 0.08; // Faster fade = less buildup

        if (p.life <= 0) {
            particles.splice(i, 1);
        }
    }

    // Cap particles to prevent performance issues
    if (particles.length > 50) {
        particles.splice(0, particles.length - 50);
    }

    for (const peg of pegs) {
        if (peg.hit && now - peg.hitTime > 150) {
            peg.hit = false;
        }
    }

    // Animate bucket bounces
    for (const bucket of buckets) {
        if (bucket.bounceOffset !== 0) {
            const elapsed = now - bucket.bounceTime;
            if (elapsed > 400) {
                bucket.bounceOffset = 0;
            } else {
                // Spring bounce animation (more pronounced)
                bucket.bounceOffset = -20 * Math.cos((elapsed / 400) * Math.PI * 2.5) * Math.exp(-elapsed / 200);
            }
        }
    }
}

// Draw everything - OPTIMIZED for performance
function draw() {
    if (!ctx) return;

    const pegGlowColor = props.coinDropAssets.pegGlowColor || '#e94560';
    const ballColor = props.coinDropAssets.ballColor || '#ffd700';

    // Clear canvas
    ctx.clearRect(0, 0, canvasWidth, canvasHeight);

    // Draw drop tube at center top
    const tubeWidth = tubeImageLoaded.value ? 60 : 40;
    const tubeHeight = tubeImageLoaded.value ? 45 : 30;
    const tubeX = (canvasWidth - tubeWidth) / 2;
    const tubeY = 0;

    if (tubeImageLoaded.value) {
        // Draw custom tube image
        ctx.drawImage(tubeImageLoaded.value, tubeX, tubeY, tubeWidth, tubeHeight);
    } else {
        // Tube body (default)
        ctx.fillStyle = 'rgba(80, 80, 100, 0.8)';
        ctx.beginPath();
        ctx.roundRect(tubeX, tubeY, tubeWidth, tubeHeight, [0, 0, 8, 8]);
        ctx.fill();

        // Tube opening highlight
        ctx.fillStyle = 'rgba(120, 120, 140, 0.6)';
        ctx.fillRect(tubeX + 4, tubeY, tubeWidth - 8, 4);

        // Tube inner shadow
        ctx.fillStyle = 'rgba(0, 0, 0, 0.4)';
        ctx.fillRect(tubeX + 8, tubeHeight - 10, tubeWidth - 16, 10);
    }

    // Draw buckets - with images and bounce animation
    for (const bucket of buckets) {
        const bounceY = bucket.y + bucket.bounceOffset;
        const bucketImg = bucket.isWin ? winBucketImageLoaded.value : loseBucketImageLoaded.value;

        if (bucketImg) {
            // Draw bucket image
            ctx.drawImage(
                bucketImg,
                bucket.x + 2,
                bounceY,
                bucket.width - 4,
                bucket.height
            );
        } else {
            // Fallback to colored rectangle
            ctx.fillStyle = bucket.color;
            ctx.fillRect(bucket.x + 1, bounceY, bucket.width - 2, bucket.height);

            // Bucket rim highlight
            ctx.fillStyle = lightenColor(bucket.color, 40);
            ctx.fillRect(bucket.x + 1, bounceY, bucket.width - 2, 4);

            // WIN bucket label
            if (bucket.isWin) {
                ctx.fillStyle = '#fff';
                ctx.font = 'bold 12px Arial, sans-serif';
                ctx.textAlign = 'center';
                ctx.fillText('WIN', bucket.x + bucket.width / 2, bounceY + 35);
            }
        }

        // Bucket dividers
        ctx.fillStyle = 'rgba(0,0,0,0.6)';
        ctx.fillRect(bucket.x, bounceY, 2, bucket.height);
    }

    // Draw pegs - with customizable shape (hexagon, circle, square)
    const pegBorderColor = props.coinDropAssets.pegColor || '#00ffff';
    const pegCenterColor = '#000000';
    const pegShape = props.coinDropAssets.pegShape || 'hexagon';

    for (const peg of pegs) {
        const size = peg.radius * 1.8;
        const isHit = peg.hit;
        const borderColor = isHit ? pegGlowColor : pegBorderColor;
        const lineWidth = isHit ? 3.5 : 3;

        // Draw glow effect (only when hit for performance)
        if (isHit) {
            ctx.save();
            ctx.shadowColor = pegGlowColor;
            ctx.shadowBlur = 12;
        }

        // Draw filled border color shape first (no gap)
        ctx.beginPath();
        if (pegShape === 'hexagon') {
            for (let i = 0; i < 6; i++) {
                const angle = (Math.PI / 3) * i - Math.PI / 2;
                const x = peg.x + size * Math.cos(angle);
                const y = peg.y + size * Math.sin(angle);
                if (i === 0) ctx.moveTo(x, y);
                else ctx.lineTo(x, y);
            }
            ctx.closePath();
        } else if (pegShape === 'circle') {
            ctx.arc(peg.x, peg.y, size, 0, Math.PI * 2);
        } else { // square
            const halfSize = size * 0.85;
            ctx.rect(peg.x - halfSize, peg.y - halfSize, halfSize * 2, halfSize * 2);
        }
        // Fill with border color first
        ctx.fillStyle = borderColor;
        ctx.fill();
        // Then stroke on top for crisp edge
        ctx.strokeStyle = borderColor;
        ctx.lineWidth = lineWidth;
        ctx.stroke();

        if (isHit) ctx.restore();

        // Draw inner black shape (center) - slightly smaller for visible border
        const innerSize = size * 0.65;
        ctx.beginPath();
        if (pegShape === 'hexagon') {
            for (let i = 0; i < 6; i++) {
                const angle = (Math.PI / 3) * i - Math.PI / 2;
                const x = peg.x + innerSize * Math.cos(angle);
                const y = peg.y + innerSize * Math.sin(angle);
                if (i === 0) ctx.moveTo(x, y);
                else ctx.lineTo(x, y);
            }
            ctx.closePath();
        } else if (pegShape === 'circle') {
            ctx.arc(peg.x, peg.y, innerSize, 0, Math.PI * 2);
        } else { // square
            const halfInner = innerSize * 0.85;
            ctx.rect(peg.x - halfInner, peg.y - halfInner, halfInner * 2, halfInner * 2);
        }
        ctx.fillStyle = pegCenterColor;
        ctx.fill();
    }

    // Draw ball trails - bigger, more visible trail
    const trailColor = props.coinDropAssets.trailColor || props.coinDropAssets.primaryColor || '#e94560';
    for (const ball of balls) {
        for (let i = 0; i < ball.trail.length; i += 2) {
            const t = ball.trail[i];
            const progress = i / ball.trail.length;
            const alpha = progress * 0.7; // More visible
            const radius = progress * ball.radius * 1.2; // Bigger trail circles

            ctx.beginPath();
            ctx.arc(t.x, t.y, radius, 0, Math.PI * 2);
            ctx.fillStyle = `${trailColor}${Math.floor(alpha * 255).toString(16).padStart(2, '0')}`;
            ctx.fill();
        }
    }

    // Draw balls - optimized for performance (no shadows)
    for (const ball of balls) {
        ctx.save();

        // Check if we have a custom ball image
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
            // Simple gold coin - no expensive gradients
            ctx.beginPath();
            ctx.arc(ball.x, ball.y, ball.radius, 0, Math.PI * 2);
            ctx.fillStyle = ballColor;
            ctx.fill();

            // Simple edge
            ctx.strokeStyle = shadeColor(ballColor, -30);
            ctx.lineWidth = 1.5;
            ctx.stroke();

            // Single shine highlight
            ctx.beginPath();
            ctx.arc(ball.x - ball.radius * 0.3, ball.y - ball.radius * 0.3, ball.radius * 0.3, 0, Math.PI * 2);
            ctx.fillStyle = 'rgba(255,255,255,0.6)';
            ctx.fill();
        }

        ctx.restore();
    }

    // Draw particles - simplified (no shadows)
    for (const p of particles) {
        ctx.globalAlpha = p.life;
        ctx.beginPath();
        ctx.arc(p.x, p.y, p.radius, 0, Math.PI * 2);
        ctx.fillStyle = p.color;
        ctx.fill();
    }
    ctx.globalAlpha = 1;
}

// Game loop
function gameLoop() {
    update();
    draw();
    animationFrameId = requestAnimationFrame(gameLoop);
}

// Initialize game
function initGame() {
    if (!canvasRef.value) return;

    ctx = canvasRef.value.getContext('2d');
    if (!ctx) return;

    const container = containerRef.value;
    if (container) {
        // Check for small mobile screens (iPhone SE = 375px only)
        const isSmallMobile = window.innerWidth <= 380;

        // Responsive canvas sizing
        const availableHeight = window.innerHeight * (isSmallMobile ? 0.65 : 0.75);
        canvasWidth = Math.min(container.clientWidth - 10, isSmallMobile ? 360 : (isMobile.value ? 420 : 520));
        canvasHeight = Math.min(availableHeight, isSmallMobile ? 420 : (isMobile.value ? 550 : 700));
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

// Load ball image when asset changes
function loadBallImage(src: string) {
    if (!src) {
        ballImageLoaded.value = null;
        return;
    }
    const img = new Image();
    // Don't set crossOrigin for same-origin images to avoid CORS issues
    img.onload = () => {
        ballImageLoaded.value = img;
    };
    img.onerror = () => {
        ballImageLoaded.value = null;
    };
    img.src = src;
}

// Watch for ball image changes
watch(() => props.coinDropAssets.ballImage, (newVal) => {
    loadBallImage(newVal || '');
}, { immediate: true });

// Load bucket images
function loadBucketImage(src: string, isWin: boolean) {
    if (!src) {
        if (isWin) {
            winBucketImageLoaded.value = null;
        } else {
            loseBucketImageLoaded.value = null;
        }
        return;
    }
    const img = new Image();
    // Don't set crossOrigin for same-origin images to avoid CORS issues
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

// Watch for bucket image changes
watch(() => props.coinDropAssets.winBucketImage, (newVal) => {
    loadBucketImage(newVal || '', true);
}, { immediate: true });

watch(() => props.coinDropAssets.loseBucketImage, (newVal) => {
    loadBucketImage(newVal || '', false);
}, { immediate: true });

// Load tube image
function loadTubeImage(src: string) {
    if (!src) {
        tubeImageLoaded.value = null;
        return;
    }
    const img = new Image();
    // Don't set crossOrigin for same-origin images to avoid CORS issues
    img.onload = () => {
        tubeImageLoaded.value = img;
    };
    img.onerror = () => {
        tubeImageLoaded.value = null;
    };
    img.src = src;
}

watch(() => props.coinDropAssets.tubeImage, (newVal) => {
    loadTubeImage(newVal || '');
}, { immediate: true });

// Watch for showGameBoard to become true and initialize game
watch(() => props.showGameBoard, (newVal) => {
    if (newVal && !gameInitialized.value) {
        nextTick(() => {
            setTimeout(() => {
                initGame();
            }, 100);
        });
    }
}, { immediate: true });

// Handle canvas click
function handleCanvasClick(e: MouseEvent) {
    if (!canDrop.value) return;

    const rect = canvasRef.value?.getBoundingClientRect();
    if (!rect) return;

    const y = e.clientY - rect.top;

    if (y < 55) {
        createBall();
    }
}

const handleOpenInventory = () => {
    showInventory.value = true;
};

// Handle drop button click
function handleDrop() {
    hasClickedDrop.value = true; // Hide the arrow after first click
    if (canDrop.value) {
        createBall();
    }
}

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
</script>

<template>
    <div ref="containerRef" class="coin-drop-container" :class="{ 'coin-drop-container-demo': demoMode, 'video-intro-active': animateTitle && !showGameBoard }" :style="coinDropAssets.gameBackground ? { backgroundImage: `url(${coinDropAssets.gameBackground})`, backgroundSize: 'cover', backgroundPosition: 'center' } : {}">
        <!-- Title Only (visible during video intro, floating above everything) -->
        <div v-if="!showGameBoard" class="title-floating">
            <img v-if="coinDropAssets.titleImage" :src="coinDropAssets.titleImage" alt="Game Title" :class="['title-image', { 'title-zoom-animation': animateTitle }]" />
            <h1 v-else :style="{ color: coinDropAssets.titleColor }" :class="['title-text', { 'title-zoom-animation': animateTitle }]">{{ coinDropAssets.titleText }}</h1>
            <p class="title-subtitle" :style="{ color: coinDropAssets.accentColor }">Drop the coin to win!</p>
        </div>

        <!-- Main Game Board (zooms in after video) -->
        <transition name="game-zoom">
            <div v-if="showGameBoard" class="game-wrapper" :style="{ '--primary-color': coinDropAssets.primaryColor, '--secondary-color': coinDropAssets.secondaryColor, '--accent-color': coinDropAssets.accentColor }">

                <!-- Machine Image (optional decorative wrapper) -->
                <div v-if="coinDropAssets.machineImage" class="machine-frame">
                    <img :src="coinDropAssets.machineImage" alt="" class="machine-bg" />
                </div>

                <!-- Game Content -->
                <div class="game-content">
                    <!-- Header with Title -->
                    <div class="game-header">
                        <img v-if="coinDropAssets.titleImage" :src="coinDropAssets.titleImage" alt="Game Title" class="header-title-image" />
                        <h2 v-else class="header-title" :style="{ color: coinDropAssets.titleColor }">{{ coinDropAssets.titleText }}</h2>
                    </div>

                    <!-- Stats Bar - Clean & Integrated -->
                    <div class="stats-bar">
                        <div class="stat-item">
                            <span class="stat-label">DROPS</span>
                            <span class="stat-value" :style="{ color: coinDropAssets.accentColor }">{{ dropsLeft }}</span>
                        </div>
                        <div class="stat-item">
                            <span class="stat-label">WINS</span>
                            <span class="stat-value stat-wins" :style="{ color: coinDropAssets.winBucketColor }">{{ winCounter }}</span>
                        </div>
                        <div class="stat-item">
                            <span class="stat-label">LAST WIN</span>
                            <span class="stat-value" :style="{ color: coinDropAssets.accentColor }">{{ lastWin > 0 ? `£${lastWin}` : '---' }}</span>
                        </div>
                    </div>

                    <!-- Canvas Game Area -->
                    <div class="canvas-container" :style="{ '--board-bg': coinDropAssets.boardBgColor || '#1a1a2e' }">
                        <!-- Reveal Wins Button - Left side of pegs -->
                        <button
                            v-if="tickets && tickets.length > 0"
                            @click="showRevealWinsModal = true"
                            class="reveal-wins-corner-btn"
                            :style="{ '--btn-accent': coinDropAssets.winBucketColor || '#00ff88' }"
                        >
                            <span>REVEAL</span>
                        </button>

                        <!-- Prizes Inventory Button - Right side of pegs -->
                        <button
                            @click="showInventory = true"
                            class="prizes-inventory-btn"
                            :style="{ 
                                '--btn-primary': coinDropAssets.primaryColor || '#e94560',
                                '--btn-accent': coinDropAssets.accentColor || '#ffd700',
                                '--btn-win': coinDropAssets.winBucketColor || '#00ff88'
                            }"
                        >
                            <span class="prizes-icon">🏆</span>
                            <span class="prizes-text">PRIZES</span>
                        </button>

                        <canvas
                            ref="canvasRef"
                            class="game-canvas"
                            @click="handleCanvasClick"
                        ></canvas>
                    </div>

                    <!-- Drop Button -->
                    <div class="button-container">
                        <!-- Pointing Arrow (shows until first click) OR placeholder to prevent shift -->
                        <div v-if="!hasClickedDrop && canDrop" class="drop-arrow-hint">
                            <svg viewBox="0 0 24 24" fill="currentColor" class="arrow-icon">
                                <path d="M12 16l-6-6h12l-6 6z"/>
                            </svg>
                            <span class="arrow-text">TAP HERE!</span>
                        </div>
                        <div v-else class="arrow-placeholder"></div>
                        <button
                            @click="handleDrop"
                            :disabled="!canDrop"
                            class="drop-button"
                            :class="{ 'is-dropping': isDropping, 'has-image': coinDropAssets.dropButtonImage }"
                            :style="{
                                '--btn-color': coinDropAssets.primaryColor,
                                '--btn-glow': coinDropAssets.accentColor
                            }"
                        >
                            <img v-if="coinDropAssets.dropButtonImage" :src="coinDropAssets.dropButtonImage" alt="Drop" class="drop-btn-img" />
                            <span v-else class="btn-label">{{ isDropping ? 'DROPPING...' : 'DROP COIN' }}</span>
                        </button>

                        <!-- Top Prize Display -->
                        <div v-if="topPrize" class="top-prize-display">
                            <div class="top-prize-label">TOP PRIZE</div>
                            <div class="top-prize-content">
                                <img v-if="topPrize.image_path" :src="topPrize.image_path" :alt="topPrize.name" class="top-prize-img" />
                                <div class="top-prize-info">
                                    <span class="top-prize-name">{{ topPrize.name }}</span>
                                    <span class="top-prize-value" :style="{ color: coinDropAssets.accentColor }">£{{ topPrize.value }}</span>
                                </div>
                            </div>
                        </div>

                    </div>
                </div>

                <!-- Footer Image (optional) -->
                <div v-if="coinDropAssets.footerImage" class="machine-footer">
                    <img :src="coinDropAssets.footerImage" alt="" class="footer-bg" />
                </div>
            </div>
        </transition>

        <!-- Win Toast (Corner Notification) -->
        <Transition name="win-toast">
            <div v-if="showWinReveal && currentWinningPrize" class="win-toast" :style="{ '--accent': coinDropAssets.accentColor }">
                <div class="win-toast-content">
                    <div class="win-toast-title">WINNER!</div>
                    <div class="win-toast-prize">{{ currentWinningPrize.name }}</div>
                    <div class="win-toast-value">£{{ currentWinningPrize.value }}</div>
                </div>
                <img v-if="currentWinningPrize.image" :src="currentWinningPrize.image" :alt="currentWinningPrize.name" class="win-toast-img" />
            </div>
        </Transition>

        <!-- Prizes Modal -->
        <Transition name="prizes-modal">
            <div v-if="showPrizesModal" class="prizes-modal-overlay" @click.self="showPrizesModal = false">
                <div class="prizes-modal" :style="{ '--modal-accent': coinDropAssets.accentColor, '--modal-primary': coinDropAssets.primaryColor }">
                    <button class="prizes-modal-close" @click="showPrizesModal = false">✕</button>
                    <h2 class="prizes-modal-title">INSTANT WINS</h2>
                    <p class="reveal-wins-subtitle">These prizes can be won!</p>

                    <div v-if="instant_win_categories && instant_win_categories.length > 0" class="prizes-grid">
                        <div
                            v-for="prize in instant_win_categories"
                            :key="prize.id"
                            class="prize-card"
                            :class="{ 'top-prize-card': topPrize && prize.id === topPrize.id }"
                        >
                            <div v-if="topPrize && prize.id === topPrize.id" class="top-badge">TOP PRIZE</div>
                            <img v-if="prize.image_path" :src="prize.image_path" :alt="prize.name" class="prize-card-img" />
                            <div class="prize-card-placeholder" v-else>?</div>
                            <div class="prize-card-name">{{ prize.name }}</div>
                            <div class="prize-card-value" :style="{ color: coinDropAssets.accentColor }">£{{ prize.value }}</div>
                        </div>
                    </div>

                    <div v-else class="no-tickets-message">
                        <p>No instant win prizes available</p>
                    </div>
                </div>
            </div>
        </Transition>

        <!-- Reveal Wins Modal -->
        <Transition name="prizes-modal">
            <div v-if="showRevealWinsModal" class="prizes-modal-overlay" @click.self="showRevealWinsModal = false">
                <div class="prizes-modal reveal-wins-modal" :style="{ '--modal-accent': coinDropAssets.winBucketColor || '#00ff88', '--modal-primary': coinDropAssets.primaryColor }">
                    <button class="prizes-modal-close" @click="showRevealWinsModal = false">✕</button>
                    <h2 class="prizes-modal-title" style="color: #00ff88;">YOUR INSTANT WINS</h2>
                    <p class="reveal-wins-subtitle">These are the prizes waiting for you!</p>

                    <div class="prizes-grid" v-if="tickets && tickets.length > 0">
                        <div
                            v-for="ticket in tickets"
                            :key="ticket.id"
                            class="prize-card"
                            :class="{
                                'winner-card': ticket.instant_win !== false && ticket.instant_win && ticket.instant_win.prize !== 'NO WIN',
                                'played-card': playedTickets?.includes(ticket.id)
                            }"
                        >
                            <div v-if="playedTickets?.includes(ticket.id)" class="played-badge">PLAYED</div>
                            <template v-if="ticket.instant_win !== false && ticket.instant_win && ticket.instant_win.prize !== 'NO WIN'">
                                <div class="winner-badge">WINNER!</div>
                                <img v-if="ticket.instant_win.image_path" :src="ticket.instant_win.image_path" :alt="ticket.instant_win.prize" class="prize-card-img" />
                                <div class="prize-card-placeholder winner-placeholder" v-else>WIN</div>
                                <div class="prize-card-name">{{ ticket.instant_win.prize }}</div>
                                <div class="prize-card-value" style="color: #00ff88;">£{{ ticket.instant_win.value }}</div>
                            </template>
                            <template v-else>
                                <div class="prize-card-placeholder">X</div>
                                <div class="prize-card-name" style="opacity: 0.5;">No Win</div>
                            </template>
                            <div class="ticket-number">Ticket #{{ ticket.number }}</div>
                        </div>
                    </div>

                    <div v-else class="no-tickets-message">
                        <p>No tickets available</p>
                    </div>
                </div>
            </div>
        </Transition>

        <CoinDropInventoryModal 
            v-model="showInventory"
            :coinDropAssets="coinDropAssets"
        />

        <!-- Audio Elements -->
        <audio v-if="coinDropAssets.dropSound" ref="dropSound" :src="coinDropAssets.dropSound" preload="auto"></audio>
        <audio v-if="coinDropAssets.winSound" ref="winSound" :src="coinDropAssets.winSound" preload="auto"></audio>
        <audio v-if="coinDropAssets.lossSound" ref="lossSound" :src="coinDropAssets.lossSound" preload="auto"></audio>
    </div>
</template>

<style scoped>

/* ============================================
   PRIZES INVENTORY BUTTON (Top Right)
   ============================================ */

   .prizes-inventory-btn {
    position: absolute;
    top: 75px;
    right: 20px;
    z-index: 10;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    gap: 2px;
    padding: 8px 10px;
    min-width: 65px;
    cursor: pointer;
    border-radius: 14px;
    border: 2px solid var(--btn-accent);
    background: linear-gradient(135deg, 
        color-mix(in srgb, var(--btn-primary) 40%, transparent),
        color-mix(in srgb, var(--btn-primary) 20%, transparent)
    );
    backdrop-filter: blur(12px);
    box-shadow: 
        0 4px 15px color-mix(in srgb, var(--btn-accent) 30%, transparent),
        inset 0 1px 0 rgba(255, 255, 255, 0.2);
    transition: all 0.3s cubic-bezier(0.34, 1.56, 0.64, 1);
    animation: prizesPulse 2s ease-in-out infinite;
}

.prizes-inventory-btn:hover {
    transform: scale(1.1) translateY(-2px);
    border-color: var(--btn-win);
    background: linear-gradient(135deg, 
        color-mix(in srgb, var(--btn-primary) 60%, transparent),
        color-mix(in srgb, var(--btn-primary) 40%, transparent)
    );
    box-shadow: 
        0 8px 25px color-mix(in srgb, var(--btn-accent) 50%, transparent),
        0 0 30px color-mix(in srgb, var(--btn-accent) 40%, transparent),
        inset 0 1px 0 rgba(255, 255, 255, 0.3);
}

.prizes-inventory-btn:active {
    transform: scale(1.05) translateY(0);
}

.prizes-icon {
    font-size: 1.3rem;
    filter: drop-shadow(0 2px 4px rgba(0, 0, 0, 0.5));
    animation: iconBounce 2s ease-in-out infinite;
}

.prizes-text {
    font-size: 0.6rem;
    font-weight: 800;
    letter-spacing: 1.2px;
    text-transform: uppercase;
    color: white;
    text-shadow: 
        0 1px 2px rgba(0, 0, 0, 0.8),
        0 0 8px var(--btn-accent);
}

.prizes-badge {
    position: absolute;
    top: -6px;
    right: -6px;
    min-width: 20px;
    height: 20px;
    display: flex;
    align-items: center;
    justify-content: center;
    padding: 0 6px;
    border-radius: 10px;
    background: linear-gradient(135deg, var(--btn-win), color-mix(in srgb, var(--btn-win) 70%, black));
    color: #000;
    font-size: 0.65rem;
    font-weight: 900;
    border: 2px solid var(--btn-win);
    box-shadow: 
        0 0 12px var(--btn-win),
        0 2px 6px rgba(0, 0, 0, 0.4);
    animation: badgePulse 1.5s ease-in-out infinite;
}

@keyframes prizesPulse {
    0%, 100% {
        box-shadow: 
            0 4px 15px color-mix(in srgb, var(--btn-accent) 30%, transparent),
            inset 0 1px 0 rgba(255, 255, 255, 0.2);
    }
    50% {
        box-shadow: 
            0 4px 20px color-mix(in srgb, var(--btn-accent) 50%, transparent),
            0 0 25px color-mix(in srgb, var(--btn-accent) 30%, transparent),
            inset 0 1px 0 rgba(255, 255, 255, 0.2);
    }
}

@keyframes iconBounce {
    0%, 100% {
        transform: translateY(0) scale(1);
    }
    50% {
        transform: translateY(-3px) scale(1.1);
    }
}

@keyframes badgePulse {
    0%, 100% {
        transform: scale(1);
        box-shadow: 
            0 0 12px var(--btn-win),
            0 2px 6px rgba(0, 0, 0, 0.4);
    }
    50% {
        transform: scale(1.15);
        box-shadow: 
            0 0 20px var(--btn-win),
            0 0 30px var(--btn-win),
            0 2px 6px rgba(0, 0, 0, 0.4);
    }
}

/* Small mobile adjustments */
@media (max-width: 420px) {
    .prizes-inventory-btn {
        top: 55px;
        padding: 6px 8px;
        min-width: 55px;
    }

    .prizes-icon {
        font-size: 1.1rem;
    }

    .prizes-text {
        font-size: 0.5rem;
    }

    .prizes-badge {
        min-width: 18px;
        height: 18px;
        font-size: 0.6rem;
    }
}


.coin-drop-container {
    width: 100%;
    min-height: 100%;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: flex-start;
    padding: 15px 10px 15px;
    padding-top: 60px; /* Space for title */
    position: relative;
    overflow-y: auto; /* Allow scrolling on small screens */
    overflow-x: hidden;
    background: transparent;
}

/* Keep transparent during video intro too */
.coin-drop-container.video-intro-active {
    background: transparent;
}

.coin-drop-container-demo {
    min-height: 100%;
    height: 100%;
    padding: 10px;
    justify-content: flex-start;
    overflow-y: auto;
}

/* ============================================
   FLOATING TITLE (Video Intro)
   ============================================ */

.title-floating {
    position: fixed;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
    z-index: 20;
    text-align: center;
}

.title-text {
    font-size: 3rem;
    font-weight: 900;
    text-transform: uppercase;
    letter-spacing: 4px;
    text-shadow: 4px 4px 0 rgba(0,0,0,0.5);
    margin-bottom: 15px;
}

.title-subtitle {
    font-size: 1.2rem;
    font-weight: 600;
    text-transform: uppercase;
    letter-spacing: 2px;
}

.title-image {
    max-width: 350px;
    max-height: 150px;
    margin-bottom: 15px;
}

.title-zoom-animation {
    animation: titleZoom 1.2s cubic-bezier(0.34, 1.56, 0.64, 1);
}

@keyframes titleZoom {
    0% {
        transform: scale(2.5);
        opacity: 0;
        filter: brightness(1.5);
    }
    40% {
        transform: scale(1.3);
        opacity: 0.9;
    }
    70% {
        transform: scale(0.95);
        opacity: 1;
    }
    100% {
        transform: scale(1);
        opacity: 1;
    }
}

/* ============================================
   GAME WRAPPER - CLEAN & IMMERSIVE
   ============================================ */

.game-wrapper {
    --primary-color: #e94560;
    --secondary-color: #1a1a2e;
    --accent-color: #ffd700;

    position: relative;
    width: 100%;
    max-width: 420px;
    display: flex;
    flex-direction: column;
    align-items: center;
}

.machine-frame {
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    pointer-events: none;
    z-index: 0;
}

.machine-bg {
    width: 100%;
    height: 100%;
    object-fit: contain;
}

.machine-footer {
    width: 100%;
    max-height: 80px;
    margin-top: -10px;
    z-index: 1;
}

.footer-bg {
    width: 100%;
    height: auto;
    object-fit: contain;
}

.game-content {
    position: relative;
    z-index: 1;
    width: 100%;
    display: flex;
    flex-direction: column;
    align-items: center;
    gap: 4px;
}

/* ============================================
   HEADER
   ============================================ */

.game-header {
    text-align: center;
    padding: 5px 0;
}

.header-title-image {
    max-width: 160px;
    max-height: 40px;
}

.header-title {
    font-size: 1.2rem;
    font-weight: 900;
    text-transform: uppercase;
    letter-spacing: 2px;
    text-shadow: 2px 2px 0 rgba(0,0,0,0.5);
    margin: 0;
}

/* ============================================
   STATS BAR - CLEAN INTEGRATED DESIGN
   ============================================ */

.stats-bar {
    display: flex;
    justify-content: center;
    gap: 15px;
    padding: 6px 16px;
    background: color-mix(in srgb, var(--secondary) 80%, transparent);
    border-radius: 20px;
    backdrop-filter: blur(10px);
    border: 1px solid color-mix(in srgb, var(--primary) 30%, transparent);
}

.stat-item {
    display: flex;
    flex-direction: column;
    align-items: center;
    min-width: 55px;
}

.stat-label {
    font-size: 0.55rem;
    font-weight: 700;
    text-transform: uppercase;
    letter-spacing: 1px;
    color: rgba(255, 255, 255, 0.6);
    margin-bottom: 1px;
}

.stat-value {
    font-size: 1.1rem;
    font-weight: 900;
}

.stat-wins {
    animation: pulse 2s ease-in-out infinite;
}

@keyframes pulse {
    0%, 100% { transform: scale(1); }
    50% { transform: scale(1.1); }
}

/* ============================================
   CANVAS CONTAINER
   ============================================ */

.canvas-container {
    position: relative;
    overflow: visible;
    background: transparent;
    /* Ensure buttons can position relative to this */
    display: flex;
    flex-direction: column;
    align-items: center;
}

.game-canvas {
    display: block;
    cursor: pointer;
    background: transparent;
}

/* ============================================
   DROP BUTTON - CLEAN STYLE
   ============================================ */

.button-container {
    padding: 6px 0;
    display: flex;
    flex-direction: column;
    align-items: center;
    position: relative;
}

/* Pointing Arrow Hint */
.drop-arrow-hint {
    display: flex;
    flex-direction: column;
    align-items: center;
    animation: bounceArrow 1s ease-in-out infinite;
    color: #ffd700;
    height: 50px; /* Fixed height to prevent layout shift */
}

.drop-arrow-hint .arrow-icon {
    width: 28px;
    height: 28px;
    filter: drop-shadow(0 0 8px rgba(255, 215, 0, 0.8));
}

.drop-arrow-hint .arrow-text {
    font-size: 0.65rem;
    font-weight: 800;
    letter-spacing: 1px;
    text-shadow: 0 0 10px rgba(255, 215, 0, 0.8);
}

@keyframes bounceArrow {
    0%, 100% { transform: translateY(0); }
    50% { transform: translateY(6px); }
}

/* Placeholder to prevent layout shift when arrow disappears */
.arrow-placeholder {
    height: 50px;
}


.drop-button {
    --btn-color: #e94560;

    position: relative;
    padding: 10px 35px;
    font-size: 0.95rem;
    font-weight: 800;
    letter-spacing: 2px;
    text-transform: uppercase;
    color: white;
    background: linear-gradient(180deg, var(--btn-color) 0%, color-mix(in srgb, var(--btn-color) 70%, black) 100%);
    border: none;
    border-radius: 50px;
    cursor: pointer;
    overflow: hidden;
    box-shadow:
        0 3px 0 color-mix(in srgb, var(--btn-color) 50%, black),
        0 5px 12px rgba(0, 0, 0, 0.3);
    transition: all 0.2s ease;
    text-shadow: 0 2px 4px rgba(0, 0, 0, 0.4);
}

.drop-button:hover:not(:disabled) {
    transform: translateY(-2px);
    box-shadow:
        0 6px 0 color-mix(in srgb, var(--btn-color) 50%, black),
        0 10px 25px rgba(0, 0, 0, 0.4);
}

.drop-button:active:not(:disabled) {
    transform: translateY(2px);
    box-shadow:
        0 2px 0 color-mix(in srgb, var(--btn-color) 50%, black),
        0 4px 12px rgba(0, 0, 0, 0.3);
}

.drop-button:disabled {
    background: linear-gradient(180deg, #555 0%, #333 100%);
    box-shadow: 0 3px 0 #222, 0 5px 15px rgba(0, 0, 0, 0.3);
    cursor: not-allowed;
    animation: none !important;
}

.drop-btn-img {
    max-height: 55px;
    width: auto;
    display: block;
}

/* When button has custom image, remove default styling */
.drop-button.has-image {
    padding: 0;
    background: transparent;
    border: none;
    box-shadow: none;
    border-radius: 0;
}

.drop-button.has-image:hover:not(:disabled) {
    transform: scale(1.05);
    box-shadow: none;
}

.drop-button.has-image:active:not(:disabled) {
    transform: scale(0.95);
    box-shadow: none;
}

.drop-button.has-image:disabled {
    background: transparent;
    box-shadow: none;
    opacity: 0.5;
}

/* ============================================
   TRANSITIONS
   ============================================ */

.game-zoom-enter-active {
    animation: gameZoomIn 0.8s cubic-bezier(0.34, 1.56, 0.64, 1);
}

.game-zoom-leave-active {
    animation: gameZoomIn 0.4s ease reverse;
}

@keyframes gameZoomIn {
    0% {
        transform: scale(0.3);
        opacity: 0;
    }
    60% {
        transform: scale(1.03);
        opacity: 1;
    }
    100% {
        transform: scale(1);
        opacity: 1;
    }
}

/* ============================================
   WIN TOAST - CORNER NOTIFICATION
   ============================================ */

.win-toast {
    --accent: #ffd700;

    position: fixed;
    bottom: 20px;
    right: 20px;
    display: flex;
    align-items: center;
    gap: 12px;
    padding: 15px 20px;
    background: linear-gradient(135deg, rgba(0, 0, 0, 0.9) 0%, rgba(30, 30, 50, 0.95) 100%);
    border: 2px solid var(--accent);
    border-radius: 16px;
    z-index: 9999;
    max-width: 300px;
    box-shadow: 0 10px 40px rgba(0, 0, 0, 0.5);
}

.win-toast-icon {
    font-size: 2rem;
    animation: bounceIn 0.5s ease;
}

.win-toast-content {
    flex: 1;
}

.win-toast-title {
    font-size: 0.75rem;
    font-weight: 800;
    color: var(--accent);
    letter-spacing: 2px;
    text-transform: uppercase;
}

.win-toast-prize {
    font-size: 1rem;
    font-weight: 700;
    color: #fff;
    margin: 2px 0;
}

.win-toast-value {
    font-size: 1.2rem;
    font-weight: 900;
    color: var(--accent);
}

.win-toast-img {
    width: 50px;
    height: 50px;
    object-fit: contain;
    border-radius: 8px;
}

/* Win toast transitions */
.win-toast-enter-active {
    animation: slideInRight 0.4s cubic-bezier(0.34, 1.56, 0.64, 1);
}

.win-toast-leave-active {
    animation: slideOutRight 0.3s ease forwards;
}

@keyframes slideInRight {
    0% {
        transform: translateX(120%);
        opacity: 0;
    }
    100% {
        transform: translateX(0);
        opacity: 1;
    }
}

@keyframes slideOutRight {
    0% {
        transform: translateX(0);
        opacity: 1;
    }
    100% {
        transform: translateX(120%);
        opacity: 0;
    }
}

@keyframes bounceIn {
    0% { transform: scale(0); }
    50% { transform: scale(1.3); }
    100% { transform: scale(1); }
}

/* Legacy styles kept for backwards compatibility */
.prize-value {
    font-size: 2rem;
    font-weight: 900;
    color: #FFD700;
    text-shadow:
        0 0 15px rgba(255,215,0,0.8),
        3px 3px 0 rgba(0,0,0,0.4);
}

@keyframes winBurst {
    0% {
        transform: scale(0) rotate(-10deg);
        opacity: 0;
    }
    60% {
        transform: scale(1.1) rotate(3deg);
    }
    100% {
        transform: scale(1) rotate(0deg);
        opacity: 1;
    }
}

@keyframes titlePulse {
    0%, 100% { transform: scale(1); }
    50% { transform: scale(1.05); }
}

@keyframes prizeFloat {
    0%, 100% { transform: translateY(0) rotate(-2deg); }
    50% { transform: translateY(-8px) rotate(2deg); }
}

.win-reveal-enter-active {
    transition: opacity 0.3s;
}

.win-reveal-leave-active {
    transition: opacity 0.5s;
}

.win-reveal-enter-from,
.win-reveal-leave-to {
    opacity: 0;
}

/* ============================================
   TOP PRIZE DISPLAY - Modern with tenant colors
   ============================================ */

.top-prize-display {
    margin-top: 10px;
    padding: 10px 18px;
    background: linear-gradient(135deg, var(--secondary) 0%, var(--thirdly) 100%);
    border: 2px solid var(--primary);
    border-radius: 12px;
    text-align: center;
    backdrop-filter: blur(10px);
    box-shadow: 0 0 20px color-mix(in srgb, var(--primary) 30%, transparent), inset 0 1px 0 rgba(255, 255, 255, 0.1);
    animation: subtleGlow 3s ease-in-out infinite;
}

@keyframes subtleGlow {
    0%, 100% { box-shadow: 0 0 15px color-mix(in srgb, var(--primary) 20%, transparent), inset 0 1px 0 rgba(255, 255, 255, 0.1); }
    50% { box-shadow: 0 0 25px color-mix(in srgb, var(--primary) 40%, transparent), inset 0 1px 0 rgba(255, 255, 255, 0.1); }
}

.top-prize-label {
    font-size: 0.6rem;
    font-weight: 800;
    letter-spacing: 2px;
    color: var(--primary);
    margin-bottom: 6px;
    text-transform: uppercase;
}

.top-prize-content {
    display: flex;
    align-items: center;
    justify-content: center;
    gap: 10px;
}

.top-prize-img {
    width: 40px;
    height: 40px;
    object-fit: contain;
    border-radius: 8px;
    border: 1px solid color-mix(in srgb, var(--primary) 30%, transparent);
}

.top-prize-info {
    display: flex;
    flex-direction: column;
    align-items: flex-start;
}

.top-prize-name {
    font-size: 0.85rem;
    font-weight: 700;
    color: #fff;
    text-shadow: 0 2px 4px rgba(0, 0, 0, 0.3);
}

.top-prize-value {
    font-size: 1.1rem;
    font-weight: 900;
    color: var(--primary);
}

/* ============================================
   REVEAL WINS CORNER BUTTON
   ============================================ */

.reveal-wins-corner-btn {
    position: absolute;
    top: 75px; /* Aligned with 2nd-3rd peg row inside canvas */
    left: 2px;
    z-index: 10;
    display: flex;
    align-items: center;
    gap: 4px;
    padding: 5px 10px;
    font-size: 0.6rem;
    font-weight: 700;
    letter-spacing: 1px;
    text-transform: uppercase;
    color: white;
    background: color-mix(in srgb, var(--primary) 25%, transparent);
    border: 1px solid var(--primary);
    border-radius: 12px;
    cursor: pointer;
    backdrop-filter: blur(10px);
    transition: all 0.3s ease;
    box-shadow: 0 3px 10px color-mix(in srgb, var(--primary) 20%, transparent);
}

.reveal-wins-corner-btn:hover {
    background: color-mix(in srgb, var(--primary) 40%, transparent);
    transform: scale(1.05);
    box-shadow: 0 5px 15px color-mix(in srgb, var(--primary) 30%, transparent);
}

.reveal-wins-corner-btn .reveal-icon {
    font-size: 0.9rem;
}

.prizes-icon {
    font-size: 1.1rem;
}

/* Reveal Wins Modal Extras */
.reveal-wins-subtitle {
    text-align: center;
    color: rgba(255, 255, 255, 0.7);
    font-size: 0.9rem;
    margin: -15px 0 20px;
}

.winner-card {
    background: linear-gradient(180deg, rgba(0, 255, 136, 0.2) 0%, rgba(0, 255, 136, 0.05) 100%) !important;
    border-color: rgba(0, 255, 136, 0.5) !important;
}

.played-card {
    opacity: 0.5;
}

.winner-badge {
    position: absolute;
    top: -8px;
    left: 50%;
    transform: translateX(-50%);
    padding: 3px 10px;
    background: linear-gradient(180deg, #00ff88 0%, #00cc6a 100%);
    color: #000;
    font-size: 0.55rem;
    font-weight: 800;
    letter-spacing: 1px;
    border-radius: 10px;
}

.played-badge {
    position: absolute;
    top: 5px;
    right: 5px;
    padding: 2px 6px;
    background: rgba(255, 255, 255, 0.2);
    color: #fff;
    font-size: 0.5rem;
    font-weight: 700;
    border-radius: 4px;
}

.winner-placeholder {
    font-size: 2.5rem !important;
}

.ticket-number {
    font-size: 0.6rem;
    color: rgba(255, 255, 255, 0.4);
    margin-top: 5px;
}

.no-tickets-message {
    text-align: center;
    padding: 40px;
    color: rgba(255, 255, 255, 0.5);
}

/* ============================================
   PRIZES MODAL
   ============================================ */

.prizes-modal-overlay {
    position: fixed;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    background: rgba(0, 0, 0, 0.9);
    display: flex;
    align-items: center;
    justify-content: center;
    z-index: 99999;
    backdrop-filter: blur(8px);
    padding: 20px;
}

.prizes-modal {
    --modal-accent: #ffd700;
    --modal-primary: #e94560;

    position: relative;
    width: 100%;
    max-width: 600px;
    max-height: 80vh;
    background: linear-gradient(180deg, var(--secondary) 0%, var(--thirdly) 100%);
    border-radius: 20px;
    padding: 30px 25px;
    overflow-y: auto;
    border: 2px solid var(--primary);
    box-shadow: 0 20px 60px rgba(0, 0, 0, 0.5);
}

.prizes-modal-close {
    position: absolute;
    top: 15px;
    right: 15px;
    width: 35px;
    height: 35px;
    border: none;
    background: rgba(255, 255, 255, 0.1);
    color: #fff;
    font-size: 1.2rem;
    border-radius: 50%;
    cursor: pointer;
    transition: all 0.3s ease;
}

.prizes-modal-close:hover {
    background: var(--modal-primary);
    transform: rotate(90deg);
}

.prizes-modal-title {
    text-align: center;
    font-size: 1.8rem;
    font-weight: 900;
    color: var(--modal-accent);
    margin-bottom: 25px;
    letter-spacing: 2px;
}

.prizes-grid {
    display: grid;
    grid-template-columns: repeat(auto-fill, minmax(150px, 1fr));
    gap: 15px;
}

.prize-card {
    position: relative;
    background: linear-gradient(180deg, rgba(255, 255, 255, 0.08) 0%, rgba(255, 255, 255, 0.03) 100%);
    border: 1px solid rgba(255, 255, 255, 0.1);
    border-radius: 15px;
    padding: 15px;
    text-align: center;
    transition: all 0.3s ease;
}

.prize-card:hover {
    transform: translateY(-5px);
    border-color: var(--modal-accent);
}

.top-prize-card {
    background: linear-gradient(180deg, rgba(255, 215, 0, 0.15) 0%, rgba(255, 215, 0, 0.05) 100%);
    border-color: rgba(255, 215, 0, 0.4);
}

.top-badge {
    position: absolute;
    top: -8px;
    left: 50%;
    transform: translateX(-50%);
    padding: 3px 10px;
    background: linear-gradient(180deg, #ffd700 0%, #ff9500 100%);
    color: #000;
    font-size: 0.6rem;
    font-weight: 800;
    letter-spacing: 1px;
    border-radius: 10px;
}

.prize-card-img {
    width: 80px;
    height: 80px;
    object-fit: contain;
    margin-bottom: 10px;
    filter: drop-shadow(0 4px 10px rgba(0, 0, 0, 0.3));
}

.prize-card-placeholder {
    font-size: 3rem;
    margin-bottom: 10px;
}

.prize-card-name {
    font-size: 0.85rem;
    font-weight: 700;
    color: #fff;
    margin-bottom: 5px;
    line-height: 1.3;
}

.prize-card-value {
    font-size: 1.1rem;
    font-weight: 900;
}

/* Prizes modal transitions */
.prizes-modal-enter-active {
    transition: all 0.4s cubic-bezier(0.34, 1.56, 0.64, 1);
}

.prizes-modal-leave-active {
    transition: all 0.3s ease;
}

.prizes-modal-enter-from,
.prizes-modal-leave-to {
    opacity: 0;
}

.prizes-modal-enter-from .prizes-modal,
.prizes-modal-leave-to .prizes-modal {
    transform: scale(0.8) translateY(30px);
}

/* ============================================
   CLEAN GAME STYLING (No Glow Effects)
   ============================================ */

.canvas-container {
    position: relative;
    border-radius: 12px;
    overflow: hidden;
    background: transparent;
    border: none;
}

/* ============================================
   MOBILE RESPONSIVE
   ============================================ */

/* Small mobile (iPhone SE and similar, up to 420px) */
@media (max-width: 420px) {
    .coin-drop-container {
        padding: 5px;
        padding-top: 40px;
    }

    .game-header {
        padding: 2px 0;
    }

    .header-title {
        font-size: 0.9rem;
    }

    .header-title-image {
        max-width: 120px;
        max-height: 30px;
    }

    .stats-bar {
        gap: 8px;
        padding: 4px 10px;
    }

    .stat-item {
        min-width: 45px;
    }

    .stat-label {
        font-size: 0.45rem;
    }

    .stat-value {
        font-size: 0.9rem;
    }

    .drop-button {
        padding: 8px 25px;
        font-size: 0.8rem;
    }

    .top-prize-display {
        padding: 6px 10px;
        margin-top: 5px;
    }

    .top-prize-label {
        font-size: 0.5rem;
    }

    .top-prize-img {
        width: 30px;
        height: 30px;
    }

    .top-prize-name {
        font-size: 0.7rem;
    }

    .top-prize-value {
        font-size: 0.9rem;
    }

    .reveal-wins-corner-btn,
    .instant-wins-corner-btn {
        top: 55px; /* Aligned with 1st-2nd peg row on small mobile */
        padding: 4px 8px;
        font-size: 0.5rem;
    }

    .button-container {
        padding: 4px 0;
    }

    /* Arrow hint for small mobile */
    .drop-arrow-hint {
        height: 40px;
    }

    .drop-arrow-hint .arrow-icon {
        width: 22px;
        height: 22px;
    }

    .drop-arrow-hint .arrow-text {
        font-size: 0.55rem;
    }

    .arrow-placeholder {
        height: 40px;
    }
}

@media (max-width: 550px) {
    .coin-drop-container {
        padding: 10px;
    }

    .title-text {
        font-size: 2rem;
    }

    .title-image {
        max-width: 250px;
        max-height: 100px;
    }

    .stats-bar {
        gap: 12px;
        padding: 8px 15px;
    }

    .stat-item {
        min-width: 55px;
    }

    .stat-label {
        font-size: 0.55rem;
    }

    .stat-value {
        font-size: 1.2rem;
    }

    .drop-button {
        padding: 14px 40px;
        font-size: 1rem;
    }

    .win-title {
        font-size: 2rem;
    }

    .prize-image-wrap {
        width: 120px;
        height: 120px;
    }

    .prize-name {
        font-size: 1.3rem;
    }

    .prize-value {
        font-size: 1.6rem;
    }

    .header-title {
        font-size: 1.2rem;
    }

    /* Top Prize Mobile */
    .top-prize-display {
        padding: 10px 15px;
    }

    .top-prize-img {
        width: 40px;
        height: 40px;
    }

    .top-prize-name {
        font-size: 0.8rem;
    }

    .top-prize-value {
        font-size: 1.1rem;
    }

    /* Prizes Button Mobile */
    .prizes-button {
        padding: 10px 20px;
        font-size: 0.75rem;
    }

    /* Prizes Modal Mobile */
    .prizes-modal {
        padding: 20px 15px;
        max-height: 90vh;
    }

    .prizes-modal-title {
        font-size: 1.4rem;
    }

    .prizes-grid {
        grid-template-columns: repeat(2, 1fr);
        gap: 10px;
    }

    .prize-card {
        padding: 12px 10px;
    }

    .prize-card-img {
        width: 60px;
        height: 60px;
    }

    .prize-card-name {
        font-size: 0.75rem;
    }

    .prize-card-value {
        font-size: 0.95rem;
    }
}
</style>
