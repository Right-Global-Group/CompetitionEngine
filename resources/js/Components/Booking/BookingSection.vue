<script setup>
import { inject, computed } from 'vue';
import { useReveal } from '@/Composables/useReveal';

const getText = inject('getText', (key, fallback = '') => fallback);
const { sectionRef, revealed } = useReveal();

const calendlyUrl = 'https://calendly.com/contact-compengine/30min';

function bt(key, fallback) {
    return getText(`cta.${key}`, fallback);
}

const eyebrow = computed(() => bt('eyebrow', 'Get started today'));
const titleBefore = computed(() => bt('title_before', 'Ready to launch your competition on the UK\'s'));
const titleKeyword = computed(() => bt('title_keyword', 'most intelligent platform?'));
const lead = computed(() => bt('lead', '30 minutes. A live demo on your brief. No sales deck, no NDAs, no obligation. Just the platform running with your prize, your game type, your brand — so you can see exactly what you\'d be launching.'));
const btn1 = computed(() => bt('btn1', 'Book a 30-min demo →'));

function openCalendly() {
    if (window.Calendly) {
        window.Calendly.initPopupWidget({ url: calendlyUrl });
    } else {
        window.open(calendlyUrl, '_blank');
    }
}
</script>

<template>
    <section ref="sectionRef" class="section reveal" :class="{ visible: revealed }" id="booking">
        <div class="final-cta">
            <div class="eyebrow" style="justify-content:center;"><span class="dot"></span>{{ eyebrow }}</div>
            <h2 class="h2" style="margin-top:18px;">{{ titleBefore }}<br /><span class="grad-text">{{ titleKeyword }}</span></h2>
            <p class="lead center" style="margin: 18px auto 0; max-width: 600px;">{{ lead }}</p>
            <div style="display:flex; gap:14px; justify-content:center; margin-top:34px; flex-wrap:wrap;">
                <button class="btn btn-orange" @click="openCalendly">{{ btn1 }}</button>
            </div>
        </div>
    </section>
</template>
