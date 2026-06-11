<script setup>
import { Head, Link, router } from '@inertiajs/vue3';
import { ref, onMounted, watch } from 'vue';

const props = defineProps({
    html:        String,
    nav:         Array,
    currentSlug: String,
    title:       String,
    isAdmin:     Boolean,
});

// ── Sidebar / TOC ──────────────────────────────────────────────────────────
const sidebarOpen = ref(false);
const tocItems    = ref([]);
const activeHeading = ref('');

const scrollToHeading = (id) => {
    const el   = document.getElementById(id);
    const main = document.querySelector('main');
    if (!el || !main) return;
    const offset = 30;
    main.scrollBy({ top: el.getBoundingClientRect().top - main.getBoundingClientRect().top - offset, behavior: 'smooth' });
    activeHeading.value = id;
};

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
    if (headings.length === 0) { setTimeout(buildToc, 100); return; }
    tocItems.value = Array.from(headings).map((h, i) => {
        if (!h.id) h.id = `heading-${i}`;
        return { id: h.id, text: h.textContent, level: h.tagName === 'H2' ? 2 : 3 };
    });
};

onMounted(() => {
    setTimeout(buildToc, 200);
    const main = document.querySelector('main');
    if (main) main.addEventListener('scroll', handleScroll);
    document.addEventListener('keydown', handleSearchKey);
});

watch(() => props.html, () => {
    tocItems.value = [];
    setTimeout(buildToc, 200);
});

// ── Search ─────────────────────────────────────────────────────────────────
const searchQuery   = ref('');
const searchResults = ref([]);
const searchOpen    = ref(false);
const searchActive  = ref(-1);
const searchInput   = ref(null);
const searchContainer = ref(null);

let searchTimer = null;

watch(searchQuery, (val) => {
    searchActive.value = -1;
    clearTimeout(searchTimer);

    if (val.trim().length < 2) {
        searchResults.value = [];
        searchOpen.value    = false;
        return;
    }

    // Debounce 200ms so we don't fire on every keystroke
    searchTimer = setTimeout(async () => {
        try {
            const res  = await fetch(`/docs/search?q=${encodeURIComponent(val.trim())}`);
            const data = await res.json();
            searchResults.value = data;
            searchOpen.value    = data.length > 0;
        } catch {
            searchResults.value = [];
            searchOpen.value    = false;
        }
    }, 200);
});

function handleSearchKey(e) {
    if ((e.metaKey || e.ctrlKey) && e.key === 'k') {
        e.preventDefault();
        searchInput.value?.focus();
        return;
    }
    if (!searchOpen.value) return;
    if (e.key === 'ArrowDown') {
        e.preventDefault();
        searchActive.value = Math.min(searchActive.value + 1, searchResults.value.length - 1);
    } else if (e.key === 'ArrowUp') {
        e.preventDefault();
        searchActive.value = Math.max(searchActive.value - 1, 0);
    } else if (e.key === 'Enter' && searchActive.value >= 0) {
        e.preventDefault();
        navigateToResult(searchResults.value[searchActive.value]);
    } else if (e.key === 'Escape') {
        closeSearch();
    }
}

function navigateToResult(item) {
    closeSearch();
    router.visit(route('docs.show', { section: item.section, slug: item.page }));
}

function closeSearch() {
    searchOpen.value    = false;
    searchActive.value  = -1;
    searchQuery.value   = '';
    searchResults.value = [];
}

function handleSearchBlur(e) {
    // Delay so clicks on results register before the dropdown closes
    setTimeout(() => {
        if (!searchContainer.value?.contains(document.activeElement)) {
            searchOpen.value = false;
        }
    }, 150);
}

function highlightQuery(text) {
    if (!text || !searchQuery.value.trim()) return text;
    const terms = searchQuery.value.trim().split(/\s+/).map(t => t.replace(/[.*+?^${}()|[\]\\]/g, '\\$&'));
    const re    = new RegExp(`(${terms.join('|')})`, 'gi');
    return text.replace(re, '<mark>$1</mark>');
}

function sectionLabel(section) {
    return section === 'admin' ? 'Admin' : 'Customers';
}
</script>

<template>
    <Head :title="`${title} — Docs`" />

    <div class="min-h-screen flex flex-col" style="background-color: #0f0a1e; color: #e5e7eb;">

        <!-- Top bar -->
        <header
            class="sticky top-0 z-30 flex items-center gap-4 px-6 py-3 border-b border-white/10"
            style="background-color: rgba(15, 10, 30, 0.95); backdrop-filter: blur(10px);"
        >
            <!-- Left: hamburger + logo -->
            <div class="flex items-center gap-4 flex-shrink-0">
                <button class="lg:hidden text-gray-400 hover:text-white" @click="sidebarOpen = !sidebarOpen">
                    <svg class="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 6h16M4 12h16M4 18h16"/>
                    </svg>
                </button>
                <Link :href="route('docs.index')" class="text-white font-bold text-lg whitespace-nowrap">
                    Help Center
                </Link>
            </div>

            <!-- Centre: search -->
            <div ref="searchContainer" class="relative flex-1 max-w-md mx-auto">
                <div class="relative">
                    <svg class="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-500 pointer-events-none"
                         fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                              d="M21 21l-4.35-4.35M17 11A6 6 0 1 1 5 11a6 6 0 0 1 12 0z"/>
                    </svg>
                    <input
                        ref="searchInput"
                        v-model="searchQuery"
                        type="text"
                        placeholder="Search docs…"
                        autocomplete="off"
                        spellcheck="false"
                        @blur="handleSearchBlur"
                        @focus="searchResults.length && (searchOpen = true)"
                        class="w-full pl-9 pr-14 py-1.5 rounded-md text-sm border border-white/10 bg-white/5 text-gray-200 placeholder-gray-500 focus:outline-none focus:border-purple-500 focus:ring-1 focus:ring-purple-500 transition"
                    />
                    <kbd class="absolute right-2.5 top-1/2 -translate-y-1/2 hidden sm:inline-flex items-center gap-0.5 px-1.5 py-0.5 rounded text-[10px] text-gray-500 border border-white/10 font-mono pointer-events-none">
                        ⌘K
                    </kbd>
                </div>

                <!-- Results dropdown -->
                <Transition
                    enter-active-class="transition ease-out duration-150"
                    enter-from-class="opacity-0 translate-y-1"
                    enter-to-class="opacity-100 translate-y-0"
                    leave-active-class="transition ease-in duration-100"
                    leave-from-class="opacity-100"
                    leave-to-class="opacity-0"
                >
                    <div
                        v-if="searchOpen && searchResults.length"
                        class="absolute left-0 right-0 top-full mt-2 z-50 rounded-lg border border-white/10 shadow-2xl overflow-hidden"
                        style="background-color: #1a1030;"
                    >
                        <ul>
                            <li
                                v-for="(result, i) in searchResults"
                                :key="result.slug"
                                @mousedown.prevent="navigateToResult(result)"
                                @mouseenter="searchActive = i"
                                class="flex items-start gap-3 px-4 py-3 cursor-pointer border-b border-white/5 last:border-0 transition-colors"
                                :class="searchActive === i ? 'bg-purple-600/20' : 'hover:bg-white/5'"
                            >
                                <svg class="w-4 h-4 text-purple-400 flex-shrink-0 mt-0.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                                          d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"/>
                                </svg>
                                <div class="min-w-0 flex-1">
                                    <div class="flex items-center gap-2 mb-0.5">
                                        <span class="text-sm font-medium text-gray-100" v-html="highlightQuery(result.title)" />
                                        <span class="text-[10px] px-1.5 py-0.5 rounded-full bg-purple-600/20 text-purple-400 flex-shrink-0">
                                            {{ sectionLabel(result.section) }}
                                        </span>
                                    </div>
                                    <p class="text-xs text-gray-500 line-clamp-1" v-html="highlightQuery(result.excerpt)" />
                                </div>
                                <svg class="w-3 h-3 text-gray-600 flex-shrink-0 mt-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 5l7 7-7 7"/>
                                </svg>
                            </li>
                        </ul>
                        <div class="px-4 py-2 border-t border-white/5 flex gap-3 text-[11px] text-gray-600">
                            <span><kbd class="font-mono">↑↓</kbd> navigate</span>
                            <span><kbd class="font-mono">↵</kbd> open</span>
                            <span><kbd class="font-mono">esc</kbd> close</span>
                        </div>
                    </div>
                </Transition>
            </div>

            <!-- Right: nav links -->
            <div class="flex items-center gap-3 flex-shrink-0">
                <!-- Back to admin — only shown to admin users -->
                <a
                    v-if="isAdmin"
                    href="/admin/dashboard"
                    class="hidden sm:inline-flex items-center gap-1.5 text-xs text-gray-400 hover:text-white transition px-2.5 py-1.5 rounded border border-white/10 hover:border-white/20 whitespace-nowrap"
                >
                    <svg class="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                              d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6"/>
                    </svg>
                    Admin
                </a>

                <!-- Back to site — always shown -->
                <a
                    href="/"
                    class="hidden sm:inline-flex items-center gap-1.5 text-xs text-gray-400 hover:text-white transition px-2.5 py-1.5 rounded border border-white/10 hover:border-white/20 whitespace-nowrap"
                >
                    <svg class="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                              d="M10 19l-7-7m0 0l7-7m-7 7h18"/>
                    </svg>
                    Back to site
                </a>
            </div>
        </header>

        <div class="flex flex-1 overflow-hidden">

            <!-- Left sidebar (nav) -->
            <aside
                class="w-72 flex-shrink-0 overflow-y-auto border-r border-white/10 px-4 py-6 hidden lg:block sticky top-[57px] self-start h-[calc(100vh-57px)] scrollbar-hide"
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
                    <!-- Mobile: also show the nav links here -->
                    <div class="flex gap-2 mb-6">
                        <a v-if="isAdmin" href="/admin/dashboard"
                           class="flex-1 text-center text-xs text-gray-400 hover:text-white border border-white/10 rounded px-2 py-1.5">
                            Admin panel
                        </a>
                        <a href="/"
                           class="flex-1 text-center text-xs text-gray-400 hover:text-white border border-white/10 rounded px-2 py-1.5">
                            ← Back to site
                        </a>
                    </div>
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
            <main class="flex-1 min-w-0 overflow-y-auto px-6 py-10 lg:px-16 h-[calc(100vh-57px)] scrollbar-hide">
                <div class="docs-content max-w-3xl" v-html="html"></div>
            </main>

            <!-- Right TOC panel -->
            <aside
                v-if="tocItems.length > 0"
                class="w-56 flex-shrink-0 hidden xl:block sticky top-[57px] self-start h-[calc(100vh-57px)] overflow-y-auto px-4 py-6 border-l border-white/10 scrollbar-hide"
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
.docs-content h1 { font-size: 2rem; font-weight: 700; color: #fff; margin-bottom: 0.5rem; }
.docs-content h2 { font-size: 1.375rem; font-weight: 600; color: #fff; margin-top: 2.5rem; margin-bottom: 1rem; padding-bottom: 0.5rem; border-bottom: 1px solid rgba(255,255,255,0.08); }
.docs-content h3 { font-size: 1.125rem; font-weight: 600; color: #e2e8f0; margin-top: 2rem; margin-bottom: 0.75rem; }
.docs-content p { color: #b0b7c3; line-height: 1.75; margin-bottom: 1rem; }
.docs-content a { color: #a78bfa; text-decoration: underline; }
.docs-content ul, .docs-content ol { color: #b0b7c3; padding-left: 1.5rem; margin-bottom: 1rem; line-height: 1.75; }
.docs-content ul { list-style-type: disc; }
.docs-content ol { list-style-type: decimal; }
.docs-content li { margin-bottom: 0.25rem; }
.docs-content strong { color: #e2e8f0; font-weight: 600; }
.docs-content em { color: #a78bfa; }
.docs-content code { background: rgba(167,139,250,0.1); color: #c4b5fd; padding: 0.15em 0.4em; border-radius: 4px; font-size: 0.875em; font-family: ui-monospace, monospace; }
.docs-content pre { background: rgba(0,0,0,0.4); border: 1px solid rgba(255,255,255,0.1); border-radius: 8px; padding: 1rem; overflow-x: auto; margin-bottom: 1.5rem; }
.docs-content pre code { background: none; color: #e2e8f0; padding: 0; }
.docs-content blockquote { border-left: 3px solid #6A3FF4; background: rgba(106,63,244,0.08); padding: 0.75rem 1rem; border-radius: 0 6px 6px 0; margin-bottom: 1rem; color: #c4b5fd; }
.docs-content hr { border: none; border-top: 1px solid rgba(255,255,255,0.08); margin: 2rem 0; }
.docs-content table { width: 100%; border-collapse: collapse; margin-bottom: 1.5rem; font-size: 0.9rem; }
.docs-content thead tr { border-bottom: 1px solid rgba(255,255,255,0.15); }
.docs-content th { text-align: left; padding: 0.6rem 1rem; color: #9ca3af; font-weight: 600; font-size: 0.8rem; text-transform: uppercase; letter-spacing: 0.05em; }
.docs-content td { padding: 0.6rem 1rem; color: #b0b7c3; border-bottom: 1px solid rgba(255,255,255,0.05); }
.docs-content tr:hover td { background: rgba(255,255,255,0.02); }
.docs-subtitle { font-size: 1.1rem; color: #9ca3af; margin-bottom: 2rem; }
.docs-card-grid { display: grid; grid-template-columns: repeat(auto-fill, minmax(200px, 1fr)); gap: 1rem; margin: 1.5rem 0 2rem; }
.docs-card { display: block; padding: 1.25rem; border-radius: 8px; border: 1px solid rgba(255,255,255,0.08); background: rgba(106,63,244,0.06); text-decoration: none !important; transition: border 0.2s, background 0.2s, transform 0.2s; }
.docs-card:hover { border-color: rgba(106,63,244,0.4); background: rgba(106,63,244,0.12); transform: translateY(-2px); }
.docs-card-icon { font-size: 1.5rem; margin-bottom: 0.5rem; }
.docs-card h4 { color: #e2e8f0 !important; font-size: 0.95rem !important; font-weight: 600 !important; margin: 0 0 0.4rem !important; }
.docs-card p { color: #9ca3af !important; font-size: 0.8rem !important; margin: 0 !important; line-height: 1.4 !important; }
.scrollbar-hide::-webkit-scrollbar { display: none; }
.scrollbar-hide { -ms-overflow-style: none; scrollbar-width: none; }
.docs-content .docs-columns { display: grid; grid-template-columns: 1fr 1fr; gap: 2rem; margin-top: 1rem; }
mark { background: transparent; color: #c4b5fd; font-weight: 600; }
</style>