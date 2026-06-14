"use client";

import { useEffect, useState } from "react";
import { Users, Plus, Trash2, X, Eye, EyeOff, Shield, ShieldCheck } from "lucide-react";
import type { AdminRole } from "@/auth";

interface AdminUser {
  id: string;
  email: string;
  role: AdminRole;
  active: boolean;
  created_at: string;
}

interface SessionInfo {
  email: string;
  role: AdminRole;
}

export default function UsuariosPage() {
  const [sessionInfo, setSessionInfo] = useState<SessionInfo | null>(null);
  const isSuperAdmin = sessionInfo?.role === "superadmin";

  const [users, setUsers] = useState<AdminUser[]>([]);
  const [loading, setLoading] = useState(true);
  const [showCreate, setShowCreate] = useState(false);
  const [deleting, setDeleting] = useState<string | null>(null);
  const [error, setError] = useState("");

  // Form
  const [formEmail, setFormEmail] = useState("");
  const [formPassword, setFormPassword] = useState("");
  const [formRole, setFormRole] = useState<AdminRole>("admin");
  const [showPass, setShowPass] = useState(false);
  const [creating, setCreating] = useState(false);
  const [formError, setFormError] = useState("");

  function fetchUsers() {
    setLoading(true);
    fetch("/api/admin/usuarios")
      .then((r) => r.json())
      .then((data) => setUsers(data.users || []))
      .catch((err) => console.error("[usuarios]", err))
      .finally(() => setLoading(false));
  }

  useEffect(() => {
    fetch("/api/admin/session-info")
      .then((r) => r.json())
      .then((data) => { if (data.email) setSessionInfo({ email: data.email, role: data.role }); })
      .catch(() => {});
    fetchUsers();
  }, []);

  async function handleCreate(e: React.FormEvent) {
    e.preventDefault();
    setFormError("");
    setCreating(true);
    try {
      const res = await fetch("/api/admin/usuarios", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email: formEmail, password: formPassword, role: formRole }),
      });
      const data = await res.json();
      if (!res.ok) { setFormError(data.error || "Error al crear"); return; }
      setShowCreate(false);
      setFormEmail(""); setFormPassword(""); setFormRole("admin");
      fetchUsers();
    } catch {
      setFormError("Error de conexión");
    } finally {
      setCreating(false);
    }
  }

  async function handleDelete(id: string) {
    setDeleting(id);
    setError("");
    try {
      const res = await fetch("/api/admin/usuarios", {
        method: "DELETE",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ id }),
      });
      const data = await res.json();
      if (!res.ok) { setError(data.error || "Error al eliminar"); return; }
      fetchUsers();
    } catch {
      setError("Error de conexión");
    } finally {
      setDeleting(null);
    }
  }

  const ROLE_COLOR: Record<AdminRole, string> = {
    superadmin: "#E8511A",
    admin: "#1B6CA8",
  };

  return (
    <div className="flex flex-col gap-4 pt-6">
      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-2 px-8">
        <div>
          <h1 className="text-2xl font-bold leading-tight" style={{ color: "#1A3A5C", fontFamily: "var(--font-cinzel, serif)" }}>
            Usuarios
          </h1>
          <p className="text-sm mt-0.5" style={{ color: "#B87333", fontFamily: "var(--font-lora, serif)" }}>
            {loading ? "Cargando…" : `${users.length} administrador${users.length !== 1 ? "es" : ""} registrado${users.length !== 1 ? "s" : ""}`}
          </p>
        </div>
        {isSuperAdmin && (
          <button
            onClick={() => { setShowCreate(true); setFormError(""); }}
            className="px-4 py-2 rounded-full text-sm font-semibold transition-all hover:opacity-90 hover:-translate-y-px flex items-center gap-2"
            style={{ background: "linear-gradient(90deg, #E8511A, #B87333)", color: "#F5EDD6", fontFamily: "var(--font-cinzel, serif)" }}
          >
            <Plus size={13} />
            Nuevo Admin
          </button>
        )}
      </div>

      {/* Error global */}
      {error && (
        <div className="mx-8 px-4 py-2 rounded-xl border text-sm" style={{ borderColor: "#E8511A", background: "rgba(232,81,26,0.08)", color: "#E8511A", fontFamily: "var(--font-lora, serif)" }}>
          {error}
        </div>
      )}

      {/* Tabla */}
      <div className="overflow-hidden" style={{ background: "linear-gradient(135deg, #e8dfc4, #d4c9a8)" }}>
        {loading ? (
          <div className="p-16 flex flex-col items-center gap-4">
            <div className="animate-spin w-10 h-10 rounded-full border-2" style={{ borderColor: "#B87333", borderTopColor: "transparent" }} />
            <p className="text-sm" style={{ color: "#1A3A5C", fontFamily: "var(--font-lora, serif)" }}>Cargando usuarios…</p>
          </div>
        ) : users.length === 0 ? (
          <div className="p-16 flex flex-col items-center gap-6 text-center">
            <div className="w-20 h-20 rounded-full flex items-center justify-center" style={{ background: "linear-gradient(135deg, #1A3A5C, #1F4FA3)" }}>
              <Users size={34} style={{ color: "#B87333" }} />
            </div>
            <p className="text-sm" style={{ color: "#1A3A5C", fontFamily: "var(--font-lora, serif)" }}>Sin administradores registrados.</p>
          </div>
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full text-sm">
              <thead>
                <tr style={{ background: "#1A3A5C" }}>
                  {["Email", "Rol", "Estado", "Creado", ...(isSuperAdmin ? [""] : [])].map((h) => (
                    <th key={h} className="px-5 py-3.5 text-left text-[0.6rem] tracking-[0.2em] uppercase font-semibold" style={{ color: "#B87333", fontFamily: "var(--font-cinzel, serif)" }}>
                      {h}
                    </th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {users.map((u, i) => (
                  <tr key={u.id} className="group" style={{ background: i % 2 === 0 ? "transparent" : "rgba(255,255,255,0.12)" }}>
                    <td className="px-5 py-3.5" style={{ color: "#1A3A5C", fontFamily: "var(--font-lora, serif)" }}>
                      <div className="flex items-center gap-2">
                        {u.email}
                        {u.email === sessionInfo?.email && (
                          <span className="text-[0.55rem] px-1.5 py-0.5 rounded-full uppercase tracking-widest" style={{ background: "rgba(232,81,26,0.1)", color: "#E8511A", fontFamily: "var(--font-cinzel, serif)" }}>
                            Tú
                          </span>
                        )}
                      </div>
                    </td>
                    <td className="px-5 py-3.5">
                      <span
                        className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full text-[0.6rem] tracking-wider uppercase font-semibold"
                        style={{
                          background: ROLE_COLOR[u.role] + "22",
                          color: ROLE_COLOR[u.role],
                          border: `1px solid ${ROLE_COLOR[u.role]}40`,
                          fontFamily: "var(--font-cinzel, serif)",
                        }}
                      >
                        {u.role === "superadmin" ? <ShieldCheck size={10} /> : <Shield size={10} />}
                        {u.role}
                      </span>
                    </td>
                    <td className="px-5 py-3.5">
                      <span
                        className="text-[0.6rem] tracking-wider uppercase font-semibold"
                        style={{ color: u.active ? "#2E6B3E" : "#9CA3AF", fontFamily: "var(--font-cinzel, serif)" }}
                      >
                        {u.active ? "Activo" : "Inactivo"}
                      </span>
                    </td>
                    <td className="px-5 py-3.5" style={{ color: "#1A3A5C", fontFamily: "var(--font-lora, serif)" }}>
                      {new Date(u.created_at).toLocaleDateString("es-CO", { day: "2-digit", month: "short", year: "numeric" })}
                    </td>
                    {isSuperAdmin && (
                      <td className="px-5 py-3.5 text-right">
                        {u.email !== sessionInfo?.email && (
                          <button
                            onClick={() => handleDelete(u.id)}
                            disabled={deleting === u.id}
                            className="w-7 h-7 rounded-full flex items-center justify-center opacity-0 group-hover:opacity-100 transition-all hover:scale-110 disabled:opacity-50"
                            style={{ background: "rgba(232,81,26,0.15)", color: "#E8511A" }}
                            title="Eliminar"
                          >
                            {deleting === u.id
                              ? <div className="w-3 h-3 border border-t-transparent rounded-full animate-spin" style={{ borderColor: "#E8511A", borderTopColor: "transparent" }} />
                              : <Trash2 size={11} />
                            }
                          </button>
                        )}
                      </td>
                    )}
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>

      {/* Modal crear */}
      {showCreate && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center p-4"
          style={{ background: "rgba(26,58,92,0.7)", backdropFilter: "blur(4px)" }}
          onClick={() => setShowCreate(false)}
        >
          <div
            className="rounded-2xl p-6 md:p-8 max-w-md w-full border-2 relative"
            style={{
              background: "linear-gradient(160deg, #ede4cb 0%, #ddd0b0 100%)",
              borderColor: "#B87333",
              boxShadow: "0 24px 64px rgba(26,58,92,0.3)",
            }}
            onClick={(e) => e.stopPropagation()}
          >
            <button
              onClick={() => setShowCreate(false)}
              className="absolute top-4 right-4 w-8 h-8 flex items-center justify-center rounded-full hover:bg-white/30"
              style={{ color: "#B87333" }}
            >
              <X size={16} />
            </button>

            <h2 className="text-lg font-bold mb-5" style={{ color: "#1A3A5C", fontFamily: "var(--font-cinzel, serif)" }}>
              Nuevo Administrador
            </h2>

            <form onSubmit={handleCreate} className="flex flex-col gap-4">
              <div className="flex flex-col gap-1">
                <label className="text-[0.6rem] tracking-[0.2em] uppercase font-semibold" style={{ color: "#B87333", fontFamily: "var(--font-cinzel, serif)" }}>
                  Email
                </label>
                <input
                  type="email"
                  required
                  value={formEmail}
                  onChange={(e) => setFormEmail(e.target.value)}
                  className="rounded-xl px-4 py-2.5 text-sm outline-none focus:border-[#E8511A] transition-colors"
                  style={{ background: "#F5EDD6", border: "1.5px solid #B87333", color: "#1A3A5C", fontFamily: "var(--font-lora, serif)" }}
                />
              </div>

              <div className="flex flex-col gap-1">
                <label className="text-[0.6rem] tracking-[0.2em] uppercase font-semibold" style={{ color: "#B87333", fontFamily: "var(--font-cinzel, serif)" }}>
                  Contraseña
                </label>
                <div className="relative">
                  <input
                    type={showPass ? "text" : "password"}
                    required
                    minLength={8}
                    value={formPassword}
                    onChange={(e) => setFormPassword(e.target.value)}
                    className="w-full rounded-xl px-4 py-2.5 pr-10 text-sm outline-none focus:border-[#E8511A] transition-colors"
                    style={{ background: "#F5EDD6", border: "1.5px solid #B87333", color: "#1A3A5C", fontFamily: "var(--font-lora, serif)" }}
                  />
                  <button
                    type="button"
                    onClick={() => setShowPass(!showPass)}
                    className="absolute right-3 top-1/2 -translate-y-1/2"
                    style={{ color: "#B87333" }}
                  >
                    {showPass ? <EyeOff size={14} /> : <Eye size={14} />}
                  </button>
                </div>
              </div>

              <div className="flex flex-col gap-1">
                <label className="text-[0.6rem] tracking-[0.2em] uppercase font-semibold" style={{ color: "#B87333", fontFamily: "var(--font-cinzel, serif)" }}>
                  Rol
                </label>
                <select
                  value={formRole}
                  onChange={(e) => setFormRole(e.target.value as AdminRole)}
                  className="rounded-xl px-4 py-2.5 text-sm outline-none"
                  style={{ background: "#F5EDD6", border: "1.5px solid #B87333", color: "#1A3A5C", fontFamily: "var(--font-lora, serif)" }}
                >
                  <option value="admin">Admin</option>
                  <option value="superadmin">Superadmin</option>
                </select>
              </div>

              {formError && (
                <p className="text-xs" style={{ color: "#E8511A", fontFamily: "var(--font-lora, serif)" }}>{formError}</p>
              )}

              <div className="flex gap-3 mt-2">
                <button
                  type="button"
                  onClick={() => setShowCreate(false)}
                  className="flex-1 py-2.5 rounded-full text-sm font-semibold tracking-widest uppercase border transition-all hover:opacity-80"
                  style={{ borderColor: "#B87333", color: "#1A3A5C", fontFamily: "var(--font-cinzel, serif)" }}
                >
                  Cancelar
                </button>
                <button
                  type="submit"
                  disabled={creating}
                  className="flex-1 py-2.5 rounded-full text-sm font-semibold tracking-widest uppercase transition-all hover:opacity-90 disabled:opacity-60"
                  style={{ background: "linear-gradient(90deg, #E8511A, #B87333)", color: "#F5EDD6", fontFamily: "var(--font-cinzel, serif)" }}
                >
                  {creating ? "Creando…" : "Crear"}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
