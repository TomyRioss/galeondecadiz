import { NextRequest, NextResponse } from "next/server";
import { MercadoPagoConfig, Preference } from "mercadopago";

const client = new MercadoPagoConfig({
  accessToken: process.env.MP_ACCESS_TOKEN ?? "TEST-placeholder",
});

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const { full_name, email, phone, amount, message, accepted_terms } = body;

    if (!full_name || !email || !amount || !accepted_terms) {
      return NextResponse.json({ error: "Campos requeridos faltantes" }, { status: 400 });
    }

    const baseUrl = process.env.NEXT_PUBLIC_SITE_URL ?? "http://localhost:3000";

    const preference = new Preference(client);
    const result = await preference.create({
      body: {
        items: [
          {
            id: "donacion",
            title: "Donación — Fundación Social Galeona de Cádiz",
            quantity: 1,
            unit_price: parseFloat(amount),
            currency_id: "COP",
          },
        ],
        payer: {
          name: full_name,
          email,
          phone: phone ? { number: phone } : undefined,
        },
        metadata: { full_name, email, phone, amount, message },
        back_urls: {
          success: `${baseUrl}/donaciones/gracias`,
          failure: `${baseUrl}/donaciones/error`,
          pending: `${baseUrl}/donaciones/gracias`,
        },
        auto_return: "approved",
      },
    });

    return NextResponse.json({ preference_id: result.id, init_point: result.init_point });
  } catch (err) {
    console.error("[donations/checkout] error:", err);
    return NextResponse.json({ error: "Error al crear preferencia de pago" }, { status: 500 });
  }
}
