<script setup lang="ts">
import { marked } from "marked"
import { TCCProject } from "server/api/project"

const route_info = useRoute()
const { project_id } = route_info.params
const { data } = await useFetch(`/api/project?id=${project_id}`)
const project_data: TCCProject = JSON.parse(data.value!)
</script>

<template>
    <h1>{{ project_data.name }}</h1>
    <hr />
    <p>Supervisor: {{ project_data.supervisor }}, started from {{ project_data.since }}</p>
    <div v-html="marked(project_data.detail)"></div>
</template>