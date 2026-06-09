// @ts-ignore
import { prisma } from "@/lib/prisma";
import BookGrid from "@/app/components/tienda/BookGrid";

export const dynamic = "force-dynamic";

export default async function TiendaPage() {
  const books = await prisma.book.findMany({
    where: { activo: true },
    orderBy: { createdAt: "desc" },
  });

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

      <section className="max-w-6xl mx-auto px-6 py-12">
        <BookGrid books={booksForGrid} />
      </section>
    </div>
  );
}
