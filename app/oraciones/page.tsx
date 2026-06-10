import Link from "next/link";

const devocionales = [
  {
    slug: "oracion-del-sello-de-cristo",
    titulo: "Oración del Sello de Cristo",
    subtitulo: "Para eliminar toda influencia o poder maléfico",
    autor: "P. José Antonio Fortea Cucurull",
    fecha: "18 de enero de 2026",
    tag: "Exorcismo y protección",
  },
  {
    slug: "san-maximiliano-kolbe",
    titulo: "Para prevenir las adicciones",
    subtitulo: "Oración a San Maximiliano Kolbe",
    autor: "Sacerdote OFMC, mártir de Auschwitz",
    fecha: "Patrono contra las adicciones",
    tag: "Intercesión",
  },
  {
    slug: "devocionario-universidad-andes",
    titulo: "Devocionario — Universidad de los Andes",
    subtitulo: "Oraciones y Devociones",
    autor: "Colección institucional",
    fecha: "Patrimonio cultural",
    tag: "Devocionario",
  },
];

export const metadata = { title: "Devocionales — Fundación Social Galeona de Cádiz" };

export default function OracionesPage() {
  return (
    <div style={{ background: "#F5EDD6", minHeight: "100vh" }}>

      {/* HERO */}
      <section
        className="relative w-full py-20 md:py-28 px-4 flex flex-col items-center text-center overflow-hidden"
        style={{ background: "#1A3A5C" }}
      >
        <div
          className="absolute inset-0 opacity-10"
          style={{
            backgroundImage:
              "repeating-linear-gradient(30deg, #B87333 0px, #B87333 1px, transparent 1px, transparent 60px)",
          }}
        />
        <div
          className="absolute bottom-0 left-0 right-0 h-16 pointer-events-none"
          style={{ background: "linear-gradient(to top, #F5EDD6, transparent)" }}
        />
        <p
          className="relative text-xs tracking-[0.4em] uppercase mb-4"
          style={{ color: "#B87333", fontFamily: "var(--font-cinzel, serif)" }}
        >
          Fundación Social Galeona de Cádiz
        </p>
        <h1
          className="relative text-4xl md:text-5xl font-bold leading-tight mb-4 max-w-2xl"
          style={{ color: "#F5EDD6", fontFamily: "var(--font-cinzel, serif)" }}
        >
          Devocionales
        </h1>
        <p
          className="relative text-sm max-w-md leading-relaxed"
          style={{ color: "rgba(245,237,214,0.65)", fontFamily: "var(--font-lora, serif)" }}
        >
          Oraciones y devociones para la vida espiritual y la formación en fe.
        </p>
        <div
          className="relative mt-6 h-px w-32"
          style={{ background: "linear-gradient(90deg, transparent, #B87333, transparent)" }}
        />
      </section>

      {/* LISTADO */}
      <section className="max-w-3xl mx-auto px-4 py-14 flex flex-col gap-6">
        {devocionales.map(({ slug, titulo, subtitulo, autor, fecha, tag }) => (
          <Link
            key={slug}
            href={`/oraciones/${slug}`}
            className="group rounded-2xl border-2 p-7 flex flex-col gap-3 transition-all hover:-translate-y-0.5 hover:shadow-md"
            style={{
              borderColor: "#B87333",
              background: "linear-gradient(135deg, #ede4cb 0%, #ddd3b5 100%)",
            }}
          >
            <div className="flex items-start justify-between gap-4">
              <div className="flex flex-col gap-1">
                <span
                  className="text-[0.6rem] tracking-[0.2em] uppercase"
                  style={{ color: "#B87333", fontFamily: "var(--font-cinzel, serif)" }}
                >
                  {tag}
                </span>
                <h2
                  className="text-lg font-bold leading-snug"
                  style={{ color: "#1A3A5C", fontFamily: "var(--font-cinzel, serif)" }}
                >
                  {titulo}
                </h2>
                <p
                  className="text-sm italic"
                  style={{ color: "#1B6CA8", fontFamily: "var(--font-lora, serif)" }}
                >
                  {subtitulo}
                </p>
              </div>
              <span
                className="text-xl mt-1 flex-shrink-0 transition-transform group-hover:translate-x-1"
                style={{ color: "#B87333" }}
              >
                →
              </span>
            </div>
            <div
              className="h-px"
              style={{ background: "linear-gradient(90deg, #B87333, transparent)" }}
            />
            <div className="flex flex-wrap gap-4">
              <p
                className="text-xs"
                style={{ color: "#1A3A5C", fontFamily: "var(--font-lora, serif)" }}
              >
                <span style={{ color: "#B87333" }}>Autor:</span> {autor}
              </p>
              <p
                className="text-xs"
                style={{ color: "#1A3A5C", fontFamily: "var(--font-lora, serif)" }}
              >
                <span style={{ color: "#B87333" }}>Ref:</span> {fecha}
              </p>
            </div>
          </Link>
        ))}
      </section>

      <div className="flex justify-center px-4 pb-14">
        <div
          className="w-full max-w-3xl h-px"
          style={{ background: "linear-gradient(90deg, transparent, #B87333, transparent)" }}
        />
      </div>

    </div>
  );
}
