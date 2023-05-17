<script lang="ts">
import tcc_header from "components/tcc_header.vue"
import slideshow from "components/slideshow.vue"
import colored_squares from "components/colored_squares.vue"
import news_capsule from "components/news_capsule.vue"

import { DefaultLanguage, LanguageAvailable, LanguageOption } from "~/assets/i18n"
import club_text from "~/assets/tcc_setting/tcc_text"

import { index_page_text as page_text } from "./index_page"

const images_path_for_slideshow: string[] = [
    "/image/slideshow/SLAC_East_Entrance.jpg",
    "/image/slideshow/Ghk_Building_from_Lake.jpg"
]


export default {
    components: {
        tcc_header,
        slideshow,
        colored_squares,
        news_capsule
    },
    data()
    {
        return {
            // Two-way binded by v-model in `tcc_header` tag
            app_lang: "en",
            club_text_translated: club_text.en,
            page_text_translated: page_text.en,
            slideshow_pics: images_path_for_slideshow,
        }
    },
    watch: {
        app_lang(new_lang_setting: LanguageAvailable)
        {
            this.club_text_translated = club_text[new_lang_setting]!
            this.page_text_translated = page_text[new_lang_setting]!
        }
    }
}
</script>

<style scoped>
@import "~/assets/style/common.css";
@import "./index.css";
</style>

<template>
    <div id="tcc_home_website" class="website_container">
        <nav>
            <tcc_header v-model:lang_selected="app_lang" />
        </nav>
        <main>
            <div id="slideshow_area">
                <div id="slideshow_hover_text">
                    <h1>{{ club_text_translated.club_name }}</h1>
                    <h3>{{ club_text_translated.club_slogan }}</h3>
                </div>
                <slideshow id="slideshow" :image_paths="slideshow_pics" :container_height="'max(80vh, 600px)'" />
            </div>
            <div id="creativity_banner">
                <colored_squares width="'40%'" />
                <div id="creativity_text">
                    <h1>{{ club_text_translated.creativity_title }}</h1>
                    <p>{{ club_text_translated.creativity_text }}</p>
                </div>
            </div>
            <div id="news_showcase">
                <h1>{{ page_text_translated.news_pickup_text }}</h1>
                <news_capsule news_title="Test" pic_path="/news/school_hiking/image/header_pic.jpg" pic_size="200px">
                    Sample Text.
                </news_capsule>
                <news_capsule news_title="Test" pic_path="/news/school_hiking/image/header_pic.jpg" pic_size="200px">
                    Sample Text.
                </news_capsule>
                <news_capsule news_title="Test" pic_path="/news/school_hiking/image/header_pic.jpg" pic_size="200px">
                    Sample Text.
                </news_capsule>
                <news_capsule news_title="Test" pic_path="/news/school_hiking/image/header_pic.jpg" pic_size="200px">
                    Sample Text.
                </news_capsule>
            </div>
        </main>
    </div>
</template>