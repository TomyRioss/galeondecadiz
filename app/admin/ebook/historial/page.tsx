"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { User, Mail, Calendar, ChevronLeft, ChevronRight } from "lucide-react";

interface AccessLog {
  id: string;
  fullName: string;
  email: string;
  accessDate: string;
  source: string | null;
}

const LIMIT = 30;

export default function AdminEbookHistorialPage() {
  const [records, setRecords] = useState<AccessLog[]>([]);
  const [total, setTotal] = useState(0);
  const [loading, setLoading] = useState(true);
  const [offset, setOffset] = useState(0);

  useEffect(() => {
    setLoading(true);
    const params = new URLSearchParams({ limit: String(LIMIT), offset: String(offset) });
    fetch(`/api/admin/ebook/logs?${params}`)
      .then((r) => r.json())
      .then((data) => { setRecords(data.records || []); setTotal(data.total || 0); })
      .catch((err) => console.error("[ebook/logs]", err))
      .finally(() => setLoading(false));
  }, [offset]);

  function exportCSV() {
    const headers = ["Nombre", "Correo", "Fecha de acceso", "Origen"];
    const rows = records.map((l) => [
      l.fullName, l.email,
      new Date(l.accessDate).toLocaleString("es-CO"),
      l.source ?? "",
    ]);
    const csv = [headers, ...rows].map((r) => r.map((c) => `"${c}"`).join(",")).join("\n");
    const blob = new Blob([csv], { type: "text/csv;charset=utf-8;" });
    const a = document.createElement("a");
    a.href = URL.createObjectURL(blob);
    a.download = `historial-ebook-${new Date().toISOString().slice(0, 10)}.csv`;
    a.click();
  }

  const totalPages = Math.ceil(total / LIMIT);
  const currentPage = Math.floor(offset / LIMIT) + 1;

  return (
    <div className="flex flex-col gap-4 pt-6 pb-12 px-4 md:px-8">
      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-3">
        <div>
          <Link href="/admin/ebook" className="text-xs tracking-widest uppercase mb-1 block hover:opacity-70" style={{ color: "#B87333", fontFamily: "var(--font-cinzel, serif)" }}>
            ← Lectores
          </Link>
          <h1 className="text-2xl font-bold" style={{ color: "#1A3A5C", fontFamily: "var(--font-cinzel, serif)" }}>
            Historial de accesos
          </h1>
          <p className="text-sm mt-0.5" style={{ color: "#B87333", fontFamily: "var(--font-lora, serif)" }}>
            {total > 0 ? `${total} acceso${total !== 1 ? "s" : ""} registrado${total !== 1 ? "s" : ""}` : "Sin accesos aún"}
          </p>
        </div>
        {records.length > 0 && (
          <button onClick={exportCSV} className="px-4 py-2 rounded-full text-xs font-semibold tracking-widest uppercase hover:opacity-90" style={{ background: "linear-gradient(90deg, #E8511A, #B87333)", color: "#F5EDD6", fontFamily: "var(--font-cinzel, serif)" }}>
            Exportar CSV
          </button>
        )}
      </div>

      {loading ? (
        <div className="flex items-center justify-center py-20">
          <div className="animate-spin w-10 h-10 rounded-full border-2" style={{ borderColor: "#B87333", borderTopColor: "transparent" }} />
        </div>
      ) : records.length === 0 ? (
        <div className="rounded-2xl p-10 text-center" style={{ background: "linear-gradient(135deg, #e8dfc4, #d4c9a8)", border: "2px solid #B87333" }}>
          <p className="text-sm" style={{ color: "#1A3A5C", fontFamily: "var(--font-lora, serif)" }}>Sin accesos registrados aún.</p>
        </div>
      ) : (
        <>
          <div className="rounded-2xl overflow-hidden" style={{ border: "2px solid #B87333" }}>
            <table className="w-full text-sm">
              <thead>
                <tr style={{ background: "#1A3A5C" }}>
                  {["Lector", "Correo", "Fecha", "Origen"].map((h) => (
                    <th key={h} className="px-5 py-3.5 text-left text-[0.6rem] tracking-[0.2em] uppercase font-semibold" style={{ color: "#B87333", fontFamily: "var(--font-cinzel, serif)" }}>{h}</th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {records.map((l, i) => (
                  <tr key={l.id} style={{ background: i % 2 === 0 ? "linear-gradient(135deg, #e8dfc4, #d4c9a8)" : "linear-gradient(135deg, #ddd0b0, #cfc2a0)" }}>
                    <td className="px-5 py-3.5">
                      <div className="flex items-center gap-2">
                        <User size={11} style={{ color: "#B87333" }} />
                        <span className="text-xs font-semibold" style={{ color: "#1A3A5C", fontFamily: "var(--font-cinzel, serif)" }}>{l.fullName}</span>
                      </div>
                    </td>
                    <td className="px-5 py-3.5">
                      <div className="flex items-center gap-2">
                        <Mail size={11} style={{ color: "#B87333" }} />
                        <span className="text-xs" style={{ color: "#1A3A5C", fontFamily: "var(--font-lora, serif)" }}>{l.email}</span>
                      </div>
                    </td>
                    <td className="px-5 py-3.5">
                      <div className="flex items-center gap-2">
                        <Calendar size={11} style={{ color: "#B87333" }} />
                        <span className="text-xs" style={{ color: "#1A3A5C", fontFamily: "var(--font-lora, serif)" }}>
                          {new Date(l.accessDate).toLocaleString("es-CO", { day: "2-digit", month: "short", year: "numeric", hour: "2-digit", minute: "2-digit" })}
                        </span>
                      </div>
                    </td>
                    <td className="px-5 py-3.5">
                      <span className="text-[0.65rem] tracking-widest uppercase px-2 py-0.5 rounded-full" style={{ background: "rgba(26,58,92,0.10)", color: "#1A3A5C", fontFamily: "var(--font-cinzel, serif)" }}>
                        {l.source ?? "web"}
                      </span>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          {totalPages > 1 && (
            <div className="flex items-center justify-between px-4 py-3 rounded-2xl" style={{ background: "linear-gradient(135deg, #e8dfc4, #d4c9a8)", border: "2px solid #B87333" }}>
              <p className="text-xs" style={{ color: "#B87333", fontFamily: "var(--font-lora, serif)" }}>Página {currentPage} de {totalPages}</p>
              <div className="flex gap-2">
                <button onClick={() => setOffset(Math.max(0, offset - LIMIT))} disabled={offset === 0} className="p-1.5 rounded-full disabled:opacity-30" style={{ color: "#1A3A5C" }}><ChevronLeft size={16} /></button>
                <button onClick={() => setOffset(offset + LIMIT)} disabled={offset + LIMIT >= total} className="p-1.5 rounded-full disabled:opacity-30" style={{ color: "#1A3A5C" }}><ChevronRight size={16} /></button>
              </div>
            </div>
          )}
        </>
      )}
    </div>
  );
}
