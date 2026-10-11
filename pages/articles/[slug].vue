<template>
  <main class="under-main">
    <template v-if="article">
      <section class="blog-detail">
        <div class="container">
          <div class="bg"></div>
          <h1 class="blog-title">{{ article?.title }}</h1>
          <div class="blog-detail-inner">
            <div class="date">
              <i class="material-icons">schedule</i>
              {{ formatDate(article.publishedAt) }}
            </div>
            <div v-html="article?.content" class="blog-body">
            </div>
          </div>
        </div>
      </section>
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