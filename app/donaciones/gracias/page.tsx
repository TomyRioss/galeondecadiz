"use client";

import { useEffect, useRef, useState, Suspense } from "react";
import { useSearchParams } from "next/navigation";
import Link from "next/link";
import { FaHeart, FaWhatsapp } from "react-icons/fa6";

const WA_NUMBER = "573112524239";

function DonacionesGraciasContent() {
  const params = useSearchParams();
  const registered = useRef(false);
  const [done, setDone] = useState(false);

  useEffect(() => {
    if (registered.current) return;
    registered.current = true;
    setDone(true);
  }, [params]);

  return (
    <div style={{ background: "#F5EDD6", minHeight: "100vh" }} className="flex items-center justify-center px-6 py-16">
      <div
        className="max-w-md w-full rounded-2xl p-8 text-center"
        style={{ background: "linear-gradient(135deg, #e8dfc4, #d4c9a8)", border: "2px solid #B87333" }}
      >
        <FaHeart size={32} className="mx-auto mb-4" style={{ color: "#B87333" }} />
        <h2
          className="text-xl font-bold mb-3"
          style={{ color: "#1A3A5C", fontFamily: "var(--font-cinzel, serif)" }}
        >
          ¡Gracias por tu donación!
        </h2>
        <p
          className="text-sm mb-6"
          style={{ color: "#1A3A5C", fontFamily: "var(--font-lora, serif)" }}
        >
          Tu pago fue procesado exitosamente. La Fundación Galeona de Cádiz agradece tu apoyo.
        </p>
        <div className="flex flex-col gap-3">
          <a
            href={`https://wa.me/${WA_NUMBER}?text=${encodeURIComponent("Hola, acabo de realizar una donación en galeonadecadiz.org y quisiera confirmar el proceso.")}`}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center justify-center gap-2 px-6 py-2.5 rounded-full text-white text-sm font-semibold"
            style={{ background: "#2E6B3E", fontFamily: "var(--font-cinzel, serif)" }}
          >
            <FaWhatsapp size={14} />
            Confirmar por WhatsApp
          </a>
          <Link
            href="/"
            className="text-xs tracking-wide transition-colors hover:opacity-70"
            style={{ color: "#B87333", fontFamily: "var(--font-cinzel, serif)" }}
          >
            Volver al inicio
          </Link>
        </div>
      </div>
    </div>
  );
}

export default function DonacionesGraciasPage() {
  return (
    <Suspense fallback={<div style={{ background: "#F5EDD6", minHeight: "100vh" }} />}>
      <DonacionesGraciasContent />
    </Suspense>
  );
}
