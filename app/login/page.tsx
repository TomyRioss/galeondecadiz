import { auth } from "@/auth";
import { redirect } from "next/navigation";
import Image from "next/image";
import LoginForm from "./LoginForm";

export const metadata = { title: "Acceso Administrativo — Galeona de Cádiz" };

export default async function LoginPage() {
  const session = await auth();
  if (session) redirect("/admin");

  return (
    <div className="min-h-screen flex">
      {/* Left panel — 60% */}
      <div className="hidden lg:flex lg:w-[60%] relative overflow-hidden">
        <Image
          src="https://images.pexels.com/photos/1907785/pexels-photo-1907785.jpeg"
          alt="Galeona de Cádiz"
          fill
          className="object-cover object-center"
          priority
        />
        {/* Gradient overlay */}
        <div
          className="absolute inset-0"
          style={{
            background:
              "linear-gradient(160deg, rgba(184,115,51,0.55) 0%, rgba(201,164,71,0.35) 40%, rgba(26,58,92,0.70) 100%)",
          }}
        />
        {/* Brand copy */}
        <div className="absolute inset-0 flex items-center justify-center">
          <h1
            className="text-6xl font-bold text-white text-center leading-tight"
            style={{ fontFamily: "var(--font-cinzel, serif)" }}
          >
            Galeona<br />de Cádiz
          </h1>
        </div>
      </div>

      {/* Right panel — 40% */}
      <div
        className="flex-1 lg:w-[40%] flex items-center justify-center px-8 py-12"
        style={{ background: "#F5EDD6" }}
      >
        <div className="w-full max-w-sm">
          {/* Mobile header */}
          <div className="lg:hidden mb-10 text-center">
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
          </div>

          {/* Desktop header */}
          <div className="hidden lg:block mb-10">
            <p
              className="text-[0.6rem] tracking-[0.3em] uppercase mb-2"
              style={{ color: "#B87333", fontFamily: "var(--font-cinzel, serif)" }}
            >
              Acceso administrativo
            </p>
            <h2
              className="text-2xl font-bold"
              style={{ color: "#1A3A5C", fontFamily: "var(--font-cinzel, serif)" }}
            >
              Iniciar sesión
            </h2>
            <div
              className="mt-3 h-px w-12"
              style={{
                background: "linear-gradient(90deg, #B87333, transparent)",
              }}
            />
          </div>

          <LoginForm />
        </div>
      </div>
    </div>
  );
}
