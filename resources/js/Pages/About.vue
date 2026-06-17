<script setup>
import { Head, Link } from '@inertiajs/vue3';
import AppLayout from '@/Layouts/AppLayout.vue';
import { onMounted, inject, computed } from 'vue';
import * as THREE from 'three';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

const getText = inject('getText', (key, fallback = '') => fallback);
const siteTexts = inject('siteTexts');

gsap.registerPlugin(ScrollTrigger);

// Get heading parts
const heroHeadingParts = computed(() => {
    const parts = [];
    
    const before = getText('about.hero_heading_before', 'Unique');
    const keyword = getText('about.hero_heading_keyword', 'By Design');
    const after = getText('about.hero_heading_after', '');
    
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

const visionHeadingParts = computed(() => {
    const parts = [];
    
    const before = getText('about.vision_heading_before', 'Our Vision for');
    const keyword = getText('about.vision_heading_keyword', 'Individuality');
    const after = getText('about.vision_heading_after', '');
    
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
    for (let i = 0; i < 1200; i++) {
        vertices.push(Math.random() * 2000 - 1000, Math.random() * 2000 - 1000, Math.random() * 2000 - 1000);
    }
    geometry.setAttribute('position', new THREE.Float32BufferAttribute(vertices, 3));
    const material = new THREE.PointsMaterial({ color: 0x6A3FF4, size: 2, transparent: true, opacity: 0.4 });
    const particles = new THREE.Points(geometry, material);
    scene.add(particles);

    camera.position.z = 600;

    function animate() {
        requestAnimationFrame(animate);
        particles.rotation.y += 0.0004;
        particles.rotation.x += 0.0001;
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
                duration: 1,
                ease: "power2.out"
            });
        });
    }

    // GSAP Revelations
    gsap.utils.toArray('.reveal').forEach(el => {
        gsap.to(el, {
            opacity: 1,
            y: 0,
            duration: 1,
            ease: "power3.out",
            scrollTrigger: {
                trigger: el,
                start: "top 85%",
            }
        });
    });
});
</script>

<template>
    <Head title="Our Vision - Competition Engine" />

    <AppLayout>
        <div class="about-page">
            <div class="blob-container">
                <div class="blob blob1"></div>
                <div class="blob blob2"></div>
            </div>
            <div id="mouse-follower"></div>

            <main class="pt-32 pb-20">
                <canvas id="hero-canvas" class="hero-bg"></canvas>

                <div class="container mx-auto px-6 relative z-10">
                    <!-- Hero Section -->
                    <div class="text-center mb-24 reveal">
                        <h1 class="text-6xl md:text-8xl font-extrabold text-white mb-6">
                            <template v-for="(part, index) in heroHeadingParts" :key="`hero-heading-${index}`">
                                <span v-if="part.isKeyword" class="keyword-animate">{{ part.text }}</span>
                                <template v-else>{{ part.text }}</template>
                            </template>
                        </h1>
                        <p class="text-xl md:text-2xl text-gray-400 max-w-3xl mx-auto leading-relaxed">
                            {{ getText('about.hero_description', 'Manchester-born, globally focused. Our vision is simple: every competition site deserves its own Unique Identity.') }}
                        </p>
                    </div>

                    <!-- Core Values / Philosophy -->
                    <div class="grid grid-cols-1 md:grid-cols-3 gap-8 mb-24">
                        <div class="liquid-glass p-8 rounded-3xl reveal">
                            <div class="text-[#FF9900] text-4xl mb-4 font-bold">
                                {{ getText('about.value1_number', '01') }}
                            </div>
                            <h3 class="text-2xl font-bold text-white mb-4">
                                {{ getText('about.value1_title', 'Zero Repetition') }}
                            </h3>
                            <p class="text-gray-400 leading-relaxed">
                                {{ getText('about.value1_description', 'We reject the "plugin-and-play" culture. Your brand is unique, and your platform should be a bespoke reflection of that vision.') }}
                            </p>
                        </div>
                        <div class="liquid-glass p-8 rounded-3xl reveal">
                            <div class="text-[#6A3FF4] text-4xl mb-4 font-bold">
                                {{ getText('about.value2_number', '02') }}
                            </div>
                            <h3 class="text-2xl font-bold text-white mb-4">
                                {{ getText('about.value2_title', 'Identity as Logic') }}
                            </h3>
                            <p class="text-gray-400 leading-relaxed">
                                {{ getText('about.value2_description', 'Customisation isn\'t just skin deep. We build unique workflows, logic, and prize systems tailored specifically to your audience.') }}
                            </p>
                        </div>
                        <div class="liquid-glass p-8 rounded-3xl reveal">
                            <div class="text-[#FF9900] text-4xl mb-4 font-bold">
                                {{ getText('about.value3_number', '03') }}
                            </div>
                            <h3 class="text-2xl font-bold text-white mb-4">
                                {{ getText('about.value3_title', 'Elite Experience') }}
                            </h3>
                            <p class="text-gray-400 leading-relaxed">
                                {{ getText('about.value3_description', 'Every pixel is an opportunity to engage. We provide the tools to build immersive worlds, not just raffle listings.') }}
                            </p>
                        </div>
                    </div>

                    <!-- Vision Section -->
                    <div class="liquid-glass p-12 rounded-3xl mb-24 reveal">
                        <div class="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
                            <div>
                                <h2 class="text-4xl font-extrabold text-white mb-6">
                                    <template v-for="(part, index) in visionHeadingParts" :key="`vision-heading-${index}`">
                                        <span v-if="part.isKeyword" class="text-[#FF9900]">{{ part.text }}</span>
                                        <template v-else>{{ part.text }}</template>
                                    </template>
                                </h2>
                                <p class="text-gray-300 text-lg mb-6 leading-relaxed">
                                    {{ getText('about.vision_paragraph1', 'The internet is becoming a sea of sameness. Competition Engine was founded to break the cycle of identical WordPress sites that all look, feel, and fail in the same way.') }}
                                </p>
                                <p class="text-gray-300 text-lg leading-relaxed">
                                    {{ getText('about.vision_paragraph2', 'We give creators the power of elite-tier engineering while maintaining complete creative freedom. Our vision is to empower every site owner to stand out with a distinct digital footprint that is impossible to copy and hard to forget.') }}
                                </p>
                            </div>
                            <div class="relative h-64 lg:h-full bg-gradient-to-br from-[#6A3FF4]/20 to-transparent rounded-2xl overflow-hidden flex items-center justify-center border border-white/10">
                                <div class="flex flex-col items-center">
                                    <div class="w-24 h-24 border-4 border-[#FF9900] rounded-full flex items-center justify-center animate-spin-slow mb-4">
                                        <div class="w-16 h-16 border-4 border-[#6A3FF4] rounded-full"></div>
                                    </div>
                                    <span class="text-xs font-mono text-gray-500 uppercase tracking-widest text-center">Uniquely Crafted // 1 of 1</span>
                                </div>
                            </div>
                        </div>
                    </div>

                    <!-- CTA Section -->
                    <div class="text-center reveal">
                        <h2 class="text-4xl md:text-5xl font-bold text-white mb-8">
                            {{ getText('about.cta_heading', 'Ready to build your identity?') }}
                        </h2>
                        <Link href="/contact" class="inline-block bg-[#6A3FF4] text-white font-bold px-10 py-4 rounded-xl hover:bg-[#FF9900] transition-all duration-300 transform hover:scale-105 glow-button">
                            {{ getText('about.cta_button', 'Work With Us') }}
                        </Link>
                    </div>
                </div>
            </main>
        </div>
    </AppLayout>
</template>

<style scoped>
.about-page {
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
    filter: blur(100px);
    opacity: 0.15;
}

.blob1 {
    width: 600px;
    height: 600px;
    background: #6A3FF4;
    top: -10%;
    right: -10%;
    animation: float 25s infinite alternate;
}

.blob2 {
    width: 500px;
    height: 500px;
    background: #FF9900;
    bottom: -10%;
    left: -10%;
    animation: float 30s infinite alternate-reverse;
}

@keyframes float {
    0% { transform: translate(0,0) scale(1); }
    100% { transform: translate(150px, 150px) scale(1.1); }
}

#mouse-follower {
    position: fixed;
    top: 0;
    left: 0;
    width: 400px;
    height: 400px;
    background: radial-gradient(circle, rgba(106, 63, 244, 0.08) 0%, rgba(106, 63, 244, 0) 70%);
    border-radius: 50%;
    pointer-events: none;
    z-index: -1;
    transform: translate(-50%, -50%);
}

.reveal {
    opacity: 0;
    transform: translateY(30px);
}

@keyframes spin-slow {
    from { transform: rotate(0deg); }
    to { transform: rotate(360deg); }
}

.animate-spin-slow {
    animation: spin-slow 8s linear infinite;
}
</style>