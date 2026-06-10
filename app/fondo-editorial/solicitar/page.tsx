"use client";

import { useState } from "react";
import Link from "next/link";

const PUBLICATIONS = [
  "Nuestra Señora de Chiquinquirá de La Estrella",
  "Canon Lector",
  "Lienzos Didácticos (Artium)",
  "Catálogo Wayuu (Artium)",
  "Guías y Lexicografías (Scriptorium)",
  "Otra publicación",
];

export default function SolicitarPublicacionesPage() {
  const [form, setForm] = useState({
    full_name: "",
    email: "",
    phone: "",
    city: "",
    country: "",
    publication: "",
    quantity: "1",
    message: "",
    accepted_terms: false,
  });
  const [status, setStatus] = useState<"idle" | "loading" | "success" | "error">("idle");
  const [errorMsg, setErrorMsg] = useState("");

  function handleChange(e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) {
    const { name, value, type } = e.target;
    setForm((prev) => ({
      ...prev,
      [name]: type === "checkbox" ? (e.target as HTMLInputElement).checked : value,
    }));
  }

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    if (!form.accepted_terms) {
      setErrorMsg("Debe aceptar el tratamiento de datos para continuar.");
      return;
    }
    setErrorMsg("");
    setStatus("loading");
    try {
      const res = await fetch("/api/publication-requests", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(form),
      });
      if (!res.ok) throw new Error("Error al enviar la solicitud");
      setStatus("success");
    } catch (err) {
      console.error(err);
      setErrorMsg("No se pudo enviar la solicitud. Intentá de nuevo.");
      setStatus("error");
    }
  }

  if (status === "success") {
    return (
      <div style={{ background: "#F5EDD6", minHeight: "100vh" }} className="flex items-center justify-center px-6 py-16">
        <div
          className="max-w-md w-full rounded-2xl p-8 text-center"
          style={{ background: "linear-gradient(135deg, #e8dfc4, #d4c9a8)", border: "2px solid #B87333" }}
        >
          <h2
            className="text-xl font-bold mb-3"
            style={{ color: "#1A3A5C", fontFamily: "var(--font-cinzel, serif)" }}
          >
            ¡Solicitud recibida!
          </h2>
          <p
            className="text-sm mb-6"
            style={{ color: "#1A3A5C", fontFamily: "var(--font-lora, serif)" }}
          >
            Nos comunicaremos con vos a la brevedad para coordinar el envío.
          </p>
          <Link
            href="/fondo-editorial"
            className="inline-block px-6 py-2.5 rounded-full text-white text-sm font-semibold"
            style={{ background: "linear-gradient(90deg, #E8511A, #B87333)", fontFamily: "var(--font-cinzel, serif)" }}
          >
            Volver al Fondo Editorial
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div style={{ background: "#F5EDD6", minHeight: "100vh" }}>
      <section className="py-14 px-6 text-center" style={{ background: "#1A3A5C" }}>
        <h1
          className="text-3xl font-bold text-white"
          style={{ fontFamily: "var(--font-cinzel, serif)" }}
        >
          Solicitar Publicaciones Impresas
        </h1>
        <p
          className="text-sm mt-3 max-w-xl mx-auto"
          style={{ color: "#d4c9a8", fontFamily: "var(--font-lora, serif)" }}
        >
          Completá el formulario y nos pondremos en contacto para coordinar el envío.
        </p>
      </section>

      <section className="max-w-xl mx-auto px-6 py-12">
        <form
          onSubmit={handleSubmit}
          className="flex flex-col gap-5 rounded-2xl p-6 md:p-8"
          style={{ background: "linear-gradient(135deg, #e8dfc4, #d4c9a8)", border: "2px solid #B87333" }}
        >
          {[
            { name: "full_name", label: "Nombre completo", type: "text", required: true },
            { name: "email", label: "Correo electrónico", type: "email", required: true },
            { name: "phone", label: "WhatsApp / Teléfono", type: "text", required: true },
            { name: "city", label: "Ciudad", type: "text", required: true },
            { name: "country", label: "País", type: "text", required: true },
          ].map(({ name, label, type, required }) => (
            <div key={name} className="flex flex-col gap-1">
              <label
                htmlFor={name}
                className="text-xs font-semibold tracking-widest uppercase"
                style={{ color: "#1A3A5C", fontFamily: "var(--font-cinzel, serif)" }}
              >
                {label}
              </label>
              <input
                id={name}
                name={name}
                type={type}
                required={required}
                value={(form as any)[name]}
                onChange={handleChange}
                className="w-full px-4 py-2.5 rounded-lg text-sm border outline-none focus:ring-2"
                style={{
                  background: "#F5EDD6",
                  border: "1.5px solid #B87333",
                  color: "#1A3A5C",
                  fontFamily: "var(--font-lora, serif)",
                }}
              />
            </div>
          ))}

          <div className="flex flex-col gap-1">
            <label
              htmlFor="publication"
              className="text-xs font-semibold tracking-widest uppercase"
              style={{ color: "#1A3A5C", fontFamily: "var(--font-cinzel, serif)" }}
            >
              Publicación solicitada
            </label>
            <select
              id="publication"
              name="publication"
              required
              value={form.publication}
              onChange={handleChange}
              className="w-full px-4 py-2.5 rounded-lg text-sm border outline-none"
              style={{
                background: "#F5EDD6",
                border: "1.5px solid #B87333",
                color: "#1A3A5C",
                fontFamily: "var(--font-lora, serif)",
              }}
            >
              <option value="">Seleccioná una publicación</option>
              {PUBLICATIONS.map((p) => (
                <option key={p} value={p}>{p}</option>
              ))}
            </select>
          </div>

          <div className="flex flex-col gap-1">
            <label
              htmlFor="quantity"
              className="text-xs font-semibold tracking-widest uppercase"
              style={{ color: "#1A3A5C", fontFamily: "var(--font-cinzel, serif)" }}
            >
              Cantidad
            </label>
            <input
              id="quantity"
              name="quantity"
              type="number"
              min="1"
              required
              value={form.quantity}
              onChange={handleChange}
              className="w-full px-4 py-2.5 rounded-lg text-sm border outline-none"
              style={{
                background: "#F5EDD6",
                border: "1.5px solid #B87333",
                color: "#1A3A5C",
                fontFamily: "var(--font-lora, serif)",
              }}
            />
          </div>

          <div className="flex flex-col gap-1">
            <label
              htmlFor="message"
              className="text-xs font-semibold tracking-widest uppercase"
              style={{ color: "#1A3A5C", fontFamily: "var(--font-cinzel, serif)" }}
            >
              Mensaje (opcional)
            </label>
            <textarea
              id="message"
              name="message"
              rows={3}
              value={form.message}
              onChange={handleChange}
              className="w-full px-4 py-2.5 rounded-lg text-sm border outline-none resize-none"
              style={{
                background: "#F5EDD6",
                border: "1.5px solid #B87333",
                color: "#1A3A5C",
                fontFamily: "var(--font-lora, serif)",
              }}
            />
          </div>

          <label className="flex items-start gap-3 cursor-pointer">
            <input
              type="checkbox"
              name="accepted_terms"
              checked={form.accepted_terms}
              onChange={handleChange}
              className="mt-0.5 flex-shrink-0"
            />
            <span
              className="text-xs leading-relaxed"
              style={{ color: "#1A3A5C", fontFamily: "var(--font-lora, serif)" }}
            >
              Acepto el tratamiento de mis datos personales conforme a la política de privacidad
              de la Fundación Social Galeona de Cádiz.
            </span>
          </label>

          {errorMsg && (
            <p
              className="text-xs px-4 py-2 rounded-lg"
              style={{ background: "#C0392B20", color: "#C0392B", border: "1px solid #C0392B" }}
            >
              {errorMsg}
            </p>
          )}

          <button
            type="submit"
            disabled={status === "loading"}
            className="w-full py-3 rounded-full text-white font-semibold tracking-widest uppercase text-sm transition-opacity hover:opacity-90 disabled:opacity-50"
            style={{
              background: "linear-gradient(90deg, #E8511A, #B87333)",
              fontFamily: "var(--font-cinzel, serif)",
            }}
          >
            {status === "loading" ? "Enviando..." : "Enviar solicitud"}
          </button>
        </form>
      </section>
    </div>
  );
}
