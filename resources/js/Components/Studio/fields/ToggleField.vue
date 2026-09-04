<script setup lang="ts">
defineProps<{ field: any; modelValue: any }>();
const emit = defineEmits<{ 'update:modelValue': [any] }>();
</script>

<template>
    <label class="flex items-center justify-between gap-4 bg-white/5 rounded-xl p-4 border border-white/10 cursor-pointer hover:bg-white/10 transition-colors">
        <div>
            <span class="text-white font-semibold text-sm block">{{ field.label }}</span>
            <span v-if="field.meta?.help" class="text-gray-400 text-xs">{{ field.meta.help }}</span>
        </div>
        <div class="relative flex-shrink-0">
            <input
                type="checkbox"
                :checked="!!modelValue"
                @change="emit('update:modelValue', ($event.target as HTMLInputElement).checked)"
                class="sr-only peer"
            />
            <div class="w-11 h-6 bg-gray-600 peer-checked:bg-teal-500 rounded-full transition-colors"></div>
            <div class="absolute top-0.5 left-0.5 w-5 h-5 bg-white rounded-full shadow transition-transform peer-checked:translate-x-5"></div>
        </div>
    </label>
</template>
