"use client";

import { useEffect, useState } from "react";
import {
  User,
  Mail,
  BookOpen,
  DollarSign,
  ChevronLeft,
  ChevronRight,
  ShoppingCart,
  CheckCircle,
  Clock,
  XCircle,
  Truck,
  PackageCheck,
  ChevronDown,
} from "lucide-react";

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

const TOGGLE_CYCLE: Record<string, string> = {
  PENDING: "ENVIADO",
  ENVIADO: "RECIBIDO",
  RECIBIDO: "PENDING",
};

const ESTADO_CONFIG: Record<string, { label: string; bg: string; color: string; border: string; Icon: React.ElementType }> = {
  PENDING:  { label: "Pendiente", bg: "rgba(232,81,26,0.10)", color: "#E8511A", border: "rgba(232,81,26,0.35)", Icon: Clock },
  PAID:     { label: "Pagado",    bg: "rgba(26,58,92,0.12)",  color: "#1A3A5C", border: "rgba(26,58,92,0.3)",   Icon: CheckCircle },
  FAILED:   { label: "Fallido",   bg: "rgba(100,0,0,0.10)",   color: "#7f1d1d", border: "rgba(127,29,29,0.3)", Icon: XCircle },
  ENVIADO:  { label: "Enviado",   bg: "rgba(31,79,163,0.12)", color: "#1F4FA3", border: "rgba(31,79,163,0.35)", Icon: Truck },
  RECIBIDO: { label: "Recibido",  bg: "rgba(74,222,128,0.12)",color: "#166534", border: "rgba(74,222,128,0.4)", Icon: PackageCheck },
};

export default function AdminPedidosPage() {
  const [records, setRecords] = useState<OrderRecord[]>([]);
  const [total, setTotal] = useState(0);
  const [loading, setLoading] = useState(true);
  const [offset, setOffset] = useState(0);
  const [updating, setUpdating] = useState<string | null>(null);
  const [expanded, setExpanded] = useState<Set<string>>(new Set());
  const [toast, setToast] = useState<{ msg: string; ok: boolean } | null>(null);
  const [testingSend, setTestingSend] = useState<string | null>(null);

  async function sendTestEmail(id: string) {
    setTestingSend(id);
    try {
      const res = await fetch("/api/admin/test-email", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ type: "pedido", recordId: id }),
      });
      if (!res.ok) throw new Error();
      showToast("Email de prueba enviado a tomyrios2006@gmail.com", true);
    } catch {
      showToast("Error al enviar email de prueba", false);
    } finally {
      setTestingSend(null);
    }
  }

  function showToast(msg: string, ok: boolean) {
    setToast({ msg, ok });
    setTimeout(() => setToast(null), 3000);
  }

  function toggleExpand(id: string) {
    setExpanded((prev) => {
      const next = new Set(prev);
      next.has(id) ? next.delete(id) : next.add(id);
      return next;
    });
  }

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

  async function toggleEstado(e: React.MouseEvent, record: OrderRecord) {
    e.stopPropagation();
    const next = TOGGLE_CYCLE[record.estado];
    if (!next) return;
    const prev = record.estado;

    setRecords((rs) => rs.map((r) => (r.id === record.id ? { ...r, estado: next } : r)));
    setUpdating(record.id);

    try {
      const res = await fetch(`/api/admin/orders/${record.id}`, {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ estado: next }),
      });
      if (!res.ok) throw new Error();
      showToast(`Estado → ${ESTADO_CONFIG[next]?.label ?? next}`, true);
    } catch {
      setRecords((rs) => rs.map((r) => (r.id === record.id ? { ...r, estado: prev } : r)));
      showToast("Error al actualizar estado", false);
    } finally {
      setUpdating(null);
    }
  }

  const totalPages = Math.ceil(total / LIMIT);
  const currentPage = Math.floor(offset / LIMIT) + 1;

  return (
    <div className="flex flex-col gap-4 pt-6 pb-12 px-4 md:px-8">
      {/* Toast */}
      {toast && (
        <div
          className="fixed top-4 right-4 z-50 px-5 py-3 rounded-xl text-sm font-semibold shadow-xl"
          style={{
            background: toast.ok ? "rgba(26,58,92,0.95)" : "rgba(232,81,26,0.95)",
            color: "#F5EDD6",
            fontFamily: "var(--font-lora, serif)",
            border: `1px solid ${toast.ok ? "#B87333" : "#E8511A"}`,
          }}
        >
          {toast.msg}
        </div>
      )}

      {/* Header */}
      <div className="flex items-start justify-between gap-4">
        <div>
          <h1
            className="text-2xl font-bold leading-tight"
            style={{ color: "#1A3A5C", fontFamily: "var(--font-cinzel, serif)" }}
          >
            Pedidos
          </h1>
          <p className="text-sm mt-0.5" style={{ color: "#B87333", fontFamily: "var(--font-lora, serif)" }}>
            {total > 0 ? `${total} pedido${total !== 1 ? "s" : ""} en total` : "Compras de ebooks"}
          </p>
        </div>
        <button
          onClick={() => records[0] && sendTestEmail(records[0].id)}
          disabled={!records[0] || testingSend !== null}
          className="px-4 py-2 rounded-full text-sm font-semibold transition-all hover:opacity-90 flex items-center gap-2 disabled:opacity-40 shrink-0"
          style={{ background: "rgba(232,81,26,0.12)", color: "#E8511A", border: "1.5px solid rgba(232,81,26,0.35)", fontFamily: "var(--font-cinzel, serif)" }}
        >
          {testingSend ? "Enviando…" : "🧪 Test email"}
        </button>
      </div>

      {/* Content */}
      {loading ? (
        <div className="flex flex-col items-center gap-4 py-20">
          <div
            className="animate-spin w-10 h-10 rounded-full border-2"
            style={{ borderColor: "#B87333", borderTopColor: "transparent" }}
          />
          <p className="text-sm" style={{ color: "#1A3A5C", fontFamily: "var(--font-lora, serif)" }}>
            Cargando pedidos…
          </p>
        </div>
      ) : records.length === 0 ? (
        <div className="flex flex-col items-center gap-6 py-20 text-center">
          <div
            className="w-20 h-20 rounded-full flex items-center justify-center"
            style={{ background: "linear-gradient(135deg, #1A3A5C, #1F4FA3)" }}
          >
            <ShoppingCart size={34} style={{ color: "#B87333" }} />
          </div>
          <p className="text-sm" style={{ color: "#1B6CA8", fontFamily: "var(--font-lora, serif)" }}>
            No hay pedidos aún.
          </p>
        </div>
      ) : (
        <>
          <div
            className="rounded-2xl overflow-hidden"
            style={{ border: "2px solid #B87333" }}
          >
            {records.map((r, i) => {
              const cfg = ESTADO_CONFIG[r.estado] ?? ESTADO_CONFIG.PENDING;
              const canToggle = r.estado in TOGGLE_CYCLE;
              const IconEstado = cfg.Icon;
              const isOpen = expanded.has(r.id);

              return (
                <div
                  key={r.id}
                  style={{
                    borderBottom: i < records.length - 1 ? "1px solid rgba(184,115,51,0.25)" : "none",
                  }}
                >
                  {/* Row header — always visible */}
                  <button
                    onClick={() => toggleExpand(r.id)}
                    className="w-full flex items-center gap-3 px-5 py-4 text-left transition-colors"
                    style={{
                      background: isOpen
                        ? "linear-gradient(90deg, rgba(26,58,92,0.07), rgba(26,58,92,0.03))"
                        : i % 2 === 0
                        ? "linear-gradient(135deg, #e8dfc4, #d4c9a8)"
                        : "linear-gradient(135deg, #ddd0b0, #cfc2a0)",
                    }}
                  >
                    {/* Chevron */}
                    <ChevronDown
                      size={14}
                      style={{
                        color: "#B87333",
                        flexShrink: 0,
                        transform: isOpen ? "rotate(180deg)" : "rotate(0deg)",
                        transition: "transform 0.2s",
                      }}
                    />

                    {/* Nombre + ID */}
                    <span className="flex-1 flex items-center gap-2 min-w-0">
                      <span
                        className="text-sm font-semibold truncate"
                        style={{ color: "#1A3A5C", fontFamily: "var(--font-cinzel, serif)" }}
                      >
                        {r.buyerName}
                      </span>
                      <span
                        className="text-xs font-mono shrink-0"
                        style={{ color: "#B87333" }}
                      >
                        #{r.id.slice(0, 8)}
                      </span>
                    </span>

                    {/* Libro */}
                    <span
                      className="hidden md:block text-xs truncate max-w-[200px]"
                      style={{ color: "#1B6CA8", fontFamily: "var(--font-lora, serif)" }}
                    >
                      {r.bookNombre}
                    </span>

                    {/* Monto */}
                    <span
                      className="text-xs font-semibold ml-2"
                      style={{ color: "#1A3A5C", fontFamily: "var(--font-lora, serif)" }}
                    >
                      {r.moneda === "COP"
                        ? `$${r.monto.toLocaleString("es-CO")} COP`
                        : `$${r.monto.toFixed(2)} USD`}
                    </span>

                    {/* Estado badge */}
                    <button
                      onClick={(e) => toggleEstado(e, r)}
                      disabled={!canToggle || updating === r.id}
                      className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-[0.58rem] tracking-widest uppercase font-semibold ml-2 transition-all"
                      style={{
                        background: cfg.bg,
                        color: cfg.color,
                        border: `1.5px solid ${cfg.border}`,
                        fontFamily: "var(--font-cinzel, serif)",
                        cursor: canToggle ? "pointer" : "default",
                        opacity: updating === r.id ? 0.5 : 1,
                        flexShrink: 0,
                      }}
                    >
                      <IconEstado size={9} />
                      {updating === r.id ? "…" : cfg.label}
                    </button>
                  </button>

                  {/* Expanded detail */}
                  {isOpen && (
                    <div
                      className="px-8 py-5 flex flex-col gap-4"
                      style={{
                        background: "linear-gradient(135deg, #e8dfc4 0%, #d4c9a8 100%)",
                        borderTop: "1px solid rgba(184,115,51,0.2)",
                      }}
                    >
                      {/* Mensaje compra recibida */}
                      <div
                        className="rounded-xl px-4 py-3 flex items-center justify-between gap-4"
                        style={{ background: "rgba(26,58,92,0.07)", border: "1px solid rgba(184,115,51,0.25)" }}
                      >
                        <p
                          className="text-[0.65rem] tracking-[0.2em] uppercase font-semibold"
                          style={{ color: "#B87333", fontFamily: "var(--font-cinzel, serif)" }}
                        >
                          Compra recibida ✓ —{" "}
                          {new Date(r.createdAt).toLocaleDateString("es-CO", {
                            day: "2-digit",
                            month: "long",
                            year: "numeric",
                          })}
                        </p>
                        <p
                          className="text-[0.6rem] font-mono shrink-0"
                          style={{ color: "rgba(26,58,92,0.45)" }}
                        >
                          #{r.id.slice(0, 8)}
                        </p>
                      </div>

                      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        {/* Datos comprador */}
                        <div className="flex flex-col gap-2">
                          <p
                            className="text-[0.6rem] tracking-[0.2em] uppercase font-semibold mb-1"
                            style={{ color: "#B87333", fontFamily: "var(--font-cinzel, serif)" }}
                          >
                            Datos del comprador
                          </p>
                          <div className="flex items-center gap-2">
                            <User size={12} style={{ color: "#B87333", flexShrink: 0 }} />
                            <span className="text-sm font-semibold" style={{ color: "#1A3A5C", fontFamily: "var(--font-cinzel, serif)" }}>
                              {r.buyerName}
                            </span>
                          </div>
                          <div className="flex items-center gap-2">
                            <Mail size={11} style={{ color: "#B87333", flexShrink: 0 }} />
                            <a
                              href={`mailto:${r.buyerEmail}`}
                              className="text-xs hover:underline underline-offset-2"
                              style={{ color: "#1A3A5C", fontFamily: "var(--font-lora, serif)" }}
                            >
                              {r.buyerEmail}
                            </a>
                          </div>
                        </div>

                        {/* Producto */}
                        <div className="flex flex-col gap-2">
                          <p
                            className="text-[0.6rem] tracking-[0.2em] uppercase font-semibold mb-1"
                            style={{ color: "#B87333", fontFamily: "var(--font-cinzel, serif)" }}
                          >
                            Producto
                          </p>
                          <div className="flex items-center gap-2">
                            <BookOpen size={12} style={{ color: "#B87333", flexShrink: 0 }} />
                            <span className="text-xs font-semibold" style={{ color: "#1A3A5C", fontFamily: "var(--font-cinzel, serif)" }}>
                              {r.bookNombre}
                            </span>
                          </div>
                          <div className="flex items-center gap-2 pl-1">
                            <DollarSign size={11} style={{ color: "#B87333", flexShrink: 0 }} />
                            <span className="text-xs" style={{ color: "#1A3A5C", fontFamily: "var(--font-lora, serif)" }}>
                              {r.moneda === "COP"
                                ? `$${r.monto.toLocaleString("es-CO")} COP`
                                : `$${r.monto.toFixed(2)} USD`}
                            </span>
                          </div>
                          <div className="flex items-center gap-2 pl-1">
                            <span
                              className="text-[0.65rem] tracking-widest uppercase"
                              style={{ color: "#B87333", fontFamily: "var(--font-cinzel, serif)" }}
                            >
                              Cantidad: 1
                            </span>
                          </div>
                        </div>
                      </div>

                      {/* Test email */}
                      <div className="flex items-center gap-3 pt-1">
                        <button
                          onClick={() => sendTestEmail(r.id)}
                          disabled={testingSend === r.id}
                          className="px-4 py-2 rounded-full text-[0.6rem] tracking-widest uppercase font-semibold transition-all hover:opacity-80 disabled:opacity-40"
                          style={{ background: "rgba(232,81,26,0.12)", color: "#E8511A", border: "1.5px solid rgba(232,81,26,0.3)", fontFamily: "var(--font-cinzel, serif)" }}
                        >
                          {testingSend === r.id ? "Enviando…" : "🧪 Test email"}
                        </button>
                        {r.emailEnviado && (
                          <span className="text-[0.6rem] tracking-widest uppercase font-semibold" style={{ color: "#B87333", fontFamily: "var(--font-cinzel, serif)" }}>✓ email enviado</span>
                        )}
                      </div>

                    </div>
                  )}
                </div>
              );
            })}
          </div>

          {/* Paginación */}
          {totalPages > 1 && (
            <div
              className="flex items-center justify-between px-4 py-3 rounded-2xl"
              style={{
                background: "linear-gradient(135deg, #e8dfc4, #d4c9a8)",
                border: "2px solid #B87333",
              }}
            >
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
  );
}
