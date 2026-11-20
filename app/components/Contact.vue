<template>
	<section id="contact" class="s contact" ref="root" aria-labelledby="contactTitle">
		<div class="container contact-grid">
			<div class="contact-intro">
				<span class="eyebrow light" data-reveal><span class="num">06</span>Contact</span>
				<h2 class="split" id="contactTitle">Let's build <em>something.</em></h2>
				<p data-reveal>Have a project in mind, or just want to say hello? Send a message and I'll get back to you.</p>
			</div>
			<form class="cform" novalidate data-reveal @submit="onSubmit">
				<div :class="['field', { 'is-invalid': errors.name }]">
					<input id="name" v-model="name" name="name" type="text" placeholder=" " autocomplete="name"
						aria-describedby="error-name" :aria-invalid="!!errors.name">
					<label for="name">Name</label>
					<span class="err" id="error-name" aria-live="assertive">{{ errors.name }}</span>
				</div>
				<div :class="['field', { 'is-invalid': errors.email }]">
					<input id="email" v-model="email" name="email" type="email" placeholder=" " autocomplete="email"
						aria-describedby="error-email" :aria-invalid="!!errors.email">
					<label for="email">Email</label>
					<span class="err" id="error-email" aria-live="assertive">{{ errors.email }}</span>
				</div>
				<div :class="['field', { 'is-invalid': errors.message }]">
					<textarea id="message" v-model="message" name="message" placeholder=" "
						aria-describedby="error-message" :aria-invalid="!!errors.message" />
					<label for="message">Message</label>
					<span class="err" id="error-message" aria-live="assertive">{{ errors.message }}</span>
				</div>
				<div class="actions">
					<button class="submit" type="submit" :disabled="sending">Submit
						<svg width="14" height="14" viewBox="0 0 14 14" fill="none" aria-hidden="true"><path d="M2 12L12 2M4 2h8v8" stroke="currentColor" stroke-width="1.6" /></svg>
					</button>
					<p class="form-status" aria-live="polite">{{ sending ? 'Sending…' : '' }}</p>
				</div>
			</form>
		</div>

		<p class="recaptcha">This site is protected by reCAPTCHA and the Google<br>
			<a href="https://policies.google.com/privacy">Privacy Policy</a> and
			<a href="https://policies.google.com/terms">Terms of Service</a> apply.
		</p>
	</section>
</template>
<script lang="ts" setup>
import { useForm } from 'vee-validate'
import { VueReCaptcha, useReCaptcha } from 'vue-recaptcha-v3'

const schema = {
  name (value: string) {
    if (!value) {
      return 'Name is required'
    }
    return true
  },
  email (value: string) {
    if (!value) {
      return 'Email is required'
    }
    return true
  },
  message (value: string) {
    if (!value) {
      return 'Message is required'
    }
    return true
  }
}

const { useFieldModel, handleSubmit, errors } = useForm({
  validationSchema: schema
})

const [name, email, message] = useFieldModel(['name', 'email', 'message'])

const { vueApp } = useNuxtApp()
	vueApp.use(VueReCaptcha, {
	siteKey: '6Lf8DVUoAAAAAOj7-WXMaIfuRlWpmcpbp48ay4oc',
	loaderOptions: {
		renderParameters: {
			hl: 'en'
		}
	}
})
const recaptchaInstance = useReCaptcha()

const sending = ref(false)
const root = ref<HTMLElement | null>(null)
let cleanup: (() => void) | null = null

onMounted(() => { cleanup = initReveal(root.value ?? document) })
onBeforeUnmount(() => cleanup?.())

const onSubmit = handleSubmit(async (values) => {
	sending.value = true
	await recaptchaInstance?.recaptchaLoaded()
	const token = await recaptchaInstance?.executeRecaptcha('submit')

	try {
		await $fetch('/api/contact', {
			method: 'POST',
			body: { ...values, googleReCaptchaToken: token }
		})
		await navigateTo('/thanks')
		sending.value = false
	} catch (err) {
		sending.value = false
		await navigateTo('/error')
	}
})
</script>
