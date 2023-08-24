<script setup lang="ts">
import { marked } from 'marked';
import "~/assets/style/common.less"
marked.setOptions({ mangle: false, headerIds: false })

const props = defineProps<{
    events_id: string
}>()

let md_to_show = ref("")
let md_html = computed(() => marked(md_to_show.value))
let app_lang = useCookie("app_lang")

const updateContent = async () =>
{
    console.log(`updating news ${props.events_id} with app_lang ${app_lang.value}`)
    const { data } = await useFetch(`/api/events`, { method: "POST", query: { id: props.events_id } })
    const response = data.value!
    console.log(response)
    if (response.status_code == 200)
    {
        md_to_show.value = response.data!.detail
    }
    else
    {
        md_to_show.value = response.message
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

        <div class="markdown_article_container_in_page" v-html="md_html"></div>
    </div>
</template>