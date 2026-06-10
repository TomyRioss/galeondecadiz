"use client";

import { useEffect, useState } from "react";
import { ChevronDown } from "lucide-react";

export default function ScrollIndicator() {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const onScroll = () => setVisible(window.scrollY < 80);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  if (!visible) return null;

  return (
    <div className="hidden md:flex fixed bottom-12 right-6 z-40 flex-col items-center gap-1 pointer-events-none">
      <span
        className="text-[0.75rem] tracking-widest uppercase"
        style={{ color: "#B87333", fontFamily: "var(--font-cinzel, serif)" }}
      >
        Scroll
      </span>
      <div
        className="animate-bounce"
        style={{ color: "#B87333" }}
      >
        <ChevronDown size={36} />
      </div>
    </div>
  );
}
