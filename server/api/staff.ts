import { readFileSync, existsSync as isExists } from "fs"


const dir_of_staff = "assets/staff"

export default defineEventHandler(
    function (event)
    {
        let params = getQuery(event)
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

/*
function isStaffExist(staff_id: string): boolean
{
    const staff_dir = `${dir_of_staff}/${staff_id}`
    return isFileOrDirExist(staff_dir)
}

function isisFileOrDirExist(path:string)
{
}

async function getStaffInfo(staff_id: string | undefined): Promise<StaffCapsuleInfo>
{
    // Check whether stuff exist
    if (staff_id != undefined && isStaffExist(staff_id))
    {
        const staff_dir = `${dir_of_staff}/${staff_id}`
        let info: StaffInfo = await import(`${staff_dir}/info.ts`)
        let icon_path = `${staff_dir}/icon.jpg`
        // If the staff did not set an icon
        if (!isFileOrDirExist(icon_path)) { icon_path = dir_of_fallback_icon }

        return { ...info, icon_path }
    }
    else // If the stuff does not exist at all, or the user does not specify id
    {
        console.error(`The queried staff "${staff_id}" does not exist in path "${dir_of_staff}"`)

        return empty_staff_info
    }
}

*/