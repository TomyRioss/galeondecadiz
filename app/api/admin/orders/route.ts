import { NextRequest, NextResponse } from "next/server";
// @ts-ignore
import { prisma } from "@/lib/prisma";

export async function GET(req: NextRequest) {
  const { searchParams } = new URL(req.url);
  const limit = parseInt(searchParams.get("limit") ?? "20");
  const offset = parseInt(searchParams.get("offset") ?? "0");

  try {
    const [records, total] = await Promise.all([
      prisma.order.findMany({
        orderBy: { createdAt: "desc" },
        take: limit,
        skip: offset,
        include: { book: { select: { nombre: true, slug: true } } },
      }),
      prisma.order.count(),
    ]);

    return NextResponse.json({
      records: records.map((o: any) => ({
        id: o.id,
        buyerName: o.buyerName,
        buyerEmail: o.buyerEmail,
        bookNombre: o.book?.nombre ?? "—",
        monto: Number(o.monto),
        moneda: o.moneda,
        estado: o.estado,
        emailEnviado: o.emailEnviado,
        createdAt: o.createdAt,
      })),
      total,
    });
  } catch (err) {
    console.error("[admin/orders]", err);
    return NextResponse.json({ error: "Error interno" }, { status: 500 });
  }
}
