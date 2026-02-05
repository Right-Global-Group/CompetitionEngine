<script setup lang="ts">
import { ref, computed, onMounted, watch } from 'vue';

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

interface InstantWinCategory {
    id: number;
    name: string;
    image_path: string;
    value: number;
}

interface PopGameAssets {
    titleText?: string;
    titleColor?: string;
    titleImage?: string;
    background?: string;
    header?: string;
    primaryColor?: string;
    secondaryColor?: string;
    accentColor?: string;
    textColor?: string;
    welcomeSound?: string;
    winSound?: string;
    lossSound?: string;
    popItemType?: string;
    popItemImage?: string;
    popSound?: string;
    popBgColor?: string;
    popItemColors?: string[];
    popWinColor?: string;
    popLoseColor?: string;
    popConfettiColors?: string[];
}

interface PopItem {
    id: number;
    ticketId: number;
    ticketNumber: string;
    color: string;
    isWinner: boolean;
    prize: string | null;
    prizeValue: number;
    popped: boolean;
    animating: boolean;
    floatDelay: number;
    shakeX: number;
    shakeY: number;
}

interface Props {
    popGameAssets: PopGameAssets;
    demoMode?: boolean;
    previewMode?: 'mobile' | 'desktop';
    tickets?: Ticket[];
    playedTickets?: number[];
    instant_win_categories?: InstantWinCategory[];
}

const props = withDefaults(defineProps<Props>(), {
    demoMode: false,
    previewMode: 'mobile',
    playedTickets: () => [],
});

const emit = defineEmits<{
    'ticket-played': [ticketId: number];
    'prize-won': [prize: InstantWin];
}>();

// Audio refs
const popAudio = ref<HTMLAudioElement | null>(null);
const winAudio = ref<HTMLAudioElement | null>(null);
const lossAudio = ref<HTMLAudioElement | null>(null);

// Game state
const popItems = ref<PopItem[]>([]);
const totalWins = ref(0);
const totalPopped = ref(0);
const confettiParticles = ref<Array<{
    id: number;
    x: number;
    y: number;
    color: string;
    rotation: number;
    scale: number;
}>>([]);
const showWinToast = ref(false);
const winToastAmount = ref(0);
const allPopped = ref(false);

// Demo mode tickets
const demoTickets = computed<Ticket[]>(() => {
    if (!props.demoMode) return [];

    const tickets: Ticket[] = [];
    for (let i = 1; i <= 30; i++) {
        const isWinner = i % 5 === 0; // Every 5th ticket is a winner
        tickets.push({
            id: i,
            number: `DEMO-${String(i).padStart(4, '0')}`,
            competition_id: 1,
            instant_win: isWinner ? {
                id: i,
                name: 'Demo Prize',
                prize: `£${(Math.random() * 50 + 5).toFixed(2)}`,
                value: Math.random() * 50 + 5,
                claimed: false,
                image_path: null,
                won_date: null,
                category_id: 1,
            } : false,
        });
    }
    return tickets;
});

// Active tickets (either real or demo)
const activeTickets = computed(() => {
    return props.demoMode ? demoTickets.value : (props.tickets || []);
});

// All items are displayed (no pagination - infinite scroll)
const displayedItems = computed(() => popItems.value);

// Item colors
const itemColors = computed(() => {
    return props.popGameAssets.popItemColors || [
        '#FF4C4C', '#FFEB3B', '#64B5F6', '#81C784', '#9575CD',
        '#FF8A80', '#FFB74D', '#4DD0E1', '#F06292', '#FFD700'
    ];
});

// Confetti colors
const confettiColors = computed(() => {
    return props.popGameAssets.popConfettiColors || [
        '#FFD700', '#FF6B6B', '#4ECDC4', '#45B7D1', '#96CEB4', '#FFEAA7'
    ];
});

// Initialize pop items from tickets
const initializeItems = () => {
    const colors = itemColors.value;
    popItems.value = activeTickets.value.map((ticket, index) => {
        const instantWin = ticket.instant_win;
        const isWinner = instantWin !== false && instantWin.prize !== 'NO WIN';
        const prizeValue = isWinner && instantWin ? extractAmount(instantWin.prize) : 0;

        return {
            id: index,
            ticketId: ticket.id,
            ticketNumber: ticket.number,
            color: colors[index % colors.length],
            isWinner,
            prize: isWinner && instantWin ? instantWin.prize : null,
            prizeValue,
            popped: props.playedTickets?.includes(ticket.id) || false,
            animating: false,
            floatDelay: Math.random() * 2,
            shakeX: Math.random() * 5 - 2.5,
            shakeY: Math.random() * 5 - 2.5,
        };
    });

    // Shuffle the items for randomness
    popItems.value = shuffleArray([...popItems.value]);

    // Reset state
    totalPopped.value = props.playedTickets?.length || 0;
    allPopped.value = false;
};

// Fisher-Yates shuffle
const shuffleArray = <T>(array: T[]): T[] => {
    const shuffled = [...array];
    for (let i = shuffled.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [shuffled[i], shuffled[j]] = [shuffled[j], shuffled[i]];
    }
    return shuffled;
};

// Extract numeric amount from prize string
const extractAmount = (text: string | null): number => {
    if (!text) return 0;
    // Check for pence format (e.g. "5p FISH", "10p Prize")
    const penceMatch = text.match(/([\d.]+)\s*p\b/i);
    if (penceMatch) {
        return parseFloat(penceMatch[1]) / 100;
    }
    const match = text.match(/[\d.]+/);
    return match ? parseFloat(match[0]) : 0;
};

// Pop an item (instant mode skips animation wait for rapid-fire popping)
const popItem = async (item: PopItem, instant: boolean = false) => {
    if (item.popped || item.animating) return;

    item.animating = true;

    // Play pop sound
    playPopSound();

    // Create confetti burst at item position (skip in instant mode to avoid spam)
    if (item.isWinner && !instant) {
        createConfetti();
    }

    // Wait for pop animation (skip in instant mode)
    if (!instant) {
        await new Promise(resolve => setTimeout(resolve, 300));
    }

    item.popped = true;
    item.animating = false;
    totalPopped.value++;

    // Emit ticket played
    emit('ticket-played', item.ticketId);

    // Handle win/loss
    if (item.isWinner && item.prizeValue > 0) {
        totalWins.value += item.prizeValue;

        // Show win toast (only in non-instant mode to avoid spam)
        if (!instant) {
            winToastAmount.value = item.prizeValue;
            showWinToast.value = true;
            playWinSound();

            setTimeout(() => {
                showWinToast.value = false;
            }, 2000);
        }

        // Emit prize won
        const instantWin = activeTickets.value.find(t => t.id === item.ticketId)?.instant_win;
        if (instantWin && instantWin !== false) {
            emit('prize-won', instantWin);
        }
    } else if (!instant) {
        playLossSound();
    }

    // Check if all items are popped
    if (totalPopped.value >= popItems.value.length) {
        allPopped.value = true;
    }
};

// Audio context for synthesized sounds
let audioContext: AudioContext | null = null;

const getAudioContext = () => {
    if (!audioContext) {
        audioContext = new (window.AudioContext || (window as any).webkitAudioContext)();
    }
    return audioContext;
};

// Generate a satisfying high-pitched "pop/plop" sound - casino water drop style
const playDefaultPopSound = () => {
    try {
        const ctx = getAudioContext();
        const now = ctx.currentTime;

        // Main "plop" oscillator - high pitched descending tone
        const osc = ctx.createOscillator();
        osc.type = 'sine';
        osc.frequency.setValueAtTime(2400, now); // Start high
        osc.frequency.exponentialRampToValueAtTime(800, now + 0.04); // Quick drop

        // Second harmonic for richness
        const osc2 = ctx.createOscillator();
        osc2.type = 'sine';
        osc2.frequency.setValueAtTime(3600, now);
        osc2.frequency.exponentialRampToValueAtTime(1200, now + 0.03);

        // Envelope for the main tone
        const gainNode = ctx.createGain();
        gainNode.gain.setValueAtTime(0.4, now);
        gainNode.gain.exponentialRampToValueAtTime(0.01, now + 0.08);

        // Envelope for second harmonic
        const gainNode2 = ctx.createGain();
        gainNode2.gain.setValueAtTime(0.15, now);
        gainNode2.gain.exponentialRampToValueAtTime(0.01, now + 0.05);

        // Soft click/attack noise
        const noiseLen = 0.015;
        const noiseBuffer = ctx.createBuffer(1, Math.floor(ctx.sampleRate * noiseLen), ctx.sampleRate);
        const noiseData = noiseBuffer.getChannelData(0);
        for (let i = 0; i < noiseData.length; i++) {
            const t = i / noiseData.length;
            noiseData[i] = (Math.random() * 2 - 1) * Math.pow(1 - t, 4) * 0.3;
        }
        const noiseSource = ctx.createBufferSource();
        noiseSource.buffer = noiseBuffer;

        // Highpass filter for crisp attack
        const hpFilter = ctx.createBiquadFilter();
        hpFilter.type = 'highpass';
        hpFilter.frequency.value = 2000;

        // Connect everything
        osc.connect(gainNode);
        osc2.connect(gainNode2);
        gainNode.connect(ctx.destination);
        gainNode2.connect(ctx.destination);
        noiseSource.connect(hpFilter);
        hpFilter.connect(ctx.destination);

        // Play
        osc.start(now);
        osc2.start(now);
        noiseSource.start(now);
        osc.stop(now + 0.1);
        osc2.stop(now + 0.08);

    } catch (e) {
        // Audio not supported
    }
};

// Play sounds
const playPopSound = () => {
    if (popAudio.value && props.popGameAssets.popSound) {
        // Use custom sound if provided
        popAudio.value.currentTime = 0;
        popAudio.value.play().catch(() => {});
    } else {
        // Use synthesized pop sound
        playDefaultPopSound();
    }
};

const playWinSound = () => {
    if (winAudio.value) {
        winAudio.value.currentTime = 0;
        winAudio.value.play().catch(() => {});
    }
};

const playLossSound = () => {
    if (lossAudio.value) {
        lossAudio.value.currentTime = 0;
        lossAudio.value.play().catch(() => {});
    }
};

// Create confetti particles
const createConfetti = () => {
    const colors = confettiColors.value;
    const newParticles = [];

    for (let i = 0; i < 30; i++) {
        newParticles.push({
            id: Date.now() + i,
            x: Math.random() * 100,
            y: Math.random() * 100,
            color: colors[Math.floor(Math.random() * colors.length)],
            rotation: Math.random() * 360,
            scale: 0.5 + Math.random() * 0.5,
        });
    }

    confettiParticles.value = [...confettiParticles.value, ...newParticles];

    // Remove particles after animation
    setTimeout(() => {
        confettiParticles.value = confettiParticles.value.filter(
            p => !newParticles.find(np => np.id === p.id)
        );
    }, 2000);
};

// Pop all remaining items (rapid-fire cascade!)
const popAll = async () => {
    const unpoppedItems = displayedItems.value.filter(item => !item.popped);

    // Pop one by one but super fast!
    for (const item of unpoppedItems) {
        popItem(item, true); // true = instant mode (skips 300ms wait)
        await new Promise(resolve => setTimeout(resolve, 25)); // Quick visual cascade
    }
};

// Watch for ticket changes
watch(() => activeTickets.value, () => {
    initializeItems();
}, { immediate: true });

onMounted(() => {
    initializeItems();
});
</script>

<template>
    <div
        class="pop-game-board"
        :style="{
            '--bg-color': popGameAssets.popBgColor || '#1a1a2e',
            '--bg-image': popGameAssets.background ? `url(${popGameAssets.background})` : 'none',
            '--primary-color': popGameAssets.primaryColor || '#e94560',
            '--accent-color': popGameAssets.accentColor || '#ffd700',
            '--win-color': popGameAssets.popWinColor || '#00ff88',
            '--lose-color': popGameAssets.popLoseColor || '#ff4444',
        }"
    >
        <!-- Header with stats -->
        <div class="game-header">
            <div class="stat-card">
                <span class="stat-label">Total Wins</span>
                <span class="stat-value win-value">{{ totalWins.toFixed(2) }}</span>
            </div>
            <div class="stat-card">
                <span class="stat-label">Popped</span>
                <span class="stat-value">{{ totalPopped }} / {{ popItems.length }}</span>
            </div>
        </div>

        <!-- Game grid - scrollable based on ticket count -->
        <div class="game-grid-container">
            <div
                class="game-grid"
                :class="{ 'mobile-grid': previewMode === 'mobile' }"
            >
                <div
                    v-for="item in displayedItems"
                    :key="item.id"
                    class="pop-item-container"
                    :class="{
                        'popped': item.popped,
                        'animating': item.animating,
                        'winner': item.popped && item.isWinner,
                        'loser': item.popped && !item.isWinner
                    }"
                    @click="popItem(item)"
                >
                    <!-- Unpopped item -->
                    <div
                        v-if="!item.popped"
                        class="pop-item"
                        :style="{
                            '--item-color': item.color,
                            '--float-delay': item.floatDelay + 's',
                            '--shake-x': item.shakeX + 'px',
                            '--shake-y': item.shakeY + 'px',
                        }"
                    >
                        <!-- Custom image or SVG balloon -->
                        <img
                            v-if="popGameAssets.popItemImage"
                            :src="popGameAssets.popItemImage"
                            class="custom-item-image"
                            alt="Pop item"
                        />
                        <svg
                            v-else-if="popGameAssets.popItemType === 'balloon' || !popGameAssets.popItemType"
                            class="balloon-svg"
                            viewBox="0 0 100 150"
                            xmlns="http://www.w3.org/2000/svg"
                        >
                            <!-- Balloon body -->
                            <ellipse
                                cx="50"
                                cy="55"
                                rx="40"
                                ry="50"
                                :fill="item.color"
                                class="balloon-body"
                            />
                            <!-- Highlight -->
                            <ellipse
                                cx="35"
                                cy="40"
                                rx="12"
                                ry="18"
                                fill="rgba(255,255,255,0.3)"
                                class="balloon-highlight"
                            />
                            <!-- Knot -->
                            <polygon
                                points="45,105 55,105 50,115"
                                :fill="item.color"
                            />
                            <!-- String -->
                            <path
                                d="M50 115 Q45 125 50 135 Q55 145 50 150"
                                stroke="#666"
                                stroke-width="2"
                                fill="none"
                                class="balloon-string"
                            />
                        </svg>

                        <svg
                            v-else-if="popGameAssets.popItemType === 'bubble'"
                            class="bubble-svg"
                            viewBox="0 0 100 100"
                            xmlns="http://www.w3.org/2000/svg"
                        >
                            <!-- Main bubble circle -->
                            <circle
                                cx="50"
                                cy="50"
                                r="45"
                                :fill="item.color"
                                fill-opacity="0.4"
                                class="bubble-body"
                            />
                            <!-- Outer ring for glossy effect -->
                            <circle
                                cx="50"
                                cy="50"
                                r="45"
                                fill="none"
                                :stroke="item.color"
                                stroke-width="3"
                                stroke-opacity="0.6"
                            />
                            <!-- Main highlight -->
                            <ellipse
                                cx="35"
                                cy="30"
                                rx="15"
                                ry="20"
                                fill="rgba(255,255,255,0.6)"
                                class="bubble-highlight"
                            />
                            <!-- Secondary highlight -->
                            <ellipse
                                cx="65"
                                cy="65"
                                rx="8"
                                ry="12"
                                fill="rgba(255,255,255,0.3)"
                                class="bubble-highlight-small"
                            />
                        </svg>
                        <div
                            v-else-if="popGameAssets.popItemType === 'present'"
                            class="present-box"
                            :style="{ '--box-color': item.color }"
                        >
                            <div class="present-ribbon"></div>
                            <div class="present-bow"></div>
                        </div>
                        <div
                            v-else-if="popGameAssets.popItemType === 'egg'"
                            class="egg"
                            :style="{ background: item.color }"
                        >
                            <div class="egg-pattern"></div>
                        </div>
                    </div>

                    <!-- Popped state - show ticket number -->
                    <div
                        v-else
                        class="popped-result"
                        :class="{ 'is-winner': item.isWinner }"
                    >
                        <div class="ticket-number">{{ item.ticketNumber }}</div>
                        <div
                            v-if="item.isWinner && item.prize"
                            class="prize-amount"
                        >
                            {{ item.prize }}
                        </div>
                        <div
                            v-else
                            class="no-win-text"
                        >
                            NO WIN
                        </div>
                    </div>

                    <!-- Pop explosion effect -->
                    <div v-if="item.animating" class="pop-explosion">
                        <div
                            v-for="n in 8"
                            :key="n"
                            class="explosion-particle"
                            :style="{
                                '--rotation': (n * 45) + 'deg',
                                '--color': item.color
                            }"
                        ></div>
                    </div>
                </div>
            </div>

            <!-- Confetti -->
            <div class="confetti-container">
                <div
                    v-for="particle in confettiParticles"
                    :key="particle.id"
                    class="confetti-particle"
                    :style="{
                        left: particle.x + '%',
                        top: particle.y + '%',
                        backgroundColor: particle.color,
                        transform: `rotate(${particle.rotation}deg) scale(${particle.scale})`,
                    }"
                ></div>
            </div>
        </div>

        <!-- Pop All Button -->
        <div class="actions">
            <button
                v-if="!allPopped && displayedItems.some(i => !i.popped)"
                class="pop-all-btn"
                @click="popAll"
            >
                Pop All
            </button>
        </div>

        <!-- All popped message -->
        <div v-if="allPopped" class="all-popped-message">
            <h3>All Done!</h3>
            <p>You won a total of <strong>{{ totalWins.toFixed(2) }}</strong></p>
        </div>

        <!-- Win Toast -->
        <Transition name="toast">
            <div v-if="showWinToast" class="win-toast">
                <span class="toast-icon">+</span>
                <span class="toast-amount">{{ winToastAmount.toFixed(2) }}</span>
            </div>
        </Transition>

        <!-- Audio elements -->
        <audio
            v-if="popGameAssets.popSound"
            ref="popAudio"
            :src="popGameAssets.popSound"
            preload="auto"
        ></audio>
        <audio
            v-if="popGameAssets.winSound"
            ref="winAudio"
            :src="popGameAssets.winSound"
            preload="auto"
        ></audio>
        <audio
            v-if="popGameAssets.lossSound"
            ref="lossAudio"
            :src="popGameAssets.lossSound"
            preload="auto"
        ></audio>
    </div>
</template>

<style scoped>
.pop-game-board {
    --bg-color: #1a1a2e;
    --bg-image: none;
    --primary-color: #e94560;
    --accent-color: #ffd700;
    --win-color: #00ff88;
    --lose-color: #ff4444;

    width: 100%;
    height: 100%;
    display: flex;
    flex-direction: column;
    padding: 15px;
    overflow: hidden;
    background-color: transparent;
    position: relative;
    z-index: 1;
    min-height: 0; /* Allow flex children to shrink and scroll */
}

/* Header Stats */
.game-header {
    display: flex;
    justify-content: center;
    gap: 20px;
    margin-bottom: 15px;
    flex-shrink: 0;
}

.stat-card {
    display: flex;
    flex-direction: column;
    align-items: center;
    padding: 10px 20px;
    background: rgba(255, 255, 255, 0.1);
    border-radius: 12px;
    backdrop-filter: blur(10px);
    border: 1px solid rgba(255, 255, 255, 0.1);
}

.stat-label {
    font-size: 0.75rem;
    color: rgba(255, 255, 255, 0.7);
    text-transform: uppercase;
    letter-spacing: 1px;
}

.stat-value {
    font-size: 1.25rem;
    font-weight: 800;
    color: white;
}

.stat-value.win-value {
    color: var(--accent-color);
}

/* Game Grid */
.game-grid-container {
    flex: 1;
    overflow-y: auto;
    overflow-x: hidden;
    position: relative;
    padding: 10px;
    min-height: 0; /* Important for flex children to allow scrolling */
}

.game-grid {
    display: grid;
    grid-template-columns: repeat(6, 1fr);
    gap: 10px;
    justify-items: center;
}

.game-grid.mobile-grid {
    grid-template-columns: repeat(5, 1fr);
    gap: 8px;
}

/* Pop Item Container */
.pop-item-container {
    width: 100%;
    aspect-ratio: 1;
    max-width: 80px;
    cursor: pointer;
    position: relative;
    transition: transform 0.2s ease;
}

.pop-item-container:hover:not(.popped) {
    transform: scale(1.1);
}

.pop-item-container.animating {
    animation: popBurst 0.3s ease-out forwards;
}

@keyframes popBurst {
    0% { transform: scale(1); }
    50% { transform: scale(1.3); }
    100% { transform: scale(0); opacity: 0; }
}

/* Pop Item (Unpopped) */
.pop-item {
    width: 100%;
    height: 100%;
    display: flex;
    align-items: center;
    justify-content: center;
    animation: float 3s ease-in-out infinite;
    animation-delay: var(--float-delay, 0s);
}

@keyframes float {
    0%, 100% { transform: translateY(0) rotate(-2deg); }
    50% { transform: translateY(-8px) rotate(2deg); }
}

/* Balloon SVG */
.balloon-svg {
    width: 100%;
    height: 100%;
    filter: drop-shadow(0 4px 8px rgba(0, 0, 0, 0.3));
    transition: filter 0.2s ease;
}

.pop-item-container:hover .balloon-svg {
    filter: drop-shadow(0 6px 12px rgba(0, 0, 0, 0.4));
}

.balloon-body {
    transition: fill 0.2s ease;
}

.balloon-string {
    animation: stringWiggle 2s ease-in-out infinite;
}

/* Bubble SVG */
.bubble-svg {
    width: 80%;
    height: 80%;
    filter: drop-shadow(0 4px 12px rgba(0, 0, 0, 0.2));
    transition: filter 0.2s ease;
    animation: bubbleFloat 4s ease-in-out infinite;
}

.pop-item-container:hover .bubble-svg {
    filter: drop-shadow(0 6px 16px rgba(0, 0, 0, 0.3));
}

.bubble-body {
    transition: fill-opacity 0.3s ease;
}

.bubble-highlight {
    animation: shimmer 3s ease-in-out infinite;
}

@keyframes bubbleFloat {
    0%, 100% { 
        transform: translateY(0) scale(1);
    }
    25% {
        transform: translateY(-5px) scale(1.02);
    }
    50% { 
        transform: translateY(-10px) scale(1);
    }
    75% {
        transform: translateY(-5px) scale(0.98);
    }
}

@keyframes shimmer {
    0%, 100% { opacity: 0.6; }
    50% { opacity: 0.9; }
}

@keyframes stringWiggle {
    0%, 100% { d: path("M50 115 Q45 125 50 135 Q55 145 50 150"); }
    50% { d: path("M50 115 Q55 125 50 135 Q45 145 50 150"); }
}

/* Present Box */
.present-box {
    width: 80%;
    height: 70%;
    background: var(--box-color);
    border-radius: 8px;
    position: relative;
    box-shadow: 0 4px 8px rgba(0, 0, 0, 0.3);
}

.present-ribbon {
    position: absolute;
    top: 0;
    left: 50%;
    transform: translateX(-50%);
    width: 20%;
    height: 100%;
    background: rgba(255, 255, 255, 0.3);
}

.present-bow {
    position: absolute;
    top: -15%;
    left: 50%;
    transform: translateX(-50%);
    width: 40%;
    height: 30%;
    background: rgba(255, 255, 255, 0.4);
    border-radius: 50%;
}

/* Egg */
.egg {
    width: 70%;
    height: 90%;
    border-radius: 50% 50% 50% 50% / 60% 60% 40% 40%;
    position: relative;
    box-shadow: 0 4px 8px rgba(0, 0, 0, 0.3);
}

.egg-pattern {
    position: absolute;
    top: 30%;
    left: 10%;
    right: 10%;
    height: 20%;
    background: repeating-linear-gradient(
        90deg,
        rgba(255, 255, 255, 0.3) 0px,
        rgba(255, 255, 255, 0.3) 5px,
        transparent 5px,
        transparent 10px
    );
}

/* Custom Item Image */
.custom-item-image {
    width: 100%;
    height: 100%;
    object-fit: contain;
    filter: drop-shadow(0 4px 8px rgba(0, 0, 0, 0.3));
}

/* Popped Result */
.popped-result {
    width: 100%;
    height: 100%;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    background: transparent;
    padding: 5px;
    animation: revealResult 0.3s ease-out;
}

@keyframes revealResult {
    0% { transform: scale(0); opacity: 0; }
    100% { transform: scale(1); opacity: 1; }
}

.popped-result.is-winner {
    background: transparent;
}

.ticket-number {
    font-size: 0.6rem;
    font-weight: 700;
    color: white;
    text-align: center;
    word-break: break-all;
    text-shadow: 0 1px 3px rgba(0, 0, 0, 0.8), 0 0 6px rgba(0, 0, 0, 0.5);
}

.prize-amount {
    font-size: 0.7rem;
    font-weight: 800;
    color: var(--win-color);
    margin-top: 2px;
    text-shadow: 0 1px 3px rgba(0, 0, 0, 0.8), 0 0 6px rgba(0, 0, 0, 0.5);
}

.pop-item-container.loser .ticket-number {
    color: rgba(255, 255, 255, 0.7);
}

.no-win-text {
    font-size: 0.55rem;
    font-weight: 700;
    color: var(--lose-color);
    text-transform: uppercase;
    letter-spacing: 0.5px;
    margin-top: 2px;
    text-shadow: 0 1px 3px rgba(0, 0, 0, 0.8), 0 0 6px rgba(0, 0, 0, 0.5);
}

/* Pop Explosion */
.pop-explosion {
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
    width: 100%;
    height: 100%;
    pointer-events: none;
}

.explosion-particle {
    position: absolute;
    top: 50%;
    left: 50%;
    width: 8px;
    height: 8px;
    background: var(--color);
    border-radius: 50%;
    animation: explode 0.4s ease-out forwards;
    transform-origin: center center;
}

@keyframes explode {
    0% {
        transform: translate(-50%, -50%) rotate(var(--rotation)) translateY(0);
        opacity: 1;
    }
    100% {
        transform: translate(-50%, -50%) rotate(var(--rotation)) translateY(50px);
        opacity: 0;
    }
}

/* Confetti */
.confetti-container {
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    pointer-events: none;
    overflow: hidden;
}

.confetti-particle {
    position: absolute;
    width: 10px;
    height: 10px;
    animation: confettiFall 2s ease-out forwards;
}

@keyframes confettiFall {
    0% {
        opacity: 1;
        transform: translateY(0) rotate(0deg);
    }
    100% {
        opacity: 0;
        transform: translateY(200px) rotate(720deg);
    }
}

/* Actions */
.actions {
    display: flex;
    justify-content: center;
    margin-top: 15px;
    flex-shrink: 0;
}

.pop-all-btn {
    padding: 12px 30px;
    background: linear-gradient(135deg, var(--accent-color) 0%, #ffa500 100%);
    color: #1a1a2e;
    border: none;
    border-radius: 30px;
    font-weight: 800;
    font-size: 1rem;
    cursor: pointer;
    transition: all 0.3s ease;
    text-transform: uppercase;
    letter-spacing: 1px;
}

.pop-all-btn:hover {
    transform: scale(1.05);
    box-shadow: 0 6px 20px rgba(255, 215, 0, 0.4);
}

/* All Popped Message */
.all-popped-message {
    text-align: center;
    padding: 20px;
    margin-top: 15px;
    background: rgba(255, 255, 255, 0.1);
    border-radius: 15px;
    backdrop-filter: blur(10px);
    flex-shrink: 0;
}

.all-popped-message h3 {
    color: var(--accent-color);
    font-size: 1.5rem;
    margin: 0 0 10px 0;
}

.all-popped-message p {
    color: white;
    margin: 0;
}

.all-popped-message strong {
    color: var(--win-color);
    font-size: 1.2rem;
}

/* Win Toast */
.win-toast {
    position: fixed;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
    background: linear-gradient(135deg, var(--win-color) 0%, #00cc6a 100%);
    color: white;
    padding: 20px 40px;
    border-radius: 20px;
    font-size: 2rem;
    font-weight: 900;
    display: flex;
    align-items: center;
    gap: 10px;
    box-shadow: 0 10px 40px rgba(0, 255, 136, 0.5);
    z-index: 100;
}

.toast-icon {
    font-size: 2.5rem;
}

.toast-enter-active {
    animation: toastIn 0.3s cubic-bezier(0.34, 1.56, 0.64, 1);
}

.toast-leave-active {
    animation: toastOut 0.3s ease-in forwards;
}

@keyframes toastIn {
    0% {
        transform: translate(-50%, -50%) scale(0);
        opacity: 0;
    }
    100% {
        transform: translate(-50%, -50%) scale(1);
        opacity: 1;
    }
}

@keyframes toastOut {
    0% {
        transform: translate(-50%, -50%) scale(1);
        opacity: 1;
    }
    100% {
        transform: translate(-50%, -50%) scale(0);
        opacity: 0;
    }
}

/* Responsive */
@media (max-width: 400px) {
    .game-grid.mobile-grid {
        grid-template-columns: repeat(4, 1fr);
    }

    .pop-item-container {
        max-width: 70px;
    }

    .ticket-number {
        font-size: 0.5rem;
    }

    .prize-amount {
        font-size: 0.6rem;
    }
}
</style>
