<script setup>
const plans = [
    {
        name: 'Starter',
        price: 99,
        description: 'For businesses getting started with competitions.',
        features: [
            'Up to 5,000 participants',
            'All Competition Types',
            'Basic Analytics',
            'Email Support'
        ],
        highlighted: false
    },
    {
        name: 'Scale',
        price: 299,
        description: 'For growing businesses that need more power.',
        features: [
            'Unlimited Participants',
            'All Competition Types',
            'Advanced Analytics & API Access',
            'Priority Support & Onboarding'
        ],
        highlighted: true,
        badge: 'MOST POPULAR'
    }
];
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
                        <span class="text-5xl font-bold text-white">${{ plan.price }}</span>
                        <span class="text-gray-400">/mo</span>
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
                        class="w-full py-3 rounded-lg font-semibold transition-all"
                        :class="plan.highlighted 
                            ? 'bg-pink-500 text-white hover:bg-pink-600 glow-button' 
                            : 'bg-gray-700 text-white hover:bg-gray-600'"
                    >
                        Get Started
                    </button>
                </div>
            </div>
        </div>
    </section>
</template>