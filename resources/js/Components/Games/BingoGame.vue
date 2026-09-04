<script setup lang="ts">
import { ref, computed, onMounted, nextTick } from 'vue';
import gsap from 'gsap';
import { siteCreditLabel } from '@/utils/prizeLabel';
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
    no_auto_credit?: boolean;
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
    prizeNoAutoCredit: boolean;
    prizeName: string;
    revealedSquares: Set<number>;
    animating: boolean;
}

const cards = ref<CardState[]>([]);
const totalWinnings = ref(0);
const totalPrizes = ref(0);
const showPopup = ref(false);
const popupPrize = ref<{ value: number; isFullHouse: boolean; noAutoCredit: boolean; prizeName: string } | null>(null);
const processedTickets = ref<Set<number>>(new Set());
const modalContentRef = ref<HTMLElement | null>(null);
const isRevealingAll = ref(false);
const showEndState = ref(false);
const revealAllTimeoutIds: ReturnType<typeof setTimeout>[] = [];
const REVEAL_ALL_MAX_TOTAL_MS = 3000;

// Large orders (1000+ tickets) would otherwise mount every 5x5 card at once —
// cap the initial render and let the user expand on demand. Sliced from the
// front only, so indices stay aligned with `cards` for revealCard(index).
const CARD_DISPLAY_LIMIT = 150;
const showAllCards = ref(false);
const visibleCards = computed(() => (
    showAllCards.value || cards.value.length <= CARD_DISPLAY_LIMIT
        ? cards.value
        : cards.value.slice(0, CARD_DISPLAY_LIMIT)
));

// Check if all cards have been revealed
const allRevealed = computed(() => cards.value.length > 0 && cards.value.every(c => c.revealed));

// Generate a storage key from ticket IDs for persistence
const storageKey = computed(() => {
    if (!props.tickets || props.tickets.length === 0) return '';
    const ids = props.tickets.map(t => t.id).sort().join('-');
    return `bingo_state_${ids}`;
});

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

    // Random pattern if no rule matched — only pick from rows/columns/diagonals (0-7), never Full House or Cross
    if (patternIndex === -1) {
        patternIndex = Math.floor(Math.random() * 8);
    }

    // Validate — clamp to safe range if somehow out of bounds
    if (patternIndex < 0 || patternIndex >= WINNING_PATTERNS.length) {
        patternIndex = Math.floor(Math.random() * 8);
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
                prizeNoAutoCredit: false,
                prizeName: '',
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
                prizeNoAutoCredit: false,
                prizeName: 'Demo Prize',
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
                prizeNoAutoCredit: false,
                prizeName: '',
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
                prizeNoAutoCredit: false,
                prizeName: 'Big Prize',
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
                prizeNoAutoCredit: false,
                prizeName: '',
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
                prizeNoAutoCredit: false,
                prizeName: '',
                revealedSquares: new Set(),
                animating: false,
            },
        ];
    } else {
        // Real mode: create cards from tickets
        cards.value = props.tickets.map(ticket => {
            const isWinner = ticket.instant_win !== false;
            const instantWinData = isWinner ? (ticket.instant_win as InstantWin) : null;
            const rawValue = isWinner ? Number(instantWinData!.value) || 0 : 0;
            const isTicketBundle = isWinner && (instantWinData as any)?.prize_type === 'ticket_bundle';
            const categoryId = isWinner ? instantWinData!.category_id : 0;
            const prizeNoAutoCredit = (isWinner && categoryId
                ? props.prizes.some(p => p.id === categoryId && p.no_auto_credit)
                : false) || isTicketBundle;

            const rawPrizeName = isWinner ? instantWinData!.prize || '' : '';
            const prizeName = isTicketBundle
                ? `${rawValue > 0 ? Math.floor(rawValue) : ''} Free Ticket${rawValue !== 1 ? 's' : ''}`.trim()
                : (siteCreditLabel((instantWinData as any)?.prize_type, rawValue) ?? rawPrizeName);

            return {
                ticket,
                numbers: generateCardNumbers(),
                diamondPositions: isWinner
                    ? generateWinnerDiamonds(isTicketBundle ? 0 : rawValue)
                    : generateLoserDiamonds(),
                revealed: false,
                isWinner,
                prizeValue: isTicketBundle ? 0 : rawValue,
                prizeNoAutoCredit,
                prizeName,
                revealedSquares: new Set(),
                animating: false,
            };
        });

        // Shuffle cards
        cards.value.sort(() => Math.random() - 0.5);

        // Try to restore saved state
        restoreSavedState();
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
const showWinPopup = (value: number, isFullHouse: boolean, noAutoCredit: boolean = false, prizeName: string = '') => {
    popupPrize.value = { value, isFullHouse, noAutoCredit, prizeName };
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
        saveBingoState();
        if (!isRevealingAll.value) {
            checkEndState();
        }
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
        const correctTotal = cards.value.filter(c => c.isWinner && processedTickets.value.has(c.ticket.id)).reduce((s, c) => s + c.prizeValue, 0);
        animateTotalWinnings(correctTotal);
        totalPrizes.value = cards.value.filter(c => c.isWinner && processedTickets.value.has(c.ticket.id)).length;

        // Show popup
        showWinPopup(card.prizeValue, true, card.prizeNoAutoCredit, card.prizeName);

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
        const correctTotal = cards.value.filter(c => c.isWinner && processedTickets.value.has(c.ticket.id)).reduce((s, c) => s + c.prizeValue, 0);
        animateTotalWinnings(correctTotal);
        totalPrizes.value = cards.value.filter(c => c.isWinner && processedTickets.value.has(c.ticket.id)).length;

        // Show popup
        showWinPopup(card.prizeValue, false, card.prizeNoAutoCredit, card.prizeName);

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

// Reveal all cards with staggered animation
const revealAllCards = async () => {
    if (isRevealingAll.value) return;
    isRevealingAll.value = true;

    const unrevealed = cards.value
        .map((card, index) => ({ card, index }))
        .filter(({ card }) => !card.revealed && !card.animating);

    if (unrevealed.length === 0) {
        isRevealingAll.value = false;
        return;
    }

    // Bounded stagger so a huge order (1000+ tickets) still finishes in a few seconds.
    const stagger = Math.min(150, REVEAL_ALL_MAX_TOTAL_MS / unrevealed.length);

    revealAllTimeoutIds.length = 0;
    for (let i = 0; i < unrevealed.length; i++) {
        const id = setTimeout(() => {
            revealCard(unrevealed[i].index);
            if (i === unrevealed.length - 1) {
                const finishId = setTimeout(() => {
                    isRevealingAll.value = false;
                    checkEndState();
                }, 500);
                revealAllTimeoutIds.push(finishId);
            }
        }, i * stagger);
        revealAllTimeoutIds.push(id);
    }
};

// Cancel the remaining stagger and instantly reveal whatever's left
const skipRevealAll = () => {
    if (!isRevealingAll.value) return;

    revealAllTimeoutIds.forEach((id) => clearTimeout(id));
    revealAllTimeoutIds.length = 0;

    cards.value.forEach((card, index) => {
        if (!card.revealed && !card.animating) {
            revealCard(index);
        }
    });

    isRevealingAll.value = false;
    checkEndState();
};

// Check and show end state when all cards are revealed
const checkEndState = () => {
    if (allRevealed.value && !showEndState.value) {
        const tryShow = () => {
            const anyAnimating = cards.value.some(c => c.animating);
            if (anyAnimating) {
                setTimeout(tryShow, 100);
                return;
            }
            // All animations done — snap to correct values and show
            totalWinnings.value = cards.value.filter(c => c.isWinner).reduce((sum, c) => sum + c.prizeValue, 0);
            totalPrizes.value = cards.value.filter(c => c.isWinner).length;
            showEndState.value = true;
            if (totalPrizes.value > 0) fireConfetti(200, 90);
            clearSavedState();
        };
        setTimeout(tryShow, 800);
    }
};

// Save bingo state to sessionStorage
const saveBingoState = () => {
    if (props.demoMode || !storageKey.value) return;
    try {
        const state = {
            revealedIndexes: cards.value.map((c, i) => c.revealed ? i : -1).filter(i => i >= 0),
            revealedSquares: cards.value.map(c => [...c.revealedSquares]),
            totalWinnings: totalWinnings.value,
            totalPrizes: totalPrizes.value,
            processedTickets: [...processedTickets.value],
            cardOrder: cards.value.map(c => c.ticket.id),
        };
        sessionStorage.setItem(storageKey.value, JSON.stringify(state));
    } catch (e) {
        // sessionStorage may be unavailable
    }
};

// Restore bingo state from sessionStorage
const restoreSavedState = (): boolean => {
    if (props.demoMode || !storageKey.value) return false;
    try {
        const saved = sessionStorage.getItem(storageKey.value);
        if (!saved) return false;
        const state = JSON.parse(saved);
        if (!state.cardOrder || !state.revealedIndexes) return false;

        const orderedCards: CardState[] = [];
        for (const ticketId of state.cardOrder) {
            const card = cards.value.find(c => c.ticket.id === ticketId);
            if (card) orderedCards.push(card);
        }
        if (orderedCards.length !== cards.value.length) return false;
        cards.value = orderedCards;

        for (const idx of state.revealedIndexes) {
            if (idx < cards.value.length) {
                cards.value[idx].revealed = true;
                const savedSquares = state.revealedSquares?.[idx] || [];
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

// Clear saved state
const clearSavedState = () => {
    if (storageKey.value) {
        try { sessionStorage.removeItem(storageKey.value); } catch (e) {}
    }
};

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

        <!-- Reveal All Button -->
        <div v-if="!allRevealed && !showEndState" class="flex justify-center mb-4 flex-shrink-0">
            <button
                @click="isRevealingAll ? skipRevealAll() : revealAllCards()"
                :disabled="allRevealed"
                class="px-6 py-2 rounded-full font-bold text-sm text-white transition-all"
                :style="{
                    background: `linear-gradient(135deg, ${colors.frameColor}, ${colors.frameGlow})`,
                    cursor: 'pointer',
                }"
            >
                {{ isRevealingAll ? 'Skip' : 'Reveal All' }}
            </button>
        </div>

        <!-- Bingo Cards Grid -->
        <div class="bingo-grid grid grid-cols-3 gap-1.5 w-full mx-auto">
            <div
                v-for="(card, cardIndex) in visibleCards"
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
                        <div v-if="!card.prizeNoAutoCredit">&pound;{{ Number(card.prizeValue).toFixed(2) }}</div>
                        <div v-else class="text-[8px]">{{ card.prizeName }}</div>
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
                            <span v-if="!card.prizeNoAutoCredit" class="text-white font-semibold text-xs md:text-base">&pound;{{ Number(card.prizeValue).toFixed(2) }}</span>
                            <span v-else class="text-white font-semibold text-xs md:text-base">{{ card.prizeName }}</span>
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

        <div v-if="cards.length > CARD_DISPLAY_LIMIT && !showAllCards" class="flex justify-center my-3">
            <button
                class="px-6 py-2 rounded-full font-bold text-sm text-white transition-all"
                :style="{ background: `linear-gradient(135deg, ${colors.frameColor}, ${colors.frameGlow})` }"
                @click="showAllCards = true"
            >
                Show all {{ cards.length }} tickets
            </button>
        </div>

        <!-- End State Overlay -->
        <Transition name="fullhouse">
            <div
                v-if="showEndState"
                class="absolute inset-0 flex flex-col items-center justify-center z-30 rounded-lg"
                style="background: rgba(0,0,0,0.9);"
            >
                <div v-if="totalPrizes > 0" class="text-center">
                    <div class="text-yellow-400 text-4xl font-black mb-2 animate-pulse">CONGRATULATIONS!</div>
                    <div class="text-white text-lg mb-1">You won <span class="text-yellow-400 font-bold">{{ totalPrizes }}</span> {{ totalPrizes === 1 ? 'prize' : 'prizes' }}!</div>
                    <div class="text-3xl font-black mt-2 prize-amount">£{{ totalWinnings.toFixed(2) }}</div>
                </div>
                <div v-else class="text-center">
                    <div class="text-gray-400 text-2xl font-bold mb-2">Better luck next time!</div>
                    <div class="text-gray-500 text-sm">No prizes this round</div>
                </div>
                <button
                    @click="showEndState = false"
                    class="mt-6 px-6 py-2 rounded-full font-bold text-sm text-white bg-white/20 hover:bg-white/30 transition-colors"
                >
                    Close
                </button>
            </div>
        </Transition>

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
                        v-if="!popupPrize.noAutoCredit"
                        class="text-5xl font-black prize-amount"
                    >
                        &pound;{{ popupPrize.value.toFixed(2) }}
                    </div>
                    <div
                        v-else
                        class="text-3xl font-black prize-amount"
                    >
                        {{ popupPrize.prizeName }}
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
