import { Translated } from "~/assets/i18n"

interface IndexPageText
{
    news_pickup_text: string
    news_pickup_area_description: string,
    member_text: string
}

let index_page_text_en: IndexPageText = {
    news_pickup_text: "News Pick-up",
    news_pickup_area_description: "You can know more about our club here. See the recent news!",
    member_text: "Members"
}

let index_page_text_ja: IndexPageText = {
    news_pickup_text: "最新の出来事",
    news_pickup_area_description: "電算部はどんな部活ですか? 興味がある方はこちらの出来事をご覧ください。",
    member_text: "部員"
}

export let index_page_text: Translated<IndexPageText> = {
    en: index_page_text_en,
    ja: index_page_text_ja
}
