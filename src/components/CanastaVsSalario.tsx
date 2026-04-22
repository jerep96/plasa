import { formatPesos, formatPct } from '@/lib/format'
import { CANASTA } from '@/lib/config'

interface Props {
  smvm: number
}

export default function CanastaVsSalario({ smvm }: Props) {
  const cobertura = (smvm / CANASTA.valor) * 100
  const deficit = CANASTA.valor - smvm

  return (
    <section className="fade-up fade-up-5 border-b-[2px] border-ink">
      <div className="max-w-[980px] mx-auto px-7 py-8">
        <p className="font-mono text-[11px] uppercase tracking-widest text-ink-muted mb-6 border-b border-ink/20 pb-2">
          Salario mínimo vs. Canasta básica
        </p>

        <div className="flex flex-col gap-4 mb-6">
          {/* Salario row */}
          <div className="flex items-center gap-4">
            <p className="font-mono text-[11px] text-ink-muted w-[180px] shrink-0 text-right sm:text-left">
              <span className="font-archivo-black text-ink text-[13px]">Salario mínimo</span>
              <br />
              {smvm > 0 ? formatPesos(smvm) : '—'}
            </p>
            <div className="flex-1 h-7 bg-ink/5 border border-ink/20">
              <div
                className="h-full bg-ink bar-animate"
                style={
                  {
                    '--bar-width': `${Math.min(cobertura, 100)}%`,
                  } as React.CSSProperties
                }
              />
            </div>
          </div>

          {/* Canasta row */}
          <div className="flex items-center gap-4">
            <p className="font-mono text-[11px] text-ink-muted w-[180px] shrink-0 text-right sm:text-left">
              <span className="font-archivo-black text-ink text-[13px]">Canasta básica</span>
              <br />
              {formatPesos(CANASTA.valor)}
            </p>
            <div className="flex-1 h-7 bg-ink/5 border border-ink/20">
              <div
                className="h-full bg-plasa-red bar-animate"
                style={{ '--bar-width': '100%' } as React.CSSProperties}
              />
            </div>
          </div>
        </div>

        {/* Summary box */}
        <div className="bg-ink text-cream p-5">
          <p className="font-archivo text-[14px] sm:text-[15px] leading-relaxed">
            El salario mínimo cubre apenas el{' '}
            <span className="font-archivo-black text-plasa-red-light text-[18px]">
              {formatPct(cobertura)}
            </span>{' '}
            de la canasta básica total para una familia tipo. El déficit mensual es de{' '}
            <span className="font-archivo-black text-plasa-red-light text-[18px]">
              {formatPesos(Math.round(deficit))}
            </span>
            .
          </p>
        </div>
      </div>
    </section>
  )
}
