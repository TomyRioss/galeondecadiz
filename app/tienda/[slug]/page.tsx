import { notFound } from "next/navigation";
import Image from "next/image";
// @ts-ignore
import { prisma } from "@/lib/prisma";
import CheckoutForm from "@/app/components/tienda/CheckoutForm";

export const dynamic = "force-dynamic";

interface Props {
  params: Promise<{ slug: string }>;
}

export default async function BookDetailPage({ params }: Props) {
  const { slug } = await params;

  const book = await prisma.book.findUnique({
    where: { slug },
  });

  if (!book || !book.activo) notFound();

  return (
    <div style={{ background: "#F5EDD6", minHeight: "100vh" }}>
      <section className="py-12 px-6" style={{ background: "#1A3A5C" }}>
        <div className="max-w-5xl mx-auto flex flex-col md:flex-row gap-10 items-start">
          <div className="relative w-full md:w-64 h-80 flex-shrink-0 rounded-xl overflow-hidden shadow-xl">
            <Image
              src={book.coverUrl}
              alt={`Portada de ${book.nombre}`}
              fill
              className="object-cover"
            />
          </div>
          <div className="flex flex-col gap-3">
            <h1
              className="text-3xl md:text-4xl font-bold text-white"
              style={{ fontFamily: "var(--font-cinzel, serif)" }}
            >
              {book.nombre}
            </h1>
            <p style={{ color: "#d4c9a8" }}>{book.autor}</p>
            <p
              className="text-base leading-relaxed mt-2"
              style={{ color: "#e8dfc4", fontFamily: "var(--font-lora, serif)" }}
            >
              {book.descripcion}
            </p>
            <div className="mt-4 flex gap-6">
              <div>
                <p className="text-xs" style={{ color: "#d4c9a8" }}>Precio COP</p>
                <p className="text-2xl font-bold" style={{ color: "#B87333" }}>
                  ${Number(book.precioCop).toLocaleString("es-CO")}
                </p>
              </div>
              <div>
                <p className="text-xs" style={{ color: "#d4c9a8" }}>Precio USD</p>
                <p className="text-2xl font-bold" style={{ color: "#B87333" }}>
                  ${Number(book.precioUsd).toFixed(2)}
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="max-w-md mx-auto px-6 py-12">
        <h2
          className="text-xl font-semibold mb-6"
          style={{ fontFamily: "var(--font-cinzel, serif)", color: "#1A3A5C" }}
        >
          Completar compra
        </h2>
        <CheckoutForm
          bookSlug={book.slug}
          precioCop={Number(book.precioCop)}
          precioUsd={Number(book.precioUsd)}
        />
      </section>
    </div>
  );
}
