import {Client} from '@notionhq/client';

export async function getNotionBiblio() {
    const notion = new Client({auth: useRuntimeConfig().notionKey})
    const database_id = useRuntimeConfig().notionBiblioDatabaseId

    const {results} = await notion.databases.query({
        database_id,
        sorts: [
            {
                timestamp: 'created_time',
                direction: 'ascending',
            },
        ]
    })
    const references = results
    return references.map(r => {
        // @ts-ignore
        const {properties} = r
        const title = properties.Title.title[0].plain_text
        const authors = properties.Auteur.rich_text[0]?.plain_text.split('\n')
        let author = ''
        if (authors.length > 1) {
            authors.forEach((a: any, i: number) => {
                author += a
                if (i < authors.length - 2) {
                    author += ', '
                } else if (i === authors.length - 2) {
                    author += ' et '
                }
            })
        } else {
            author = authors[0]
        }
        const owner = properties.Owner.rich_text[0]?.plain_text
        const type = properties["Type"]["select"].name

        const formatter = new Intl.DateTimeFormat('fr-FR', {})
        let pubDate = properties['Publié le']?.date?.start
        if (pubDate) {
            const date = new Date(pubDate)
            pubDate = formatter.format(date)
        }
        const url = properties.URL.url

        let consultDate = properties['Consulté le'].created_time
        if (consultDate) {
            const date = new Date(consultDate)
            consultDate = formatter.format(date)
        }
        return {
            title,
            author,
            owner,
            pubDate,
            type,
            url,
            consultDate,
            feminin: false
        }
    })
        .sort((a, b) => {
            return a.author.localeCompare(b.author)
        })
        .reduce((result:any, ref) => {
            result[ref.type] = result[ref.type] || []
            result[ref.type].push(ref)
            if (['Vidéo'].includes(ref.type)) {
                ref.feminin = true
            }
            return result
        }, {})
}
