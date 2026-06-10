"use client";

import { MessageSquare } from "lucide-react";

export default function TestimoniosPage() {
  return (
    <div className="flex flex-col gap-8">
      {/* Header */}
      <div className="flex items-start gap-4">
        <div className="w-1.5 h-14 rounded-full flex-shrink-0" style={{ background: "linear-gradient(180deg, #E8511A, #B87333)" }} />
        <div>
          <h1 className="text-2xl font-bold leading-tight" style={{ color: "#1A3A5C", fontFamily: "var(--font-cinzel, serif)" }}>
            Testimonios
          </h1>
          <p className="text-sm mt-0.5" style={{ color: "#B87333", fontFamily: "var(--font-lora, serif)" }}>
            Moderación de testimonios y reseñas
          </p>
        </div>
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
          <MessageSquare size={34} style={{ color: "#B87333" }} />
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
            Gestión de Testimonios
          </h2>
          <p
            className="text-sm leading-relaxed max-w-sm"
            style={{ color: "#1B6CA8", fontFamily: "var(--font-lora, serif)" }}
          >
            Revisá, aprobá y moderá los testimonios enviados por lectores y beneficiarios antes de publicarlos en el sitio.
          </p>
        </div>
        <div className="h-px w-32" style={{ background: "linear-gradient(90deg, transparent, #B87333, transparent)" }} />
        <p
          className="text-xs"
          style={{ color: "#B87333", fontFamily: "var(--font-lora, serif)", fontStyle: "italic" }}
        >
          En construcción
        </p>
      </div>
    </div>
  );
}
