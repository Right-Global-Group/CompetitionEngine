<script setup>
import { Head, router } from '@inertiajs/vue3';
import AppLayout from '@/Layouts/AppLayout.vue';
import { onMounted, inject, computed, ref } from 'vue';
import * as THREE from 'three';
import { gsap } from 'gsap';
import axios from 'axios';

const getText = inject('getText', (key, fallback = '') => fallback);
const siteTexts = inject('siteTexts');

// Get heading parts
const heroHeadingParts = computed(() => {
    const parts = [];
    
    const before = getText('contact.hero_heading_before', 'Let\'s');
    const keyword = getText('contact.hero_heading_keyword', 'Connect');
    const after = getText('contact.hero_heading_after', '');
    
    if (before && before.trim()) {
        parts.push({ text: before + ' ', isKeyword: false });
    }
    
    if (keyword && keyword.trim()) {
        parts.push({ text: keyword, isKeyword: true });
    }
    
    if (after && after.trim()) {
        parts.push({ text: ' ' + after, isKeyword: false });
    }
    
    return parts;
});

const form = ref({
    first_name: '',
    last_name: '',
    email: '',
    phone: '',
    message: ''
});

const showSuccess = ref(false);
const isSubmitting = ref(false);
const errorMessage = ref('');

const submitForm = async () => {
    if (isSubmitting.value) return;
    
    errorMessage.value = '';
    isSubmitting.value = true;

    try {
        const response = await axios.post('/api/contact', form.value);
        
        if (response.data.success) {
            showSuccess.value = true;
            form.value = {
                first_name: '',
                last_name: '',
                email: '',
                phone: '',
                message: ''
            };
            
            setTimeout(() => {
                showSuccess.value = false;
            }, 5000);
        }
    } catch (error) {
        console.error('Error submitting form:', error);
        errorMessage.value = error.response?.data?.message || 'There was an error submitting your message. Please try again.';
    } finally {
        isSubmitting.value = false;
    }
};

onMounted(() => {
    // Three.js background particles
    const canvas = document.getElementById('hero-canvas');
    if (!canvas) return;

    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
    const renderer = new THREE.WebGLRenderer({ canvas, alpha: true });
    renderer.setSize(window.innerWidth, window.innerHeight);

    const geometry = new THREE.BufferGeometry();
    const vertices = [];
    for (let i = 0; i < 1000; i++) {
        vertices.push(Math.random() * 2000 - 1000, Math.random() * 2000 - 1000, Math.random() * 2000 - 1000);
    }
    geometry.setAttribute('position', new THREE.Float32BufferAttribute(vertices, 3));
    const material = new THREE.PointsMaterial({ color: 0x6A3FF4, size: 2, transparent: true, opacity: 0.5 });
    const particles = new THREE.Points(geometry, material);
    scene.add(particles);

    camera.position.z = 500;

    function animate() {
        requestAnimationFrame(animate);
        particles.rotation.y += 0.0005;
        renderer.render(scene, camera);
    }
    animate();

    window.addEventListener('resize', () => {
        camera.aspect = window.innerWidth / window.innerHeight;
        camera.updateProjectionMatrix();
        renderer.setSize(window.innerWidth, window.innerHeight);
    });

    // Mouse Follower
    const mouseFollower = document.getElementById('mouse-follower');
    if (mouseFollower) {
        window.addEventListener('mousemove', e => {
            gsap.to(mouseFollower, {
                x: e.clientX,
                y: e.clientY,
                duration: 0.8,
                ease: "power2.out"
            });
        });
    }
});
</script>

<template>
    <Head title="Contact Us - Competition Engine" />

    <AppLayout>
        <div class="contact-page">
            <div class="blob-container">
                <div class="blob blob1"></div>
                <div class="blob blob2"></div>
            </div>
            <div id="mouse-follower"></div>

            <main class="pt-32 pb-20">
                <canvas id="hero-canvas" class="hero-bg"></canvas>

                <div class="container mx-auto px-6 relative z-10">
                    <!-- Header Text -->
                    <div class="text-center mb-16">
                        <h1 class="text-5xl md:text-7xl font-extrabold text-white mb-4">
                            <template v-for="(part, index) in heroHeadingParts" :key="`hero-heading-${index}`">
                                <span v-if="part.isKeyword" class="keyword-animate">{{ part.text }}</span>
                                <template v-else>{{ part.text }}</template>
                            </template>
                        </h1>
                        <p class="text-xl text-gray-400 max-w-2xl mx-auto">
                            {{ getText('contact.hero_description', 'Have questions about scaling your competition? Our experts are here to help you build the ultimate engagement machine.') }}
                        </p>
                    </div>

                    <div class="grid grid-cols-1 lg:grid-cols-2 gap-12 items-start">
                        
                        <!-- Contact Info Cards -->
                        <div class="space-y-6">
                            <!-- Email Card -->
                            <div class="liquid-glass p-8 rounded-2xl flex items-start space-x-6">
                                <div class="bg-[#6A3FF4]/20 p-4 rounded-xl flex-shrink-0">
                                    <svg class="w-8 h-8 text-[#6A3FF4]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"/>
                                    </svg>
                                </div>
                                <div>
                                    <h3 class="text-xl font-bold text-white mb-1">
                                        {{ getText('contact.email_title', 'Email Us') }}
                                    </h3>
                                    <p class="text-gray-400">
                                        {{ getText('contact.email_subtitle', 'for all enquires please use the below email') }}
                                    </p>
                                    <a :href="`mailto:${getText('contact.email_address', 'contact@compengine.io')}`" class="text-[#FF9900] font-semibold hover:underline block mt-2">
                                        {{ getText('contact.email_address', 'contact@compengine.io') }}
                                    </a>
                                </div>
                            </div>

                            <!-- Location Card -->
                            <div class="liquid-glass p-8 rounded-2xl flex items-start space-x-6">
                                <div class="bg-[#FF9900]/20 p-4 rounded-xl flex-shrink-0">
                                    <svg class="w-8 h-8 text-[#FF9900]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z"/>
                                        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 11a3 3 0 11-6 0 3 3 0 016 0z"/>
                                    </svg>
                                </div>
                                <div>
                                    <h3 class="text-xl font-bold text-white mb-1">
                                        {{ getText('contact.location_title', 'Location') }}
                                    </h3>
                                    <p class="text-gray-400">
                                        {{ getText('contact.location_subtitle', 'Visit us for a coffee and a demo') }}
                                    </p>
                                    <address class="not-italic text-white mt-2">
                                        {{ getText('contact.location_city', 'Manchester') }}
                                    </address>
                                </div>
                            </div>

                            <!-- Live Chat Card -->
                            <div class="liquid-glass p-8 rounded-2xl flex items-start space-x-6">
                                <div class="bg-[#6A3FF4]/20 p-4 rounded-xl flex-shrink-0">
                                    <svg class="w-8 h-8 text-[#6A3FF4]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z"/>
                                    </svg>
                                </div>
                                <div>
                                    <h3 class="text-xl font-bold text-white mb-1">
                                        {{ getText('contact.chat_title', 'Live Chat') }}
                                    </h3>
                                    <p class="text-gray-400">
                                        {{ getText('contact.chat_subtitle', 'Available Mon-Fri, 9am - 6pm') }}
                                    </p>
                                    <button class="text-[#FF9900] font-semibold hover:underline block mt-2">
                                        {{ getText('contact.chat_button', 'Start a conversation') }}
                                    </button>
                                </div>
                            </div>
                        </div>

                        <!-- Form Section -->
                        <div class="liquid-glass p-8 md:p-12 rounded-3xl relative overflow-hidden">
                            <div v-if="showSuccess" class="bg-green-500/20 border border-green-500 text-green-200 p-4 rounded-xl mb-6 text-center">
                                {{ getText('contact.form_success', 'Thanks for reaching out! We\'ll be in touch shortly.') }}
                            </div>

                            <div v-if="errorMessage" class="bg-red-500/20 border border-red-500 text-red-200 p-4 rounded-xl mb-6 text-center">
                                {{ errorMessage }}
                            </div>

                            <form @submit.prevent="submitForm" class="space-y-6">
                                <div class="grid grid-cols-1 md:grid-cols-2 gap-6">
                                    <div class="space-y-2">
                                        <label class="text-sm font-medium text-gray-400">
                                            {{ getText('contact.form_first_name', 'First Name') }} <span class="text-pink-500">*</span>
                                        </label>
                                        <input 
                                            v-model="form.first_name"
                                            type="text" 
                                            required 
                                            :placeholder="getText('contact.form_first_name_placeholder', 'John')" 
                                            class="contact-input w-full px-4 py-3 rounded-xl focus:ring-2 focus:ring-[#6A3FF4] transition-all">
                                    </div>
                                    <div class="space-y-2">
                                        <label class="text-sm font-medium text-gray-400">
                                            {{ getText('contact.form_last_name', 'Last Name') }} <span class="text-pink-500">*</span>
                                        </label>
                                        <input 
                                            v-model="form.last_name"
                                            type="text" 
                                            required 
                                            :placeholder="getText('contact.form_last_name_placeholder', 'Doe')" 
                                            class="contact-input w-full px-4 py-3 rounded-xl focus:ring-2 focus:ring-[#6A3FF4] transition-all">
                                    </div>
                                </div>

                                <div class="grid grid-cols-1 md:grid-cols-2 gap-6">
                                    <div class="space-y-2">
                                        <label class="text-sm font-medium text-gray-400">
                                            {{ getText('contact.form_email', 'Email Address') }} <span class="text-pink-500">*</span>
                                        </label>
                                        <input 
                                            v-model="form.email"
                                            type="email" 
                                            required 
                                            :placeholder="getText('contact.form_email_placeholder', 'john@company.com')" 
                                            class="contact-input w-full px-4 py-3 rounded-xl focus:ring-2 focus:ring-[#6A3FF4] transition-all">
                                    </div>
                                    <div class="space-y-2">
                                        <label class="text-sm font-medium text-gray-400">
                                            {{ getText('contact.form_phone', 'Phone Number') }} <span class="text-pink-500">*</span>
                                        </label>
                                        <input 
                                            v-model="form.phone"
                                            type="tel" 
                                            required 
                                            :placeholder="getText('contact.form_phone_placeholder', '+44 0000 000000')" 
                                            class="contact-input w-full px-4 py-3 rounded-xl focus:ring-2 focus:ring-[#6A3FF4] transition-all">
                                    </div>
                                </div>

                                <div class="space-y-2">
                                    <label class="text-sm font-medium text-gray-400">
                                        {{ getText('contact.form_message', 'Message') }} <span class="text-pink-500">*</span>
                                    </label>
                                    <textarea 
                                        v-model="form.message"
                                        rows="5" 
                                        required 
                                        :placeholder="getText('contact.form_message_placeholder', 'How can we help your competition business grow?')" 
                                        class="contact-input w-full px-4 py-3 rounded-xl focus:ring-2 focus:ring-[#6A3FF4] transition-all"></textarea>
                                </div>

                                <button 
                                    type="submit" 
                                    :disabled="isSubmitting"
                                    class="w-full bg-[#6A3FF4] text-white font-bold py-4 rounded-xl hover:bg-[#FF9900] transition-all duration-300 transform hover:scale-[1.02] glow-button flex items-center justify-center disabled:opacity-50 disabled:cursor-not-allowed"
                                >
                                    <span v-if="!isSubmitting">{{ getText('contact.form_button', 'Send Message') }}</span>
                                    <span v-else>Sending...</span>
                                    <svg v-if="!isSubmitting" class="w-5 h-5 ml-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M14 5l7 7m0 0l-7 7m7-7H3"/>
                                    </svg>
                                </button>
                            </form>
                        </div>

                    </div>
                </div>
            </main>
        </div>
    </AppLayout>
</template>

<style scoped>
.contact-page {
    background-color: #1B142C;
    color: #F3F4F6;
    overflow-x: hidden;
}

.hero-bg {
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    z-index: 0;
}

.liquid-glass {
    background: rgba(41, 31, 66, 0.5);
    backdrop-filter: blur(12px);
    -webkit-backdrop-filter: blur(12px);
    border: 1px solid rgba(255, 255, 255, 0.1);
    transition: all 0.3s ease;
}

.liquid-glass:hover {
    background: rgba(55, 41, 89, 0.6);
    border: 1px solid rgba(255, 255, 255, 0.2);
}

.keyword-animate {
    background: linear-gradient(to right, #6A3FF4, #FF9900, #6A3FF4);
    -webkit-background-clip: text;
    -webkit-text-fill-color: transparent;
    background-size: 200% auto;
    animation: gradient-flow 4s linear infinite;
}

@keyframes gradient-flow {
    to { background-position: 200% center; }
}

.glow-button {
    box-shadow: 0 0 15px rgba(106, 63, 244, 0.4);
}

.contact-input {
    background: rgba(17, 5, 44, 0.4) !important;
    border: 1px solid rgba(106, 63, 244, 0.3) !important;
    color: white !important;
}

.contact-input:focus {
    border-color: #FF9900 !important;
    outline: none;
    box-shadow: 0 0 10px rgba(255, 153, 0, 0.2);
}

.contact-input::placeholder {
    color: rgba(156, 163, 175, 0.5);
}

/* Animated Blobs */
.blob-container {
    position: fixed;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    z-index: -2;
    overflow: hidden;
}

.blob {
    position: absolute;
    border-radius: 50%;
    filter: blur(80px);
    opacity: 0.2;
}

.blob1 {
    width: 500px;
    height: 500px;
    background: #6A3FF4;
    top: -10%;
    right: -10%;
    animation: float 20s infinite alternate;
}

.blob2 {
    width: 400px;
    height: 400px;
    background: #FF9900;
    bottom: -10%;
    left: -10%;
    animation: float 25s infinite alternate-reverse;
}

@keyframes float {
    0% { transform: translate(0,0) scale(1); }
    100% { transform: translate(100px, 100px) scale(1.2); }
}

#mouse-follower {
    position: fixed;
    top: 0;
    left: 0;
    width: 400px;
    height: 400px;
    background: radial-gradient(circle, rgba(106, 63, 244, 0.1) 0%, rgba(106, 63, 244, 0) 70%);
    border-radius: 50%;
    pointer-events: none;
    z-index: -1;
    transform: translate(-50%, -50%);
}
</style>