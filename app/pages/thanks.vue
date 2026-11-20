<template>
    <main class="result">
        <div class="result-in">
            <h1 class="split">Thank <em>you!</em></h1>
            <p data-reveal>Your message has been sent. I'll get back to you soon.</p>
            <NuxtLink to="/" class="btn-line" data-reveal>Back to Top
                <svg width="16" height="10" viewBox="0 0 16 10" fill="none" aria-hidden="true"><path d="M1 5h14M11 1l4 4-4 4" stroke="currentColor" stroke-width="1.4" /></svg>
            </NuxtLink>
        </div>
    </main>
</template>

<script lang="ts" setup>
usePageReveal()

useHead({
  title: 'Thank you',
  meta: [
    { name: 'description', content: '問い合わせの送信が成功しました' }
  ]
})
</script>
