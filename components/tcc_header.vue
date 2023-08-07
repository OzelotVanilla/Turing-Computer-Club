<style scoped>
@import "~/assets/style/common.less";
@import "./tcc_header.less";
</style>

<script setup lang="ts">
import { useI18n } from "vue-i18n";
import { fallback_lang, lang_list } from "~/assets/i18n"

interface TCCPage
{
    name: string
    path: string
    description?: string
    subpage?: TCCPage[]
}

let website_structure: TCCPage[] = [
    { name: "News", path: "/news" },
    { name: "Events", path: "/events" },
    { name: "About Us", path: "/about" },
]

const { t, locale } = useI18n()
let lang_selected = useCookie("app_lang")

function updateLanguageSettings()
{
    locale.value = lang_selected.value ?? fallback_lang
    // console.log(`Now user changes cookie value of app_lang to ${lang_selected.value}`)
}
</script>

<!-- <script lang="ts">
import { lang_list } from "~/assets/i18n"

interface TCCPage
{
    name: string
    path: string
    description?: string
    subpage?: TCCPage[]
}

let website_structure: TCCPage[] = [
    { name: "News", path: "/news" },
    { name: "Events", path: "/events" },
    { name: "About Us", path: "/about" },
]

export default {
    props: {
        lang_selected: String
    },
    data()
    {
        return {
            page_list: website_structure,
            lang_list
        }
    },
    methods:
    {
        updateLanguageSettings()
        {
            if (process.client)
            {
                // localStorage.setItem("app_lang", this.$i18n.locale)

            }
        }
    }
}

</script> -->

<template>
    <div id="tcc_header_frame" class="flex_row">
        <div id="tcc_icon_and_text">
            <div id="tcc_icon_container">
                <img id="tcc_icon" src="/icon/wku_icon.png" alt="WKU Icon" srcset="">
            </div>
            <div class="vertical_line"></div>
            <div id="tcc_text">
                <NuxtLink to="/">{{ t("tcc_settings.club_name") }}</NuxtLink>
            </div>
        </div>
        <div id="menu_and_search_bar">
            <ul id="menu_of_page_nav">
                <li v-for="page in website_structure">
                    <NuxtLink :to="page.path" class="page_nav_text">{{ page.name }}</NuxtLink>
                </li>
            </ul>
            <div id="lang_select">
                <select name="lang_list" id="lang_list"
                    v-model="lang_selected" @change="updateLanguageSettings">
                    <option v-for="lang_name in lang_list" :value="lang_name" class="lang_option_text">
                        {{ t(`language.${lang_name}`) }}
                    </option>
                </select>
            </div>
        </div>
    </div>
</template>