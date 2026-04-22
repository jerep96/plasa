'use client'

import { useEffect, useState } from 'react'

export default function Header() {
  const [time, setTime] = useState('')

  useEffect(() => {
    const update = () => {
      const hora = new Date().toLocaleTimeString('es-AR', {
        timeZone: 'America/Argentina/Buenos_Aires',
        hour: '2-digit',
        minute: '2-digit',
        hour12: false,
      })
      setTime(hora)
    }
    update()
    const id = setInterval(update, 60000)
    return () => clearInterval(id)
  }, [])

  const fecha = new Date().toLocaleDateString('es-AR', {
    weekday: 'long',
    year: 'numeric',
    month: 'long',
    day: 'numeric',
  })

  return (
    <header className="border-b-[3px] border-ink mb-0">
      <div className="max-w-[980px] mx-auto px-7">
        {/* Masthead row */}
        <div className="flex items-center justify-between py-4 gap-4">
          <div className="flex items-center gap-4">
            {/* Logo */}
            <h1
              className="font-archivo-black leading-none tracking-[-2px] text-ink"
              style={{ fontSize: 'clamp(38px, 6vw, 64px)' }}
            >
              PLA<span className="text-plasa-red">SA</span>
            </h1>
            {/* Tagline */}
            <div className="border-l-[2px] border-ink pl-4 hidden sm:block">
              <p className="font-mono text-[10px] uppercase leading-tight text-ink-muted whitespace-pre-line">
                {'Poder Adquisitivo\ndel Argentino'}
              </p>
            </div>
          </div>

          {/* Live pill */}
          <div className="flex items-center gap-1.5 border border-plasa-green px-3 py-1 shrink-0">
            <span className="live-dot text-plasa-green text-[10px]">●</span>
            <span className="font-mono text-[10px] text-plasa-green uppercase tracking-wide">
              EN VIVO · Act. {time || '--:--'}
            </span>
          </div>
        </div>

        {/* Datebar */}
        <div className="flex items-center justify-between py-2 border-t border-ink/20">
          <span className="font-mono text-[11px] text-ink-muted capitalize">{fecha}</span>
          <span className="font-mono text-[11px] text-ink-muted">
            Fuentes: DolarApi · ArgentinaDatos
          </span>
        </div>
      </div>
    </header>
  )
}
