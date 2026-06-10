import Link from "next/link";

export const metadata = {
  title: "Oración a Nuestra Señora de Chiquinquirá — Galeona de Cádiz",
};

export default function OracionNuestraSenoraChiquinquiraPage() {
  return (
    <div style={{ background: "#F5EDD6", minHeight: "100vh" }}>

      {/* HERO */}
      <section
        className="relative w-full py-16 md:py-24 px-4 flex flex-col items-center text-center overflow-hidden"
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
        <Link
          href="/devocionales"
          className="relative text-[0.6rem] tracking-[0.25em] uppercase mb-6 hover:opacity-80 transition-opacity"
          style={{ color: "#B87333", fontFamily: "var(--font-cinzel, serif)" }}
        >
          ← Devocionales
        </Link>
        <p
          className="relative text-xs tracking-[0.3em] uppercase mb-3"
          style={{ color: "rgba(245,237,214,0.5)", fontFamily: "var(--font-cinzel, serif)" }}
        >
          Devoción mariana
        </p>
        <h1
          className="relative text-3xl md:text-4xl font-bold leading-tight mb-2 max-w-2xl"
          style={{ color: "#F5EDD6", fontFamily: "var(--font-cinzel, serif)" }}
        >
          Oración a Nuestra Señora de Chiquinquirá
        </h1>
        <p
          className="relative text-xs mt-1 max-w-md"
          style={{ color: "rgba(245,237,214,0.55)", fontFamily: "var(--font-lora, serif)" }}
        >
          Patrona de Colombia · Reina de la Paz
        </p>
        <div
          className="relative mt-4 h-px w-24"
          style={{ background: "linear-gradient(90deg, transparent, #B87333, transparent)" }}
        />
      </section>

      {/* CONTEXTO */}
      <section className="max-w-2xl mx-auto px-4 pt-10 pb-4">
        <div
          className="rounded-xl p-5 border-l-4 flex flex-col gap-2"
          style={{
            borderColor: "#B87333",
            background: "linear-gradient(90deg, #ddd3b5, #e8dfc4)",
          }}
        >
          <p
            className="text-xs tracking-[0.15em] uppercase font-semibold"
            style={{ color: "#B87333", fontFamily: "var(--font-cinzel, serif)" }}
          >
            Nuestra Señora de Chiquinquirá de La Estrella
          </p>
          <p
            className="text-xs leading-relaxed"
            style={{ color: "#1A3A5C", fontFamily: "var(--font-lora, serif)" }}
          >
            También conocida como la Virgen de Chiquinquirá, es la patrona de Colombia. Su imagen, restaurada milagrosamente en el siglo XVI, se venera en el Santuario de la Basílica de Nuestra Señora del Rosario de Chiquinquirá, en el departamento de Boyacá. Es símbolo de fe, unidad y esperanza para el pueblo colombiano.
          </p>
          <p
            className="text-[0.65rem] mt-1"
            style={{ color: "#1B6CA8", fontFamily: "var(--font-cinzel, serif)" }}
          >
            Fondo Editorial Galeona de Cádiz
          </p>
        </div>
      </section>

      {/* ORACIÓN */}
      <section className="max-w-2xl mx-auto px-4 py-8 flex flex-col gap-5">
        <div className="flex items-center gap-3 mb-2">
          <div
            className="w-1 h-10 rounded-full flex-shrink-0"
            style={{ background: "linear-gradient(180deg, #E8511A, #B87333)" }}
          />
          <h2
            className="text-base font-bold tracking-widest uppercase"
            style={{ color: "#1A3A5C", fontFamily: "var(--font-cinzel, serif)" }}
          >
            Oración
          </h2>
        </div>

        <div
          className="rounded-xl p-6 border"
          style={{
            borderColor: "#B87333",
            background: "linear-gradient(135deg, #ede4cb 0%, #ddd3b5 100%)",
          }}
        >
          <p
            className="text-base leading-relaxed mb-4"
            style={{ color: "#1A3A5C", fontFamily: "var(--font-lora, serif)" }}
          >
            Oh Santísima Virgen María de Chiquinquirá, Reina y Madre de Colombia, tú que eres la esperanza de los desamparados y la consolación de los afligidos, míranos con ojos de misericordia.
          </p>
          <p
            className="text-base leading-relaxed mb-4"
            style={{ color: "#1A3A5C", fontFamily: "var(--font-lora, serif)" }}
          >
            Te pedimos, oh Madre amorosa, que intercedas por nosotros ante tu Hijo Jesucristo. Protege a nuestras familias, guía a nuestros jóvenes, sana a los enfermos, y consuela a los que sufren. Aleja de nuestra patria toda violencia, división y discordia, y derrama sobre ella tu paz.
          </p>
          <p
            className="text-base leading-relaxed mb-4"
            style={{ color: "#1A3A5C", fontFamily: "var(--font-lora, serif)" }}
          >
            Virgen de Chiquinquirá, tú que eres la luz en medio de la oscuridad, danos la fortaleza para mantenernos firmes en la fe, y la gracia de imitar tus virtudes de humildad, pureza y amor a Dios.
          </p>
          <p
            className="text-base leading-relaxed mb-4"
            style={{ color: "#1A3A5C", fontFamily: "var(--font-lora, serif)" }}
          >
            Te consagramos nuestras vidas, nuestras familias y nuestra patria. Que bajo tu maternal protección, caminemos siempre hacia la salvación eterna.
          </p>
          <p
            className="text-base leading-relaxed font-semibold"
            style={{ color: "#1A3A5C", fontFamily: "var(--font-lora, serif)", fontStyle: "italic" }}
          >
            Santa María, Madre de Dios, ruega por nosotros pecadores, ahora y en la hora de nuestra muerte. Amén.
          </p>
        </div>

        {/* Avemaría */}
        <div
          className="rounded-xl p-5 border"
          style={{
            borderColor: "#B87333",
            background: "linear-gradient(135deg, #ede4cb 0%, #ddd3b5 100%)",
          }}
        >
          <p
            className="text-[0.65rem] tracking-[0.2em] uppercase mb-3"
            style={{ color: "#B87333", fontFamily: "var(--font-cinzel, serif)" }}
          >
            Avemaría
          </p>
          <p
            className="text-sm leading-relaxed"
            style={{ color: "#1A3A5C", fontFamily: "var(--font-lora, serif)" }}
          >
            Dios te salve, María, llena eres de gracia, el Señor es contigo. Bendita tú eres entre todas las mujeres, y bendito es el fruto de tu vientre, Jesús. Santa María, Madre de Dios, ruega por nosotros pecadores, ahora y en la hora de nuestra muerte. Amén.
          </p>
        </div>
      </section>

      {/* FOOTER */}
      <section className="max-w-2xl mx-auto px-4 pb-14 flex justify-center">
        <p
          className="text-xs tracking-[0.2em]"
          style={{ color: "#B87333", fontFamily: "var(--font-cinzel, serif)" }}
        >
          www.galeonadecadiz.org/devocionales
        </p>
      </section>

    </div>
  );
}
