<script setup lang="ts">
import { computed } from 'vue';
import TextField from './fields/TextField.vue';
import ColorField from './fields/ColorField.vue';
import MediaField from './fields/MediaField.vue';
import SelectField from './fields/SelectField.vue';
import ToggleField from './fields/ToggleField.vue';
import NumberField from './fields/NumberField.vue';

const props = defineProps<{ schema: any[]; modelValue: Record<string, any> }>();
const emit = defineEmits<{ 'update:modelValue': [Record<string, any>] }>();

const componentFor: Record<string, any> = {
    text: TextField,
    textarea: TextField,
    color: ColorField,
    media: MediaField,
    select: SelectField,
    toggle: ToggleField,
    number: NumberField,
};

// meta.visibleIf = { field, gte }: hide the field until the controlling
// value (falling back to that field's schema default when unset) reaches gte —
// e.g. segment sections above Win Segments On The Wheel stay out of the way.
const visible = (f: any) => {
    const cond = f.meta?.visibleIf;
    if (!cond?.field) return true;
    const raw = props.modelValue[cond.field];
    const ctrl = (Array.isArray(props.schema) ? props.schema : []).find((x: any) => x.key === cond.field);
    const val = raw === undefined || raw === null || raw === '' ? Number(ctrl?.default ?? 0) : Number(raw);
    return cond.gte === undefined || val >= cond.gte;
};

// Preserve declaration order of groups while bucketing fields under each.
// A group with every field hidden disappears entirely.
const groups = computed(() => {
    const map = new Map<string, any[]>();
    for (const f of (Array.isArray(props.schema) ? props.schema : [])) {
        if (!visible(f)) continue;
        if (!map.has(f.group)) map.set(f.group, []);
        map.get(f.group)!.push(f);
    }
    return Array.from(map.entries()).map(([name, fields]) => ({ name, fields }));
});

const update = (key: string, value: any) => {
    emit('update:modelValue', { ...props.modelValue, [key]: value });
};
</script>

<template>
    <div class="space-y-8">
        <div v-for="group in groups" :key="group.name" class="space-y-4">
            <h3 class="text-white font-bold text-lg border-b border-white/10 pb-2">{{ group.name }}</h3>
            <div
                class="grid grid-cols-1 gap-4"
                :class="group.fields.every((f: any) => f.type === 'color') ? 'sm:grid-cols-2' : ''"
            >
                <component
                    v-for="f in group.fields"
                    :key="f.key"
                    :is="componentFor[f.type] || TextField"
                    :field="f"
                    :modelValue="modelValue[f.key]"
                    @update:modelValue="(v: any) => update(f.key, v)"
                />
            </div>
        </div>
    </div>
</template>
