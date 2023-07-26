<script setup lang="ts">
import EventOverview from "./overview.vue"

const route_info = useRoute()
const { events_param } = route_info.params
let events_id: string
if (events_param instanceof Array) { events_id = events_param.join() }
else { events_id = events_param ?? "" }
</script>

<style scoped>
@import "~/assets/style/common.css";
</style>

<template>
    <div class="website_container" v-if="events_id.trim().length == 0">
        <EventOverview />
    </div>
    <div class="website_container" v-else>

    </div>
</template>
