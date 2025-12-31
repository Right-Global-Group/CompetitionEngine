<script setup>
    import { ref, computed } from 'vue';
    import { usePage } from '@inertiajs/vue3';
    
    const mobileMenuOpen = ref(false);
    const calendlyUrl = 'https://calendly.com/rightglobalgroup/website-design-free-consultation';
    
    const page = usePage();
    const isAdmin = computed(() => page.props.auth?.user?.is_admin || false);
    const isLoggedIn = computed(() => !!page.props.auth?.user);
    
    const scrollToSection = (sectionId) => {
        const element = document.getElementById(sectionId);
        if (element) {
            element.scrollIntoView({ behavior: 'smooth' });
            mobileMenuOpen.value = false;
        }
    };
    
    const openCalendly = () => {
        window.open(calendlyUrl, '_blank');
        mobileMenuOpen.value = false;
    };
    
    const goToAdmin = () => {
        window.location.href = '/admin';
    };
    </script>
    
    <template>
        <header class="fixed top-0 left-0 right-0 z-50 glass-effect">
            <div class="container mx-auto px-4 sm:px-6 py-4">
                <div class="grid grid-cols-3 items-center">
                    <!-- Left: Logo (takes equal space) -->
                    <div class="flex items-center cursor-pointer justify-start group" @click="scrollToSection('hero')">
                        <img src="/images/logo.png" alt="Competition Engine" class="h-10 md:h-12" />
                    </div>
    
                    <!-- Center: Navigation (perfectly centered) -->
                    <nav class="hidden md:flex items-center justify-center space-x-8">
                        <button @click="scrollToSection('ecosystem')" class="text-gray-300 hover:text-accent-purple transition whitespace-nowrap">Features</button>
                        <button @click="scrollToSection('comparison')" class="text-gray-300 hover:text-accent-purple transition whitespace-nowrap">Comparison</button>
                        <button @click="scrollToSection('pricing')" class="text-gray-300 hover:text-accent-purple transition whitespace-nowrap">Pricing</button>
                        <button @click="scrollToSection('faq')" class="text-gray-300 hover:text-accent-purple transition whitespace-nowrap">FAQ</button>
                    </nav>
    
                    <!-- Right: Admin Button + Book Demo Button (takes equal space, aligned right) -->
                    <div class="flex justify-end items-center gap-3">
                        <!-- Admin Icon (only visible to logged-in admins) -->
                        <button
                            v-if="isLoggedIn && isAdmin"
                            @click="goToAdmin"
                            class="hidden md:flex items-center justify-center w-10 h-10 rounded-lg bg-purple-600/20 hover:bg-purple-600/40 transition-all duration-300 border border-purple-500/30 hover:border-purple-500/60"
                            title="Admin Panel"
                        >
                            <svg class="w-5 h-5 text-purple-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.572 1.065c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.065-2.572c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z"></path>
                                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z"></path>
                            </svg>
                        </button>
    
                        <button
                            @click="openCalendly"
                            class="hidden md:inline-block bg-accent-purple text-white font-semibold px-5 py-2 rounded-lg hover:bg-accent-orange transition glow-button whitespace-nowrap"
                        >
                            Book a Demo
                        </button>
    
                        <!-- Mobile Menu Button -->
                        <button 
                            @click="mobileMenuOpen = !mobileMenuOpen"
                            class="md:hidden text-white"
                        >
                            <svg class="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 6h16M4 12h16M4 18h16"/>
                            </svg>
                        </button>
                    </div>
                </div>
            </div>
    
            <!-- Mobile Menu -->
            <div v-show="mobileMenuOpen" class="md:hidden glass-effect">
                <nav class="container mx-auto px-4 py-4 space-y-3">
                    <button @click="scrollToSection('ecosystem')" class="block w-full text-left text-gray-300 hover:text-accent-purple transition py-2">Features</button>
                    <button @click="scrollToSection('comparison')" class="block w-full text-left text-gray-300 hover:text-accent-purple transition py-2">Comparison</button>
                    <button @click="scrollToSection('pricing')" class="block w-full text-left text-gray-300 hover:text-accent-purple transition py-2">Pricing</button>
                    <button @click="scrollToSection('faq')" class="block w-full text-left text-gray-300 hover:text-accent-purple transition py-2">FAQ</button>
                    <button v-if="isLoggedIn && isAdmin" @click="goToAdmin" class="block w-full text-left text-purple-400 hover:text-purple-300 transition py-2 font-semibold">⚙️ Admin Panel</button>
                    <button @click="openCalendly" class="bg-accent-purple text-white font-semibold px-5 py-2 rounded-lg hover:bg-accent-orange transition w-full mt-2">Book a Demo</button>
                </nav>
            </div>
        </header>
    </template>