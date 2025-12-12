<script setup lang="ts">
import { ref, watch, onMounted, computed } from 'vue';

interface Prize {
    text: string;
}

interface TicketState {
    id: number;
    prize: Prize;
    isScratched: boolean;
    isRevealed: boolean;
    canvas: HTMLCanvasElement | null;
    ctx: CanvasRenderingContext2D | null;
    wrapper: HTMLDivElement | null;
    prizeContent: HTMLDivElement | null;
    container: HTMLDivElement | null;
}

interface ScratchAssets {
    background?: string;
    overlay?: string;
    header?: string;
    textColour?: string;
    wonTextColour?: string;
    loseTextColour?: string;
    accentColour?: string;
}

const props = withDefaults(defineProps<{
    demoMode?: boolean;
    previewMode?: 'mobile' | 'desktop';
    scratchAssets?: ScratchAssets;
    tickets?: any[];
}>(), {
    demoMode: false,
    previewMode: 'desktop',
    scratchAssets: () => ({
        background: '',
        overlay: '',
        header: '',
        textColour: '#FFFFFF',
        wonTextColour: '#00FF00',
        loseTextColour: '#FF4444',
        accentColour: '#FFD700'
    }),
    tickets: () => []
});

const isMobile = computed(() => props.previewMode === 'mobile');

// Local reactive copies of assets
const scratchOverlay = ref(props.scratchAssets?.overlay || '');
const textColour = ref(props.scratchAssets?.textColour || '#FFFFFF');
const wonTextColour = ref(props.scratchAssets?.wonTextColour || '#00FF00');
const loseTextColour = ref(props.scratchAssets?.loseTextColour || '#FF4444');
const accentColour = ref(props.scratchAssets?.accentColour || '#FFD700');
const backgroundImage = ref(props.scratchAssets?.background || '');
const headerImage = ref(props.scratchAssets?.header || '');

// Watch for asset changes from configurator
watch(
    () => props.scratchAssets,
    (newVal) => {
        if (newVal) {
            scratchOverlay.value = newVal.overlay || '';
            textColour.value = newVal.textColour || '#FFFFFF';
            wonTextColour.value = newVal.wonTextColour || '#00FF00';
            loseTextColour.value = newVal.loseTextColour || '#FF4444';
            accentColour.value = newVal.accentColour || '#FFD700';
            backgroundImage.value = newVal.background || '';
            headerImage.value = newVal.header || '';
        }
    },
    { deep: true }
);

const ticketsData = ref<TicketState[]>([]);
const isRevealing = ref(false);
const ticketsGrid = ref<HTMLDivElement | null>(null);

// Generate demo tickets
const demoTickets = computed(() => {
    if (props.tickets && props.tickets.length > 0) {
        return props.tickets;
    }
    // Generate 6 demo tickets with random prizes
    const demoPrizes = ['£50 WINNER!', 'NO WIN', '£100 PRIZE!', 'NO WIN', '£25 BONUS!', 'NO WIN'];
    return demoPrizes.map((prize, i) => ({
        id: i,
        number: (i + 1).toString(),
        instant_win: { prize }
    }));
});

function createTicketElement(id: number, prize: Prize): TicketState {
    const wrapper = document.createElement('div');
    wrapper.className = 'scratch-card-wrapper';

    const container = document.createElement('div');
    container.className = 'scratch-card-container';

    const prizeContent = document.createElement('div');
    const prizeTextColour = prize.text !== 'NO WIN' ? wonTextColour.value : loseTextColour.value;
    const glowEffect = `0px 0px 8px ${accentColour.value}, 0 0 20px ${accentColour.value}`;
    prizeContent.className = 'scratch-card-prize';
    prizeContent.style.color = prizeTextColour;
    prizeContent.style.textShadow = glowEffect;

    // Hide the prize content initially to prevent flash
    prizeContent.style.opacity = '0';
    prizeContent.style.visibility = 'hidden';

    const ticketNumber = demoTickets.value[id]?.number || (id + 1).toString();
    const prizeString = prize.text.replace('<br>', ' ');

    prizeContent.innerHTML = `
        <span class="ticket-number">#${ticketNumber}</span>
        <span class="prize-text" style="text-shadow: ${glowEffect}">${prizeString}</span>`;

    const canvas = document.createElement('canvas');
    canvas.className = 'scratch-canvas';

    container.appendChild(prizeContent);
    container.appendChild(canvas);
    wrapper.appendChild(container);

    ticketsGrid.value?.appendChild(wrapper);

    const ctx = canvas.getContext('2d', { willReadFrequently: true });

    const ticketState: TicketState = {
        id,
        prize,
        isScratched: false,
        isRevealed: false,
        canvas,
        ctx,
        wrapper,
        prizeContent,
        container,
    };

    // Use requestAnimationFrame to ensure DOM is properly sized
    requestAnimationFrame(() => {
        initCanvas(ticketState);
    });

    let isDrawing = false;
    let lastX = 0;
    let lastY = 0;
    let checkProgressRAF: number | null = null;

    function getCoords(e: MouseEvent | TouchEvent): [number, number] {
        const rect = canvas.getBoundingClientRect();
        const scaleX = canvas.width / rect.width;
        const scaleY = canvas.height / rect.height;

        let clientX: number, clientY: number;
        if (e instanceof MouseEvent) {
            clientX = e.clientX;
            clientY = e.clientY;
        } else if (e instanceof TouchEvent && e.touches.length > 0) {
            clientX = e.touches[0].clientX;
            clientY = e.touches[0].clientY;
        } else {
            clientX = 0;
            clientY = 0;
        }
        return [(clientX - rect.left) * scaleX, (clientY - rect.top) * scaleY];
    }

    function checkScratchProgress(): void {
        if (ticketState.isRevealed || !ctx || !canvas) {
            return;
        }

        const imageData = ctx.getImageData(0, 0, canvas.width, canvas.height);
        const pixels = imageData.data;
        let transparentPixels = 0;
        for (let i = 3; i < pixels.length; i += 4) {
            if (pixels[i] === 0) {
                transparentPixels++;
            }
        }
        const scratchedArea = transparentPixels / (pixels.length / 4);
        if (scratchedArea > 0.5) {
            revealTicket(ticketState);
        }
    }

    function scratchOnWindow(e: MouseEvent | TouchEvent): void {
        if (!isDrawing || ticketState.isRevealed || !ctx || !canvas) {
            return;
        }
        e.preventDefault();

        const [currentX, currentY] = getCoords(e);
        ctx.globalCompositeOperation = 'destination-out';
        ctx.lineWidth = canvas.width * 0.2;
        ctx.lineCap = 'round';
        ctx.lineJoin = 'round';
        ctx.beginPath();
        ctx.moveTo(lastX, lastY);
        ctx.lineTo(currentX, currentY);
        ctx.stroke();
        lastX = currentX;
        lastY = currentY;

        if (checkProgressRAF) {
            cancelAnimationFrame(checkProgressRAF);
        }
        checkProgressRAF = requestAnimationFrame(checkScratchProgress);
    }

    function endScratchOnWindow(): void {
        if (!isDrawing) {
            return;
        }
        isDrawing = false;
        if (container) {
            container.style.cursor = 'grab';
        }

        window.removeEventListener('mousemove', scratchOnWindow);
        window.removeEventListener('mouseup', endScratchOnWindow);
        window.removeEventListener('touchmove', scratchOnWindow);
        window.removeEventListener('touchend', endScratchOnWindow);
        window.removeEventListener('touchcancel', endScratchOnWindow);

        if (checkProgressRAF) {
            cancelAnimationFrame(checkProgressRAF);
        }

        checkScratchProgress();
    }

    function startScratch(e: MouseEvent | TouchEvent): void {
        if (ticketState.isRevealed) {
            return;
        }
        e.preventDefault();
        isDrawing = true;
        if (container) {
            container.style.cursor = 'grabbing';
        }

        [lastX, lastY] = getCoords(e);

        window.addEventListener('mousemove', scratchOnWindow);
        window.addEventListener('mouseup', endScratchOnWindow);
        window.addEventListener('touchmove', scratchOnWindow, { passive: false });
        window.addEventListener('touchend', endScratchOnWindow);
        window.addEventListener('touchcancel', endScratchOnWindow);
    }

    canvas.addEventListener('mousedown', startScratch);
    canvas.addEventListener('touchstart', startScratch, { passive: false });

    return ticketState;
}

function initCanvas(ticket: TicketState): void {
    if (!ticket.canvas || !ticket.ctx || !ticket.prizeContent) {
        return;
    }

    const { canvas, ctx, prizeContent } = ticket;
    const rect = canvas.getBoundingClientRect();
    canvas.width = rect.width;
    canvas.height = rect.height;

    // Draw immediate solid overlay to prevent any flash
    ctx.fillStyle = '#666666';
    ctx.fillRect(0, 0, canvas.width, canvas.height);
    ctx.fillStyle = textColour.value;
    ctx.font = `900 ${canvas.width / 3}px Inter, sans-serif`;
    ctx.textAlign = 'center';
    ctx.textBaseline = 'middle';
    ctx.fillText((ticket.id + 1).toString(), canvas.width / 2, canvas.height / 2);

    // If we have an overlay image, use it
    if (scratchOverlay.value) {
        const overlayImage = new Image();
        overlayImage.crossOrigin = 'anonymous';
        overlayImage.src = scratchOverlay.value;

        overlayImage.onload = (): void => {
            ctx.clearRect(0, 0, canvas.width, canvas.height);
            ctx.globalCompositeOperation = 'source-over';
            ctx.drawImage(overlayImage, 0, 0, canvas.width, canvas.height);

            ctx.fillStyle = textColour.value;
            ctx.font = `900 ${canvas.width / 3}px Inter, sans-serif`;
            ctx.textAlign = 'center';
            ctx.textBaseline = 'middle';
            ctx.fillText((ticket.id + 1).toString(), canvas.width / 2, canvas.height / 2);

            prizeContent.style.opacity = '1';
            prizeContent.style.visibility = 'visible';
        };

        overlayImage.onerror = (): void => {
            drawFallbackOverlay(ctx, canvas, ticket.id, prizeContent);
        };

        // Timeout fallback
        setTimeout(() => {
            if (prizeContent.style.opacity === '0') {
                drawFallbackOverlay(ctx, canvas, ticket.id, prizeContent);
            }
        }, 3000);
    } else {
        // No overlay image, use gradient overlay
        drawFallbackOverlay(ctx, canvas, ticket.id, prizeContent);
    }
}

function drawFallbackOverlay(ctx: CanvasRenderingContext2D, canvas: HTMLCanvasElement, ticketId: number, prizeContent: HTMLDivElement): void {
    ctx.clearRect(0, 0, canvas.width, canvas.height);

    // Create a nice gradient overlay
    const gradient = ctx.createLinearGradient(0, 0, canvas.width, canvas.height);
    gradient.addColorStop(0, '#4B5563');
    gradient.addColorStop(0.5, '#6B7280');
    gradient.addColorStop(1, '#4B5563');
    ctx.fillStyle = gradient;
    ctx.fillRect(0, 0, canvas.width, canvas.height);

    // Add shimmer effect
    ctx.fillStyle = 'rgba(255,255,255,0.1)';
    ctx.beginPath();
    ctx.moveTo(0, 0);
    ctx.lineTo(canvas.width * 0.3, 0);
    ctx.lineTo(0, canvas.height * 0.3);
    ctx.closePath();
    ctx.fill();

    // Draw ticket number
    ctx.fillStyle = textColour.value;
    ctx.font = `900 ${canvas.width / 3}px Inter, sans-serif`;
    ctx.textAlign = 'center';
    ctx.textBaseline = 'middle';
    ctx.fillText((ticketId + 1).toString(), canvas.width / 2, canvas.height / 2);

    prizeContent.style.opacity = '1';
    prizeContent.style.visibility = 'visible';
}

function setupGame(): void {
    isRevealing.value = false;
    ticketsData.value = [];
    if (ticketsGrid.value) {
        ticketsGrid.value.innerHTML = '';
    }

    const tickets = demoTickets.value;
    const mappedTickets = tickets.map((ticket: any, index: number) =>
        createTicketElement(index, {
            text: ticket.instant_win?.prize ?? 'NO WIN',
        })
    );
    ticketsData.value = mappedTickets;
}

function revealAll(): void {
    if (isRevealing.value) {
        return;
    }
    isRevealing.value = true;

    ticketsData.value.forEach((ticket, i) => {
        setTimeout(() => {
            revealTicket(ticket, true);
        }, i * 100);
    });

    setTimeout(
        () => {
            isRevealing.value = false;
        },
        ticketsData.value.length * 100 + 100
    );
}

function revealTicket(ticket: TicketState, _instant?: boolean): void {
    if (ticket.isRevealed) {
        return;
    }
    ticket.isRevealed = true;

    if (!ticket.canvas) {
        return;
    }

    ticket.canvas.style.transition = 'opacity 0.5s';
    ticket.canvas.style.opacity = '0';

    setTimeout(() => {
        if (ticket.canvas && ticket.canvas.parentNode) {
            ticket.canvas.parentNode.removeChild(ticket.canvas);
        }
    }, 500);

    if (!ticket.isScratched) {
        ticket.isScratched = true;
    }
}

// Key for forcing re-render when assets change
const gameKey = computed(() => {
    return `${scratchOverlay.value}-${textColour.value}-${wonTextColour.value}-${loseTextColour.value}-${accentColour.value}`;
});

// Watch for key changes and reinitialize
watch(gameKey, () => {
    setupGame();
});

onMounted((): void => {
    setupGame();
});
</script>

<template>
    <div
        class="scratch-game-container"
        :style="{
            backgroundImage: backgroundImage ? `url(${backgroundImage})` : 'none',
            backgroundColor: backgroundImage ? 'transparent' : '#1a1a2e'
        }"
    >
        <div class="scratch-game-content">
            <!-- Header Image or Title -->
            <img v-if="headerImage" :src="headerImage" alt="Scratch Game" class="scratch-header-image" />
            <h2 v-else class="scratch-title" :style="{ color: accentColour, textShadow: `0 0 20px ${accentColour}80` }">
                🎫 Scratch to Win! 🎫
            </h2>
            <p class="scratch-subtitle">Scratch off 50% to reveal your prize</p>

            <!-- Tickets Grid -->
            <div ref="ticketsGrid" :class="['scratch-grid', { 'scratch-grid-mobile': isMobile }]"></div>

            <!-- Controls -->
            <div class="scratch-controls">
                <button
                    @click="revealAll"
                    :disabled="isRevealing"
                    class="scratch-btn reveal-btn"
                    :style="{
                        background: `linear-gradient(135deg, ${accentColour}, ${accentColour}aa)`,
                        boxShadow: `0 4px 15px ${accentColour}40`
                    }"
                >
                    {{ isRevealing ? 'Revealing...' : 'Reveal All' }}
                </button>
                <button
                    @click="setupGame"
                    :disabled="isRevealing"
                    class="scratch-btn reset-btn"
                >
                    Reset
                </button>
            </div>
        </div>
    </div>
</template>

<style scoped>
.scratch-game-container {
    width: 100%;
    min-height: 100%;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: flex-start;
    padding: 20px;
    background-size: cover;
    background-position: center;
    background-repeat: no-repeat;
}

.scratch-game-content {
    width: 100%;
    max-width: 600px;
    display: flex;
    flex-direction: column;
    align-items: center;
}

.scratch-header-image {
    max-width: 280px;
    max-height: 100px;
    width: auto;
    height: auto;
    object-fit: contain;
    margin: 0 auto 10px;
    display: block;
    filter: drop-shadow(0 0 15px rgba(255, 215, 0, 0.4));
}

.scratch-title {
    font-family: 'Luckiest Guy', cursive;
    font-size: 1.8rem;
    text-align: center;
    margin-bottom: 5px;
}

.scratch-subtitle {
    color: #9CA3AF;
    font-size: 0.875rem;
    text-align: center;
    margin-bottom: 20px;
}

.scratch-grid {
    display: grid;
    grid-template-columns: repeat(3, 1fr);
    gap: 12px;
    width: 100%;
    max-width: 400px;
    margin-bottom: 20px;
}

.scratch-grid-mobile {
    grid-template-columns: repeat(2, 1fr);
    gap: 8px;
    max-width: 240px;
}

/* Scratch card wrapper styles */
:deep(.scratch-card-wrapper) {
    position: relative;
    border-radius: 12px;
    background: rgba(255, 255, 255, 0.05);
    backdrop-filter: blur(10px);
    border: 1px solid rgba(255, 255, 255, 0.1);
    transition: transform 0.3s ease, box-shadow 0.3s ease;
    overflow: hidden;
}

:deep(.scratch-card-wrapper:hover) {
    transform: scale(1.05) translateY(-2px);
    box-shadow: 0 15px 30px rgba(0, 0, 0, 0.4);
}

:deep(.scratch-card-container) {
    position: relative;
    width: 100%;
    padding-top: 100%; /* Square aspect ratio */
    cursor: grab;
    border-radius: 12px;
    overflow: hidden;
}

:deep(.scratch-card-prize) {
    position: absolute;
    inset: 0;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    text-align: center;
    z-index: 10;
    padding: 10px;
}

:deep(.ticket-number) {
    font-size: 0.7rem;
    font-weight: 800;
    letter-spacing: 2px;
    margin-bottom: 4px;
    color: #9CA3AF;
}

:deep(.prize-text) {
    font-size: 0.9rem;
    font-weight: 900;
    line-height: 1.2;
}

:deep(.scratch-canvas) {
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    z-index: 20;
    border-radius: 12px;
}

.scratch-controls {
    display: flex;
    gap: 12px;
    justify-content: center;
}

.scratch-btn {
    padding: 12px 24px;
    border-radius: 10px;
    font-weight: 700;
    font-size: 0.9rem;
    cursor: pointer;
    transition: all 0.3s ease;
    border: none;
    color: white;
}

.scratch-btn:disabled {
    opacity: 0.6;
    cursor: not-allowed;
}

.reveal-btn {
    background: linear-gradient(135deg, #FFD700, #FFA500);
}

.reveal-btn:hover:not(:disabled) {
    transform: translateY(-2px);
    box-shadow: 0 6px 20px rgba(255, 215, 0, 0.5);
}

.reset-btn {
    background: linear-gradient(135deg, #4B5563, #374151);
    border: 1px solid #6B7280;
}

.reset-btn:hover:not(:disabled) {
    background: linear-gradient(135deg, #6B7280, #4B5563);
    transform: translateY(-2px);
}

/* Responsive */
@media (max-width: 400px) {
    .scratch-grid {
        grid-template-columns: repeat(2, 1fr);
        gap: 8px;
    }

    .scratch-title {
        font-size: 1.4rem;
    }

    :deep(.prize-text) {
        font-size: 0.75rem;
    }
}
</style>
