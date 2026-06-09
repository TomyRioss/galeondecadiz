"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";

interface CheckoutFormProps {
  bookSlug: string;
  precioCop: number;
  precioUsd: number;
}

export default function CheckoutForm({ bookSlug, precioCop, precioUsd }: CheckoutFormProps) {
  const router = useRouter();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [form, setForm] = useState({
    buyerName: "",
    buyerEmail: "",
    moneda: "COP" as "COP" | "USD",
  });

  const montoLabel =
    form.moneda === "COP"
      ? `$${precioCop.toLocaleString("es-CO")} COP`
      : `$${precioUsd.toFixed(2)} USD`;

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setError(null);
    setLoading(true);

    try {
      const res = await fetch("/api/checkout", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ bookSlug, ...form }),
      });

      const data = await res.json();

      if (!res.ok) {
        setError(data.error ?? "Error al procesar el pago");
        return;
      }

      const url =
        process.env.NODE_ENV === "production"
          ? data.initPoint
          : data.sandboxInitPoint ?? data.initPoint;

      router.push(url);
    } catch {
      setError("Error de conexión. Intentá de nuevo.");
    } finally {
      setLoading(false);
    }
  }

  return (
    <form onSubmit={handleSubmit} className="flex flex-col gap-4">
      <div>
        <label
          className="block text-sm font-semibold mb-1"
          style={{ color: "#1A3A5C", fontFamily: "var(--font-cinzel, serif)" }}
        >
          Nombre completo
        </label>
        <input
          type="text"
          required
          value={form.buyerName}
          onChange={(e) => setForm((f) => ({ ...f, buyerName: e.target.value }))}
          className="w-full border-2 rounded-lg px-3 py-2 text-sm outline-none focus:ring-2"
          style={{ borderColor: "#B87333", background: "#fdf8f0", color: "#1A3A5C" }}
          placeholder="Tu nombre completo"
        />
      </div>

      <div>
        <label
          className="block text-sm font-semibold mb-1"
          style={{ color: "#1A3A5C", fontFamily: "var(--font-cinzel, serif)" }}
        >
          Correo electrónico
        </label>
        <input
          type="email"
          required
          value={form.buyerEmail}
          onChange={(e) => setForm((f) => ({ ...f, buyerEmail: e.target.value }))}
          className="w-full border-2 rounded-lg px-3 py-2 text-sm outline-none focus:ring-2"
          style={{ borderColor: "#B87333", background: "#fdf8f0", color: "#1A3A5C" }}
          placeholder="tu@correo.com"
        />
      </div>

      <div>
        <label
          className="block text-sm font-semibold mb-1"
          style={{ color: "#1A3A5C", fontFamily: "var(--font-cinzel, serif)" }}
        >
          Moneda
        </label>
        <select
          value={form.moneda}
          onChange={(e) => setForm((f) => ({ ...f, moneda: e.target.value as "COP" | "USD" }))}
          className="w-full border-2 rounded-lg px-3 py-2 text-sm outline-none"
          style={{ borderColor: "#B87333", background: "#fdf8f0", color: "#1A3A5C" }}
        >
          <option value="COP">Pesos colombianos (COP)</option>
          <option value="USD">Dólares (USD)</option>
        </select>
      </div>

      {error && (
        <div className="rounded-lg px-4 py-3 text-sm text-white" style={{ background: "#C0392B" }}>
          {error}
        </div>
      )}

      <button
        type="submit"
        disabled={loading}
        className="w-full py-3 rounded-lg text-white font-semibold text-base transition-opacity disabled:opacity-60"
        style={{ background: "linear-gradient(135deg, #E8511A, #B87333)" }}
      >
        {loading ? "Redirigiendo..." : `Pagar ${montoLabel}`}
      </button>
    </form>
  );
}
