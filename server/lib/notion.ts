import {Client} from '@notionhq/client';

const notion = new Client({auth: useRuntimeConfig().notionKey})
let cacheData: { references: any[]|null; biblio: any[]|null } = {
    biblio: null,
    references: null
}

export async function getNotionBiblio() {
    if (!cacheData.biblio) {
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
        cacheData.biblio = references.map(r => {
            // @ts-ignore
            const {id, properties} = r
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
                id,
                title,
                author,
                owner,
                pubDate,
                type,
                url,
                consultDate
            }
        })
            .sort((a, b) => {
                return a.author.localeCompare(b.author)
            })
    }
    return cacheData.biblio
}
export type NotionBiblioItem = {
    id: string,
    title: string,
    author: string,
    owner?: string,
    pubDate: Date,
    type: string,
    url: string,
    consultDate: Date
}

export async function getNotionReferences() {
    if (!cacheData.references) {
        const database_id = useRuntimeConfig().notionReferencesDatabaseId

        const {results} = await notion.databases.query({
            database_id,
            sorts: [
                {
                    property: 'Num',
                    direction: 'ascending',
                },
            ]
        })
        const references = results
        cacheData.references = references.map(r => {
            // @ts-ignore
            const {properties} = r
            return {
                num: properties.Num.number,
                normal: properties.Normal.title[0]?.plain_text,
                italic: properties.Italic.rich_text[0]?.plain_text,
                url: properties.URL.url
            }
        })
    }
    return cacheData.references
}

export type NotionReferenceItem = {
    num: number,
    normal?: string,
    italic?: string,
    url: string
}
