"use client";

import Link from "next/link";

export default function AdminEbookPage() {
  return (
    <div>
      <div className="flex items-center justify-between mb-8">
        <h1
          className="text-2xl font-bold"
          style={{ color: "#1A3A5C", fontFamily: "var(--font-cinzel, serif)" }}
        >
          Lectores E-Book
        </h1>
        <div className="flex gap-3">
          <Link
            href="/admin/ebook/historial"
            className="px-4 py-2 rounded-full text-sm font-semibold transition-opacity hover:opacity-90"
            style={{ background: "#1A3A5C", color: "#F5EDD6", fontFamily: "var(--font-cinzel, serif)" }}
          >
            Ver historial
          </Link>
          <button
            className="px-4 py-2 rounded-full text-sm font-semibold text-white transition-opacity hover:opacity-90"
            style={{ background: "linear-gradient(90deg, #E8511A, #B87333)", fontFamily: "var(--font-cinzel, serif)" }}
            onClick={() => {
              const csv = "Nombre,Correo,WhatsApp,Ciudad,País,Fecha registro,Último acceso\n";
              const blob = new Blob([csv], { type: "text/csv" });
              const url = URL.createObjectURL(blob);
              const a = document.createElement("a");
              a.href = url;
              a.download = "lectores-ebook.csv";
              a.click();
            }}
          >
            Exportar CSV
          </button>
        </div>
      </div>

      <div
        className="rounded-2xl p-8 text-center"
        style={{ background: "linear-gradient(135deg, #e8dfc4, #d4c9a8)", border: "2px solid #B87333" }}
      >
        <p
          className="text-sm"
          style={{ color: "#1A3A5C", fontFamily: "var(--font-lora, serif)" }}
        >
          Los lectores registrados aparecerán aquí una vez que se apruebe la tabla <code>ebook_users</code> en Supabase (T26).
        </p>
      </div>
    </div>
  );
}
