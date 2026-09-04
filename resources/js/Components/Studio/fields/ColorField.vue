<script setup lang="ts">
defineProps<{ field: any; modelValue: any }>();
const emit = defineEmits<{ 'update:modelValue': [any] }>();
const set = (v: string) => emit('update:modelValue', v);
</script>

<template>
    <div class="bg-white/5 rounded-xl p-4 border border-white/10">
        <label class="block mb-2 font-semibold text-white text-xs">{{ field.label }}</label>
        <div class="flex flex-col gap-2">
            <input
                type="color"
                :value="modelValue || '#000000'"
                @input="set(($event.target as HTMLInputElement).value)"
                class="w-full h-12 cursor-pointer rounded-lg border-2 border-white/20"
            />
            <input
                type="text"
                :value="modelValue"
                :placeholder="field.meta?.placeholder || ''"
                @input="set(($event.target as HTMLInputElement).value)"
                class="px-3 py-1.5 bg-white/5 text-white text-xs border border-white/10 rounded-lg outline-none"
            />
        </div>
        <p v-if="field.meta?.help" class="text-gray-500 text-xs mt-1">{{ field.meta.help }}</p>
    </div>
</template>
