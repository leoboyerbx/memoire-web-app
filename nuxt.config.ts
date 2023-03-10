// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
    modules: [
        'nuxt-windicss',
        'nuxt-icon'
    ],
    runtimeConfig: {
        notionKey: '',
        notionBiblioDatabaseId: '',
        notionReferencesDatabaseId: ''
    },
})
