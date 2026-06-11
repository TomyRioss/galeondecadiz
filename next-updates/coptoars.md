# Cambiar moneda ARS → COP

Actualmente `currency_id: "ARS"` porque las credenciales de prueba son de una cuenta MP Argentina.

Cuando el cliente entregue sus credenciales MP Colombia, hacer esto:

## Archivos a actualizar

### `app/api/donations/checkout/route.ts`
```ts
currency_id: "ARS"  →  currency_id: "COP"
```

### `app/api/checkout/route.ts` (tienda)
```ts
currency_id: params.moneda === "USD" ? "USD" : "COP"
```
Este ya usa COP — verificar que funcione con las nuevas credenciales.

### `lib/mercadopago.ts`
```ts
currency_id: params.moneda === "USD" ? "USD" : "COP"
```
Igual, ya usa COP.

## Credenciales a reemplazar en `.env.local` / Vercel

```
MP_ACCESS_TOKEN=APP_USR-credentials-colombia
NEXT_PUBLIC_MP_PUBLIC_KEY=APP_USR-credentials-colombia
```

La cuenta MP del cliente debe estar registrada en **mercadopago.com.co** para que COP sea válido.
