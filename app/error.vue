<template>
  <NuxtLayout>
    <main class="result">
      <div class="result-in">
        <h1>{{ is404 ? '404' : 'Oops' }}<em>.</em></h1>
        <p>{{ is404 ? 'Page not found. The page you are looking for may have been moved or no longer exists.' : 'Something went wrong. Please try again in a little while.' }}</p>
        <button class="btn-line" type="button" @click="handleError">Back to Top
          <svg width="16" height="10" viewBox="0 0 16 10" fill="none" aria-hidden="true"><path d="M1 5h14M11 1l4 4-4 4" stroke="currentColor" stroke-width="1.4" /></svg>
        </button>
      </div>
    </main>
  </NuxtLayout>
</template>

<script setup lang="ts">
import type { NuxtError } from '#app'

const props = defineProps<{ error: NuxtError }>()
const is404 = computed(() => props.error?.statusCode === 404)
const handleError = () => clearError({ redirect: '/' })

useSeoMeta({ title: () => (is404.value ? '404 | Nuxt Base' : 'Error | Nuxt Base'), robots: 'noindex' })
</script>
