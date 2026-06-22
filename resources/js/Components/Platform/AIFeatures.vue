<script setup>
import { inject, computed } from 'vue';
import { useReveal } from '@/Composables/useReveal';

const getText = inject('getText', (key, fallback = '') => fallback);
const { sectionRef, revealed } = useReveal();

function at(key, fallback) {
    return getText(`ai.${key}`, fallback);
}

const eyebrow = computed(() => at('eyebrow', 'What\'s coming next'));
const titleBefore = computed(() => at('title_before', 'The AI roadmap is'));
const titleKeyword = computed(() => at('title_keyword', 'already being built.'));
const lead = computed(() => at('lead', 'We\'re integrating machine learning into the parts of your business that move money: demand forecasting, customer segmentation, revenue attribution. Public release in phases — existing operators get every feature automatically.'));

const AI_CARDS = [
    { emoji: '🤖', title: at('card1_title', 'Demand Forecasting'), text: at('card1_text', 'Predict ticket demand per draw type, adjusting prize structures before you publish.') },
    { emoji: '🎯', title: at('card2_title', 'Smart Targeting'), text: at('card2_text', 'Segment customers by lifetime value and re-engage with dynamically generated offers.') },
    { emoji: '📊', title: at('card3_title', 'Revenue Insights'), text: at('card3_text', 'ML-attributed revenue per game type, acquisition channel, and promotional mechanic.') },
    { emoji: '✍️', title: at('card4_title', 'AI Content Assist'), text: at('card4_text', 'Competition titles, rules copy, and email subject lines — generated and A/B tested automatically.') },
];
</script>

<template>
    <section ref="sectionRef" class="section reveal" :class="{ visible: revealed }">
        <div class="ai-block">
            <div class="center">
                <div class="eyebrow"><span class="dot"></span>{{ eyebrow }}</div>
                <h2 class="h2">{{ titleBefore }} <span class="grad-text">{{ titleKeyword }}</span></h2>
                <p class="lead center" style="margin: 14px auto 0;">{{ lead }}</p>
            </div>
            <div class="ai-grid">
                <div v-for="(card, i) in AI_CARDS" :key="i" class="ai-card">
                    <div class="ai-emoji">{{ card.emoji }}</div>
                    <h5>{{ card.title }}</h5>
                    <p class="ai-card-text">{{ card.text }}</p>
                </div>
            </div>
            <div style="text-align:center; margin-top:30px;">
                <span class="price-tag" style="position:static; display:inline-block;">COMING SOON — included for all operators</span>
            </div>
        </div>
    </section>
</template>

<style scoped>
.ai-card-text {
    font-size: 13px; color: var(--text-3); margin-top: 6px; line-height: 1.5;
    filter: blur(3.5px); opacity: 0.7; pointer-events: none; user-select: none;
}
</style>
