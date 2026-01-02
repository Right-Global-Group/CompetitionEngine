<script setup>
    import { onMounted, inject, computed } from 'vue';
    import { gsap } from 'gsap';
    import { ScrollTrigger } from 'gsap/ScrollTrigger';
    
    gsap.registerPlugin(ScrollTrigger);
    
    const getText = inject('getText');
    const siteTexts = inject('siteTexts');
    
    // Get heading parts
    const headingParts = computed(() => {
        const parts = [];
        
        const before = getText('launch.heading_before', 'Launch in');
        const keyword = getText('launch.heading_keyword', 'Minutes');
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
    
    // Get steps from database
    const steps = computed(() => [
        {
            number: 1,
            title: getText('launch.step1_title', 'Choose Your Game'),
            description: getText('launch.step1_desc', 'Select from a variety of engaging competition types.')
        },
        {
            number: 2,
            title: getText('launch.step2_title', 'Customize Everything'),
            description: getText('launch.step2_desc', 'Brand your competition with your logos and colors.')
        },
        {
            number: 3,
            title: getText('launch.step3_title', 'Define the Rules'),
            description: getText('launch.step3_desc', 'Define entry criteria and prize allocation.')
        },
        {
            number: 4,
            title: getText('launch.step4_title', 'Go Live!'),
            description: getText('launch.step4_desc', 'Launch and watch the engagement roll in.')
        }
    ]);
    
    onMounted(() => {
        gsap.from('.timeline-item', {
            opacity: 0,
            x: -50,
            duration: 0.8,
            stagger: 0.2,
            ease: 'power3.out',
            scrollTrigger: {
                trigger: '#launch',
                start: 'top 70%',
            }
        });
    });
    </script>
    
    <template>
        <section id="launch" class="py-20 bg-[#161B22]">
            <div class="container mx-auto px-4 sm:px-6">
                <div v-if="!siteTexts.loading" class="text-center mb-12">
                    <h2 class="text-3xl md:text-4xl font-bold text-white mb-4">
                        <template v-for="(part, index) in headingParts" :key="`heading-part-${index}`">
                            <span v-if="part.isKeyword" class="keyword-animate">{{ part.text }}</span>
                            <template v-else>{{ part.text }}</template>
                        </template>
                    </h2>
                    <p class="text-lg text-gray-400 max-w-2xl mx-auto">
                        {{ getText('launch.description', 'A straightforward path from idea to live competition.') }}
                    </p>
                </div>
                
                <div v-else class="text-center mb-12">
                    <h2 class="text-3xl md:text-4xl font-bold text-white mb-4">
                        Launch in <span class="keyword-animate">Minutes</span>
                    </h2>
                    <p class="text-lg text-gray-400 max-w-2xl mx-auto">
                        A straightforward path from idea to live competition.
                    </p>
                </div>
    
                <div class="max-w-3xl mx-auto">
                    <div 
                        v-for="step in steps" 
                        :key="step.number"
                        class="timeline-item"
                    >
                        <div class="timeline-dot">
                            <span class="text-white text-xs font-bold">{{ step.number }}</span>
                        </div>
                        <div class="liquid-glass rounded-xl p-6">
                            <h3 class="text-xl font-bold text-white mb-2">{{ step.title }}</h3>
                            <p class="text-gray-400">{{ step.description }}</p>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    </template>