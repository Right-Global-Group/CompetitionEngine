<script setup>
import { useForm, Head } from '@inertiajs/vue3';

const form = useForm({ password: '' });

const submit = () => {
    form.post(route('docs.unlock'), {
        onFinish: () => form.reset('password'),
    });
};
</script>

<template>
    <Head title="Documentation" />

    <div class="min-h-screen flex items-center justify-center" style="background-color: #1B142C;">
        <div class="w-full max-w-sm px-6">
            <div class="text-center mb-8">
                <h1 class="text-2xl font-bold text-white">Documentation</h1>
                <p class="text-gray-400 mt-2 text-sm">Enter the password to access the help center.</p>
            </div>

            <form @submit.prevent="submit" class="space-y-4">
                <div>
                    <input
                        v-model="form.password"
                        type="password"
                        placeholder="Password"
                        autofocus
                        class="w-full px-4 py-3 rounded-lg bg-white/10 border border-white/20 text-white placeholder-gray-400 focus:outline-none focus:border-purple-500 focus:ring-1 focus:ring-purple-500"
                    />
                    <p v-if="form.errors.password" class="text-red-400 text-sm mt-2">
                        {{ form.errors.password }}
                    </p>
                </div>

                <button
                    type="submit"
                    :disabled="form.processing"
                    class="w-full py-3 px-4 rounded-lg font-semibold text-white transition"
                    style="background-color: #6A3FF4;"
                    :class="{ 'opacity-50 cursor-not-allowed': form.processing }"
                >
                    {{ form.processing ? 'Checking...' : 'Continue' }}
                </button>
            </form>
        </div>
    </div>
</template>