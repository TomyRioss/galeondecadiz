// @ts-ignore
import { prisma } from "@/lib/prisma";
import BookGrid from "@/app/components/tienda/BookGrid";
import { FaWhatsapp } from "react-icons/fa6";
import { ShoppingCart } from "lucide-react";
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
    disponibleCompra: b.disponibleCompra,
  }));

  const WA_MSG = starred
    ? encodeURIComponent(`Cordial saludo, estoy interesado en el libro "${starred.nombre}".`)
    : "";

  return (
    <div style={{ background: "#F5EDD6", minHeight: "100vh" }}>

      {/* Hero */}
      <section className="py-10 md:py-16 px-6 text-center" style={{ background: "#1A3A5C" }}>
        <p className="text-[0.55rem] tracking-[0.35em] uppercase mb-2" style={{ color: "#B87333", fontFamily: "var(--font-cinzel, serif)" }}>
          Fondo Editorial Galeona de Cádiz
        </p>
        <h1 className="text-3xl md:text-5xl font-bold text-white mb-2" style={{ fontFamily: "var(--font-cinzel, serif)" }}>
          Tienda
        </h1>
        <p className="text-sm max-w-xl mx-auto" style={{ color: "#d4c9a8", fontFamily: "var(--font-lora, serif)" }}>
          Libros y publicaciones del Fondo Editorial
        </p>
      </section>

      {/* Libro destacado */}
      {starred && (
        <section className="max-w-5xl mx-auto px-4 pt-8 pb-2">
          <p className="text-[0.55rem] tracking-[0.3em] uppercase mb-3" style={{ color: "#B87333", fontFamily: "var(--font-cinzel, serif)" }}>
            ✦ Publicación destacada
          </p>
          <div
            className="rounded-2xl p-4 md:p-8"
            style={{
              background: "linear-gradient(135deg, #e8dfc4 0%, #d4c9a8 100%)",
              border: "2px solid #B87333",
              boxShadow: "0 4px 32px rgba(26,58,92,0.10)",
            }}
          >
            {/* Layout: row en mobile y desktop */}
            <div className="flex flex-row gap-4 md:gap-8 items-start">

              {/* Portada — fija, no encoge */}
              <div
                className="flex-shrink-0 rounded-xl overflow-hidden"
                style={{
                  border: "2px solid #B87333",
                  width: 100, height: 136,
                  boxShadow: "0 4px 20px rgba(26,58,92,0.18)",
                }}
              >
                {starred.coverUrl ? (
                  <Image
                    src={starred.coverUrl}
                    alt={starred.nombre}
                    width={100}
                    height={136}
                    className="object-cover w-full h-full"
                    priority
                  />
                ) : (
                  <div className="w-full h-full flex items-center justify-center" style={{ background: "#1A3A5C" }}>
                    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="#B87333" strokeWidth="1.5">
                      <path d="M2 3h6a4 4 0 0 1 4 4v14a3 3 0 0 0-3-3H2z"/>
                      <path d="M22 3h-6a4 4 0 0 0-4 4v14a3 3 0 0 1 3-3h7z"/>
                    </svg>
                  </div>
                )}
              </div>

              {/* Info */}
              <div className="flex flex-col gap-2 flex-1 min-w-0">
                <h2
                  className="text-lg md:text-3xl font-bold leading-tight"
                  style={{ color: "#1A3A5C", fontFamily: "var(--font-cinzel, serif)" }}
                >
                  {starred.nombre}
                </h2>

                {starred.descripcion && (
                  <p
                    className="text-xs md:text-sm leading-relaxed line-clamp-2 md:line-clamp-3 hidden xs:block"
                    style={{ color: "#1A3A5C", fontFamily: "var(--font-lora, serif)" }}
                  >
                    {starred.descripcion}
                  </p>
                )}

                {/* Precio */}
                {Number(starred.precioCop) > 0 && (
                  <div className="flex items-baseline gap-2 flex-wrap">
                    <span className="text-base font-bold" style={{ color: "#B87333", fontFamily: "var(--font-cinzel, serif)" }}>
                      ${Number(starred.precioCop).toLocaleString("es-CO")}
                      <span className="text-xs font-normal ml-1" style={{ color: "#8a7a5a" }}>COP</span>
                    </span>
                    {Number(starred.precioUsd) > 0 && (
                      <span className="text-xs" style={{ color: "#8a7a5a", fontFamily: "var(--font-lora, serif)" }}>
                        ${Number(starred.precioUsd).toFixed(2)} USD
                      </span>
                    )}
                  </div>
                )}
              </div>
            </div>

            {/* Descripción visible solo en mobile debajo del row */}
            {starred.descripcion && (
              <p
                className="text-xs leading-relaxed line-clamp-3 mt-3 md:hidden"
                style={{ color: "#1A3A5C", fontFamily: "var(--font-lora, serif)" }}
              >
                {starred.descripcion}
              </p>
            )}

            {/* Botones */}
            <div className="grid grid-cols-2 gap-2 mt-4 md:flex md:flex-wrap md:gap-3">
              <Link
                href={`/tienda/${starred.slug}`}
                className="flex items-center justify-center gap-1.5 px-3 py-2.5 rounded-xl text-xs font-semibold tracking-wide uppercase transition-opacity hover:opacity-90"
                style={{ background: "#1A3A5C", color: "#F5EDD6", fontFamily: "var(--font-cinzel, serif)" }}
              >
                <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <path d="M2 3h6a4 4 0 0 1 4 4v14a3 3 0 0 0-3-3H2z"/>
                  <path d="M22 3h-6a4 4 0 0 0-4 4v14a3 3 0 0 1 3-3h7z"/>
                </svg>
                Ver ficha
              </Link>

              {starred.pdfUrl && (
                <Link
                  href={`/tienda/${starred.slug}/preview`}
                  className="flex items-center justify-center gap-1.5 px-3 py-2.5 rounded-xl text-xs font-semibold tracking-wide uppercase transition-opacity hover:opacity-90"
                  style={{ border: "1.5px solid #1A3A5C", color: "#1A3A5C", background: "transparent", fontFamily: "var(--font-cinzel, serif)" }}
                >
                  <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                    <path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z"/>
                    <circle cx="12" cy="12" r="3"/>
                  </svg>
                  E-Book
                </Link>
              )}

              {starred.disponibleCompra && (
                <Link
                  href={`/checkout?slug=${starred.slug}`}
                  className="flex items-center justify-center gap-1.5 px-3 py-2.5 rounded-xl text-xs font-semibold tracking-wide uppercase transition-opacity hover:opacity-90"
                  style={{ background: "linear-gradient(90deg, #E8511A, #B87333)", color: "#F5EDD6", fontFamily: "var(--font-cinzel, serif)" }}
                >
                  <ShoppingCart size={12} />
                  Comprar
                </Link>
              )}

              <a
                href={`https://wa.me/573112524239?text=${WA_MSG}`}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center justify-center gap-1.5 px-3 py-2.5 rounded-xl text-xs font-semibold tracking-wide uppercase transition-opacity hover:opacity-90"
                style={{ background: "#2E6B3E", color: "#F5EDD6", fontFamily: "var(--font-cinzel, serif)" }}
              >
                <FaWhatsapp size={12} />
                WhatsApp
              </a>
            </div>

          </div>
        </section>
      )}

      {/* Grid de libros */}
      <section className="max-w-6xl mx-auto px-4 py-10">
        <BookGrid books={booksForGrid} />
      </section>

    </div>
  );
}
