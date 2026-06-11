"use client";

import dynamic from "next/dynamic";

const PdfFlipBook = dynamic(() => import("./PdfFlipBook"), {
  ssr: false,
  loading: () => (
    <div className="flex items-center gap-3 py-8">
      <div
        className="animate-spin w-8 h-8 rounded-full border-2 border-t-transparent"
        style={{ borderColor: "#B87333", borderTopColor: "transparent" }}
      />
      <span className="text-sm" style={{ color: "#B87333", fontFamily: "var(--font-lora, serif)" }}>
        Cargando catálogo…
      </span>
    </div>
  ),
});

export default function PdfFlipBookClient({ pdfUrl }: { pdfUrl: string }) {
  return <PdfFlipBook pdfUrl={pdfUrl} />;
}
