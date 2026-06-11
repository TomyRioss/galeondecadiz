import Link from "next/link";

export default function ExequialPage() {
  const auspicios = [
    { cantidad: 1,  dscto: "0%",  unitario: "$200.000",  valor: "$200.000" },
    { cantidad: 2,  dscto: "10%", unitario: "$180.000",  valor: "$360.000" },
    { cantidad: 3,  dscto: "15%", unitario: "$170.000",  valor: "$510.000" },
  ];
  const distribuidores = [
    { cantidad: 6,  dscto: "20%", unitario: "$160.000",  valor: "$960.000" },
    { cantidad: 12, dscto: "25%", unitario: "$150.000",  valor: "$1.800.000" },
    { cantidad: 24, dscto: "30%", unitario: "$140.000",  valor: "$3.360.000" },
  ];
  const institucionales = [
    { cantidad: 48, dscto: "35%", unitario: "$130.000",  valor: "$6.240.000" },
  ];

  return (
    <div style={{ background: "#F5EDD6", minHeight: "100vh" }}>

      {/* Hero */}
      <section className="relative py-16 px-6 text-center" style={{ background: "#1A3A5C" }}>
        <p className="text-[0.6rem] tracking-[0.3em] uppercase mb-3" style={{ color: "#B87333", fontFamily: "var(--font-cinzel, serif)" }}>
          Fundación Social Galeona de Cádiz · Colombia País Milagro
        </p>
        <h1 className="text-2xl md:text-4xl font-bold leading-tight mb-4 max-w-3xl mx-auto" style={{ color: "#F5EDD6", fontFamily: "var(--font-cinzel, serif)" }}>
          Sufragio Exequial
        </h1>
        <p className="text-sm max-w-2xl mx-auto leading-relaxed" style={{ color: "#d4c9a8", fontFamily: "var(--font-lora, serif)" }}>
          Para conservar un recuerdo de las exequias y acompañar con la oración durante el Novenario.
        </p>
        <div className="absolute bottom-0 left-0 right-0 h-px" style={{ background: "linear-gradient(90deg, transparent, #B87333, transparent)" }} />
      </section>

      {/* PDF */}
      <section className="max-w-5xl mx-auto px-4 py-12">
        <div className="flex items-start gap-4 mb-6">
          <div className="w-1.5 h-14 rounded-full flex-shrink-0" style={{ background: "linear-gradient(180deg, #E8511A, #B87333)" }} />
          <div>
            <h2 className="text-xl font-bold" style={{ color: "#1A3A5C", fontFamily: "var(--font-cinzel, serif)" }}>
              Plegable Exequial
            </h2>
            <p className="text-sm mt-0.5" style={{ color: "#B87333", fontFamily: "var(--font-lora, serif)" }}>
              Descubrí toda la información del servicio y la obra
            </p>
          </div>
        </div>
        <div className="rounded-2xl overflow-hidden border-2" style={{ borderColor: "#B87333", boxShadow: "0 4px 32px rgba(26,58,92,0.12)" }}>
          <iframe
            src="/plegable-exequial.pdf"
            title="Plegable Exequial"
            className="w-full"
            style={{ height: "70vh", minHeight: 480 }}
          />
        </div>
        <div className="flex justify-center mt-4">
          <a
            href="/plegable-exequial.pdf"
            download
            className="inline-flex items-center gap-2 px-6 py-2.5 rounded-full text-xs font-semibold tracking-[0.15em] uppercase transition-opacity hover:opacity-90"
            style={{ background: "linear-gradient(90deg, #E8511A, #B87333)", color: "#F5EDD6", fontFamily: "var(--font-cinzel, serif)" }}
          >
            Descargar PDF
          </a>
        </div>
      </section>

      <div className="flex justify-center px-4">
        <div className="w-full max-w-5xl h-px" style={{ background: "linear-gradient(90deg, transparent, #B87333, transparent)" }} />
      </div>

      {/* Contenido */}
      <section className="max-w-5xl mx-auto px-4 py-12 flex flex-col gap-10">

        {/* Cita bíblica */}
        <div className="rounded-2xl p-6 md:p-10 border-2 text-center" style={{ background: "linear-gradient(135deg, #e8dfc4 0%, #d4c9a8 100%)", borderColor: "#B87333", boxShadow: "0 4px 32px rgba(26,58,92,0.08)" }}>
          <p className="text-base md:text-lg italic leading-relaxed mb-3" style={{ color: "#1A3A5C", fontFamily: "var(--font-lora, serif)" }}>
            &ldquo;No temas. Yo soy el Alfa y la Omega, el principio o fin de todas las cosas, dice el Señor Dios, que es, y que era, y que ha de venir, el Todopoderoso.&rdquo;
          </p>
          <p className="text-xs tracking-widest uppercase" style={{ color: "#B87333", fontFamily: "var(--font-cinzel, serif)" }}>Apocalipsis 1:8</p>
        </div>

        {/* Descripción del servicio */}
        <div className="rounded-2xl p-6 md:p-10 border-2" style={{ background: "linear-gradient(135deg, #e8dfc4 0%, #d4c9a8 100%)", borderColor: "#B87333", boxShadow: "0 4px 32px rgba(26,58,92,0.08)" }}>
          <h3 className="text-lg font-bold mb-4" style={{ color: "#1A3A5C", fontFamily: "var(--font-cinzel, serif)" }}>Acompañamiento Espiritual</h3>
          <p className="text-sm leading-relaxed" style={{ color: "#1A3A5C", fontFamily: "var(--font-lora, serif)" }}>
            El acompañamiento virtual se realiza con tres ternarios de San Vicente Ferrer. Son nueve (9) reflexiones saludables que traen consuelo y esperanza a quienes amamos.
          </p>
        </div>

        {/* Incluye */}
        <div>
          <div className="flex items-start gap-4 mb-5">
            <div className="w-1.5 h-10 rounded-full flex-shrink-0" style={{ background: "linear-gradient(180deg, #E8511A, #B87333)" }} />
            <h3 className="text-lg font-bold" style={{ color: "#1A3A5C", fontFamily: "var(--font-cinzel, serif)" }}>Incluye</h3>
          </div>
          <div className="grid md:grid-cols-2 gap-4">
            {[
              "Una Santa Misa comunitaria por todos los que adquirieron el libro en el mes, celebrada en la Basílica Menor, Santuario de Nuestra Señora del Rosario de Chiquinquirá de La Estrella, Valle de Aburrá, Distrito Metropolitano de Medellín.",
              "Libro a todo color de 17 × 24 cm., con soporte virtual.",
              "Lienzo en algodón con la Sagrada Imagen para enmarcar.",
              "Empaque en caja de lujo para obsequio.",
            ].map((item) => (
              <div key={item} className="rounded-xl p-5 border-2 flex gap-3 items-start" style={{ background: "linear-gradient(160deg, #ede4cb 0%, #ddd0b0 100%)", borderColor: "#B87333" }}>
                <span className="mt-0.5 text-base leading-none" style={{ color: "#E8511A" }}>✦</span>
                <p className="text-sm leading-relaxed" style={{ color: "#1A3A5C", fontFamily: "var(--font-lora, serif)" }}>{item}</p>
              </div>
            ))}
          </div>
        </div>

        {/* Tabla de precios */}
        <div>
          <div className="flex items-start gap-4 mb-5">
            <div className="w-1.5 h-10 rounded-full flex-shrink-0" style={{ background: "linear-gradient(180deg, #E8511A, #B87333)" }} />
            <h3 className="text-lg font-bold" style={{ color: "#1A3A5C", fontFamily: "var(--font-cinzel, serif)" }}>¡Lleva la Gracia de Dios a tu Familia y Amigos!</h3>
          </div>

          {[
            { titulo: "Auspicios", rows: auspicios },
            { titulo: "Distribuidores", rows: distribuidores },
            { titulo: "Institucionales", rows: institucionales },
          ].map(({ titulo, rows }) => (
            <div key={titulo} className="mb-6">
              <p className="text-xs tracking-[0.2em] uppercase font-semibold mb-2" style={{ color: "#B87333", fontFamily: "var(--font-cinzel, serif)" }}>{titulo}</p>
              <div className="rounded-xl overflow-hidden border-2" style={{ borderColor: "#B87333" }}>
                <table className="w-full text-sm">
                  <thead>
                    <tr style={{ background: "#1A3A5C", color: "#F5EDD6", fontFamily: "var(--font-cinzel, serif)" }}>
                      <th className="py-2 px-4 text-left text-xs tracking-wider">Cantidad</th>
                      <th className="py-2 px-4 text-left text-xs tracking-wider">Dscto.</th>
                      <th className="py-2 px-4 text-left text-xs tracking-wider">Unitario</th>
                      <th className="py-2 px-4 text-left text-xs tracking-wider">Valor</th>
                    </tr>
                  </thead>
                  <tbody>
                    {rows.map((row, i) => (
                      <tr key={i} style={{ background: i % 2 === 0 ? "linear-gradient(135deg, #e8dfc4 0%, #d4c9a8 100%)" : "linear-gradient(160deg, #ede4cb 0%, #ddd0b0 100%)", fontFamily: "var(--font-lora, serif)", color: "#1A3A5C" }}>
                        <td className="py-2 px-4">{row.cantidad}</td>
                        <td className="py-2 px-4">{row.dscto}</td>
                        <td className="py-2 px-4">{row.unitario}</td>
                        <td className="py-2 px-4 font-semibold">{row.valor}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          ))}
        </div>

        {/* Datos bancarios */}
        <div className="rounded-2xl p-6 md:p-10 border-2" style={{ background: "linear-gradient(135deg, #e8dfc4 0%, #d4c9a8 100%)", borderColor: "#B87333", boxShadow: "0 4px 32px rgba(26,58,92,0.08)" }}>
          <h3 className="text-lg font-bold mb-5" style={{ color: "#1A3A5C", fontFamily: "var(--font-cinzel, serif)" }}>Información de Pago</h3>
          <div className="grid md:grid-cols-2 gap-6 text-sm" style={{ fontFamily: "var(--font-lora, serif)", color: "#1A3A5C" }}>
            <div className="flex flex-col gap-1.5">
              <p><span className="font-semibold" style={{ color: "#B87333" }}>Banco:</span> Davivienda</p>
              <p><span className="font-semibold" style={{ color: "#B87333" }}>Cuenta:</span> Ahorros Empresarial N.º 4507 000 70490</p>
              <p><span className="font-semibold" style={{ color: "#B87333" }}>A nombre de:</span> Fundación Social Galeona de Cádiz</p>
              <p><span className="font-semibold" style={{ color: "#B87333" }}>NIT:</span> 900544600-9</p>
              <p><span className="font-semibold" style={{ color: "#B87333" }}>SWIFT/BIC:</span> CAFECOBB</p>
            </div>
            <div className="flex flex-col gap-1.5">
              <p>Enviar copia de la consignación a:</p>
              <p><span className="font-semibold" style={{ color: "#B87333" }}>Email:</span> galeonadecadiz@yahoo.com</p>
              <p><span className="font-semibold" style={{ color: "#B87333" }}>WhatsApp:</span> 311 252 4239</p>
              <p className="mt-2 text-xs italic" style={{ color: "#1B6CA8" }}>
                La Fundación no recibe importes en dinero por fuera de este canal receptor bancario.
              </p>
            </div>
          </div>
        </div>

      </section>

      {/* CTA */}
      <section className="py-12 px-6 text-center" style={{ background: "#1A3A5C" }}>
        <p className="text-[0.6rem] tracking-[0.3em] uppercase mb-3" style={{ color: "#B87333", fontFamily: "var(--font-cinzel, serif)" }}>
          Sapientia Ædificavit Sibi Domvn · La sabiduría edificó su casa
        </p>
        <h2 className="text-xl font-bold mb-2" style={{ color: "#F5EDD6", fontFamily: "var(--font-cinzel, serif)" }}>
          Solicitar información
        </h2>
        <p className="text-sm mb-6" style={{ color: "#d4c9a8", fontFamily: "var(--font-lora, serif)" }}>
          galeonadecadiz@yahoo.com · WSP 311 252 4239
        </p>
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
