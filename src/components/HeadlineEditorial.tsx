import { MinutosItem } from '@/types'
import { formatPesos, formatUSD } from '@/lib/format'
import { JORNADA_HORAS, DIAS_LABORALES_MES, SMVM } from '@/lib/config'

interface Props {
  items: MinutosItem[]
  dolarBlue?: number
}

export default function HeadlineEditorial({ items, dolarBlue }: Props) {
  if (!items.length) return null

  const topItem = items.reduce((a, b) => (a.minutos > b.minutos ? a : b))

  const valorHora = SMVM.valor / (DIAS_LABORALES_MES * JORNADA_HORAS)
  const valorMinuto = valorHora / 60
  const smvmUSD = dolarBlue && dolarBlue > 0 ? SMVM.valor / dolarBlue : null

  return (
    <section className="fade-up fade-up-3 border-b-[2px] border-ink bg-cream-dark">
      <div className="max-w-[980px] mx-auto px-7 py-7">
        <p className="font-mono text-[11px] uppercase tracking-widest text-ink-muted mb-5 border-b border-ink/20 pb-2">
          El número del día
        </p>

        <p className="font-archivo text-xl sm:text-2xl leading-snug text-ink mb-6">
          Para comprar{' '}
          <span className="font-archivo-black text-plasa-red border-b-[3px] border-plasa-red">
            {topItem.emoji} {topItem.nombre}
          </span>
          , un trabajador de salario mínimo necesita trabajar{' '}
          <span className="font-archivo-black text-plasa-red border-b-[3px] border-plasa-red">
            {topItem.minutos} minutos
          </span>
          .
        </p>

        <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
          {[
            { label: 'Salario mínimo', value: formatPesos(SMVM.valor) },
            { label: 'Salario en USD blue', value: smvmUSD ? formatUSD(smvmUSD) : '—' },
            { label: 'Valor por hora', value: formatPesos(Math.round(valorHora)) },
            { label: 'Valor por minuto', value: formatPesos(Math.round(valorMinuto)) },
          ].map(({ label, value }) => (
            <div key={label} className="border border-ink/30 px-3 py-2">
              <p className="font-mono text-[9px] uppercase tracking-widest text-ink-muted mb-1">{label}</p>
              <p className="font-archivo-black text-ink text-lg leading-none">{value}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
