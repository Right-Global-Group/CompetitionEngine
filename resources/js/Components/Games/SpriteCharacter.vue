<script setup lang="ts">
import { computed } from 'vue';

const props = withDefaults(defineProps<{
    sheet: string;
    frames?: number;
    frame?: number;
    flipX?: boolean;
    chromaKey?: boolean;
}>(), {
    frames: 1,
    frame: 0,
    flipX: false,
    chromaKey: false,
});

const emit = defineEmits<{ error: [] }>();

// Show a specific frame from a horizontal sprite sheet using CSS background positioning.
// background-size: (n*100)% fills the container with the full sheet scaled so 1 frame = container width.
// background-position percentage: X% aligns the X% point of the image with the X% point of the container.
const bgSize = computed(() => `${Math.max(1, props.frames) * 100}% 100%`);
const bgPos = computed(() => {
    const n = Math.max(1, props.frames);
    if (n <= 1) return '0% 0%';
    const pct = (Math.min(props.frame, n - 1) / (n - 1)) * 100;
    return `${pct}% 0%`;
});
</script>

<template>
    <div
        :style="{
            width: '100%',
            height: '100%',
            backgroundImage: `url('${sheet}')`,
            backgroundSize: bgSize,
            backgroundPosition: bgPos,
            backgroundRepeat: 'no-repeat',
            transform: flipX ? 'scaleX(-1)' : undefined,
            mixBlendMode: chromaKey ? 'screen' : undefined,
            imageRendering: 'auto',
            display: 'block',
        }"
    >
        <img :src="sheet" style="display:none;width:0;height:0;position:absolute;" @error="emit('error')" alt="" />
    </div>
</template>
