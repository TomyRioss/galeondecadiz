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
    label: "Libros y Arte",
    href: "/libros-y-arte",
    children: [
      { label: "Canon Lector (Saber más)",          href: "https://www.galeonadecadiz.org/Canon-Lector/",                                        external: true },
      { label: "Lienzos Didácticos (Artium)",       href: "https://docs.google.com/viewer?url=https://www.galeonadecadiz.org/pdf/ps-3.pdf",      external: true },
      { label: "Catálogo Wayuu (Artium)",           href: "https://docs.google.com/viewer?url=https://www.galeonadecadiz.org/pdf/ps-4.pdf",      external: true },
      { label: "Guías y Lexicografías (Scriptorium)", href: "https://docs.google.com/viewer?url=https://www.galeonadecadiz.org/pdf/ps-5.pdf",    external: true },
    ],
  },
  {
    label: "Capacitaciones",
    href: "/capacitaciones",
    children: [
      { label: "Oficial de Cumplimiento en SG-SST",       href: "https://docs.google.com/viewer?url=https://www.galeonadecadiz.org/pdf/portal-0.pdf",  external: true },
      { label: "Oficial de Cumplimiento en Econ. Mutual", href: "https://docs.google.com/viewer?url=https://www.galeonadecadiz.org/pdf/portal-10.pdf", external: true },
      { label: "Promotor de Causas Sociales",              href: "https://docs.google.com/viewer?url=https://www.galeonadecadiz.org/pdf/portal-1.pdf",  external: true },
      { label: "Preceptor de Cultura Familiar",            href: "https://docs.google.com/viewer?url=https://www.galeonadecadiz.org/pdf/portal-2.pdf",  external: true },
      { label: "Habilidad Comunicativa en Castellano",     href: "https://docs.google.com/viewer?url=https://www.galeonadecadiz.org/pdf/portal-7.pdf",  external: true },
      { label: "Habilidad Comunicativa en Inglés",         href: "https://www.galeonadecadiz.org/libro/wisdom",                                         external: true },
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
