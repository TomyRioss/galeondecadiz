# Tienda E-commerce Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Agregar sección /tienda con catálogo de libros, checkout MercadoPago, y entrega de PDF + recibo por email post-pago.

**Architecture:** Prisma ORM sobre Supabase PostgreSQL. Tablas `Book` y `Order`. API Routes Next.js para checkout y webhook. Supabase Storage para PDFs y portadas. Email con Resend post-pago con link firmado de descarga.

**Tech Stack:** Prisma, MercadoPago SDK (`mercadopago`), Resend, @supabase/supabase-js, Next.js App Router API Routes, Tailwind CSS 4, shadcn/ui

---

## File Map

| Archivo | Acción | Responsabilidad |
|---|---|---|
| `prisma/schema.prisma` | Crear | Schema DB: Book + Order |
| `.env.example` | Crear | Variables de entorno requeridas |
| `lib/prisma.ts` | Crear | Singleton PrismaClient |
| `lib/mercadopago.ts` | Crear | Init SDK MP + crear preferencia |
| `lib/email.ts` | Crear | Envío email post-pago con Resend |
| `lib/supabase-server.ts` | Crear | Client Supabase server-side + signed URL |
| `app/tienda/page.tsx` | Crear | Catálogo (listado de libros activos) |
| `app/tienda/[slug]/page.tsx` | Crear | Detalle libro + formulario checkout |
| `app/tienda/confirmacion/page.tsx` | Crear | Post-pago: éxito o fallo |
| `app/tienda/pedido/page.tsx` | Crear | Lookup de orden por email + ID |
| `app/tienda/soporte/page.tsx` | Crear | Página estática WhatsApp soporte |
| `app/tienda/ebook/page.tsx` | Crear | Redirige a /tienda (filtro ebook) |
| `app/tienda/comprar-libro/page.tsx` | Crear | Redirige a /tienda (filtro impreso) |
| `app/api/checkout/route.ts` | Crear | POST: crea Order + preferencia MP |
| `app/api/webhook/mercadopago/route.ts` | Crear | POST: recibe notif MP, confirma pago, envía email |
| `app/components/tienda/BookCard.tsx` | Crear | Card individual de libro |
| `app/components/tienda/BookGrid.tsx` | Crear | Grid responsivo de BookCards |
| `app/components/tienda/CheckoutForm.tsx` | Crear | Form: nombre, email, moneda → POST /api/checkout |

---

## Task 1: Instalar dependencias y setup Prisma

**Files:**
- Create: `prisma/schema.prisma`
- Create: `.env.example`
- Modify: `package.json` (dependencias nuevas)

- [ ] **Step 1: Instalar dependencias**

```bash
cd C:\Users\Pc\Desktop\clientes\galeoncadiz
npm install @prisma/client mercadopago resend @supabase/supabase-js
npm install -D prisma
```

Expected: packages instalados sin errores.

- [ ] **Step 2: Inicializar Prisma**

```bash
npx prisma init --datasource-provider postgresql
```

Expected: crea `prisma/schema.prisma` y `.env` con `DATABASE_URL` placeholder.

- [ ] **Step 3: Reemplazar schema.prisma con el schema completo**

Reemplazar contenido de `prisma/schema.prisma`:

```prisma
generator client {
  provider = "prisma-client-js"
}

datasource db {
  provider  = "postgresql"
  url       = env("DATABASE_URL")
  directUrl = env("DIRECT_URL")
}

model Book {
  id          String   @id @default(cuid())
  slug        String   @unique
  nombre      String
  autor       String
  descripcion String   @db.Text
  precioCop   Decimal  @db.Decimal(12, 2)
  precioUsd   Decimal  @db.Decimal(10, 2)
  pdfUrl      String
  coverUrl    String
  activo      Boolean  @default(true)
  tipo        BookTipo @default(IMPRESO)
  createdAt   DateTime @default(now())
  orders      Order[]
}

model Order {
  id             String      @id @default(cuid())
  bookId         String
  book           Book        @relation(fields: [bookId], references: [id])
  buyerName      String
  buyerEmail     String
  monto          Decimal     @db.Decimal(12, 2)
  moneda         String
  estado         OrderStatus @default(PENDING)
  mpPaymentId    String?
  mpPreferenceId String?
  emailEnviado   Boolean     @default(false)
  createdAt      DateTime    @default(now())
}

enum OrderStatus {
  PENDING
  PAID
  FAILED
}

enum BookTipo {
  IMPRESO
  EBOOK
  AMBOS
}
```

- [ ] **Step 4: Crear .env.example**

Crear archivo `.env.example` en raíz del proyecto:

```env
# Supabase / Prisma
DATABASE_URL="postgresql://postgres.[project-ref]:[password]@aws-0-us-east-1.pooler.supabase.com:6543/postgres?pgbouncer=true"
DIRECT_URL="postgresql://postgres.[project-ref]:[password]@aws-0-us-east-1.pooler.supabase.com:5432/postgres"

# Supabase Storage (Admin)
NEXT_PUBLIC_SUPABASE_URL=https://[project-ref].supabase.co
NEXT_PUBLIC_SUPABASE_ANON_KEY=
SUPABASE_SERVICE_ROLE_KEY=

# MercadoPago
MERCADOPAGO_ACCESS_TOKEN=
MERCADOPAGO_WEBHOOK_SECRET=

# Email (Resend)
RESEND_API_KEY=

# App
NEXT_PUBLIC_BASE_URL=http://localhost:3000
```

- [ ] **Step 5: Agregar .env a .gitignore**

Verificar que `.gitignore` tenga estas líneas (agregar si no existen):

```
.env
.env.local
```

- [ ] **Step 6: Commit**

```bash
git add prisma/schema.prisma .env.example package.json package-lock.json
git commit -m "feat: add prisma schema for Book and Order"
```

---

## Task 2: Lib helpers (prisma, supabase, mercadopago, email)

**Files:**
- Create: `lib/prisma.ts`
- Create: `lib/supabase-server.ts`
- Create: `lib/mercadopago.ts`
- Create: `lib/email.ts`

- [ ] **Step 1: Crear lib/prisma.ts**

```typescript
import { PrismaClient } from "@prisma/client";

const globalForPrisma = globalThis as unknown as { prisma: PrismaClient };

export const prisma =
  globalForPrisma.prisma ?? new PrismaClient({ log: ["error"] });

if (process.env.NODE_ENV !== "production") globalForPrisma.prisma = prisma;
```

- [ ] **Step 2: Crear lib/supabase-server.ts**

```typescript
import { createClient } from "@supabase/supabase-js";

export function getSupabaseAdmin() {
  const url = process.env.NEXT_PUBLIC_SUPABASE_URL!;
  const key = process.env.SUPABASE_SERVICE_ROLE_KEY!;
  return createClient(url, key);
}

export async function getSignedPdfUrl(
  pdfPath: string,
  expiresInSeconds = 86400
): Promise<string> {
  const supabase = getSupabaseAdmin();
  const { data, error } = await supabase.storage
    .from("pdfs")
    .createSignedUrl(pdfPath, expiresInSeconds);

  if (error || !data?.signedUrl) {
    throw new Error(`Error generando URL firmada: ${error?.message}`);
  }
  return data.signedUrl;
}
```

- [ ] **Step 3: Crear lib/mercadopago.ts**

```typescript
import MercadoPago from "mercadopago";

let mpInstance: MercadoPago | null = null;

export function getMercadoPago(): MercadoPago {
  if (!mpInstance) {
    mpInstance = new MercadoPago({ accessToken: process.env.MERCADOPAGO_ACCESS_TOKEN! });
  }
  return mpInstance;
}

export interface CreatePreferenceParams {
  bookNombre: string;
  bookSlug: string;
  monto: number;
  moneda: string;
  buyerEmail: string;
  orderId: string;
}

export async function createPreference(params: CreatePreferenceParams) {
  const mp = getMercadoPago();
  const baseUrl = process.env.NEXT_PUBLIC_BASE_URL!;

  const preference = await mp.preferences.create({
    body: {
      items: [
        {
          id: params.bookSlug,
          title: params.bookNombre,
          quantity: 1,
          unit_price: params.monto,
          currency_id: params.moneda === "USD" ? "USD" : "COP",
        },
      ],
      payer: { email: params.buyerEmail },
      back_urls: {
        success: `${baseUrl}/tienda/confirmacion?order_id=${params.orderId}&status=success`,
        failure: `${baseUrl}/tienda/confirmacion?order_id=${params.orderId}&status=failure`,
        pending: `${baseUrl}/tienda/confirmacion?order_id=${params.orderId}&status=pending`,
      },
      auto_return: "approved",
      notification_url: `${baseUrl}/api/webhook/mercadopago`,
      external_reference: params.orderId,
    },
  });

  return preference;
}
```

- [ ] **Step 4: Crear lib/email.ts**

```typescript
import { Resend } from "resend";

const resend = new Resend(process.env.RESEND_API_KEY!);

export interface OrderEmailParams {
  buyerName: string;
  buyerEmail: string;
  bookNombre: string;
  bookAutor: string;
  monto: number;
  moneda: string;
  orderId: string;
  pdfSignedUrl: string;
}

export async function sendOrderConfirmationEmail(params: OrderEmailParams) {
  const montoFormatted =
    params.moneda === "COP"
      ? `$${params.monto.toLocaleString("es-CO")} COP`
      : `$${params.monto.toFixed(2)} USD`;

  const { data, error } = await resend.emails.send({
    from: "Tienda Galeona <tienda@galeonadecadiz.org>",
    to: [params.buyerEmail],
    subject: `Confirmación de compra — ${params.bookNombre}`,
    html: `
      <div style="font-family: Georgia, serif; color: #1B6CA8; max-width: 600px; margin: 0 auto; padding: 24px;">
        <h1 style="font-size: 22px; color: #1A3A5C;">¡Gracias por tu compra, ${params.buyerName}!</h1>
        <p>Hemos recibido tu pago de <strong>${montoFormatted}</strong> por el libro:</p>
        <h2 style="color: #B87333;">${params.bookNombre}</h2>
        <p style="color: #555;">Autor: ${params.bookAutor}</p>
        <hr style="border-color: #B87333; margin: 24px 0;" />
        <h3 style="color: #1A3A5C;">Descarga tu e-book</h3>
        <p>El siguiente enlace estará disponible por <strong>24 horas</strong>:</p>
        <a href="${params.pdfSignedUrl}"
           style="display:inline-block; background: linear-gradient(135deg,#E8511A,#B87333); color:#fff; padding:12px 24px; border-radius:6px; text-decoration:none; font-weight:bold;">
          Descargar PDF
        </a>
        <hr style="border-color: #B87333; margin: 24px 0;" />
        <h3 style="color: #1A3A5C;">Envío del libro físico</h3>
        <p>Tu ejemplar impreso está siendo preparado. Recibirás otro correo con el número de guía en los próximos <strong>3 a 5 días hábiles</strong>.</p>
        <p style="font-size:12px; color:#888;">Número de pedido: ${params.orderId}</p>
      </div>
    `,
  });

  if (error) {
    console.error("Error enviando email de confirmación:", error);
    throw new Error(`Email error: ${error.message}`);
  }

  return data;
}
```

- [ ] **Step 5: Commit**

```bash
git add lib/
git commit -m "feat: add lib helpers for prisma, supabase, mercadopago and email"
```

---

## Task 3: API Route — Checkout

**Files:**
- Create: `app/api/checkout/route.ts`

- [ ] **Step 1: Crear app/api/checkout/route.ts**

```typescript
import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { createPreference } from "@/lib/mercadopago";

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const { bookSlug, buyerName, buyerEmail, moneda } = body as {
      bookSlug: string;
      buyerName: string;
      buyerEmail: string;
      moneda: "COP" | "USD";
    };

    if (!bookSlug || !buyerName || !buyerEmail || !moneda) {
      return NextResponse.json({ error: "Campos requeridos faltantes" }, { status: 400 });
    }

    const book = await prisma.book.findUnique({ where: { slug: bookSlug } });
    if (!book || !book.activo) {
      return NextResponse.json({ error: "Libro no encontrado" }, { status: 404 });
    }

    const monto = moneda === "COP"
      ? Number(book.precioCop)
      : Number(book.precioUsd);

    const order = await prisma.order.create({
      data: {
        bookId: book.id,
        buyerName,
        buyerEmail,
        monto,
        moneda,
        estado: "PENDING",
      },
    });

    const preference = await createPreference({
      bookNombre: book.nombre,
      bookSlug: book.slug,
      monto,
      moneda,
      buyerEmail,
      orderId: order.id,
    });

    await prisma.order.update({
      where: { id: order.id },
      data: { mpPreferenceId: preference.id ?? null },
    });

    return NextResponse.json({
      orderId: order.id,
      initPoint: preference.init_point,
      sandboxInitPoint: preference.sandbox_init_point,
    });
  } catch (err) {
    console.error("Checkout error:", err);
    return NextResponse.json({ error: "Error interno del servidor" }, { status: 500 });
  }
}
```

- [ ] **Step 2: Commit**

```bash
git add app/api/checkout/
git commit -m "feat: add checkout API route"
```

---

## Task 4: API Route — Webhook MercadoPago

**Files:**
- Create: `app/api/webhook/mercadopago/route.ts`

- [ ] **Step 1: Crear app/api/webhook/mercadopago/route.ts**

```typescript
import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { getMercadoPago } from "@/lib/mercadopago";
import { getSignedPdfUrl } from "@/lib/supabase-server";
import { sendOrderConfirmationEmail } from "@/lib/email";

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();

    // MP envía type=payment con data.id
    if (body.type !== "payment" || !body.data?.id) {
      return NextResponse.json({ received: true });
    }

    const mp = getMercadoPago();
    const payment = await mp.payments.get({ id: body.data.id });

    if (!payment || payment.status !== "approved") {
      return NextResponse.json({ received: true });
    }

    const orderId = payment.external_reference;
    if (!orderId) return NextResponse.json({ received: true });

    const order = await prisma.order.findUnique({
      where: { id: orderId },
      include: { book: true },
    });

    if (!order || order.estado === "PAID") {
      return NextResponse.json({ received: true });
    }

    await prisma.order.update({
      where: { id: orderId },
      data: {
        estado: "PAID",
        mpPaymentId: String(payment.id),
      },
    });

    // pdfUrl en DB es el path dentro del bucket: "libros/mi-libro.pdf"
    if (!order.emailEnviado) {
      const pdfSignedUrl = await getSignedPdfUrl(order.book.pdfUrl);
      await sendOrderConfirmationEmail({
        buyerName: order.buyerName,
        buyerEmail: order.buyerEmail,
        bookNombre: order.book.nombre,
        bookAutor: order.book.autor,
        monto: Number(order.monto),
        moneda: order.moneda,
        orderId: order.id,
        pdfSignedUrl,
      });
      await prisma.order.update({
        where: { id: orderId },
        data: { emailEnviado: true },
      });
    }

    return NextResponse.json({ received: true });
  } catch (err) {
    console.error("Webhook MP error:", err);
    return NextResponse.json({ error: "Internal error" }, { status: 500 });
  }
}
```

- [ ] **Step 2: Commit**

```bash
git add app/api/webhook/
git commit -m "feat: add mercadopago webhook handler"
```

---

## Task 5: Componentes UI — BookCard y BookGrid

**Files:**
- Create: `app/components/tienda/BookCard.tsx`
- Create: `app/components/tienda/BookGrid.tsx`
- Create: `app/components/tienda/CheckoutForm.tsx`

- [ ] **Step 1: Crear app/components/tienda/BookCard.tsx**

```typescript
"use client";

import Image from "next/image";
import Link from "next/link";

interface BookCardProps {
  slug: string;
  nombre: string;
  autor: string;
  descripcion: string;
  precioCop: number;
  precioUsd: number;
  coverUrl: string;
}

export default function BookCard({
  slug,
  nombre,
  autor,
  descripcion,
  precioCop,
  precioUsd,
  coverUrl,
}: BookCardProps) {
  return (
    <Link href={`/tienda/${slug}`} className="group block">
      <div
        className="rounded-xl overflow-hidden border-2 transition-transform duration-200 group-hover:-translate-y-1"
        style={{ borderColor: "#B87333", background: "linear-gradient(135deg, #e8dfc4 0%, #d4c9a8 100%)" }}
      >
        <div className="relative w-full h-56 overflow-hidden">
          <Image
            src={coverUrl}
            alt={`Portada de ${nombre}`}
            fill
            className="object-cover transition-transform duration-300 group-hover:scale-105"
            sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
          />
        </div>
        <div className="p-4 flex flex-col gap-2">
          <h3
            className="text-lg font-semibold leading-tight"
            style={{ fontFamily: "var(--font-cinzel, serif)", color: "#1A3A5C" }}
          >
            {nombre}
          </h3>
          <p className="text-sm" style={{ color: "#1B6CA8" }}>
            {autor}
          </p>
          <p
            className="text-sm line-clamp-3"
            style={{ color: "#1B6CA8", fontFamily: "var(--font-lora, serif)" }}
          >
            {descripcion}
          </p>
          <div className="mt-2 flex flex-col gap-1">
            <span className="text-sm font-bold" style={{ color: "#B87333" }}>
              ${precioCop.toLocaleString("es-CO")} COP
            </span>
            <span className="text-xs" style={{ color: "#1B6CA8" }}>
              ${precioUsd.toFixed(2)} USD
            </span>
          </div>
          <div
            className="mt-3 w-full py-2 rounded-lg text-center text-white text-sm font-semibold"
            style={{ background: "linear-gradient(135deg, #E8511A, #B87333)" }}
          >
            Ver libro
          </div>
        </div>
      </div>
    </Link>
  );
}
```

- [ ] **Step 2: Crear app/components/tienda/BookGrid.tsx**

```typescript
import BookCard from "./BookCard";

interface Book {
  id: string;
  slug: string;
  nombre: string;
  autor: string;
  descripcion: string;
  precioCop: number;
  precioUsd: number;
  coverUrl: string;
}

interface BookGridProps {
  books: Book[];
}

export default function BookGrid({ books }: BookGridProps) {
  if (books.length === 0) {
    return (
      <div className="text-center py-20">
        <p style={{ color: "#1B6CA8", fontFamily: "var(--font-lora, serif)" }}>
          No hay libros disponibles por el momento.
        </p>
      </div>
    );
  }

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
      {books.map((book) => (
        <BookCard key={book.id} {...book} />
      ))}
    </div>
  );
}
```

- [ ] **Step 3: Crear app/components/tienda/CheckoutForm.tsx**

```typescript
"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";

interface CheckoutFormProps {
  bookSlug: string;
  precioCop: number;
  precioUsd: number;
}

export default function CheckoutForm({ bookSlug, precioCop, precioUsd }: CheckoutFormProps) {
  const router = useRouter();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [form, setForm] = useState({
    buyerName: "",
    buyerEmail: "",
    moneda: "COP" as "COP" | "USD",
  });

  const monto = form.moneda === "COP" ? precioCop : precioUsd;
  const montoLabel =
    form.moneda === "COP"
      ? `$${precioCop.toLocaleString("es-CO")} COP`
      : `$${precioUsd.toFixed(2)} USD`;

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setError(null);
    setLoading(true);

    try {
      const res = await fetch("/api/checkout", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ bookSlug, ...form }),
      });

      const data = await res.json();

      if (!res.ok) {
        setError(data.error ?? "Error al procesar el pago");
        return;
      }

      // Redirigir a MercadoPago
      const url =
        process.env.NODE_ENV === "production"
          ? data.initPoint
          : data.sandboxInitPoint ?? data.initPoint;

      router.push(url);
    } catch {
      setError("Error de conexión. Intentá de nuevo.");
    } finally {
      setLoading(false);
    }
  }

  return (
    <form onSubmit={handleSubmit} className="flex flex-col gap-4">
      <div>
        <label
          className="block text-sm font-semibold mb-1"
          style={{ color: "#1A3A5C", fontFamily: "var(--font-cinzel, serif)" }}
        >
          Nombre completo
        </label>
        <input
          type="text"
          required
          value={form.buyerName}
          onChange={(e) => setForm((f) => ({ ...f, buyerName: e.target.value }))}
          className="w-full border-2 rounded-lg px-3 py-2 text-sm outline-none focus:ring-2"
          style={{ borderColor: "#B87333", background: "#fdf8f0", color: "#1A3A5C" }}
          placeholder="Tu nombre completo"
        />
      </div>

      <div>
        <label
          className="block text-sm font-semibold mb-1"
          style={{ color: "#1A3A5C", fontFamily: "var(--font-cinzel, serif)" }}
        >
          Correo electrónico
        </label>
        <input
          type="email"
          required
          value={form.buyerEmail}
          onChange={(e) => setForm((f) => ({ ...f, buyerEmail: e.target.value }))}
          className="w-full border-2 rounded-lg px-3 py-2 text-sm outline-none focus:ring-2"
          style={{ borderColor: "#B87333", background: "#fdf8f0", color: "#1A3A5C" }}
          placeholder="tu@correo.com"
        />
      </div>

      <div>
        <label
          className="block text-sm font-semibold mb-1"
          style={{ color: "#1A3A5C", fontFamily: "var(--font-cinzel, serif)" }}
        >
          Moneda
        </label>
        <select
          value={form.moneda}
          onChange={(e) => setForm((f) => ({ ...f, moneda: e.target.value as "COP" | "USD" }))}
          className="w-full border-2 rounded-lg px-3 py-2 text-sm outline-none"
          style={{ borderColor: "#B87333", background: "#fdf8f0", color: "#1A3A5C" }}
        >
          <option value="COP">Pesos colombianos (COP)</option>
          <option value="USD">Dólares (USD)</option>
        </select>
      </div>

      {error && (
        <div className="rounded-lg px-4 py-3 text-sm text-white" style={{ background: "#C0392B" }}>
          {error}
        </div>
      )}

      <button
        type="submit"
        disabled={loading}
        className="w-full py-3 rounded-lg text-white font-semibold text-base transition-opacity disabled:opacity-60"
        style={{ background: "linear-gradient(135deg, #E8511A, #B87333)" }}
      >
        {loading ? "Redirigiendo..." : `Pagar ${montoLabel}`}
      </button>
    </form>
  );
}
```

- [ ] **Step 4: Commit**

```bash
git add app/components/tienda/
git commit -m "feat: add BookCard, BookGrid and CheckoutForm components"
```

---

## Task 6: Páginas — Catálogo, Detalle, Confirmación, Pedido, Soporte

**Files:**
- Create: `app/tienda/page.tsx`
- Create: `app/tienda/[slug]/page.tsx`
- Create: `app/tienda/confirmacion/page.tsx`
- Create: `app/tienda/pedido/page.tsx`
- Create: `app/tienda/soporte/page.tsx`
- Create: `app/tienda/ebook/page.tsx`
- Create: `app/tienda/comprar-libro/page.tsx`

- [ ] **Step 1: Crear app/tienda/page.tsx**

```typescript
import { prisma } from "@/lib/prisma";
import BookGrid from "@/app/components/tienda/BookGrid";

export const dynamic = "force-dynamic";

export default async function TiendaPage() {
  const books = await prisma.book.findMany({
    where: { activo: true },
    orderBy: { createdAt: "desc" },
  });

  const booksForGrid = books.map((b) => ({
    id: b.id,
    slug: b.slug,
    nombre: b.nombre,
    autor: b.autor,
    descripcion: b.descripcion,
    precioCop: Number(b.precioCop),
    precioUsd: Number(b.precioUsd),
    coverUrl: b.coverUrl,
  }));

  return (
    <div style={{ background: "#F5EDD6", minHeight: "100vh" }}>
      {/* Hero */}
      <section
        className="py-16 px-6 text-center"
        style={{ background: "#1A3A5C" }}
      >
        <h1
          className="text-4xl md:text-5xl font-bold text-white mb-4"
          style={{ fontFamily: "var(--font-cinzel, serif)" }}
        >
          Tienda
        </h1>
        <p
          className="text-lg max-w-xl mx-auto"
          style={{ color: "#d4c9a8", fontFamily: "var(--font-lora, serif)" }}
        >
          Libros y publicaciones del Fondo Editorial Galeona de Cádiz
        </p>
      </section>

      {/* Catálogo */}
      <section className="max-w-6xl mx-auto px-6 py-12">
        <BookGrid books={booksForGrid} />
      </section>
    </div>
  );
}
```

- [ ] **Step 2: Crear app/tienda/[slug]/page.tsx**

```typescript
import { notFound } from "next/navigation";
import Image from "next/image";
import { prisma } from "@/lib/prisma";
import CheckoutForm from "@/app/components/tienda/CheckoutForm";

export const dynamic = "force-dynamic";

interface Props {
  params: { slug: string };
}

export default async function BookDetailPage({ params }: Props) {
  const book = await prisma.book.findUnique({
    where: { slug: params.slug },
  });

  if (!book || !book.activo) notFound();

  return (
    <div style={{ background: "#F5EDD6", minHeight: "100vh" }}>
      {/* Hero */}
      <section className="py-12 px-6" style={{ background: "#1A3A5C" }}>
        <div className="max-w-5xl mx-auto flex flex-col md:flex-row gap-10 items-start">
          <div className="relative w-full md:w-64 h-80 flex-shrink-0 rounded-xl overflow-hidden shadow-xl">
            <Image
              src={book.coverUrl}
              alt={`Portada de ${book.nombre}`}
              fill
              className="object-cover"
            />
          </div>
          <div className="flex flex-col gap-3">
            <h1
              className="text-3xl md:text-4xl font-bold text-white"
              style={{ fontFamily: "var(--font-cinzel, serif)" }}
            >
              {book.nombre}
            </h1>
            <p style={{ color: "#d4c9a8" }}>{book.autor}</p>
            <p
              className="text-base leading-relaxed mt-2"
              style={{ color: "#e8dfc4", fontFamily: "var(--font-lora, serif)" }}
            >
              {book.descripcion}
            </p>
            <div className="mt-4 flex gap-6">
              <div>
                <p className="text-xs" style={{ color: "#d4c9a8" }}>Precio COP</p>
                <p className="text-2xl font-bold" style={{ color: "#B87333" }}>
                  ${Number(book.precioCop).toLocaleString("es-CO")}
                </p>
              </div>
              <div>
                <p className="text-xs" style={{ color: "#d4c9a8" }}>Precio USD</p>
                <p className="text-2xl font-bold" style={{ color: "#B87333" }}>
                  ${Number(book.precioUsd).toFixed(2)}
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Checkout */}
      <section className="max-w-md mx-auto px-6 py-12">
        <h2
          className="text-xl font-semibold mb-6"
          style={{ fontFamily: "var(--font-cinzel, serif)", color: "#1A3A5C" }}
        >
          Completar compra
        </h2>
        <CheckoutForm
          bookSlug={book.slug}
          precioCop={Number(book.precioCop)}
          precioUsd={Number(book.precioUsd)}
        />
      </section>
    </div>
  );
}
```

- [ ] **Step 3: Crear app/tienda/confirmacion/page.tsx**

```typescript
"use client";

import { useSearchParams } from "next/navigation";
import Link from "next/link";
import { Suspense } from "react";

function ConfirmacionContent() {
  const params = useSearchParams();
  const status = params.get("status");
  const orderId = params.get("order_id");

  const isSuccess = status === "success";
  const isPending = status === "pending";

  return (
    <div className="max-w-lg mx-auto px-6 py-20 text-center">
      {isSuccess && (
        <>
          <div className="text-6xl mb-6">✅</div>
          <h1
            className="text-3xl font-bold mb-4"
            style={{ fontFamily: "var(--font-cinzel, serif)", color: "#1A3A5C" }}
          >
            ¡Pago confirmado!
          </h1>
          <p style={{ color: "#1B6CA8", fontFamily: "var(--font-lora, serif)" }}>
            Revisá tu correo electrónico. Te enviamos el enlace de descarga del PDF y la información del envío físico.
          </p>
          {orderId && (
            <p className="mt-4 text-sm" style={{ color: "#888" }}>
              Pedido: {orderId}
            </p>
          )}
        </>
      )}

      {isPending && (
        <>
          <div className="text-6xl mb-6">⏳</div>
          <h1
            className="text-3xl font-bold mb-4"
            style={{ fontFamily: "var(--font-cinzel, serif)", color: "#1A3A5C" }}
          >
            Pago en proceso
          </h1>
          <p style={{ color: "#1B6CA8", fontFamily: "var(--font-lora, serif)" }}>
            Tu pago está siendo verificado. Te notificaremos por correo cuando se confirme.
          </p>
        </>
      )}

      {!isSuccess && !isPending && (
        <>
          <div className="text-6xl mb-6">❌</div>
          <h1
            className="text-3xl font-bold mb-4"
            style={{ fontFamily: "var(--font-cinzel, serif)", color: "#1A3A5C" }}
          >
            Pago no completado
          </h1>
          <p style={{ color: "#1B6CA8", fontFamily: "var(--font-lora, serif)" }}>
            No se procesó el pago. Podés intentarlo de nuevo.
          </p>
        </>
      )}

      <Link
        href="/tienda"
        className="inline-block mt-8 px-8 py-3 rounded-lg text-white font-semibold"
        style={{ background: "linear-gradient(135deg, #E8511A, #B87333)" }}
      >
        Volver a la tienda
      </Link>
    </div>
  );
}

export default function ConfirmacionPage() {
  return (
    <div style={{ background: "#F5EDD6", minHeight: "100vh" }}>
      <Suspense fallback={<div className="py-20 text-center" style={{ color: "#1B6CA8" }}>Cargando...</div>}>
        <ConfirmacionContent />
      </Suspense>
    </div>
  );
}
```

- [ ] **Step 4: Crear app/tienda/pedido/page.tsx**

```typescript
"use client";

import { useState } from "react";

interface OrderResult {
  id: string;
  estado: string;
  bookNombre: string;
  createdAt: string;
  moneda: string;
  monto: number;
}

export default function PedidoPage() {
  const [email, setEmail] = useState("");
  const [orderId, setOrderId] = useState("");
  const [result, setResult] = useState<OrderResult | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);

  async function handleSearch(e: React.FormEvent) {
    e.preventDefault();
    setError(null);
    setResult(null);
    setLoading(true);
    try {
      const res = await fetch(`/api/orders/lookup?email=${encodeURIComponent(email)}&orderId=${encodeURIComponent(orderId)}`);
      const data = await res.json();
      if (!res.ok) {
        setError(data.error ?? "Pedido no encontrado");
      } else {
        setResult(data);
      }
    } catch {
      setError("Error de conexión");
    } finally {
      setLoading(false);
    }
  }

  const estadoLabel: Record<string, string> = {
    PENDING: "Pendiente de pago",
    PAID: "Pago confirmado",
    FAILED: "Pago fallido",
  };

  return (
    <div style={{ background: "#F5EDD6", minHeight: "100vh" }}>
      <section className="py-12 px-6" style={{ background: "#1A3A5C" }}>
        <h1
          className="text-3xl font-bold text-white text-center"
          style={{ fontFamily: "var(--font-cinzel, serif)" }}
        >
          Registro de pedido
        </h1>
      </section>

      <section className="max-w-md mx-auto px-6 py-12">
        <form onSubmit={handleSearch} className="flex flex-col gap-4">
          <div>
            <label className="block text-sm font-semibold mb-1" style={{ color: "#1A3A5C", fontFamily: "var(--font-cinzel, serif)" }}>
              Correo electrónico
            </label>
            <input
              type="email"
              required
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="w-full border-2 rounded-lg px-3 py-2 text-sm"
              style={{ borderColor: "#B87333", background: "#fdf8f0", color: "#1A3A5C" }}
              placeholder="tu@correo.com"
            />
          </div>
          <div>
            <label className="block text-sm font-semibold mb-1" style={{ color: "#1A3A5C", fontFamily: "var(--font-cinzel, serif)" }}>
              Número de pedido
            </label>
            <input
              type="text"
              required
              value={orderId}
              onChange={(e) => setOrderId(e.target.value)}
              className="w-full border-2 rounded-lg px-3 py-2 text-sm"
              style={{ borderColor: "#B87333", background: "#fdf8f0", color: "#1A3A5C" }}
              placeholder="ID recibido por email"
            />
          </div>

          {error && (
            <div className="rounded-lg px-4 py-3 text-sm text-white" style={{ background: "#C0392B" }}>
              {error}
            </div>
          )}

          <button
            type="submit"
            disabled={loading}
            className="w-full py-3 rounded-lg text-white font-semibold disabled:opacity-60"
            style={{ background: "linear-gradient(135deg, #E8511A, #B87333)" }}
          >
            {loading ? "Buscando..." : "Consultar pedido"}
          </button>
        </form>

        {result && (
          <div
            className="mt-8 rounded-xl p-6 border-2"
            style={{ borderColor: "#B87333", background: "linear-gradient(135deg, #e8dfc4, #d4c9a8)" }}
          >
            <h2 className="font-bold text-lg mb-3" style={{ color: "#1A3A5C", fontFamily: "var(--font-cinzel, serif)" }}>
              {result.bookNombre}
            </h2>
            <p className="text-sm" style={{ color: "#1B6CA8" }}>
              Estado: <strong>{estadoLabel[result.estado] ?? result.estado}</strong>
            </p>
            <p className="text-sm mt-1" style={{ color: "#1B6CA8" }}>
              Monto: {result.moneda === "COP" ? `$${result.monto.toLocaleString("es-CO")} COP` : `$${result.monto.toFixed(2)} USD`}
            </p>
            <p className="text-xs mt-2" style={{ color: "#888" }}>
              Fecha: {new Date(result.createdAt).toLocaleDateString("es-CO")}
            </p>
          </div>
        )}
      </section>
    </div>
  );
}
```

- [ ] **Step 5: Crear app/tienda/soporte/page.tsx**

```typescript
import Link from "next/link";
import { FaWhatsapp } from "react-icons/fa6";

export default function SoportePage() {
  const whatsappUrl = "https://wa.me/573000000000?text=Hola,%20necesito%20ayuda%20con%20mi%20compra%20en%20la%20tienda%20Galeona%20de%20C%C3%A1diz";

  return (
    <div style={{ background: "#F5EDD6", minHeight: "100vh" }}>
      <section className="py-12 px-6" style={{ background: "#1A3A5C" }}>
        <h1
          className="text-3xl font-bold text-white text-center"
          style={{ fontFamily: "var(--font-cinzel, serif)" }}
        >
          Soporte de compras
        </h1>
      </section>

      <section className="max-w-lg mx-auto px-6 py-16 text-center">
        <p
          className="text-lg mb-8"
          style={{ color: "#1B6CA8", fontFamily: "var(--font-lora, serif)" }}
        >
          ¿Tenés algún problema con tu pedido o necesitás ayuda? Contactanos directamente por WhatsApp.
        </p>
        <Link
          href={whatsappUrl}
          target="_blank"
          rel="noopener noreferrer"
          className="inline-flex items-center gap-3 px-8 py-4 rounded-xl text-white font-semibold text-lg"
          style={{ background: "#2E6B3E" }}
        >
          <FaWhatsapp size={24} />
          Contactar por WhatsApp
        </Link>
        <p className="mt-6 text-sm" style={{ color: "#888" }}>
          Horario de atención: Lunes a Viernes 8:00 am – 6:00 pm (Colombia)
        </p>
      </section>
    </div>
  );
}
```

- [ ] **Step 6: Crear app/tienda/ebook/page.tsx y app/tienda/comprar-libro/page.tsx**

`app/tienda/ebook/page.tsx`:
```typescript
import { redirect } from "next/navigation";
export default function EbookPage() {
  redirect("/tienda");
}
```

`app/tienda/comprar-libro/page.tsx`:
```typescript
import { redirect } from "next/navigation";
export default function ComprarLibroPage() {
  redirect("/tienda");
}
```

- [ ] **Step 7: Commit**

```bash
git add app/tienda/
git commit -m "feat: add tienda pages (catalog, detail, confirmation, order lookup, support)"
```

---

## Task 7: API Route — Order Lookup

**Files:**
- Create: `app/api/orders/lookup/route.ts`

- [ ] **Step 1: Crear app/api/orders/lookup/route.ts**

```typescript
import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";

export async function GET(req: NextRequest) {
  const { searchParams } = new URL(req.url);
  const email = searchParams.get("email");
  const orderId = searchParams.get("orderId");

  if (!email || !orderId) {
    return NextResponse.json({ error: "Parámetros requeridos" }, { status: 400 });
  }

  const order = await prisma.order.findFirst({
    where: {
      id: orderId,
      buyerEmail: email,
    },
    include: { book: { select: { nombre: true } } },
  });

  if (!order) {
    return NextResponse.json({ error: "Pedido no encontrado" }, { status: 404 });
  }

  return NextResponse.json({
    id: order.id,
    estado: order.estado,
    bookNombre: order.book.nombre,
    moneda: order.moneda,
    monto: Number(order.monto),
    createdAt: order.createdAt,
  });
}
```

- [ ] **Step 2: Commit**

```bash
git add app/api/orders/
git commit -m "feat: add order lookup API route"
```

---

## Task 8: Push DB y verificación final

- [ ] **Step 1: Configurar .env con credenciales reales**

Copiar `.env.example` a `.env` y completar:
- `DATABASE_URL` y `DIRECT_URL` desde Supabase → Settings → Database → Connection string
- `NEXT_PUBLIC_SUPABASE_URL` y keys desde Supabase → Settings → API
- `MERCADOPAGO_ACCESS_TOKEN` desde MP → Credenciales (sandbox primero)
- `RESEND_API_KEY` desde resend.com → API Keys

- [ ] **Step 2: Generar Prisma client y hacer push**

```bash
npx prisma generate
npx prisma db push
```

Expected: `✔ Your database is now in sync with your Prisma schema.`

- [ ] **Step 3: Verificar tablas en Supabase**

Ir a Supabase → Table Editor. Verificar existencia de tablas `Book`, `Order` y enum types `OrderStatus`, `BookTipo`.

- [ ] **Step 4: Crear buckets en Supabase Storage**

En Supabase → Storage → New bucket:
1. Nombre: `covers` | Public: ✅
2. Nombre: `pdfs` | Public: ❌ (privado, acceso por signed URL)

- [ ] **Step 5: Correr dev y verificar /tienda**

```bash
npm run dev
```

Abrir http://localhost:3000/tienda — debe renderizar catálogo vacío sin errores.

- [ ] **Step 6: Insertar libro de prueba en Supabase**

En Supabase → Table Editor → Book → Insert row:
```json
{
  "slug": "libro-prueba",
  "nombre": "Libro de Prueba",
  "autor": "Autor Ejemplo",
  "descripcion": "Descripción de prueba",
  "precioCop": 45000,
  "precioUsd": 12.00,
  "pdfUrl": "libros/test.pdf",
  "coverUrl": "https://via.placeholder.com/400x600",
  "activo": true,
  "tipo": "AMBOS"
}
```

- [ ] **Step 7: Verificar flujo completo en sandbox**

1. `/tienda` → card del libro visible
2. Click → `/tienda/libro-prueba` → detail + form
3. Completar form → click Pagar → redirige a MP sandbox
4. Pagar con tarjeta de prueba MP → redirect a `/tienda/confirmacion?status=success`
5. Verificar email recibido con PDF link

---

## Notas de implementación

- **pdfUrl** en DB almacena el **path dentro del bucket** (`libros/mi-libro.pdf`), no la URL completa. `getSignedPdfUrl()` genera la URL firmada.
- **coverUrl** almacena la URL pública completa (bucket `covers` es público).
- El webhook de MP debe ser accesible públicamente. En desarrollo usar **ngrok** o similar: `ngrok http 3000` y configurar `NEXT_PUBLIC_BASE_URL` con la URL de ngrok.
- Credenciales MP: usar Access Token de **pruebas** hasta que el cliente entregue las productivas.
