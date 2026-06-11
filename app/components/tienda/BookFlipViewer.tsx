"use client";

import { useEffect, useRef, useState, useCallback } from "react";
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
  const [currentPage, setCurrentPage] = useState(1);
  const [pageWidth, setPageWidth] = useState(320);
  const [isMobile, setIsMobile] = useState(true);
  const containerRef = useRef<HTMLDivElement>(null);
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const bookRef = useRef<any>(null);

  useEffect(() => {
    function update() {
      const mobile = window.innerWidth < 1024;
      setIsMobile(mobile);
      if (containerRef.current) {
        const total = containerRef.current.offsetWidth;
        const w = mobile
          ? Math.min(total - 32, 420)
          : Math.min(Math.floor(total / 2) - 8, 420);
        setPageWidth(Math.max(w, 180));
      }
    }
    update();
    window.addEventListener("resize", update);
    return () => window.removeEventListener("resize", update);
  }, []);

  const onFlip = useCallback((e: { data: number }) => setCurrentPage(e.data + 1), []);
  const goPrev = () => bookRef.current?.pageFlip()?.flipPrev();
  const goNext = () => bookRef.current?.pageFlip()?.flipNext();

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
          <>
            {/* @ts-expect-error react-pageflip types */}
            <HTMLFlipBook
              key={`${pageWidth}-${isMobile}`}
              ref={bookRef}
              width={pageWidth}
              height={pageH}
              size="fixed"
              minWidth={180}
              maxWidth={420}
              minHeight={250}
              maxHeight={700}
              showCover
              usePortrait={isMobile}
              mobileScrollSupport={true}
              style={{ margin: "0 auto" }}
              onFlip={onFlip}
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

            {/* Controls */}
            <div className="flex items-center justify-center gap-4 mt-2 w-full">
              <button
                onClick={goPrev}
                disabled={currentPage <= 1}
                className="w-9 h-9 flex items-center justify-center rounded-full transition-all disabled:opacity-30 hover:opacity-80"
                style={{ background: "#1A3A5C", color: "#F5EDD6" }}
              >
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M15 18l-6-6 6-6"/>
                </svg>
              </button>
              <span
                className="text-xs tracking-widest"
                style={{ color: "#B87333", fontFamily: "var(--font-cinzel, serif)", minWidth: "6rem", textAlign: "center" }}
              >
                {currentPage} / {numPages}
              </span>
              <button
                onClick={goNext}
                disabled={currentPage >= numPages}
                className="w-9 h-9 flex items-center justify-center rounded-full transition-all disabled:opacity-30 hover:opacity-80"
                style={{ background: "#1A3A5C", color: "#F5EDD6" }}
              >
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M9 18l6-6-6-6"/>
                </svg>
              </button>
            </div>
          </>
        )}
      </Document>
    </div>
  );
}
