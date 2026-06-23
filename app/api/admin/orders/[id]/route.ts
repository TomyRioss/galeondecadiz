import { NextRequest, NextResponse } from "next/server";
// @ts-ignore
import { prisma } from "@/lib/prisma";
import type { OrderStatus } from "@prisma/client";

const VALID_STATUSES = ["PENDING", "PAID", "FAILED", "ENVIADO", "RECIBIDO"] as const;

export async function PATCH(req: NextRequest, { params }: { params: Promise<{ id: string }> }) {
  try {
    const { id } = await params;
    const body = await req.json();
    const { estado } = body as { estado: string };

    if (!VALID_STATUSES.includes(estado as any)) {
      return NextResponse.json({ error: "Estado inválido" }, { status: 400 });
    }

    const updated = await prisma.order.update({
      where: { id },
      data: { estado: estado as OrderStatus },
    });

    return NextResponse.json({ id: updated.id, estado: updated.estado });
  } catch (err) {
    console.error("[admin/orders/patch]", err);
    return NextResponse.json({ error: "Error interno" }, { status: 500 });
  }
}
