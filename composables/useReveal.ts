import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'

/** テキストを単語ごとの mask span に分割する (.split 用) */
export const splitWords = (el: HTMLElement) => {
	if (el.dataset.splitted) return
	el.dataset.splitted = '1'
	const walk = (node: Node) => {
		Array.from(node.childNodes).forEach((child) => {
			if (child.nodeType === 3) {
				const frag = document.createDocumentFragment()
				;(child.textContent ?? '').split(/(\s+)/).forEach((part) => {
					if (!part) return
					if (/^\s+$/.test(part)) {
						frag.appendChild(document.createTextNode(' '))
						return
					}
					const w = document.createElement('span')
					w.className = 'w'
					w.setAttribute('aria-hidden', 'true')
					const i = document.createElement('span')
					i.textContent = part
					w.appendChild(i)
					frag.appendChild(w)
				})
				child.replaceWith(frag)
			} else if (child.nodeType === 1 && (child as Element).tagName !== 'BR') {
				walk(child)
			}
		})
	}
	el.setAttribute('aria-label', (el.textContent ?? '').replace(/\s+/g, ' ').trim())
	walk(el)
}

/** scope 内の [data-reveal] / .split をスクロールで表示する。戻り値は cleanup */
export const initReveal = (scope: HTMLElement | Document = document): (() => void) => {
	if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return () => {}
	gsap.registerPlugin(ScrollTrigger)

	const ctx = gsap.context(() => {
		const els = Array.from(scope.querySelectorAll<HTMLElement>('[data-reveal]'))
		if (els.length) {
			gsap.set(els, { opacity: 0, y: 40 })
			ScrollTrigger.batch(els, {
				start: 'top 88%',
				once: true,
				onEnter: (batch) =>
					gsap.to(batch, { opacity: 1, y: 0, duration: 1.1, ease: 'expo.out', stagger: 0.09, overwrite: true })
			})
		}

		scope.querySelectorAll<HTMLElement>('.split').forEach((el) => {
			splitWords(el)
			gsap.from(el.querySelectorAll('.w > span'), {
				yPercent: 110,
				rotate: 4,
				duration: 1.2,
				ease: 'expo.out',
				stagger: 0.05,
				scrollTrigger: { trigger: el, start: 'top 85%', toggleActions: 'play none none none' }
			})
		})
	}, scope instanceof Document ? undefined : scope)

	return () => ctx.revert()
}
