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
        question: 'What does "5–10p per order" actually mean?',
        answer: 'Each time a customer places an order on your platform — buying tickets, entries, or a bundle — we charge between 5p and 10p. The exact rate depends on your volume tier. There\'s no monthly minimum, no setup fee, and no charge for page views, registrations, or anything that isn\'t an order. Most operators start at 10p and reach 5p within their first three months.',
    },
    {
        question: 'What happens when I need help?',
        answer: 'You talk to the people who built the platform. We have no first-line support outsourcing — every person on the support team can read the code. On draw nights, there\'s someone monitoring in real time. Our average response time for urgent issues is under 8 minutes.',
    },
    {
        question: 'Can I customise the look and feel?',
        answer: 'Yes — extensively. Game Studio lets you configure every visual and mechanical aspect of each game type. Beyond that, you control colours, typography, layout, and all copy. Your site doesn\'t have to look like any other competition platform on the market.',
    },
    {
        question: 'Is CompEngine compliant with the UK VCOC?',
        answer: 'Yes. CompEngine was designed with VCOC compliance as a constraint, not an afterthought. Free-entry routes are built in and automated. Age verification is integrated. Wallet segregation (Cash vs Site Credit) is enforced at the platform level. When VCOC guidance changes, the update ships automatically to all operators.',
    },
    {
        question: 'What games can I offer?',
        answer: 'Slots, Scratch Cards, Spin-the-Wheel, Bingo, Coin Drop, and Balloon Pop — each fully configurable in Game Studio. You can run multiple game types simultaneously, set different reveal mechanics per draw, and preview exactly how each game will look before you publish.',
    },
    {
        question: 'How does the wallet system work?',
        answer: 'We operate two completely separate wallet balances per customer: Cash (withdrawable, funded by real money) and Site Credit (non-withdrawable, funded by bonuses and winnings you specify). The separation is enforced at the database level — it\'s impossible to accidentally mix them. This matters for VCOC compliance and for your own accounting.',
    },
    {
        question: 'What does GLI certification mean for my operators?',
        answer: 'GLI (Gaming Laboratories International) is an independent testing body that verifies our RNG is statistically fair and that draw results can\'t be manipulated. The certification is renewed on a defined cycle — the cost is part of our operating budget, not an extra charge. You can display the GLI seal on your platform.',
    },
    {
        question: 'How long does it take to launch?',
        answer: 'Most operators are live within 1–2 weeks of their onboarding call. The onboarding process covers domain setup, payment gateway connection, game configuration, and a test draw. We\'ve done it in 4 days for operators with an urgent deadline.',
    },
    {
        question: 'Can I see my own data?',
        answer: 'Yes — your analytics dashboard shows orders, revenue, ticket counts, game performance, customer lifetime value, and draw results in real time. You can export everything. You own your data. We don\'t aggregate it across operators or sell insights derived from it.',
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
