import Link from "next/link";
import {
  FaFacebookF, FaInstagram, FaYoutube, FaLinkedinIn,
  FaPinterestP, FaXTwitter, FaTiktok, FaSpotify,
} from "react-icons/fa6";
import { SiSpeakerdeck, SiGooglecast } from "react-icons/si";
import { FaMapMarkerAlt, FaEnvelope, FaPhone, FaWhatsapp } from "react-icons/fa";

const socialIcons = [
  { name: "Facebook",      href: "#", Icon: FaFacebookF },
  { name: "Instagram",     href: "#", Icon: FaInstagram },
  { name: "YouTube",       href: "#", Icon: FaYoutube },
  { name: "LinkedIn",      href: "#", Icon: FaLinkedinIn },
  { name: "Pinterest",     href: "#", Icon: FaPinterestP },
  { name: "Twitter / X",   href: "#", Icon: FaXTwitter },
  { name: "TikTok",        href: "#", Icon: FaTiktok },
  { name: "Spotify",       href: "#", Icon: FaSpotify },
  { name: "Speaker",       href: "#", Icon: SiSpeakerdeck },
  { name: "Google Podcast",href: "#", Icon: SiGooglecast },
];

const mainLinks = [
  { label: "Nosotros",          href: "/nosotros" },
  { label: "Fondo Editorial",   href: "/fondo-editorial" },
  { label: "Capacitaciones",    href: "/capacitaciones" },
  { label: "Devocionales",      href: "/devocionales" },
  { label: "Auspicios y Pagos", href: "/auspicios-pagos" },
  { label: "Tienda",            href: "/tienda" },
  { label: "Contacto",          href: "/contacto" },
];

const legalLinks = [
  { label: "Política de privacidad", href: "/privacidad" },
  { label: "Términos de uso",        href: "/terminos" },
];

export default function Footer() {
  return (
    <footer
      className="w-full mt-auto"
      style={{ background: "#1A3A5C", borderTop: "2px solid #B87333" }}
    >
      {/* Línea decorativa superior */}
      <div className="h-1 w-full" style={{ background: "linear-gradient(90deg, #B87333, #F5EDD6, #B87333)" }} />

      <div className="max-w-6xl mx-auto px-6 py-10">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-10">

          {/* Col 1: Identidad + contacto */}
          <div className="flex flex-col gap-4">
            <div>
              <p
                className="text-[#B87333] text-[0.6rem] tracking-[0.2em] uppercase"
                style={{ fontFamily: "var(--font-cinzel, serif)" }}
              >
                Fundación Social
              </p>
              <p
                className="text-white text-lg font-bold tracking-wide"
                style={{ fontFamily: "var(--font-cinzel, serif)" }}
              >
                Galeona de Cádiz
              </p>
            </div>

            <div className="flex flex-col gap-2 mt-1">
              <div className="flex items-start gap-2 text-white/80 text-xs" style={{ fontFamily: "var(--font-lora, serif)" }}>
                <FaMapMarkerAlt className="mt-0.5 flex-shrink-0 text-[#B87333]" size={13} />
                <span>Dirección institucional — placeholder</span>
              </div>
              <div className="flex items-center gap-2 text-white/80 text-xs" style={{ fontFamily: "var(--font-lora, serif)" }}>
                <FaEnvelope className="flex-shrink-0 text-[#B87333]" size={13} />
                <a href="mailto:contacto@galeonadecadiz.org" className="hover:text-[#E8511A] transition-colors">
                  contacto@galeonadecadiz.org
                </a>
              </div>
              <div className="flex items-center gap-2 text-white/80 text-xs" style={{ fontFamily: "var(--font-lora, serif)" }}>
                <FaPhone className="flex-shrink-0 text-[#B87333]" size={13} />
                <span>+54 000 000 0000</span>
              </div>
              <div className="flex items-center gap-2 text-white/80 text-xs" style={{ fontFamily: "var(--font-lora, serif)" }}>
                <FaWhatsapp className="flex-shrink-0 text-[#B87333]" size={13} />
                <a href="https://wa.me/" className="hover:text-[#E8511A] transition-colors">
                  WhatsApp
                </a>
              </div>
            </div>
          </div>

          {/* Col 2: Enlaces principales */}
          <div>
            <p
              className="text-[#B87333] text-[0.65rem] tracking-widest uppercase mb-4"
              style={{ fontFamily: "var(--font-cinzel, serif)" }}
            >
              Enlaces
            </p>
            <ul className="flex flex-col gap-2">
              {mainLinks.map((l) => (
                <li key={l.href}>
                  <Link
                    href={l.href}
                    className="text-white/80 text-xs hover:text-[#E8511A] transition-colors tracking-wide"
                    style={{ fontFamily: "var(--font-cinzel, serif)" }}
                  >
                    {l.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Col 3: Redes sociales */}
          <div>
            <p
              className="text-[#B87333] text-[0.65rem] tracking-widest uppercase mb-4"
              style={{ fontFamily: "var(--font-cinzel, serif)" }}
            >
              Redes Sociales
            </p>
            <div className="flex flex-wrap gap-2">
              {socialIcons.map(({ name, href, Icon }) => (
                <a
                  key={name}
                  href={href}
                  aria-label={name}
                  title={name}
                  className="w-8 h-8 rounded-full flex items-center justify-center text-white transition-all duration-150 hover:scale-110"
                  style={{ background: "#1F4FA3", border: "1px solid #B87333" }}
                >
                  <Icon size={14} />
                </a>
              ))}
            </div>
          </div>

        </div>

        {/* Separador */}
        <div className="my-8 h-px" style={{ background: "linear-gradient(90deg, transparent, #B87333, transparent)" }} />

        {/* Bottom: copyright + legal */}
        <div className="flex flex-col md:flex-row items-center justify-between gap-3">
          <p
            className="text-white/50 text-[0.65rem] text-center md:text-left"
            style={{ fontFamily: "var(--font-lora, serif)" }}
          >
            Copyright © {new Date().getFullYear()} Fondo Editorial Galeona. Todos los derechos reservados.
          </p>

          <div className="flex gap-4 items-center">
            {legalLinks.map((l) => (
              <Link
                key={l.href}
                href={l.href}
                className="text-white/40 text-[0.6rem] hover:text-white/70 transition-colors tracking-wide"
                style={{ fontFamily: "var(--font-lora, serif)" }}
              >
                {l.label}
              </Link>
            ))}
            <Link
              href="/login"
              className="text-white/50 text-[0.55rem] hover:text-white/80 transition-colors tracking-widest uppercase"
              style={{ fontFamily: "var(--font-cinzel, serif)" }}
            >
              Admin
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
}
