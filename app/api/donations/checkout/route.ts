import { NextRequest, NextResponse } from "next/server";
import { MercadoPagoConfig, Preference } from "mercadopago";
// @ts-ignore
import { prisma } from "@/lib/prisma";

const client = new MercadoPagoConfig({
  accessToken: process.env.MP_ACCESS_TOKEN ?? "",
});

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const { full_name, email, phone, amount, message, accepted_terms } = body;

    if (!full_name || !email || !amount || !accepted_terms) {
      return NextResponse.json({ error: "Campos requeridos faltantes" }, { status: 400 });
    }

    const unitPrice = parseFloat(amount);
    if (isNaN(unitPrice) || unitPrice <= 0) {
      return NextResponse.json({ error: "Monto inválido" }, { status: 400 });
    }

    const donation = await (prisma as any).donation.create({
      data: {
        fullName: full_name,
        email,
        phone: phone ?? null,
        amount: unitPrice,
        message: message ?? null,
        status: "pending",
      },
    });

    const baseUrl = (process.env.NEXT_PUBLIC_BASE_URL ?? "http://localhost:3000").replace(/\/$/, "");
    const isProd = baseUrl.startsWith("https");

    const preference = new Preference(client);
    const result = await preference.create({
      body: {
        items: [
          {
            id: "donacion",
            title: "Donacion - Fundacion Social Galeona de Cadiz",
            quantity: 1,
            unit_price: unitPrice,
            currency_id: "COP",
          },
        ],
        payer: {
          name: full_name,
          email,
          phone: phone ? { number: phone } : undefined,
        },
        external_reference: `don_${donation.id}`,
        back_urls: {
          success: `${baseUrl}/donaciones/gracias`,
          failure: `${baseUrl}/donaciones/error`,
          pending: `${baseUrl}/donaciones/gracias`,
        },
        ...(isProd ? { auto_return: "approved" as const } : {}),
      },
    });

    return NextResponse.json({ preference_id: result.id, init_point: result.init_point });
  } catch (err: any) {
    console.error("[donations/checkout] error:", JSON.stringify(err, null, 2));
    return NextResponse.json({ error: "Error al crear preferencia de pago", detail: err?.message }, { status: 500 });
  }
}
