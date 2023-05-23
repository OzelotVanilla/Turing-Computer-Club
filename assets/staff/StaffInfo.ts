import { LanguageAvailable } from "../i18n"

export type StaffInfo =
    {
        name: string
        self_introduction: string
        major: StudentMajor
    }

export enum StudentMajor
{
    computer_science = "Computer Science",
    math = "Mathematics",
    graphic_desgin = "Graphic Design"
}

export function getTranslatedMajorInfo(major: StudentMajor, lang: LanguageAvailable)
{

}