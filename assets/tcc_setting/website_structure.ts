interface TCCPage
{
    name: string
    path: string
    description?: string
    subpage?: TCCPage[]
}

let website_structure: TCCPage[] = [
    { name: "News", path: "/news" },
    { name: "Events", path: "/events" },
    { name: "About Us", path: "/about" },
]

export default website_structure