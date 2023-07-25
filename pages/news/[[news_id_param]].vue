<script setup lang="ts">
import NewsOverview from "./overview.vue"

const route_info = useRoute()
const { news_id_param } = route_info.params
let news_id: string
if (news_id_param instanceof Array) { news_id = news_id_param.join() }
else { news_id = news_id_param ?? "" }
</script>

<style scoped>
@import "~/assets/style/common.css";
</style>

<template>
    <div class="website_container" v-if="news_id.trim().length == 0">
        <NewsOverview />
    </div>
    <div class="website_container" v-else>

    </div>
</template>
