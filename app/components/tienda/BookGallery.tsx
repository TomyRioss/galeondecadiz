"use client";

import { useState } from "react";
import Image from "next/image";

interface Props {
  images: string[];
  alt: string;
}

export default function BookGallery({ images, alt }: Props) {
  const [active, setActive] = useState(0);
  const list = images.length > 0 ? images : [];

  if (list.length === 0) {
    return (
      <div
        className="flex-shrink-0 rounded-xl md:rounded-2xl overflow-hidden shadow-2xl flex items-center justify-center"
        style={{ border: "2px solid #B87333", width: "clamp(100px, 28vw, 220px)", aspectRatio: "2/3", background: "#0f2440" }}
      >
        <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="#B87333" strokeWidth="1.5">
          <path d="M2 3h6a4 4 0 0 1 4 4v14a3 3 0 0 0-3-3H2z" />
          <path d="M22 3h-6a4 4 0 0 0-4 4v14a3 3 0 0 1 3-3h7z" />
        </svg>
      </div>
    );
  }

  return (
    <div className="flex flex-col gap-3" style={{ width: "clamp(100px, 28vw, 220px)" }}>
      <div
        className="flex-shrink-0 rounded-xl md:rounded-2xl overflow-hidden shadow-2xl"
        style={{ border: "2px solid #B87333", aspectRatio: "2/3" }}
      >
        <Image src={list[active]} alt={alt} width={220} height={330} className="object-cover w-full h-full" priority />
      </div>
      {list.length > 1 && (
        <div className="flex gap-1.5 overflow-x-auto pb-1">
          {list.map((url, i) => (
            <button
              key={url}
              type="button"
              onClick={() => setActive(i)}
              className="flex-shrink-0 rounded-md overflow-hidden transition-opacity"
              style={{
                width: 36,
                height: 54,
                border: i === active ? "2px solid #E8511A" : "1.5px solid #B87333",
                opacity: i === active ? 1 : 0.7,
              }}
            >
              <Image src={url} alt={`${alt} ${i + 1}`} width={36} height={54} className="object-cover w-full h-full" />
            </button>
          ))}
        </div>
      )}
    </div>
  );
}
