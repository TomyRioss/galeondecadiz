import { NextRequest, NextResponse } from "next/server";
// @ts-ignore
import { prisma } from "@/lib/prisma";

export async function GET(req: NextRequest) {
  const { searchParams } = new URL(req.url);
  const limit = parseInt(searchParams.get("limit") ?? "20");
  const offset = parseInt(searchParams.get("offset") ?? "0");

  try {
    const [records, total] = await Promise.all([
      prisma.ebookUser.findMany({
        orderBy: { createdAt: "desc" },
        take: limit,
        skip: offset,
        include: { _count: { select: { accessLogs: true } } },
      }),
      prisma.ebookUser.count(),
    ]);

    return NextResponse.json({
      records: records.map((u: any) => ({
        id: u.id,
        fullName: u.fullName,
        email: u.email,
        phone: u.phone,
        city: u.city,
        country: u.country,
        createdAt: u.createdAt,
        lastAccessAt: u.lastAccessAt,
        totalAccesos: u._count.accessLogs,
      })),
      total,
    });
  } catch (err) {
    console.error("[admin/ebook/users]", err);
    return NextResponse.json({ error: "Error interno" }, { status: 500 });
  }
}
