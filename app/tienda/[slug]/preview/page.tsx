import { notFound } from "next/navigation";
// @ts-ignore
import { prisma } from "@/lib/prisma";
import EbookViewerClient from "@/app/components/tienda/EbookViewerClient";

export const dynamic = "force-dynamic";

interface Props {
  params: Promise<{ slug: string }>;
}

export default async function BookPreviewPage({ params }: Props) {
  const { slug } = await params;

  const book = await prisma.book.findUnique({ where: { slug } });
  if (!book || !book.activo || !book.pdfUrl) notFound();

  return <EbookViewerClient slug={slug} bookNombre={book.nombre} />;
}
