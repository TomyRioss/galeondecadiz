import Link from "next/link";
import Image from "next/image";
import { FaBook, FaDownload, FaCartShopping, FaEnvelope, FaScroll } from "react-icons/fa6";
import { headers } from "next/headers";

const BOOK_PRINCIPAL_BASE = {
  slug: "nuestra-senora-de-chiquinquira-de-la-estrella",
  title: "Nuestra Señora de Chiquinquirá de La Estrella",
  subtitle: "Historia, devoción y espiritualidad",
  author: "Fondo Editorial Galeona de Cádiz",
  description:
    "Una obra de valor histórico, devocional y pedagógico que recorre la devoción mariana en torno a Nuestra Señora de Chiquinquirá de La Estrella, sus prácticas y su legado espiritual.",
};

async function getBookCover(slug: string): Promise<string | null> {
  try {
    const hdrs = await headers();
    const host = hdrs.get("host") ?? "localhost:3000";
    const protocol = host.startsWith("localhost") ? "http" : "https";
    const res = await fetch(`${protocol}://${host}/api/admin/libros`, { cache: "no-store" });
    if (!res.ok) return null;
    const data = await res.json();
    const book = (data.books ?? []).find((b: { slug: string; coverUrl?: string }) => b.slug === slug);
    return book?.coverUrl ?? null;
  } catch {
    return null;
  }
}

const ACCESOS = [
  {
    icon: FaScroll,
    label: "Canon Lector",
    desc: "Obras esenciales para la formación lectora institucional.",
    href: "https://www.galeonadecadiz.org/Canon-Lector/",
    external: true,
    light: true,
  },
  {
    icon: FaDownload,
    label: "E-Books",
    desc: "Leé y descargá nuestras publicaciones digitales.",
    href: "/tienda/ebook",
    external: false,
    light: false,
  },
  {
    icon: FaBook,
    label: "Publicaciones Impresas",
    desc: "Obras físicas disponibles por solicitud o en tienda.",
    href: "/tienda",
    external: false,
    light: true,
  },
  {
    icon: FaCartShopping,
    label: "Tienda",
    desc: "Adquirí publicaciones impresas y materiales editoriales.",
    href: "/tienda",
    external: false,
    light: false,
  },
  {
    icon: FaEnvelope,
    label: "Solicitar publicaciones",
    desc: "Publicaciones especiales, institucionales o a pedido.",
    href: "/contacto",
    external: false,
    light: true,
  },
];

export default async function FondoEditorialPage() {
  const coverUrl = await getBookCover(BOOK_PRINCIPAL_BASE.slug);
  const BOOK_PRINCIPAL = { ...BOOK_PRINCIPAL_BASE, coverUrl };
  return (
    <div style={{ background: "#F5EDD6", minHeight: "100vh" }}>

      {/* Hero */}
      <section
        className="relative py-20 px-6 text-center overflow-hidden"
        style={{ background: "#1A3A5C" }}
      >
        {/* Decorative top line */}
        <div
          className="absolute top-0 left-0 right-0 h-1"
          style={{ background: "linear-gradient(90deg, transparent, #B87333, transparent)" }}
        />

        <p
          className="text-[0.65rem] tracking-[0.35em] uppercase mb-3"
          style={{ color: "#B87333", fontFamily: "var(--font-cinzel, serif)" }}
        >
          Fundación Social Galeona de Cádiz
        </p>

        <h1
          className="text-3xl md:text-5xl font-bold mb-5"
          style={{ color: "#F5EDD6", fontFamily: "var(--font-cinzel, serif)", lineHeight: 1.15 }}
        >
          Fondo Editorial Galeona
        </h1>

        {/* Separador */}
        <div className="flex justify-center mb-6">
          <div
            className="h-px w-32"
            style={{ background: "linear-gradient(90deg, transparent, #B87333, transparent)" }}
          />
        </div>

        <p
          className="text-base md:text-lg max-w-2xl mx-auto leading-relaxed"
          style={{ color: "#d4c9a8", fontFamily: "var(--font-lora, serif)" }}
        >
          Espacio dedicado a la publicación de obras históricas, devocionales,
          pedagógicas y culturales que fortalecen la identidad institucional
          y el legado espiritual de Galeona de Cádiz.
        </p>

        {/* Decorative bottom line */}
        <div
          className="absolute bottom-0 left-0 right-0 h-px"
          style={{ background: "linear-gradient(90deg, transparent, #B87333, transparent)" }}
        />
      </section>

      {/* Libro destacado */}
      <section id="contenido" className="max-w-4xl mx-auto px-6 py-14">
        <div className="flex items-start gap-4 mb-8">
          <div
            className="w-1.5 h-14 rounded-full flex-shrink-0"
            style={{ background: "linear-gradient(180deg, #E8511A, #B87333)" }}
          />
          <div>
            <p
              className="text-[0.65rem] tracking-[0.2em] uppercase mb-1"
              style={{ color: "#B87333", fontFamily: "var(--font-cinzel, serif)" }}
            >
              Publicación destacada
            </p>
            <h2
              className="text-xl md:text-2xl font-bold"
              style={{ color: "#1A3A5C", fontFamily: "var(--font-cinzel, serif)" }}
            >
              Obras del Fondo Editorial
            </h2>
          </div>
        </div>

        <div
          className="flex flex-col md:flex-row gap-8 rounded-2xl p-6 md:p-10"
          style={{
            background: "linear-gradient(135deg, #e8dfc4 0%, #d4c9a8 100%)",
            border: "2px solid #B87333",
            boxShadow: "0 4px 32px rgba(26,58,92,0.08)",
          }}
        >
          {/* Portada */}
          <div className="flex-shrink-0 flex justify-center md:justify-start">
            <div
              className="w-36 h-52 md:w-44 md:h-60 rounded-xl overflow-hidden flex items-center justify-center"
              style={{ background: "#1A3A5C", border: "2px solid #B87333" }}
            >
              {BOOK_PRINCIPAL.coverUrl ? (
                <Image
                  src={BOOK_PRINCIPAL.coverUrl}
                  alt={BOOK_PRINCIPAL.title}
                  width={176}
                  height={240}
                  className="object-cover w-full h-full"
                />
              ) : (
                <div className="flex flex-col items-center gap-2 p-4 text-center">
                  <FaBook size={28} style={{ color: "#B87333" }} />
                  <span
                    className="text-white text-[0.55rem] tracking-widest uppercase leading-relaxed"
                    style={{ fontFamily: "var(--font-cinzel, serif)" }}
                  >
                    Portada próximamente
                  </span>
                </div>
              )}
            </div>
          </div>

          {/* Info */}
          <div className="flex flex-col gap-4 flex-1 justify-center">
            <div>
              <p
                className="text-[0.65rem] tracking-widest uppercase mb-1"
                style={{ color: "#B87333", fontFamily: "var(--font-cinzel, serif)" }}
              >
                {BOOK_PRINCIPAL.author}
              </p>
              <h3
                className="text-lg md:text-2xl font-bold leading-snug"
                style={{ color: "#1A3A5C", fontFamily: "var(--font-cinzel, serif)" }}
              >
                {BOOK_PRINCIPAL.title}
              </h3>
              <p
                className="text-sm mt-1 italic"
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

            <div className="flex flex-wrap gap-3 mt-1">
              <Link
                href={`/tienda/${BOOK_PRINCIPAL.slug}`}
                className="inline-flex items-center gap-2 px-5 py-2.5 rounded-full text-sm font-semibold tracking-wide transition-opacity hover:opacity-90"
                style={{
                  background: "linear-gradient(90deg, #E8511A, #B87333)",
                  color: "#F5EDD6",
                  fontFamily: "var(--font-cinzel, serif)",
                }}
              >
                <FaBook size={13} />
                Ver ficha editorial
              </Link>

              <Link
                href={`/tienda/${BOOK_PRINCIPAL.slug}/preview`}
                className="inline-flex items-center gap-2 px-5 py-2.5 rounded-full text-sm font-semibold tracking-wide transition-opacity hover:opacity-90"
                style={{
                  background: "#1A3A5C",
                  color: "#F5EDD6",
                  fontFamily: "var(--font-cinzel, serif)",
                }}
              >
                <FaDownload size={13} />
                Leer e-book
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Separador */}
      <div className="flex justify-center px-6">
        <div
          className="w-full max-w-4xl h-px"
          style={{ background: "linear-gradient(90deg, transparent, #B87333, transparent)" }}
        />
      </div>

      {/* Accesos */}
      <section className="max-w-4xl mx-auto px-6 py-14">
        <div className="flex items-start gap-4 mb-8">
          <div
            className="w-1.5 h-14 rounded-full flex-shrink-0"
            style={{ background: "linear-gradient(180deg, #E8511A, #B87333)" }}
          />
          <div>
            <p
              className="text-[0.65rem] tracking-[0.2em] uppercase mb-1"
              style={{ color: "#B87333", fontFamily: "var(--font-cinzel, serif)" }}
            >
              Colecciones y recursos
            </p>
            <h2
              className="text-xl md:text-2xl font-bold"
              style={{ color: "#1A3A5C", fontFamily: "var(--font-cinzel, serif)" }}
            >
              Accesos del Fondo Editorial
            </h2>
          </div>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {ACCESOS.map((item) => {
            const Icon = item.icon;
            const Wrapper = item.external ? "a" : Link;
            const extraProps = item.external
              ? { href: item.href, target: "_blank", rel: "noopener noreferrer" }
              : { href: item.href };

            return (
              <Wrapper
                key={item.label}
                {...(extraProps as never)}
                className="flex flex-col gap-3 p-6 rounded-2xl transition-all hover:-translate-y-1 hover:shadow-lg"
                style={
                  item.light
                    ? {
                        background: "linear-gradient(135deg, #e8dfc4 0%, #d4c9a8 100%)",
                        border: "2px solid #B87333",
                        boxShadow: "0 2px 16px rgba(26,58,92,0.06)",
                      }
                    : {
                        background: "linear-gradient(135deg, #1A3A5C, #1F4FA3)",
                        border: "2px solid #B87333",
                        boxShadow: "0 2px 16px rgba(26,58,92,0.12)",
                      }
                }
              >
                <div
                  className="w-10 h-10 rounded-full flex items-center justify-center"
                  style={{
                    background: item.light
                      ? "linear-gradient(135deg, #1A3A5C, #1F4FA3)"
                      : "rgba(255,255,255,0.08)",
                    border: "1px solid #B87333",
                  }}
                >
                  <Icon size={16} style={{ color: "#B87333" }} />
                </div>
                <div>
                  <p
                    className="text-sm font-semibold tracking-wide uppercase mb-1"
                    style={{
                      color: item.light ? "#1A3A5C" : "#F5EDD6",
                      fontFamily: "var(--font-cinzel, serif)",
                    }}
                  >
                    {item.label}
                  </p>
                  <p
                    className="text-xs leading-relaxed"
                    style={{
                      color: item.light ? "#1B6CA8" : "#d4c9a8",
                      fontFamily: "var(--font-lora, serif)",
                    }}
                  >
                    {item.desc}
                  </p>
                </div>
              </Wrapper>
            );
          })}
        </div>
      </section>


    </div>
  );
}
