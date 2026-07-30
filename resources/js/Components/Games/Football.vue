<script setup lang="ts">
import axios from 'axios';
import { ref, watch, onMounted } from 'vue';
import FootballModal from './FootballModal.vue';

const props = defineProps<{
    tickets: any[];
    game_id: number;
    goldenTicket?: boolean;
    instant_win_categories?: any[];
}>();

const showModal = ref(false);

// Player props (the config blob mapped to camelCase by the backend getGame config path).
const footballAssets = ref<Record<string, any>>({ name: '' });

const tickets = ref<any[]>([]);
watch(
    () => props.tickets,
    (newTickets) => {
        tickets.value = newTickets ?? [];
    },
    { immediate: true }
);

// Other live competitions, for the pitchside ad boards (cross-promo).
const ads = ref<any[]>([]);

onMounted(async () => {
    try {
        const resp = await axios.get(`/games/${props.game_id}`);
        footballAssets.value = resp.data;
    } catch {
        // Silent fail — FootballModal falls back to its own defaults.
    }
    try {
        const adResp = await axios.get('/api/competition-ads');
        ads.value = Array.isArray(adResp.data) ? adResp.data : [];
    } catch {
        // ads are optional cross-promo; ignore failures.
    }
});
</script>

<template>
    <div :class="goldenTicket ? 'relative inline-block' : 'inline-block'">
        <div v-if="goldenTicket" class="golden-glow-bg" />
        <UiButton
            variant="secondary"
            @click="showModal = true"
            class="px-4 py-2 w-full sm:w-auto relative"
            :class="goldenTicket ? 'ring-2 ring-yellow-400/50' : ''"
        >
            Play {{ footballAssets.name }}
        </UiButton>
    </div>

    <FootballModal
        v-model="showModal"
        :assets="footballAssets"
        :tickets="tickets"
        :instant_win_categories="instant_win_categories"
        :ads="ads"
    />
</template>

<style scoped>
.golden-glow-bg {
    position: absolute;
    inset: -4px;
    background: linear-gradient(90deg, #facc15, #eab308, #facc15);
    border-radius: 0.5rem;
    filter: blur(8px);
    pointer-events: none;
    animation: golden-breathe 2s ease-in-out infinite;
}

@keyframes golden-breathe {
    0%, 100% { opacity: 0.4; transform: scale(1); }
    50% { opacity: 0.8; transform: scale(1.04); }
}
</style>
