<script setup lang="ts">
import { ref, computed, onMounted, watch } from 'vue';
import SlotsReels from './SlotsReels.vue';
import SlotsControlPanel from './SlotsControlPanel.vue';
import SlotsInventoryModal from './SlotsInventoryModal.vue';

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

interface SlotsAssets {
    titleText: string;
    titleColor: string;
    titleImage?: string;
    spinButtonImage?: string;
    machineImage: string;
    footerImage: string;
    background: string;
    header: string;
    primaryColor?: string;
    secondaryColor?: string;
    accentColor?: string;
    textColor?: string;
    theme?: string;
    welcomeSound?: string;
    spinSound?: string;
    winSound?: string;
    lossSound?: string;
    machineBgColor?: string;
    inventoryEmoji?: string;
    inventoryButtonColor?: string;
    matchTextColor?: string;
    prizesModalBgColor?: string;
    prizesTitleColor?: string;
    prizesCardBorderColor?: string;
    prizesCardBgColor?: string;
    prizesValueColor?: string;
    walletText?: string;
    walletColor?: string;
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

const props = defineProps<{
    demoMode?: boolean;
    previewMode?: 'mobile' | 'desktop';
    slotsAssets: SlotsAssets;
    tickets?: Ticket[];
    playedTickets?: number[];
    instant_win_categories?: InstantWinCategory[];
    animateTitle?: boolean;
    showMachine?: boolean;
}>();

const emit = defineEmits<{
    'ticket-played': [ticketId: number];
    'prize-won': [prize: Prize];
}>();

const isSpinning = ref(false);
const winCounter = ref(0);
const showInventory = ref(false);
const availablePrizes = ref<Prize[]>([]);
const wonPrizes = ref<Prize[]>([]);
const currentWinningPrize = ref<Prize | null>(null);
const lastWin = ref(0);

// Audio refs for sound effects
const spinSound = ref<HTMLAudioElement | null>(null);
const winSound = ref<HTMLAudioElement | null>(null);
const lossSound = ref<HTMLAudioElement | null>(null);

// Web Audio API for sound effects
let audioCtx: AudioContext | null = null;

function initAudio() {
    if (!audioCtx) {
        audioCtx = new (window.AudioContext || (window as any).webkitAudioContext)();
    }
}

function playWin() {
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

function playBigWin() {
    initAudio();
    if (!audioCtx) return;
    const notes = [523, 587, 659, 784, 880, 988, 1047, 1319];
    notes.forEach((freq, i) => {
        setTimeout(() => {
            const osc = audioCtx!.createOscillator();
            const gain = audioCtx!.createGain();
            osc.connect(gain);
            gain.connect(audioCtx!.destination);
            osc.frequency.value = freq;
            osc.type = 'sine';
            gain.gain.setValueAtTime(0.35, audioCtx!.currentTime);
            gain.gain.exponentialRampToValueAtTime(0.01, audioCtx!.currentTime + 0.35);
            osc.start();
            osc.stop(audioCtx!.currentTime + 0.35);
        }, i * 80);
    });
}

const spinsLeft = computed(() => {
    if (props.demoMode) {
        return 9;
    }
    if (!props.tickets) {
        return 0;
    }
    return props.tickets.length - (props.playedTickets?.length || 0);
});

const jackpot = computed(() => {
    if (props.demoMode) {
        return { value: 10000, name: 'MEGA JACKPOT' };
    }
    if (availablePrizes.value.length === 0) {
        return { value: 0, name: 'NO PRIZE' };
    }
    const highestPrize = availablePrizes.value.reduce((max, prize) =>
        prize.value > max.value ? prize : max
    );
    return { value: highestPrize.value, name: highestPrize.name };
});

const canSpin = computed(() => spinsLeft.value > 0 && !isSpinning.value);

const nextTicketNumber = computed(() => {
    if (props.demoMode) {
        return 'DEMO';
    }
    const nextTicket = getNextTicket();
    return nextTicket ? nextTicket.number : null;
});

const isMobile = computed(() => props.previewMode === 'mobile');

const titleStyle = computed(() => ({
    color: props.slotsAssets.titleColor,
    textShadow: `0 0 10px ${props.slotsAssets.titleColor}, 0 0 20px ${props.slotsAssets.titleColor}`,
}));

const titleClasses = computed(() => {
    const baseClasses = 'font-black uppercase tracking-widest drop-shadow-lg text-center';
    return isMobile.value
        ? `${baseClasses} text-2xl`
        : `${baseClasses} text-4xl animate-pulse`;
});

// Extract available prizes from instant_win_categories (passed from backend)
const extractPrizesFromTickets = (): Prize[] => {
    // First, try to use instant_win_categories if available
    if (props.instant_win_categories && props.instant_win_categories.length > 0) {
        return props.instant_win_categories.map(cat => ({
            id: cat.id,
            name: cat.name,
            image: cat.image_path,
            value: cat.value,
        }));
    }

    // Fallback: try to extract from winning tickets
    if (!props.tickets || props.tickets.length === 0) {
        return generateDemoPrizes();
    }

    // Get unique instant win prizes from tickets
    // Use category_id as the key (not instantWin.id which is unique per ticket)
    const uniquePrizes = new Map<number, Prize>();

    props.tickets.forEach((ticket) => {
        if (ticket.instant_win && ticket.instant_win !== false) {
            const instantWin = ticket.instant_win;
            const categoryId = instantWin.category_id;

            if (categoryId && !uniquePrizes.has(categoryId)) {
                uniquePrizes.set(categoryId, {
                    id: categoryId,
                    name: instantWin.name || instantWin.prize,
                    image: instantWin.image_path || '',
                    value: parseFloat(String(instantWin.value)) || 0,
                });
            }
        }
    });

    const prizesArray = Array.from(uniquePrizes.values());
    const prizesWithImages = prizesArray.filter(p => p.image && p.image.trim() !== '');

    if (prizesWithImages.length > 0) {
        return prizesWithImages;
    }

    if (prizesArray.length > 0) {
        return prizesArray;
    }

    return generateDemoPrizes();
};

const generateDemoPrizes = (): Prize[] => {
    // Generate emoji-based prizes for demo mode
    const emojiPrizes = [
        { emoji: '💎', name: 'Diamond', value: 1000 },
        { emoji: '🍒', name: 'Cherry', value: 100 },
        { emoji: '⭐', name: 'Star', value: 250 },
        { emoji: '7️⃣', name: 'Lucky Seven', value: 777 },
        { emoji: '🔔', name: 'Bell', value: 300 },
        { emoji: '🍋', name: 'Lemon', value: 150 },
        { emoji: '🍊', name: 'Orange', value: 200 },
        { emoji: '🍉', name: 'Watermelon', value: 350 },
        { emoji: '🍇', name: 'Grapes', value: 180 },
        { emoji: '💰', name: 'Money Bag', value: 500 },
        { emoji: '🎰', name: 'Jackpot', value: 5000 },
        { emoji: '🍓', name: 'Strawberry', value: 220 },
    ];

    return emojiPrizes.map((prize, index) => ({
        id: index + 1,
        name: prize.name,
        // Use SVG data URL to render emoji as image
        image: `data:image/svg+xml,${encodeURIComponent(`<svg xmlns="http://www.w3.org/2000/svg" width="100" height="100"><text x="50%" y="50%" text-anchor="middle" dominant-baseline="central" font-size="60">${prize.emoji}</text></svg>`)}`,
        value: prize.value
    }));
};

const getNextTicket = (): Ticket | null => {
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

    // Play spin sound
    if (spinSound.value) {
        spinSound.value.currentTime = 0;
        spinSound.value.play().catch(() => {});
    }

    const currentTicket = getNextTicket();

    if (props.demoMode) {
        // Demo mode - random win
        const isWinner = Math.random() > 0.5;
        if (isWinner) {
            const demoPrizes = generateDemoPrizes();
            const randomPrize = demoPrizes[Math.floor(Math.random() * demoPrizes.length)];
            currentWinningPrize.value = randomPrize;
        }
    } else if (currentTicket) {
        // Check if this ticket is a winner (instant_win is pre-determined by backend)
        const instantWinData = currentTicket.instant_win;
        const hasInstantWin = instantWinData !== false && instantWinData !== null;
        const prizeText = hasInstantWin ? (instantWinData as InstantWin).prize : null;
        const isWinner = hasInstantWin && prizeText !== 'NO WIN';

        if (isWinner && hasInstantWin) {
            const instantWin = instantWinData as InstantWin;

            // Try to match by category_id first (for proper image display)
            let matchingPrize = availablePrizes.value.find(
                p => p.id === instantWin.category_id
            );

            // If no match found, create prize directly from instant_win data
            if (!matchingPrize) {
                matchingPrize = {
                    id: instantWin.category_id || instantWin.id,
                    name: instantWin.prize || 'Winner!',
                    image: instantWin.image_path || '',
                    value: parseFloat(String(instantWin.value)) || 0,
                };
            }

            currentWinningPrize.value = matchingPrize;
        }

        // Emit ticket-played event
        emit('ticket-played', currentTicket.id);
    } else {
        // No tickets left
        isSpinning.value = false;
        return;
    }
};

const handleSpinComplete = () => {
    // Check if it was a win
    if (currentWinningPrize.value) {
        // Get the ticket number that was just played
        const playedTickets = props.playedTickets || [];
        const lastPlayedTicketId = playedTickets[playedTickets.length - 1];
        const ticket = props.tickets?.find(t => t.id === lastPlayedTicketId);
        const ticketNumber = ticket?.number || 'UNKNOWN';

        // Calculate win amount
        const winAmount = currentWinningPrize.value.value;
        lastWin.value = winAmount;

        // Add to won prizes with ticket number
        const prizeWithTicket = {
            ...currentWinningPrize.value,
            ticketNumber
        };

        wonPrizes.value.push(prizeWithTicket);

        // Increment win counter
        winCounter.value++;

        // Emit prize-won event with full prize object
        emit('prize-won', currentWinningPrize.value);

        // Play win sound - use custom sound if available, otherwise use generated sound
        if (winSound.value && props.slotsAssets.winSound) {
            winSound.value.currentTime = 0;
            winSound.value.play().catch(() => {});
        } else if (winAmount >= 100) {
            playBigWin();
        } else {
            playWin();
        }

        // Highlight winners in reels
        setTimeout(() => {
            highlightWinners();
        }, 100);
    } else {
        lastWin.value = 0;

        // Play loss sound - use custom sound if available
        if (lossSound.value && props.slotsAssets.lossSound) {
            lossSound.value.currentTime = 0;
            lossSound.value.play().catch(() => {});
        }
    }

    // Reset spinning state immediately (no delay)
    isSpinning.value = false;

    // Keep winning prize visible for 3 seconds, then clear
    if (currentWinningPrize.value) {
        setTimeout(() => {
            currentWinningPrize.value = null;
        }, 3000);
    }
};

function highlightWinners() {
    // Highlight middle symbol of each reel
    for (let i = 1; i <= 3; i++) {
        const reel = document.querySelector(`#reel${i} .reel-inner`);
        if (reel) {
            const symbols = reel.querySelectorAll('.symbol');
            if (symbols[1]) {
                symbols[1].classList.add('winner');
            }
        }
    }
}

const handleOpenWins = () => {
    // Could open a wins modal here
};

const handleOpenInventory = () => {
    showInventory.value = true;
};

// Watch for tickets changes
watch(() => props.tickets, () => {
    if (props.tickets && props.tickets.length > 0) {
        availablePrizes.value = extractPrizesFromTickets();
    }
}, { immediate: true });

onMounted(() => {
    // Extract prizes from tickets (like Scratchy does)
    availablePrizes.value = extractPrizesFromTickets();
});
</script>

<template>
    <div :class="['flex-1 flex flex-col relative', demoMode ? '' : 'overflow-hidden']">
        <!-- Reels Container - Takes entire space -->
        <SlotsReels
            :isSpinning="isSpinning"
            :prizes="availablePrizes"
            :winningPrize="currentWinningPrize"
            :demoMode="props.demoMode"
            :previewMode="props.previewMode"
            :canSpin="canSpin"
            :colors="{
                primary: slotsAssets.primaryColor || '#00CED1',
                secondary: slotsAssets.secondaryColor || '#1a5a7a',
                accent: slotsAssets.accentColor || '#00FFFF',
                text: slotsAssets.textColor || '#FFFFFF'
            }"
            :spinsLeft="spinsLeft"
            :lastWin="lastWin"
            :spinButtonImage="slotsAssets.spinButtonImage"
            :titleImage="slotsAssets.titleImage"
            :titleText="slotsAssets.titleText"
            :titleColor="slotsAssets.titleColor"
            :background="slotsAssets.background"
            :animateTitle="props.animateTitle"
            :showMachine="props.showMachine"
            :machineBgColor="slotsAssets.machineBgColor"
            :inventoryEmoji="slotsAssets.inventoryEmoji"
            :inventoryButtonColor="slotsAssets.inventoryButtonColor"
            :matchTextColor="slotsAssets.matchTextColor"
            :prizesModalBgColor="slotsAssets.prizesModalBgColor"
            :prizesTitleColor="slotsAssets.prizesTitleColor"
            :prizesCardBorderColor="slotsAssets.prizesCardBorderColor"
            :prizesCardBgColor="slotsAssets.prizesCardBgColor"
            :prizesValueColor="slotsAssets.prizesValueColor"
            :walletText="slotsAssets.walletText"
            :walletColor="slotsAssets.walletColor"
            @spin-complete="handleSpinComplete"
            @spin="handleSpin"
        />

        <!-- Stats Info Panel (Hidden - moved into SlotsReels) -->
        <div
            class="hidden absolute bottom-0 left-0 right-0 z-20 border-t-4 px-4 py-4 shadow-2xl"
            :style="{
                background: 'linear-gradient(to top, rgba(101, 67, 33, 0.95), rgba(101, 67, 33, 0.85), transparent)',
                borderColor: '#DAA520',
                boxShadow: '0 -10px 40px rgba(218,165,32,0.4), inset 0 2px 10px rgba(255,255,255,0.1)'
            }"
        >
            <div class="max-w-4xl mx-auto flex items-center justify-between gap-4">
                <!-- Spins Left with pulse -->
                <div class="flex flex-col items-center transform transition-all duration-300 hover:scale-110">
                    <span class="text-xs sm:text-sm font-bold uppercase tracking-wide" :style="{ color: '#DAA520' }">Spins</span>
                    <span
                        class="text-2xl sm:text-3xl font-black transition-all duration-300"
                        :style="{
                            color: slotsAssets.primaryColor,
                            textShadow: `0 0 20px ${slotsAssets.primaryColor}, 0 4px 12px ${slotsAssets.primaryColor}60`
                        }"
                    >
                        {{ spinsLeft }}
                    </span>
                </div>

                <!-- Wins Counter with celebrate on change -->
                <div class="flex flex-col items-center transform transition-all duration-300 hover:scale-110">
                    <span class="text-xs sm:text-sm font-bold uppercase tracking-wide" :style="{ color: '#DAA520' }">Wins</span>
                    <span
                        class="text-2xl sm:text-3xl font-black transition-all duration-300"
                        :style="{
                            color: slotsAssets.accentColor,
                            textShadow: `0 0 20px ${slotsAssets.accentColor}, 0 4px 12px ${slotsAssets.accentColor}60`
                        }"
                    >
                        {{ winCounter }}
                    </span>
                </div>

                <!-- Jackpot with shimmer -->
                <div class="flex flex-col items-center flex-1 relative overflow-hidden rounded-lg p-2 transform transition-all duration-300 hover:scale-105">
                    <span class="text-xs sm:text-sm font-bold uppercase tracking-wide" :style="{ color: '#DAA520' }">Top Prize</span>
                    <span
                        class="text-xl sm:text-2xl font-black relative z-10"
                        :style="{
                            background: `linear-gradient(135deg, ${slotsAssets.primaryColor}, ${slotsAssets.accentColor}, ${slotsAssets.primaryColor})`,
                            backgroundSize: '200% 100%',
                            WebkitBackgroundClip: 'text',
                            WebkitTextFillColor: 'transparent',
                            animation: 'shimmer 3s ease-in-out infinite'
                        }"
                    >
                        £{{ jackpot.value.toLocaleString() }}
                    </span>
                </div>

                <!-- Inventory Button with badge -->
                <button
                    @click="handleOpenInventory"
                    class="relative flex flex-col items-center justify-center px-4 py-2 rounded-xl transition-all duration-300 hover:scale-110 active:scale-95 shadow-lg"
                    :style="{
                        background: `linear-gradient(135deg, ${slotsAssets.primaryColor}30, ${slotsAssets.accentColor}30)`,
                        color: slotsAssets.primaryColor,
                        border: `2px solid ${slotsAssets.primaryColor}`,
                        boxShadow: `0 0 20px ${slotsAssets.primaryColor}40`
                    }"
                >
                    <!-- Badge counter -->
                    <span
                        v-if="wonPrizes.length > 0"
                        class="absolute -top-2 -right-2 w-6 h-6 rounded-full flex items-center justify-center text-xs font-black text-white shadow-lg"
                        :style="{
                            background: `linear-gradient(135deg, ${slotsAssets.accentColor}, ${slotsAssets.primaryColor})`
                        }"
                    >
                        {{ wonPrizes.length }}
                    </span>

                    <svg class="w-6 h-6 sm:w-7 sm:h-7" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2.5" d="M20 7l-8-4-8 4m16 0l-8 4m8-4v10l-8 4m0-10L4 7m8 4v10M4 7v10l8 4" />
                    </svg>
                    <span class="text-xs font-black mt-1">PRIZES</span>
                </button>
            </div>
        </div>

        <!-- Inventory Modal -->
        <SlotsInventoryModal
            v-model="showInventory"
            :wonPrizes="wonPrizes"
            :availablePrizes="availablePrizes"
            :slotsAssets="slotsAssets"
        />

        <!-- Audio Elements for Sound Effects -->
        <audio v-if="slotsAssets.spinSound" ref="spinSound" :src="slotsAssets.spinSound" preload="auto"></audio>
        <audio v-if="slotsAssets.winSound" ref="winSound" :src="slotsAssets.winSound" preload="auto"></audio>
        <audio v-if="slotsAssets.lossSound" ref="lossSound" :src="slotsAssets.lossSound" preload="auto"></audio>
    </div>
</template>

<style scoped>
@keyframes pulse {
    0%, 100% {
        opacity: 1;
        transform: scale(1);
    }
    50% {
        opacity: 0.8;
        transform: scale(1.05);
    }
}

.animate-pulse {
    animation: pulse 2s cubic-bezier(0.4, 0, 0.6, 1) infinite;
}

@keyframes shimmer {
    0% {
        background-position: 0% 50%;
    }
    50% {
        background-position: 100% 50%;
    }
    100% {
        background-position: 0% 50%;
    }
}
</style>