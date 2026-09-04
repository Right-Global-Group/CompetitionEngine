<script setup lang="ts">
defineProps<{ field: any; modelValue: any }>();
const emit = defineEmits<{ 'update:modelValue': [any] }>();
</script>

<template>
    <div class="bg-white/5 rounded-xl p-4 border border-white/10">
        <label class="block mb-2 font-semibold text-white text-sm">{{ field.label }}</label>
        <select
            :value="modelValue"
            @change="emit('update:modelValue', ($event.target as HTMLSelectElement).value)"
            class="w-full px-3 py-2 bg-[#2a3154] text-white text-sm border border-white/10 rounded-lg outline-none"
        >
            <option v-for="opt in (field.meta?.options || [])" :key="opt.value" :value="opt.value">
                {{ opt.label }}
            </option>
        </select>
        <p v-if="field.meta?.help" class="text-gray-500 text-xs mt-1">{{ field.meta.help }}</p>
    </div>
</template>
