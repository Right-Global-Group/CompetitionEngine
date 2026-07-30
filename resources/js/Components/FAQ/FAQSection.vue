<script setup>
import { ref, inject, computed } from 'vue';
import { useReveal } from '@/Composables/useReveal';

const getText = inject('getText', (key, fallback = '') => fallback);
const siteTexts = inject('siteTexts');
const { sectionRef, revealed } = useReveal();

function fq(key, fallback) {
    return getText(`faq.${key}`, fallback);
}

const eyebrow = computed(() => fq('eyebrow', 'FAQ'));
const titleBefore = computed(() => fq('title_before', 'Questions we get'));
const titleKeyword = computed(() => fq('title_keyword', 'before every call.'));
const lead = computed(() => fq('lead', 'If yours isn\'t here, it\'ll be answered in the first five minutes of the demo.'));

const FAQS_FALLBACK = [
    {
        question: 'How do I start a competition website?',
        answer: 'Book a 30-minute demo and tell us your prize and game type. We handle domain setup, payment gateway connection, and game configuration from there — most operators are live within 1–2 weeks.',
    },
    {
        question: 'What types of competitions do you offer?',
        answer: 'Raffles, instant-win games (Slots, Scratch Cards, Spin-the-Wheel, Bingo, Coin Drop, Ticket Eater, Fishing, Football, Balloon Pop), and compliant free-entry competitions — all configurable in Game Studio.',
    },
    {
        question: 'How do I stay compliant?',
        answer: 'CompEngine is built around UK VCOC compliance — free-entry routes, age verification, and separate Cash/Site Credit wallets are enforced at the platform level, and compliance updates ship automatically to every operator.',
    },
    {
        question: 'How quickly can I launch?',
        answer: 'Most operators are live within 1–2 weeks of their onboarding call. We\'ve done it in 4 days for operators with an urgent deadline.',
    },
    {
        question: 'Can I export my data?',
        answer: 'Yes — your analytics dashboard shows orders, revenue, ticket counts, and customer lifetime value in real time, and you can export everything. You own your data; we never aggregate or sell it.',
    },
    {
        question: 'Do you integrate the payment gateway that accepts apple & google pay?',
        answer: 'Yes — our UK-licensed payment gateway integration supports Apple Pay and Google Pay alongside standard card payments, so customers can check out in one tap.',
    },
    {
        question: 'Is the website secure?',
        answer: 'Yes — built on enterprise-grade infrastructure with a UK-licensed payment gateway, continuous security monitoring, and independent penetration testing on a defined cycle.',
    },
    {
        question: 'Is there any limits of tickets or instant wins?',
        answer: 'No — CompEngine has no hard limits on ticket volume or instant-win prize counts, so your competitions can scale with demand.',
    },
    {
        question: 'Can you build a mobile app?',
        answer: 'Yes — native iOS and Android apps are available, complete with push notifications to keep your audience engaged.',
    },
];

const faqs = computed(() => {
    if (siteTexts.loading || !siteTexts.data?.faq) {
        return FAQS_FALLBACK;
    }
    const faqData = siteTexts.data.faq;
    const questionKeys = Object.keys(faqData)
        .filter(key => /^faq\.q\d+$/.test(key))
        .sort((a, b) => parseInt(a.match(/\d+/)?.[0] || '0') - parseInt(b.match(/\d+/)?.[0] || '0'));

    if (questionKeys.length === 0) return FAQS_FALLBACK;

    return questionKeys.map(qKey => {
        const num = qKey.match(/\d+/)?.[0];
        return {
            question: faqData[qKey] || '',
            answer: faqData[`faq.a${num}`] || '',
        };
    });
});

const openIdx = ref(null);

function toggleFaq(i) {
    openIdx.value = openIdx.value === i ? null : i;
}
</script>

<template>
    <section ref="sectionRef" class="section reveal" :class="{ visible: revealed }" id="faq">
        <div class="center">
            <div class="eyebrow"><span class="dot"></span>{{ eyebrow }}</div>
            <h2 class="h2">{{ titleBefore }} <span class="grad-text">{{ titleKeyword }}</span></h2>
            <p class="lead center" style="margin: 14px auto 0;">{{ lead }}</p>
        </div>

        <div class="faq-list">
            <div
                v-for="(item, i) in faqs"
                :key="i"
                class="faq-item"
                :class="{ open: openIdx === i }"
            >
                <div class="faq-q" @click="toggleFaq(i)">
                    <span>{{ item.question }}</span>
                    <span class="chev">+</span>
                </div>
                <div class="faq-a">{{ item.answer }}</div>
            </div>
        </div>
    </section>
</template>
