import Link from "next/link";

export const metadata = {
  title: "Novena a San Luis Bertrán — Galeona de Cádiz",
};

const dias = [
  {
    dia: 1,
    titulo: "Fe y confianza",
    texto: "Oh glorioso San Luis Bertrán, patrono de los que buscan la verdad y la fe, te pedimos que intercedas por nosotros ante el trono de Dios. Ayúdanos a fortalecer nuestra fe, a confiar plenamente en la voluntad divina, y a no desfallecer en los momentos de tribulación. Que tu ejemplo de devoción nos inspire a seguir el camino de la santidad. Por Jesucristo Nuestro Señor. Amén.",
  },
  {
    dia: 2,
    titulo: "Humildad y sencillez",
    texto: "San Luis Bertrán, que viviste con humildad y sencillez, enseñanos a reconocer nuestras limitaciones y a confiar en la gracia de Dios. Ayúdanos a ser humildes de corazón, a servir a los demás con amor, y a no buscar la gloria humana sino la aprobación divina. Intercede por nosotros ante el Señor. Amén.",
  },
  {
    dia: 3,
    titulo: "Amor a la Eucaristía",
    texto: "San Luis Bertrán, devoto fervoroso de la Santísima Eucaristía, aumenta en nosotros el amor por el Cuerpo y Sangre de Cristo. Ayúdanos a participar con devoción en la Santa Misa, a recibir la Comunión con frecuencia, y a adorar con amor al Señor presente en el Sacramento del Altar. Intercede por nosotros. Amén.",
  },
  {
    dia: 4,
    titulo: "Devoción a la Virgen María",
    texto: "San Luis Bertrán, fiel devoto de la Santísima Virgen María, enséñanos a amar a nuestra Madre celestial. Ayúdanos a rezar el Rosario con constancia, a confiar en su intercesión materna, y a imitar sus virtudes de pureza, humildad y obediencia. Ruega por nosotros, oh santo patrón. Amén.",
  },
  {
    dia: 5,
    titulo: "Predicación del Evangelio",
    texto: "San Luis Bertrán, predicador ardiente del Evangelio, enciende en nosotros el deseo de anunciar a Cristo. Ayúdanos a ser testigos valientes de la fe, a compartir la Buena Nueva con los que no la conocen, y a vivir de manera coherente con lo que profesamos. Intercede por la evangelización del mundo. Amén.",
  },
  {
    dia: 6,
    titulo: "Penitencia y conversión",
    texto: "San Luis Bertrán, hombre de penitencia y oración, enséñanos el valor del sacrificio y la mortificación. Ayúdanos a convertirnos de nuestros pecados, a practicar la penitencia con amor, y a buscar la reconciliación con Dios a través del Sacramento de la Confesión. Ruega por nuestra conversión. Amén.",
  },
  {
    dia: 7,
    titulo: "Caridad y servicio",
    texto: "San Luis Bertrán, que dedicaste tu vida al servicio de los demás, enséñanos a amar a nuestro prójimo como a nosotros mismos. Ayúdanos a ser generosos con los necesitados, a perdonar a los que nos ofenden, y a servir con alegría a quienes sufren. Que la caridad sea la marca de nuestra vida cristiana. Amén.",
  },
  {
    dia: 8,
    titulo: "Paz interior",
    texto: "San Luis Bertrán, hombre de paz y serenidad, intercede por nosotros para que alcancemos la paz interior. Ayúdanos a confiar en la providencia divina, a no angustiarnos por el futuro, y a vivir cada día con tranquilidad y esperanza. Que la paz de Cristo reine en nuestros corazones. Amén.",
  },
  {
    dia: 9,
    titulo: "Gracia final y perseverancia",
    texto: "San Luis Bertrán, glorioso en el cielo junto a Dios, te pedimos que intercedas por nosotros para que alcancemos la gracia de la perseverancia final. Ayúdanos a mantenernos fieles hasta el fin, a morir en gracia de Dios, y a unirnos un día a ti en la patria celestial. Ruega por nosotros y por todas las almas. Amén.",
  },
];

export default function NovenaSanLuisBertranPage() {
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
          Novena de intercesión
        </p>
        <h1
          className="relative text-3xl md:text-4xl font-bold leading-tight mb-2 max-w-2xl"
          style={{ color: "#F5EDD6", fontFamily: "var(--font-cinzel, serif)" }}
        >
          Novena Tradicional a San Luis Bertrán
        </h1>
        <p
          className="relative text-xs mt-1 max-w-md"
          style={{ color: "rgba(245,237,214,0.55)", fontFamily: "var(--font-lora, serif)" }}
        >
          Sacerdote valenciano · Predicador del Evangelio · Patrón de la predicación
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
            San Luis Bertrán
          </p>
          <p
            className="text-xs leading-relaxed"
            style={{ color: "#1A3A5C", fontFamily: "var(--font-lora, serif)" }}
          >
            Sacerdote dominico nacido en Valencia en 1526. Conocido por su ardiente predicación del Evangelio, su profunda devoción eucarística y su amor a la Virgen María. Fue canonizado en 1691 por el Papa Inocencio XII. Es patrón de la predicación y modelo de los evangelizadores.
          </p>
          <p
            className="text-[0.65rem] mt-1"
            style={{ color: "#1B6CA8", fontFamily: "var(--font-cinzel, serif)" }}
          >
            Fiesta: 9 de octubre
          </p>
        </div>
      </section>

      {/* DIAS DE LA NOVENA */}
      <section className="max-w-2xl mx-auto px-4 py-8 flex flex-col gap-6">
        <p
          className="text-[0.6rem] tracking-[0.2em] uppercase mb-2"
          style={{ color: "#B87333", fontFamily: "var(--font-cinzel, serif)" }}
        >
          Oraciones de los nueve días
        </p>
        {dias.map(({ dia, titulo, texto }) => (
          <div
            key={dia}
            className="rounded-xl p-5 border"
            style={{
              borderColor: "#B87333",
              background: "linear-gradient(135deg, #ede4cb 0%, #ddd3b5 100%)",
            }}
          >
            <div className="flex items-center gap-3 mb-3">
              <span
                className="w-7 h-7 rounded-full flex items-center justify-center text-[0.65rem] font-bold"
                style={{ background: "#1A3A5C", color: "#B87333", fontFamily: "var(--font-cinzel, serif)" }}
              >
                {dia}
              </span>
              <p
                className="text-[0.7rem] tracking-[0.15em] uppercase"
                style={{ color: "#B87333", fontFamily: "var(--font-cinzel, serif)" }}
              >
                {titulo}
              </p>
            </div>
            <p
              className="text-sm leading-relaxed"
              style={{ color: "#1A3A5C", fontFamily: "var(--font-lora, serif)" }}
            >
              {texto}
            </p>
          </div>
        ))}
      </section>

      {/* ORACION FINAL */}
      <section className="max-w-2xl mx-auto px-4 pb-4">
        <div
          className="rounded-xl p-5 border"
          style={{
            borderColor: "#B87333",
            background: "linear-gradient(135deg, #1A3A5C, #1F4FA3)",
          }}
        >
          <p
            className="text-[0.65rem] tracking-[0.2em] uppercase mb-3"
            style={{ color: "#B87333", fontFamily: "var(--font-cinzel, serif)" }}
          >
            Oración final
          </p>
          <p
            className="text-sm leading-relaxed"
            style={{ color: "#F5EDD6", fontFamily: "var(--font-lora, serif)" }}
          >
            Oh Dios, que diste a San Luis Bertrán la gracia de ser un ardiente predicador de tu Evangelio, concédenos por su intercesión que, siguiendo sus pasos, podamos anunciar a Cristo con palabras y obras, y alcanzar la vida eterna. Por Jesucristo Nuestro Señor. Amén.
          </p>
        </div>
      </section>

      {/* FOOTER */}
      <section className="max-w-2xl mx-auto px-4 pb-14 flex justify-center pt-6">
      </section>

    </div>
  );
}
