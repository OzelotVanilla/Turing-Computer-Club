import { fallback_lang } from "assets/i18n"
import { readFileSync, existsSync as isExists } from "fs"

const news_dir_path = "public/news"

export default defineEventHandler(
    function (event)
    {
        const params = getQuery(event)
        const news_id = params.id as string
        const user_desired_lang = (params.lang ?? "") as string
        const news_path = `${news_dir_path}/${news_id}`
        const news_content_path = `${news_path}`

        if (isExists(news_path) && isExists(news_content_path))
        {
            // Check if there is user desired language
            const user_desired_lang_content_path = `${news_content_path}/${user_desired_lang}.md`
            const fallback_lang_content = `${news_content_path}/${fallback_lang}.md`
            if (user_desired_lang.trim().length > 0 && isExists(user_desired_lang_content_path))
            {
                const data = readFileSync(user_desired_lang_content_path, "utf-8")
                return JSON.stringify({ status_code: 200, data, error: "" })
            }
            else if (isExists(`${fallback_lang_content}`))
            {
                const data = readFileSync(fallback_lang_content, "utf-8")
                console.warn(`Using fallback lang of news (news_id: "${news_id}"). User required "${user_desired_lang}".`)
                return JSON.stringify({ status_code: 200, data, error: "" })
            }
            else
            {
                console.warn(
                    `News (news_id: "${news_id}") does not have fallback lang version or user desired lang!\n` +
                    `Desired: ${user_desired_lang}\nFallback: ${fallback_lang}`
                )
                return JSON.stringify({ status_code: 404, data: "", error: `The requested news with id ${news_id} does not exists.` })
            }
        }
        else
        {
            return JSON.stringify({ status_code: 404, data: "", error: `The requested news with id ${news_id} does not exists.` })
        }
    }
)