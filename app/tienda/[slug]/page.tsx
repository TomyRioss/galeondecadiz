import { notFound } from "next/navigation";
// @ts-ignore
import { prisma } from "@/lib/prisma";
import FichaBibliografica from "@/app/components/tienda/FichaBibliografica";

export const dynamic = "force-dynamic";

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
      <FichaBibliografica book={book} slug={slug} precioCop={precioCop} precioUsd={precioUsd} />
    </div>
  );
}
