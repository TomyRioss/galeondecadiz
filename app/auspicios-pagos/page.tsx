import Link from "next/link";
import { FaUniversity, FaEnvelope, FaWhatsapp, FaGlobeAmericas, FaExclamationTriangle } from "react-icons/fa";

export default function AuspiciosPagosPage() {
  const datosBancarios = [
    { label: "Banco", valor: "Davivienda" },
    { label: "Tipo de cuenta", valor: "Ahorros Empresarial" },
    { label: "Número de cuenta", valor: "4507 000 70490" },
    { label: "Titular", valor: "Fundación Social Galeona de Cádiz" },
    { label: "NIT", valor: "900.544.600-9" },
  ];

  return (
    <div style={{ background: "#F5EDD6", minHeight: "100vh" }}>

      {/* HERO */}
      <section
        className="relative w-full py-20 md:py-28 px-4 flex flex-col items-center text-center overflow-hidden"
        style={{ background: "#1A3A5C" }}
      >
        <div
          className="absolute inset-0 opacity-10"
          style={{
            backgroundImage:
              "repeating-linear-gradient(45deg, #B87333 0px, #B87333 1px, transparent 1px, transparent 60px)",
          }}
        />
        <div
          className="absolute bottom-0 left-0 right-0 h-20 pointer-events-none"
          style={{ background: "linear-gradient(to top, #F5EDD6, transparent)" }}
        />
        <FaUniversity size={36} className="relative mb-4" style={{ color: "#B87333" }} />
        <h1
          className="relative text-3xl md:text-5xl font-bold leading-tight mb-4 max-w-3xl"
          style={{ color: "#F5EDD6", fontFamily: "var(--font-cinzel, serif)" }}
        >
          Auspicios y Pagos
        </h1>
        <p
          className="relative text-sm md:text-base max-w-xl leading-relaxed mb-8"
          style={{ color: "#B87333", fontFamily: "var(--font-lora, serif)" }}
        >
          Información bancaria para auspicios a actividades sin ánimo de lucro y pagos de Cupones Sociales Solidarios
        </p>
        <div
          className="relative h-px w-48"
          style={{ background: "linear-gradient(90deg, transparent, #B87333, transparent)" }}
        />
      </section>

      {/* AUSPICIOS */}
      <section className="max-w-4xl mx-auto px-4 py-14">
        <div className="flex items-start gap-4 mb-8">
          <div
            className="w-1.5 h-14 rounded-full flex-shrink-0"
            style={{ background: "linear-gradient(180deg, #E8511A, #B87333)" }}
          />
          <div>
            <h2
              className="text-xl md:text-2xl font-bold tracking-widest uppercase"
              style={{ color: "#1A3A5C", fontFamily: "var(--font-cinzel, serif)" }}
            >
              Auspicios
            </h2>
            <p
              className="text-sm mt-1"
              style={{ color: "#1B6CA8", fontFamily: "var(--font-lora, serif)" }}
            >
              Apoyo a actividades sin ánimo de lucro
            </p>
          </div>
        </div>

        <div
          className="rounded-2xl p-6 md:p-10 border-2"
          style={{
            background: "linear-gradient(135deg, #e8dfc4 0%, #d4c9a8 100%)",
            borderColor: "#B87333",
            boxShadow: "0 4px 32px rgba(26,58,92,0.08)",
          }}
        >
          <p
            className="text-sm leading-relaxed mb-4"
            style={{ color: "#1A3A5C", fontFamily: "var(--font-lora, serif)" }}
          >
            La Fundación Social Galeona de Cádiz recibe auspicios destinados a actividades sin ánimo de lucro,
            en el marco de la Escuela de Nazaret (EDN) y sus programas de formación, cultura y desarrollo social.
          </p>
          <p
            className="text-sm leading-relaxed"
            style={{ color: "#1A3A5C", fontFamily: "var(--font-lora, serif)" }}
          >
            Los aportes se canalizan exclusivamente a través del canal bancario oficial indicado a continuación.
          </p>
        </div>
      </section>

      {/* SEPARADOR */}
      <div className="flex justify-center px-4">
        <div className="w-full max-w-4xl h-px" style={{ background: "linear-gradient(90deg, transparent, #B87333, transparent)" }} />
      </div>

      {/* PAGOS CSS-EDN */}
      <section className="max-w-4xl mx-auto px-4 py-14">
        <div className="flex items-start gap-4 mb-8">
          <div
            className="w-1.5 h-14 rounded-full flex-shrink-0"
            style={{ background: "linear-gradient(180deg, #E8511A, #B87333)" }}
          />
          <div>
            <h2
              className="text-xl md:text-2xl font-bold tracking-widest uppercase"
              style={{ color: "#1A3A5C", fontFamily: "var(--font-cinzel, serif)" }}
            >
              Pagos
            </h2>
            <p
              className="text-sm mt-1"
              style={{ color: "#1B6CA8", fontFamily: "var(--font-lora, serif)" }}
            >
              Cupones Sociales Solidarios — CSS-EDN
            </p>
          </div>
        </div>

        <div
          className="rounded-2xl p-6 md:p-10 border-2"
          style={{
            background: "linear-gradient(135deg, #e8dfc4 0%, #d4c9a8 100%)",
            borderColor: "#B87333",
            boxShadow: "0 4px 32px rgba(26,58,92,0.08)",
          }}
        >
          <p
            className="text-sm leading-relaxed"
            style={{ color: "#1A3A5C", fontFamily: "var(--font-lora, serif)" }}
          >
            Los pagos correspondientes a los Cupones Sociales Solidarios (CSS-EDN) deben realizarse
            a la cuenta bancaria oficial de la Fundación. Una vez efectuada la consignación, envíe
            el comprobante por los canales indicados para validar su pago.
          </p>
        </div>
      </section>

      {/* SEPARADOR */}
      <div className="flex justify-center px-4">
        <div className="w-full max-w-4xl h-px" style={{ background: "linear-gradient(90deg, transparent, #B87333, transparent)" }} />
      </div>

      {/* DATOS BANCARIOS */}
      <section className="max-w-4xl mx-auto px-4 py-14">
        <div className="flex items-start gap-4 mb-8">
          <div
            className="w-1.5 h-14 rounded-full flex-shrink-0"
            style={{ background: "linear-gradient(180deg, #E8511A, #B87333)" }}
          />
          <div>
            <h2
              className="text-xl md:text-2xl font-bold tracking-widest uppercase"
              style={{ color: "#1A3A5C", fontFamily: "var(--font-cinzel, serif)" }}
            >
              Datos Bancarios
            </h2>
            <p
              className="text-sm mt-1"
              style={{ color: "#1B6CA8", fontFamily: "var(--font-lora, serif)" }}
            >
              Canal oficial de recaudo
            </p>
          </div>
        </div>

        <div
          className="rounded-2xl p-6 md:p-10 border-2"
          style={{
            background: "linear-gradient(135deg, #e8dfc4 0%, #d4c9a8 100%)",
            borderColor: "#B87333",
            boxShadow: "0 4px 32px rgba(26,58,92,0.08)",
          }}
        >
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {datosBancarios.map(({ label, valor }) => (
              <div key={label} className="flex flex-col gap-1">
                <span
                  className="text-[0.65rem] tracking-[0.2em] uppercase font-semibold"
                  style={{ color: "#B87333", fontFamily: "var(--font-cinzel, serif)" }}
                >
                  {label}
                </span>
                <span
                  className="text-sm leading-relaxed font-semibold"
                  style={{ color: "#1A3A5C", fontFamily: "var(--font-lora, serif)" }}
                >
                  {valor}
                </span>
              </div>
            ))}
          </div>

          {/* Transferencia internacional */}
          <div className="mt-8 pt-6" style={{ borderTop: "1px solid #B87333" }}>
            <div className="flex items-center gap-3 mb-3">
              <FaGlobeAmericas size={16} style={{ color: "#1B6CA8" }} />
              <span
                className="text-[0.65rem] tracking-[0.2em] uppercase font-semibold"
                style={{ color: "#B87333", fontFamily: "var(--font-cinzel, serif)" }}
              >
                Transferencia internacional
              </span>
            </div>
            <p
              className="text-sm"
              style={{ color: "#1A3A5C", fontFamily: "var(--font-lora, serif)" }}
            >
              Código BIC/SWIFT: <strong>CAFECOBB</strong>
            </p>
          </div>
        </div>
      </section>

      {/* SEPARADOR */}
      <div className="flex justify-center px-4">
        <div className="w-full max-w-4xl h-px" style={{ background: "linear-gradient(90deg, transparent, #B87333, transparent)" }} />
      </div>

      {/* ENVÍO DE COMPROBANTE */}
      <section className="max-w-4xl mx-auto px-4 py-14">
        <div className="flex items-start gap-4 mb-8">
          <div
            className="w-1.5 h-14 rounded-full flex-shrink-0"
            style={{ background: "linear-gradient(180deg, #E8511A, #B87333)" }}
          />
          <div>
            <h2
              className="text-xl md:text-2xl font-bold tracking-widest uppercase"
              style={{ color: "#1A3A5C", fontFamily: "var(--font-cinzel, serif)" }}
            >
              Envío de Comprobante
            </h2>
            <p
              className="text-sm mt-1"
              style={{ color: "#1B6CA8", fontFamily: "var(--font-lora, serif)" }}
            >
              Una vez realizada la consignación
            </p>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {/* Email */}
          <div
            className="rounded-xl p-6 border-2 flex flex-col items-center text-center gap-4 transition-all duration-300 hover:-translate-y-1"
            style={{
              borderColor: "#B87333",
              background: "linear-gradient(160deg, #ede4cb 0%, #ddd0b0 100%)",
              boxShadow: "0 2px 16px rgba(26,58,92,0.06)",
            }}
          >
            <div
              className="w-14 h-14 rounded-full flex items-center justify-center flex-shrink-0"
              style={{
                background: "linear-gradient(135deg, #1A3A5C, #1F4FA3)",
                boxShadow: "0 4px 12px rgba(26,58,92,0.2)",
              }}
            >
              <FaEnvelope size={20} style={{ color: "#B87333" }} />
            </div>
            <div className="flex flex-col gap-1">
              <span
                className="text-[0.65rem] tracking-[0.2em] uppercase font-semibold"
                style={{ color: "#B87333", fontFamily: "var(--font-cinzel, serif)" }}
              >
                Correo electrónico
              </span>
              <a
                href="mailto:galeonadecadiz@yahoo.com"
                className="text-sm font-semibold underline underline-offset-2 hover:opacity-80 transition-opacity"
                style={{ color: "#1A3A5C", fontFamily: "var(--font-lora, serif)" }}
              >
                galeonadecadiz@yahoo.com
              </a>
            </div>
          </div>

          {/* WhatsApp */}
          <div
            className="rounded-xl p-6 border-2 flex flex-col items-center text-center gap-4 transition-all duration-300 hover:-translate-y-1"
            style={{
              borderColor: "#B87333",
              background: "linear-gradient(160deg, #ede4cb 0%, #ddd0b0 100%)",
              boxShadow: "0 2px 16px rgba(26,58,92,0.06)",
            }}
          >
            <div
              className="w-14 h-14 rounded-full flex items-center justify-center flex-shrink-0"
              style={{
                background: "#2E6B3E",
                boxShadow: "0 4px 12px rgba(46,107,62,0.3)",
              }}
            >
              <FaWhatsapp size={22} style={{ color: "#F5EDD6" }} />
            </div>
            <div className="flex flex-col gap-1">
              <span
                className="text-[0.65rem] tracking-[0.2em] uppercase font-semibold"
                style={{ color: "#B87333", fontFamily: "var(--font-cinzel, serif)" }}
              >
                WhatsApp
              </span>
              <a
                href="https://wa.me/573112524239"
                target="_blank"
                rel="noopener noreferrer"
                className="text-sm font-semibold underline underline-offset-2 hover:opacity-80 transition-opacity"
                style={{ color: "#1A3A5C", fontFamily: "var(--font-lora, serif)" }}
              >
                311 252 4239
              </a>
            </div>
          </div>
        </div>
      </section>

      {/* SEPARADOR */}
      <div className="flex justify-center px-4">
        <div className="w-full max-w-4xl h-px" style={{ background: "linear-gradient(90deg, transparent, #B87333, transparent)" }} />
      </div>

      {/* AVISO LEGAL */}
      <section className="max-w-4xl mx-auto px-4 py-14">
        <div
          className="rounded-2xl p-6 md:p-8 border-2 flex items-start gap-4"
          style={{
            background: "linear-gradient(135deg, #f5edd6 0%, #e8dfc4 100%)",
            borderColor: "#E8511A",
          }}
        >
          <FaExclamationTriangle size={20} className="flex-shrink-0 mt-0.5" style={{ color: "#E8511A" }} />
          <div className="flex flex-col gap-2">
            <span
              className="text-[0.65rem] tracking-[0.2em] uppercase font-semibold"
              style={{ color: "#E8511A", fontFamily: "var(--font-cinzel, serif)" }}
            >
              Aviso importante
            </span>
            <p
              className="text-sm leading-relaxed"
              style={{ color: "#1A3A5C", fontFamily: "var(--font-lora, serif)" }}
            >
              La Fundación Social Galeona de Cádiz <strong>no recibe importes en dinero fuera de este canal bancario oficial</strong>.
              Cualquier transacción realizada por medios distintos no será reconocida por la institución.
            </p>
          </div>
        </div>
      </section>

      {/* CTA FINAL CON LEMA */}
      <section
        className="py-16 px-4 flex flex-col items-center gap-5"
        style={{ background: "#1A3A5C" }}
      >
        <p
          className="text-xs tracking-[0.3em] uppercase text-center max-w-md"
          style={{ color: "#B87333", fontFamily: "var(--font-cinzel, serif)" }}
        >
          Sapientia Ædificavit Sibi Domvn
        </p>
        <p
          className="text-sm text-center max-w-md italic"
          style={{ color: "#d4c9a8", fontFamily: "var(--font-lora, serif)" }}
        >
          La sabiduría edificó su casa
        </p>
        <div
          className="h-px w-48 mt-4"
          style={{ background: "linear-gradient(90deg, transparent, #B87333, transparent)" }}
        />
        <Link
          href="/contacto"
          className="mt-6 inline-block px-10 py-4 rounded-full font-semibold tracking-widest uppercase text-sm transition-opacity hover:opacity-90"
          style={{
            background: "linear-gradient(90deg, #E8511A, #B87333)",
            color: "#F5EDD6",
            fontFamily: "var(--font-cinzel, serif)",
            letterSpacing: "0.15em",
            boxShadow: "0 8px 32px rgba(232,81,26,0.35)",
          }}
        >
          Contactar
        </Link>
      </section>

    </div>
  );
}
