<script setup>
import { ref } from 'vue';

const faqs = [
    {
        question: 'What types of competitions can I create?',
        answer: 'You can create a wide variety of competitions including raffles, instant win games (slots, scratch cards, spin wheels), sweepstakes, and more. Our platform is flexible and can accommodate most competition formats.',
        open: false
    },
    {
        question: 'How quickly can I launch a competition?',
        answer: 'With our intuitive interface, you can have a competition up and running in minutes. Choose your game type, customize the look and feel, set your rules, and you\'re ready to go live!',
        open: false
    },
    {
        question: 'Is Competition Engine secure and compliant?',
        answer: 'Absolutely. We take security and compliance very seriously. Our platform is built with enterprise-grade security, and we provide comprehensive legal frameworks to ensure your competitions meet all necessary regulations.',
        open: false
    },
    {
        question: 'Can I integrate Competition Engine with my existing tools?',
        answer: 'Yes! Competition Engine is API-first, which means you can easily integrate with your existing CRM, email marketing tools, analytics platforms, and more. Our robust API makes automation and custom integrations straightforward.',
        open: false
    }
];

const toggleFaq = (index) => {
    faqs[index].open = !faqs[index].open;
};
</script>

<template>
    <section id="faq" class="py-20">
        <div class="container mx-auto px-4 sm:px-6">
            <div class="text-center mb-12">
                <h2 class="text-3xl md:text-4xl font-bold text-white mb-4">
                    Frequently Asked <span class="keyword-animate">Questions</span>
                </h2>
                <p class="text-lg text-gray-400 max-w-2xl mx-auto">
                    Got questions? We've got answers.
                </p>
            </div>

            <div class="max-w-3xl mx-auto">
                <div 
                    v-for="(faq, index) in faqs"
                    :key="index"
                    class="faq-item"
                >
                    <details 
                        class="group"
                        :open="faq.open"
                        @toggle="toggleFaq(index)"
                    >
                        <summary class="flex justify-between items-center cursor-pointer py-6 text-white font-semibold text-lg list-none">
                            <span>{{ faq.question }}</span>
                            <svg 
                                class="w-6 h-6 text-gray-400 transition-transform group-open:rotate-180" 
                                fill="none" 
                                stroke="currentColor" 
                                viewBox="0 0 24 24"
                            >
                                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 9l-7 7-7-7"></path>
                            </svg>
                        </summary>
                        <div class="pb-6 text-gray-400 leading-relaxed">
                            {{ faq.answer }}
                        </div>
                    </details>
                </div>
            </div>
        </div>
    </section>
</template>

<style scoped>
.faq-item {
    border-bottom: 1px solid #4a3b64;
}

.faq-item:last-child {
    border-bottom: none;
}
</style>