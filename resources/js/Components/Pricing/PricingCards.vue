<script setup>
import { onMounted } from 'vue';

const calendlyUrl = 'https://calendly.com/rightglobalgroup/website-design-free-consultation';

const plans = [
    {
        name: 'Pay As You Go',
        priceDisplay: '5p - 10p',
        priceSubtext: 'per order',
        description: 'Perfect for businesses of any size. Only pay for what you use.',
        features: [
            'All Competition Types',
            'Full Analytics Dashboard',
            'Email Support',
            'And many more...'
        ],
        highlighted: false,
        buttonText: 'Get Started',
        action: 'scroll'
    },
    {
        name: 'Enterprise',
        priceDisplay: 'Custom',
        priceSubtext: 'pricing',
        description: 'For larger businesses that need tailored solutions.',
        features: [
            'Volume Discounts',
            'Dedicated Account Manager',
            'Custom Integrations & API Access',
            'Priority Support & Onboarding',
            'And many more...'
        ],
        highlighted: true,
        badge: 'BEST VALUE',
        buttonText: 'Book a Call',
        action: 'calendly'
    }
];

onMounted(() => {
    // Load Calendly popup widget script and CSS
    const link = document.createElement('link');
    link.href = 'https://assets.calendly.com/assets/external/widget.css';
    link.rel = 'stylesheet';
    document.head.appendChild(link);

    const script = document.createElement('script');
    script.src = 'https://assets.calendly.com/assets/external/widget.js';
    script.async = true;
    document.head.appendChild(script);
});

const handleClick = (plan) => {
    if (plan.action === 'calendly') {
        // Open Calendly popup
        if (window.Calendly) {
            window.Calendly.initPopupWidget({ url: calendlyUrl });
        }
    } else {
        // Scroll to booking section
        document.getElementById('booking')?.scrollIntoView({ behavior: 'smooth' });
    }
};
</script>

<template>
    <section id="pricing" class="py-20 bg-[#161B22]">
        <div class="container mx-auto px-4 sm:px-6">
            <div class="text-center mb-12">
                <h2 class="text-3xl md:text-4xl font-bold text-white mb-4">
                    <span class="keyword-animate">Simple, Transparent</span> Pricing
                </h2>
                <p class="text-lg text-gray-400">Choose the plan that's right for you.</p>
            </div>
            <div class="grid lg:grid-cols-2 gap-8 max-w-4xl mx-auto">
                <div
                    v-for="(plan, index) in plans"
                    :key="index"
                    class="liquid-glass p-8 rounded-xl flex flex-col relative"
                    :class="plan.highlighted ? 'border-2 border-pink-500' : ''"
                >
                    <span
                        v-if="plan.badge"
                        class="absolute -top-3 left-1/2 -translate-x-1/2 bg-pink-500 text-white text-xs font-bold px-4 py-1 rounded-full"
                    >
                        {{ plan.badge }}
                    </span>

                    <h3 class="text-2xl font-semibold text-white">{{ plan.name }}</h3>
                    <p class="text-gray-400 mt-2 mb-6">{{ plan.description }}</p>
                    <div class="mb-6">
                        <span class="text-5xl font-bold text-white">{{ plan.priceDisplay }}</span>
                        <span class="text-gray-400 ml-1">{{ plan.priceSubtext }}</span>
                    </div>
                    <ul class="space-y-3 mb-8 flex-grow">
                        <li
                            v-for="(feature, fIndex) in plan.features"
                            :key="fIndex"
                            class="flex items-start text-gray-300"
                        >
                            <svg class="w-5 h-5 mr-2 text-green-400 flex-shrink-0 mt-0.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 13l4 4L19 7"></path>
                            </svg>
                            {{ feature }}
                        </li>
                    </ul>
                    <button
                        @click="handleClick(plan)"
                        class="w-full py-3 rounded-lg font-semibold transition-all"
                        :class="plan.highlighted
                            ? 'bg-pink-500 text-white hover:bg-pink-600 glow-button'
                            : 'bg-gray-700 text-white hover:bg-gray-600'"
                    >
                        {{ plan.buttonText }}
                    </button>
                </div>
            </div>
        </div>
    </section>
</template>
