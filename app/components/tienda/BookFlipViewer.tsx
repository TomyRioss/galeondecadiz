"use client";

import { useEffect, useRef, useState } from "react";
import { Document, Page, pdfjs } from "react-pdf";
import HTMLFlipBook from "react-pageflip";
import "react-pdf/dist/Page/AnnotationLayer.css";
import "react-pdf/dist/Page/TextLayer.css";

pdfjs.GlobalWorkerOptions.workerSrc = `//unpkg.com/pdfjs-dist@${pdfjs.version}/build/pdf.worker.min.mjs`;

interface Props {
  pdfUrl: string;
}

export default function BookFlipViewer({ pdfUrl }: Props) {
  const [numPages, setNumPages] = useState<number>(0);
  const [pageWidth, setPageWidth] = useState(320);
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    function update() {
      if (containerRef.current) {
        const total = containerRef.current.offsetWidth;
        const w = Math.min(Math.floor(total / 2) - 8, 420);
        setPageWidth(Math.max(w, 180));
      }
    }
    update();
    window.addEventListener("resize", update);
    return () => window.removeEventListener("resize", update);
  }, []);

  const pageH = Math.round(pageWidth * 1.414);

  return (
    <div ref={containerRef} className="w-full flex flex-col items-center gap-4">
      <p
        className="text-xs tracking-widest uppercase"
        style={{ color: "#B87333", fontFamily: "var(--font-cinzel, serif)" }}
      >
        Haz clic en las páginas para hojear
      </p>

      <Document
        file={pdfUrl}
        onLoadSuccess={({ numPages }) => setNumPages(numPages)}
        loading={
          <div className="flex items-center justify-center h-64">
            <span style={{ color: "#1A3A5C", fontFamily: "var(--font-lora, serif)" }}>
              Cargando previsualización…
            </span>
          </div>
        }
        error={
          <div className="flex items-center justify-center h-64">
            <span style={{ color: "#B87333", fontFamily: "var(--font-lora, serif)" }}>
              No se pudo cargar el PDF.
            </span>
          </div>
        }
      >
        {numPages > 0 && (
          // @ts-expect-error react-pageflip types
          <HTMLFlipBook
            width={pageWidth}
            height={pageH}
            size="fixed"
            minWidth={180}
            maxWidth={420}
            minHeight={250}
            maxHeight={700}
            showCover
            usePortrait={false}
            mobileScrollSupport={false}
            style={{ margin: "0 auto" }}
          >
            {Array.from({ length: numPages }, (_, i) => (
              <div
                key={i}
                style={{
                  width: pageWidth,
                  height: pageH,
                  background: "#fffdf5",
                  border: "1px solid #d4c9a8",
                  overflow: "hidden",
                }}
              >
                <Page
                  pageNumber={i + 1}
                  width={pageWidth}
                  renderAnnotationLayer={false}
                  renderTextLayer={false}
                />
              </div>
            ))}
          </HTMLFlipBook>
        )}
      </Document>
    </div>
  );
}
