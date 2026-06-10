import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";

const VALID_SOURCES = ["book_card", "store", "ebook", "donations", "general"] as const;

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const { full_name, email, phone, message, source } = body;

    if (!full_name || !email || !source || !VALID_SOURCES.includes(source)) {
      return NextResponse.json({ error: "Campos requeridos faltantes o source inválido" }, { status: 400 });
    }

    const record = await (prisma as any).contactRequest.create({
      data: {
        fullName: full_name,
        email,
        phone: phone ?? null,
        message: message ?? null,
        source,
      },
    });

    return NextResponse.json({ ok: true, id: record.id });
  } catch (err) {
    console.error("[contact-requests] error:", err);
    return NextResponse.json({ error: "Error interno" }, { status: 500 });
  }
}
