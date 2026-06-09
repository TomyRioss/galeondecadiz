"use client";

import { useSearchParams } from "next/navigation";
import Link from "next/link";
import { Suspense } from "react";

function ConfirmacionContent() {
  const params = useSearchParams();
  const status = params.get("status");
  const orderId = params.get("order_id");

  const isSuccess = status === "success";
  const isPending = status === "pending";

  return (
    <div className="max-w-lg mx-auto px-6 py-20 text-center">
      {isSuccess && (
        <>
          <div className="text-6xl mb-6">✅</div>
          <h1
            className="text-3xl font-bold mb-4"
            style={{ fontFamily: "var(--font-cinzel, serif)", color: "#1A3A5C" }}
          >
            ¡Pago confirmado!
          </h1>
          <p style={{ color: "#1B6CA8", fontFamily: "var(--font-lora, serif)" }}>
            Revisá tu correo electrónico. Te enviamos el enlace de descarga del PDF y la información del envío físico.
          </p>
          {orderId && (
            <p className="mt-4 text-sm" style={{ color: "#1B6CA8" }}>
              Pedido: {orderId}
            </p>
          )}
        </>
      )}

      {isPending && (
        <>
          <div className="text-6xl mb-6">⏳</div>
          <h1
            className="text-3xl font-bold mb-4"
            style={{ fontFamily: "var(--font-cinzel, serif)", color: "#1A3A5C" }}
          >
            Pago en proceso
          </h1>
          <p style={{ color: "#1B6CA8", fontFamily: "var(--font-lora, serif)" }}>
            Tu pago está siendo verificado. Te notificaremos por correo cuando se confirme.
          </p>
        </>
      )}

      {!isSuccess && !isPending && (
        <>
          <div className="text-6xl mb-6">❌</div>
          <h1
            className="text-3xl font-bold mb-4"
            style={{ fontFamily: "var(--font-cinzel, serif)", color: "#1A3A5C" }}
          >
            Pago no completado
          </h1>
          <p style={{ color: "#1B6CA8", fontFamily: "var(--font-lora, serif)" }}>
            No se procesó el pago. Podés intentarlo de nuevo.
          </p>
        </>
      )}

      <Link
        href="/tienda"
        className="inline-block mt-8 px-8 py-3 rounded-lg text-white font-semibold"
        style={{ background: "linear-gradient(135deg, #E8511A, #B87333)" }}
      >
        Volver a la tienda
      </Link>
    </div>
  );
}

export default function ConfirmacionPage() {
  return (
    <div style={{ background: "#F5EDD6", minHeight: "100vh" }}>
      <Suspense fallback={<div className="py-20 text-center" style={{ color: "#1B6CA8" }}>Cargando...</div>}>
        <ConfirmacionContent />
      </Suspense>
    </div>
  );
}
