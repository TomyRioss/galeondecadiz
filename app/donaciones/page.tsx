"use client";

import { useState, lazy, Suspense } from "react";
import { FaHeart } from "react-icons/fa6";

const MercadoPagoWallet = lazy(() => import("@/app/components/ui/MercadoPagoWallet"));

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
  const [status, setStatus] = useState<"idle" | "loading" | "ready" | "error">("idle");
  const [errorMsg, setErrorMsg] = useState("");
  const [preferenceId, setPreferenceId] = useState<string | null>(null);

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
      const res = await fetch("/api/donations/checkout", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(form),
      });
      if (!res.ok) throw new Error("Error al crear pago");
      const data = await res.json();
      setPreferenceId(data.preference_id);
      setStatus("ready");
    } catch (err) {
      console.error(err);
      setErrorMsg("No se pudo iniciar el pago. Intentá de nuevo.");
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

      <section className="max-w-3xl mx-auto px-6 py-12">
        {/* Por qué donar */}
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
            <p className="text-xs italic" style={{ color: "#B87333" }}>
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

          {/* Wallet Brick aparece luego de crear preferencia */}
          {status === "ready" && preferenceId ? (
            <Suspense fallback={<div className="h-12 rounded-xl animate-pulse" style={{ background: "#009EE320" }} />}>
              <MercadoPagoWallet
                preferenceId={preferenceId}
                onError={() => {
                  setErrorMsg("Error al cargar el botón de pago. Intentá de nuevo.");
                  setStatus("error");
                }}
              />
            </Suspense>
          ) : (
            <button
              type="submit"
              disabled={status === "loading"}
              className="w-full py-3 rounded-xl text-white font-bold text-sm transition-opacity hover:opacity-90 disabled:opacity-50"
              style={{ background: "#009EE3", fontFamily: "var(--font-lora, serif)" }}
            >
              {status === "loading" ? "Preparando pago..." : (
                <span className="flex items-center justify-center gap-2">
                  <svg width="22" height="22" viewBox="0 0 64 64" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <circle cx="32" cy="32" r="32" fill="white"/>
                    <path d="M13 32.8C13 22.4 21.4 14 31.8 14C37 14 41.7 16.1 45.1 19.6L39.3 25.4C37.5 23.7 35.1 22.7 32.5 22.7C27.2 22.7 22.8 27.1 22.8 32.4C22.8 37.7 27.2 42.1 32.5 42.1C36.6 42.1 40.1 39.6 41.5 36H32.5V27.9H50.7C51 29.5 51.2 31.2 51.2 32.8C51.2 43.2 42.8 51.6 32.4 51.6C22 51.6 13 43.2 13 32.8Z" fill="#009EE3"/>
                  </svg>
                  Continuar con MercadoPago
                </span>
              )}
            </button>
          )}
        </form>
      </section>

    </div>
  );
}
