"use client";

import { Heart } from "lucide-react";

export default function AdminDonacionesPage() {
  return (
    <div className="flex flex-col gap-4 pt-6">
      <div className="flex items-start px-8">
        <div>
          <h1 className="text-2xl font-bold leading-tight" style={{ color: "#1A3A5C", fontFamily: "var(--font-cinzel, serif)" }}>
            Donaciones
          </h1>
          <p className="text-sm mt-0.5" style={{ color: "#B87333", fontFamily: "var(--font-lora, serif)" }}>
            Gestión de donaciones recibidas
          </p>
        </div>
      </div>

      <div
        className="p-16 flex flex-col items-center gap-6 text-center"
        style={{ background: "linear-gradient(135deg, #e8dfc4 0%, #d4c9a8 100%)" }}
      >
        <div
          className="w-20 h-20 rounded-full flex items-center justify-center"
          style={{ background: "linear-gradient(135deg, #1A3A5C, #1F4FA3)" }}
        >
          <Heart size={34} style={{ color: "#B87333" }} />
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
            Gestión de Donaciones
          </h2>
          <p
            className="text-sm leading-relaxed max-w-sm"
            style={{ color: "#1B6CA8", fontFamily: "var(--font-lora, serif)" }}
          >
            Aquí podrás ver y administrar todas las donaciones recibidas: monto, donante, fecha y estado de cada transacción.
          </p>
        </div>
        <div className="h-px w-32" style={{ background: "linear-gradient(90deg, transparent, #B87333, transparent)" }} />
        <p
          className="text-xs"
          style={{ color: "#B87333", fontFamily: "var(--font-lora, serif)", fontStyle: "italic" }}
        >
          En desarrollo · tabla <code className="font-mono not-italic">donations</code>
        </p>
      </div>
    </div>
  );
}
