import { InflacionItem, UvaItem, Indicadores } from '@/types'
import { SMVM, CANASTA } from '@/lib/config'

const BASE = 'https://api.argentinadatos.com/v1'
const REVALIDATE = 86400

async function fetchJSON<T>(url: string): Promise<T> {
  const res = await fetch(url, { next: { revalidate: REVALIDATE } })
  if (!res.ok) throw new Error(`Error fetching ${url}`)
  return res.json()
}

export async function getIndicadores(): Promise<Indicadores> {
  const [inflacionRaw, uvaRaw] = await Promise.allSettled([
    fetchJSON<InflacionItem[]>(`${BASE}/finanzas/indices/inflacion`),
    fetchJSON<UvaItem[]>(`${BASE}/finanzas/indices/uva`),
  ])

  const inflacion: InflacionItem[] = inflacionRaw.status === 'fulfilled' ? inflacionRaw.value.slice(-12) : []
  const uva: UvaItem[] = uvaRaw.status === 'fulfilled' ? uvaRaw.value : []

  return {
    inflacion,
    smvm: SMVM.valor,
    smvmFecha: SMVM.updatedAt,
    canasta: CANASTA.valor,
    canastaFecha: CANASTA.updatedAt,
    uva,
    inflacionInteranual: [],
  }
}
