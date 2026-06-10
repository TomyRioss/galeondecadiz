"use client";

import { useState } from "react";
import { FaLock, FaBookOpen } from "react-icons/fa6";

// PDF URL stored server-side — never exposed as public download (V4)
// Will be replaced with signed URL from Supabase Storage once T26/T27 approved
const EBOOK_VIEWER_URL: Record<string, string | null> = {
  "nuestra-senora-de-chiquinquira": null, // placeholder until client delivers PDF
};

const BOOK_TITLES: Record<string, string> = {
  "nuestra-senora-de-chiquinquira": "Nuestra Señora de Chiquinquirá de La Estrella",
};

type Step = "check" | "register" | "viewer";

interface EbookAccessProps {
  slug: string;
}

export default function EbookAccess({ slug }: EbookAccessProps) {
  const title = BOOK_TITLES[slug] ?? "E-Book";
  const [step, setStep] = useState<Step>("check");
  const [checkEmail, setCheckEmail] = useState("");
  const [form, setForm] = useState({
    full_name: "",
    email: "",
    phone: "",
    city: "",
    country: "",
    accepted_terms: false,
  });
  const [loading, setLoading] = useState(false);
  const [errorMsg, setErrorMsg] = useState("");
  const [viewerUrl, setViewerUrl] = useState<string | null>(null);

  function handleFormChange(e: React.ChangeEvent<HTMLInputElement>) {
    const { name, value, type } = e.target;
    setForm((prev) => ({
      ...prev,
      [name]: type === "checkbox" ? e.target.checked : value,
    }));
  }

  async function handleCheckEmail(e: React.FormEvent) {
    e.preventDefault();
    if (!checkEmail.trim()) return;
    setLoading(true);
    setErrorMsg("");
    try {
      const res = await fetch("/api/ebook/check", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email: checkEmail, slug }),
      });
      const data = await res.json();
      if (!res.ok) throw new Error(data.error ?? "Error");
      if (data.exists) {
        setViewerUrl(data.viewerUrl ?? null);
        setStep("viewer");
      } else {
        setForm((prev) => ({ ...prev, email: checkEmail }));
        setStep("register");
      }
    } catch (err) {
      console.error(err);
      setErrorMsg("No se pudo verificar el correo. Intentá de nuevo.");
    } finally {
      setLoading(false);
    }
  }

  async function handleRegister(e: React.FormEvent) {
    e.preventDefault();
    if (!form.accepted_terms) {
      setErrorMsg("Debe aceptar el tratamiento de datos para continuar.");
      return;
    }
    setErrorMsg("");
    setLoading(true);
    try {
      const res = await fetch("/api/ebook/register", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ ...form, slug }),
      });
      const data = await res.json();
      if (!res.ok) throw new Error(data.error ?? "Error");
      setViewerUrl(data.viewerUrl ?? null);
      setStep("viewer");
    } catch (err) {
      console.error(err);
      setErrorMsg("No se pudo completar el registro. Intentá de nuevo.");
    } finally {
      setLoading(false);
    }
  }

  const inputClass = "w-full px-4 py-2.5 rounded-lg text-sm border outline-none";
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
  const cardStyle = {
    background: "linear-gradient(135deg, #e8dfc4, #d4c9a8)",
    border: "2px solid #B87333",
  };

  return (
    <div style={{ background: "#F5EDD6", minHeight: "100vh" }}>
      <section className="py-12 px-6 text-center" style={{ background: "#1A3A5C" }}>
        <FaBookOpen size={32} style={{ color: "#B87333" }} className="mx-auto mb-3" />
        <h1
          className="text-2xl md:text-3xl font-bold text-white"
          style={{ fontFamily: "var(--font-cinzel, serif)" }}
        >
          {title}
        </h1>
        <p
          className="text-sm mt-2"
          style={{ color: "#d4c9a8", fontFamily: "var(--font-lora, serif)" }}
        >
          Lectura online — Fondo Editorial Galeona de Cádiz
        </p>
      </section>

      <section className="max-w-lg mx-auto px-6 py-12">

        {/* Step 1: verificar email */}
        {step === "check" && (
          <form
            onSubmit={handleCheckEmail}
            className="flex flex-col gap-5 rounded-2xl p-6 md:p-8"
            style={cardStyle}
          >
            <div className="flex items-center gap-2 mb-1">
              <FaLock size={14} style={{ color: "#B87333" }} />
              <span
                className="text-xs tracking-widest uppercase"
                style={labelStyle}
              >
                Acceso al e-book
              </span>
            </div>
            <p
              className="text-sm leading-relaxed"
              style={{ color: "#1A3A5C", fontFamily: "var(--font-lora, serif)" }}
            >
              Ingresá tu correo electrónico. Si ya te registraste, accedés directamente al visor.
            </p>

            <div className="flex flex-col gap-1">
              <label
                htmlFor="check_email"
                className="text-xs font-semibold tracking-widest uppercase"
                style={labelStyle}
              >
                Correo electrónico
              </label>
              <input
                id="check_email"
                type="email"
                required
                value={checkEmail}
                onChange={(e) => setCheckEmail(e.target.value)}
                className={inputClass}
                style={inputStyle}
                placeholder="tu@correo.com"
              />
            </div>

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
              disabled={loading}
              className="w-full py-3 rounded-full text-white font-semibold tracking-widest uppercase text-sm transition-opacity hover:opacity-90 disabled:opacity-50"
              style={{ background: "linear-gradient(90deg, #E8511A, #B87333)", fontFamily: "var(--font-cinzel, serif)" }}
            >
              {loading ? "Verificando..." : "Continuar"}
            </button>
          </form>
        )}

        {/* Step 2: registrar datos completos */}
        {step === "register" && (
          <form
            onSubmit={handleRegister}
            className="flex flex-col gap-5 rounded-2xl p-6 md:p-8"
            style={cardStyle}
          >
            <p
              className="text-sm"
              style={{ color: "#1A3A5C", fontFamily: "var(--font-lora, serif)" }}
            >
              Primera vez. Completá tus datos para acceder al e-book.
            </p>

            {[
              { name: "full_name", label: "Nombre completo", type: "text" },
              { name: "email", label: "Correo electrónico", type: "email" },
              { name: "phone", label: "WhatsApp", type: "text" },
              { name: "city", label: "Ciudad", type: "text" },
              { name: "country", label: "País", type: "text" },
            ].map(({ name, label, type }) => (
              <div key={name} className="flex flex-col gap-1">
                <label
                  htmlFor={`reg_${name}`}
                  className="text-xs font-semibold tracking-widest uppercase"
                  style={labelStyle}
                >
                  {label}
                </label>
                <input
                  id={`reg_${name}`}
                  name={name}
                  type={type}
                  required
                  value={(form as any)[name]}
                  onChange={handleFormChange}
                  className={inputClass}
                  style={inputStyle}
                />
              </div>
            ))}

            <label className="flex items-start gap-3 cursor-pointer">
              <input
                type="checkbox"
                name="accepted_terms"
                checked={form.accepted_terms}
                onChange={handleFormChange}
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
              disabled={loading}
              className="w-full py-3 rounded-full text-white font-semibold tracking-widest uppercase text-sm transition-opacity hover:opacity-90 disabled:opacity-50"
              style={{ background: "linear-gradient(90deg, #E8511A, #B87333)", fontFamily: "var(--font-cinzel, serif)" }}
            >
              {loading ? "Registrando..." : "Acceder al e-book"}
            </button>
          </form>
        )}

        {/* Step 3: visor */}
        {step === "viewer" && (
          <div className="flex flex-col gap-6">
            {viewerUrl ? (
              <div
                className="rounded-2xl overflow-hidden"
                style={{ border: "2px solid #B87333", height: "75vh" }}
              >
                <iframe
                  src={viewerUrl}
                  className="w-full h-full"
                  title={title}
                  allow="fullscreen"
                />
              </div>
            ) : (
              <div
                className="rounded-2xl p-8 text-center"
                style={cardStyle}
              >
                <FaBookOpen size={40} className="mx-auto mb-4" style={{ color: "#B87333" }} />
                <h2
                  className="text-lg font-bold mb-2"
                  style={{ color: "#1A3A5C", fontFamily: "var(--font-cinzel, serif)" }}
                >
                  ¡Acceso habilitado!
                </h2>
                <p
                  className="text-sm leading-relaxed"
                  style={{ color: "#1A3A5C", fontFamily: "var(--font-lora, serif)" }}
                >
                  El e-book estará disponible próximamente. Te notificaremos cuando esté listo.
                </p>
              </div>
            )}
          </div>
        )}

      </section>
    </div>
  );
}
