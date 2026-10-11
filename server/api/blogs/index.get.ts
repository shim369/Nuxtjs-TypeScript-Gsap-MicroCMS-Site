import type { ArticleResponse } from '~/types/article'

export default defineEventHandler(async () => {
  const client = useMicroCMSClient()
  return await client.get<ArticleResponse>({
    endpoint: 'blogs',
    queries: {
      fields: ['id', 'title', 'eyecatch', 'category', 'publishedAt'],
      limit: 100
    }
  })
})
