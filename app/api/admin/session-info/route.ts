import { NextResponse } from "next/server";
import { auth } from "@/auth";
import type { AdminRole } from "@/auth";

export async function GET() {
  const session = await auth();
  if (!session?.user) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  const role = (session.user as { role?: AdminRole }).role;
  return NextResponse.json({ email: session.user.email, role });
}
