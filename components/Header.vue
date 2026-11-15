<template>
	<div class="progress" ref="progress" aria-hidden="true"></div>
	<div class="cursor" ref="cursor" aria-hidden="true"></div>

	<header :class="['site-header', { 'is-solid': solid, 'is-hidden': hidden }]">
		<div class="hd-inner">
			<NuxtLink to="/" class="hd-logo" aria-label="Nuxt Base ホーム"><span class="hd-mark">N</span>Nuxt Base</NuxtLink>
			<nav class="hd-nav" aria-label="メインメニュー">
				<NuxtLink to="/about" active-class="is-current">About</NuxtLink>
				<NuxtLink to="/skills" active-class="is-current">Skills</NuxtLink>
				<NuxtLink to="/blog" active-class="is-current">Blog</NuxtLink>
			</nav>
			<a href="#contact" class="hd-cta">Contact
				<svg width="14" height="10" viewBox="0 0 14 10" fill="none" aria-hidden="true"><path d="M1 5h12M9 1l4 4-4 4" stroke="currentColor" stroke-width="1.4" /></svg>
			</a>
			<button class="hd-burger" type="button" :aria-label="isOpen ? 'メニューを閉じる' : 'メニューを開く'"
				:aria-expanded="isOpen" aria-controls="spPanel" @click="isOpen = !isOpen">
				<span></span><span></span>
			</button>
		</div>
	</header>

	<div :class="['sp-panel', { 'is-open': isOpen }]" id="spPanel" :aria-hidden="!isOpen">
		<nav aria-label="モバイルメニュー">
			<NuxtLink to="/about" @click="isOpen = false"><small>01</small>About</NuxtLink>
			<NuxtLink to="/skills" @click="isOpen = false"><small>02</small>Skills</NuxtLink>
			<NuxtLink to="/blog" @click="isOpen = false"><small>03</small>Blog</NuxtLink>
			<a href="#contact" @click="isOpen = false"><small>04</small>Contact</a>
		</nav>
		<p class="sp-foot">Creating a Website with Modern JS</p>
	</div>
</template>

<script setup lang="ts">
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'

const route = useRoute()
const nuxtApp = useNuxtApp()

const isOpen = ref(false)
const solid = ref(false)
const hidden = ref(false)
const progress = ref<HTMLElement | null>(null)
const cursor = ref<HTMLElement | null>(null)

let lastY = 0

const onScroll = () => {
	const y = window.scrollY
	const header = document.querySelector<HTMLElement>('.site-header')
	const news = document.querySelector<HTMLElement>('.news')
	const h = header?.offsetHeight ?? 0
	// トップページは hero を抜けた後だけ、それ以外は少しスクロールしたら背景を付ける
	const pastHero = route.path === '/' ? (news ? news.getBoundingClientRect().top <= h : false) : y > 40
	solid.value = pastHero
	if (pastHero && y > lastY + 4 && !isOpen.value) hidden.value = true
	else if (y < lastY - 4 || !pastHero) hidden.value = false
	lastY = y

	if (progress.value) {
		const max = document.documentElement.scrollHeight - window.innerHeight
		progress.value.style.transform = `scaleX(${max > 0 ? Math.min(y / max, 1) : 0})`
	}
}

watch(isOpen, (open: boolean) => {
	document.body.style.overflow = open ? 'hidden' : ''
	document.body.classList.toggle('menu-open', open)
})

watch(() => route.fullPath, () => {
	isOpen.value = false
	nextTick(onScroll)
})

const onKey = (e: KeyboardEvent) => { if (e.key === 'Escape') isOpen.value = false }

let onMove: ((e: MouseEvent) => void) | null = null
let onLeave: (() => void) | null = null

onMounted(() => {
	lastY = window.scrollY
	window.addEventListener('scroll', onScroll, { passive: true })
	window.addEventListener('resize', onScroll)
	document.addEventListener('keydown', onKey)
	onScroll()

	// ページ遷移後は高さが変わるので ScrollTrigger を再計算
	nuxtApp.hook('page:finish', () => { setTimeout(() => ScrollTrigger.refresh(), 150) })
	window.addEventListener('load', () => ScrollTrigger.refresh())

	const reduce = window.matchMedia('(prefers-reduced-motion: reduce)').matches
	const finePointer = window.matchMedia('(hover: hover) and (pointer: fine)').matches
	if (finePointer && !reduce && cursor.value) {
		const c = cursor.value
		const xTo = gsap.quickTo(c, 'x', { duration: 0.45, ease: 'power3' })
		const yTo = gsap.quickTo(c, 'y', { duration: 0.45, ease: 'power3' })
		onMove = (e) => {
			c.classList.add('is-visible')
			xTo(e.clientX)
			yTo(e.clientY)
			const t = e.target as Element | null
			c.classList.toggle('is-hover', !!t?.closest?.('a, button, .skill-row, input, textarea'))
			c.classList.toggle('is-dark', !!t?.closest?.('.news, .band, .contact, .site-footer, .sp-panel'))
		}
		onLeave = () => c.classList.remove('is-visible')
		window.addEventListener('mousemove', onMove)
		document.addEventListener('mouseleave', onLeave)
	}
})

onBeforeUnmount(() => {
	window.removeEventListener('scroll', onScroll)
	window.removeEventListener('resize', onScroll)
	document.removeEventListener('keydown', onKey)
	if (onMove) window.removeEventListener('mousemove', onMove)
	if (onLeave) document.removeEventListener('mouseleave', onLeave)
	document.body.style.overflow = ''
})
</script>
