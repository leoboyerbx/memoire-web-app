import {getNotionBiblio} from '~/server/lib/notion';

export default defineEventHandler(async event => {
    const notionBiblio = await getNotionBiblio()
    console.log(notionBiblio)
    return {
        result: 'hey'
    }
})
