import { fallback_lang } from "assets/i18n"
import { readFileSync, existsSync as isExists } from "fs"

const projects_dir_path = "public/project"
const project_meta_file_name = "info.json"

export default defineEventHandler(
    function (event): ProjectResponse
    {
        const params = getQuery(event)
        const project_id = params.id as string
        const user_desired_lang = getCookie(event, "app_lang") as string
        const project_path = `${projects_dir_path}/${project_id}`
        const project_metafile_dir = `${project_path}/${project_meta_file_name}`

        // If project exists
        if (isExists(project_path) && isExists(project_metafile_dir))
        {
            let result: TCCProject = {
                name: "",
                since: null,
                supervisor: "",
            };
            let meta_info = JSON.parse(readFileSync(project_metafile_dir, "utf-8"))
            result.name = meta_info.name
            result.since = new Date(meta_info.since)
            result.supervisor = meta_info.supervisor

            const user_desired_lang_content_path = `${project_path}/${user_desired_lang}.md`
            const fallback_lang_content = `${project_path}/${fallback_lang}.md`
            if (user_desired_lang.trim().length > 0 && isExists(user_desired_lang_content_path))
            {
                const detail = readFileSync(user_desired_lang_content_path, "utf-8")
                return ({ status_code: 200, message: "", data: { detail, info: result } })
            }
            else if (isExists(`${fallback_lang_content}`))
            {
                const detail = readFileSync(fallback_lang_content, "utf-8")
                console.warn(`Using fallback lang of project (news_id: "${project_id}"). User required "${user_desired_lang}".`)
                return ({ status_code: 200, message: "", data: { detail, info: result } })
            }
            else // No project detail 
            {
                return ({ status_code: 200, message: "No detail.", data: { info: result, detail: "" } })
            }
        }
        else // Project does not exists
        {
            return ({ status_code: 400, message: "No such project, or corrupted meta file." })
        }
    }
)

export type ProjectResponse = {
    status_code: number
    message: string
    data?: {
        info: TCCProject
        /** Markdown string of project */
        detail: string
    }
}

export type TCCProject = {
    name: string,
    since: Date | null,
    supervisor: string
}