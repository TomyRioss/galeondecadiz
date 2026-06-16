import { NextRequest, NextResponse } from "next/server";
// @ts-ignore
import { prisma } from "@/lib/prisma";

export async function GET(req: NextRequest) {
  const { searchParams } = new URL(req.url);
  const limit = parseInt(searchParams.get("limit") ?? "30");
  const offset = parseInt(searchParams.get("offset") ?? "0");

  try {
    const [records, total] = await Promise.all([
      prisma.ebookAccessLog.findMany({
        orderBy: { accessDate: "desc" },
        take: limit,
        skip: offset,
        include: { user: { select: { fullName: true, email: true } } },
      }),
      prisma.ebookAccessLog.count(),
    ]);

    return NextResponse.json({
      records: records.map((l: any) => ({
        id: l.id,
        fullName: l.user?.fullName ?? "—",
        email: l.user?.email ?? "—",
        accessDate: l.accessDate,
        source: l.source,
      })),
      total,
    });
  } catch (err) {
    console.error("[admin/ebook/logs]", err);
    return NextResponse.json({ error: "Error interno" }, { status: 500 });
  }
}
