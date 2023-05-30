<script lang="ts">
import tcc_header from "../components/tcc_header.vue"
import tcc_footer from "../components/tcc_footer.vue"

export default {
    components: {
        tcc_header,
        tcc_footer
    }
}
</script>

<template>
    <div>
        <tcc_header style="z-index: 1;" />
        <slot></slot>
        <tcc_footer />
    </div>
</template>

<style>
body
{
    margin: 0px;
}
</style>