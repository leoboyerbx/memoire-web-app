import {getNotionBiblio, getNotionReferences} from '~/server/lib/notion';

export default defineEventHandler(async event => {
    const notionBiblio = await getNotionBiblio()
    const notionReferences = await getNotionReferences()
    return {
        biblio: notionBiblio,
        references: notionReferences
    }
})
