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

export default function BookCard({ slug, nombre, precioCop, precioUsd, coverUrl }: BookCardProps) {
  return (
    <Link href={`/tienda/${slug}`} className="group block">
      <div
        className="rounded-xl overflow-hidden border transition-transform duration-200 group-hover:-translate-y-1 shadow-md"
        style={{ borderColor: "#B87333" }}
      >
        <div className="relative w-full aspect-[2/3]">
          <Image
            src={coverUrl}
            alt={`Portada de ${nombre}`}
            fill
            className="object-cover transition-transform duration-300 group-hover:scale-105"
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
  );
}
