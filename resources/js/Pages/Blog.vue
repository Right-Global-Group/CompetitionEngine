<script setup>
import { Head, Link } from '@inertiajs/vue3';
import AppLayout from '@/Layouts/AppLayout.vue';

defineProps({
    posts: Array,
});

const formatDate = (dateStr) => {
    if (!dateStr) return '';
    return new Date(dateStr).toLocaleDateString('en-GB', { day: 'numeric', month: 'long', year: 'numeric' });
};
</script>

<template>
    <Head>
        <title>Blog - Competition Engine</title>
        <meta name="description" content="Insights, updates, and guides from the Competition Engine team." head-key="description" />
    </Head>

    <AppLayout>
        <section class="min-h-screen pt-32 pb-20">
            <div class="container mx-auto px-4 sm:px-6 max-w-4xl">
                <div class="text-center mb-16">
                    <h1 class="text-4xl sm:text-5xl font-extrabold text-white mb-4">Blog</h1>
                    <p class="text-lg text-gray-400">Insights, updates, and guides from the Competition Engine team.</p>
                </div>

                <div v-if="posts.length === 0" class="text-center text-gray-500 py-20">
                    No posts published yet.
                </div>

                <div v-else class="space-y-8">
                    <Link
                        v-for="post in posts"
                        :key="post.id"
                        :href="`/blog/${post.slug}`"
                        class="block liquid-glass rounded-2xl p-8 hover:border-accent-purple/50 transition-all duration-300 group"
                    >
                        <p class="text-sm text-gray-500 mb-2">{{ formatDate(post.published_at) }}</p>
                        <h2 class="text-2xl font-bold text-white mb-3 group-hover:text-accent-purple transition-colors">{{ post.title }}</h2>
                        <p v-if="post.excerpt" class="text-gray-400 leading-relaxed">{{ post.excerpt }}</p>
                        <span class="inline-block mt-4 text-accent-purple text-sm font-medium">Read more →</span>
                    </Link>
                </div>
            </div>
        </section>
    </AppLayout>
</template>
