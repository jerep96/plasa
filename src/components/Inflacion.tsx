import { InflacionItem, InflacionInteranualItem } from '@/types'
import { formatPct, mesAbreviado } from '@/lib/format'

interface Props {
  inflacion: InflacionItem[]
  inflacionInteranual: InflacionInteranualItem[]
}

function barColor(valor: number): string {
  if (valor > 6) return '#C0392B'
  if (valor > 4) return '#B8780A'
  return '#1A1410'
}

export default function Inflacion({ inflacion, inflacionInteranual }: Props) {
  if (!inflacion.length) {
    return (
      <section className="fade-up fade-up-6 border-b-[2px] border-ink">
        <div className="max-w-[980px] mx-auto px-7 py-8">
          <p className="font-mono text-[11px] uppercase tracking-widest text-ink-muted mb-6 border-b border-ink/20 pb-2">
            Inflación mensual — últimos 12 meses
          </p>
          <p className="font-mono text-[12px] text-ink-muted">— Sin datos disponibles</p>
        </div>
      </section>
    )
  }

  const maxValor = Math.max(...inflacion.map((i) => i.valor))
  const mesActual = inflacion[inflacion.length - 1]?.valor ?? 0

  const currentYear = new Date().getFullYear()
  const acumulado = inflacion
    .filter((i) => i.fecha.startsWith(String(currentYear)))
    .reduce((acc, i) => (1 + acc) * (1 + i.valor / 100) - 1, 0) * 100

  const interanualLast = inflacionInteranual[inflacionInteranual.length - 1]?.valor ?? null

  return (
    <section className="fade-up fade-up-6 border-b-[2px] border-ink">
      <div className="max-w-[980px] mx-auto px-7 py-8">
        <p className="font-mono text-[11px] uppercase tracking-widest text-ink-muted mb-6 border-b border-ink/20 pb-2">
          Inflación mensual — últimos 12 meses
        </p>

        {/* Chart */}
        <div
          className="flex items-end gap-1 overflow-x-auto pb-2"
          style={{ height: '160px' }}
          aria-label="Gráfico de inflación mensual"
        >
          {inflacion.map((item) => {
            const heightPct = maxValor > 0 ? (item.valor / maxValor) * 100 : 0
            const color = barColor(item.valor)
            return (
              <div
                key={item.fecha}
                className="bar-col flex flex-col items-center flex-1 min-w-[28px]"
                style={{ height: '100%', justifyContent: 'flex-end' }}
              >
                {/* Value label */}
                <p className="font-mono text-[9px] text-ink-muted mb-0.5 whitespace-nowrap">
                  {formatPct(item.valor)}
                </p>
                {/* Bar */}
                <div
                  className="bar-animate-height w-full"
                  style={
                    {
                      '--bar-height': `${heightPct}%`,
                      backgroundColor: color,
                      maxHeight: '110px',
                    } as React.CSSProperties
                  }
                />
                {/* Tooltip */}
                <div className="bar-tooltip">
                  {mesAbreviado(item.fecha)}: {formatPct(item.valor)}
                </div>
                {/* Month label */}
                <p className="font-mono text-[9px] text-ink-muted mt-1 uppercase">
                  {mesAbreviado(item.fecha)}
                </p>
              </div>
            )
          })}
        </div>

        {/* Stats row */}
        <div className="grid grid-cols-3 gap-3 mt-6">
          {[
            { label: 'Mes actual', value: formatPct(mesActual), color: barColor(mesActual) },
            { label: `Acumulado ${currentYear}`, value: formatPct(acumulado), color: '#1A1410' },
            {
              label: 'Interanual',
              value: interanualLast !== null ? formatPct(interanualLast) : '—',
              color: '#C0392B',
            },
          ].map(({ label, value, color }) => (
            <div key={label} className="border border-ink/20 px-3 py-3">
              <p className="font-mono text-[9px] uppercase tracking-widest text-ink-muted mb-1">{label}</p>
              <p className="font-archivo-black text-2xl leading-none" style={{ color }}>
                {value}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
