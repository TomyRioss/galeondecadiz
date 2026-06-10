import Image from "next/image";

const servicios = [
  "Asesoría en el diseño y ejecución del Plan de Capacitación de los Trabajadores.",
  "Asesoría para la optimización de recursos de la reinversión por ARL y de otros actores de la seguridad social.",
  "Organización Administrativa del Sistema de Registro y Control del SG-SST.",
  "Asesoría en el diseño y ejecución del Plan Anual de Trabajo.",
  "Acordar con la EPS o la ARL las formas más proporcionadas de cumplimiento de las restricciones y recomendaciones, de acuerdo con la realidad de la empresa.",
  "Realización de las Evaluaciones Médicas Ocupacionales.",
  "Asesorar en el Informe de Condiciones de Salud y Perfil Sociodemográfico de acuerdo a los hallazgos de las evaluaciones médicas ocupacionales.",
  "Auditoría a la cotización de pensión especial de trabajadores de alto riesgo.",
  "Identificación técnica científica de los bienes y servicios que consume y produce la entidad.",
  "Actualización permanente de la Matriz Legal aplicable a la empresa.",
  "Consultoría para la obtención del Registro Calificado.",
  "Asesoría en el diseño y ejecución del programa de estilos de vida y entornos saludables a nivel industrial y empresarial general.",
];

const clasificacion = [
  { clase: "CLASE I", riesgo: "Riesgo mínimo", cols: ["A1", "B1", "C1"] },
  { clase: "CLASE II", riesgo: "Riesgo bajo",    cols: ["A2", "B2", "C2"] },
  { clase: "CLASE III", riesgo: "Riesgo medio",  cols: ["A3", "B3", "C3"] },
  { clase: "CLASE IV", riesgo: "Riesgo alto",    cols: ["A4", "B4", "C4"] },
  { clase: "CLASE V", riesgo: "Riesgo máximo",   cols: ["A5", "B5", "C5"] },
];

export default function SgSstPage() {
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
          className="relative text-xs tracking-[0.4em] uppercase mb-4"
          style={{ color: "#B87333", fontFamily: "var(--font-cinzel, serif)" }}
        >
          Tecnocampus Virtual · Fundación Social Galeona de Cádiz
        </p>
        <h1
          className="relative text-3xl md:text-5xl font-bold leading-tight mb-5 max-w-3xl"
          style={{ color: "#F5EDD6", fontFamily: "var(--font-cinzel, serif)" }}
        >
          Aplicación de Sistemas de Gestión de Seguridad y Salud en el Trabajo
        </h1>
        <p
          className="relative text-base md:text-lg font-semibold mb-3 max-w-2xl"
          style={{ color: "#B87333", fontFamily: "var(--font-cinzel, serif)" }}
        >
          SG-SST
        </p>
        <p
          className="relative text-sm md:text-base max-w-2xl leading-relaxed mb-10"
          style={{ color: "#d4c9a8", fontFamily: "var(--font-lora, serif)" }}
        >
          Preparación de promotores de adaptación laboral, entrenamiento de coordinadores para la continuidad de los desarrollos y ejecución del Plan de Capacitación, tanto de los trabajadores activos como la preparación de candidatos para la inclusión laboral de cercanía.
        </p>
        <div
          className="relative h-px w-48"
          style={{ background: "linear-gradient(90deg, transparent, #B87333, transparent)" }}
        />
      </section>

      {/* PROFESIONAL */}
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
              Profesional Orientadora del Programa
            </h2>
          </div>
        </div>

        <div
          className="rounded-2xl p-6 md:p-10 border-2 flex flex-col md:flex-row gap-8 items-start"
          style={{
            background: "linear-gradient(135deg, #e8dfc4 0%, #d4c9a8 100%)",
            borderColor: "#B87333",
            boxShadow: "0 4px 32px rgba(26,58,92,0.08)",
          }}
        >
          <div className="flex-shrink-0 flex flex-col items-center gap-3">
            <div
              className="w-36 h-36 rounded-full overflow-hidden border-4"
              style={{ borderColor: "#B87333", boxShadow: "0 4px 20px rgba(26,58,92,0.2)" }}
            >
              <Image
                src="/images/dra-borda.png"
                alt="Dra. María Claudia Borda Gallón"
                width={144}
                height={144}
                className="w-full h-full object-cover"
              />
            </div>
            <p
              className="text-[0.65rem] tracking-[0.15em] uppercase text-center"
              style={{ color: "#B87333", fontFamily: "var(--font-cinzel, serif)" }}
            >
              Profesional Líder
            </p>
          </div>
          <div className="flex flex-col gap-3">
            <h3
              className="text-lg md:text-xl font-bold"
              style={{ color: "#1A3A5C", fontFamily: "var(--font-cinzel, serif)" }}
            >
              Dra. María Claudia Borda Gallón
            </h3>
            <p
              className="text-sm leading-relaxed"
              style={{ color: "#1A3A5C", fontFamily: "var(--font-lora, serif)" }}
            >
              Médica Cirujana Especialista en Medicina del Trabajo — Universidad del Rosario. Magíster en Administración de los Servicios de Salud — Universidad del Rosario. Con amplia experiencia en implementación de Programas de Salud Empresarial y Sistemas de Vigilancia Epidemiológica en el área de Medicina Laboral y Salud Ocupacional.
            </p>
            <p
              className="text-sm leading-relaxed"
              style={{ color: "#1A3A5C", fontFamily: "var(--font-lora, serif)" }}
            >
              Ha sido merecedora de varios reconocimientos internacionales por la implementación de programas de salud ocupacional. Sus aportes en el campo de la medicina la han llevado a ser invitada como ponente a múltiples congresos internacionales en Europa y Estados Unidos.
            </p>
            <div className="flex flex-wrap gap-2 mt-2">
              {["Procter & Gamble Colombia", "RP Bolívar · CITIBANK", "Sanitas Ocupacional", "Fuerzas Militares de Colombia", "Colmédica EPS"].map((e) => (
                <span
                  key={e}
                  className="text-[0.65rem] px-3 py-1 rounded-full tracking-wide uppercase"
                  style={{
                    background: "#1A3A5C",
                    color: "#B87333",
                    fontFamily: "var(--font-cinzel, serif)",
                  }}
                >
                  {e}
                </span>
              ))}
            </div>
          </div>
        </div>
      </section>

      <div className="flex justify-center px-4">
        <div className="w-full max-w-4xl h-px" style={{ background: "linear-gradient(90deg, transparent, #B87333, transparent)" }} />
      </div>

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
              Objetivo del Programa
            </h2>
          </div>
        </div>
        <div
          className="rounded-xl p-6 md:p-8 border-2 space-y-3"
          style={{
            background: "linear-gradient(160deg, #ede4cb 0%, #ddd0b0 100%)",
            borderColor: "#B87333",
            boxShadow: "0 2px 16px rgba(26,58,92,0.06)",
          }}
        >
          {[
            "Capacitar promotores y consejeros de adaptación laboral.",
            "Prestar consultoría especializada para la estructuración del Sistema de Gestión de la Seguridad y Salud en el Trabajo SG-SST, de conformidad con la Resolución 0312 de 2019 para el cumplimiento de Estándares Mínimos y el Registro Calificado.",
            "Entrenar a los líderes para que continúen con el proceso.",
          ].map((item, i) => (
            <div key={i} className="flex gap-4 items-start">
              <span
                className="w-7 h-7 rounded-full flex items-center justify-center text-xs font-bold flex-shrink-0 mt-0.5"
                style={{
                  background: "linear-gradient(135deg, #E8511A, #B87333)",
                  color: "#F5EDD6",
                  fontFamily: "var(--font-cinzel, serif)",
                }}
              >
                {i + 1}
              </span>
              <p className="text-sm leading-relaxed" style={{ color: "#1A3A5C", fontFamily: "var(--font-lora, serif)" }}>
                {item}
              </p>
            </div>
          ))}
        </div>
      </section>

      <div className="flex justify-center px-4">
        <div className="w-full max-w-4xl h-px" style={{ background: "linear-gradient(90deg, transparent, #B87333, transparent)" }} />
      </div>

      {/* QUÉ ES SG-SST */}
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
              ¿En qué consiste el SG-SST?
            </h2>
          </div>
        </div>
        <p
          className="text-sm leading-relaxed mb-8 max-w-3xl"
          style={{ color: "#1B6CA8", fontFamily: "var(--font-lora, serif)" }}
        >
          Consiste en el desarrollo de un proceso lógico basado en la mejora institucional que incluye trazar la política de seguridad y salud en el trabajo y las acciones de mejora. El proceso se diseña según el tipo y tamaño de la empresa, y se fundamenta en unos principios de acción identificados como las <strong>4 P</strong>.
        </p>

        <div
          className="rounded-xl p-6 md:p-8 border-2 mb-8"
          style={{
            background: "linear-gradient(160deg, #ede4cb 0%, #ddd0b0 100%)",
            borderColor: "#B87333",
          }}
        >
          <h3
            className="text-sm font-bold tracking-widest uppercase mb-4"
            style={{ color: "#1A3A5C", fontFamily: "var(--font-cinzel, serif)" }}
          >
            Campo de Aplicación
          </h3>
          <p
            className="text-sm leading-relaxed"
            style={{ color: "#1A3A5C", fontFamily: "var(--font-lora, serif)" }}
          >
            De conformidad con el Decreto 1072 de 2015, están obligados a estructurar su SG-SST todos los empleadores públicos y privados, los contratantes de personal bajo modalidad de contrato civil, comercial o administrativo, los trabajadores independientes no afiliados voluntariamente al Sistema General de Riesgos Laborales, las organizaciones de economía solidaria, las agremiaciones, las empresas de servicios temporales, los estudiantes afiliados al SGRL, los trabajadores en misión, las administradoras de riesgos laborales, la Policía Nacional en lo que corresponde a su personal no uniformado y el personal civil de las Fuerzas Militares.
          </p>
        </div>

        <div
          className="rounded-xl p-6 md:p-8 border-2"
          style={{
            background: "linear-gradient(160deg, #ede4cb 0%, #ddd0b0 100%)",
            borderColor: "#B87333",
          }}
        >
          <h3
            className="text-sm font-bold tracking-widest uppercase mb-4"
            style={{ color: "#1A3A5C", fontFamily: "var(--font-cinzel, serif)" }}
          >
            Alcance del Programa
          </h3>
          <p
            className="text-sm leading-relaxed"
            style={{ color: "#1A3A5C", fontFamily: "var(--font-lora, serif)" }}
          >
            Realizar la capacitación, entrenar a los líderes para continuar el proceso y establecer si se requiere el acompañamiento técnico profesional permanente de alto nivel, para la prevención de los accidentes de trabajo y enfermedades laborales, protección y promoción de la salud de los trabajadores a través de la implementación de métodos lógicos realizados por etapas, de acuerdo a la realidad de la empresa, en coherencia y armonía con las clases de riesgo de acuerdo al Decreto Ley 1295 de 1994.
          </p>
        </div>
      </section>

      <div className="flex justify-center px-4">
        <div className="w-full max-w-4xl h-px" style={{ background: "linear-gradient(90deg, transparent, #B87333, transparent)" }} />
      </div>

      {/* CLASIFICACIÓN */}
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
              Clasificación de Tipos de Consultoría
            </h2>
          </div>
        </div>

        <div className="overflow-x-auto rounded-xl border-2" style={{ borderColor: "#B87333" }}>
          <table className="w-full text-sm" style={{ fontFamily: "var(--font-lora, serif)" }}>
            <thead>
              <tr style={{ background: "#1A3A5C" }}>
                <th className="px-4 py-3 text-left text-xs tracking-widest uppercase" style={{ color: "#B87333", fontFamily: "var(--font-cinzel, serif)" }}>Clase de Riesgo</th>
                <th className="px-4 py-3 text-left text-xs tracking-widest uppercase" style={{ color: "#B87333", fontFamily: "var(--font-cinzel, serif)" }}>Nivel</th>
                <th className="px-4 py-3 text-center text-xs tracking-widest uppercase" style={{ color: "#B87333", fontFamily: "var(--font-cinzel, serif)" }}>10 o menos</th>
                <th className="px-4 py-3 text-center text-xs tracking-widest uppercase" style={{ color: "#B87333", fontFamily: "var(--font-cinzel, serif)" }}>11 a 50</th>
                <th className="px-4 py-3 text-center text-xs tracking-widest uppercase" style={{ color: "#B87333", fontFamily: "var(--font-cinzel, serif)" }}>Más de 50</th>
              </tr>
            </thead>
            <tbody>
              {clasificacion.map(({ clase, riesgo, cols }, i) => (
                <tr
                  key={clase}
                  style={{
                    background: i % 2 === 0
                      ? "linear-gradient(135deg, #ede4cb 0%, #ddd0b0 100%)"
                      : "linear-gradient(135deg, #e5dcc0 0%, #d4c9a8 100%)",
                  }}
                >
                  <td className="px-4 py-3 font-bold text-xs" style={{ color: "#1A3A5C", fontFamily: "var(--font-cinzel, serif)" }}>{clase}</td>
                  <td className="px-4 py-3 text-xs" style={{ color: "#1B6CA8" }}>{riesgo}</td>
                  {cols.map((c) => (
                    <td key={c} className="px-4 py-3 text-center font-bold text-xs" style={{ color: "#E8511A", fontFamily: "var(--font-cinzel, serif)" }}>{c}</td>
                  ))}
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </section>

      <div className="flex justify-center px-4">
        <div className="w-full max-w-4xl h-px" style={{ background: "linear-gradient(90deg, transparent, #B87333, transparent)" }} />
      </div>

      {/* SERVICIOS */}
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
              Servicios del Programa SG-SST
            </h2>
          </div>
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          {servicios.map((s, i) => (
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
              <p className="text-sm leading-relaxed" style={{ color: "#1A3A5C", fontFamily: "var(--font-lora, serif)" }}>{s}</p>
            </div>
          ))}
        </div>
      </section>

      <div className="flex justify-center px-4">
        <div className="w-full max-w-4xl h-px" style={{ background: "linear-gradient(90deg, transparent, #B87333, transparent)" }} />
      </div>

      {/* ZAFIRO */}
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
              Plataforma Zafiro — Tecnocampus Virtual
            </h2>
          </div>
        </div>
        <div
          className="rounded-xl p-6 md:p-8 border-2 space-y-4"
          style={{
            background: "linear-gradient(160deg, #ede4cb 0%, #ddd0b0 100%)",
            borderColor: "#B87333",
          }}
        >
          <p className="text-sm leading-relaxed" style={{ color: "#1A3A5C", fontFamily: "var(--font-lora, serif)" }}>
            Zafiro es una plataforma SML (System Manager Learning), que opera como un tecnocampus virtual integrado por profesionales PhD, maestros preceptores y profesores investigadores en el campo de las ciencias sociales.
          </p>
          <p className="text-sm leading-relaxed" style={{ color: "#1A3A5C", fontFamily: "var(--font-lora, serif)" }}>
            Además de sus actividades profesionales, los miembros adherentes producen contenidos customizables, ajustados a la medida de cada necesidad formativa, con el fin de contribuir a mejorar la capacidad de decisión responsable, recuperar la vida familiar extensa y los entornos laborales institucionales y sociales prósperos.
          </p>
          <p className="text-sm leading-relaxed" style={{ color: "#1A3A5C", fontFamily: "var(--font-lora, serif)" }}>
            Generalmente quienes imparten sus enseñanzas son: médicos, abogados, filósofos, psicólogos, maestros o licenciados especialistas, expertos en diversas disciplinas. Quienes además soportan virtualmente los contenidos que producen, basados en OVA (Objetos Virtuales de Aprendizaje), en los distintos formatos que produce el Tecnocampus.
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
          Solicite una visita técnica
        </p>
        <h3
          className="text-2xl md:text-3xl font-bold text-center max-w-lg"
          style={{ color: "#F5EDD6", fontFamily: "var(--font-cinzel, serif)" }}
        >
          ¿Desea implementar el SG-SST en su empresa?
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
        <p
          className="text-xs mt-2"
          style={{ color: "#B87333", fontFamily: "var(--font-lora, serif)" }}
        >
          www.galeonadecadiz.org
        </p>
        <div
          className="h-px w-48 mt-4"
          style={{ background: "linear-gradient(90deg, transparent, #B87333, transparent)" }}
        />
      </section>

    </div>
  );
}
