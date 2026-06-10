"use client";

import { useState } from "react";
import { signIn } from "next-auth/react";
import { useRouter } from "next/navigation";
import { Eye, EyeOff } from "lucide-react";

export default function LoginForm() {
  const router = useRouter();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setError("");
    setLoading(true);

    const result = await signIn("credentials", {
      email,
      password,
      redirect: false,
    });

    setLoading(false);

    if (result?.error) {
      setError("Credenciales inválidas o acceso no autorizado.");
    } else {
      router.push("/admin");
    }
  }

  return (
    <form onSubmit={handleSubmit} className="flex flex-col gap-5">
      <div className="flex flex-col gap-1.5">
        <label
          htmlFor="email"
          className="text-xs tracking-widest uppercase"
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
          className="px-4 py-3 rounded border text-sm outline-none transition-all"
          style={{
            background: "#fff",
            border: "1px solid #B87333",
            color: "#1A3A5C",
            fontFamily: "var(--font-lora, serif)",
          }}
          placeholder="admin@galeonadecadiz.org"
        />
      </div>

      <div className="flex flex-col gap-1.5">
        <label
          htmlFor="password"
          className="text-xs tracking-widest uppercase"
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
            className="w-full px-4 py-3 pr-10 rounded border text-sm outline-none transition-all"
            style={{
              background: "#fff",
              border: "1px solid #B87333",
              color: "#1A3A5C",
              fontFamily: "var(--font-lora, serif)",
            }}
            placeholder="••••••••"
          />
          <button
            type="button"
            onClick={() => setShowPassword((v) => !v)}
            className="absolute right-3 top-1/2 -translate-y-1/2 transition-opacity opacity-50 hover:opacity-90"
            style={{ color: "#1A3A5C" }}
            tabIndex={-1}
          >
            {showPassword ? <EyeOff size={16} /> : <Eye size={16} />}
          </button>
        </div>
      </div>

      {error && (
        <p
          className="text-xs text-center py-2 px-3 rounded"
          style={{ background: "#fde8e8", color: "#C0392B", fontFamily: "var(--font-lora, serif)" }}
        >
          {error}
        </p>
      )}

      <button
        type="submit"
        disabled={loading}
        className="py-3 rounded text-sm tracking-widest uppercase transition-all disabled:opacity-60"
        style={{
          background: "#1A3A5C",
          color: "#F5EDD6",
          fontFamily: "var(--font-cinzel, serif)",
          border: "1px solid #B87333",
        }}
      >
        {loading ? "Verificando..." : "Ingresar"}
      </button>
    </form>
  );
}
