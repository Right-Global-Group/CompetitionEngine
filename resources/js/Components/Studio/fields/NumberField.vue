<script setup lang="ts">
defineProps<{ field: any; modelValue: any }>();
const emit = defineEmits<{ 'update:modelValue': [any] }>();

// A cleared input must stay blank (null), not become 0 — Number('') === 0,
// and 0 is a real value for band fields like "Value To".
const onInput = (e: Event) => {
    const raw = (e.target as HTMLInputElement).value;
    emit('update:modelValue', raw === '' ? null : Number(raw));
};
</script>

<template>
    <div class="bg-white/5 rounded-xl p-4 border border-white/10">
        <label class="block mb-2 font-semibold text-white text-sm">{{ field.label }}</label>
        <input
            type="number"
            :value="modelValue"
            :min="field.meta?.min"
            :max="field.meta?.max"
            :step="field.meta?.step || 1"
            @input="onInput"
            class="w-full px-3 py-2 bg-white/5 text-white text-sm border border-white/10 rounded-lg outline-none"
        />
        <p v-if="field.meta?.help" class="text-gray-500 text-xs mt-1">{{ field.meta.help }}</p>
    </div>
</template>
