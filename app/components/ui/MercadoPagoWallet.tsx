"use client";

import { useEffect, useState } from "react";
import type { ComponentProps } from "react";

interface Props {
  onSubmit: () => Promise<string>;
  onError?: (err: unknown) => void;
}

export default function MercadoPagoWallet({ onSubmit, onError }: Props) {
  const [WalletComponent, setWalletComponent] = useState<React.ComponentType<any> | null>(null);

  useEffect(() => {
    const publicKey = process.env.NEXT_PUBLIC_MP_PUBLIC_KEY;
    if (!publicKey || publicKey === "TEST-placeholder") return;

    import("@mercadopago/sdk-react").then(({ initMercadoPago, Wallet }) => {
      initMercadoPago(publicKey, { locale: "es-CO" });
      setWalletComponent(() => Wallet);
    });
  }, []);

  if (!WalletComponent) {
    const publicKey = process.env.NEXT_PUBLIC_MP_PUBLIC_KEY;
    if (!publicKey || publicKey === "TEST-placeholder") {
      return (
        <div
          className="w-full py-3 rounded-xl text-center text-xs"
          style={{ background: "#009EE320", color: "#009EE3", border: "1px dashed #009EE3" }}
        >
          Configurar <code>NEXT_PUBLIC_MP_PUBLIC_KEY</code> para activar MercadoPago
        </div>
      );
    }
    return <div className="h-12 rounded-xl animate-pulse" style={{ background: "#009EE320" }} />;
  }

  return (
    <WalletComponent
      initialization={{ redirectMode: "self" }}
      customization={{ texts: { valueProp: "practicality" } }}
      onSubmit={() =>
        new Promise<string>((resolve, reject) => {
          onSubmit().then(resolve).catch(reject);
        })
      }
      onError={(err: unknown) => {
        console.error("[MP Wallet]", err);
        onError?.(err);
      }}
    />
  );
}
