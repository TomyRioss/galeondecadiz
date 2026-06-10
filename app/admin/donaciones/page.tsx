"use client";

export default function AdminDonacionesPage() {
  return (
    <div>
      <div className="flex items-center justify-between mb-8">
        <h1
          className="text-2xl font-bold"
          style={{ color: "#1A3A5C", fontFamily: "var(--font-cinzel, serif)" }}
        >
          Donaciones
        </h1>
        <button
          className="px-4 py-2 rounded-full text-sm font-semibold text-white transition-opacity hover:opacity-90"
          style={{ background: "linear-gradient(90deg, #E8511A, #B87333)", fontFamily: "var(--font-cinzel, serif)" }}
          onClick={() => {
            const csv = "Nombre,Correo,WhatsApp,Monto,Estado,Fecha,Mensaje\n";
            const blob = new Blob([csv], { type: "text/csv" });
            const url = URL.createObjectURL(blob);
            const a = document.createElement("a");
            a.href = url;
            a.download = "donaciones.csv";
            a.click();
          }}
        >
          Exportar CSV
        </button>
      </div>

      <div
        className="rounded-2xl p-8 text-center"
        style={{ background: "linear-gradient(135deg, #e8dfc4, #d4c9a8)", border: "2px solid #B87333" }}
      >
        <p
          className="text-sm"
          style={{ color: "#1A3A5C", fontFamily: "var(--font-lora, serif)" }}
        >
          Las donaciones registradas aparecerán aquí una vez que se apruebe la tabla <code>donations</code> en Supabase (T30).
        </p>
      </div>
    </div>
  );
}
