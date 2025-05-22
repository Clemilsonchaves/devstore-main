import { env } from '@/env'

export function api(path: string, init?: RequestInit) {
  const baseUrl = env.NEXT_PUBLIC_API_BASE_URL

  if (!baseUrl) {
    throw new Error('NEXT_PUBLIC_API_BASE_URL não está definida')
  }

  // Garante que baseUrl termina com /
  const normalizedBaseUrl = baseUrl.endsWith('/') ? baseUrl : `${baseUrl}/`
  // Remove barra inicial de path, se houver
  const normalizedPath = path.startsWith('/') ? path.slice(1) : path

  const url = new URL(`api/${normalizedPath}`, normalizedBaseUrl)

  return fetch(url.toString(), init)
}
