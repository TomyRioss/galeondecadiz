"use client";

import { useState } from "react";
import Image from "next/image";
import { X } from "lucide-react";

const labelCls = "flex items-center gap-1.5 text-[0.6rem] tracking-[0.22em] uppercase font-semibold mb-1.5";
const labelStyle = { color: "#B87333", fontFamily: "var(--font-cinzel, serif)" };

async function uploadOne(file: File | Blob, name: string): Promise<string> {
  const fd = new FormData();
  fd.append("file", file, name);
  fd.append("bucket", "book-gallery");
  const res = await fetch("/api/admin/upload", { method: "POST", body: fd });
  const data = await res.json();
  if (!res.ok) throw new Error(data.error ?? "Error al subir imagen");
  return data.url as string;
}

async function extractPdfPages(pdfUrl: string): Promise<string[]> {
  const { pdfjs } = await import("react-pdf");
  pdfjs.GlobalWorkerOptions.workerSrc = `//unpkg.com/pdfjs-dist@${pdfjs.version}/build/pdf.worker.min.mjs`;
  const doc = await pdfjs.getDocument(pdfUrl).promise;
  const urls: string[] = [];
  for (let i = 1; i <= doc.numPages; i++) {
    const page = await doc.getPage(i);
    const viewport = page.getViewport({ scale: 1.5 });
    const canvas = document.createElement("canvas");
    canvas.width = viewport.width;
    canvas.height = viewport.height;
    const ctx = canvas.getContext("2d")!;
    await page.render({ canvasContext: ctx, viewport, canvas }).promise;
    const blob: Blob = await new Promise((resolve) => canvas.toBlob((b) => resolve(b!), "image/jpeg", 0.85));
    const url = await uploadOne(blob, `page-${i}.jpg`);
    urls.push(url);
  }
  return urls;
}

interface Props {
  galleryImages: string[];
  pdfPageImages: string[];
  pdfUrl: string;
  onChange: (next: { galleryImages: string[]; pdfPageImages: string[] }) => void;
}

export default function GalleryUploader({ galleryImages, pdfPageImages, pdfUrl, onChange }: Props) {
  const [uploading, setUploading] = useState(false);
  const [extracting, setExtracting] = useState(false);
  const [err, setErr] = useState("");

  async function handleFiles(files: FileList | null) {
    if (!files || files.length === 0) return;
    setUploading(true);
    setErr("");
    try {
      const uploaded = [...galleryImages];
      for (const f of Array.from(files)) {
        const url = await uploadOne(f, f.name);
        uploaded.push(url);
        onChange({ galleryImages: [...uploaded], pdfPageImages });
      }
    } catch (e) {
      setErr(e instanceof Error ? e.message : "Error al subir imágenes");
    } finally {
      setUploading(false);
    }
  }

  async function handleExtract() {
    if (!pdfUrl) return;
    setExtracting(true);
    setErr("");
    try {
      const urls = await extractPdfPages(pdfUrl);
      onChange({ galleryImages, pdfPageImages: urls });
    } catch (e) {
      console.error("[extractPdfPages]", e);
      setErr(e instanceof Error ? e.message : "Error al generar imágenes del PDF");
    } finally {
      setExtracting(false);
    }
  }

  function removeGalleryImage(idx: number) {
    onChange({ galleryImages: galleryImages.filter((_, i) => i !== idx), pdfPageImages });
  }

  return (
    <section
      className="rounded-xl p-4 border-2"
      style={{ background: "linear-gradient(160deg,#ede4cb 0%,#ddd0b0 100%)", borderColor: "#B87333", boxShadow: "0 4px 24px rgba(26,58,92,0.08)" }}
    >
      <div className="flex items-center gap-2 mb-3">
        <span className="text-[0.6rem] tracking-[0.25em] uppercase font-semibold" style={{ color: "#B87333", fontFamily: "var(--font-cinzel, serif)" }}>
          Galería de imágenes
        </span>
      </div>

      {err && <p className="text-xs mb-2" style={{ color: "#C0392B" }}>{err}</p>}

      <div className="flex flex-col gap-2">
        <div>
          <label className={labelCls} style={labelStyle}>Subir imágenes (portada, contraportada, solapas…)</label>
          <label
            className="flex items-center justify-center gap-2 px-3 py-2.5 rounded-xl text-xs border-2 cursor-pointer transition-all hover:border-[#E8511A]"
            style={{ background: "#F5EDD6", borderColor: "#B87333", color: "#1A3A5C", opacity: uploading ? 0.6 : 1 }}
          >
            <span>{uploading ? "Subiendo…" : "Seleccionar imágenes"}</span>
            <input type="file" accept="image/*" multiple hidden disabled={uploading} onChange={(e) => handleFiles(e.target.files)} />
          </label>
        </div>

        {pdfUrl && (
          <button
            type="button"
            onClick={handleExtract}
            disabled={extracting}
            className="px-3 py-2.5 rounded-xl text-xs border-2 transition-all hover:border-[#E8511A] disabled:opacity-60"
            style={{ background: "#F5EDD6", borderColor: "#B87333", color: "#1A3A5C" }}
          >
            {extracting ? "Generando imágenes del PDF…" : "Generar imágenes desde el PDF"}
          </button>
        )}

        {(galleryImages.length > 0 || pdfPageImages.length > 0) && (
          <div className="grid grid-cols-4 gap-2 mt-2">
            {galleryImages.map((url, i) => (
              <div key={url} className="relative aspect-[3/4] rounded-lg overflow-hidden" style={{ border: "1.5px solid #B87333" }}>
                <Image src={url} alt={`Galería ${i + 1}`} fill className="object-cover" />
                <button
                  type="button"
                  onClick={() => removeGalleryImage(i)}
                  className="absolute top-1 right-1 w-5 h-5 rounded-full flex items-center justify-center"
                  style={{ background: "#C0392B" }}
                >
                  <X size={12} color="#fff" />
                </button>
              </div>
            ))}
            {pdfPageImages.map((url, i) => (
              <div key={url} className="relative aspect-[3/4] rounded-lg overflow-hidden opacity-80" style={{ border: "1.5px dashed #B87333" }}>
                <Image src={url} alt={`Página ${i + 1}`} fill className="object-cover" />
              </div>
            ))}
          </div>
        )}
      </div>
    </section>
  );
}
