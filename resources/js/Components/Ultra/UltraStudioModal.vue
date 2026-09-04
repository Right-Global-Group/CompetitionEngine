<script setup>
/**
 * "Build your own game" — the tenant studio, on the landing page.
 * Left: the schema-driven form copied from the platform (text, colours, toggles,
 * media uploads that stay in the browser). Right: the real game in demo mode with
 * its own mobile / desktop toggle. Nothing is saved; it's there to be played with.
 */
import { ref, reactive, computed, watch, onBeforeUnmount } from 'vue';
import SchemaForm from '@/Components/Studio/SchemaForm.vue';
import GameEmbed from '@/Components/Ultra/GameEmbed.vue';
import { STUDIO_SCHEMAS, schemaFor, defaultsFor } from '@/games/studioSchemas';

const props = defineProps({ modelValue: { type: Boolean, default: false }, game: { type: String, default: 'slots' } });
const emit = defineEmits(['update:modelValue', 'change']);
const CALENDLY = 'https://calendly.com/contact-compengine/30min';

const games = Object.values(STUDIO_SCHEMAS).map((g) => ({ key: g.key, label: g.label }));
const current = ref(props.game);
const configs = reactive({});
const config = computed(() => { if (!configs[current.value]) configs[current.value] = defaultsFor(current.value); return configs[current.value]; });
const schema = computed(() => schemaFor(current.value));
const label = computed(() => STUDIO_SCHEMAS[current.value]?.label || '');

function onUpdate(next) { Object.assign(config.value, next); emit('change', { game: current.value, config: { ...config.value } }); }
function close() { emit('update:modelValue', false); }
function pick(key) { current.value = key; if (typeof window.ceTrack === 'function') window.ceTrack('studio_pick_game', { game: key }); }

watch(() => props.game, (g) => { if (g) current.value = g; });
watch(() => props.modelValue, (open) => {
    document.body.style.overflow = open ? 'hidden' : '';
    if (open && typeof window.ceTrack === 'function') window.ceTrack('studio_open', { game: current.value });
});
const onKey = (e) => { if (e.key === 'Escape' && props.modelValue) close(); };
if (typeof window !== 'undefined') window.addEventListener('keydown', onKey);
onBeforeUnmount(() => { if (typeof window !== 'undefined') window.removeEventListener('keydown', onKey); document.body.style.overflow = ''; });
</script>

<template>
  <Teleport to="body">
    <div v-if="modelValue" class="studio" role="dialog" aria-modal="true" aria-label="Build your own game">
      <div class="studio-backdrop" @click="close"></div>
      <div class="studio-dialog">
        <header class="studio-head">
          <div>
            <small>Game Studio · try it yourself</small>
            <b>Build your own {{ label }}</b>
          </div>
          <div class="studio-games">
            <button v-for="g in games" :key="g.key" type="button" :class="{ on: g.key === current }" @click="pick(g.key)">{{ g.label }}</button>
          </div>
          <button type="button" class="studio-x" aria-label="Close" @click="close">×</button>
        </header>
        <div class="studio-body">
          <aside class="studio-form">
            <p class="studio-hint">These are the same settings operators get. Change a colour, type a title, upload your own logo, background or sound — the game on the right updates instantly. Nothing is saved.</p>
            <SchemaForm :schema="schema" :modelValue="config" @update:modelValue="onUpdate" />
          </aside>
          <section class="studio-preview">
            <div class="studio-stage">
              <GameEmbed :key="current" :game="current" :config="config" mode="preview" :autoplay="false" />
            </div>
            <div class="studio-cta">
              <a :href="CALENDLY" target="_blank" rel="noopener" class="studio-btn" data-calendly data-track="studio_book_demo">Ship this on my site →</a>
              <span>Live in 1–2 weeks. No developers. Every game included.</span>
            </div>
          </section>
        </div>
      </div>
    </div>
  </Teleport>
</template>
