/** Server-only Supabase REST config. Never import this from client components. */

export function getSupabaseServiceConfig(): { url: string; key: string } | null {
  const url = process.env.NEXT_PUBLIC_SUPABASE_URL?.trim();
  const key = process.env.SUPABASE_SERVICE_KEY?.trim();
  if (!url || !key) return null;
  return { url, key };
}
