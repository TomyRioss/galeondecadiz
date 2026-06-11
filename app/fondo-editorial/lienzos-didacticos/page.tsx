import Link from "next/link";
import PdfFlipBook from "@/app/components/ui/PdfFlipBookClient";

export default function LienzosDIdacticosPage() {
  return (
    <div style={{ background: "#F5EDD6", minHeight: "100vh" }}>

      {/* Hero */}
      <section className="relative py-16 px-6 text-center" style={{ background: "#1A3A5C" }}>
        <p className="text-[0.6rem] tracking-[0.3em] uppercase mb-3" style={{ color: "#B87333", fontFamily: "var(--font-cinzel, serif)" }}>
          Fondo Editorial · Artium
        </p>
        <h1 className="text-2xl md:text-4xl font-bold leading-tight mb-4 max-w-3xl mx-auto" style={{ color: "#F5EDD6", fontFamily: "var(--font-cinzel, serif)" }}>
          Lienzos Decorativos, Didácticos y Terapéuticos
        </h1>
        <p className="text-sm max-w-2xl mx-auto leading-relaxed" style={{ color: "#d4c9a8", fontFamily: "var(--font-lora, serif)" }}>
          Imágenes seriadas en distintos tamaños · Impresión de alta precisión Giclée · Calidad museo certificada
        </p>
        <div className="absolute bottom-0 left-0 right-0 h-px" style={{ background: "linear-gradient(90deg, transparent, #B87333, transparent)" }} />
      </section>

      {/* PDF Viewer */}
      <section className="max-w-5xl mx-auto px-4 py-12">
        <div className="flex items-start gap-4 mb-6">
          <div className="w-1.5 h-14 rounded-full flex-shrink-0" style={{ background: "linear-gradient(180deg, #E8511A, #B87333)" }} />
          <div>
            <h2 className="text-xl font-bold" style={{ color: "#1A3A5C", fontFamily: "var(--font-cinzel, serif)" }}>
              Catálogo de Lienzos
            </h2>
            <p className="text-sm mt-0.5" style={{ color: "#B87333", fontFamily: "var(--font-lora, serif)" }}>
              Visualizá el catálogo completo de materiales y servicios
            </p>
          </div>
        </div>
        <PdfFlipBook pdfUrl="https://www.galeonadecadiz.org/pdf/ps-3.pdf" />
      </section>

      {/* Separador */}
      <div className="flex justify-center px-4">
        <div className="w-full max-w-5xl h-px" style={{ background: "linear-gradient(90deg, transparent, #B87333, transparent)" }} />
      </div>

      {/* Contenido */}
      <section className="max-w-5xl mx-auto px-4 py-12 flex flex-col gap-10">

        {/* Materiales */}
        <div
          className="rounded-2xl p-6 md:p-10 border-2"
          style={{ background: "linear-gradient(135deg, #e8dfc4 0%, #d4c9a8 100%)", borderColor: "#B87333", boxShadow: "0 4px 32px rgba(26,58,92,0.08)" }}
        >
          <h3 className="text-lg font-bold mb-6" style={{ color: "#1A3A5C", fontFamily: "var(--font-cinzel, serif)" }}>
            Tipos de Materiales
          </h3>
          <div className="overflow-x-auto">
            <table className="w-full text-sm">
              <thead>
                <tr style={{ background: "#1A3A5C" }}>
                  {["Material", "Calidad"].map((h) => (
                    <th key={h} className="px-5 py-3 text-left text-[0.6rem] tracking-[0.2em] uppercase font-semibold" style={{ color: "#B87333", fontFamily: "var(--font-cinzel, serif)" }}>{h}</th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {[
                  ["Lienzo Algodón para plantillas", "Nacional"],
                  ["Lienzo Poliéster", "Americano"],
                  ["Lienzo Algodón", "Americano"],
                  ["Lienzo Mate Museo Certificado", "Internacional"],
                  ["Lienzo Satinado Museo Certificado", "Internacional"],
                  ["Lienzo Metalizado Museo Certificado", "Internacional"],
                  ["Papel Algodón Fine Art 300 g.", "Certificado"],
                ].map(([mat, cal], i) => (
                  <tr key={i} style={{ background: i % 2 === 0 ? "transparent" : "rgba(255,255,255,0.15)" }}>
                    <td className="px-5 py-3" style={{ color: "#1A3A5C", fontFamily: "var(--font-lora, serif)" }}>{mat}</td>
                    <td className="px-5 py-3">
                      <span className="text-[0.6rem] px-2.5 py-0.5 rounded-full font-semibold tracking-wider uppercase" style={{ background: "#1A3A5C20", color: "#1A3A5C", border: "1px solid #1A3A5C30", fontFamily: "var(--font-cinzel, serif)" }}>{cal}</span>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        {/* Especificaciones */}
        <div className="grid md:grid-cols-2 gap-6">
          {[
            {
              titulo: "Dimensiones de impresión",
              items: [
                "Ancho máximo: 111 cm · largo a solicitud",
                "Mínimo: carta (21,59 × 27,94 cm)",
                "Cenefa blanca desde 0,5 cm",
                "Descuento 3% al aprovechar todo el ancho",
              ],
            },
            {
              titulo: "Giclée · Calidad Museo",
              items: [
                "Reproducción profesional de arte",
                "Materiales de mayor calidad disponible",
                "Barniz especializado certificado",
                "Durabilidad estimada: 300 años",
              ],
            },
            {
              titulo: "Servicios adicionales",
              items: [
                "Retoque a mano en técnica mixta",
                "Restauración de fotografías antiguas",
                "Estudio de fotografía especializada",
                "Traslado de equipos si necesario",
              ],
            },
            {
              titulo: "Gallery Wrap · Tensado artesanal",
              items: [
                "Estirado a mano sobre bastidor",
                "Técnica segura sin olas ni baches",
                "Disponible enrollado, tensado o enmarcado",
                "Cualquier tamaño bajo pedido",
              ],
            },
          ].map(({ titulo, items }) => (
            <div key={titulo} className="rounded-xl p-6 border-2" style={{ background: "linear-gradient(160deg, #ede4cb 0%, #ddd0b0 100%)", borderColor: "#B87333" }}>
              <h4 className="text-sm font-bold mb-4" style={{ color: "#1A3A5C", fontFamily: "var(--font-cinzel, serif)" }}>{titulo}</h4>
              <ul className="flex flex-col gap-2">
                {items.map((item, i) => (
                  <li key={i} className="flex items-start gap-2 text-sm" style={{ color: "#1A3A5C", fontFamily: "var(--font-lora, serif)" }}>
                    <span className="mt-1.5 w-1 h-1 rounded-full flex-shrink-0" style={{ background: "#B87333" }} />
                    {item}
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        {/* Categorías */}
        <div>
          <h3 className="text-lg font-bold mb-4" style={{ color: "#1A3A5C", fontFamily: "var(--font-cinzel, serif)" }}>Líneas de Lienzos</h3>
          <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
            {["Lienzos devocionales", "Lienzos decorativos con punto de fuga", "Lienzos institucionales", "Inventario del Patrimonio arquitectónico", "Restauración de bibliotecas", "Arte y documentación cultural"].map((cat) => (
              <div key={cat} className="rounded-xl p-4 border-2 text-sm font-semibold" style={{ background: "linear-gradient(135deg, #e8dfc4, #d4c9a8)", borderColor: "#B87333", color: "#1A3A5C", fontFamily: "var(--font-cinzel, serif)", fontSize: "0.75rem" }}>
                {cat}
              </div>
            ))}
          </div>
        </div>

      </section>

      {/* CTA contacto */}
      <section className="py-12 px-6 text-center" style={{ background: "#1A3A5C" }}>
        <p className="text-[0.6rem] tracking-[0.3em] uppercase mb-3" style={{ color: "#B87333", fontFamily: "var(--font-cinzel, serif)" }}>Sapientia Ædificavit Sibi Domvn</p>
        <h2 className="text-xl font-bold mb-6" style={{ color: "#F5EDD6", fontFamily: "var(--font-cinzel, serif)" }}>¿Solicitar una impresión?</h2>
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
