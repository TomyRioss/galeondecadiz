import { NextRequest, NextResponse } from "next/server";
import nodemailer from "nodemailer";
// @ts-ignore
import { prisma } from "@/lib/prisma";

function createTransport() {
  return nodemailer.createTransport({
    service: "gmail",
    auth: {
      user: process.env.SMTP_EMAIL!,
      pass: process.env.SMTP_PASSWORD!,
    },
  });
}

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const { type } = body;
    const to = process.env.SMTP_DESTINATARIO!;
    const transporter = createTransport();

    // --- Test con datos del formulario (sin recordId) ---
    if (type === "donacion_form") {
      const fd = body.formData;
      if (!fd) return NextResponse.json({ error: "formData requerido" }, { status: 400 });
      const monto = fd.amount ? `$${Number(fd.amount).toLocaleString("es-CO")} COP` : "—";

      await transporter.sendMail({
        from: process.env.SMTP_EMAIL,
        to,
        subject: `[TEST] Confirmación donación — ${fd.fullName}`,
        html: `
          <div style="font-family: Georgia, serif; color: #1A3A5C; max-width: 600px; margin: 0 auto; padding: 24px; border: 2px solid #B87333; border-radius: 12px;">
            <p style="font-size:11px;color:#E8511A;margin-bottom:16px;">⚠️ EMAIL DE PRUEBA — datos del formulario</p>
            <h1 style="font-size: 22px; color: #1A3A5C;">¡Gracias, ${fd.fullName}!</h1>
            <p style="color: #1B6CA8;">Hemos recibido tu donación de <strong>${monto}</strong>.</p>
            <p style="color: #1B6CA8;">Tu generosidad contribuye directamente a nuestra misión. La Fundación Galeona de Cádiz te agradece profundamente.</p>
            ${fd.message ? `<blockquote style="border-left: 3px solid #B87333; padding-left: 12px; color: #1B6CA8;">${fd.message}</blockquote>` : ""}
            <hr style="border-color: #B87333; margin: 24px 0;" />
            <table style="width:100%;border-collapse:collapse;">
              <tr><td style="padding:6px;color:#B87333;font-weight:bold;">Nombre</td><td style="padding:6px;color:#1B6CA8;">${fd.fullName}</td></tr>
              <tr><td style="padding:6px;color:#B87333;font-weight:bold;">Email</td><td style="padding:6px;color:#1B6CA8;">${fd.email}</td></tr>
              <tr><td style="padding:6px;color:#B87333;font-weight:bold;">Teléfono</td><td style="padding:6px;color:#1B6CA8;">${fd.phone ?? "—"}</td></tr>
              <tr><td style="padding:6px;color:#B87333;font-weight:bold;">Monto</td><td style="padding:6px;color:#1B6CA8;">${monto}</td></tr>
            </table>
          </div>
        `,
      });
      return NextResponse.json({ ok: true });
    }

    // --- Test con registro de DB ---
    const { recordId } = body;

    if (type === "donacion") {
      const d = await prisma.donation.findUnique({ where: { id: recordId } });
      if (!d) return NextResponse.json({ error: "Donación no encontrada" }, { status: 404 });
      const monto = d.amount ? `$${Number(d.amount).toLocaleString("es-CO")} COP` : "—";

      await transporter.sendMail({
        from: process.env.SMTP_EMAIL,
        to,
        subject: `[TEST] Gracias por tu donación — ${d.fullName}`,
        html: `
          <div style="font-family: Georgia, serif; color: #1A3A5C; max-width: 600px; margin: 0 auto; padding: 24px; border: 2px solid #B87333; border-radius: 12px;">
            <p style="font-size:11px;color:#E8511A;margin-bottom:16px;">⚠️ EMAIL DE PRUEBA — no enviado al donante real</p>
            <h1 style="font-size: 22px; color: #1A3A5C;">¡Gracias, ${d.fullName}!</h1>
            <p style="color: #1B6CA8;">Hemos recibido tu donación de <strong>${monto}</strong>.</p>
            <p style="color: #1B6CA8;">Tu generosidad contribuye directamente a nuestra misión.</p>
            ${d.message ? `<blockquote style="border-left: 3px solid #B87333; padding-left: 12px; color: #1B6CA8;">${d.message}</blockquote>` : ""}
            <hr style="border-color: #B87333; margin: 24px 0;" />
            <table style="width:100%;border-collapse:collapse;">
              <tr><td style="padding:6px;color:#B87333;font-weight:bold;">Nombre</td><td style="padding:6px;color:#1B6CA8;">${d.fullName}</td></tr>
              <tr><td style="padding:6px;color:#B87333;font-weight:bold;">Email</td><td style="padding:6px;color:#1B6CA8;">${d.email}</td></tr>
              <tr><td style="padding:6px;color:#B87333;font-weight:bold;">Teléfono</td><td style="padding:6px;color:#1B6CA8;">${d.phone ?? "—"}</td></tr>
              <tr><td style="padding:6px;color:#B87333;font-weight:bold;">Monto</td><td style="padding:6px;color:#1B6CA8;">${monto}</td></tr>
              <tr><td style="padding:6px;color:#B87333;font-weight:bold;">Ref.</td><td style="padding:6px;color:#1B6CA8;">${d.id}</td></tr>
            </table>
          </div>
        `,
      });
      return NextResponse.json({ ok: true });
    }

    if (type === "pedido") {
      const o = await prisma.order.findUnique({
        where: { id: recordId },
        include: { book: { select: { nombre: true, autor: true } } },
      });
      if (!o) return NextResponse.json({ error: "Pedido no encontrado" }, { status: 404 });
      const monto = o.moneda === "COP"
        ? `$${Number(o.monto).toLocaleString("es-CO")} COP`
        : `$${Number(o.monto).toFixed(2)} USD`;

      await transporter.sendMail({
        from: process.env.SMTP_EMAIL,
        to,
        subject: `[TEST] Confirmación de compra — ${o.book?.nombre ?? "Libro"}`,
        html: `
          <div style="font-family: Georgia, serif; color: #1B6CA8; max-width: 600px; margin: 0 auto; padding: 24px; border: 2px solid #B87333; border-radius: 12px;">
            <p style="font-size:11px;color:#E8511A;margin-bottom:16px;">⚠️ EMAIL DE PRUEBA — no enviado al comprador real</p>
            <h1 style="font-size: 22px; color: #1A3A5C;">¡Gracias por tu compra, ${o.buyerName}!</h1>
            <p>Hemos recibido tu pago de <strong>${monto}</strong> por el libro:</p>
            <h2 style="color: #B87333;">${o.book?.nombre ?? "—"}</h2>
            <p style="color: #1B6CA8;">Autor: ${o.book?.autor ?? "—"}</p>
            <hr style="border-color: #B87333; margin: 24px 0;" />
            <table style="width:100%;border-collapse:collapse;">
              <tr><td style="padding:6px;color:#B87333;font-weight:bold;">Comprador</td><td style="padding:6px;color:#1B6CA8;">${o.buyerName}</td></tr>
              <tr><td style="padding:6px;color:#B87333;font-weight:bold;">Email</td><td style="padding:6px;color:#1B6CA8;">${o.buyerEmail}</td></tr>
              <tr><td style="padding:6px;color:#B87333;font-weight:bold;">Monto</td><td style="padding:6px;color:#1B6CA8;">${monto}</td></tr>
              <tr><td style="padding:6px;color:#B87333;font-weight:bold;">Estado</td><td style="padding:6px;color:#1B6CA8;">${o.estado}</td></tr>
              <tr><td style="padding:6px;color:#B87333;font-weight:bold;">Pedido #</td><td style="padding:6px;color:#1B6CA8;">${o.id.slice(0, 8)}</td></tr>
            </table>
          </div>
        `,
      });
      return NextResponse.json({ ok: true });
    }

    return NextResponse.json({ error: "Tipo inválido" }, { status: 400 });
  } catch (err) {
    console.error("[admin/test-email]", err);
    return NextResponse.json({ error: "Error al enviar" }, { status: 500 });
  }
}
