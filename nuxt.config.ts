// https://nuxt.com/docs/api/configuration/nuxt-config
const components_dir = "/components"
const style_dir = "/assets/style"

export default defineNuxtConfig({
    alias: {
        "components": components_dir,
        "@": components_dir,
        "style": style_dir,
    }
})
