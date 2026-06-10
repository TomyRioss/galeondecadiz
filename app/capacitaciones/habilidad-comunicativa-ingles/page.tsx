const metodologia = [
  "Aulas Virtuales",
  "Tecnologías de última generación",
  "Enseñanza visual",
  "Habilidades de escucha",
  "Conversación fluida",
  "Práctica de vocabulario",
  "Contenido gramatical",
  "Redacción y Literatura",
  "Sesiones de repaso",
  "Exámenes internacionales en grados 5°, 9° y 11°",
];

const apoyoFamilias = [
  "Personalización de contenidos vinculados al pensum escolar, currículo universitario o empresarial, con énfasis según la misión y visión de la institución.",
  "Sistema de Registro y Control avanzado.",
  "Formación continuada de docentes y padres de familia paralela a la educación de los estudiantes.",
  "Grupos virtuales de mínimo 16 y máximo 20 estudiantes por nivel.",
  "Tutoría permanente.",
  "Diagnósticos de evaluación institucional en el manejo del inglés en colegios, universidades y empresas.",
];

const programas = [
  { prog: "A", publico: "Niños de 3 a 5 años",              nivel: "Pre A1",             nombre: "Learn English with Dora (DTE)" },
  { prog: "B", publico: "Niños de 6 a 10 años",             nivel: "Conduce a Nivel A2", nombre: "Family and Friends" },
  { prog: "C", publico: "Preadolescentes de 11 a 14 años",  nivel: "Conduce a Nivel B1", nombre: "Smart Talk" },
  { prog: "D", publico: "Adolescentes de 15 a 16 años",     nivel: "Conduce a Nivel B2", nombre: "Smart Choice" },
  { prog: "E", publico: "Universitarios",                   nivel: "Conduce a Nivel C1", nombre: "Certificación internacional" },
  { prog: "F", publico: "Profesionales y empleados",        nivel: "Conduce a Nivel C1", nombre: "Certificación internacional" },
  { prog: "G", publico: "Todas las edades",                 nivel: "—",                  nombre: "Preparación exámenes internacionales" },
];

const autoras = [
  {
    nombre: "Naomi Simmons",
    bio: "Autora durante 20 años de Oxford University Press. Autora principal de Family and Friends, uno de los cursos internacionales para primaria más vendidos en el mundo. BSc (Econ) Honoris Causa de la Universidad de Gales. En 2011 recibió el Máster Honoris Causa en Letras de la Universidad de Hertfordshire. Fue presentada a Su Majestad la Reina en el Palacio de Buckingham por sus contribuciones en la promoción del idioma inglés.",
  },
  {
    nombre: "Jenny Quintana",
    bio: "Título en inglés y certificado de posgrado en educación de la Universidad de Londres. Co-autora de Family and Friends, Cambridge English: Key for Schools Result, PET Result y Oxford Heroes.",
  },
  {
    nombre: "Tamzin Thompson",
    bio: "Estudió Lingüística y Drama, Cine y Televisión en el University College de Ripon y York. Enseñó inglés en Grecia. Desde 2004 autora independiente de ELT; ha contribuido a las series Héroes, Toby y Family and Friends de OUP.",
  },
  {
    nombre: "Ken Wilson",
    bio: "Exprofesor de inglés y formador de profesores en España y el Reino Unido. Autor de más de 30 títulos; su primera obra fue una colección de canciones didácticas lanzada a los 23 años, convirtiéndolo en el autor de ELT más joven publicado. Ha escrito más de una docena de libros de texto con más de 200 millones de copias en uso. La serie Smart Choice contiene 16 canciones originales suyas.",
  },
];

export default function HabilidadComunicativaInglesPage() {
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
              "repeating-linear-gradient(45deg, #B87333 0px, #B87333 1px, transparent 1px, transparent 60px)",
          }}
        />
        <div
          className="absolute bottom-0 left-0 right-0 h-20 pointer-events-none"
          style={{ background: "linear-gradient(to top, #F5EDD6, transparent)" }}
        />
        <p
          className="relative text-xs tracking-[0.4em] uppercase mb-2"
          style={{ color: "#B87333", fontFamily: "var(--font-cinzel, serif)" }}
        >
          EDN · Escuela de Nazaret — Fundación Social Galeona de Cádiz
        </p>
        <p
          className="relative text-xs tracking-[0.3em] uppercase mb-5"
          style={{ color: "#d4c9a8", fontFamily: "var(--font-cinzel, serif)" }}
        >
          Convenio de Cooperación Cultural
        </p>
        <h1
          className="relative text-3xl md:text-5xl font-bold leading-tight mb-4 max-w-3xl"
          style={{ color: "#F5EDD6", fontFamily: "var(--font-cinzel, serif)" }}
        >
          Habilidad Comunicativa en Inglés
        </h1>
        <p
          className="relative text-base md:text-lg font-semibold mb-4"
          style={{ color: "#B87333", fontFamily: "var(--font-cinzel, serif)" }}
        >
          WISDOM — Alianzas Estratégicas que Transforman
        </p>
        <p
          className="relative text-sm md:text-base max-w-2xl leading-relaxed mb-10"
          style={{ color: "#d4c9a8", fontFamily: "var(--font-lora, serif)" }}
        >
          Programas de inglés para toda la familia con obras de <strong style={{ color: "#B87333" }}>Oxford University Press</strong>. Desde los 3 años hasta profesionales adultos.
        </p>
        <div
          className="relative h-px w-48"
          style={{ background: "linear-gradient(90deg, transparent, #B87333, transparent)" }}
        />
      </section>

      {/* METODOLOGÍA */}
      <section className="max-w-4xl mx-auto px-4 py-14">
        <div className="flex items-start gap-4 mb-8">
          <div
            className="w-1.5 h-14 rounded-full flex-shrink-0"
            style={{ background: "linear-gradient(180deg, #E8511A, #B87333)" }}
          />
          <div>
            <h2
              className="text-xl md:text-2xl font-bold tracking-widest uppercase"
              style={{ color: "#1A3A5C", fontFamily: "var(--font-cinzel, serif)" }}
            >
              Nuestra Metodología
            </h2>
          </div>
        </div>
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-5 gap-4">
          {metodologia.map((m, i) => (
            <div
              key={i}
              className="flex flex-col items-center gap-2 rounded-xl p-4 border text-center transition-all duration-300 hover:-translate-y-1"
              style={{
                borderColor: "#B87333",
                background: "linear-gradient(160deg, #ede4cb 0%, #ddd0b0 100%)",
                boxShadow: "0 2px 12px rgba(26,58,92,0.05)",
              }}
            >
              <span
                className="w-8 h-8 rounded-full flex items-center justify-center text-xs font-bold flex-shrink-0"
                style={{
                  background: "linear-gradient(135deg, #E8511A, #B87333)",
                  color: "#F5EDD6",
                  fontFamily: "var(--font-cinzel, serif)",
                }}
              >
                {i + 1}
              </span>
              <p className="text-xs leading-snug" style={{ color: "#1A3A5C", fontFamily: "var(--font-lora, serif)" }}>{m}</p>
            </div>
          ))}
        </div>
      </section>

      <div className="flex justify-center px-4">
        <div className="w-full max-w-4xl h-px" style={{ background: "linear-gradient(90deg, transparent, #B87333, transparent)" }} />
      </div>

      {/* BENEFICIOS */}
      <section className="max-w-4xl mx-auto px-4 py-14">
        <div className="flex items-start gap-4 mb-8">
          <div
            className="w-1.5 h-14 rounded-full flex-shrink-0"
            style={{ background: "linear-gradient(180deg, #E8511A, #B87333)" }}
          />
          <div>
            <h2
              className="text-xl md:text-2xl font-bold tracking-widest uppercase"
              style={{ color: "#1A3A5C", fontFamily: "var(--font-cinzel, serif)" }}
            >
              Beneficios para Estudiantes, Familias e Instituciones
            </h2>
          </div>
        </div>
        <div
          className="rounded-xl p-6 md:p-8 border-2 mb-6"
          style={{
            background: "linear-gradient(160deg, #ede4cb 0%, #ddd0b0 100%)",
            borderColor: "#B87333",
          }}
        >
          <p className="text-sm leading-relaxed mb-3" style={{ color: "#1A3A5C", fontFamily: "var(--font-lora, serif)" }}>
            La enseñanza especializada del idioma inglés a través de nuestra alianza permite dictar virtualmente asignaturas y cursos, con docentes vinculados a la colegiatura de la Escuela de Nazaret, utilizando materiales de alto nivel y exámenes internacionales producidos por Oxford University Press.
          </p>
          <p className="text-sm leading-relaxed" style={{ color: "#1A3A5C", fontFamily: "var(--font-lora, serif)" }}>
            Nuestra enseñanza integra tecnologías educativas de última generación que permiten mejorar el aprendizaje, cumpliendo los lineamientos del <strong>Ministerio de Educación Nacional de Colombia</strong> y los estándares del <strong>Marco Común de Referencia Europeo</strong>.
          </p>
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          {apoyoFamilias.map((item, i) => (
            <div
              key={i}
              className="flex items-start gap-4 rounded-xl p-4 border transition-all duration-300 hover:-translate-y-0.5"
              style={{
                borderColor: "#B87333",
                background: "linear-gradient(135deg, #ede4cb 0%, #e0d5b5 100%)",
                boxShadow: "0 2px 12px rgba(26,58,92,0.05)",
              }}
            >
              <span
                className="w-7 h-7 rounded-full flex items-center justify-center text-xs font-bold flex-shrink-0 mt-0.5"
                style={{
                  background: "linear-gradient(135deg, #1A3A5C, #1F4FA3)",
                  color: "#B87333",
                  fontFamily: "var(--font-cinzel, serif)",
                }}
              >
                {i + 1}
              </span>
              <p className="text-sm leading-relaxed" style={{ color: "#1A3A5C", fontFamily: "var(--font-lora, serif)" }}>{item}</p>
            </div>
          ))}
        </div>
      </section>

      <div className="flex justify-center px-4">
        <div className="w-full max-w-4xl h-px" style={{ background: "linear-gradient(90deg, transparent, #B87333, transparent)" }} />
      </div>

      {/* TIPOS DE PROGRAMAS */}
      <section className="max-w-4xl mx-auto px-4 py-14">
        <div className="flex items-start gap-4 mb-8">
          <div
            className="w-1.5 h-14 rounded-full flex-shrink-0"
            style={{ background: "linear-gradient(180deg, #E8511A, #B87333)" }}
          />
          <div>
            <h2
              className="text-xl md:text-2xl font-bold tracking-widest uppercase"
              style={{ color: "#1A3A5C", fontFamily: "var(--font-cinzel, serif)" }}
            >
              Tipos de Programas
            </h2>
            <p className="text-sm mt-1" style={{ color: "#1B6CA8", fontFamily: "var(--font-lora, serif)" }}>
              Marco Común de Referencia Europeo
            </p>
          </div>
        </div>

        <div className="overflow-x-auto rounded-xl border-2 mb-8" style={{ borderColor: "#B87333" }}>
          <table className="w-full text-sm" style={{ fontFamily: "var(--font-lora, serif)" }}>
            <thead>
              <tr style={{ background: "#1A3A5C" }}>
                <th className="px-4 py-3 text-center text-xs tracking-widest uppercase" style={{ color: "#B87333", fontFamily: "var(--font-cinzel, serif)" }}>Prog.</th>
                <th className="px-4 py-3 text-left text-xs tracking-widest uppercase" style={{ color: "#B87333", fontFamily: "var(--font-cinzel, serif)" }}>Público</th>
                <th className="px-4 py-3 text-left text-xs tracking-widest uppercase" style={{ color: "#B87333", fontFamily: "var(--font-cinzel, serif)" }}>Programa</th>
                <th className="px-4 py-3 text-center text-xs tracking-widest uppercase" style={{ color: "#B87333", fontFamily: "var(--font-cinzel, serif)" }}>Nivel MCER</th>
              </tr>
            </thead>
            <tbody>
              {programas.map(({ prog, publico, nivel, nombre }, i) => (
                <tr
                  key={prog}
                  style={{
                    background: i % 2 === 0
                      ? "linear-gradient(135deg, #ede4cb 0%, #ddd0b0 100%)"
                      : "linear-gradient(135deg, #e5dcc0 0%, #d4c9a8 100%)",
                  }}
                >
                  <td className="px-4 py-3 text-center font-bold text-base" style={{ color: "#E8511A", fontFamily: "var(--font-cinzel, serif)" }}>{prog}</td>
                  <td className="px-4 py-3 text-xs" style={{ color: "#1A3A5C" }}>{publico}</td>
                  <td className="px-4 py-3 text-xs font-semibold" style={{ color: "#1A3A5C", fontFamily: "var(--font-cinzel, serif)" }}>{nombre}</td>
                  <td className="px-4 py-3 text-center text-xs font-bold" style={{ color: "#1B6CA8" }}>{nivel}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </section>

      <div className="flex justify-center px-4">
        <div className="w-full max-w-4xl h-px" style={{ background: "linear-gradient(90deg, transparent, #B87333, transparent)" }} />
      </div>

      {/* PROGRAMAS DETALLE */}
      <section className="max-w-4xl mx-auto px-4 py-14">
        <div className="flex items-start gap-4 mb-8">
          <div
            className="w-1.5 h-14 rounded-full flex-shrink-0"
            style={{ background: "linear-gradient(180deg, #E8511A, #B87333)" }}
          />
          <div>
            <h2
              className="text-xl md:text-2xl font-bold tracking-widest uppercase"
              style={{ color: "#1A3A5C", fontFamily: "var(--font-cinzel, serif)" }}
            >
              Descripción de los Programas
            </h2>
          </div>
        </div>

        <div className="flex flex-col gap-6">

          {/* DORA */}
          <div
            className="rounded-xl p-6 border-2"
            style={{ borderColor: "#B87333", background: "linear-gradient(160deg, #ede4cb 0%, #ddd0b0 100%)" }}
          >
            <div className="flex items-center gap-3 mb-3">
              <span
                className="w-10 h-10 rounded-full flex items-center justify-center font-bold text-sm flex-shrink-0"
                style={{ background: "linear-gradient(135deg, #E8511A, #B87333)", color: "#F5EDD6", fontFamily: "var(--font-cinzel, serif)" }}
              >A</span>
              <div>
                <h3 className="text-sm font-bold tracking-wide" style={{ color: "#1A3A5C", fontFamily: "var(--font-cinzel, serif)" }}>
                  Learn English with Dora (DTE)
                </h3>
                <p className="text-xs" style={{ color: "#B87333", fontFamily: "var(--font-cinzel, serif)" }}>4 a 5 años · Pre A1</p>
              </div>
            </div>
            <ul className="space-y-1">
              {[
                "Inspirar en los niños el amor por el aprendizaje.",
                "Con acompañamiento psicológico, desarrolla la motricidad fina y gruesa para una transición exitosa a primaria.",
                "Habilidades de resolución de problemas acordes a su edad.",
                "Confianza para escuchar y hablar.",
                "Actitud natural del \"poder hacer\" por medio de canciones, historias y obras de teatro.",
                "Estimulación de habilidades de lectura, pronunciación y escritura.",
                "Evidencias de aprendizaje mediante actividades de Lettering y desarrollo de habilidades manuales.",
                "Preparación para el examen internacional Pre-A1.",
                "Portal web para padres y docentes con consejos y recursos didácticos.",
              ].map((item, i) => (
                <li key={i} className="flex gap-2 items-start">
                  <span className="mt-1.5 w-1.5 h-1.5 rounded-full flex-shrink-0" style={{ background: "#B87333" }} />
                  <span className="text-xs leading-relaxed" style={{ color: "#1A3A5C", fontFamily: "var(--font-lora, serif)" }}>{item}</span>
                </li>
              ))}
            </ul>
          </div>

          {/* FAMILY AND FRIENDS */}
          <div
            className="rounded-xl p-6 border-2"
            style={{ borderColor: "#B87333", background: "linear-gradient(160deg, #ede4cb 0%, #ddd0b0 100%)" }}
          >
            <div className="flex items-center gap-3 mb-3">
              <span
                className="w-10 h-10 rounded-full flex items-center justify-center font-bold text-sm flex-shrink-0"
                style={{ background: "linear-gradient(135deg, #E8511A, #B87333)", color: "#F5EDD6", fontFamily: "var(--font-cinzel, serif)" }}
              >B</span>
              <div>
                <h3 className="text-sm font-bold tracking-wide" style={{ color: "#1A3A5C", fontFamily: "var(--font-cinzel, serif)" }}>
                  Family and Friends
                </h3>
                <p className="text-xs" style={{ color: "#B87333", fontFamily: "var(--font-cinzel, serif)" }}>6 a 11 años · Conduce a Nivel A2</p>
              </div>
            </div>
            <p className="text-xs leading-relaxed mb-3" style={{ color: "#1A3A5C", fontFamily: "var(--font-lora, serif)" }}>
              Combina fluidez, cultura, evaluación y recursos digitales de última tecnología. Logra un rápido avance en el dominio del lenguaje centrado en la fonética correcta, desarrollo de habilidades familiares básicas, educación cívica y preparación para pruebas internacionales.
            </p>
            <p className="text-xs leading-relaxed mb-2" style={{ color: "#1A3A5C", fontFamily: "var(--font-lora, serif)" }}>
              Programa completo de valores éticos y protocolo social inmerso en canciones, cuentos y obras de teatro para desarrollar la inteligencia emocional y habilidades sociales. Quizzes personalizados disponibles en el portal web para padres y maestros.
            </p>
          </div>

          {/* SMART TALK */}
          <div
            className="rounded-xl p-6 border-2"
            style={{ borderColor: "#B87333", background: "linear-gradient(160deg, #ede4cb 0%, #ddd0b0 100%)" }}
          >
            <div className="flex items-center gap-3 mb-3">
              <span
                className="w-10 h-10 rounded-full flex items-center justify-center font-bold text-sm flex-shrink-0"
                style={{ background: "linear-gradient(135deg, #E8511A, #B87333)", color: "#F5EDD6", fontFamily: "var(--font-cinzel, serif)" }}
              >C</span>
              <div>
                <h3 className="text-sm font-bold tracking-wide" style={{ color: "#1A3A5C", fontFamily: "var(--font-cinzel, serif)" }}>
                  Smart Talk — Charla Inteligente
                </h3>
                <p className="text-xs" style={{ color: "#B87333", fontFamily: "var(--font-cinzel, serif)" }}>Grado 7° y 8° · 12 a 13 años · Conduce a Nivel B1</p>
              </div>
            </div>
            <p className="text-xs leading-relaxed" style={{ color: "#1A3A5C", fontFamily: "var(--font-lora, serif)" }}>
              Curso flexible para que los adolescentes comprendan y se comuniquen con confianza en inglés. Las lecciones van de la introducción al uso controlado y libre del idioma. Los resultados al final de cada unidad se presentan en recuadros <strong>"Ahora puedo"</strong>, alentando la autoevaluación. El enfoque comunicativo centra las conversaciones en lograr que los estudiantes hablen inglés todos los días.
            </p>
          </div>

          {/* SMART CHOICE */}
          <div
            className="rounded-xl p-6 border-2"
            style={{ borderColor: "#B87333", background: "linear-gradient(160deg, #ede4cb 0%, #ddd0b0 100%)" }}
          >
            <div className="flex items-center gap-3 mb-3">
              <span
                className="w-10 h-10 rounded-full flex items-center justify-center font-bold text-sm flex-shrink-0"
                style={{ background: "linear-gradient(135deg, #E8511A, #B87333)", color: "#F5EDD6", fontFamily: "var(--font-cinzel, serif)" }}
              >D</span>
              <div>
                <h3 className="text-sm font-bold tracking-wide" style={{ color: "#1A3A5C", fontFamily: "var(--font-cinzel, serif)" }}>
                  Smart Choice — Elección Inteligente
                </h3>
                <p className="text-xs" style={{ color: "#B87333", fontFamily: "var(--font-cinzel, serif)" }}>Grado 9° y 10° · 14 a 15 años · Conduce a Nivel B2</p>
              </div>
            </div>
            <p className="text-xs leading-relaxed" style={{ color: "#1A3A5C", fontFamily: "var(--font-lora, serif)" }}>
              Curso de cuatro habilidades para jóvenes preuniversitarios y adultos. Incluye actividades para teléfonos inteligentes y tabletas. Páginas para hablar y fortalecer la fluidez a través de juegos y actividades. La sección de ejercicios proporciona práctica de autoaprendizaje de gramática, vocabulario, lectura, comprensión auditiva y pronunciación.
            </p>
          </div>

          {/* CERTIFICACIÓN INTERNACIONAL */}
          <div
            className="rounded-xl p-6 border-2"
            style={{ borderColor: "#B87333", background: "linear-gradient(160deg, #ede4cb 0%, #ddd0b0 100%)" }}
          >
            <div className="flex items-center gap-3 mb-3">
              <span
                className="w-10 h-10 rounded-full flex items-center justify-center font-bold text-sm flex-shrink-0"
                style={{ background: "linear-gradient(135deg, #1A3A5C, #1F4FA3)", color: "#B87333", fontFamily: "var(--font-cinzel, serif)" }}
              >G</span>
              <div>
                <h3 className="text-sm font-bold tracking-wide" style={{ color: "#1A3A5C", fontFamily: "var(--font-cinzel, serif)" }}>
                  Preparación para Certificación Internacional
                </h3>
                <p className="text-xs" style={{ color: "#B87333", fontFamily: "var(--font-cinzel, serif)" }}>Grado 11°, preuniversitarios y adultos (16 años o más)</p>
              </div>
            </div>
            <ul className="space-y-1">
              {[
                "Medición del avance con el Placement Test de Oxford.",
                "Prepara tanto para el inglés británico como el estadounidense.",
                "Con el QPT de Oxford se puede hacer seguimiento a la variedad de inglés y mezcla de acentos.",
                "Aprendizaje mediado a través de quizzes, fácil de administrar en casa con recursos informáticos comunes.",
              ].map((item, i) => (
                <li key={i} className="flex gap-2 items-start">
                  <span className="mt-1.5 w-1.5 h-1.5 rounded-full flex-shrink-0" style={{ background: "#B87333" }} />
                  <span className="text-xs leading-relaxed" style={{ color: "#1A3A5C", fontFamily: "var(--font-lora, serif)" }}>{item}</span>
                </li>
              ))}
            </ul>
          </div>

        </div>
      </section>

      <div className="flex justify-center px-4">
        <div className="w-full max-w-4xl h-px" style={{ background: "linear-gradient(90deg, transparent, #B87333, transparent)" }} />
      </div>

      {/* OXFORD TESTS */}
      <section className="max-w-4xl mx-auto px-4 py-14">
        <div className="flex items-start gap-4 mb-8">
          <div
            className="w-1.5 h-14 rounded-full flex-shrink-0"
            style={{ background: "linear-gradient(180deg, #E8511A, #B87333)" }}
          />
          <div>
            <h2
              className="text-xl md:text-2xl font-bold tracking-widest uppercase"
              style={{ color: "#1A3A5C", fontFamily: "var(--font-cinzel, serif)" }}
            >
              Exámenes Internacionales Oxford
            </h2>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div
            className="rounded-xl p-6 border-2"
            style={{ borderColor: "#B87333", background: "linear-gradient(135deg, #1A3A5C 0%, #1F4FA3 100%)" }}
          >
            <p className="text-xs tracking-[0.2em] uppercase mb-2" style={{ color: "#B87333", fontFamily: "var(--font-cinzel, serif)" }}>
              Grado 5°
            </p>
            <h3 className="text-sm font-bold mb-3" style={{ color: "#F5EDD6", fontFamily: "var(--font-cinzel, serif)" }}>
              Oxford Online Young Learner Placement Test (OYLPT)
            </h3>
            <p className="text-xs leading-relaxed" style={{ color: "#d4c9a8", fontFamily: "var(--font-lora, serif)" }}>
              Con la prueba de nivel de Oxford Young Learners, el Colegio San Cayetano en alianza con WISDOM ubica a sus estudiantes en el nivel correcto y garantiza una enseñanza escolar adecuada para el desarrollo armónico de todas las habilidades del idioma inglés.
            </p>
          </div>

          <div
            className="rounded-xl p-6 border-2"
            style={{ borderColor: "#B87333", background: "linear-gradient(160deg, #ede4cb 0%, #ddd0b0 100%)" }}
          >
            <p className="text-xs tracking-[0.2em] uppercase mb-2" style={{ color: "#B87333", fontFamily: "var(--font-cinzel, serif)" }}>
              Certificado por la Universidad de Oxford
            </p>
            <h3 className="text-sm font-bold mb-3" style={{ color: "#1A3A5C", fontFamily: "var(--font-cinzel, serif)" }}>
              Oxford Test of English
            </h3>
            <p className="text-xs leading-relaxed mb-3" style={{ color: "#1A3A5C", fontFamily: "var(--font-lora, serif)" }}>
              Examen de dominio del inglés en línea, disponible los <strong>365 días del año</strong>, con resultados en solo <strong>14 días</strong>. Evalúa comprensión auditiva, lectura, escritura y expresión oral en niveles <strong>A2, B1 y B2</strong> del MCER.
            </p>
            <div className="flex flex-wrap gap-2">
              {["Flexible", "Reconocido internacionalmente", "100% en línea"].map((tag) => (
                <span
                  key={tag}
                  className="text-[0.6rem] px-2 py-1 rounded-full tracking-wide uppercase"
                  style={{ background: "#1A3A5C", color: "#B87333", fontFamily: "var(--font-cinzel, serif)" }}
                >
                  {tag}
                </span>
              ))}
            </div>
            <p className="text-xs leading-relaxed mt-3" style={{ color: "#1A3A5C", fontFamily: "var(--font-lora, serif)" }}>
              Los <strong>Centros Regionales de Educación B-Learning (CREBL)</strong> de la Escuela de Nazaret–EDN han sido provistos de laboratorios de idiomas para la realización de los exámenes, evitando desplazamientos a otras ciudades.
            </p>
          </div>
        </div>
      </section>

      <div className="flex justify-center px-4">
        <div className="w-full max-w-4xl h-px" style={{ background: "linear-gradient(90deg, transparent, #B87333, transparent)" }} />
      </div>

      {/* AUTORES */}
      <section className="max-w-4xl mx-auto px-4 py-14">
        <div className="flex items-start gap-4 mb-8">
          <div
            className="w-1.5 h-14 rounded-full flex-shrink-0"
            style={{ background: "linear-gradient(180deg, #E8511A, #B87333)" }}
          />
          <div>
            <h2
              className="text-xl md:text-2xl font-bold tracking-widest uppercase"
              style={{ color: "#1A3A5C", fontFamily: "var(--font-cinzel, serif)" }}
            >
              Autores del Material Oxford
            </h2>
          </div>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
          {autoras.map(({ nombre, bio }) => (
            <div
              key={nombre}
              className="rounded-xl p-6 border-2 flex flex-col gap-3 transition-all duration-300 hover:-translate-y-0.5"
              style={{
                borderColor: "#B87333",
                background: "linear-gradient(160deg, #ede4cb 0%, #ddd0b0 100%)",
                boxShadow: "0 2px 16px rgba(26,58,92,0.06)",
              }}
            >
              <div
                className="w-10 h-10 rounded-full flex items-center justify-center font-bold text-sm flex-shrink-0"
                style={{
                  background: "#1A3A5C",
                  color: "#B87333",
                  fontFamily: "var(--font-cinzel, serif)",
                  border: "2px solid #B87333",
                }}
              >
                {nombre.charAt(0)}
              </div>
              <h3 className="text-sm font-bold" style={{ color: "#1A3A5C", fontFamily: "var(--font-cinzel, serif)" }}>{nombre}</h3>
              <p className="text-xs leading-relaxed" style={{ color: "#1B6CA8", fontFamily: "var(--font-lora, serif)" }}>{bio}</p>
            </div>
          ))}
        </div>
      </section>

      {/* CTA */}
      <section
        className="py-20 px-4 flex flex-col items-center gap-5"
        style={{ background: "#1A3A5C" }}
      >
        <p
          className="text-xs tracking-[0.4em] uppercase"
          style={{ color: "#B87333", fontFamily: "var(--font-cinzel, serif)" }}
        >
          Separe su cupo
        </p>
        <h3
          className="text-2xl md:text-3xl font-bold text-center max-w-lg"
          style={{ color: "#F5EDD6", fontFamily: "var(--font-cinzel, serif)" }}
        >
          ¿Desea inscribirse en el programa de inglés?
        </h3>
        <div className="flex flex-col sm:flex-row gap-4 mt-3">
          <a
            href="mailto:contactenos@galeonadecadiz.org"
            className="inline-block px-8 py-4 rounded-full font-semibold tracking-widest uppercase text-sm transition-opacity hover:opacity-90"
            style={{
              background: "linear-gradient(90deg, #E8511A, #B87333)",
              color: "#F5EDD6",
              fontFamily: "var(--font-cinzel, serif)",
              letterSpacing: "0.12em",
              boxShadow: "0 8px 32px rgba(232,81,26,0.35)",
            }}
          >
            contactenos@galeonadecadiz.org
          </a>
          <a
            href="https://wa.me/573112524239"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-block px-8 py-4 rounded-full font-semibold tracking-widest uppercase text-sm transition-opacity hover:opacity-90 border-2"
            style={{
              borderColor: "#B87333",
              color: "#B87333",
              fontFamily: "var(--font-cinzel, serif)",
              letterSpacing: "0.12em",
            }}
          >
            WhatsApp +57 311 252 4239
          </a>
        </div>
        <p className="text-xs mt-1" style={{ color: "#d4c9a8", fontFamily: "var(--font-lora, serif)" }}>
          Tel. Fijo: +57 (601) 892 8773
        </p>
        <div
          className="h-px w-48 mt-4"
          style={{ background: "linear-gradient(90deg, transparent, #B87333, transparent)" }}
        />
      </section>

    </div>
  );
}
