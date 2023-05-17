export type LanguageOption = {
    en: null,
    zh?: null,
    ja?: null
}

export type DefaultLanguage = keyof LanguageOption;

export type LanguageAvailable = keyof LanguageOption;

export type Translated<ObjectToBeTranslated> = {
    [Language in keyof LanguageOption]: ObjectToBeTranslated
}