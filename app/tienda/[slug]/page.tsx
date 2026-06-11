import { notFound } from "next/navigation";
import Image from "next/image";
import Link from "next/link";
// @ts-ignore
import { prisma } from "@/lib/prisma";

export const dynamic = "force-dynamic";

const WA_NUMBER = "";
const WA_MSG = (title: string) =>
  encodeURIComponent(`Cordial saludo, estoy interesado en el libro "${title}".`);

interface Props {
  params: Promise<{ slug: string }>;
}

export default async function BookDetailPage({ params }: Props) {
  const { slug } = await params;

  const book = await prisma.book.findUnique({ where: { slug } });
  if (!book || !book.activo) notFound();

  const precioCop = Number(book.precioCop);
  const precioUsd = Number(book.precioUsd);

  return (
    <div style={{ background: "#F5EDD6", minHeight: "100vh" }}>

      {/* ── HERO ── */}
      <section
        className="py-8 md:py-14 px-4 md:px-6"
        style={{ background: "linear-gradient(160deg, #1A3A5C 70%, #0f2440 100%)" }}
      >
        <div className="max-w-5xl mx-auto flex flex-row gap-5 md:gap-10 items-start">

          {/* Portada */}
          <div
            className="flex-shrink-0 rounded-xl md:rounded-2xl overflow-hidden shadow-2xl"
            style={{
              border: "2px solid #B87333",
              width: "clamp(100px, 28vw, 220px)",
              aspectRatio: "2/3",
            }}
          >
            {book.coverUrl ? (
              <Image
                src={book.coverUrl}
                alt={book.nombre}
                width={220}
                height={300}
                className="object-cover w-full h-full"
                priority
              />
            ) : (
              <div className="w-full h-full flex items-center justify-center" style={{ background: "#0f2440" }}>
                <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="#B87333" strokeWidth="1.5">
                  <path d="M2 3h6a4 4 0 0 1 4 4v14a3 3 0 0 0-3-3H2z"/>
                  <path d="M22 3h-6a4 4 0 0 0-4 4v14a3 3 0 0 1 3-3h7z"/>
                </svg>
              </div>
            )}
          </div>

          {/* Info principal */}
          <div className="flex flex-col gap-2 md:gap-4 flex-1 min-w-0 pt-1">
            <p
              className="text-[#B87333] text-[0.55rem] md:text-xs tracking-[0.2em] md:tracking-[0.3em] uppercase"
              style={{ fontFamily: "var(--font-cinzel, serif)" }}
            >
              Fondo Editorial Galeona de Cádiz
            </p>

            <h1
              className="text-xl md:text-5xl font-bold text-white leading-tight"
              style={{ fontFamily: "var(--font-cinzel, serif)" }}
            >
              {book.nombre}
            </h1>

            <p className="text-sm md:text-lg" style={{ color: "#B87333", fontFamily: "var(--font-lora, serif)" }}>
              {book.autor}
            </p>

            {/* Precios */}
            {(precioCop > 0 || precioUsd > 0) && (
              <div className="flex flex-wrap items-baseline gap-2 md:gap-6 mt-1">
                {precioCop > 0 && (
                  <div>
                    <p className="text-[0.5rem] md:text-xs text-white/40 uppercase tracking-widest mb-0.5" style={{ fontFamily: "var(--font-cinzel, serif)" }}>
                      COP
                    </p>
                    <p className="text-lg md:text-2xl font-bold" style={{ color: "#F5EDD6", fontFamily: "var(--font-cinzel, serif)" }}>
                      ${precioCop.toLocaleString("es-CO")}
                    </p>
                  </div>
                )}
                {precioUsd > 0 && (
                  <div>
                    <p className="text-[0.5rem] md:text-xs text-white/40 uppercase tracking-widest mb-0.5" style={{ fontFamily: "var(--font-cinzel, serif)" }}>
                      USD
                    </p>
                    <p className="text-base md:text-2xl font-bold" style={{ color: "#d4c9a8", fontFamily: "var(--font-cinzel, serif)" }}>
                      ${precioUsd.toFixed(2)}
                    </p>
                  </div>
                )}
              </div>
            )}

            {/* Botón comprar */}
            {(precioCop > 0 || precioUsd > 0) && (
              <Link
                href={`/checkout?slug=${slug}`}
                className="inline-flex items-center gap-2 px-5 md:px-8 py-2.5 md:py-3 rounded-full text-xs md:text-sm font-semibold tracking-[0.12em] uppercase transition-opacity hover:opacity-90 mt-1 self-start"
                style={{ background: "linear-gradient(90deg, #E8511A, #B87333)", color: "#F5EDD6", fontFamily: "var(--font-cinzel, serif)" }}
              >
                <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <circle cx="9" cy="21" r="1"/><circle cx="20" cy="21" r="1"/>
                  <path d="M1 1h4l2.68 13.39a2 2 0 0 0 2 1.61h9.72a2 2 0 0 0 2-1.61L23 6H6"/>
                </svg>
                Comprar
              </Link>
            )}
          </div>
        </div>
      </section>

      {/* ── CUERPO ── */}
      <section className="max-w-5xl mx-auto px-4 md:px-6 py-8 md:py-14 flex flex-col gap-8 md:gap-14">

        {/* Descripción */}
        {book.descripcion && (
          <div className="flex flex-col gap-3">
            <h2
              className="text-xs tracking-[0.3em] uppercase"
              style={{ color: "#B87333", fontFamily: "var(--font-cinzel, serif)" }}
            >
              Sobre el libro
            </h2>
            <p
              className="text-base leading-relaxed whitespace-pre-line"
              style={{ color: "#1A3A5C", fontFamily: "var(--font-lora, serif)" }}
            >
              {book.descripcion}
            </p>
          </div>
        )}

        {/* Imagen del autor */}
        {book.authorImageUrl && (
          <div className="flex flex-col md:flex-row gap-8 items-center md:items-start">
            <div
              className="flex-shrink-0 rounded-2xl overflow-hidden shadow-lg"
              style={{ border: "2px solid #B87333", width: 180, height: 220 }}
            >
              <Image
                src={book.authorImageUrl}
                alt={book.autor}
                width={180}
                height={220}
                className="object-cover w-full h-full"
                loading="eager"
              />
            </div>
            <div className="flex flex-col gap-2 justify-center">
              <h2
                className="text-xs tracking-[0.3em] uppercase"
                style={{ color: "#B87333", fontFamily: "var(--font-cinzel, serif)" }}
              >
                Sobre la autora
              </h2>
              <p
                className="text-xl font-semibold"
                style={{ color: "#1A3A5C", fontFamily: "var(--font-cinzel, serif)" }}
              >
                {book.autor}
              </p>
              {(book as any).authorBio && (
                <p
                  className="text-sm leading-relaxed mt-1"
                  style={{ color: "#1A3A5C", fontFamily: "var(--font-lora, serif)" }}
                >
                  {(book as any).authorBio}
                </p>
              )}
            </div>
          </div>
        )}

        {/* Leer libro */}
        {book.pdfUrl && (
          <div className="flex flex-col gap-4 items-center">
            <h2
              className="text-xs tracking-[0.3em] uppercase"
              style={{ color: "#B87333", fontFamily: "var(--font-cinzel, serif)" }}
            >
              Vista previa
            </h2>
            <Link
              href={`/tienda/${slug}/preview`}
              className="inline-flex items-center gap-3 mx-auto px-8 py-4 rounded-full font-semibold tracking-widest uppercase text-sm transition-opacity hover:opacity-90"
              style={{
                background: "#1A3A5C",
                color: "#F5EDD6",
                fontFamily: "var(--font-cinzel, serif)",
                letterSpacing: "0.15em",
              }}
            >
              <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <path d="M2 3h6a4 4 0 0 1 4 4v14a3 3 0 0 0-3-3H2z"/>
                <path d="M22 3h-6a4 4 0 0 0-4 4v14a3 3 0 0 1 3-3h7z"/>
              </svg>
              Leer libro
            </Link>
          </div>
        )}

      </section>


    </div>
  );
}
