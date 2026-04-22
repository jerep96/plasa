'use client'

import { useEffect, useState } from 'react'
import { DolarCasa } from '@/types'
import { formatPesos, formatPct } from '@/lib/format'

const CASAS_ORDER = ['blue', 'oficial', 'bolsa', 'contadoconliqui']
const CASA_LABELS: Record<string, string> = {
  blue: 'Blue',
  oficial: 'Oficial',
  bolsa: 'MEP',
  contadoconliqui: 'CCL',
}

function SkeletonCard({ highlight }: { highlight?: boolean }) {
  return (
    <div
      className={`border-[2px] border-ink p-4 ${highlight ? 'bg-ink' : ''}`}
    >
      <div className={`skeleton h-3 w-16 mb-3 ${highlight ? 'opacity-20' : ''}`} />
      <div className={`skeleton h-8 w-24 mb-2 ${highlight ? 'opacity-20' : ''}`} />
      <div className={`skeleton h-3 w-12 ${highlight ? 'opacity-20' : ''}`} />
    </div>
  )
}

export default function DolarTicker() {
  const [casas, setCasas] = useState<DolarCasa[] | null>(null)
  const [error, setError] = useState(false)

  const fetchData = async () => {
    try {
      const res = await fetch('https://dolarapi.com/v1/dolares', { cache: 'no-store' })
      if (!res.ok) throw new Error('fetch failed')
      const data: DolarCasa[] = await res.json()
      setCasas(data)
      setError(false)
    } catch {
      setError(true)
    }
  }

  useEffect(() => {
    fetchData()
    const id = setInterval(fetchData, 5 * 60 * 1000)
    return () => clearInterval(id)
  }, [])

  const getCasa = (key: string) => casas?.find((c) => c.casa === key)

  const blue = getCasa('blue')
  const oficial = getCasa('oficial')
  const brecha =
    blue && oficial && oficial.venta > 0
      ? ((blue.venta - oficial.venta) / oficial.venta) * 100
      : null

  return (
    <section className="fade-up fade-up-2 border-b-[2px] border-ink">
      <div className="max-w-[980px] mx-auto px-7 py-6">
        <p className="font-mono text-[11px] uppercase tracking-widest text-ink-muted mb-4 border-b border-ink/20 pb-2">
          Tipo de cambio
        </p>

        {error ? (
          <p className="font-mono text-[12px] text-ink-muted">
            No disponible — reintentando…
          </p>
        ) : !casas ? (
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
            <SkeletonCard highlight />
            <SkeletonCard />
            <SkeletonCard />
            <SkeletonCard />
          </div>
        ) : (
          <>
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
              {CASAS_ORDER.map((key) => {
                const casa = getCasa(key)
                const isBlue = key === 'blue'
                return (
                  <div
                    key={key}
                    className={`border-[2px] border-ink p-4 ${isBlue ? 'bg-ink text-cream' : ''}`}
                  >
                    <p
                      className={`font-mono text-[10px] uppercase tracking-widest mb-2 ${
                        isBlue ? 'text-cream/60' : 'text-ink-muted'
                      }`}
                    >
                      {CASA_LABELS[key]}
                    </p>
                    {casa ? (
                      <>
                        <p
                          className={`font-archivo-black leading-none mb-1 ${
                            isBlue ? 'text-cream' : 'text-ink'
                          }`}
                          style={{ fontSize: 'clamp(22px, 3vw, 32px)' }}
                        >
                          {formatPesos(casa.venta)}
                        </p>
                        <p
                          className={`font-mono text-[10px] ${
                            isBlue ? 'text-cream/50' : 'text-ink-muted'
                          }`}
                        >
                          Compra {formatPesos(casa.compra)}
                        </p>
                      </>
                    ) : (
                      <p className={`font-mono text-[12px] ${isBlue ? 'text-cream/50' : 'text-ink-muted'}`}>
                        —
                      </p>
                    )}
                  </div>
                )
              })}
            </div>

            {brecha !== null && (
              <div className="mt-3 text-right">
                <span className="font-mono text-[11px] text-plasa-red">
                  Brecha blue / oficial: +{formatPct(brecha)}
                </span>
              </div>
            )}
          </>
        )}
      </div>
    </section>
  )
}
