"use client";

import { useState, useEffect, useRef } from "react";
import Image from "next/image";

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
  activo: boolean;
  tipo: string;
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

export default function LibrosPage() {
  const [books, setBooks] = useState<Book[]>([]);
  const [loading, setLoading] = useState(true);
  const [showForm, setShowForm] = useState(false);
  const [editId, setEditId] = useState<string | null>(null);
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
    setEditId(null);
    setShowForm(true);
    setMsg(null);
  }

  function openEdit(b: Book) {
    setForm({
      slug: b.slug,
      nombre: b.nombre,
      autor: b.autor,
      descripcion: b.descripcion,
      precioCop: String(b.precioCop),
      precioUsd: String(b.precioUsd),
      coverUrl: b.coverUrl,
      authorImageUrl: b.authorImageUrl ?? "",
      authorBio: b.authorBio ?? "",
      pdfUrl: b.pdfUrl ?? "",
      activo: b.activo,
      tipo: b.tipo as any,
    });
    setEditId(b.id);
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
      const updated: any = {
        ...prev,
        [name]: type === "checkbox" ? (e.target as HTMLInputElement).checked : value,
      };
      if (name === "nombre" && editId === null) {
        updated.slug = toSlug(value);
      }
      return updated;
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
    } catch (err: any) {
      console.error("[uploadFile]", err);
      setMsg({ type: "err", text: `Error subiendo ${field}: ${err.message}` });
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
        method: editId ? "PUT" : "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ id: editId, ...form }),
      });
      const data = await res.json();
      if (!res.ok) throw new Error(data.error ?? "Error");
      setMsg({ type: "ok", text: editId ? "Libro actualizado." : "Libro creado." });
      setShowForm(false);
      setEditId(null);
      load();
    } catch (err: any) {
      setMsg({ type: "err", text: err.message });
    } finally {
      setSaving(false);
    }
  }

  async function toggleActivo(b: Book) {
    await fetch("/api/admin/libros", {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ id: b.id, activo: !b.activo }),
    });
    load();
  }

  const inputStyle = {
    background: "#F5EDD6",
    border: "1.5px solid #B87333",
    color: "#1A3A5C",
    fontFamily: "var(--font-lora, serif)",
  };
  const labelStyle = { color: "#1A3A5C", fontFamily: "var(--font-cinzel, serif)" };

  return (
    <div>
      <div className="flex items-center justify-between mb-8">
        <h1 className="text-2xl font-bold" style={{ color: "#1A3A5C", fontFamily: "var(--font-cinzel, serif)" }}>
          Libros
        </h1>
        <button
          onClick={openNew}
          className="px-5 py-2 rounded-full text-white text-sm font-semibold transition-opacity hover:opacity-90"
          style={{ background: "linear-gradient(90deg, #E8511A, #B87333)", fontFamily: "var(--font-cinzel, serif)" }}
        >
          + Agregar libro
        </button>
      </div>

      {msg && (
        <p
          className="mb-4 text-xs px-4 py-2 rounded-lg"
          style={{
            background: msg.type === "ok" ? "#2E6B3E20" : "#C0392B20",
            color: msg.type === "ok" ? "#2E6B3E" : "#C0392B",
            border: `1px solid ${msg.type === "ok" ? "#2E6B3E" : "#C0392B"}`,
          }}
        >
          {msg.text}
        </p>
      )}

      {/* Formulario */}
      {showForm && (
        <div
          className="rounded-2xl p-6 mb-8 max-w-2xl"
          style={{ background: "linear-gradient(135deg, #e8dfc4, #d4c9a8)", border: "2px solid #B87333" }}
        >
          <h2 className="text-lg font-bold mb-5" style={{ color: "#1A3A5C", fontFamily: "var(--font-cinzel, serif)" }}>
            {editId ? "Editar libro" : "Nuevo libro"}
          </h2>
          <form onSubmit={handleSubmit} className="flex flex-col gap-4">
            {[
              { name: "nombre", label: "Nombre del libro", type: "text", required: true },
              { name: "autor", label: "Autor/a", type: "text", required: true },
            ].map(({ name, label, type, required }) => (
              <div key={name} className="flex flex-col gap-1">
                <label className="text-xs font-semibold tracking-widest uppercase" style={labelStyle}>{label}</label>
                <input
                  name={name}
                  type={type}
                  required={required}
                  value={(form as any)[name]}
                  onChange={handleChange}
                  className="w-full px-4 py-2.5 rounded-lg text-sm border outline-none"
                  style={inputStyle}
                />
              </div>
            ))}

            {([
              { field: "coverUrl", label: "Portada", bucket: "book-covers", accept: "image/*" },
              { field: "authorImageUrl", label: "Imagen del autor (opcional)", bucket: "author-images", accept: "image/*" },
              { field: "pdfUrl", label: "PDF / e-book", bucket: "pdfs", accept: "application/pdf" },
            ] as const).map(({ field, label, bucket, accept }) => (
              <div key={field} className="flex flex-col gap-1">
                <label className="text-xs font-semibold tracking-widest uppercase" style={labelStyle}>{label}</label>
                <div className="flex items-center gap-2">
                  <label
                    className="flex-1 flex items-center gap-2 px-4 py-2.5 rounded-lg text-sm border cursor-pointer select-none"
                    style={{ ...inputStyle, opacity: uploading[field] ? 0.6 : 1 }}
                  >
                    <span style={{ color: "#1A3A5C" }}>{uploading[field] ? "Subiendo…" : (form as any)[field] ? "✓ Archivo cargado" : "Seleccionar archivo"}</span>
                    <input
                      type="file"
                      accept={accept}
                      className="hidden"
                      disabled={uploading[field]}
                      onChange={(e) => {
                        const file = e.target.files?.[0];
                        if (file) uploadFile(field as any, bucket, file);
                      }}
                    />
                  </label>
                  {(form as any)[field] && (
                    <button
                      type="button"
                      onClick={() => setForm((prev) => ({ ...prev, [field]: "" }))}
                      className="text-xs px-2 py-1 rounded"
                      style={{ color: "#B87333", border: "1px solid #B87333" }}
                    >
                      Quitar
                    </button>
                  )}
                </div>
                {(form as any)[field] && (
                  <span className="text-xs truncate" style={{ color: "#666" }}>{(form as any)[field]}</span>
                )}
              </div>
            ))}

            <div className="flex flex-col gap-1">
              <label className="text-xs font-semibold tracking-widest uppercase" style={labelStyle}>Biografía del autor (opcional)</label>
              <textarea
                name="authorBio"
                rows={3}
                value={form.authorBio}
                onChange={handleChange}
                className="w-full px-4 py-2.5 rounded-lg text-sm border outline-none resize-none"
                style={inputStyle}
              />
            </div>

            {[
              { name: "precioCop", label: "Precio COP", type: "number", required: true },
              { name: "precioUsd", label: "Precio USD", type: "number", required: true },
            ].map(({ name, label, type, required }) => (
              <div key={name} className="flex flex-col gap-1">
                <label className="text-xs font-semibold tracking-widest uppercase" style={labelStyle}>{label}</label>
                <input
                  name={name}
                  type={type}
                  required={required}
                  value={(form as any)[name]}
                  onChange={handleChange}
                  className="w-full px-4 py-2.5 rounded-lg text-sm border outline-none"
                  style={inputStyle}
                />
              </div>
            ))}

            <div className="flex flex-col gap-1">
              <label className="text-xs font-semibold tracking-widest uppercase" style={labelStyle}>Descripción</label>
              <textarea
                name="descripcion"
                rows={3}
                required
                value={form.descripcion}
                onChange={handleChange}
                className="w-full px-4 py-2.5 rounded-lg text-sm border outline-none resize-none"
                style={inputStyle}
              />
            </div>

            <div className="flex flex-col gap-1">
              <label className="text-xs font-semibold tracking-widest uppercase" style={labelStyle}>Tipo</label>
              <select
                name="tipo"
                value={form.tipo}
                onChange={handleChange}
                className="w-full px-4 py-2.5 rounded-lg text-sm border outline-none"
                style={inputStyle}
              >
                <option value="IMPRESO">Impreso</option>
                <option value="EBOOK">E-Book</option>
                <option value="AMBOS">Ambos</option>
              </select>
            </div>

            <label className="flex items-center gap-3 cursor-pointer">
              <input type="checkbox" name="activo" checked={form.activo} onChange={handleChange} />
              <span className="text-sm" style={labelStyle}>Activo (visible en tienda)</span>
            </label>

            {form.coverUrl && (
              <div className="w-24 h-32 rounded overflow-hidden" style={{ border: "1.5px solid #B87333" }}>
                <Image src={form.coverUrl} alt="preview" width={96} height={128} className="object-cover w-full h-full" />
              </div>
            )}

            <div className="flex gap-3 mt-2">
              <button
                type="submit"
                disabled={saving}
                className="flex-1 py-2.5 rounded-full text-white text-sm font-semibold transition-opacity hover:opacity-90 disabled:opacity-50"
                style={{ background: "linear-gradient(90deg, #E8511A, #B87333)", fontFamily: "var(--font-cinzel, serif)" }}
              >
                {saving ? "Guardando..." : editId ? "Guardar cambios" : "Crear libro"}
              </button>
              <button
                type="button"
                onClick={() => setShowForm(false)}
                className="px-5 py-2.5 rounded-full text-sm font-semibold transition-opacity hover:opacity-70"
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
        <p className="text-sm" style={{ color: "#B87333", fontFamily: "var(--font-lora, serif)" }}>Cargando...</p>
      ) : books.length === 0 ? (
        <div
          className="rounded-2xl p-8 text-center max-w-2xl"
          style={{ background: "linear-gradient(135deg, #e8dfc4, #d4c9a8)", border: "2px solid #B87333" }}
        >
          <p className="text-sm" style={{ color: "#1A3A5C", fontFamily: "var(--font-lora, serif)" }}>
            No hay libros cargados aún. Hacé clic en "+ Agregar libro" para comenzar.
          </p>
        </div>
      ) : (
        <div className="flex flex-col gap-3 max-w-3xl">
          {books.map((b) => (
            <div
              key={b.id}
              className="flex items-center gap-4 rounded-xl p-4"
              style={{ background: "linear-gradient(135deg, #e8dfc4, #d4c9a8)", border: "1.5px solid #B87333" }}
            >
              {b.coverUrl ? (
                <div className="w-12 h-16 rounded overflow-hidden flex-shrink-0" style={{ border: "1px solid #B87333" }}>
                  <Image src={b.coverUrl} alt={b.nombre} width={48} height={64} className="object-cover w-full h-full" />
                </div>
              ) : (
                <div className="w-12 h-16 rounded flex-shrink-0 flex items-center justify-center" style={{ background: "#1A3A5C", border: "1px solid #B87333" }}>
                  <span className="text-white text-[0.55rem] text-center" style={{ fontFamily: "var(--font-cinzel, serif)" }}>Sin portada</span>
                </div>
              )}
              <div className="flex-1 min-w-0">
                <p className="text-sm font-semibold truncate" style={{ color: "#1A3A5C", fontFamily: "var(--font-cinzel, serif)" }}>{b.nombre}</p>
                <p className="text-xs" style={{ color: "#B87333", fontFamily: "var(--font-lora, serif)" }}>{b.autor} · {b.tipo}</p>
                <p className="text-xs" style={{ color: "#1A3A5C" }}>${Number(b.precioCop).toLocaleString("es-CO")} COP</p>
              </div>
              <div className="flex items-center gap-2 flex-shrink-0">
                <span
                  className="text-[0.6rem] px-2 py-0.5 rounded-full font-semibold"
                  style={{
                    background: b.activo ? "#2E6B3E20" : "#C0392B20",
                    color: b.activo ? "#2E6B3E" : "#C0392B",
                    border: `1px solid ${b.activo ? "#2E6B3E" : "#C0392B"}`,
                  }}
                >
                  {b.activo ? "Activo" : "Inactivo"}
                </span>
                <button
                  onClick={() => openEdit(b)}
                  className="text-xs px-3 py-1.5 rounded-full transition-opacity hover:opacity-70"
                  style={{ border: "1px solid #B87333", color: "#1A3A5C", fontFamily: "var(--font-cinzel, serif)" }}
                >
                  Editar
                </button>
                <button
                  onClick={() => toggleActivo(b)}
                  className="text-xs px-3 py-1.5 rounded-full transition-opacity hover:opacity-70"
                  style={{ border: "1px solid #B87333", color: "#1A3A5C", fontFamily: "var(--font-cinzel, serif)" }}
                >
                  {b.activo ? "Desactivar" : "Activar"}
                </button>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
