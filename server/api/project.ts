import { readFileSync, existsSync as isExists } from "fs"

const projects_dir_path = "assets/project_db"
const project_meta_file_name = "info.json"
const project_detail_file_name = "detail.md"

export default defineEventHandler(
    function (event)
    {
        const params = getQuery(event)
        const project_id = params.id as string
        const project_path = `${projects_dir_path}/${project_id}`
        const project_metafile_dir = `${project_path}/${project_meta_file_name}`
        const project_detail_dir = `${project_path}/${project_detail_file_name}`

        // If project exists
        if (isExists(project_path) && isExists(project_metafile_dir))
        {
            let result: TCCProject = {
                name: "",
                since: null,
                supervisor: "",
                detail: "",
                error: null
            };
            let meta_info = JSON.parse(readFileSync(project_metafile_dir, "utf-8"))
            result.name = meta_info.name
            result.since = new Date(meta_info.since)
            result.supervisor = meta_info.supervisor

            // Check if there is a detail file about the project.
            if (isExists(project_detail_dir))
            {
                result.detail = readFileSync(project_detail_dir, "utf-8")
            }

            return JSON.stringify(result)
        }
        else// Project does not exists
        {
            return JSON.stringify({ error: "No such project, or corrupted meta file." })
        }
    }
)

export type TCCProject =
    {
        name: string,
        since: Date | null,
        supervisor: string,
        detail: string,
        error: string | null
    }