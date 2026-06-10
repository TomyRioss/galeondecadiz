import Link from "next/link";
import Image from "next/image";
import { FaBook, FaDownload, FaCartShopping, FaEnvelope, FaWhatsapp } from "react-icons/fa6";

const WA_NUMBER = "";
const WA_MSG = (title: string) =>
  encodeURIComponent(`Cordial saludo, estoy interesado en el libro "${title}".`);

const BOOK_PRINCIPAL = {
  slug: "nuestra-senora-de-chiquinquira",
  title: "Nuestra Señora de Chiquinquirá de La Estrella",
  subtitle: "Historia, devoción y espiritualidad",
  author: "Fondo Editorial Galeona de Cádiz",
  description:
    "Una obra de valor histórico, devocional y pedagógico que recorre la devoción mariana en torno a Nuestra Señora de Chiquinquirá de La Estrella, sus prácticas y su legado espiritual.",
  coverUrl: null as string | null,
  available: true,
};

const CATEGORIES = [
  {
    label: "Canon Lector",
    href: "https://www.galeonadecadiz.org/Canon-Lector/",
    external: true,
    desc: "Obras esenciales para la formación lectora.",
  },
  {
    label: "Lienzos Didácticos · Artium",
    href: "https://docs.google.com/viewer?url=https://www.galeonadecadiz.org/pdf/ps-3.pdf",
    external: true,
    desc: "Recursos didácticos con identidad visual institucional.",
  },
  {
    label: "Catálogo Wayuu · Artium",
    href: "https://docs.google.com/viewer?url=https://www.galeonadecadiz.org/pdf/ps-4.pdf",
    external: true,
    desc: "Publicaciones sobre cultura y artesanía Wayuu.",
  },
  {
    label: "Guías y Lexicografías · Scriptorium",
    href: "https://docs.google.com/viewer?url=https://www.galeonadecadiz.org/pdf/ps-5.pdf",
    external: true,
    desc: "Guías lingüísticas y recursos lexicográficos.",
  },
];

export default function FondoEditorialPage() {
  return (
    <div style={{ background: "#F5EDD6", minHeight: "100vh" }}>

      {/* Hero */}
      <section
        className="py-16 px-6 text-center"
        style={{ background: "#1A3A5C" }}
      >
        <p
          className="text-[#B87333] text-xs tracking-[0.3em] uppercase mb-2"
          style={{ fontFamily: "var(--font-cinzel, serif)" }}
        >
          Fundación Social Galeona de Cádiz
        </p>
        <h1
          className="text-3xl md:text-5xl font-bold text-white mb-4"
          style={{ fontFamily: "var(--font-cinzel, serif)" }}
        >
          Fondo Editorial Galeona
        </h1>
        <p
          className="text-base md:text-lg max-w-2xl mx-auto"
          style={{ color: "#d4c9a8", fontFamily: "var(--font-lora, serif)" }}
        >
          Espacio editorial dedicado a la publicación de obras históricas, devocionales,
          pedagógicas y culturales que fortalecen la identidad institucional y el legado
          espiritual de Galeona de Cádiz.
        </p>
      </section>

      {/* Libro principal destacado */}
      <section className="max-w-4xl mx-auto px-6 py-14">
        <h2
          className="text-center text-sm tracking-[0.3em] uppercase mb-10"
          style={{ color: "#B87333", fontFamily: "var(--font-cinzel, serif)" }}
        >
          Libro Principal
        </h2>

        <div
          className="flex flex-col md:flex-row gap-8 rounded-2xl p-6 md:p-10"
          style={{
            background: "linear-gradient(135deg, #e8dfc4 0%, #d4c9a8 100%)",
            border: "2px solid #B87333",
          }}
        >
          {/* Portada */}
          <div className="flex-shrink-0 flex justify-center">
            <div
              className="w-40 h-56 md:w-48 md:h-64 rounded-lg overflow-hidden flex items-center justify-center"
              style={{ background: "#1A3A5C", border: "3px solid #B87333" }}
            >
              {BOOK_PRINCIPAL.coverUrl ? (
                <Image
                  src={BOOK_PRINCIPAL.coverUrl}
                  alt={BOOK_PRINCIPAL.title}
                  width={192}
                  height={256}
                  className="object-cover w-full h-full"
                />
              ) : (
                <div className="flex flex-col items-center gap-2 p-4 text-center">
                  <FaBook size={32} style={{ color: "#B87333" }} />
                  <span
                    className="text-white text-[0.6rem] tracking-widest uppercase"
                    style={{ fontFamily: "var(--font-cinzel, serif)" }}
                  >
                    Portada próximamente
                  </span>
                </div>
              )}
            </div>
          </div>

          {/* Info */}
          <div className="flex flex-col gap-4 flex-1">
            <div>
              <p
                className="text-xs tracking-widest uppercase mb-1"
                style={{ color: "#B87333", fontFamily: "var(--font-cinzel, serif)" }}
              >
                {BOOK_PRINCIPAL.author}
              </p>
              <h3
                className="text-xl md:text-2xl font-bold leading-snug"
                style={{ color: "#1A3A5C", fontFamily: "var(--font-cinzel, serif)" }}
              >
                {BOOK_PRINCIPAL.title}
              </h3>
              <p
                className="text-sm mt-1"
                style={{ color: "#B87333", fontFamily: "var(--font-lora, serif)" }}
              >
                {BOOK_PRINCIPAL.subtitle}
              </p>
            </div>

            <p
              className="text-sm leading-relaxed"
              style={{ color: "#1A3A5C", fontFamily: "var(--font-lora, serif)" }}
            >
              {BOOK_PRINCIPAL.description}
            </p>

            {/* Botones */}
            <div className="flex flex-wrap gap-3 mt-2">
              <Link
                href={`/fondo-editorial/${BOOK_PRINCIPAL.slug}`}
                className="inline-flex items-center gap-2 px-5 py-2.5 rounded-full text-white text-sm font-semibold tracking-wide transition-opacity hover:opacity-90"
                style={{
                  background: "linear-gradient(90deg, #E8511A, #B87333)",
                  fontFamily: "var(--font-cinzel, serif)",
                }}
              >
                <FaBook size={14} />
                Ver ficha editorial
              </Link>

              <Link
                href={`/ebook/${BOOK_PRINCIPAL.slug}`}
                className="inline-flex items-center gap-2 px-5 py-2.5 rounded-full text-sm font-semibold tracking-wide transition-opacity hover:opacity-90"
                style={{
                  background: "#1A3A5C",
                  color: "#F5EDD6",
                  fontFamily: "var(--font-cinzel, serif)",
                }}
              >
                <FaDownload size={14} />
                Leer e-book
              </Link>

              {BOOK_PRINCIPAL.available && (
                <a
                  href={`https://wa.me/${WA_NUMBER}?text=${WA_MSG(BOOK_PRINCIPAL.title)}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 px-5 py-2.5 rounded-full text-sm font-semibold tracking-wide transition-opacity hover:opacity-90"
                  style={{
                    background: "#2E6B3E",
                    color: "#FFFFFF",
                    fontFamily: "var(--font-cinzel, serif)",
                  }}
                >
                  <FaWhatsapp size={14} />
                  Comprar por WhatsApp
                </a>
              )}
            </div>
          </div>
        </div>
      </section>

      {/* Categorías */}
      <section
        className="py-14 px-6"
        style={{ background: "#1A3A5C" }}
      >
        <div className="max-w-4xl mx-auto">
          <h2
            className="text-center text-sm tracking-[0.3em] uppercase mb-10 text-white"
            style={{ fontFamily: "var(--font-cinzel, serif)" }}
          >
            Colecciones y Recursos
          </h2>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
            {CATEGORIES.map((cat) => (
              <a
                key={cat.label}
                href={cat.href}
                target={cat.external ? "_blank" : undefined}
                rel={cat.external ? "noopener noreferrer" : undefined}
                className="flex flex-col gap-2 p-5 rounded-xl transition-all hover:-translate-y-1"
                style={{
                  background: "rgba(255,255,255,0.06)",
                  border: "1px solid #B87333",
                }}
              >
                <span
                  className="text-sm font-semibold tracking-wide"
                  style={{ color: "#B87333", fontFamily: "var(--font-cinzel, serif)" }}
                >
                  {cat.label}
                </span>
                <p
                  className="text-xs leading-relaxed"
                  style={{ color: "#d4c9a8", fontFamily: "var(--font-lora, serif)" }}
                >
                  {cat.desc}
                </p>
              </a>
            ))}
          </div>
        </div>
      </section>

      {/* Accesos rápidos */}
      <section className="max-w-4xl mx-auto px-6 py-14">
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-5">
          <Link
            href="/tienda"
            className="flex flex-col items-center gap-3 p-6 rounded-xl text-center transition-all hover:-translate-y-1"
            style={{ background: "linear-gradient(135deg, #e8dfc4, #d4c9a8)", border: "2px solid #B87333" }}
          >
            <FaCartShopping size={24} style={{ color: "#B87333" }} />
            <span
              className="text-sm font-semibold tracking-wide uppercase"
              style={{ color: "#1A3A5C", fontFamily: "var(--font-cinzel, serif)" }}
            >
              Tienda
            </span>
            <p
              className="text-xs"
              style={{ color: "#1A3A5C", fontFamily: "var(--font-lora, serif)" }}
            >
              Adquirí publicaciones impresas
            </p>
          </Link>

          <Link
            href="/ebook/nuestra-senora-de-chiquinquira"
            className="flex flex-col items-center gap-3 p-6 rounded-xl text-center transition-all hover:-translate-y-1"
            style={{ background: "linear-gradient(135deg, #1A3A5C, #1F4FA3)", border: "2px solid #B87333" }}
          >
            <FaDownload size={24} style={{ color: "#B87333" }} />
            <span
              className="text-sm font-semibold tracking-wide uppercase text-white"
              style={{ fontFamily: "var(--font-cinzel, serif)" }}
            >
              E-Books
            </span>
            <p
              className="text-xs text-white/70"
              style={{ fontFamily: "var(--font-lora, serif)" }}
            >
              Leé nuestras publicaciones online
            </p>
          </Link>

          <Link
            href="/contacto"
            className="flex flex-col items-center gap-3 p-6 rounded-xl text-center transition-all hover:-translate-y-1"
            style={{ background: "linear-gradient(135deg, #e8dfc4, #d4c9a8)", border: "2px solid #B87333" }}
          >
            <FaEnvelope size={24} style={{ color: "#B87333" }} />
            <span
              className="text-sm font-semibold tracking-wide uppercase"
              style={{ color: "#1A3A5C", fontFamily: "var(--font-cinzel, serif)" }}
            >
              Solicitar publicaciones
            </span>
            <p
              className="text-xs"
              style={{ color: "#1A3A5C", fontFamily: "var(--font-lora, serif)" }}
            >
              Publicaciones impresas a pedido
            </p>
          </Link>
        </div>
      </section>

    </div>
  );
}
