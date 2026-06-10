export interface NavChild {
  label: string;
  href: string;
  external?: boolean;
}

export interface NavItem {
  label: string;
  href: string;
  children?: NavChild[];
  external?: boolean;
}

export const NAV_ITEMS: NavItem[] = [
  {
    label: "Nosotros",
    href: "/nosotros",
    children: [
      { label: "Información institucional",         href: "/institucional" },
      { label: "Misión y Visión",                   href: "/vision" },
      { label: "Fundación Social Galeona de Cádiz", href: "/fundacion-social" },
      { label: "Escuela de Nazaret",                href: "/escuela-de-nazaret" },
      { label: "Contacto institucional",            href: "/contacto" },
    ],
  },
  {
    label: "Fondo editorial",
    href: "/libros-y-arte",
    children: [
      { label: "Canon Lector",                                      href: "/tienda" },
      { label: "Libros disponibles",                               href: "#" },
      { label: "E-books",                                          href: "#" },
      { label: "Ficha del libro Nuestra Señora de Chiquinquirá",   href: "#" },
      { label: "Acceso a compra del libro",                        href: "#" },
      { label: "Acceso a descarga del e-book",                     href: "#" },
    ],
  },
  {
    label: "Capacitaciones",
    href: "/capacitaciones",
    children: [
      { label: "Oficial de Cumplimiento en SG-SST",       href: "/capacitaciones/sg-sst" },
      { label: "Promotor de Causas Sociales",              href: "/fundacion-social/promotor-de-causas-sociales" },
      { label: "Preceptor de Cultura Familiar",            href: "/capacitaciones/preceptor-cultura-familiar" },
      { label: "Habilidad Comunicativa en Castellano",     href: "https://docs.google.com/viewer?url=https://www.galeonadecadiz.org/pdf/portal-7.pdf",  external: true },
      { label: "Habilidad Comunicativa en Inglés",         href: "/capacitaciones/habilidad-comunicativa-ingles" },
    ],
  },
  {
    label: "Devocionales",
    href: "/devocionales",
    children: [
      { label: "Oración del Sello de Cristo",              href: "https://docs.google.com/viewer?url=https://www.galeonadecadiz.org/pdf/oracion_del_sello_de_cristo.pdf",    external: true },
      { label: "Para Prevenir las Adicciones",             href: "https://docs.google.com/viewer?url=https://www.galeonadecadiz.org/pdf/oracion_a_san_maximiliano_kolbe.pdf", external: true },
      { label: "Devocionario Universidad de los Andes",    href: "https://docs.google.com/viewer?url=https://www.galeonadecadiz.org/pdf/oracion.pdf",                        external: true },
      { label: "Novena Tradicional San Luis Bertrán",      href: "https://www.galeonadecadiz.org/libro/novena_slb",                                                          external: true },
      { label: "Oración a Nuestra Señora de Chiquinquirá", href: "https://docs.google.com/viewer?url=https://www.galeonadecadiz.org/pdf/oracion_nstra_sra_chiquinquira.pdf", external: true },
      { label: "Testimonios",                              href: "https://www.galeonadecadiz.org/TESTIMONIOS/",                                                               external: true },
    ],
  },
  {
    label: "Auspicios y Pagos",
    href: "https://docs.google.com/viewer?url=https://www.galeonadecadiz.org/pdf/pagos.pdf",
    external: true,
  },
  {
    label: "Tienda",
    href: "/tienda",
    children: [
      { label: "Comprar libro impreso",   href: "/tienda/comprar-libro" },
      { label: "Descargar / leer e-book", href: "/tienda/ebook" },
      { label: "Donaciones",              href: "/tienda/donaciones" },
      { label: "WhatsApp de soporte",     href: "/tienda/soporte" },
      { label: "Confirmación de compra",  href: "/tienda/confirmacion" },
      { label: "Registro de pedido",      href: "/tienda/pedido" },
    ],
  },
  {
    label: "Contacto",
    href: "/contacto",
  },
];
