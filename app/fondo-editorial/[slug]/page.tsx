import { notFound } from "next/navigation";
import Image from "next/image";
import Link from "next/link";
import { FaWhatsapp, FaHeart, FaBookOpen } from "react-icons/fa6";
import { prisma } from "@/lib/prisma";
import BookFlipViewer from "./BookFlipViewer";

const WA_NUMBER = "";
const WA_MSG = (title: string) =>
  encodeURIComponent(`Cordial saludo, estoy interesado en el libro "${title}".`);

interface Props {
  params: Promise<{ slug: string }>;
}

export default async function BookPage({ params }: Props) {
  const { slug } = await params;

  const book = await prisma.book.findUnique({ where: { slug } });
  if (!book) notFound();

  const precioCop = Number(book.precioCop);
  const precioUsd = Number(book.precioUsd);

  return (
    <div style={{ background: "#F5EDD6", minHeight: "100vh" }}>

      {/* ── HERO ── */}
      <section
        className="py-14 px-6"
        style={{ background: "linear-gradient(160deg, #1A3A5C 70%, #0f2440 100%)" }}
      >
        <div className="max-w-5xl mx-auto flex flex-col md:flex-row gap-10 items-center md:items-start">

          {/* Portada */}
          <div
            className="flex-shrink-0 rounded-2xl overflow-hidden shadow-2xl"
            style={{ border: "3px solid #B87333", width: 220, height: 300 }}
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
                <span className="text-xs text-white/40" style={{ fontFamily: "var(--font-cinzel, serif)" }}>
                  Sin portada
                </span>
              </div>
            )}
          </div>

          {/* Info principal */}
          <div className="flex flex-col gap-4 flex-1">
            <p
              className="text-[#B87333] text-xs tracking-[0.3em] uppercase"
              style={{ fontFamily: "var(--font-cinzel, serif)" }}
            >
              Fondo Editorial Galeona de Cádiz
            </p>

            <h1
              className="text-3xl md:text-5xl font-bold text-white leading-tight"
              style={{ fontFamily: "var(--font-cinzel, serif)" }}
            >
              {book.nombre}
            </h1>

            <p
              className="text-lg"
              style={{ color: "#B87333", fontFamily: "var(--font-lora, serif)" }}
            >
              {book.autor}
            </p>

            {/* Precios */}
            <div className="flex gap-6 mt-2">
              {precioCop > 0 && (
                <div>
                  <p className="text-xs text-white/40 uppercase tracking-widest mb-0.5" style={{ fontFamily: "var(--font-cinzel, serif)" }}>
                    Precio COP
                  </p>
                  <p className="text-2xl font-bold" style={{ color: "#F5EDD6", fontFamily: "var(--font-cinzel, serif)" }}>
                    ${precioCop.toLocaleString("es-CO")}
                  </p>
                </div>
              )}
              {precioUsd > 0 && (
                <div>
                  <p className="text-xs text-white/40 uppercase tracking-widest mb-0.5" style={{ fontFamily: "var(--font-cinzel, serif)" }}>
                    Precio USD
                  </p>
                  <p className="text-2xl font-bold" style={{ color: "#F5EDD6", fontFamily: "var(--font-cinzel, serif)" }}>
                    ${precioUsd.toFixed(2)}
                  </p>
                </div>
              )}
            </div>

            {/* Acciones */}
            <div className="flex flex-wrap gap-3 mt-2">
              {book.pdfUrl && (
                <Link
                  href={`/ebook/${book.slug}`}
                  className="flex items-center gap-2 px-5 py-2.5 rounded-full text-sm font-semibold tracking-wide transition-opacity hover:opacity-85"
                  style={{ background: "linear-gradient(90deg,#E8511A,#B87333)", color: "#fff", fontFamily: "var(--font-cinzel, serif)" }}
                >
                  <FaBookOpen size={14} />
                  Leer e-book
                </Link>
              )}
              <Link
                href="/donaciones"
                className="flex items-center gap-2 px-5 py-2.5 rounded-full text-sm font-semibold tracking-wide transition-opacity hover:opacity-85"
                style={{ background: "#1B6CA8", color: "#fff", fontFamily: "var(--font-cinzel, serif)" }}
              >
                <FaHeart size={14} />
                Ser donante
              </Link>
              <a
                href={`https://wa.me/${WA_NUMBER}?text=${WA_MSG(book.nombre)}`}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-2 px-5 py-2.5 rounded-full text-sm font-semibold tracking-wide transition-opacity hover:opacity-85"
                style={{ background: "#2E6B3E", color: "#fff", fontFamily: "var(--font-cinzel, serif)" }}
              >
                <FaWhatsapp size={14} />
                WhatsApp
              </a>
            </div>
          </div>
        </div>
      </section>

      {/* ── CUERPO ── */}
      <section className="max-w-5xl mx-auto px-6 py-14 flex flex-col gap-14">

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
            </div>
          </div>
        )}

        {/* Previsualización */}
        {book.pdfUrl && (
          <div className="flex flex-col gap-4">
            <h2
              className="text-xs tracking-[0.3em] uppercase"
              style={{ color: "#B87333", fontFamily: "var(--font-cinzel, serif)" }}
            >
              Previsualización del libro
            </h2>
            <div
              className="rounded-2xl p-6 overflow-hidden"
              style={{ background: "linear-gradient(135deg,#e8dfc4,#d4c9a8)", border: "2px solid #B87333" }}
            >
              <BookFlipViewer pdfUrl={book.pdfUrl} />
            </div>
          </div>
        )}

      </section>

      {/* Volver */}
      <div className="max-w-5xl mx-auto px-6 pb-12">
        <Link
          href="/fondo-editorial"
          className="text-xs tracking-widest uppercase transition-colors hover:opacity-70"
          style={{ color: "#B87333", fontFamily: "var(--font-cinzel, serif)" }}
        >
          ← Volver al Fondo Editorial
        </Link>
      </div>

    </div>
  );
}
