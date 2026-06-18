<script setup lang="ts">
import { Head, router } from '@inertiajs/vue3';
import AppLayout from '@/Layouts/AppLayout.vue';
import { ref, computed, onMounted } from 'vue'
import axios from 'axios'

interface CategoryMeta {
    label: string
    color: string
    bg:    string
}

interface CommitEntry {
    source:     'commit'
    sha:        string
    title:      string
    body:       string
    category:   string
    tenants:    string[]
    date:       string
    date_label: string
    year:       number
    month:      number
    timestamp:  number
    meta:       CategoryMeta
}

interface AuthoredEntry {
    source:     'authored'
    id:         number
    title:      string
    body:       string
    type:       'update' | 'warning' | 'info'
    severity:   'low' | 'medium' | 'critical'
    category:   string
    resolved:   boolean
    date:       string
    date_label: string
    year:       number
    month:      number
    timestamp:  number
    meta:       CategoryMeta
}

type Entry = CommitEntry | AuthoredEntry

interface Props {
    initialMonths: string[]
    categories:    Record<string, CategoryMeta>
    isAdmin:       boolean
}

const props = defineProps<Props>()

const entries        = ref<Entry[]>([])
const months         = ref<string[]>(props.initialMonths)
const loading        = ref(false)
const activeMonth    = ref(props.initialMonths[0] ?? '')
const activeCategory = ref('all')

// Filter options differ by role
const categoryOptions = computed(() => {
    const base = [
        { value: 'all',         label: 'All'         },
        { value: 'feature',     label: 'Features'    },
        { value: 'improvement', label: 'Improvements'},
    ]
    if (!props.isAdmin) return base

    return [
        ...base,
        { value: 'hub',         label: 'Hub Messages'},
    ]
})

const monthHeading = computed(() => {
    if (!activeMonth.value) return ''
    const [y, m] = activeMonth.value.split('-')
    const d = new Date(Number(y), Number(m) - 1, 1)
    return d.toLocaleString('en-GB', { month: 'short' }).toUpperCase() + ' ' + y
})

function fmtMonthLabel(ym: string): string {
    const [y, m] = ym.split('-')
    const d = new Date(Number(y), Number(m) - 1, 1)
    return d.toLocaleString('en-GB', { month: 'short' }) + ' ' + y
}

function pillStyle(meta: CategoryMeta) {
    return {
        background: `rgba(${meta.bg},0.15)`,
        color:       meta.color,
        border:      `1px solid rgba(${meta.bg},0.3)`,
    }
}

async function load() {
    loading.value = true
    const params: Record<string, string> = {}
    if (activeMonth.value) {
        const [y, m] = activeMonth.value.split('-')
        params.year  = y
        params.month = m
    }
    if (activeCategory.value && activeCategory.value !== 'all') {
        params.category = activeCategory.value
    }
    try {
        const { data } = await axios.get('/changelog/data', { params })
        entries.value = data.entries
        months.value  = data.months
        if (!activeMonth.value && data.months.length) {
            activeMonth.value = data.months[0]
        }
    } catch {
        entries.value = []
    } finally {
        loading.value = false
    }
}

function selectMonth(ym: string) {
    activeMonth.value = ym
    load()
}

function selectCategory(val: string) {
    activeCategory.value = val
    load()
}

onMounted(() => load())
</script>

<template>

    <Head title="Contact Us - Competition Engine" />

    <AppLayout>

        <div class="min-h-screen" style="background:#0d0d0f;color:#ededed;font-family:-apple-system,BlinkMacSystemFont,'Segoe UI',sans-serif;">
            <div class="max-w-3xl mx-auto px-5 pb-24 pt-10">

                <!-- Hero -->
                <div class="text-center pt-20 pb-12">
                    <h1 class="text-5xl font-black tracking-tight mb-3">
                        <span style="background:linear-gradient(90deg,#818cf8,rgb(139,107,191),#f4bc72);-webkit-background-clip:text;-webkit-text-fill-color:transparent">
                            Changelog
                        </span>
                    </h1>
                </div>

                <!-- Month pills + category filter row -->
                <div class="flex flex-wrap items-center gap-2 mb-8">
                    <button
                        v-for="ym in months"
                        :key="ym"
                        class="px-4 py-1.5 rounded-full text-sm font-semibold transition-colors"
                        :style="activeMonth === ym
                            ? { background: 'rgb(139,107,191)', color: '#0d0d0f' }
                            : { background: '#1a1a1f', color: '#9ca3af' }"
                        @click="selectMonth(ym)"
                    >
                        {{ fmtMonthLabel(ym) }}
                    </button>

                    <div class="w-px h-5 hidden sm:block" style="background:rgba(255,255,255,0.1)"></div>

                    <!-- Category filter pills -->
                    <button
                        v-for="opt in categoryOptions"
                        :key="opt.value"
                        class="px-4 py-1.5 rounded-full text-sm font-semibold transition-colors border"
                        :style="activeCategory === opt.value
                            ? { background: 'rgba(139,107,191,0.2)', color: 'rgb(139,107,191)', borderColor: 'rgba(139,107,191,0.4)' }
                            : { background: 'transparent', color: '#6b7280', borderColor: 'rgba(255,255,255,0.08)' }"
                        @click="selectCategory(opt.value)"
                    >
                        {{ opt.label }}
                    </button>
                </div>

                <!-- Month heading -->
                <div class="flex items-baseline justify-between mb-5">
                    <h2 class="text-xs font-bold tracking-widest uppercase" style="color:#6b7280">
                        {{ monthHeading }}
                    </h2>
                    <span class="text-xs" style="color:#4b5563">{{ entries.length }} updates</span>
                </div>

                <!-- Loading -->
                <div v-if="loading" class="flex justify-center py-16">
                    <div class="w-5 h-5 rounded-full animate-spin"
                        style="border:2px solid rgba(255,255,255,0.1);border-top-color:white"></div>
                </div>

                <!-- Empty -->
                <div v-else-if="!entries.length" class="text-center py-20" style="color:#4b5563">
                    No updates yet.
                </div>

                <!-- Entries -->
                <div v-else class="relative pl-8">
                    <div class="absolute left-0 top-0 bottom-0 w-px" style="background:rgba(255,255,255,0.06)"></div>

                    <template v-for="(entry, i) in entries" :key="'sha' in entry ? entry.sha : entry.id">

                        <!-- Authored notice -->
                        <div
                            v-if="entry.source === 'authored'"
                            class="mb-4 p-5 rounded-2xl border changelog-card"
                            style="background:#111317;border-color:rgba(255,255,255,0.07)"
                            :class="i < 10 ? 'fade-up' : ''"
                            :style="{ animationDelay: `${i * 25}ms` }"
                        >
                            <div class="flex flex-wrap items-center gap-2 mb-3">
                                <span
                                    class="pill"
                                    style="background:rgba(139,107,191,0.15);color:rgb(139,107,191);border:1px solid rgba(139,107,191,0.3)"
                                >Notice</span>
                                <span class="pill" :style="pillStyle(entry.meta)">
                                    {{ entry.meta.label }}
                                </span>
                                <span
                                    v-if="(entry as AuthoredEntry).resolved"
                                    class="pill"
                                    style="background:rgba(34,197,94,0.12);color:#4ade80;border:1px solid rgba(34,197,94,0.25)"
                                >Resolved</span>
                                <span class="flex-1"></span>
                                <span class="text-xs" style="color:#6b7280">{{ entry.date_label }}</span>
                            </div>
                            <h3 class="text-base font-semibold mb-1.5 leading-snug" style="color:#ededed">{{ entry.title }}</h3>
                            <p v-if="entry.body" class="text-sm leading-relaxed" style="color:#9ca3af">{{ entry.body }}</p>
                        </div>

                        <!-- Commit entry -->
                        <div
                            v-else-if="entry.source === 'commit'"
                            class="mb-4 p-5 rounded-2xl border changelog-card"
                            style="background:#111317;border-color:rgba(255,255,255,0.07)"
                            :class="i < 10 ? 'fade-up' : ''"
                            :style="{ animationDelay: `${i * 25}ms` }"
                        >
                            <div class="flex flex-wrap items-center gap-2 mb-3">
                                <span class="pill" :style="pillStyle(entry.meta)">{{ entry.meta.label }}</span>
                                <template v-if="(entry as CommitEntry).tenants">
                                    <span
                                        v-for="t in (entry as CommitEntry).tenants.filter(t => t !== 'all')"
                                        :key="t"
                                        class="pill"
                                        style="background:rgba(91,141,238,0.1);color:#7fa8f5;border:1px solid rgba(91,141,238,0.22)"
                                    >{{ t }}</span>
                                </template>
                                <span class="flex-1"></span>
                                <span class="text-xs" style="color:#6b7280">{{ entry.date_label }}</span>
                            </div>
                            <h3 class="text-base font-semibold mb-1.5 leading-snug" style="color:#ededed">{{ entry.title }}</h3>
                            <p v-if="entry.body" class="text-sm leading-relaxed" style="color:#9ca3af">{{ entry.body }}</p>
                        </div>

                    </template>
                </div>

            </div>
        </div>
    </AppLayout>
</template>

<style scoped>
.pill {
    display: inline-flex;
    align-items: center;
    padding: 3px 10px;
    border-radius: 999px;
    font-size: 11px;
    font-weight: 600;
    letter-spacing: .04em;
}
@keyframes fadeUp {
    from { opacity: 0; transform: translateY(6px); }
    to   { opacity: 1; transform: translateY(0); }
}
.fade-up { animation: fadeUp .25s ease both; }

.changelog-card {
    transition: transform .18s ease, background .18s ease, border-color .18s ease;
    cursor: default;
}
.changelog-card:hover {
    transform: scale(1.01);
    background: #161a1f !important;
    border-color: rgba(255,255,255,0.13) !important;
}
</style>