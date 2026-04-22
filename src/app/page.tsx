import { getIndicadores } from '@/lib/indicadores'
import { PRECIOS, calcularMinutos, SMVM } from '@/lib/config'
import type { MinutosItem, Indicadores } from '@/types'

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

  try {
    indicadores = await getIndicadores()
  } catch {
    // fallback: todos los componentes muestran "—"
  }

  const { smvm, canasta, uva, inflacion, inflacionInteranual } = indicadores

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
      <HeadlineEditorial items={minutosItems} />
      <MinutosDeTrabajo items={minutosItems} />
      <CanastaVsSalario smvm={smvm} canasta={canasta} />
      <Inflacion inflacion={inflacion} inflacionInteranual={inflacionInteranual} />
      <UVA uva={uva} />
      <Footer />
    </main>
  )
}
