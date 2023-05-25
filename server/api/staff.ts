import { readFileSync, existsSync as isExists } from "fs"

const dir_of_staff = "assets/staff"

export default defineEventHandler(
    function (event)
    {
        const params = getQuery(event)
        const staff_id = params.id as string
        const staff_path = `${dir_of_staff}/${staff_id}`
        const json_file_to_read = `${dir_of_staff}/${staff_id}/info.json`
        if (isExists(staff_path))
        {
            let staff_info = JSON.parse(readFileSync(json_file_to_read, "utf-8"))
            const possible_icon_path = `${staff_path}/icon.jpg`
            if (isExists(possible_icon_path))
            {
                staff_info.icon_path = possible_icon_path
            }
            else
            {
                staff_info.icon_path = null
            }

            return JSON.stringify(staff_info)
        }
        else
        {
            console.error(`Error reading file ${json_file_to_read}. The file does not exists`)
        }

    }
)