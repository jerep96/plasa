import { MinutosItem } from '@/types'
import { formatPesos } from '@/lib/format'
import { SMVM } from '@/lib/config'

interface Props {
  items: MinutosItem[]
}

function colorClase(min: number): string {
  if (min > 30) return 'text-plasa-red'
  if (min >= 15) return 'text-plasa-amber'
  return 'text-plasa-green'
}

function barColor(min: number): string {
  if (min > 30) return '#C0392B'
  if (min >= 15) return '#B8780A'
  return '#2A7A4B'
}

export default function MinutosDeTrabajo({ items }: Props) {
  if (!items.length) return null

  const maxMin = Math.max(...items.map((i) => i.minutos))
  const oldestUpdate = items
    .map((i) => i.updatedAt)
    .sort()
    .at(0) ?? ''

  const formatUpdatedAt = (d: string) => {
    const [y, m, day] = d.split('-')
    return `${parseInt(day)}/${parseInt(m)}/${y}`
  }

  return (
    <section className="fade-up fade-up-4 border-b-[2px] border-ink">
      <div className="max-w-[980px] mx-auto px-7 py-8">
        <p className="font-mono text-[11px] uppercase tracking-widest text-ink-muted mb-2 border-b border-ink/20 pb-2">
          ¿Cuánto trabajás para pagar?
        </p>
        <p className="font-archivo italic text-[13px] text-ink-muted mb-6">
          Basado en el salario mínimo vigente ({formatPesos(SMVM.valor)}/mes) y jornada laboral de 8 horas. Precios
          relevados en AMBA · Actualización:{' '}
          {oldestUpdate ? formatUpdatedAt(oldestUpdate) : '—'}
        </p>

        <div className="flex flex-col gap-5">
          {items.map((item) => {
            const pct = maxMin > 0 ? (item.minutos / maxMin) * 100 : 0
            const color = barColor(item.minutos)
            const textColor = colorClase(item.minutos)

            return (
              <div key={item.key} className="border-b border-ink/10 pb-5 last:border-0 last:pb-0">
                <div className="flex items-start justify-between gap-4 mb-2">
                  <div>
                    <p className="font-archivo-black text-[16px] text-ink leading-tight">
                      {item.emoji} {item.nombre}
                    </p>
                    <p className="font-mono text-[10px] text-ink-muted mt-0.5">
                      {formatPesos(item.precio)} · act. {formatUpdatedAt(item.updatedAt)}
                    </p>
                  </div>
                  <div className="text-right shrink-0">
                    <p
                      className={`font-archivo-black leading-none ${textColor}`}
                      style={{ fontSize: 'clamp(28px, 4vw, 42px)' }}
                    >
                      {item.minutos}
                    </p>
                    <p className="font-mono text-[9px] uppercase tracking-widest text-ink-muted">
                      minutos
                    </p>
                  </div>
                </div>

                {/* Progress bar */}
                <div className="h-[6px] bg-ink/10 w-full">
                  <div
                    className="h-full bar-animate"
                    style={
                      {
                        '--bar-width': `${pct}%`,
                        backgroundColor: color,
                      } as React.CSSProperties
                    }
                  />
                </div>
              </div>
            )
          })}
        </div>

        <p className="font-mono text-[10px] text-ink-muted mt-6">
          ↑ Rojo = más de 30 min · Ámbar = 15–30 min · Verde = menos de 15 min
        </p>
      </div>
    </section>
  )
}
