import Link from "next/link";

export default function HabilidadComunicativaCastellano() {
  return (
    <div style={{ background: "#F5EDD6", minHeight: "100vh" }}>

      {/* Header */}
      <section className="py-12 px-6" style={{ background: "linear-gradient(160deg, #1A3A5C 70%, #0f2440 100%)" }}>
        <div className="max-w-3xl mx-auto">
          <p className="text-xs tracking-[0.3em] uppercase mb-2" style={{ color: "#B87333", fontFamily: "var(--font-cinzel, serif)" }}>
            Fundación Social Galeona de Cádiz · Tecnocampus Virtual
          </p>
          <h1 className="text-3xl md:text-4xl font-bold text-white leading-tight" style={{ fontFamily: "var(--font-cinzel, serif)" }}>
            Habilidad Comunicativa en Lengua Castellana
          </h1>
          <p className="mt-2 text-sm" style={{ color: "#d4c9a8", fontFamily: "var(--font-lora, serif)" }}>
            CNO 5121-A1 · Nivel: Profesor
          </p>
        </div>
      </section>

      {/* Contenido */}
      <div className="max-w-3xl mx-auto px-6 py-12 flex flex-col gap-10">

        {/* Objetivo */}
        <Section titulo="Objetivo del Programa">
          <p>Preparar lectores, escritores y editores en lengua castellana y literatura, para mejorar la competencia gramatical y literaria, al tiempo que enseñan a otros, en el marco del proyecto <em>Los Jóvenes Enseñan</em>. El canon formativo está embebido en criterios filosóficos lingüísticos y de enseñanza de las virtudes fundamentales.</p>
        </Section>

        {/* Competencias */}
        <Section titulo="Cualidades, Habilidades y Competencias">
          <div className="flex flex-col gap-4">
            <div>
              <p className="font-semibold mb-1" style={{ color: "#B87333", fontFamily: "var(--font-cinzel, serif)", fontSize: "0.75rem", letterSpacing: "0.2em", textTransform: "uppercase" }}>Generales</p>
              <ul className="flex flex-col gap-1">
                {["Hablar, escuchar, escribir y leer correctamente.", "Dominar los elementos constitutivos del idioma.", "Conocer los estilos literarios y sus cualidades."].map((item, i) => (
                  <li key={i} className="flex items-start gap-3 text-sm" style={{ color: "#1A3A5C", fontFamily: "var(--font-lora, serif)" }}>
                    <span className="mt-1 w-1.5 h-1.5 rounded-full flex-shrink-0" style={{ background: "#B87333" }} />{item}
                  </li>
                ))}
              </ul>
            </div>
            <div>
              <p className="font-semibold mb-1" style={{ color: "#B87333", fontFamily: "var(--font-cinzel, serif)", fontSize: "0.75rem", letterSpacing: "0.2em", textTransform: "uppercase" }}>Específicas</p>
              <ul className="flex flex-col gap-1">
                {["Desarrollar la capacidad para comprender mensajes y textos complejos.", "Realizar la corrección de diversos tipos de textos.", "Desenvolverse con seguridad al momento de responder o preguntar. Saber responder por escrito con precisión."].map((item, i) => (
                  <li key={i} className="flex items-start gap-3 text-sm" style={{ color: "#1A3A5C", fontFamily: "var(--font-lora, serif)" }}>
                    <span className="mt-1 w-1.5 h-1.5 rounded-full flex-shrink-0" style={{ background: "#B87333" }} />{item}
                  </li>
                ))}
              </ul>
            </div>
            <div>
              <p className="font-semibold mb-1" style={{ color: "#B87333", fontFamily: "var(--font-cinzel, serif)", fontSize: "0.75rem", letterSpacing: "0.2em", textTransform: "uppercase" }}>Transversales</p>
              <ul className="flex flex-col gap-1">
                {["Adquirir las competencias académicas básicas para la formación dialéctica y la oratoria.", "Ampliar el conocimiento de los valores fundamentales para el desarrollo humano, necesarios para el desenvolvimiento de las competencias laborales.", "Identificar los valores de la nacionalidad colombiana."].map((item, i) => (
                  <li key={i} className="flex items-start gap-3 text-sm" style={{ color: "#1A3A5C", fontFamily: "var(--font-lora, serif)" }}>
                    <span className="mt-1 w-1.5 h-1.5 rounded-full flex-shrink-0" style={{ background: "#B87333" }} />{item}
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </Section>

        {/* Perfil */}
        <Section titulo="Perfil del Egresado">
          <p>Es apto para desempeñarse como escritor, expositor, catedrático, periodista, redactor, traductor, relacionista público, director de comunicaciones, gerente de medios de comunicación y artes escénicas, jefe de protocolo, corrector de estilo, técnico en promoción y animación a la lectura y la escritura, bibliotecario, asistente de publicaciones, auxiliar de tareas y otras actividades afines.</p>
        </Section>

        {/* Descripción ocupacional */}
        <Section titulo="Descripción Ocupacional">
          <p>Planean, investigan y escriben libros, guiones, libretos, ensayos, discursos, manuales, especificaciones técnicas y otros escritos no periodísticos, destinados a la publicación o presentación. Son empleados por instituciones educativas, centros de investigación, firmas consultoras, editoras y otros establecimientos, o pueden trabajar por cuenta propia.</p>
        </Section>

        {/* Metodología */}
        <Section titulo="Metodología Virtual (E-learning)">
          <p>Desarrollada por el Tecnocampus Virtual San Cayetano, opera sobre una plataforma de educación llamada Zafiro (SML), basada en Objetos Virtuales de Aprendizaje (OVA). Los contenidos mejoran los conocimientos, habilidades y competencias lingüísticas, para la comprensión de los idiomas de origen indoeuropeo.</p>
          <p>Zafiro es una plataforma SML que opera como un tecnocampus virtual integrado para el aprendizaje natural con IA a partir de la experiencia (<em>Aprender haciendo</em> o <em>Learning by doing</em>). Todos los docentes vinculados poseen formación alta en el campo de las ciencias morales.</p>
          <p>Los profesionales adherentes al tecnocampus virtual San Cayetano producen contenidos customizables ajustados a la medida de cada necesidad institucional formativa. El objetivo al utilizar Zafiro SML es aprovechar las bondades de la tecnología para enriquecer el campo de enseñanza de las virtudes fundamentales, contribuyendo a mejorar la comprensión lectora, la capacidad de decisión responsable y ayudar a generar entornos sociales saludables.</p>
          <p>Generalmente quienes imparten sus enseñanzas son: filósofos, psicólogos, médicos, abogados, licenciados de diversas disciplinas, especialistas, maestros o PhD, quienes soportan virtualmente los contenidos basados en OVA, los cuales van a apoyar el subsistema de obras didácticas <em>Saber Más</em>, que produce el Fondo Editorial Galeona.</p>
          <p>Los estudiantes que cursan los seis (6) ciclos pueden vincularse al elenco de autores formadores certificados.</p>
        </Section>

        {/* Constancias */}
        <Section titulo="Constancias">
          <p>Se expide certificado por cada módulo una vez presente la autoevaluación. Las microcertificaciones son acumulables y convalidables para la acreditación por competencias, una vez complete los créditos académicos de conformidad con el Decreto 1075 de 2015 (DURSE, Artículo 2.6.6.8).</p>
          <p>Hay señales de que, después de la pandemia del Covid-19, las credenciales de competencias laborales están en aumento. Hoy en día muchos empleadores, al momento de contratar, consideran primero las habilidades y competencias certificadas. El 86% de los estudiantes creen que una certificación de competencias anexa al título profesional los ayudará a sobresalir en el mercado laboral.</p>
        </Section>

        {/* Dirigido a */}
        <Section titulo="Dirigido a">
          <ul className="flex flex-col gap-2 list-none">
            {[
              "Estudiantes de básica secundaria, alumnos de programas preuniversitarios o de competencias laborales, que deseen avanzar en el estudio del lenguaje y las distintas formas de literatura.",
              "Núcleos familiares residentes en un mismo lugar y asistentes de hogar, que desean reforzar el arte de leer y escribir correctamente, en el marco de las Escuelas de Padres, de conformidad con la Ley 2520 de 2020.",
              "Docentes, preceptores y asesores de tesis.",
              "Tutores y ayudantes de tareas.",
              "Miembros de programas institucionales para difundir los deberes éticos de la comunidad, que necesiten mejorar sus habilidades de comprensión de lectura, exposición y escritura.",
              "Encargados del bienestar laboral en las empresas, según el marco de la Ley 1857 de 2017.",
              "Público interesado en mejorar su comprensión lectora, el arte de escribir correctamente y comenzar con el estudio de la teoría literaria.",
            ].map((item, i) => (
              <li key={i} className="flex items-start gap-3 text-sm" style={{ color: "#1A3A5C", fontFamily: "var(--font-lora, serif)" }}>
                <span className="mt-1 w-1.5 h-1.5 rounded-full flex-shrink-0" style={{ background: "#B87333" }} />{item}
              </li>
            ))}
          </ul>
        </Section>

        {/* Calendario y organización */}
        <Section titulo="Calendario y Organización">
          <p><strong>Grupos:</strong> básicos de 16 estudiantes, con tope máximo de 20 alumnos por grupo.</p>
          <p><strong>Customización:</strong> el programa se puede diseñar a la medida de las exigencias institucionales. En este caso se realiza un estudio preliminar para determinar las líneas de base, el grado de complejidad de los contenidos y el perfil académico y laboral al que debe aspirar el egresado.</p>
          <p><strong>Membresía:</strong> el acceso a la Plataforma Zafiro SML confiere la posibilidad de alcanzar la membresía como estudiante numerario. A partir de la fecha de la primera entrada, el estudiante obtiene acceso indefinido a las actualizaciones de contenidos, puede solicitar el apoyo de un tutor y asistir a conferencias y talleres virtuales sin incurrir en costos adicionales.</p>
        </Section>

        {/* Duración */}
        <Section titulo="Duración del Programa">
          <p>Doce (12) unidades de formación mediada con acompañamiento docente, cada una con duración de diez (10) días, en horario flexible. Incluye asesoría en verificación de conceptos y acompañamiento en la autoevaluación.</p>
          <p>El programa se imparte en cualquier lugar del país o del exterior donde exista conectividad a través de internet, de forma personalizada y al propio ritmo del estudiante.</p>
        </Section>

        {/* Presupuesto */}
        <div className="rounded-2xl p-6 flex flex-col gap-3" style={{ background: "linear-gradient(135deg, #1A3A5C, #0f2440)", border: "2px solid #B87333" }}>
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
            <a href="https://wa.me/573112524239" target="_blank" rel="noopener noreferrer" className="underline" style={{ color: "#B87333" }}>
              +57 311 252 4239
            </a>
          </p>
        </div>

        <div>
          <Link href="/fundacion-social" className="text-xs tracking-widest uppercase transition-colors hover:opacity-70" style={{ color: "#B87333", fontFamily: "var(--font-cinzel, serif)" }}>
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
