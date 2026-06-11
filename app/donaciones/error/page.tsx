import Link from "next/link";

export default function DonacionesErrorPage() {
  return (
    <div style={{ background: "#F5EDD6", minHeight: "100vh" }} className="flex items-center justify-center px-6 py-16">
      <div
        className="max-w-md w-full rounded-2xl p-8 text-center"
        style={{ background: "linear-gradient(135deg, #e8dfc4, #d4c9a8)", border: "2px solid #C0392B" }}
      >
        <div className="text-3xl mb-4">✗</div>
        <h2
          className="text-xl font-bold mb-3"
          style={{ color: "#1A3A5C", fontFamily: "var(--font-cinzel, serif)" }}
        >
          Pago no completado
        </h2>
        <p
          className="text-sm mb-6"
          style={{ color: "#1A3A5C", fontFamily: "var(--font-lora, serif)" }}
        >
          No se pudo procesar tu donación. Podés intentarlo nuevamente o contactarnos por WhatsApp.
        </p>
        <div className="flex flex-col gap-3">
          <Link
            href="/donaciones"
            className="inline-flex items-center justify-center px-6 py-2.5 rounded-full text-white text-sm font-semibold"
            style={{ background: "linear-gradient(90deg, #E8511A, #B87333)", fontFamily: "var(--font-cinzel, serif)" }}
          >
            Intentar de nuevo
          </Link>
          <a
            href="https://wa.me/573112524239"
            target="_blank"
            rel="noopener noreferrer"
            className="text-xs tracking-wide hover:opacity-70"
            style={{ color: "#B87333", fontFamily: "var(--font-cinzel, serif)" }}
          >
            Contactar por WhatsApp
          </a>
        </div>
      </div>
    </div>
  );
}
