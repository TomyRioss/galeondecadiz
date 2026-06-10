import { Resend } from "resend";

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
  const resend = new Resend(process.env.RESEND_API_KEY!);
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
        <p style="color: #1B6CA8;">Autor: ${params.bookAutor}</p>
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
        <p style="font-size:12px; color:#1B6CA8;">Número de pedido: ${params.orderId}</p>
      </div>
    `,
  });

  if (error) {
    console.error("Error enviando email de confirmación:", error);
    throw new Error(`Email error: ${error.message}`);
  }

  return data;
}
