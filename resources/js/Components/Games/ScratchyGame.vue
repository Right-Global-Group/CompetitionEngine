<script lang="ts" setup>
import { computed, nextTick, onMounted, onUnmounted, ref, watch } from 'vue';
import { creditWord, formatMoney } from '@/utils/prizeLabel';


interface TicketData {
    number?: string;
    instant_win?: {
        prize?: string;
        category_id?: number;
        image_path?: string | null;
    } | false;
}

interface InstantWinCategory {
    id: number;
    name: string;
    image_path: string;
    value: number;
    no_auto_credit?: boolean;
}

interface CollectedWin {
    ticketNumber: string;
    prize: string;
    value: number;
    image: string;
    categoryName: string;
}

interface TicketState {
    id: number;
    ticketNumber: string;
    prizeText: string;
    isWin: boolean;
    isRevealed: boolean;
    isScratching: boolean;
    scratchPercent: number;
}

const props = defineProps<{
    assets: {
        overlay?: string;
        textColour?: string;
        wonTextColour?: string;
        loseTextColour?: string;
        accentColour?: string;
        scratchyLayout?: string;
        scratchyCardBg?: string;
        scratchyCardBorder?: string;
        scratchyTitleText?: string;
        scratchyTitleColor?: string;
        scratchSound?: string;
        winSound?: string;
        lossSound?: string;
        scratchySurfaceColor?: string;
        scratchyContainerBg?: string;
        scratchyButtonColor?: string;
    };
    tickets: TicketData[];
    instant_win_categories?: InstantWinCategory[];
}>();

const emit = defineEmits<{
    'wins-collected': [wins: CollectedWin[]];
}>();

// Layout
const layout = computed(() => props.assets.scratchyLayout || 'single');
const currentIndex = ref(0);

// Colors with RGG-style defaults (light theme)
const textColour = computed(() => props.assets.textColour || '#eeeeee');
const wonTextColour = computed(() => props.assets.wonTextColour || '#ffffff');
const loseTextColour = computed(() => props.assets.loseTextColour || '#000000');

const cardBg = computed(() => props.assets.scratchyCardBg || 'transparent');

const cardBorder = computed(() => props.assets.scratchyCardBorder || 'transparent');
const titleText = computed(() => props.assets.scratchyTitleText || '');
const titleColor = computed(() => props.assets.scratchyTitleColor || '#ffffff');

const surfaceColor = computed(() => props.assets.scratchySurfaceColor || '');
const containerBg = computed(() => 
    props.assets.overlay ? 'transparent' : (props.assets.scratchyContainerBg || 'transparent')
);
const hasBorder = computed(() => cardBorder.value && cardBorder.value !== 'transparent');
const buttonColor = computed(() => props.assets.scratchyButtonColor || '');

// Auto-scale columns based on ticket count
const gridCols = computed(() => {
    const count = props.tickets?.length || 0;
    if (count <= 10) return 2;
    if (count <= 30) return 3;
    return 4;
});

// Aspect ratio adapts to ticket count — more tickets = thinner cards
const cardAspect = computed(() => {
    if (layout.value === 'grid' && props.assets.overlay && canvasesReady.value && cachedOverlayImg) {
        return `${cachedOverlayImg.naturalWidth}/${Math.round(cachedOverlayImg.naturalHeight * 1.34)}`;
    }
    const count = props.tickets?.length || 0;
    if (count <= 10) return '3/1';
    if (count <= 30) return '2.5/1';
    if (count <= 80) return '2/1';
    return '2/1';
});

// Font size adapts
const cardFontClass = computed(() => {
    const count = props.tickets?.length || 0;
    if (count <= 10) return 'text-sm md:text-base';
    if (count <= 30) return 'text-xs md:text-sm';
    return 'text-[10px] md:text-xs';
});

const labelFontClass = computed(() => {
    const count = props.tickets?.length || 0;
    if (count <= 10) return 'text-[9px] md:text-[11px]';
    if (count <= 30) return 'text-[8px] md:text-[10px]';
    return 'text-[7px] md:text-[9px]';
});

// Container max-width scales up for many tickets
const containerMaxWidth = computed(() => {
    const count = props.tickets?.length || 0;
    if (layout.value === 'single') return 'max-w-2xl';
    if (count <= 10) return 'max-w-lg';
    if (count <= 30) return 'max-w-xl';
    if (count <= 80) return 'max-w-2xl';
    return 'max-w-3xl';
});

// Ticket states
const ticketStates = ref<TicketState[]>([]);
const canvasRefs = ref<Record<number, HTMLCanvasElement | null>>({});
const isRevealing = ref(false);

// Large orders (1000+ tickets) would otherwise create+draw one full-size canvas per
// ticket synchronously on open — cap the initial render and let the user expand on
// demand. Only affects what's mounted/drawn; ticketStates itself (and therefore
// revealAll/checkAllRevealed/win totals) always covers every ticket regardless.
const SCRATCH_DISPLAY_LIMIT = 150;
// "Show more" loads another batch of this size rather than everything at once.
const SCRATCH_SHOW_MORE_BATCH = 500;
const scratchDisplayCount = ref(SCRATCH_DISPLAY_LIMIT);
const visibleTicketStates = computed(() => ticketStates.value.slice(0, scratchDisplayCount.value));

// Sound
let scratchAudio: HTMLAudioElement | null = null;
let winAudio: HTMLAudioElement | null = null;
let lossAudio: HTMLAudioElement | null = null;

function initSounds() {
    if (props.assets.scratchSound) {
        scratchAudio = new Audio(props.assets.scratchSound);
        scratchAudio.loop = true;
        scratchAudio.volume = 0.3;
    }
    if (props.assets.winSound) {
        winAudio = new Audio(props.assets.winSound);
        winAudio.volume = 0.6;
    }
    if (props.assets.lossSound) {
        lossAudio = new Audio(props.assets.lossSound);
        lossAudio.volume = 0.4;
    }
}

// Drawing state per canvas (not reactive to avoid overhead)
const drawingState = new Map<number, {
    isDrawing: boolean;
    lastX: number;
    lastY: number;
    activeTouchId: number | null;
    checkRAF: number | null;
    moveHandler: ((e: MouseEvent | TouchEvent) => void) | null;
    endHandler: ((e: MouseEvent | TouchEvent) => void) | null;
}>();

// Single canvas ref (for single layout mode)
const singleCanvasRef = ref<HTMLCanvasElement | null>(null);
const singleCanvasRevealed = ref(false);

// Grid container ref (for cross-card scratching)
const gridContainerRef = ref<HTMLElement | null>(null);
// Track active grid scratch session (finger down, moving across cards)
let gridScratchActive = false;
let gridScratchTouchId: number | null = null;
let gridMoveHandler: ((e: MouseEvent | TouchEvent) => void) | null = null;
let gridEndHandler: ((e: MouseEvent | TouchEvent) => void) | null = null;
// Track last global client position for smooth cross-card transitions
let lastClientX = 0;
let lastClientY = 0;

// Track scratched area mathematically (avoids CORS canvas taint issues with overlay images)
const scratchedPixels = new Map<number, number>(); // id -> total scratched pixel area (grid cards only)
const canvasAreas = new Map<number, number>(); // id -> total canvas area
const canvasDprs = new Map<number, number>(); // id -> effective DPR (may differ from native on large canvases)
const singleIsScratching = ref(false);
const hasEverScratched = ref(false);
const canvasesReady = ref(false); // Hide ticket text until canvases are drawn
const SINGLE_CANVAS_ID = -1; // special ID for the single overlay canvas

// Cell-based scratch tracking for the single canvas — prevents over-counting overlapping strokes.
// Divides canvas into a grid of cells; each cell can only be "scratched" once.
const CELL_SIZE = 10; // 10x10 CSS pixel cells — finer grid for accurate tracking
let singleCells: Set<number> | null = null;
let singleTotalCells = 0;
let singleGridCols = 0;

function markCellsAlongStroke(x1: number, y1: number, x2: number, y2: number, brushSize: number) {
    if (!singleCells) return;
    const half = brushSize / 2;
    const dx = x2 - x1;
    const dy = y2 - y1;
    const dist = Math.sqrt(dx * dx + dy * dy);
    const steps = Math.max(1, Math.ceil(dist / (CELL_SIZE * 0.5)));
    for (let i = 0; i <= steps; i++) {
        const t = i / steps;
        const cx = x1 + dx * t;
        const cy = y1 + dy * t;
        const minC = Math.max(0, Math.floor((cx - half) / CELL_SIZE));
        const maxC = Math.min(singleGridCols - 1, Math.floor((cx + half) / CELL_SIZE));
        const minR = Math.max(0, Math.floor((cy - half) / CELL_SIZE));
        const maxR = Math.floor((cy + half) / CELL_SIZE);
        for (let r = minR; r <= maxR; r++) {
            for (let c = minC; c <= maxC; c++) {
                singleCells.add(r * singleGridCols + c);
            }
        }
    }
}

// Pre-cached overlay image (loaded once, reused for all canvases)
let cachedOverlayImg: HTMLImageElement | null = null;

// Emoji fallback for prizes without images
const emojiList = ['💰', '🎁', '💎', '⭐', '🏆', '🎯', '💵', '🪙', '🎀', '🔔'];
function makeEmojiSvg(index: number): string {
    const emoji = emojiList[index % emojiList.length];
    return `data:image/svg+xml,${encodeURIComponent(`<svg xmlns="http://www.w3.org/2000/svg" width="100" height="100"><text x="50%" y="50%" text-anchor="middle" dominant-baseline="central" font-size="60">${emoji}</text></svg>`)}`;
}

// Find category image for a winning ticket
function getWinImage(ticket: TicketData, index: number): string {
    const iw = ticket.instant_win;
    if (!iw) return makeEmojiSvg(index);

    // Try image_path directly on the instant_win
    if (iw.image_path) return iw.image_path;

    // Try matching by category_id
    if (iw.category_id && props.instant_win_categories?.length) {
        const cat = props.instant_win_categories.find(c => c.id === iw.category_id);
        if (cat?.image_path) return cat.image_path;
    }

    // Try matching by prize text
    if (iw.prize && props.instant_win_categories?.length) {
        const cat = props.instant_win_categories.find(c => c.name === iw.prize);
        if (cat?.image_path) return cat.image_path;
    }

    return makeEmojiSvg(index);
}

// Check if a category_id belongs to a no_auto_credit category
function isCategoryNoAutoCredit(categoryId?: number): boolean {
    if (!categoryId || !props.instant_win_categories?.length) return false;
    const cat = props.instant_win_categories.find(c => c.id === categoryId);
    return cat?.no_auto_credit === true;
}


// Collect wins and emit after all cards are revealed
function checkAllRevealed() {
    const allRevealed = ticketStates.value.every(t => t.isRevealed);
    if (!allRevealed) return;

    const wins: CollectedWin[] = [];
    ticketStates.value.forEach((ticket, i) => {
        if (!ticket.isWin) return;
        const raw = props.tickets[i];
        const iw = raw?.instant_win;
        const prize = ticket.prizeText;
        const categoryName = (iw && iw.prize) ? iw.prize : prize;

        wins.push({
            ticketNumber: ticket.ticketNumber,
            prize,
            value: (raw?.instant_win && !(raw.instant_win as any).no_auto_credit && !(raw.instant_win as any).physical_prize && (raw.instant_win as any).prize_type !== 'ticket_bundle') ? (parseFloat((raw.instant_win as any).value as any) || 0) : 0,
            image: getWinImage(raw, i),
            categoryName,
        });
    });

    emit('wins-collected', wins);
}

function setupGame() {
    // Clean up previous drawing state
    drawingState.forEach((state) => {
        cleanupListeners(state);
    });
    drawingState.clear();
    scratchedPixels.clear();
    canvasAreas.clear();
    canvasDprs.clear();
    singleCells = null;
    singleTotalCells = 0;
    singleGridCols = 0;

    isRevealing.value = false;
    currentIndex.value = 0;
    singleCanvasRevealed.value = false;
    singleIsScratching.value = false;
    hasEverScratched.value = false;
    canvasesReady.value = false;
    scratchDisplayCount.value = SCRATCH_DISPLAY_LIMIT;

    ticketStates.value = props.tickets.map((ticket, i) => {
        const iw = ticket.instant_win;
        const isWin = !!iw;
        let prize: string;
        if (isWin) {
            const isPhysical = (iw as any).no_auto_credit === true || (iw as any).physical_prize === true;
            const isTicketBundle = (iw as any).prize_type === 'ticket_bundle';
            const val = parseFloat((iw as any).value as any) || 0;
            if (isTicketBundle) {
                prize = `${val > 0 ? Math.floor(val) : ''} Free Ticket${val !== 1 ? 's' : ''}`.trim();
            } else {
                prize = isPhysical ? ((iw as any).prize ?? 'Prize') : (val > 0 ? `${formatMoney(val)} ${creditWord((iw as any).prize_type)}` : ((iw as any).prize ?? 'Prize'));
            }
        } else {
            prize = 'NO WIN';
        }

        return {
            id: i,
            ticketNumber: ticket.number ?? (i + 1).toString(),
            prizeText: prize,
            isWin,
            isRevealed: false,
            isScratching: false,
            scratchPercent: 0,
        };
    });

    // Preload overlay image once, then init canvases
    const initAllCanvases = () => {
        nextTick(() => {
            if (layout.value === 'single') {
                initSingleCanvas();
            } else {
                // Only the capped/visible subset gets a canvas up front — a huge
                // order would otherwise create+draw a canvas per ticket here
                // (each forcing a synchronous layout read) and freeze the tab.
                visibleTicketStates.value.forEach((t) => {
                    initCanvas(t.id);
                });
            }
            canvasesReady.value = true;
        });
    };

    if (props.assets.overlay && (!cachedOverlayImg || cachedOverlayImg.src !== props.assets.overlay)) {
        const img = new Image();
        img.onload = () => {
            cachedOverlayImg = img;
            initAllCanvases();
        };
        img.onerror = () => {
            cachedOverlayImg = null;
            initAllCanvases();
        };
        img.src = props.assets.overlay;
    } else {
        initAllCanvases();
    }
}

// Reveal the rest of a capped grid-layout order. Mounts and initializes the
// remaining canvases in batches (yielding a frame between each) instead of all
// at once, so expanding a 1000-ticket order doesn't itself freeze the tab.
const EXPAND_BATCH_SIZE = 50;

async function expandScratchCards() {
    const target = Math.min(scratchDisplayCount.value + SCRATCH_SHOW_MORE_BATCH, ticketStates.value.length);
    if (target <= scratchDisplayCount.value) return;
    scratchDisplayCount.value = target;

    if (layout.value === 'single') return;

    await nextTick();

    const remaining = visibleTicketStates.value.filter((t) => !canvasAreas.has(t.id));
    for (let i = 0; i < remaining.length; i += EXPAND_BATCH_SIZE) {
        const batch = remaining.slice(i, i + EXPAND_BATCH_SIZE);
        batch.forEach((t) => initCanvas(t.id));
        await new Promise((resolve) => requestAnimationFrame(resolve));
    }
}

function initSingleCanvas() {
    const canvas = singleCanvasRef.value;
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    canvas.style.transition = 'none';
    canvas.style.opacity = '1';
    canvas.classList.remove('scratching');

    const rect = canvas.getBoundingClientRect();
    const nativeDpr = window.devicePixelRatio || 1;

    // Cap canvas buffer to stay within browser limits.
    // Desktop: Chrome/Firefox/Safari support 16384. Mobile Safari: ~4096.
    const isMobile = /iPhone|iPad|iPod|Android/i.test(navigator.userAgent);
    const MAX_DIM = isMobile ? 4096 : 16384;
    const dpr = Math.max(0.5, Math.min(nativeDpr, MAX_DIM / rect.width, MAX_DIM / rect.height));

    canvas.width = Math.floor(rect.width * dpr);
    canvas.height = Math.floor(rect.height * dpr);
    ctx.scale(dpr, dpr);

    // Only draw silver surface if no overlay image
    if (!cachedOverlayImg) {
        drawScratchSurface(ctx, rect.width, rect.height);
    }

    if (cachedOverlayImg) {
        ctx.globalCompositeOperation = 'source-over';
        const imgAspect = cachedOverlayImg.naturalWidth / cachedOverlayImg.naturalHeight;
        const tileW = rect.width;
        const tileH = tileW / imgAspect;

        if (tileH >= rect.height * 0.7) {
            // Close enough to one image — stretch to fill
            ctx.drawImage(cachedOverlayImg, 0, 0, rect.width, rect.height);
        } else {
            // Multiple rows needed — tile downward
            let y = 0;
            while (y < rect.height) {
                const remainingH = rect.height - y;
                if (remainingH < tileH) {
                    const srcH = cachedOverlayImg.naturalHeight * (remainingH / tileH);
                    const srcY = (cachedOverlayImg.naturalHeight - srcH) / 2;
                    ctx.drawImage(cachedOverlayImg, 0, srcY, cachedOverlayImg.naturalWidth, srcH, 0, y, tileW, remainingH);
                } else {
                    ctx.drawImage(cachedOverlayImg, 0, y, tileW, tileH);
                }
                y += tileH - 25;
            }
        }
    }

    // Track canvas area for mathematical scratch progress
    canvasAreas.set(SINGLE_CANVAS_ID, rect.width * rect.height);
    scratchedPixels.set(SINGLE_CANVAS_ID, 0);
    canvasDprs.set(SINGLE_CANVAS_ID, dpr);

    // Init cell-based tracking (deduplicates overlapping strokes)
    singleGridCols = Math.ceil(rect.width / CELL_SIZE);
    const rows = Math.ceil(rect.height / CELL_SIZE);
    singleTotalCells = singleGridCols * rows;
    singleCells = new Set();

    // Init drawing state for the single canvas
    drawingState.set(SINGLE_CANVAS_ID, {
        isDrawing: false,
        lastX: 0,
        lastY: 0,
        activeTouchId: null,
        checkRAF: null,
        moveHandler: null,
        endHandler: null,
    });
}

function drawImageFit(ctx: CanvasRenderingContext2D, img: HTMLImageElement, canvasW: number, canvasH: number) {
    ctx.drawImage(img, 0, 0, canvasW, canvasH);
}

function drawScratchSurface(ctx: CanvasRenderingContext2D, w: number, h: number) {
    if (surfaceColor.value) {
        ctx.fillStyle = surfaceColor.value;
        ctx.fillRect(0, 0, w, h);
    } else {
        const gradient = ctx.createLinearGradient(0, 0, w, 0);
        gradient.addColorStop(0, '#cfced6');
        gradient.addColorStop(0.25, '#e0dfe6');
        gradient.addColorStop(0.5, '#efeef3');
        gradient.addColorStop(0.75, '#e0dfe6');
        gradient.addColorStop(1, '#cfced6');
        ctx.fillStyle = gradient;
        ctx.fillRect(0, 0, w, h);
    }
}

function initCanvas(id: number) {
    const canvas = canvasRefs.value[id];
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    canvas.style.transition = 'none';
    canvas.style.opacity = '1';
    canvas.classList.remove('scratching');

    const rect = canvas.getBoundingClientRect();
    const dpr = window.devicePixelRatio || 1;
    canvas.width = rect.width * dpr;
    canvas.height = rect.height * dpr;
    ctx.scale(dpr, dpr);

    if (!cachedOverlayImg) {
        drawScratchSurface(ctx, rect.width, rect.height);
    }

    if (cachedOverlayImg) {
        ctx.globalCompositeOperation = 'source-over';
        drawImageFit(ctx, cachedOverlayImg, rect.width, rect.height);
    }

    canvasAreas.set(id, rect.width * rect.height);
    scratchedPixels.set(id, 0);
    canvasDprs.set(id, dpr);

    drawingState.set(id, {
        isDrawing: false,
        lastX: 0,
        lastY: 0,
        activeTouchId: null,
        checkRAF: null,
        moveHandler: null,
        endHandler: null,
    });
}

function getCoordsFromRect(rect: DOMRect, e: MouseEvent | TouchEvent, touchId: number | null): [number, number] | null {
    let clientX: number, clientY: number;
    if (e instanceof MouseEvent) {
        clientX = e.clientX;
        clientY = e.clientY;
    } else {
        const touchList = e.touches.length > 0 ? e.touches : e.changedTouches;
        let touch: Touch | null = null;
        if (touchId !== null) {
            for (let i = 0; i < touchList.length; i++) {
                if (touchList[i].identifier === touchId) {
                    touch = touchList[i];
                    break;
                }
            }
        }
        if (!touch && touchList.length > 0) touch = touchList[0];
        if (!touch) return null;
        clientX = touch.clientX;
        clientY = touch.clientY;
    }
    return [clientX - rect.left, clientY - rect.top];
}

function startScratchSingle(e: MouseEvent | TouchEvent) {
    if (singleCanvasRevealed.value) return;
    startScratch(SINGLE_CANVAS_ID, e);
}

function cleanupListeners(state: { moveHandler: ((e: MouseEvent | TouchEvent) => void) | null; endHandler: ((e: MouseEvent | TouchEvent) => void) | null }) {
    if (state.moveHandler) {
        window.removeEventListener('mousemove', state.moveHandler);
        window.removeEventListener('touchmove', state.moveHandler);
    }
    if (state.endHandler) {
        window.removeEventListener('mouseup', state.endHandler);
        window.removeEventListener('touchend', state.endHandler);
        window.removeEventListener('touchcancel', state.endHandler);
    }
    state.moveHandler = null;
    state.endHandler = null;
}

function cleanupGridListeners() {
    if (gridMoveHandler) {
        window.removeEventListener('mousemove', gridMoveHandler);
        window.removeEventListener('touchmove', gridMoveHandler);
    }
    if (gridEndHandler) {
        window.removeEventListener('mouseup', gridEndHandler);
        window.removeEventListener('touchend', gridEndHandler);
        window.removeEventListener('touchcancel', gridEndHandler);
    }
    gridMoveHandler = null;
    gridEndHandler = null;
    gridScratchActive = false;
    gridScratchTouchId = null;
}

// Find which card canvas is under the pointer (page coordinates)
function findCardUnderPoint(clientX: number, clientY: number): number | null {
    for (const ticket of ticketStates.value) {
        if (ticket.isRevealed) continue;
        const canvas = canvasRefs.value[ticket.id];
        if (!canvas) continue;
        const rect = canvas.getBoundingClientRect();
        if (clientX >= rect.left && clientX <= rect.right && clientY >= rect.top && clientY <= rect.bottom) {
            return ticket.id;
        }
    }
    return null;
}

function getClientPos(e: MouseEvent | TouchEvent, touchId: number | null): [number, number] | null {
    if (e instanceof MouseEvent) {
        return [e.clientX, e.clientY];
    }
    const touchList = e.touches.length > 0 ? e.touches : e.changedTouches;
    if (touchId !== null) {
        for (let i = 0; i < touchList.length; i++) {
            if (touchList[i].identifier === touchId) return [touchList[i].clientX, touchList[i].clientY];
        }
    }
    if (touchList.length > 0) return [touchList[0].clientX, touchList[0].clientY];
    return null;
}

// Grid scratch: one drag scratches across multiple cards
function startGridScratch(startId: number, e: MouseEvent | TouchEvent) {
    const ticket = ticketStates.value[startId];
    if (!ticket || ticket.isRevealed) return;
    if (gridScratchActive) return;

    gridScratchActive = true;
    hasEverScratched.value = true;

    if (e instanceof TouchEvent) {
        const touch = e.changedTouches[0];
        if (!touch) return;
        gridScratchTouchId = touch.identifier;
        lastClientX = touch.clientX;
        lastClientY = touch.clientY;
    } else {
        lastClientX = e.clientX;
        lastClientY = e.clientY;
    }

    if (scratchAudio) {
        scratchAudio.currentTime = 0;
        scratchAudio.play().catch(() => {});
    }

    // Scratch the starting card
    scratchCardWithClient(startId, lastClientX, lastClientY);

    const onMove = (ev: MouseEvent | TouchEvent) => gridScratchMove(ev);
    const onEnd = () => gridScratchEnd();
    gridMoveHandler = onMove;
    gridEndHandler = onEnd;

    if (e instanceof TouchEvent) {
        window.addEventListener('touchmove', onMove, { passive: true });
        window.addEventListener('touchend', onEnd);
        window.addEventListener('touchcancel', onEnd);
    } else {
        window.addEventListener('mousemove', onMove);
        window.addEventListener('mouseup', onEnd);
    }
}

// Convert client coords to canvas-local coords
function clientToCanvas(canvas: HTMLCanvasElement, cx: number, cy: number): [number, number] {
    const rect = canvas.getBoundingClientRect();
    return [cx - rect.left, cy - rect.top];
}

// Clamp a point to be inside the canvas bounds
function clampToCanvas(canvas: HTMLCanvasElement, cx: number, cy: number): [number, number] {
    const rect = canvas.getBoundingClientRect();
    const x = Math.max(0, Math.min(cx - rect.left, rect.width));
    const y = Math.max(0, Math.min(cy - rect.top, rect.height));
    return [x, y];
}

function scratchCardWithClient(id: number, cx: number, cy: number) {
    const canvas = canvasRefs.value[id];
    if (!canvas) return;
    const ticket = ticketStates.value[id];
    if (!ticket || ticket.isRevealed) return;

    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    const state = drawingState.get(id);
    if (!state) return;

    const [x, y] = clientToCanvas(canvas, cx, cy);
    const dpr = canvasDprs.get(id) || window.devicePixelRatio || 1;
    const rect = canvas.getBoundingClientRect();
    const brushSize = Math.min(rect.width, rect.height) * 0.28;

    ctx.save();
    ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
    ctx.globalCompositeOperation = 'destination-out';
    ctx.lineWidth = brushSize;
    ctx.lineCap = 'round';
    ctx.lineJoin = 'round';

    if (state.isDrawing) {
        ctx.beginPath();
        ctx.moveTo(state.lastX, state.lastY);
        ctx.lineTo(x, y);
        ctx.stroke();
    } else {
        state.isDrawing = true;
        canvas.classList.add('scratching');
        const [entryX, entryY] = clampToCanvas(canvas, lastClientX, lastClientY);
        ctx.beginPath();
        ctx.moveTo(entryX, entryY);
        ctx.lineTo(x, y);
        ctx.stroke();
    }

    ctx.restore();

    // Track area
    const prevX = state.isDrawing ? state.lastX : x;
    const prevY = state.isDrawing ? state.lastY : y;
    const dx = x - prevX;
    const dy = y - prevY;
    const dist = Math.sqrt(dx * dx + dy * dy);
    const strokeArea = dist * brushSize + Math.PI * (brushSize / 2) ** 2;
    scratchedPixels.set(id, (scratchedPixels.get(id) || 0) + strokeArea);

    state.lastX = x;
    state.lastY = y;

    // Check progress
    if (state.checkRAF) cancelAnimationFrame(state.checkRAF);
    state.checkRAF = requestAnimationFrame(() => checkProgress(id));
}

function gridScratchMove(e: MouseEvent | TouchEvent) {
    if (!gridScratchActive) return;

    const pos = getClientPos(e, gridScratchTouchId);
    if (!pos) return;
    const [cx, cy] = pos;

    // Find all cards between last position and current position (interpolate to not miss cards)
    const steps = Math.max(1, Math.ceil(Math.sqrt((cx - lastClientX) ** 2 + (cy - lastClientY) ** 2) / 10));
    for (let i = 1; i <= steps; i++) {
        const t = i / steps;
        const interpX = lastClientX + (cx - lastClientX) * t;
        const interpY = lastClientY + (cy - lastClientY) * t;
        const cardId = findCardUnderPoint(interpX, interpY);
        if (cardId !== null) {
            scratchCardWithClient(cardId, interpX, interpY);
        }
    }

    lastClientX = cx;
    lastClientY = cy;
}

function gridScratchEnd() {
    if (!gridScratchActive) return;

    // Stop drawing on all cards
    for (const ticket of ticketStates.value) {
        const state = drawingState.get(ticket.id);
        if (state && state.isDrawing) {
            state.isDrawing = false;
        }
    }

    if (scratchAudio) scratchAudio.pause();
    cleanupGridListeners();
}

// Single layout scratch
function startScratch(id: number, e: MouseEvent | TouchEvent) {
    if (singleCanvasRevealed.value) return;

    const state = drawingState.get(id);
    if (!state || state.isDrawing) return;

    const canvas = singleCanvasRef.value;
    if (!canvas) return;

    if (e instanceof TouchEvent) {
        const touch = e.changedTouches[0];
        if (!touch) return;
        state.activeTouchId = touch.identifier;
    }
    const coords = getCoordsFromRect(canvas.getBoundingClientRect(), e, state.activeTouchId);
    if (!coords) return;
    [state.lastX, state.lastY] = coords;

    state.isDrawing = true;
    hasEverScratched.value = true;
    singleIsScratching.value = true;
    canvas.classList.add('scratching');

    if (scratchAudio) {
        scratchAudio.currentTime = 0;
        scratchAudio.play().catch(() => {});
    }

    const onMove = (ev: MouseEvent | TouchEvent) => scratchMove(id, ev);
    const onEnd = (ev: MouseEvent | TouchEvent) => scratchEnd(id, ev);
    state.moveHandler = onMove;
    state.endHandler = onEnd;

    if (e instanceof TouchEvent) {
        window.addEventListener('touchmove', onMove, { passive: true });
        window.addEventListener('touchend', onEnd);
        window.addEventListener('touchcancel', onEnd);
    } else {
        window.addEventListener('mousemove', onMove);
        window.addEventListener('mouseup', onEnd);
    }
}

function scratchMove(id: number, e: MouseEvent | TouchEvent) {
    const state = drawingState.get(id);
    if (!state?.isDrawing) return;

    const canvas = id === SINGLE_CANVAS_ID ? singleCanvasRef.value : canvasRefs.value[id];
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    // Single getBoundingClientRect call — reuse for coords + brush size
    const rect = canvas.getBoundingClientRect();
    const coords = getCoordsFromRect(rect, e, state.activeTouchId);
    if (!coords) return;
    const [currentX, currentY] = coords;

    const dpr = canvasDprs.get(id) || window.devicePixelRatio || 1;
    ctx.save();
    ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
    ctx.globalCompositeOperation = 'destination-out';
    const isGridCard = id !== SINGLE_CANVAS_ID && layout.value === 'grid';
    const brushSize = Math.min(rect.width, rect.height) * (isGridCard ? 0.25 : 0.055);
    ctx.lineWidth = brushSize;
    ctx.lineCap = 'round';
    ctx.lineJoin = 'round';
    ctx.beginPath();
    ctx.moveTo(state.lastX, state.lastY);
    ctx.lineTo(currentX, currentY);
    ctx.stroke();
    ctx.restore();

    // Track scratched area — cell-based for single canvas (no overlap over-counting),
    // mathematical for grid cards (small enough that overlap barely matters)
    if (id === SINGLE_CANVAS_ID) {
        markCellsAlongStroke(state.lastX, state.lastY, currentX, currentY, brushSize);
    } else {
        const dx = currentX - state.lastX;
        const dy = currentY - state.lastY;
        const dist = Math.sqrt(dx * dx + dy * dy);
        const strokeArea = dist * brushSize + Math.PI * (brushSize / 2) ** 2;
        scratchedPixels.set(id, (scratchedPixels.get(id) || 0) + strokeArea);
    }

    state.lastX = currentX;
    state.lastY = currentY;

    // Throttled progress check
    if (state.checkRAF) cancelAnimationFrame(state.checkRAF);
    state.checkRAF = requestAnimationFrame(() => checkProgress(id));
}

function scratchEnd(id: number, e: MouseEvent | TouchEvent) {
    const state = drawingState.get(id);
    if (!state || !state.isDrawing) return;

    if (e instanceof TouchEvent && state.activeTouchId !== null) {
        let found = false;
        for (let i = 0; i < e.changedTouches.length; i++) {
            if (e.changedTouches[i].identifier === state.activeTouchId) {
                found = true;
                break;
            }
        }
        if (!found) return;
    }

    state.isDrawing = false;
    state.activeTouchId = null;

    if (id === SINGLE_CANVAS_ID) {
        singleIsScratching.value = false;
    } else {
        const ticket = ticketStates.value[id];
        if (ticket) ticket.isScratching = false;
    }

    if (scratchAudio) scratchAudio.pause();
    cleanupListeners(state);

    if (state.checkRAF) cancelAnimationFrame(state.checkRAF);
    checkProgress(id);
}

function checkProgress(id: number) {
    if (id === SINGLE_CANVAS_ID) {
        checkSingleProgress();
        return;
    }

    const ticket = ticketStates.value[id];
    if (!ticket || ticket.isRevealed) return;

    const totalArea = canvasAreas.get(id) || 1;
    const scratched = scratchedPixels.get(id) || 0;
    const percent = Math.min(scratched / totalArea, 1);
    ticket.scratchPercent = Math.round(percent * 100);

    // Grid cards reveal after decent scratch coverage
    if (percent > 0.7) {
        revealTicket(id);
    }
}

function playRevealSound(isWin: boolean) {
    const audio = isWin ? winAudio : lossAudio;
    if (!audio) return;
    audio.currentTime = 0;
    audio.play().catch(() => {});
}

function checkSingleProgress() {
    if (singleCanvasRevealed.value) return;
    if (!singleCells || singleTotalCells === 0) return;

    const percent = singleCells.size / singleTotalCells;

    if (percent > 0.55) {
        revealSingleCanvas();
    }
}

function revealSingleCanvas(instant?: boolean) {
    if (singleCanvasRevealed.value) return;
    singleCanvasRevealed.value = true;

    const canvas = singleCanvasRef.value;
    if (canvas) {
        canvas.style.transition = instant ? 'opacity 0.4s' : 'opacity 0.8s ease-out';
        canvas.style.opacity = '0';
    }

    // Reveal all tickets instantly
    ticketStates.value.forEach((ticket) => {
        ticket.isRevealed = true;
    });
    playRevealSound(ticketStates.value.some((ticket) => ticket.isWin));

    nextTick(() => checkAllRevealed());
}

function revealTicket(id: number, instant?: boolean) {
    const ticket = ticketStates.value[id];
    if (!ticket || ticket.isRevealed) return;
    ticket.isRevealed = true;
    playRevealSound(ticket.isWin);

    const canvas = canvasRefs.value[id];
    if (canvas) {
        canvas.style.transition = instant ? 'opacity 0.4s' : 'opacity 0.8s ease-out';
        canvas.style.opacity = '0';
    }

    nextTick(() => checkAllRevealed());
}

function revealAll() {
    if (isRevealing.value) return;
    isRevealing.value = true;

    if (layout.value === 'single') {
        revealSingleCanvas(true);
        isRevealing.value = false;
        return;
    }

    // Grid: reveal all cards instantly
    ticketStates.value.forEach((ticket) => {
        const canvas = canvasRefs.value[ticket.id];
        if (canvas) {
            canvas.style.transition = 'opacity 0.4s';
            canvas.style.opacity = '0';
        }
        ticket.isRevealed = true;
    });
    playRevealSound(ticketStates.value.some((ticket) => ticket.isWin));

    isRevealing.value = false;
    nextTick(() => checkAllRevealed());
}

function setSingleCanvasRef(el: any) {
    singleCanvasRef.value = el as HTMLCanvasElement | null;
}

function setCanvasRef(id: number) {
    return (el: any) => {
        canvasRefs.value[id] = el as HTMLCanvasElement | null;
    };
}

onMounted(() => {
    initSounds();
    setupGame();
});

watch(() => props.tickets, () => {
    setupGame();
});

watch(() => props.assets, () => {
    setupGame();
}, { deep: true });

onUnmounted(() => {
    scratchAudio?.pause();
    scratchAudio = null;
    winAudio = null;
    lossAudio = null;
    cleanupGridListeners();
    drawingState.forEach((state) => {
        cleanupListeners(state);
    });
    drawingState.clear();
});
</script>

<template>
    <div class="flex flex-col items-center w-full h-full relative z-10 select-none">
        <!-- Title -->
        <h2
            v-if="titleText"
            class="text-xl md:text-3xl font-black uppercase tracking-wider text-center mb-3 mt-2"
            :style="{ color: titleColor, textShadow: `0 2px 10px rgba(0,0,0,0.3)` }"
        >
            {{ titleText }}
        </h2>

        <!-- Action buttons -->
        <div class="flex gap-3 py-4">
            <UiButton
                :variant="buttonColor ? 'colourless' : 'secondary'"
                class="px-6 py-2.5"
                :style="buttonColor ? { backgroundColor: buttonColor, color: '#fff' } : {}"
                :disabled="isRevealing"
                @click="revealAll"
            >
                Reveal All
            </UiButton>
            <UiButton
                :variant="buttonColor ? 'colourless' : 'secondary'"
                class="px-6 py-2.5"
                :style="buttonColor ? { backgroundColor: buttonColor, color: '#fff' } : {}"
                :disabled="isRevealing"
                @click="setupGame"
            >
                Replay
            </UiButton>
        </div>

        <!-- Single Layout: One big scratch canvas covering ALL tickets -->
        <div v-if="layout === 'single'" class="w-full mx-auto relative" :class="[containerMaxWidth, { 'invisible': !canvasesReady }]">
            <div 
                class="w-full relative"
            >
                <!-- Ticket grid underneath -->
                <div class="grid gap-1 md:gap-1.5" :style="{ gridTemplateColumns: `repeat(${gridCols}, minmax(0, 1fr))` }">
                    <div
                        v-for="ticket in ticketStates"
                        :key="`single-${ticket.id}`"
                        class="scratch-card relative rounded-lg overflow-hidden"
                        :style="{
                            aspectRatio: cardAspect,
                            backgroundColor: cardBg,
                            padding: '4px 8px',
                            border: hasBorder ? `1px solid ${cardBorder}` : 'none',
                        }"
                    >
                        <div v-show="canvasesReady || ticket.isRevealed" class="relative flex flex-col items-center justify-center text-center z-10 h-full">
                            <span
                                class="ticket-number font-bold"
                                :class="cardFontClass"
                                :style="{ color: ticket.isWin ? wonTextColour : loseTextColour }"
                            >
                                {{ ticket.ticketNumber }}
                            </span>
                            <span
                                class="ticket-label font-semibold uppercase tracking-wide"
                                :class="labelFontClass"
                                :style="{
                                    color: ticket.isWin ? wonTextColour : loseTextColour,
                                }"
                            >
                                {{ ticket.prizeText }}
                            </span>
                        </div>
                    </div>
                </div>

<!-- Single canvas overlay covering the entire grid -->
<div v-if="!singleCanvasRevealed" class="absolute inset-0 z-20 overflow-hidden"
    :class="props.assets.overlay ? 'rounded-none' : 'rounded-xl'">
    <canvas
        :ref="setSingleCanvasRef"
        class="absolute inset-0 w-full h-full z-20"
        :class="[
            props.assets.overlay ? 'rounded-none' : 'rounded-xl',
            singleIsScratching ? 'cursor-grabbing' : 'cursor-grab'
        ]"
        style="touch-action: none;"
        @mousedown="startScratchSingle($event)"
        @touchstart="startScratchSingle($event)"
    />
    <div class="scratch-shine absolute inset-0 z-25 pointer-events-none rounded-xl" />
</div>
            </div>
        </div>

        <!-- Grid Layout: Individual per-card canvases, swipe scratches across cards -->
        <div v-else class="w-full mx-auto px-6 md:px-10 pb-8" :class="[containerMaxWidth, { 'invisible': !canvasesReady }]">
            <div
                class="scratch-grid relative overflow-hidden"
                :class="props.assets.overlay ? '' : 'rounded-xl p-2 md:p-3'"
                :style="{ backgroundColor: props.assets.overlay ? 'transparent' : containerBg }"
            >
                <div class="grid gap-2 md:gap-3" :style="{ gridTemplateColumns: `repeat(${gridCols}, minmax(0, 1fr))` }">
                    <div
                        v-for="ticket in visibleTicketStates"
                        :key="`grid-${ticket.id}`"
                        class="scratch-card relative rounded-lg overflow-hidden card-entrance"
                        :style="{
                            aspectRatio: cardAspect,
                            backgroundColor: cardBg,
                            padding: '4px 8px',
                            animationDelay: `${ticket.id * 30}ms`,
                            border: hasBorder ? `1px solid ${cardBorder}` : 'none',
                        }"
                    >
                        <div v-show="canvasesReady || ticket.isRevealed" class="relative flex flex-col items-center justify-center text-center z-10 h-full">
                            <span
                                class="ticket-number font-bold"
                                :class="cardFontClass"
                                :style="{ color: ticket.isWin ? wonTextColour : loseTextColour }"
                            >
                                {{ ticket.ticketNumber }}
                            </span>
                            <span
                                class="ticket-label font-semibold uppercase tracking-wide"
                                :class="labelFontClass"
                                :style="{ color: ticket.isWin ? wonTextColour : loseTextColour }"
                            >
                                {{ ticket.prizeText }}
                            </span>
                        </div>

                        <canvas
                            v-if="!ticket.isRevealed"
                            :ref="setCanvasRef(ticket.id)"
                            class="absolute inset-0 w-full h-full z-20 rounded-lg"
                            style="touch-action: none;"
                            :class="ticket.isScratching ? 'cursor-grabbing' : 'cursor-grab'"
                            @mousedown="startGridScratch(ticket.id, $event)"
                            @touchstart="startGridScratch(ticket.id, $event)"
                        />
                    </div>
                </div>
            </div>

            <div v-if="scratchDisplayCount < ticketStates.length" class="flex justify-center py-4">
                <UiButton
                    :variant="buttonColor ? 'colourless' : 'secondary'"
                    class="px-6 py-2.5"
                    :style="buttonColor ? { backgroundColor: buttonColor, color: '#fff' } : {}"
                    @click="expandScratchCards"
                >
                    Show {{ Math.min(SCRATCH_SHOW_MORE_BATCH, ticketStates.length - scratchDisplayCount) }} more tickets
                </UiButton>
            </div>
        </div>
    </div>
</template>

<style scoped>
/* RGG-style shine animation on scratch surface */
.scratch-shine {
    background-image: linear-gradient(
        135deg,
        transparent 40%,
        rgba(255, 255, 255, 0.6) 50%,
        transparent 60%
    );
    background-position: bottom right;
    background-size: 300% 300%;
    background-repeat: no-repeat;
    animation: shine 6s infinite;
}

/* Stop shine while actively scratching (canvas is now before shine in DOM) */
canvas.scratching ~ .scratch-shine {
    animation: none;
}

@keyframes shine {
    0% {
        background-position: 100% 100%;
    }
    50% {
        background-position: 0% 0%;
    }
    100% {
        background-position: -50% -50%;
    }
}

/* Scratch grid container */
.scratch-grid {
    /* No shadow by default — transparent container blends with game bg */
}

/* Individual scratch cards */
.scratch-card {
    contain: layout;
}

/* Staggered card entrance animation */
.card-entrance {
    animation: cardEntrance 0.35s ease-out both;
}

@keyframes cardEntrance {
    0% { opacity: 0; transform: scale(0.85) translateY(8px); }
    100% { opacity: 1; transform: scale(1) translateY(0); }
}

/* Win card animation — pop bounce */
.scratch-card-win {
    animation: pop-out-in 0.6s cubic-bezier(0.65, 1.35, 0.5, 1);
    box-shadow: 0 0 12px rgba(255, 215, 0, 0.4);
}

@keyframes pop-out-in {
    0% { transform: scale(1); }
    36% { transform: scale(1.08); }
    100% { transform: scale(1); }
}
</style>
