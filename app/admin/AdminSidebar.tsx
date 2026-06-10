"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { signOut } from "next-auth/react";
import { BookOpen, MessageSquare, ShoppingCart, Users, LogOut, Heart, BookMarked, Mail } from "lucide-react";

const navItems = [
  { label: "Libro principal", href: "/admin/libro",       Icon: BookOpen },
  { label: "Pedidos",         href: "/admin/pedidos",     Icon: ShoppingCart },
  { label: "E-Book lectores", href: "/admin/ebook",       Icon: BookMarked },
  { label: "Donaciones",      href: "/admin/donaciones",  Icon: Heart },
  { label: "Contactos",       href: "/admin/contactos",   Icon: Mail },
  { label: "Libros (legacy)", href: "/admin/libros",      Icon: BookOpen },
  { label: "Órdenes (legacy)",href: "/admin/ordenes",     Icon: ShoppingCart },
  { label: "Usuarios",        href: "/admin/usuarios",    Icon: Users },
  { label: "Testimonios",     href: "/admin/testimonios", Icon: MessageSquare },
];

export default function AdminSidebar() {
  const pathname = usePathname();

  return (
    <aside
      className="w-56 min-h-screen flex flex-col"
      style={{ background: "#1A3A5C", borderRight: "2px solid #B87333" }}
    >
      <div className="px-5 py-6 border-b" style={{ borderColor: "#B87333" }}>
        <p
          className="text-[0.55rem] tracking-[0.2em] uppercase"
          style={{ color: "#B87333", fontFamily: "var(--font-cinzel, serif)" }}
        >
          Panel Admin
        </p>
        <p
          className="text-white text-sm font-bold mt-0.5"
          style={{ fontFamily: "var(--font-cinzel, serif)" }}
        >
          Galeona de Cádiz
        </p>
      </div>

      <nav className="flex-1 py-4 flex flex-col gap-1 px-2">
        {navItems.map(({ label, href, Icon }) => {
          const active = pathname === href || pathname.startsWith(href + "/");
          return (
            <Link
              key={href}
              href={href}
              className="flex items-center gap-3 px-3 py-2.5 rounded text-sm transition-all"
              style={{
                background: active ? "#1F4FA3" : "transparent",
                color: active ? "#F5EDD6" : "rgba(255,255,255,0.65)",
                fontFamily: "var(--font-cinzel, serif)",
                borderLeft: active ? "3px solid #B87333" : "3px solid transparent",
              }}
            >
              <Icon size={16} />
              {label}
            </Link>
          );
        })}
      </nav>

      <div className="px-2 pb-5">
        <button
          onClick={() => signOut({ callbackUrl: "/login" })}
          className="w-full flex items-center gap-3 px-3 py-2.5 rounded text-sm transition-all"
          style={{
            color: "rgba(255,255,255,0.5)",
            fontFamily: "var(--font-cinzel, serif)",
            border: "1px solid rgba(184,115,51,0.3)",
          }}
        >
          <LogOut size={16} />
          Salir
        </button>
      </div>
    </aside>
  );
}
