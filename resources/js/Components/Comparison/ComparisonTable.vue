<script setup>
    import { inject, computed } from 'vue';
    
    const getText = inject('getText');
    const siteTexts = inject('siteTexts');
    
    // Get heading parts
    const headingParts = computed(() => {
        const parts = [];
        
        const before = getText('comparison.heading_before', 'Competition Engine vs.');
        const keyword = getText('comparison.heading_keyword', 'Others');
        const after = getText('comparison.heading_after', '');
        
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
    
    // Helper function to determine color based on text
    const getColor = (text) => {
        const lower = text.toLowerCase();
        if (['excellent', 'high', 'unlimited', 'intuitive', 'dedicated'].includes(lower)) return 'text-green-400';
        if (['variable', 'moderate', 'complex', 'clunky'].includes(lower)) return 'text-yellow-400';
        return 'text-red-400';
    };
    
    // Get comparison data from database
    const comparisonData = computed(() => [
        {
            feature: getText('comparison.feature1', 'Performance'),
            competitionEngine: { text: getText('comparison.feature1_us', 'Excellent'), color: getColor(getText('comparison.feature1_us', 'Excellent')) },
            wordpress: { text: getText('comparison.feature1_wp', 'Variable'), color: getColor(getText('comparison.feature1_wp', 'Variable')) },
            otherSaas: { text: getText('comparison.feature1_saas', 'Slow'), color: getColor(getText('comparison.feature1_saas', 'Slow')) }
        },
        {
            feature: getText('comparison.feature2', 'Security'),
            competitionEngine: { text: getText('comparison.feature2_us', 'High'), color: getColor(getText('comparison.feature2_us', 'High')) },
            wordpress: { text: getText('comparison.feature2_wp', 'Vulnerable'), color: getColor(getText('comparison.feature2_wp', 'Vulnerable')) },
            otherSaas: { text: getText('comparison.feature2_saas', 'Moderate'), color: getColor(getText('comparison.feature2_saas', 'Moderate')) }
        },
        {
            feature: getText('comparison.feature3', 'Scalability'),
            competitionEngine: { text: getText('comparison.feature3_us', 'Unlimited'), color: getColor(getText('comparison.feature3_us', 'Unlimited')) },
            wordpress: { text: getText('comparison.feature3_wp', 'Limited'), color: getColor(getText('comparison.feature3_wp', 'Limited')) },
            otherSaas: { text: getText('comparison.feature3_saas', 'Limited'), color: getColor(getText('comparison.feature3_saas', 'Limited')) }
        },
        {
            feature: getText('comparison.feature4', 'Ease of Use'),
            competitionEngine: { text: getText('comparison.feature4_us', 'Intuitive'), color: getColor(getText('comparison.feature4_us', 'Intuitive')) },
            wordpress: { text: getText('comparison.feature4_wp', 'Complex'), color: getColor(getText('comparison.feature4_wp', 'Complex')) },
            otherSaas: { text: getText('comparison.feature4_saas', 'Clunky'), color: getColor(getText('comparison.feature4_saas', 'Clunky')) }
        },
        {
            feature: getText('comparison.feature5', 'Support'),
            competitionEngine: { text: getText('comparison.feature5_us', 'Dedicated'), color: getColor(getText('comparison.feature5_us', 'Dedicated')) },
            wordpress: { text: getText('comparison.feature5_wp', 'Community Forum'), color: getColor(getText('comparison.feature5_wp', 'Community Forum')) },
            otherSaas: { text: getText('comparison.feature5_saas', 'Email Only'), color: getColor(getText('comparison.feature5_saas', 'Email Only')) }
        }
    ]);
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