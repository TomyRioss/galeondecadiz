"use client";

import { useState, useEffect } from "react";
import { signIn } from "next-auth/react";
import { useRouter, useSearchParams } from "next/navigation";
import { Eye, EyeOff, AlertCircle } from "lucide-react";

export default function LoginForm() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);

  useEffect(() => {
    const authError = searchParams.get("error");
    if (authError) {
      setError("Credenciales inválidas o acceso no autorizado.");
    }
  }, [searchParams]);

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setError("");
    setLoading(true);

    try {
      const result = await signIn("credentials", {
        email,
        password,
        redirect: false,
      });

      if (result?.error) {
        setError("Credenciales inválidas o acceso no autorizado.");
      } else {
        router.push("/admin");
      }
    } catch {
      setError("Error de conexión. Verificá tu red e intentá de nuevo.");
    } finally {
      setLoading(false);
    }
  }

  const inputStyle = {
    background: "#fff",
    border: "1.5px solid #B87333",
    color: "#1A3A5C",
    fontFamily: "var(--font-lora, serif)",
    fontSize: "0.875rem",
  };

  const inputFocusClass =
    "w-full px-4 py-3 rounded-md outline-none transition-all focus:ring-2 focus:ring-[#1F4FA3]/30 focus:border-[#1F4FA3]";

  return (
    <form onSubmit={handleSubmit} className="flex flex-col gap-6">
      <div className="flex flex-col gap-2">
        <label
          htmlFor="email"
          className="text-[0.65rem] tracking-[0.2em] uppercase"
          style={{ color: "#1B6CA8", fontFamily: "var(--font-cinzel, serif)" }}
        >
          Correo electrónico
        </label>
        <input
          id="email"
          type="email"
          required
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          className={inputFocusClass}
          style={inputStyle}
          placeholder="admin@galeonadecadiz.org"
        />
      </div>

      <div className="flex flex-col gap-2">
        <label
          htmlFor="password"
          className="text-[0.65rem] tracking-[0.2em] uppercase"
          style={{ color: "#1B6CA8", fontFamily: "var(--font-cinzel, serif)" }}
        >
          Contraseña
        </label>
        <div className="relative">
          <input
            id="password"
            type={showPassword ? "text" : "password"}
            required
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className={`${inputFocusClass} pr-11`}
            style={inputStyle}
            placeholder="••••••••"
          />
          <button
            type="button"
            onClick={() => setShowPassword((v) => !v)}
            className="absolute right-3 top-1/2 -translate-y-1/2 transition-opacity opacity-40 hover:opacity-80"
            style={{ color: "#1A3A5C" }}
            tabIndex={-1}
          >
            {showPassword ? <EyeOff size={16} /> : <Eye size={16} />}
          </button>
        </div>
      </div>

      {error && (
        <div
          className="flex items-center gap-2.5 text-xs px-4 py-3 rounded-md"
          style={{
            background: "rgba(192,57,43,0.08)",
            border: "1px solid rgba(192,57,43,0.25)",
            color: "#C0392B",
            fontFamily: "var(--font-lora, serif)",
          }}
        >
          <AlertCircle size={14} className="shrink-0" />
          {error}
        </div>
      )}

      <button
        type="submit"
        disabled={loading}
        className="py-3.5 rounded-md text-xs tracking-[0.25em] uppercase transition-all disabled:opacity-60 mt-1"
        style={{
          background: loading
            ? "#1A3A5C"
            : "linear-gradient(135deg, #E8511A 0%, #B87333 100%)",
          color: "#F5EDD6",
          fontFamily: "var(--font-cinzel, serif)",
          letterSpacing: "0.25em",
        }}
      >
        {loading ? "Verificando..." : "Ingresar"}
      </button>
    </form>
  );
}
