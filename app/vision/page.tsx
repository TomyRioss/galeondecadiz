export default function VisionPage() {
  const capitales = [
    {
      nombre: "Capital Cognitivo",
      desc: "Inversión en el mejoramiento del conocimiento ético familiar y la perfectibilidad de las competencias laborales, sumado a la cultura en el ambiente relacionada con las artes útiles. Agrega valor competitivo al talento local, estableciendo vínculos reales entre la empresa, el trabajador y su familia.",
    },
    {
      nombre: "Capital Psicosocial",
      desc: "Programas teórico-prácticos que relacionan pensamiento, sentimiento y acción. Conocimiento acompañado de deseos de bienestar espiritual y progreso material que hace viable a una comunidad. Se despliega a partir de alianzas entre el sector educativo, empresarios privados e instituciones sin ánimo de lucro.",
    },
    {
      nombre: "Capital Cívico",
      desc: "Formación en el acatamiento de los derechos de la propiedad privada y la institución familiar. Capacidad para reconocer, aceptar e interactuar éticamente con las autoridades legítimas y el entorno. La Fundación actúa como institución de enlace y colaboración.",
    },
    {
      nombre: "Capital Institucional",
      desc: "Programas de formación pertinentes con la contemporaneidad de las familias, empresas privadas locales y autoridades territoriales. Mejora la capacidad de monitorear el entorno, interactuar a través de la virtud de la amistad y aprovechar correctamente las oportunidades de desarrollo económico.",
    },
    {
      nombre: "Capital Social",
      desc: "Suma de todos los capitales anteriores. La comunidad y sus élites locales definen un rumbo claro hacia la prosperidad común. Sus variables clave: armonización entre familias, sector educativo y productivo, basadas en la virtud de la amistad y el espíritu de trabajo con calidad y denominación de origen.",
    },
  ];

  const invitaciones = [
    "Correcta formación moral de los hijos",
    "Acceso a fuentes honestas de empleo de cercanía",
    "Respeto por el derecho a la propiedad privada",
  ];

  const ejesAmistad = [
    { eje: "Solidaridad", desc: "Dar a todos el trato debido" },
    { eje: "Perfectibilidad", desc: "Construcción continua del bien social" },
    { eje: "Admiración", desc: "Reconocer y potenciar los talentos individuales" },
    { eje: "Enlace", desc: "Colaboración interinstitucional permanente" },
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
              "repeating-linear-gradient(-45deg, #B87333 0px, #B87333 1px, transparent 1px, transparent 60px)",
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
          Visión, Misión<br />y Objetivos
        </h1>
        <p
          className="relative text-sm md:text-base max-w-xl leading-relaxed mb-10"
          style={{ color: "#B87333", fontFamily: "var(--font-lora, serif)" }}
        >
          Una opción por la amistad — institución orientada al bien común a través de la virtud
        </p>
        <div
          className="relative h-px w-48"
          style={{ background: "linear-gradient(90deg, transparent, #B87333, transparent)" }}
        />
      </section>

      {/* VISIÓN FUNDACIONAL */}
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
              Visión Fundacional
            </h2>
          </div>
        </div>

        <div
          className="rounded-2xl p-7 md:p-10 border-2"
          style={{
            borderColor: "#B87333",
            background: "linear-gradient(135deg, #e8dfc4 0%, #d4c9a8 100%)",
            boxShadow: "0 4px 32px rgba(26,58,92,0.08)",
          }}
        >
          <p
            className="text-sm md:text-base leading-loose"
            style={{ color: "#1A3A5C", fontFamily: "var(--font-lora, serif)" }}
          >
            A través de{" "}
            <strong style={{ color: "#1B6CA8" }}>misiones circulares colaborativas</strong>{" "}
            es posible convocar y reunir para proteger y mejorar: las virtudes familiares, la
            educación y la conservación de las sanas costumbres, los usos y tradiciones de cada
            localidad conformes con el{" "}
            <strong style={{ color: "#1B6CA8" }}>Derecho Natural</strong>.
          </p>
          <div
            className="my-5 h-px"
            style={{ background: "linear-gradient(90deg, #B87333, transparent)" }}
          />
          <p
            className="text-sm md:text-base leading-loose"
            style={{ color: "#1A3A5C", fontFamily: "var(--font-lora, serif)" }}
          >
            Estas actividades interinstitucionales preservan el tejido social y aportan al
            desarrollo de una{" "}
            <strong style={{ color: "#1B6CA8" }}>sociedad de familias</strong> centrada en la
            solidaridad, la perfectibilidad y el desarrollo de los talentos individuales y las
            competencias laborales.
          </p>
        </div>
      </section>

      {/* SEPARADOR */}
      <div className="flex justify-center px-4">
        <div className="w-full max-w-4xl h-px" style={{ background: "linear-gradient(90deg, transparent, #B87333, transparent)" }} />
      </div>

      {/* MISIÓN */}
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
              Misión
            </h2>
          </div>
        </div>

        <p
          className="text-sm leading-relaxed mb-8"
          style={{ color: "#1B6CA8", fontFamily: "var(--font-lora, serif)" }}
        >
          Para que la visión social tenga correspondencia con la realidad, se realizan procesos de
          enlace y colaboración entre las ciencias morales y la salud — diseñando y gestionando
          proyectos relacionados con la difusión de la cultura a través del eje gravitacional de la{" "}
          <strong>virtud de la amistad</strong>.
        </p>

        <div className="mb-6">
          <p
            className="text-xs tracking-[0.2em] uppercase mb-5 font-semibold"
            style={{ color: "#B87333", fontFamily: "var(--font-cinzel, serif)" }}
          >
            La Fundación invita a:
          </p>
          <div className="flex flex-col gap-4">
            {invitaciones.map((inv, i) => (
              <div
                key={i}
                className="flex items-center gap-5 rounded-xl px-6 py-4 border transition-all duration-300 hover:-translate-y-0.5"
                style={{
                  borderColor: "#B87333",
                  background: "linear-gradient(90deg, #ede4cb 0%, #e0d5b5 100%)",
                  boxShadow: "0 2px 12px rgba(26,58,92,0.06)",
                }}
              >
                <span
                  className="w-9 h-9 rounded-full flex items-center justify-center font-bold text-sm flex-shrink-0"
                  style={{
                    background: "linear-gradient(135deg, #E8511A, #B87333)",
                    color: "#F5EDD6",
                    fontFamily: "var(--font-cinzel, serif)",
                    boxShadow: "0 4px 12px rgba(232,81,26,0.3)",
                  }}
                >
                  {i + 1}
                </span>
                <p
                  className="text-sm"
                  style={{ color: "#1A3A5C", fontFamily: "var(--font-lora, serif)" }}
                >
                  {inv}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* SEPARADOR */}
      <div className="flex justify-center px-4">
        <div className="w-full max-w-4xl h-px" style={{ background: "linear-gradient(90deg, transparent, #B87333, transparent)" }} />
      </div>

      {/* VALOR ÉTICO — VIRTUD DE LA AMISTAD */}
      <section
        className="py-16 px-4"
        style={{ background: "#1A3A5C" }}
      >
        <div className="max-w-4xl mx-auto">
          <div className="flex items-start gap-4 mb-3">
            <div
              className="w-1.5 h-14 rounded-full flex-shrink-0"
              style={{ background: "linear-gradient(180deg, #E8511A, #B87333)" }}
            />
            <div>
              <h2
                className="text-xl md:text-2xl font-bold tracking-widest uppercase"
                style={{ color: "#F5EDD6", fontFamily: "var(--font-cinzel, serif)" }}
              >
                Principal Valor Ético
              </h2>
            </div>
          </div>
          <p
            className="text-sm mb-10 ml-6"
            style={{ color: "#B87333", fontFamily: "var(--font-lora, serif)" }}
          >
            Virtud de la Amistad — eje gravitacional de toda acción institucional
          </p>

          <div className="grid grid-cols-2 md:grid-cols-4 gap-5">
            {ejesAmistad.map(({ eje, desc }) => (
              <div
                key={eje}
                className="rounded-xl p-6 flex flex-col gap-4 text-center border transition-all duration-300 hover:-translate-y-1"
                style={{
                  background: "rgba(245,237,214,0.07)",
                  borderColor: "#B87333",
                  boxShadow: "0 2px 16px rgba(0,0,0,0.15)",
                }}
              >
                <div
                  className="w-14 h-14 mx-auto rounded-full flex items-center justify-center font-bold text-lg"
                  style={{
                    background: "linear-gradient(135deg, #E8511A, #B87333)",
                    color: "#F5EDD6",
                    fontFamily: "var(--font-cinzel, serif)",
                    boxShadow: "0 4px 16px rgba(232,81,26,0.35)",
                  }}
                >
                  {eje[0]}
                </div>
                <h3
                  className="text-sm font-bold tracking-wide"
                  style={{ color: "#B87333", fontFamily: "var(--font-cinzel, serif)" }}
                >
                  {eje}
                </h3>
                <p
                  className="text-[0.7rem] leading-relaxed"
                  style={{ color: "#F5EDD6", fontFamily: "var(--font-lora, serif)" }}
                >
                  {desc}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* SEPARADOR */}
      <div className="flex justify-center px-4">
        <div className="w-full max-w-4xl h-px" style={{ background: "linear-gradient(90deg, transparent, #B87333, transparent)" }} />
      </div>

      {/* MODELO DE INVERSIÓN SOCIAL — 5 CAPITALES */}
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
              Modelo de Inversión Social
            </h2>
          </div>
        </div>
        <p
          className="text-sm mb-10 ml-6 max-w-2xl leading-relaxed"
          style={{ color: "#1B6CA8", fontFamily: "var(--font-lora, serif)" }}
        >
          Todos los recursos son gestionados como inversión social específica, generando
          beneficios tangibles e intangibles y creando capital social explícito para
          auspiciantes y sus grupos de interés.
        </p>

        <div className="flex flex-col gap-5">
          {capitales.map(({ nombre, desc }, i) => (
            <div
              key={nombre}
              className="rounded-xl p-6 border-2 flex gap-5 items-start transition-all duration-300 hover:-translate-y-0.5"
              style={{
                borderColor: "#B87333",
                background: i % 2 === 0
                  ? "linear-gradient(135deg, #e8dfc4 0%, #d8cfae 100%)"
                  : "linear-gradient(135deg, #ddd3b2 0%, #cec4a0 100%)",
                boxShadow: "0 2px 16px rgba(26,58,92,0.06)",
              }}
            >
              <div
                className="w-11 h-11 rounded-full flex items-center justify-center font-bold text-xs flex-shrink-0 mt-0.5"
                style={{
                  background: "#1A3A5C",
                  color: "#B87333",
                  fontFamily: "var(--font-cinzel, serif)",
                  border: "2px solid #B87333",
                  boxShadow: "0 4px 12px rgba(26,58,92,0.2)",
                }}
              >
                0{i + 1}
              </div>
              <div>
                <h3
                  className="text-sm font-bold tracking-wide mb-2"
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

      {/* EFECTO POSITIVO */}
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
              Efecto Positivo de la Inversión
            </h2>
          </div>
        </div>

        <div
          className="rounded-2xl p-7 md:p-10 border-2"
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
            La función sustantiva de la Fundación es la{" "}
            <strong style={{ color: "#1B6CA8" }}>docencia especializada en familia</strong>, la
            investigación descriptiva para el diseño, rediseño o fortalecimiento de los planes de
            vida en cualquier ámbito —familiar, institucional o empresarial—; el desarrollo armónico
            de soluciones y la innovación como proceso complejo surgido desde el interior de cada
            comunidad a partir de la práctica de las virtudes morales.
          </p>
          <div
            className="h-px mb-5"
            style={{ background: "linear-gradient(90deg, #B87333, transparent)" }}
          />
          <p
            className="text-sm md:text-base leading-loose"
            style={{ color: "#1A3A5C", fontFamily: "var(--font-lora, serif)" }}
          >
            El fortalecimiento de la virtud de la{" "}
            <strong style={{ color: "#1B6CA8" }}>confianza y la esperanza</strong> en un futuro
            mejor se obtiene por medio de proyectos de inversión social escalables y replicables,
            los cuales permiten prevenir y detener los factores disolventes de las comunidades y
            reparar el tejido social — tarea que ningún estado por sí solo está en capacidad de
            resolver sin la ayuda de las familias y el sector empresarial local.
          </p>
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
          Únase a la misión
        </p>
        <h3
          className="text-2xl md:text-3xl font-bold text-center max-w-lg"
          style={{ color: "#F5EDD6", fontFamily: "var(--font-cinzel, serif)" }}
        >
          Sea parte del cambio social
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
          Contáctenos
        </a>
        <div
          className="h-px w-48 mt-6"
          style={{ background: "linear-gradient(90deg, transparent, #B87333, transparent)" }}
        />
      </section>

    </div>
  );
}
