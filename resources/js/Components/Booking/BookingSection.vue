<script setup>
import { onMounted } from 'vue';

const calendlyUrl = 'https://calendly.com/rightglobalgroup/website-design-free-consultation';

onMounted(() => {
    // Load Calendly widget script
    const script = document.createElement('script');
    script.src = 'https://assets.calendly.com/assets/external/widget.js';
    script.async = true;
    document.head.appendChild(script);
});
</script>

<template>
    <section id="booking" class="py-20 bg-[#161B22]">
        <div class="container mx-auto px-4 sm:px-6">
            <div class="text-center mb-12">
                <h2 class="text-3xl md:text-4xl font-bold text-white mb-4">
                    Book Your <span class="keyword-animate">Free Consultation</span>
                </h2>
                <p class="text-lg text-gray-400 max-w-2xl mx-auto">
                    See Competition Engine in action. Choose a time that works for you.
                </p>
            </div>

            <div class="max-w-4xl mx-auto">
                <!-- Calendly Inline Widget -->
                <div
                    class="calendly-inline-widget"
                    :data-url="calendlyUrl"
                    style="min-width: 320px; height: 700px;"
                ></div>
            </div>
        </div>
    </section>
</template>

<style scoped>
/* Style the Calendly container */
.calendly-inline-widget {
    border-radius: 12px;
    overflow: hidden;
}
</style>
