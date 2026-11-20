<template>
    <main class="result">
        <div class="result-in">
            <h1 class="split"><em>Error!</em></h1>
            <p data-reveal>Something went wrong while sending your message. Please try again in a little while.</p>
            <NuxtLink to="/" class="btn-line" data-reveal>Back to Top
                <svg width="16" height="10" viewBox="0 0 16 10" fill="none" aria-hidden="true"><path d="M1 5h14M11 1l4 4-4 4" stroke="currentColor" stroke-width="1.4" /></svg>
            </NuxtLink>
        </div>
    </main>
</template>

<script lang="ts" setup>
usePageReveal()

useSeoMeta({
  title: 'Error',
  description: '問い合わせの送信が失敗しました'
})
</script>
