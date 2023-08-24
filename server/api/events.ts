import { fallback_lang } from "assets/i18n"
import { readFileSync, existsSync as isExists } from "fs"

const events_dir_path = "public/events"
const project_meta_file_name = "info.json"
const project_detail_file_name = "detail.md"

export default defineEventHandler(
    function (event): Response
    {
        const params = getQuery(event)
        const user_desired_lang = getCookie(event, "app_lang") as string
        const event_id = params.id as string
        const event_path = `${events_dir_path}/${event_id}`
        const project_metafile_dir = `${event_path}/${project_meta_file_name}`
        const meta_data = JSON.parse(readFileSync(project_metafile_dir, "utf-8")) as TCCProjectMetadata
        const correct_meta_file = ("name" in meta_data) && ("supervisor" in meta_data)

        // If events exists
        if (isExists(event_path) && isExists(project_metafile_dir) && correct_meta_file)
        {
            // Check if there is user desired language
            const user_desired_lang_content_path = `${event_path}/${user_desired_lang}.md`
            const fallback_lang_content = `${event_path}/${fallback_lang}.md`
            if (user_desired_lang.trim().length > 0 && isExists(user_desired_lang_content_path))
            {
                const project_detail = readFileSync(user_desired_lang_content_path, "utf-8")
                return ({
                    status_code: 200,
                    data: { detail: project_detail, ...meta_data },
                    message: ""
                })
            }
            else if (isExists(`${fallback_lang_content}`))
            {
                const data = readFileSync(fallback_lang_content, "utf-8")
                console.warn(`Using fallback lang of events (event_id: "${event_id}"). User required "${user_desired_lang}".`)
                return ({ status_code: 200, data: { detail: data, ...meta_data }, message: "" })
            }
            else
            {
                console.warn(
                    `Event (event_id: "${event_id}") does not have fallback lang version or user desired lang!\n` +
                    `Desired: ${user_desired_lang}\nFallback: ${fallback_lang}`
                )
                return ({ status_code: 404, data: null, message: `The requested event with id ${event_id} does not exists.` })
            }
        }
        else // Project does not exists
        {
            return ({ status_code: 404, data: null, message: "No such project, or corrupted meta file." })
        }
    }
)

type Response = {
    status_code: number
    message: string
    data: TCCProject | null
}

type TCCProjectMetadata = {
    name: string
    /** String of timestamp in milliseconds */
    since?: string
    /** String of timestamp in milliseconds */
    end?: string | null
    supervisor: string
}

export type TCCProject =
    {
        name: string,
        since?: string,
        end?: string | null
        supervisor: string,
        detail: string,
    }