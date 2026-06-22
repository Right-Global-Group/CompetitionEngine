<script setup>
import { Head, Link } from '@inertiajs/vue3';
import AppLayout from '@/Layouts/AppLayout.vue';

const props = defineProps({
    post: Object,
});

const formatDate = (dateStr) => {
    if (!dateStr) return '';
    return new Date(dateStr).toLocaleDateString('en-GB', { day: 'numeric', month: 'long', year: 'numeric' });
};
</script>

<template>
    <Head>
        <title>{{ post.title }} - Competition Engine Blog</title>
        <meta name="description" :content="post.excerpt || post.title" head-key="description" />
    </Head>

    <AppLayout>
        <section class="min-h-screen pt-32 pb-20">
            <div class="container mx-auto px-4 sm:px-6 max-w-3xl">
                <Link href="/blog" class="inline-flex items-center gap-2 text-gray-400 hover:text-white transition mb-10 text-sm">
                    ← Back to Blog
                </Link>

                <article>
                    <p class="text-sm text-gray-500 mb-3">{{ formatDate(post.published_at) }}</p>
                    <h1 class="text-3xl sm:text-4xl md:text-5xl font-extrabold text-white mb-6 leading-tight">{{ post.title }}</h1>
                    <p v-if="post.excerpt" class="text-lg text-gray-400 mb-10 pb-10 border-b border-gray-800">{{ post.excerpt }}</p>

                    <div class="blog-content" v-html="post.content"></div>
                </article>
            </div>
        </section>
    </AppLayout>
</template>

<style>
.blog-content { color: #d1d5db; line-height: 1.8; }
.blog-content h1, .blog-content h2, .blog-content h3, .blog-content h4 { color: #fff; font-weight: 700; margin: 1.75rem 0 0.75rem; }
.blog-content h1 { font-size: 1.875rem; }
.blog-content h2 { font-size: 1.5rem; }
.blog-content h3 { font-size: 1.25rem; }
.blog-content p { margin: 1rem 0; }
.blog-content a { color: #6A3FF4; text-decoration: underline; }
.blog-content ul { list-style: disc; padding-left: 1.5rem; margin: 1rem 0; }
.blog-content ol { list-style: decimal; padding-left: 1.5rem; margin: 1rem 0; }
.blog-content li { margin: 0.25rem 0; }
.blog-content blockquote { border-left: 3px solid #6A3FF4; padding: 0.75rem 1.25rem; margin: 1.5rem 0; background: rgba(106,63,244,0.1); border-radius: 0 0.5rem 0.5rem 0; }
.blog-content pre, .blog-content code { background: #111827; border: 1px solid #374151; border-radius: 0.5rem; padding: 0.25rem 0.5rem; font-family: monospace; font-size: 0.875rem; }
.blog-content pre { padding: 1rem; overflow-x: auto; margin: 1rem 0; }
.blog-content img { max-width: 100%; border-radius: 0.5rem; margin: 1rem 0; }
</style>
