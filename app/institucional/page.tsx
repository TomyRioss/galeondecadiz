export default function InstitucionalPage() {
  const subsistemas = [
    {
      sigla: "EDN",
      nombre: "Escuela de Nazaret",
      desc: "Centro de formación que diseña soluciones a la medida para cada entidad. Colabora con el levantamiento de la cartografía social, diseña y desarrolla planes de vida.",
    },
    {
      sigla: "TSC",
      nombre: "Tecnocampus Virtual San Cayetano",
      desc: "Centro de diseño tecnológico deslocalizado. Desarrolla Objetos Virtuales de Aprendizaje (OVA) basados en flujo continuado de servicio (workflow learning) y expide micro constancias.",
    },
    {
      sigla: "CIDIC",
      nombre: "Centro Iuris Doña Isabel de Castilla",
      desc: "Centro de cultura jurídica que opera por medio de alianzas estratégicas. Campo de entrenamiento de jóvenes abogados en metodología de gestión social y defensa de derechos humanos.",
    },
  ];

  const actividades = [
    {
      letra: "A",
      titulo: "Consultoría Profesional",
      desc: "Consultoría interdisciplinaria de enlace y colaboración.",
    },
    {
      letra: "B",
      titulo: "Producción de Contenidos",
      desc: "Contenidos orientados a servicios sociales con estándares de responsabilidad social corporativa.",
    },
    {
      letra: "C",
      titulo: "Desarrollo de Plataformas",
      desc: "Software para el desarrollo del capital social, responsabilidad social empresarial, salud y educación.",
    },
  ];

  const herramientas = [
    "Cursos cortos y seminarios virtuales hechos a la medida",
    "Diplomados articulados con universidades",
    "Programas de promoción a la lectura con canon definido",
    "Plataforma Zafiro — System Manager Learning (SML)",
    "Fondo Editorial Galeona — obras culturales y publicaciones educativas",
    "Promoción de eventos académicos",
    "Salidas pedagógicas en industrias culturales",
  ];

  const marcas = [
    { sigla: "CL", nombre: "Canon Lector", desc: "Fondo Editorial Galeona · Libros con clase" },
    { sigla: "CC", nombre: "Centro de Contenidos", desc: "Tecnocampus virtual · Formación" },
    { sigla: "Z", nombre: "Zafiro SML", desc: "Plataforma de formación virtual" },
    { sigla: "CJ", nombre: "Centro Jurídico", desc: "CIDIC · Cultura jurídica" },
  ];

  const datosConstitucion = [
    { label: "Tipo", valor: "Institución civil colombiana de derecho privado y patrimonio autónomo · ESAL" },
    { label: "Fundador", valor: "Álvaro Gallón Rodríguez" },
    { label: "Año de fundación", valor: "2012" },
    { label: "Registro", valor: "Cámara de Comercio de Bogotá — No: S0042967" },
    { label: "NIT", valor: "900.544.600-9" },
    { label: "Control y vigilancia", valor: "Secretaría de Gobierno de la Alcaldía de Bogotá — Registro 56030" },
  ];

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
        {/* Bottom fade to page bg */}
        <div
          className="absolute bottom-0 left-0 right-0 h-20 pointer-events-none"
          style={{ background: "linear-gradient(to top, #F5EDD6, transparent)" }}
        />
        <p
          className="relative text-xs tracking-[0.4em] uppercase mb-4"
          style={{ color: "#B87333", fontFamily: "var(--font-cinzel, serif)" }}
        >
          NIT: 900.544.600 – 9 · Bogotá, Colombia
        </p>
        <h1
          className="relative text-4xl md:text-6xl font-bold leading-tight mb-5 max-w-3xl"
          style={{ color: "#F5EDD6", fontFamily: "var(--font-cinzel, serif)" }}
        >
          Fundación Social<br />Galeona de Cádiz
        </h1>
        <p
          className="relative text-sm md:text-base max-w-xl leading-relaxed mb-10"
          style={{ color: "#B87333", fontFamily: "var(--font-lora, serif)" }}
        >
          Para el fortalecimiento de las familias, la educación y la defensa del derecho natural
        </p>
        <div
          className="relative h-px w-48"
          style={{ background: "linear-gradient(90deg, transparent, #B87333, transparent)" }}
        />
      </section>

      {/* CONSTITUCIÓN */}
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
              Constitución
            </h2>
            <p
              className="text-sm mt-1"
              style={{ color: "#1B6CA8", fontFamily: "var(--font-lora, serif)" }}
            >
              Datos registrales y de constitución legal
            </p>
          </div>
        </div>

        <div
          className="rounded-2xl p-6 md:p-10 border-2"
          style={{
            background: "linear-gradient(135deg, #e8dfc4 0%, #d4c9a8 100%)",
            borderColor: "#B87333",
            boxShadow: "0 4px 32px rgba(26,58,92,0.08)",
          }}
        >
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {datosConstitucion.map(({ label, valor }) => (
              <div key={label} className="flex flex-col gap-1">
                <span
                  className="text-[0.65rem] tracking-[0.2em] uppercase font-semibold"
                  style={{ color: "#B87333", fontFamily: "var(--font-cinzel, serif)" }}
                >
                  {label}
                </span>
                <span
                  className="text-sm leading-relaxed"
                  style={{ color: "#1A3A5C", fontFamily: "var(--font-lora, serif)" }}
                >
                  {valor}
                </span>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* SEPARADOR */}
      <div className="flex justify-center px-4">
        <div className="w-full max-w-4xl h-px" style={{ background: "linear-gradient(90deg, transparent, #B87333, transparent)" }} />
      </div>

      {/* ACTIVIDADES PRINCIPALES */}
      <section className="max-w-4xl mx-auto px-4 py-14">
        <div className="flex items-start gap-4 mb-3">
          <div
            className="w-1.5 h-14 rounded-full flex-shrink-0"
            style={{ background: "linear-gradient(180deg, #E8511A, #B87333)" }}
          />
          <div>
            <h2
              className="text-xl md:text-2xl font-bold tracking-widest uppercase"
              style={{ color: "#1A3A5C", fontFamily: "var(--font-cinzel, serif)" }}
            >
              Actividades Principales
            </h2>
          </div>
        </div>
        <p
          className="text-sm mb-8 ml-6 max-w-2xl leading-relaxed"
          style={{ color: "#1B6CA8", fontFamily: "var(--font-lora, serif)" }}
        >
          Institución de nueva generación dedicada a la Investigación, Desarrollo e Innovación (I+D+I).
          El portafolio de servicios se articula en tres componentes pivote:
        </p>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {actividades.map(({ letra, titulo, desc }) => (
            <div
              key={letra}
              className="rounded-xl p-6 flex flex-col gap-4 border transition-all duration-300 hover:-translate-y-1"
              style={{
                borderColor: "#B87333",
                background: "linear-gradient(160deg, #ede4cb 0%, #ddd0b0 100%)",
                boxShadow: "0 2px 16px rgba(26,58,92,0.06)",
              }}
            >
              <div
                className="w-11 h-11 rounded-full flex items-center justify-center font-bold text-lg flex-shrink-0"
                style={{
                  background: "linear-gradient(135deg, #E8511A, #B87333)",
                  color: "#F5EDD6",
                  fontFamily: "var(--font-cinzel, serif)",
                  boxShadow: "0 4px 12px rgba(232,81,26,0.3)",
                }}
              >
                {letra}
              </div>
              <h3
                className="text-sm font-bold tracking-wide uppercase"
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
          ))}
        </div>
      </section>

      {/* SEPARADOR */}
      <div className="flex justify-center px-4">
        <div className="w-full max-w-4xl h-px" style={{ background: "linear-gradient(90deg, transparent, #B87333, transparent)" }} />
      </div>

      {/* SUBSISTEMAS */}
      <section className="max-w-4xl mx-auto px-4 py-14">
        <div className="flex items-start gap-4 mb-3">
          <div
            className="w-1.5 h-14 rounded-full flex-shrink-0"
            style={{ background: "linear-gradient(180deg, #E8511A, #B87333)" }}
          />
          <div>
            <h2
              className="text-xl md:text-2xl font-bold tracking-widest uppercase"
              style={{ color: "#1A3A5C", fontFamily: "var(--font-cinzel, serif)" }}
            >
              Modelo de Gestión por Subsistemas
            </h2>
          </div>
        </div>
        <p
          className="text-sm mb-8 ml-6 max-w-2xl leading-relaxed"
          style={{ color: "#1B6CA8", fontFamily: "var(--font-lora, serif)" }}
        >
          Plan de Ampliación de Cobertura con Calidad Internacional (ACCI) — operado a través de
          Centros Locales de Instrucción y Práctica (CLIP), independientes pero articulados.
        </p>

        <div className="flex flex-col gap-5">
          {subsistemas.map(({ sigla, nombre, desc }) => (
            <div
              key={sigla}
              className="rounded-xl p-6 border-2 flex gap-5 items-start transition-all duration-300 hover:-translate-y-0.5"
              style={{
                borderColor: "#B87333",
                background: "linear-gradient(160deg, #ede4cb 0%, #ddd0b0 100%)",
                boxShadow: "0 2px 16px rgba(26,58,92,0.06)",
              }}
            >
              <div
                className="w-14 h-14 rounded-full flex items-center justify-center font-bold text-xs flex-shrink-0"
                style={{
                  background: "#1A3A5C",
                  color: "#B87333",
                  fontFamily: "var(--font-cinzel, serif)",
                  border: "2px solid #B87333",
                  letterSpacing: "0.05em",
                  boxShadow: "0 4px 12px rgba(26,58,92,0.2)",
                }}
              >
                {sigla}
              </div>
              <div className="flex flex-col gap-2">
                <h3
                  className="text-sm font-bold tracking-wide"
                  style={{ color: "#1A3A5C", fontFamily: "var(--font-cinzel, serif)" }}
                >
                  {nombre}
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

      {/* SEPARADOR */}
      <div className="flex justify-center px-4">
        <div className="w-full max-w-4xl h-px" style={{ background: "linear-gradient(90deg, transparent, #B87333, transparent)" }} />
      </div>

      {/* CAJA DE HERRAMIENTAS */}
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
              Caja de Herramientas
            </h2>
          </div>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          {herramientas.map((h, i) => (
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
              <p
                className="text-sm leading-relaxed"
                style={{ color: "#1A3A5C", fontFamily: "var(--font-lora, serif)" }}
              >
                {h}
              </p>
            </div>
          ))}
        </div>
      </section>

      {/* SEPARADOR */}
      <div className="flex justify-center px-4">
        <div className="w-full max-w-4xl h-px" style={{ background: "linear-gradient(90deg, transparent, #B87333, transparent)" }} />
      </div>

      {/* NUESTRAS MARCAS */}
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
              Nuestras Marcas
            </h2>
          </div>
        </div>

        <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
          {marcas.map(({ sigla, nombre, desc }) => (
            <div
              key={sigla}
              className="flex flex-col items-center gap-3 rounded-xl p-5 border text-center transition-all duration-300 hover:-translate-y-1"
              style={{
                borderColor: "#B87333",
                background: "linear-gradient(160deg, #ede4cb 0%, #d8cca8 100%)",
                boxShadow: "0 2px 16px rgba(26,58,92,0.07)",
              }}
            >
              <div
                className="w-16 h-16 rounded-full flex items-center justify-center font-bold text-base"
                style={{
                  background: "#1A3A5C",
                  color: "#B87333",
                  fontFamily: "var(--font-cinzel, serif)",
                  border: "2px solid #B87333",
                  boxShadow: "0 4px 16px rgba(26,58,92,0.25)",
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
                className="text-[0.7rem] leading-relaxed"
                style={{ color: "#1B6CA8", fontFamily: "var(--font-lora, serif)" }}
              >
                {desc}
              </p>
            </div>
          ))}
        </div>
      </section>

      {/* CTA CONTACTO */}
      <section
        className="py-20 px-4 flex flex-col items-center gap-5"
        style={{ background: "#1A3A5C" }}
      >
        <p
          className="text-xs tracking-[0.4em] uppercase"
          style={{ color: "#B87333", fontFamily: "var(--font-cinzel, serif)" }}
        >
          Punto de contacto
        </p>
        <h3
          className="text-2xl md:text-3xl font-bold text-center max-w-lg"
          style={{ color: "#F5EDD6", fontFamily: "var(--font-cinzel, serif)" }}
        >
          ¿Desea conocer más sobre la Fundación?
        </h3>
        <a
          href="mailto:contactenos@galeonadecadiz.org"
          className="mt-3 inline-block px-10 py-4 rounded-full font-semibold tracking-widest uppercase text-sm transition-opacity hover:opacity-90"
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
        <div
          className="h-px w-48 mt-6"
          style={{ background: "linear-gradient(90deg, transparent, #B87333, transparent)" }}
        />
      </section>

    </div>
  );
}
