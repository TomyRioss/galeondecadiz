import Link from "next/link";
import { FaWhatsapp } from "react-icons/fa6";

export default function SoportePage() {
  const whatsappUrl = "https://wa.me/573000000000?text=Hola,%20necesito%20ayuda%20con%20mi%20compra%20en%20la%20tienda%20Galeona%20de%20C%C3%A1diz";

  return (
    <div style={{ background: "#F5EDD6", minHeight: "100vh" }}>
      <section className="py-12 px-6" style={{ background: "#1A3A5C" }}>
        <h1
          className="text-3xl font-bold text-white text-center"
          style={{ fontFamily: "var(--font-cinzel, serif)" }}
        >
          Soporte de compras
        </h1>
      </section>

      <section className="max-w-lg mx-auto px-6 py-16 text-center">
        <p
          className="text-lg mb-8"
          style={{ color: "#1B6CA8", fontFamily: "var(--font-lora, serif)" }}
        >
          ¿Tenés algún problema con tu pedido o necesitás ayuda? Contactanos directamente por WhatsApp.
        </p>
        <Link
          href={whatsappUrl}
          target="_blank"
          rel="noopener noreferrer"
          className="inline-flex items-center gap-3 px-8 py-4 rounded-xl text-white font-semibold text-lg"
          style={{ background: "#2E6B3E" }}
        >
          <FaWhatsapp size={24} />
          Contactar por WhatsApp
        </Link>
        <p className="mt-6 text-sm" style={{ color: "#1B6CA8" }}>
          Horario de atención: Lunes a Viernes 8:00 am – 6:00 pm (Colombia)
        </p>
      </section>
    </div>
  );
}
