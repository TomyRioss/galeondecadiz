"use client";

import { useEffect, useState } from "react";
import { Heart, Mail, Phone, Calendar, Download, ChevronLeft, ChevronRight } from "lucide-react";

interface DonationRecord {
  id: string;
  fullName: string;
  email: string;
  phone: string | null;
  amount: number;
  message: string | null;
  status: string;
  createdAt: string;
}

const LIMIT = 20;

export default function AdminDonacionesPage() {
  const [records, setRecords] = useState<DonationRecord[]>([]);
  const [total, setTotal] = useState(0);
  const [loading, setLoading] = useState(true);
  const [offset, setOffset] = useState(0);
  const [testingSend, setTestingSend] = useState<string | null>(null);
  const [toast, setToast] = useState<{ msg: string; ok: boolean } | null>(null);

  function showToast(msg: string, ok: boolean) {
    setToast({ msg, ok });
    setTimeout(() => setToast(null), 4000);
  }

  async function sendTestEmail(id: string) {
    setTestingSend(id);
    try {
      const res = await fetch("/api/admin/test-email", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ type: "donacion", recordId: id }),
      });
      if (!res.ok) throw new Error();
      showToast("Email de prueba enviado a tomyrios2006@gmail.com", true);
    } catch {
      showToast("Error al enviar email de prueba", false);
    } finally {
      setTestingSend(null);
    }
  }

  function fetchRecords() {
    setLoading(true);
    const params = new URLSearchParams({ limit: String(LIMIT), offset: String(offset) });
    fetch(`/api/admin/donations?${params}`)
      .then((r) => r.json())
      .then((data) => {
        setRecords(data.records || []);
        setTotal(data.total || 0);
      })
      .catch((err) => console.error("[donaciones]", err))
      .finally(() => setLoading(false));
  }

  useEffect(() => {
    fetchRecords();
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [offset]);

  function exportCSV() {
    const headers = ["ID", "Donante", "Correo", "Teléfono", "Monto (COP)", "Mensaje", "Fecha"];
    const rows = records.map((r) => [
      r.id,
      r.fullName,
      r.email,
      r.phone || "",
      r.amount,
      (r.message || "").replace(/\n/g, " "),
      new Date(r.createdAt).toLocaleString("es-CO"),
    ]);
    const csv = [headers, ...rows].map((row) => row.map((c) => `"${c}"`).join(",")).join("\n");
    const blob = new Blob([csv], { type: "text/csv;charset=utf-8;" });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = `donaciones_${new Date().toISOString().slice(0, 10)}.csv`;
    a.click();
  }

  const totalPages = Math.ceil(total / LIMIT);
  const currentPage = Math.floor(offset / LIMIT) + 1;

  return (
    <div className="flex flex-col gap-4 pt-6">
      {toast && (
        <div className="fixed top-4 right-4 z-50 px-5 py-3 rounded-xl text-sm font-semibold shadow-xl"
          style={{ background: toast.ok ? "rgba(26,58,92,0.95)" : "rgba(232,81,26,0.95)", color: "#F5EDD6", fontFamily: "var(--font-lora, serif)", border: `1px solid ${toast.ok ? "#B87333" : "#E8511A"}` }}>
          {toast.msg}
        </div>
      )}
      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-2 px-8">
        <div>
          <h1 className="text-2xl font-bold leading-tight" style={{ color: "#1A3A5C", fontFamily: "var(--font-cinzel, serif)" }}>
            Donaciones
          </h1>
          <p className="text-sm mt-0.5" style={{ color: "#B87333", fontFamily: "var(--font-lora, serif)" }}>
            {total > 0 ? `${total} donación${total !== 1 ? "es" : ""} confirmada${total !== 1 ? "s" : ""}` : "Donaciones recibidas por MercadoPago"}
          </p>
        </div>
        <div className="flex gap-2">
          <button
            onClick={() => records[0] && sendTestEmail(records[0].id)}
            disabled={!records[0] || testingSend !== null}
            className="px-4 py-2 rounded-full text-sm font-semibold transition-all hover:opacity-90 flex items-center gap-2 disabled:opacity-40"
            style={{ background: "rgba(232,81,26,0.12)", color: "#E8511A", border: "1.5px solid rgba(232,81,26,0.35)", fontFamily: "var(--font-cinzel, serif)" }}
          >
            {testingSend ? "Enviando…" : "🧪 Test email"}
          </button>
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
              Cargando donaciones…
            </p>
          </div>
        ) : records.length === 0 ? (
          <div className="p-16 flex flex-col items-center gap-6 text-center">
            <div
              className="w-20 h-20 rounded-full flex items-center justify-center"
              style={{ background: "linear-gradient(135deg, #1A3A5C, #1F4FA3)" }}
            >
              <Heart size={34} style={{ color: "#B87333" }} />
            </div>
            <div>
              <p className="text-[0.6rem] tracking-[0.25em] uppercase font-semibold mb-3" style={{ color: "#E8511A", fontFamily: "var(--font-cinzel, serif)" }}>
                Sin donaciones
              </p>
              <h2 className="text-xl font-bold mb-3" style={{ color: "#1A3A5C", fontFamily: "var(--font-cinzel, serif)" }}>
                No hay donaciones aún
              </h2>
              <p className="text-sm leading-relaxed max-w-sm" style={{ color: "#1B6CA8", fontFamily: "var(--font-lora, serif)" }}>
                Las donaciones confirmadas por MercadoPago aparecerán aquí.
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
                    {["Donante", "Correo", "Teléfono", "Monto", "Fecha", "Estado", "Mensaje", ""].map((h) => (
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
                        {r.fullName}
                      </td>
                      <td className="px-5 py-3.5">
                        <div className="flex items-center gap-2">
                          <Mail size={11} style={{ color: "#B87333" }} />
                          <a href={`mailto:${r.email}`} className="hover:underline underline-offset-2" style={{ color: "#1A3A5C", fontFamily: "var(--font-lora, serif)" }}>
                            {r.email}
                          </a>
                        </div>
                      </td>
                      <td className="px-5 py-3.5">
                        {r.phone ? (
                          <div className="flex items-center gap-2">
                            <Phone size={11} style={{ color: "#B87333" }} />
                            <span style={{ color: "#1A3A5C", fontFamily: "var(--font-lora, serif)" }}>{r.phone}</span>
                          </div>
                        ) : (
                          <span className="text-xs italic" style={{ color: "#B87333", opacity: 0.5 }}>—</span>
                        )}
                      </td>
                      <td className="px-5 py-3.5 font-semibold" style={{ color: "#1A3A5C", fontFamily: "var(--font-lora, serif)" }}>
                        ${r.amount.toLocaleString("es-CO")} COP
                      </td>
                      <td className="px-5 py-3.5">
                        <div className="flex items-center gap-2">
                          <Calendar size={11} style={{ color: "#B87333" }} />
                          <span style={{ color: "#1A3A5C", fontFamily: "var(--font-lora, serif)" }}>
                            {new Date(r.createdAt).toLocaleDateString("es-CO")}
                          </span>
                        </div>
                      </td>
                      <td className="px-5 py-3.5">
                        <span
                          className="px-2.5 py-1 rounded-full text-[0.6rem] tracking-widest uppercase font-semibold"
                          style={{
                            background: r.status === "paid" ? "rgba(46,107,62,0.15)" : "rgba(232,81,26,0.12)",
                            color: r.status === "paid" ? "#2E6B3E" : "#E8511A",
                            border: `1px solid ${r.status === "paid" ? "rgba(46,107,62,0.3)" : "rgba(232,81,26,0.3)"}`,
                            fontFamily: "var(--font-cinzel, serif)",
                          }}
                        >
                          {r.status === "paid" ? "Pagado" : r.status}
                        </span>
                      </td>
                      <td className="px-5 py-3.5 max-w-[200px] truncate text-xs italic" style={{ color: "#1B6CA8", fontFamily: "var(--font-lora, serif)" }}>
                        {r.message || <span style={{ opacity: 0.4 }}>—</span>}
                      </td>
                      <td className="px-5 py-3.5">
                        <button
                          onClick={() => sendTestEmail(r.id)}
                          disabled={testingSend === r.id}
                          className="px-3 py-1.5 rounded-full text-[0.58rem] tracking-widest uppercase font-semibold transition-all hover:opacity-80 disabled:opacity-40"
                          style={{ background: "rgba(232,81,26,0.12)", color: "#E8511A", border: "1.5px solid rgba(232,81,26,0.3)", fontFamily: "var(--font-cinzel, serif)" }}
                        >
                          {testingSend === r.id ? "…" : "🧪 Test"}
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>

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
