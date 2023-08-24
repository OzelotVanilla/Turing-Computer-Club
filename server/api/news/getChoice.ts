import { readFileSync, existsSync as isExists, readdirSync as openDir, statSync as getFileStatus } from "fs"

const news_dir_path = "public/news"

const sortByUpdatedTime =
    (file_a_path: string, file_b_path: string) =>
        getFileStatus(file_a_path).mtime.valueOf() - getFileStatus(file_b_path).mtime.valueOf()

export default defineEventHandler(
    /**
     * This function will load 3 choiced news from the event database.
     * 
     * If not enough news, it will return less.
     * 
     * @returns Array of the choiced news' `news_id`.
     */
    function (event)
    {
        // Check if `news` folder exists
        if (isExists(news_dir_path))
        {
            const sorted_news_dir =
                openDir(news_dir_path)
                    .map(name => `${news_dir_path}/${name}`)
                    .sort(sortByUpdatedTime)

            return sorted_news_dir.map(path => path.split("/").at(-1)).slice(0, 3)
        }
        else
        {
            throw ReferenceError(`The news folder ("${news_dir_path}") does not exist.`)
        }
    }
)