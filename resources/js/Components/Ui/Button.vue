<script setup>
/**
 * Minimal stand-in for the platform's global <UiButton> (shadcn-style button with variants).
 * The games only use `variant`, `disabled`, `class` and `style`, so this keeps the same API.
 */
import { computed } from 'vue';

const props = defineProps({
    variant: { type: String, default: 'default' },
    size: { type: String, default: 'default' },
    type: { type: String, default: 'button' },
    disabled: { type: Boolean, default: false },
});

const VARIANTS = {
    default: 'bg-pink-600 text-white hover:bg-pink-500',
    secondary: 'bg-white/10 text-white border border-white/15 hover:bg-white/20',
    outline: 'border border-white/25 text-white hover:bg-white/10',
    ghost: 'text-white hover:bg-white/10',
    destructive: 'bg-red-600 text-white hover:bg-red-500',
    colourless: '',
};
const SIZES = { default: 'h-10 px-4 py-2', sm: 'h-9 px-3', lg: 'h-11 px-8', icon: 'h-10 w-10' };

const classes = computed(() => [
    'inline-flex items-center justify-center gap-2 whitespace-nowrap rounded-md text-sm font-semibold transition-colors',
    'focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-pink-500 disabled:pointer-events-none disabled:opacity-50',
    VARIANTS[props.variant] ?? VARIANTS.default,
    SIZES[props.size] ?? SIZES.default,
]);
</script>

<template>
    <button :type="type" :disabled="disabled" :class="classes"><slot /></button>
</template>
