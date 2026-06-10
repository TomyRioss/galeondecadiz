"use client";

import { useState } from "react";

const INITIAL = {
  title: "Nuestra Señora de Chiquinquirá de La Estrella",
  subtitle: "Historia, devoción y espiritualidad",
  author: "Fondo Editorial Galeona de Cádiz",
  description:
    "Una obra de valor histórico, devocional y pedagógico que recorre la devoción mariana en torno a Nuestra Señora de Chiquinquirá de La Estrella.",
  price: "",
  available: true,
};

export default function AdminLibroPage() {
  const [form, setForm] = useState(INITIAL);
  const [saved, setSaved] = useState(false);
  const [errorMsg, setErrorMsg] = useState("");

  function handleChange(e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) {
    const { name, value, type } = e.target;
    setForm((prev) => ({
      ...prev,
      [name]: type === "checkbox" ? (e.target as HTMLInputElement).checked : value,
    }));
  }

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setErrorMsg("");
    setSaved(false);
    try {
      // TODO T18/T32: persist to books table once DB approved
      console.log("[admin/libro] save:", form);
      setSaved(true);
      setTimeout(() => setSaved(false), 3000);
    } catch {
      setErrorMsg("Error al guardar los cambios.");
    }
  }

  const inputStyle = {
    background: "#F5EDD6",
    border: "1.5px solid #B87333",
    color: "#1A3A5C",
    fontFamily: "var(--font-lora, serif)",
  };
  const labelStyle = { color: "#1A3A5C", fontFamily: "var(--font-cinzel, serif)" };

  return (
    <div>
      <h1
        className="text-2xl font-bold mb-8"
        style={{ color: "#1A3A5C", fontFamily: "var(--font-cinzel, serif)" }}
      >
        Gestión del Libro Principal
      </h1>

      <form
        onSubmit={handleSubmit}
        className="max-w-2xl flex flex-col gap-5 rounded-2xl p-6 md:p-8"
        style={{ background: "linear-gradient(135deg, #e8dfc4, #d4c9a8)", border: "2px solid #B87333" }}
      >
        {[
          { name: "title", label: "Título", type: "text" },
          { name: "subtitle", label: "Subtítulo", type: "text" },
          { name: "author", label: "Autora", type: "text" },
          { name: "price", label: "Precio (COP)", type: "number" },
        ].map(({ name, label, type }) => (
          <div key={name} className="flex flex-col gap-1">
            <label className="text-xs font-semibold tracking-widest uppercase" style={labelStyle}>
              {label}
            </label>
            <input
              name={name}
              type={type}
              value={(form as any)[name]}
              onChange={handleChange}
              className="w-full px-4 py-2.5 rounded-lg text-sm border outline-none"
              style={inputStyle}
            />
          </div>
        ))}

        <div className="flex flex-col gap-1">
          <label className="text-xs font-semibold tracking-widest uppercase" style={labelStyle}>
            Descripción
          </label>
          <textarea
            name="description"
            rows={4}
            value={form.description}
            onChange={handleChange}
            className="w-full px-4 py-2.5 rounded-lg text-sm border outline-none resize-none"
            style={inputStyle}
          />
        </div>

        <label className="flex items-center gap-3 cursor-pointer">
          <input
            type="checkbox"
            name="available"
            checked={form.available}
            onChange={handleChange}
          />
          <span className="text-sm" style={labelStyle}>Disponible para compra</span>
        </label>

        <div className="flex flex-col gap-1">
          <label className="text-xs font-semibold tracking-widest uppercase" style={labelStyle}>
            Portada (upload — pendiente conexión Storage)
          </label>
          <input
            type="file"
            accept="image/*"
            disabled
            className="w-full px-4 py-2.5 rounded-lg text-sm border opacity-50 cursor-not-allowed"
            style={inputStyle}
          />
          <p className="text-[0.65rem]" style={{ color: "#B87333", fontFamily: "var(--font-lora, serif)" }}>
            Upload disponible cuando se apruebe Supabase Storage (T18).
          </p>
        </div>

        {errorMsg && (
          <p className="text-xs px-4 py-2 rounded-lg" style={{ background: "#C0392B20", color: "#C0392B", border: "1px solid #C0392B" }}>
            {errorMsg}
          </p>
        )}

        {saved && (
          <p className="text-xs px-4 py-2 rounded-lg" style={{ background: "#2E6B3E20", color: "#2E6B3E", border: "1px solid #2E6B3E" }}>
            Cambios guardados correctamente.
          </p>
        )}

        <button
          type="submit"
          className="w-full py-3 rounded-full text-white font-semibold tracking-widest uppercase text-sm transition-opacity hover:opacity-90"
          style={{ background: "linear-gradient(90deg, #E8511A, #B87333)", fontFamily: "var(--font-cinzel, serif)" }}
        >
          Guardar cambios
        </button>
      </form>
    </div>
  );
}
