import { getSupabaseServiceConfig } from "@/lib/supabaseServer";

function clientIpFromHeaders(h: Headers): string {
  const xff = h.get("x-forwarded-for");
  if (xff) {
    const first = xff.split(",")[0]?.trim();
    if (first) return first.slice(0, 128);
  }
  const real = h.get("x-real-ip")?.trim();
  if (real) return real.slice(0, 128);
  return "unknown";
}

export function rateLimitKey(prefix: string, headers: Headers): string {
  return `${prefix}:${clientIpFromHeaders(headers)}`;
}

/**
 * Uses Supabase RPC `jer_check_rate_limit` (see migrations). Returns false when over limit.
 * If Supabase is not configured, allows the request (booking/login already return 503).
 */
export async function jerRateLimitAllow(
  key: string,
  maxPerWindow: number,
  windowSeconds: number
): Promise<boolean> {
  const config = getSupabaseServiceConfig();
  if (!config) return true;

  const res = await fetch(`${config.url}/rest/v1/rpc/jer_check_rate_limit`, {
    method: "POST",
    headers: {
      apikey: config.key,
      Authorization: `Bearer ${config.key}`,
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      p_key: key.slice(0, 256),
      p_max: maxPerWindow,
      p_window_seconds: windowSeconds,
    }),
  });

  if (!res.ok) {
    return true;
  }

  const body = (await res.json()) as unknown;
  return body === true;
}
