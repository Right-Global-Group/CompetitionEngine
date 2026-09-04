<script setup lang="ts">
import { ref, watch, onMounted, computed } from 'vue';
import { usePage } from '@inertiajs/vue3';
import gsap from 'gsap';

interface Prize {
    id: number;
    name: string;
    image: string;
    value: number;
    no_auto_credit?: boolean;
    is_ticket_bundle?: boolean;
}

interface Props {
    isSpinning: boolean;
    prizes: Prize[];
    winningPrize?: Prize | null;
    demoMode?: boolean;
    canSpin?: boolean;
    colors?: {
        primary: string;
        secondary: string;
        accent: string;
        text: string;
    };
    lastWin?: number;
    totalFreeTickets?: number;
    spinsLeft?: number;
    spinButtonImage?: string;
    titleImage?: string;
    background?: string;
    animateTitle?: boolean;
    showMachine?: boolean;
    machineBgColor?: string;
    inventoryEmoji?: string;
    inventoryButtonColor?: string;
    matchTextColor?: string;
    prizesModalBgColor?: string;
    prizesTitleColor?: string;
    prizesCardBorderColor?: string;
    prizesCardBgColor?: string;
    prizesValueColor?: string;
    winGlowColor?: string;
    machineBorderColor?: string;
}

const props = withDefaults(defineProps<Props>(), {
    prizes: () => [],
    winningPrize: null,
    demoMode: false,
    canSpin: true,
    colors: () => ({
        primary: '#00CED1',
        secondary: '#1a5a7a',
        accent: '#00FFFF',
        text: '#FFFFFF'
    }),
    lastWin: 0,
    totalFreeTickets: 0,
    spinsLeft: 0,
    spinButtonImage: '',
    titleImage: '',
    background: '',
    animateTitle: false,
    showMachine: true,
    machineBgColor: '#1a5a7a',
    inventoryEmoji: '🎣',
    inventoryButtonColor: '#FFD700',
    matchTextColor: '#7FDBFF',
    prizesModalBgColor: '#1F2937',
    prizesTitleColor: '#FFD700',
    prizesCardBorderColor: '#FFD700',
    prizesCardBgColor: '#374151',
    prizesValueColor: '#10B981',
    winGlowColor: '#FFD700',
    machineBorderColor: '#00BFFF'
});

// Convert hex to RGB components for CSS custom properties
function hexToRgb(hex: string): string {
    const h = hex.replace('#', '');
    const r = parseInt(h.substring(0, 2), 16);
    const g = parseInt(h.substring(2, 4), 16);
    const b = parseInt(h.substring(4, 6), 16);
    return `${r}, ${g}, ${b}`;
}

const winGlowRgb = computed(() => hexToRgb(props.winGlowColor || '#FFD700'));

const emit = defineEmits<{
    'spin-complete': [payload: { reel1: Prize; reel2: Prize; reel3: Prize; paylineMatch: boolean }];
    'spin': [];
}>();

const page = usePage();
const reel1 = ref<HTMLElement | null>(null);
const reel2 = ref<HTMLElement | null>(null);
const reel3 = ref<HTMLElement | null>(null);
const isAnimating = ref(false);
const bubblesContainer = ref<HTMLElement | null>(null);
const showPrizesModal = ref(false);
const showWinReveal = ref(false);
const showGoldFlames = ref(false);
const currentTenant = computed(() => page.props.currentTenant || 'vortex');


// Audio context for Web Audio API
let audioCtx: AudioContext | null = null;

function initAudio() {
    if (!audioCtx) {
        audioCtx = new (window.AudioContext || (window as any).webkitAudioContext)();
    }
}

function playSound(freq: number, dur: number, type: OscillatorType = 'sine', vol: number = 0.3) {
    if (!audioCtx) return;
    const osc = audioCtx.createOscillator();
    const gain = audioCtx.createGain();
    osc.connect(gain);
    gain.connect(audioCtx.destination);
    osc.frequency.value = freq;
    osc.type = type;
    gain.gain.setValueAtTime(vol, audioCtx.currentTime);
    gain.gain.exponentialRampToValueAtTime(0.01, audioCtx.currentTime + dur);
    osc.start();
    osc.stop(audioCtx.currentTime + dur);
}

function playTick() { playSound(300 + Math.random() * 200, 0.05, 'square', 0.1); }
function playStop() { playSound(200, 0.15, 'triangle', 0.2); }

// Lucky Fish theme - Fixed configuration
const luckyFishTheme = computed(() => ({
    bg: 'linear-gradient(180deg, #006994 0%, #004466 50%, #002233 100%)',
    title: '🐟 LUCKY FISH 🐟',
    machine: 'linear-gradient(145deg, #1a5a7a 0%, #0d3d52 50%, #082530 100%)',
    border: props.machineBorderColor || '#00BFFF',
    reelBg: 'linear-gradient(180deg, #000 0%, #0a1929 50%, #000 100%)',
}));

// Demo emojis for slots preview
const demoEmojis = ['🍒', '🍋', '🍊', '🍉', '🍇', '🍓', '💎', '⭐', '🔔', '7️⃣', '💰', '🎰'];

function emojiSvg(emoji: string): string {
    return `data:image/svg+xml,${encodeURIComponent(`<svg xmlns="http://www.w3.org/2000/svg" width="100" height="100"><text x="50%" y="50%" text-anchor="middle" dominant-baseline="central" font-size="60">${emoji}</text></svg>`)}`;
}

// A losing spin needs an "odd one out" symbol. A comp with only 1 or 2 instant-win
// categories cannot supply that from real prizes alone, and the old fallbacks collapsed
// every loss into a 3-in-a-row of the same prize (looked like a jackpot, no win fired,
// and every spin was logged as a mismatch). So when there are fewer than 3 real prizes
// we add ONE decoy "no win" symbol (a red cross) to the reel strip. It uses a NEGATIVE id
// so it can never collide with a category id, carries no value, is never a winning
// target, and never appears in the prizes modal.
const DECOY_ID = -1;
const decoyPrize: Prize = {
    id: DECOY_ID,
    name: '❌',
    image: emojiSvg('❌'),
    value: 0,
    no_auto_credit: true,
};

const decoyPrizes = computed<Prize[]>(() => {
    const real = props.prizes?.length ?? 0;
    return real > 0 && real < 3 ? [decoyPrize] : [];
});

// Every symbol that can appear on the reel strip: real prizes plus the decoy when padded.
const reelPool = computed<Prize[]>(() => [...(props.prizes ?? []), ...decoyPrizes.value]);

function getRandomPrize(): Prize {
    // If no prizes available (demo mode OR empty prizes array), use random emojis
    if (!props.prizes || props.prizes.length === 0) {
        const emoji = demoEmojis[Math.floor(Math.random() * demoEmojis.length)];
        return {
            id: Math.random(),
            name: emoji,
            image: `data:image/svg+xml,${encodeURIComponent(`<svg xmlns="http://www.w3.org/2000/svg" width="100" height="100"><text x="50%" y="50%" text-anchor="middle" dominant-baseline="central" font-size="60">${emoji}</text></svg>`)}`,
            value: 0
        };
    }

    // Get a random symbol from the reel pool (real prizes + decoys when padded)
    const pool = reelPool.value;
    const prize = pool[Math.floor(Math.random() * pool.length)];

    // If prize is undefined or has no image/empty image, generate emoji fallback
    if (!prize || !prize.image || prize.image.trim() === '') {
        const emoji = demoEmojis[Math.floor(Math.random() * demoEmojis.length)];
        return {
            id: prize?.id ?? Math.random(),
            name: prize?.name ?? emoji,
            image: `data:image/svg+xml,${encodeURIComponent(`<svg xmlns="http://www.w3.org/2000/svg" width="100" height="100"><text x="50%" y="50%" text-anchor="middle" dominant-baseline="central" font-size="60">${emoji}</text></svg>`)}`,
            value: prize?.value ?? 0
        };
    }

    return prize;
}

// Particle burst effect on win
function createParticleBurst() {
    const slotWindow = document.querySelector('.slot-window');
    if (!slotWindow) return;

    // Create 20 particle elements
    for (let i = 0; i < 20; i++) {
        const particle = document.createElement('div');
        particle.className = 'win-particle';
        particle.textContent = ['💰', '⭐', '💎', '🎰', '🌟'][Math.floor(Math.random() * 5)];
        particle.style.position = 'absolute';
        particle.style.left = '50%';
        particle.style.top = '50%';
        particle.style.fontSize = '24px';
        particle.style.pointerEvents = 'none';
        particle.style.zIndex = '100';
        slotWindow.appendChild(particle);

        // GSAP: Animate particles bursting outward
        const angle = (Math.PI * 2 * i) / 20;
        const distance = 150 + Math.random() * 100;
        const x = Math.cos(angle) * distance;
        const y = Math.sin(angle) * distance;

        gsap.to(particle, {
            x: x,
            y: y,
            opacity: 0,
            scale: 2,
            rotation: Math.random() * 360,
            duration: 1 + Math.random() * 0.5,
            ease: 'power2.out',
            onComplete: () => particle.remove()
        });
    }
}

// Spin logic - predetermine what each reel will land on
async function spin() {
    if (isAnimating.value) {
        return;
    }

    initAudio();
    isAnimating.value = true;

    // Clear previous winners and gold flames
    document.querySelectorAll('.symbol.winner').forEach(s => s.classList.remove('winner'));
    showGoldFlames.value = false;

    // PREDETERMINE what each reel will land on
    let reel1Target: Prize;
    let reel2Target: Prize;
    let reel3Target: Prize;

    if (props.winningPrize) {
        // WIN: All 3 reels land on the SAME prize
        reel1Target = props.winningPrize;
        reel2Target = props.winningPrize;
        reel3Target = props.winningPrize;
    } else {
        // LOSS: Use near-miss patterns to tease players (50% of losses)
        // availablePrizes = full reel pool (padded with decoys when < 3 real prizes) so
        // the odd-one-out always exists. tease pool = real prizes only, so a near-miss
        // always teases a real prize, never a decoy. Identical to before when no decoys.
        const availablePrizes = reelPool.value.length > 0
            ? [...reelPool.value]
            : demoEmojis.map((emoji, index) => ({
                id: index,
                name: emoji,
                image: emojiSvg(emoji),
                value: 0
            }));
        const teasePrizes = props.prizes.length > 0 ? [...props.prizes] : availablePrizes;

        // Randomly select a pattern (50% near-miss, 50% all different)
        const rand = Math.random();

        if (rand < 0.166) {
            // PATTERN 1: Left + Middle match (16.6% chance)
            const matchingPrize = teasePrizes[Math.floor(Math.random() * teasePrizes.length)];
            reel1Target = matchingPrize;
            reel2Target = matchingPrize;

            const reel3Options = availablePrizes.filter(p => p.id !== matchingPrize.id);
            reel3Target = reel3Options.length > 0
                ? reel3Options[Math.floor(Math.random() * reel3Options.length)]
                : availablePrizes[0];
        } else if (rand < 0.332) {
            // PATTERN 2: Middle + Right match (16.6% chance)
            const matchingPrize = teasePrizes[Math.floor(Math.random() * teasePrizes.length)];
            reel2Target = matchingPrize;
            reel3Target = matchingPrize;

            const reel1Options = availablePrizes.filter(p => p.id !== matchingPrize.id);
            reel1Target = reel1Options.length > 0
                ? reel1Options[Math.floor(Math.random() * reel1Options.length)]
                : availablePrizes[0];
        } else if (rand < 0.50) {
            // PATTERN 3: Left + Right match (16.8% chance)
            const matchingPrize = teasePrizes[Math.floor(Math.random() * teasePrizes.length)];
            reel1Target = matchingPrize;
            reel3Target = matchingPrize;

            const reel2Options = availablePrizes.filter(p => p.id !== matchingPrize.id);
            reel2Target = reel2Options.length > 0
                ? reel2Options[Math.floor(Math.random() * reel2Options.length)]
                : availablePrizes[0];
        } else if (availablePrizes.length < 3) {
            // PATTERN 4a: Genuine loss with a padded pool (1 real prize + the decoy).
            // Three distinct symbols are impossible, so show the real prize on ONE random
            // reel and the "no win" decoy on the other two. Never 3-of-a-kind.
            const realPrize = teasePrizes[Math.floor(Math.random() * teasePrizes.length)];
            const decoy = availablePrizes.find(p => p.id !== realPrize.id) ?? decoyPrize;
            const realReel = Math.floor(Math.random() * 3);
            reel1Target = realReel === 0 ? realPrize : decoy;
            reel2Target = realReel === 1 ? realPrize : decoy;
            reel3Target = realReel === 2 ? realPrize : decoy;
        } else {
            // PATTERN 4: All different (50% chance - genuine loss, no tease)
            reel1Target = availablePrizes[Math.floor(Math.random() * availablePrizes.length)];

            const reel2Options = availablePrizes.filter(p => p.id !== reel1Target.id);
            reel2Target = reel2Options.length > 0
                ? reel2Options[Math.floor(Math.random() * reel2Options.length)]
                : availablePrizes[0];

            const reel3Options = availablePrizes.filter(p => p.id !== reel1Target.id && p.id !== reel2Target.id);
            reel3Target = reel3Options.length > 0
                ? reel3Options[Math.floor(Math.random() * reel3Options.length)]
                : availablePrizes[Math.min(1, availablePrizes.length - 1)];
        }
    }

    // Start all 3 reels spinning at once, but they'll stop one by one (left to right)
    // Longer durations + bigger gaps between stops for dramatic effect
    const spinPromises = [
        spinReel(1, 3000, reel1Target), // Stops first
        spinReel(2, 4200, reel2Target), // Stops second (1200ms later)
        spinReel(3, 5400, reel3Target)  // Stops last (2400ms after first)
    ];

    // Wait for all reels to complete
    const results = await Promise.all(spinPromises);

    // Check if won and trigger EPIC WIN REVEAL!
    if (props.winningPrize) {
        // Start gold flames immediately when reels align
        showGoldFlames.value = true;

        setTimeout(() => {
            showWinReveal.value = true;

            // Hide after 6 seconds
            setTimeout(() => {
                showWinReveal.value = false;
            }, 6000);
        }, 500);
    } else {
        // Clear gold flames on loss
        showGoldFlames.value = false;
    }

    isAnimating.value = false;
    try {
        const paylineMatch = (
            reel1Target?.id === reel2Target?.id
            && reel2Target?.id === reel3Target?.id
        );
        emit('spin-complete', {
            reel1: reel1Target,
            reel2: reel2Target,
            reel3: reel3Target,
            paylineMatch,
        });
    } catch (e) {
        // Never break the spin loop because of audit payload construction
        emit('spin-complete', {
            reel1: reel1Target,
            reel2: reel2Target,
            reel3: reel3Target,
            paylineMatch: false,
        });
    }
}

// Add this function
const imagesPreloaded = ref(false);

function preloadImages(prizes: Prize[]): Promise<void[]> {
    return Promise.all(
        prizes.map(prize => new Promise<void>((resolve) => {
            if (!prize.image || prize.image.startsWith('data:')) {
                resolve();
                return;
            }
            const img = new Image();
            img.onload = () => resolve();
            img.onerror = () => resolve();
            img.src = prize.image;
        }))
    );
}

function spinReel(reelNum: number, duration: number, targetPrize: Prize): Promise<Prize> {
    return new Promise(resolve => {
        const inner = reelNum === 1 ? reel1.value : reelNum === 2 ? reel2.value : reel3.value;
        if (!inner) return resolve(getRandomPrize());

        // Determine symbol height based on viewport (like HTML reference)
        const SYMBOL_HEIGHT = window.innerWidth <= 550 ? 75 : 100;

        // Get current position (or start at -SYMBOL_HEIGHT for first spin)
        const currentTransform = inner.style.transform;
        let currentY = currentTransform ? parseInt(currentTransform.match(/-?\d+/)?.[0] || `-${SYMBOL_HEIGHT}`) : -SYMBOL_HEIGHT;

        // INFINITE SPIN SOLUTION: Reset position when we get too far down (past symbol 150)
        // This happens seamlessly during the HTML swap with no transition
        const RESET_THRESHOLD = 150;
        const currentIndex = Math.abs(Math.floor(currentY / SYMBOL_HEIGHT));
        let didReset = false;

        if (currentIndex > RESET_THRESHOLD) {
            // Reset to early position (around symbol 20)
            currentY = -(20 * SYMBOL_HEIGHT);
            didReset = true;
        }

        // Calculate how many symbols we need
        const symbolsToSpin = 19;
        const resetCurrentIndex = Math.abs(Math.floor(currentY / SYMBOL_HEIGHT));
        const targetIndex = resetCurrentIndex + 1 + symbolsToSpin;

        // Get existing symbols from DOM (if any)
        const existingSymbols = Array.from(inner.querySelectorAll('.symbol img'));
        const existingCount = existingSymbols.length;

        // If reset happened OR first spin, regenerate all symbols
        // Otherwise, keep existing DOM and just append new ones
        let newSymbols: Prize[] = [];
        let shouldReplaceHTML = false;

        if (didReset || existingCount === 0) {
            // Full regeneration (reset or first spin)
            shouldReplaceHTML = true;
            const symbolsNeeded = 300;
            for (let j = 0; j < symbolsNeeded; j++) {
                newSymbols.push(getRandomPrize());
            }
        } else {
            // Keep existing DOM, only append new symbols
            // Extract existing prizes from DOM to know what we have
            for (let i = 0; i < existingCount; i++) {
                const img = existingSymbols[i] as HTMLImageElement;
                const prizeName = img.alt;
                const prize = reelPool.value.find(p => p.name === prizeName) || getRandomPrize();
                newSymbols.push(prize);
            }

            // Calculate how many new symbols to append AND ACTUALLY ADD THEM
            const symbolsNeeded = Math.max(targetIndex + 100, existingCount + 30);
            for (let j = existingCount; j < symbolsNeeded; j++) {
                newSymbols.push(getRandomPrize());
            }
        }

        // Use the targetIndex we already calculated
        const RESULT_INDEX = targetIndex;

        // Place the predetermined target prize at the result index
        newSymbols[RESULT_INDEX] = targetPrize;

        // The centered symbol after spin is the result
        const resultPrize = newSymbols[RESULT_INDEX];

        // Disable transitions for the HTML swap
        inner.style.transition = 'none';

        // If we reset, apply the new position BEFORE swapping HTML
        if (didReset) {
            inner.style.transform = `translateY(${currentY}px)`;
        }

        // Build/Update HTML
        // Helper to build symbol HTML with onerror fallback
        const buildSymbolHTML = (prize: Prize) => {
            const fallbackSvg = `data:image/svg+xml,${encodeURIComponent('<svg xmlns="http://www.w3.org/2000/svg" width="100" height="100"><text x="50%" y="50%" text-anchor="middle" dominant-baseline="central" font-size="60">🎰</text></svg>')}`;
            return `<div class="symbol"><img src="${prize.image}" alt="${prize.name}" onerror="this.onerror=null;this.src='${fallbackSvg}'" /></div>`;
        };

        if (shouldReplaceHTML) {
            // Full HTML replacement (reset or first spin)
            let html = '';
            for (const prize of newSymbols) {
                html += buildSymbolHTML(prize);
            }
            inner.innerHTML = html;
        } else {
            // Update target symbol if it's in existing range
            if (RESULT_INDEX < existingCount) {
                const targetSymbolImg = existingSymbols[RESULT_INDEX] as HTMLImageElement;
                if (targetSymbolImg) {
                    targetSymbolImg.src = targetPrize.image;
                    targetSymbolImg.alt = targetPrize.name;
                }
            }

            // Append new symbols to existing DOM (no flash!)
            const newSymbolsToAdd = newSymbols.length - existingCount;
            let appendHTML = '';
            for (let i = existingCount; i < newSymbols.length; i++) {
                const prize = newSymbols[i];
                appendHTML += buildSymbolHTML(prize);
            }
            inner.insertAdjacentHTML('beforeend', appendHTML);
        }

        // FORCE exact heights with JavaScript (CSS !important isn't working!)
        const symbolElements = inner.querySelectorAll('.symbol');
        if (shouldReplaceHTML) {
            // Full replacement: force all symbols
            symbolElements.forEach((el) => {
                const symbol = el as HTMLElement;
                symbol.style.height = `${SYMBOL_HEIGHT}px`;
                symbol.style.minHeight = `${SYMBOL_HEIGHT}px`;
                symbol.style.maxHeight = `${SYMBOL_HEIGHT}px`;
                symbol.style.width = `${SYMBOL_HEIGHT}px`;
                symbol.style.display = 'block';
                symbol.style.overflow = 'hidden';
                symbol.style.margin = '0';
                symbol.style.padding = '0';
                symbol.style.boxSizing = 'border-box';
                symbol.style.flexShrink = '0';
            });
        } else {
            // Only force styling on newly appended symbols (optimization!)
            for (let i = existingCount; i < symbolElements.length; i++) {
                const symbol = symbolElements[i] as HTMLElement;
                symbol.style.height = `${SYMBOL_HEIGHT}px`;
                symbol.style.minHeight = `${SYMBOL_HEIGHT}px`;
                symbol.style.maxHeight = `${SYMBOL_HEIGHT}px`;
                symbol.style.width = `${SYMBOL_HEIGHT}px`;
                symbol.style.display = 'block';
                symbol.style.overflow = 'hidden';
                symbol.style.margin = '0';
                symbol.style.padding = '0';
                symbol.style.boxSizing = 'border-box';
                symbol.style.flexShrink = '0';
            }
        }

        // Force reflow to ensure HTML is updated
        inner.offsetHeight;

        // Start tick sounds
        const tickInterval = setInterval(playTick, 70);

        // Calculate spin distance - move 19 more symbols from current position
        const spinDistance = symbolsToSpin * SYMBOL_HEIGHT;
        const newPosition = currentY - spinDistance;

        // Set the transition with dynamic duration (CRITICAL: must match setTimeout duration!)
        // Using faster easing for more intense spin: starts quick, smooth deceleration
        inner.style.transition = `transform ${duration}ms cubic-bezier(0.33, 0.0, 0.2, 1)`;

        // Trigger the CSS animation
        inner.style.transform = `translateY(${newPosition}px)`;

        // Wait for animation to complete
        setTimeout(() => {
            clearInterval(tickInterval);
            playStop();

            // Clear the transition so future position changes are instant
            inner.style.transition = 'none';

            // Highlight the winning symbol
            const symbols = inner.querySelectorAll('.symbol');
            symbols[RESULT_INDEX]?.classList.add('winner');

            resolve(resultPrize);
        }, duration);
    });
}

const handleSpin = () => {
    if (!imagesPreloaded.value) {
        return; // Don't spin until images are ready
    }
    if (props.canSpin && !isAnimating.value) {
        const button = document.querySelector('.spin-btn');
        if (button) {
            gsap.to(button, {
                scale: 0.95,
                duration: 0.1,
                ease: 'power2.in',
                onComplete: () => {
                    gsap.to(button, {
                        scale: 1,
                        duration: 0.4,
                        ease: 'elastic.out(1, 0.3)'
                    });
                }
            });
        }
        emit('spin');
    }
};

// Create bubbles for background
function createBubbles() {
    if (!bubblesContainer.value) return;

    for (let i = 0; i < 15; i++) {
        const bubble = document.createElement('div');
        bubble.className = 'bubble';
        const size = 8 + Math.random() * 25;
        bubble.style.width = size + 'px';
        bubble.style.height = size + 'px';
        bubble.style.left = Math.random() * 100 + '%';
        bubble.style.animationDuration = (6 + Math.random() * 8) + 's';
        bubble.style.animationDelay = (-Math.random() * 8) + 's';
        bubblesContainer.value.appendChild(bubble);
    }
}

watch(() => props.isSpinning, (newVal) => {
    if (newVal && !isAnimating.value) {
        spin();
    }
});

// Track if reels have been initialized
const reelsInitialized = ref(false);

// Initialize reels with symbols
function initializeReels() {
    if (reelsInitialized.value) return; // Already initialized

    // Determine symbol height based on viewport (like HTML reference)
    const SYMBOL_HEIGHT = window.innerWidth <= 550 ? 75 : 100;

    // Initialize reels
    const reels = [reel1, reel2, reel3];
    for (let i = 0; i < 3; i++) {
        const inner = reels[i].value;
        if (!inner) continue;

        // Build 200 RANDOM symbols initially (prevent all reels showing same pattern)
        const fallbackSvg = `data:image/svg+xml,${encodeURIComponent('<svg xmlns="http://www.w3.org/2000/svg" width="100" height="100"><text x="50%" y="50%" text-anchor="middle" dominant-baseline="central" font-size="60">🎰</text></svg>')}`;
        let html = '';
        const initialSymbols: string[] = [];
        for (let j = 0; j < 200; j++) {
            const prize = getRandomPrize(); // Use getRandomPrize() which has emoji fallback
            html += `<div class="symbol"><img src="${prize.image}" alt="${prize.name}" onerror="this.onerror=null;this.src='${fallbackSvg}'" /></div>`;
            initialSymbols.push(prize.name);
        }
        inner.innerHTML = html;

        // FORCE exact heights with JavaScript on initial load too!
        const symbolElements = inner.querySelectorAll('.symbol');
        symbolElements.forEach((el) => {
            const symbol = el as HTMLElement;
            symbol.style.height = `${SYMBOL_HEIGHT}px`;
            symbol.style.minHeight = `${SYMBOL_HEIGHT}px`;
            symbol.style.maxHeight = `${SYMBOL_HEIGHT}px`;
            symbol.style.width = `${SYMBOL_HEIGHT}px`;
            symbol.style.display = 'block';
            symbol.style.overflow = 'hidden';
            symbol.style.margin = '0';
            symbol.style.padding = '0';
            symbol.style.boxSizing = 'border-box';
            symbol.style.flexShrink = '0';
        });

        // Simple initial position - one symbol down (like HTML reference)
        inner.style.transform = `translateY(-${SYMBOL_HEIGHT}px)`;
    }

    reelsInitialized.value = true;
}

// Watch for showMachine to become true and initialize reels
watch(() => props.showMachine, async (newVal) => {
    if (newVal && !reelsInitialized.value) {
        if (!imagesPreloaded.value) {
            imagesPreloaded.value = false;
            await preloadImages(props.prizes);
            imagesPreloaded.value = true;
        }
        setTimeout(() => {
            initializeReels();
        }, 100);
    }
});

// Watch for prizes changes and reinitialize if needed
watch(() => props.prizes, async (newPrizes, oldPrizes) => {
    if (newPrizes) {
        imagesPreloaded.value = false;
        await preloadImages(newPrizes);
        imagesPreloaded.value = true;

        if (props.showMachine && newPrizes.length > 0) {
            if (!oldPrizes || oldPrizes.length === 0 || oldPrizes.length !== newPrizes.length) {
                reelsInitialized.value = false;
                setTimeout(() => initializeReels(), 100);
            }
        }
    }
});

onMounted(async () => {
    createBubbles();

    imagesPreloaded.value = false;
    await preloadImages(props.prizes);
    imagesPreloaded.value = true;

    if (props.showMachine) {
        initializeReels();
    }
});
</script>

<template>
    <div
        class="slots-container"
        :class="{ 'slots-container-demo': demoMode }"
        :style="{
            background: background
                ? `url(${background}) center/cover no-repeat`
                : luckyFishTheme.bg,
            '--win-glow': winGlowColor,
            '--win-glow-rgb': winGlowRgb,
            '--machine-border': machineBorderColor,
        }"
    >
        <!-- Bubbles Background (only if no custom background) -->
        <div v-if="!background" ref="bubblesContainer" class="bubbles"></div>

        <!-- Swimming Fish (only if no custom background) -->
        <div v-if="!background" class="swimming-fish" style="top: 15%; animation-duration: 25s;">🐠</div>
        <div v-if="!background" class="swimming-fish" style="top: 75%; animation-duration: 30s; animation-delay: -10s;">🐟</div>
        <div v-if="!background" class="swimming-fish" style="top: 45%; animation-duration: 35s; animation-delay: -20s; font-size: 35px;">🦈</div>

        <!-- Title Only (visible during video, floating above everything) -->
        <div v-if="!showMachine" class="title title-floating-only">
            <img v-if="titleImage" :src="titleImage" alt="Game Title" :class="['title-image', { 'title-zoom-animation': animateTitle }]" />
            <h1 v-else :style="{ color: luckyFishTheme.border }" :class="{ 'title-zoom-animation': animateTitle }">{{ luckyFishTheme.title }}</h1>
            <p :style="{ color: matchTextColor }">Match 3 in a row to win!</p>
        </div>

        <!-- Main Slot Machine (zooms in after video) -->
        <transition name="modal-card-zoom">
            <div v-if="showMachine" class="slot-machine" :class="{ 'slot-machine-win': showGoldFlames, 'slot-machine-demo': demoMode }" :style="{ background: machineBgColor, border: `5px solid ${luckyFishTheme.border}` }">

                <!-- Title (inside card) -->
                <div class="title">
                    <img v-if="titleImage" :src="titleImage" alt="Game Title" class="title-image" />
                    <h1 v-else :style="{ color: luckyFishTheme.border }">{{ luckyFishTheme.title }}</h1>
                    <p :style="{ color: matchTextColor }">Match 3 in a row to win!</p>
                </div>

            <!-- Machine Content (hidden until video ends, but reels always rendered) -->
            <transition name="machine-content-slide">
                <div v-if="showMachine">
                    <!-- Balance Bar -->
                    <div class="balance-bar">
                        <div class="balance-box">
                            <div class="label">Spins Left</div>
                            <div class="value">{{ spinsLeft }}</div>
                        </div>
                        <div class="balance-box">
                            <div class="label">Total Win</div>
                            <div class="value win-value">{{ lastWin.toFixed(2) }}</div>
                            <div v-if="totalFreeTickets > 0" class="value free-tickets-value">🎟️ +{{ totalFreeTickets }}</div>
                        </div>
                        <!-- Treasure Chest Button -->
                        <button @click="showPrizesModal = true" class="chest-btn" title="View all prizes" :style="{ background: `linear-gradient(180deg, ${inventoryButtonColor} 0%, ${inventoryButtonColor}dd 100%)` }">
                            <span 
                                v-if="currentTenant === 'auwins'" 
                                style="display: block; font-size: 0.5rem; font-weight: 900; letter-spacing: 0.05em; text-transform: uppercase; color: #000; margin-bottom: 2px; line-height: 1;"
                            >
                                Instant Wins
                            </span>
                            {{ inventoryEmoji }}
                        </button>
                    </div>
                </div>
            </transition>

            <!-- Slot Window (always rendered for refs to work) -->
            <div class="slot-window" :style="{
                background: luckyFishTheme.reelBg,
                border: `4px solid ${luckyFishTheme.border}`,
                opacity: showMachine ? 1 : 0,
                transform: showMachine ? 'scale(1)' : 'scale(0.95)',
                transition: 'opacity 0.8s ease, transform 0.8s ease',
                pointerEvents: showMachine ? 'auto' : 'none'
            }">
                <!-- Payline -->
                <div class="payline-indicator"></div>

                <!-- Reels -->
                <div class="reels-container" :class="{ 'reels-spinning': isAnimating, 'reels-winning': showGoldFlames }">
                    <div class="reel" :class="{ 'reel-winning': showGoldFlames }">
                        <div ref="reel1" class="reel-inner"></div>
                    </div>
                    <div class="reel" :class="{ 'reel-winning': showGoldFlames }">
                        <div ref="reel2" class="reel-inner"></div>
                    </div>
                    <div class="reel" :class="{ 'reel-winning': showGoldFlames }">
                        <div ref="reel3" class="reel-inner"></div>
                    </div>
                </div>
            </div>

            <!-- Controls (hidden until video ends) -->
            <transition name="machine-content-slide">
                <div v-if="showMachine">
                    <div class="controls">
                        <!-- Spin Button -->
                        <button
                            @click="handleSpin"
                            :disabled="!canSpin || isAnimating || !imagesPreloaded"
                            class="spin-btn spin-btn-full"
                            :class="{ 'spin-btn-image': spinButtonImage, 'btn-spinning': isAnimating }"
                            :style="{
                                background: isAnimating
                                    ? 'linear-gradient(180deg, #555 0%, #333 100%)'
                                    : !imagesPreloaded
                                    ? 'linear-gradient(180deg, #555 0%, #333 100%)'
                                    : `linear-gradient(180deg, ${colors.primary} 0%, ${colors.secondary} 50%, #006666 100%)`,
                                borderColor: luckyFishTheme.border
                            }">
                            <img v-if="spinButtonImage && imagesPreloaded" :src="spinButtonImage" alt="Spin" class="spin-btn-img" />
                            <span v-else>{{ isAnimating ? '🌊 SPINNING... 🌊' : !imagesPreloaded ? '⏳ LOADING...' : '🌊 SPIN 🌊' }}</span>
                        </button>
                    </div>
                </div>
            </transition>
        </div>
        </transition>

        <!-- Prizes Modal -->
        <Transition name="modal-fade">
            <div v-if="showPrizesModal" class="modal-overlay" @click="showPrizesModal = false">
                <div class="modal-content" @click.stop :style="{
                    background: `linear-gradient(180deg, ${prizesModalBgColor} 0%, ${prizesModalBgColor}dd 100%)`,
                    border: `4px solid ${prizesCardBorderColor}`,
                    boxShadow: `0 0 50px ${prizesCardBorderColor}80, 0 20px 60px rgba(0,0,0,0.8)`
                }">
                    <button class="modal-close" @click="showPrizesModal = false">✕</button>
                    <h2 class="modal-title" :style="{
                        color: prizesTitleColor,
                        textShadow: `0 0 20px ${prizesTitleColor}80`
                    }">{{ inventoryEmoji }} Available Prizes {{ inventoryEmoji }}</h2>
                    <div class="prizes-grid">
                        <div v-for="prize in prizes" :key="prize.id" class="prize-card" :style="{
                            background: `${prizesCardBgColor}cc`,
                            border: `3px solid ${prizesCardBorderColor}99`
                        }">
                            <img :src="prize.image" :alt="prize.name" class="prize-image" />
                            <div class="prize-name">{{ prize.no_auto_credit ? (prize.category_name || prize.name) : prize.name }}</div>
                            <div class="prize-value" :style="{ color: prizesValueColor }">
                                <template v-if="prize.no_auto_credit">{{ prize.name }}</template>
                                <template v-else>&pound;{{ prize.value }}</template>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </Transition>

        <!-- 🎉 EPIC WIN REVEAL OVERLAY 🎉 -->
        <Transition name="win-reveal">
            <div v-if="showWinReveal && winningPrize" class="win-reveal-overlay">
                <div class="win-reveal-content">
                    <!-- Merging Reels Animation -->
                    <div class="reels-merge">
                        <div class="merge-reel merge-reel-1"></div>
                        <div class="merge-reel merge-reel-2"></div>
                        <div class="merge-reel merge-reel-3"></div>
                    </div>

                    <!-- Prize Burst Reveal -->
                    <div class="prize-reveal">
                        <div class="win-text">🎉 YOU WON! 🎉</div>
                        <div class="prize-image-container">
                            <img :src="winningPrize.image" :alt="winningPrize.name" class="prize-reveal-image" />
                        </div>
                        <div class="prize-reveal-name">{{ winningPrize.name }}</div>
                        <div v-if="!winningPrize.no_auto_credit" class="prize-reveal-value">&pound;{{ winningPrize.value }}</div>
                    </div>

                    <!-- Explosion particles -->
                    <div class="explosion-particles">
                        <div v-for="i in 20" :key="i" class="particle" :style="{ '--angle': (i * 18) + 'deg' }">💥</div>
                    </div>
                </div>
            </div>
        </Transition>
    </div>
</template>

<style scoped>
@import url('https://fonts.googleapis.com/css2?family=Luckiest+Guy&family=Nunito:wght@600;800;900&display=swap');

.slots-container {
    width: 100%;
    min-height: 100vh;
    display: flex;
    justify-content: center;
    align-items: center;
    padding: 20px;
    position: relative;
    overflow: hidden;
}

@media (max-width: 550px) {
    .slots-container {
        padding: 5px;
    }
}

.slots-container-demo {
    min-height: 100%;
    height: 100%;
    padding: 5px 5px;
    align-items: flex-start;
    justify-content: flex-start;
    overflow-y: auto;
}

/* Bubbles Background */
.bubbles {
    position: fixed;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    pointer-events: none;
    overflow: hidden;
}

.bubble {
    position: absolute;
    bottom: -100px;
    background: radial-gradient(circle at 30% 30%, rgba(255,255,255,0.8), rgba(255,255,255,0.1));
    border-radius: 50%;
    animation: rise linear infinite;
}

@keyframes rise {
    0% { transform: translateY(0) translateX(0); opacity: 0.6; }
    50% { transform: translateY(-50vh) translateX(20px); }
    100% { transform: translateY(-110vh) translateX(-10px); opacity: 0; }
}

/* Swimming Fish */
.swimming-fish {
    position: fixed;
    font-size: 50px;
    animation: swim linear infinite;
    pointer-events: none;
    opacity: 0.5;
}

@keyframes swim {
    0% { transform: translateX(-100px) scaleX(1); }
    49% { transform: translateX(calc(100vw + 50px)) scaleX(1); }
    50% { transform: translateX(calc(100vw + 50px)) scaleX(-1); }
    100% { transform: translateX(-100px) scaleX(-1); }
}

.slot-machine {
    border-radius: 30px;
    padding: 30px;
    box-shadow:
        0 20px 60px rgba(0,0,0,0.6),
        0 0 100px rgba(0,200,255,0.2),
        inset 0 2px 10px rgba(255,255,255,0.1);
    max-width: 400px;
    width: 100%;
    position: relative;
    z-index: 10;
    transition: box-shadow 0.3s ease, border 0.3s ease;
}

/* Win State - Gold Flames Around Edges */
.slot-machine-win {
    animation: flame-border 1.2s ease-in-out infinite alternate;
    border: 5px solid var(--win-glow, #FFD700) !important;
}

.slot-machine-win::before {
    content: '';
    position: absolute;
    top: -15px;
    left: -15px;
    right: -15px;
    bottom: -15px;
    border-radius: 35px;
    background: linear-gradient(45deg,
        transparent 0%,
        rgba(var(--win-glow-rgb, 255, 215, 0), 0.12) 25%,
        rgba(var(--win-glow-rgb, 255, 215, 0), 0.15) 50%,
        rgba(var(--win-glow-rgb, 255, 215, 0), 0.12) 75%,
        transparent 100%
    );
    filter: blur(8px);
    opacity: 0.4;
    z-index: -1;
    pointer-events: none;
}

.slot-machine-win::after {
    content: '';
    position: absolute;
    top: -10px;
    left: -10px;
    right: -10px;
    bottom: -10px;
    border-radius: 33px;
    background: linear-gradient(
        -45deg,
        rgba(var(--win-glow-rgb, 255, 215, 0), 0.15),
        rgba(var(--win-glow-rgb, 255, 215, 0), 0.18),
        rgba(var(--win-glow-rgb, 255, 215, 0), 0.2),
        rgba(var(--win-glow-rgb, 255, 215, 0), 0.18),
        rgba(var(--win-glow-rgb, 255, 215, 0), 0.15)
    );
    background-size: 400% 400%;
    animation: flame-gradient 2s ease infinite;
    filter: blur(6px);
    z-index: -1;
    pointer-events: none;
}

@keyframes flame-border {
    0% {
        box-shadow:
            0 20px 60px rgba(0,0,0,0.6),
            0 0 20px rgba(var(--win-glow-rgb, 255, 215, 0), 0.3),
            0 0 40px rgba(var(--win-glow-rgb, 255, 215, 0), 0.2),
            0 0 60px rgba(var(--win-glow-rgb, 255, 215, 0), 0.12),
            inset 0 0 15px rgba(var(--win-glow-rgb, 255, 215, 0), 0.08);
        border-color: var(--win-glow, #FFD700);
    }
    30% {
        box-shadow:
            0 20px 60px rgba(0,0,0,0.6),
            0 0 28px rgba(var(--win-glow-rgb, 255, 215, 0), 0.4),
            0 0 50px rgba(var(--win-glow-rgb, 255, 215, 0), 0.25),
            0 0 70px rgba(var(--win-glow-rgb, 255, 215, 0), 0.15),
            inset 0 0 20px rgba(var(--win-glow-rgb, 255, 215, 0), 0.1);
        border-color: var(--win-glow, #FFD700);
    }
    100% {
        box-shadow:
            0 20px 60px rgba(0,0,0,0.6),
            0 0 35px rgba(var(--win-glow-rgb, 255, 215, 0), 0.5),
            0 0 60px rgba(var(--win-glow-rgb, 255, 215, 0), 0.3),
            0 0 80px rgba(var(--win-glow-rgb, 255, 215, 0), 0.18),
            inset 0 0 25px rgba(var(--win-glow-rgb, 255, 215, 0), 0.12);
        border-color: var(--win-glow, #FFD700);
    }
}

@keyframes flame-rotate {
    0% {
        transform: rotate(0deg) scale(1);
        opacity: 0.4;
    }
    50% {
        transform: rotate(180deg) scale(1.02);
        opacity: 0.5;
    }
    100% {
        transform: rotate(360deg) scale(1);
        opacity: 0.4;
    }
}

@keyframes flame-gradient {
    0% {
        background-position: 0% 50%;
        opacity: 0.7;
    }
    25% {
        opacity: 0.9;
    }
    50% {
        background-position: 100% 50%;
        opacity: 0.7;
    }
    75% {
        opacity: 0.9;
    }
    100% {
        background-position: 0% 50%;
        opacity: 0.7;
    }
}

.title {
    text-align: center;
    margin-bottom: 20px;
}

/* Title Floating Only - visible during video, centered on screen */
.title-floating-only {
    position: fixed;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
    z-index: 20;
    text-align: center;
    text-shadow:
        0 0 30px rgba(0,255,255,0.9),
        0 0 60px rgba(0,255,255,0.6),
        4px 4px 0 rgba(0,0,0,0.7);
}

.title-floating-only h1 {
    font-family: 'Luckiest Guy', cursive;
    font-size: 3.5rem;
    margin-bottom: 15px;
}

.title-floating-only p {
    color: var(--win-glow, #FFD700);
    font-size: 1.4rem;
    font-weight: bold;
    text-shadow:
        0 0 20px rgba(var(--win-glow-rgb, 255, 215, 0), 0.9),
        0 0 40px rgba(var(--win-glow-rgb, 255, 215, 0), 0.6),
        2px 2px 0 rgba(0,0,0,0.7);
}

.title-floating-only .title-image {
    max-width: 400px;
    max-height: 180px;
    margin-bottom: 15px;
}

.title h1 {
    font-family: 'Luckiest Guy', cursive;
    font-size: 2.8rem;
    text-shadow:
        3px 3px 0 #004466,
        0 0 30px rgba(0,255,255,0.7);
    letter-spacing: 2px;
}

.title-image {
    max-width: 100%;
    max-height: 120px;
    width: auto;
    height: auto;
    object-fit: contain;
    margin: 0 auto;
    display: block;
    filter: drop-shadow(0 0 20px rgba(0,255,255,0.5));
}

/* Title Zoom Animation - zooms in from large to normal with glow */
.title-zoom-animation {
    animation: title-zoom-glow 1.2s cubic-bezier(0.34, 1.56, 0.64, 1);
}

@keyframes title-zoom-glow {
    0% {
        transform: scale(2.5);
        opacity: 0;
        filter: drop-shadow(0 0 40px rgba(255, 215, 0, 0.9))
                drop-shadow(0 0 60px rgba(255, 215, 0, 0.6))
                brightness(1.5);
    }
    40% {
        transform: scale(1.3);
        opacity: 0.9;
        filter: drop-shadow(0 0 30px rgba(255, 215, 0, 0.7))
                drop-shadow(0 0 45px rgba(255, 215, 0, 0.4))
                brightness(1.3);
    }
    70% {
        transform: scale(0.95);
        opacity: 1;
        filter: drop-shadow(0 0 15px rgba(255, 215, 0, 0.4))
                brightness(1.1);
    }
    100% {
        transform: scale(1);
        opacity: 1;
        filter: drop-shadow(0 0 20px rgba(0,255,255,0.5))
                brightness(1);
    }
}

.title p {
    color: #7FDBFF;
    font-size: 1rem;
    margin-top: 5px;
}

/* Machine Content Slide Transition - gentle reveal of content */
.machine-content-slide-enter-active {
    animation: machine-content-reveal 0.8s cubic-bezier(0.25, 0.46, 0.45, 0.94);
}

.machine-content-slide-leave-active {
    animation: machine-content-reveal 0.4s cubic-bezier(0.55, 0.085, 0.68, 0.53) reverse;
}

@keyframes machine-content-reveal {
    0% {
        opacity: 0;
        transform: translateY(20px);
        max-height: 0;
    }
    100% {
        opacity: 1;
        transform: translateY(0);
        max-height: 1000px;
    }
}

/* Modal Card Zoom Transition - zooms in entire blue modal */
.modal-card-zoom-enter-active {
    animation: modal-card-zoom-in 0.8s cubic-bezier(0.34, 1.56, 0.64, 1);
}

.modal-card-zoom-leave-active {
    animation: modal-card-zoom-in 0.4s cubic-bezier(0.55, 0.085, 0.68, 0.53) reverse;
}

@keyframes modal-card-zoom-in {
    0% {
        transform: scale(0.2);
        opacity: 0;
    }
    60% {
        transform: scale(1.05);
        opacity: 1;
    }
    100% {
        transform: scale(1);
        opacity: 1;
    }
}

/* Balance Display */
.balance-bar {
    display: flex;
    justify-content: space-between;
    margin-bottom: 20px;
    gap: 15px;
}

.balance-box {
    flex: 1;
    background: linear-gradient(180deg, #001a2e 0%, #000d17 100%);
    border: 3px solid var(--machine-border, #00BFFF);
    border-radius: 15px;
    padding: 15px;
    text-align: center;
}

.balance-box .label {
    font-size: 0.75rem;
    color: var(--machine-border, #00BFFF);
    text-transform: uppercase;
    letter-spacing: 1px;
}

.balance-box .value {
    font-size: 1.8rem;
    font-weight: 900;
    color: #00FF88;
    text-shadow: 0 0 15px rgba(0,255,136,0.7);
}

.balance-box .value.win-value {
    color: var(--win-glow, #FFD700);
    text-shadow: 0 0 15px rgba(var(--win-glow-rgb, 255, 215, 0), 0.7);
}

.balance-box .value.free-tickets-value {
    font-size: 0.95rem;
    font-weight: 700;
    color: #4ade80;
    text-shadow: none;
    margin-top: 2px;
}

.slot-window {
    border-radius: 20px;
    padding: 20px;
    box-shadow:
        inset 0 0 50px rgba(0,0,0,0.9),
        0 0 30px rgba(0,191,255,0.3);
    position: relative;
    transform-style: preserve-3d;
    perspective: 1000px;
}

/* Payline indicator */
.payline-indicator {
    position: absolute;
    left: 0;
    right: 0;
    top: 50%;
    transform: translateY(-50%);
    height: 100px; /* Match symbol height - will be 75px on mobile */
    border: 3px solid var(--win-glow, #FFD700);
    border-left: none;
    border-right: none;
    pointer-events: none;
    box-shadow:
        0 0 20px rgba(var(--win-glow-rgb, 255, 215, 0), 0.5),
        inset 0 0 30px rgba(var(--win-glow-rgb, 255, 215, 0), 0.1);
    z-index: 5;
}

.payline-indicator::before {
    content: '➤';
    position: absolute;
    left: 5px;
    top: 50%;
    transform: translateY(-50%);
    color: var(--win-glow, #FFD700);
    font-size: 24px;
    text-shadow: 0 0 10px var(--win-glow, #FFD700);
}

.payline-indicator::after {
    content: '➤';
    position: absolute;
    right: 5px;
    top: 50%;
    transform: translateY(-50%) scaleX(-1);
    color: var(--win-glow, #FFD700);
    font-size: 24px;
    text-shadow: 0 0 10px var(--win-glow, #FFD700);
}

/* Reels */
.reels-container {
    display: flex;
    gap: 8px;
    justify-content: center;
    perspective: 1200px; /* 3D perspective */
    animation: reels-pulsate 2s ease-in-out infinite;
    will-change: transform, filter;
}

/* Stop pulsating when spinning */
.reels-container.reels-spinning {
    animation: none !important;
    transform: scale(1);
    filter: none;
}

/* Gold flash when winning */
.reels-container.reels-winning {
    animation: gold-flash 1s ease-in-out 5 !important;
}

@keyframes gold-flash {
    0% {
        filter: drop-shadow(0 0 0px rgba(var(--win-glow-rgb, 255, 215, 0), 0));
    }
    40% {
        filter: drop-shadow(0 0 15px rgba(var(--win-glow-rgb, 255, 215, 0), 0.4));
    }
    60% {
        filter: drop-shadow(0 0 30px rgba(var(--win-glow-rgb, 255, 215, 0), 0.8));
    }
    100% {
        filter: drop-shadow(0 0 0px rgba(var(--win-glow-rgb, 255, 215, 0), 0));
    }
}

@keyframes reels-pulsate {
    0%, 100% {
        transform: scale(1);
        filter: drop-shadow(0 0 0px rgba(0,255,255,0));
    }
    50% {
        transform: scale(1.05);
        filter: drop-shadow(0 0 25px rgba(0,255,255,0.6));
    }
}

.reel {
    width: 100px;
    height: 300px; /* 3 symbols x 100px */
    background: linear-gradient(180deg, #051525 0%, #0a2035 50%, #051525 100%);
    border-radius: 15px;
    overflow: hidden;
    position: relative;
    border: 2px solid #1a4a6a;
    box-shadow:
        0 10px 30px rgba(0,0,0,0.6),
        0 2px 10px rgba(0,191,255,0.2),
        inset 0 -5px 20px rgba(0,0,0,0.4);
}

.reel::before,
.reel::after {
    content: '';
    position: absolute;
    left: 0;
    right: 0;
    height: 50px;
    pointer-events: none;
    z-index: 2;
}

.reel::before {
    top: 0;
    background: linear-gradient(180deg, rgba(0,0,0,0.8) 0%, transparent 100%);
}

.reel::after {
    bottom: 0;
    background: linear-gradient(0deg, rgba(0,0,0,0.8) 0%, transparent 100%);
}

/* Winning State - Gold Flash Effect */
.reel-winning {
    animation: gold-pulse 1s ease-in-out 5;
    border-color: var(--win-glow, #FFD700) !important;
}

@keyframes gold-pulse {
    0% {
        box-shadow:
            0 10px 30px rgba(0,0,0,0.6),
            0 2px 10px rgba(0,191,255,0.2),
            inset 0 -5px 20px rgba(0,0,0,0.4);
    }
    40% {
        box-shadow:
            0 10px 30px rgba(0,0,0,0.6),
            0 5px 15px rgba(var(--win-glow-rgb, 255, 215, 0), 0.3),
            0 0 10px rgba(var(--win-glow-rgb, 255, 215, 0), 0.2),
            inset 0 0 10px rgba(var(--win-glow-rgb, 255, 215, 0), 0.1);
    }
    60% {
        box-shadow:
            0 10px 30px rgba(var(--win-glow-rgb, 255, 215, 0), 0.4),
            0 0 20px rgba(var(--win-glow-rgb, 255, 215, 0), 0.6),
            0 0 40px rgba(var(--win-glow-rgb, 255, 215, 0), 0.4),
            inset 0 0 20px rgba(var(--win-glow-rgb, 255, 215, 0), 0.2);
    }
    100% {
        box-shadow:
            0 10px 30px rgba(0,0,0,0.6),
            0 2px 10px rgba(0,191,255,0.2),
            inset 0 -5px 20px rgba(0,0,0,0.4);
    }
}

.reel-inner {
    position: absolute;
    width: 100%;
    transition: none; /* Default: no transition */
    display: flex;
    flex-direction: column;
    gap: 0;
}

.reel-inner.spinning {
    /* Transition is controlled by JS - do not override here */
}

.symbol {
    display: block !important; /* Block, not flex */
    width: 100px !important;
    height: 100px !important; /* FORCE exact height */
    min-height: 100px !important;
    max-height: 100px !important;
    line-height: 100px !important; /* Force line height */
    padding: 0 !important;
    margin: 0 !important;
    box-sizing: border-box !important;
    border: 3px solid rgba(0,191,255,0.6) !important;
    border-radius: 10px;
    background: rgba(0,20,30,0.8);
    box-shadow:
        0 4px 8px rgba(0,0,0,0.5),
        inset 0 0 20px rgba(0,191,255,0.1);
    overflow: hidden !important;
    position: relative;
    flex-shrink: 0;
}

.symbol img {
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
    width: 90%;
    height: 90%;
    object-fit: contain;
    display: block;
    border-radius: 5px;
}

.symbol.winner {
    filter: drop-shadow(0 0 25px rgba(var(--win-glow-rgb, 255, 215, 0), 1)) drop-shadow(0 0 50px rgba(var(--win-glow-rgb, 255, 215, 0), 0.8));
    border: 3px solid rgba(var(--win-glow-rgb, 255, 215, 0), 0.9) !important;
}

/* Controls */
.controls {
    margin-top: 25px;
    display: flex;
    flex-direction: column;
    gap: 15px;
}

.spin-row {
    display: flex;
    justify-content: center;
    gap: 15px;
}

.spin-btn {
    background: linear-gradient(180deg, #00CED1 0%, #008B8B 50%, #006666 100%);
    border: 4px solid #00FFFF;
    border-radius: 25px;
    padding: 20px 70px;
    color: white;
    font-size: 2rem;
    font-family: 'Luckiest Guy', cursive;
    letter-spacing: 2px;
    cursor: pointer;
    transition: all 0.3s;
    box-shadow:
        0 8px 0 #004d4d,
        0 15px 30px rgba(0,0,0,0.4);
    text-shadow: 2px 2px 0 rgba(0,0,0,0.3);
    position: relative;
    overflow: hidden;
}

.spin-btn::before {
    content: '';
    position: absolute;
    top: 0;
    left: -100%;
    width: 100%;
    height: 100%;
    background: linear-gradient(90deg, transparent, rgba(255,255,255,0.3), transparent);
    transition: left 0.5s;
}

.spin-btn:hover:not(:disabled)::before {
    left: 100%;
}

.spin-btn:hover:not(:disabled) {
    transform: translateY(-3px);
    box-shadow:
        0 11px 0 #004d4d,
        0 20px 40px rgba(0,0,0,0.5),
        0 0 40px rgba(0,206,209,0.5);
}

.spin-btn:active:not(:disabled) {
    transform: translateY(4px);
    box-shadow: 0 4px 0 #004d4d;
}

.spin-btn:disabled {
    background: linear-gradient(180deg, #555 0%, #333 100%);
    border-color: #666;
    cursor: not-allowed;
    opacity: 0.7;
}

.spin-btn-full {
    width: 100%;
    padding: 20px 40px;
}

.spin-btn-full:not(:disabled):not(.spin-btn-image) {
    animation: spin-btn-pulse 2s ease-in-out infinite;
    will-change: transform, box-shadow;
}

/* Match exact same timing as reels for perfect sync */
@keyframes spin-btn-pulse {
    0%, 100% {
        transform: scale(1) translateY(0);
        box-shadow: 0 8px 0 #004d4d, 0 15px 30px rgba(0,0,0,0.4);
    }
    50% {
        transform: scale(1.05) translateY(-3px);
        box-shadow: 0 11px 0 #004d4d, 0 20px 40px rgba(0,0,0,0.5), 0 0 25px rgba(0,206,209,0.3);
    }
}

/* Stop default spin button animation when spinning */
.spin-btn-full.btn-spinning {
    animation: none !important;
}

.spin-btn-image {
    padding: 0 !important;
    background: transparent !important;
    border: none !important;
    box-shadow: none !important;
    min-height: 80px;
}

.spin-btn-image.spin-btn-full {
    display: flex;
    align-items: center;
    justify-content: center;
}

/* Pulsate animation for image spin button */
.spin-btn-image.spin-btn-full:not(:disabled) {
    animation: spin-btn-image-pulse 2s ease-in-out infinite;
    will-change: transform, filter;
}

@keyframes spin-btn-image-pulse {
    0%, 100% {
        transform: scale(1) translateY(0);
    }
    50% {
        transform: scale(1.05) translateY(-3px);
        filter: drop-shadow(0 8px 16px rgba(0,0,0,0.6)) drop-shadow(0 0 25px rgba(0,206,209,0.4));
    }
}

/* Stop image spin button animation when spinning */
.spin-btn-image.spin-btn-full.btn-spinning {
    animation: none !important;
}

.spin-btn-img {
    width: 100%;
    height: 100%;
    min-height: 80px;
    object-fit: cover;
    display: block;
    filter: drop-shadow(0 4px 8px rgba(0,0,0,0.4));
    transition: all 0.3s;
}

.spin-btn:hover:not(:disabled) .spin-btn-img {
    filter: drop-shadow(0 8px 16px rgba(0,0,0,0.6)) drop-shadow(0 0 20px rgba(0,206,209,0.5));
}

/* How to Win */
.how-to-win {
    text-align: center;
    margin-top: 15px;
    padding: 10px;
    background: rgba(255,215,0,0.1);
    border-radius: 10px;
    border: 1px solid rgba(255,215,0,0.3);
}

.how-to-win p {
    color: #FFD700;
    font-size: 0.85rem;
}

/* Treasure Chest Button */
.chest-btn {
    font-size: 2.5rem;
    background: linear-gradient(180deg, #FFD700 0%, #FFA500 100%);
    border: 4px solid #FF8C00;
    border-radius: 15px;
    padding: 10px 20px;
    cursor: pointer;
    transition: all 0.3s;
    box-shadow: 0 6px 0 #CC7000, 0 12px 20px rgba(0,0,0,0.3);
    animation: chest-bounce 2s ease-in-out infinite;
}

.chest-btn:hover {
    transform: translateY(-3px) scale(1.05);
    box-shadow: 0 9px 0 #CC7000, 0 15px 25px rgba(0,0,0,0.4);
}

.chest-btn:active {
    transform: translateY(3px);
    box-shadow: 0 3px 0 #CC7000;
}

@keyframes chest-bounce {
    0%, 100% { transform: translateY(0); }
    50% { transform: translateY(-5px); }
}

/* Modal */
.modal-overlay {
    position: fixed;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    background: rgba(0, 0, 0, 0.85);
    display: flex;
    align-items: center;
    justify-content: center;
    z-index: 9999;
    padding: 20px;
}

.modal-content {
    background: linear-gradient(180deg, #001a2e 0%, #000d17 100%);
    border: 4px solid #00FFFF;
    border-radius: 20px;
    padding: 30px;
    max-width: 600px;
    width: 100%;
    max-height: 80vh;
    overflow-y: auto;
    position: relative;
    box-shadow: 0 0 50px rgba(0,255,255,0.5), 0 20px 60px rgba(0,0,0,0.8);
}

.modal-close {
    position: absolute;
    top: 15px;
    right: 15px;
    background: #FF4444;
    border: none;
    color: white;
    font-size: 1.5rem;
    width: 35px;
    height: 35px;
    border-radius: 50%;
    cursor: pointer;
    transition: all 0.3s;
    font-weight: bold;
}

.modal-close:hover {
    background: #FF0000;
    transform: rotate(90deg);
}

.modal-title {
    color: #00FFFF;
    font-family: 'Luckiest Guy', cursive;
    font-size: 2rem;
    text-align: center;
    margin-bottom: 25px;
    text-shadow: 0 0 20px rgba(0,255,255,0.8);
}

.prizes-grid {
    display: grid;
    grid-template-columns: repeat(auto-fill, minmax(150px, 1fr));
    gap: 20px;
}

.prize-card {
    background: rgba(0,20,30,0.8);
    border: 3px solid rgba(0,191,255,0.6);
    border-radius: 15px;
    padding: 15px;
    text-align: center;
    transition: all 0.3s;
    cursor: pointer;
}

.prize-card:hover {
    transform: translateY(-5px);
    border-color: #00FFFF;
    box-shadow: 0 10px 30px rgba(0,255,255,0.4);
}

.prize-image {
    width: 100%;
    height: 120px;
    object-fit: contain;
    margin-bottom: 10px;
    border-radius: 10px;
}

.prize-name {
    color: #FFFFFF;
    font-weight: bold;
    font-size: 0.9rem;
    margin-bottom: 5px;
}

.prize-value {
    color: #FFD700;
    font-size: 1.2rem;
    font-weight: 900;
    text-shadow: 0 0 10px rgba(255,215,0,0.5);
}

/* Modal Transition - EPIC TREASURE CHEST SLAM! */
.modal-fade-enter-active {
    transition: opacity 0.5s;
}

.modal-fade-leave-active {
    transition: opacity 0.3s;
}

.modal-fade-enter-from, .modal-fade-leave-to {
    opacity: 0;
}

.modal-fade-enter-active .modal-content {
    animation: chest-slam 0.8s cubic-bezier(0.34, 1.56, 0.64, 1);
}

.modal-overlay::before {
    content: '';
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    pointer-events: none;
}

.modal-fade-enter-active .modal-overlay::after {
    content: '';
    position: absolute;
    top: 50%;
    left: 50%;
    width: 300px;
    height: 300px;
    margin: -150px 0 0 -150px;
    background: radial-gradient(circle, rgba(0,255,255,0.6) 0%, transparent 70%);
    animation: bubble-burst 0.8s ease-out;
    pointer-events: none;
}

@keyframes chest-slam {
    0% {
        transform: translateY(-800px) rotateY(180deg) rotateZ(-20deg) scale(0.3);
        opacity: 0;
    }
    50% {
        transform: translateY(-100px) rotateY(90deg) rotateZ(-10deg) scale(0.7);
        opacity: 0.8;
    }
    70% {
        transform: translateY(30px) rotateY(0deg) rotateZ(5deg) scale(1.1);
    }
    85% {
        transform: translateY(-15px) rotateY(0deg) rotateZ(-3deg) scale(0.95);
    }
    100% {
        transform: translateY(0) rotateY(0deg) rotateZ(0deg) scale(1);
        opacity: 1;
    }
}

@keyframes bubble-burst {
    0% {
        transform: scale(0);
        opacity: 1;
    }
    50% {
        transform: scale(2);
        opacity: 0.6;
    }
    100% {
        transform: scale(4);
        opacity: 0;
    }
}

/* Bubble particles on modal open */
.modal-content::before,
.modal-content::after {
    content: '💧';
    position: absolute;
    font-size: 2rem;
    opacity: 0;
    pointer-events: none;
}

.modal-fade-enter-active .modal-content::before {
    top: -20px;
    left: 20px;
    animation: bubble-float-left 0.8s ease-out;
}

.modal-fade-enter-active .modal-content::after {
    top: -20px;
    right: 20px;
    animation: bubble-float-right 0.8s ease-out;
}

@keyframes bubble-float-left {
    0% {
        transform: translateY(0) translateX(0) scale(0);
        opacity: 1;
    }
    100% {
        transform: translateY(-100px) translateX(-50px) scale(1.5);
        opacity: 0;
    }
}

@keyframes bubble-float-right {
    0% {
        transform: translateY(0) translateX(0) scale(0);
        opacity: 1;
    }
    100% {
        transform: translateY(-100px) translateX(50px) scale(1.5);
        opacity: 0;
    }
}

/* 🎉 EPIC WIN REVEAL OVERLAY 🎉 */
.win-reveal-overlay {
    position: fixed;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    background: radial-gradient(circle, rgba(var(--win-glow-rgb, 255, 215, 0), 0.3) 0%, rgba(0,0,0,0.95) 100%);
    display: flex;
    align-items: center;
    justify-content: center;
    z-index: 99999;
    backdrop-filter: blur(10px);
}

.win-reveal-content {
    position: relative;
    width: 100%;
    height: 100%;
    display: flex;
    align-items: center;
    justify-content: center;
}

/* Merging Reels Animation */
.reels-merge {
    position: absolute;
    display: flex;
    gap: 20px;
    animation: reels-merge-animate 1.5s cubic-bezier(0.68, -0.55, 0.265, 1.55);
}

.merge-reel {
    width: 100px;
    height: 300px;
    background: linear-gradient(180deg, #051525 0%, #0a2035 50%, #051525 100%);
    border: 3px solid #00FFFF;
    border-radius: 15px;
    box-shadow: 0 10px 40px rgba(0,255,255,0.6);
}

.merge-reel-1 {
    animation: merge-left 1.5s cubic-bezier(0.68, -0.55, 0.265, 1.55);
}

.merge-reel-2 {
    animation: merge-center 1.5s cubic-bezier(0.68, -0.55, 0.265, 1.55);
}

.merge-reel-3 {
    animation: merge-right 1.5s cubic-bezier(0.68, -0.55, 0.265, 1.55);
}

@keyframes merge-left {
    0% {
        transform: translateX(-300px) scale(1);
        opacity: 1;
    }
    60% {
        transform: translateX(0) scale(1);
        opacity: 1;
    }
    100% {
        transform: translateX(0) scale(0) rotate(360deg);
        opacity: 0;
    }
}

@keyframes merge-center {
    0% {
        transform: translateX(0) scale(1);
        opacity: 1;
    }
    60% {
        transform: translateX(0) scale(1.2);
        opacity: 1;
    }
    100% {
        transform: translateX(0) scale(0) rotate(-360deg);
        opacity: 0;
    }
}

@keyframes merge-right {
    0% {
        transform: translateX(300px) scale(1);
        opacity: 1;
    }
    60% {
        transform: translateX(0) scale(1);
        opacity: 1;
    }
    100% {
        transform: translateX(0) scale(0) rotate(360deg);
        opacity: 0;
    }
}

/* Prize Reveal - appears after reels merge */
.prize-reveal {
    position: absolute;
    text-align: center;
    animation: prize-burst 1.5s cubic-bezier(0.175, 0.885, 0.32, 1.275);
    animation-delay: 0.8s;
    animation-fill-mode: both;
}

.win-text {
    font-family: 'Luckiest Guy', cursive;
    font-size: 4rem;
    color: var(--win-glow, #FFD700);
    text-shadow:
        0 0 20px rgba(var(--win-glow-rgb, 255, 215, 0), 1),
        0 0 40px rgba(var(--win-glow-rgb, 255, 215, 0), 0.8),
        0 0 60px rgba(var(--win-glow-rgb, 255, 215, 0), 0.6),
        4px 4px 0 rgba(0,0,0,0.5);
    margin-bottom: 30px;
    animation: text-pulse 1s ease-in-out infinite;
}

.prize-image-container {
    width: 300px;
    height: 300px;
    margin: 0 auto 20px;
    position: relative;
}

.prize-reveal-image {
    width: 100%;
    height: 100%;
    object-fit: contain;
    filter: drop-shadow(0 0 30px rgba(var(--win-glow-rgb, 255, 215, 0), 0.8));
    animation: prize-spin 2s ease-in-out infinite;
}

.prize-reveal-name {
    font-family: 'Luckiest Guy', cursive;
    font-size: 2.5rem;
    color: #FFFFFF;
    text-shadow:
        0 0 10px rgba(0,255,255,0.8),
        3px 3px 0 rgba(0,0,0,0.5);
    margin-bottom: 10px;
}

.prize-reveal-value {
    font-family: 'Luckiest Guy', cursive;
    font-size: 3.5rem;
    color: var(--win-glow, #FFD700);
    text-shadow:
        0 0 20px rgba(var(--win-glow-rgb, 255, 215, 0), 1),
        0 0 40px rgba(var(--win-glow-rgb, 255, 215, 0), 0.6),
        4px 4px 0 rgba(0,0,0,0.5);
}

@keyframes prize-burst {
    0% {
        transform: scale(0) rotate(-180deg);
        opacity: 0;
    }
    50% {
        transform: scale(1.3) rotate(10deg);
    }
    100% {
        transform: scale(1) rotate(0deg);
        opacity: 1;
    }
}

@keyframes text-pulse {
    0%, 100% {
        transform: scale(1);
    }
    50% {
        transform: scale(1.1);
    }
}

@keyframes prize-spin {
    0%, 100% {
        transform: rotate(-5deg) scale(1);
    }
    50% {
        transform: rotate(5deg) scale(1.05);
    }
}

/* Explosion Particles */
.explosion-particles {
    position: absolute;
    width: 100%;
    height: 100%;
    pointer-events: none;
}

.particle {
    position: absolute;
    top: 50%;
    left: 50%;
    font-size: 3rem;
    animation: particle-explode 1.2s ease-out;
    animation-delay: 0.8s;
    animation-fill-mode: both;
    transform-origin: center center;
}

@keyframes particle-explode {
    0% {
        transform: translate(-50%, -50%) rotate(0deg) translateY(0) scale(0);
        opacity: 0;
    }
    20% {
        opacity: 1;
    }
    100% {
        transform: translate(-50%, -50%) rotate(var(--angle)) translateY(300px) scale(1.5);
        opacity: 0;
    }
}

/* Win Reveal Transition */
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

/* Demo Mode - Scale down slot machine to fit preview */
.slot-machine-demo {
    transform: scale(0.68);
    transform-origin: center top;
    margin: 0 auto;
}

/* Mobile */
@media (max-width: 550px) {
    .slot-machine {
        padding: 15px;
        margin: 5px;
        max-width: 100%;
    }

    .title h1 {
        font-size: 1.8rem;
    }

    .reel {
        width: 75px;
        height: 225px; /* 3 symbols x 75px */
    }

    .symbol {
        display: block !important; /* Block, not flex */
        width: 75px !important;
        height: 75px !important; /* FORCE exact height */
        min-height: 75px !important;
        max-height: 75px !important;
        line-height: 75px !important; /* Force line height */
        padding: 0 !important;
        margin: 0 !important;
        box-sizing: border-box !important;
        border: 2px solid rgba(0,191,255,0.6) !important;
        border-radius: 8px;
        background: rgba(0,20,30,0.8);
        overflow: hidden !important;
        position: relative;
    }

    .symbol img {
        position: absolute;
        top: 50%;
        left: 50%;
        transform: translate(-50%, -50%);
        width: 90%;
        height: 90%;
        object-fit: contain;
        display: block;
        border-radius: 4px;
    }

    .payline-indicator {
        height: 75px; /* Match symbol height */
    }

    .spin-btn {
        font-size: 1.4rem;
        padding: 15px 40px;
    }

    .balance-box .value {
        font-size: 1.3rem;
    }

    .chest-btn {
        font-size: 2rem;
        padding: 8px 15px;
    }

    .modal-title {
        font-size: 1.5rem;
    }

    .prizes-grid {
        grid-template-columns: repeat(auto-fill, minmax(120px, 1fr));
        gap: 15px;
    }

    .prize-image {
        height: 90px;
    }

    .prize-name {
        font-size: 0.8rem;
    }

    .prize-value {
        font-size: 1rem;
    }

    /* Win Reveal Mobile */
    .win-text {
        font-size: 2.5rem;
    }

    .prize-image-container {
        width: 200px;
        height: 200px;
    }

    .prize-reveal-name {
        font-size: 1.8rem;
    }

    .prize-reveal-value {
        font-size: 2.5rem;
    }

    .merge-reel {
        width: 75px;
        height: 225px;
    }

    .particle {
        font-size: 2rem;
    }

    .title-image {
        max-height: 80px;
    }

    .spin-btn-img {
        min-height: 60px;
    }

    .spin-btn-image {
        min-height: 60px;
    }

    /* Floating Title Mobile */
    .title-floating-only h1 {
        font-size: 2.2rem;
    }

    .title-floating-only p {
        font-size: 1rem;
    }

    .title-floating-only .title-image {
        max-width: 280px;
        max-height: 120px;
    }
}
</style>
