<script setup>
    import { onMounted, inject, computed } from 'vue';
    
    const getText = inject('getText', (key, fallback = '') => fallback);
    const siteTexts = inject('siteTexts');
    
    // Get heading parts
    const headingParts = computed(() => {
        const parts = [];
        
        const before = getText('pricing.heading_before', '');
        const keyword = getText('pricing.heading_keyword', 'Simple, Transparent');
        const after = getText('pricing.heading_after', 'Pricing');
        
        if (before && before.trim()) {
            parts.push({ text: before + ' ', isKeyword: false });
        }
        
        if (keyword && keyword.trim()) {
            parts.push({ text: keyword, isKeyword: true });
        }
        
        if (after && after.trim()) {
            parts.push({ text: ' ' + after, isKeyword: false });
        }
        
        return parts;
    });
    
    const calendlyUrl = 'https://calendly.com/contact-compengine/30min';
    
    // Build plans from database
    const plans = computed(() => {
        const plan1Features = [];
        const plan2Features = [];
        
        // Collect all features for plan 1
        for (let i = 1; i <= 10; i++) {
            const feature = getText(`pricing.plan1_feature${i}`, '');
            if (feature && feature.trim()) {
                plan1Features.push(feature);
            }
        }
        
        // Collect all features for plan 2
        for (let i = 1; i <= 10; i++) {
            const feature = getText(`pricing.plan2_feature${i}`, '');
            if (feature && feature.trim()) {
                plan2Features.push(feature);
            }
        }
        
        return [
            {
                name: getText('pricing.plan1_name', 'Pay As You Go'),
                priceDisplay: getText('pricing.plan1_price', '5p - 10p'),
                priceSubtext: getText('pricing.plan1_subtext', 'per order'),
                description: getText('pricing.plan1_description', 'Perfect for businesses of any size. Only pay for what you use.'),
                features: plan1Features,
                highlighted: getText('pricing.plan1_highlighted', 'false') === 'true',
                badge: getText('pricing.plan1_badge', ''),
                buttonText: getText('pricing.plan1_button', 'Get Started'),
                action: getText('pricing.plan1_action', 'scroll')
            },
            {
                name: getText('pricing.plan2_name', 'Enterprise'),
                priceDisplay: getText('pricing.plan2_price', 'Custom'),
                priceSubtext: getText('pricing.plan2_subtext', 'pricing'),
                description: getText('pricing.plan2_description', 'For larger businesses that need tailored solutions.'),
                features: plan2Features,
                highlighted: getText('pricing.plan2_highlighted', 'true') === 'true',
                badge: getText('pricing.plan2_badge', 'BEST VALUE'),
                buttonText: getText('pricing.plan2_button', 'Book a Call'),
                action: getText('pricing.plan2_action', 'calendly')
            }
        ];
    });
    
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
                <div v-if="!siteTexts.loading" class="text-center mb-12">
                    <h2 class="text-3xl md:text-4xl font-bold text-white mb-4">
                        <template v-for="(part, index) in headingParts" :key="`heading-part-${index}`">
                            <span v-if="part.isKeyword" class="keyword-animate">{{ part.text }}</span>
                            <template v-else>{{ part.text }}</template>
                        </template>
                    </h2>
                    <p class="text-lg text-gray-400">
                        {{ getText('pricing.description', 'Choose the plan that\'s right for you.') }}
                    </p>
                </div>
    
                <!-- Loading fallback -->
                <div v-else class="text-center mb-12">
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