"use client";

import Image from "next/image";
import Link from "next/link";
import { ShoppingCart } from "lucide-react";

interface BookCardProps {
  slug: string;
  nombre: string;
  autor: string;
  descripcion: string;
  precioCop: number;
  precioUsd: number;
  coverUrl: string;
  disponibleCompra?: boolean;
  stock?: number;
}

export default function BookCard({ slug, nombre, precioCop, precioUsd, coverUrl, disponibleCompra, stock }: BookCardProps) {
  const hayStock = stock === undefined || stock > 0;
  return (
    <div className="group flex flex-col">
      <Link href={`/tienda/${slug}`} className="block">
        <div
          className="rounded-t-xl overflow-hidden border-x border-t shadow-md"
          style={{ borderColor: "#B87333" }}
        >
          <div className="relative w-full aspect-[2/3]">
            <Image
              src={coverUrl}
              alt={`Portada de ${nombre}`}
              fill
              className="object-cover"
              sizes="(max-width: 640px) 50vw, (max-width: 1024px) 33vw, 25vw"
            />
          </div>
          <div
            className="px-4 py-3 flex flex-col gap-0.5"
            style={{ background: "linear-gradient(135deg, #e8dfc4, #d4c9a8)" }}
          >
            <p
              className="text-sm font-semibold leading-snug line-clamp-2"
              style={{ color: "#1A3A5C", fontFamily: "var(--font-cinzel, serif)" }}
            >
              {nombre}
            </p>
            <div className="flex items-baseline gap-2 mt-1">
              <span className="text-sm font-bold" style={{ color: "#B87333", fontFamily: "var(--font-cinzel, serif)" }}>
                ${precioCop.toLocaleString("es-CO")} COP
              </span>
              <span className="text-xs" style={{ color: "#8a7a5a", fontFamily: "var(--font-lora, serif)" }}>
                ${precioUsd.toFixed(2)} USD
              </span>
            </div>
          </div>
        </div>
      </Link>
      {disponibleCompra && hayStock ? (
        <Link
          href={`/checkout?slug=${slug}`}
          className="flex items-center justify-center gap-2 text-xs font-semibold tracking-widest uppercase py-2.5 rounded-b-xl transition-opacity hover:opacity-90"
          style={{ background: "linear-gradient(90deg, #E8511A, #B87333)", color: "#F5EDD6", fontFamily: "var(--font-cinzel, serif)" }}
        >
          <ShoppingCart size={13} />
          Comprar ahora
        </Link>
      ) : disponibleCompra && !hayStock ? (
        <div
          className="flex items-center justify-center text-xs font-semibold tracking-widest uppercase py-2.5 rounded-b-xl"
          style={{ background: "#C0392B22", color: "#C0392B", fontFamily: "var(--font-cinzel, serif)" }}
        >
          Agotado
        </div>
      ) : null}
    </div>
  );
}
