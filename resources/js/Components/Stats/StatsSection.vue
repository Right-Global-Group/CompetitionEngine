<script setup>
    import { ref, onMounted, inject, computed, watch } from 'vue';
    import { gsap } from 'gsap';
    import { ScrollTrigger } from 'gsap/ScrollTrigger';
    
    gsap.registerPlugin(ScrollTrigger);
    
    const stat1Value = ref(0);
    const stat2Value = ref(0);
    const stat3Value = ref(0);
    
    const getText = inject('getText');
    const siteTexts = inject('siteTexts');
    
    // Get heading parts
    const headingParts = computed(() => {
        const parts = [];
        
        const before = getText('stats.heading_before', 'Trusted by the');
        const keyword = getText('stats.heading_keyword', 'Best');
        const after = getText('stats.heading_after', '');
        
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
    
    // Computed properties for target values from database
    const targetOrders = computed(() => {
        const value = getText('stats.value_orders', '42000');
        return parseInt(value) || 42000;
    });
    
    const targetTickets = computed(() => {
        const value = getText('stats.value_tickets', '1250000');
        return parseInt(value) || 1250000;
    });
    
    const targetUptime = computed(() => {
        const value = getText('stats.value_uptime', '99.9');
        return parseFloat(value) || 99.9;
    });
    
    // Computed properties for labels
    const labelOrders = computed(() => getText('stats.label_orders', 'Orders Processed'));
    const labelTickets = computed(() => getText('stats.label_tickets', 'Tickets Sold This Month'));
    const labelUptime = computed(() => getText('stats.label_uptime', 'Uptime Percentage'));
    
    let animationsCreated = false;
    
    const createAnimations = () => {
        if (animationsCreated) return;
        animationsCreated = true;
    
        gsap.to(stat1Value, {
            value: targetOrders.value,
            duration: 2,
            ease: 'power2.out',
            scrollTrigger: {
                trigger: '#stats',
                start: 'top 80%',
            },
            onUpdate: function() {
                stat1Value.value = Math.round(this.targets()[0].value);
            }
        });
    
        gsap.to(stat2Value, {
            value: targetTickets.value,
            duration: 2,
            ease: 'power2.out',
            scrollTrigger: {
                trigger: '#stats',
                start: 'top 80%',
            },
            onUpdate: function() {
                stat2Value.value = Math.round(this.targets()[0].value);
            }
        });
    
        gsap.to(stat3Value, {
            value: targetUptime.value,
            duration: 2,
            ease: 'power2.out',
            scrollTrigger: {
                trigger: '#stats',
                start: 'top 80%',
            },
            onUpdate: function() {
                stat3Value.value = this.targets()[0].value.toFixed(1);
            }
        });
    };
    
    onMounted(() => {
        createAnimations();
    });
    
    // Watch for siteTexts to load and recreate animations with new values
    watch(() => siteTexts.loading, (newVal, oldVal) => {
        if (oldVal === true && newVal === false) {
            // Texts just finished loading, update animations
            stat1Value.value = 0;
            stat2Value.value = 0;
            stat3Value.value = 0;
            animationsCreated = false;
            
            // Small delay to ensure DOM is updated
            setTimeout(() => {
                ScrollTrigger.refresh();
                createAnimations();
            }, 100);
        }
    });
    </script>
    
    <template>
        <section id="stats" class="py-20 bg-black bg-opacity-20 overflow-hidden">
            <div class="container mx-auto px-4 sm:px-6">
                <!-- Dynamic Heading -->
                <div v-if="!siteTexts.loading" class="text-center mb-12">
                    <h2 class="text-3xl md:text-4xl font-bold text-white mb-4">
                        <template v-for="(part, index) in headingParts" :key="`heading-part-${index}`">
                            <span v-if="part.isKeyword" class="keyword-animate">{{ part.text }}</span>
                            <template v-else>{{ part.text }}</template>
                        </template>
                    </h2>
                    <p class="text-lg text-gray-400 max-w-2xl mx-auto">
                        {{ getText('stats.description', 'Our platform powers successful competitions at scale, every single day.') }}
                    </p>
                </div>
    
                <!-- Loading Fallback -->
                <div v-else class="text-center mb-12">
                    <h2 class="text-3xl md:text-4xl font-bold text-white mb-4">
                        Trusted by the <span class="keyword-animate">Best</span>
                    </h2>
                    <p class="text-lg text-gray-400 max-w-2xl mx-auto">
                        Our platform powers successful competitions at scale, every single day.
                    </p>
                </div>
    
                <!-- Stats Cards -->
                <div class="relative max-w-5xl mx-auto flex flex-col lg:flex-row items-center justify-center gap-8">
                    <!-- Side Stat 1 -->
                    <div class="liquid-glass p-6 rounded-2xl text-center w-full max-w-sm lg:absolute lg:left-0 lg:-translate-x-1/4">
                        <div class="flex justify-center mb-3">
                            <svg class="w-10 h-10 text-orange-500" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M3 10h18M7 15h1m4 0h1m-7 4h12a3 3 0 003-3V8a3 3 0 00-3-3H6a3 3 0 00-3 3v8a3 3 0 003 3z" />
                            </svg>
                        </div>
                        <h3 class="text-4xl md:text-5xl font-bold text-white">{{ stat1Value.toLocaleString() }}</h3>
                        <p class="text-gray-400 mt-2">{{ labelOrders }}</p>
                    </div>
    
                    <!-- Central Stat (Highlighted) -->
                    <div class="liquid-glass p-8 rounded-2xl text-center w-full max-w-sm lg:max-w-md z-10 border-2 border-orange-500 shadow-2xl shadow-orange-500/20">
                        <div class="flex justify-center mb-4">
                            <svg class="w-12 h-12 text-orange-500" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 5v2m0 4v2m0 4v2M5 5a2 2 0 00-2 2v3a2 2 0 002 2h14a2 2 0 002-2V7a2 2 0 00-2-2H5z"/>
                            </svg>
                        </div>
                        <h3 class="text-5xl md:text-6xl font-bold text-white">{{ stat2Value.toLocaleString() }}</h3>
                        <p class="text-gray-300 mt-2 text-lg">{{ labelTickets }}</p>
                    </div>
    
                    <!-- Side Stat 2 -->
                    <div class="liquid-glass p-6 rounded-2xl text-center w-full max-w-sm lg:absolute lg:right-0 lg:translate-x-1/4">
                        <div class="flex justify-center mb-3">
                            <svg class="w-10 h-10 text-orange-500" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M13 10V3L4 14h7v7l9-11h-7z"/>
                            </svg>
                        </div>
                        <h3 class="text-4xl md:text-5xl font-bold text-white">{{ stat3Value }}%</h3>
                        <p class="text-gray-400 mt-2">{{ labelUptime }}</p>
                    </div>
                </div>
            </div>
        </section>
    </template>