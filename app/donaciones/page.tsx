"use client";

import { useState } from "react";
import Link from "next/link";
import { FaHeart, FaWhatsapp } from "react-icons/fa6";

const WA_NUMBER = "";
const AMOUNTS = [10000, 20000, 50000, 100000];

export default function DonacionesPage() {
  const [form, setForm] = useState({
    full_name: "",
    email: "",
    phone: "",
    amount: "",
    message: "",
    accepted_terms: false,
  });
  const [status, setStatus] = useState<"idle" | "loading" | "success" | "error">("idle");
  const [errorMsg, setErrorMsg] = useState("");

  function handleChange(e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) {
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
      const res = await fetch("/api/donations", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(form),
      });
      if (!res.ok) throw new Error("Error al registrar donación");
      setStatus("success");
    } catch (err) {
      console.error(err);
      setErrorMsg("No se pudo registrar tu donación. Intentá de nuevo.");
      setStatus("error");
    }
  }

  const inputStyle = {
    background: "#F5EDD6",
    border: "1.5px solid #B87333",
    color: "#1A3A5C",
    fontFamily: "var(--font-lora, serif)",
  };
  const labelStyle = {
    color: "#1A3A5C",
    fontFamily: "var(--font-cinzel, serif)",
  };

  if (status === "success") {
    return (
      <div style={{ background: "#F5EDD6", minHeight: "100vh" }} className="flex items-center justify-center px-6 py-16">
        <div
          className="max-w-md w-full rounded-2xl p-8 text-center"
          style={{ background: "linear-gradient(135deg, #e8dfc4, #d4c9a8)", border: "2px solid #B87333" }}
        >
          <FaHeart size={32} className="mx-auto mb-4" style={{ color: "#B87333" }} />
          <h2
            className="text-xl font-bold mb-3"
            style={{ color: "#1A3A5C", fontFamily: "var(--font-cinzel, serif)" }}
          >
            ¡Gracias por tu donación!
          </h2>
          <p
            className="text-sm mb-6"
            style={{ color: "#1A3A5C", fontFamily: "var(--font-lora, serif)" }}
          >
            Registramos tu intención de donación. Nos comunicaremos contigo para coordinar el proceso.
          </p>
          <div className="flex flex-col gap-3">
            <a
              href={`https://wa.me/${WA_NUMBER}?text=${encodeURIComponent("Hola, acabo de registrar una donación en galeonadecadiz.org y quisiera confirmar el proceso.")}`}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center justify-center gap-2 px-6 py-2.5 rounded-full text-white text-sm font-semibold"
              style={{ background: "#2E6B3E", fontFamily: "var(--font-cinzel, serif)" }}
            >
              <FaWhatsapp size={14} />
              Confirmar por WhatsApp
            </a>
            <Link
              href="/"
              className="text-xs tracking-wide transition-colors hover:opacity-70"
              style={{ color: "#B87333", fontFamily: "var(--font-cinzel, serif)" }}
            >
              Volver al inicio
            </Link>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div style={{ background: "#F5EDD6", minHeight: "100vh" }}>

      {/* Hero */}
      <section className="py-14 px-6 text-center" style={{ background: "#1A3A5C" }}>
        <FaHeart size={32} style={{ color: "#B87333" }} className="mx-auto mb-3" />
        <h1
          className="text-3xl md:text-4xl font-bold text-white"
          style={{ fontFamily: "var(--font-cinzel, serif)" }}
        >
          Donaciones
        </h1>
        <p
          className="text-sm md:text-base mt-3 max-w-2xl mx-auto"
          style={{ color: "#d4c9a8", fontFamily: "var(--font-lora, serif)" }}
        >
          Tu apoyo hace posible que la Fundación Social Galeona de Cádiz continúe su labor
          editorial, cultural y espiritual. Cada donación contribuye al desarrollo de obras
          que fortalecen la identidad y el legado institucional.
        </p>
      </section>

      {/* Texto institucional — placeholder hasta que cliente entregue texto definitivo (C10) */}
      <section className="max-w-3xl mx-auto px-6 py-12">
        <div
          className="rounded-2xl p-6 md:p-8 mb-10"
          style={{ background: "linear-gradient(135deg, #e8dfc4, #d4c9a8)", border: "2px solid #B87333" }}
        >
          <h2
            className="text-lg font-bold mb-4"
            style={{ color: "#1A3A5C", fontFamily: "var(--font-cinzel, serif)" }}
          >
            ¿Por qué donar?
          </h2>
          <div
            className="flex flex-col gap-3 text-sm leading-relaxed"
            style={{ color: "#1A3A5C", fontFamily: "var(--font-lora, serif)" }}
          >
            <p>
              La Fundación Social Galeona de Cádiz trabaja incansablemente en la publicación
              y difusión de obras históricas, devocionales y pedagógicas que contribuyen al
              patrimonio cultural y espiritual de nuestra comunidad.
            </p>
            <p>
              Con tu donación apoyás la producción de nuevas publicaciones, la conservación
              del Fondo Editorial y el acceso libre a recursos culturales para quienes más
              lo necesitan.
            </p>
            <p
              className="text-xs italic"
              style={{ color: "#B87333" }}
            >
              * Texto definitivo pendiente de entrega por el cliente.
            </p>
          </div>
        </div>

        {/* Montos sugeridos */}
        <div className="mb-8">
          <p
            className="text-xs tracking-widest uppercase mb-4"
            style={{ color: "#B87333", fontFamily: "var(--font-cinzel, serif)" }}
          >
            Montos sugeridos (COP)
          </p>
          <div className="flex flex-wrap gap-3">
            {AMOUNTS.map((a) => (
              <button
                key={a}
                type="button"
                onClick={() => setForm((prev) => ({ ...prev, amount: String(a) }))}
                className="px-5 py-2 rounded-full text-sm font-semibold transition-all"
                style={{
                  background: form.amount === String(a) ? "#1A3A5C" : "transparent",
                  color: form.amount === String(a) ? "#F5EDD6" : "#1A3A5C",
                  border: "1.5px solid #B87333",
                  fontFamily: "var(--font-cinzel, serif)",
                }}
              >
                ${a.toLocaleString("es-CO")}
              </button>
            ))}
          </div>
        </div>

        {/* Formulario */}
        <form
          onSubmit={handleSubmit}
          className="flex flex-col gap-5 rounded-2xl p-6 md:p-8"
          style={{ background: "linear-gradient(135deg, #e8dfc4, #d4c9a8)", border: "2px solid #B87333" }}
        >
          {[
            { name: "full_name", label: "Nombre completo", type: "text" },
            { name: "email", label: "Correo electrónico", type: "email" },
            { name: "phone", label: "WhatsApp / Teléfono", type: "text" },
          ].map(({ name, label, type }) => (
            <div key={name} className="flex flex-col gap-1">
              <label
                htmlFor={name}
                className="text-xs font-semibold tracking-widest uppercase"
                style={labelStyle}
              >
                {label}
              </label>
              <input
                id={name}
                name={name}
                type={type}
                required
                value={(form as any)[name]}
                onChange={handleChange}
                className="w-full px-4 py-2.5 rounded-lg text-sm border outline-none"
                style={inputStyle}
              />
            </div>
          ))}

          <div className="flex flex-col gap-1">
            <label
              htmlFor="amount"
              className="text-xs font-semibold tracking-widest uppercase"
              style={labelStyle}
            >
              Monto (COP)
            </label>
            <input
              id="amount"
              name="amount"
              type="number"
              min="1000"
              required
              value={form.amount}
              onChange={handleChange}
              className="w-full px-4 py-2.5 rounded-lg text-sm border outline-none"
              style={inputStyle}
              placeholder="Ej: 50000"
            />
          </div>

          <div className="flex flex-col gap-1">
            <label
              htmlFor="message"
              className="text-xs font-semibold tracking-widest uppercase"
              style={labelStyle}
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
              style={inputStyle}
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
            {status === "loading" ? "Registrando..." : "Registrar donación"}
          </button>
        </form>
      </section>

    </div>
  );
}
