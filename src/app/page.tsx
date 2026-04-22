import { getIndicadores } from '@/lib/indicadores'
import { PRECIOS, calcularMinutos, SMVM } from '@/lib/config'
import type { MinutosItem, Indicadores } from '@/types'

async function getDolarBlue(): Promise<number | null> {
  try {
    const res = await fetch('https://dolarapi.com/v1/dolares/blue', { next: { revalidate: 300 } })
    if (!res.ok) return null
    const data = await res.json()
    return data.venta ?? null
  } catch {
    return null
  }
}

import Header from '@/components/Header'
import DolarTicker from '@/components/DolarTicker'
import HeadlineEditorial from '@/components/HeadlineEditorial'
import MinutosDeTrabajo from '@/components/MinutosDeTrabajo'
import CanastaVsSalario from '@/components/CanastaVsSalario'
import Inflacion from '@/components/Inflacion'
import UVA from '@/components/UVA'
import Footer from '@/components/Footer'

const EMPTY_INDICADORES: Indicadores = {
  inflacion: [],
  smvm: 0,
  smvmFecha: '',
  canasta: 0,
  canastaFecha: '',
  uva: [],
  inflacionInteranual: [],
}

export default async function Home() {
  let indicadores: Indicadores = EMPTY_INDICADORES
  let dolarBlue: number | null = null

  const [indicadoresResult, dolarBlueResult] = await Promise.allSettled([
    getIndicadores(),
    getDolarBlue(),
  ])
  if (indicadoresResult.status === 'fulfilled') indicadores = indicadoresResult.value
  if (dolarBlueResult.status === 'fulfilled') dolarBlue = dolarBlueResult.value

  const { smvm, uva, inflacion } = indicadores

  const minutosItems: MinutosItem[] = Object.entries(PRECIOS).map(([key, p]) => ({
    key,
    nombre: p.nombre,
    emoji: p.emoji,
    precio: p.precio,
    updatedAt: p.updatedAt,
    minutos: calcularMinutos(p.precio, SMVM.valor),
  }))

  return (
    <main>
      <Header />
      <DolarTicker />
      <HeadlineEditorial items={minutosItems} dolarBlue={dolarBlue ?? undefined} />
      <MinutosDeTrabajo items={minutosItems} />
      <CanastaVsSalario smvm={smvm} />
      <Inflacion inflacion={inflacion} />
      <UVA uva={uva} />
      <Footer />
    </main>
  )
}
