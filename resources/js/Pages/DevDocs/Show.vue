<script setup>
import { Head, Link } from '@inertiajs/vue3';
import { ref, onMounted, watch } from 'vue';

const props = defineProps({
    html:        String,
    nav:         Array,
    currentSlug: String,
    title:       String,
});

const tocItems    = ref([]);
const activeHeading = ref('');

const scrollToHeading = (id) => {
    const el   = document.getElementById(id);
    const main = document.querySelector('.dev-docs-main');
    if (!el || !main) return;
    main.scrollBy({ top: el.getBoundingClientRect().top - main.getBoundingClientRect().top - 30, behavior: 'smooth' });
    activeHeading.value = id;
};

const handleScroll = (e) => {
    const headings = tocItems.value.map(item => document.getElementById(item.id)).filter(Boolean);
    let current = '';
    for (const h of headings) {
        if (h.getBoundingClientRect().top <= 120) current = h.id;
    }
    if (current) activeHeading.value = current;
};

const buildToc = () => {
    const container = document.querySelector('.dev-docs-content');
    if (!container) return;
    const headings = container.querySelectorAll('h2, h3');
    if (headings.length === 0) { setTimeout(buildToc, 100); return; }
    tocItems.value = Array.from(headings).map((h, i) => {
        if (!h.id) h.id = `h-${i}`;
        return { id: h.id, text: h.textContent, level: h.tagName === 'H2' ? 2 : 3 };
    });
};

onMounted(() => {
    setTimeout(buildToc, 200);
    const main = document.querySelector('.dev-docs-main');
    if (main) main.addEventListener('scroll', handleScroll);
});

watch(() => props.html, () => {
    tocItems.value = [];
    setTimeout(buildToc, 200);
});
</script>

<template>
    <Head :title="`${title} — Developer Docs`" />

    <div class="dev-docs-shell">

        <!-- Top bar -->
        <header class="dev-docs-header">
            <div class="dev-docs-header-left">
                <span class="dev-docs-logo">🔒 Developer Docs</span>
            </div>
            <div class="dev-docs-header-right">
                <a href="/admin" class="dev-docs-nav-link">← Admin panel</a>
                <a href="/" class="dev-docs-nav-link">Back to site</a>
            </div>
        </header>

        <div class="dev-docs-body">

            <!-- Sidebar -->
            <aside class="dev-docs-sidebar">
                <p class="dev-docs-sidebar-title">Developer Docs</p>
                <ul>
                    <li v-for="item in nav" :key="item.slug">
                        <Link
                            :href="route('dev-docs.show', { slug: item.slug })"
                            class="dev-docs-sidebar-link"
                            :class="{ active: currentSlug === item.slug }"
                        >
                            {{ item.title }}
                        </Link>
                    </li>
                </ul>
            </aside>

            <!-- Main content -->
            <main class="dev-docs-main">
                <div class="dev-docs-content" v-html="html"></div>
            </main>

            <!-- TOC -->
            <aside v-if="tocItems.length > 0" class="dev-docs-toc">
                <p class="dev-docs-toc-title">On this page</p>
                <ul>
                    <li v-for="item in tocItems" :key="item.id">
                        <button
                            @click="scrollToHeading(item.id)"
                            class="dev-docs-toc-link"
                            :class="[item.level === 3 ? 'pl-3' : '', activeHeading === item.id ? 'active' : '']"
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
/* ─── Shell ─────────────────────────────────────────────────────── */
.dev-docs-shell {
    min-height: 100vh;
    display: flex;
    flex-direction: column;
    background: #f6f8fb;
    color: #1c2530;
    font: 16px/1.65 -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, Helvetica, Arial, sans-serif;
    -webkit-font-smoothing: antialiased;
}

/* ─── Header ─────────────────────────────────────────────────────── */
.dev-docs-header {
    position: sticky; top: 0; z-index: 30;
    display: flex; align-items: center; justify-content: space-between;
    gap: 16px;
    padding: 12px 24px;
    background: #fff;
    border-bottom: 1px solid #e3e8ef;
}
.dev-docs-header-left { display: flex; align-items: center; gap: 12px; }
.dev-docs-logo { font-weight: 700; font-size: 1rem; color: #1c2530; }
.dev-docs-badge {
    font-size: 11px; font-weight: 700; letter-spacing: .04em; text-transform: uppercase;
    background: #eaf1ff; color: #2f6df6;
    padding: 3px 10px; border-radius: 999px; border: 1px solid #cfe0ff;
}
.dev-docs-header-right { display: flex; gap: 12px; }
.dev-docs-nav-link {
    font-size: 13px; color: #5b6776; text-decoration: none;
    padding: 5px 12px; border-radius: 6px; border: 1px solid #e3e8ef;
    transition: background .15s, color .15s;
}
.dev-docs-nav-link:hover { background: #f0f3f8; color: #1c2530; }

/* ─── Body layout ─────────────────────────────────────────────────── */
.dev-docs-body {
    flex: 1; display: flex; overflow: hidden;
}

/* ─── Left sidebar ─────────────────────────────────────────────────── */
.dev-docs-sidebar {
    width: 220px; flex-shrink: 0;
    padding: 24px 16px;
    background: #fff;
    border-right: 1px solid #e3e8ef;
    overflow-y: auto;
    position: sticky; top: 57px; align-self: flex-start;
    height: calc(100vh - 57px);
}
.dev-docs-sidebar-title {
    font-size: 11px; font-weight: 700; text-transform: uppercase; letter-spacing: .08em;
    color: #5b6776; margin: 0 0 10px 8px;
}
.dev-docs-sidebar ul { list-style: none; padding: 0; margin: 0; }
.dev-docs-sidebar li + li { margin-top: 2px; }
.dev-docs-sidebar-link {
    display: block; padding: 7px 12px; border-radius: 6px;
    font-size: 14px; color: #5b6776; text-decoration: none;
    transition: background .15s, color .15s;
}
.dev-docs-sidebar-link:hover { background: #f0f3f8; color: #1c2530; }
.dev-docs-sidebar-link.active { background: #eaf1ff; color: #2f6df6; font-weight: 600; }

/* ─── Main content ─────────────────────────────────────────────────── */
.dev-docs-main {
    flex: 1; min-width: 0;
    overflow-y: auto;
    padding: 40px 48px 80px;
    height: calc(100vh - 57px);
}

/* ─── Right TOC ─────────────────────────────────────────────────────── */
.dev-docs-toc {
    width: 200px; flex-shrink: 0;
    padding: 24px 16px;
    border-left: 1px solid #e3e8ef;
    overflow-y: auto;
    position: sticky; top: 57px; align-self: flex-start;
    height: calc(100vh - 57px);
}
.dev-docs-toc-title {
    font-size: 11px; font-weight: 700; text-transform: uppercase; letter-spacing: .08em;
    color: #5b6776; margin: 0 0 10px;
}
.dev-docs-toc ul { list-style: none; padding: 0; margin: 0; }
.dev-docs-toc li + li { margin-top: 2px; }
.dev-docs-toc-link {
    display: block; width: 100%; text-align: left;
    padding: 4px 0; font-size: 13px; color: #5b6776;
    background: none; border: none; cursor: pointer;
    transition: color .15s;
    line-height: 1.4;
}
.dev-docs-toc-link:hover, .dev-docs-toc-link.active { color: #2f6df6; }
.dev-docs-toc-link.pl-3 { padding-left: 12px; }

/* ─── Markdown content styles (light theme) ─────────────────────────── */
.dev-docs-content { max-width: 760px; }
.dev-docs-content h1 {
    font-size: 2rem; font-weight: 700; color: #1c2530;
    margin: 0 0 6px; letter-spacing: -.02em; line-height: 1.2;
}
.dev-docs-content h2 {
    font-size: 1.375rem; font-weight: 700; color: #1c2530;
    margin: 2.5rem 0 0.875rem; padding-top: 1.125rem;
    border-top: 2px solid #e3e8ef; letter-spacing: -.01em;
}
.dev-docs-content h3 {
    font-size: 1.1rem; font-weight: 600; color: #1c2530;
    margin: 1.5rem 0 0.5rem;
}
.dev-docs-content p { color: #1c2530; line-height: 1.7; margin: 0.75rem 0; }
.dev-docs-content a { color: #2f6df6; text-decoration: none; }
.dev-docs-content a:hover { text-decoration: underline; }
.dev-docs-content ul, .dev-docs-content ol { color: #1c2530; padding-left: 1.5rem; margin: 0.75rem 0; line-height: 1.75; }
.dev-docs-content ul { list-style-type: disc; }
.dev-docs-content ol { list-style-type: decimal; }
.dev-docs-content li { margin-bottom: 0.25rem; }
.dev-docs-content strong { color: #1c2530; font-weight: 700; }
.dev-docs-content em { color: #5b6776; font-style: italic; }
.dev-docs-content code {
    background: #eef1f6; color: #2a3442;
    padding: .12em .4em; border-radius: 5px;
    font: 14px/1.4 ui-monospace, SFMono-Regular, Menlo, Consolas, monospace;
}
.dev-docs-content pre {
    background: #0f1b2d; color: #e7eefc;
    border-radius: 12px; padding: 18px 20px;
    overflow-x: auto; margin: 1rem 0;
    font: 13.5px/1.7 ui-monospace, SFMono-Regular, Menlo, Consolas, monospace;
}
.dev-docs-content pre code { background: none; color: inherit; padding: 0; font-size: inherit; }
.dev-docs-content blockquote {
    background: #eaf1ff; border: 1px solid #cfe0ff;
    border-radius: 10px; padding: 14px 18px;
    margin: 1rem 0; color: #1c2530;
}
.dev-docs-content blockquote p { margin: 4px 0; }
.dev-docs-content hr { border: none; border-top: 2px solid #e3e8ef; margin: 2rem 0; }
.dev-docs-content table {
    border-collapse: collapse; width: 100%; margin: 1rem 0;
    font-size: 14.5px; background: #fff;
    border: 1px solid #e3e8ef; border-radius: 12px; overflow: hidden;
}
.dev-docs-content th {
    text-align: left; padding: 10px 14px;
    background: #f0f3f8; font-size: 12px; letter-spacing: .03em;
    text-transform: uppercase; color: #5b6776; font-weight: 600;
    border-bottom: 1px solid #e3e8ef;
}
.dev-docs-content td {
    padding: 10px 14px; color: #1c2530;
    border-bottom: 1px solid #e3e8ef; vertical-align: top;
}
.dev-docs-content tr:last-child td { border-bottom: none; }
.dev-docs-content td code { white-space: nowrap; }
</style>
