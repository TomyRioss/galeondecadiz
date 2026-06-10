import Link from "next/link";

export const metadata = {
  title: "Oración del Sello de Cristo — Galeona de Cádiz",
};

const parrafos = [
  "En el nombre poderoso de Jesucristo, cuyo nombre es sobre todo nombre.",
  "En el nombre ante el cual se dobla toda rodilla en el cielo, la tierra y debajo de la tierra, yo declaró ahora que mi mente está bajo la autoridad de mi Señor Jesús.",
  "Coloco la sangre de Cristo sobre mi mente, sobre mis pensamientos, sobre todo los que soy.",
  "Hoy marco mi mente son el sello del Dios vivo, en el nombre del Padre, del Hijo y del Espíritu Santo.",
  "Declaro que yo pertenezco a Jesucristo, que fui comprado por su preciosa sangre, que no soy mío, sino suyo.",
  "Declaro que mi vida está escondida en el Sagrado Corazón de Cristo Jesús que es el verdadero Dios y hombre.",
  "Declaro que ninguna maldición puede tocarme porque estoy bajo la protección de la sangre del Cordero.",
  "Declaro que ninguna brujería puede afectarme porque llevo la marca del Altísimo en mi frente.",
  "Declaro que ningún maleficio enviado contra mí, puede penetrar este escudo divino, porque soy propiedad exclusiva del Rey de reyes.",
  "Todo trabajo de oscuridad hecho contra mí, rebota y regresa a su origen.",
  "Toda palabra maldita hablada en mi contra cae al suelo sin ningún poder.",
  "Todo deseo maligno dirigido en contra mía se estrella contra el muro de protección que Dios ha puesto a mi alrededor.",
  "Renuncio a todo pacto que mis ancestros hayan hecho con las tinieblas.",
  "Rompo toda maldición generacional que haya estado operando en mi familia.",
  "Cierro toda puerta que yo mismo haya abierto por ignorancia o por pecado, y declaro que desde este momento mi mente lleva la marca indeleble del Dios todo poderoso. Esa marca me identifica como intocable, como protegido y sellado para el día de la redención.",
  "Así como el Ángel de la muerte pasó sin tocar las casas que tenían los dinteles marcados con sangre del cordero, así todo juicio, toda calamidad, toda destrucción, pasan de largo porque tengo la sangre de Cristo sobre mi frente.",
  "Como Dios ordeno que no se tocara a ninguno que llevara su marca, así yo declaro que soy intocable para el enemigo, inaccesible para las fuerzas de las tinieblas, inalcanzable para todo poder maligno, inquebrantable por cualquier hechizo, brujería, maldición o trabajo oscuro.",
  "A partir de este momento y hasta el fin de mis días, mi mente es territorio sagrado. Es terreno consagrado. Es suelo santo. Es una fortaleza inexpugnable iluminada desde adentro por la presencia del Espíritu Santo.",
  "Y cualquier potencia del infierno que intente acercarse a mi mente, encontrará no a un hombre débil, sino al León de Judá que habita en mí.",
  "En el nombre del Padre, del Hijo y del Espíritu Santo. Amén.",
];

export default function OracionSelloCristoPage() {
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
          Para eliminar toda influencia o poder maléfico
        </p>
        <h1
          className="relative text-3xl md:text-4xl font-bold leading-tight mb-4 max-w-2xl"
          style={{ color: "#F5EDD6", fontFamily: "var(--font-cinzel, serif)" }}
        >
          Oración del Sello de Cristo
        </h1>
        <div
          className="relative mt-2 h-px w-24"
          style={{ background: "linear-gradient(90deg, transparent, #B87333, transparent)" }}
        />
      </section>

      {/* AUTORÍA */}
      <section className="max-w-2xl mx-auto px-4 pt-10 pb-4">
        <div
          className="rounded-xl p-5 border-l-4 flex flex-col gap-1"
          style={{
            borderColor: "#B87333",
            background: "linear-gradient(90deg, #ddd3b5, #e8dfc4)",
          }}
        >
          <p
            className="text-xs tracking-[0.15em] uppercase font-semibold"
            style={{ color: "#B87333", fontFamily: "var(--font-cinzel, serif)" }}
          >
            Padre José Antonio Fortea Cucurull
          </p>
          <p
            className="text-xs leading-relaxed"
            style={{ color: "#1A3A5C", fontFamily: "var(--font-lora, serif)" }}
          >
            Nació el 11 de octubre de 1968. Doctor en Teología por el Pontificio Ateneo Regina Apostolorum de Roma. Párroco de Nuestra Señora de Zulema, diócesis de Alcalá de Henares. Uno de los más destacados exorcistas del mundo.
          </p>
          <p
            className="text-[0.65rem] mt-1"
            style={{ color: "#1B6CA8", fontFamily: "var(--font-cinzel, serif)" }}
          >
            Dada el 18 de enero de 2026
          </p>
        </div>
      </section>

      {/* TEXTO */}
      <section className="max-w-2xl mx-auto px-4 py-8 flex flex-col gap-4">
        {parrafos.map((p, i) => (
          <p
            key={i}
            className="text-base leading-relaxed"
            style={{
              color: "#1A3A5C",
              fontFamily: "var(--font-lora, serif)",
              fontStyle: p.startsWith("En el nombre del Padre") ? "italic" : "normal",
              fontWeight: p.startsWith("En el nombre del Padre") ? 600 : 400,
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
