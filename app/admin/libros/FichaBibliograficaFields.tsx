"use client";

const inputCls = "w-full px-3 py-2 rounded-lg text-sm border-2 outline-none transition-all duration-200 focus:border-[#E8511A] placeholder:opacity-40";
const inputStyle = {
  background: "#F5EDD6",
  borderColor: "#B87333",
  color: "#1A3A5C",
  fontFamily: "var(--font-lora, serif)",
};
const labelCls = "flex items-center gap-1.5 text-[0.6rem] tracking-[0.22em] uppercase font-semibold mb-1.5";
const labelStyle = { color: "#B87333", fontFamily: "var(--font-cinzel, serif)" };
const sectionStyle = {
  background: "linear-gradient(160deg,#ede4cb 0%,#ddd0b0 100%)",
  borderColor: "#B87333",
  boxShadow: "0 4px 24px rgba(26,58,92,0.08)",
};

export const FICHA_BIBLIOGRAFICA_EMPTY = {
  subtitulo: "",
  basadoEnLaObraDe: "",
  editorAcademico: "",
  traductorCompilador: "",
  clasificacionAutor: "",
  coedicion: "",
  fechaAparicion: "",
  obraActualizadaA: "",
  editorial: "",
  tema: "",
  genero: "",
  resena: "",
  caratula: "",
  dimensiones: "",
  folios: "",
  isbnImpreso: "",
  isbnEbook: "",
  envioIncluido: false,
  costoEnvioColombia: "",
  costoEnvioExterior: "",
  promocion: "",
  valorNeto: "",
  impuestos: "",
  audiolibroDisponible: false,
  audiolibroIsbn: "",
  videolibroDisponible: false,
  videolibroIsbn: "",
};

const IDENTIFICACION = [
  { name: "subtitulo", label: "Subtítulo" },
  { name: "basadoEnLaObraDe", label: "Basado en la obra de" },
  { name: "editorAcademico", label: "Editor académico" },
  { name: "traductorCompilador", label: "Traductor / Compilador" },
  { name: "clasificacionAutor", label: "Clasificación del autor (casa/invitado)" },
  { name: "coedicion", label: "Coedición" },
  { name: "fechaAparicion", label: "Fecha de aparición" },
  { name: "obraActualizadaA", label: "Obra actualizada a" },
  { name: "editorial", label: "Editorial" },
] as const;

const DETALLE = [
  { name: "tema", label: "Tema" },
  { name: "genero", label: "Género" },
  { name: "caratula", label: "Carátula" },
  { name: "dimensiones", label: "Dimensiones" },
  { name: "folios", label: "Folios" },
] as const;

const COMERCIAL = [
  { name: "isbnImpreso", label: "ISBN — libro impreso" },
  { name: "isbnEbook", label: "ISBN — e-book" },
  { name: "audiolibroIsbn", label: "ISBN — audiolibro" },
  { name: "videolibroIsbn", label: "ISBN — videolibro" },
  { name: "costoEnvioColombia", label: "Costo de envío (Colombia)" },
  { name: "costoEnvioExterior", label: "Costo de envío (exterior)" },
  { name: "promocion", label: "Promoción" },
  { name: "valorNeto", label: "Valor neto a consignar" },
  { name: "impuestos", label: "Impuestos" },
] as const;

type FieldValues = Record<string, unknown>;

interface Props {
  values: FieldValues;
  onChange: (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => void;
}

export default function FichaBibliograficaFields({ values, onChange }: Props) {
  return (
    <>
      <section className="rounded-xl p-4 border-2" style={sectionStyle}>
        <div className="flex items-center gap-2 mb-3">
          <span className="text-[0.6rem] tracking-[0.25em] uppercase font-semibold" style={{ color: "#B87333", fontFamily: "var(--font-cinzel, serif)" }}>
            Ficha bibliográfica — identificación
          </span>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
          {IDENTIFICACION.map(({ name, label }) => (
            <div key={name}>
              <label className={labelCls} style={labelStyle}>{label}</label>
              <input name={name} type="text" value={(values[name] as string) ?? ""} onChange={onChange} className={inputCls} style={inputStyle} />
            </div>
          ))}
        </div>
      </section>

      <section className="rounded-xl p-4 border-2" style={sectionStyle}>
        <div className="flex items-center gap-2 mb-3">
          <span className="text-[0.6rem] tracking-[0.25em] uppercase font-semibold" style={{ color: "#B87333", fontFamily: "var(--font-cinzel, serif)" }}>
            Detalle del libro
          </span>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-3 mb-3">
          {DETALLE.map(({ name, label }) => (
            <div key={name}>
              <label className={labelCls} style={labelStyle}>{label}</label>
              <input name={name} type="text" value={(values[name] as string) ?? ""} onChange={onChange} className={inputCls} style={inputStyle} />
            </div>
          ))}
        </div>
        <div>
          <label className={labelCls} style={labelStyle}>Reseña (abstract)</label>
          <textarea name="resena" rows={3} value={(values.resena as string) ?? ""} onChange={onChange} className={`${inputCls} resize-none`} style={inputStyle} />
        </div>
      </section>

      <section className="rounded-xl p-4 border-2" style={sectionStyle}>
        <div className="flex items-center gap-2 mb-3">
          <span className="text-[0.6rem] tracking-[0.25em] uppercase font-semibold" style={{ color: "#B87333", fontFamily: "var(--font-cinzel, serif)" }}>
            Índice temático — datos comerciales
          </span>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
          {COMERCIAL.map(({ name, label }) => (
            <div key={name}>
              <label className={labelCls} style={labelStyle}>{label}</label>
              <input name={name} type="text" value={(values[name] as string) ?? ""} onChange={onChange} className={inputCls} style={inputStyle} />
            </div>
          ))}
        </div>
        <div className="flex flex-col gap-2 mt-3">
          <label className="flex items-center gap-3 p-3 rounded-xl cursor-pointer" style={{ background: "#F5EDD660", border: "1.5px solid #B8733350" }}>
            <input
              type="checkbox"
              name="envioIncluido"
              checked={Boolean(values.envioIncluido)}
              onChange={onChange}
              className="w-4 h-4 accent-[#E8511A]"
            />
            <span className="text-sm" style={{ color: "#1A3A5C", fontFamily: "var(--font-lora, serif)" }}>Envío incluido en el precio</span>
          </label>
          <label className="flex items-center gap-3 p-3 rounded-xl cursor-pointer" style={{ background: "#F5EDD660", border: "1.5px solid #B8733350" }}>
            <input
              type="checkbox"
              name="audiolibroDisponible"
              checked={Boolean(values.audiolibroDisponible)}
              onChange={onChange}
              className="w-4 h-4 accent-[#E8511A]"
            />
            <span className="text-sm" style={{ color: "#1A3A5C", fontFamily: "var(--font-lora, serif)" }}>Audiolibro disponible</span>
          </label>
          <label className="flex items-center gap-3 p-3 rounded-xl cursor-pointer" style={{ background: "#F5EDD660", border: "1.5px solid #B8733350" }}>
            <input
              type="checkbox"
              name="videolibroDisponible"
              checked={Boolean(values.videolibroDisponible)}
              onChange={onChange}
              className="w-4 h-4 accent-[#E8511A]"
            />
            <span className="text-sm" style={{ color: "#1A3A5C", fontFamily: "var(--font-lora, serif)" }}>Videolibro disponible</span>
          </label>
        </div>
      </section>
    </>
  );
}
