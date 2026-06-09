import { NextRequest, NextResponse } from "next/server";
// @ts-ignore
import { prisma } from "@/lib/prisma";

export async function GET(req: NextRequest) {
  const { searchParams } = new URL(req.url);
  const email = searchParams.get("email");
  const orderId = searchParams.get("orderId");

  if (!email || !orderId) {
    return NextResponse.json({ error: "Parámetros requeridos" }, { status: 400 });
  }

  try {
    const order = await prisma.order.findFirst({
      where: {
        id: orderId,
        buyerEmail: email,
      },
      include: { book: { select: { nombre: true } } },
    });

    if (!order) {
      return NextResponse.json({ error: "Pedido no encontrado" }, { status: 404 });
    }

    return NextResponse.json({
      id: order.id,
      estado: order.estado,
      bookNombre: order.book.nombre,
      moneda: order.moneda,
      monto: Number(order.monto),
      createdAt: order.createdAt,
    });
  } catch (err) {
    console.error("[order-lookup]", err);
    return NextResponse.json({ error: "Error interno del servidor" }, { status: 500 });
  }
}
