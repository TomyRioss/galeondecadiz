"use client";

import { initMercadoPago, Wallet } from "@mercadopago/sdk-react";
import { useEffect } from "react";

initMercadoPago(process.env.NEXT_PUBLIC_MP_PUBLIC_KEY ?? "TEST-placeholder", {
  locale: "es-CO",
});

interface Props {
  preferenceId: string;
  onError?: (err: unknown) => void;
}

export default function MercadoPagoWallet({ preferenceId, onError }: Props) {
  return (
    <Wallet
      initialization={{ preferenceId }}
      customization={{ texts: { valueProp: "practicality" } }}
      onError={(err) => {
        console.error("[MP Wallet]", err);
        onError?.(err);
      }}
    />
  );
}
