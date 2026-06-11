"use client";

import { useState, useEffect, Suspense } from "react";
import { useSearchParams } from "next/navigation";

type BookData = { nombre: string; precioCop: number; precioUsd: number; coverUrl: string | null };

function CheckoutContent() {
  const searchParams = useSearchParams();
  const slug = searchParams.get("slug");
  const [book, setBook] = useState<BookData | null>(null);

  useEffect(() => {
    if (!slug) return;
    fetch(`/api/libros/${slug}`)
      .then((r) => r.json())
      .then((d) => {
        if (d.book) setBook({ nombre: d.book.nombre, precioCop: Number(d.book.precioCop), precioUsd: Number(d.book.precioUsd), coverUrl: d.book.coverUrl ?? null });
      })
      .catch(() => null);
  }, [slug]);

  const [form, setForm] = useState({
    nombre: "",
    email: "",
    telefono: "",
    ciudad: "",
    pais: "",
    direccion_envio: "",
    cantidad: "1",
    observaciones: "",
    acepta_datos: false,
  });
  const [loading, setLoading] = useState(false);
  const [sent, setSent] = useState(false);
  const [error, setError] = useState("");
  const [focused, setFocused] = useState<string | null>(null);

  function handleChange(e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) {
    const { name, value, type } = e.target;
    if (type === "checkbox") {
      setForm((prev) => ({ ...prev, [name]: (e.target as HTMLInputElement).checked }));
    } else {
      setForm((prev) => ({ ...prev, [name]: value }));
    }
  }

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    if (!form.acepta_datos) {
      setError("Debe aceptar el tratamiento de datos personales.");
      return;
    }
    if (!slug) {
      setError("No se encontró el libro. Volvé a la tienda.");
      return;
    }
    setLoading(true);
    setError("");
    try {
      const res = await fetch("/api/checkout", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          bookSlug: slug,
          buyerName: form.nombre,
          buyerEmail: form.email,
          moneda: "COP",
        }),
      });
      if (!res.ok) {
        const data = await res.json().catch(() => ({}));
        throw new Error(data.error || "Error al procesar el pago");
      }
      const { initPoint } = await res.json();
      window.location.href = initPoint;
    } catch (err: unknown) {
      setError(err instanceof Error ? err.message : "Error al procesar. Intentá de nuevo.");
    } finally {
      setLoading(false);
    }
  }

  if (sent) {
    return (
      <div className="checkout-success" style={{ background: "#F5EDD6", minHeight: "100vh", display: "flex", alignItems: "center", justifyContent: "center", padding: "2rem" }}>
        <style>{`
          @keyframes scaleIn {
            from { transform: scale(0.8); opacity: 0; }
            to { transform: scale(1); opacity: 1; }
          }
          @keyframes drawCheck {
            from { stroke-dashoffset: 100; }
            to { stroke-dashoffset: 0; }
          }
          .success-card {
            animation: scaleIn 0.5s cubic-bezier(0.34, 1.56, 0.64, 1) forwards;
          }
        `}</style>
        <div className="success-card" style={{ maxWidth: 480, width: "100%", textAlign: "center" }}>
          <div style={{
            width: 80, height: 80, borderRadius: "50%", margin: "0 auto 2rem",
            background: "linear-gradient(135deg, #1A3A5C, #1F4FA3)",
            display: "flex", alignItems: "center", justifyContent: "center",
            boxShadow: "0 20px 60px rgba(26,58,92,0.3)"
          }}>
            <svg width="36" height="36" viewBox="0 0 36 36" fill="none">
              <path d="M8 18l7 7 13-13" stroke="#B87333" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"
                strokeDasharray="100" strokeDashoffset="0" style={{ animation: "drawCheck 0.6s 0.3s ease forwards" }} />
            </svg>
          </div>
          <h2 style={{ fontFamily: "var(--font-cinzel, serif)", color: "#1A3A5C", fontSize: "1.75rem", marginBottom: "1rem", letterSpacing: "0.05em" }}>
            Solicitud Enviada
          </h2>
          <p style={{ fontFamily: "var(--font-lora, serif)", color: "#B87333", fontSize: "0.95rem", lineHeight: 1.8, marginBottom: "2rem" }}>
            Nos pondremos en contacto a la brevedad para coordinar el pago y envío de su pedido.
          </p>
          <div style={{
            padding: "1.25rem 2rem", borderRadius: "0.75rem", border: "1px solid rgba(184,115,51,0.3)",
            background: "linear-gradient(135deg, #e8dfc4, #d4c9a8)", marginBottom: "2rem"
          }}>
            <p style={{ fontFamily: "var(--font-lora, serif)", color: "#1A3A5C", fontSize: "0.8rem", lineHeight: 1.7 }}>
              Recibirá un correo de confirmación en <strong>{form.email || "su correo"}</strong>
            </p>
          </div>
          <button onClick={() => setSent(false)} style={{
            fontFamily: "var(--font-cinzel, serif)", fontSize: "0.7rem", letterSpacing: "0.2em",
            textTransform: "uppercase", color: "#1A3A5C", background: "transparent",
            border: "1.5px solid #B87333", borderRadius: "9999px", padding: "0.75rem 2rem",
            cursor: "pointer", transition: "all 0.2s"
          }}>
            Nueva solicitud
          </button>
        </div>
      </div>
    );
  }

  const inputStyle = (name: string) => ({
    width: "100%",
    background: focused === name ? "#fff" : "rgba(245,237,214,0.6)",
    border: `1.5px solid ${focused === name ? "#E8511A" : "rgba(184,115,51,0.4)"}`,
    borderRadius: "0.5rem",
    padding: "0.875rem 1rem",
    fontSize: "0.9rem",
    color: "#1A3A5C",
    fontFamily: "var(--font-lora, serif)",
    outline: "none",
    transition: "all 0.2s",
    boxShadow: focused === name ? "0 0 0 3px rgba(232,81,26,0.1)" : "none",
  });

  const labelStyle = {
    display: "block",
    fontFamily: "var(--font-cinzel, serif)",
    fontSize: "0.6rem",
    letterSpacing: "0.2em",
    textTransform: "uppercase" as const,
    color: "#B87333",
    marginBottom: "0.4rem",
    fontWeight: 600,
  };

  return (
    <>
      <style>{`
        @keyframes fadeUp {
          from { opacity: 0; transform: translateY(16px); }
          to { opacity: 1; transform: translateY(0); }
        }
        .field-group { animation: fadeUp 0.4s ease forwards; opacity: 0; }
        .field-group:nth-child(1) { animation-delay: 0.05s; }
        .field-group:nth-child(2) { animation-delay: 0.1s; }
        .field-group:nth-child(3) { animation-delay: 0.15s; }
        .field-group:nth-child(4) { animation-delay: 0.2s; }
        .field-group:nth-child(5) { animation-delay: 0.25s; }
        .field-group:nth-child(6) { animation-delay: 0.3s; }
        .field-group:nth-child(7) { animation-delay: 0.35s; }
        .field-group:nth-child(8) { animation-delay: 0.4s; }
        .field-group:nth-child(9) { animation-delay: 0.45s; }
        .submit-btn:hover { opacity: 0.92; transform: translateY(-1px); box-shadow: 0 8px 32px rgba(232,81,26,0.35) !important; }
        .submit-btn:active { transform: translateY(0); }
        .submit-btn { transition: all 0.2s cubic-bezier(0.34,1.56,0.64,1); }
        .trust-item { display: flex; align-items: center; gap: 0.5rem; }
        @media (max-width: 900px) {
          .checkout-layout { flex-direction: column !important; }
          .order-panel { display: none !important; }
          .mobile-summary { display: flex !important; }
          .checkout-form-col { padding: 1.5rem 1rem 3rem !important; }
        }
        @media (min-width: 901px) {
          .mobile-summary { display: none !important; }
        }
      `}</style>

      <div style={{ background: "#F5EDD6", minHeight: "100vh" }}>
        {/* Top bar */}
        <div style={{ background: "#1A3A5C", padding: "0.875rem 1.25rem", display: "flex", alignItems: "center", justifyContent: "space-between" }}>
          <span style={{ fontFamily: "var(--font-cinzel, serif)", color: "#F5EDD6", fontSize: "0.7rem", letterSpacing: "0.2em", textTransform: "uppercase" }}>
            Fundación Galeona de Cádiz
          </span>
          <div style={{ display: "flex", alignItems: "center", gap: "0.4rem" }}>
            <svg width="12" height="12" viewBox="0 0 14 14" fill="none">
              <rect x="2" y="6" width="10" height="7" rx="1" stroke="#B87333" strokeWidth="1.2"/>
              <path d="M4 6V4a3 3 0 016 0v2" stroke="#B87333" strokeWidth="1.2" strokeLinecap="round"/>
            </svg>
            <span style={{ fontFamily: "var(--font-lora, serif)", color: "#B87333", fontSize: "0.68rem" }}>Compra segura</span>
          </div>
        </div>

        {/* Mobile summary bar */}
        <div className="mobile-summary" style={{
          background: "#1A3A5C", borderTop: "1px solid rgba(184,115,51,0.2)",
          padding: "0.875rem 1.25rem", alignItems: "center", gap: "0.875rem",
        }}>
          {book?.coverUrl && (
            // eslint-disable-next-line @next/next/no-img-element
            <img src={book.coverUrl} alt={book.nombre || ""} style={{ width: 40, height: 52, borderRadius: 4, objectFit: "cover", border: "1px solid rgba(184,115,51,0.4)", flexShrink: 0 }} />
          )}
          <div style={{ flex: 1, minWidth: 0 }}>
            <p style={{ fontFamily: "var(--font-cinzel, serif)", color: "#F5EDD6", fontSize: "0.72rem", letterSpacing: "0.04em", overflow: "hidden", textOverflow: "ellipsis", whiteSpace: "nowrap" }}>
              {book?.nombre || "Publicación solicitada"}
            </p>
            <p style={{ fontFamily: "var(--font-lora, serif)", color: "rgba(245,237,214,0.55)", fontSize: "0.68rem", marginTop: 2 }}>
              {form.cantidad} ejemplar{parseInt(form.cantidad) !== 1 ? "es" : ""}
            </p>
          </div>
          {book && book.precioCop > 0 && (
            <p style={{ fontFamily: "var(--font-cinzel, serif)", color: "#B87333", fontSize: "0.82rem", fontWeight: 700, flexShrink: 0 }}>
              ${(book.precioCop * Math.max(1, parseInt(form.cantidad) || 1)).toLocaleString("es-CO")}
            </p>
          )}
        </div>

        <div className="checkout-layout" style={{ display: "flex", minHeight: "calc(100vh - 52px)", maxWidth: 1100, margin: "0 auto" }}>

          {/* LEFT — Order panel */}
          <div className="order-panel" style={{
            width: 360, flexShrink: 0, background: "#1A3A5C", padding: "3rem 2.5rem",
            position: "sticky", top: 52, height: "calc(100vh - 52px)", overflowY: "auto",
            display: "flex", flexDirection: "column", gap: "2rem"
          }}>
            {/* Decorative top accent */}
            <div style={{ height: 3, background: "linear-gradient(90deg, #E8511A, #B87333)", borderRadius: 2, marginBottom: "0.5rem" }} />

            <div>
              <p style={{ fontFamily: "var(--font-cinzel, serif)", color: "#B87333", fontSize: "0.6rem", letterSpacing: "0.25em", textTransform: "uppercase", marginBottom: "1.5rem" }}>
                Resumen del pedido
              </p>

              {/* Book placeholder */}
              <div style={{
                background: "rgba(255,255,255,0.05)", border: "1px solid rgba(184,115,51,0.25)",
                borderRadius: "0.75rem", padding: "1.25rem", display: "flex", gap: "1rem", alignItems: "center"
              }}>
                <div style={{ width: 56, height: 72, borderRadius: "0.375rem", flexShrink: 0, overflow: "hidden" }}>
                  {book?.coverUrl ? (
                    // eslint-disable-next-line @next/next/no-img-element
                    <img src={book.coverUrl} alt={book.nombre} style={{ width: "100%", height: "100%", objectFit: "cover" }} />
                  ) : (
                    <div style={{
                      width: "100%", height: "100%",
                      background: "linear-gradient(135deg, #B87333, #E8511A)",
                      display: "flex", alignItems: "center", justifyContent: "center"
                    }}>
                      <svg width="20" height="20" viewBox="0 0 20 20" fill="none">
                        <path d="M4 3h9a1 1 0 011 1v13l-3-2-3 2-3-2-1 2V4a1 1 0 011-1z" stroke="#F5EDD6" strokeWidth="1.2" strokeLinejoin="round"/>
                        <path d="M7 7h6M7 10h4" stroke="#F5EDD6" strokeWidth="1.2" strokeLinecap="round"/>
                      </svg>
                    </div>
                  )}
                </div>
                <div>
                  <p style={{ fontFamily: "var(--font-cinzel, serif)", color: "#F5EDD6", fontSize: "0.78rem", letterSpacing: "0.05em", marginBottom: "0.25rem" }}>
                    {book?.nombre || "Publicación solicitada"}
                  </p>
                  <p style={{ fontFamily: "var(--font-lora, serif)", color: "rgba(245,237,214,0.6)", fontSize: "0.75rem" }}>
                    Cantidad: {form.cantidad || 1} ejemplar{parseInt(form.cantidad) !== 1 ? "es" : ""}
                  </p>
                </div>
              </div>
            </div>

            {/* Divider */}
            <div style={{ height: 1, background: "linear-gradient(90deg, transparent, rgba(184,115,51,0.4), transparent)" }} />

            {/* Price summary */}
            {book && (book.precioCop > 0 || book.precioUsd > 0) && (() => {
              const qty = Math.max(1, parseInt(form.cantidad) || 1);
              return (
                <div>
                  <p style={{ fontFamily: "var(--font-cinzel, serif)", color: "#B87333", fontSize: "0.6rem", letterSpacing: "0.25em", textTransform: "uppercase", marginBottom: "1rem" }}>
                    Total estimado
                  </p>
                  <div style={{ display: "flex", justifyContent: "space-between", alignItems: "baseline" }}>
                    <span style={{ fontFamily: "var(--font-lora, serif)", color: "rgba(245,237,214,0.6)", fontSize: "0.75rem" }}>
                      {qty} × ${book.precioCop.toLocaleString("es-CO")}
                    </span>
                    <span style={{ fontFamily: "var(--font-cinzel, serif)", color: "#F5EDD6", fontSize: "0.95rem", fontWeight: 700 }}>
                      ${(book.precioCop * qty).toLocaleString("es-CO")} COP
                    </span>
                  </div>
                </div>
              );
            })()}

            {/* Divider */}
            <div style={{ height: 1, background: "linear-gradient(90deg, transparent, rgba(184,115,51,0.4), transparent)" }} />

            {/* Steps */}
            <div>
              <p style={{ fontFamily: "var(--font-cinzel, serif)", color: "#B87333", fontSize: "0.6rem", letterSpacing: "0.25em", textTransform: "uppercase", marginBottom: "1.25rem" }}>
                Proceso de compra
              </p>
              {[
                { n: "01", label: "Datos del comprador", active: true },
                { n: "02", label: "Revisión y pago", active: false },
                { n: "03", label: "Confirmación", active: false },
              ].map((step) => (
                <div key={step.n} style={{ display: "flex", alignItems: "center", gap: "0.875rem", marginBottom: "1rem", opacity: step.active ? 1 : 0.45 }}>
                  <div style={{
                    width: 28, height: 28, borderRadius: "50%", flexShrink: 0,
                    background: step.active ? "linear-gradient(135deg, #E8511A, #B87333)" : "rgba(255,255,255,0.08)",
                    border: step.active ? "none" : "1px solid rgba(184,115,51,0.3)",
                    display: "flex", alignItems: "center", justifyContent: "center"
                  }}>
                    <span style={{ fontFamily: "var(--font-cinzel, serif)", color: step.active ? "#F5EDD6" : "#B87333", fontSize: "0.6rem", fontWeight: 700 }}>
                      {step.n}
                    </span>
                  </div>
                  <span style={{ fontFamily: "var(--font-lora, serif)", color: step.active ? "#F5EDD6" : "rgba(245,237,214,0.5)", fontSize: "0.82rem" }}>
                    {step.label}
                  </span>
                </div>
              ))}
            </div>

            {/* Divider */}
            <div style={{ height: 1, background: "linear-gradient(90deg, transparent, rgba(184,115,51,0.4), transparent)" }} />

            {/* Trust signals */}
            <div style={{ display: "flex", flexDirection: "column", gap: "0.75rem" }}>
              {[
                { icon: "", text: "Datos encriptados y seguros" },
                { icon: "", text: "Envío coordinado por mensajería" },
                { icon: "", text: "Soporte: 311 252 4239" },
              ].map((t) => (
                <div key={t.text} className="trust-item">
                  <span style={{ fontSize: "0.9rem" }}>{t.icon}</span>
                  <span style={{ fontFamily: "var(--font-lora, serif)", color: "rgba(245,237,214,0.55)", fontSize: "0.75rem" }}>
                    {t.text}
                  </span>
                </div>
              ))}
            </div>

          </div>

          {/* RIGHT — Form */}
          <div className="checkout-form-col" style={{ flex: 1, padding: "3rem 2.5rem 4rem", overflowY: "auto" }}>
            <div style={{ maxWidth: 520 }}>

              {/* Header */}
              <div style={{ marginBottom: "2.5rem" }}>
                <div style={{ display: "flex", alignItems: "center", gap: "0.75rem", marginBottom: "0.75rem" }}>
                  <div style={{ width: 3, height: 28, borderRadius: 2, background: "linear-gradient(180deg, #E8511A, #B87333)", flexShrink: 0 }} />
                  <h1 style={{ fontFamily: "var(--font-cinzel, serif)", color: "#1A3A5C", fontSize: "1.5rem", letterSpacing: "0.05em", margin: 0 }}>
                    Datos del Comprador
                  </h1>
                </div>
                <p style={{ fontFamily: "var(--font-lora, serif)", color: "#B87333", fontSize: "0.85rem", lineHeight: 1.7, marginLeft: "0.75rem" }}>
                  Complete el formulario para procesar su solicitud de pedido.
                </p>
              </div>

              <form onSubmit={handleSubmit} style={{ display: "flex", flexDirection: "column", gap: "1.25rem" }}>

                {/* Section: Información personal */}
                <div style={{ marginBottom: "0.5rem" }}>
                  <div style={{ display: "flex", alignItems: "center", gap: "0.75rem", marginBottom: "1.25rem" }}>
                    <div style={{
                      width: 22, height: 22, borderRadius: "50%", background: "linear-gradient(135deg, #1A3A5C, #1F4FA3)",
                      display: "flex", alignItems: "center", justifyContent: "center", flexShrink: 0
                    }}>
                      <span style={{ fontFamily: "var(--font-cinzel, serif)", color: "#F5EDD6", fontSize: "0.55rem", fontWeight: 700 }}>01</span>
                    </div>
                    <span style={{ fontFamily: "var(--font-cinzel, serif)", color: "#1A3A5C", fontSize: "0.65rem", letterSpacing: "0.2em", textTransform: "uppercase" }}>
                      Información personal
                    </span>
                    <div style={{ flex: 1, height: 1, background: "linear-gradient(90deg, rgba(184,115,51,0.3), transparent)" }} />
                  </div>

                  <div style={{ display: "flex", flexDirection: "column", gap: "1rem" }}>
                    <div className="field-group">
                      <label style={labelStyle}>
                        Nombre completo <span style={{ color: "#E8511A" }}>*</span>
                      </label>
                      <input name="nombre" type="text" required value={form.nombre} onChange={handleChange}
                        onFocus={() => setFocused("nombre")} onBlur={() => setFocused(null)}
                        placeholder="Ej. María García López"
                        style={{ ...inputStyle("nombre"), display: "block" }} />
                    </div>

                    <div className="field-group" style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "1rem" }}>
                      <div>
                        <label style={labelStyle}>
                          Correo electrónico <span style={{ color: "#E8511A" }}>*</span>
                        </label>
                        <input name="email" type="email" required value={form.email} onChange={handleChange}
                          onFocus={() => setFocused("email")} onBlur={() => setFocused(null)}
                          placeholder="correo@ejemplo.com"
                          style={{ ...inputStyle("email"), display: "block" }} />
                        <p style={{ fontFamily: "var(--font-lora, serif)", color: "#B87333", fontSize: "0.7rem", marginTop: "0.35rem", display: "flex", alignItems: "center", gap: "0.3rem" }}>
                          <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" style={{ flexShrink: 0 }}>
                            <circle cx="12" cy="12" r="10"/><line x1="12" y1="8" x2="12" y2="12"/><line x1="12" y1="16" x2="12.01" y2="16"/>
                          </svg>
                          Aquí recibirás las actualizaciones de tu orden y el recibo de compra.
                        </p>
                      </div>
                      <div>
                        <label style={labelStyle}>Teléfono / WhatsApp</label>
                        <input name="telefono" type="text" value={form.telefono} onChange={handleChange}
                          onFocus={() => setFocused("telefono")} onBlur={() => setFocused(null)}
                          placeholder="+57 300 000 0000"
                          style={{ ...inputStyle("telefono"), display: "block" }} />
                      </div>
                    </div>
                  </div>
                </div>

                {/* Section: Dirección de envío */}
                <div style={{ marginBottom: "0.5rem" }}>
                  <div style={{ display: "flex", alignItems: "center", gap: "0.75rem", marginBottom: "1.25rem" }}>
                    <div style={{
                      width: 22, height: 22, borderRadius: "50%", background: "linear-gradient(135deg, #1A3A5C, #1F4FA3)",
                      display: "flex", alignItems: "center", justifyContent: "center", flexShrink: 0
                    }}>
                      <span style={{ fontFamily: "var(--font-cinzel, serif)", color: "#F5EDD6", fontSize: "0.55rem", fontWeight: 700 }}>02</span>
                    </div>
                    <span style={{ fontFamily: "var(--font-cinzel, serif)", color: "#1A3A5C", fontSize: "0.65rem", letterSpacing: "0.2em", textTransform: "uppercase" }}>
                      Dirección de envío
                    </span>
                    <div style={{ flex: 1, height: 1, background: "linear-gradient(90deg, rgba(184,115,51,0.3), transparent)" }} />
                  </div>

                  <div style={{ display: "flex", flexDirection: "column", gap: "1rem" }}>
                    <div className="field-group" style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "1rem" }}>
                      <div>
                        <label style={labelStyle}>Ciudad</label>
                        <input name="ciudad" type="text" value={form.ciudad} onChange={handleChange}
                          onFocus={() => setFocused("ciudad")} onBlur={() => setFocused(null)}
                          placeholder="Bogotá"
                          style={{ ...inputStyle("ciudad"), display: "block" }} />
                      </div>
                      <div>
                        <label style={labelStyle}>País</label>
                        <input name="pais" type="text" value={form.pais} onChange={handleChange}
                          onFocus={() => setFocused("pais")} onBlur={() => setFocused(null)}
                          placeholder="Colombia"
                          style={{ ...inputStyle("pais"), display: "block" }} />
                      </div>
                    </div>

                    <div className="field-group">
                      <label style={labelStyle}>
                        Dirección completa
                      </label>
                      <input name="direccion_envio" type="text" value={form.direccion_envio} onChange={handleChange}
                        onFocus={() => setFocused("direccion_envio")} onBlur={() => setFocused(null)}
                        placeholder="Calle 123 #45-67, Barrio, Ciudad"
                        style={{ ...inputStyle("direccion_envio"), display: "block" }} />
                    </div>
                  </div>
                </div>

                {/* Section: Pedido */}
                <div style={{ marginBottom: "0.5rem" }}>
                  <div style={{ display: "flex", alignItems: "center", gap: "0.75rem", marginBottom: "1.25rem" }}>
                    <div style={{
                      width: 22, height: 22, borderRadius: "50%", background: "linear-gradient(135deg, #1A3A5C, #1F4FA3)",
                      display: "flex", alignItems: "center", justifyContent: "center", flexShrink: 0
                    }}>
                      <span style={{ fontFamily: "var(--font-cinzel, serif)", color: "#F5EDD6", fontSize: "0.55rem", fontWeight: 700 }}>03</span>
                    </div>
                    <span style={{ fontFamily: "var(--font-cinzel, serif)", color: "#1A3A5C", fontSize: "0.65rem", letterSpacing: "0.2em", textTransform: "uppercase" }}>
                      Detalles del pedido
                    </span>
                    <div style={{ flex: 1, height: 1, background: "linear-gradient(90deg, rgba(184,115,51,0.3), transparent)" }} />
                  </div>

                  <div style={{ display: "flex", flexDirection: "column", gap: "1rem" }}>
                    <div className="field-group">
                      <label style={labelStyle}>Cantidad de ejemplares</label>
                      <div style={{ display: "flex", alignItems: "center", gap: "0.75rem" }}>
                        <button type="button"
                          onClick={() => setForm(p => ({ ...p, cantidad: String(Math.max(1, parseInt(p.cantidad) - 1)) }))}
                          style={{
                            width: 42, height: 42, borderRadius: "0.5rem", border: "1.5px solid rgba(184,115,51,0.4)",
                            background: "rgba(245,237,214,0.6)", color: "#1A3A5C", fontSize: "1.25rem",
                            cursor: "pointer", display: "flex", alignItems: "center", justifyContent: "center",
                            fontFamily: "var(--font-cinzel, serif)", flexShrink: 0, transition: "all 0.15s"
                          }}>−</button>
                        <input name="cantidad" type="number" min="1" value={form.cantidad} onChange={handleChange}
                          onFocus={() => setFocused("cantidad")} onBlur={() => setFocused(null)}
                          style={{ ...inputStyle("cantidad"), display: "block", textAlign: "center", width: 80, flexShrink: 0 }} />
                        <button type="button"
                          onClick={() => setForm(p => ({ ...p, cantidad: String(parseInt(p.cantidad) + 1) }))}
                          style={{
                            width: 42, height: 42, borderRadius: "0.5rem", border: "1.5px solid rgba(184,115,51,0.4)",
                            background: "rgba(245,237,214,0.6)", color: "#1A3A5C", fontSize: "1.25rem",
                            cursor: "pointer", display: "flex", alignItems: "center", justifyContent: "center",
                            fontFamily: "var(--font-cinzel, serif)", flexShrink: 0, transition: "all 0.15s"
                          }}>+</button>
                        <span style={{ fontFamily: "var(--font-lora, serif)", color: "#B87333", fontSize: "0.78rem" }}>
                          ejemplar{parseInt(form.cantidad) !== 1 ? "es" : ""}
                        </span>
                      </div>
                    </div>

                    <div className="field-group">
                      <label style={labelStyle}>Observaciones</label>
                      <textarea name="observaciones" rows={3} value={form.observaciones} onChange={handleChange}
                        onFocus={() => setFocused("observaciones")} onBlur={() => setFocused(null)}
                        placeholder="Notas especiales para su pedido, dedicatorias, instrucciones de envío..."
                        style={{ ...inputStyle("observaciones"), display: "block", resize: "none", lineHeight: 1.6 }} />
                    </div>
                  </div>
                </div>

                {/* Divider */}
                <div style={{ height: 1, background: "linear-gradient(90deg, transparent, rgba(184,115,51,0.35), transparent)", margin: "0.5rem 0" }} />

                {/* Aceptación */}
                <div className="field-group">
                  <label style={{ display: "flex", alignItems: "flex-start", gap: "0.75rem", cursor: "pointer" }}>
                    <div style={{ position: "relative", flexShrink: 0, marginTop: 2 }}>
                      <input type="checkbox" name="acepta_datos" checked={form.acepta_datos} onChange={handleChange}
                        style={{ opacity: 0, position: "absolute", width: 18, height: 18, margin: 0, cursor: "pointer", zIndex: 1 }} />
                      <div style={{
                        width: 18, height: 18, borderRadius: 4,
                        border: `2px solid ${form.acepta_datos ? "#1A3A5C" : "rgba(184,115,51,0.5)"}`,
                        background: form.acepta_datos ? "#1A3A5C" : "transparent",
                        display: "flex", alignItems: "center", justifyContent: "center",
                        transition: "all 0.2s"
                      }}>
                        {form.acepta_datos && (
                          <svg width="10" height="8" viewBox="0 0 10 8" fill="none">
                            <path d="M1 4l3 3 5-6" stroke="#F5EDD6" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
                          </svg>
                        )}
                      </div>
                    </div>
                    <span style={{ fontFamily: "var(--font-lora, serif)", color: "#1A3A5C", fontSize: "0.82rem", lineHeight: 1.65 }}>
                      Acepto el tratamiento de mis datos personales conforme a la política de privacidad de la Fundación Social Galeona de Cádiz{" "}
                      <span style={{ color: "#E8511A" }}>*</span>
                    </span>
                  </label>
                </div>

                {/* Error */}
                {error && (
                  <div style={{
                    padding: "0.875rem 1rem", borderRadius: "0.5rem",
                    background: "rgba(232,81,26,0.08)", border: "1px solid rgba(232,81,26,0.3)"
                  }}>
                    <p style={{ fontFamily: "var(--font-lora, serif)", color: "#E8511A", fontSize: "0.82rem", margin: 0 }}>
                      {error}
                    </p>
                  </div>
                )}

                {/* Submit */}
                <button type="submit" disabled={loading} className="submit-btn"
                  style={{
                    width: "100%", padding: "1rem 2rem",
                    background: loading ? "#7ecef0" : "#009EE3",
                    color: "#fff", border: "none", borderRadius: "0.5rem",
                    fontFamily: "var(--font-lora, serif)", fontSize: "0.95rem",
                    fontWeight: 700, letterSpacing: "0.02em",
                    cursor: loading ? "not-allowed" : "pointer",
                    boxShadow: "0 4px 20px rgba(0,158,227,0.3)",
                    display: "flex", alignItems: "center", justifyContent: "center", gap: "0.6rem"
                  }}>
                  {loading ? "Redirigiendo a MercadoPago..." : "Pagar con MercadoPago"}
                </button>

                <p style={{ fontFamily: "var(--font-lora, serif)", color: "rgba(27,108,168,0.6)", fontSize: "0.72rem", textAlign: "center", lineHeight: 1.6 }}>
                  Al enviar, nuestro equipo se pondrá en contacto para coordinar el pago y confirmar su pedido.
                </p>

              </form>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default function CheckoutPage() {
  return (
    <Suspense fallback={<div style={{ background: "#F5EDD6", minHeight: "100vh" }} />}>
      <CheckoutContent />
    </Suspense>
  );
}
