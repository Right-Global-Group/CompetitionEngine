import { createInertiaApp } from '@inertiajs/vue3'
import createServer from '@inertiajs/vue3/server'
import { renderToString } from 'vue/server-renderer'
import { createSSRApp, h } from 'vue'
import { ZiggyVue } from '../../vendor/tightenco/ziggy'

const SiteTextPluginSSR = {
    install(app) {
        const siteTexts = { data: {}, loading: false, error: null }
        const getText = (key, fallback = '') => fallback
        app.config.globalProperties.$siteTexts = siteTexts
        app.config.globalProperties.$getText = getText
        app.provide('siteTexts', siteTexts)
        app.provide('getText', getText)
    }
}

createServer(page =>
    createInertiaApp({
        page,
        render: renderToString,
        resolve: name => {
            const pages = import.meta.glob('./Pages/**/*.vue', { eager: true })
            return pages[`./Pages/${name}.vue`]
        },
        setup({ App, props, plugin }) {
            return createSSRApp({
                render: () => h(App, props),
            }).use(plugin).use(ZiggyVue).use(SiteTextPluginSSR)
        },
    }),
)
