// @ts-ignore
import { prisma } from "@/lib/prisma";
import BookGrid from "@/app/components/tienda/BookGrid";
import { FaWhatsapp } from "react-icons/fa6";

export const revalidate = 60;

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
