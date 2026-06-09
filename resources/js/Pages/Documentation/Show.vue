<script setup>
import { Head, Link, router } from '@inertiajs/vue3';
import { ref, onMounted, watch, nextTick } from 'vue';

const props = defineProps({
    html: String,
    nav: Array,
    currentSlug: String,
    title: String,
});

const sidebarOpen = ref(false);
const tocItems = ref([]);
const activeHeading = ref('');

const scrollToHeading = (id) => {
    const el = document.getElementById(id);
    if (!el) return;
    const main = document.querySelector('main');
    if (!main) return;
    const offset = 30; // increase this to land higher
    const elTop = el.getBoundingClientRect().top;
    const mainTop = main.getBoundingClientRect().top;
    main.scrollBy({ top: elTop - mainTop - offset, behavior: 'smooth' });
    activeHeading.value = id;
};

// Highlight active heading on scroll
const handleScroll = () => {
    const headings = tocItems.value.map(item => document.getElementById(item.id)).filter(Boolean);
    let current = '';
    for (const h of headings) {
        if (h.getBoundingClientRect().top <= 120) current = h.id;
    }
    if (current) activeHeading.value = current;
};

const buildToc = () => {
    const container = document.querySelector('.docs-content');
    if (!container) return;
    const headings = container.querySelectorAll('h2, h3');
    if (headings.length === 0) {
        // DOM not ready yet, try again
        setTimeout(buildToc, 100);
        return;
    }
    tocItems.value = Array.from(headings).map((h, i) => {
        if (!h.id) h.id = `heading-${i}`;
        return {
            id: h.id,
            text: h.textContent,
            level: h.tagName === 'H2' ? 2 : 3,
        };
    });
};

onMounted(() => {
    setTimeout(buildToc, 200);
    const main = document.querySelector('main');
    if (main) main.addEventListener('scroll', handleScroll);
});

watch(() => props.html, () => {
    tocItems.value = [];
    setTimeout(buildToc, 200);
});
</script>

<template>
    <Head :title="`${title} — Docs`" />

    <div class="min-h-screen flex flex-col" style="background-color: #0f0a1e; color: #e5e7eb;">

        <!-- Top bar -->
        <header class="sticky top-0 z-30 flex items-center justify-between px-6 py-4 border-b border-white/10" style="background-color: rgba(15, 10, 30, 0.95); backdrop-filter: blur(10px);">
            <div class="flex items-center gap-4">
                <button class="lg:hidden text-gray-400 hover:text-white" @click="sidebarOpen = !sidebarOpen">
                    <svg class="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 6h16M4 12h16M4 18h16"/>
                    </svg>
                </button>
                <Link :href="route('docs.index')" class="text-white font-bold text-lg">
                    Competition Engine Docs
                </Link>
            </div>
        </header>

        <div class="flex flex-1 overflow-hidden">

            <!-- Left sidebar (nav) -->
            <aside
                class="w-72 flex-shrink-0 overflow-y-auto border-r border-white/10 px-4 py-6 hidden lg:block sticky top-[65px] self-start h-[calc(100vh-65px)] scrollbar-hide"
                style="background-color: #0f0a1e;"
            >
                <nav class="space-y-6">
                    <div v-for="section in nav" :key="section.title">
                        <p class="text-xs font-semibold uppercase tracking-widest text-gray-500 mb-2 px-2">
                            {{ section.title }}
                        </p>
                        <ul class="space-y-0.5">
                            <li v-for="item in section.items" :key="item.slug">
                                <Link
                                    :href="route('docs.show', { section: item.slug.split('/')[0], slug: item.slug.split('/')[1] })"
                                    class="block px-3 py-1.5 rounded-md text-sm transition"
                                    :class="currentSlug === item.slug
                                        ? 'bg-purple-600/20 text-purple-300 font-medium'
                                        : 'text-gray-400 hover:text-white hover:bg-white/5'"
                                >
                                    {{ item.title }}
                                </Link>
                            </li>
                        </ul>
                    </div>
                </nav>
            </aside>

            <!-- Mobile sidebar overlay -->
            <div v-if="sidebarOpen" class="fixed inset-0 z-20 lg:hidden" @click="sidebarOpen = false">
                <div class="absolute inset-0 bg-black/60"></div>
                <aside class="absolute left-0 top-0 bottom-0 w-72 overflow-y-auto px-4 py-6 z-30 border-r border-white/10" style="background-color: #0f0a1e;">
                    <nav class="space-y-6">
                        <div v-for="section in nav" :key="section.title">
                            <p class="text-xs font-semibold uppercase tracking-widest text-gray-500 mb-2 px-2">
                                {{ section.title }}
                            </p>
                            <ul class="space-y-0.5">
                                <li v-for="item in section.items" :key="item.slug">
                                    <Link
                                        :href="route('docs.show', { section: item.slug.split('/')[0], slug: item.slug.split('/')[1] })"
                                        class="block px-3 py-1.5 rounded-md text-sm transition"
                                        :class="currentSlug === item.slug
                                            ? 'bg-purple-600/20 text-purple-300 font-medium'
                                            : 'text-gray-400 hover:text-white hover:bg-white/5'"
                                        @click="sidebarOpen = false"
                                    >
                                        {{ item.title }}
                                    </Link>
                                </li>
                            </ul>
                        </div>
                    </nav>
                </aside>
            </div>

            <!-- Main content -->
            <main class="flex-1 min-w-0 overflow-y-auto px-6 py-10 lg:px-16 h-[calc(100vh-65px)] scrollbar-hide">
                <div class="docs-content max-w-3xl" v-html="html"></div>
            </main>

            <!-- Right TOC panel -->
            <aside
                v-if="tocItems.length > 0"
                class="w-56 flex-shrink-0 hidden xl:block sticky top-[65px] self-start h-[calc(100vh-65px)] overflow-y-auto px-4 py-6 border-l border-white/10 scrollbar-hide"
                style="background-color: #0f0a1e;"
            >
                <p class="text-xs font-semibold uppercase tracking-widest text-gray-500 mb-3">On this page</p>
                <ul class="space-y-1">
                    <li v-for="item in tocItems" :key="item.id">
                        <button
                            @click="scrollToHeading(item.id)"
                            class="text-left w-full text-xs leading-snug transition py-0.5 hover:text-white"
                            :class="[
                                item.level === 3 ? 'pl-3' : '',
                                activeHeading === item.id ? 'text-purple-400' : 'text-gray-500'
                            ]"
                        >
                            {{ item.text }}
                        </button>
                    </li>
                </ul>
            </aside>

        </div>
    </div>
</template>

<style>
/* Docs content styling — scoped to .docs-content */
.docs-content h1 {
    font-size: 2rem;
    font-weight: 700;
    color: #fff;
    margin-bottom: 0.5rem;
}
.docs-content h2 {
    font-size: 1.375rem;
    font-weight: 600;
    color: #fff;
    margin-top: 2.5rem;
    margin-bottom: 1rem;
    padding-bottom: 0.5rem;
    border-bottom: 1px solid rgba(255,255,255,0.08);
}
.docs-content h3 {
    font-size: 1.125rem;
    font-weight: 600;
    color: #e2e8f0;
    margin-top: 2rem;
    margin-bottom: 0.75rem;
}
.docs-content p {
    color: #b0b7c3;
    line-height: 1.75;
    margin-bottom: 1rem;
}
.docs-content a {
    color: #a78bfa;
    text-decoration: underline;
}
.docs-content ul, .docs-content ol {
    color: #b0b7c3;
    padding-left: 1.5rem;
    margin-bottom: 1rem;
    line-height: 1.75;
}
.docs-content ul { list-style-type: disc; }
.docs-content ol { list-style-type: decimal; }
.docs-content li { margin-bottom: 0.25rem; }
.docs-content strong { color: #e2e8f0; font-weight: 600; }
.docs-content em { color: #a78bfa; }
.docs-content code {
    background: rgba(167, 139, 250, 0.1);
    color: #c4b5fd;
    padding: 0.15em 0.4em;
    border-radius: 4px;
    font-size: 0.875em;
    font-family: ui-monospace, monospace;
}
.docs-content pre {
    background: rgba(0,0,0,0.4);
    border: 1px solid rgba(255,255,255,0.1);
    border-radius: 8px;
    padding: 1rem;
    overflow-x: auto;
    margin-bottom: 1.5rem;
}
.docs-content pre code {
    background: none;
    color: #e2e8f0;
    padding: 0;
}
.docs-content blockquote {
    border-left: 3px solid #6A3FF4;
    background: rgba(106, 63, 244, 0.08);
    padding: 0.75rem 1rem;
    border-radius: 0 6px 6px 0;
    margin-bottom: 1rem;
    color: #c4b5fd;
}
.docs-content hr {
    border: none;
    border-top: 1px solid rgba(255,255,255,0.08);
    margin: 2rem 0;
}
.docs-content table {
    width: 100%;
    border-collapse: collapse;
    margin-bottom: 1.5rem;
    font-size: 0.9rem;
}
.docs-content thead tr {
    border-bottom: 1px solid rgba(255,255,255,0.15);
}
.docs-content th {
    text-align: left;
    padding: 0.6rem 1rem;
    color: #9ca3af;
    font-weight: 600;
    font-size: 0.8rem;
    text-transform: uppercase;
    letter-spacing: 0.05em;
}
.docs-content td {
    padding: 0.6rem 1rem;
    color: #b0b7c3;
    border-bottom: 1px solid rgba(255,255,255,0.05);
}
.docs-content tr:hover td {
    background: rgba(255,255,255,0.02);
}

.docs-subtitle {
    font-size: 1.1rem;
    color: #9ca3af;
    margin-bottom: 2rem;
}

.docs-card-grid {
    display: grid;
    grid-template-columns: repeat(auto-fill, minmax(200px, 1fr));
    gap: 1rem;
    margin: 1.5rem 0 2rem;
}

.docs-card {
    display: block;
    padding: 1.25rem;
    border-radius: 8px;
    border: 1px solid rgba(255,255,255,0.08);
    background: rgba(106, 63, 244, 0.06);
    text-decoration: none !important;
    transition: border 0.2s, background 0.2s, transform 0.2s;
}

.docs-card:hover {
    border-color: rgba(106, 63, 244, 0.4);
    background: rgba(106, 63, 244, 0.12);
    transform: translateY(-2px);
}

.docs-card-icon {
    font-size: 1.5rem;
    margin-bottom: 0.5rem;
}

.docs-card h4 {
    color: #e2e8f0 !important;
    font-size: 0.95rem !important;
    font-weight: 600 !important;
    margin: 0 0 0.4rem !important;
}

.docs-card p {
    color: #9ca3af !important;
    font-size: 0.8rem !important;
    margin: 0 !important;
    line-height: 1.4 !important;
}

.scrollbar-hide::-webkit-scrollbar {
    display: none;
}
.scrollbar-hide {
    -ms-overflow-style: none;
    scrollbar-width: none;
}

.docs-content .docs-columns {
    display: grid;
    grid-template-columns: 1fr 1fr;
    gap: 2rem;
    margin-top: 1rem;
}
</style>