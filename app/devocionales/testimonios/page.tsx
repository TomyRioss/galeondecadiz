"use client";

import { useState } from "react";
import { FaCheckCircle } from "react-icons/fa";

export default function TestimoniosFormPage() {
  const [form, setForm] = useState({
    nombre: "",
    email: "",
    whatsapp: "",
    ciudad: "",
    pais: "",
    autoriza_publicacion: "",
    testimonio: "",
    acepta_terminos: false,
  });
  const [loading, setLoading] = useState(false);
  const [sent, setSent] = useState(false);
  const [error, setError] = useState("");

  function handleChange(e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) {
    const { name, value, type } = e.target;
    if (type === "checkbox") {
      setForm((prev) => ({ ...prev, [name]: (e.target as HTMLInputElement).checked }));
    } else {
      setForm((prev) => ({ ...prev, [name]: value }));
    }
  }

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    if (!form.acepta_terminos) {
      setError("Debés aceptar los términos y condiciones.");
      return;
    }
    setLoading(true);
    setError("");

    try {
      const res = await fetch("/api/contact-requests", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          full_name: form.nombre,
          email: form.email,
          phone: form.whatsapp || null,
          message: `${form.testimonio}\n\nCiudad: ${form.ciudad}\nPaís: ${form.pais}\nAutoriza publicación: ${form.autoriza_publicacion || "No especificado"}`,
          source: "testimonios",
        }),
      });

      if (!res.ok) {
        const data = await res.json().catch(() => ({}));
        throw new Error(data.error || "Error al enviar");
      }

      setSent(true);
      setForm({
        nombre: "",
        email: "",
        whatsapp: "",
        ciudad: "",
        pais: "",
        autoriza_publicacion: "",
        testimonio: "",
        acepta_terminos: false,
      });
    } catch (err: any) {
      setError(err.message || "Error al enviar. Intentá de nuevo.");
    } finally {
      setLoading(false);
    }
  }

  if (sent) {
    return (
      <div style={{ background: "#F5EDD6", minHeight: "100vh" }}>
        {/* Hero */}
        <section className="relative w-full py-20 md:py-28 px-4 flex flex-col items-center text-center overflow-hidden" style={{ background: "#1A3A5C" }}>
          <div className="absolute inset-0 opacity-10" style={{ backgroundImage: "repeating-linear-gradient(45deg, #B87333 0px, #B87333 1px, transparent 1px, transparent 60px)" }} />
          <div className="absolute bottom-0 left-0 right-0 h-20 pointer-events-none" style={{ background: "linear-gradient(to top, #F5EDD6, transparent)" }} />
          <h1 className="relative text-3xl md:text-5xl font-bold leading-tight mb-4 max-w-3xl" style={{ color: "#F5EDD6", fontFamily: "var(--font-cinzel, serif)" }}>
            Testimonios
          </h1>
          <p className="relative text-sm md:text-base max-w-xl leading-relaxed mb-8" style={{ color: "#B87333", fontFamily: "var(--font-lora, serif)" }}>
            Comparta su experiencia con la Fundación
          </p>
          <div className="relative h-px w-48" style={{ background: "linear-gradient(90deg, transparent, #B87333, transparent)" }} />
        </section>

        {/* Éxito */}
        <section className="max-w-4xl mx-auto px-4 py-20 text-center">
          <div className="rounded-2xl p-8 md:p-12 border-2" style={{ background: "linear-gradient(135deg, #e8dfc4 0%, #d4c9a8 100%)", borderColor: "#B87333", boxShadow: "0 4px 32px rgba(26,58,92,0.08)" }}>
            <FaCheckCircle size={48} className="mx-auto mb-4" style={{ color: "#B87333" }} />
            <h2 className="text-xl font-bold mb-3" style={{ color: "#1A3A5C", fontFamily: "var(--font-cinzel, serif)" }}>
              ¡Gracias!
            </h2>
            <p className="text-sm leading-relaxed" style={{ color: "#1A3A5C", fontFamily: "var(--font-lora, serif)" }}>
              Tu testimonio fue enviado. Será revisado y publicado próximamente.
            </p>
            <button
              onClick={() => setSent(false)}
              className="mt-6 px-6 py-2.5 text-sm tracking-widest uppercase rounded-full transition-opacity hover:opacity-90"
              style={{ background: "#1A3A5C", color: "#F5EDD6", fontFamily: "var(--font-cinzel, serif)" }}
            >
              Enviar otro
            </button>
          </div>
        </section>
      </div>
    );
  }

  return (
    <div style={{ background: "#F5EDD6", minHeight: "100vh" }}>
      {/* Hero */}
      <section className="relative w-full py-20 md:py-28 px-4 flex flex-col items-center text-center overflow-hidden" style={{ background: "#1A3A5C" }}>
        <div className="absolute inset-0 opacity-10" style={{ backgroundImage: "repeating-linear-gradient(45deg, #B87333 0px, #B87333 1px, transparent 1px, transparent 60px)" }} />
        <div className="absolute bottom-0 left-0 right-0 h-20 pointer-events-none" style={{ background: "linear-gradient(to top, #F5EDD6, transparent)" }} />
        <h1 className="relative text-3xl md:text-5xl font-bold leading-tight mb-4 max-w-3xl" style={{ color: "#F5EDD6", fontFamily: "var(--font-cinzel, serif)" }}>
          Testimonios
        </h1>
        <p className="relative text-sm md:text-base max-w-xl leading-relaxed mb-8" style={{ color: "#B87333", fontFamily: "var(--font-lora, serif)" }}>
          Comparta su experiencia con la Fundación
        </p>
        <div className="relative h-px w-48" style={{ background: "linear-gradient(90deg, transparent, #B87333, transparent)" }} />
      </section>

      {/* Formulario + Sidebar */}
      <section className="max-w-6xl mx-auto px-4 py-14">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10">
          {/* Sidebar */}
          <div className="lg:col-span-4 flex flex-col gap-6">
            <div className="rounded-xl p-5 border-2" style={{ background: "linear-gradient(135deg, #e8dfc4 0%, #d4c9a8 100%)", borderColor: "#B87333" }}>
              <div className="flex flex-col gap-3">
                <div className="flex flex-col gap-1">
                  <span className="text-[0.65rem] tracking-[0.2em] uppercase font-semibold" style={{ color: "#B87333", fontFamily: "var(--font-cinzel, serif)" }}>
                    Correo electrónico
                  </span>
                  <a href="mailto:galeonadecadiz@gmail.com" className="text-sm hover:opacity-80 transition-opacity" style={{ color: "#1A3A5C", fontFamily: "var(--font-lora, serif)" }}>
                    galeonadecadiz@gmail.com
                  </a>
                </div>
                <div className="flex flex-col gap-1">
                  <span className="text-[0.65rem] tracking-[0.2em] uppercase font-semibold" style={{ color: "#B87333", fontFamily: "var(--font-cinzel, serif)" }}>
                    WhatsApp
                  </span>
                  <a href="https://wa.me/573112524239" target="_blank" rel="noopener noreferrer" className="text-sm hover:opacity-80 transition-opacity" style={{ color: "#1A3A5C", fontFamily: "var(--font-lora, serif)" }}>
                    311 2524239
                  </a>
                </div>
              </div>
            </div>
          </div>

          {/* Formulario */}
          <div className="lg:col-span-8">
            <form onSubmit={handleSubmit} className="flex flex-col gap-3">
              {/* Nombre */}
              <div className="grid grid-cols-1 md:grid-cols-[200px_1fr] items-center gap-2">
                <label className="text-sm font-semibold" style={{ color: "#1A3A5C", fontFamily: "var(--font-cinzel, serif)" }}>
                  Nombre <span style={{ color: "#E8511A" }}>*</span>
                </label>
                <input name="nombre" type="text" required value={form.nombre} onChange={handleChange}
                  className="w-full rounded px-3 py-2 text-sm outline-none border focus:border-[#E8511A] transition-colors"
                  style={{ background: "#fff", borderColor: "rgba(184,115,51,0.5)", color: "#1A3A5C", fontFamily: "var(--font-lora, serif)" }} />
              </div>

              {/* E-mail */}
              <div className="grid grid-cols-1 md:grid-cols-[200px_1fr] items-center gap-2">
                <label className="text-sm font-semibold" style={{ color: "#1A3A5C", fontFamily: "var(--font-cinzel, serif)" }}>
                  E-mail
                </label>
                <input name="email" type="email" value={form.email} onChange={handleChange}
                  className="w-full rounded px-3 py-2 text-sm outline-none border focus:border-[#E8511A] transition-colors"
                  style={{ background: "#fff", borderColor: "rgba(184,115,51,0.5)", color: "#1A3A5C", fontFamily: "var(--font-lora, serif)" }} />
              </div>

              {/* Whatsapp */}
              <div className="grid grid-cols-1 md:grid-cols-[200px_1fr] items-center gap-2">
                <label className="text-sm font-semibold" style={{ color: "#1A3A5C", fontFamily: "var(--font-cinzel, serif)" }}>
                  Whatsapp
                </label>
                <input name="whatsapp" type="text" value={form.whatsapp} onChange={handleChange}
                  className="w-full rounded px-3 py-2 text-sm outline-none border focus:border-[#E8511A] transition-colors"
                  style={{ background: "#fff", borderColor: "rgba(184,115,51,0.5)", color: "#1A3A5C", fontFamily: "var(--font-lora, serif)" }} />
              </div>

              {/* Ciudad */}
              <div className="grid grid-cols-1 md:grid-cols-[200px_1fr] items-center gap-2">
                <label className="text-sm font-semibold" style={{ color: "#1A3A5C", fontFamily: "var(--font-cinzel, serif)" }}>
                  Ciudad
                </label>
                <input name="ciudad" type="text" value={form.ciudad} onChange={handleChange}
                  className="w-full rounded px-3 py-2 text-sm outline-none border focus:border-[#E8511A] transition-colors"
                  style={{ background: "#fff", borderColor: "rgba(184,115,51,0.5)", color: "#1A3A5C", fontFamily: "var(--font-lora, serif)" }} />
              </div>

              {/* País */}
              <div className="grid grid-cols-1 md:grid-cols-[200px_1fr] items-center gap-2">
                <label className="text-sm font-semibold" style={{ color: "#1A3A5C", fontFamily: "var(--font-cinzel, serif)" }}>
                  País
                </label>
                <input name="pais" type="text" value={form.pais} onChange={handleChange}
                  className="w-full rounded px-3 py-2 text-sm outline-none border focus:border-[#E8511A] transition-colors"
                  style={{ background: "#fff", borderColor: "rgba(184,115,51,0.5)", color: "#1A3A5C", fontFamily: "var(--font-lora, serif)" }} />
              </div>

              {/* Autorizo publicación */}
              <div className="grid grid-cols-1 md:grid-cols-[200px_1fr] items-center gap-2">
                <label className="text-sm font-semibold" style={{ color: "#1A3A5C", fontFamily: "var(--font-cinzel, serif)" }}>
                  Autorizo publicación
                </label>
                <select name="autoriza_publicacion" value={form.autoriza_publicacion} onChange={handleChange}
                  className="w-full rounded px-3 py-2 text-sm outline-none border focus:border-[#E8511A] transition-colors"
                  style={{ background: "#fff", borderColor: "rgba(184,115,51,0.5)", color: form.autoriza_publicacion ? "#1A3A5C" : "#B87333", fontFamily: "var(--font-lora, serif)" }}>
                  <option value="" disabled>Seleccionar...</option>
                  <option value="Sí">Sí</option>
                  <option value="No">No</option>
                </select>
              </div>

              {/* Testimonio */}
              <div className="grid grid-cols-1 md:grid-cols-[200px_1fr] gap-2">
                <label className="text-sm font-semibold" style={{ color: "#1A3A5C", fontFamily: "var(--font-cinzel, serif)" }}>
                  Testimonio
                </label>
                <textarea name="testimonio" rows={8} required value={form.testimonio} onChange={handleChange}
                  className="w-full rounded px-3 py-2 text-sm outline-none border focus:border-[#E8511A] transition-colors resize-none"
                  style={{ background: "#fff", borderColor: "rgba(184,115,51,0.5)", color: "#1A3A5C", fontFamily: "var(--font-lora, serif)" }} />
              </div>

              {/* Términos */}
              <div className="grid grid-cols-1 md:grid-cols-[200px_1fr] gap-2">
                <div />
                <label className="flex items-start gap-2 cursor-pointer">
                  <input type="checkbox" name="acepta_terminos" checked={form.acepta_terminos} onChange={handleChange}
                    className="flex-shrink-0 mt-0.5" style={{ accentColor: "#1A3A5C" }} />
                  <span className="text-sm leading-relaxed" style={{ color: "#1A3A5C", fontFamily: "var(--font-lora, serif)" }}>
                    Estoy de acuerdo con los términos y condiciones <span style={{ color: "#E8511A" }}>*</span>
                  </span>
                </label>
              </div>

              {/* Error */}
              {error && (
                <div className="grid grid-cols-1 md:grid-cols-[200px_1fr] gap-2">
                  <div />
                  <p className="text-sm" style={{ color: "#E8511A", fontFamily: "var(--font-lora, serif)" }}>
                    {error}
                  </p>
                </div>
              )}

              {/* Botón */}
              <div className="grid grid-cols-1 md:grid-cols-[200px_1fr] gap-2">
                <div />
                <div className="flex justify-end">
                  <button type="submit" disabled={loading}
                    className="px-8 py-2 rounded font-semibold tracking-widest uppercase text-sm transition-opacity hover:opacity-90 disabled:opacity-50"
                    style={{ background: "linear-gradient(90deg, #B87333, #E8511A)", color: "#F5EDD6", fontFamily: "var(--font-cinzel, serif)", letterSpacing: "0.15em" }}>
                    {loading ? "Enviando..." : "Enviar"}
                  </button>
                </div>
              </div>
            </form>
          </div>
        </div>
      </section>
    </div>
  );
}
