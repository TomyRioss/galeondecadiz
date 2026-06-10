import Link from "next/link";
import NavDesktop from "./NavDesktop";
import NavMobile from "./NavMobile";

export default function Header() {
  return (
    <header
      className="w-full sticky top-0 z-50 shadow-lg"
      style={{
        background: "#1A3A5C",
        borderBottom: "2px solid #B87333",
      }}
    >
      {/* Línea decorativa superior */}
      <div className="h-1 w-full" style={{ background: "linear-gradient(90deg, #B87333, #F5EDD6, #B87333)" }} />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16 md:h-24 gap-4">

          {/* Logo Galeona de Cádiz */}
          <Link href="/" className="flex items-center gap-3 flex-shrink-0 group">
            <div
              className="w-12 h-12 md:w-14 md:h-14 rounded-full overflow-hidden flex-shrink-0 flex items-center justify-center text-white text-xs font-bold"
              style={{ border: "2px solid #B87333", background: "#1F4FA3", fontFamily: "serif" }}
            >
              <span className="px-1">GC</span>
            </div>
            <div className="hidden lg:block">
              <p
                className="text-[#B87333] text-[0.6rem] tracking-[0.2em] uppercase leading-none"
                style={{ fontFamily: "var(--font-cinzel, serif)" }}
              >
                Fundación Social
              </p>
              <p
                className="text-white text-sm md:text-base font-bold tracking-wide leading-tight"
                style={{ fontFamily: "var(--font-cinzel, serif)" }}
              >
                Galeona de Cádiz
              </p>
            </div>
          </Link>

          {/* Navegación desktop — centro */}
          <div className="flex-1 flex justify-center">
            <NavDesktop />
          </div>

          {/* Logo EDN + hamburguesa */}
          <div className="flex items-center gap-3 flex-shrink-0">
            {/* Logo EDN */}
            <Link href="/escuela-nazaret" className="flex items-center gap-1.5 group">
              <div
                className="w-10 h-10 md:w-12 md:h-12 rounded-sm overflow-hidden flex-shrink-0 flex items-center justify-center"
                style={{ border: "1px solid rgba(184,115,51,0.5)", background: "#1B6CA8" }}
              >
                  <span
                    className="text-white font-bold text-xs tracking-wide"
                    style={{ fontFamily: "var(--font-cinzel, serif)" }}
                  >
                    EDN
                  </span>
              </div>
              <div className="hidden lg:block">
                <p
                  className="text-[#B87333] text-[0.55rem] tracking-widest uppercase leading-none"
                  style={{ fontFamily: "var(--font-cinzel, serif)" }}
                >
                  Escuela de
                </p>
                <p
                  className="text-white text-xs font-semibold tracking-wide"
                  style={{ fontFamily: "var(--font-cinzel, serif)" }}
                >
                  Nazaret
                </p>
              </div>
            </Link>

            {/* Menú hamburguesa mobile */}
            <NavMobile />
          </div>

        </div>
      </div>
    </header>
  );
}
