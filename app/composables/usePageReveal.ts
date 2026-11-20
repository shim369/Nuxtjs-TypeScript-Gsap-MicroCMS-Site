/** サブページ用: main 内の [data-reveal] / .split をスクロール表示にする */
export const usePageReveal = () => {
	let cleanup: (() => void) | null = null
	onMounted(() => { cleanup = initReveal(document.querySelector('main') ?? document) })
	onBeforeUnmount(() => cleanup?.())
}
