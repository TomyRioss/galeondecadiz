import { notFound } from "next/navigation";
import Link from "next/link";
// @ts-ignore
import { prisma } from "@/lib/prisma";
import BookFlipViewerDynamic from "@/app/components/tienda/BookFlipViewerDynamic";

export const dynamic = "force-dynamic";

interface Props {
  params: Promise<{ slug: string }>;
}

export default async function BookPreviewPage({ params }: Props) {
  const { slug } = await params;

  const book = await prisma.book.findUnique({ where: { slug } });
  if (!book || !book.activo || !book.pdfUrl) notFound();

  return (
    <div
      className="flex flex-col"
      style={{
        minHeight: "100vh",
        background: "#F5EDD6",
      }}
    >
      {/* Barra superior */}
      <div
        className="flex items-center justify-between px-6 py-3 border-b"
        style={{ borderColor: "#B87333", background: "#0a1929" }}
      >
        <div className="flex items-center gap-3">
          <Link
            href={`/tienda/${slug}`}
            className="flex items-center gap-2 text-xs tracking-widest uppercase transition-opacity hover:opacity-70"
            style={{ color: "#B87333", fontFamily: "var(--font-cinzel, serif)" }}
          >
            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <path d="M19 12H5M12 5l-7 7 7 7"/>
            </svg>
            Volver
          </Link>
          <span
            className="text-sm font-semibold hidden md:block"
            style={{ color: "#F5EDD6", fontFamily: "var(--font-cinzel, serif)" }}
          >
            {book.nombre}
          </span>
        </div>
        <span
          className="text-xs tracking-[0.3em] uppercase"
          style={{ color: "#B87333", fontFamily: "var(--font-cinzel, serif)" }}
        >
          Fondo Editorial Galeona de Cádiz
        </span>
      </div>

      {/* Visor */}
      <div className="flex-1 flex items-center justify-center px-2 py-6 md:px-8 md:py-10">
        <div className="w-full max-w-6xl">
          <BookFlipViewerDynamic pdfUrl={book.pdfUrl} />
        </div>
      </div>
    </div>
  );
}
