<script setup>
import { onMounted, inject, computed } from 'vue';
import { useReveal } from '@/Composables/useReveal';

const getText = inject('getText', (key, fallback = '') => fallback);
const { sectionRef, revealed } = useReveal();

const calendlyUrl = 'https://calendly.com/contact-compengine/30min';

function pt(key, fallback) {
    return getText(`pricing.${key}`, fallback);
}

const eyebrow = computed(() => pt('eyebrow', 'Pricing'));
const titleBefore = computed(() => pt('title_before', 'Two tiers.'));
const titleKeyword = computed(() => pt('title_keyword', 'No tricks.'));
const lead = computed(() => pt('lead', 'Pay 5–10p per order while you\'re growing. Switch to flat-rate Enterprise when volume makes it cheaper. Most operators make that switch at around 20,000 orders per month.'));

const plans = computed(() => {
    const plan1Features = [];
    const plan2Features = [];

    for (let i = 1; i <= 10; i++) {
        const f = getText(`pricing.plan1_feature${i}`, '');
        if (f && f.trim()) plan1Features.push(f);
    }
    if (plan1Features.length === 0) {
        plan1Features.push(
            'All Game Types and Instant Wins included',
            'Entry Lists',
            'Upsells',
            'Responsible Play options',
            'Legal Compliance — Terms & Conditions',
            'All future games and features included',
            'Gateway Integration',
            'Website notifications',
            'Free site migration — including users, wallets and competitions',
            'No limits',
        );
    }

    for (let i = 1; i <= 10; i++) {
        const f = getText(`pricing.plan2_feature${i}`, '');
        if (f && f.trim()) plan2Features.push(f);
    }
    if (plan2Features.length === 0) {
        plan2Features.push(
            'Everything in Pay As You Go, without the order fees',
            'Premium support included',
            'First dibs on new features',
            'No limits',
        );
    }

    return [
        {
            name: pt('plan1_name', 'Pay As You Go'),
            price: pt('plan1_price', '5–10p'),
            priceSuffix: pt('plan1_price_suffix', '&nbsp;per order'),
            priceSub: pt('plan1_subtext', 'No monthly minimum. Scale freely.'),
            description: pt('plan1_description', 'Pay only when customers order. Perfect from first launch through to ~20k orders/month.'),
            features: plan1Features,
            popular: false,
            badge: '',
            buttonText: pt('plan1_button', 'Book a Call'),
            action: pt('plan1_action', 'calendly'),
        },
        {
            name: pt('plan2_name', 'Enterprise'),
            price: pt('plan2_price', '£2,000'),
            priceSuffix: pt('plan2_price_suffix', '&nbsp;/ month'),
            priceSub: pt('plan2_subtext', 'or starts at 5p / order — whichever is lower.'),
            description: pt('plan2_description', 'A flat rate that makes financial planning simple. Locked in when volume means per-order is more expensive.'),
            features: plan2Features,
            popular: true,
            badge: pt('plan2_badge', 'Most operators'),
            buttonText: pt('plan2_button', 'Book a Call'),
            action: pt('plan2_action', 'calendly'),
        },
    ];
});

onMounted(() => {
    const link = document.createElement('link');
    link.href = 'https://assets.calendly.com/assets/external/widget.css';
    link.rel = 'stylesheet';
    document.head.appendChild(link);

    const script = document.createElement('script');
    script.src = 'https://assets.calendly.com/assets/external/widget.js';
    script.async = true;
    document.head.appendChild(script);
});

function handleClick(plan) {
    if (plan.action === 'calendly') {
        if (window.Calendly) {
            window.Calendly.initPopupWidget({ url: calendlyUrl });
        } else {
            window.open(calendlyUrl, '_blank');
        }
    } else {
        document.getElementById('booking')?.scrollIntoView({ behavior: 'smooth' });
    }
}
</script>

<template>
    <section ref="sectionRef" class="section reveal" :class="{ visible: revealed }" id="pricing">
        <div class="center">
            <div class="eyebrow"><span class="dot"></span>{{ eyebrow }}</div>
            <h2 class="h2">{{ titleBefore }} <span class="grad-text">{{ titleKeyword }}</span></h2>
            <p class="lead center" style="margin: 18px auto 0;">{{ lead }}</p>
        </div>

        <div class="pricing-grid">
            <div
                v-for="(plan, idx) in plans"
                :key="idx"
                class="price-card"
                :class="{ popular: plan.popular }"
            >
                <div v-if="plan.badge" class="price-tag">{{ plan.badge }}</div>
                <h3>{{ plan.name }}</h3>
                <p style="font-size:13px; color:var(--text-3); margin:6px 0 0;">{{ plan.description }}</p>
                <div class="price"><span v-html="plan.price + plan.priceSuffix"></span></div>
                <div class="price-tag-sub">{{ plan.priceSub }}</div>
                <ul>
                    <li v-for="(feat, fi) in plan.features" :key="fi">{{ feat }}</li>
                </ul>
                <button class="btn btn-orange" style="width:100%;" @click="handleClick(plan)">{{ plan.buttonText }}</button>
            </div>
        </div>
    </section>
</template>
