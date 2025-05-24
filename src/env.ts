import { createEnv } from '@t3-oss/env-nextjs'
import { z } from 'zod'

export const env = createEnv({
  server: {
    APP_URL: z.string().url(),
  },
  client: {
    NEXT_PUBLIC_API_BASE_URL: z.string().url(),
  },
  runtimeEnv: {
    APP_URL: process.env.APP_URL,
    NEXT_PUBLIC_API_BASE_URL:
      process.env.NEXT_PUBLIC_API_BASE_URL ?? 'http://localhost:3000',
  },
  skipValidation: true,
})

export function fetchFromApi(path: string, init?: RequestInit) {
  const baseUrl = env.NEXT_PUBLIC_API_BASE_URL

  if (!baseUrl) {
    throw new Error('NEXT_PUBLIC_API_BASE_URL não está definida')
  }

  // Garante que baseUrl termina com /
  const normalizedBaseUrl = baseUrl.endsWith('/') ? baseUrl : `${baseUrl}/`
  // Remove barra inicial de path, se houver
  const normalizedPath = path.startsWith('/') ? path.slice(1) : path

  const url = new URL(`api/${normalizedPath}`, normalizedBaseUrl)

  // eslint-disable-next-line prettier/prettier
  return fetch(url.toString(), init)


  .catch(error => {
    if (error.name === 'AbortError') {
      console.error('Request timed out')
      return { error: 'timeout' }
    }
    throw error
  })

  cy.get('a[href^="/product"]', { timeout: 10000 }).should('be.visible').first()
  cy.wait(300)
  cy.get('a[href^="/product"]').first().click({ force: true })
}
