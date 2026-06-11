"use client";

import { useState, useRef, forwardRef, useCallback, useEffect } from "react";
import { Document, Page, pdfjs } from "react-pdf";
import HTMLFlipBook from "react-pageflip";
import "react-pdf/dist/Page/AnnotationLayer.css";
import "react-pdf/dist/Page/TextLayer.css";
import { ChevronLeft, ChevronRight } from "lucide-react";

pdfjs.GlobalWorkerOptions.workerSrc = new URL(
  "pdfjs-dist/build/pdf.worker.min.mjs",
  import.meta.url
).toString();

const ASPECT = 760 / 480;

const FlipPage = forwardRef<HTMLDivElement, { pageNumber: number; width: number }>(
  ({ pageNumber, width }, ref) => (
    <div
      ref={ref}
      style={{
        background: "#fff",
        overflow: "hidden",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
      }}
    >
      <Page
        pageNumber={pageNumber}
        width={width}
        renderAnnotationLayer={false}
        renderTextLayer={false}
      />
    </div>
  )
);
FlipPage.displayName = "FlipPage";

interface PdfFlipBookProps {
  pdfUrl: string;
}

export default function PdfFlipBook({ pdfUrl }: PdfFlipBookProps) {
  const proxiedUrl = pdfUrl.startsWith("/")
    ? pdfUrl
    : `/api/pdf-proxy?url=${encodeURIComponent(pdfUrl)}`;

  const containerRef = useRef<HTMLDivElement>(null);
  const [pageW, setPageW] = useState(320);
  const [portrait, setPortrait] = useState(true);

  const [numPages, setNumPages] = useState(0);
  const [currentPage, setCurrentPage] = useState(1);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const bookRef = useRef<any>(null);

  useEffect(() => {
    const el = containerRef.current;
    if (!el) return;

    const compute = () => {
      const screenW = window.innerWidth;
      const containerW = el.offsetWidth;
      if (screenW < 1024) {
        // mobile: single page, fill container
        const pw = Math.min(containerW - 32, 480);
        setPageW(pw);
        setPortrait(true);
      } else {
        // desktop/tablet wide: double spread
        const pw = Math.min(Math.floor((containerW - 32) / 2), 480);
        setPageW(pw);
        setPortrait(false);
      }
    };

    compute();
    window.addEventListener("resize", compute);
    return () => window.removeEventListener("resize", compute);
  }, []);

  const pageH = Math.round(pageW * ASPECT);

  const onLoadSuccess = useCallback(({ numPages }: { numPages: number }) => {
    setNumPages(numPages);
    setLoading(false);
  }, []);

  const onLoadError = useCallback(() => {
    setError(true);
    setLoading(false);
  }, []);

  const goNext = () => bookRef.current?.pageFlip()?.flipNext();
  const goPrev = () => bookRef.current?.pageFlip()?.flipPrev();

  const onFlip = useCallback((e: { data: number }) => {
    setCurrentPage(e.data + 1);
  }, []);

  if (error) {
    return (
      <div
        className="rounded-2xl p-10 text-center border-2"
        style={{ borderColor: "#B87333", background: "linear-gradient(135deg, #e8dfc4, #d4c9a8)" }}
      >
        <p className="text-sm" style={{ color: "#1A3A5C", fontFamily: "var(--font-lora, serif)" }}>
          No se pudo cargar el catálogo. Intentá más tarde.
        </p>
      </div>
    );
  }

  return (
    <div ref={containerRef} className="flex flex-col items-center gap-5 w-full">
      {loading && (
        <div className="flex items-center gap-3 py-8">
          <div
            className="animate-spin w-8 h-8 rounded-full border-2 border-t-transparent"
            style={{ borderColor: "#B87333", borderTopColor: "transparent" }}
          />
          <span className="text-sm" style={{ color: "#B87333", fontFamily: "var(--font-lora, serif)" }}>
            Cargando catálogo…
          </span>
        </div>
      )}

      <Document
        file={proxiedUrl}
        onLoadSuccess={onLoadSuccess}
        onLoadError={onLoadError}
        loading={null}
      >
        {!loading && numPages > 0 && (
          <>
            <div
              className="rounded-xl overflow-hidden"
              style={{ boxShadow: "0 16px 48px rgba(26,58,92,0.2)" }}
            >
              <HTMLFlipBook
                key={`${pageW}-${portrait}`}
                ref={bookRef}
                width={pageW}
                height={pageH}
                size="fixed"
                minWidth={pageW}
                maxWidth={pageW}
                minHeight={pageH}
                maxHeight={pageH}
                drawShadow
                flippingTime={600}
                usePortrait={portrait}
                startPage={0}
                autoSize={false}
                maxShadowOpacity={0.35}
                showCover
                mobileScrollSupport
                onFlip={onFlip}
                className=""
                style={{}}
                startZIndex={0}
                clickEventForward
                useMouseEvents
                swipeDistance={30}
                showPageCorners
                disableFlipByClick={false}
              >
                {Array.from({ length: numPages }, (_, i) => (
                  <FlipPage key={i} pageNumber={i + 1} width={pageW} />
                ))}
              </HTMLFlipBook>
            </div>

            <div className="flex items-center justify-center gap-4 mt-4 w-full">
              <button
                onClick={goPrev}
                disabled={currentPage <= 1}
                className="w-9 h-9 flex items-center justify-center rounded-full transition-all disabled:opacity-30 hover:opacity-80"
                style={{ background: "#1A3A5C", color: "#F5EDD6" }}
              >
                <ChevronLeft size={16} />
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
                <ChevronRight size={16} />
              </button>
            </div>
          </>
        )}
      </Document>
    </div>
  );
}
