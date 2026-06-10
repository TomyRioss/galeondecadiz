const objetivos = [
  {
    letra: "A",
    titulo: "Taxonomía y producción",
    desc: "Establecer metodologías y políticas estandarizadas de taxonomía, mapas mentales y estudios de diseño orientados a la producción de obras literarias, libros de texto, cartillas pedagógicas y material artístico.",
  },
  {
    letra: "B",
    titulo: "Divulgación y distribución",
    desc: "Trazar estrategias, planificar y diseñar mecanismos de divulgación, comercialización y distribución de las obras publicadas por el Fondo Editorial Galeona.",
  },
  {
    letra: "C",
    titulo: "Intercambio cultural",
    desc: "Desarrollar acciones que favorezcan los intercambios culturales a través del libro y los conversatorios virtuales o presenciales con instituciones interesadas en las ciencias morales y la salud.",
  },
  {
    letra: "D",
    titulo: "Red de impresores",
    desc: "Establecer contactos con impresores de reconocimiento social por la calidad de sus publicaciones de corriente principal en las ciencias morales y de la medicina reconstructiva del tejido social.",
  },
  {
    letra: "E",
    titulo: "Equilibrio editorial",
    desc: "Diseñar y concretar trabajos editoriales buscando equilibrio entre costo, calidad, precio, distribución y transporte, con convicción de que la buena calidad redunda en mejor promoción y apoyo al lector.",
  },
];

const indicesTematicos = [
  "Ciencias morales y de la salud (ontología, axiología, teología, filosofía, pedagogía)",
  "Ciencias sociales (jurídicas, antropología, sociología, administración, economía y política)",
  "Ciencias históricas: historia, geografía, arqueología, lenguas antiguas, clásicas y modernas",
  "Literatura: novela, épica, tragedia, comedia, poesía, relatos familiares y libros de mandas",
  "Veterinaria, botánica, ciencias exactas y astronomía",
  "Artes, recreación, cronistas, relatos de salidas pedagógicas",
  "Libretos para dramatizados",
  "Diccionarios etimológicos y lexicográficos, fuentes referenciales",
  "Catálogos",
];

const sellos = [
  { sigla: "IF", nombre: "Initium Fide", tipo: "Literatura infantil" },
  { sigla: "SM", nombre: "Saber Más", tipo: "Literatura juvenil" },
  { sigla: "TE", nombre: "Testimonium", tipo: "Consejería y consultoría" },
  { sigla: "SC", nombre: "Scriptorium", tipo: "Instructivos y manuales" },
  { sigla: "DV", nombre: "Devotional", tipo: "Devocionales" },
  { sigla: "BT", nombre: "Bitácora", tipo: "Revista y papers académicos" },
  { sigla: "AR", nombre: "Artium", tipo: "Lienzos y papeles didácticos" },
  { sigla: "CR", nombre: "Craft", tipo: "Artesanías" },
];

const zafiroI = [
  { portal: "portal-00", titulo: "Oficial de Cumplimiento en SG-SST", cno: "2262", nivel: "Maestro" },
  { portal: "portal-01", titulo: "Promotor de Causas Sociales", cno: "4211", nivel: "Profesor" },
  { portal: "portal-02", titulo: "Preceptor de Cultura Familiar", cno: "4215", nivel: "Profesor" },
  { portal: "portal-03", titulo: "Curso Básico de Economía Mutual", cno: "4211", nivel: "Profesor" },
];

const zafiroII = [
  { portal: "portal-04", titulo: "Monitor de Salidas Pedagógicas", nivel: "Profesor" },
  { portal: "portal-05", titulo: "Aromas de la Fe", nivel: "Maestro" },
  { portal: "portal-07", titulo: "Habilidad Comunicativa en Castellano", nivel: "Profesor" },
  { portal: "portal-09", titulo: "Habilidad Comunicativa en Inglés", nivel: "Profesor" },
  { portal: "portal-10", titulo: "Oficial de Cumplimiento en Econ. Mutual", nivel: "Tutor" },
  { portal: "portal-12", titulo: "Oficial de Modistería y Sastrería Artesanal", nivel: "Tutor" },
  { portal: "portal-14", titulo: "Operador de Redes Sociales y Webinar", nivel: "Técnico" },
  { portal: "portal-18", titulo: "Oficial de Panadería y Pastelería", nivel: "Técnico" },
  { portal: "portal-19", titulo: "Oficial de Etnoconstrucción y Urbanística", nivel: "Maestro" },
];

const zafiroIII = [
  { portal: "A", titulo: "Formación Preescolar", nivel: "Lic." },
  { portal: "B", titulo: "Formación Primaria", nivel: "Lic." },
  { portal: "C", titulo: "Formación Secundaria", nivel: "Lic." },
  { portal: "D", titulo: "Formación en Ciencias Morales y de la Salud", nivel: "Lic." },
];

const derechos = [
  { porcentaje: "16.7%", concepto: "Honorarios sobre presupuesto de producción creativa" },
  { porcentaje: "22%", concepto: "Derechos de autor por cada ejemplar vendido e importe recaudado en caja" },
  { porcentaje: "3%", concepto: "Participación del editor académico que presenta la obra" },
];

const firmantes = [
  { nombre: "Álvaro Gallón Rodríguez", cargo: "Presidente y Representante Legal", entidad: "Fundación Social Galeona de Cádiz" },
  { nombre: "Emilia Nieto Reyes de Gallón", cargo: "Secretaria General", entidad: "Fundación Social Galeona de Cádiz" },
  { nombre: "Ricardo H. Prieto Gutiérrez", cargo: "Revisor Fiscal", entidad: "CC No 19.295.059 de Bogotá · TP No 26.232-T" },
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

export default function FundacionSocialPage() {
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
          Resolución de Presidencia No. 01 de 2023
        </p>
        <h1
          className="relative text-4xl md:text-6xl font-bold leading-tight mb-5 max-w-3xl"
          style={{ color: "#F5EDD6", fontFamily: "var(--font-cinzel, serif)" }}
        >
          Fondo Editorial Galeona
        </h1>
        <p
          className="relative text-sm md:text-base max-w-xl leading-relaxed mb-3"
          style={{ color: "#B87333", fontFamily: "var(--font-lora, serif)" }}
        >
          Reglamento · Según Acuerdo No. 3 de la Junta Directiva de 2023
        </p>
        <p
          className="relative text-xs mb-10"
          style={{ color: "#F5EDD6", fontFamily: "var(--font-lora, serif)", opacity: 0.55 }}
        >
          Dado el 25 de marzo de 2023 · NIT: 900.544.600-9
        </p>
        <div
          className="relative h-px w-48"
          style={{ background: "linear-gradient(90deg, transparent, #B87333, transparent)" }}
        />
      </section>

      {/* DISPOSICIONES GENERALES */}
      <section className="max-w-4xl mx-auto px-4 py-14">
        <SectionHeader
          titulo="Disposiciones Generales"
          subtitulo="Arts. 1–2 · Naturaleza y finalidad del Fondo Editorial"
        />
        <div
          className="rounded-2xl p-7 md:p-10 border-2"
          style={{
            borderColor: "#B87333",
            background: "linear-gradient(135deg, #e8dfc4 0%, #d4c9a8 100%)",
          }}
        >
          <p
            className="text-sm md:text-base leading-loose mb-5"
            style={{ color: "#1A3A5C", fontFamily: "var(--font-lora, serif)" }}
          >
            El <strong style={{ color: "#1B6CA8" }}>Fondo Editorial Galeona</strong> es un
            subsistema de la Fundación Social Galeona de Cádiz, articulado con la Escuela de
            Nazareth-EDN. Su finalidad es seleccionar, coordinar, traducir, realizar tratamiento de
            texto, editar, publicar y difundir obras literarias con el sello{" "}
            <em>Saber Más</em>, fundamentadas en la difusión de las ciencias morales.
          </p>
          <div
            className="h-px mb-5"
            style={{ background: "linear-gradient(90deg, #B87333, transparent)" }}
          />
          <p
            className="text-sm md:text-base leading-loose"
            style={{ color: "#1A3A5C", fontFamily: "var(--font-lora, serif)" }}
          >
            Las obras se desarrollan bajo criterios técnicos literarios y pedagógicos de alta
            calidad para editar y difundir libros de texto, papers seriados, revistas científicas,
            libretos para cine, radio, televisión, webinar, lexicografía, bases de datos
            bibliográficas, videos e imágenes de{" "}
            <strong style={{ color: "#1B6CA8" }}>patrimonio cultural material e inmaterial</strong>.
          </p>
        </div>
      </section>

      <Separador />

      {/* OBJETIVOS GENERALES */}
      <section className="max-w-4xl mx-auto px-4 py-14">
        <SectionHeader
          titulo="Finalidad Técnica y Objetivos"
          subtitulo="Art. 4 · Cinco objetivos generales del Fondo Editorial"
        />
        <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
          {objetivos.map(({ letra, titulo, desc }) => (
            <div
              key={letra}
              className="rounded-xl p-5 border flex gap-4 items-start transition-all duration-300 hover:-translate-y-0.5"
              style={{
                borderColor: "#B87333",
                background: "linear-gradient(160deg, #ede4cb 0%, #ddd0b0 100%)",
              }}
            >
              <div
                className="w-9 h-9 rounded-full flex items-center justify-center font-bold text-base flex-shrink-0"
                style={{
                  background: "linear-gradient(135deg, #E8511A, #B87333)",
                  color: "#F5EDD6",
                  fontFamily: "var(--font-cinzel, serif)",
                }}
              >
                {letra}
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

        {/* Índices temáticos */}
        <div className="mt-10">
          <p
            className="text-xs tracking-[0.2em] uppercase font-semibold mb-5"
            style={{ color: "#B87333", fontFamily: "var(--font-cinzel, serif)" }}
          >
            Art. 17 · Índices temáticos — «Libros con Clase»
          </p>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            {indicesTematicos.map((item, i) => (
              <div
                key={i}
                className="flex items-start gap-3 rounded-lg px-4 py-3"
                style={{ background: "linear-gradient(90deg, #ddd3b5, #e8dfc4)" }}
              >
                <span
                  className="w-6 h-6 rounded-full flex items-center justify-center text-xs font-bold flex-shrink-0"
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
        </div>
      </section>

      <Separador />

      {/* SELLOS EDITORIALES */}
      <section className="max-w-4xl mx-auto px-4 py-14">
        <SectionHeader
          titulo="Sellos Editoriales"
          subtitulo="Art. 17 · Colecciones y sellos del Fondo Editorial Galeona"
        />
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-5">
          {sellos.map(({ sigla, nombre, tipo }) => (
            <div
              key={sigla}
              className="flex flex-col items-center gap-3 rounded-xl p-5 border text-center"
              style={{
                borderColor: "#B87333",
                background: "linear-gradient(160deg, #ede4cb 0%, #d8cca8 100%)",
              }}
            >
              <div
                className="w-14 h-14 rounded-full flex items-center justify-center font-bold text-sm"
                style={{
                  background: "#1A3A5C",
                  color: "#B87333",
                  fontFamily: "var(--font-cinzel, serif)",
                  border: "2px solid #B87333",
                }}
              >
                {sigla}
              </div>
              <h3
                className="text-xs font-bold tracking-wide uppercase leading-tight"
                style={{ color: "#1A3A5C", fontFamily: "var(--font-cinzel, serif)" }}
              >
                {nombre}
              </h3>
              <p
                className="text-[0.68rem] leading-relaxed"
                style={{ color: "#1B6CA8", fontFamily: "var(--font-lora, serif)" }}
              >
                {tipo}
              </p>
            </div>
          ))}
        </div>
      </section>

      <Separador />

      {/* COLECCIONES ZAFIRO */}
      <section className="max-w-4xl mx-auto px-4 py-14">
        <SectionHeader
          titulo="Colecciones Zafiro SML"
          subtitulo="Sistema Manager Learning · Libros del estudiante, cartillas y guías maestras"
        />

        {[
          { titulo: "Zafiro-I · Colecciones Activas", items: zafiroI },
          { titulo: "Zafiro-II · En Fase de Desarrollo", items: zafiroII },
          { titulo: "Zafiro-III · Educación Virtual EDN", items: zafiroIII },
        ].map(({ titulo, items }, gi) => (
          <div key={gi} className="mb-8">
            <p
              className="text-xs tracking-[0.2em] uppercase font-semibold mb-3"
              style={{ color: "#B87333", fontFamily: "var(--font-cinzel, serif)" }}
            >
              {titulo}
            </p>
            <div
              className="rounded-xl overflow-hidden border"
              style={{ borderColor: "#B87333" }}
            >
              {items.map((item, i) => (
                <div
                  key={i}
                  className="flex items-center gap-4 px-5 py-3 border-b last:border-0"
                  style={{
                    borderColor: "#B87333",
                    background: i % 2 === 0
                      ? "linear-gradient(90deg, #e8dfc4, #ddd3b5)"
                      : "linear-gradient(90deg, #ddd3b5, #d0c8a5)",
                  }}
                >
                  <span
                    className="text-xs font-bold w-20 flex-shrink-0"
                    style={{ color: "#B87333", fontFamily: "var(--font-cinzel, serif)" }}
                  >
                    {item.portal}
                  </span>
                  <span
                    className="text-xs flex-1"
                    style={{ color: "#1A3A5C", fontFamily: "var(--font-lora, serif)" }}
                  >
                    {item.titulo}
                  </span>
                  <span
                    className="text-xs px-2 py-0.5 rounded-full flex-shrink-0"
                    style={{
                      background: "#1A3A5C",
                      color: "#F5EDD6",
                      fontFamily: "var(--font-cinzel, serif)",
                      fontSize: "0.6rem",
                    }}
                  >
                    {item.nivel}
                  </span>
                </div>
              ))}
            </div>
          </div>
        ))}
      </section>

      <Separador />

      {/* ORGANIZACIÓN */}
      <section
        className="py-14 px-4"
        style={{ background: "#1A3A5C" }}
      >
        <div className="max-w-4xl mx-auto">
          <div className="flex items-start gap-4 mb-8">
            <div
              className="w-1 h-12 rounded-full flex-shrink-0 mt-1"
              style={{ background: "linear-gradient(180deg, #E8511A, #B87333)" }}
            />
            <h2
              className="text-xl md:text-2xl font-bold tracking-widest uppercase"
              style={{ color: "#F5EDD6", fontFamily: "var(--font-cinzel, serif)" }}
            >
              Organización General
            </h2>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
            {[
              {
                titulo: "Coordinador General",
                items: [
                  "Convoca y preside el Consejo de Fomento Editorial",
                  "Gestiona el presupuesto asignado",
                  "Representa al Fondo en actos públicos y académicos",
                  "Presenta memoria anual en febrero",
                  "Protege derechos de propiedad intelectual",
                ],
              },
              {
                titulo: "Consejo de Fomento Editorial",
                items: [
                  "Coordinador General + 3 consejeros + representante del Presidente",
                  "Mantiene política editorial alineada a la Fundación",
                  "Concede membresías a autores, promotores y auspiciantes",
                  "Eleva calidad de publicaciones y estimula creación intelectual",
                  "Establece programas de cooperación con otras editoriales",
                ],
              },
              {
                titulo: "Divisiones Operativas",
                items: [
                  "División de Tecnología",
                  "División de Control de Calidad",
                  "División de Servicio Social — organiza marketing, distribución y ventas",
                  "Impresor de la Casa — convenio preferente con empresa impresora",
                ],
              },
            ].map(({ titulo, items }) => (
              <div
                key={titulo}
                className="rounded-xl p-5 border flex flex-col gap-3"
                style={{
                  borderColor: "#B87333",
                  background: "rgba(245,237,214,0.07)",
                }}
              >
                <h3
                  className="text-xs font-bold tracking-wide uppercase"
                  style={{ color: "#B87333", fontFamily: "var(--font-cinzel, serif)" }}
                >
                  {titulo}
                </h3>
                <ul className="flex flex-col gap-2">
                  {items.map((item, i) => (
                    <li key={i} className="flex items-start gap-2">
                      <span
                        className="w-1.5 h-1.5 rounded-full flex-shrink-0 mt-1.5"
                        style={{ background: "#B87333" }}
                      />
                      <span
                        className="text-[0.7rem] leading-relaxed"
                        style={{ color: "#F5EDD6", fontFamily: "var(--font-lora, serif)" }}
                      >
                        {item}
                      </span>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </div>
      </section>

      <Separador />

      {/* DE LOS AUTORES */}
      <section className="max-w-4xl mx-auto px-4 py-14">
        <SectionHeader
          titulo="De los Autores"
          subtitulo="Arts. 22–27 · Derechos, honorarios y responsabilidades"
        />
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
          {derechos.map(({ porcentaje, concepto }) => (
            <div
              key={porcentaje}
              className="rounded-xl p-6 border flex flex-col items-center text-center gap-3"
              style={{
                borderColor: "#B87333",
                background: "linear-gradient(135deg, #e8dfc4 0%, #d4c9a8 100%)",
              }}
            >
              <span
                className="text-4xl font-bold"
                style={{ color: "#1A3A5C", fontFamily: "var(--font-cinzel, serif)" }}
              >
                {porcentaje}
              </span>
              <p
                className="text-xs leading-relaxed"
                style={{ color: "#1B6CA8", fontFamily: "var(--font-lora, serif)" }}
              >
                {concepto}
              </p>
            </div>
          ))}
        </div>
        <div
          className="rounded-xl p-5 text-sm leading-relaxed border-l-4"
          style={{
            borderColor: "#B87333",
            background: "linear-gradient(90deg, #ddd3b5, #e8dfc4)",
            color: "#1A3A5C",
            fontFamily: "var(--font-lora, serif)",
          }}
        >
          La liquidación de derechos es <strong>cada tres meses</strong>, independiente de gastos
          de viaje, tutoriales y horas cátedra. El Fondo tiene potestad sobre diseño de portada,
          estilo, diagramación y tratamiento de texto. Los autores son responsables de las
          opiniones expresadas en sus obras.
        </div>
      </section>

      <Separador />

      {/* PLANIFICACIÓN Y DIFUSIÓN */}
      <section className="max-w-4xl mx-auto px-4 py-14">
        <SectionHeader
          titulo="Planificación y Difusión"
          subtitulo="Arts. 28–41 · Tirajes, catálogo, ISBN y acciones de promoción"
        />
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div
            className="rounded-xl p-6 border"
            style={{
              borderColor: "#B87333",
              background: "linear-gradient(135deg, #e8dfc4 0%, #d4c9a8 100%)",
            }}
          >
            <h3
              className="text-xs font-bold tracking-widest uppercase mb-4"
              style={{ color: "#1A3A5C", fontFamily: "var(--font-cinzel, serif)" }}
            >
              Modelo de tirajes
            </h3>
            {[
              { etapa: "Beta 1", cantidad: "300 unidades", desc: "Primera versión de prueba" },
              { etapa: "Beta 2", cantidad: "500 unidades", desc: "Segunda versión — máx. 800 u. sumadas" },
              { etapa: "Lotes crecientes", cantidad: "Hasta 1.000 u.", desc: "A partir de la primera edición" },
              { etapa: "Retención de fábrica", cantidad: "7% del tiraje", desc: "Depósito legal y muestras SVC" },
            ].map(({ etapa, cantidad, desc }) => (
              <div
                key={etapa}
                className="flex items-start gap-3 mb-3 last:mb-0 pb-3 last:pb-0 border-b last:border-0"
                style={{ borderColor: "#B87333" }}
              >
                <span
                  className="text-xs font-bold flex-shrink-0 w-28"
                  style={{ color: "#B87333", fontFamily: "var(--font-cinzel, serif)" }}
                >
                  {etapa}
                </span>
                <div>
                  <p className="text-sm font-semibold" style={{ color: "#1A3A5C", fontFamily: "var(--font-cinzel, serif)" }}>
                    {cantidad}
                  </p>
                  <p className="text-xs" style={{ color: "#1B6CA8", fontFamily: "var(--font-lora, serif)" }}>
                    {desc}
                  </p>
                </div>
              </div>
            ))}
          </div>

          <div
            className="rounded-xl p-6 border"
            style={{
              borderColor: "#B87333",
              background: "linear-gradient(135deg, #ddd3b5 0%, #cec4a0 100%)",
            }}
          >
            <h3
              className="text-xs font-bold tracking-widest uppercase mb-4"
              style={{ color: "#1A3A5C", fontFamily: "var(--font-cinzel, serif)" }}
            >
              Acciones de difusión
            </h3>
            {[
              "Catálogo de publicaciones en la página web con ficha técnica y sinopsis",
              "Promoción en redes sociales a cargo del Consejo de Fomento",
              "Participación en ferias del libro en módulos profesionales y universitarios",
              "Inclusión en catálogos colectivos y librerías virtuales",
              "Envío de ejemplares a institutos, centros culturales y bibliotecas",
              "Intercambio bibliográfico nacional e internacional (Art. 40–41)",
              "ISBN y código QR para cada título nuevo y cada nueva edición",
            ].map((item, i) => (
              <div key={i} className="flex items-start gap-2 mb-2 last:mb-0">
                <span
                  className="w-1.5 h-1.5 rounded-full flex-shrink-0 mt-1.5"
                  style={{ background: "#E8511A" }}
                />
                <p className="text-xs leading-relaxed" style={{ color: "#1A3A5C", fontFamily: "var(--font-lora, serif)" }}>
                  {item}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <Separador />

      {/* DISPOSICIONES FINALES — FIRMANTES */}
      <section className="max-w-4xl mx-auto px-4 py-14">
        <SectionHeader
          titulo="Disposiciones Finales"
          subtitulo="Dado el 25 de marzo de 2023 · Publíquese y cúmplase"
        />
        <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
          {firmantes.map(({ nombre, cargo, entidad }) => (
            <div
              key={nombre}
              className="rounded-xl p-6 border flex flex-col gap-2 text-center items-center"
              style={{
                borderColor: "#B87333",
                background: "linear-gradient(160deg, #ede4cb 0%, #d8cca8 100%)",
              }}
            >
              <div
                className="w-12 h-12 rounded-full flex items-center justify-center mb-1"
                style={{ background: "#1A3A5C", border: "2px solid #B87333" }}
              >
                <span
                  className="text-base font-bold"
                  style={{ color: "#B87333", fontFamily: "var(--font-cinzel, serif)" }}
                >
                  {nombre.split(" ").map((n) => n[0]).slice(0, 2).join("")}
                </span>
              </div>
              <h3
                className="text-xs font-bold tracking-wide leading-snug"
                style={{ color: "#1A3A5C", fontFamily: "var(--font-cinzel, serif)" }}
              >
                {nombre}
              </h3>
              <p
                className="text-[0.7rem] font-semibold"
                style={{ color: "#B87333", fontFamily: "var(--font-cinzel, serif)" }}
              >
                {cargo}
              </p>
              <p
                className="text-[0.65rem] leading-relaxed"
                style={{ color: "#1B6CA8", fontFamily: "var(--font-lora, serif)" }}
              >
                {entidad}
              </p>
            </div>
          ))}
        </div>
      </section>

      {/* CTA */}
      <section
        className="py-14 px-4 flex flex-col items-center gap-4"
        style={{ background: "#1A3A5C" }}
      >
        <p
          className="text-xs tracking-[0.3em] uppercase"
          style={{ color: "#B87333", fontFamily: "var(--font-cinzel, serif)" }}
        >
          Punto de contacto
        </p>
        <h3
          className="text-xl md:text-2xl font-bold text-center"
          style={{ color: "#F5EDD6", fontFamily: "var(--font-cinzel, serif)" }}
        >
          ¿Desea publicar con nosotros?
        </h3>
        <a
          href="mailto:contactenos@galeonadecadiz.org"
          className="mt-2 inline-block px-10 py-4 rounded-full font-semibold tracking-widest uppercase text-sm transition-opacity hover:opacity-90"
          style={{
            background: "linear-gradient(90deg, #E8511A, #B87333)",
            color: "#F5EDD6",
            fontFamily: "var(--font-cinzel, serif)",
            letterSpacing: "0.15em",
            boxShadow: "0 8px 32px rgba(232,81,26,0.35)",
          }}
        >
          contactenos@galeonadecadiz.org
        </a>
      </section>

    </div>
  );
}
