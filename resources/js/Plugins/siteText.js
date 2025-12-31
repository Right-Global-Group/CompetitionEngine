import { reactive } from 'vue';
import axios from 'axios';

const siteTexts = reactive({
    data: {},
    loading: true,
    error: null,
});

export const SiteTextPlugin = {
    install(app) {
        // Fetch texts on app initialization
        axios.get('/api/site-texts')
            .then(response => {
                siteTexts.data = response.data;
                siteTexts.loading = false;
            })
            .catch(error => {
                console.error('Error loading site texts:', error);
                siteTexts.error = error.message;
                siteTexts.loading = false;
            });

        // Helper function to get text
        const getText = (key, fallback = '') => {
            if (siteTexts.loading) return fallback;
            
            const parts = key.split('.');
            if (parts.length >= 2) {
                const section = parts[0];
                return siteTexts.data[section]?.[key] || fallback;
            }
            return fallback;
        };

        // Make available globally
        app.config.globalProperties.$siteTexts = siteTexts;
        app.config.globalProperties.$getText = getText;

        // Also provide for composition API
        app.provide('siteTexts', siteTexts);
        app.provide('getText', getText);
    }
};