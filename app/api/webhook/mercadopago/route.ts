import { NextRequest, NextResponse } from "next/server";
// @ts-ignore
import { prisma } from "@/lib/prisma";
import { Payment } from "mercadopago";
import { getMercadoPagoConfig } from "@/lib/mercadopago";
import { getSignedPdfUrl } from "@/lib/supabase-server";
import { sendOrderConfirmationEmail } from "@/lib/email";

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();

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

    const orderId = payment.external_reference;
    if (!orderId) return NextResponse.json({ received: true });

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
