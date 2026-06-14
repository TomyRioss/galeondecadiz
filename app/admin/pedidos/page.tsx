"use client";

import { useEffect, useState } from "react";
import { Mail, BookOpen, Calendar, Download, ShoppingCart, ChevronLeft, ChevronRight, CheckCircle, Clock } from "lucide-react";

interface OrderRecord {
  id: string;
  buyerName: string;
  buyerEmail: string;
  bookNombre: string;
  monto: number;
  moneda: string;
  estado: string;
  emailEnviado: boolean;
  createdAt: string;
}

const LIMIT = 20;

export default function AdminPedidosPage() {
  const [records, setRecords] = useState<OrderRecord[]>([]);
  const [total, setTotal] = useState(0);
  const [loading, setLoading] = useState(true);
  const [offset, setOffset] = useState(0);

  function fetchRecords() {
    setLoading(true);
    const params = new URLSearchParams({ limit: String(LIMIT), offset: String(offset) });
    fetch(`/api/admin/orders?${params}`)
      .then((r) => r.json())
      .then((data) => {
        setRecords(data.records || []);
        setTotal(data.total || 0);
      })
      .catch((err) => console.error("[pedidos]", err))
      .finally(() => setLoading(false));
  }

  useEffect(() => {
    fetchRecords();
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [offset]);

  function exportCSV() {
    const headers = ["ID", "Comprador", "Correo", "Libro", "Monto", "Moneda", "Estado", "Fecha"];
    const rows = records.map((r) => [
      r.id,
      r.buyerName,
      r.buyerEmail,
      r.bookNombre,
      r.monto,
      r.moneda,
      r.estado,
      new Date(r.createdAt).toLocaleString("es-CO"),
    ]);
    const csv = [headers, ...rows].map((row) => row.map((c) => `"${c}"`).join(",")).join("\n");
    const blob = new Blob([csv], { type: "text/csv;charset=utf-8;" });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = `pedidos_${new Date().toISOString().slice(0, 10)}.csv`;
    a.click();
  }

  const totalPages = Math.ceil(total / LIMIT);
  const currentPage = Math.floor(offset / LIMIT) + 1;

  return (
    <div className="flex flex-col gap-4 pt-6">
      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-2 px-8">
        <div>
          <h1 className="text-2xl font-bold leading-tight" style={{ color: "#1A3A5C", fontFamily: "var(--font-cinzel, serif)" }}>
            Pedidos
          </h1>
          <p className="text-sm mt-0.5" style={{ color: "#B87333", fontFamily: "var(--font-lora, serif)" }}>
            {total > 0 ? `${total} pedido${total !== 1 ? "s" : ""} en total` : "Compras de ebooks"}
          </p>
        </div>
        {records.length > 0 && (
          <button
            onClick={exportCSV}
            className="px-4 py-2 rounded-full text-sm font-semibold transition-all hover:opacity-90 hover:-translate-y-px flex items-center gap-2"
            style={{ background: "linear-gradient(90deg, #E8511A, #B87333)", color: "#F5EDD6", fontFamily: "var(--font-cinzel, serif)" }}
          >
            <Download size={12} />
            Exportar CSV
          </button>
        )}
      </div>

      {/* Contenido */}
      <div className="overflow-hidden" style={{ background: "linear-gradient(135deg, #e8dfc4, #d4c9a8)" }}>
        {loading ? (
          <div className="p-16 flex flex-col items-center gap-4">
            <div
              className="animate-spin w-10 h-10 rounded-full border-2"
              style={{ borderColor: "#B87333", borderTopColor: "transparent" }}
            />
            <p className="text-sm" style={{ color: "#1A3A5C", fontFamily: "var(--font-lora, serif)" }}>
              Cargando pedidos…
            </p>
          </div>
        ) : records.length === 0 ? (
          <div className="p-16 flex flex-col items-center gap-6 text-center">
            <div
              className="w-20 h-20 rounded-full flex items-center justify-center"
              style={{ background: "linear-gradient(135deg, #1A3A5C, #1F4FA3)" }}
            >
              <ShoppingCart size={34} style={{ color: "#B87333" }} />
            </div>
            <div>
              <p className="text-[0.6rem] tracking-[0.25em] uppercase font-semibold mb-3" style={{ color: "#E8511A", fontFamily: "var(--font-cinzel, serif)" }}>
                Sin pedidos
              </p>
              <h2 className="text-xl font-bold mb-3" style={{ color: "#1A3A5C", fontFamily: "var(--font-cinzel, serif)" }}>
                No hay pedidos aún
              </h2>
              <p className="text-sm leading-relaxed max-w-sm" style={{ color: "#1B6CA8", fontFamily: "var(--font-lora, serif)" }}>
                Las compras de ebooks procesadas por MercadoPago aparecerán aquí.
              </p>
            </div>
            <div className="h-px w-32" style={{ background: "linear-gradient(90deg, transparent, #B87333, transparent)" }} />
          </div>
        ) : (
          <>
            <div className="overflow-x-auto">
              <table className="w-full text-sm">
                <thead>
                  <tr style={{ background: "#1A3A5C" }}>
                    {["Comprador", "Correo", "Libro", "Monto", "Estado", "Fecha", ""].map((h) => (
                      <th
                        key={h}
                        className="px-5 py-3.5 text-left text-[0.6rem] tracking-[0.2em] uppercase font-semibold"
                        style={{ color: "#B87333", fontFamily: "var(--font-cinzel, serif)" }}
                      >
                        {h}
                      </th>
                    ))}
                  </tr>
                </thead>
                <tbody>
                  {records.map((r, i) => (
                    <tr
                      key={r.id}
                      className="transition-colors"
                      style={{ background: i % 2 === 0 ? "transparent" : "rgba(255,255,255,0.12)" }}
                    >
                      <td className="px-5 py-3.5 font-semibold" style={{ color: "#1A3A5C", fontFamily: "var(--font-cinzel, serif)", fontSize: "0.8rem" }}>
                        {r.buyerName}
                      </td>
                      <td className="px-5 py-3.5">
                        <div className="flex items-center gap-2">
                          <Mail size={11} style={{ color: "#B87333" }} />
                          <a
                            href={`mailto:${r.buyerEmail}`}
                            className="hover:underline underline-offset-2"
                            style={{ color: "#1A3A5C", fontFamily: "var(--font-lora, serif)" }}
                          >
                            {r.buyerEmail}
                          </a>
                        </div>
                      </td>
                      <td className="px-5 py-3.5">
                        <div className="flex items-center gap-2">
                          <BookOpen size={11} style={{ color: "#B87333" }} />
                          <span style={{ color: "#1A3A5C", fontFamily: "var(--font-lora, serif)" }}>{r.bookNombre}</span>
                        </div>
                      </td>
                      <td className="px-5 py-3.5 font-semibold" style={{ color: "#1A3A5C", fontFamily: "var(--font-lora, serif)" }}>
                        {r.moneda === "COP"
                          ? `$${r.monto.toLocaleString("es-CO")} COP`
                          : `$${r.monto.toFixed(2)} USD`}
                      </td>
                      <td className="px-5 py-3.5">
                        <span
                          className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-[0.65rem] tracking-widest uppercase font-semibold"
                          style={
                            r.estado === "PAID"
                              ? { background: "rgba(26,58,92,0.12)", color: "#1A3A5C" }
                              : { background: "rgba(232,81,26,0.12)", color: "#E8511A" }
                          }
                        >
                          {r.estado === "PAID" ? <CheckCircle size={10} /> : <Clock size={10} />}
                          {r.estado === "PAID" ? "Pagado" : "Pendiente"}
                        </span>
                      </td>
                      <td className="px-5 py-3.5">
                        <div className="flex items-center gap-2">
                          <Calendar size={11} style={{ color: "#B87333" }} />
                          <span style={{ color: "#1A3A5C", fontFamily: "var(--font-lora, serif)" }}>
                            {new Date(r.createdAt).toLocaleDateString("es-CO")}
                          </span>
                        </div>
                      </td>
                      <td className="px-5 py-3.5 text-[0.65rem] italic" style={{ color: r.emailEnviado ? "#B87333" : "#E8511A", fontFamily: "var(--font-lora, serif)" }}>
                        {r.emailEnviado ? "✓ email" : "sin email"}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>

            {/* Paginación */}
            {totalPages > 1 && (
              <div className="flex items-center justify-between px-5 py-4 border-t" style={{ borderColor: "rgba(184,115,51,0.2)" }}>
                <p className="text-xs" style={{ color: "#B87333", fontFamily: "var(--font-lora, serif)" }}>
                  Página {currentPage} de {totalPages}
                </p>
                <div className="flex gap-2">
                  <button
                    onClick={() => setOffset(Math.max(0, offset - LIMIT))}
                    disabled={offset === 0}
                    className="p-1.5 rounded-full disabled:opacity-30"
                    style={{ color: "#1A3A5C" }}
                  >
                    <ChevronLeft size={16} />
                  </button>
                  <button
                    onClick={() => setOffset(offset + LIMIT)}
                    disabled={offset + LIMIT >= total}
                    className="p-1.5 rounded-full disabled:opacity-30"
                    style={{ color: "#1A3A5C" }}
                  >
                    <ChevronRight size={16} />
                  </button>
                </div>
              </div>
            )}
          </>
        )}
      </div>
    </div>
  );
}
