import type { Metadata } from 'next'
import Script from 'next/script'
import './globals.css'

export const metadata: Metadata = {
  title: 'PLASA — Poder Adquisitivo del Argentino',
  description: 'Dólar blue, inflación y poder adquisitivo en tiempo real. ¿Cuántos minutos de trabajo cuesta el asado, la nafta o un café?',
  openGraph: {
    title: "PLASA — Poder Adquisitivo del Argentino",
    description: "¿Cuánto trabajás para pagar el asado? Datos en tiempo real.",
    url: "https://plasa.vercel.app",
    siteName: "PLASA",
    locale: "es_AR",
    type: "website",
    images: [{
      url: "https://plasa.vercel.app/og-image.png",
      width: 1200,
      height: 630,
    }],
  },
  twitter: {
    card: "summary_large_image",
    images: ["https://plasa.vercel.app/og-image.png"],
  },
  verification: {
    google: 'yftv4oXKvH7_ZFJs0WFQsOSKIraHH8tABLnHhsTrXSM',
  },
}

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="es-AR">
      <body>
        <div className="grain-overlay" aria-hidden="true" />
        {children}
        <Script
          src="https://www.googletagmanager.com/gtag/js?id=G-DC8FEHMQ6R"
          strategy="afterInteractive"
        />
        <Script id="google-analytics" strategy="afterInteractive">
          {`
            window.dataLayer = window.dataLayer || [];
            function gtag(){dataLayer.push(arguments);}
            gtag('js', new Date());
            gtag('config', 'G-DC8FEHMQ6R');
          `}
        </Script>
      </body>
    </html>
  )
}
