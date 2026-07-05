import Link from "next/link";
import BookGallery from "@/app/components/tienda/BookGallery";

type BookData = {
  nombre: string;
  subtitulo?: string | null;
  autor: string;
  basadoEnLaObraDe?: string | null;
  editorAcademico?: string | null;
  traductorCompilador?: string | null;
  clasificacionAutor?: string | null;
  coedicion?: string | null;
  fechaAparicion?: string | null;
  obraActualizadaA?: string | null;
  editorial?: string | null;
  tema?: string | null;
  genero?: string | null;
  resena?: string | null;
  caratula?: string | null;
  dimensiones?: string | null;
  folios?: string | null;
  isbnImpreso?: string | null;
  isbnEbook?: string | null;
  envioIncluido?: boolean | null;
  costoEnvioColombia?: string | null;
  costoEnvioExterior?: string | null;
  precioCop?: unknown;
  precioUsd?: unknown;
  promocion?: string | null;
  valorNeto?: string | null;
  impuestos?: string | null;
  audiolibroDisponible?: boolean | null;
  audiolibroIsbn?: string | null;
  videolibroDisponible?: boolean | null;
  videolibroIsbn?: string | null;
  coverUrl?: string | null;
  galleryImages?: string[] | null;
  pdfPageImages?: string[] | null;
  disponibleCompra?: boolean | null;
  stock?: number | null;
};

function Row({ label, value }: { label: string; value?: string | null }) {
  if (!value) return null;
  return (
    <p className="text-[0.7rem] md:text-xs leading-snug" style={{ color: "#1A3A5C", fontFamily: "var(--font-lora, serif)" }}>
      <span className="font-semibold" style={{ color: "#1A3A5C" }}>{label}: </span>
      {value}
    </p>
  );
}

function NavButton({ label, variant }: { label: string; variant: "azul" | "bronce" }) {
  return (
    <a
      href="#"
      className="inline-flex items-center justify-center px-3 py-2 rounded-full text-xs md:text-sm font-semibold text-center transition-opacity hover:opacity-90"
      style={{
        background:
          variant === "azul"
            ? "linear-gradient(135deg, #1A3A5C, #1F4FA3)"
            : "linear-gradient(90deg, #E8511A, #B87333)",
        color: "#F5EDD6",
        fontFamily: "var(--font-lora, serif)",
      }}
    >
      {label}
    </a>
  );
}

export default function FichaBibliografica({
  book,
  slug,
  precioCop: precioCopProp,
  precioUsd: precioUsdProp,
}: {
  book: BookData;
  slug: string;
  precioCop?: number;
  precioUsd?: number;
}) {
  const precioCop = precioCopProp ?? Number(book.precioCop ?? 0);
  const precioUsd = precioUsdProp ?? Number(book.precioUsd ?? 0);
  const images = [book.coverUrl, ...(book.galleryImages ?? []), ...(book.pdfPageImages ?? [])].filter(
    (v): v is string => Boolean(v)
  );
  const enStock = (book.stock ?? 1) > 0;
  const puedeComprar = Boolean(book.disponibleCompra) && enStock;
  const mostrarCarrito = (precioCop > 0 || precioUsd > 0) && book.disponibleCompra;

  return (
    <section
      className="max-w-3xl mx-auto px-4 md:px-6 py-6 md:py-8 mt-6 md:mt-10 border-2"
      style={{ borderColor: "#B87333", background: "#d4c9a8" }}
    >
      <h1
        className="text-center text-lg md:text-2xl font-bold mb-4"
        style={{ color: "#1A3A5C", fontFamily: "var(--font-cinzel, serif)" }}
      >
        {book.nombre}
      </h1>

      <div className="flex flex-row gap-4 md:gap-8 items-start">
        {/* Portada + miniaturas */}
        <div className="flex justify-center flex-shrink-0">
          <BookGallery images={images} alt={book.nombre} />
        </div>

        {/* Caja de datos */}
        <div className="flex-1 flex flex-col gap-2.5">
          <div className="rounded-lg p-3 md:p-4 border-2 flex flex-col gap-0" style={{ background: "#F5EDD6", borderColor: "#E8511A" }}>
            <Row label="Título" value={book.nombre} />
            <Row label="Subtítulo" value={book.subtitulo} />
            <Row label="Basado en la obra de" value={book.basadoEnLaObraDe} />
            <Row label="Editor académico" value={book.editorAcademico} />
            <Row label="Traductor / Compilador" value={book.traductorCompilador} />
            <Row label="Clasificación del autor" value={book.clasificacionAutor} />
            <Row label="Coedición" value={book.coedicion} />
            <Row label="Fecha de aparición" value={book.fechaAparicion} />
            <Row label="Obra actualizada a" value={book.obraActualizadaA} />
            <Row label="Editorial" value={book.editorial} />
          </div>

          <div className="rounded-lg p-3 md:p-4 border-2 flex flex-col gap-0" style={{ background: "#F5EDD6", borderColor: "#E8511A" }}>
            <Row label="Tema" value={book.tema} />
            <Row label="Género" value={book.genero} />
            <Row label="Reseña" value={book.resena} />
            <Row label="Carátula" value={book.caratula} />
            <Row label="Dimensiones" value={book.dimensiones} />
            <Row label="Folios" value={book.folios} />
          </div>

          <div className="rounded-lg p-3 md:p-4 border-2 flex flex-col gap-0" style={{ background: "#F5EDD6", borderColor: "#E8511A" }}>
            <Row label="Libro impreso — ISBN" value={book.isbnImpreso} />
            <Row label="E-book — ISBN" value={book.isbnEbook} />
            <Row
              label="Audiolibro"
              value={book.audiolibroDisponible ? `Disponible${book.audiolibroIsbn ? ` — ISBN: ${book.audiolibroIsbn}` : ""}` : "No disponible"}
            />
            <Row
              label="Videolibro"
              value={book.videolibroDisponible ? `Disponible${book.videolibroIsbn ? ` — ISBN: ${book.videolibroIsbn}` : ""}` : "No disponible"}
            />
            {precioCop > 0 && <Row label="Precio" value={`$${precioCop.toLocaleString("es-CO")} COP`} />}
            {precioUsd > 0 && <Row label="Precio" value={`$${precioUsd.toFixed(2)} USD`} />}
            <Row label="Promoción" value={book.promocion} />
            <Row label="Valor neto a consignar" value={book.valorNeto} />
            <Row label="Impuestos" value={book.impuestos} />
            {book.envioIncluido !== null && book.envioIncluido !== undefined && (
              <Row label="Envío incluido" value={book.envioIncluido ? "Sí" : "No"} />
            )}
            <Row label="Costo de envío — Colombia" value={book.costoEnvioColombia} />
            <Row label="Costo de envío — exterior" value={book.costoEnvioExterior} />
          </div>
        </div>
      </div>

      {/* Grid de botones + carrito al costado */}
      <div className="flex flex-col sm:flex-row items-center gap-4 mt-4">
        <div className="grid grid-cols-2 gap-1.5 md:gap-2 flex-1 w-full">
          <NavButton label="Lexicografía" variant="azul" />
          <NavButton label="Leer libro ahora" variant="bronce" />
          <NavButton label="Índice temático" variant="azul" />
          <NavButton label="Escuchar libro" variant="bronce" />
          <NavButton label="Reportaje" variant="azul" />
          <NavButton label="Ser promotor" variant="bronce" />
          <NavButton label="Observatorio" variant="azul" />
          <NavButton label="Ser donante" variant="bronce" />
        </div>

        {mostrarCarrito && (
          <div className="flex flex-col items-center gap-1.5 flex-shrink-0">
            {puedeComprar ? (
              <Link
                href={`/checkout?slug=${slug}`}
                className="flex items-center justify-center rounded-full shadow-lg hover:opacity-90 transition-opacity"
                style={{
                  background: "linear-gradient(135deg, #E8511A, #B87333)",
                  color: "#F5EDD6",
                  width: 56,
                  height: 56,
                }}
              >
                <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <circle cx="9" cy="21" r="1" /><circle cx="20" cy="21" r="1" />
                  <path d="M1 1h4l2.68 13.39a2 2 0 0 0 2 1.61h9.72a2 2 0 0 0 2-1.61L23 6H6" />
                </svg>
              </Link>
            ) : (
              <span
                className="flex items-center justify-center rounded-full shadow-lg opacity-40 cursor-not-allowed"
                style={{ background: "linear-gradient(135deg, #E8511A, #B87333)", color: "#F5EDD6", width: 56, height: 56 }}
              >
                <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <circle cx="9" cy="21" r="1" /><circle cx="20" cy="21" r="1" />
                  <path d="M1 1h4l2.68 13.39a2 2 0 0 0 2 1.61h9.72a2 2 0 0 0 2-1.61L23 6H6" />
                </svg>
              </span>
            )}
            <div
              className="rounded-lg border px-2 py-1 text-center"
              style={{ borderColor: "#B87333", background: "#F5EDD6" }}
            >
              <p
                className="text-[0.6rem] leading-tight font-semibold"
                style={{ color: "#1A3A5C", fontFamily: "var(--font-cinzel, serif)" }}
              >
                {puedeComprar ? <>Forma de Adquirir el<br />LIBRO IMPRESO</> : "Sin stock"}
              </p>
            </div>
          </div>
        )}
      </div>
    </section>
  );
}
