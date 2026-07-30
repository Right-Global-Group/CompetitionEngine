<script setup>
const props = defineProps({
    blocks: {
        type: Array,
        default: () => [],
    },
});
</script>

<template>
    <div class="blog-content">
        <template v-for="block in blocks" :key="block.id">
            <!-- Header -->
            <h1 v-if="block.type === 'header' && block.data.level === 1" class="blog-h1">{{ block.data.text }}</h1>
            <h2 v-else-if="block.type === 'header' && block.data.level === 2" class="blog-h2">{{ block.data.text }}</h2>
            <h3 v-else-if="block.type === 'header' && block.data.level === 3" class="blog-h3">{{ block.data.text }}</h3>
            <h4 v-else-if="block.type === 'header' && block.data.level === 4" class="blog-h4">{{ block.data.text }}</h4>

            <!-- Paragraph -->
            <p v-else-if="block.type === 'paragraph'" class="blog-p" v-html="block.data.text"></p>

            <!-- List -->
            <ul v-else-if="block.type === 'list' && block.data.style === 'unordered'" class="blog-ul">
                <li v-for="(item, i) in block.data.items" :key="i" v-html="item"></li>
            </ul>
            <ol v-else-if="block.type === 'list' && block.data.style === 'ordered'" class="blog-ol">
                <li v-for="(item, i) in block.data.items" :key="i" v-html="item"></li>
            </ol>

            <!-- Quote -->
            <blockquote v-else-if="block.type === 'quote'" class="blog-quote">
                <p v-html="block.data.text"></p>
                <cite v-if="block.data.caption">{{ block.data.caption }}</cite>
            </blockquote>

            <!-- Delimiter -->
            <hr v-else-if="block.type === 'delimiter'" class="blog-hr" />

            <!-- Code -->
            <pre v-else-if="block.type === 'code'" class="blog-code"><code>{{ block.data.code }}</code></pre>

            <!-- Image -->
            <figure v-else-if="block.type === 'image'" class="blog-image">
                <img :src="block.data.file?.url" :alt="block.data.caption || ''" />
                <figcaption v-if="block.data.caption">{{ block.data.caption }}</figcaption>
            </figure>
        </template>
    </div>
</template>

<style scoped>
.blog-content { color: #d1d5db; line-height: 1.75; }
.blog-h1 { font-size: 2rem; font-weight: 800; color: #fff; margin: 2rem 0 1rem; }
.blog-h2 { font-size: 1.5rem; font-weight: 700; color: #fff; margin: 1.75rem 0 0.75rem; }
.blog-h3 { font-size: 1.25rem; font-weight: 700; color: #fff; margin: 1.5rem 0 0.5rem; }
.blog-h4 { font-size: 1.1rem; font-weight: 600; color: #e5e7eb; margin: 1.25rem 0 0.5rem; }
.blog-p { margin: 1rem 0; }
.blog-ul { list-style: disc; padding-left: 1.5rem; margin: 1rem 0; }
.blog-ol { list-style: decimal; padding-left: 1.5rem; margin: 1rem 0; }
.blog-ul li, .blog-ol li { margin: 0.25rem 0; }
.blog-quote { border-left: 3px solid #6A3FF4; padding: 0.75rem 1.25rem; margin: 1.5rem 0; background: rgba(106,63,244,0.1); border-radius: 0 0.5rem 0.5rem 0; }
.blog-quote cite { display: block; font-size: 0.875rem; color: #9ca3af; margin-top: 0.5rem; }
.blog-hr { border: none; border-top: 1px solid #374151; margin: 2rem 0; }
.blog-code { background: #111827; border: 1px solid #374151; border-radius: 0.5rem; padding: 1rem; overflow-x: auto; font-family: monospace; font-size: 0.875rem; margin: 1rem 0; }
.blog-image { margin: 1.5rem 0; }
.blog-image img { max-width: 100%; border-radius: 0.5rem; }
.blog-image figcaption { text-align: center; font-size: 0.875rem; color: #9ca3af; margin-top: 0.5rem; }
</style>
