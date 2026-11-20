// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  // devtools: { enabled: true },
  build: {
    transpile: ['gsap']
  },
  compatibilityDate: '2026-11-21',
  modules: ['@nuxtjs/google-fonts'],
  googleFonts: {
    families: {
      Lato: [300, 400, 700, 900],
      'Cormorant Garamond': { wght: [400, 500, 600], ital: [400, 500] },
      NanumMyeongjo: [700],
    },
  },
  app: {
    head: {
      htmlAttrs: {
        lang: 'ja'
      },
      link: [
        {
          rel: "preconnect",
          href: "https://fonts.googleapis.com",
        }
      ]
    }
  },
  runtimeConfig: {
    // サーバー側のみで使用（クライアントには公開しない）
    microcms: {
      serviceDomain: process.env.MICROCMS_SERVICE_DOMAIN,
      apiKey: process.env.MICROCMS_API_KEY
    },
    contact: {
      to: process.env.CONTACT_TO_EMAIL,
      smtpHost: process.env.SMTP_HOST || 'smtp.gmail.com',
      smtpPort: process.env.SMTP_PORT || '465',
      smtpUser: process.env.SMTP_USER,
      smtpPass: process.env.SMTP_PASS
    },
    recaptchaSecretKey: process.env.RECAPTCHA_SECRET_KEY
  },
  typescript: {
    typeCheck: true
  },
  css: [
    '~/assets/scss/style.scss',
    '~/assets/scss/design.scss',
  ]
})