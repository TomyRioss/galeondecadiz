"use client";

import { useEffect, useState, useMemo } from "react";
import Link from "next/link";
import BookFlipViewerDynamic from "./BookFlipViewerDynamic";
import { Country, State, City } from "country-state-city";

interface Props {
  slug: string;
  bookNombre: string;
}

type Phase = "loading" | "form" | "viewer";

export default function EbookViewerClient({ slug, bookNombre }: Props) {
  const [phase, setPhase] = useState<Phase>("loading");
  const [pdfUrl, setPdfUrl] = useState<string | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [submitting, setSubmitting] = useState(false);
  const [checkingEmail, setCheckingEmail] = useState(false);

  const [form, setForm] = useState({
    full_name: "",
    email: "",
    phone: "",
    countryCode: "",
    stateCode: "",
    city: "",
    accepted_terms: false,
  });

  const allCountries = useMemo(() => Country.getAllCountries(), []);
  const states = useMemo(() => form.countryCode ? State.getStatesOfCountry(form.countryCode) : [], [form.countryCode]);
  const cities = useMemo(() => form.countryCode && form.stateCode ? City.getCitiesOfState(form.countryCode, form.stateCode) : [], [form.countryCode, form.stateCode]);

  // On mount: check if userId already in localStorage
  useEffect(() => {
    const userId = localStorage.getItem("ebookUserId");
    if (userId) {
      logAccess(userId);
    } else {
      setPhase("form");
    }
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  async function logAccess(userId: string) {
    try {
      const res = await fetch("/api/ebook/access", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ userId, bookSlug: slug, source: "web" }),
      });
      const data = await res.json();
      if (!res.ok) throw new Error(data.error);
      setPdfUrl(data.pdfUrl);
      setPhase("viewer");
    } catch {
      // userId inválido → forzar registro de nuevo
      localStorage.removeItem("ebookUserId");
      setPhase("form");
    }
  }

  async function handleEmailBlur() {
    const email = form.email.trim();
    if (!email || !email.includes("@")) return;
    setCheckingEmail(true);
    try {
      const res = await fetch("/api/ebook/check", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, slug }),
      });
      const data = await res.json();
      if (data.exists && data.userId) {
        localStorage.setItem("ebookUserId", data.userId);
        await logAccess(data.userId);
      }
    } catch {
      // silencioso — usuario completa form normalmente
    } finally {
      setCheckingEmail(false);
    }
  }

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    if (!form.accepted_terms) return;
    setSubmitting(true);
    setError(null);

    try {
      const countryName = Country.getCountryByCode(form.countryCode)?.name ?? form.countryCode;
      const stateName = form.stateCode ? State.getStateByCodeAndCountry(form.stateCode, form.countryCode)?.name ?? form.stateCode : "";
      const res = await fetch("/api/ebook/register", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ full_name: form.full_name, email: form.email, phone: form.phone, country: countryName, department: stateName, city: form.city, accepted_terms: form.accepted_terms, slug }),
      });
      const data = await res.json();
      if (!res.ok) throw new Error(data.error ?? "Error al registrar");

      localStorage.setItem("ebookUserId", data.userId);
      await logAccess(data.userId);
    } catch (err: any) {
      setError(err.message ?? "Error al registrar");
    } finally {
      setSubmitting(false);
    }
  }

  if (phase === "loading") {
    return (
      <div className="flex items-center justify-center min-h-screen" style={{ background: "#F5EDD6" }}>
        <div className="animate-spin w-10 h-10 rounded-full border-2" style={{ borderColor: "#B87333", borderTopColor: "transparent" }} />
      </div>
    );
  }

  if (phase === "form") {
    return (
      <div
        className="min-h-screen flex flex-col items-center justify-center px-4 py-12"
        style={{ background: "#F5EDD6" }}
      >
        <div
          className="w-full max-w-md rounded-2xl p-8 flex flex-col gap-6"
          style={{
            background: "linear-gradient(135deg, #e8dfc4 0%, #d4c9a8 100%)",
            border: "2px solid #B87333",
            boxShadow: "0 4px 32px rgba(26,58,92,0.10)",
          }}
        >
          {/* Header */}
          <div className="flex flex-col gap-1">
            <div className="flex items-start gap-3 mb-2">
              <div className="w-1 h-12 rounded-full flex-shrink-0" style={{ background: "linear-gradient(180deg, #E8511A, #B87333)" }} />
              <div>
                <p className="text-[0.6rem] tracking-[0.2em] uppercase font-semibold" style={{ color: "#B87333", fontFamily: "var(--font-cinzel, serif)" }}>
                  Acceso al e-book
                </p>
                <h2 className="text-xl font-bold leading-tight" style={{ color: "#1A3A5C", fontFamily: "var(--font-cinzel, serif)" }}>
                  {bookNombre}
                </h2>
              </div>
            </div>
            <p className="text-sm" style={{ color: "#1B6CA8", fontFamily: "var(--font-lora, serif)" }}>
              Registrate para leer el e-book en línea.
            </p>
          </div>

          <div className="h-px" style={{ background: "linear-gradient(90deg, transparent, #B87333, transparent)" }} />

          {/* Form */}
          <form onSubmit={handleSubmit} className="flex flex-col gap-4">
            {([
              { id: "full_name", label: "Nombre completo", type: "text", required: true },
              { id: "email",     label: "Correo electrónico", type: "email", required: true, onBlur: handleEmailBlur },
              { id: "phone",     label: "Teléfono", type: "tel", required: false },
            ] as any[]).map(({ id, label, type, required, onBlur }) => (
              <div key={id} className="flex flex-col gap-1">
                <label htmlFor={id} className="text-[0.65rem] tracking-[0.2em] uppercase font-semibold" style={{ color: "#B87333", fontFamily: "var(--font-cinzel, serif)" }}>
                  {label}{required && " *"}
                </label>
                <input
                  id={id} type={type} required={required}
                  value={(form as any)[id]}
                  onChange={(e) => setForm((f) => ({ ...f, [id]: e.target.value }))}
                  onBlur={onBlur}
                  className="rounded-xl px-4 py-2.5 text-sm outline-none focus:ring-2"
                  style={{ background: "#F5EDD6", border: "1.5px solid #B87333", color: "#1A3A5C", fontFamily: "var(--font-lora, serif)" }}
                />
              </div>
            ))}

            {/* País */}
            <div className="flex flex-col gap-1">
              <label htmlFor="countryCode" className="text-[0.65rem] tracking-[0.2em] uppercase font-semibold" style={{ color: "#B87333", fontFamily: "var(--font-cinzel, serif)" }}>
                País *
              </label>
              <select
                id="countryCode"
                required
                value={form.countryCode}
                onChange={(e) => setForm((f) => ({ ...f, countryCode: e.target.value, stateCode: "", city: "" }))}
                className="rounded-xl px-4 py-2.5 text-sm outline-none focus:ring-2"
                style={{ background: "#F5EDD6", border: "1.5px solid #B87333", color: "#1A3A5C", fontFamily: "var(--font-lora, serif)" }}
              >
                <option value="">Seleccionar país</option>
                {allCountries.map((c) => <option key={c.isoCode} value={c.isoCode}>{c.name}</option>)}
              </select>
            </div>

            {/* Estado / Región */}
            {form.countryCode && states.length > 0 && (
              <div className="flex flex-col gap-1">
                <label htmlFor="stateCode" className="text-[0.65rem] tracking-[0.2em] uppercase font-semibold" style={{ color: "#B87333", fontFamily: "var(--font-cinzel, serif)" }}>
                  {form.countryCode === "CO" ? "Departamento" : "Región / Estado / Provincia"}
                </label>
                <select
                  id="stateCode"
                  value={form.stateCode}
                  onChange={(e) => setForm((f) => ({ ...f, stateCode: e.target.value, city: "" }))}
                  className="rounded-xl px-4 py-2.5 text-sm outline-none focus:ring-2"
                  style={{ background: "#F5EDD6", border: "1.5px solid #B87333", color: "#1A3A5C", fontFamily: "var(--font-lora, serif)" }}
                >
                  <option value="">Seleccionar</option>
                  {states.map((s) => <option key={s.isoCode} value={s.isoCode}>{s.name}</option>)}
                </select>
              </div>
            )}

            {/* Ciudad */}
            {form.countryCode && (form.stateCode || states.length === 0) && (
              <div className="flex flex-col gap-1">
                <label htmlFor="city" className="text-[0.65rem] tracking-[0.2em] uppercase font-semibold" style={{ color: "#B87333", fontFamily: "var(--font-cinzel, serif)" }}>
                  Ciudad
                </label>
                {cities.length > 0 ? (
                  <select
                    id="city"
                    value={form.city}
                    onChange={(e) => setForm((f) => ({ ...f, city: e.target.value }))}
                    className="rounded-xl px-4 py-2.5 text-sm outline-none focus:ring-2"
                    style={{ background: "#F5EDD6", border: "1.5px solid #B87333", color: "#1A3A5C", fontFamily: "var(--font-lora, serif)" }}
                  >
                    <option value="">Seleccionar ciudad</option>
                    {cities.map((c) => <option key={c.name} value={c.name}>{c.name}</option>)}
                  </select>
                ) : (
                  <input
                    id="city" type="text"
                    value={form.city}
                    onChange={(e) => setForm((f) => ({ ...f, city: e.target.value }))}
                    className="rounded-xl px-4 py-2.5 text-sm outline-none focus:ring-2"
                    style={{ background: "#F5EDD6", border: "1.5px solid #B87333", color: "#1A3A5C", fontFamily: "var(--font-lora, serif)" }}
                  />
                )}
              </div>
            )}

            {/* Terms */}
            <label className="flex items-start gap-3 cursor-pointer">
              <input
                type="checkbox"
                checked={form.accepted_terms}
                onChange={(e) => setForm((f) => ({ ...f, accepted_terms: e.target.checked }))}
                className="mt-0.5 w-4 h-4 accent-[#B87333]"
                required
              />
              <span className="text-xs leading-relaxed" style={{ color: "#1B6CA8", fontFamily: "var(--font-lora, serif)" }}>
                Acepto los términos y condiciones de uso del contenido digital. *
              </span>
            </label>

            {error && (
              <p className="text-xs text-center" style={{ color: "#E8511A", fontFamily: "var(--font-lora, serif)" }}>
                {error}
              </p>
            )}

            <button
              type="submit"
              disabled={submitting || checkingEmail || !form.accepted_terms}
              className="rounded-full py-3 text-sm font-semibold tracking-widest uppercase transition-all hover:opacity-90 disabled:opacity-50"
              style={{
                background: "linear-gradient(90deg, #E8511A, #B87333)",
                color: "#F5EDD6",
                fontFamily: "var(--font-cinzel, serif)",
              }}
            >
              {checkingEmail ? "Verificando…" : submitting ? "Registrando…" : "Leer e-book"}
            </button>
          </form>

          <Link
            href={`/tienda/${slug}`}
            className="text-center text-xs hover:underline underline-offset-2"
            style={{ color: "#B87333", fontFamily: "var(--font-lora, serif)" }}
          >
            ← Volver al libro
          </Link>
        </div>
      </div>
    );
  }

  // Viewer
  return (
    <div className="flex flex-col" style={{ minHeight: "100vh", background: "#F5EDD6" }}>
      {/* Top bar */}
      <div
        className="flex items-center justify-between px-6 py-3 border-b"
        style={{ borderColor: "#B87333", background: "#0a1929" }}
      >
        <div className="flex items-center gap-3">
          <Link
            href={`/tienda/${slug}`}
            className="flex items-center gap-2 text-xs tracking-widest uppercase transition-opacity hover:opacity-70"
            style={{ color: "#B87333", fontFamily: "var(--font-cinzel, serif)" }}
          >
            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <path d="M19 12H5M12 5l-7 7 7 7"/>
            </svg>
            Volver
          </Link>
          <span className="text-sm font-semibold hidden md:block" style={{ color: "#F5EDD6", fontFamily: "var(--font-cinzel, serif)" }}>
            {bookNombre}
          </span>
        </div>
      </div>

      {/* Visor */}
      <div className="flex-1 flex items-center justify-center px-2 py-6 md:px-8 md:py-10">
        <div className="w-full max-w-6xl">
          {pdfUrl && <BookFlipViewerDynamic pdfUrl={pdfUrl} />}
        </div>
      </div>
    </div>
  );
}
