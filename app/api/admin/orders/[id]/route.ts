import { NextRequest, NextResponse } from "next/server";
// @ts-ignore
import { prisma } from "@/lib/prisma";

const VALID_STATUSES = ["PENDING", "PAID", "FAILED", "ENVIADO", "RECIBIDO"] as const;

export async function PATCH(req: NextRequest, { params }: { params: { id: string } }) {
  try {
    const body = await req.json();
    const { estado } = body as { estado: string };

    if (!VALID_STATUSES.includes(estado as any)) {
      return NextResponse.json({ error: "Estado inválido" }, { status: 400 });
    }

    const updated = await prisma.order.update({
      where: { id: params.id },
      data: { estado },
    });

    return NextResponse.json({ id: updated.id, estado: updated.estado });
  } catch (err) {
    console.error("[admin/orders/patch]", err);
    return NextResponse.json({ error: "Error interno" }, { status: 500 });
  }
}
