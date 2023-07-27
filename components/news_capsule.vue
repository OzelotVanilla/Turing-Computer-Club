<script lang="ts">
export default {
    props: {
        news_title: String,
        news_text: String,
        pic_path: String,
        pic_size: String
    },
    data()
    {
        return {
            news_pic_path: this.pic_path ?? "",
            img_size_style_text: this.pic_size ?? "100px",
            news_text_slot: this.news_text ?? "Sample Text"
        }
    }
}
</script>

<template>
    <div id="news_capsule_frame" class="flex_row">
        <div class="pic_area">
            <img class="header_pic" :src="pic_path" alt="News Picture"
                :style="{ width: img_size_style_text, height: img_size_style_text }">
        </div>
        <div class="text_area flex_col" style="margin-right: auto;">
            <h1>{{ news_title }}</h1>
            <p>
                <slot>{{ news_text_slot }}</slot>
            </p>
        </div>
        <a id="view_more">
            View More
        </a>
    </div>
</template>

<style scoped>
@import "~/assets/style/common.less";

#news_capsule_frame
{
    --shadow-offset-distance: 5px;
    --border-radius-size: 20px;

    box-shadow: var(--shadow-offset-distance) var(--shadow-offset-distance) #dcdddd;
    border-radius: var(--border-radius-size);

    transition: all 0.5s;

    background-color: #fbfaf5;
    padding: calc(var(--border-radius-size));

    gap: max(1vw, 20px);
}

#news_capsule_frame:hover
{
    translate: var(--shadow-offset-distance) var(--shadow-offset-distance);
    box-shadow: none;
}

#view_more
{
    font-family: "Raleway";
    align-self: flex-end;
    transition: color 0.3s;
}

#view_more:hover
{
    color: #007bbb;
    cursor: pointer;
}

.header_pic
{
    object-fit: cover;

    border-radius: var(--border-radius-size);
}

*
{
    font-family: "Roboto";
}
</style>