import { InflacionItem, CanastaItem, UvaItem, InflacionInteranualItem, Indicadores } from '@/types'
import { SMVM } from '@/lib/config'

const BASE = 'https://api.argentinadatos.com/v1'
const REVALIDATE = 86400

async function fetchJSON<T>(url: string): Promise<T> {
  const res = await fetch(url, { next: { revalidate: REVALIDATE } })
  if (!res.ok) throw new Error(`Error fetching ${url}`)
  return res.json()
}

export async function getIndicadores(): Promise<Indicadores> {
  const [inflacionRaw, canastaRaw, uvaRaw, interanualRaw] = await Promise.allSettled([
    fetchJSON<InflacionItem[]>(`${BASE}/finanzas/indices/inflacion`),
    fetchJSON<CanastaItem[]>(`${BASE}/canasta/basica/total`),
    fetchJSON<UvaItem[]>(`${BASE}/finanzas/indices/uva`),
    fetchJSON<InflacionInteranualItem[]>(`${BASE}/finanzas/indices/inflacion-interanual`),
  ])

  const inflacion: InflacionItem[] = inflacionRaw.status === 'fulfilled' ? inflacionRaw.value.slice(-12) : []

  const canastaArr: CanastaItem[] = canastaRaw.status === 'fulfilled' ? canastaRaw.value : []
  const canastaLast = canastaArr[canastaArr.length - 1]

  const uva: UvaItem[] = uvaRaw.status === 'fulfilled' ? uvaRaw.value : []

  const interanual: InflacionInteranualItem[] = interanualRaw.status === 'fulfilled' ? interanualRaw.value : []

  return {
    inflacion,
    smvm: SMVM.valor,
    smvmFecha: SMVM.updatedAt,
    canasta: canastaLast?.valor ?? 0,
    canastaFecha: canastaLast?.fecha ?? '',
    uva,
    inflacionInteranual: interanual,
  }
}
