<script setup>
import { Head } from '@inertiajs/vue3';
</script>

<template>
    <Head title="Developer Docs" />

    <div class="min-h-screen flex flex-col" style="background-color: #0f0a1e; color: #e5e7eb;">
        <header
            class="sticky top-0 z-30 flex items-center gap-4 px-6 py-3 border-b border-white/10"
            style="background-color: rgba(15, 10, 30, 0.95); backdrop-filter: blur(10px);"
        >
            <span class="text-white font-bold text-lg">Developer Docs</span>
            <div class="flex-1"></div>
            <a
                href="/admin"
                class="hidden sm:inline-flex items-center gap-1.5 text-xs text-gray-400 hover:text-white transition px-2.5 py-1.5 rounded border border-white/10 hover:border-white/20"
            >
                Admin
            </a>
        </header>

        <div class="flex flex-1 items-center justify-center text-gray-500 text-sm">
            Developer documentation coming soon.
        </div>
    </div>
</template>
