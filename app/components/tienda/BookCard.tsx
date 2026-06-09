"use client";

import Image from "next/image";
import Link from "next/link";

interface BookCardProps {
  slug: string;
  nombre: string;
  autor: string;
  descripcion: string;
  precioCop: number;
  precioUsd: number;
  coverUrl: string;
}

export default function BookCard({
  slug,
  nombre,
  autor,
  descripcion,
  precioCop,
  precioUsd,
  coverUrl,
}: BookCardProps) {
  return (
    <Link href={`/tienda/${slug}`} className="group block">
      <div
        className="rounded-xl overflow-hidden border-2 transition-transform duration-200 group-hover:-translate-y-1"
        style={{ borderColor: "#B87333", background: "linear-gradient(135deg, #e8dfc4 0%, #d4c9a8 100%)" }}
      >
        <div className="relative w-full h-56 overflow-hidden">
          <Image
            src={coverUrl}
            alt={`Portada de ${nombre}`}
            fill
            className="object-cover transition-transform duration-300 group-hover:scale-105"
            sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
          />
        </div>
        <div className="p-4 flex flex-col gap-2">
          <h3
            className="text-lg font-semibold leading-tight"
            style={{ fontFamily: "var(--font-cinzel, serif)", color: "#1A3A5C" }}
          >
            {nombre}
          </h3>
          <p className="text-sm" style={{ color: "#1B6CA8" }}>
            {autor}
          </p>
          <p
            className="text-sm line-clamp-3"
            style={{ color: "#1B6CA8", fontFamily: "var(--font-lora, serif)" }}
          >
            {descripcion}
          </p>
          <div className="mt-2 flex flex-col gap-1">
            <span className="text-sm font-bold" style={{ color: "#B87333" }}>
              ${precioCop.toLocaleString("es-CO")} COP
            </span>
            <span className="text-xs" style={{ color: "#1B6CA8" }}>
              ${precioUsd.toFixed(2)} USD
            </span>
          </div>
          <div
            className="mt-3 w-full py-2 rounded-lg text-center text-white text-sm font-semibold"
            style={{ background: "linear-gradient(135deg, #E8511A, #B87333)" }}
          >
            Ver libro
          </div>
        </div>
      </div>
    </Link>
  );
}
