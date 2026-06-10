"use client";

import Link from "next/link";
import { useState } from "react";
import { ChevronDown } from "lucide-react";
import { NAV_ITEMS } from "./NavItems";
import { cn } from "@/lib/utils";

const itemClass = cn(
  "flex items-center gap-0.5 px-1.5 py-2 font-medium text-white rounded-sm",
  "tracking-tight uppercase transition-colors duration-150",
  "hover:bg-[#E8511A] hover:text-white"
);
const itemStyle = { fontFamily: "var(--font-cinzel, serif)", fontSize: "0.7rem" };

export default function NavDesktop() {
  const [openIndex, setOpenIndex] = useState<number | null>(null);

  return (
    <nav className="hidden lg:flex items-center gap-0" aria-label="Menú principal">
      {NAV_ITEMS.map((item, i) => (
        <div
          key={item.href}
          className="relative"
          onMouseEnter={() => item.children && setOpenIndex(i)}
          onMouseLeave={() => setOpenIndex(null)}
        >
          {item.children ? (
            <button
              className={cn(itemClass, openIndex === i && "bg-[#E8511A] text-white")}
              style={itemStyle}
              aria-expanded={openIndex === i}
              aria-haspopup="true"
            >
              {item.label}
              <ChevronDown
                className={cn("w-3 h-3 transition-transform duration-200", openIndex === i && "rotate-180")}
              />
            </button>
          ) : (
            <a
              href={item.href}
              target={item.external ? "_blank" : undefined}
              rel={item.external ? "noopener noreferrer" : undefined}
              className={itemClass}
              style={itemStyle}
            >
              {item.label}
            </a>
          )}

          {item.children && openIndex === i && (
            <div
              className="absolute top-full left-0 min-w-[200px] z-50 pt-1"
              onMouseEnter={() => setOpenIndex(i)}
              onMouseLeave={() => setOpenIndex(null)}
            >
              <div
                className="rounded-sm shadow-xl overflow-hidden border border-[#B87333]/40"
                style={{ background: "#1F4FA3" }}
              >
                {item.children.map((child) => (
                  <Link
                    key={child.href}
                    href={child.href}
                    target={child.external ? "_blank" : undefined}
                    rel={child.external ? "noopener noreferrer" : undefined}
                    className={cn(
                      "block px-4 py-2.5 text-white text-xs tracking-wide",
                      "border-b border-[#B87333]/20 last:border-0",
                      "hover:bg-[#E8511A] transition-colors duration-150"
                    )}
                    style={{ fontFamily: "var(--font-cinzel, serif)" }}
                  >
                    {child.label}
                  </Link>
                ))}
              </div>
            </div>
          )}
        </div>
      ))}
    </nav>
  );
}
