import { NextRequest, NextResponse } from "next/server";
import { Payment } from "mercadopago";
import { getMercadoPagoConfig } from "@/lib/mercadopago";
// @ts-ignore
import { prisma } from "@/lib/prisma";

export async function POST(req: NextRequest) {
  try {
    const { payment_id } = await req.json();
    if (!payment_id) return NextResponse.json({ error: "payment_id requerido" }, { status: 400 });

    const config = getMercadoPagoConfig();
    const paymentClient = new Payment(config);
    const payment = await paymentClient.get({ id: payment_id });

    if (!payment || payment.status !== "approved") {
      return NextResponse.json({ error: "Pago no aprobado" }, { status: 400 });
    }

    const externalRef = payment.external_reference;
    if (!externalRef?.startsWith("don_")) {
      return NextResponse.json({ error: "Referencia inválida" }, { status: 400 });
    }

    const donationId = externalRef.slice(4);
    await (prisma as any).donation.updateMany({
      where: { id: donationId, status: { not: "paid" } },
      data: { status: "paid" },
    });

    return NextResponse.json({ ok: true });
  } catch (err) {
    console.error("[donations/confirm]", err);
    return NextResponse.json({ error: "Error interno" }, { status: 500 });
  }
}
