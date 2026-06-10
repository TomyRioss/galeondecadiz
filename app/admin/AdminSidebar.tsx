"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { signOut } from "next-auth/react";
import {
  BookOpen,
  MessageSquare,
  ShoppingCart,
  Users,
  LogOut,
  Mail,
} from "lucide-react";

const navItems = [
  { label: "Contactos",   href: "/admin/contactos",   Icon: Mail },
  { label: "Pedidos",     href: "/admin/pedidos",     Icon: ShoppingCart },
  { label: "Libros",      href: "/admin/libros",      Icon: BookOpen },
  { label: "Usuarios",    href: "/admin/usuarios",    Icon: Users },
  { label: "Testimonios", href: "/admin/testimonios", Icon: MessageSquare },
];

interface AdminSidebarProps {
  userEmail?: string | null;
}

export default function AdminSidebar({ userEmail }: AdminSidebarProps) {
  const pathname = usePathname();

  return (
    <aside
      className="w-60 min-h-screen flex flex-col relative overflow-hidden"
      style={{
        background: "linear-gradient(180deg, #0f2540 0%, #1A3A5C 40%, #152d4a 100%)",
        borderRight: "1px solid #B87333",
      }}
    >
      {/* Decorative ambient top glow */}
      <div
        className="absolute top-0 left-0 right-0 h-40 pointer-events-none"
        style={{
          background: "radial-gradient(ellipse at 50% 0%, rgba(184,115,51,0.18) 0%, transparent 70%)",
        }}
      />

      {/* Brand header */}
      <div
        className="relative px-5 pt-7 pb-6"
        style={{ borderBottom: "1px solid rgba(184,115,51,0.3)" }}
      >
        <div className="mb-4">
          <p
            className="text-[0.5rem] tracking-[0.25em] uppercase leading-none mb-1"
            style={{ color: "#B87333", fontFamily: "var(--font-cinzel, serif)" }}
          >
            Panel Admin
          </p>
          <p
            className="text-sm font-bold leading-tight"
            style={{ color: "#F5EDD6", fontFamily: "var(--font-cinzel, serif)" }}
          >
            Galeona de Cádiz
          </p>
        </div>

        {/* Session badge */}
        {userEmail && (
          <div
            className="rounded-lg px-3 py-1.5 flex items-center gap-2"
            style={{ background: "rgba(255,255,255,0.05)", border: "1px solid rgba(184,115,51,0.15)" }}
          >
            <div
              className="w-1.5 h-1.5 rounded-full flex-shrink-0"
              style={{ background: "#4ade80", boxShadow: "0 0 4px #4ade80" }}
            />
            <span
              className="text-[0.6rem] truncate"
              style={{ color: "rgba(245,237,214,0.55)", fontFamily: "var(--font-lora, serif)" }}
            >
              {userEmail}
            </span>
          </div>
        )}
      </div>

      {/* Nav */}
      <nav className="flex-1 py-5 flex flex-col gap-0.5 px-3 relative">
        <p
          className="text-[0.5rem] tracking-[0.25em] uppercase px-3 mb-2"
          style={{ color: "rgba(184,115,51,0.5)", fontFamily: "var(--font-cinzel, serif)" }}
        >
          Secciones
        </p>

        {navItems.map(({ label, href, Icon }) => {
          const active = pathname === href || pathname.startsWith(href + "/");
          return (
            <Link
              key={href}
              href={href}
              className="relative flex items-center gap-3 px-3 py-2.5 rounded-xl text-sm transition-all duration-200 group"
              style={{
                background: active
                  ? "linear-gradient(90deg, rgba(31,79,163,0.7), rgba(31,79,163,0.3))"
                  : "transparent",
                color: active ? "#F5EDD6" : "rgba(245,237,214,0.5)",
                fontFamily: "var(--font-cinzel, serif)",
                fontSize: "0.78rem",
                letterSpacing: "0.04em",
              }}
              onMouseEnter={(e) => {
                if (!active) {
                  e.currentTarget.style.background = "rgba(255,255,255,0.05)";
                  e.currentTarget.style.color = "rgba(245,237,214,0.85)";
                }
              }}
              onMouseLeave={(e) => {
                if (!active) {
                  e.currentTarget.style.background = "transparent";
                  e.currentTarget.style.color = "rgba(245,237,214,0.5)";
                }
              }}
            >
              {/* Active left stripe */}
              {active && (
                <span
                  className="absolute left-0 top-2 bottom-2 w-0.5 rounded-full"
                  style={{ background: "linear-gradient(180deg, #E8511A, #B87333)" }}
                />
              )}
              <Icon
                size={15}
                style={{ color: active ? "#B87333" : "rgba(184,115,51,0.5)", flexShrink: 0, transition: "color 0.2s" }}
              />
              {label}
              {active && (
                <span
                  className="ml-auto w-1.5 h-1.5 rounded-full flex-shrink-0"
                  style={{ background: "#E8511A" }}
                />
              )}
            </Link>
          );
        })}
      </nav>

      {/* Footer */}
      <div
        className="px-3 pb-6 relative"
        style={{ borderTop: "1px solid rgba(184,115,51,0.15)" }}
      >
        <div className="pt-4">
          <button
            onClick={() => signOut({ callbackUrl: "/login" })}
            className="w-full flex items-center gap-3 px-3 py-2.5 rounded-xl text-sm transition-all duration-200"
            style={{
              color: "rgba(245,237,214,0.4)",
              fontFamily: "var(--font-cinzel, serif)",
              fontSize: "0.78rem",
              letterSpacing: "0.04em",
              border: "1px solid rgba(184,115,51,0.15)",
            }}
            onMouseEnter={(e) => {
              e.currentTarget.style.background = "rgba(232,81,26,0.1)";
              e.currentTarget.style.color = "#E8511A";
              e.currentTarget.style.borderColor = "rgba(232,81,26,0.3)";
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.background = "transparent";
              e.currentTarget.style.color = "rgba(245,237,214,0.4)";
              e.currentTarget.style.borderColor = "rgba(184,115,51,0.15)";
            }}
          >
            <LogOut size={14} />
            Cerrar sesión
          </button>
        </div>

        <p
          className="text-center mt-4 text-[0.5rem] tracking-widest uppercase"
          style={{ color: "rgba(184,115,51,0.25)", fontFamily: "var(--font-cinzel, serif)" }}
        >
          Fundación · NIT 900.544.600-9
        </p>
      </div>
    </aside>
  );
}
