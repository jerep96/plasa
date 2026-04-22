import { UvaItem } from '@/types'
import { formatPct } from '@/lib/format'

interface Props {
  uva: UvaItem[]
}

function getItemNDaysAgo(arr: UvaItem[], days: number): UvaItem | undefined {
  const target = new Date()
  target.setDate(target.getDate() - days)
  const targetStr = target.toISOString().split('T')[0]
  let closest: UvaItem | undefined
  let minDiff = Infinity
  for (const item of arr) {
    const diff = Math.abs(new Date(item.fecha).getTime() - new Date(targetStr).getTime())
    if (diff < minDiff) {
      minDiff = diff
      closest = item
    }
  }
  return closest
}

export default function UVA({ uva }: Props) {
  const last = uva[uva.length - 1]
  const hace30 = getItemNDaysAgo(uva, 30)
  const hace365 = getItemNDaysAgo(uva, 365)

  const varMensual =
    last && hace30 && hace30.valor > 0
      ? ((last.valor - hace30.valor) / hace30.valor) * 100
      : null

  const varAnual =
    last && hace365 && hace365.valor > 0
      ? ((last.valor - hace365.valor) / hace365.valor) * 100
      : null

  const formatUvaValor = (n: number) =>
    n.toLocaleString('es-AR', { minimumFractionDigits: 2, maximumFractionDigits: 2 })

  return (
    <section className="fade-up fade-up-7 border-b-[2px] border-ink">
      <div className="max-w-[980px] mx-auto px-7 py-8">
        <p className="font-mono text-[11px] uppercase tracking-widest text-ink-muted mb-6 border-b border-ink/20 pb-2">
          UVA — Unidad de Valor Adquisitivo
        </p>

        <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 mb-5">
          {/* Valor hoy */}
          <div className="border-[2px] border-ink p-4">
            <p className="font-mono text-[10px] uppercase tracking-widest text-ink-muted mb-2">
              Valor UVA hoy
            </p>
            <p className="font-archivo-black text-ink leading-none" style={{ fontSize: 'clamp(24px,3vw,36px)' }}>
              {last ? `$${formatUvaValor(last.valor)}` : '—'}
            </p>
            {last && (
              <p className="font-mono text-[10px] text-ink-muted mt-1">{last.fecha}</p>
            )}
          </div>

          {/* Variación mensual */}
          <div className="border-[2px] border-ink p-4">
            <p className="font-mono text-[10px] uppercase tracking-widest text-ink-muted mb-2">
              Variación mensual
            </p>
            <p
              className="font-archivo-black leading-none"
              style={{
                fontSize: 'clamp(24px,3vw,36px)',
                color: varMensual !== null ? (varMensual >= 0 ? '#C0392B' : '#2A7A4B') : '#1A1410',
              }}
            >
              {varMensual !== null
                ? `${varMensual >= 0 ? '+' : ''}${formatPct(varMensual)}`
                : '—'}
            </p>
            <p className="font-mono text-[10px] text-ink-muted mt-1">vs. 30 días atrás</p>
          </div>

          {/* Variación anual */}
          <div className="border-[2px] border-ink p-4">
            <p className="font-mono text-[10px] uppercase tracking-widest text-ink-muted mb-2">
              Variación anual
            </p>
            <p
              className="font-archivo-black leading-none"
              style={{
                fontSize: 'clamp(24px,3vw,36px)',
                color: varAnual !== null ? (varAnual >= 0 ? '#C0392B' : '#2A7A4B') : '#1A1410',
              }}
            >
              {varAnual !== null
                ? `${varAnual >= 0 ? '+' : ''}${formatPct(varAnual)}`
                : '—'}
            </p>
            <p className="font-mono text-[10px] text-ink-muted mt-1">vs. 365 días atrás</p>
          </div>
        </div>

        <p className="font-archivo italic text-[12px] text-ink-muted">
          El UVA es una unidad de medida que se actualiza diariamente según la inflación (CER), utilizada principalmente en créditos hipotecarios.
        </p>
      </div>
    </section>
  )
}
