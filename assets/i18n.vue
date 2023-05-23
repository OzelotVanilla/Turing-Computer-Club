<script lang="ts">
import { DefaultLanguage, LanguageAvailable, LanguageOption } from "./i18n"


export const default_language: DefaultLanguage = "en"

export let lang_list = new Map<string, keyof LanguageOption>([
    ["English", "en"],
    ["Japanese", "ja"]
])

//TODO
export let lang: LanguageAvailable = "en";

export default {
    props: {
        lang_selected: String
    }
}
</script>

<template></template>