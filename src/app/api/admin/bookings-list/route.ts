import { apiJson, isProduction } from "@/lib/apiResponse";
import { getSupabaseServiceConfig } from "@/lib/supabaseServer";

export async function GET() {
  const config = getSupabaseServiceConfig();
  if (!config) {
    return apiJson({ error: isProduction ? "Service temporarily unavailable." : "Missing Supabase configuration." }, { status: 503 });
  }

  try {
    const res = await fetch(`${config.url}/rest/v1/jer_bookings?order=created_at.desc`, {
      headers: {
        apikey: config.key,
        Authorization: `Bearer ${config.key}`,
      },
    });

    if (!res.ok) {
      if (!isProduction) {
        console.error("Bookings list Supabase error:", res.status, await res.clone().text());
      } else {
        console.error("Bookings list Supabase error:", res.status);
      }
      return apiJson({ error: "Unable to load bookings." }, { status: 502 });
    }

    const bookings = await res.json();
    return apiJson({ bookings });
  } catch (e) {
    if (!isProduction) {
      console.error("Bookings list error", e);
    } else {
      console.error("Bookings list error");
    }
    return apiJson({ error: "Unable to load bookings." }, { status: 500 });
  }
}
