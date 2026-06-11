import Image from "next/image";
import {
  FaFacebookF, FaInstagram, FaYoutube, FaLinkedinIn,
  FaPinterestP, FaXTwitter, FaTiktok, FaSpotify,
  FaPlay, FaMicrophone, FaWhatsapp,
} from "react-icons/fa6";
import { SiSpeakerdeck, SiGooglecast } from "react-icons/si";

const socialLinks = [
  { name: "Facebook",      href: "#", Icon: FaFacebookF },
  { name: "Instagram",     href: "#", Icon: FaInstagram },
  { name: "YouTube",       href: "#", Icon: FaYoutube },
  { name: "LinkedIn",      href: "#", Icon: FaLinkedinIn },
  { name: "Pinterest",     href: "#", Icon: FaPinterestP },
  { name: "Twitter / X",   href: "#", Icon: FaXTwitter },
  { name: "TikTok",        href: "#", Icon: FaTiktok },
  { name: "Spotify",       href: "#", Icon: FaSpotify },
  { name: "Speaker",        href: "#", Icon: SiSpeakerdeck, label: "Speaker" },
  { name: "Google Podcast", href: "#", Icon: SiGooglecast,  label: "G. Podcast" },
  { name: "WhatsApp",       href: "https://wa.me/573112524239?text=Cordial%20saludo%2C%20estoy%20interesado%20en%20el%20libro%20Nuestra%20Se%C3%B1ora%20de%20Chiquinquir%C3%A1%20de%20La%20Estrella.", Icon: FaWhatsapp, label: "WhatsApp" },
];

const products = [
  {
    title: "Canon Lector",
    href: "/tienda",
    initials: "CL",
    img: "https://images.pexels.com/photos/13061422/pexels-photo-13061422.jpeg",
    desc: "Obras esenciales para la formación lectora.",
  },
  {
    title: "Formación",
    initials: "F",
    img: "https://images.pexels.com/photos/9572637/pexels-photo-9572637.jpeg",
    desc: "Cursos y talleres de desarrollo personal.",
  },
  {
    title: "Consultoría",
    initials: "C",
    img: "https://images.pexels.com/photos/5686105/pexels-photo-5686105.jpeg",
    desc: "Asesoramiento jurídico y estratégico.",
  },
  {
    title: "Acción Cultural",
    initials: "AC",
    img: "https://images.pexels.com/photos/31846587/pexels-photo-31846587.jpeg",
    desc: "Arte y cultura con identidad institucional.",
  },
];

export default function Home() {
  return (
    <div className="flex flex-col min-h-full" style={{ background: "#F5EDD6" }}>

      {/* CTA Editorial */}
      <section className="flex justify-center pt-8 pb-4 px-4">
        <a
          href="/fondo-editorial"
          className="inline-block px-8 py-3 rounded-full text-white font-semibold tracking-widest uppercase text-sm transition-opacity hover:opacity-90 shadow-md"
          style={{
            background: "linear-gradient(90deg, #E8511A, #B87333)",
            fontFamily: "var(--font-cinzel, serif)",
            letterSpacing: "0.18em",
          }}
        >
          Ingresar al Fondo Editorial
        </a>
      </section>

      {/* Redes Sociales */}
      <section className="flex justify-center py-5 px-4">
        <div className="flex flex-wrap justify-center gap-3">
          {socialLinks.map(({ name, href, Icon, label }) => (
            <a
              key={name}
              href={href}
              aria-label={name}
              title={name}
              className="flex flex-col items-center gap-1 group transition-all duration-150"
            >
              <div
                className="w-10 h-10 rounded-full flex items-center justify-center text-white group-hover:scale-110 group-hover:shadow-md transition-transform duration-150"
                style={{ background: "#1B6CA8", border: "1.5px solid #B87333" }}
              >
                <Icon size={18} />
              </div>
              {label && (
                <span
                  className="text-[0.6rem] tracking-wide"
                  style={{ color: "#1B6CA8", fontFamily: "var(--font-cinzel, serif)" }}
                >
                  {label}
                </span>
              )}
            </a>
          ))}
        </div>
      </section>

      {/* Separador decorativo */}
      <div className="flex justify-center py-2 px-4">
        <div className="w-full max-w-2xl h-px" style={{ background: "linear-gradient(90deg, transparent, #B87333, transparent)" }} />
      </div>

      {/* Grid Productos y Actividades */}
      <section className="flex justify-center px-4 py-6">
        <div
          className="w-full max-w-2xl rounded-2xl p-4 md:p-8 md:border-2 md:border-[#B87333] md:shadow-[0_4px_24px_rgba(184,115,51,0.15)] md:bg-[linear-gradient(135deg,#e8dfc4_0%,#d4c9a8_100%)]"
        >
          <h2
            className="text-center text-lg font-bold mb-6 tracking-widest uppercase"
            style={{ color: "#1A3A5C", fontFamily: "var(--font-cinzel, serif)", letterSpacing: "0.2em" }}
          >
            Productos y Actividades
          </h2>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-x-6 gap-y-10">
            {products.map((p) => (
              <a
                key={p.title}
                href={"href" in p ? (p as any).href : "#"}
                className="flex flex-col items-center gap-3 group transition-transform hover:-translate-y-1"
              >
                <div
                  className="w-28 h-28 md:w-32 md:h-32 rounded-full overflow-hidden shadow-md transition-shadow group-hover:shadow-lg relative flex-shrink-0"
                  style={{ border: "3px solid #B87333" }}
                >
                  <Image
                    src={p.img}
                    alt={p.title}
                    fill
                    className="object-cover"
                    sizes="128px"
                  />
                </div>
                <span
                  className="text-sm font-semibold tracking-wider uppercase"
                  style={{ color: "#B87333", fontFamily: "var(--font-cinzel, serif)" }}
                >
                  {p.title}
                </span>
                <p
                  className="text-xs text-center leading-relaxed max-w-[160px]"
                  style={{ color: "#1A3A5C", fontFamily: "var(--font-lora, serif)" }}
                >
                  {p.desc}
                </p>
              </a>
            ))}
          </div>
        </div>
      </section>

      {/* Row inferior: Videos | Contáctenos | Podcasts */}
      <section className="flex items-center justify-between max-w-2xl mx-auto w-full px-6 py-4 gap-4">
        <a
          href="#"
          className="flex flex-col items-center gap-2 group transition-opacity hover:opacity-75 flex-1"
        >
          <div
            className="w-12 h-12 rounded-full flex items-center justify-center text-white"
            style={{ background: "#1A3A5C", border: "2px solid #B87333" }}
          >
            <FaPlay size={18} />
          </div>
          <span
            className="text-sm font-semibold underline underline-offset-2"
            style={{ color: "#1B6CA8", fontFamily: "var(--font-cinzel, serif)" }}
          >
            Videos
          </span>
        </a>

        <a
          href="#"
          className="flex-1 flex justify-center"
        >
          <span
            className="inline-block px-8 py-3 rounded-full font-semibold tracking-widest uppercase text-sm transition-opacity hover:opacity-80 shadow-sm"
            style={{
              background: "#B87333",
              color: "#F5EDD6",
              fontFamily: "var(--font-cinzel, serif)",
              letterSpacing: "0.12em",
            }}
          >
            Contáctenos
          </span>
        </a>

        <a
          href="#"
          className="flex flex-col items-center gap-2 group transition-opacity hover:opacity-75 flex-1"
        >
          <div
            className="w-12 h-12 rounded-full flex items-center justify-center text-white"
            style={{ background: "#1A3A5C", border: "2px solid #B87333" }}
          >
            <FaMicrophone size={18} />
          </div>
          <span
            className="text-sm font-semibold underline underline-offset-2"
            style={{ color: "#1B6CA8", fontFamily: "var(--font-cinzel, serif)" }}
          >
            Podcasts
          </span>
        </a>
      </section>


    </div>
  );
}
