"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import Image from "next/image";
import { BookOpen, Plus, Star, Eye, EyeOff, Pencil, ShoppingCart, Trash2 } from "lucide-react";

interface Book {
  id: string;
  slug: string;
  nombre: string;
  autor: string;
  descripcion: string;
  precioCop: number;
  precioUsd: number;
  coverUrl: string;
  authorImageUrl: string;
  authorBio: string;
  pdfUrl: string;
  stock: number;
  activo: boolean;
  starred: boolean;
  tipo: string;
  disponibleCompra: boolean;
}

export default function LibrosPage() {
  const router = useRouter();
  const [books, setBooks] = useState<Book[]>([]);
  const [loading, setLoading] = useState(true);
  const [msg, setMsg] = useState<{ type: "ok" | "err"; text: string } | null>(null);

  async function load() {
    setLoading(true);
    try {
      const res = await fetch("/api/admin/libros");
      const data = await res.json();
      setBooks(data.books ?? []);
    } catch {
      setMsg({ type: "err", text: "Error al cargar libros." });
    } finally {
      setLoading(false);
    }
  }

  useEffect(() => { load(); }, []);

  async function deleteBook(b: Book) {
    if (!confirm(`¿Eliminar "${b.nombre}"? Esta acción no se puede deshacer.`)) return;
    try {
      const res = await fetch(`/api/admin/libros?id=${b.id}`, { method: "DELETE" });
      if (!res.ok) throw new Error((await res.json()).error ?? "Error");
      setMsg({ type: "ok", text: "Libro eliminado." });
      load();
    } catch (err: unknown) {
      const message = err instanceof Error ? err.message : "Error desconocido";
      console.error("[deleteBook]", err);
      setMsg({ type: "err", text: message });
    }
  }

  async function toggleStarred(b: Book) {
    await fetch("/api/admin/libros", {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ id: b.id, starred: !b.starred }),
    });
    load();
  }

  async function toggleActivo(b: Book) {
    await fetch("/api/admin/libros", {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ id: b.id, activo: !b.activo }),
    });
    load();
  }

  return (
    <div className="flex flex-col gap-4 pt-6">
      {/* Header */}
      <div className="flex items-start justify-between px-8">
        <div className="flex items-start">
          <div>
            <h1 className="text-2xl font-bold leading-tight" style={{ color: "#1A3A5C", fontFamily: "var(--font-cinzel, serif)" }}>
              Libros
            </h1>
            <p className="text-sm mt-0.5" style={{ color: "#B87333", fontFamily: "var(--font-lora, serif)" }}>
              {books.length > 0 ? `${books.length} libro${books.length !== 1 ? "s" : ""} cargado${books.length !== 1 ? "s" : ""}` : "Catálogo editorial"}
            </p>
          </div>
        </div>
        <button
          onClick={() => router.push("/admin/libros/new")}
          className="flex items-center gap-2 px-5 py-2.5 rounded-full text-sm font-semibold transition-all hover:opacity-90 hover:-translate-y-px"
          style={{ background: "linear-gradient(90deg, #E8511A, #B87333)", color: "#F5EDD6", fontFamily: "var(--font-cinzel, serif)" }}
        >
          <Plus size={14} />
          Agregar libro
        </button>
      </div>

      {/* Mensaje */}
      {msg && (
        <div
          className="px-4 py-3 rounded-xl text-sm border flex items-center gap-3"
          style={{
            background: msg.type === "ok" ? "#2E6B3E15" : "#C0392B15",
            color: msg.type === "ok" ? "#2E6B3E" : "#C0392B",
            borderColor: msg.type === "ok" ? "#2E6B3E40" : "#C0392B40",
            fontFamily: "var(--font-lora, serif)",
          }}
        >
          <span>{msg.type === "ok" ? "✓" : "✕"}</span>
          {msg.text}
        </div>
      )}

      {/* Lista */}
      {loading ? (
        <div className="flex items-center gap-3 py-8">
          <div className="animate-spin w-6 h-6 rounded-full border-2 border-t-transparent" style={{ borderColor: "#B87333", borderTopColor: "transparent" }} />
          <span className="text-sm" style={{ color: "#B87333", fontFamily: "var(--font-lora, serif)" }}>Cargando libros…</span>
        </div>
      ) : books.length === 0 ? (
        <div
          className="p-16 flex flex-col items-center gap-4"
          style={{ background: "linear-gradient(135deg, #e8dfc4, #d4c9a8)" }}
        >
          <div className="w-16 h-16 rounded-full flex items-center justify-center" style={{ background: "linear-gradient(135deg, #1A3A5C, #1F4FA3)" }}>
            <BookOpen size={28} style={{ color: "#B87333" }} />
          </div>
          <p className="text-sm text-center" style={{ color: "#1A3A5C", fontFamily: "var(--font-lora, serif)" }}>
            No hay libros cargados aún. Hacé clic en &ldquo;Agregar libro&rdquo; para comenzar.
          </p>
        </div>
      ) : (
        <div className="flex flex-col gap-0">
          {books.map((b) => (
            <div
              key={b.id}
              className="flex items-center gap-4 p-4 transition-all group border-b"
              style={{
                background: "linear-gradient(135deg, #e8dfc4, #d4c9a8)",
                borderColor: "rgba(184,115,51,0.2)",
              }}
            >
              {/* Cover */}
              <div className="w-14 h-20 rounded-lg overflow-hidden flex-shrink-0" style={{ border: "1.5px solid #B87333" }}>
                {b.coverUrl ? (
                  <Image src={b.coverUrl} alt={b.nombre} width={56} height={80} className="object-cover w-full h-full" />
                ) : (
                  <div className="w-full h-full flex items-center justify-center" style={{ background: "#1A3A5C" }}>
                    <BookOpen size={18} style={{ color: "#B87333" }} />
                  </div>
                )}
              </div>

              {/* Info */}
              <div className="flex-1 min-w-0">
                <div className="flex items-center gap-2 mb-0.5">
                  <p className="text-sm font-bold truncate" style={{ color: "#1A3A5C", fontFamily: "var(--font-cinzel, serif)" }}>
                    {b.nombre}
                  </p>
                  {b.starred && <Star size={12} fill="#C9A447" style={{ color: "#C9A447", flexShrink: 0 }} />}
                </div>
                <p className="text-xs" style={{ color: "#B87333", fontFamily: "var(--font-lora, serif)" }}>
                  {b.autor}
                </p>
                <div className="flex items-center gap-3 mt-1.5">
                  <span className="text-xs font-semibold" style={{ color: "#1A3A5C" }}>
                    ${Number(b.precioCop).toLocaleString("es-CO")} COP
                  </span>
                  <span
                    className="text-[0.55rem] px-2 py-0.5 rounded-full font-semibold tracking-wider uppercase"
                    style={{
                      background: b.activo ? "#2E6B3E18" : "#C0392B18",
                      color: b.activo ? "#2E6B3E" : "#C0392B",
                      border: `1px solid ${b.activo ? "#2E6B3E40" : "#C0392B40"}`,
                      fontFamily: "var(--font-cinzel, serif)",
                    }}
                  >
                    {b.activo ? "Activo" : "Inactivo"}
                  </span>
                  <span
                    className="text-[0.55rem] px-2 py-0.5 rounded-full font-semibold tracking-wider uppercase"
                    style={{
                      background: "#1A3A5C18",
                      color: "#1A3A5C",
                      border: "1px solid #1A3A5C30",
                      fontFamily: "var(--font-cinzel, serif)",
                    }}
                  >
                    {b.tipo}
                  </span>
                  <span
                    className="text-[0.55rem] px-2 py-0.5 rounded-full font-semibold tracking-wider uppercase flex items-center gap-1"
                    style={{
                      background: (b.stock ?? 0) > 0 ? "#2E6B3E18" : "#C0392B18",
                      color: (b.stock ?? 0) > 0 ? "#2E6B3E" : "#C0392B",
                      border: `1px solid ${(b.stock ?? 0) > 0 ? "#2E6B3E40" : "#C0392B40"}`,
                      fontFamily: "var(--font-cinzel, serif)",
                    }}
                  >
                    Stock: {b.stock ?? 0}
                  </span>
                  {b.disponibleCompra && (
                    <span
                      className="text-[0.55rem] px-2 py-0.5 rounded-full font-semibold tracking-wider uppercase flex items-center gap-1"
                      style={{
                        background: "#1A3A5C18",
                        color: "#1A3A5C",
                        border: "1px solid #1A3A5C30",
                        fontFamily: "var(--font-cinzel, serif)",
                      }}
                    >
                      <ShoppingCart size={10} />
                      Comprable
                    </span>
                  )}
                </div>
              </div>

              {/* Acciones */}
              <div className="flex items-center gap-2 flex-shrink-0 opacity-60 group-hover:opacity-100 transition-opacity">
                <button
                  onClick={() => router.push(`/admin/libros/edit/${b.slug}`)}
                  title="Editar"
                  className="w-8 h-8 flex items-center justify-center rounded-full transition-colors hover:bg-white/50"
                  style={{ color: "#1A3A5C" }}
                >
                  <Pencil size={18} />
                </button>
                <button
                  onClick={() => toggleActivo(b)}
                  title={b.activo ? "Desactivar" : "Activar"}
                  className="w-8 h-8 flex items-center justify-center rounded-full transition-colors hover:bg-white/50"
                  style={{ color: b.activo ? "#2E6B3E" : "#C0392B" }}
                >
                  {b.activo ? <Eye size={18} /> : <EyeOff size={18} />}
                </button>
                <button
                  onClick={() => toggleStarred(b)}
                  title={b.starred ? "Quitar destacado" : "Destacar"}
                  className="w-8 h-8 flex items-center justify-center rounded-full transition-colors hover:bg-white/50"
                  style={{ color: b.starred ? "#C9A447" : "#1A3A5C" }}
                >
                  <Star size={18} fill={b.starred ? "#C9A447" : "none"} />
                </button>
                <button
                  onClick={() => deleteBook(b)}
                  title="Eliminar"
                  className="w-8 h-8 flex items-center justify-center rounded-full transition-colors hover:bg-white/50"
                  style={{ color: "#C0392B" }}
                >
                  <Trash2 size={18} />
                </button>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
