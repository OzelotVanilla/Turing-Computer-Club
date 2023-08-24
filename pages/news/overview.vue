<script setup lang="ts">
const { data: choiced_news } = await useFetch("/api/news/getChoice")

</script>

<template>
    <div>News Overview</div>
</template>