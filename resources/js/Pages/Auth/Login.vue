<script setup>
    import Checkbox from '@/Components/Checkbox.vue';
    import GuestLayout from '@/Layouts/GuestLayout.vue';
    import InputError from '@/Components/InputError.vue';
    import InputLabel from '@/Components/InputLabel.vue';
    import PrimaryButton from '@/Components/PrimaryButton.vue';
    import TextInput from '@/Components/TextInput.vue';
    import { Head, Link, useForm } from '@inertiajs/vue3';
    
    defineProps({
        canResetPassword: {
            type: Boolean,
        },
        status: {
            type: String,
        },
    });
    
    const form = useForm({
        email: '',
        password: '',
        remember: false,
    });
    
    const submit = () => {
        form.post(route('login'), {
            onFinish: () => form.reset('password'),
        });
    };
    </script>
    
    <template>
        <GuestLayout>
            <Head title="Log in" />
    
            <div v-if="status" class="mb-4 text-sm font-medium text-green-600">
                {{ status }}
            </div>
    
            <!-- Homepage Link -->
            <div class="mb-4">
                <Link
                    href="/"
                    class="inline-flex items-center gap-2 text-sm text-gray-600 hover:text-gray-900 transition"
                >
                    <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M10 19l-7-7m0 0l7-7m-7 7h18"></path>
                    </svg>
                    Back to Homepage
                </Link>
            </div>
    
            <form @submit.prevent="submit">
                <div>
                    <InputLabel for="email" value="Email" />
    
                    <TextInput
                        id="email"
                        type="email"
                        class="mt-1 block w-full text-gray-900"
                        v-model="form.email"
                        required
                        autofocus
                        autocomplete="username"
                    />
    
                    <InputError class="mt-2" :message="form.errors?.email" />
                </div>
    
                <div class="mt-4">
                    <InputLabel for="password" value="Password" />
    
                    <TextInput
                        id="password"
                        type="password"
                        class="mt-1 block w-full text-gray-900"
                        v-model="form.password"
                        required
                        autocomplete="current-password"
                    />
    
                    <InputError class="mt-2" :message="form.errors?.password" />
                </div>
    
                <div class="mt-4 block">
                    <label class="flex items-center">
                        <Checkbox name="remember" v-model:checked="form.remember" />
                        <span class="ms-2 text-sm text-gray-600">Remember me</span>
                    </label>
                </div>
    
                <div class="mt-4 flex items-center justify-end">
                    <Link
                        v-if="canResetPassword"
                        :href="route('password.request')"
                        class="rounded-md text-sm text-gray-600 underline hover:text-gray-900 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2"
                    >
                        Forgot your password?
                    </Link>
    
                    <PrimaryButton
                        class="ms-4"
                        :class="{ 'opacity-25': form.processing }"
                        :disabled="form.processing"
                    >
                        Log in
                    </PrimaryButton>
                </div>
            </form>
        </GuestLayout>
    </template>