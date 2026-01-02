<script setup>
    import { inject } from 'vue';
    
    const getText = inject('getText');
    const siteTexts = inject('siteTexts');
    
    const calendlyUrl = 'https://calendly.com/rightglobalgroup/website-design-free-consultation';

        
    // Get heading parts
    const headingParts = computed(() => {
        const parts = [];
        
        const before = getText('launch.heading_before', 'Book Your');
        const keyword = getText('launch.heading_keyword', 'Free Consultation');
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
    
    const openCalendly = () => {
        window.open(calendlyUrl, '_blank');
    };
    </script>
    
    <template>
        <section id="booking" class="py-20 bg-[#161B22]">
            <div class="container mx-auto px-4 sm:px-6">
                <div v-if="!siteTexts.loading" class="text-center">
                    <h2 class="text-3xl md:text-4xl font-bold text-white mb-4">
                        <template v-for="(part, index) in headingParts" :key="`heading-part-${index}`">
                            <span v-if="part.isKeyword" class="keyword-animate">{{ part.text }}</span>
                            <template v-else>{{ part.text }}</template>
                        </template>
                    </h2>
                    <p class="text-lg text-gray-400 max-w-2xl mx-auto mb-8">
                        See Competition Engine in action. Choose a time that works for you.
                    </p>
                    <button
                        @click="openCalendly"
                        class="bg-accent-purple text-white font-semibold px-8 py-4 rounded-lg hover:bg-accent-orange transition glow-button text-lg"
                    >
                        Schedule a Call
                    </button>
                </div>
    
                <!-- Loading fallback -->
                <div v-else class="text-center">
                    <h2 class="text-3xl md:text-4xl font-bold text-white mb-4">
                        Book Your <span class="keyword-animate">Free Consultation</span>
                    </h2>
                    <p class="text-lg text-gray-400 max-w-2xl mx-auto mb-8">
                        See Competition Engine in action. Choose a time that works for you.
                    </p>
                    <button
                        @click="openCalendly"
                        class="bg-accent-purple text-white font-semibold px-8 py-4 rounded-lg hover:bg-accent-orange transition glow-button text-lg"
                    >
                        Schedule a Call
                    </button>
                </div>
            </div>
        </section>
    </template>