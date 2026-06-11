const dirigidoA = [
  "Padres de familia y todo el núcleo familiar residente en un mismo lugar.",
  "Maestros preceptores, tutores presenciales o virtuales, ayudantes de tareas, curadores educativos, psicopedagogos, profesionales de diversas disciplinas que prestan servicios sociales.",
  "Instructores de programas empresariales que forman en identidad de marca y deberes éticos en formato del servicio al cliente interno y externo.",
  "Encargados del bienestar laboral en las empresas, en el marco de la Ley 1857 de 2017.",
  "Jueces de Paz, en el marco de la Ley 497 de 1999.",
  "Miembros de Juntas de Acción Comunal, Integrantes de la Defensa Civil y otras entidades que prestan servicios uniformados.",
  "Funcionarios municipales y aspirantes a cargos de elección popular.",
  "Comerciantes y toda persona que desee servir a las familias, a la educación y la comunidad en general.",
];

const objetivos = [
  "Acceder al conocimiento de las virtudes fundamentales de la familia y comprender cómo es posible enriquecer la convivencia y la vida virtuosa en común.",
  "Mejorar en las actitudes que permiten mejorar las relaciones con la familia extensa, fortalecer la virtud de la amistad en el ambiente laboral y aportar a la tranquilidad y el orden.",
  "Adquirir las competencias necesarias para ser un mentor de preceptores expertos en cultura familiar.",
];

const perfilEgresado = [
  "Persona con capacidad de aconsejar y ofrecer asesoría de enlace y colaboración en los entornos del hogar, las instituciones educativas y las actividades laborales.",
  "Agente experto que contribuye en la erradicación de la violencia intrafamiliar, intraescolar, intraempresarial y en los ambientes sociales.",
  "Apto para ayudar a superar situaciones familiares problemáticas, maestro que enseña a operar con ética las redes sociales, prevenir las adicciones, mejorar la disciplina en los estudios de escolares y universitarios, e instruye en cómo se mejora la calidad en el trabajo.",
];

export default function PreceptorCulturaFamiliarPage() {
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
          Tecnocampus Virtual · Fundación Social Galeona de Cádiz
        </p>
        <p
          className="relative text-xs tracking-[0.3em] uppercase mb-5"
          style={{ color: "#d4c9a8", fontFamily: "var(--font-cinzel, serif)" }}
        >
          CNO 4215-A1
        </p>
        <h1
          className="relative text-3xl md:text-5xl font-bold leading-tight mb-5 max-w-3xl"
          style={{ color: "#F5EDD6", fontFamily: "var(--font-cinzel, serif)" }}
        >
          Preceptor de Cultura Familiar
        </h1>
        <p
          className="relative text-sm md:text-base max-w-2xl leading-relaxed mb-10"
          style={{ color: "#d4c9a8", fontFamily: "var(--font-lora, serif)" }}
        >
          Programa de formación para mentores expertos en cultura familiar, convivencia y vida virtuosa en común.
        </p>
        <div
          className="relative h-px w-48"
          style={{ background: "linear-gradient(90deg, transparent, #B87333, transparent)" }}
        />
      </section>

      {/* OBJETIVO */}
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
              Objetivo
            </h2>
          </div>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
          {objetivos.map((obj, i) => (
            <div
              key={i}
              className="rounded-xl p-6 border-2 flex flex-col gap-4 transition-all duration-300 hover:-translate-y-1"
              style={{
                borderColor: "#B87333",
                background: "linear-gradient(160deg, #ede4cb 0%, #ddd0b0 100%)",
                boxShadow: "0 2px 16px rgba(26,58,92,0.06)",
              }}
            >
              <div
                className="w-10 h-10 rounded-full flex items-center justify-center font-bold text-base flex-shrink-0"
                style={{
                  background: "linear-gradient(135deg, #E8511A, #B87333)",
                  color: "#F5EDD6",
                  fontFamily: "var(--font-cinzel, serif)",
                  boxShadow: "0 4px 12px rgba(232,81,26,0.3)",
                }}
              >
                {i + 1}
              </div>
              <p className="text-sm leading-relaxed" style={{ color: "#1A3A5C", fontFamily: "var(--font-lora, serif)" }}>
                {obj}
              </p>
            </div>
          ))}
        </div>
      </section>

      <div className="flex justify-center px-4">
        <div className="w-full max-w-4xl h-px" style={{ background: "linear-gradient(90deg, transparent, #B87333, transparent)" }} />
      </div>

      {/* PERFIL EGRESADO */}
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
              Perfil del Egresado
            </h2>
          </div>
        </div>
        <div className="flex flex-col gap-4">
          {perfilEgresado.map((p, i) => (
            <div
              key={i}
              className="flex gap-5 items-start rounded-xl p-5 border-2 transition-all duration-300 hover:-translate-y-0.5"
              style={{
                borderColor: "#B87333",
                background: "linear-gradient(160deg, #ede4cb 0%, #ddd0b0 100%)",
                boxShadow: "0 2px 16px rgba(26,58,92,0.06)",
              }}
            >
              <div
                className="w-12 h-12 rounded-full flex items-center justify-center font-bold text-sm flex-shrink-0"
                style={{
                  background: "#1A3A5C",
                  color: "#B87333",
                  fontFamily: "var(--font-cinzel, serif)",
                  border: "2px solid #B87333",
                  boxShadow: "0 4px 12px rgba(26,58,92,0.2)",
                }}
              >
                {i + 1}
              </div>
              <p className="text-sm leading-relaxed" style={{ color: "#1A3A5C", fontFamily: "var(--font-lora, serif)" }}>
                {p}
              </p>
            </div>
          ))}
        </div>

        <div
          className="mt-8 rounded-xl p-6 border-2"
          style={{
            borderColor: "#B87333",
            background: "linear-gradient(135deg, #1A3A5C 0%, #1F4FA3 100%)",
            boxShadow: "0 4px 24px rgba(26,58,92,0.15)",
          }}
        >
          <p
            className="text-xs tracking-[0.2em] uppercase mb-2"
            style={{ color: "#B87333", fontFamily: "var(--font-cinzel, serif)" }}
          >
            Principal Competencia del Egresado
          </p>
          <p className="text-sm leading-relaxed" style={{ color: "#F5EDD6", fontFamily: "var(--font-lora, serif)" }}>
            El preceptor de cultura familiar conoce en profundidad los principios de acción para aplicar mentalidad de diseño e inteligencia estratégica, en la configuración de los ambientes familiares, empresariales y sociales. Sabe cómo contribuir al restablecimiento de las relaciones de respeto mutuo al interior de la familia, las instituciones educativas y las relaciones laborales.
          </p>
        </div>
      </section>

      <div className="flex justify-center px-4">
        <div className="w-full max-w-4xl h-px" style={{ background: "linear-gradient(90deg, transparent, #B87333, transparent)" }} />
      </div>

      {/* DIRIGIDO A */}
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
              El Programa está Dirigido a
            </h2>
          </div>
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          {dirigidoA.map((item, i) => (
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
              Metodología Virtual (e-learning)
            </h2>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div
            className="rounded-xl p-6 border-2 space-y-3"
            style={{
              borderColor: "#B87333",
              background: "linear-gradient(160deg, #ede4cb 0%, #ddd0b0 100%)",
            }}
          >
            <h3 className="text-sm font-bold tracking-widest uppercase" style={{ color: "#1A3A5C", fontFamily: "var(--font-cinzel, serif)" }}>
              Plataforma Zafiro SML
            </h3>
            <p className="text-sm leading-relaxed" style={{ color: "#1A3A5C", fontFamily: "var(--font-lora, serif)" }}>
              Los contenidos están disponibles en el sistema de educación virtual Zafiro (SML), de propiedad de la Fundación Social Galeona de Cádiz, orientado a mejorar el conocimiento, la comprensión lectora, las competencias laborales y la sana reflexión.
            </p>
          </div>

          <div
            className="rounded-xl p-6 border-2 space-y-3"
            style={{
              borderColor: "#B87333",
              background: "linear-gradient(160deg, #ede4cb 0%, #ddd0b0 100%)",
            }}
          >
            <h3 className="text-sm font-bold tracking-widest uppercase" style={{ color: "#1A3A5C", fontFamily: "var(--font-cinzel, serif)" }}>
              Estructura del Programa
            </h3>
            <p className="text-sm leading-relaxed" style={{ color: "#1A3A5C", fontFamily: "var(--font-lora, serif)" }}>
              Al final de cada ciclo se entregan <strong>4 microcréditos</strong> convalidables. El programa completo consta de <strong>6 ciclos</strong> (A1, A2, B1, B2, C1, C2), cada ciclo integrado por <strong>4 módulos</strong> y cada módulo por <strong>3 lecciones</strong> que se cursan en un mes.
            </p>
          </div>

          <div
            className="rounded-xl p-6 border-2 space-y-3"
            style={{
              borderColor: "#B87333",
              background: "linear-gradient(160deg, #ede4cb 0%, #ddd0b0 100%)",
            }}
          >
            <h3 className="text-sm font-bold tracking-widest uppercase" style={{ color: "#1A3A5C", fontFamily: "var(--font-cinzel, serif)" }}>
              Duración
            </h3>
            <p className="text-sm leading-relaxed" style={{ color: "#1A3A5C", fontFamily: "var(--font-lora, serif)" }}>
              <strong>Curso Regular:</strong> 3 lecciones por mes, una lección cada 10 días, con acompañamiento docente, refuerzo personalizado y autoevaluación.
            </p>
            <p className="text-sm leading-relaxed" style={{ color: "#1A3A5C", fontFamily: "var(--font-lora, serif)" }}>
              <strong>Curso Intensivo:</strong> se cursa en un mes académico equivalente a 4 semanas de formación teórico-práctica.
            </p>
          </div>

          <div
            className="rounded-xl p-6 border-2 space-y-3"
            style={{
              borderColor: "#B87333",
              background: "linear-gradient(160deg, #ede4cb 0%, #ddd0b0 100%)",
            }}
          >
            <h3 className="text-sm font-bold tracking-widest uppercase" style={{ color: "#1A3A5C", fontFamily: "var(--font-cinzel, serif)" }}>
              Estudiantes por Grupo
            </h3>
            <p className="text-sm leading-relaxed" style={{ color: "#1A3A5C", fontFamily: "var(--font-lora, serif)" }}>
              Mínimo <strong>16 estudiantes</strong> con membresía, máximo <strong>24</strong>. Se realiza una evaluación para determinar la línea de base desde donde comenzar la formación.
            </p>
          </div>
        </div>
      </section>

      <div className="flex justify-center px-4">
        <div className="w-full max-w-4xl h-px" style={{ background: "linear-gradient(90deg, transparent, #B87333, transparent)" }} />
      </div>

      {/* MEMBRESÍA Y CERTIFICACIÓN */}
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
              Membresía y Certificación
            </h2>
          </div>
        </div>

        <div className="flex flex-col gap-6">
          <div
            className="rounded-xl p-6 border-2"
            style={{
              borderColor: "#B87333",
              background: "linear-gradient(135deg, #1A3A5C 0%, #1F4FA3 100%)",
            }}
          >
            <p
              className="text-xs tracking-[0.2em] uppercase mb-2"
              style={{ color: "#B87333", fontFamily: "var(--font-cinzel, serif)" }}
            >
              Familiares Invitados
            </p>
            <p className="text-sm leading-relaxed" style={{ color: "#F5EDD6", fontFamily: "var(--font-lora, serif)" }}>
              Cada estudiante con membresía puede crear su propio grupo de <strong>3 familiares invitados</strong>, sin necesidad de incurrir en más gastos. Los familiares invitados pueden compartir libremente los contenidos y participar del acompañamiento del docente director de cátedra.
            </p>
          </div>

          <div
            className="rounded-xl p-6 border-2 space-y-3"
            style={{
              borderColor: "#B87333",
              background: "linear-gradient(160deg, #ede4cb 0%, #ddd0b0 100%)",
            }}
          >
            <p
              className="text-xs tracking-[0.2em] uppercase mb-2"
              style={{ color: "#B87333", fontFamily: "var(--font-cinzel, serif)" }}
            >
              Micro Créditos y Constancias
            </p>
            <p className="text-sm leading-relaxed" style={{ color: "#1A3A5C", fontFamily: "var(--font-lora, serif)" }}>
              Los microcréditos capacitan en competencias muy puntuales. El <strong>86% de los estudiantes</strong> cree que un certificado de competencias laborales les ayuda a sobresalir. Las micro constancias son ideales para quienes están en áreas rurales, semiurbanas o realizan trabajo deslocalizado, debido a que son convalidables en la formación por competencias y programas por ciclos propedéuticos.
            </p>
            <p className="text-sm leading-relaxed" style={{ color: "#1A3A5C", fontFamily: "var(--font-lora, serif)" }}>
              Los cursos se imparten en modalidad <strong>100% virtual</strong>, en horario flexible, en cualquier lugar del país o del exterior donde exista conectividad. El calendario académico es flexible. El certificado de un ciclo puede ser convalidado por entidades educativas reguladas.
            </p>
          </div>

          <div
            className="rounded-xl p-6 border-2"
            style={{
              borderColor: "#B87333",
              background: "linear-gradient(160deg, #ede4cb 0%, #ddd0b0 100%)",
            }}
          >
            <p
              className="text-xs tracking-[0.2em] uppercase mb-3"
              style={{ color: "#B87333", fontFamily: "var(--font-cinzel, serif)" }}
            >
              Certificación Institucional Conjunta
            </p>
            <p className="text-sm leading-relaxed" style={{ color: "#1A3A5C", fontFamily: "var(--font-lora, serif)" }}>
              El syllabus de cada ciclo es customizable. Es posible adaptarlo a las necesidades específicas de cada entidad o comunidad, habilitando el curso para certificarlo en conjunto como curso propio de la empresa. El diagnóstico institucional se desarrolla a partir del levantamiento de la cartografía social, junto con el estudio correspondiente de marca/producto.
            </p>
          </div>

          <div
            className="rounded-xl p-6 border-2 flex flex-col gap-3"
            style={{
              borderColor: "#B87333",
              background: "linear-gradient(160deg, #ede4cb 0%, #ddd0b0 100%)",
            }}
          >
            <p
              className="text-xs tracking-[0.2em] uppercase"
              style={{ color: "#B87333", fontFamily: "var(--font-cinzel, serif)" }}
            >
              Reconocimiento de Conocimientos Previos
            </p>
            <p className="text-sm leading-relaxed" style={{ color: "#1A3A5C", fontFamily: "var(--font-lora, serif)" }}>
              Antes de comenzar las clases el maestro preceptor realizará una validación de conocimientos previos y dos jornadas de nivelación con autoevaluación, para garantizar un proceso homogéneo de aprendizaje. El acceso a los contenidos de cada micro ciclo permanece activo por <strong>un año</strong> a partir de la fecha de la primera entrada del titular en la Plataforma Zafiro SML.
            </p>
          </div>
        </div>
      </section>

      <div className="flex justify-center px-4">
        <div className="w-full max-w-4xl h-px" style={{ background: "linear-gradient(90deg, transparent, #B87333, transparent)" }} />
      </div>

      {/* PAGO */}
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
              Información de Pago
            </h2>
          </div>
        </div>

        <div
          className="rounded-2xl p-6 md:p-10 border-2"
          style={{
            background: "linear-gradient(135deg, #1A3A5C 0%, #1F4FA3 100%)",
            borderColor: "#B87333",
            boxShadow: "0 4px 32px rgba(26,58,92,0.15)",
          }}
        >
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {[
              { label: "Banco", valor: "Davivienda" },
              { label: "Tipo de cuenta", valor: "Cuenta de Ahorros Empresarial" },
              { label: "Número de cuenta", valor: "450700070490" },
              { label: "A nombre de", valor: "Fundación Social Galeona de Cádiz" },
              { label: "NIT", valor: "900.544.600-9" },
              { label: "Código BIC/SWIFT (exterior)", valor: "CAFECOBB" },
              { label: "Correo electrónico", valor: "contactenos@galeonadecadiz.org" },
              { label: "WhatsApp", valor: "+57 311 252 4239" },
            ].map(({ label, valor }) => (
              <div key={label} className="flex flex-col gap-1">
                <span
                  className="text-[0.65rem] tracking-[0.2em] uppercase font-semibold"
                  style={{ color: "#B87333", fontFamily: "var(--font-cinzel, serif)" }}
                >
                  {label}
                </span>
                <span
                  className="text-sm leading-relaxed font-medium"
                  style={{ color: "#F5EDD6", fontFamily: "var(--font-lora, serif)" }}
                >
                  {valor}
                </span>
              </div>
            ))}
          </div>
          <p
            className="mt-6 text-xs leading-relaxed"
            style={{ color: "#d4c9a8", fontFamily: "var(--font-lora, serif)" }}
          >
            La copia de la consignación se envía al correo electrónico indicado arriba o por WhatsApp.
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
          Inscripciones
        </p>
        <h3
          className="text-2xl md:text-3xl font-bold text-center max-w-lg"
          style={{ color: "#F5EDD6", fontFamily: "var(--font-cinzel, serif)" }}
        >
          ¿Desea inscribirse o solicitar información?
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
            href="https://wa.me/573112524239?text=Cordial%20saludo%2C%20estoy%20interesado%20en%20el%20libro%20Nuestra%20Se%C3%B1ora%20de%20Chiquinquir%C3%A1%20de%20La%20Estrella."
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
        <div
          className="h-px w-48 mt-6"
          style={{ background: "linear-gradient(90deg, transparent, #B87333, transparent)" }}
        />
      </section>

    </div>
  );
}
