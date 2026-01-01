<script setup>
    import { ref, computed } from 'vue';
    import { usePage, Link } from '@inertiajs/vue3';
    
    const mobileMenuOpen = ref(false);
    const userMenuOpen = ref(false);
    const calendlyUrl = 'https://calendly.com/rightglobalgroup/website-design-free-consultation';
    
    const page = usePage();
    const isAdmin = computed(() => page.props.auth?.user?.is_admin || false);
    const isLoggedIn = computed(() => !!page.props.auth?.user);
    const userName = computed(() => page.props.auth?.user?.name || '');
    
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
    
    const toggleUserMenu = () => {
        userMenuOpen.value = !userMenuOpen.value;
    };
    
    const logout = () => {
        if (confirm('Are you sure you want to logout?')) {
            // Use Inertia post for proper CSRF handling
            const form = document.createElement('form');
            form.method = 'POST';
            form.action = '/logout';
            
            const csrfToken = document.querySelector('meta[name="csrf-token"]')?.getAttribute('content');
            if (csrfToken) {
                const input = document.createElement('input');
                input.type = 'hidden';
                input.name = '_token';
                input.value = csrfToken;
                form.appendChild(input);
            }
            
            document.body.appendChild(form);
            form.submit();
        }
    };
    </script>
    
    <template>
        <header class="fixed top-0 left-0 right-0 z-50 glass-effect">
            <div class="container mx-auto px-4 sm:px-6 py-4">
                <div class="grid grid-cols-3 items-center">
                    <!-- Left: Logo (takes equal space) -->
                    <div class="flex items-center cursor-pointer justify-start group" @click="scrollToSection('hero')">
                        <img src="/images/logo.png" alt="Competition Engine" class="h-[4.5rem] md:h-12" />
                    </div>
    
                    <!-- Center: Navigation (perfectly centered) -->
                    <nav class="hidden md:flex items-center justify-center space-x-8">
                        <button @click="scrollToSection('ecosystem')" class="text-gray-300 hover:text-accent-purple transition whitespace-nowrap">Features</button>
                        <button @click="scrollToSection('comparison')" class="text-gray-300 hover:text-accent-purple transition whitespace-nowrap">Comparison</button>
                        <button @click="scrollToSection('pricing')" class="text-gray-300 hover:text-accent-purple transition whitespace-nowrap">Pricing</button>
                        <button @click="scrollToSection('faq')" class="text-gray-300 hover:text-accent-purple transition whitespace-nowrap">FAQ</button>
                    </nav>
    
                    <!-- Right: User Icon + Admin Button + Book Demo Button -->
                    <div class="flex justify-end items-center gap-3">
                        <!-- User Icon/Name (Desktop) -->
                        <div v-if="isLoggedIn" class="hidden md:block relative">
                            <button
                                @click="toggleUserMenu"
                                class="flex items-center gap-2 px-3 py-2 rounded-lg bg-gray-800/50 hover:bg-gray-700/50 transition-all duration-300 border border-gray-700/50 hover:border-gray-600/50"
                            >
                                <svg class="w-5 h-5 text-gray-300" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z"></path>
                                </svg>
                                <span class="text-sm text-gray-300">{{ userName }}</span>
                                <svg class="w-4 h-4 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 9l-7 7-7-7"></path>
                                </svg>
                            </button>
    
                            <!-- Dropdown Menu -->
                            <div
                                v-show="userMenuOpen"
                                class="absolute right-0 mt-2 w-48 rounded-lg bg-gray-900 border border-gray-700 shadow-xl z-50"
                            >
                                <div class="py-2">
                                    <a
                                        href="/dashboard"
                                        class="block px-4 py-2 text-sm text-gray-300 hover:bg-gray-800 hover:text-white transition"
                                    >
                                        Dashboard
                                    </a>
                                    <button
                                        @click="logout"
                                        class="block w-full text-left px-4 py-2 text-sm text-red-400 hover:bg-gray-800 hover:text-red-300 transition"
                                    >
                                        Logout
                                    </button>
                                </div>
                            </div>
                        </div>
    
                        <!-- Login Button (Desktop - if not logged in) -->
                        <a
                            v-else
                            href="/login"
                            class="hidden md:flex items-center gap-2 px-4 py-2 rounded-lg bg-gray-800/50 hover:bg-gray-700/50 transition-all duration-300 border border-gray-700/50 hover:border-gray-600/50"
                        >
                            <svg class="w-5 h-5 text-gray-300" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z"></path>
                            </svg>
                            <span class="text-sm text-gray-300">Login</span>
                        </a>
    
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
                    
                    <!-- User Section (Mobile) -->
                    <div v-if="isLoggedIn" class="border-t border-gray-700 pt-3 space-y-2">
                        <div class="flex items-center gap-2 px-3 py-2 text-gray-300">
                            <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z"></path>
                            </svg>
                            <span class="text-sm font-semibold">{{ userName }}</span>
                        </div>
                        <a href="/dashboard" class="block w-full text-left text-gray-300 hover:text-accent-purple transition py-2 px-3">Dashboard</a>
                        <button v-if="isAdmin" @click="goToAdmin" class="block w-full text-left text-purple-400 hover:text-purple-300 transition py-2 px-3 font-semibold">⚙️ Admin Panel</button>
                        <button @click="logout" class="block w-full text-left text-red-400 hover:text-red-300 transition py-2 px-3">Logout</button>
                    </div>
                    <a v-else href="/login" class="block w-full text-left text-gray-300 hover:text-accent-purple transition py-2 border-t border-gray-700 pt-3">
                        👤 Login
                    </a>
                    
                    <button @click="openCalendly" class="bg-accent-purple text-white font-semibold px-5 py-2 rounded-lg hover:bg-accent-orange transition w-full mt-2">Book a Demo</button>
                </nav>
            </div>
        </header>
    </template>