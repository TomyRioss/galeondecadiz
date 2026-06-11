"use client";

import { useState } from "react";
import { FaCheckCircle } from "react-icons/fa";

const COMO_SE_ENTERO = [
  "Redes Sociales",
  "Referido",
  "Búsqueda en Internet",
  "Evento",
  "Otro",
];

const SERVICIOS = [
  { id: "envio_libros", label: "Envío de libros por mensajería" },
  { id: "presupuesto_capacitaciones", label: "Presupuesto capacitaciones" },
  { id: "asistencia_juridica", label: "Asistencia Jurídica" },
  { id: "otros", label: "Otros" },
];

export default function ContactoPage() {
  const [form, setForm] = useState({
    nombre: "",
    email: "",
    whatsapp: "",
    ciudad: "",
    pais: "",
    como_se_entero: "",
    publicacion: "",
    cantidad_ejemplares: "",
    servicios: [] as string[],
    descripcion: "",
    acepta_terminos: false,
  });
  const [loading, setLoading] = useState(false);
  const [sent, setSent] = useState(false);
  const [error, setError] = useState("");

  function handleChange(e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) {
    const { name, value, type } = e.target;
    if (type === "checkbox") {
      const checked = (e.target as HTMLInputElement).checked;
      if (name === "acepta_terminos") {
        setForm((prev) => ({ ...prev, acepta_terminos: checked }));
      } else {
        setForm((prev) => ({
          ...prev,
          servicios: checked
            ? [...prev.servicios, value]
            : prev.servicios.filter((s) => s !== value),
        }));
      }
    } else {
      setForm((prev) => ({ ...prev, [name]: value }));
    }
  }

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    if (!form.acepta_terminos) {
      setError("Debe aceptar los términos y condiciones.");
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
          message: `${form.descripcion}\n\nCiudad: ${form.ciudad}\nPaís: ${form.pais}\nCómo se enteró: ${form.como_se_entero || "No especificado"}\nPublicación: ${form.publicacion || "No especificado"}\nCantidad ejemplares: ${form.cantidad_ejemplares || "No especificado"}\nServicios: ${form.servicios.join(", ") || "Ninguno"}`,
          source: "contacto",
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
        como_se_entero: "",
        publicacion: "",
        cantidad_ejemplares: "",
        servicios: [],
        descripcion: "",
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
            Contacto Institucional
          </h1>
          <p className="relative text-sm md:text-base max-w-xl leading-relaxed mb-8" style={{ color: "#B87333", fontFamily: "var(--font-lora, serif)" }}>
            Comuníquese con la Fundación Social Galeona de Cádiz
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
              Su mensaje fue enviado. Nos pondremos en contacto a la brevedad posible.
            </p>
            <button
              onClick={() => setSent(false)}
              className="mt-6 px-6 py-2.5 text-sm tracking-widest uppercase rounded-full transition-opacity hover:opacity-90"
              style={{ background: "#1A3A5C", color: "#F5EDD6", fontFamily: "var(--font-cinzel, serif)" }}
            >
              Enviar otro mensaje
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
          Contacto Institucional
        </h1>
        <p className="relative text-sm md:text-base max-w-xl leading-relaxed mb-8" style={{ color: "#B87333", fontFamily: "var(--font-lora, serif)" }}>
          Comuníquese con la Fundación Social Galeona de Cádiz
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
                  <a href="https://wa.me/573112524239?text=Cordial%20saludo%2C%20estoy%20interesado%20en%20el%20libro%20Nuestra%20Se%C3%B1ora%20de%20Chiquinquir%C3%A1%20de%20La%20Estrella." target="_blank" rel="noopener noreferrer" className="text-sm hover:opacity-80 transition-opacity" style={{ color: "#1A3A5C", fontFamily: "var(--font-lora, serif)" }}>
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

              {/* ¿Cómo se enteró? */}
              <div className="grid grid-cols-1 md:grid-cols-[200px_1fr] items-center gap-2">
                <label className="text-sm font-semibold" style={{ color: "#1A3A5C", fontFamily: "var(--font-cinzel, serif)" }}>
                  ¿Cómo se enteró?
                </label>
                <select name="como_se_entero" value={form.como_se_entero} onChange={handleChange}
                  className="w-full rounded px-3 py-2 text-sm outline-none border focus:border-[#E8511A] transition-colors"
                  style={{ background: "#fff", borderColor: "rgba(184,115,51,0.5)", color: form.como_se_entero ? "#1A3A5C" : "#B87333", fontFamily: "var(--font-lora, serif)" }}>
                  <option value="" disabled>Seleccione...</option>
                  {COMO_SE_ENTERO.map((o) => (
                    <option key={o} value={o} style={{ color: "#1A3A5C" }}>{o}</option>
                  ))}
                </select>
              </div>

              {/* Publicación solicitada */}
              <div className="grid grid-cols-1 md:grid-cols-[200px_1fr] items-center gap-2">
                <label className="text-sm font-semibold" style={{ color: "#1A3A5C", fontFamily: "var(--font-cinzel, serif)" }}>
                  Publicación solicitada
                </label>
                <input name="publicacion" type="text" value={form.publicacion} onChange={handleChange}
                  className="w-full rounded px-3 py-2 text-sm outline-none border focus:border-[#E8511A] transition-colors"
                  style={{ background: "#fff", borderColor: "rgba(184,115,51,0.5)", color: "#1A3A5C", fontFamily: "var(--font-lora, serif)" }} />
              </div>

              {/* Cant. de ejemplares */}
              <div className="grid grid-cols-1 md:grid-cols-[200px_1fr] items-center gap-2">
                <label className="text-sm font-semibold" style={{ color: "#1A3A5C", fontFamily: "var(--font-cinzel, serif)" }}>
                  Cant. de ejemplares
                </label>
                <input name="cantidad_ejemplares" type="number" min="1" value={form.cantidad_ejemplares} onChange={handleChange}
                  className="w-full rounded px-3 py-2 text-sm outline-none border focus:border-[#E8511A] transition-colors"
                  style={{ background: "#fff", borderColor: "rgba(184,115,51,0.5)", color: "#1A3A5C", fontFamily: "var(--font-lora, serif)" }} />
              </div>

              {/* Servicio solicitado */}
              <div className="grid grid-cols-1 md:grid-cols-[200px_1fr] gap-2">
                <label className="text-sm font-semibold" style={{ color: "#1A3A5C", fontFamily: "var(--font-cinzel, serif)" }}>
                  Servicio solicitado
                </label>
                <div className="flex flex-col gap-1">
                  {SERVICIOS.map((s) => (
                    <label key={s.id} className="flex items-center gap-2 cursor-pointer">
                      <input type="checkbox" name={s.id} value={s.id} checked={form.servicios.includes(s.id)} onChange={handleChange}
                        className="flex-shrink-0" style={{ accentColor: "#1A3A5C" }} />
                      <span className="text-sm" style={{ color: "#1A3A5C", fontFamily: "var(--font-lora, serif)" }}>
                        {s.label}
                      </span>
                    </label>
                  ))}
                </div>
              </div>

              {/* Descripción Solicitud */}
              <div className="grid grid-cols-1 md:grid-cols-[200px_1fr] gap-2">
                <label className="text-sm font-semibold" style={{ color: "#1A3A5C", fontFamily: "var(--font-cinzel, serif)" }}>
                  Descripción Solicitud
                </label>
                <textarea name="descripcion" rows={5} value={form.descripcion} onChange={handleChange}
                  className="w-full rounded px-3 py-2 text-sm outline-none border focus:border-[#E8511A] transition-colors resize-none"
                  style={{ background: "#fff", borderColor: "rgba(184,115,51,0.5)", color: "#1A3A5C", fontFamily: "var(--font-lora, serif)" }} />
              </div>

              {/* Términos y condiciones */}
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
