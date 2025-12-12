<script setup>
const features = [
    {
        title: 'Smarter Analytics',
        description: 'Get actionable recommendations to improve performance.'
    },
    {
        title: 'Smarter Marketing',
        description: 'AI-driven insights to optimize your campaigns.'
    },
    {
        title: 'AI Image Generation',
        description: 'Create stunning competition visuals without a designer.'
    },
    {
        title: 'AI Content Assist',
        description: 'Generate compelling descriptions in seconds.'
    }
];
</script>

<template>
    <section id="ai-features" class="py-20">
        <div class="container mx-auto px-4 sm:px-6 relative text-center">
            <div class="absolute top-0 right-0 -mt-8 -mr-8">
                <span class="inline-flex items-center px-4 py-2 bg-yellow-400 text-yellow-900 text-sm font-bold rounded-full -rotate-12">
                    COMING SOON
                </span>
            </div>
            <h2 class="text-3xl md:text-4xl font-bold text-white mb-4">
                The Future is <span class="keyword-animate">AI-Powered</span>
            </h2>
            <p class="text-lg text-gray-400 max-w-3xl mx-auto mb-8">
                Supercharge your competition site with the first AI-powered platform. Get ready for smarter analytics, automated marketing, and effortless content creation.
            </p>
            <div class="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-8">
                <div 
                    v-for="(feature, index) in features"
                    :key="index"
                    class="liquid-glass p-6 rounded-xl"
                >
                    <h3 class="font-semibold text-white mb-2">{{ feature.title }}</h3>
                    <p class="text-sm text-gray-400 coming-soon-blur">{{ feature.description }}</p>
                </div>
            </div>
        </div>
    </section>
</template>

<style scoped>
.coming-soon-blur {
    filter: blur(4px);
    opacity: 0.6;
    pointer-events: none;
    user-select: none;
}
</style>