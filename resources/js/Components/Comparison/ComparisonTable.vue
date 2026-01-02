<script setup>
    import { inject } from 'vue';
    
    const getText = inject('getText');
    const siteTexts = inject('siteTexts');

        
    // Get heading parts
    const headingParts = computed(() => {
        const parts = [];
        
        const before = getText('launch.heading_before', 'Competition Engine vs. Others');
        const keyword = getText('launch.heading_keyword', '');
        const after = getText('launch.heading_after', '');
        
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
    
    const comparisonData = [
        {
            feature: 'Performance',
            competitionEngine: { text: 'Excellent', color: 'text-green-400' },
            wordpress: { text: 'Variable', color: 'text-yellow-400' },
            otherSaas: { text: 'Slow', color: 'text-red-400' }
        },
        {
            feature: 'Security',
            competitionEngine: { text: 'High', color: 'text-green-400' },
            wordpress: { text: 'Vulnerable', color: 'text-red-400' },
            otherSaas: { text: 'Moderate', color: 'text-yellow-400' }
        },
        {
            feature: 'Scalability',
            competitionEngine: { text: 'Unlimited', color: 'text-green-400' },
            wordpress: { text: 'Limited', color: 'text-red-400' },
            otherSaas: { text: 'Limited', color: 'text-yellow-400' }
        },
        {
            feature: 'Ease of Use',
            competitionEngine: { text: 'Intuitive', color: 'text-green-400' },
            wordpress: { text: 'Complex', color: 'text-yellow-400' },
            otherSaas: { text: 'Clunky', color: 'text-yellow-400' }
        },
        {
            feature: 'Support',
            competitionEngine: { text: 'Dedicated', color: 'text-green-400' },
            wordpress: { text: 'Community Forum', color: 'text-red-400' },
            otherSaas: { text: 'Email Only', color: 'text-yellow-400' }
        }
    ];
    </script>
    
    <template>
        <section id="comparison" class="py-20">
            <div class="container mx-auto px-4 sm:px-6">
                <div v-if="!siteTexts.loading" class="text-center mb-12">
                    <h2 class="text-3xl md:text-4xl font-bold text-white mb-4">
                        <template v-for="(part, index) in headingParts" :key="`heading-part-${index}`">
                            <span v-if="part.isKeyword" class="keyword-animate">{{ part.text }}</span>
                            <template v-else>{{ part.text }}</template>
                        </template>
                    </h2>
                    <p class="text-lg text-gray-400">
                        {{ getText('comparison.description', 'See how we stack up against the competition.') }}
                    </p>
                </div>
    
                <!-- Loading fallback -->
                <div v-else class="text-center mb-12">
                    <h2 class="text-3xl md:text-4xl font-bold text-white mb-4">Competition Engine vs. Others</h2>
                    <p class="text-lg text-gray-400">See how we stack up against the competition.</p>
                </div>
                
                <!-- Desktop Table -->
                <div class="hidden md:block overflow-x-auto liquid-glass rounded-lg">
                    <table class="w-full text-left border-collapse">
                        <thead>
                            <tr>
                                <th class="p-4 text-white font-semibold border-b-2 border-gray-700 rounded-tl-lg">Feature</th>
                                <th class="p-4 text-white font-semibold border-b-2 border-gray-700 text-center">Competition Engine</th>
                                <th class="p-4 text-white font-semibold border-b-2 border-gray-700 text-center">WordPress Plugins</th>
                                <th class="p-4 text-white font-semibold border-b-2 border-gray-700 text-center rounded-tr-lg">Other SaaS</th>
                            </tr>
                        </thead>
                        <tbody>
                            <tr 
                                v-for="(row, index) in comparisonData"
                                :key="index"
                                :class="index < comparisonData.length - 1 ? 'border-b border-gray-800' : ''"
                            >
                                <td class="p-4 font-medium text-white">{{ row.feature }}</td>
                                <td class="p-4 text-center font-bold" :class="row.competitionEngine.color">{{ row.competitionEngine.text }}</td>
                                <td class="p-4 text-center" :class="row.wordpress.color">{{ row.wordpress.text }}</td>
                                <td class="p-4 text-center" :class="row.otherSaas.color">{{ row.otherSaas.text }}</td>
                            </tr>
                        </tbody>
                    </table>
                </div>
    
                <!-- Mobile Cards -->
                <div class="block md:hidden space-y-4">
                    <div 
                        v-for="(row, index) in comparisonData"
                        :key="index"
                        class="liquid-glass rounded-lg p-4"
                    >
                        <h4 class="font-semibold text-white text-lg mb-3 text-center">{{ row.feature }}</h4>
                        <div class="space-y-2 text-sm">
                            <p class="flex justify-between">
                                <span>Competition Engine:</span> 
                                <span class="font-bold" :class="row.competitionEngine.color">{{ row.competitionEngine.text }}</span>
                            </p>
                            <p class="flex justify-between">
                                <span>WordPress Plugins:</span> 
                                <span class="font-bold" :class="row.wordpress.color">{{ row.wordpress.text }}</span>
                            </p>
                            <p class="flex justify-between">
                                <span>Other SaaS:</span> 
                                <span class="font-bold" :class="row.otherSaas.color">{{ row.otherSaas.text }}</span>
                            </p>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    </template>