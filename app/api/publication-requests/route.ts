import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const { full_name, email, phone, city, country, publication, quantity, message, accepted_terms } = body;

    if (!full_name || !email || !phone || !city || !country || !publication || !accepted_terms) {
      return NextResponse.json({ error: "Campos requeridos faltantes" }, { status: 400 });
    }

    const record = await (prisma as any).publicationRequest.create({
      data: {
        fullName: full_name,
        email,
        phone: phone ?? null,
        city: city ?? null,
        country: country ?? null,
        publication,
        quantity: parseInt(quantity) || 1,
        message: message ?? null,
      },
    });

    return NextResponse.json({ ok: true, id: record.id });
  } catch (err) {
    console.error("[publication-requests] error:", err);
    return NextResponse.json({ error: "Error interno" }, { status: 500 });
  }
}
