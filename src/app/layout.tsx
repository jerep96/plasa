import type { Metadata } from 'next'
import './globals.css'

export const metadata: Metadata = {
  title: 'PLASA — Poder Adquisitivo del Argentino',
  description: 'Dólar blue, inflación y poder adquisitivo en tiempo real. ¿Cuántos minutos de trabajo cuesta el asado, la nafta o un café?',
  openGraph: {
    title: 'PLASA — Poder Adquisitivo del Argentino',
    description: '¿Cuánto trabajás para pagar el asado? Datos en tiempo real.',
    locale: 'es_AR',
  },
}

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="es-AR">
      <body>
        <div className="grain-overlay" aria-hidden="true" />
        {children}
      </body>
    </html>
  )
}
