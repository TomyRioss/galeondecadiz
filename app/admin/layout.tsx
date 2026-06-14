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
        <main className="flex-1 w-full">
          {children}
        </main>
      </div>
    </div>
  );
}
