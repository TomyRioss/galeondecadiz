"use client";

import { useState } from "react";

interface OrderResult {
  id: string;
  estado: string;
  bookNombre: string;
  createdAt: string;
  moneda: string;
  monto: number;
}

export default function PedidoPage() {
  const [email, setEmail] = useState("");
  const [orderId, setOrderId] = useState("");
  const [result, setResult] = useState<OrderResult | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);

  async function handleSearch(e: React.FormEvent) {
    e.preventDefault();
    setError(null);
    setResult(null);
    setLoading(true);
    try {
      const res = await fetch(`/api/orders/lookup?email=${encodeURIComponent(email)}&orderId=${encodeURIComponent(orderId)}`);
      const data = await res.json();
      if (!res.ok) {
        setError(data.error ?? "Pedido no encontrado");
      } else {
        setResult(data);
      }
    } catch {
      setError("Error de conexión");
    } finally {
      setLoading(false);
    }
  }

  const estadoLabel: Record<string, string> = {
    PENDING: "Pendiente de pago",
    PAID: "Pago confirmado",
    FAILED: "Pago fallido",
  };

  return (
    <div style={{ background: "#F5EDD6", minHeight: "100vh" }}>
      <section className="py-12 px-6" style={{ background: "#1A3A5C" }}>
        <h1
          className="text-3xl font-bold text-white text-center"
          style={{ fontFamily: "var(--font-cinzel, serif)" }}
        >
          Registro de pedido
        </h1>
      </section>

      <section className="max-w-md mx-auto px-6 py-12">
        <form onSubmit={handleSearch} className="flex flex-col gap-4">
          <div>
            <label className="block text-sm font-semibold mb-1" style={{ color: "#1A3A5C", fontFamily: "var(--font-cinzel, serif)" }}>
              Correo electrónico
            </label>
            <input
              type="email"
              required
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="w-full border-2 rounded-lg px-3 py-2 text-sm"
              style={{ borderColor: "#B87333", background: "#fdf8f0", color: "#1A3A5C" }}
              placeholder="tu@correo.com"
            />
          </div>
          <div>
            <label className="block text-sm font-semibold mb-1" style={{ color: "#1A3A5C", fontFamily: "var(--font-cinzel, serif)" }}>
              Número de pedido
            </label>
            <input
              type="text"
              required
              value={orderId}
              onChange={(e) => setOrderId(e.target.value)}
              className="w-full border-2 rounded-lg px-3 py-2 text-sm"
              style={{ borderColor: "#B87333", background: "#fdf8f0", color: "#1A3A5C" }}
              placeholder="ID recibido por email"
            />
          </div>

          {error && (
            <div className="rounded-lg px-4 py-3 text-sm text-white" style={{ background: "#C0392B" }}>
              {error}
            </div>
          )}

          <button
            type="submit"
            disabled={loading}
            className="w-full py-3 rounded-lg text-white font-semibold disabled:opacity-60"
            style={{ background: "linear-gradient(135deg, #E8511A, #B87333)" }}
          >
            {loading ? "Buscando..." : "Consultar pedido"}
          </button>
        </form>

        {result && (
          <div
            className="mt-8 rounded-xl p-6 border-2"
            style={{ borderColor: "#B87333", background: "linear-gradient(135deg, #e8dfc4, #d4c9a8)" }}
          >
            <h2 className="font-bold text-lg mb-3" style={{ color: "#1A3A5C", fontFamily: "var(--font-cinzel, serif)" }}>
              {result.bookNombre}
            </h2>
            <p className="text-sm" style={{ color: "#1B6CA8" }}>
              Estado: <strong>{estadoLabel[result.estado] ?? result.estado}</strong>
            </p>
            <p className="text-sm mt-1" style={{ color: "#1B6CA8" }}>
              Monto: {result.moneda === "COP" ? `$${result.monto.toLocaleString("es-CO")} COP` : `$${result.monto.toFixed(2)} USD`}
            </p>
            <p className="text-xs mt-2" style={{ color: "#1B6CA8" }}>
              Fecha: {new Date(result.createdAt).toLocaleDateString("es-CO")}
            </p>
          </div>
        )}
      </section>
    </div>
  );
}
