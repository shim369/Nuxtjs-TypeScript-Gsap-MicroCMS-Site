import { createClient } from 'microcms-js-sdk'

export const useMicroCMSClient = () => {
  const config = useRuntimeConfig()
  return createClient({
    serviceDomain: config.microcms.serviceDomain,
    apiKey: config.microcms.apiKey
  })
}
