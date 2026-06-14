"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import Image from "next/image";
import { BookOpen, Plus, Star, Eye, EyeOff, Pencil, ShoppingCart } from "lucide-react";

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

const EMPTY_FORM = {
  slug: "",
  nombre: "",
  autor: "",
  descripcion: "",
  precioCop: "",
  precioUsd: "",
  coverUrl: "",
  authorImageUrl: "",
  authorBio: "",
  pdfUrl: "",
  activo: true,
  tipo: "IMPRESO" as "IMPRESO" | "EBOOK" | "AMBOS",
};

const inputStyle = {
  background: "#F5EDD6",
  border: "1.5px solid #B87333",
  color: "#1A3A5C",
  fontFamily: "var(--font-lora, serif)",
};

const labelCls = "text-[0.6rem] tracking-[0.2em] uppercase font-semibold";
const labelColor = { color: "#B87333", fontFamily: "var(--font-cinzel, serif)" };

export default function LibrosPage() {
  const router = useRouter();
  const [books, setBooks] = useState<Book[]>([]);
  const [loading, setLoading] = useState(true);
  const [showForm, setShowForm] = useState(false);
  const [form, setForm] = useState(EMPTY_FORM);
  const [saving, setSaving] = useState(false);
  const [msg, setMsg] = useState<{ type: "ok" | "err"; text: string } | null>(null);
  const [uploading, setUploading] = useState<Record<string, boolean>>({});

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

  function openNew() {
    setForm(EMPTY_FORM);
    setShowForm(true);
    setMsg(null);
  }

  function toSlug(str: string) {
    return str
      .toLowerCase()
      .normalize("NFD")
      .replace(/[̀-ͯ]/g, "")
      .replace(/[^a-z0-9\s-]/g, "")
      .trim()
      .replace(/\s+/g, "-");
  }

  function handleChange(e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) {
    const { name, value, type } = e.target;
    setForm((prev) => {
      const updated: Record<string, unknown> = {
        ...prev,
        [name]: type === "checkbox" ? (e.target as HTMLInputElement).checked : value,
      };
      if (name === "nombre") updated.slug = toSlug(value);
      return updated as typeof EMPTY_FORM;
    });
  }

  async function uploadFile(field: "coverUrl" | "authorImageUrl" | "pdfUrl", bucket: string, file: File) {
    setUploading((prev) => ({ ...prev, [field]: true }));
    try {
      const fd = new FormData();
      fd.append("file", file);
      fd.append("bucket", bucket);
      const res = await fetch("/api/admin/upload", { method: "POST", body: fd });
      const data = await res.json();
      if (!res.ok) throw new Error(data.error ?? "Error al subir");
      setForm((prev) => ({ ...prev, [field]: data.url }));
    } catch (err: unknown) {
      const msg = err instanceof Error ? err.message : "Error desconocido";
      console.error("[uploadFile]", err);
      setMsg({ type: "err", text: `Error subiendo ${field}: ${msg}` });
    } finally {
      setUploading((prev) => ({ ...prev, [field]: false }));
    }
  }

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setSaving(true);
    setMsg(null);
    try {
      const res = await fetch("/api/admin/libros", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(form),
      });
      const data = await res.json();
      if (!res.ok) throw new Error(data.error ?? "Error");
      setMsg({ type: "ok", text: "Libro creado." });
      setShowForm(false);
      load();
    } catch (err: unknown) {
      const message = err instanceof Error ? err.message : "Error desconocido";
      setMsg({ type: "err", text: message });
    } finally {
      setSaving(false);
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
          onClick={openNew}
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

      {/* Formulario */}
      {showForm && (
        <div
          className="rounded-2xl p-6 md:p-8 border-2"
          style={{
            background: "linear-gradient(160deg, #ede4cb 0%, #ddd0b0 100%)",
            borderColor: "#B87333",
            boxShadow: "0 8px 32px rgba(26,58,92,0.12)",
          }}
        >
          <h2 className="text-lg font-bold mb-6" style={{ color: "#1A3A5C", fontFamily: "var(--font-cinzel, serif)" }}>
            {"Nuevo libro"}
          </h2>
          <form onSubmit={handleSubmit} className="flex flex-col gap-5">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {[
                { name: "nombre", label: "Nombre del libro", type: "text", required: true },
                { name: "autor", label: "Autor/a", type: "text", required: true },
              ].map(({ name, label, type, required }) => (
                <div key={name} className="flex flex-col gap-1.5">
                  <label className={labelCls} style={labelColor}>{label}</label>
                  <input
                    name={name}
                    type={type}
                    required={required}
                    value={(form as Record<string, unknown>)[name] as string}
                    onChange={handleChange}
                    className="w-full px-4 py-2.5 rounded-lg text-sm border outline-none focus:border-[#E8511A] transition-colors"
                    style={inputStyle}
                  />
                </div>
              ))}
            </div>

            {/* Uploads */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              {([
                { field: "coverUrl", label: "Portada", bucket: "book-covers", accept: "image/*" },
                { field: "authorImageUrl", label: "Imagen autor", bucket: "author-images", accept: "image/*" },
                { field: "pdfUrl", label: "PDF / E-Book", bucket: "pdfs", accept: "application/pdf" },
              ] as const).map(({ field, label, bucket, accept }) => (
                <div key={field} className="flex flex-col gap-1.5">
                  <label className={labelCls} style={labelColor}>{label}</label>
                  <label
                    className="flex items-center justify-center gap-2 px-4 py-2.5 rounded-lg text-sm border cursor-pointer transition-colors hover:border-[#E8511A]"
                    style={{ ...inputStyle, opacity: uploading[field] ? 0.6 : 1 }}
                  >
                    <span style={{ color: "#1A3A5C" }}>
                      {uploading[field] ? "Subiendo…" : (form as Record<string, unknown>)[field] ? "✓ Cargado" : "Seleccionar"}
                    </span>
                    <input
                      type="file"
                      accept={accept}
                      className="hidden"
                      disabled={uploading[field]}
                      onChange={(e) => {
                        const file = e.target.files?.[0];
                        if (file) uploadFile(field, bucket, file);
                      }}
                    />
                  </label>
                  {!!(form as Record<string, unknown>)[field] && (
                    <button
                      type="button"
                      onClick={() => setForm((prev) => ({ ...prev, [field]: "" }))}
                      className="text-xs text-center transition-opacity hover:opacity-70"
                      style={{ color: "#B87333", fontFamily: "var(--font-cinzel, serif)" }}
                    >
                      Quitar
                    </button>
                  )}
                </div>
              ))}
            </div>

            <div className="flex flex-col gap-1.5">
              <label className={labelCls} style={labelColor}>Biografía del autor (opcional)</label>
              <textarea
                name="authorBio"
                rows={2}
                value={form.authorBio}
                onChange={handleChange}
                className="w-full px-4 py-2.5 rounded-lg text-sm border outline-none resize-none focus:border-[#E8511A] transition-colors"
                style={inputStyle}
              />
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              {[
                { name: "precioCop", label: "Precio COP", type: "number", required: true },
                { name: "precioUsd", label: "Precio USD", type: "number", required: true },
              ].map(({ name, label, type, required }) => (
                <div key={name} className="flex flex-col gap-1.5">
                  <label className={labelCls} style={labelColor}>{label}</label>
                  <input
                    name={name}
                    type={type}
                    required={required}
                    value={(form as Record<string, unknown>)[name] as string}
                    onChange={handleChange}
                    className="w-full px-4 py-2.5 rounded-lg text-sm border outline-none focus:border-[#E8511A] transition-colors"
                    style={inputStyle}
                  />
                </div>
              ))}
              <div className="flex flex-col gap-1.5">
                <label className={labelCls} style={labelColor}>Tipo</label>
                <select
                  name="tipo"
                  value={form.tipo}
                  onChange={handleChange}
                  className="w-full px-4 py-2.5 rounded-lg text-sm border outline-none focus:border-[#E8511A] transition-colors"
                  style={inputStyle}
                >
                  <option value="IMPRESO">Impreso</option>
                  <option value="EBOOK">E-Book</option>
                  <option value="AMBOS">Ambos</option>
                </select>
              </div>
            </div>

            <div className="flex flex-col gap-1.5">
              <label className={labelCls} style={labelColor}>Descripción</label>
              <textarea
                name="descripcion"
                rows={3}
                required
                value={form.descripcion}
                onChange={handleChange}
                className="w-full px-4 py-2.5 rounded-lg text-sm border outline-none resize-none focus:border-[#E8511A] transition-colors"
                style={inputStyle}
              />
            </div>

            <div className="flex items-center gap-3">
              <input
                type="checkbox"
                name="activo"
                id="activo"
                checked={form.activo}
                onChange={handleChange}
                className="w-4 h-4 accent-[#E8511A]"
              />
              <label htmlFor="activo" className="text-sm cursor-pointer" style={{ color: "#1A3A5C", fontFamily: "var(--font-lora, serif)" }}>
                Visible en tienda
              </label>
            </div>

            {form.coverUrl && (
              <div className="w-20 h-28 rounded-lg overflow-hidden" style={{ border: "1.5px solid #B87333" }}>
                <Image src={form.coverUrl} alt="preview" width={80} height={112} className="object-cover w-full h-full" />
              </div>
            )}

            <div className="flex gap-3 pt-2">
              <button
                type="submit"
                disabled={saving}
                className="flex-1 py-2.5 rounded-full text-sm font-semibold transition-all hover:opacity-90 disabled:opacity-50"
                style={{ background: "linear-gradient(90deg, #E8511A, #B87333)", color: "#F5EDD6", fontFamily: "var(--font-cinzel, serif)" }}
              >
                {saving ? "Guardando…" : "Crear libro"}
              </button>
              <button
                type="button"
                onClick={() => setShowForm(false)}
                className="px-6 py-2.5 rounded-full text-sm font-semibold transition-all hover:opacity-70"
                style={{ background: "transparent", border: "1.5px solid #B87333", color: "#1A3A5C", fontFamily: "var(--font-cinzel, serif)" }}
              >
                Cancelar
              </button>
            </div>
          </form>
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
                  onClick={() => router.push(`/admin/libros/${b.id}`)}
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
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
