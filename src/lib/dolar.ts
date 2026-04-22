import { DolarCasa } from '@/types'

export async function fetchDolar(): Promise<DolarCasa[]> {
  const res = await fetch('https://dolarapi.com/v1/dolares', { cache: 'no-store' })
  if (!res.ok) throw new Error('Error fetching dolar')
  return res.json()
}
