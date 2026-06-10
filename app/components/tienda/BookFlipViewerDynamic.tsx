"use client";
import dynamic from "next/dynamic";

const BookFlipViewer = dynamic(() => import("./BookFlipViewer"), { ssr: false });

export default function BookFlipViewerDynamic({ pdfUrl }: { pdfUrl: string }) {
  return <BookFlipViewer pdfUrl={pdfUrl} />;
}
