"use client";

import { useState, useEffect, use } from "react";
import { useRouter } from "next/navigation";
import Image from "next/image";
import { ArrowLeft } from "lucide-react";

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
  disponibleCompra: boolean;
  starred: boolean;
  tipo: string;
}

const inputStyle = {
  background: "#F5EDD6",
  border: "1.5px solid #B87333",
  color: "#1A3A5C",
  fontFamily: "var(--font-lora, serif)",
};

const labelCls = "text-[0.6rem] tracking-[0.2em] uppercase font-semibold";
const labelColor = { color: "#B87333", fontFamily: "var(--font-cinzel, serif)" };

export default function EditLibroPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = use(params);
  const router = useRouter();
  const [form, setForm] = useState({
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
    stock: "",
    activo: true,
    disponibleCompra: true,
    tipo: "IMPRESO" as "IMPRESO" | "EBOOK" | "AMBOS",
  });
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [uploading, setUploading] = useState<Record<string, boolean>>({});
  const [msg, setMsg] = useState<{ type: "ok" | "err"; text: string } | null>(null);

  useEffect(() => {
    async function load() {
      try {
        const res = await fetch("/api/admin/libros");
        const data = await res.json();
        const book: Book = (data.books ?? []).find((b: Book) => b.id === id);
        if (!book) { router.push("/admin/libros"); return; }
        setForm({
          slug: book.slug,
          nombre: book.nombre,
          autor: book.autor,
          descripcion: book.descripcion,
          precioCop: String(book.precioCop),
          precioUsd: String(book.precioUsd),
          coverUrl: book.coverUrl,
          authorImageUrl: book.authorImageUrl ?? "",
          authorBio: book.authorBio ?? "",
          pdfUrl: book.pdfUrl ?? "",
          stock: String(book.stock ?? 0),
          activo: book.activo,
          disponibleCompra: book.disponibleCompra,
          tipo: book.tipo as "IMPRESO" | "EBOOK" | "AMBOS",
        });
      } catch {
        setMsg({ type: "err", text: "Error al cargar el libro." });
      } finally {
        setLoading(false);
      }
    }
    load();
  }, [id, router]);

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
    setForm((prev) => ({
      ...prev,
      [name]: type === "checkbox" ? (e.target as HTMLInputElement).checked : value,
    }));
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
      const message = err instanceof Error ? err.message : "Error desconocido";
      console.error("[uploadFile]", err);
      setMsg({ type: "err", text: `Error subiendo ${field}: ${message}` });
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
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ id, ...form }),
      });
      const data = await res.json();
      if (!res.ok) throw new Error(data.error ?? "Error");
      router.push("/admin/libros");
    } catch (err: unknown) {
      const message = err instanceof Error ? err.message : "Error desconocido";
      setMsg({ type: "err", text: message });
      setSaving(false);
    }
  }

  if (loading) {
    return (
      <div className="flex items-center gap-3 py-8">
        <div className="animate-spin w-6 h-6 rounded-full border-2" style={{ borderColor: "#B87333", borderTopColor: "transparent" }} />
        <span className="text-sm" style={{ color: "#B87333", fontFamily: "var(--font-lora, serif)" }}>Cargando…</span>
      </div>
    );
  }

  return (
    <div className="flex flex-col gap-8 max-w-3xl">
      {/* Header */}
      <div className="flex items-start gap-4">
        <div className="w-1.5 h-14 rounded-full flex-shrink-0" style={{ background: "linear-gradient(180deg, #E8511A, #B87333)" }} />
        <div className="flex-1">
          <button
            onClick={() => router.push("/admin/libros")}
            className="flex items-center gap-1.5 text-xs mb-1 transition-opacity hover:opacity-70"
            style={{ color: "#B87333", fontFamily: "var(--font-cinzel, serif)" }}
          >
            <ArrowLeft size={12} />
            Volver a libros
          </button>
          <h1 className="text-2xl font-bold leading-tight" style={{ color: "#1A3A5C", fontFamily: "var(--font-cinzel, serif)" }}>
            Editar libro
          </h1>
        </div>
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
      <div
        className="rounded-2xl p-6 md:p-8 border-2"
        style={{
          background: "linear-gradient(160deg, #ede4cb 0%, #ddd0b0 100%)",
          borderColor: "#B87333",
          boxShadow: "0 8px 32px rgba(26,58,92,0.12)",
        }}
      >
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

          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            {[
              { name: "precioCop", label: "Precio COP", type: "number", required: true },
              { name: "precioUsd", label: "Precio USD", type: "number", required: true },
              { name: "stock", label: "Stock", type: "number", required: false },
            ].map(({ name, label, type, required }) => (
              <div key={name} className="flex flex-col gap-1.5">
                <label className={labelCls} style={labelColor}>{label}</label>
                <input
                  name={name}
                  type={type}
                  required={required}
                  min={name === "stock" ? 0 : undefined}
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

          <div className="flex flex-col gap-3">
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
            <div className="flex items-center gap-3">
              <input
                type="checkbox"
                name="disponibleCompra"
                id="disponibleCompra"
                checked={form.disponibleCompra}
                onChange={handleChange}
                className="w-4 h-4 accent-[#E8511A]"
              />
              <label htmlFor="disponibleCompra" className="text-sm cursor-pointer" style={{ color: "#1A3A5C", fontFamily: "var(--font-lora, serif)" }}>
                Disponible para compra (muestra botón &ldquo;Comprar ahora&rdquo;)
              </label>
            </div>
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
              {saving ? "Guardando…" : "Guardar cambios"}
            </button>
            <button
              type="button"
              onClick={() => router.push("/admin/libros")}
              className="px-6 py-2.5 rounded-full text-sm font-semibold transition-all hover:opacity-70"
              style={{ background: "transparent", border: "1.5px solid #B87333", color: "#1A3A5C", fontFamily: "var(--font-cinzel, serif)" }}
            >
              Cancelar
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
