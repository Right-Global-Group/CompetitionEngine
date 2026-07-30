import { ref, onMounted, onUnmounted } from 'vue';

export function useReveal() {
    const sectionRef = ref(null);
    const revealed = ref(false);
    let observer = null;

    onMounted(() => {
        if (!sectionRef.value) return;
        observer = new IntersectionObserver((entries) => {
            entries.forEach((entry) => {
                if (entry.isIntersecting) {
                    revealed.value = true;
                    observer.unobserve(entry.target);
                }
            });
        }, { threshold: 0.15 });
        observer.observe(sectionRef.value);
    });

    onUnmounted(() => {
        if (observer) observer.disconnect();
    });

    return { sectionRef, revealed };
}
