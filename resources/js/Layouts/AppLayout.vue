<script setup>
import { ref, onMounted } from 'vue';
import { gsap } from 'gsap';
import Header from '@/Components/Layout/Header.vue';
import Footer from '@/Components/Layout/Footer.vue';

const mouseFollower = ref(null);

onMounted(() => {
    // Mouse follower animation
    window.addEventListener('mousemove', (e) => {
        if (mouseFollower.value) {
            gsap.to(mouseFollower.value, {
                x: e.clientX,
                y: e.clientY,
                duration: 0.7,
                ease: "power3.out"
            });
        }
    });
});
</script>

<template>
    <div class="min-h-screen">
        <!-- Mouse Follower -->
        <div id="mouse-follower" ref="mouseFollower"></div>

        <!-- Header -->
        <Header />

        <!-- Main Content -->
        <main>
            <slot />
        </main>

        <!-- Footer -->
        <Footer />
    </div>
</template>

<style scoped>
#mouse-follower {
    position: fixed;
    top: 0;
    left: 0;
    width: 500px;
    height: 500px;
    background: radial-gradient(circle, rgba(106, 63, 244, 0.15) 0%, rgba(106, 63, 244, 0) 70%);
    border-radius: 50%;
    pointer-events: none;
    z-index: 9999;
    transform: translate(-50%, -50%);
    will-change: transform;
    mix-blend-mode: screen;
}
</style>