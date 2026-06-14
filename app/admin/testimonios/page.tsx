"use client";

import { useEffect, useState } from "react";
import { Mail, Phone, Calendar, Download, X, ChevronLeft, ChevronRight, MessageSquare } from "lucide-react";

interface ContactRecord {
  id: string;
  fullName: string;
  email: string;
  phone: string | null;
  message: string | null;
  source: string;
  createdAt: string;
}

export default function TestimoniosPage() {
  const [records, setRecords] = useState<ContactRecord[]>([]);
  const [total, setTotal] = useState(0);
  const [loading, setLoading] = useState(true);
  const [offset, setOffset] = useState(0);
  const [selectedRecord, setSelectedRecord] = useState<ContactRecord | null>(null);
  const limit = 20;

  function fetchRecords() {
    setLoading(true);
    const params = new URLSearchParams({ source: "testimonios", limit: String(limit), offset: String(offset) });
    fetch(`/api/contact-requests?${params.toString()}`)
      .then((r) => r.json())
      .then((data) => {
        setRecords(data.records || []);
        setTotal(data.total || 0);
      })
      .catch((err) => console.error("Error fetching testimonios:", err))
      .finally(() => setLoading(false));
  }

  useEffect(() => {
    fetchRecords();
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [offset]);

  function exportCSV() {
    const headers = ["ID", "Nombre", "Correo", "WhatsApp", "Fecha", "Mensaje"];
    const rows = records.map((r) => [
      r.id,
      r.fullName,
      r.email,
      r.phone || "",
      new Date(r.createdAt).toLocaleString("es-CO"),
      (r.message || "").replace(/\n/g, " "),
    ]);
    const csv = [headers, ...rows].map((row) => row.map((cell) => `"${cell}"`).join(",")).join("\n");
    const blob = new Blob([csv], { type: "text/csv;charset=utf-8;" });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = `testimonios_${new Date().toISOString().slice(0, 10)}.csv`;
    a.click();
  }

  return (
    <div className="flex flex-col gap-4 pt-6">
      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-2 px-8">
        <div>
          <h1 className="text-2xl font-bold leading-tight" style={{ color: "#1A3A5C", fontFamily: "var(--font-cinzel, serif)" }}>
            Testimonios
          </h1>
          <p className="text-sm mt-0.5" style={{ color: "#B87333", fontFamily: "var(--font-lora, serif)" }}>
            {total > 0 ? `${total} registro${total !== 1 ? "s" : ""} en total` : "Moderación de testimonios y reseñas"}
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

      {/* Tabla */}
      <div className="overflow-hidden" style={{ background: "linear-gradient(135deg, #e8dfc4, #d4c9a8)" }}>
        {loading ? (
          <div className="p-16 flex flex-col items-center gap-4">
            <div
              className="animate-spin w-10 h-10 rounded-full border-2 border-t-transparent"
              style={{ borderColor: "#B87333", borderTopColor: "transparent" }}
            />
            <p className="text-sm" style={{ color: "#1A3A5C", fontFamily: "var(--font-lora, serif)" }}>
              Cargando testimonios…
            </p>
          </div>
        ) : records.length === 0 ? (
          <div className="p-16 flex flex-col items-center gap-6 text-center">
            <div
              className="w-20 h-20 rounded-full flex items-center justify-center"
              style={{ background: "linear-gradient(135deg, #1A3A5C, #1F4FA3)" }}
            >
              <MessageSquare size={34} style={{ color: "#B87333" }} />
            </div>
            <div>
              <p
                className="text-[0.6rem] tracking-[0.25em] uppercase font-semibold mb-3"
                style={{ color: "#E8511A", fontFamily: "var(--font-cinzel, serif)" }}
              >
                Sin registros
              </p>
              <h2 className="text-xl font-bold mb-3" style={{ color: "#1A3A5C", fontFamily: "var(--font-cinzel, serif)" }}>
                No hay testimonios aún
              </h2>
              <p className="text-sm leading-relaxed max-w-sm" style={{ color: "#1B6CA8", fontFamily: "var(--font-lora, serif)" }}>
                Los testimonios enviados desde el sitio aparecerán aquí para moderación.
              </p>
            </div>
            <div className="h-px w-32" style={{ background: "linear-gradient(90deg, transparent, #B87333, transparent)" }} />
          </div>
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full text-sm">
              <thead>
                <tr style={{ background: "#1A3A5C" }}>
                  {["Nombre", "Correo", "WhatsApp", "Fecha", ""].map((h) => (
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
                    className="cursor-pointer transition-colors group"
                    style={{ background: i % 2 === 0 ? "transparent" : "rgba(255,255,255,0.12)" }}
                    onClick={() => setSelectedRecord(r)}
                  >
                    <td className="px-5 py-3.5 font-semibold group-hover:text-[#E8511A] transition-colors" style={{ color: "#1A3A5C", fontFamily: "var(--font-cinzel, serif)", fontSize: "0.8rem" }}>
                      {r.fullName}
                    </td>
                    <td className="px-5 py-3.5">
                      <div className="flex items-center gap-2">
                        <Mail size={11} style={{ color: "#B87333" }} />
                        <a
                          href={`mailto:${r.email}`}
                          className="hover:underline underline-offset-2 transition-colors"
                          style={{ color: "#1A3A5C", fontFamily: "var(--font-lora, serif)" }}
                          onClick={(e) => e.stopPropagation()}
                        >
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
                    <td className="px-5 py-3.5">
                      <div className="flex items-center gap-2">
                        <Calendar size={11} style={{ color: "#B87333" }} />
                        <span style={{ color: "#1A3A5C", fontFamily: "var(--font-lora, serif)" }}>
                          {new Date(r.createdAt).toLocaleDateString("es-CO", { day: "2-digit", month: "short", year: "numeric" })}
                        </span>
                      </div>
                    </td>
                    <td className="px-5 py-3.5 text-right">
                      <span
                        className="text-[0.6rem] tracking-widest uppercase font-semibold opacity-0 group-hover:opacity-100 transition-opacity"
                        style={{ color: "#E8511A", fontFamily: "var(--font-cinzel, serif)" }}
                      >
                        Ver →
                      </span>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>

      {/* Paginación */}
      {total > 0 && (
        <div className="flex items-center justify-between px-8">
          <p className="text-xs" style={{ color: "#1B6CA8", fontFamily: "var(--font-lora, serif)" }}>
            {offset + 1}–{Math.min(offset + records.length, total)} de {total} testimonios
          </p>
          <div className="flex items-center gap-2">
            <button
              onClick={() => setOffset(Math.max(0, offset - limit))}
              disabled={offset === 0}
              className="w-8 h-8 flex items-center justify-center rounded-full transition-all disabled:opacity-30 hover:opacity-80"
              style={{ background: "#1A3A5C", color: "#F5EDD6" }}
            >
              <ChevronLeft size={14} />
            </button>
            <button
              onClick={() => setOffset(offset + limit)}
              disabled={offset + limit >= total}
              className="w-8 h-8 flex items-center justify-center rounded-full transition-all disabled:opacity-30 hover:opacity-80"
              style={{ background: "#1A3A5C", color: "#F5EDD6" }}
            >
              <ChevronRight size={14} />
            </button>
          </div>
        </div>
      )}

      {/* Modal */}
      {selectedRecord && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center p-4"
          style={{ background: "rgba(26,58,92,0.7)", backdropFilter: "blur(4px)" }}
          onClick={() => setSelectedRecord(null)}
        >
          <div
            className="rounded-2xl p-6 md:p-8 max-w-lg w-full border-2 relative"
            style={{
              background: "linear-gradient(160deg, #ede4cb 0%, #ddd0b0 100%)",
              borderColor: "#B87333",
              boxShadow: "0 24px 64px rgba(26,58,92,0.3)",
            }}
            onClick={(e) => e.stopPropagation()}
          >
            <button
              onClick={() => setSelectedRecord(null)}
              className="absolute top-4 right-4 w-8 h-8 flex items-center justify-center rounded-full transition-colors hover:bg-white/30"
              style={{ color: "#B87333" }}
            >
              <X size={16} />
            </button>

            <div className="mb-5">
              <p
                className="text-[0.6rem] tracking-[0.2em] uppercase font-semibold mb-2"
                style={{ color: "#1B6CA8", fontFamily: "var(--font-cinzel, serif)" }}
              >
                Testimonio
              </p>
              <h2 className="text-xl font-bold" style={{ color: "#1A3A5C", fontFamily: "var(--font-cinzel, serif)" }}>
                {selectedRecord.fullName}
              </h2>
            </div>

            <div
              className="flex flex-col gap-3 p-4 rounded-xl mb-4 border"
              style={{ background: "rgba(255,255,255,0.3)", borderColor: "rgba(184,115,51,0.2)" }}
            >
              <div className="flex items-center gap-3">
                <Mail size={13} style={{ color: "#B87333" }} />
                <a
                  href={`mailto:${selectedRecord.email}`}
                  className="text-sm hover:underline"
                  style={{ color: "#1A3A5C", fontFamily: "var(--font-lora, serif)" }}
                >
                  {selectedRecord.email}
                </a>
              </div>
              {selectedRecord.phone && (
                <div className="flex items-center gap-3">
                  <Phone size={13} style={{ color: "#B87333" }} />
                  <span className="text-sm" style={{ color: "#1A3A5C", fontFamily: "var(--font-lora, serif)" }}>
                    {selectedRecord.phone}
                  </span>
                </div>
              )}
              <div className="flex items-center gap-3">
                <Calendar size={13} style={{ color: "#B87333" }} />
                <span className="text-sm" style={{ color: "#1A3A5C", fontFamily: "var(--font-lora, serif)" }}>
                  {new Date(selectedRecord.createdAt).toLocaleString("es-CO")}
                </span>
              </div>
            </div>

            {selectedRecord.message && (
              <div
                className="rounded-xl p-4 border mb-5"
                style={{ borderColor: "rgba(184,115,51,0.3)", background: "rgba(255,255,255,0.25)" }}
              >
                <p
                  className="text-[0.6rem] tracking-[0.2em] uppercase font-semibold mb-2"
                  style={{ color: "#B87333", fontFamily: "var(--font-cinzel, serif)" }}
                >
                  Mensaje
                </p>
                <p
                  className="text-sm whitespace-pre-wrap leading-relaxed"
                  style={{ color: "#1A3A5C", fontFamily: "var(--font-lora, serif)" }}
                >
                  {selectedRecord.message}
                </p>
              </div>
            )}

            <button
              onClick={() => setSelectedRecord(null)}
              className="w-full py-2.5 rounded-full text-sm font-semibold tracking-widest uppercase transition-all hover:opacity-90"
              style={{ background: "#1A3A5C", color: "#F5EDD6", fontFamily: "var(--font-cinzel, serif)" }}
            >
              Cerrar
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
