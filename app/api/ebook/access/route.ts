import { NextRequest, NextResponse } from "next/server";
// @ts-ignore
import { prisma } from "@/lib/prisma";

export async function POST(req: NextRequest) {
  try {
    const { userId, bookSlug, source } = await req.json();

    if (!userId || !bookSlug) {
      return NextResponse.json({ error: "Faltan parámetros" }, { status: 400 });
    }

    const [user, book] = await Promise.all([
      prisma.ebookUser.findUnique({ where: { id: userId } }),
      prisma.book.findUnique({ where: { slug: bookSlug } }),
    ]);

    if (!user) return NextResponse.json({ error: "Usuario no encontrado" }, { status: 404 });
    if (!book || !book.activo || !book.pdfUrl) return NextResponse.json({ error: "Libro no disponible" }, { status: 404 });

    await Promise.all([
      prisma.ebookAccessLog.create({
        data: {
          userId,
          bookId: null, // Book model ≠ BookEditorial; no FK available
          accessDate: new Date(),
          source: source ?? "web",
        },
      }),
      prisma.ebookUser.update({
        where: { id: userId },
        data: { lastAccessAt: new Date() },
      }),
    ]);

    return NextResponse.json({ pdfUrl: book.pdfUrl });
  } catch (err) {
    console.error("[ebook/access]", err);
    return NextResponse.json({ error: "Error interno" }, { status: 500 });
  }
}
