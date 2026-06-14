import { NextRequest, NextResponse } from "next/server";
// @ts-ignore
import { prisma } from "@/lib/prisma";

export async function GET(req: NextRequest) {
  const { searchParams } = new URL(req.url);
  const limit = parseInt(searchParams.get("limit") ?? "20");
  const offset = parseInt(searchParams.get("offset") ?? "0");

  try {
    const [records, total] = await Promise.all([
      (prisma as any).donation.findMany({
        where: { status: "paid" },
        orderBy: { createdAt: "desc" },
        take: limit,
        skip: offset,
      }),
      (prisma as any).donation.count({ where: { status: "paid" } }),
    ]);

    return NextResponse.json({ records, total });
  } catch (err) {
    console.error("[admin/donations]", err);
    return NextResponse.json({ error: "Error interno" }, { status: 500 });
  }
}
