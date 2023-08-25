<script lang="ts">
import tcc_header from "components/tcc_header.vue"
import tcc_footer from "components/tcc_footer.vue"
import slideshow from "components/slideshow.vue"
import colored_squares from "components/colored_squares.vue"
import news_capsule from "components/news_capsule.vue"
import staff_capsule from "components/staff_capsule.vue"


const images_path_for_slideshow: string[] = [
    "/image/slideshow/SLAC_East_Entrance.jpg",
    "/image/slideshow/Ghk_Building_from_Lake.jpg"
]

/**
 * ID of the staff who is willing to show themselves in the homepage.
 */
const staff_to_show = [
    "ozelotvanilla",
    "ozelotvanilla",
    "ozelotvanilla",
    "ozelotvanilla",
    "ozelotvanilla"
]


export default {
    components: {
        tcc_header,
        slideshow,
        colored_squares,
        news_capsule,
        staff_capsule,
        tcc_footer
    },
    data()
    {
        return {
            slideshow_pics: images_path_for_slideshow,
            staff_to_show_id: staff_to_show
        }
    }
}
</script>

<script setup lang="ts">
import { marked } from "marked"
marked.setOptions({ mangle: false, headerIds: false })
</script>

<style scoped>
@import "~/assets/style/common.less";
@import "./index.less";
</style>

<template>
    <div id="tcc_home_website" class="website_container">
        <main>
            <div id="slideshow_area">
                <div id="slideshow_hover_text">
                    <h1>{{ $t("tcc_settings.club_name") }}</h1>
                    <h3>{{ $t("tcc_settings.club_slogan") }}</h3>
                </div>
                <slideshow id="slideshow" :image_paths="slideshow_pics" :container_height="'max(80vh, 600px)'" />
            </div>
            <div id="creativity_banner">
                <colored_squares width="'40%'" />
                <div id="creativity_text">
                    <h1>{{ $t("tcc_settings.creativity_title") }}</h1>
                    <p>{{ $t("tcc_settings.creativity_text") }}</p>
                </div>
            </div>
            <div id="staff_showcase" class="flex_col">
                <h1 class="section_title">{{ $t("index.member_text") }}</h1>
                <div class="flex_row" id="staff_list">
                    <staff_capsule v-for="staff_id in staff_to_show_id" :staff_id="staff_id" style="flex-shrink: 0;" />
                </div>
            </div>
            <div id="words_from_advisor" class="flex_col" style="gap: 4vh">
                <h1 class="section_title">{{ $t("index.advisor_text") }}</h1>
                <div class="flex_row" style="gap: 5vw; flex-wrap: wrap;">
                    <staff_capsule style="flex: 1;" staff_id="hemnbarzanabdalla" />
                    <div class="markdown_article_container_in_page" style="flex: 2;"
                        v-html="marked($t('index.advisor_words'))"></div>
                </div>
            </div>
            <div id="news_showcase">
                <h1 class="section_title">{{ $t("index.news_pickup_text") }}</h1>
                <p>{{ $t("index.news_pickup_area_description") }}</p>
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
            <div id="join_us">
                <h1 class="section_title">{{ $t("index.join_us_text") }}</h1>
                <div class="flex_row">
                    <div v-html="marked($t('index.how_to_join'))"></div>
                    <img src="/image/slideshow/SLAC_East_Entrance.jpg" alt="Join Us Pic"
                        style="width: 40vw; margin-left: auto;" />
                </div>
            </div>
        </main>
    </div>
</template>