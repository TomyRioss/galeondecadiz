const habilidades = [
  {
    num: "01",
    titulo: "Transmisión de principios",
    desc: "Capacidad para transmitir principios, conocimientos y experiencias de vida, de manera sabia, franca, amplia y amable. Permite que otros se apropien lo que sabe y se beneficien de sus habilidades. Cree firmemente: «El alumno debe superar al maestro».",
  },
  {
    num: "02",
    titulo: "Satisfacción y felicidad de situación",
    desc: "Manifiesta satisfacción personal y felicidad de situación con el trabajo personal que realiza de impulso a la educación.",
  },
  {
    num: "03",
    titulo: "Perspectiva de futuro",
    desc: "Desarrolla su aporte social con perspectiva en un futuro que ya comenzó y un rumbo claro para alcanzar grandes metas.",
  },
  {
    num: "04",
    titulo: "Buen ejemplo comunitario",
    desc: "Hace parte de los miembros de una comunidad educada, que ha logrado interiorizar y personificar el buen ejemplo en todo lo que hace.",
  },
];

const lineasTransversales = [
  {
    num: 1,
    titulo: "Dignidad humana",
    desc: "Reconocimiento de la inviolabilidad de la dignidad humana, que conlleva conocer los principios de la subsidiariedad y la reciprocidad.",
  },
  {
    num: 2,
    titulo: "Normas morales universales",
    desc: "Conocimiento ilustrado de la transcendencia que tienen las normas morales universales.",
  },
  {
    num: 3,
    titulo: "Propiedad privada",
    desc: "Comprensión de los principios que sustentan el derecho a la propiedad privada en sus cuatro formas naturales: individual, familiar, colectiva divisible, y colectiva proindiviso.",
  },
  {
    num: 4,
    titulo: "Institución de la familia",
    desc: "Comprender la institución de la familia, como la más profunda realidad histórica de todos los pueblos y civilizaciones.",
  },
];

const beneficios = [
  {
    num: 1,
    titulo: "Reconocimiento comunitario",
    desc: "Su comunidad queda notificada que trabaja de manera transparente y efectiva por la práctica de los preceptos morales, educando el alma humana en la plenitud de sus capacidades intelectiva, volitiva, sensitiva y emotiva.",
  },
  {
    num: 2,
    titulo: "Instructor natural",
    desc: "Al adquirir la habilidad personal de comportarse como un preceptor, la persona se transforma en un instructor natural que logra que los demás progresen. La comunidad gana respeto social en su región.",
  },
  {
    num: 3,
    titulo: "Sistema de contenidos personalizados",
    desc: "Quien obtiene la membresía y es maestro, tiene acceso a un sistema personalizado de contenidos útiles para su formación reglada y mediada tecnológicamente, para ofrecer educación continuada presencial o virtual.",
  },
  {
    num: 4,
    titulo: "Red académica de especialistas",
    desc: "Si un profesor se convierte en miembro activo del claustro docente de la EDN y dicta cátedra, el vínculo formal abre las puertas para interactuar con otros especialistas de renombre a través de redes sociales académicas.",
  },
  {
    num: 5,
    titulo: "Banco de Recursos Humanos (BRH-EDN)",
    desc: "Obtiene acceso gratuito al Banco de Recursos Humanos de la Escuela de Nazaret — Subsistema de Inclusión Laboral de Cercanía — donde puede inscribirse junto a sus parientes, colaboradores o amigos.",
  },
  {
    num: 6,
    titulo: "Materiales con descuento",
    desc: "Puede adquirir libros, revistas académicas, papers con investigación de frontera, materiales didácticos e incluso equipo electrónico, todo con atractivos descuentos.",
  },
  {
    num: 7,
    titulo: "Asesoría editorial",
    desc: "Cuenta con guía y asesoría profesional para escribir sus propias obras y lograr publicarlas bajo estándares internacionales de alta calidad de edición e impresión.",
  },
];

function Separador() {
  return (
    <div className="flex justify-center px-4">
      <div
        className="w-full max-w-4xl h-px"
        style={{ background: "linear-gradient(90deg, transparent, #B87333, transparent)" }}
      />
    </div>
  );
}

function SectionHeader({ titulo, subtitulo }: { titulo: string; subtitulo?: string }) {
  return (
    <div className="flex items-start gap-4 mb-8">
      <div
        className="w-1.5 h-14 rounded-full flex-shrink-0 mt-1"
        style={{ background: "linear-gradient(180deg, #E8511A, #B87333)" }}
      />
      <div>
        <h2
          className="text-xl md:text-2xl font-bold tracking-widest uppercase"
          style={{ color: "#1A3A5C", fontFamily: "var(--font-cinzel, serif)" }}
        >
          {titulo}
        </h2>
        {subtitulo && (
          <p
            className="text-sm mt-1 leading-relaxed"
            style={{ color: "#1B6CA8", fontFamily: "var(--font-lora, serif)" }}
          >
            {subtitulo}
          </p>
        )}
      </div>
    </div>
  );
}

export default function EscuelaNazaretPage() {
  return (
    <div style={{ background: "#F5EDD6", minHeight: "100vh" }}>

      {/* HERO */}
      <section
        className="relative w-full py-20 md:py-32 px-4 flex flex-col items-center text-center overflow-hidden"
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
          className="absolute bottom-0 left-0 right-0 h-20 pointer-events-none"
          style={{ background: "linear-gradient(to top, #F5EDD6, transparent)" }}
        />
        <p
          className="relative text-xs tracking-[0.4em] uppercase mb-4"
          style={{ color: "#B87333", fontFamily: "var(--font-cinzel, serif)" }}
        >
          Fundación Social Galeona de Cádiz
        </p>
        <h1
          className="relative text-4xl md:text-6xl font-bold leading-tight mb-5 max-w-3xl"
          style={{ color: "#F5EDD6", fontFamily: "var(--font-cinzel, serif)" }}
        >
          Escuela de Nazaret
        </h1>
        <p
          className="relative text-sm md:text-base max-w-xl leading-relaxed mb-4"
          style={{ color: "#B87333", fontFamily: "var(--font-lora, serif)" }}
        >
          EDN — Comunidad académica mentora
        </p>
        <p
          className="relative text-xs mb-10 tracking-widest uppercase"
          style={{ color: "#F5EDD6", fontFamily: "var(--font-cinzel, serif)", opacity: 0.55 }}
        >
          Sapientia Ædificavit Sibi Domvn · La sabiduría edificó su casa
        </p>
        <div
          className="relative h-px w-48"
          style={{ background: "linear-gradient(90deg, transparent, #B87333, transparent)" }}
        />
      </section>

      {/* INTRO — MEMBRESÍA */}
      <section className="max-w-4xl mx-auto px-4 py-14">
        <SectionHeader
          titulo="¡Conviértase en un mentor!"
          subtitulo="En la EDN ser lector, tutor, profesor de cátedra, maestro preceptor, persona de apoyo a la educación o auspiciante, confiere la Membresía."
        />
        <div
          className="rounded-2xl p-7 md:p-10 border-2 mb-10"
          style={{
            borderColor: "#B87333",
            background: "linear-gradient(135deg, #e8dfc4 0%, #d4c9a8 100%)",
            boxShadow: "0 4px 32px rgba(26,58,92,0.08)",
          }}
        >
          <p
            className="text-sm md:text-base leading-loose mb-6"
            style={{ color: "#1A3A5C", fontFamily: "var(--font-lora, serif)" }}
          >
            Todo educador o persona de apoyo a la educación, sabe que no vive en una isla en medio
            del océano, ni es un ser desconectado del mundo e inmerso en un egocentrismo y codicia
            insaciable. Comprende que su actividad profesional de forma contextualizada está regida
            por el desafío ético de un alto desempeño social. Entiende que su comportamiento
            personal y familiar afecta no solo a sus estudiantes o compañeros de trabajo, sino a{" "}
            <strong style={{ color: "#1B6CA8" }}>toda la comunidad que sirve</strong>.
          </p>
          <div
            className="h-px mb-6"
            style={{ background: "linear-gradient(90deg, #B87333, transparent)" }}
          />
          <p
            className="text-xs tracking-[0.2em] uppercase font-semibold mb-5"
            style={{ color: "#B87333", fontFamily: "var(--font-cinzel, serif)" }}
          >
            Debido a lo anterior, desarrolla las siguientes habilidades
          </p>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
            {habilidades.map(({ num, titulo, desc }) => (
              <div
                key={num}
                className="rounded-xl p-5 border flex gap-4 items-start transition-all duration-300 hover:-translate-y-0.5"
                style={{
                  borderColor: "#B87333",
                  background: "linear-gradient(160deg, #ede4cb 0%, #ddd0b0 100%)",
                  boxShadow: "0 2px 12px rgba(26,58,92,0.06)",
                }}
              >
                <div
                  className="w-10 h-10 rounded-full flex items-center justify-center font-bold text-xs flex-shrink-0"
                  style={{
                    background: "linear-gradient(135deg, #E8511A, #B87333)",
                    color: "#F5EDD6",
                    fontFamily: "var(--font-cinzel, serif)",
                    boxShadow: "0 4px 12px rgba(232,81,26,0.3)",
                  }}
                >
                  {num}
                </div>
                <div>
                  <h3
                    className="text-xs font-bold tracking-wide uppercase mb-1"
                    style={{ color: "#1A3A5C", fontFamily: "var(--font-cinzel, serif)" }}
                  >
                    {titulo}
                  </h3>
                  <p
                    className="text-xs leading-relaxed"
                    style={{ color: "#1B6CA8", fontFamily: "var(--font-lora, serif)" }}
                  >
                    {desc}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Cita institucional */}
        <div
          className="relative rounded-xl px-8 py-7 text-center overflow-hidden"
          style={{
            background: "linear-gradient(135deg, #1A3A5C, #1F4FA3)",
            boxShadow: "0 8px 40px rgba(26,58,92,0.25)",
          }}
        >
          <p
            className="absolute top-2 left-5 text-7xl leading-none select-none pointer-events-none"
            style={{ color: "#B87333", fontFamily: "Georgia, serif", opacity: 0.2 }}
          >
            ❝
          </p>
          <p
            className="relative text-sm md:text-base italic leading-relaxed"
            style={{ color: "#F5EDD6", fontFamily: "var(--font-lora, serif)" }}
          >
            «La EDN es una comunidad académica que opta por ser mentora de sus alumnos»
          </p>
          <p
            className="relative text-xs tracking-widest uppercase mt-4"
            style={{ color: "#B87333", fontFamily: "var(--font-cinzel, serif)" }}
          >
            Sapientia Ædificavit Sibi Domvn
          </p>
        </div>
      </section>

      <Separador />

      {/* SECCIÓN I — REQUISITOS */}
      <section className="max-w-4xl mx-auto px-4 py-14">
        <SectionHeader
          titulo="I. Requisitos para obtener la Membresía"
          subtitulo="Curso de Operador de Causas Sociales (CNO 4211-A1) — ciclo básico de capacitación"
        />
        <div
          className="rounded-2xl p-7 md:p-10 border-2 mb-8"
          style={{
            borderColor: "#B87333",
            background: "linear-gradient(135deg, #e8dfc4 0%, #d4c9a8 100%)",
            boxShadow: "0 4px 32px rgba(26,58,92,0.08)",
          }}
        >
          <p
            className="text-sm md:text-base leading-loose mb-6"
            style={{ color: "#1A3A5C", fontFamily: "var(--font-lora, serif)" }}
          >
            Es necesario cursar y aprobar el{" "}
            <strong style={{ color: "#1B6CA8" }}>
              Curso de Operador de Causas Sociales (CNO 4211-A1)
            </strong>
            , que es el ciclo básico de capacitación, que abre la entrada a la formación que imparte
            la EDN. El contenido trata de los conocimientos esenciales que todo miembro debe poseer.
          </p>
          <div
            className="h-px mb-6"
            style={{ background: "linear-gradient(90deg, #B87333, transparent)" }}
          />
          <p
            className="text-xs tracking-[0.2em] uppercase font-semibold mb-5"
            style={{ color: "#B87333", fontFamily: "var(--font-cinzel, serif)" }}
          >
            El programa se fundamenta en cuatro líneas transversales
          </p>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
            {lineasTransversales.map(({ num, titulo, desc }) => (
              <div
                key={num}
                className="rounded-xl p-5 border flex gap-4 items-start transition-all duration-300 hover:-translate-y-0.5"
                style={{
                  borderColor: "#B87333",
                  background: "linear-gradient(160deg, #ede4cb 0%, #ddd0b0 100%)",
                  boxShadow: "0 2px 12px rgba(26,58,92,0.06)",
                }}
              >
                <div
                  className="w-10 h-10 rounded-full flex items-center justify-center font-bold text-sm flex-shrink-0"
                  style={{
                    background: "#1A3A5C",
                    color: "#B87333",
                    fontFamily: "var(--font-cinzel, serif)",
                    border: "2px solid #B87333",
                    boxShadow: "0 4px 12px rgba(26,58,92,0.2)",
                  }}
                >
                  {num}
                </div>
                <div>
                  <h3
                    className="text-xs font-bold tracking-wide uppercase mb-1"
                    style={{ color: "#1A3A5C", fontFamily: "var(--font-cinzel, serif)" }}
                  >
                    {titulo}
                  </h3>
                  <p
                    className="text-xs leading-relaxed"
                    style={{ color: "#1B6CA8", fontFamily: "var(--font-lora, serif)" }}
                  >
                    {desc}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      <Separador />

      {/* SECCIÓN II — ¿A DÓNDE QUEREMOS LLEGAR? */}
      <section className="max-w-4xl mx-auto px-4 py-14">
        <SectionHeader
          titulo="II. ¿A dónde queremos llegar?"
          subtitulo="Restauración de lazos familiares y de la virtud de la amistad"
        />
        <div
          className="rounded-2xl p-7 md:p-10 border-2 mb-6"
          style={{
            borderColor: "#B87333",
            background: "linear-gradient(135deg, #e8dfc4 0%, #d4c9a8 100%)",
            boxShadow: "0 4px 32px rgba(26,58,92,0.08)",
          }}
        >
          <p
            className="text-sm md:text-base leading-loose mb-5"
            style={{ color: "#1A3A5C", fontFamily: "var(--font-lora, serif)" }}
          >
            En la EDN estamos convencidos que para superar la crisis actual es necesario comenzar
            por recorrer un camino de restauración de los lazos familiares, de relaciones de
            cercanía y vecindad, a través de la{" "}
            <strong style={{ color: "#1B6CA8" }}>virtud de la amistad</strong>.
          </p>
          <p
            className="text-sm md:text-base leading-loose mb-5"
            style={{ color: "#1A3A5C", fontFamily: "var(--font-lora, serif)" }}
          >
            Cuando una comunidad logra reconstruir los vínculos sociales naturales, más allá de lo
            propuesto políticamente por el Estado, adquiere rumbo y se aclara su futuro de manera
            muy eficaz: se orienta al servicio del bien común basado en la virtud de la amistad, la
            seguridad de todos, el deseo de prosperidad, el esfuerzo personal y la búsqueda de la
            felicidad de situación generando fuentes de trabajo y relaciones sociales sanas.
          </p>
          <div
            className="h-px mb-5"
            style={{ background: "linear-gradient(90deg, #B87333, transparent)" }}
          />
          <p
            className="text-sm md:text-base leading-loose"
            style={{ color: "#1A3A5C", fontFamily: "var(--font-lora, serif)" }}
          >
            El resultado de la pérdida de la amistad es la desconfianza generalizada, que conduce a
            la destrucción del capital social disponible en una comunidad. Cuando los padres de
            familia, los docentes, los empresarios, los sacerdotes, los líderes sociales y las
            autoridades, tienen la mente ofuscada por la ideología igualitaria de la lucha de
            clases, sociológicamente reina en ellos la desconfianza, permanecen psicológicamente
            ausentes, se vuelven codiciosos compulsivos y niegan la dimensión moral de las
            relaciones humanas.
          </p>
        </div>

        {/* Cita destacada con decoración */}
        <div
          className="relative rounded-xl p-7 md:p-10 border-l-4 overflow-hidden"
          style={{
            borderLeftColor: "#E8511A",
            background: "linear-gradient(135deg, #1A3A5C, #1F4FA3)",
            boxShadow: "0 8px 40px rgba(26,58,92,0.25)",
          }}
        >
          <p
            className="absolute top-3 left-6 text-8xl leading-none select-none pointer-events-none"
            style={{ color: "#B87333", fontFamily: "Georgia, serif", opacity: 0.15 }}
          >
            ❝
          </p>
          <p
            className="relative text-xs tracking-[0.2em] uppercase mb-4"
            style={{ color: "#B87333", fontFamily: "var(--font-cinzel, serif)" }}
          >
            Eslogan del «estallido social»
          </p>
          <p
            className="relative text-base md:text-xl italic leading-relaxed mb-5 font-semibold"
            style={{ color: "#F5EDD6", fontFamily: "var(--font-lora, serif)" }}
          >
            «Hay que destruirlo todo y comenzar de nuevo»
          </p>
          <div
            className="relative h-px mb-4"
            style={{ background: "linear-gradient(90deg, #E8511A, transparent)" }}
          />
          <p
            className="relative text-xs leading-relaxed"
            style={{ color: "#B87333", fontFamily: "var(--font-lora, serif)", opacity: 0.9 }}
          >
            Variante latinoamericana del lema de Mao Tse-tung: «Destruimos todo el mundo de la
            violencia: hasta sus cimientos, y luego construiremos nuestro nuevo mundo, donde lo que
            era nada, se convertirá en el todo». La EDN propone el camino contrario: restaurar,
            educar, y fortalecer desde la familia y la comunidad.
          </p>
        </div>
      </section>

      <Separador />

      {/* SECCIÓN III — BENEFICIOS */}
      <section className="max-w-4xl mx-auto px-4 py-14">
        <SectionHeader
          titulo="III. Beneficios de la Membresía EDN"
          subtitulo="Al recibir la membresía de la EDN, se obtienen los siguientes beneficios"
        />
        <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
          {beneficios.map(({ num, titulo, desc }) => (
            <div
              key={num}
              className="rounded-xl p-5 border flex gap-4 items-start transition-all duration-300 hover:-translate-y-1"
              style={{
                borderColor: "#B87333",
                background: "linear-gradient(160deg, #ede4cb 0%, #ddd0b0 100%)",
                boxShadow: "0 2px 16px rgba(26,58,92,0.06)",
              }}
            >
              <div
                className="w-10 h-10 rounded-full flex items-center justify-center font-bold text-sm flex-shrink-0"
                style={{
                  background: "linear-gradient(135deg, #E8511A, #B87333)",
                  color: "#F5EDD6",
                  fontFamily: "var(--font-cinzel, serif)",
                  boxShadow: "0 4px 12px rgba(232,81,26,0.3)",
                }}
              >
                {num}
              </div>
              <div>
                <h3
                  className="text-xs font-bold tracking-wide uppercase mb-1"
                  style={{ color: "#1A3A5C", fontFamily: "var(--font-cinzel, serif)" }}
                >
                  {titulo}
                </h3>
                <p
                  className="text-xs leading-relaxed"
                  style={{ color: "#1B6CA8", fontFamily: "var(--font-lora, serif)" }}
                >
                  {desc}
                </p>
              </div>
            </div>
          ))}
        </div>
      </section>

      <Separador />

      {/* FOOTER CTA */}
      <section
        className="w-full py-20 px-4 flex flex-col items-center text-center"
        style={{ background: "#1A3A5C" }}
      >
        <p
          className="text-xs tracking-[0.4em] uppercase mb-4"
          style={{ color: "#B87333", fontFamily: "var(--font-cinzel, serif)" }}
        >
          Escuela de Nazaret · EDN
        </p>
        <h2
          className="text-2xl md:text-3xl font-bold mb-5 max-w-xl"
          style={{ color: "#F5EDD6", fontFamily: "var(--font-cinzel, serif)" }}
        >
          ¿Desea obtener su Membresía?
        </h2>
        <p
          className="text-sm max-w-md leading-relaxed mb-9"
          style={{ color: "#B87333", fontFamily: "var(--font-lora, serif)" }}
        >
          Contáctenos para iniciar el proceso de inscripción al Curso de Operador de Causas
          Sociales (CNO 4211-A1) y convertirse en mentor de su comunidad.
        </p>
        <a
          href="mailto:info@galeonadecadiz.org"
          className="px-10 py-4 rounded-full text-sm font-semibold tracking-widest uppercase transition-opacity hover:opacity-90"
          style={{
            background: "linear-gradient(135deg, #E8511A, #B87333)",
            color: "#F5EDD6",
            fontFamily: "var(--font-cinzel, serif)",
            boxShadow: "0 8px 32px rgba(232,81,26,0.35)",
          }}
        >
          Contactar a la EDN
        </a>
        <div
          className="h-px w-48 mt-12"
          style={{ background: "linear-gradient(90deg, transparent, #B87333, transparent)" }}
        />
        <p
          className="text-xs mt-4 tracking-widest uppercase"
          style={{ color: "#F5EDD6", fontFamily: "var(--font-cinzel, serif)", opacity: 0.35 }}
        >
          Sapientia Ædificavit Sibi Domvn
        </p>
      </section>
    </div>
  );
}
