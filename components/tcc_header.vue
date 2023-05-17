<style scoped>
@import "~/assets/style/common.css";
@import "./tcc_header.css";
</style>

<script lang="ts">
import page_list from "~/assets/tcc_setting/website_structure"
import club_text_db from "~/assets/tcc_setting/tcc_text"
import { lang, lang_list } from "~/assets/i18n.vue"
import i18n from "~/assets/i18n.vue"

export default {
    components: {
        i18n
    },
    props: {
        lang_selected: String
    },
    emits: [
        "update:lang_selected"
    ],
    data()
    {
        return {
            page_list,
            app_lang: lang,
            club_text: club_text_db[lang]!,
            lang_list
        }
    },
    methods: {
        onLangChanged(event: MouseEvent)
        {
            const new_lang = lang_list.get((event.target as HTMLLIElement).innerText)!
            this.$emit('update:lang_selected', new_lang)
            this.club_text = club_text_db[new_lang]!
        }
    }
}

</script>

<template>
    <div id="tcc_header_frame" class="flex_row">
        <div id="tcc_icon_and_text">
            <div id="tcc_icon_container">
                <img id="tcc_icon" src="/icon/wku_icon.png" alt="WKU Icon" srcset="">
            </div>
            <div class="vertical_line"></div>
            <div id="tcc_text">
                <NuxtLink to="/">{{ club_text.club_name }}</NuxtLink>
            </div>
        </div>
        <div id="menu_and_search_bar">
            <ul id="menu_of_page_nav">
                <li v-for="page in page_list">
                    <NuxtLink :to="page.path" class="page_nav_text">{{ page.name }}</NuxtLink>
                </li>
            </ul>
            　<div id="lang_select">
                <ul id="lang_list">
                    <li v-for="lang_name in lang_list.keys()" class="lang_option_text" @click="onLangChanged($event)">
                        {{ lang_name }}
                    </li>
                    <!-- <i18n :lang_selected="" /> -->
                </ul>
            </div>
        </div>
    </div>
</template>