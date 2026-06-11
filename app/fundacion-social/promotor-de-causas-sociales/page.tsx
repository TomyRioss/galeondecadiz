import Link from "next/link";

const lema = (
  <p className="text-xs italic text-center" style={{ color: "#B87333", fontFamily: "var(--font-lora, serif)" }}>
    <em>SAPIENTIA ÆDIFICAVIT SIBI DOMVN</em> · La sabiduría edificó su casa
  </p>
);

export default function PromotorCausasSociales() {
  return (
    <div style={{ background: "#F5EDD6", minHeight: "100vh" }}>

      {/* Header */}
      <section className="py-12 px-6" style={{ background: "linear-gradient(160deg, #1A3A5C 70%, #0f2440 100%)" }}>
        <div className="max-w-3xl mx-auto">
          <p className="text-xs tracking-[0.3em] uppercase mb-2" style={{ color: "#B87333", fontFamily: "var(--font-cinzel, serif)" }}>
            Fundación Social Galeona de Cádiz · Tecnocampus Virtual
          </p>
          <h1 className="text-3xl md:text-4xl font-bold text-white leading-tight" style={{ fontFamily: "var(--font-cinzel, serif)" }}>
            Promotor de Causas Sociales
          </h1>
          <p className="mt-2 text-sm" style={{ color: "#d4c9a8", fontFamily: "var(--font-lora, serif)" }}>
            CNO 4211-A1 · Nivel: Profesor
          </p>
          <p className="mt-1 text-xs italic" style={{ color: "#B87333", fontFamily: "var(--font-lora, serif)" }}>
            Arquitectónica que crea capital social
          </p>
        </div>
      </section>

      {/* Contenido */}
      <div className="max-w-3xl mx-auto px-6 py-12 flex flex-col gap-10">

        {/* Objetivo */}
        <Section titulo="Objetivo">
          <p>Conocer los principios de acción aplicados a las causas sociales, en la procura de promover una arquitectura social armónica y sin lucha de clases, a partir del trabajo ético y la educación en las virtudes cristianas católicas.</p>
          <p>Adquirir los conocimientos necesarios para apoyar el frente social que promueve la virtud de la amistad orientada a la búsqueda de la tranquilidad en el orden, la prosperidad y el bien común de las familias.</p>
          <p>Fortalecer los principios de la productividad honesta con estándares de calidad aceptables, mantener la protección del patrimonio empresarial y social, la moral pública en los entornos de la educación en el ambiente.</p>
        </Section>

        {/* Perfil */}
        <Section titulo="Perfil del Egresado">
          <p>Fundamentalmente es un líder que posee los conocimientos para promover la virtud de la amistad y la práctica de las virtudes sociales fundamentales. Está capacitado para apoyar actividades orientadas al bien común.</p>
          <p>Conoce las metodologías para promover una campaña social en la procura de atender solicitudes de diferentes grupos sociales. Crea y presenta soluciones, resuelve problemas prácticos, colabora con los diversos grupos de trabajo, atiende diversos géneros de asunto y situaciones individuales.</p>
        </Section>

        {/* Dirigido a */}
        <Section titulo="El programa está dirigido a">
          <ul className="flex flex-col gap-2 list-none">
            {[
              "Organizaciones sociales, educativas o empresariales que deseen fortalecer los programas de bienestar orientados al bien común.",
              "Organizadores del voluntariado social que promueven en su comunidad una clara conciencia relacionada con la necesidad de proteger la familia.",
              "Ejecutivos de campañas sociales e impulsadores de servicios orientados al bien común.",
              "Maestros docentes, personal de apoyo a la educación o personal administrativo, vinculados a instituciones de educación preescolar, básica o superior.",
              "Encargados del bienestar laboral en las empresas, en el marco de la Ley 1857 de 2017.",
              "Afiliados a fondos de empleados y cajas de compensación familiar.",
              "Socios de cooperativas, asociaciones mutuales y demás entidades de economía solidaria.",
              "Miembros de Juntas de Acción Comunal, Jueces de Paz, en el marco de la Ley 497 de 1999. Defensa civil y demás entidades que prestan servicios sociales uniformados.",
            ].map((item, i) => (
              <li key={i} className="flex items-start gap-3 text-sm" style={{ color: "#1A3A5C", fontFamily: "var(--font-lora, serif)" }}>
                <span className="mt-1 w-1.5 h-1.5 rounded-full flex-shrink-0" style={{ background: "#B87333" }} />
                {item}
              </li>
            ))}
          </ul>
        </Section>

        {/* Libro obsequio */}
        <Section titulo="Al matricularse en el curso, recibe de obsequio este libro">
          <p>Una obra que no debe faltar en la biblioteca de cada vivienda familiar, consultorio profesional o entidad. En 194 páginas desglosa y explica a mínimo detalle los principios de derecho natural que sustentan la ética en el ejercicio del derecho de propiedad, la estabilidad familiar, y la libertad y prosperidad económica.</p>
        </Section>

        {/* Competencias */}
        <Section titulo="Principales Competencias del Egresado">
          <ul className="flex flex-col gap-2 list-none">
            {[
              "Puede desempeñarse como directivo, ejecutivo operador o asesor de campañas sociales, donde se requiere aplicar inteligencia de diseño para estructurar y apoyar los grupos de trabajo y la toma de decisiones acertadas.",
              "Conoce las técnicas de creación de indicadores de gestión y resultado, su interpretación estadística correcta y los sistemas de depuración de información para mejorar el desempeño de las operaciones dentro de una campaña de causa social.",
              "Sabe organizar jornadas de reflexión al respecto de la vida interna de las entidades, de acuerdo con su misión y visión, armonizar las relaciones interinstitucionales e interacciones personales que permiten la promoción armónica de las causas sociales.",
              "Puede desempeñarse como orientador y solucionador de problemas en el campo de las relaciones públicas con atención inmediata a las personas servidoras internas y externas a la organización.",
              "En el campo educativo puede desempeñarse como experto en comunicación efectiva en las relaciones estudiantiles, el claustro docente, la comunidad de padres de familia, los egresados, familiares de los docentes, etc.",
            ].map((item, i) => (
              <li key={i} className="flex items-start gap-3 text-sm" style={{ color: "#1A3A5C", fontFamily: "var(--font-lora, serif)" }}>
                <span className="mt-1 w-1.5 h-1.5 rounded-full flex-shrink-0" style={{ background: "#B87333" }} />
                {item}
              </li>
            ))}
          </ul>
        </Section>

        {/* Metodología */}
        <Section titulo="Metodología Virtual (E-learning)">
          <p>Los contenidos están disponibles en el Sistema de Educación Virtual de la EDN, llamado Zafiro (SML). Se trata de una plataforma orientada a mejorar el conocimiento, desarrollar la comprensión lectora y la sana reflexión, optimar las competencias laborales.</p>
          <p>El programa está organizado por ciclos (12 lecciones por ciclo) de acuerdo con el Marco Europeo. Se entregan microcréditos convalidables en el programa completo que consta de seis (6) ciclos.</p>
          <p>El syllabus (contenido) de cada ciclo es customizable (adaptado a las necesidades específicas de cada entidad o comunidad, a partir de realizar una cartografía social). El contenido específico que se desarrolle se registra en derechos de autor a nombre de la entidad adoptante del programa.</p>
          <p>La formación por microcréditos está en aumento mundialmente, porque capacita en competencias muy específicas. Hoy en día, los empleadores piensan que junto a los títulos se deben considerar las habilidades reales. El 86% de los estudiantes cree que un certificado de competencias laborales les ayuda a sobresalir.</p>
        </Section>

        {/* Impartición */}
        <Section titulo="Impartición de las Clases">
          <p>En cualquier lugar del país o del exterior donde exista conectividad. El programa se imparte en modalidad 100% virtual, en horario flexible.</p>
          <p>Cada estudiante con membresía puede crear su propio grupo de tres (3) familiares invitados sin incurrir en más gastos, quienes asisten en la categoría de invitados, pueden compartir libremente los contenidos entre ellos y realizar actividades con acompañamiento del docente director de cátedra.</p>
          <ul className="flex flex-col gap-1 list-none text-sm" style={{ color: "#1A3A5C", fontFamily: "var(--font-lora, serif)" }}>
            <li>• Cada curso (ciclo) se compone de mínimo 16 estudiantes con membresía, más los invitados.</li>
            <li>• El máximo de estudiantes con membresía es de 24.</li>
            <li>• Siempre se realiza una evaluación para determinar la línea de base desde donde comenzar la formación.</li>
            <li>• El calendario académico es flexible.</li>
          </ul>
          <p>El acceso a los contenidos de cada módulo permanece activo por un año a partir de la fecha de la primera entrada del titular de la membresía y sus tres (3) familiares invitados. Si un invitado desea convertirse en titular de membresía, puede hacerlo cancelando el importe correspondiente.</p>
        </Section>

        {/* Constancias */}
        <Section titulo="Constancias">
          <p>Cada ciclo completo tiene su propia constancia, una vez el alumno presente sus seis microcréditos, los cuales corresponden a la cantidad de horas de estudio requeridas, de conformidad con el Decreto Único Reglamentario del Sector Educación, Artículo 2.6.6.8.</p>
          <p>Los microcréditos son ideales para las personas que están en áreas rurales, semiurbanas, o que realizan trabajo deslocalizado, como es el caso de las fuerzas militares o las entidades que prestan servicios uniformados.</p>
        </Section>

        {/* Duración */}
        <Section titulo="Contenido del Ciclo A1 · Duración">
          <p><strong>Curso Regular:</strong> tres (3) lecciones por mes, una cada diez (10) días, con acompañamiento docente, refuerzo personalizado y autoevaluación.</p>
          <p><strong>Curso Intensivo:</strong> se cursa en un mes académico equivalente a cuatro (4) semanas.</p>
        </Section>

        {/* Presupuesto / Pago */}
        <div
          className="rounded-2xl p-6 flex flex-col gap-3"
          style={{ background: "linear-gradient(135deg, #1A3A5C, #0f2440)", border: "2px solid #B87333" }}
        >
          <h2 className="text-sm font-bold tracking-widest uppercase" style={{ color: "#B87333", fontFamily: "var(--font-cinzel, serif)" }}>
            Presupuesto e Inscripción
          </h2>
          <div className="flex flex-col gap-1 text-sm" style={{ color: "#d4c9a8", fontFamily: "var(--font-lora, serif)" }}>
            <p><strong style={{ color: "#F5EDD6" }}>Banco:</strong> Davivienda</p>
            <p><strong style={{ color: "#F5EDD6" }}>Código BIC/SWIFT:</strong> CAFECOBB</p>
            <p><strong style={{ color: "#F5EDD6" }}>Cuenta de Ahorros Empresarial:</strong> 450700070490</p>
            <p><strong style={{ color: "#F5EDD6" }}>A nombre de:</strong> Fundación Social Galeona de Cádiz</p>
            <p><strong style={{ color: "#F5EDD6" }}>NIT:</strong> 900544600-9</p>
          </div>
          <p className="text-sm mt-2" style={{ color: "#d4c9a8", fontFamily: "var(--font-lora, serif)" }}>
            La copia de la consignación se envía a:{" "}
            <a href="mailto:contactenos@galeonadecadiz.org" className="underline" style={{ color: "#B87333" }}>
              contactenos@galeonadecadiz.org
            </a>
          </p>
          <p className="text-sm" style={{ color: "#d4c9a8", fontFamily: "var(--font-lora, serif)" }}>
            WhatsApp:{" "}
            <a href="https://wa.me/573112524239?text=Cordial%20saludo%2C%20estoy%20interesado%20en%20el%20libro%20Nuestra%20Se%C3%B1ora%20de%20Chiquinquir%C3%A1%20de%20La%20Estrella." target="_blank" rel="noopener noreferrer" className="underline" style={{ color: "#B87333" }}>
              311 252 4239
            </a>
          </p>
        </div>

        {/* Volver */}
        <div>
          <Link
            href="/fundacion-social"
            className="text-xs tracking-widest uppercase transition-colors hover:opacity-70"
            style={{ color: "#B87333", fontFamily: "var(--font-cinzel, serif)" }}
          >
            ← Volver a Fundación Social
          </Link>
        </div>
      </div>
    </div>
  );
}

function Section({ titulo, children }: { titulo: string; children: React.ReactNode }) {
  return (
    <div className="flex flex-col gap-3">
      <h2 className="text-xs tracking-[0.3em] uppercase" style={{ color: "#B87333", fontFamily: "var(--font-cinzel, serif)" }}>
        {titulo}
      </h2>
      <div className="flex flex-col gap-3 text-sm leading-relaxed" style={{ color: "#1A3A5C", fontFamily: "var(--font-lora, serif)" }}>
        {children}
      </div>
    </div>
  );
}
