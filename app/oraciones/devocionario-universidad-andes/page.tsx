import Link from "next/link";

export const metadata = {
  title: "Devocionario Universidad de los Andes — Galeona de Cádiz",
};

const secciones = [
  {
    titulo: "Oraciones",
    oraciones: [
      {
        nombre: "La señal de la Santa Cruz",
        texto: "Por la señal de la Santa Cruz, de nuestros enemigos, líbranos Señor, Dios nuestro. En el nombre del Padre, del Hijo y del Espíritu Santo. Amén.",
      },
      {
        nombre: "Padrenuestro",
        texto: "Padre nuestro que estás en los cielos, santificado sea tu nombre; venga a nosotros tu reino; hágase tu voluntad así en la tierra como en el cielo. El pan nuestro de cada día dánosle hoy; y perdónanos nuestras deudas, así como nosotros perdonamos a nuestros deudores; y no nos dejes caer en la tentación, mas líbranos del mal. Amén.",
      },
      {
        nombre: "Avemaría",
        texto: "Dios te salve, María, llena eres de gracia, el Señor es contigo. Bendita tú eres entre todas las mujeres, y bendito es el fruto de tu vientre, Jesús. Santa María, Madre de Dios, ruega por nosotros pecadores, ahora y en la hora de nuestra muerte. Amén.",
      },
      {
        nombre: "Gloria",
        texto: "Gloria al Padre, y al Hijo, y al Espíritu Santo. Como era en el principio, ahora y siempre, por los siglos de los siglos. Amén.",
      },
      {
        nombre: "Ofrecimiento del día",
        texto: "¡Oh Jesús mío!, por medio del Corazón Inmaculado de María, te ofrezco las oraciones, obras, alegrías y sufrimientos de este día, en reparación de las ofensas cometidas contra ti, por las intenciones de todos los Apostolados del Sagrado Corazón de Jesús, y especialmente para las intenciones de la propagación de la Fe, del retorno de los no creyentes, y por la paz en el mundo.",
      },
      {
        nombre: "Ángel de la Guarda",
        texto: "Ángel de Dios, mi custodio fiel, pues la misericordia de Dios te ha confiado a mí, ilumíname, protégeme, dirígeme y gobiérname en este día (o esta noche). Amén.",
      },
      {
        nombre: "Credo",
        texto: "Creo en Dios Padre Todopoderoso, Creador del cielo y de la tierra. Creo en Jesucristo, su único Hijo, Nuestro Señor, que fue concebido por obra y gracia del Espíritu Santo, nació de santa María Virgen, padeció bajo el poder de Poncio Pilato, fue crucificado, muerto y sepultado, descendió a los infiernos, al tercer día resucitó de entre los muertos, subió a los cielos y está sentado a la derecha de Dios, Padre todopoderoso. Desde allí ha de venir a juzgar a vivos y muertos. Creo en el Espíritu Santo, la santa Iglesia católica, la comunión de los santos, el perdón de los pecados, la resurrección de la carne y la vida eterna. Amén.",
      },
      {
        nombre: "Visita al Santísimo",
        texto: "Jesús sacramentado, yo te saludo y te adoro en el Santísimo Sacramento del Altar. Quiero amarte con todo mi corazón: por esto te pido perdón de los pecados que he cometido, y te doy gracias por los beneficios que continuamente derramas sobre mí.",
      },
      {
        nombre: "Comunión espiritual",
        texto: "Creo, Jesús mío, que estás real y verdaderamente presente en el Santísimo Sacramento del Altar. Te amo sobre todas las cosas y deseo recibirte en mi alma. Ya que no puedo ahora hacerlo sacramentalmente, ven al menos espiritualmente a mi corazón. Y como si ya te hubiera recibido, me abrazo a ti y me uno todo a ti; no permitas que me separe de ti nunca más.",
      },
      {
        nombre: "Oración a San José",
        texto: "¡Oh bienaventurado San José!, yo te invoco como patrono y guardián de mi alma. A ti encomiendo la inocencia y la pureza de mi corazón; a ti la regularidad y fervor de mis devociones; a ti, especialmente, mi conversión sincera y la perseverancia en el bien hasta la hora de mi muerte. Consígueme del Señor, por tu poderosa intercesión, la gracia de amarlo en la tierra y de alabarlo eternamente en el Cielo. Amén.",
      },
      {
        nombre: "Oración para el estudio",
        texto: "Señor Dios, fuente de toda sabiduría, ilumina mi entendimiento para que comprenda las verdades que voy a estudiar. Fortalece mi voluntad para que rechace todo aquello que pudiera apartarme de mi deber. Concédeme la gracia de aprovechar cuanto estudie en bien de mi alma y en servicio de lo que me has encomendado.",
      },
    ],
  },
  {
    titulo: "Oración al Espíritu Santo",
    oraciones: [
      {
        nombre: "Antes",
        texto: "V. Ven, Espíritu Santo, llena los corazones de tus fieles y enciende en ellos el fuego de tu amor. Envía tu espíritu y serán creadas todas las cosas.\nR. Y renovarás la faz de la tierra.\nV. ¡Oh Dios, que has instruido los corazones de tus fieles con la luz del Espíritu Santo!, concédenos según el mismo Espíritu, conocer las cosas rectas y gozar siempre de sus divinos consuelos. Por Jesucristo Nuestro Señor. Amén.",
      },
      {
        nombre: "Después",
        texto: "V. Te damos gracias, omnipotente Dios, por todos tus beneficios. Tú que vives y reinas por los siglos de los siglos.\nR. Amén.",
      },
    ],
  },
  {
    titulo: "Oraciones para bendecir la mesa",
    oraciones: [
      {
        nombre: "Bendición",
        texto: "V. Bendícenos, Señor, y bendice estos alimentos que por tu bondad vamos a tomar.\nR. Amén.\nV. El Rey de la eterna gloria nos haga partícipes de la mesa celestial.\nR. Amén.",
      },
      {
        nombre: "Acción de gracias",
        texto: "V. Te damos gracias, omnipotente Dios, por todos tus beneficios. Tú que vives y reinas por los siglos de los siglos.\nR. Amén.\n\nPor los dones que hemos recibido, que el Señor sea bendecido. Amén.",
      },
    ],
  },
];

const indice = [
  "La señal de la Santa Cruz · Padrenuestro · Avemaría · Gloria · Ofrecimiento del día · Ángel de la Guarda · Credo · Visita al Santísimo · Comunión espiritual · Oración al Espíritu Santo · Oraciones para bendecir la mesa · Oración a San José · Oración para el estudio",
  "Oraciones y Devociones a la Santísima Trinidad: Te Deum · Símbolo Atanasiano",
  "Devociones al Espíritu Santo: Letanías del Espíritu Santo · Decenario al Espíritu Santo",
  "Devociones a la Santísima Virgen: Ángelus · Regina Coeli · Salve · Bendita sea tu pureza · Sub tuum presidium · Acordaos · Santo Rosario · Mes de María · Oración a la Virgen del Carmen",
  "Oraciones para preparar la Santa Misa y la Comunión",
  "Para orar a Dios",
  "Santos",
];

export default function DevocionarioUniversidadAndesPage() {
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
          Oraciones y Devociones
        </p>
        <h1
          className="relative text-3xl md:text-4xl font-bold leading-tight mb-2 max-w-2xl"
          style={{ color: "#F5EDD6", fontFamily: "var(--font-cinzel, serif)" }}
        >
          Devocionario
        </h1>
        <p
          className="relative text-lg font-semibold"
          style={{ color: "#B87333", fontFamily: "var(--font-cinzel, serif)" }}
        >
          Universidad de los Andes
        </p>
        <p
          className="relative text-xs mt-2 max-w-sm"
          style={{ color: "rgba(245,237,214,0.45)", fontFamily: "var(--font-lora, serif)", fontStyle: "italic" }}
        >
          Las ilustraciones de este libro forman parte de la colección del Museo de Artes de la Universidad de los Andes.
        </p>
        <div
          className="relative mt-5 h-px w-24"
          style={{ background: "linear-gradient(90deg, transparent, #B87333, transparent)" }}
        />
      </section>

      {/* ÍNDICE */}
      <section className="max-w-2xl mx-auto px-4 pt-10 pb-4">
        <p
          className="text-[0.6rem] tracking-[0.2em] uppercase mb-4"
          style={{ color: "#B87333", fontFamily: "var(--font-cinzel, serif)" }}
        >
          Índice de contenidos
        </p>
        <div
          className="rounded-xl p-5 border-l-4 flex flex-col gap-3"
          style={{
            borderColor: "#B87333",
            background: "linear-gradient(90deg, #ddd3b5, #e8dfc4)",
          }}
        >
          {indice.map((item, i) => (
            <div key={i} className="flex items-start gap-3">
              <span
                className="w-5 h-5 rounded-full flex items-center justify-center text-[0.6rem] font-bold flex-shrink-0 mt-0.5"
                style={{ background: "#1A3A5C", color: "#B87333", fontFamily: "var(--font-cinzel, serif)" }}
              >
                {i + 1}
              </span>
              <p
                className="text-xs leading-relaxed"
                style={{ color: "#1A3A5C", fontFamily: "var(--font-lora, serif)" }}
              >
                {item}
              </p>
            </div>
          ))}
        </div>
      </section>

      {/* ORACIONES */}
      <section className="max-w-2xl mx-auto px-4 py-8 flex flex-col gap-10">
        {secciones.map(({ titulo, oraciones }) => (
          <div key={titulo}>
            <div className="flex items-center gap-3 mb-6">
              <div
                className="w-1 h-10 rounded-full flex-shrink-0"
                style={{ background: "linear-gradient(180deg, #E8511A, #B87333)" }}
              />
              <h2
                className="text-base font-bold tracking-widest uppercase"
                style={{ color: "#1A3A5C", fontFamily: "var(--font-cinzel, serif)" }}
              >
                {titulo}
              </h2>
            </div>
            <div className="flex flex-col gap-6">
              {oraciones.map(({ nombre, texto }) => (
                <div
                  key={nombre}
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
                    {nombre}
                  </p>
                  {texto.split("\n").map((linea, i) => (
                    <p
                      key={i}
                      className="text-sm leading-relaxed mb-1 last:mb-0"
                      style={{ color: "#1A3A5C", fontFamily: "var(--font-lora, serif)" }}
                    >
                      {linea}
                    </p>
                  ))}
                </div>
              ))}
            </div>
          </div>
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
