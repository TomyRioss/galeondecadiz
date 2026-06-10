import { NextRequest, NextResponse } from "next/server";
import { getSupabaseAdmin } from "@/lib/supabase-server";

export async function GET(req: NextRequest) {
  const path = req.nextUrl.searchParams.get("path");
  if (!path) return new NextResponse("path requerido", { status: 400 });

  const supabase = getSupabaseAdmin();
  const { data, error } = await supabase.storage.from("pdfs").download(path);

  if (error || !data) {
    console.error("[pdf-proxy]", error);
    return new NextResponse("PDF no encontrado", { status: 404 });
  }

  const buffer = await data.arrayBuffer();
  return new NextResponse(buffer, {
    headers: {
      "Content-Type": "application/pdf",
      "Cache-Control": "private, max-age=3600",
    },
  });
}
