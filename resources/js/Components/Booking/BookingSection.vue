<script setup>
    
const calendlyUrl = 'https://calendly.com/rightglobalgroup/website-design-free-consultation';

const openCalendly = () => {
    window.open(calendlyUrl, '_blank');
};
</script>

<template>
    <section id="booking" class="py-20 bg-[#161B22]">
        <div class="container mx-auto px-4 sm:px-6">
            <div class="text-center">
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
