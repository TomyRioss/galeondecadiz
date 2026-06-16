"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { User, Mail, Phone, MapPin, Clock, ChevronLeft, ChevronRight } from "lucide-react";

interface EbookUser {
  id: string;
  fullName: string;
  email: string;
  phone: string | null;
  city: string | null;
  country: string | null;
  createdAt: string;
  lastAccessAt: string | null;
  totalAccesos: number;
}

const LIMIT = 20;

export default function AdminEbookPage() {
  const [records, setRecords] = useState<EbookUser[]>([]);
  const [total, setTotal] = useState(0);
  const [loading, setLoading] = useState(true);
  const [offset, setOffset] = useState(0);

  useEffect(() => {
    setLoading(true);
    const params = new URLSearchParams({ limit: String(LIMIT), offset: String(offset) });
    fetch(`/api/admin/ebook/users?${params}`)
      .then((r) => r.json())
      .then((data) => { setRecords(data.records || []); setTotal(data.total || 0); })
      .catch((err) => console.error("[ebook/users]", err))
      .finally(() => setLoading(false));
  }, [offset]);

  function exportCSV() {
    const headers = ["Nombre", "Correo", "Teléfono", "Ciudad", "País", "Registro", "Último acceso", "Accesos"];
    const rows = records.map((u) => [
      u.fullName, u.email, u.phone ?? "", u.city ?? "", u.country ?? "",
      new Date(u.createdAt).toLocaleString("es-CO"),
      u.lastAccessAt ? new Date(u.lastAccessAt).toLocaleString("es-CO") : "",
      u.totalAccesos,
    ]);
    const csv = [headers, ...rows].map((r) => r.map((c) => `"${c}"`).join(",")).join("\n");
    const blob = new Blob([csv], { type: "text/csv;charset=utf-8;" });
    const a = document.createElement("a");
    a.href = URL.createObjectURL(blob);
    a.download = `lectores-ebook-${new Date().toISOString().slice(0, 10)}.csv`;
    a.click();
  }

  const totalPages = Math.ceil(total / LIMIT);
  const currentPage = Math.floor(offset / LIMIT) + 1;

  return (
    <div className="flex flex-col gap-4 pt-6 pb-12 px-4 md:px-8">
      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-3">
        <div>
          <h1 className="text-2xl font-bold" style={{ color: "#1A3A5C", fontFamily: "var(--font-cinzel, serif)" }}>
            Lectores E-Book
          </h1>
          <p className="text-sm mt-0.5" style={{ color: "#B87333", fontFamily: "var(--font-lora, serif)" }}>
            {total > 0 ? `${total} lector${total !== 1 ? "es" : ""} registrado${total !== 1 ? "s" : ""}` : "Sin lectores aún"}
          </p>
        </div>
        <div className="flex gap-2">
          <Link
            href="/admin/ebook/historial"
            className="px-4 py-2 rounded-full text-xs font-semibold tracking-widest uppercase"
            style={{ background: "#1A3A5C", color: "#F5EDD6", fontFamily: "var(--font-cinzel, serif)" }}
          >
            Historial
          </Link>
          {records.length > 0 && (
            <button
              onClick={exportCSV}
              className="px-4 py-2 rounded-full text-xs font-semibold tracking-widest uppercase hover:opacity-90"
              style={{ background: "linear-gradient(90deg, #E8511A, #B87333)", color: "#F5EDD6", fontFamily: "var(--font-cinzel, serif)" }}
            >
              Exportar CSV
            </button>
          )}
        </div>
      </div>

      {/* Content */}
      {loading ? (
        <div className="flex items-center justify-center py-20">
          <div className="animate-spin w-10 h-10 rounded-full border-2" style={{ borderColor: "#B87333", borderTopColor: "transparent" }} />
        </div>
      ) : records.length === 0 ? (
        <div className="rounded-2xl p-10 text-center" style={{ background: "linear-gradient(135deg, #e8dfc4, #d4c9a8)", border: "2px solid #B87333" }}>
          <p className="text-sm" style={{ color: "#1A3A5C", fontFamily: "var(--font-lora, serif)" }}>
            Ningún lector registrado aún.
          </p>
        </div>
      ) : (
        <>
          <div className="rounded-2xl overflow-hidden" style={{ border: "2px solid #B87333" }}>
            <table className="w-full text-sm">
              <thead>
                <tr style={{ background: "#1A3A5C" }}>
                  {["Lector", "Correo", "Ubicación", "Registro", "Último acceso", "Accesos"].map((h) => (
                    <th key={h} className="px-5 py-3.5 text-left text-[0.6rem] tracking-[0.2em] uppercase font-semibold" style={{ color: "#B87333", fontFamily: "var(--font-cinzel, serif)" }}>
                      {h}
                    </th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {records.map((u, i) => (
                  <tr key={u.id} style={{ background: i % 2 === 0 ? "linear-gradient(135deg, #e8dfc4, #d4c9a8)" : "linear-gradient(135deg, #ddd0b0, #cfc2a0)" }}>
                    <td className="px-5 py-3.5">
                      <div className="flex items-center gap-2">
                        <User size={11} style={{ color: "#B87333" }} />
                        <span className="font-semibold text-xs" style={{ color: "#1A3A5C", fontFamily: "var(--font-cinzel, serif)" }}>{u.fullName}</span>
                      </div>
                    </td>
                    <td className="px-5 py-3.5">
                      <div className="flex items-center gap-2">
                        <Mail size={11} style={{ color: "#B87333" }} />
                        <a href={`mailto:${u.email}`} className="text-xs hover:underline" style={{ color: "#1A3A5C", fontFamily: "var(--font-lora, serif)" }}>{u.email}</a>
                      </div>
                    </td>
                    <td className="px-5 py-3.5">
                      <div className="flex items-center gap-2">
                        <MapPin size={11} style={{ color: "#B87333" }} />
                        <span className="text-xs" style={{ color: "#1A3A5C", fontFamily: "var(--font-lora, serif)" }}>
                          {[u.city, u.country].filter(Boolean).join(", ") || "—"}
                        </span>
                      </div>
                    </td>
                    <td className="px-5 py-3.5">
                      <span className="text-xs" style={{ color: "#1A3A5C", fontFamily: "var(--font-lora, serif)" }}>
                        {new Date(u.createdAt).toLocaleDateString("es-CO")}
                      </span>
                    </td>
                    <td className="px-5 py-3.5">
                      <div className="flex items-center gap-2">
                        <Clock size={11} style={{ color: "#B87333" }} />
                        <span className="text-xs" style={{ color: "#1A3A5C", fontFamily: "var(--font-lora, serif)" }}>
                          {u.lastAccessAt ? new Date(u.lastAccessAt).toLocaleDateString("es-CO") : "—"}
                        </span>
                      </div>
                    </td>
                    <td className="px-5 py-3.5">
                      <span
                        className="inline-flex items-center px-2 py-0.5 rounded-full text-[0.6rem] font-semibold tracking-widest"
                        style={{ background: "rgba(26,58,92,0.12)", color: "#1A3A5C", fontFamily: "var(--font-cinzel, serif)" }}
                      >
                        {u.totalAccesos}
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
