import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";

export async function POST(req: NextRequest) {
  try {
    const { email, slug } = await req.json();
    if (!email || !slug) {
      return NextResponse.json({ error: "email y slug requeridos" }, { status: 400 });
    }

    const user = await (prisma as any).ebookUser.findUnique({ where: { email } });

    if (user) {
      // V3: update last_access_at
      await (prisma as any).ebookUser.update({
        where: { email },
        data: { lastAccessAt: new Date() },
      });
      return NextResponse.json({ exists: true, viewerUrl: null });
    }

    return NextResponse.json({ exists: false });
  } catch (err) {
    console.error("[ebook/check] error:", err);
    return NextResponse.json({ error: "Error interno" }, { status: 500 });
  }
}
