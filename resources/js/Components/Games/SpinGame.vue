<script setup lang="ts">
import gsap from 'gsap';
import { ref, computed, onMounted } from 'vue';

interface SpinAssets {
    titleText: string;
    titleColor: string;
    wheelEdgeColor?: string;
    background?: string;
    logo?: string;
    walletText?: string;
    walletColor?: string;
}

interface InstantWin {
    id: number;
    name: string;
    prize: string;
    value: number;
    claimed: boolean;
    image_path: string | null;
    won_date: string | null;
}

interface Ticket {
    id: number;
    number: string;
    instant_win: InstantWin | false;
}

interface Segment {
    index: number;
    color: string;
    text: string;
    isWin: boolean;
    startAngle?: number;
    endAngle?: number;
    centerAngle?: number;
}

const props = defineProps<{
    demoMode?: boolean;
    previewMode?: 'mobile' | 'desktop';
    spinAssets: SpinAssets;
    tickets?: Ticket[];
    playedTickets?: number[];
}>();

const emit = defineEmits<{
    'ticket-played': [ticketId: number];
    'prize-won': [prize: string];
}>();

const isSpinning = ref<boolean>(false);
const isAnimating = ref<boolean>(false);
const wheelRef = ref<HTMLDivElement | null>(null);
const pointerRef = ref<HTMLDivElement | null>(null);
const staticSegmentText = ref<string>('TAP TO SPIN');
const showResult = ref<boolean>(false);
const currentTicketNumber = ref<string>('');
const resultComplete = ref<boolean>(false);

// Floating Wallet State
const showWinnerCard = ref<boolean>(false);
const hideFloatingCard = ref<boolean>(false);
const isCardAnimatingToCorner = ref<boolean>(false);
const currentPrizeAmount = ref<string>('');

let currentWheelRotation: number = 0;

const segments: Readonly<Segment[]> = [
    { index: 0, color: '#ffffff', text: 'UNLUCKY', isWin: false },
    { index: 1, color: '#f3e8ff', text: 'WINNER', isWin: true },
    { index: 2, color: '#ffffff', text: 'UNLUCKY', isWin: false },
    { index: 3, color: '#f3e8ff', text: 'LUCKY', isWin: true },
    { index: 4, color: '#ffffff', text: 'UNLUCKY', isWin: false },
    { index: 5, color: '#f3e8ff', text: 'WINNER', isWin: true },
    { index: 6, color: '#ffffff', text: 'UNLUCKY', isWin: false },
    { index: 7, color: '#f3e8ff', text: 'LUCKY', isWin: true },
    { index: 8, color: '#ffffff', text: 'UNLUCKY', isWin: false },
    { index: 9, color: '#f3e8ff', text: 'WINNER', isWin: true },
    { index: 10, color: '#ffffff', text: 'UNLUCKY', isWin: false },
    { index: 11, color: '#ffffff', text: 'UNLUCKY', isWin: false },
] as const;

const spinsLeft = computed((): number => {
    if (props.demoMode) {
        return 9;
    }
    if (!props.tickets) {
        return 0;
    }
    return props.tickets.length - (props.playedTickets?.length || 0);
});

const canSpin = computed((): boolean => spinsLeft.value > 0 && !isSpinning.value && !isAnimating.value && !showResult.value && resultComplete.value);

const maskSize = computed((): string => (props.previewMode === 'mobile' ? '70%' : '70%'));
const maskEdge = computed((): string => (props.previewMode === 'mobile' ? '75%' : '75%'));
const isDesktop = computed((): boolean => props.previewMode === 'desktop');
const isMobile = computed((): boolean => props.previewMode === 'mobile');

const getStaticSegmentFill = computed((): string => {
    if (showResult.value) {
        if (staticSegmentText.value === 'UNLUCKY') {
            return '#ff0000';
        } else if (staticSegmentText.value === 'WINNER' || staticSegmentText.value === 'LUCKY') {
            return '#00ff00';
        }
    }
    return props.spinAssets.wheelEdgeColor || '#00aeffff';
});

const titleStyle = computed(() => ({
    color: props.spinAssets.titleColor,
    textShadow: `0 0 5px ${props.spinAssets.titleColor}, 0 0 10px ${props.spinAssets.titleColor}, 0 0 15px ${props.spinAssets.titleColor}, 0 0 20px ${props.spinAssets.wheelEdgeColor || '#00aeffff'}`,
}));

const titleClasses = computed((): string => {
    const baseClasses = isMobile.value ? '' : 'animate-pulse';
    return isDesktop.value ? `${baseClasses} desktop-title` : `${baseClasses} mobile-title`;
});

const walletGradient = computed((): string => {
    const color = props.spinAssets.walletColor || '#8b5cf6';
    return `linear-gradient(135deg, ${color} 0%, ${color}dd 50%, ${color}bb 100%)`;
});

onMounted(() => {
    resultComplete.value = true;
    if (canSpin.value) {
        setTimeout(animateTapToSpin, 200);
    }
});

const animateText = (): void => {
    if (isSpinning.value || isAnimating.value || showResult.value || !canSpin.value || isMobile.value) {
        return;
    }

    const tapToSpinText = document.querySelector('.tap-to-spin-text');
    const tapToSpinLetters = document.querySelectorAll('.tap-to-spin-letter');
    const trianglePointer = document.querySelector('.triangle-pointer');
    const centerHub = document.querySelector('circle[cx="90"], circle[cx="75"]');
    const centerDiamond = document.querySelector('g:has(path[d*="M90 150"], path[d*="M75 125"])');

    if (tapToSpinText || tapToSpinLetters.length > 0) {
        const textElements = tapToSpinText ? [tapToSpinText] : Array.from(tapToSpinLetters);
        const pointerElements = [trianglePointer, centerHub, centerDiamond].filter(Boolean);

        gsap.killTweensOf([...textElements, ...pointerElements]);

        gsap.fromTo(
            textElements,
            {
                opacity: 0,
                y: 15,
                scale: 0.9,
            },
            {
                opacity: 1,
                y: 0,
                scale: 1,
                duration: 0.8,
                ease: 'back.out(1.2)',
                stagger: 0.1,
                onComplete: () => startPulseAnimation(textElements, pointerElements),
            }
        );
    }
};

const startPulseAnimation = (textElements: Element[], pointerElements: Element[]): void => {
    if (isMobile.value) {
        return;
    }

    const casinoPulse = (): void => {
        if (isSpinning.value || isAnimating.value || showResult.value || !canSpin.value) {
            return;
        }

        const tl = gsap.timeline();

        tl.to([...textElements, ...pointerElements], {
            scale: 1.2,
            duration: 0.25,
            ease: 'power2.out',
            transformOrigin: 'center center',
        }).to(
            [...textElements, ...pointerElements],
            {
                scale: 1,
                duration: 0.5,
                ease: 'elastic.out(1, 0.4)',
                transformOrigin: 'center center',
            },
            '-=0.1'
        );

        setTimeout(() => {
            if (!isSpinning.value && !isAnimating.value && !showResult.value && canSpin.value) {
                casinoPulse();
            }
        }, 2000);
    };

    setTimeout(casinoPulse, 1000);

    gsap.to(textElements, {
        y: -3,
        duration: 1.5,
        ease: 'power2.inOut',
        repeat: -1,
        yoyo: true,
        stagger: 0.1,
    });
};

const animateTapToSpin = (): void => {
    if (resultComplete.value && canSpin.value && staticSegmentText.value === 'TAP TO SPIN') {
        animateText();
    }
};

const getNextTicket = (): Ticket | null => {
    if (!props.tickets || props.demoMode) {
        return null;
    }

    const playedIds = props.playedTickets || [];
    const unplayedTickets = props.tickets.filter((ticket) => !playedIds.includes(ticket.id));

    return unplayedTickets.length > 0 ? unplayedTickets[0] : null;
};

const performWheelSpin = (totalRotation: number, overshootAmount: number): void => {
    if (!wheelRef.value) {
        return;
    }

    const wheelTimeline = gsap.timeline();
    wheelTimeline
        .to(wheelRef.value, {
            rotation: currentWheelRotation - 15,
            duration: 0.2,
            ease: 'power2.out',
            transformOrigin: '50% 50%',
        })
        .to(wheelRef.value, {
            rotation: currentWheelRotation + totalRotation + overshootAmount,
            duration: 2.0,
            ease: 'power3.out',
            transformOrigin: '50% 50%',
        })
        .to(
            wheelRef.value,
            {
                rotation: currentWheelRotation + totalRotation,
                duration: 0.3,
                ease: 'back.out(1.5)',
                transformOrigin: '50% 50%',
            },
            '-=0.05'
        );

    currentWheelRotation += totalRotation;
};

const performPointerAnimation = (): void => {
    if (!pointerRef.value) {
        return;
    }

    const pointerTimeline = gsap.timeline();
    pointerTimeline
        .to(pointerRef.value, {
            rotation: 5,
            duration: 0.2,
            ease: 'power2.out',
        })
        .to(pointerRef.value, {
            duration: 1.2,
            ease: 'none',
            modifiers: {
                rotation: () => Math.sin(Date.now() * 0.008) * 4,
            },
        })
        .to(pointerRef.value, {
            duration: 0.8,
            ease: 'power3.out',
            modifiers: {
                rotation: () => Math.sin(Date.now() * 0.002) * 2,
            },
        })
        .to(pointerRef.value, {
            rotation: 0,
            duration: 0.3,
            ease: 'power2.out',
        });
};

const performTriangleFlicker = (): void => {
    const triangleElement = pointerRef.value?.querySelector('.triangle-pointer');
    if (!triangleElement) {
        return;
    }

    let isRunning = true;
    const startTime = Date.now();

    const fastFlicker = (): void => {
        if (!isRunning) {
            return;
        }

        const elapsed = (Date.now() - startTime) / 1000;
        let interval = 60;
        if (elapsed > 0.2) {
            interval = 80;
        }
        if (elapsed > 0.5) {
            interval = 120;
        }
        if (elapsed > 0.8) {
            interval = 180;
        }

        const amplitude = elapsed > 0.4 ? 5 : 4;

        gsap.to(triangleElement, {
            rotation: amplitude,
            duration: 0.08,
            ease: 'sine.inOut',
            transformOrigin: 'center bottom',
            onComplete: () => {
                if (!isRunning) {
                    return;
                }
                gsap.to(triangleElement, {
                    rotation: 0,
                    duration: 0.08,
                    ease: 'sine.inOut',
                    onComplete: () => {
                        if (elapsed < 1.2 && isRunning) {
                            setTimeout(fastFlicker, interval);
                        } else {
                            gsap.to(triangleElement, {
                                rotation: 0,
                                duration: 0.15,
                                ease: 'power2.out',
                            });
                        }
                    },
                });
            },
        });
    };

    fastFlicker();

    setTimeout(() => {
        gsap.to(triangleElement, {
            rotation: 7,
            duration: 0.25,
            ease: 'power1.out',
            transformOrigin: 'center bottom',
            onComplete: () => {
                gsap.to(triangleElement, {
                    rotation: 0,
                    duration: 0.8,
                    ease: 'power2.out',
                });
            },
        });
    }, 1950);

    setTimeout(() => {
        isRunning = false;
    }, 2800);
};

const calculateTargetRotation = (targetSegment: Segment): number => {
    const totalSegments = segments.length;
    const degreesPerSegment = 360 / totalSegments;
    const targetSegmentCenterAngle = targetSegment.index * degreesPerSegment + degreesPerSegment / 2;
    const currentNormalizedRotation = currentWheelRotation % 360;
    const targetCurrentPosition = (targetSegmentCenterAngle + currentNormalizedRotation) % 360;

    let rotationNeeded = 270 - targetCurrentPosition;
    if (rotationNeeded < 0) {
        rotationNeeded += 360;
    }

    const fullRotations = Math.floor(2 + Math.random() * 2) * 360;
    return rotationNeeded + fullRotations;
};

const spinWheel = (): void => {
    if (!canSpin.value || isSpinning.value || isAnimating.value || showResult.value || !resultComplete.value) {
        return;
    }

    gsap.killTweensOf('.tap-to-spin-letter');
    gsap.killTweensOf('.tap-to-spin-text');
    gsap.killTweensOf('.result-text');

    isSpinning.value = true;
    isAnimating.value = true;
    resultComplete.value = false;
    showResult.value = false;

    const currentTicket = getNextTicket();

    let isWinner = false;
    let prizeName = '';

    if (props.demoMode) {
        isWinner = Math.random() > 0.6;
        prizeName = isWinner ? '£100 Demo Win!' : '';
        currentTicketNumber.value = `#${Math.floor(Math.random() * 9999) + 1000}`;
    } else if (currentTicket) {
        isWinner = currentTicket.instant_win !== false;
        prizeName = isWinner ? currentTicket.instant_win.prize : '';
        currentTicketNumber.value = `#${currentTicket.number}`;
        emit('ticket-played', currentTicket.id);
    } else {
        isSpinning.value = false;
        isAnimating.value = false;
        resultComplete.value = true;
        return;
    }

    staticSegmentText.value = '';

    const winningSegments = segments.filter((s) => s.isWin);
    const losingSegments = segments.filter((s) => !s.isWin);
    const targetSegment = isWinner ? winningSegments[Math.floor(Math.random() * winningSegments.length)] : losingSegments[Math.floor(Math.random() * losingSegments.length)];

    const totalRotation = calculateTargetRotation(targetSegment);
    const overshootAmount = 3 + Math.random() * 3;

    performWheelSpin(totalRotation, overshootAmount);
    performPointerAnimation();
    performTriangleFlicker();

    setTimeout(() => {
        isSpinning.value = false;

        setTimeout(() => {
            staticSegmentText.value = isWinner ? targetSegment.text : 'UNLUCKY';
            showResult.value = true;

            if (isWinner) {
                emit('prize-won', prizeName);
                // Show floating wallet winner card
                currentPrizeAmount.value = prizeName;
                hideFloatingCard.value = true;
                showWinnerCard.value = true;

                // Animate card to corner after display
                setTimeout(() => {
                    isCardAnimatingToCorner.value = true;
                    setTimeout(() => {
                        showWinnerCard.value = false;
                        isCardAnimatingToCorner.value = false;
                        hideFloatingCard.value = false;
                    }, 500);
                }, 2500);
            }

            const displayTime = isWinner ? 3000 : 1000;

            setTimeout(() => {
                gsap.to('.result-text', {
                    opacity: 0,
                    duration: 0.3,
                    ease: 'power2.out',
                    onComplete: () => {
                        showResult.value = false;
                        staticSegmentText.value = '';
                        currentTicketNumber.value = '';
                        currentPrizeAmount.value = '';

                        setTimeout(() => {
                            isAnimating.value = false;

                            if (spinsLeft.value > 0) {
                                staticSegmentText.value = 'TAP TO SPIN';
                                resultComplete.value = true;
                                setTimeout(animateTapToSpin, 500);
                            } else {
                                staticSegmentText.value = 'NO SPINS';
                                resultComplete.value = true;
                            }
                        }, 100);
                    },
                });
            }, displayTime);
        }, 400);
    }, 2600);
};

const generateSvgWheel = (): Segment[] => {
    const segmentCount = segments.length;
    const anglePerSegment = 360 / segmentCount;

    return segments.map((segment, index) => ({
        ...segment,
        startAngle: index * anglePerSegment,
        endAngle: index * anglePerSegment + anglePerSegment,
        centerAngle: index * anglePerSegment + anglePerSegment / 2,
    }));
};

const createSvgPath = (segment: Segment, cx: number, cy: number, r: number, anglePerSegment: number): string => {
    const deg2rad = (deg: number): number => (deg * Math.PI) / 180;
    const startRad = deg2rad(segment.startAngle!);
    const endRad = deg2rad(segment.endAngle!);

    const x1 = cx + r * Math.cos(startRad);
    const y1 = cy + r * Math.sin(startRad);
    const x2 = cx + r * Math.cos(endRad);
    const y2 = cy + r * Math.sin(endRad);

    const arcFlag = anglePerSegment <= 180 ? 0 : 1;

    return [`M ${cx},${cy}`, `L ${x1},${y1}`, `A ${r},${r} 0 ${arcFlag},1 ${x2},${y2}`, 'Z'].join(' ');
};

const getSegmentTextPosition = (segment: Segment, cx: number, cy: number, r: number): { x: number; y: number } => {
    const deg2rad = (deg: number): number => (deg * Math.PI) / 180;
    const centerAngleRad = deg2rad(segment.centerAngle!);
    const textRadius = r * 0.7;

    return {
        x: cx + textRadius * Math.cos(centerAngleRad),
        y: cy + textRadius * Math.sin(centerAngleRad),
    };
};

const createStaticSegmentPath = (cx: number, cy: number, r: number, anglePerSegment: number): string => {
    const deg2rad = (deg: number): number => (deg * Math.PI) / 180;
    const extendedRadius = r + 3;
    const startAngle = 270 - anglePerSegment / 2;
    const endAngle = 270 + anglePerSegment / 2;

    const startRad = deg2rad(startAngle);
    const endRad = deg2rad(endAngle);

    const x1 = cx + extendedRadius * Math.cos(startRad);
    const y1 = cy + extendedRadius * Math.sin(startRad);
    const x2 = cx + extendedRadius * Math.cos(endRad);
    const y2 = cy + extendedRadius * Math.sin(endRad);

    const arcFlag = anglePerSegment <= 180 ? 0 : 1;

    return [`M ${cx},${cy}`, `L ${x1},${y1}`, `A ${extendedRadius},${extendedRadius} 0 ${arcFlag},1 ${x2},${y2}`, 'Z'].join(' ');
};
</script>

<template>
    <div class="spin-game-wrapper"
        :style="{
            backgroundImage: spinAssets.background ? `url(${spinAssets.background})` : 'none',
            backgroundColor: spinAssets.background ? 'transparent' : '#0a0a1a',
            backgroundSize: 'cover',
            backgroundPosition: 'center'
        }">
        <div class="flex-1 flex flex-col relative overflow-hidden">
            <div class="flex-1 flex flex-col justify-center items-center relative z-20"
                :style="{ marginTop: isDesktop ? '40px' : '30px' }">
                <div class="wheel-title mb-4">
                    <span :class="titleClasses" :style="titleStyle">{{ spinAssets.titleText }}</span>
                </div>
            </div>

            <div class="relative w-full h-3/5 overflow-hidden" :style="{ marginTop: isMobile ? '80px' : '0' }">
                <div class="absolute left-1/2 transform -translate-x-1/2 overflow-hidden rounded-full"
                    :style="`bottom: -70%; width: 180%; height: 160%; mask: radial-gradient(circle at center, white ${maskSize}, transparent ${maskEdge}); -webkit-mask: radial-gradient(circle at center, white ${maskSize}, transparent ${maskEdge});`">
                <!-- Glow effect only on mobile, removed for desktop to eliminate shade -->
                <div v-if="isMobile" class="absolute inset-0 rounded-full"
                    :style="`background: radial-gradient(circle, transparent 35%, ${spinAssets.wheelEdgeColor || '#00aeffff'} 65%, transparent 80%); opacity: 0.5;`">
                </div>

                <div class="relative w-full h-full overflow-hidden rounded-full">
                    <div ref="wheelRef" class="relative w-full h-full rounded-full shadow-2xl overflow-hidden"
                        :style="`transform-origin: 50% 50%; mask: radial-gradient(circle, white ${maskSize === '70%' ? '65%' : '45%'}, transparent ${maskSize === '70%' ? '70%' : '50%'}); -webkit-mask: radial-gradient(circle, white ${maskSize === '70%' ? '65%' : '45%'}, transparent ${maskSize === '70%' ? '70%' : '50%'});`">
                        <svg viewBox="0 0 264 264" class="w-full h-full absolute inset-0 z-10"
                            xmlns="http://www.w3.org/2000/svg"
                            :style="`mask: radial-gradient(circle, white ${maskSize === '70%' ? '65%' : '45%'}, transparent ${maskSize === '70%' ? '70%' : '50%'}); -webkit-mask: radial-gradient(circle, white ${maskSize === '70%' ? '65%' : '45%'}, transparent ${maskSize === '70%' ? '70%' : '50%'});`">
                            <defs>
                                <clipPath id="wheelClip">
                                    <circle cx="132" cy="132" r="120" />
                                </clipPath>

                                <linearGradient v-if="!isMobile" id="neonPurpleGradient" x1="0%" y1="0%" x2="100%"
                                    y2="100%">
                                    <stop offset="0%"
                                        :style="`stop-color: ${spinAssets.wheelEdgeColor || '#db07f2'}`" />
                                    <stop offset="50%"
                                        :style="`stop-color: ${spinAssets.wheelEdgeColor || '#a855f7'}`" />
                                    <stop offset="100%"
                                        :style="`stop-color: ${spinAssets.wheelEdgeColor || '#7c3aed'}`" />
                                </linearGradient>

                                <filter v-if="!isMobile" id="neonGlow" x="-50%" y="-50%" width="200%" height="200%">
                                    <feGaussianBlur stdDeviation="3" result="coloredBlur" />
                                    <feMerge>
                                        <feMergeNode in="coloredBlur" />
                                        <feMergeNode in="SourceGraphic" />
                                    </feMerge>
                                </filter>

                                <radialGradient id="explosiveRim">
                                    <stop offset="75%" style="stop-color: transparent" />
                                    <stop offset="88%"
                                        :style="isMobile
                                            ? `stop-color: ${spinAssets.wheelEdgeColor || '#00aeffff'}; stop-opacity: 0.7`
                                            : `stop-color: ${spinAssets.wheelEdgeColor || '#00aeffff'}; stop-opacity: 0.6`" />
                                    <stop offset="95%" :style="isMobile
                                        ? `stop-color: ${spinAssets.wheelEdgeColor || '#00aeffff'}; stop-opacity: 0.9`
                                        : 'stop-color: #ffffff; stop-opacity: 1'" />
                                    <stop offset="100%" :style="isMobile
                                        ? 'stop-color: #ffffff; stop-opacity: 0.8'
                                        : 'stop-color: #ffffff; stop-opacity: 1'" />
                                </radialGradient>
                            </defs>

                            <g clip-path="url(#wheelClip)">
                                <circle cx="132" cy="132" r="120" fill="#ffffff" stroke="none" />

                                <g class="wheel-segments">
                                    <g v-for="segment in generateSvgWheel()" :key="segment.index">
                                        <path :d="createSvgPath(segment, 132, 132, 120, 360 / segments.length)"
                                            :fill="segment.color" stroke="#ffffff" :stroke-width="isDesktop ? '2' : '1'"
                                            opacity="1" />

                                        <g v-if="segment.isWin">
                                            <g v-if="spinAssets.logo">
                                                <defs>
                                                    <clipPath :id="`logoClip${segment.index}`">
                                                        <circle
                                                            :cx="getSegmentTextPosition(segment, 132, 132, 120).x - 8"
                                                            :cy="getSegmentTextPosition(segment, 132, 132, 120).y"
                                                            :r="isDesktop ? '4' : '3'" />
                                                    </clipPath>
                                                </defs>

                                                <image :x="getSegmentTextPosition(segment, 132, 132, 120).x - 12"
                                                    :y="getSegmentTextPosition(segment, 132, 132, 120).y - 4"
                                                    :width="isDesktop ? '8' : '6'" :height="isDesktop ? '8' : '6'"
                                                    :href="spinAssets.logo"
                                                    :clip-path="`url(#logoClip${segment.index})`"
                                                    :transform="`rotate(${segment.centerAngle}, ${getSegmentTextPosition(segment, 132, 132, 120).x - 8}, ${getSegmentTextPosition(segment, 132, 132, 120).y})`" />
                                            </g>

                                            <g v-else>
                                                <circle :cx="getSegmentTextPosition(segment, 132, 132, 120).x - 8"
                                                    :cy="getSegmentTextPosition(segment, 132, 132, 120).y"
                                                    :r="isDesktop ? '4' : '3'"
                                                    :fill="isMobile ? (spinAssets.wheelEdgeColor || '#00aeffff') : 'url(#neonPurpleGradient)'"
                                                    :filter="isMobile ? 'none' : 'url(#neonGlow)'"
                                                    :transform="`rotate(${segment.centerAngle}, ${getSegmentTextPosition(segment, 132, 132, 120).x - 8}, ${getSegmentTextPosition(segment, 132, 132, 120).y})`" />

                                                <path
                                                    :d="`M${getSegmentTextPosition(segment, 132, 132, 120).x - 8} ${getSegmentTextPosition(segment, 132, 132, 120).y - 2}
                                  L${getSegmentTextPosition(segment, 132, 132, 120).x - 6} ${getSegmentTextPosition(segment, 132, 132, 120).y}
                                  L${getSegmentTextPosition(segment, 132, 132, 120).x - 8} ${getSegmentTextPosition(segment, 132, 132, 120).y + 2}
                                  L${getSegmentTextPosition(segment, 132, 132, 120).x - 10} ${getSegmentTextPosition(segment, 132, 132, 120).y} Z`"
                                                    fill="#ffffff"
                                                    :transform="`rotate(${segment.centerAngle}, ${getSegmentTextPosition(segment, 132, 132, 120).x - 8}, ${getSegmentTextPosition(segment, 132, 132, 120).y})`" />
                                            </g>

                                            <text :x="getSegmentTextPosition(segment, 132, 132, 120).x + 4"
                                                :y="getSegmentTextPosition(segment, 132, 132, 120).y"
                                                text-anchor="middle" dominant-baseline="central"
                                                :font-size="isDesktop ? '7' : '5'" font-family="Arial Black, sans-serif"
                                                font-weight="900"
                                                :fill="isMobile ? (spinAssets.wheelEdgeColor || '#00aeffff') : 'url(#neonPurpleGradient)'"
                                                :filter="isMobile ? 'none' : 'url(#neonGlow)'" stroke="#ffffff"
                                                :stroke-width="isDesktop ? '0.3' : '0.2'"
                                                :transform="`rotate(${segment.centerAngle}, ${getSegmentTextPosition(segment, 132, 132, 120).x + 4}, ${getSegmentTextPosition(segment, 132, 132, 120).y})`">
                                                {{ segment.text }}
                                            </text>
                                        </g>

                                        <g v-else>
                                            <text :x="getSegmentTextPosition(segment, 132, 132, 120).x"
                                                :y="getSegmentTextPosition(segment, 132, 132, 120).y"
                                                text-anchor="middle" dominant-baseline="central"
                                                :font-size="isDesktop ? '7' : '5'" font-family="Arial, sans-serif"
                                                font-weight="400" fill="#9ca3af" stroke="#ffffff"
                                                :stroke-width="isDesktop ? '0.2' : '0.1'"
                                                :transform="`rotate(${segment.centerAngle}, ${getSegmentTextPosition(segment, 132, 132, 120).x}, ${getSegmentTextPosition(segment, 132, 132, 120).y})`">
                                                {{ segment.text }}
                                            </text>
                                        </g>
                                    </g>
                                </g>

                                <circle cx="132" cy="132" r="120" fill="url(#explosiveRim)" stroke="none" />
                            </g>
                        </svg>
                    </div>
                </div>

                <svg viewBox="0 0 264 264" class="w-full h-full absolute inset-0 z-30 rounded-full pointer-events-none"
                    xmlns="http://www.w3.org/2000/svg">
                    <defs>
                        <clipPath id="staticClip">
                            <circle cx="132" cy="132" r="125" />
                        </clipPath>
                    </defs>

                    <g clip-path="url(#staticClip)">
                        <path :d="createStaticSegmentPath(132, 132, 120, 360 / segments.length)"
                            :fill="isSpinning ? 'rgba(255, 255, 255, 0.1)' : getStaticSegmentFill" stroke="#ffffff"
                            :stroke-width="isSpinning ? (isDesktop ? '4' : '3') : isDesktop ? '3' : '2'"
                            :stroke-opacity="isSpinning ? '0.8' : '1'" class="static-highlight-segment" :class="{
                                'clickable-segment': canSpin && resultComplete,
                                'disabled-segment': !canSpin || !resultComplete || isSpinning || isAnimating || showResult,
                                'spinning-fade': isSpinning,
                            }"
                            @click.stop="canSpin && resultComplete && !isSpinning && !isAnimating && !showResult && spinWheel()"
                            style="pointer-events: all" />

                        <rect x="102" y="12" width="60" height="60" fill="transparent"
                            @click.stop="canSpin && resultComplete && !isSpinning && !isAnimating && !showResult && spinWheel()"
                            :class="{ 'clickable-overlay': canSpin && resultComplete && !isSpinning && !isAnimating && !showResult }"
                            :style="{
                                pointerEvents: 'all',
                                cursor: canSpin && resultComplete && !isSpinning && !isAnimating && !showResult ? 'pointer' : 'not-allowed',
                            }" />

                        <g transform="translate(132, 30)" class="static-text-container">
                            <text v-if="staticSegmentText === 'TAP TO SPIN'" text-anchor="middle"
                                class="tap-to-spin-text" :style="{
                                    fontSize: isDesktop ? '11px' : '9px',
                                    fontFamily: 'Arial Black, sans-serif',
                                    fontWeight: 900,
                                    perspective: '100px',
                                }" fill="#ffffff" transform="rotate(-8)">
                                <tspan x="0" dy="2" class="tap-to-spin-letter tap-to-line">TAP TO</tspan>
                                <tspan x="0" dy="10" class="tap-to-spin-letter spin-word-main">SPIN</tspan>
                            </text>

                            <text v-else-if="staticSegmentText === 'NO SPINS'" text-anchor="middle" :style="{
                                fontSize: isDesktop ? '9px' : '7px',
                                fontFamily: 'Arial Black, sans-serif',
                                fontWeight: 900,
                            }" fill="#ff6b6b">
                                <tspan x="0" dy="0">NO</tspan>
                                <tspan x="0" dy="10">SPINS</tspan>
                                <tspan x="0" dy="20">LEFT</tspan>
                            </text>

                            <text v-else-if="staticSegmentText && showResult" text-anchor="middle" class="result-text"
                                :class="[staticSegmentText === 'WINNER' || staticSegmentText === 'LUCKY' ? 'winner-text' : staticSegmentText === 'UNLUCKY' ? 'unlucky-text' : '', showResult ? 'result-reveal' : '']"
                                :style="{
                                    fontSize: isDesktop ? '9px' : '7px',
                                    fontFamily: 'Arial, sans-serif',
                                    fontWeight: 'bold',
                                }" fill="#ffffff">
                                <tspan x="0" dy="6">{{ staticSegmentText }}</tspan>
                                <tspan v-if="currentTicketNumber" x="0" dy="12"
                                    :style="{ fontSize: isDesktop ? '7px' : '5px' }" class="ticket-number">
                                    {{ currentTicketNumber }}
                                </tspan>
                            </text>
                        </g>
                    </g>
                </svg>

                <div ref="pointerRef"
                    class="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 z-40">
                    <div class="flex flex-col items-center pointer-container">
                        <svg :width="isDesktop ? '180' : '150'" :height="isDesktop ? '288' : '240'"
                            :viewBox="isDesktop ? '0 0 180 288' : '0 0 150 240'"
                            :class="isMobile ? '' : 'drop-shadow-2xl filter brightness-125'">
                            <defs>
                                <linearGradient v-if="isDesktop" id="ultimateTriangle" x1="0%" y1="0%" x2="0%"
                                    y2="100%">
                                    <stop offset="0%" style="stop-color: #ffffff; stop-opacity: 1" />
                                    <stop offset="10%" style="stop-color: #ffff00; stop-opacity: 1" />
                                    <stop offset="30%"
                                        :style="`stop-color: ${spinAssets.wheelEdgeColor || '#00aeffff'}; stop-opacity: 1`" />
                                    <stop offset="60%"
                                        :style="`stop-color: ${spinAssets.wheelEdgeColor || '#00aeffff'}; stop-opacity: 1`" />
                                    <stop offset="100%" style="stop-color: #000000; stop-opacity: 1" />
                                </linearGradient>
                                <linearGradient v-else id="ultimateTriangle" x1="0%" y1="0%" x2="0%" y2="100%">
                                    <stop offset="0%" style="stop-color: #ffffff" />
                                    <stop offset="50%"
                                        :style="`stop-color: ${spinAssets.wheelEdgeColor || '#00aeffff'}`" />
                                    <stop offset="100%"
                                        :style="`stop-color: ${spinAssets.wheelEdgeColor || '#00aeffff'}`" />
                                </linearGradient>

                                <radialGradient v-if="isDesktop" id="ultimateCircle">
                                    <stop offset="0%" style="stop-color: #ffffff" />
                                    <stop offset="20%" style="stop-color: #ffff00" />
                                    <stop offset="50%"
                                        :style="`stop-color: ${spinAssets.wheelEdgeColor || '#00aeffff'}`" />
                                    <stop offset="80%"
                                        :style="`stop-color: ${spinAssets.wheelEdgeColor || '#00aeffff'}`" />
                                    <stop offset="100%" style="stop-color: #000000" />
                                </radialGradient>
                                <radialGradient v-else id="ultimateCircle">
                                    <stop offset="0%" style="stop-color: #ffffff" />
                                    <stop offset="50%"
                                        :style="`stop-color: ${spinAssets.wheelEdgeColor || '#00aeffff'}`" />
                                    <stop offset="100%"
                                        :style="`stop-color: ${spinAssets.wheelEdgeColor || '#00aeffff'}`" />
                                </radialGradient>

                                <filter v-if="!isMobile" id="ultimateShadow" x="-50%" y="-50%" width="200%"
                                    height="200%">
                                    <feDropShadow :dx="isDesktop ? '8' : '2'" :dy="isDesktop ? '10' : '3'"
                                        :stdDeviation="isDesktop ? '15' : '4'" flood-color="#000000"
                                        :flood-opacity="isDesktop ? '0.9' : '0.5'" />
                                </filter>

                                <filter v-if="isDesktop" id="ultimateGlow" x="-100%" y="-100%" width="300%"
                                    height="300%">
                                    <feGaussianBlur stdDeviation="8" result="coloredBlur" />
                                    <feMerge>
                                        <feMergeNode in="coloredBlur" />
                                        <feMergeNode in="SourceGraphic" />
                                    </feMerge>
                                </filter>
                            </defs>

                            <path
                                :d="isDesktop ? 'M90 -12 Q74 50 55 108 Q82 96 90 100 Q98 96 125 108 Q106 50 90 -12 Z' : 'M75 -10 Q62 42 46 90 Q68 80 75 83 Q82 80 104 90 Q88 42 75 -10 Z'"
                                fill="url(#ultimateTriangle)" stroke="#000000" :stroke-width="isDesktop ? '4' : '2'"
                                stroke-linejoin="round" stroke-linecap="round"
                                :filter="isMobile ? 'none' : 'url(#ultimateShadow)'"
                                :transform="isDesktop ? 'translate(0, 42)' : 'translate(0, 35)'"
                                class="triangle-pointer" />

                            <circle :cx="isDesktop ? '90' : '75'" :cy="isDesktop ? '168' : '140'"
                                :r="isDesktop ? '48' : '40'" fill="url(#ultimateCircle)" stroke="#000000"
                                :stroke-width="isDesktop ? '5' : '2'"
                                :filter="isMobile ? 'none' : 'url(#ultimateShadow)'" />

                            <circle v-if="isDesktop" :cx="90" :cy="168" :r="38" fill="url(#ultimateTriangle)"
                                opacity="0.9" filter="url(#ultimateGlow)" />

                            <g :filter="isDesktop && !isMobile ? 'url(#ultimateGlow)' : 'none'">
                                <path
                                    :d="isDesktop ? 'M90 150 L106 168 L90 186 L74 168 Z' : 'M75 125 L88 140 L75 155 L62 140 Z'"
                                    fill="#ffffff" opacity="1" />
                                <path
                                    :d="isDesktop ? 'M90 156 L100 168 L90 180 L80 168 Z' : 'M75 130 L83 140 L75 150 L67 140 Z'"
                                    fill="#ffff00" opacity="0.9" />
                                <circle :cx="isDesktop ? '90' : '75'" :cy="isDesktop ? '168' : '140'"
                                    :r="isDesktop ? '4' : '3'" :fill="spinAssets.wheelEdgeColor || '#00aeffff'" />
                            </g>

                            <g v-if="!isMobile" class="static-sparkles">
                                <circle :cx="isDesktop ? '48' : '40'" :cy="isDesktop ? '144' : '120'"
                                    :r="isDesktop ? '4' : '3'" fill="#ffff00" opacity="0.6" />
                                <circle :cx="isDesktop ? '132' : '110'" :cy="isDesktop ? '150' : '125'"
                                    :r="isDesktop ? '3' : '2'" :fill="spinAssets.wheelEdgeColor || '#00aeffff'"
                                    opacity="0.5" />
                                <circle :cx="isDesktop ? '54' : '45'" :cy="isDesktop ? '186' : '155'"
                                    :r="isDesktop ? '4' : '3.5'" fill="#ffffff" opacity="0.7" />
                                <circle :cx="isDesktop ? '126' : '105'" :cy="isDesktop ? '180' : '150'"
                                    :r="isDesktop ? '3' : '2.5'" fill="#00ff88" opacity="0.4" />
                            </g>
                        </svg>
                    </div>
                </div>
            </div>
        </div>

        <!-- Floating Wallet Card -->
        <div v-if="spinAssets.walletText && !hideFloatingCard"
            class="floating-wallet-container"
            :class="{ 'floating-wallet-demo': demoMode }">
            <div class="floating-credit-card">
                <div class="credit-card-3d">
                    <div class="credit-card-front">
                        <div class="card-gradient" :style="{ background: walletGradient }">
                            <div class="card-header-section">
                                <div class="brand-title">
                                    <p class="brand-text">{{ spinAssets.walletText }}</p>
                                </div>
                                <div class="card-chip"></div>
                            </div>
                            <div class="card-body">
                                <p class="prize-message">SPIN TO WIN</p>
                            </div>
                            <div class="card-footer">
                                <span class="card-number">**** **** **** ****</span>
                            </div>
                            <div class="card-shine-effect"></div>
                        </div>
                    </div>
                </div>
            </div>
        </div>

        <!-- Winner Card Overlay -->
        <Transition name="winner-card">
            <div v-if="showWinnerCard"
                class="winner-card-overlay"
                :class="{ 'winner-card-demo': demoMode }">
                <div class="winner-card-container"
                    :class="{
                        'slide-to-corner': isCardAnimatingToCorner && !isMobile,
                        'slide-to-corner-mobile': isCardAnimatingToCorner && isMobile
                    }">
                    <div class="winner-card">
                        <div class="card-inner">
                            <div class="card-front">
                                <div class="card-content" :style="{ background: walletGradient }">
                                    <div class="card-header">
                                        <div class="brand-section">
                                            <p class="brand-text">{{ spinAssets.walletText || 'WINNER' }}</p>
                                        </div>
                                        <div class="card-chip"></div>
                                    </div>
                                    <div class="prize-section">
                                        <p class="prize-amount">{{ currentPrizeAmount }}</p>
                                    </div>
                                    <div class="card-footer">
                                        <span class="card-number">**** **** **** ****</span>
                                    </div>
                                    <div class="card-shine-effect"></div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </Transition>
        </div>
    </div>
</template>

<style scoped>
.spin-game-wrapper {
    width: 100%;
    height: 100%;
    display: flex;
    flex-direction: column;
    position: relative;
    overflow: visible;
}

.clickable-segment {
    cursor: pointer;
    transition: all 0.3s ease;
    pointer-events: all;
}

.clickable-overlay {
    cursor: pointer;
    pointer-events: all;
}

.clickable-overlay:hover {
    fill: rgba(255, 255, 255, 0.1);
}

.clickable-segment:hover {
    filter: brightness(1.2) drop-shadow(0 0 15px rgba(219, 7, 242, 0.8));
}

.clickable-segment:active {
    transform: scale(0.98);
}

.disabled-segment {
    cursor: not-allowed;
    pointer-events: none;
}

.tap-to-spin-text {
    pointer-events: none;
    transform-style: preserve-3d;
    perspective: 100px;
}

.tap-to-spin-letter {
    transform-origin: center center;
    text-shadow:
        0 0 8px rgba(255, 255, 255, 0.9),
        0 0 15px rgba(219, 7, 242, 0.5),
        2px 2px 4px rgba(0, 0, 0, 0.8);
}

.tap-to-line {
    fill: #ffffff;
    font-weight: 900;
    letter-spacing: 0.5px;
    filter: drop-shadow(0 0 10px rgba(255, 255, 255, 0.8));
}

.spin-word-main {
    fill: #ffffff;
    font-weight: 900;
    font-size: 1.3em;
    letter-spacing: 1px;
    filter: drop-shadow(0 0 12px rgba(255, 255, 255, 0.9));
}

@keyframes tapToSpinFloat {
    0% {
        transform: translateY(0px);
    }

    25% {
        transform: translateY(-4px);
    }

    50% {
        transform: translateY(0px);
    }

    75% {
        transform: translateY(-2px);
    }

    100% {
        transform: translateY(0px);
    }
}

.tap-to-spin-letter {
    animation: tapToSpinFloat 1.5s ease-in-out infinite;
}

.tap-to-line {
    animation-delay: 0s;
}

.spin-word-main {
    animation-delay: 0.4s;
}

.mobile-title {
    font-size: 18px;
    font-weight: 900;
    letter-spacing: 3px;
    text-transform: uppercase;
}

.desktop-title {
    font-size: 24px;
    font-weight: 900;
    letter-spacing: 4px;
    text-transform: uppercase;
}

.static-highlight-segment {
    transition: all 0.8s ease-in-out;
    opacity: 1 !important;
    fill-opacity: 1 !important;
}

.spinning-fade {
    transition: all 0.3s ease-out !important;
}

.static-text-container {
    transition: all 0.5s ease-in-out;
}

.transition-colors {
    transition: fill 0.3s ease-in-out;
}

.winner-text {
    text-shadow:
        0 0 8px rgba(0, 255, 0, 1),
        0 0 15px rgba(0, 255, 0, 0.8),
        1px 1px 2px rgba(0, 0, 0, 0.9);
    animation: winnerTextPulse 0.8s ease-in-out infinite;
    transition: all 0.5s ease-in-out;
}

.unlucky-text {
    text-shadow:
        0 0 5px rgba(255, 0, 0, 0.8),
        1px 1px 2px rgba(0, 0, 0, 0.8);
    animation: unluckyTextPulse 1.2s ease-in-out infinite;
    transition: all 0.5s ease-in-out;
}

.result-text {
    opacity: 0;
}

.result-reveal {
    animation: resultRevealAnimation 0.8s ease-out forwards;
}

.ticket-number {
    opacity: 0.8;
    font-style: italic;
}

@keyframes resultRevealAnimation {
    0% {
        opacity: 0;
        transform: scale(0.7) translateY(10px);
        filter: blur(3px);
    }

    50% {
        opacity: 0.8;
        transform: scale(1.1) translateY(-2px);
        filter: blur(1px);
    }

    100% {
        opacity: 1;
        transform: scale(1) translateY(0px);
        filter: blur(0px);
    }
}

@keyframes winnerTextPulse {

    0%,
    100% {
        fill: #00ff00;
        filter: drop-shadow(0 0 8px #00ff00);
        transform: scale(1);
    }

    50% {
        fill: #ffffff;
        filter: drop-shadow(0 0 12px #00ff00);
        transform: scale(1.05);
    }
}

@keyframes unluckyTextPulse {

    0%,
    100% {
        fill: #ffffff;
        filter: drop-shadow(0 0 3px #ffffff);
    }

    50% {
        fill: #ff0000;
        filter: drop-shadow(0 0 6px #ff0000);
    }
}

.pointer-container {
    transform-origin: center center;
}

@media (min-width: 769px) {
    .pointer-container {
        filter: drop-shadow(0 0 25px rgba(219, 7, 242, 0.6)) drop-shadow(0 0 50px rgba(121, 49, 129, 0.4));
    }

    .static-sparkles circle {
        filter: drop-shadow(0 0 5px currentColor);
    }
}

@media (max-width: 768px) {
    .pointer-container {
        filter: none;
    }

    .tap-to-spin-letter {
        animation: none;
        text-shadow: 0 0 3px rgba(255, 255, 255, 0.5), 1px 1px 2px rgba(0, 0, 0, 0.6);
    }

    .winner-text,
    .unlucky-text {
        animation: none;
    }

    .result-reveal {
        animation: none;
        opacity: 1;
        transform: scale(1);
    }

    .mobile-title {
        animation: none;
    }

    .clickable-segment:hover {
        filter: none;
    }

    .spin-word-main {
        font-size: 1.2em;
    }

    .static-sparkles {
        display: none;
    }
}

.wheel-title {
    text-align: center;
    margin-top: 8px;
    font-weight: 900;
    letter-spacing: 3px;
    text-transform: uppercase;
}

/* =========================================
   FLOATING WALLET CARD STYLES
   ========================================= */

.floating-wallet-container {
    position: absolute;
    top: 80px;
    right: 20px;
    z-index: 50;
    pointer-events: none;
}

.floating-wallet-demo {
    top: 10px;
    right: 10px;
    transform: scale(0.7);
}

.floating-credit-card {
    perspective: 1000px;
    animation: cardFloat 3s ease-in-out infinite;
}

.credit-card-3d {
    width: 140px;
    height: 90px;
    transform-style: preserve-3d;
    animation: cardRotate 6s ease-in-out infinite;
    transition: transform 0.3s ease;
}

.credit-card-front {
    position: absolute;
    width: 100%;
    height: 100%;
    backface-visibility: hidden;
    border-radius: 12px;
    overflow: hidden;
    box-shadow:
        0 15px 30px rgba(0, 0, 0, 0.4),
        0 0 20px rgba(139, 92, 246, 0.3);
}

.card-gradient {
    width: 100%;
    height: 100%;
    position: relative;
    display: flex;
    flex-direction: column;
    justify-content: space-between;
    padding: 6px;
    color: white;
    transition: background 0.5s ease-in-out;
}

.card-header-section {
    display: flex;
    justify-content: space-between;
    align-items: flex-start;
}

.brand-title {
    flex: 1;
}

.brand-text {
    font-size: 12px;
    font-weight: 900;
    letter-spacing: 0.5px;
    margin: 0;
    text-shadow: 1px 1px 2px rgba(0, 0, 0, 0.8);
    color: white;
    line-height: 1;
}

.card-chip {
    width: 18px;
    height: 13px;
    background: linear-gradient(135deg, #f3f4f6, #d1d5db);
    border-radius: 2px;
    border: 1px solid #9ca3af;
    box-shadow: 0 1px 3px rgba(0, 0, 0, 0.3);
}

.card-body {
    text-align: center;
    flex: 1;
    display: flex;
    align-items: center;
    justify-content: center;
    margin: 4px 0;
}

.prize-message {
    font-size: 13px;
    font-weight: 700;
    color: white;
    text-shadow:
        1px 1px 2px rgba(0, 0, 0, 0.8),
        0 0 8px rgba(255, 255, 255, 0.6);
    letter-spacing: 0.3px;
    text-align: center;
    line-height: 1.1;
}

.card-footer {
    display: flex;
    justify-content: flex-end;
    align-items: flex-end;
}

.card-number {
    font-size: 9px;
    font-family: 'Courier New', monospace;
    letter-spacing: 1px;
    opacity: 0.9;
    color: white;
    text-shadow: 1px 1px 2px rgba(0, 0, 0, 0.6);
}

.card-shine-effect {
    position: absolute;
    top: -50%;
    left: -50%;
    width: 200%;
    height: 200%;
    background: linear-gradient(45deg, transparent 30%, rgba(255, 255, 255, 0.2) 50%, transparent 70%);
    animation: cardShineMove 4s ease-in-out infinite;
    pointer-events: none;
}

/* Winner Card Overlay */
.winner-card-overlay {
    position: fixed;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    display: flex;
    align-items: flex-start;
    justify-content: center;
    padding-top: 120px;
    z-index: 60;
    background: rgba(0, 0, 0, 0.3);
    pointer-events: none;
}

.winner-card-demo {
    position: absolute;
    padding-top: 80px;
}

.winner-card-container {
    perspective: 1000px;
    animation: slideInFromRight 0.5s ease-out forwards;
    width: 300px;
    height: 190px;
}

.winner-card-container.slide-to-corner {
    animation: slideToCorner 0.4s ease-out forwards;
}

.winner-card-container.slide-to-corner-mobile {
    animation: slideToCornerMobile 0.4s ease-out forwards;
}

.winner-card {
    width: 100%;
    height: 100%;
    transform-style: preserve-3d;
}

.card-inner {
    width: 100%;
    height: 100%;
    transform-style: preserve-3d;
    animation: flipReveal3D 0.6s ease-out forwards;
}

.winner-card .card-front {
    position: absolute;
    width: 100%;
    height: 100%;
    backface-visibility: hidden;
    border-radius: 20px;
    overflow: hidden;
    box-shadow:
        0 25px 50px rgba(0, 0, 0, 0.6),
        0 0 40px rgba(139, 92, 246, 0.5),
        inset 0 1px 0 rgba(255, 255, 255, 0.3);
    border: 2px solid rgba(255, 255, 255, 0.2);
    transform: perspective(800px) rotateX(-5deg) rotateY(8deg);
}

.card-content {
    width: 100%;
    height: 100%;
    position: relative;
    display: flex;
    flex-direction: column;
    justify-content: space-between;
    padding: 16px;
    color: white;
}

.card-header {
    display: flex;
    justify-content: space-between;
    align-items: flex-start;
    margin-bottom: 8px;
}

.brand-section {
    flex: 1;
}

.brand-section .brand-text {
    font-size: 20px;
    font-weight: 900;
    letter-spacing: 1.5px;
    margin: 0;
    text-shadow: 2px 2px 4px rgba(0, 0, 0, 0.5);
    color: white;
}

.card-header .card-chip {
    width: 32px;
    height: 22px;
    background: linear-gradient(135deg, #f3f4f6, #d1d5db);
    border-radius: 6px;
    border: 1px solid #9ca3af;
    box-shadow: 0 4px 8px rgba(0, 0, 0, 0.3);
}

.prize-section {
    text-align: center;
    flex: 1;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
}

.prize-amount {
    font-size: 42px;
    font-weight: 900;
    color: #ffffff;
    text-shadow:
        3px 3px 6px rgba(0, 0, 0, 0.8),
        0 0 20px rgba(255, 255, 255, 0.8);
    letter-spacing: -1px;
    animation: prizeGlow 1.5s ease-in-out infinite;
}

.card-footer .card-number {
    font-size: 12px;
    font-family: 'Courier New', monospace;
    letter-spacing: 1.5px;
    opacity: 0.9;
    text-shadow: 1px 1px 2px rgba(0, 0, 0, 0.4);
    color: white;
}

/* Floating Card Animations */
@keyframes cardFloat {
    0%, 100% {
        transform: translateY(0px) scale(1);
    }
    25% {
        transform: translateY(-8px) scale(1.02);
    }
    50% {
        transform: translateY(-4px) scale(1.01);
    }
    75% {
        transform: translateY(-12px) scale(1.03);
    }
}

@keyframes cardRotate {
    0%, 100% {
        transform: rotateY(0deg) rotateX(0deg) rotateZ(0deg);
    }
    25% {
        transform: rotateY(5deg) rotateX(2deg) rotateZ(1deg);
    }
    50% {
        transform: rotateY(0deg) rotateX(4deg) rotateZ(-1deg);
    }
    75% {
        transform: rotateY(-5deg) rotateX(2deg) rotateZ(1deg);
    }
}

@keyframes cardShineMove {
    0% {
        transform: translateX(-100%) translateY(-100%) rotate(45deg);
    }
    25% {
        transform: translateX(-50%) translateY(-50%) rotate(45deg);
    }
    50% {
        transform: translateX(0%) translateY(0%) rotate(45deg);
    }
    75% {
        transform: translateX(50%) translateY(50%) rotate(45deg);
    }
    100% {
        transform: translateX(100%) translateY(100%) rotate(45deg);
    }
}

/* Winner Card Animations */
@keyframes slideInFromRight {
    0% {
        transform: translateX(100px) rotateY(-15deg);
        opacity: 0;
    }
    100% {
        transform: translateX(0) rotateY(0deg);
        opacity: 1;
    }
}

@keyframes flipReveal3D {
    0% {
        transform: perspective(800px) rotateY(-90deg) rotateX(-10deg) translateZ(-50px);
        opacity: 0;
    }
    50% {
        transform: perspective(800px) rotateY(-20deg) rotateX(-5deg) translateZ(20px);
        opacity: 0.8;
    }
    100% {
        transform: perspective(800px) rotateY(0deg) rotateX(0deg) translateZ(0px);
        opacity: 1;
    }
}

@keyframes slideToCorner {
    0% {
        transform: translateX(0) translateY(0) scale(1);
        opacity: 1;
    }
    100% {
        transform: translateX(-400px) translateY(-300px) scale(0.2);
        opacity: 0;
    }
}

@keyframes slideToCornerMobile {
    0% {
        transform: translateX(0) translateY(0) scale(1);
        opacity: 1;
    }
    100% {
        transform: translateX(-150px) translateY(-150px) scale(0.2);
        opacity: 0;
    }
}

@keyframes prizeGlow {
    0%, 100% {
        text-shadow:
            3px 3px 6px rgba(0, 0, 0, 0.8),
            0 0 20px rgba(255, 255, 255, 0.8);
    }
    50% {
        text-shadow:
            3px 3px 6px rgba(0, 0, 0, 0.8),
            0 0 30px rgba(255, 255, 255, 1),
            0 0 50px rgba(251, 191, 36, 0.7);
    }
}

/* Winner Card Transition */
.winner-card-enter-active {
    transition: opacity 0.3s;
}

.winner-card-leave-active {
    transition: opacity 0.3s;
}

.winner-card-enter-from,
.winner-card-leave-to {
    opacity: 0;
}

/* Demo mode adjustments for floating wallet */
.floating-wallet-demo .credit-card-3d {
    width: 110px;
    height: 70px;
}

.floating-wallet-demo .brand-text {
    font-size: 8px;
}

.floating-wallet-demo .prize-message {
    font-size: 9px;
}

.floating-wallet-demo .card-number {
    font-size: 6px;
}

.floating-wallet-demo .card-chip {
    width: 14px;
    height: 10px;
}

.winner-card-demo .winner-card-container {
    width: 200px;
    height: 130px;
}

.winner-card-demo .brand-section .brand-text {
    font-size: 14px;
}

.winner-card-demo .prize-amount {
    font-size: 28px;
}

.winner-card-demo .card-header .card-chip {
    width: 22px;
    height: 16px;
}

.winner-card-demo .card-footer .card-number {
    font-size: 9px;
}
</style>