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
      { label: "Habilidad Comunicativa en Castellano",     href: "/fundacion-social/habilidad-comunicativa-castellano" },
      { label: "Habilidad Comunicativa en Inglés",         href: "/capacitaciones/habilidad-comunicativa-ingles" },
    ],
  },
  {
    label: "Devocionales",
    href: "/devocionales",
    children: [
      { label: "Oración del Sello de Cristo",              href: "/devocionales/oracion-del-sello-de-cristo" },
      { label: "Para Prevenir las Adicciones",             href: "/devocionales/san-maximiliano-kolbe" },
      { label: "Devocionario Universidad de los Andes",    href: "/devocionales/devocionario-universidad-andes" },
      { label: "Novena Tradicional San Luis Bertrán",      href: "/devocionales/novena-san-luis-bertran" },
      { label: "Oración a Nuestra Señora de Chiquinquirá", href: "/devocionales/oracion-nuestra-senora-chiquinquira" },
      { label: "Testimonios",                              href: "/devocionales/testimonios" },
    ],
  },
  {
    label: "Auspicios y Pagos",
    href: "/auspicios-pagos",
  },
  {
    label: "Tienda",
    href: "/tienda",
    children: [
      { label: "Comprar libro impreso",   href: "/tienda/comprar-libro" },
      { label: "Leer E-Book", href: "/tienda/ebook" },
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
