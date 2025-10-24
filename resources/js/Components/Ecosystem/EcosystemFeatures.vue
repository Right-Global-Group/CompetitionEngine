<script setup>
const features = [
    {
        icon: '💳',
        title: 'Compliant Payments',
        description: 'Navigate complex regulations with our pre-approved payment providers, ensuring smooth, secure transactions without the usual hurdles.'
    },
    {
        icon: '🏦',
        title: 'Simplified Banking',
        description: 'Leverage our established relationships with approved banks for straightforward and hassle-free financial management from day one.'
    },
    {
        icon: '⚖️',
        title: 'Legal Framework',
        description: 'Launch with confidence. We provide comprehensive, lawyer-approved terms and conditions to ensure your site meets all necessary regulations.'
    },
    {
        icon: '📱',
        title: 'Native iOS & Android Apps',
        description: 'Maximise engagement and sales with dedicated mobile apps, featuring push notifications to keep your audience instantly updated.'
    },
    {
        icon: '👍',
        title: 'Social Ad-Ready',
        description: 'Expand your reach with our expert guidance on meeting Facebook\'s strict advertising requirements, unlocking a massive audience.'
    },
    {
        icon: '⚡',
        title: 'Instant Wins',
        description: 'Amplify excitement and drive repeat sales with our highly popular instant win feature, keeping customers engaged between main draws.'
    }
];
</script>

<template>
    <section id="ecosystem" class="py-20">
        <div class="container mx-auto px-4 sm:px-6">
            <div class="text-center mb-12">
                <h2 class="text-3xl md:text-4xl font-bold text-white mb-4">
                    Your Complete <span class="keyword-animate">Raffle Ecosystem</span>
                </h2>
                <p class="text-lg text-gray-400 max-w-3xl mx-auto">
                    We provide the essential infrastructure to launch, operate, and scale your raffle business, all in one place.
                </p>
            </div>

            <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 max-w-6xl mx-auto">
                <div 
                    v-for="(feature, index) in features"
                    :key="index"
                    class="liquid-glass rounded-xl p-6 feature-card"
                >
                    <div class="text-5xl mb-4">{{ feature.icon }}</div>
                    <h3 class="text-xl font-bold text-white mb-3">{{ feature.title }}</h3>
                    <p class="text-gray-400">{{ feature.description }}</p>
                </div>
            </div>
        </div>
    </section>
</template>