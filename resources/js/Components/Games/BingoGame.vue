<script setup lang="ts">
import { ref, computed, onMounted, nextTick } from 'vue';
import gsap from 'gsap';
import confetti from 'canvas-confetti';

interface Assets {
    background?: string;
    header?: string;
    cardCover?: string;
    diamondEmoji?: string;
    // Theme colors
    bgStart?: string;
    bgEnd?: string;
    frameColor?: string;
    frameGlow?: string;
    squareBg?: string;
    squareText?: string;
    diamond1?: string;
    diamond2?: string;
    winnerGlow?: string;
    winnerBg?: string;
    popupStart?: string;
    popupEnd?: string;
    // Sounds
    revealSound?: string;
    winSound?: string;
    lossSound?: string;
    // Pattern rules
    patternRules?: PatternRule[];
}

interface PatternRule {
    from: number;
    to: number;
    pattern: number;
}

interface InstantWin {
    id: number;
    name: string;
    prize: string;
    value: number;
    claimed: boolean;
    image_path: string | null;
    category_id: number;
}

interface Ticket {
    id: number;
    number: string;
    competition_id: number;
    instant_win: InstantWin | false;
}

interface Prize {
    id: number;
    name: string;
    image: string;
    value: number;
}

interface Props {
    assets: Assets;
    prizes: Prize[];
    tickets: Ticket[];
    demoMode?: boolean;
    previewMode?: 'mobile' | 'desktop';
}

const props = withDefaults(defineProps<Props>(), {
    demoMode: false,
    previewMode: 'mobile',
});

const emit = defineEmits<{
    'ticket-played': [ticketId: number];
}>();

// Winning patterns for 3x3 grid (indexes 0-8)
const WINNING_PATTERNS = [
    [0, 1, 2], // 0: Top row
    [3, 4, 5], // 1: Middle row
    [6, 7, 8], // 2: Bottom row
    [0, 3, 6], // 3: Left column
    [1, 4, 7], // 4: Middle column
    [2, 5, 8], // 5: Right column
    [0, 4, 8], // 6: Diagonal TL-BR
    [2, 4, 6], // 7: Diagonal TR-BL
    [0, 2, 4, 6, 8], // 8: Cross Pattern (5 squares)
    [0, 1, 2, 3, 4, 5, 6, 7, 8] // 9: Full House (all 9)
];

// Full house cascade order (spiral inward)
const FULL_HOUSE_CASCADE_ORDER = [0, 1, 2, 5, 8, 7, 6, 3, 4];

// Card state for each ticket
interface CardState {
    ticket: Ticket;
    numbers: number[];
    diamondPositions: number[];
    revealed: boolean;
    isWinner: boolean;
    prizeValue: number;
    revealedSquares: Set<number>;
    animating: boolean;
}

const cards = ref<CardState[]>([]);
const totalWinnings = ref(0);
const totalPrizes = ref(0);
const showPopup = ref(false);
const popupPrize = ref<{ value: number; isFullHouse: boolean } | null>(null);
const processedTickets = ref<Set<number>>(new Set());
const modalContentRef = ref<HTMLElement | null>(null);

// Default colors
const colors = computed(() => ({
    bgStart: props.assets.bgStart || '#1e3a8a',
    bgEnd: props.assets.bgEnd || '#1e40af',
    frameColor: props.assets.frameColor || '#3b82f6',
    frameGlow: props.assets.frameGlow || '#60a5fa',
    squareBg: props.assets.squareBg || '#374151',
    squareText: props.assets.squareText || '#e5e7eb',
    diamond1: props.assets.diamond1 || '#06b6d4',
    diamond2: props.assets.diamond2 || '#67e8f9',
    winnerGlow: props.assets.winnerGlow || '#10b981',
    winnerBg: props.assets.winnerBg || '#059669',
    popupStart: props.assets.popupStart || '#10b981',
    popupEnd: props.assets.popupEnd || '#059669',
}));

const diamondEmoji = computed(() => props.assets.diamondEmoji || '💎');

// Generate random numbers for a card (just for display)
const generateCardNumbers = (): number[] => {
    const numbers: number[] = [];
    const used = new Set<number>();
    while (numbers.length < 9) {
        const num = Math.floor(Math.random() * 90) + 1;
        if (!used.has(num)) {
            used.add(num);
            numbers.push(num);
        }
    }
    return numbers;
};

// Generate diamond positions for losers (no winning pattern)
const generateLoserDiamonds = (): number[] => {
    const safePatterns = [
        [0, 4, 6], [1, 3, 8], [2, 4, 7], [0, 5, 7], [1, 6, 8]
    ];

    // Try random positions
    for (let attempt = 0; attempt < 100; attempt++) {
        const positions: number[] = [];
        while (positions.length < 3) {
            const pos = Math.floor(Math.random() * 9);
            if (!positions.includes(pos)) positions.push(pos);
        }

        // Check if forms any winning pattern
        const formsLine = WINNING_PATTERNS.some(pattern =>
            pattern.every(pos => positions.includes(pos))
        );

        if (!formsLine) return positions;
    }

    return safePatterns[Math.floor(Math.random() * safePatterns.length)];
};

// Generate diamond positions for winners based on pattern rules
const generateWinnerDiamonds = (prizeValue: number): number[] => {
    let patternIndex = -1;

    // Check pattern rules
    if (props.assets.patternRules && props.assets.patternRules.length > 0) {
        for (const rule of props.assets.patternRules) {
            if (prizeValue >= rule.from && prizeValue <= rule.to) {
                patternIndex = rule.pattern;
                break;
            }
        }
    }

    // Random pattern if no rule matched
    if (patternIndex === -1) {
        patternIndex = Math.floor(Math.random() * WINNING_PATTERNS.length);
    }

    // Validate
    if (patternIndex < 0 || patternIndex >= WINNING_PATTERNS.length) {
        patternIndex = Math.floor(Math.random() * WINNING_PATTERNS.length);
    }

    return [...WINNING_PATTERNS[patternIndex]];
};

// Initialize cards from tickets
const initializeCards = () => {
    if (props.demoMode) {
        // Demo mode: create sample cards
        cards.value = [
            {
                ticket: { id: 1, number: '001', competition_id: 1, instant_win: false },
                numbers: generateCardNumbers(),
                diamondPositions: generateLoserDiamonds(),
                revealed: false,
                isWinner: false,
                prizeValue: 0,
                revealedSquares: new Set(),
                animating: false,
            },
            {
                ticket: { id: 2, number: '002', competition_id: 1, instant_win: { id: 1, name: 'Demo Prize', prize: '£25.00', value: 25, claimed: false, image_path: null, category_id: 1 } },
                numbers: generateCardNumbers(),
                diamondPositions: generateWinnerDiamonds(25),
                revealed: false,
                isWinner: true,
                prizeValue: 25,
                revealedSquares: new Set(),
                animating: false,
            },
            {
                ticket: { id: 3, number: '003', competition_id: 1, instant_win: false },
                numbers: generateCardNumbers(),
                diamondPositions: generateLoserDiamonds(),
                revealed: false,
                isWinner: false,
                prizeValue: 0,
                revealedSquares: new Set(),
                animating: false,
            },
            {
                ticket: { id: 4, number: '004', competition_id: 1, instant_win: { id: 2, name: 'Big Prize', prize: '£100.00', value: 100, claimed: false, image_path: null, category_id: 2 } },
                numbers: generateCardNumbers(),
                diamondPositions: [0, 1, 2, 3, 4, 5, 6, 7, 8], // Full house demo
                revealed: false,
                isWinner: true,
                prizeValue: 100,
                revealedSquares: new Set(),
                animating: false,
            },
            {
                ticket: { id: 5, number: '005', competition_id: 1, instant_win: false },
                numbers: generateCardNumbers(),
                diamondPositions: generateLoserDiamonds(),
                revealed: false,
                isWinner: false,
                prizeValue: 0,
                revealedSquares: new Set(),
                animating: false,
            },
            {
                ticket: { id: 6, number: '006', competition_id: 1, instant_win: false },
                numbers: generateCardNumbers(),
                diamondPositions: generateLoserDiamonds(),
                revealed: false,
                isWinner: false,
                prizeValue: 0,
                revealedSquares: new Set(),
                animating: false,
            },
        ];
    } else {
        // Real mode: create cards from tickets
        cards.value = props.tickets.map(ticket => {
            const isWinner = ticket.instant_win !== false;
            const prizeValue = isWinner ? Number((ticket.instant_win as InstantWin).value) || 0 : 0;

            return {
                ticket,
                numbers: generateCardNumbers(),
                diamondPositions: isWinner
                    ? generateWinnerDiamonds(prizeValue)
                    : generateLoserDiamonds(),
                revealed: false,
                isWinner,
                prizeValue,
                revealedSquares: new Set(),
                animating: false,
            };
        });

        // Shuffle cards
        cards.value.sort(() => Math.random() - 0.5);
    }
};

// Shuffle array helper
const shuffleArray = <T>(array: T[]): T[] => {
    const shuffled = [...array];
    for (let i = shuffled.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [shuffled[i], shuffled[j]] = [shuffled[j], shuffled[i]];
    }
    return shuffled;
};

// Fire confetti effect
const fireConfetti = (particleCount: number = 150, spread: number = 80) => {
    const rect = modalContentRef.value?.getBoundingClientRect();
    if (!rect) {
        confetti({
            particleCount,
            spread,
            origin: { y: 0.6 },
            gravity: 1.2,
            ticks: 200,
            decay: 0.94,
        });
        return;
    }

    const centerX = (rect.left + rect.width / 2) / window.innerWidth;
    const centerY = (rect.top + rect.height / 2) / window.innerHeight;

    confetti({
        particleCount,
        spread,
        origin: { x: centerX, y: centerY },
        colors: [colors.value.winnerGlow, colors.value.winnerBg, '#ffd700', '#fff'],
        zIndex: 100000,
        gravity: 1.2,
        ticks: 200,
        decay: 0.94,
    });
};

// Animate total winnings counter
const animateTotalWinnings = (newValue: number) => {
    const startValue = totalWinnings.value;
    gsap.to({ value: startValue }, {
        value: newValue,
        duration: 1,
        ease: 'power2.out',
        onUpdate: function() {
            totalWinnings.value = Math.round(this.targets()[0].value * 100) / 100;
        }
    });
};

// Show win popup with animation
const showWinPopup = (value: number, isFullHouse: boolean) => {
    popupPrize.value = { value, isFullHouse };
    showPopup.value = true;

    nextTick(() => {
        const popup = document.querySelector('.win-popup-content');
        if (popup) {
            gsap.fromTo(popup,
                { scale: 0, opacity: 0, rotateX: -45 },
                {
                    scale: 1,
                    opacity: 1,
                    rotateX: 0,
                    duration: 0.4,
                    ease: 'back.out(1.7)',
                    onComplete: () => {
                        // Pulse effect
                        gsap.to(popup, {
                            scale: 1.1,
                            duration: 0.2,
                            yoyo: true,
                            repeat: 1,
                            ease: 'power2.inOut'
                        });
                    }
                }
            );
        }
    });

    // Hide after delay with exit animation
    setTimeout(() => {
        const popup = document.querySelector('.win-popup-content');
        if (popup) {
            gsap.to(popup, {
                scale: 0.8,
                opacity: 0,
                y: -30,
                duration: 0.3,
                ease: 'power2.in',
                onComplete: () => {
                    showPopup.value = false;
                    popupPrize.value = null;
                }
            });
        } else {
            showPopup.value = false;
            popupPrize.value = null;
        }
    }, 3000);
};

// Pulse background effect
const pulseBackground = () => {
    if (!modalContentRef.value) return;

    gsap.to(modalContentRef.value, {
        background: `linear-gradient(135deg, ${colors.value.winnerGlow} 0%, ${colors.value.winnerBg} 50%, ${colors.value.winnerGlow} 100%)`,
        duration: 0.3,
        ease: 'power2.inOut',
        onComplete: () => {
            gsap.to(modalContentRef.value, {
                background: props.assets.background
                    ? `url(${props.assets.background}) center/cover no-repeat`
                    : `linear-gradient(135deg, ${colors.value.bgStart} 0%, ${colors.value.bgEnd} 50%, ${colors.value.bgStart} 100%)`,
                duration: 0.5,
                ease: 'power2.out'
            });
        }
    });
};

// Reveal a card with full animation sequence
const revealCard = async (cardIndex: number) => {
    const card = cards.value[cardIndex];
    if (card.revealed || card.animating) return;

    card.animating = true;

    // Get DOM elements
    const cardEl = document.querySelector(`[data-card-index="${cardIndex}"]`);
    const coverEl = cardEl?.querySelector('.bingo-cover-overlay');
    const squareEls = cardEl?.querySelectorAll('.bingo-square');
    const captionEl = cardEl?.querySelector('.bingo-caption');

    // Play reveal sound
    if (props.assets.revealSound && !props.demoMode) {
        try {
            const audio = new Audio(props.assets.revealSound);
            audio.volume = 0.3;
            audio.play().catch(() => {});
        } catch (e) {}
    }

    // Timeline for the reveal animation
    const tl = gsap.timeline();

    // Step 1: Fade out cover (no 3D transforms, no display:none to prevent reflow)
    if (coverEl) {
        tl.to(coverEl, {
            opacity: 0,
            duration: 0.15,
            ease: 'power2.out',
            onComplete: () => {
                // Use visibility instead of display to prevent layout recalculation
                (coverEl as HTMLElement).style.visibility = 'hidden';
                (coverEl as HTMLElement).style.pointerEvents = 'none';
            }
        });
    }

    // Step 3: Reveal diamonds
    const isFullHouse = card.diamondPositions.length === 9;

    // Shuffle diamond positions for random reveal order
    const revealOrder = shuffleArray([...card.diamondPositions]);

    // Mark card as revealed (shows initial state)
    card.revealed = true;

    await nextTick();

    // Reveal all diamonds at once for snappier feel
    // Add all positions to revealed set first
    revealOrder.forEach(pos => card.revealedSquares.add(pos));

    // Single reactivity trigger
    cards.value = [...cards.value];

    // Animate the squares with simple stagger (visual only)
    if (squareEls && squareEls.length > 0) {
        const diamondEls = revealOrder.map(pos => squareEls[pos]).filter(Boolean);
        gsap.fromTo(diamondEls,
            { scale: 0.5, opacity: 0 },
            {
                scale: 1,
                opacity: 1,
                duration: 0.2,
                stagger: isFullHouse ? 0.03 : 0.08,
                ease: 'back.out(1.5)'
            }
        );
    }

    // Step 4: Winner sequence
    tl.call(() => {
        if (card.isWinner && !processedTickets.value.has(card.ticket.id)) {
            processedTickets.value.add(card.ticket.id);

            if (isFullHouse) {
                // Full house special animation
                runFullHouseAnimation(cardIndex, squareEls, captionEl);
            } else {
                // Standard win animation
                runStandardWinAnimation(cardIndex, squareEls, captionEl);
            }

            // Play win sound
            if (props.assets.winSound && !props.demoMode) {
                try {
                    const audio = new Audio(props.assets.winSound);
                    audio.volume = 0.5;
                    audio.play().catch(() => {});
                } catch (e) {}
            }

            // Emit ticket played (prize already credited at checkout)
            emit('ticket-played', card.ticket.id);
        } else if (!card.isWinner) {
            // Loss - just mark as complete
            if (props.assets.lossSound && !props.demoMode) {
                try {
                    const audio = new Audio(props.assets.lossSound);
                    audio.volume = 0.3;
                    audio.play().catch(() => {});
                } catch (e) {}
            }
            emit('ticket-played', card.ticket.id);
        }

        card.animating = false;
    });
};

// Full house animation sequence
const runFullHouseAnimation = (
    cardIndex: number,
    squareEls: NodeListOf<Element> | undefined,
    captionEl: Element | null | undefined
) => {
    const card = cards.value[cardIndex];
    const cardEl = document.querySelector(`[data-card-index="${cardIndex}"]`);

    const tl = gsap.timeline();

    // Step 1: Center square glow pulse (position 4) - no scale to avoid layout shift
    if (squareEls?.[4]) {
        tl.to(squareEls[4], {
            boxShadow: `0 0 30px ${colors.value.winnerGlow}, 0 0 50px ${colors.value.diamond1}`,
            duration: 0.2,
            repeat: 2,
            yoyo: true,
            ease: 'power2.inOut'
        });
    }

    // Step 2: Cascade highlight in spiral order (no scale, just glow)
    FULL_HOUSE_CASCADE_ORDER.forEach((pos) => {
        if (squareEls?.[pos]) {
            tl.to(squareEls[pos], {
                background: `linear-gradient(145deg, ${colors.value.winnerGlow}, ${colors.value.winnerBg})`,
                boxShadow: `0 0 20px ${colors.value.winnerGlow}`,
                duration: 0.15,
                ease: 'power2.out'
            }, `-=0.09`);
        }
    });

    // Step 3: Flash all squares
    if (squareEls) {
        tl.to(squareEls, {
            opacity: 0.5,
            duration: 0.15,
            repeat: 2,
            yoyo: true,
            ease: 'power2.inOut'
        });
    }

    // Step 4: Show FULL HOUSE banner
    tl.call(() => {
        // Banner is shown via Vue reactivity
    });

    // Step 5: Caption flip (no scale)
    if (captionEl) {
        tl.to(captionEl, {
            opacity: 0.5,
            duration: 0.15,
            ease: 'power2.in',
            onComplete: () => {
                // Caption text changes via Vue reactivity
            }
        });
        tl.to(captionEl, {
            opacity: 1,
            duration: 0.15,
            ease: 'power2.out'
        });
    }

    // Step 6: Update totals + effects
    tl.call(() => {
        const newTotal = totalWinnings.value + card.prizeValue;
        animateTotalWinnings(newTotal);
        totalPrizes.value += 1;

        // Show popup
        showWinPopup(card.prizeValue, true);

        // Fire confetti - more particles for full house
        fireConfetti(250, 90);
        setTimeout(() => fireConfetti(150, 70), 300);

        // Pulse background
        pulseBackground();
    });

    // Step 7: Card shake
    if (cardEl) {
        tl.to(cardEl, {
            x: 5,
            duration: 0.05,
            repeat: 9,
            yoyo: true,
            ease: 'power2.inOut'
        });
    }

    // Step 8: Continuous glow on winning squares
    tl.call(() => {
        squareEls?.forEach(sq => {
            gsap.to(sq, {
                boxShadow: `0 0 25px ${colors.value.winnerGlow}`,
                duration: 0.75,
                repeat: -1,
                yoyo: true,
                ease: 'power2.inOut'
            });
        });
    });
};

// Standard win animation (3+ line)
const runStandardWinAnimation = (
    cardIndex: number,
    squareEls: NodeListOf<Element> | undefined,
    captionEl: Element | null | undefined
) => {
    const card = cards.value[cardIndex];
    const cardEl = document.querySelector(`[data-card-index="${cardIndex}"]`);

    const tl = gsap.timeline();

    // Step 1: Highlight winning squares (no scale, just glow)
    card.diamondPositions.forEach((pos, idx) => {
        if (squareEls?.[pos]) {
            tl.to(squareEls[pos], {
                background: `linear-gradient(145deg, ${colors.value.winnerGlow}, ${colors.value.winnerBg})`,
                boxShadow: `0 0 20px ${colors.value.winnerGlow}`,
                duration: 0.2,
                ease: 'power2.out'
            }, idx * 0.05);
        }
    });

    // Step 2: Caption flash (no 3D rotation)
    if (captionEl) {
        tl.to(captionEl, {
            opacity: 0.5,
            duration: 0.15,
            ease: 'power2.in'
        });
        tl.to(captionEl, {
            opacity: 1,
            duration: 0.15,
            ease: 'power2.out'
        });
    }

    // Step 3: Update totals + effects
    tl.call(() => {
        const newTotal = totalWinnings.value + card.prizeValue;
        animateTotalWinnings(newTotal);
        totalPrizes.value += 1;

        // Show popup
        showWinPopup(card.prizeValue, false);

        // Fire confetti
        fireConfetti(100, 70);

        // Pulse background
        pulseBackground();
    });

    // Step 4: Card glow pulse (no scale to avoid layout shift)
    if (cardEl) {
        tl.to(cardEl, {
            boxShadow: `0 0 30px ${colors.value.winnerGlow}, 0 0 60px ${colors.value.winnerGlow}50`,
            duration: 0.3,
            yoyo: true,
            repeat: 1,
            ease: 'power2.inOut'
        });
    }

    // Step 5: Continuous glow on winning squares
    tl.call(() => {
        card.diamondPositions.forEach(pos => {
            if (squareEls?.[pos]) {
                gsap.to(squareEls[pos], {
                    boxShadow: `0 0 20px ${colors.value.winnerGlow}`,
                    duration: 0.75,
                    repeat: -1,
                    yoyo: true,
                    ease: 'power2.inOut'
                });
            }
        });
    });
};

// Check if position is part of winning line
const isWinningSquare = (card: CardState, index: number): boolean => {
    return card.revealed && card.isWinner && card.diamondPositions.includes(index) && card.revealedSquares.has(index);
};

// Check if square should show diamond
const showDiamond = (card: CardState, index: number): boolean => {
    return card.revealedSquares.has(index) && card.diamondPositions.includes(index);
};

// Colors are reactive through the computed property - no need to reinitialize cards
// Cards will automatically update their colors when assets change

onMounted(() => {
    initializeCards();
});
</script>

<template>
    <div
        ref="modalContentRef"
        class="bingo-modal-content relative flex flex-col"
        :style="{
            background: assets.background
                ? `url(${assets.background}) center/cover no-repeat`
                : `linear-gradient(135deg, ${colors.bgStart} 0%, ${colors.bgEnd} 50%, ${colors.bgStart} 100%)`,
            height: '100%',
            padding: demoMode ? '8px' : '20px 10px',
            overflow: 'auto',
        }"
    >
        <!-- Header Image -->
        <div v-if="assets.header" class="text-center mb-4 flex-shrink-0">
            <img :src="assets.header" alt="Header" class="max-w-[280px] mx-auto" :class="demoMode ? 'max-h-[60px] object-contain' : ''" />
        </div>

        <!-- Total Winnings Display -->
        <div class="flex flex-wrap justify-center gap-2 mb-4 flex-shrink-0">
            <div
                class="total-winnings-display px-4 py-2 rounded-full backdrop-blur-md text-white font-bold"
                :class="demoMode ? 'text-sm' : 'text-lg'"
                :style="{
                    background: 'rgba(0, 0, 0, 0.5)',
                    border: '2px solid rgba(255, 255, 255, 0.3)',
                }"
            >
                Total Winnings: £{{ totalWinnings.toFixed(2) }}
            </div>
            <div
                v-if="totalPrizes > 0"
                class="px-4 py-2 rounded-full backdrop-blur-md text-white font-bold"
                :class="demoMode ? 'text-sm' : 'text-lg'"
                :style="{
                    background: 'rgba(0, 0, 0, 0.5)',
                    border: '2px solid rgba(255, 255, 255, 0.3)',
                }"
            >
                Prizes: {{ totalPrizes }}
            </div>
        </div>

        <!-- Bingo Cards Grid -->
        <div class="bingo-grid grid grid-cols-3 gap-1.5 w-full mx-auto">
            <div
                v-for="(card, cardIndex) in cards"
                :key="card.ticket.id"
                :data-card-index="cardIndex"
                class="bingo-card relative rounded-lg overflow-hidden"
                :style="{
                    border: `2px solid ${colors.frameColor}`,
                    boxShadow: `0 0 6px ${colors.frameGlow}40`,
                    background: colors.squareBg,
                }"
            >
                <!-- Caption - fixed height to prevent layout shift -->
                <div
                    class="bingo-caption text-center py-0.5 px-1 font-bold text-[10px] leading-tight"
                    :style="{
                        background: card.revealed
                            ? card.isWinner
                                ? `linear-gradient(145deg, ${colors.winnerGlow}, ${colors.winnerBg})`
                                : `linear-gradient(145deg, ${colors.bgEnd}, ${colors.bgStart})`
                            : `linear-gradient(145deg, ${colors.bgEnd}, ${colors.bgStart})`,
                        color: colors.squareText,
                        borderBottom: `1px solid ${colors.frameColor}`,
                        height: '28px',
                    }"
                >
                    <template v-if="card.revealed && card.isWinner">
                        <div class="text-[9px]">WIN!</div>
                        <div>£{{ Number(card.prizeValue).toFixed(0) }}</div>
                    </template>
                    <template v-else>
                        <div class="pt-0.5">#{{ card.ticket.number }}</div>
                    </template>
                </div>

                <!-- Numbers Grid -->
                <div class="relative p-1">
                    <div class="grid grid-cols-3 gap-0.5">
                        <div
                            v-for="(num, idx) in card.numbers"
                            :key="idx"
                            class="bingo-square bingo-square-tall flex items-center justify-center rounded font-bold text-xs md:text-sm"
                            :style="{
                                background: showDiamond(card, idx)
                                    ? isWinningSquare(card, idx)
                                        ? `linear-gradient(145deg, ${colors.winnerGlow}, ${colors.winnerBg})`
                                        : `linear-gradient(145deg, ${colors.diamond1}, ${colors.diamond2})`
                                    : colors.squareBg,
                                color: showDiamond(card, idx) ? '#fff' : colors.squareText,
                                border: `1px solid ${colors.frameColor}40`,
                            }"
                        >
                            <span v-if="showDiamond(card, idx)" class="diamond-emoji text-sm md:text-base">
                                {{ diamondEmoji }}
                            </span>
                            <span v-else-if="card.revealed">{{ num }}</span>
                            <span v-else>{{ num }}</span>
                        </div>
                    </div>

                    <!-- Full House Banner -->
                    <Transition name="fullhouse">
                        <div
                            v-if="card.revealed && card.isWinner && card.diamondPositions.length === 9 && card.revealedSquares.size === 9"
                            class="absolute inset-0.5 flex flex-col items-center justify-center rounded pointer-events-none"
                            style="background: rgba(0,0,0,0.85); z-index: 10;"
                        >
                            <span class="text-yellow-400 font-black text-sm md:text-xl drop-shadow-lg animate-pulse">FULL HOUSE!</span>
                            <span class="text-white font-semibold text-xs md:text-base">£{{ Number(card.prizeValue).toFixed(2) }}</span>
                        </div>
                    </Transition>
                </div>

                <!-- Cover Image Overlay -->
                <div
                    v-if="!card.revealed && assets.cardCover"
                    @click="revealCard(cardIndex)"
                    class="bingo-cover-overlay absolute inset-0 cursor-pointer hover:opacity-90 transition-opacity flex items-center justify-center rounded-lg z-20"
                    :style="{
                        background: `url(${assets.cardCover}) center/cover no-repeat`,
                    }"
                >
                    <span class="sr-only">Tap to reveal</span>
                </div>

                <!-- Tap to Reveal (no cover image) -->
                <div
                    v-else-if="!card.revealed"
                    @click="revealCard(cardIndex)"
                    class="bingo-cover-overlay absolute left-0 right-0 bottom-0 cursor-pointer flex items-center justify-center text-white font-bold text-[10px] z-20"
                    style="top: 28px;"
                    :style="{
                        background: `linear-gradient(145deg, ${colors.bgStart}, ${colors.bgEnd})`,
                    }"
                >
                    <span class="tap-text">TAP TO REVEAL</span>
                </div>
            </div>
        </div>

        <!-- Win Popup -->
        <Teleport to="body">
            <div
                v-if="showPopup && popupPrize"
                class="fixed inset-0 flex items-center justify-center z-[100000] pointer-events-none"
            >
                <div
                    class="win-popup-content text-center p-8 rounded-2xl shadow-2xl"
                    :style="{
                        background: `linear-gradient(135deg, ${colors.popupStart}, ${colors.popupEnd})`,
                        boxShadow: `0 10px 40px rgba(0,0,0,0.3), 0 0 80px ${colors.popupStart}80`,
                        border: '3px solid rgba(255,255,255,0.3)',
                    }"
                >
                    <div class="text-white text-2xl font-black tracking-wider mb-2">
                        {{ popupPrize.isFullHouse ? 'FULL HOUSE!' : 'YOU WON!' }}
                    </div>
                    <div
                        class="text-5xl font-black prize-amount"
                    >
                        £{{ popupPrize.value.toFixed(2) }}
                    </div>
                    <!-- Sparkle particles -->
                    <div class="sparkle-container absolute inset-0 pointer-events-none overflow-hidden">
                        <div v-for="i in 6" :key="i" class="sparkle" :style="{ '--delay': `${i * 0.1}s`, '--angle': `${i * 60}deg` }"></div>
                    </div>
                </div>
            </div>
        </Teleport>
    </div>
</template>

<style scoped>
/* Simple styles - no contain which can hide content */
.bingo-grid {
    /* Grid is stable */
}

.bingo-card {
    /* Cards have fixed structure */
}

.bingo-square {
    /* Squares are in a fixed grid */
}

/* Square cells */
.bingo-square-tall {
    aspect-ratio: 1 / 1;
}

.bingo-caption {
    overflow: hidden;
    display: flex;
    flex-direction: column;
    justify-content: center;
}

.bingo-cover-overlay {
    /* Absolute positioned */
}

.tap-text {
    animation: pulse-text 2s ease-in-out infinite;
}

@keyframes pulse-text {
    0%, 100% {
        opacity: 1;
    }
    50% {
        opacity: 0.6;
    }
}

.diamond-emoji {
    animation: diamond-shine 2s ease-in-out infinite;
}

@keyframes diamond-shine {
    0%, 100% {
        filter: brightness(1);
    }
    50% {
        filter: brightness(1.3);
    }
}

.prize-amount {
    background: linear-gradient(45deg, #fff, #fbbf24);
    -webkit-background-clip: text;
    -webkit-text-fill-color: transparent;
    background-clip: text;
}

/* Full house transition */
.fullhouse-enter-active {
    animation: fullhouse-in 0.5s ease-out;
}

.fullhouse-leave-active {
    animation: fullhouse-out 0.3s ease-in;
}

@keyframes fullhouse-in {
    0% {
        opacity: 0;
        transform: scale(0.5) rotateX(-20deg);
    }
    100% {
        opacity: 1;
        transform: scale(1) rotateX(0);
    }
}

@keyframes fullhouse-out {
    0% {
        opacity: 1;
        transform: scale(1);
    }
    100% {
        opacity: 0;
        transform: scale(0.8);
    }
}

/* Sparkle particles */
.sparkle-container {
    position: absolute;
    inset: 0;
}

.sparkle {
    position: absolute;
    width: 10px;
    height: 10px;
    background: #ffd700;
    border-radius: 50%;
    top: 50%;
    left: 50%;
    animation: sparkle-out 1s ease-out var(--delay) infinite;
    transform: rotate(var(--angle)) translateY(0);
}

@keyframes sparkle-out {
    0% {
        opacity: 1;
        transform: rotate(var(--angle)) translateY(0) scale(1);
    }
    100% {
        opacity: 0;
        transform: rotate(var(--angle)) translateY(-80px) scale(0);
    }
}

/* Winner text glow */
.bingo-caption:has(+ .bingo-numbers-grid .winner) {
    text-shadow: 0 0 10px currentColor;
}
</style>
