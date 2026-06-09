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
