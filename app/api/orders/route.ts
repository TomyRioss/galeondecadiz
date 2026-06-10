import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const { full_name, email, phone, city, country, address, quantity, observations, accepted_terms, product_slug } = body;

    if (!full_name || !email || !phone || !city || !country || !accepted_terms) {
      return NextResponse.json({ error: "Campos requeridos faltantes" }, { status: 400 });
    }

    const order = await (prisma as any).galeonaOrder.create({
      data: {
        fullName: full_name,
        email,
        phone,
        city,
        country,
        address: address ?? null,
        quantity: parseInt(quantity) || 1,
        observations: observations ?? null,
        acceptedTerms: Boolean(accepted_terms),
        status: "pending",
        paymentStatus: "pending",
      },
    });

    return NextResponse.json({ ok: true, id: order.id });
  } catch (err) {
    console.error("[orders] error:", err);
    return NextResponse.json({ error: "Error interno" }, { status: 500 });
  }
}
