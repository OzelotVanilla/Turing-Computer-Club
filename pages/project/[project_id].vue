<script setup lang="ts">
import { marked } from "marked"
import { TCCProject } from "server/api/project"

const route_info = useRoute()
const { project_id } = route_info.params
const { data } = await useFetch(`/api/project?id=${project_id}`)
const project_data: TCCProject = JSON.parse(data.value!)

marked.setOptions({ mangle: false, headerIds: false })
</script>

<template>
    <div id="project_page_frame">
        <!-- If there is correct project data -->
        <div id="project_showcase" v-if="project_data.error == null || project_data.error == ''">
            <h1>{{ project_data.name }}</h1>
            <hr />
            <p>Supervisor: {{ project_data.supervisor }}, started from {{ project_data.since }}</p>
            <div v-html="marked(project_data.detail)"></div>
        </div>

        <!-- Else, the queried project is not exist -->
        <div id="project_error_showcase" v-else>
            <h1>Something went wrong.</h1>
            <p>The project cannot be found. Reason: {{ project_data.error }}</p>
        </div>
    </div>
</template>