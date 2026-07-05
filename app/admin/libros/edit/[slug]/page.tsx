"use client";

import { useState, useEffect, use } from "react";
import { useRouter } from "next/navigation";
import Image from "next/image";
import { ArrowLeft, BookOpen, User, FileText, DollarSign, Package, Tag, Eye, ShoppingCart, Upload, X, CheckCircle2 } from "lucide-react";
import FichaBibliograficaFields, { FICHA_BIBLIOGRAFICA_EMPTY } from "../../FichaBibliograficaFields";
import GalleryUploader from "../../GalleryUploader";

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
  galleryImages?: string[];
  pdfPageImages?: string[];
  subtitulo?: string;
  basadoEnLaObraDe?: string;
  editorAcademico?: string;
  traductorCompilador?: string;
  clasificacionAutor?: string;
  coedicion?: string;
  fechaAparicion?: string;
  obraActualizadaA?: string;
  editorial?: string;
  tema?: string;
  genero?: string;
  resena?: string;
  caratula?: string;
  dimensiones?: string;
  folios?: string;
  isbnImpreso?: string;
  isbnEbook?: string;
  envioIncluido?: boolean;
  costoEnvioColombia?: string;
  costoEnvioExterior?: string;
  promocion?: string;
  valorNeto?: string;
  impuestos?: string;
  audiolibroDisponible?: boolean;
  audiolibroIsbn?: string;
  videolibroDisponible?: boolean;
  videolibroIsbn?: string;
}

const inputCls = "w-full px-3 py-2 rounded-lg text-sm border-2 outline-none transition-all duration-200 focus:border-[#E8511A] placeholder:opacity-40";
const inputStyle = {
  background: "#F5EDD6",
  borderColor: "#B87333",
  color: "#1A3A5C",
  fontFamily: "var(--font-lora, serif)",
};

const labelCls = "flex items-center gap-1.5 text-[0.6rem] tracking-[0.22em] uppercase font-semibold mb-1.5";
const labelStyle = { color: "#B87333", fontFamily: "var(--font-cinzel, serif)" };

export default function EditLibroPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug: routeSlug } = use(params);
  const router = useRouter();
  const [id, setId] = useState<string | null>(null);
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
    galleryImages: [] as string[],
    pdfPageImages: [] as string[],
    ...FICHA_BIBLIOGRAFICA_EMPTY,
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
        const book: Book = (data.books ?? []).find((b: Book) => b.slug === routeSlug);
        if (!book) { router.push("/admin/libros"); return; }
        setId(book.id);
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
          galleryImages: book.galleryImages ?? [],
          pdfPageImages: book.pdfPageImages ?? [],
          subtitulo: book.subtitulo ?? "",
          basadoEnLaObraDe: book.basadoEnLaObraDe ?? "",
          editorAcademico: book.editorAcademico ?? "",
          traductorCompilador: book.traductorCompilador ?? "",
          clasificacionAutor: book.clasificacionAutor ?? "",
          coedicion: book.coedicion ?? "",
          fechaAparicion: book.fechaAparicion ?? "",
          obraActualizadaA: book.obraActualizadaA ?? "",
          editorial: book.editorial ?? "",
          tema: book.tema ?? "",
          genero: book.genero ?? "",
          resena: book.resena ?? "",
          caratula: book.caratula ?? "",
          dimensiones: book.dimensiones ?? "",
          folios: book.folios ?? "",
          isbnImpreso: book.isbnImpreso ?? "",
          isbnEbook: book.isbnEbook ?? "",
          envioIncluido: book.envioIncluido ?? false,
          costoEnvioColombia: book.costoEnvioColombia ?? "",
          costoEnvioExterior: book.costoEnvioExterior ?? "",
          promocion: book.promocion ?? "",
          valorNeto: book.valorNeto ?? "",
          impuestos: book.impuestos ?? "",
          audiolibroDisponible: book.audiolibroDisponible ?? false,
          audiolibroIsbn: book.audiolibroIsbn ?? "",
          videolibroDisponible: book.videolibroDisponible ?? false,
          videolibroIsbn: book.videolibroIsbn ?? "",
        });
      } catch {
        setMsg({ type: "err", text: "Error al cargar el libro." });
      } finally {
        setLoading(false);
      }
    }
    load();
  }, [routeSlug, router]);

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
    if (!id) return;
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
      <div className="flex items-center justify-center min-h-[60vh]">
        <div className="flex flex-col items-center gap-4">
          <div className="animate-spin w-10 h-10 rounded-full border-2" style={{ borderColor: "#B87333", borderTopColor: "#E8511A" }} />
          <span className="text-sm tracking-widest uppercase" style={{ color: "#B87333", fontFamily: "var(--font-cinzel, serif)" }}>Cargando…</span>
        </div>
      </div>
    );
  }

  return (
    <div className="flex flex-col gap-3 w-full pt-6 pb-12 px-4 md:px-8">
      {/* Header */}
      <div className="flex items-center justify-between mb-1">
        <div className="flex items-start gap-4">
          <div className="w-1 h-12 rounded-full flex-shrink-0 mt-1" style={{ background: "linear-gradient(180deg, #E8511A, #B87333)" }} />
          <div>
            <button
              onClick={() => router.push("/admin/libros")}
              className="flex items-center gap-1.5 mb-1 transition-opacity hover:opacity-70"
              style={{ color: "#B87333", fontFamily: "var(--font-cinzel, serif)", fontSize: "0.65rem", letterSpacing: "0.15em" }}
            >
              <ArrowLeft size={11} />
              <span className="uppercase tracking-widest">Volver a libros</span>
            </button>
            <h1 className="text-3xl font-bold" style={{ color: "#1A3A5C", fontFamily: "var(--font-cinzel, serif)" }}>
              Editar libro
            </h1>
          </div>
        </div>

        {/* Action buttons top */}
        <div className="hidden md:flex items-center gap-3">
          <button
            type="button"
            onClick={() => router.push("/admin/libros")}
            className="px-5 py-2.5 rounded-full text-sm font-semibold transition-all hover:opacity-70"
            style={{ border: "1.5px solid #B87333", color: "#1A3A5C", fontFamily: "var(--font-cinzel, serif)" }}
          >
            Cancelar
          </button>
          <button
            form="edit-libro-form"
            type="submit"
            disabled={saving}
            className="px-6 py-2.5 rounded-full text-sm font-semibold transition-all hover:opacity-90 disabled:opacity-50"
            style={{ background: "linear-gradient(90deg, #E8511A, #B87333)", color: "#F5EDD6", fontFamily: "var(--font-cinzel, serif)" }}
          >
            {saving ? "Guardando…" : "Guardar cambios"}
          </button>
        </div>
      </div>

      {/* Mensaje */}
      {msg && (
        <div
          className="px-4 py-3 rounded-xl text-sm border flex items-center gap-3"
          style={{
            background: msg.type === "ok" ? "#2E6B3E12" : "#C0392B12",
            color: msg.type === "ok" ? "#2E6B3E" : "#C0392B",
            borderColor: msg.type === "ok" ? "#2E6B3E40" : "#C0392B40",
            fontFamily: "var(--font-lora, serif)",
          }}
        >
          <span>{msg.type === "ok" ? "✓" : "✕"}</span>
          {msg.text}
        </div>
      )}

      {/* Two-column layout */}
      <form id="edit-libro-form" onSubmit={handleSubmit} className="grid grid-cols-1 xl:grid-cols-3 gap-4">

        {/* LEFT: main fields */}
        <div className="xl:col-span-2 flex flex-col gap-3">

          {/* Identificación */}
          <section className="rounded-xl p-4 border-2" style={{ background: "linear-gradient(160deg,#ede4cb 0%,#ddd0b0 100%)", borderColor: "#B87333", boxShadow: "0 4px 24px rgba(26,58,92,0.08)" }}>
            <div className="flex items-center gap-2 mb-3">
              <BookOpen size={14} style={{ color: "#B87333" }} />
              <span className="text-[0.6rem] tracking-[0.25em] uppercase font-semibold" style={{ color: "#B87333", fontFamily: "var(--font-cinzel, serif)" }}>Identificación</span>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
              <div>
                <label className={labelCls} style={labelStyle}><BookOpen size={10} />Nombre del libro</label>
                <input name="nombre" type="text" required value={form.nombre} onChange={handleChange} className={inputCls} style={inputStyle} placeholder="Título del libro…" />
              </div>
              <div>
                <label className={labelCls} style={labelStyle}><User size={10} />Autor/a</label>
                <input name="autor" type="text" required value={form.autor} onChange={handleChange} className={inputCls} style={inputStyle} placeholder="Nombre del autor…" />
              </div>
            </div>
          </section>

          {/* Descripción */}
          <section className="rounded-xl p-4 border-2" style={{ background: "linear-gradient(160deg,#ede4cb 0%,#ddd0b0 100%)", borderColor: "#B87333", boxShadow: "0 4px 24px rgba(26,58,92,0.08)" }}>
            <div className="flex items-center gap-2 mb-3">
              <FileText size={14} style={{ color: "#B87333" }} />
              <span className="text-[0.6rem] tracking-[0.25em] uppercase font-semibold" style={{ color: "#B87333", fontFamily: "var(--font-cinzel, serif)" }}>Contenido</span>
            </div>
            <div className="flex flex-col gap-3">
              <div>
                <label className={labelCls} style={labelStyle}><FileText size={10} />Descripción</label>
                <textarea name="descripcion" rows={4} required value={form.descripcion} onChange={handleChange} className={`${inputCls} resize-none`} style={inputStyle} placeholder="Descripción del libro…" />
              </div>
              <div>
                <label className={labelCls} style={labelStyle}><User size={10} />Biografía del autor <span className="opacity-60">(opcional)</span></label>
                <textarea name="authorBio" rows={3} value={form.authorBio} onChange={handleChange} className={`${inputCls} resize-none`} style={inputStyle} placeholder="Reseña biográfica del autor…" />
              </div>
            </div>
          </section>

          {/* Precios & Stock */}
          <section className="rounded-xl p-4 border-2" style={{ background: "linear-gradient(160deg,#ede4cb 0%,#ddd0b0 100%)", borderColor: "#B87333", boxShadow: "0 4px 24px rgba(26,58,92,0.08)" }}>
            <div className="flex items-center gap-2 mb-3">
              <DollarSign size={14} style={{ color: "#B87333" }} />
              <span className="text-[0.6rem] tracking-[0.25em] uppercase font-semibold" style={{ color: "#B87333", fontFamily: "var(--font-cinzel, serif)" }}>Precios & Inventario</span>
            </div>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
              <div>
                <label className={labelCls} style={labelStyle}><DollarSign size={10} />Precio COP</label>
                <input name="precioCop" type="number" required value={form.precioCop} onChange={handleChange} className={inputCls} style={inputStyle} placeholder="0" />
              </div>
              <div>
                <label className={labelCls} style={labelStyle}><DollarSign size={10} />Precio USD</label>
                <input name="precioUsd" type="number" required value={form.precioUsd} onChange={handleChange} className={inputCls} style={inputStyle} placeholder="0" />
              </div>
              <div>
                <label className={labelCls} style={labelStyle}><Package size={10} />Stock</label>
                <input name="stock" type="number" min={0} value={form.stock} onChange={handleChange} className={inputCls} style={inputStyle} placeholder="0" />
              </div>
              <div>
                <label className={labelCls} style={labelStyle}><Tag size={10} />Tipo</label>
                <select name="tipo" value={form.tipo} onChange={handleChange} className={inputCls} style={inputStyle}>
                  <option value="IMPRESO">Impreso</option>
                  <option value="EBOOK">E-Book</option>
                  <option value="AMBOS">Ambos</option>
                </select>
              </div>
            </div>
          </section>

          {/* Visibilidad */}
          <section className="rounded-xl p-4 border-2" style={{ background: "linear-gradient(160deg,#ede4cb 0%,#ddd0b0 100%)", borderColor: "#B87333", boxShadow: "0 4px 24px rgba(26,58,92,0.08)" }}>
            <div className="flex items-center gap-2 mb-3">
              <Eye size={14} style={{ color: "#B87333" }} />
              <span className="text-[0.6rem] tracking-[0.25em] uppercase font-semibold" style={{ color: "#B87333", fontFamily: "var(--font-cinzel, serif)" }}>Visibilidad & Venta</span>
            </div>
            <div className="flex flex-col gap-3">
              {[
                { name: "activo", id: "activo", Icon: Eye, label: "Visible en tienda", desc: "El libro aparece en el catálogo público" },
                { name: "disponibleCompra", id: "disponibleCompra", Icon: ShoppingCart, label: "Disponible para compra", desc: 'Muestra el botón "Comprar ahora"' },
              ].map(({ name, id, Icon, label, desc }) => (
                <label key={id} htmlFor={id} className="flex items-start gap-4 p-4 rounded-xl cursor-pointer transition-all hover:brightness-95"
                  style={{ background: "#F5EDD660", border: "1.5px solid #B8733350" }}>
                  <input
                    type="checkbox"
                    name={name}
                    id={id}
                    checked={(form as Record<string, unknown>)[name] as boolean}
                    onChange={handleChange}
                    className="mt-0.5 w-4 h-4 accent-[#E8511A] flex-shrink-0"
                  />
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center gap-2 mb-0.5">
                      <Icon size={12} style={{ color: "#B87333" }} />
                      <span className="text-sm font-semibold" style={{ color: "#1A3A5C", fontFamily: "var(--font-cinzel, serif)" }}>{label}</span>
                    </div>
                    <p className="text-xs" style={{ color: "#1B6CA8", fontFamily: "var(--font-lora, serif)" }}>{desc}</p>
                  </div>
                  {Boolean((form as Record<string, unknown>)[name]) && (
                    <CheckCircle2 size={16} style={{ color: "#E8511A", flexShrink: 0 }} />
                  )}
                </label>
              ))}
            </div>
          </section>

          <FichaBibliograficaFields values={form} onChange={handleChange} />

          <GalleryUploader
            galleryImages={form.galleryImages}
            pdfPageImages={form.pdfPageImages}
            pdfUrl={form.pdfUrl}
            onChange={(next) => setForm((prev) => ({ ...prev, ...next }))}
          />

          {/* Mobile actions */}
          <div className="flex gap-3 xl:hidden">
            <button
              type="button"
              onClick={() => router.push("/admin/libros")}
              className="flex-1 py-3 rounded-full text-sm font-semibold transition-all hover:opacity-70"
              style={{ border: "1.5px solid #B87333", color: "#1A3A5C", fontFamily: "var(--font-cinzel, serif)" }}
            >
              Cancelar
            </button>
            <button
              type="submit"
              disabled={saving}
              className="flex-1 py-3 rounded-full text-sm font-semibold transition-all hover:opacity-90 disabled:opacity-50"
              style={{ background: "linear-gradient(90deg, #E8511A, #B87333)", color: "#F5EDD6", fontFamily: "var(--font-cinzel, serif)" }}
            >
              {saving ? "Guardando…" : "Guardar cambios"}
            </button>
          </div>
        </div>

        {/* RIGHT: uploads + preview */}
        <div className="flex flex-col gap-3 xl:sticky xl:top-4 xl:self-start">

          {/* Cover preview */}
          <section className="rounded-2xl border-2 overflow-hidden" style={{ borderColor: "#B87333", boxShadow: "0 4px 24px rgba(26,58,92,0.10)" }}>
            <div className="relative w-full aspect-[3/4] overflow-hidden" style={{ background: "linear-gradient(135deg,#1A3A5C,#1F4FA3)" }}>
              {form.coverUrl ? (
                <Image src={form.coverUrl} alt="Portada" fill className="object-cover" />
              ) : (
                <div className="absolute inset-0 flex flex-col items-center justify-center gap-3 opacity-40">
                  <BookOpen size={40} style={{ color: "#F5EDD6" }} />
                  <span className="text-xs tracking-widest uppercase" style={{ color: "#F5EDD6", fontFamily: "var(--font-cinzel, serif)" }}>Sin portada</span>
                </div>
              )}
              {form.nombre && (
                <div className="absolute bottom-0 left-0 right-0 p-4" style={{ background: "linear-gradient(0deg,rgba(26,58,92,0.9),transparent)" }}>
                  <p className="text-xs font-bold leading-tight" style={{ color: "#F5EDD6", fontFamily: "var(--font-cinzel, serif)" }}>{form.nombre}</p>
                  {form.autor && <p className="text-[0.6rem] mt-1 opacity-80" style={{ color: "#B87333", fontFamily: "var(--font-lora, serif)" }}>{form.autor}</p>}
                </div>
              )}
            </div>
            <div className="p-3" style={{ background: "linear-gradient(160deg,#ede4cb 0%,#ddd0b0 100%)" }}>
              <span className="text-[0.55rem] tracking-[0.2em] uppercase" style={{ color: "#B87333", fontFamily: "var(--font-cinzel, serif)" }}>Vista previa portada</span>
            </div>
          </section>

          {/* Archivos */}
          <section className="rounded-xl p-4 border-2" style={{ background: "linear-gradient(160deg,#ede4cb 0%,#ddd0b0 100%)", borderColor: "#B87333", boxShadow: "0 4px 24px rgba(26,58,92,0.08)" }}>
            <div className="flex items-center gap-2 mb-3">
              <Upload size={14} style={{ color: "#B87333" }} />
              <span className="text-[0.6rem] tracking-[0.25em] uppercase font-semibold" style={{ color: "#B87333", fontFamily: "var(--font-cinzel, serif)" }}>Archivos</span>
            </div>

            <div className="flex flex-col gap-2">
              {([
                { field: "coverUrl", label: "Portada", bucket: "book-covers", accept: "image/*", icon: <BookOpen size={13} /> },
                { field: "authorImageUrl", label: "Imagen autor", bucket: "author-images", accept: "image/*", icon: <User size={13} /> },
                { field: "pdfUrl", label: "PDF / E-Book", bucket: "pdfs", accept: "application/pdf", icon: <FileText size={13} /> },
              ] as const).map(({ field, label, bucket, accept, icon }) => {
                const loaded = !!(form as Record<string, unknown>)[field];
                const isUploading = uploading[field];
                return (
                  <div key={field}>
                    <label className={labelCls} style={labelStyle}>{icon}{label}</label>
                    <div className="flex items-center gap-2">
                      <label
                        className="flex-1 flex items-center justify-center gap-2 px-3 py-2.5 rounded-xl text-xs border-2 cursor-pointer transition-all hover:border-[#E8511A]"
                        style={{
                          background: loaded ? "#2E6B3E12" : "#F5EDD6",
                          borderColor: loaded ? "#2E6B3E80" : "#B87333",
                          color: loaded ? "#2E6B3E" : "#1A3A5C",
                          fontFamily: "var(--font-lora, serif)",
                          opacity: isUploading ? 0.6 : 1,
                        }}
                      >
                        {isUploading ? (
                          <>
                            <div className="animate-spin w-3 h-3 rounded-full border" style={{ borderColor: "#B87333", borderTopColor: "transparent" }} />
                            <span>Subiendo…</span>
                          </>
                        ) : loaded ? (
                          <>
                            <CheckCircle2 size={13} style={{ color: "#2E6B3E" }} />
                            <span className="font-semibold">Cargado</span>
                          </>
                        ) : (
                          <>
                            <Upload size={13} style={{ color: "#B87333" }} />
                            <span>Seleccionar</span>
                          </>
                        )}
                        <input
                          type="file"
                          accept={accept}
                          className="hidden"
                          disabled={isUploading}
                          onChange={(e) => {
                            const file = e.target.files?.[0];
                            if (file) uploadFile(field, bucket, file);
                          }}
                        />
                      </label>
                      {loaded && (
                        <button
                          type="button"
                          onClick={() => setForm((prev) => ({ ...prev, [field]: "" }))}
                          className="p-2.5 rounded-xl border-2 transition-all hover:border-[#E8511A] hover:text-[#E8511A]"
                          style={{ borderColor: "#B87333", color: "#B87333", background: "#F5EDD6" }}
                          title="Quitar"
                        >
                          <X size={13} />
                        </button>
                      )}
                    </div>
                  </div>
                );
              })}
            </div>
          </section>

          {/* Author image preview */}
          {form.authorImageUrl && (
            <section className="rounded-2xl border-2 overflow-hidden" style={{ borderColor: "#B87333" }}>
              <div className="relative w-full aspect-square overflow-hidden" style={{ background: "#1A3A5C" }}>
                <Image src={form.authorImageUrl} alt="Autor" fill className="object-cover" />
              </div>
              <div className="p-3" style={{ background: "linear-gradient(160deg,#ede4cb 0%,#ddd0b0 100%)" }}>
                <span className="text-[0.55rem] tracking-[0.2em] uppercase" style={{ color: "#B87333", fontFamily: "var(--font-cinzel, serif)" }}>Foto del autor</span>
              </div>
            </section>
          )}
        </div>
      </form>
    </div>
  );
}
