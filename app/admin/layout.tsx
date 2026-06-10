import { auth } from "@/auth";
import { redirect } from "next/navigation";
import AdminSidebar from "./AdminSidebar";

export default async function AdminLayout({ children }: { children: React.ReactNode }) {
  const session = await auth();
  if (!session) redirect("/login");

  return (
    <div className="min-h-screen flex" style={{ background: "#F5EDD6" }}>
      <AdminSidebar userEmail={session.user?.email} />
      <div className="flex-1 flex flex-col min-w-0">
        {/* Top bar */}
        <header
          className="h-14 flex items-center px-8 flex-shrink-0"
          style={{
            background: "rgba(245,237,214,0.8)",
            borderBottom: "1px solid rgba(184,115,51,0.2)",
            backdropFilter: "blur(8px)",
          }}
        >
          <div className="flex items-center gap-2">
            <span
              className="text-[0.55rem] tracking-[0.25em] uppercase"
              style={{ color: "#B87333", fontFamily: "var(--font-cinzel, serif)" }}
            >
              Fundación Social Galeona de Cádiz
            </span>
            <span style={{ color: "rgba(184,115,51,0.35)" }}>·</span>
            <span
              className="text-[0.55rem] tracking-[0.2em] uppercase"
              style={{ color: "rgba(26,58,92,0.45)", fontFamily: "var(--font-cinzel, serif)" }}
            >
              Panel de Administración
            </span>
          </div>
          <div className="ml-auto flex items-center gap-3">
            <div
              className="h-6 w-px"
              style={{ background: "rgba(184,115,51,0.2)" }}
            />
            <span
              className="text-[0.6rem]"
              style={{ color: "rgba(26,58,92,0.4)", fontFamily: "var(--font-lora, serif)" }}
            >
              {session.user?.email}
            </span>
          </div>
        </header>

        {/* Page content */}
        <main className="flex-1 p-8 md:p-10 max-w-6xl w-full">
          {children}
        </main>
      </div>
    </div>
  );
}
