import Link from "next/link";
import PdfFlipBook from "@/app/components/ui/PdfFlipBookClient";

export default function CatalogoWayuuPage() {
  return (
    <div style={{ background: "#F5EDD6", minHeight: "100vh" }}>

      {/* Hero */}
      <section className="relative py-16 px-6 text-center" style={{ background: "#1A3A5C" }}>
        <p className="text-[0.6rem] tracking-[0.3em] uppercase mb-3" style={{ color: "#B87333", fontFamily: "var(--font-cinzel, serif)" }}>
          Fondo Editorial · Artium · Proyecto Solidario
        </p>
        <h1 className="text-2xl md:text-4xl font-bold leading-tight mb-4 max-w-3xl mx-auto" style={{ color: "#F5EDD6", fontFamily: "var(--font-cinzel, serif)" }}>
          Artesanías Wayuu
        </h1>
        <p className="text-sm max-w-2xl mx-auto leading-relaxed" style={{ color: "#d4c9a8", fontFamily: "var(--font-lora, serif)" }}>
          Obsequie una artesanía wayuu y ayude a solucionar la crisis social de la media y alta Guajira.
        </p>
        <div className="absolute bottom-0 left-0 right-0 h-px" style={{ background: "linear-gradient(90deg, transparent, #B87333, transparent)" }} />
      </section>

      {/* PDF Viewer */}
      <section className="max-w-5xl mx-auto px-4 py-12">
        <div className="flex items-start gap-4 mb-6">
          <div className="w-1.5 h-14 rounded-full flex-shrink-0" style={{ background: "linear-gradient(180deg, #E8511A, #B87333)" }} />
          <div>
            <h2 className="text-xl font-bold" style={{ color: "#1A3A5C", fontFamily: "var(--font-cinzel, serif)" }}>
              Catálogo Wayuu
            </h2>
            <p className="text-sm mt-0.5" style={{ color: "#B87333", fontFamily: "var(--font-lora, serif)" }}>
              Visualizá el catálogo completo de productos artesanales
            </p>
          </div>
        </div>
        <PdfFlipBook pdfUrl="https://www.galeonadecadiz.org/pdf/ps-4.pdf" />
      </section>

      {/* Separador */}
      <div className="flex justify-center px-4">
        <div className="w-full max-w-5xl h-px" style={{ background: "linear-gradient(90deg, transparent, #B87333, transparent)" }} />
      </div>

      {/* Contenido */}
      <section className="max-w-5xl mx-auto px-4 py-12 flex flex-col gap-10">

        {/* Presentación */}
        <div className="rounded-2xl p-6 md:p-10 border-2" style={{ background: "linear-gradient(135deg, #e8dfc4 0%, #d4c9a8 100%)", borderColor: "#B87333", boxShadow: "0 4px 32px rgba(26,58,92,0.08)" }}>
          <h3 className="text-lg font-bold mb-4" style={{ color: "#1A3A5C", fontFamily: "var(--font-cinzel, serif)" }}>Presentación</h3>
          <p className="text-sm leading-relaxed" style={{ color: "#1A3A5C", fontFamily: "var(--font-lora, serif)" }}>
            Apoyar las asociaciones mutuales artesanales basadas en la familia extensa y la pequeña comunidad es la forma como la Fundación Social Galeona de Cádiz contribuye a la protección y fortalecimiento de las tradiciones colombianas, impulsando la conservación de las técnicas de producción artesanal ancestral.
          </p>
          <p className="text-sm leading-relaxed mt-3" style={{ color: "#1A3A5C", fontFamily: "var(--font-lora, serif)" }}>
            Los excedentes financieros son destinados a actividades sociales de etnoconstrucción digna, capacitación en artes y oficios ancestrales, turismo cultural, transporte de alimentos a regiones apartadas y la inserción laboral de familias que subsisten de su trabajo artesanal.
          </p>
        </div>

        {/* Productos */}
        <div>
          <h3 className="text-lg font-bold mb-5" style={{ color: "#1A3A5C", fontFamily: "var(--font-cinzel, serif)" }}>Líneas de Productos</h3>
          <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
            {[
              { label: "Mochilas Jutkataa", ref: "1001–1006" },
              { label: "Mochilas Susü", ref: "1101–1106" },
              { label: "Mochilas Unicolores", ref: "1501–1502" },
              { label: "Maletín Computador", ref: "1601–1603" },
              { label: "Mochilón Escolar", ref: "1701" },
              { label: "Kapaterras", ref: "1801" },
              { label: "Kuisü · Tula de viaje", ref: "1901" },
              { label: "Sombreros Uwon", ref: "2001–2105" },
              { label: "Fajones y Accesorios", ref: "3000+" },
              { label: "Mantas y Guayaberas", ref: "—" },
              { label: "Calzado y Marroquinería", ref: "—" },
              { label: "Cestería Wayuu", ref: "9020–9040" },
            ].map(({ label, ref }) => (
              <div key={label} className="rounded-xl p-4 border-2" style={{ background: "linear-gradient(160deg, #ede4cb 0%, #ddd0b0 100%)", borderColor: "#B87333" }}>
                <p className="text-sm font-bold" style={{ color: "#1A3A5C", fontFamily: "var(--font-cinzel, serif)", fontSize: "0.78rem" }}>{label}</p>
                <p className="text-xs mt-1" style={{ color: "#B87333", fontFamily: "var(--font-lora, serif)" }}>Ref. {ref}</p>
              </div>
            ))}
          </div>
        </div>

        {/* Materia prima */}
        <div className="rounded-2xl p-6 md:p-8 border-2" style={{ background: "linear-gradient(135deg, #e8dfc4 0%, #d4c9a8 100%)", borderColor: "#B87333" }}>
          <h3 className="text-lg font-bold mb-4" style={{ color: "#1A3A5C", fontFamily: "var(--font-cinzel, serif)" }}>Materia Prima</h3>
          <p className="text-sm leading-relaxed" style={{ color: "#1A3A5C", fontFamily: "var(--font-lora, serif)" }}>
            Hilos wayuu de alta calidad producidos con tecnología alemana en Colombia. Son antialérgicos y tienen tratamiento antibacterial que repele mosquitos y aceite. Los colores son firmes y uniformes; no destiñen durante el lavado manual o mecánico.
          </p>
          <p className="text-sm leading-relaxed mt-3" style={{ color: "#1A3A5C", fontFamily: "var(--font-lora, serif)" }}>
            Cada mochila es tejida en una sola pieza artesanal hecha a mano y sin costura. En la mochila wayuu no existen hilos añadidos —cada pieza es única con tensión siempre uniforme y compacta.
          </p>
        </div>

        {/* Tamaños */}
        <div className="grid md:grid-cols-3 gap-4">
          {[
            { size: "Grande", medida: "25 cm altura" },
            { size: "Mediana", medida: "20 cm altura" },
            { size: "Pequeña", medida: "15 cm altura" },
          ].map(({ size, medida }) => (
            <div key={size} className="rounded-xl p-5 border-2 text-center" style={{ background: "linear-gradient(160deg, #ede4cb 0%, #ddd0b0 100%)", borderColor: "#B87333" }}>
              <p className="text-xs tracking-widest uppercase font-semibold mb-1" style={{ color: "#B87333", fontFamily: "var(--font-cinzel, serif)" }}>Mochila</p>
              <p className="text-2xl font-bold" style={{ color: "#1A3A5C", fontFamily: "var(--font-cinzel, serif)" }}>{size}</p>
              <p className="text-sm mt-1" style={{ color: "#1B6CA8", fontFamily: "var(--font-lora, serif)" }}>{medida}</p>
            </div>
          ))}
        </div>

      </section>

      {/* CTA */}
      <section className="py-12 px-6 text-center" style={{ background: "#1A3A5C" }}>
        <p className="text-[0.6rem] tracking-[0.3em] uppercase mb-3" style={{ color: "#B87333", fontFamily: "var(--font-cinzel, serif)" }}>Sapientia Ædificavit Sibi Domvn</p>
        <h2 className="text-xl font-bold mb-2" style={{ color: "#F5EDD6", fontFamily: "var(--font-cinzel, serif)" }}>Solicitar información</h2>
        <p className="text-sm mb-6" style={{ color: "#d4c9a8", fontFamily: "var(--font-lora, serif)" }}>contactenos@galeonadecadiz.org</p>
        <Link
          href="/contacto"
          className="inline-flex items-center gap-2 px-8 py-3 rounded-full text-sm font-semibold tracking-[0.15em] uppercase transition-opacity hover:opacity-90"
          style={{ background: "linear-gradient(90deg, #E8511A, #B87333)", color: "#F5EDD6", fontFamily: "var(--font-cinzel, serif)" }}
        >
          Contactar
        </Link>
      </section>

    </div>
  );
}
