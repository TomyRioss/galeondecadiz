import MercadoPagoConfig, { Preference } from "mercadopago";

let mpConfig: MercadoPagoConfig | null = null;

export function getMercadoPagoConfig(): MercadoPagoConfig {
  if (!mpConfig) {
    mpConfig = new MercadoPagoConfig({
      accessToken: process.env.MERCADOPAGO_ACCESS_TOKEN!,
    });
  }
  return mpConfig;
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
  const config = getMercadoPagoConfig();
  const preference = new Preference(config);
  const baseUrl = process.env.NEXT_PUBLIC_BASE_URL!;

  return preference.create({
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
}
