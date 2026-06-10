# SPEC — Galeona de Cádiz Portal

## §G Goal

Modernizar `galeonadecadiz.org`: portal institucional con fondo editorial, tienda, e-book online, donaciones y panel admin. Evolución del portal actual — no reemplazo. Stack: Next.js App Router · Supabase · TypeScript · TailwindCSS · shadcn/ui.

---

## §C Constraints

- C1. Identidad visual: solo colores del design system (`docs/GALEONA_DESIGN_SYSTEM.md`). Fondo base Sicomoro `#F5EDD6`. Textos: Azul Institucional `#1B6CA8` o Blanco. Negro prohibido en piezas publicitarias.
- C2. No eliminar secciones actuales del portal — reorganizar y modernizar.
- C3. No cambios DB sin consentimiento explícito del usuario.
- C4. Ningún componente > 500 líneas. Modularizar antes de continuar.
- C5. Todo responsivo: mobile-first + desktop.
- C6. No CSS puro. No tocar `globals.css`. Solo TailwindCSS.
- C7. Componentes prefabricados → shadcn/ui.
- C8. Pasarela de pago pendiente hasta que cliente entregue credenciales. Hasta entonces: flujo "solicitud de compra" sin pago online.
- C9. Logo EDN en header pendiente de confirmación del cliente.
- C10. Texto de donaciones pendiente de entrega del cliente.
- C11. Material del libro (portada, PDF, precio final) pendiente de entrega del cliente.

---

## §I Interfaces

- I.supabase — Supabase (DB + Auth + Storage). Tablas: `books`, `orders`, `ebook_users`, `ebook_access_logs`, `donations`, `publication_requests`, `contact_requests`.
- I.auth — Supabase Auth con rol admin. Middleware Next.js protege `/admin/*`.
- I.whatsapp — `https://wa.me/[NUMERO]?text=[MENSAJE_CODIFICADO]`
- I.payment — MercadoPago / Wompi / PayU (pendiente credenciales cliente). Fase 1: sin integración real.
- I.storage — Supabase Storage para portada del libro + PDF e-book (no público).
- I.router — Next.js App Router. Rutas:
  - `/` Home
  - `/fondo-editorial` Listado editorial
  - `/fondo-editorial/[slug]` Ficha editorial (alias `/libros/[slug]`)
  - `/tienda` Tienda
  - `/tienda/checkout` Checkout
  - `/tienda/confirmacion` Confirmación pedido
  - `/ebook/[slug]` Visor e-book online
  - `/donaciones` Donaciones
  - `/admin` Panel admin
  - `/admin/libro` Gestión libro principal
  - `/admin/pedidos` Pedidos
  - `/admin/ebook` Lectores e-book
  - `/admin/ebook/historial` Historial accesos
  - `/admin/donaciones` Donaciones admin
  - `/admin/contactos` Contactos admin

---

## §V Invariants

- V1. Colores: solo paleta del design system. Nunca arbitrarios.
- V2. Rutas `/admin/*` deben estar protegidas por middleware con Supabase Auth. Sin sesión válida → redirect a login.
- V3. Email como identificador único en `ebook_users` (UNIQUE constraint en Supabase). Duplicado → actualizar `last_access_at`, no crear nuevo registro.
- V4. PDF del e-book no debe ser descargable públicamente. Solo accesible desde visor autenticado por formulario.
- V5. Toda acción de usuario con error debe mostrar feedback visual (toast / banner / mensaje inline).
- V6. Ningún componente supera 500 líneas. Si supera → modularizar.
- V7. Pasarela de pago no se integra hasta que el cliente entregue credenciales. El flujo de compra funciona como "solicitud de compra" hasta entonces.
- V8. Todo formulario de captura de datos debe incluir campo de aceptación de tratamiento de datos.

---

## §T Tasks

| id  | status | task                                              | cites         |
|-----|--------|---------------------------------------------------|---------------|
| T1  | x      | Header: agregar logo EDN (pendiente confirmación cliente) | C9, V1 |
| T2  | x      | Home: completar botón destacado Fondo Editorial (1 ítem faltante) | V1, V5 |
| T3  | x      | Home: completar bloque redes sociales (1 ítem faltante) | V1 |
| T4  | x      | Home: completar productos y actividades (1 ítem faltante) | V1 |
| T5  | x      | Home: completar footer institucional (1 ítem faltante) | V1 |
| T6  | x      | Crear página `/fondo-editorial` (listado editorial, libros destacados, accesos categorías) | V1, V5, C5 |
| T7  | x      | Crear bloque libros destacados con libro principal "Nuestra Señora de Chiquinquirá de La Estrella" | V1, C11 |
| T8  | x      | Conservar y reorganizar categorías: Canon Lector, Lienzos didácticos/Artium, Catálogo Wayuu/Artium, Guías/Scriptorium | V1, C2 |
| T9  | x      | Crear sección Canon Lector con acceso a fichas y solicitud impresas | V1, V5, I.supabase |
| T10 | x      | Crear formulario solicitud publicaciones impresas → tabla `publication_requests` | V5, V8, I.supabase |
| T11 | x      | Crear ficha editorial `/fondo-editorial/[slug]` con portada, info, destacados, botones | V1, V5, C5, I.supabase |
| T12 | x      | Ficha editorial: bloque de destacados editable (6 ítems) | V1, C11 |
| T13 | x      | Ficha editorial: botón "Comprar libro impreso" → redirige a checkout | V7, I.router |
| T14 | x      | Ficha editorial: botón "Leer e-book" → flujo formulario + visor | V3, V4, I.router |
| T15 | x      | Ficha editorial: botón "Ser donante" → redirige a `/donaciones` | I.router |
| T16 | x      | Ficha editorial: botón WhatsApp con mensaje prellenado | I.whatsapp |
| T17 | x      | Ficha editorial: responsive completo (mobile-first) | C5, V6 |
| T18 | x      | Crear tabla `books` en Supabase: id, title, subtitle, author, description, editorial, cover_image_url, canvas_image_url, price, available, shipping_info, slug, created_at, updated_at | I.supabase, C3 |
| T19 | x      | Crear página `/tienda` con producto principal, precio, disponibilidad, botón comprar, botón WhatsApp | V1, V7, C5 |
| T20 | x      | Crear tabla `products` en Supabase: id, book_id, price, stock, available, created_at, updated_at | I.supabase, C3 |
| T21 | x      | Crear página `/tienda/checkout` con formulario datos comprador | V5, V8, C5, I.supabase |
| T22 | x      | Crear tabla `orders` en Supabase: id, full_name, email, phone, city, country, address, quantity, observations, accepted_terms, status, payment_status, product_id, created_at | I.supabase, C3 |
| T23 | x      | Crear página `/tienda/confirmacion` con resumen pedido y botón WhatsApp soporte | V1, C5 |
| T24 | x      | Pasarela de pago: dejar estructura lista, sin integrar hasta credenciales del cliente | V7, I.payment |
| T25 | x      | Crear visor e-book `/ebook/[slug]` con formulario primer acceso y verificación recurrente | V3, V4, V5, V8, I.supabase |
| T26 | x      | Crear tabla `ebook_users` en Supabase (email UNIQUE, last_access_at) | I.supabase, V3, C3 |
| T27 | x      | Crear tabla `ebook_access_logs` en Supabase: id, ebook_user_id, book_id, access_date, source | I.supabase, C3 |
| T28 | x      | Lógica control duplicados e-book: email existe → actualizar last_access_at; no existe → formulario completo | V3, V5 |
| T29 | x      | Crear página `/donaciones` (conservar texto PDF actual, pending texto definitivo del cliente) | V1, C10, C5 |
| T30 | x      | Crear tabla `donations` en Supabase: id, full_name, email, phone, amount, message, status, created_at | I.supabase, C3 |
| T31 | x      | Crear login admin con Supabase Auth + middleware Next.js protección `/admin/*` | V2, I.auth |
| T32 | x      | Crear panel admin `/admin/libro`: ver y editar libro principal (título, subtítulo, descripción, autora, portada, precio, disponibilidad) | V2, V6, I.supabase |
| T33 | x      | Crear panel admin `/admin/pedidos`: lista pedidos con todos los campos | V2, V6, I.supabase |
| T34 | x      | Crear panel admin `/admin/ebook`: lista lectores e-book (nombre, correo, WhatsApp) | V2, V6, I.supabase |
| T35 | x      | Crear panel admin `/admin/ebook/historial`: historial accesos e-book | V2, V6, I.supabase |
| T36 | x      | Crear panel admin `/admin/donaciones`: lista donantes con estado y exportación | V2, V6, I.supabase |
| T37 | x      | Crear panel admin `/admin/contactos`: lista contactos con origen y exportación | V2, V6, I.supabase |
| T38 | x      | Crear tabla `contact_requests` en Supabase: id, full_name, email, phone, message, source, created_at | I.supabase, C3 |
| T39 | x      | Exportaciones CSV/Excel en todos los módulos del panel admin (pedidos, e-book, donaciones, contactos) | V2, V6 |
| T40 | x      | Registro de contacto WhatsApp → tabla `contact_requests` desde ficha, tienda, e-book, donaciones | V5, V8, I.supabase |

---

## §B Bugs

| id | date | cause | fix |
|----|------|-------|-----|
