import { auth } from "@/auth";
import { redirect } from "next/navigation";
import LoginForm from "./LoginForm";

export const metadata = { title: "Acceso Administrativo — Galeona de Cádiz" };

export default async function LoginPage() {
  const session = await auth();
  if (session) redirect("/admin");

  return (
    <div
      className="min-h-screen flex items-center justify-center px-4"
      style={{ background: "#F5EDD6" }}
    >
      <div
        className="w-full max-w-sm rounded-lg p-8 shadow-lg"
        style={{
          background: "#fff",
          border: "1px solid #B87333",
        }}
      >
        <div className="mb-8 text-center">
          <p
            className="text-[0.6rem] tracking-[0.25em] uppercase mb-1"
            style={{ color: "#B87333", fontFamily: "var(--font-cinzel, serif)" }}
          >
            Panel Administrativo
          </p>
          <h1
            className="text-xl font-bold"
            style={{ color: "#1A3A5C", fontFamily: "var(--font-cinzel, serif)" }}
          >
            Galeona de Cádiz
          </h1>
          <div
            className="mx-auto mt-3 h-px w-16"
            style={{ background: "linear-gradient(90deg, transparent, #B87333, transparent)" }}
          />
        </div>

        <LoginForm />
      </div>
    </div>
  );
}
