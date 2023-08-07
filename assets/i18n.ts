export type LanguageOption = {
    en: null,
    zh?: null,
    ja?: null,
    ja_kanji?: null
}

export type DefaultLanguage = keyof LanguageOption;

export type LanguageAvailable = keyof LanguageOption;

export type Translated<ObjectToBeTranslated> = {
    [Language in keyof LanguageOption]: ObjectToBeTranslated
}

export let lang_list: LanguageAvailable[] = ["en", "ja_kanji", "zh"]

export const fallback_lang: keyof LanguageOption = "en"