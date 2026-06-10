import Link from "next/link";

export const metadata = {
  title: "Oración a San Maximiliano Kolbe — Galeona de Cádiz",
};

const texto = `San Maximiliano María Kolbe, caballero de la Inmaculada, apóstol de la medalla milagrosa, mártir de la caridad, tu vida heroica llena de labor por las almas a través de la producción editorial y radiofónica católica, fue sacrificada por el delito de odio a Nuestro Señor Jesucristo, en medio de los horrores del campo de concentración en Polonia, durante la Segunda Guerra Mundial.

Fuiste hecho prisionero y encarcelado el 17 de febrero de 1941, donde brutalmente te golpearon, pero soportaste todo con amor, sin quejarte ni manifestar ira o rencor contra nadie.

Durante el cautiverio demostraste tu amor al prójimo ofreciéndote voluntariamente a morir en el bunker del hambre, sustituyendo a Franciszek Gajowniczek, un hombre casado con hijos, que lloraba desconsolado al ser seleccionado para morir. Tu oblación fue aceptada y junto a otros nueve prisioneros fuiste encerrado en el Bunker 11. Dijiste al comandante del campo, Rudolf Hoess: "Soy sacerdote católico de Polonia. Quiero tomar el lugar de este hombre porque él tiene esposa e hijos".

Después de dos semanas de inanición y deshidratación, todavía te encontrabas con vida, sentado o de pie en la celda. Los verdugos decidieron acelerar tu muerte con una inyección de ácido carbólico. Tú mismo, en señal de conformidad, extendiste tu brazo al verdugo. Tenías 47 años.

Sabiendo que ofreciste tu propia vida para preservar la de este adolorido padre de familia, obligado a abandonar a sus hijos pequeños, sabemos que comprenderás y ayudarás a (diga su nombre y/o el de las personas o comunidad que desea encomendar).

El 14 de agosto, en las vísperas de la fiesta de la Asunción de Santa María Virgen, fuiste asesinado mediante una inyección letal. San Maximiliano Kolbe míranos con compasión, pues confiamos en tu poderosa intercesión en favor de los que están atrapados por las enfermedades nerviosas y han perdido el carácter por sus deficiencias mentales producto de las adicciones. Fuiste canonizado por el Papa San Juan Pablo II, como el poderoso intercesor para la recuperación de la voluntad en los que sufren del consumo de sustancias psicoactivas (drogas) y el alcoholismo.

Alcánzanos la gracia de no negar nunca nuestro amor y comprensión por los que sufren de esas adicciones y no abandonar la oración constante a Dios por ellos. Pedimos que por tu intercesión Dios otorgue su gracia de conversión y sanación a (nombre/s). Amén.`;

export default function SanMaximilianoKolbePage() {
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
          href="/oraciones"
          className="relative text-[0.6rem] tracking-[0.25em] uppercase mb-6 hover:opacity-80 transition-opacity"
          style={{ color: "#B87333", fontFamily: "var(--font-cinzel, serif)" }}
        >
          ← Devocionales
        </Link>
        <p
          className="relative text-xs tracking-[0.3em] uppercase mb-3"
          style={{ color: "rgba(245,237,214,0.5)", fontFamily: "var(--font-cinzel, serif)" }}
        >
          Para prevenir las adicciones
        </p>
        <h1
          className="relative text-3xl md:text-4xl font-bold leading-tight mb-2 max-w-2xl"
          style={{ color: "#F5EDD6", fontFamily: "var(--font-cinzel, serif)" }}
        >
          Oración a San Maximiliano Kolbe
        </h1>
        <p
          className="relative text-xs mt-1"
          style={{ color: "rgba(245,237,214,0.55)", fontFamily: "var(--font-lora, serif)" }}
        >
          Sacerdote OFMC · Héroe de Auschwitz · Patrono contra las adicciones
        </p>
        <div
          className="relative mt-4 h-px w-24"
          style={{ background: "linear-gradient(90deg, transparent, #B87333, transparent)" }}
        />
      </section>

      {/* CONTEXTO */}
      <section className="max-w-2xl mx-auto px-4 pt-10 pb-4">
        <div
          className="rounded-xl p-5 border-l-4"
          style={{
            borderColor: "#B87333",
            background: "linear-gradient(90deg, #ddd3b5, #e8dfc4)",
          }}
        >
          <p
            className="text-xs leading-relaxed"
            style={{ color: "#1A3A5C", fontFamily: "var(--font-lora, serif)" }}
          >
            Nombrado patrono de los enfermos por SS Juan Pablo II, para pedir su intercesión por la restauración de salud nerviosa, tanto personal como de familiares, amigos y conocidos. También los que perdieron la libertad por el vicio del alcohol y el consumo de psicotrópicos y estupefacientes.
          </p>
        </div>
      </section>

      {/* TEXTO */}
      <section className="max-w-2xl mx-auto px-4 py-8 flex flex-col gap-5">
        {texto.split("\n\n").map((p, i) => (
          <p
            key={i}
            className="text-base leading-relaxed"
            style={{
              color: "#1A3A5C",
              fontFamily: "var(--font-lora, serif)",
              fontStyle: p.includes("Amén") ? "italic" : "normal",
              fontWeight: p.includes("Amén") ? 600 : 400,
            }}
          >
            {p}
          </p>
        ))}
      </section>

      {/* FOOTER */}
      <section className="max-w-2xl mx-auto px-4 pb-14 flex justify-center">
        <p
          className="text-xs tracking-[0.2em]"
          style={{ color: "#B87333", fontFamily: "var(--font-cinzel, serif)" }}
        >
          www.galeonadecadiz.org/oraciones
        </p>
      </section>

    </div>
  );
}
