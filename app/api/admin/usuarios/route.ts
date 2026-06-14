import { NextRequest, NextResponse } from "next/server";
import { auth } from "@/auth";
import { getSupabaseAdmin } from "@/lib/supabase-server";
import { hash } from "bcryptjs";
import type { AdminRole } from "@/auth";

async function requireSuperAdmin() {
  const session = await auth();
  if (!session) return null;
  const role = (session.user as { role?: AdminRole }).role;
  return role === "superadmin" ? session : null;
}

async function requireAdmin() {
  const session = await auth();
  if (!session) return null;
  return session;
}

export async function GET() {
  const session = await requireAdmin();
  if (!session) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });

  const supabase = getSupabaseAdmin();
  const { data, error } = await supabase
    .from("admin_users")
    .select("id, email, role, active, created_at")
    .order("created_at", { ascending: true });

  if (error) {
    console.error("[admin/usuarios GET]", error);
    return NextResponse.json({ error: "Error interno" }, { status: 500 });
  }

  return NextResponse.json({ users: data });
}

export async function POST(req: NextRequest) {
  const session = await requireSuperAdmin();
  if (!session) return NextResponse.json({ error: "Forbidden" }, { status: 403 });

  const { email, password, role } = await req.json();
  if (!email || !password) return NextResponse.json({ error: "email y password requeridos" }, { status: 400 });
  if (role && !["admin", "superadmin"].includes(role)) return NextResponse.json({ error: "Rol inválido" }, { status: 400 });

  const password_hash = await hash(password, 12);
  const supabase = getSupabaseAdmin();

  const { data, error } = await supabase
    .from("admin_users")
    .insert({ email, password_hash, role: role || "admin", active: true })
    .select("id, email, role, active, created_at")
    .single();

  if (error) {
    console.error("[admin/usuarios POST]", error);
    if (error.code === "23505") return NextResponse.json({ error: "El email ya existe" }, { status: 400 });
    return NextResponse.json({ error: "Error interno" }, { status: 500 });
  }

  return NextResponse.json({ user: data });
}

export async function DELETE(req: NextRequest) {
  const session = await requireSuperAdmin();
  if (!session) return NextResponse.json({ error: "Forbidden" }, { status: 403 });

  const { id } = await req.json();
  if (!id) return NextResponse.json({ error: "id requerido" }, { status: 400 });

  const currentEmail = session.user?.email;
  const supabase = getSupabaseAdmin();

  const { data: target } = await supabase
    .from("admin_users")
    .select("email")
    .eq("id", id)
    .single();

  if (target?.email === currentEmail) {
    return NextResponse.json({ error: "No podés eliminarte a vos mismo" }, { status: 400 });
  }

  const { error } = await supabase.from("admin_users").delete().eq("id", id);

  if (error) {
    console.error("[admin/usuarios DELETE]", error);
    return NextResponse.json({ error: "Error interno" }, { status: 500 });
  }

  return NextResponse.json({ ok: true });
}
