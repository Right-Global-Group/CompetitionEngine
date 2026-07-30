<script setup>
import { useForm, Head } from '@inertiajs/vue3';

const form = useForm({ password: '' });

const submit = () => {
    form.post(route('dev-docs.unlock'), {
        onFinish: () => form.reset('password'),
    });
};
</script>

<template>
    <Head title="Developer Docs" />

    <div class="min-h-screen flex items-center justify-center" style="background-color: #f6f8fb;">
        <div class="w-full max-w-sm px-6">
            <div class="text-center mb-8">
                <div style="font-size: 2rem; margin-bottom: 12px;">🔒</div>
                <h1 class="text-2xl font-bold" style="color: #1c2530;">Developer Docs</h1>
                <p style="color: #5b6776; margin-top: 8px; font-size: 0.9rem;">
                    This area is restricted to super-super-admins.<br>Enter the developer docs password to continue.
                </p>
            </div>

            <form @submit.prevent="submit" class="space-y-4">
                <div>
                    <input
                        v-model="form.password"
                        type="password"
                        placeholder="Password"
                        autofocus
                        style="width:100%; padding:12px 16px; border-radius:8px; border:1px solid #e3e8ef; background:#fff; color:#1c2530; font-size:1rem; outline:none; transition:border 0.2s;"
                        :style="form.errors.password ? 'border-color:#ef4444;' : ''"
                    />
                    <p v-if="form.errors.password" style="color:#ef4444; font-size:0.85rem; margin-top:6px;">
                        {{ form.errors.password }}
                    </p>
                </div>

                <button
                    type="submit"
                    :disabled="form.processing"
                    style="width:100%; padding:12px 16px; border-radius:8px; background:#2f6df6; color:#fff; font-size:1rem; font-weight:600; border:none; cursor:pointer; transition:opacity 0.2s;"
                    :style="form.processing ? 'opacity:0.5; cursor:not-allowed;' : ''"
                >
                    {{ form.processing ? 'Checking…' : 'Continue' }}
                </button>
            </form>
        </div>
    </div>
</template>
