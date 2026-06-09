import { NextRequest, NextResponse } from "next/server";
// @ts-ignore
import { prisma } from "@/lib/prisma";
import { createPreference } from "@/lib/mercadopago";

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const { bookSlug, buyerName, buyerEmail, moneda } = body as {
      bookSlug: string;
      buyerName: string;
      buyerEmail: string;
      moneda: "COP" | "USD";
    };

    if (!bookSlug || !buyerName || !buyerEmail || !moneda) {
      return NextResponse.json({ error: "Campos requeridos faltantes" }, { status: 400 });
    }

    const book = await prisma.book.findUnique({ where: { slug: bookSlug } });
    if (!book || !book.activo) {
      return NextResponse.json({ error: "Libro no encontrado" }, { status: 404 });
    }

    const monto = moneda === "COP"
      ? Number(book.precioCop)
      : Number(book.precioUsd);

    const order = await prisma.order.create({
      data: {
        bookId: book.id,
        buyerName,
        buyerEmail,
        monto,
        moneda,
        estado: "PENDING",
      },
    });

    const preference = await createPreference({
      bookNombre: book.nombre,
      bookSlug: book.slug,
      monto,
      moneda,
      buyerEmail,
      orderId: order.id,
    });

    await prisma.order.update({
      where: { id: order.id },
      data: { mpPreferenceId: preference.id ?? null },
    });

    return NextResponse.json({
      orderId: order.id,
      initPoint: preference.init_point,
      sandboxInitPoint: preference.sandbox_init_point,
    });
  } catch (err) {
    console.error("Checkout error:", err);
    return NextResponse.json({ error: "Error interno del servidor" }, { status: 500 });
  }
}
