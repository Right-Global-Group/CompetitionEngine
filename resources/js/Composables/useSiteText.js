import { ref, onMounted } from 'vue';
import axios from 'axios';

export function useSiteText() {
    const texts = ref({});
    const loading = ref(true);
    const error = ref(null);

    const fetchTexts = async () => {
        try {
            loading.value = true;
            const response = await axios.get('/api/site-texts');
            texts.value = response.data;
            error.value = null;
        } catch (err) {
            error.value = err.message;
            console.error('Error fetching site texts:', err);
        } finally {
            loading.value = false;
        }
    };

    const fetchSection = async (section) => {
        try {
            const response = await axios.get(`/api/site-texts/section/${section}`);
            return response.data;
        } catch (err) {
            console.error(`Error fetching section ${section}:`, err);
            return {};
        }
    };

    const getText = (key, fallback = '') => {
        // Parse key like 'hero.title' to get section and specific key
        const parts = key.split('.');
        if (parts.length === 2) {
            const [section, textKey] = parts;
            return texts.value[section]?.[key] || fallback;
        }
        return fallback;
    };

    onMounted(() => {
        fetchTexts();
    });

    return {
        texts,
        loading,
        error,
        fetchTexts,
        fetchSection,
        getText,
    };
}