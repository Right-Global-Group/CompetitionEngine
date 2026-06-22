<script setup>
import { ref, inject, computed, onMounted, onUnmounted } from 'vue';

const getText = inject('getText');

const calendlyUrl = 'https://calendly.com/contact-compengine/30min';
const shown = ref(false);

const barText = computed(() => getText('mobile_cta.text', 'Launch your platform'));
const barBtn = computed(() => getText('mobile_cta.btn', 'Book a demo'));

function updateVisibility() {
    const scrollY = window.scrollY;
    const docHeight = document.documentElement.scrollHeight;
    const viewHeight = window.innerHeight;
    const nearBottom = scrollY + viewHeight > docHeight - 700;
    shown.value = scrollY > 600 && !nearBottom;
}

function openCalendly() {
    if (window.Calendly) {
        window.Calendly.initPopupWidget({ url: calendlyUrl });
    } else {
        window.open(calendlyUrl, '_blank');
    }
}

onMounted(() => {
    window.addEventListener('scroll', updateVisibility, { passive: true });
});

onUnmounted(() => {
    window.removeEventListener('scroll', updateVisibility);
});
</script>

<template>
    <div class="mobile-cta-bar" :class="{ shown }">
        <div class="mobile-cta-text">
            <svg class="gear" viewBox="0 0 100 100" aria-hidden="true">
                <use href="#gear-logo" />
            </svg>
            <span>{{ barText }}</span>
        </div>
        <button class="btn btn-orange" @click="openCalendly">{{ barBtn }}</button>
    </div>
</template>
