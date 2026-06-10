// @ts-ignore
import { prisma } from "@/lib/prisma";
import BookGrid from "@/app/components/tienda/BookGrid";
import { FaWhatsapp } from "react-icons/fa6";
import Image from "next/image";
import Link from "next/link";

export const revalidate = 60;

export default async function TiendaPage() {
  const [books, starred] = await Promise.all([
    prisma.book.findMany({ where: { activo: true }, orderBy: { createdAt: "desc" } }),
    prisma.book.findFirst({ where: { starred: true, activo: true } }),
  ]);

  const booksForGrid = books.map((b: any) => ({
    id: b.id,
    slug: b.slug,
    nombre: b.nombre,
    autor: b.autor,
    descripcion: b.descripcion,
    precioCop: Number(b.precioCop),
    precioUsd: Number(b.precioUsd),
    coverUrl: b.coverUrl,
  }));

  const WA_MSG = starred
    ? encodeURIComponent(`Cordial saludo, estoy interesado en el libro "${starred.nombre}".`)
    : "";

  return (
    <div style={{ background: "#F5EDD6", minHeight: "100vh" }}>
      <section
        className="py-16 px-6 text-center"
        style={{ background: "#1A3A5C" }}
      >
        <h1
          className="text-4xl md:text-5xl font-bold text-white mb-4"
          style={{ fontFamily: "var(--font-cinzel, serif)" }}
        >
          Tienda
        </h1>
        <p
          className="text-lg max-w-xl mx-auto"
          style={{ color: "#d4c9a8", fontFamily: "var(--font-lora, serif)" }}
        >
          Libros y publicaciones del Fondo Editorial Galeona de Cádiz
        </p>
      </section>

      {/* ── LIBRO DESTACADO ── */}
      {starred && (
        <section className="max-w-5xl mx-auto px-6 pt-12 pb-2">
          <p
            className="text-[0.65rem] tracking-[0.3em] uppercase mb-4"
            style={{ color: "#B87333", fontFamily: "var(--font-cinzel, serif)" }}
          >
            Fondo Editorial Galeona de Cádiz
          </p>
          <div
            className="rounded-2xl p-6 md:p-8 flex flex-col md:flex-row gap-6 items-start"
            style={{
              background: "linear-gradient(135deg, #e8dfc4 0%, #d4c9a8 100%)",
              border: "2px solid #B87333",
              boxShadow: "0 4px 32px rgba(26,58,92,0.10)",
            }}
          >
            {/* Portada */}
            <div
              className="flex-shrink-0 rounded-xl overflow-hidden"
              style={{ border: "2px solid #B87333", width: 140, height: 190, boxShadow: "0 4px 20px rgba(26,58,92,0.18)" }}
            >
              {starred.coverUrl ? (
                <Image
                  src={starred.coverUrl}
                  alt={starred.nombre}
                  width={140}
                  height={190}
                  className="object-cover w-full h-full"
                  priority
                />
              ) : (
                <div className="w-full h-full flex flex-col items-center justify-center gap-2" style={{ background: "#1A3A5C" }}>
                  <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="#B87333" strokeWidth="1.5"><path d="M2 3h6a4 4 0 0 1 4 4v14a3 3 0 0 0-3-3H2z"/><path d="M22 3h-6a4 4 0 0 0-4 4v14a3 3 0 0 1 3-3h7z"/></svg>
                  <span className="text-[0.55rem] text-center px-2" style={{ color: "#B87333", fontFamily: "var(--font-cinzel, serif)" }}>Portada próximamente</span>
                </div>
              )}
            </div>

            {/* Info */}
            <div className="flex flex-col gap-3 flex-1">
              <h2
                className="text-2xl md:text-3xl font-bold leading-tight"
                style={{ color: "#1A3A5C", fontFamily: "var(--font-cinzel, serif)" }}
              >
                {starred.nombre}
              </h2>
              {starred.descripcion && (
                <p
                  className="text-sm leading-relaxed line-clamp-3"
                  style={{ color: "#1A3A5C", fontFamily: "var(--font-lora, serif)" }}
                >
                  {starred.descripcion}
                </p>
              )}
              {Number(starred.precioCop) > 0 && (
                <p className="text-base font-bold" style={{ color: "#B87333", fontFamily: "var(--font-cinzel, serif)" }}>
                  ${Number(starred.precioCop).toLocaleString("es-CO")} COP
                  {Number(starred.precioUsd) > 0 && (
                    <span className="text-sm font-normal ml-3" style={{ color: "#8a7a5a" }}>
                      ${Number(starred.precioUsd).toFixed(2)} USD
                    </span>
                  )}
                </p>
              )}
              <div className="flex flex-wrap gap-3 mt-1">
                <Link
                  href={`/tienda/${starred.slug}`}
                  className="inline-flex items-center gap-2 px-5 py-2.5 rounded-full text-sm font-semibold tracking-wide uppercase transition-opacity hover:opacity-90"
                  style={{ background: "linear-gradient(90deg, #E8511A, #B87333)", color: "#F5EDD6", fontFamily: "var(--font-cinzel, serif)" }}
                >
                  <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M2 3h6a4 4 0 0 1 4 4v14a3 3 0 0 0-3-3H2z"/><path d="M22 3h-6a4 4 0 0 0-4 4v14a3 3 0 0 1 3-3h7z"/></svg>
                  Ver ficha editorial
                </Link>
                {starred.pdfUrl && (
                  <Link
                    href={`/tienda/${starred.slug}/preview`}
                    className="inline-flex items-center gap-2 px-5 py-2.5 rounded-full text-sm font-semibold tracking-wide uppercase transition-opacity hover:opacity-90"
                    style={{ background: "#1A3A5C", color: "#F5EDD6", fontFamily: "var(--font-cinzel, serif)" }}
                  >
                    <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z"/><circle cx="12" cy="12" r="3"/></svg>
                    Leer e-book
                  </Link>
                )}
                <a
                  href={`https://wa.me/573112524239?text=${WA_MSG}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 px-5 py-2.5 rounded-full text-sm font-semibold tracking-wide uppercase transition-opacity hover:opacity-90"
                  style={{ background: "#2E6B3E", color: "#F5EDD6", fontFamily: "var(--font-cinzel, serif)" }}
                >
                  <FaWhatsapp size={14} />
                  Comprar por WhatsApp
                </a>
              </div>
            </div>
          </div>
        </section>
      )}

      <section className="max-w-6xl mx-auto px-6 py-12">
        <BookGrid books={booksForGrid} />

        <div className="flex justify-center mt-10">
          <a
            href="https://wa.me/?text=Hola%2C%20me%20interesa%20un%20libro%20del%20Fondo%20Editorial%20Galeona."
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 px-6 py-3 rounded-full text-white font-semibold text-sm tracking-wide transition-opacity hover:opacity-90"
            style={{ background: "#2E6B3E", fontFamily: "var(--font-cinzel, serif)" }}
          >
            <FaWhatsapp size={16} />
            Contactar por WhatsApp
          </a>
        </div>
      </section>
    </div>
  );
}
