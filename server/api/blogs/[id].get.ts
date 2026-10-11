import type { Article } from '~/types/article'

export default defineEventHandler(async (event) => {
  const id = getRouterParam(event, 'id')
  if (!id) {
    throw createError({ statusCode: 400, statusMessage: 'Missing id' })
  }
  const client = useMicroCMSClient()
  try {
    return await client.getListDetail<Article>({
      endpoint: 'blogs',
      contentId: id
    })
  } catch (err) {
    // microcms-js-sdk は "fetch API response status: 404" のような Error を投げる
    if (err instanceof Error && /status: 404/.test(err.message)) {
      throw createError({ statusCode: 404, statusMessage: 'Article not found' })
    }
    throw err
  }
})
