import { VueReCaptcha } from 'vue-recaptcha-v3'

export default defineNuxtPlugin((nuxtApp) => {
  nuxtApp.vueApp.use(VueReCaptcha, {
    siteKey: '6Lf8DVUoAAAAAOj7-WXMaIfuRlWpmcpbp48ay4oc',
    loaderOptions: {
      renderParameters: {
        hl: 'en'
      }
    }
  })
})
