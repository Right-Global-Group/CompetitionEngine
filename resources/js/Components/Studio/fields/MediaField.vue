<script setup lang="ts">
/**
 * Landing-page version of the studio media field: files stay in the browser
 * (object URLs) so visitors can try their own logo, background, button or sound
 * without anything being uploaded.
 */
import { ref, onBeforeUnmount } from 'vue';

const props = defineProps<{ field: any; modelValue: any }>();
const emit = defineEmits<{ 'update:modelValue': [any] }>();

const input = ref<HTMLInputElement | null>(null);
const fileName = ref('');
let objectUrl = '';

const accept = (() => {
    const a = props.field?.meta?.accept;
    if (a === 'image') return 'image/*';
    if (a === 'video') return 'video/*,image/*';
    if (a === 'audio') return 'audio/*';
    return 'image/*,video/*,audio/*';
})();

const onPick = (e: Event) => {
    const file = (e.target as HTMLInputElement).files?.[0];
    if (!file) return;
    if (objectUrl) URL.revokeObjectURL(objectUrl);
    objectUrl = URL.createObjectURL(file);
    fileName.value = file.name;
    emit('update:modelValue', objectUrl);
};

const clear = () => {
    if (objectUrl) URL.revokeObjectURL(objectUrl);
    objectUrl = '';
    fileName.value = '';
    if (input.value) input.value.value = '';
    emit('update:modelValue', '');
};

onBeforeUnmount(() => { if (objectUrl) URL.revokeObjectURL(objectUrl); });

const isVideo = (u: string) => /\.(mp4|webm|ogg|mov)$/i.test(u) || (fileName.value && /\.(mp4|webm|ogg|mov)$/i.test(fileName.value));
const isAudio = (u: string) => /\.(mp3|wav|m4a)$/i.test(u) || (fileName.value && /\.(mp3|wav|m4a)$/i.test(fileName.value)) || props.field.meta?.accept === 'audio';
</script>

<template>
    <div class="bg-white/5 rounded-xl p-4 border border-white/10">
        <label class="block mb-2 font-semibold text-white text-sm">{{ field.label }}</label>
        <label class="flex items-center justify-between gap-3 px-3 py-2 rounded-lg border border-dashed border-white/20 bg-white/5 hover:bg-white/10 cursor-pointer text-sm text-white/80 transition">
            <span class="truncate">{{ fileName || `Upload ${field.meta?.accept || 'file'}` }}</span>
            <span class="shrink-0 px-2 py-1 rounded-md bg-gradient-to-r from-pink-600 to-purple-600 text-white text-xs font-bold">Choose</span>
            <input ref="input" type="file" :accept="accept" class="hidden" @change="onPick" />
        </label>
        <p v-if="field.meta?.help" class="text-gray-400 text-xs mt-2">{{ field.meta.help }}</p>
        <div v-if="modelValue" class="mt-3 space-y-2">
            <video v-if="isVideo(modelValue)" :src="modelValue" class="w-full h-32 object-cover rounded-lg border border-pink-500/50" muted autoplay loop playsinline />
            <audio v-else-if="isAudio(modelValue)" :src="modelValue" controls class="w-full"></audio>
            <img v-else :src="modelValue" class="w-full h-32 object-cover rounded-lg border border-pink-500/50" alt="" />
            <button type="button" @click="clear" class="w-full px-3 py-2 bg-red-500/20 hover:bg-red-500/30 border border-red-500/50 text-red-300 text-sm font-semibold rounded-lg transition-all">Remove</button>
        </div>
    </div>
</template>
