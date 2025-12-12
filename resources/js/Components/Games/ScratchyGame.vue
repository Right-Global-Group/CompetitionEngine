<script lang="ts" setup>
import { nextTick, onMounted, reactive, ref, watch } from 'vue';

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

const props = defineProps<{
    scratchyAssets: {
        scratchOverlay: string;
        textColour: string;
        wonTextColour: string;
        loseTextColour: string;
        accentColour: string;
    };
    tickets: any[];
}>();

watch(
    () => props.scratchyAssets,
    (newVal) => {
        scratchOverlay.value = newVal.scratchOverlay;
        textColour.value = newVal.textColour;
        wonTextColour.value = newVal.wonTextColour;
        loseTextColour.value = newVal.loseTextColour;
        accentColour.value = newVal.accentColour;
    },
    { deep: true }
);

const scratchOverlay = ref(props.scratchyAssets.scratchOverlay);
const textColour = ref(props.scratchyAssets.textColour);
const wonTextColour = ref(props.scratchyAssets.wonTextColour);
const loseTextColour = ref(props.scratchyAssets.loseTextColour);
const accentColour = ref(props.scratchyAssets.accentColour);
const ticketsData = reactive<TicketState[]>([]);
const isRevealing = ref(false);
const ticketsGrid = ref<HTMLDivElement | null>(null);

function createTicketElement(id: number, prize: Prize): TicketState {
    const wrapper = document.createElement('div');
    wrapper.className = 'relative rounded-xl bg-transparent backdrop-blur-lg border border-white/10 transition-transform transition-shadow duration-300 ease-in-out hover:scale-105 hover:-translate-y-1 hover:shadow-[0_20px_40px_rgba(0,0,0,0.4)]';

    const container = document.createElement('div');
    container.className = 'relative w-full pt-[70%] cursor-grab rounded-xl overflow-hidden';

    const prizeContent = document.createElement('div');
    const prizeTextColour = prize.text !== 'NO WIN' ? wonTextColour.value : loseTextColour.value;
    const glowEffect = `0px 0px 8px ${accentColour.value}, 0 0 20px ${accentColour.value}`;
    prizeContent.className = `absolute inset-0 flex flex-col justify-center items-center text-center z-10 leading-[1.3] text-lg text-xs md:text-xs`;
    prizeContent.style.color = prizeTextColour;
    prizeContent.style.textShadow = glowEffect;
    
    // Hide the prize content initially to prevent flash
    prizeContent.style.opacity = '0';
    prizeContent.style.visibility = 'hidden';
    
    const ticketNumber = (props.tickets[id]?.number !== undefined) ? props.tickets[id].number : (id + 1).toString();
    const prizeString = prize.text.replace('<br>', ' ');

    prizeContent.innerHTML = `
        <span class="font-orbitron font-extrabold text-md tracking-widest mb-1 text-secondary select-none">
          #${ticketNumber}
        </span>
        <span class="font-black text-xl" style="text-shadow: ${glowEffect}">${prizeString}</span>`;

    const canvas = document.createElement('canvas');
    canvas.className = 'absolute top-0 left-0 w-full h-full z-20';

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

    const overlayImage = new Image();
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
        
        // Now that overlay is ready, make prize content visible but still hidden behind overlay
        prizeContent.style.opacity = '1';
        prizeContent.style.visibility = 'visible';
    };

    // Timeout fallback in case image never loads
    setTimeout(() => {
        if (prizeContent.style.opacity === '0') {
            overlayImage.onerror?.(new Event('timeout'));
        }
    }, 5000);

    overlayImage.onerror = (): void => {
        ctx.clearRect(0, 0, canvas.width, canvas.height);
        ctx.fillStyle = '#999999';
        ctx.fillRect(0, 0, canvas.width, canvas.height);

        ctx.fillStyle = 'rgba(0,0,0,0.6)';
        ctx.font = `900 ${canvas.width / 3}px Inter, sans-serif`;
        ctx.textAlign = 'center';
        ctx.textBaseline = 'middle';
        ctx.fillText((ticket.id + 1).toString(), canvas.width / 2, canvas.height / 2);
        
        // Even on error, show the prize content (it's still hidden by the gray overlay)
        prizeContent.style.opacity = '1';
        prizeContent.style.visibility = 'visible';
    };
}

function setupGame(): void {
    isRevealing.value = false;
    ticketsData.splice(0, ticketsData.length);
    if (ticketsGrid.value) {
        ticketsGrid.value.innerHTML = '';
    }
    const mappedTickets = props.tickets.map((ticket, index) =>
        createTicketElement(index, {
            text: ticket.instant_win?.prize ?? 'NO WIN',
        })
    );
    ticketsData.push(...mappedTickets);
}

function revealAll(): void {
    if (isRevealing.value) {
        return;
    }
    isRevealing.value = true;

    ticketsData.forEach((ticket, i) => {
        setTimeout(() => {
            revealTicket(ticket, true);
        }, i * 100);
    });

    setTimeout(
        () => {
            isRevealing.value = false;
        },
        ticketsData.length * 100 + 100
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

onMounted((): void => {
    setupGame();
});

watch(
    () => props.tickets,
    (): void => {
        setupGame();
    }
);
</script>

<template>
    <div class="h-[80vh] mt-20 flex flex-col items-center justify-center p-4 sm:p-6 lg:p-8 relative z-10 text-white antialiased select-none">
        <main ref="ticketsGrid" class="grid grid-cols-2 md:grid-cols-5 gap-6 md:gap-3 max-w-4xl w-full mx-auto overflow-auto max-h-[70vh]"></main>

        <div class="mt-6 flex space-x-4">
            <UiButton variant="secondary" class="px-6 py-3 mx-2 transition" :disabled="isRevealing" @click="revealAll"> Reveal All </UiButton>
            <UiButton variant="secondary" class="px-6 py-3 mx-2 transition" :disabled="isRevealing" @click="setupGame"> Replay </UiButton>
        </div>
    </div>
</template>