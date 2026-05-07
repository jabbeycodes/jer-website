import { NextRequest } from "next/server";

import { apiJson, isProduction } from "@/lib/apiResponse";
import { getSupabaseServiceConfig } from "@/lib/supabaseServer";

const UUID_RE = /^[0-9a-f]{8}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{12}$/i;

export async function POST(req: NextRequest) {
  const config = getSupabaseServiceConfig();
  if (!config) {
    return apiJson({ error: isProduction ? "Service temporarily unavailable." : "Missing Supabase configuration." }, { status: 503 });
  }

  try {
    const { id, status } = await req.json();

    if (!id || !status) {
      return apiJson({ error: "id and status required" }, { status: 400 });
    }

    if (typeof id !== "string" || !UUID_RE.test(id)) {
      return apiJson({ error: "Invalid booking id" }, { status: 400 });
    }

    if (!["pending", "confirmed", "declined", "completed"].includes(status)) {
      return apiJson({ error: "Invalid status" }, { status: 400 });
    }

    const res = await fetch(`${config.url}/rest/v1/jer_bookings?id=eq.${id}`, {
      method: "PATCH",
      headers: {
        apikey: config.key,
        Authorization: `Bearer ${config.key}`,
        "Content-Type": "application/json",
        Prefer: "return=representation",
      },
      body: JSON.stringify({ status, updated_at: new Date().toISOString() }),
    });

    if (!res.ok) {
      if (!isProduction) {
        console.error("Booking update Supabase error:", res.status, await res.clone().text());
      } else {
        console.error("Booking update Supabase error:", res.status);
      }
      return apiJson({ error: "Unable to update booking." }, { status: 502 });
    }

    await res.json();
    return apiJson({ success: true });
  } catch (e) {
    if (!isProduction) {
      console.error("Booking update error", e);
    } else {
      console.error("Booking update error");
    }
    return apiJson({ error: "Unable to update booking." }, { status: 500 });
  }
}
