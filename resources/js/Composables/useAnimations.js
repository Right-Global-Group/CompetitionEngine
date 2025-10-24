import { onMounted, onUnmounted } from 'vue';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

export function useScrollAnimations() {
    gsap.registerPlugin(ScrollTrigger);

    onMounted(() => {
        // Reveal elements on scroll
        const reveals = document.querySelectorAll('.reveal');
        
        reveals.forEach((element) => {
            gsap.to(element, {
                opacity: 1,
                y: 0,
                duration: 0.8,
                ease: 'power3.out',
                scrollTrigger: {
                    trigger: element,
                    start: 'top 85%',
                    toggleActions: 'play none none none'
                }
            });
        });
    });

    onUnmounted(() => {
        ScrollTrigger.getAll().forEach(trigger => trigger.kill());
    });
}

export function useFadeIn(selector, delay = 0) {
    onMounted(() => {
        gsap.from(selector, {
            opacity: 0,
            y: 30,
            duration: 1,
            delay,
            ease: 'power3.out'
        });
    });
}

export function useStaggerAnimation(selector, delay = 0) {
    onMounted(() => {
        gsap.from(selector, {
            opacity: 0,
            y: 50,
            duration: 0.8,
            delay,
            stagger: 0.2,
            ease: 'power3.out'
        });
    });
}