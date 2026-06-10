import { NextRequest, NextResponse } from "next/server";
import { auth } from "@/auth";
import { prisma } from "@/lib/prisma";

async function requireAdmin() {
  const session = await auth();
  if (!session) return false;
  return true;
}

export async function GET() {
  if (!await requireAdmin()) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });

  const books = await prisma.book.findMany({ orderBy: { createdAt: "desc" } });
  return NextResponse.json({ books });
}

export async function POST(req: NextRequest) {
  if (!await requireAdmin()) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });

  const body = await req.json();
  const { slug, nombre, autor, descripcion, precioCop, precioUsd, coverUrl, authorImageUrl, authorBio, pdfUrl, activo, tipo } = body;

  if (!slug || !nombre || !autor || !descripcion) {
    return NextResponse.json({ error: "Campos requeridos faltantes" }, { status: 400 });
  }

  try {
    const book = await prisma.book.create({
      data: {
        slug,
        nombre,
        autor,
        descripcion,
        precioCop: parseFloat(precioCop) || 0,
        precioUsd: parseFloat(precioUsd) || 0,
        coverUrl: coverUrl || "",
        authorImageUrl: authorImageUrl || "",
        authorBio: authorBio || "",
        pdfUrl: pdfUrl || "",
        activo: Boolean(activo),
        tipo: tipo || "IMPRESO",
      },
    });
    return NextResponse.json({ book });
  } catch (err: any) {
    if (err.code === "P2002") return NextResponse.json({ error: "El slug ya existe" }, { status: 400 });
    console.error("[admin/libros POST]", err);
    return NextResponse.json({ error: "Error interno" }, { status: 500 });
  }
}

export async function PUT(req: NextRequest) {
  if (!await requireAdmin()) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });

  const body = await req.json();
  const { id, ...data } = body;

  if (!id) return NextResponse.json({ error: "id requerido" }, { status: 400 });

  const updateData: any = {};
  if (data.slug !== undefined) updateData.slug = data.slug;
  if (data.nombre !== undefined) updateData.nombre = data.nombre;
  if (data.autor !== undefined) updateData.autor = data.autor;
  if (data.descripcion !== undefined) updateData.descripcion = data.descripcion;
  if (data.precioCop !== undefined) updateData.precioCop = parseFloat(data.precioCop) || 0;
  if (data.precioUsd !== undefined) updateData.precioUsd = parseFloat(data.precioUsd) || 0;
  if (data.coverUrl !== undefined) updateData.coverUrl = data.coverUrl;
  if (data.authorImageUrl !== undefined) updateData.authorImageUrl = data.authorImageUrl;
  if (data.authorBio !== undefined) updateData.authorBio = data.authorBio;
  if (data.pdfUrl !== undefined) updateData.pdfUrl = data.pdfUrl;
  if (data.activo !== undefined) updateData.activo = Boolean(data.activo);
  if (data.tipo !== undefined) updateData.tipo = data.tipo;

  try {
    const book = await prisma.book.update({ where: { id }, data: updateData });
    return NextResponse.json({ book });
  } catch (err) {
    console.error("[admin/libros PUT]", err);
    return NextResponse.json({ error: "Error interno" }, { status: 500 });
  }
}
