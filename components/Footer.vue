<template>
	<footer class="s site-footer" ref="root">
		<div class="container">
			<div class="ft-top">
				<nav class="ft-nav" aria-label="フッターメニュー">
					<NuxtLink to="/about">About</NuxtLink>
					<NuxtLink to="/skills">Skills</NuxtLink>
					<NuxtLink to="/blog">Blog</NuxtLink>
					<a href="#contact">Contact</a>
				</nav>
				<button class="to-top" type="button" @click="toTop">Back to top
					<span class="circ"><svg width="10" height="14" viewBox="0 0 10 14" fill="none" aria-hidden="true"><path d="M5 13V1M1 5l4-4 4 4" stroke="currentColor" stroke-width="1.4" /></svg></span>
				</button>
			</div>
			<NuxtLink to="/" class="ft-word" aria-label="Nuxt Base ホーム">Nuxt <em>Base</em></NuxtLink>
			<div class="ft-bottom">
				<span>&copy; {{ year }} Nuxt Base</span>
				<span>Creating a Website with Modern JS</span>
			</div>
		</div>
	</footer>
</template>

<script setup lang="ts">
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'

const year = new Date().getFullYear()
const root = ref<HTMLElement | null>(null)
let ctx: gsap.Context | null = null

const toTop = () => {
	const reduce = window.matchMedia('(prefers-reduced-motion: reduce)').matches
	window.scrollTo({ top: 0, behavior: reduce ? 'auto' : 'smooth' })
}

onMounted(() => {
	if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return
	gsap.registerPlugin(ScrollTrigger)
	ctx = gsap.context(() => {
		gsap.from('.ft-word', {
			yPercent: 40, opacity: 0, duration: 1.4, ease: 'expo.out',
			scrollTrigger: { trigger: root.value, start: 'top 85%', toggleActions: 'play none none none' }
		})
	}, root.value ?? undefined)
})

onBeforeUnmount(() => ctx?.revert())
</script>
