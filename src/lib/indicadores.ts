import { InflacionItem, SmvmItem, CanastaItem, UvaItem, InflacionInteranualItem, Indicadores } from '@/types'

const BASE = 'https://api.argentinadatos.com/v1'
const REVALIDATE = 86400

async function fetchJSON<T>(url: string): Promise<T> {
  const res = await fetch(url, { next: { revalidate: REVALIDATE } })
  if (!res.ok) throw new Error(`Error fetching ${url}`)
  return res.json()
}

export async function getIndicadores(): Promise<Indicadores> {
  const [inflacionRaw, smvmRaw, canastaRaw, uvaRaw, interanualRaw] = await Promise.allSettled([
    fetchJSON<InflacionItem[]>(`${BASE}/finanzas/indices/inflacion`),
    fetchJSON<SmvmItem[]>(`${BASE}/variables/smvm`),
    fetchJSON<CanastaItem[]>(`${BASE}/canasta/basica/total`),
    fetchJSON<UvaItem[]>(`${BASE}/finanzas/indices/uva`),
    fetchJSON<InflacionInteranualItem[]>(`${BASE}/finanzas/indices/inflacion-interanual`),
  ])

  const inflacion: InflacionItem[] = inflacionRaw.status === 'fulfilled' ? inflacionRaw.value.slice(-12) : []

  const smvmArr: SmvmItem[] = smvmRaw.status === 'fulfilled' ? smvmRaw.value : []
  const smvmLast = smvmArr[smvmArr.length - 1]

  const canastaArr: CanastaItem[] = canastaRaw.status === 'fulfilled' ? canastaRaw.value : []
  const canastaLast = canastaArr[canastaArr.length - 1]

  const uva: UvaItem[] = uvaRaw.status === 'fulfilled' ? uvaRaw.value : []

  const interanual: InflacionInteranualItem[] = interanualRaw.status === 'fulfilled' ? interanualRaw.value : []

  return {
    inflacion,
    smvm: smvmLast?.valor ?? 0,
    smvmFecha: smvmLast?.fecha ?? '',
    canasta: canastaLast?.valor ?? 0,
    canastaFecha: canastaLast?.fecha ?? '',
    uva,
    inflacionInteranual: interanual,
  }
}
