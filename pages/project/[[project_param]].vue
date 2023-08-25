<script setup lang="ts">
import ProjectOverview from "./overview.vue"
import ProjectArticle from "./article.vue"

const route_info = useRoute()
const { project_param } = route_info.params
let project_id: string
if (project_param instanceof Array) { project_id = project_param.join() }
else { project_id = project_param ?? "" }
</script>

<style scoped>
@import "~/assets/style/common.less";
</style>

<template>
    <div class="website_container" v-if="project_id.trim().length == 0">
        <ProjectOverview />
    </div>
    <div class="website_container" v-else>
        <ProjectArticle :project_id="project_id" />
    </div>
</template>
