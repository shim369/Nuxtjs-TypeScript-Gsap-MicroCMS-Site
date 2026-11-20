<template>
    <main class="page">
        <header class="page-head">
            <div class="container">
                <span class="eyebrow" data-reveal><span class="num">01</span>Blog</span>
                <h1 class="display split">Latest <em>Writing</em></h1>
                <p class="page-lead" data-reveal>This blog is powered by a headless CMS. It offers the flexibility to use any tech stack and allows for content reuse across multiple platforms. The system ensures fast performance even under high traffic, reduces security risks, and provides centralized content management.</p>
            </div>
            <span class="ghost" aria-hidden="true">Blog</span>
        </header>
        <section class="page-body">
            <div class="container">
                <div v-if="articles.length" class="post-grid">
                    <NuxtLink v-for="article in articles" :key="article.id" class="post" :to="`/articles/${article.id}`" :title="article.title" data-reveal>
                        <div class="post-thumb"><img v-if="article.eyecatch?.url" :src="article.eyecatch.url" :alt="`Cover image for ${article.title}`" width="400" height="300" loading="lazy" /></div>
                        <div class="post-meta"><svg width="12" height="12" viewBox="0 0 12 12" fill="none" aria-hidden="true"><circle cx="6" cy="6" r="5.3" stroke="currentColor" /><path d="M6 3v3l2 1.4" stroke="currentColor" /></svg><time :datetime="article.publishedAt">{{ formatDate(article.publishedAt) }}</time><span v-if="article.category?.name" class="cat">{{ article.category.name }}</span></div>
                        <h2 class="post-title"><span>{{ article.title }}</span></h2>
                    </NuxtLink>
                </div>
                <p v-else class="empty">No posts yet.</p>
            </div>
        </section>
    </main>
</template>
<script setup lang="ts">
import type { ArticleResponse } from '#shared/types/article'

const { data } = await useFetch<ArticleResponse>('/api/blogs', { key: 'articles' })
const articles = computed(() => data.value?.contents ?? [])

usePageReveal()

useSeoMeta({
  title: 'Blog | Nuxt Base',
  description: 'Nuxt Base is a website by Nuxt 4'
})
</script>