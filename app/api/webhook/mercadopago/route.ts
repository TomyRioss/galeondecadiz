import { NextRequest, NextResponse } from "next/server";
import crypto from "crypto";
// @ts-ignore
import { prisma } from "@/lib/prisma";
import { Payment } from "mercadopago";
import { getMercadoPagoConfig } from "@/lib/mercadopago";
import { getSignedPdfUrl } from "@/lib/supabase-server";
import { sendOrderConfirmationEmail } from "@/lib/email";

function validateWebhookSignature(req: NextRequest, body: { data?: { id?: string | number } }): boolean {
  const secret = process.env.MERCADOPAGO_WEBHOOK_SECRET;
  if (!secret) return true;

  const xSignature = req.headers.get("x-signature");
  const xRequestId = req.headers.get("x-request-id");

  if (!xSignature || !xRequestId) return false;

  const signatureParts = Object.fromEntries(
    xSignature.split(",").map((part) => part.split("=") as [string, string])
  );
  const ts = signatureParts["ts"];
  const v1 = signatureParts["v1"];

  if (!ts || !v1) return false;

  const dataId = body.data?.id ?? "";
  const manifest = `id:${dataId};request-id:${xRequestId};ts:${ts};`;
  const hmac = crypto.createHmac("sha256", secret).update(manifest).digest("hex");

  return hmac === v1;
}

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();

    if (!validateWebhookSignature(req, body)) {
      console.warn("Webhook: invalid signature");
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    // MP sends type=payment with data.id
    if (body.type !== "payment" || !body.data?.id) {
      return NextResponse.json({ received: true });
    }

    const config = getMercadoPagoConfig();
    const paymentClient = new Payment(config);
    const payment = await paymentClient.get({ id: body.data.id });

    if (!payment || payment.status !== "approved") {
      return NextResponse.json({ received: true });
    }

    const externalRef = payment.external_reference;
    if (!externalRef) return NextResponse.json({ received: true });

    // Donation flow
    if (externalRef.startsWith("don_")) {
      const donationId = externalRef.slice(4);
      try {
        await (prisma as any).donation.updateMany({
          where: { id: donationId, status: { not: "paid" } },
          data: { status: "paid" },
        });
      } catch (e) {
        console.error("Webhook: donation update error", e);
      }
      return NextResponse.json({ received: true });
    }

    // Ebook order flow
    const orderId = externalRef;

    const order = await prisma.order.findUnique({
      where: { id: orderId },
      include: { book: true },
    });

    if (!order || order.estado === "PAID") {
      return NextResponse.json({ received: true });
    }

    if (!order.book) {
      console.error("Webhook: book not found for order", orderId);
      return NextResponse.json({ received: true });
    }

    await prisma.order.update({
      where: { id: orderId },
      data: {
        estado: "PAID",
        mpPaymentId: String(payment.id),
      },
    });

    const updated = await prisma.order.updateMany({
      where: { id: orderId, emailEnviado: false },
      data: { emailEnviado: true },
    });

    if (updated.count > 0) {
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
    }

    return NextResponse.json({ received: true });
  } catch (err) {
    console.error("Webhook MP error:", err);
    return NextResponse.json({ error: "Internal error" }, { status: 500 });
  }
}
