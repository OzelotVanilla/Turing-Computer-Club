<script setup lang="ts">
import { marked } from 'marked';

const props = defineProps<{
    project_id?: string
}>()
marked.setOptions({ mangle: false, headerIds: false })

let md_to_show = ref("")
let md_html = computed(() => marked(md_to_show.value))
let app_lang = useCookie("app_lang")

const updateContent = async () =>
{
    if (props.project_id == undefined) { return }
    console.log(`updating project ${props.project_id} with app_lang ${app_lang.value}`)
    const { data } = await useFetch(`/api/project`, { method: "POST", query: { id: props.project_id } })
    const response = data.value!
    // console.log(response)
    if (response.status_code == 200)
    {
        md_to_show.value = response.data?.detail ?? ""
    }
    else
    {
        md_to_show.value = ""
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
        <!-- <div id="project_showcase" v-if="project_data.error == null || project_data.error == ''">
            <h1>{{ project_data.name }}</h1>
            <hr />
            <p>Supervisor: {{ project_data.supervisor }}, started from {{ project_data.since }}</p>
            <div v-html="marked(project_data.detail)"></div>
            </div> -->
        <div class="markdown_article_container" v-html="md_html"></div>
    </div>
</template>