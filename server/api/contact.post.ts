import nodemailer from 'nodemailer'

interface ContactBody {
  name?: string
  email?: string
  message?: string
  googleReCaptchaToken?: string
}

const verifyRecaptcha = async (secret: string, token: string) => {
  const result = await $fetch<{ success: boolean, score?: number, action?: string, hostname?: string, 'error-codes'?: string[] }>(
    'https://www.google.com/recaptcha/api/siteverify',
    {
      method: 'POST',
      body: new URLSearchParams({ secret, response: token })
    }
  )
  const ok = result.success && result.action === 'submit' && (result.score ?? 0) >= 0.5
  if (!ok) {
    console.warn('reCAPTCHA verification failed', result)
  }
  return ok
}

export default defineEventHandler(async (event) => {
  const config = useRuntimeConfig()
  const { name, email, message, googleReCaptchaToken } = await readBody<ContactBody>(event)

  if (!name || !email || !message) {
    throw createError({ statusCode: 400, statusMessage: 'Missing required fields' })
  }
  if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
    throw createError({ statusCode: 400, statusMessage: 'Invalid email' })
  }

  if (config.recaptchaSecretKey) {
    if (!googleReCaptchaToken) {
      console.warn('reCAPTCHA token is missing')
    }
    if (!googleReCaptchaToken ||!(await verifyRecaptcha(config.recaptchaSecretKey, googleReCaptchaToken))) {
      throw createError({ statusCode: 403, statusMessage: 'reCAPTCHA verification failed' })
    }
  }

  const { to, smtpHost, smtpPort, smtpUser, smtpPass } = config.contact
  const transporter = nodemailer.createTransport({
    host: smtpHost,
    port: Number(smtpPort),
    secure: Number(smtpPort) === 465,
    auth: { user: smtpUser, pass: smtpPass }
  })

  try {
    await transporter.sendMail({
      from: smtpUser,
      to,
      replyTo: email,
      subject: `【Nuxt Base】お問い合わせ: ${name.replace(/[\r\n]/g, ' ')}`,
      text: `お名前: ${name}\nメールアドレス: ${email}\n\nメッセージ:\n${message}`
    })
  } catch (err) {
    console.error('Failed to send contact mail', err)
    throw createError({ statusCode: 500, statusMessage: 'Failed to send mail' })
  }

  return { ok: true }
})
