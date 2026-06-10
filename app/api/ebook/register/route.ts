import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const { full_name, email, phone, city, country, accepted_terms, slug } = body;

    if (!full_name || !email || !accepted_terms) {
      return NextResponse.json({ error: "Campos requeridos faltantes" }, { status: 400 });
    }

    // V3: upsert — si email existe, actualizar last_access_at; si no, crear
    const user = await (prisma as any).ebookUser.upsert({
      where: { email },
      update: { lastAccessAt: new Date() },
      create: {
        fullName: full_name,
        email,
        phone: phone ?? null,
        city: city ?? null,
        country: country ?? null,
        acceptedTerms: Boolean(accepted_terms),
        lastAccessAt: new Date(),
      },
    });

    // Log acceso
    await (prisma as any).ebookAccessLog.create({
      data: {
        userId: user.id,
        source: "ficha",
      },
    });

    // V4: viewerUrl comes from signed Supabase Storage URL — pending PDF delivery from client
    return NextResponse.json({ ok: true, viewerUrl: null });
  } catch (err) {
    console.error("[ebook/register] error:", err);
    return NextResponse.json({ error: "Error interno" }, { status: 500 });
  }
}
