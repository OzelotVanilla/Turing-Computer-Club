import { Translated } from "~/assets/i18n"

interface IndexPageText
{
    news_pickup_text: string
}

let index_page_text_en: IndexPageText = {
    news_pickup_text: "News Pick-up"
}

let index_page_text_ja: IndexPageText = {
    news_pickup_text: "最新の出来事"
}

export let index_page_text: Translated<IndexPageText> = {
    en: index_page_text_en,
    ja: index_page_text_ja
}
