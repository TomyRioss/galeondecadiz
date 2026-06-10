"use client";

import { ShoppingCart, Download } from "lucide-react";

export default function AdminPedidosPage() {
  return (
    <div className="flex flex-col gap-8">
      {/* Header */}
      <div className="flex items-start justify-between">
        <div className="flex items-start gap-4">
          <div className="w-1.5 h-14 rounded-full flex-shrink-0" style={{ background: "linear-gradient(180deg, #E8511A, #B87333)" }} />
          <div>
            <h1 className="text-2xl font-bold leading-tight" style={{ color: "#1A3A5C", fontFamily: "var(--font-cinzel, serif)" }}>
              Pedidos
            </h1>
            <p className="text-sm mt-0.5" style={{ color: "#B87333", fontFamily: "var(--font-lora, serif)" }}>
              Gestión de pedidos de libros
            </p>
          </div>
        </div>
        <button
          disabled
          className="flex items-center gap-2 px-5 py-2.5 rounded-full text-sm font-semibold opacity-40 cursor-not-allowed"
          style={{ background: "linear-gradient(90deg, #E8511A, #B87333)", color: "#F5EDD6", fontFamily: "var(--font-cinzel, serif)" }}
        >
          <Download size={14} />
          Exportar CSV
        </button>
      </div>

      {/* Empty state */}
      <div
        className="rounded-2xl border-2 p-16 flex flex-col items-center gap-6 text-center"
        style={{
          borderColor: "#B87333",
          background: "linear-gradient(135deg, #e8dfc4 0%, #d4c9a8 100%)",
          boxShadow: "0 4px 32px rgba(26,58,92,0.06)",
        }}
      >
        <div
          className="w-20 h-20 rounded-full flex items-center justify-center"
          style={{ background: "linear-gradient(135deg, #1A3A5C, #1F4FA3)" }}
        >
          <ShoppingCart size={34} style={{ color: "#B87333" }} />
        </div>
        <div>
          <p
            className="text-[0.6rem] tracking-[0.25em] uppercase font-semibold mb-3"
            style={{ color: "#E8511A", fontFamily: "var(--font-cinzel, serif)" }}
          >
            Próximamente
          </p>
          <h2
            className="text-xl font-bold mb-3"
            style={{ color: "#1A3A5C", fontFamily: "var(--font-cinzel, serif)" }}
          >
            Gestión de Pedidos
          </h2>
          <p
            className="text-sm leading-relaxed max-w-sm"
            style={{ color: "#1B6CA8", fontFamily: "var(--font-lora, serif)" }}
          >
            Aquí podrás ver y administrar todos los pedidos de la tienda: estado, datos de envío, historial y exportación de reportes.
          </p>
        </div>
        <div className="h-px w-32" style={{ background: "linear-gradient(90deg, transparent, #B87333, transparent)" }} />
        <p
          className="text-xs"
          style={{ color: "#B87333", fontFamily: "var(--font-lora, serif)", fontStyle: "italic" }}
        >
          En desarrollo · tabla <code className="font-mono not-italic">orders</code>
        </p>
      </div>
    </div>
  );
}
