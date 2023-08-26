<script setup lang="ts">
import { marked } from 'marked';
import "~/assets/style/common.less"
marked.setOptions({ mangle: false, headerIds: false })

const props = defineProps<{
    news_id?: string
}>()

let md_to_show = ref("")
let md_html = computed(() => marked(md_to_show.value))
let app_lang = useCookie("app_lang")

const updateContent = async () =>
{
    if (props.news_id == undefined) { return }
    console.log(`updating news ${props.news_id} with app_lang ${app_lang.value}`)
    const { data } = await useFetch(`/api/news`, { method: "POST", query: { id: props.news_id } })
    const response = JSON.parse(data.value!)
    if (response.status_code == 200)
    {
        md_to_show.value = response.data
    }
    else
    {
        md_to_show.value = response.error
    }
}

watch(
    [app_lang],
    updateContent,
    { immediate: true }
)

</script>

<template>
    <div class="website_container">
        <div class="markdown_article_container" v-html="md_html"></div>
    </div>
</template>