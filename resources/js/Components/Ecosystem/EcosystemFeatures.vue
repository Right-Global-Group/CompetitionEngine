<script setup>
    import { inject, computed } from 'vue';
    
    const getText = inject('getText');
    const siteTexts = inject('siteTexts');
    
    // Get heading parts
    const headingParts = computed(() => {
        const parts = [];
        
        const before = getText('ecosystem.heading_before', 'Your Complete');
        const keyword = getText('ecosystem.heading_keyword', 'Raffle Ecosystem');
        const after = getText('ecosystem.heading_after', '');
        
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
    
    // Computed properties for each feature card
    const features = computed(() => [
        {
            icon: getText('ecosystem.feature1_icon', '💳'),
            title: getText('ecosystem.feature1_title', 'Compliant Payments'),
            description: getText('ecosystem.feature1_description', 'Navigate complex regulations with our pre-approved payment providers, ensuring smooth, secure transactions without the usual hurdles.')
        },
        {
            icon: getText('ecosystem.feature2_icon', '🏦'),
            title: getText('ecosystem.feature2_title', 'Simplified Banking'),
            description: getText('ecosystem.feature2_description', 'Leverage our established relationships with approved banks for straightforward and hassle-free financial management from day one.')
        },
        {
            icon: getText('ecosystem.feature3_icon', '⚖️'),
            title: getText('ecosystem.feature3_title', 'Legal Framework'),
            description: getText('ecosystem.feature3_description', 'Launch with confidence. We provide comprehensive, lawyer-approved terms and conditions to ensure your site meets all necessary regulations.')
        },
        {
            icon: getText('ecosystem.feature4_icon', '📱'),
            title: getText('ecosystem.feature4_title', 'Native iOS & Android Apps'),
            description: getText('ecosystem.feature4_description', 'Maximise engagement and sales with dedicated mobile apps, featuring push notifications to keep your audience instantly updated.')
        },
        {
            icon: getText('ecosystem.feature5_icon', '👍'),
            title: getText('ecosystem.feature5_title', 'Social Ad-Ready'),
            description: getText('ecosystem.feature5_description', 'Expand your reach with our expert guidance on meeting Facebook\'s strict advertising requirements, unlocking a massive audience.')
        },
        {
            icon: getText('ecosystem.feature6_icon', '⚡'),
            title: getText('ecosystem.feature6_title', 'Instant Wins'),
            description: getText('ecosystem.feature6_description', 'Amplify excitement and drive repeat sales with our highly popular instant win feature, keeping customers engaged between main draws.')
        },
        {
            icon: getText('ecosystem.feature7_icon', '📱'),
            title: getText('ecosystem.feature7_title', 'Native iOS & Android Apps'),
            description: getText('ecosystem.feature7_description', 'Maximise engagement and sales with dedicated mobile apps, featuring push notifications to keep your audience instantly updated.')
        },
        {
            icon: getText('ecosystem.feature8_icon', '👍'),
            title: getText('ecosystem.feature8_title', 'Social Ad-Ready'),
            description: getText('ecosystem.feature8_description', 'Expand your reach with our expert guidance on meeting Facebook\'s strict advertising requirements, unlocking a massive audience.')
        },
        {
            icon: getText('ecosystem.feature9_icon', '⚡'),
            title: getText('ecosystem.feature9_title', 'Instant Wins'),
            description: getText('ecosystem.feature9_description', 'Amplify excitement and drive repeat sales with our highly popular instant win feature, keeping customers engaged between main draws.')
        }
    ]);
    </script>
    
    <template>
        <section id="ecosystem" class="py-20">
            <div class="container mx-auto px-4 sm:px-6">
                <div v-if="!siteTexts.loading" class="text-center mb-12">
                    <h2 class="text-3xl md:text-4xl font-bold text-white mb-4">
                        <template v-for="(part, index) in headingParts" :key="`heading-part-${index}`">
                            <span v-if="part.isKeyword" class="keyword-animate">{{ part.text }}</span>
                            <template v-else>{{ part.text }}</template>
                        </template>
                    </h2>
                    <p class="text-lg text-gray-400 max-w-3xl mx-auto">
                        {{ getText('ecosystem.description', 'We provide the essential infrastructure to launch, operate, and scale your raffle business, all in one place.') }}
                    </p>
                </div>
    
                <!-- Loading fallback -->
                <div v-else class="text-center mb-12">
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