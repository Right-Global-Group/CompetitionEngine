<script setup lang="ts">
import { computed } from 'vue';

interface Props {
    backgroundImage?: string;
    credits?: number;
    wins?: number;
    isSpinning?: boolean;
    disabled?: boolean;
    jackpot?: { value: number; name: string };
    nextTicketNumber?: string | null;
    colors?: {
        primary: string;
        secondary: string;
        accent: string;
        text: string;
    };
}

const props = withDefaults(defineProps<Props>(), {
    backgroundImage: '',
    credits: 0,
    wins: 0,
    isSpinning: false,
    disabled: false,
    nextTicketNumber: null,
    colors: () => ({
        primary: '#F59E0B',
        secondary: '#1F2937',
        accent: '#EF4444',
        text: '#FFFFFF'
    })
});

const emit = defineEmits<{
    'open-wins': [];
    'open-inventory': [];
}>();

const formattedJackpot = computed(() => {
    if (!props.jackpot) return '£0';
    return `£${props.jackpot.value.toLocaleString()}`;
});

const jackpotName = computed(() => props.jackpot?.name || 'JACKPOT');
const isButtonDisabled = computed(() => props.disabled || props.isSpinning);
const hasWins = computed(() => props.wins > 0);
</script>

<template>
    <div
        class="relative w-full h-full flex flex-col items-center justify-center p-1.5 overflow-hidden"
        :style="{
            backgroundImage: backgroundImage ? `url(${backgroundImage})` : 'none',
            backgroundSize: 'cover',
            backgroundPosition: 'center',
        }"
    >
        <!-- Content Container -->
        <div class="relative z-10 w-full h-full flex flex-col items-center justify-between py-3">

            <!-- JACKPOT Display - Enhanced Flashy -->
            <div class="w-full px-1 sm:px-2 mb-0.5">
                <!-- Outer glow -->
                <div class="absolute inset-x-1 sm:inset-x-2 top-1 h-6 sm:h-8 rounded blur-md opacity-60 animate-pulse" :style="{
                    background: `radial-gradient(ellipse, ${colors.primary}, transparent)`
                }"></div>

                <div class="relative rounded-lg border-2 py-0.5 sm:py-1 px-2 sm:px-3 shadow-2xl overflow-hidden" :style="{
                    background: `linear-gradient(135deg, ${colors.primary}50, ${colors.primary}80, ${colors.primary}50)`,
                    borderColor: colors.primary,
                    boxShadow: `0 0 20px ${colors.primary}80, 0 0 40px ${colors.primary}40, inset 0 1px 0 rgba(255,255,255,0.3)`,
                    backgroundSize: '200% 200%',
                    animation: 'jackpot-shimmer 3s ease infinite'
                }">
                    <!-- Sliding shine effect -->
                    <div class="absolute inset-0 animate-slide" :style="{
                        background: `linear-gradient(to right, transparent, ${colors.primary}60, transparent)`
                    }"></div>

                    <!-- Sparkle corners -->
                    <div class="absolute top-0 right-1 w-0.5 h-0.5 sm:w-1 sm:h-1 bg-yellow-300 rounded-full animate-pulse-fast"></div>
                    <div class="absolute bottom-0 left-1 w-0.5 h-0.5 sm:w-1 sm:h-1 bg-yellow-300 rounded-full animate-pulse-fast" style="animation-delay: 0.5s;"></div>

                    <div class="relative flex items-center justify-center gap-1 sm:gap-1.5">
                        <span class="text-[9px] sm:text-[11px] font-black uppercase tracking-widest" :style="{
                            color: colors.text,
                            fontFamily: 'Courier New, monospace',
                            textShadow: `0 0 10px ${colors.primary}, 0 0 20px ${colors.primary}, 1px 1px 2px rgba(0,0,0,0.8)`,
                            animation: 'text-glow 2s ease-in-out infinite'
                        }">
                            {{ jackpotName }}
                        </span>
                        <span class="text-sm sm:text-base font-black" :style="{
                            color: colors.text,
                            fontFamily: 'Impact, sans-serif',
                            textShadow: `0 0 15px ${colors.primary}, 0 0 30px ${colors.primary}, 2px 2px 0 ${colors.secondary}, 0 0 5px rgba(255,255,255,0.5)`,
                            animation: 'jackpot-pulse 1.5s ease-in-out infinite'
                        }">
                            {{ formattedJackpot }}
                        </span>
                    </div>
                </div>
            </div>

            <!-- Middle Row: Tickets, Wins, Inventory -->
            <div class="w-full grid grid-cols-3 gap-1 sm:gap-1.5 px-1 sm:px-2 mb-0.5">

                <!-- Tickets Display -->
                <div class="relative">
                    <div class="relative rounded border-2 px-1 sm:px-1.5 py-0.5 sm:py-1 shadow-lg" :style="{
                        background: `${colors.primary}99`,
                        borderColor: `${colors.primary}`,
                        boxShadow: `0 0 10px ${colors.primary}40`
                    }">
                        <div class="absolute inset-0 rounded animate-pulse-slow" :style="{
                            backgroundColor: `${colors.primary}20`
                        }"></div>

                        <div class="relative flex flex-col items-center leading-none">
                            <span class="text-[7px] sm:text-[8px] font-bold uppercase tracking-wider" :style="{
                                color: colors.text,
                                fontFamily: 'Courier New, monospace',
                                textShadow: `0 0 4px ${colors.primary}`
                            }">TICKETS</span>
                            <div class="flex items-baseline gap-0.5 mt-0.5">
                                <span class="font-black text-sm sm:text-base" :style="{
                                    color: colors.text,
                                    fontFamily: 'Impact, sans-serif',
                                    textShadow: `0 0 8px ${colors.primary}`
                                }">{{ credits }}</span>
                                <span class="text-[7px] sm:text-[8px] font-bold uppercase" :style="{
                                    color: colors.text,
                                    textShadow: `0 0 6px ${colors.primary}`
                                }">LEFT</span>
                            </div>
                        </div>
                    </div>
                </div>

                <!-- Wins Display -->
                <div class="relative">
                    <!-- Glow when wins > 0 -->
                    <div
                        v-if="hasWins"
                        class="absolute -inset-0.5 sm:-inset-1 rounded-lg blur-md opacity-75 animate-pulse-glow"
                        :style="{ background: `linear-gradient(to right, ${colors.secondary}, ${colors.accent}, ${colors.secondary})` }"
                    ></div>

                    <div class="relative rounded border-2 px-1 sm:px-1.5 py-0.5 sm:py-1 shadow-lg transition-all duration-300" :style="{
                        background: hasWins ? `${colors.secondary}DD` : `${colors.secondary}99`,
                        borderColor: hasWins ? colors.secondary : `${colors.secondary}66`,
                        boxShadow: hasWins ? `0 0 20px ${colors.secondary}80` : 'none'
                    }">
                        <div class="absolute inset-0 rounded transition-all duration-300" :style="{
                            backgroundColor: hasWins ? `${colors.secondary}33` : `${colors.secondary}0D`,
                            animation: hasWins ? 'pulse-fast 1s ease-in-out infinite' : 'pulse-slow 2s ease-in-out infinite'
                        }"></div>

                        <div class="relative flex flex-col items-center leading-none">
                            <span class="text-[7px] sm:text-[8px] font-bold uppercase tracking-wider transition-all duration-300" :style="{
                                color: colors.text,
                                fontFamily: 'Courier New, monospace',
                                textShadow: `0 0 4px ${colors.secondary}`
                            }">WINS</span>
                            <div class="flex items-baseline gap-0.5 mt-0.5">
                                <span class="font-black text-sm sm:text-base transition-all duration-300" :style="{
                                    color: colors.text,
                                    fontFamily: 'Impact, sans-serif',
                                    textShadow: hasWins ? `0 0 12px ${colors.accent}, 0 0 20px ${colors.secondary}` : `0 0 8px ${colors.secondary}`
                                }">{{ wins }}</span>
                            </div>
                        </div>
                    </div>
                </div>

                <!-- Inventory Button -->
                <button
                    @click="emit('open-inventory')"
                    type="button"
                    class="relative group"
                >
                    <div class="relative rounded border-2 px-1 sm:px-1.5 py-0.5 sm:py-1 shadow-lg transition-all duration-300" :style="{
                        background: `${colors.accent}99`,
                        borderColor: `${colors.accent}66`
                    }">
                        <div class="absolute inset-0 rounded transition-all duration-300 animate-pulse-slow group-hover:opacity-20" :style="{
                            backgroundColor: `${colors.accent}00`
                        }"></div>

                        <div class="relative flex flex-col items-center leading-none">
                            <span class="text-[7px] sm:text-[8px] font-bold uppercase tracking-wider" :style="{
                                color: colors.text,
                                fontFamily: 'Courier New, monospace',
                                textShadow: `0 0 4px ${colors.accent}`
                            }">ITEMS</span>
                            <div class="flex items-center gap-0.5 mt-0.5">
                                <span class="text-[10px] sm:text-xs font-bold uppercase" :style="{
                                    color: colors.text,
                                    fontFamily: 'Impact, sans-serif',
                                    textShadow: `0 0 8px ${colors.accent}`
                                }">VIEW</span>
                            </div>
                        </div>
                    </div>
                </button>
            </div>
        </div>
    </div>
</template>

<style scoped>
@keyframes slide {
    0% { transform: translateX(-100%); }
    100% { transform: translateX(100%); }
}

.animate-slide {
    animation: slide 3s linear infinite;
}

@keyframes pulse-slow {
    0%, 100% { opacity: 0.4; }
    50% { opacity: 0.8; }
}

.animate-pulse-slow {
    animation: pulse-slow 2s ease-in-out infinite;
}

@keyframes pulse-fast {
    0%, 100% { opacity: 0.6; }
    50% { opacity: 1; }
}

.animate-pulse-fast {
    animation: pulse-fast 1s ease-in-out infinite;
}

@keyframes pulse-glow {
    0%, 100% { opacity: 0.6; }
    50% { opacity: 1; }
}

.animate-pulse-glow {
    animation: pulse-glow 1.5s ease-in-out infinite;
}

@keyframes sweep-fast {
    0% { transform: translateX(-100%); }
    100% { transform: translateX(200%); }
}

.animate-sweep-fast {
    animation: sweep-fast 2s linear infinite;
}

@keyframes scan {
    0% { transform: translateX(-100%); }
    100% { transform: translateX(100%); }
}

.animate-scan {
    animation: scan 3s linear infinite;
}

@keyframes jackpot-shimmer {
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

@keyframes text-glow {
    0%, 100% {
        filter: brightness(1);
    }
    50% {
        filter: brightness(1.3);
    }
}

@keyframes jackpot-pulse {
    0%, 100% {
        transform: scale(1);
        filter: brightness(1);
    }
    50% {
        transform: scale(1.05);
        filter: brightness(1.4);
    }
}
</style>
