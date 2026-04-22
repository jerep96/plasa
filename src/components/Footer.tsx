export default function Footer() {
  return (
    <footer className="border-t-[3px] border-ink fade-up fade-up-8">
      <div className="max-w-[980px] mx-auto px-7 py-8">
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 items-start">
          {/* Left: brand + sources */}
          <div>
            <p className="font-archivo-black text-2xl text-ink tracking-[-1px] mb-2">
              PLA<span className="text-plasa-red">SA</span>
            </p>
            <p className="font-mono text-[10px] text-ink-muted leading-relaxed">
              Fuentes de datos:
              <br />
              DolarApi.com · ArgentinaDatos.com
            </p>
          </div>

          {/* Center: Ko-fi */}
          <div className="flex justify-center">
            <a
              href="https://ko-fi.com/"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 border-[2px] border-ink px-4 py-2 font-mono text-[11px] uppercase tracking-wide text-ink hover:bg-ink hover:text-cream transition-colors"
            >
              ☕ Invitame un café
            </a>
          </div>

          {/* Right: red de sitios */}
          <div className="sm:text-right">
            <p className="font-mono text-[10px] uppercase tracking-widest text-ink-muted mb-2">
              Red de sitios
            </p>
            <div className="flex flex-col gap-1 sm:items-end">
              <a
                href="https://warroom-dusky.vercel.app"
                target="_blank"
                rel="noopener noreferrer"
                className="font-mono text-[11px] text-ink hover:text-plasa-red underline underline-offset-2"
              >
                WARROOM →
              </a>
              <a
                href="#"
                className="font-mono text-[11px] text-ink-muted cursor-default"
              >
                ÓRBITA (próx.)
              </a>
            </div>
          </div>
        </div>

        <div className="border-t border-ink/20 mt-6 pt-4">
          <p className="font-mono text-[10px] text-ink-muted text-center">
            PLASA no es asesoramiento financiero. Datos con fines informativos.
          </p>
        </div>
      </div>
    </footer>
  )
}
