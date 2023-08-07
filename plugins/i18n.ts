import { createI18n as createI18N } from "vue-i18n"
import en_translation from "../locales/en.json"
import ja_kanji_translation from "../locales/ja_kanji.json"
import zh_translation from "../locales/zh.json"

export default defineNuxtPlugin(
    ({ vueApp }) =>
    {
        const fallback_lang = "en"
        let app_lang = useCookie("app_lang")
        app_lang.value = app_lang.value ?? fallback_lang
        // console.log(`User read cookie app_lang "${app_lang.value}"`);

        const i18n = createI18N({
            legacy: false,
            globalInjection: true,
            locale: app_lang.value,
            fallbackLocale: fallback_lang,
            messages: {
                en: en_translation,
                ja_kanji: ja_kanji_translation,
                zh: zh_translation
            }
        })

        vueApp.use(i18n)
    }
)