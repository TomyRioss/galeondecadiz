// @ts-ignore
import { prisma } from "@/lib/prisma";
import { redirect } from "next/navigation";

export default async function EbookPage() {
  const starred = await prisma.book.findFirst({
    where: { starred: true, activo: true },
    select: { slug: true, pdfUrl: true },
  });

  if (starred?.pdfUrl && starred.slug) {
    redirect(`/tienda/${starred.slug}/preview`);
  }

  redirect("/tienda");
}
