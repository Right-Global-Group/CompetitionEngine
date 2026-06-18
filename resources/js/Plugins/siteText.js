import { reactive } from 'vue';

export const SiteTextPlugin = {
    install(app, options = {}) {
        const siteTexts = reactive({
            data: options.initialData || {},
            loading: false,
            error: null,
        });

        const getText = (key, fallback = '') => {
            const parts = key.split('.');
            if (parts.length >= 2) {
                return siteTexts.data[parts[0]]?.[key] || fallback;
            }
            return fallback;
        };

        app.config.globalProperties.$siteTexts = siteTexts;
        app.config.globalProperties.$getText = getText;
        app.provide('siteTexts', siteTexts);
        app.provide('getText', getText);
    }
};
