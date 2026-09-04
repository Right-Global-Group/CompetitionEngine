import { createInertiaApp } from '@inertiajs/vue3'
import createServer from '@inertiajs/vue3/server'
import { renderToString } from 'vue/server-renderer'
import { createSSRApp, h } from 'vue'
import { ZiggyVue } from '../../vendor/tightenco/ziggy'
import UiButton from './Components/Ui/Button.vue'

createServer(page =>
    createInertiaApp({
        page,
        render: renderToString,
        resolve: name => {
            const pages = import.meta.glob('./Pages/**/*.vue', { eager: true })
            return pages[`./Pages/${name}.vue`]
        },
        setup({ App, props, plugin }) {
            const siteTextData = props.initialPage.props.siteTexts || {}
            const SiteTextPluginSSR = {
                install(app) {
                    const getText = (key, fallback = '') => {
                        const parts = key.split('.')
                        if (parts.length >= 2) {
                            return siteTextData[parts[0]]?.[key] || fallback
                        }
                        return fallback
                    }
                    app.config.globalProperties.$siteTexts = { data: siteTextData, loading: false, error: null }
                    app.config.globalProperties.$getText = getText
                    app.provide('siteTexts', { data: siteTextData, loading: false, error: null })
                    app.provide('getText', getText)
                }
            }
            return createSSRApp({
                render: () => h(App, props),
            }).use(plugin).use(ZiggyVue)
            .component('UiButton', UiButton).use(SiteTextPluginSSR)
        },
    }),
)
