import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";

export async function GET(_req: NextRequest, { params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const book = await prisma.book.findUnique({
    where: { slug },
    select: { slug: true, nombre: true, coverUrl: true, activo: true, precioCop: true, precioUsd: true },
  });
  if (!book) return NextResponse.json({ error: "Not found" }, { status: 404 });
  return NextResponse.json({ book });
}
