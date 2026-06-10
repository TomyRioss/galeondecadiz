"use client";

import { useState } from "react";

const AREAS = [
  "Consultoría Profesional",
  "Producción de Contenidos",
  "Desarrollo de Plataformas",
  "Escuela de Nazaret (EDN)",
  "Tecnocampus Virtual San Cayetano (TSC)",
  "Centro Iuris Doña Isabel de Castilla (CIDIC)",
  "Canon Lector / Editorial",
  "Otra consulta",
];

const DATOS = [
  { label: "Correo electrónico", valor: "contactenos@galeonadecadiz.org", href: "mailto:contactenos@galeonadecadiz.org" },
  { label: "Ciudad", valor: "Bogotá, Colombia" },
  { label: "NIT", valor: "900.544.600 – 9" },
  { label: "Cámara de Comercio de Bogotá", valor: "Registro No: S0042967" },
  { label: "Control y vigilancia", valor: "Secretaría de Gobierno — Alcaldía de Bogotá · Reg. 56030" },
  { label: "Fundador", valor: "Álvaro Gallón Rodríguez" },
];

export default function ContactoPage() {
  const [form, setForm] = useState({ nombre: "", email: "", area: "", mensaje: "" });

  function handleChange(e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) {
    setForm((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  }

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    // TODO: conectar backend
    console.log("Consulta enviada:", form);
  }

  return (
    <div style={{ background: "#F5EDD6", minHeight: "100vh" }}>

      {/* HERO */}
      <section
        className="relative w-full py-16 md:py-24 px-4 flex flex-col items-center text-center overflow-hidden"
        style={{ background: "#1A3A5C" }}
      >
        <div
          className="absolute inset-0 opacity-10"
          style={{
            backgroundImage:
              "repeating-linear-gradient(45deg, #B87333 0px, #B87333 1px, transparent 1px, transparent 60px)",
          }}
        />
        <p
          className="text-xs tracking-[0.35em] uppercase mb-3"
          style={{ color: "#B87333", fontFamily: "var(--font-cinzel, serif)" }}
        >
          NIT: 900.544.600 – 9 · Bogotá, Colombia
        </p>
        <h1
          className="text-3xl md:text-5xl font-bold leading-tight mb-4 max-w-3xl"
          style={{ color: "#F5EDD6", fontFamily: "var(--font-cinzel, serif)" }}
        >
          Contacto Institucional
        </h1>
        <p
          className="text-sm md:text-base max-w-xl leading-relaxed mb-8"
          style={{ color: "#B87333", fontFamily: "var(--font-lora, serif)" }}
        >
          Comuníquese con la Fundación Social Galeona de Cádiz
        </p>
        <div
          className="h-px w-40"
          style={{ background: "linear-gradient(90deg, transparent, #B87333, transparent)" }}
        />
      </section>

      {/* DATOS DE CONTACTO */}
      <section className="max-w-4xl mx-auto px-4 py-14">
        <div className="flex items-center gap-4 mb-8">
          <div
            className="w-1 h-12 rounded-full flex-shrink-0"
            style={{ background: "linear-gradient(180deg, #E8511A, #B87333)" }}
          />
          <h2
            className="text-xl md:text-2xl font-bold tracking-widest uppercase"
            style={{ color: "#1A3A5C", fontFamily: "var(--font-cinzel, serif)" }}
          >
            Datos de Contacto
          </h2>
        </div>

        <div
          className="rounded-2xl p-6 md:p-10 border-2"
          style={{
            background: "linear-gradient(135deg, #e8dfc4 0%, #d4c9a8 100%)",
            borderColor: "#B87333",
          }}
        >
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {DATOS.map(({ label, valor, href }) => (
              <div key={label} className="flex flex-col gap-1">
                <span
                  className="text-[0.65rem] tracking-[0.2em] uppercase font-semibold"
                  style={{ color: "#B87333", fontFamily: "var(--font-cinzel, serif)" }}
                >
                  {label}
                </span>
                {href ? (
                  <a
                    href={href}
                    className="text-sm leading-relaxed underline underline-offset-2 hover:opacity-80 transition-opacity"
                    style={{ color: "#1A3A5C", fontFamily: "var(--font-lora, serif)" }}
                  >
                    {valor}
                  </a>
                ) : (
                  <span
                    className="text-sm leading-relaxed"
                    style={{ color: "#1A3A5C", fontFamily: "var(--font-lora, serif)" }}
                  >
                    {valor}
                  </span>
                )}
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* SEPARADOR */}
      <div className="flex justify-center px-4">
        <div className="w-full max-w-4xl h-px" style={{ background: "linear-gradient(90deg, transparent, #B87333, transparent)" }} />
      </div>

      {/* FORMULARIO */}
      <section className="max-w-4xl mx-auto px-4 py-14">
        <div className="flex items-center gap-4 mb-3">
          <div
            className="w-1 h-12 rounded-full flex-shrink-0"
            style={{ background: "linear-gradient(180deg, #E8511A, #B87333)" }}
          />
          <h2
            className="text-xl md:text-2xl font-bold tracking-widest uppercase"
            style={{ color: "#1A3A5C", fontFamily: "var(--font-cinzel, serif)" }}
          >
            Envíe su Consulta
          </h2>
        </div>
        <p
          className="text-sm mb-8 ml-5 max-w-2xl leading-relaxed"
          style={{ color: "#1B6CA8", fontFamily: "var(--font-lora, serif)" }}
        >
          Complete el formulario y nos pondremos en contacto a la brevedad posible.
        </p>

        <form
          onSubmit={handleSubmit}
          className="rounded-2xl p-6 md:p-10 border-2 flex flex-col gap-6"
          style={{
            background: "linear-gradient(135deg, #e8dfc4 0%, #d4c9a8 100%)",
            borderColor: "#B87333",
          }}
        >
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {/* Nombre */}
            <div className="flex flex-col gap-2">
              <label
                htmlFor="nombre"
                className="text-[0.65rem] tracking-[0.2em] uppercase font-semibold"
                style={{ color: "#B87333", fontFamily: "var(--font-cinzel, serif)" }}
              >
                Nombre completo
              </label>
              <input
                id="nombre"
                name="nombre"
                type="text"
                placeholder="Su nombre"
                value={form.nombre}
                onChange={handleChange}
                required
                className="w-full rounded-lg px-4 py-3 text-sm outline-none border focus:border-[#E8511A] transition-colors"
                style={{
                  background: "#F5EDD6",
                  borderColor: "#B87333",
                  color: "#1A3A5C",
                  fontFamily: "var(--font-lora, serif)",
                }}
              />
            </div>

            {/* Email */}
            <div className="flex flex-col gap-2">
              <label
                htmlFor="email"
                className="text-[0.65rem] tracking-[0.2em] uppercase font-semibold"
                style={{ color: "#B87333", fontFamily: "var(--font-cinzel, serif)" }}
              >
                Correo electrónico
              </label>
              <input
                id="email"
                name="email"
                type="email"
                placeholder="su@correo.com"
                value={form.email}
                onChange={handleChange}
                required
                className="w-full rounded-lg px-4 py-3 text-sm outline-none border focus:border-[#E8511A] transition-colors"
                style={{
                  background: "#F5EDD6",
                  borderColor: "#B87333",
                  color: "#1A3A5C",
                  fontFamily: "var(--font-lora, serif)",
                }}
              />
            </div>
          </div>

          {/* Área */}
          <div className="flex flex-col gap-2">
            <label
              htmlFor="area"
              className="text-[0.65rem] tracking-[0.2em] uppercase font-semibold"
              style={{ color: "#B87333", fontFamily: "var(--font-cinzel, serif)" }}
            >
              Área de consulta
            </label>
            <select
              id="area"
              name="area"
              value={form.area}
              onChange={handleChange}
              required
              className="w-full rounded-lg px-4 py-3 text-sm outline-none border focus:border-[#E8511A] transition-colors"
              style={{
                background: "#F5EDD6",
                borderColor: "#B87333",
                color: form.area ? "#1A3A5C" : "#B87333",
                fontFamily: "var(--font-lora, serif)",
              }}
            >
              <option value="" disabled>Seleccione un área</option>
              {AREAS.map((a) => (
                <option key={a} value={a} style={{ color: "#1A3A5C" }}>{a}</option>
              ))}
            </select>
          </div>

          {/* Mensaje */}
          <div className="flex flex-col gap-2">
            <label
              htmlFor="mensaje"
              className="text-[0.65rem] tracking-[0.2em] uppercase font-semibold"
              style={{ color: "#B87333", fontFamily: "var(--font-cinzel, serif)" }}
            >
              Mensaje
            </label>
            <textarea
              id="mensaje"
              name="mensaje"
              rows={5}
              placeholder="Describa su consulta..."
              value={form.mensaje}
              onChange={handleChange}
              required
              className="w-full rounded-lg px-4 py-3 text-sm outline-none border focus:border-[#E8511A] transition-colors resize-none"
              style={{
                background: "#F5EDD6",
                borderColor: "#B87333",
                color: "#1A3A5C",
                fontFamily: "var(--font-lora, serif)",
              }}
            />
          </div>

          <div className="flex justify-end">
            <button
              type="submit"
              className="px-8 py-3 rounded-full font-semibold tracking-widest uppercase text-sm transition-opacity hover:opacity-90 shadow-md"
              style={{
                background: "linear-gradient(90deg, #E8511A, #B87333)",
                color: "#F5EDD6",
                fontFamily: "var(--font-cinzel, serif)",
                letterSpacing: "0.15em",
              }}
            >
              Enviar consulta
            </button>
          </div>
        </form>
      </section>

    </div>
  );
}
