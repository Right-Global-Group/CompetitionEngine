<script setup>
const scrollToSection = (sectionId) => {
    const element = document.getElementById(sectionId);
    if (element) {
        element.scrollIntoView({ behavior: 'smooth' });
    }
};
</script>

<template>
    <footer class="bg-[#161B22] border-t border-gray-800">
        <div class="container mx-auto px-4 sm:px-6 py-12">
            <div class="grid grid-cols-1 md:grid-cols-4 gap-8">
                <!-- Logo & Description -->
                <div class="md:col-span-1">
                    <div class="flex items-center mb-4">
                        <svg class="w-8 h-8 mr-2 text-[#A020F0]" viewBox="0 0 24 24" fill="currentColor">
                            <path d="M19.43 12.98c.04-.32.07-.64.07-.98s-.03-.66-.07-.98l2.11-1.65c.19-.15.24-.42.12-.64l-2-3.46c-.12-.22-.39-.3-.61-.22l-2.49 1c-.52-.4-1.08-.73-1.69-.98l-.38-2.65C14.46 2.18 14.25 2 14 2h-4c-.25 0-.46.18-.49.42l-.38 2.65c-.61-.25-1.17.59-1.69-.98l-2.49-1c-.23-.09-.49 0-.61.22l-2 3.46c-.13.22-.07.49.12.64l2.11 1.65c-.04.32-.07.65-.07.98s.03.66.07.98l-2.11 1.65c-.19.15-.24-.42-.12-.64l2 3.46c.12.22.39.3.61.22l2.49-1c.52.4 1.08.73 1.69.98l.38 2.65c.03.24.24.42.49.42h4c.25 0 .46-.18.49-.42l.38-2.65c.61-.25 1.17-.59 1.69-.98l2.49 1c.23-.09.49 0 .61-.22l2-3.46c.12-.22-.07-.49-.12-.64l-2.11-1.65zM12 15.5c-1.93 0-3.5-1.57-3.5-3.5s1.57-3.5 3.5-3.5 3.5 1.57 3.5 3.5-1.57 3.5-3.5 3.5z"/>
                        </svg>
                        <span class="text-xl font-bold text-white">Competition Engine</span>
                    </div>
                    <p class="text-gray-400">The modern platform for creating and managing viral competitions.</p>
                </div>

                <!-- Product Links -->
                <div>
                    <h4 class="text-lg font-semibold text-white mb-4">Product</h4>
                    <ul class="space-y-3">
                        <li><button @click="scrollToSection('ecosystem')" class="text-gray-400 hover:text-[#A020F0] transition">Features</button></li>
                        <li><button @click="scrollToSection('pricing')" class="text-gray-400 hover:text-[#A020F0] transition">Pricing</button></li>
                        <li><button @click="scrollToSection('comparison')" class="text-gray-400 hover:text-[#A020F0] transition">Comparisons</button></li>
                        <li><button @click="scrollToSection('booking')" class="text-gray-400 hover:text-[#A020F0] transition">Book a Demo</button></li>
                    </ul>
                </div>

                <!-- Company Links -->
                <div>
                    <h4 class="text-lg font-semibold text-white mb-4">Company</h4>
                    <ul class="space-y-3">
                        <li><a href="#" class="text-gray-400 hover:text-[#A020F0] transition">About Us</a></li>
                        <li><a href="#" class="text-gray-400 hover:text-[#A020F0] transition">Careers</a></li>
                        <li><a href="#" class="text-gray-400 hover:text-[#A020F0] transition">Contact</a></li>
                    </ul>
                </div>

                <!-- Legal Links -->
                <div>
                    <h4 class="text-lg font-semibold text-white mb-4">Legal</h4>
                    <ul class="space-y-3">
                        <li><a href="#" class="text-gray-400 hover:text-[#A020F0] transition">Privacy Policy</a></li>
                        <li><a href="#" class="text-gray-400 hover:text-[#A020F0] transition">Terms of Service</a></li>
                    </ul>
                </div>
            </div>

            <!-- Copyright & Social -->
            <div class="mt-12 pt-8 border-t border-gray-800 flex flex-col sm:flex-row justify-between items-center">
                <p class="text-gray-500">&copy; 2024 Competition Engine. All rights reserved.</p>
                <div class="flex space-x-6 mt-4 sm:mt-0">
                    <a href="#" class="text-gray-500 hover:text-[#A020F0] transition">
                        <svg class="w-6 h-6" fill="currentColor" viewBox="0 0 24 24">
                            <path d="M22.46,6C21.69,6.35 20.86,6.58 20,6.69C20.88,6.16 21.56,5.32 21.88,4.31C21.05,4.81 20.13,5.16 19.16,5.36C18.37,4.5 17.26,4 16,4C13.65,4 11.73,5.92 11.73,8.29C11.73,8.63 11.77,8.96 11.84,9.27C8.28,9.09 5.11,7.38 3,4.79C2.63,5.42 2.42,6.16 2.42,6.94C2.42,8.43 3.17,9.75 4.33,10.5C3.62,10.5 2.96,10.3 2.38,10C2.38,10 2.38,10 2.38,10.03C2.38,12.11 3.86,13.85 5.82,14.24C5.46,14.34 5.08,14.39 4.69,14.39C4.42,14.39 4.15,14.36 3.89,14.31C4.43,16 6,17.26 7.89,17.29C6.43,18.45 4.58,19.13 2.56,19.13C2.22,19.13 1.88,19.11 1.54,19.07C3.44,20.29 5.7,21 8.12,21C16,21 20.33,14.46 20.33,8.79C20.33,8.6 20.33,8.42 20.32,8.23C21.16,7.63 21.88,6.87 22.46,6Z"/>
                        </svg>
                    </a>
                    <a href="#" class="text-gray-500 hover:text-[#A020F0] transition">
                        <svg class="w-6 h-6" fill="currentColor" viewBox="0 0 24 24">
                            <path d="M19,3A2,2 0 0,1 21,5V19A2,2 0 0,1 19,21H5A2,2 0 0,1 3,19V5A2,2 0 0,1 5,3H19M18.5,18.5V13.2A3.26,3.26 0 0,0 15.24,9.94C14.39,9.94 13.4,10.46 12.92,11.24V10.13H10.13V18.5H12.92V13.57C12.92,12.8 13.54,12.17 14.31,12.17C15.08,12.17 15.7,12.8 15.7,13.57V18.5H18.5M6.88,8.56A1.68,1.68 0 0,0 8.56,6.88C8.56,6 7.76,5.19 6.88,5.19C6,5.19 5.19,6 5.19,6.88C5.19,7.76 6,8.56 6.88,8.56M8.27,18.5V10.13H5.5V18.5H8.27Z"/>
                        </svg>
                    </a>
                </div>
            </div>
        </div>
    </footer>
</template>