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
    <div class="min-h-screen bg-dark-purple">
        <!-- Animated Background Blobs -->
        <div class="blob-container">
            <div class="blob blob1"></div>
            <div class="blob blob2"></div>
        </div>

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
    opacity: 0.3;
}

.blob1 {
    width: 400px;
    height: 400px;
    background-color: rgba(106, 63, 244, 0.5);
    animation: blob-move 20s infinite alternate;
}

.blob2 {
    width: 300px;
    height: 300px;
    background-color: rgba(255, 153, 0, 0.5);
    animation: blob-move 25s infinite alternate-reverse;
}

#mouse-follower {
    position: fixed;
    top: 0;
    left: 0;
    width: 500px;
    height: 500px;
    background: radial-gradient(circle, rgba(106, 63, 244, 0.15) 0%, rgba(106, 63, 244, 0) 70%);
    border-radius: 50%;
    pointer-events: none;
    z-index: -1;
    transform: translate(-50%, -50%);
    will-change: transform;
}
</style>