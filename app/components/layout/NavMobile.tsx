"use client";

import Link from "next/link";
import { useState } from "react";
import { Menu, ChevronDown, X } from "lucide-react";
import { Sheet, SheetContent, SheetTrigger, SheetTitle } from "@/components/ui/sheet";
import { NAV_ITEMS } from "./NavItems";
import { cn } from "@/lib/utils";

export default function NavMobile() {
  const [openSection, setOpenSection] = useState<number | null>(null);
  const [sheetOpen, setSheetOpen] = useState(false);

  return (
    <div className="lg:hidden">
      <Sheet open={sheetOpen} onOpenChange={setSheetOpen}>
        <SheetTrigger
          className="p-2 text-white hover:bg-[#E8511A] rounded-sm transition-colors"
          aria-label="Abrir menú"
        >
          <Menu className="w-6 h-6" />
        </SheetTrigger>

        <SheetContent
          side="left"
          className="w-[300px] p-0 border-r border-[#B87333]/40"
          style={{ background: "#1A3A5C" }}
        >
          <SheetTitle className="sr-only">Menú de navegación</SheetTitle>
          <div className="flex items-center justify-between px-5 py-4 border-b border-[#B87333]/40">
            <span
              className="text-white text-sm font-semibold tracking-widest uppercase"
              style={{ fontFamily: "var(--font-cinzel, serif)" }}
            >
              Menú
            </span>
            <button
              onClick={() => setSheetOpen(false)}
              className="text-white hover:text-[#E8511A] transition-colors"
              aria-label="Cerrar menú"
            >
              <X className="w-5 h-5" />
            </button>
          </div>

          <nav className="overflow-y-auto h-full pb-20">
            {NAV_ITEMS.map((item, i) => (
              <div key={item.href} className="border-b border-[#B87333]/20">
                {!item.children ? (
                  <a
                    href={item.href}
                    target={item.external ? "_blank" : undefined}
                    rel={item.external ? "noopener noreferrer" : undefined}
                    onClick={() => setSheetOpen(false)}
                    className={cn(
                      "flex items-center w-full px-5 py-4",
                      "text-white text-sm tracking-wide uppercase",
                      "hover:bg-[#E8511A] transition-colors duration-150"
                    )}
                    style={{ fontFamily: "var(--font-cinzel, serif)", fontSize: "0.72rem" }}
                  >
                    {item.label}
                  </a>
                ) : (
                  <>
                    <button
                      onClick={() => setOpenSection(openSection === i ? null : i)}
                      className={cn(
                        "flex items-center justify-between w-full px-5 py-4",
                        "text-white text-sm tracking-wide uppercase text-left",
                        "hover:bg-[#E8511A] transition-colors duration-150",
                        openSection === i && "bg-[#E8511A]"
                      )}
                      style={{ fontFamily: "var(--font-cinzel, serif)", fontSize: "0.72rem" }}
                    >
                      {item.label}
                      <ChevronDown
                        className={cn(
                          "w-4 h-4 transition-transform duration-200 flex-shrink-0",
                          openSection === i && "rotate-180"
                        )}
                      />
                    </button>

                    {openSection === i && (
                      <div style={{ background: "#1F4FA3" }}>
                        {item.children.map((child) => (
                          <Link
                            key={child.href}
                            href={child.href}
                            onClick={() => setSheetOpen(false)}
                            className={cn(
                              "block px-8 py-3 text-white/90 text-xs tracking-wide",
                              "border-b border-[#B87333]/10 last:border-0",
                              "hover:bg-[#E8511A] hover:text-white transition-colors duration-150"
                            )}
                            style={{ fontFamily: "var(--font-cinzel, serif)" }}
                          >
                            {child.label}
                          </Link>
                        ))}
                      </div>
                    )}
                  </>
                )}
              </div>
            ))}
          </nav>
        </SheetContent>
      </Sheet>
    </div>
  );
}
