<script setup>
    import { onMounted, inject, computed } from 'vue';
    import { gsap } from 'gsap';
    import { ScrollTrigger } from 'gsap/ScrollTrigger';
    
    gsap.registerPlugin(ScrollTrigger);
    
    const getText = inject('getText', (key, fallback = '') => fallback);
    const siteTexts = inject('siteTexts');
    
    // Get heading parts
    const headingParts = computed(() => {
        const parts = [];
        
        const before = getText('nextgen.heading_before', '');
        const keyword = getText('nextgen.heading_keyword', 'Next Generation');
        const after = getText('nextgen.heading_after', 'Platform');
        
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
    
    // Get features from database
    const features = computed(() => {
        const featureList = [];
        
        // Collect up to 10 features
        for (let i = 1; i <= 10; i++) {
            const title = getText(`nextgen.feature${i}_title`, '');
            const desc = getText(`nextgen.feature${i}_desc`, '');
            
            if (title || desc) {
                featureList.push({
                    title,
                    description: desc
                });
            }
        }
        
        // Default features if none found
        if (featureList.length === 0) {
            return [
                {
                    title: 'Global Edge Network:',
                    description: 'Competitions load instantly for users anywhere in the world.'
                },
                {
                    title: 'Serverless Infrastructure:',
                    description: 'Infinite scalability without the bottlenecks. Handle viral traffic spikes without a sweat.'
                },
                {
                    title: 'API-First Design:',
                    description: 'Integrate and automate everything. Connect to your existing tools with our powerful, easy-to-use API.'
                }
            ];
        }
        
        return featureList;
    });
    
    // Icon mapping for each feature (can be expanded)
    const icons = [
        'M13 10V3L4 14h7v7l9-11h-7z', // Lightning
        'M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z', // Lock/Security
        'M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z', // Shield
        'M13 10V3L4 14h7v7l9-11h-7z', // Lightning (repeat for more)
        'M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z',
    ];
    
    onMounted(() => {
        const tl = gsap.timeline({
            scrollTrigger: {
                trigger: '#next-gen',
                start: 'top 70%',
            }
        });
    
        tl.from('#next-gen-svg', {
            scale: 0,
            rotation: 180,
            duration: 1.2,
            ease: 'elastic.out(1, 0.75)'
        })
        .from('#next-gen-heading', {

            y: 30,
            duration: 0.8,
            ease: 'power2.out'
        }, '-=0.8')
        .from('.next-gen-list-item', {

            x: -30,
            duration: 0.5,
            stagger: 0.2,
            ease: 'power2.out'
        }, '-=0.5');
    });
    </script>
    
    <template>
        <section id="next-gen" class="py-20 bg-[#161B22] overflow-hidden">
            <div class="container mx-auto px-4 sm:px-6 grid md:grid-cols-2 gap-12 items-center">
                <!-- Graphic -->
                <div class="relative h-80">
                    <div class="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-80 h-80 bg-accent-purple rounded-full opacity-30 blur-3xl animate-pulse"></div>
                    <svg 
                        id="next-gen-svg"
                        class="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-96 h-96 text-accent-purple opacity-50" 
                        viewBox="0 0 24 24" 
                        fill="currentColor"
                    >
                        <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm-1 17.93c-3.95-.49-7-3.85-7-7.93 0-.62.08-1.21.21-1.79L8 12v1c0 1.1.9 2 2 2v3.93zm9.79-2.14C20.92 16.79 21 15.38 21 14c0-3.86-2.55-7.16-6-8.54v2.08c0 .83-.54 1.58-1.3 1.87-.76.29-1.6.1-2.2-.5l-1.08-1.08C11.21 6.08 12 4.62 12 3.07c1.93 0 3.68.79 4.95 2.05L18 6.2c.5.5.5 1.3 0 1.8L13.8 12.2c-.5.5-1.3.5-1.8 0L10.2 10l-.9.9c-.5.5-1.3.5-1.8 0L6.2 9.6c-.5-.5-.5-1.3 0-1.8L7.3 6.7c-1.27 1.27-2.05 3.02-2.05 4.95 0 1.38.21 2.7.6 3.91l1.32-1.32c.5-.5 1.3-.5 1.8 0l4.2 4.2c.5.5 1.3.5 1.8 0l1.32-1.32z"/>
                    </svg>
                </div>
    
                <!-- Content -->
                <div v-if="!siteTexts.loading" class="text-center md:text-left">
                    <h2 id="next-gen-heading" class="text-3xl md:text-4xl font-bold text-white mb-4">
                        <template v-for="(part, index) in headingParts" :key="`heading-part-${index}`">
                            <span v-if="part.isKeyword" class="keyword-animate">{{ part.text }}</span>
                            <template v-else>{{ part.text }}</template>
                        </template>
                    </h2>
                    <p class="text-lg text-gray-400 mb-6">
                        {{ getText('nextgen.description', 'Competition Engine isn\'t just another tool; it\'s a complete evolution. Built on a serverless, edge-first architecture, we provide unparalleled speed, security, and scalability that legacy systems can\'t match.') }}
                    </p>
                    <ul class="space-y-3 text-left text-gray-300">
                        <li 
                            v-for="(feature, index) in features"
                            :key="index"
                            class="next-gen-list-item flex items-start"
                        >
                            <svg class="w-6 h-6 mr-2 text-orange-500 flex-shrink-0 mt-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" :d="icons[index % icons.length]"></path>
                            </svg>
                            <div>
                                <span class="font-semibold">{{ feature.title }}</span> 
                                {{ feature.description }}
                            </div>
                        </li>
                    </ul>
                </div>
    
                <!-- Loading fallback -->
                <div v-else class="text-center md:text-left">
                    <h2 id="next-gen-heading" class="text-3xl md:text-4xl font-bold text-white mb-4">
                        <span class="keyword-animate">Next Generation</span> Platform
                    </h2>
                    <p class="text-lg text-gray-400 mb-6">
                        Competition Engine isn't just another tool; it's a complete evolution. Built on a serverless, edge-first architecture, we provide unparalleled speed, security, and scalability that legacy systems can't match.
                    </p>
                    <ul class="space-y-3 text-left text-gray-300">
                        <li class="next-gen-list-item flex items-start">
                            <svg class="w-6 h-6 mr-2 text-orange-500 flex-shrink-0 mt-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M13 10V3L4 14h7v7l9-11h-7z"></path>
                            </svg>
                            <div>
                                <span class="font-semibold">Global Edge Network:</span> 
                                Competitions load instantly for users anywhere in the world.
                            </div>
                        </li>
                        <li class="next-gen-list-item flex items-start">
                            <svg class="w-6 h-6 mr-2 text-orange-500 flex-shrink-0 mt-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z"></path>
                            </svg>
                            <div>
                                <span class="font-semibold">Serverless Infrastructure:</span> 
                                Infinite scalability without the bottlenecks. Handle viral traffic spikes without a sweat.
                            </div>
                        </li>
                        <li class="next-gen-list-item flex items-start">
                            <svg class="w-6 h-6 mr-2 text-orange-500 flex-shrink-0 mt-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z"></path>
                            </svg>
                            <div>
                                <span class="font-semibold">API-First Design:</span> 
                                Integrate and automate everything. Connect to your existing tools with our powerful, easy-to-use API.
                            </div>
                        </li>
                    </ul>
                </div>
            </div>
        </section>
    </template>