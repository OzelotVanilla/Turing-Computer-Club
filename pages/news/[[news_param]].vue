<script setup lang="ts">
import NewsOverview from "./overview.vue"
import NewsArticle from "./article.vue"

const route_info = useRoute()
const { news_param } = route_info.params
let news_id: string
if (news_param instanceof Array) { news_id = news_param.join() }
else { news_id = news_param ?? "" }
</script>

<style scoped>
@import "~/assets/style/common.less";
</style>

<template>
    <div v-if="news_id.trim().length == 0">
        <NewsOverview />
    </div>
    <div v-else>
        <NewsArticle :news_id="news_id" />
    </div>
</template>
