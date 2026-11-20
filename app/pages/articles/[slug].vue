<template>
  <main class="page">
    <template v-if="article">
      <header class="article-head">
        <div class="container">
          <div class="post-meta"><svg width="12" height="12" viewBox="0 0 12 12" fill="none" aria-hidden="true"><circle cx="6" cy="6" r="5.3" stroke="currentColor" /><path d="M6 3v3l2 1.4" stroke="currentColor" /></svg><time :datetime="article.publishedAt">{{ formatDate(article.publishedAt) }}</time><span v-if="article.category?.name" class="cat">{{ article.category.name }}</span></div>
          <h1 class="split">{{ article.title }}</h1>
        </div>
      </header>
      <article class="article-wrap">
        <div v-html="article.content" class="blog-body"></div>
        <NuxtLink to="/blog" class="btn-line article-back">All posts
          <svg width="16" height="10" viewBox="0 0 16 10" fill="none" aria-hidden="true"><path d="M1 5h14M11 1l4 4-4 4" stroke="currentColor" stroke-width="1.4" /></svg>
        </NuxtLink>
      </article>
    </template>
  </main>
</template>

<script lang="ts" setup>
import type { Article } from '~/types/article'

const route = useRoute()
const slug = route.params.slug as string

const { data, error } = await useFetch<Article>(`/api/blogs/${slug}`, { key: `article-${slug}` })
if (error.value) {
  throw createError({
    statusCode: error.value.statusCode ?? 500,
    statusMessage: error.value.statusMessage,
    fatal: true
  })
}
const article = data.value

usePageReveal()

useHead({
  title: article?.title + ' | Nuxt Base',
  meta: [
    { name: 'description', content: article?.title }
  ]
})

const formatDate = (dateString: string) => {
  const date = new Date(dateString);
  const year = date.getFullYear();
  const month = String(date.getMonth() + 1).padStart(2, '0');
  const day = String(date.getDate()).padStart(2, '0');

  return `${year}.${month}.${day}`;
};
</script>