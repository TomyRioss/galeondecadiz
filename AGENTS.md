<!-- BEGIN:nextjs-agent-rules -->
# This is NOT the Next.js you know

This version has breaking changes — APIs, conventions, and file structure may all differ from your training data. Read the relevant guide in `node_modules/next/dist/docs/` before writing any code. Heed deprecation notices.
<!-- END:nextjs-agent-rules -->

# Reglas Generales

- Nunca tocar la base de datos, Prisma ni ejecutar comandos relacionados con la base de datos.
- Nunca ejecutar comandos críticos como `git reset --hard` o `git push --force`.
- Siempre ser concreto y directo. Respuestas verbosas son inaceptables.
- NUNCA hacer nada más de lo que se pide. Seguir los requerimientos al pie de la letra.
- Siempre explicar qué se quiere hacer, qué va a resolver y cómo antes de proponer un plan.
- Nunca realizar diseños utilizando SVG si no fue explícitamente requerido.

# Branding & Diseño

## Identidad
- **Nombre**: Fundación Social Galeona de Cádiz
- **NIT**: 900.544.600-9
- **Ubicación**: Bogotá, Colombia
- **Fundador**: Álvaro Gallón Rodríguez

## Paleta de Colores

| Color | Hex | Uso |
|-------|-----|-----|
| Azul oscuro | `#1A3A5C` | Fondo de hero, header, footer, textos principales |
| Bronce | `#B87333` | Bordes, acentos, textos secundarios, separadores |
| Naranja/Rojo | `#E8511A` | Gradientes, hover, CTAs, acentos activos |
| Crema | `#F5EDD6` | Fondo de página, texto sobre fondos oscuros |
| Azul medio | `#1B6CA8` | Textos descriptivos, párrafos secundarios |
| Azul intermedio | `#1F4FA3` | Fondos de dropdowns, iconos de redes |

## Tipografía

| Fuente | Variable CSS | Uso |
|--------|--------------|-----|
| Cinzel | `var(--font-cinzel, serif)` | Títulos, etiquetas, botones, tracking uppercase |
| Lora | `var(--font-lora, serif)` | Cuerpo de texto, párrafos, descripciones |

## Gradientes Estándar

```css
/* Barra de acento vertical */
background: linear-gradient(180deg, #E8511A, #B87333);

/* Separador horizontal */
background: linear-gradient(90deg, transparent, #B87333, transparent);

/* Botones CTA */
background: linear-gradient(90deg, #E8511A, #B87333);

/* Tarjetas de contenido */
background: linear-gradient(135deg, #e8dfc4 0%, #d4c9a8 100%);

/* Tarjetas alternativas */
background: linear-gradient(160deg, #ede4cb 0%, #ddd0b0 100%);

/* Badges circulares azules */
background: linear-gradient(135deg, #1A3A5C, #1F4FA3);
```

## Estructura de Páginas

Todas las páginas públicas siguen este patrón:

```tsx
<div style={{ background: "#F5EDD6", minHeight: "100vh" }}>
  {/* HERO */}
  <section style={{ background: "#1A3A5C" }}>
    <h1 style={{ fontFamily: "var(--font-cinzel, serif)", color: "#F5EDD6" }}>Título</h1>
    <p style={{ fontFamily: "var(--font-lora, serif)", color: "#B87333" }}>Subtítulo</p>
  </section>

  {/* SECCIONES DE CONTENIDO */}
  <section className="max-w-4xl mx-auto px-4 py-14">
    {/* Título con barra de acento */}
    <div className="flex items-start gap-4 mb-8">
      <div className="w-1.5 h-14 rounded-full" style={{ background: "linear-gradient(180deg, #E8511A, #B87333)" }} />
      <h2 style={{ fontFamily: "var(--font-cinzel, serif)", color: "#1A3A5C" }}>Sección</h2>
    </div>

    {/* Tarjeta */}
    <div className="rounded-2xl p-6 md:p-10 border-2" style={{
      background: "linear-gradient(135deg, #e8dfc4 0%, #d4c9a8 100%)",
      borderColor: "#B87333",
    }}>
      ...
    </div>
  </section>

  {/* SEPARADOR */}
  <div className="flex justify-center px-4">
    <div className="w-full max-w-4xl h-px" style={{ background: "linear-gradient(90deg, transparent, #B87333, transparent)" }} />
  </div>

  {/* CTA FINAL (opcional) */}
  <section style={{ background: "#1A3A5C" }}>
    <a style={{ background: "linear-gradient(90deg, #E8511A, #B87333)", color: "#F5EDD6" }}>Botón</a>
  </section>
</div>
```

## Componentes de UI

### Tarjetas
- Border: `2px solid #B87333`
- Border radius: `rounded-2xl` (16px) o `rounded-xl` (12px)
- Padding: `p-6 md:p-10` o `p-6 md:p-8`
- Sombra: `boxShadow: "0 4px 32px rgba(26,58,92,0.08)"`

### Botones
- Estilo: `rounded-full`, `tracking-widest uppercase`, `font-semibold`
- Primario: `background: linear-gradient(90deg, #E8511A, #B87333)`, color `#F5EDD6`
- Secundario: `border: 1.5px solid #B87333`, fondo transparente, color `#1A3A5C`

### Inputs
- Background: `#F5EDD6`
- Border: `1.5px solid #B87333`
- Color texto: `#1A3A5C`
- Font: `var(--font-lora, serif)`
- Focus: `border-[#E8511A]`

### Labels
- Color: `#B87333`
- Font: `var(--font-cinzel, serif)`
- Estilo: `text-[0.65rem] tracking-[0.2em] uppercase font-semibold`

## Datos de Contacto

- **Email general**: `galeonadecadiz@yahoo.com`
- **Email contacto**: `contactenos@galeonadecadiz.org`
- **WhatsApp**: `311 252 4239`
- **Banco**: Davivienda
- **Cuenta**: Ahorros Empresarial No. 4507 000 70490
- **SWIFT/BIC**: `CAFECOBB`

## Lema Institucional

> Sapientia Ædificavit Sibi Domvn / La sabiduría edificó su casa
