import { Translated } from "~/assets/i18n"

interface TCCText
{
    club_name: string,
    club_slogan: string,
    creativity_title: string,
    creativity_text: string,
}

let tcc_text_en: TCCText = {
    club_name: "Turing Computer Club",
    club_slogan: "The Creativity with the topping of Code.",
    creativity_title: "Inspired, Motivated, Innovation",
    creativity_text: "Sample text."
}

let tcc_text_ja: TCCText = {
    club_name: "電算部活 Turing",
    club_slogan: "創意発想を代文で綴る",
    creativity_title: "閃いている，鼓動された，革新",
    creativity_text: "ここで何かを書いてください。"
}

let tcc_text: Translated<TCCText> = {
    en: tcc_text_en,
    ja: tcc_text_ja
}

export default tcc_text