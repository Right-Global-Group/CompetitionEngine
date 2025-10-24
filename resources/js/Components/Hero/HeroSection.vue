<script setup>
import { onMounted, onUnmounted, ref } from 'vue';
import { gsap } from 'gsap';
import * as THREE from 'three';

const heroCanvas = ref(null);
let animationId = null;
let renderer = null;

const scrollToBooking = () => {
    const element = document.getElementById('booking');
    if (element) {
        element.scrollIntoView({ behavior: 'smooth' });
    }
};

onMounted(() => {
    // GSAP Hero Animations
    gsap.from('.hero-title', {
        opacity: 0,
        y: 50,
        duration: 1,
        ease: 'power3.out'
    });

    gsap.from('.hero-subtitle', {
        opacity: 0,
        y: 30,
        duration: 1,
        delay: 0.3,
        ease: 'power3.out'
    });

    gsap.from('.hero-buttons', {
        opacity: 0,
        y: 20,
        duration: 0.8,
        delay: 0.6,
        ease: 'power3.out'
    });

    // Three.js Background with Floating Tickets
    if (!heroCanvas.value) return;

    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
    renderer = new THREE.WebGLRenderer({ 
        canvas: heroCanvas.value, 
        alpha: true,
        antialias: true
    });
    
    renderer.setSize(window.innerWidth, window.innerHeight);
    renderer.setPixelRatio(window.devicePixelRatio);
    camera.position.z = 500;

    // Create particles for background
    const particlesGeometry = new THREE.BufferGeometry();
    const particlesCount = 1500;
    const posArray = new Float32Array(particlesCount * 3);

    for (let i = 0; i < particlesCount * 3; i++) {
        posArray[i] = (Math.random() - 0.5) * 2000;
    }

    particlesGeometry.setAttribute('position', new THREE.BufferAttribute(posArray, 3));

    const particlesMaterial = new THREE.PointsMaterial({
        size: 1.5,
        color: 0xA020F0,
        transparent: true,
        opacity: 0.7
    });

    const particlesMesh = new THREE.Points(particlesGeometry, particlesMaterial);
    scene.add(particlesMesh);

    // Create floating tickets - MORE TRANSPARENT
    const tickets = [];
    const ticketCount = 25;

    function createTicketTexture(number) {
        const canvas = document.createElement('canvas');
        canvas.width = 256;
        canvas.height = 128;
        const ctx = canvas.getContext('2d');

        // Ticket background - more subtle
        ctx.fillStyle = 'rgba(106, 63, 244, 0.3)';
        ctx.fillRect(0, 0, 256, 128);

        // Ticket border - subtle
        ctx.strokeStyle = 'rgba(255, 153, 0, 0.4)';
        ctx.lineWidth = 2;
        ctx.strokeRect(5, 5, 246, 118);

        // Ticket number - very subtle
        ctx.fillStyle = 'rgba(255, 255, 255, 0.5)';
        ctx.font = 'bold 36px Arial';
        ctx.textAlign = 'center';
        ctx.textBaseline = 'middle';
        ctx.fillText(`#${number}`, 128, 64);

        const texture = new THREE.CanvasTexture(canvas);
        return texture;
    }

    for (let i = 0; i < ticketCount; i++) {
        const ticketNumber = String(Math.floor(Math.random() * 9000) + 1000);
        const texture = createTicketTexture(ticketNumber);

        const ticketGeometry = new THREE.PlaneGeometry(60, 30);
        const ticketMaterial = new THREE.MeshBasicMaterial({
            map: texture,
            transparent: true,
            opacity: 0.15, // Much more transparent like the original
            side: THREE.DoubleSide,
            blending: THREE.AdditiveBlending
        });

        const ticket = new THREE.Mesh(ticketGeometry, ticketMaterial);

        ticket.position.x = (Math.random() - 0.5) * 1200;
        ticket.position.y = (Math.random() - 0.5) * 1000;
        ticket.position.z = (Math.random() - 0.5) * 800;

        ticket.rotation.x = Math.random() * Math.PI;
        ticket.rotation.y = Math.random() * Math.PI;
        ticket.rotation.z = Math.random() * Math.PI;

        ticket.userData.velocity = {
            x: (Math.random() - 0.5) * 0.3,
            y: (Math.random() - 0.5) * 0.3,
            z: (Math.random() - 0.5) * 0.3,
            rotationX: (Math.random() - 0.5) * 0.01,
            rotationY: (Math.random() - 0.5) * 0.01,
            rotationZ: (Math.random() - 0.5) * 0.01
        };

        tickets.push(ticket);
        scene.add(ticket);
    }

    // Animation loop
    function animate() {
        animationId = requestAnimationFrame(animate);

        // Rotate particles slowly
        particlesMesh.rotation.y += 0.0005;
        particlesMesh.rotation.x += 0.0002;

        // Animate tickets
        tickets.forEach(ticket => {
            ticket.position.x += ticket.userData.velocity.x;
            ticket.position.y += ticket.userData.velocity.y;
            ticket.position.z += ticket.userData.velocity.z;

            ticket.rotation.x += ticket.userData.velocity.rotationX;
            ticket.rotation.y += ticket.userData.velocity.rotationY;
            ticket.rotation.z += ticket.userData.velocity.rotationZ;

            // Boundary checks - wrap around
            if (Math.abs(ticket.position.x) > 600) {
                ticket.position.x = -ticket.position.x;
            }
            if (Math.abs(ticket.position.y) > 500) {
                ticket.position.y = -ticket.position.y;
            }
            if (Math.abs(ticket.position.z) > 400) {
                ticket.position.z = -ticket.position.z;
            }
        });

        renderer.render(scene, camera);
    }

    animate();

    // Handle window resize
    const handleResize = () => {
        camera.aspect = window.innerWidth / window.innerHeight;
        camera.updateProjectionMatrix();
        renderer.setSize(window.innerWidth, window.innerHeight);
    };

    window.addEventListener('resize', handleResize);
});

onUnmounted(() => {
    // Cleanup
    if (animationId) {
        cancelAnimationFrame(animationId);
    }
    if (renderer) {
        renderer.dispose();
    }
});
</script>

<template>
    <section id="hero" class="relative min-h-screen flex items-center justify-center text-center overflow-hidden">
        <!-- Three.js Canvas Background -->
        <canvas ref="heroCanvas" class="absolute top-0 left-0 w-full h-full"></canvas>

        <div class="relative z-10 p-4 sm:p-6">
            <h1 class="hero-title text-4xl sm:text-5xl md:text-7xl font-extrabold text-white mb-4 leading-tight">
                The <span class="keyword-animate">Ultimate Competition</span> Platform
            </h1>
            <p class="hero-subtitle text-base sm:text-lg md:text-xl text-gray-300 max-w-3xl mx-auto mb-8">
                Effortlessly create, manage, and scale engaging competitions that your audience will love. No code, no hassle.
            </p>
            <div class="hero-buttons flex flex-col sm:flex-row justify-center items-center gap-4">
                <button 
                    @click="scrollToBooking"
                    class="w-full sm:w-auto bg-accent-purple text-white font-semibold px-8 py-3 sm:py-4 rounded-lg hover:bg-accent-orange transition-all duration-300 transform hover:scale-105 glow-button"
                >
                    Book a Demo
                </button>
                <button 
                    class="w-full sm:w-auto glass-effect text-white font-semibold px-8 py-3 sm:py-4 rounded-lg hover:bg-opacity-80 transition-all duration-300 transform hover:scale-105"
                >
                    View Live Demo
                </button>
            </div>
        </div>
    </section>
</template>