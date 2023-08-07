<script setup lang="ts">
import { marked } from 'marked';
import "~/assets/style/common.less"

const props = defineProps<{
    news_id: string
}>()


const { data } = await useFetch(`/api/news?id=${props.news_id}`)
const response = JSON.parse(data.value!)
let md_to_show: string
if (response.status_code == 200)
{
    md_to_show = response.data
}
else
{
    md_to_show = response.error
}
marked.setOptions({ mangle: false, headerIds: false })
</script>

<template>
    <div class="website_container">
        <div class="markdown_article_container" v-html="marked(md_to_show)"></div>
    </div>
</template>