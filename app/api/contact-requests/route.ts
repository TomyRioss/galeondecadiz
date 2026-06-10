import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";

const VALID_SOURCES = ["book_card", "store", "ebook", "donations", "general", "contacto", "testimonios"] as const;

export async function GET(req: NextRequest) {
  try {
    const { searchParams } = new URL(req.url);
    const source = searchParams.get("source");
    const limit = Math.min(parseInt(searchParams.get("limit") || "100", 10), 500);
    const offset = Math.max(parseInt(searchParams.get("offset") || "0", 10), 0);

    const where: any = {};
    if (source && VALID_SOURCES.includes(source as any)) {
      where.source = source;
    }

    const [records, total] = await Promise.all([
      (prisma as any).contactRequest.findMany({
        where,
        orderBy: { createdAt: "desc" },
        take: limit,
        skip: offset,
      }),
      (prisma as any).contactRequest.count({ where }),
    ]);

    return NextResponse.json({ records, total });
  } catch (err) {
    console.error("[contact-requests GET] error:", err);
    return NextResponse.json({ error: "Error interno" }, { status: 500 });
  }
}

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
