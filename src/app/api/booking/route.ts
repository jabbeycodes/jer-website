import { NextRequest } from "next/server";

import { apiJson, isProduction } from "@/lib/apiResponse";
import { jerRateLimitAllow, rateLimitKey } from "@/lib/rateLimitSupabase";
import { getSupabaseServiceConfig } from "@/lib/supabaseServer";

function bookingRateLimitMax(): number {
  const n = Number.parseInt(process.env.BOOKING_RATE_LIMIT_MAX ?? "15", 10);
  return Number.isFinite(n) && n > 0 ? n : 15;
}

function bookingRateLimitWindowSec(): number {
  const n = Number.parseInt(process.env.BOOKING_RATE_LIMIT_WINDOW_SEC ?? "900", 10);
  return Number.isFinite(n) && n > 0 ? n : 900;
}

export async function POST(req: NextRequest) {
  const config = getSupabaseServiceConfig();
  if (!config) {
    return apiJson(
      { error: isProduction ? "Service temporarily unavailable." : "Booking service is not configured (missing Supabase URL or server key)." },
      { status: 503 }
    );
  }

  const rlKey = rateLimitKey("booking", req.headers);
  const allowed = await jerRateLimitAllow(rlKey, bookingRateLimitMax(), bookingRateLimitWindowSec());
  if (!allowed) {
    return apiJson(
      { error: isProduction ? "Too many requests. Please try again later." : "Rate limit exceeded for this IP." },
      { status: 429 }
    );
  }

  try {
    const data = await req.json();

    if (!data.name || !data.email || !data.checkIn || !data.checkOut) {
      return apiJson({ error: "Name, email, check-in, and check-out are required" }, { status: 400 });
    }

    const guestsNum = Number.parseInt(String(data.guests ?? "1"), 10);
    const guests = Number.isFinite(guestsNum) && guestsNum > 0 ? guestsNum : 1;

    const booking = {
      name: String(data.name).trim(),
      email: String(data.email).trim(),
      organization: data.organization ? String(data.organization).trim() || null : null,
      check_in: String(data.checkIn).trim(),
      check_out: String(data.checkOut).trim(),
      guests,
      purpose: data.purpose ? String(data.purpose).trim() || null : null,
      message: data.message ? String(data.message).trim() || null : null,
      status: "pending",
    };

    const res = await fetch(`${config.url}/rest/v1/jer_bookings`, {
      method: "POST",
      headers: {
        apikey: config.key,
        Authorization: `Bearer ${config.key}`,
        "Content-Type": "application/json",
        Prefer: "return=representation",
      },
      body: JSON.stringify(booking),
    });

    if (!res.ok) {
      const errText = await res.text();
      if (!isProduction) {
        console.error("Supabase insert error:", res.status, errText);
      } else {
        console.error("Supabase insert error:", res.status);
      }
      return apiJson(
        {
          error: isProduction ? "Unable to complete your request." : `Supabase error (${res.status}). ${errText.slice(0, 280)}`,
        },
        { status: 502 }
      );
    }

    await res.json();
    return apiJson({ success: true });
  } catch (err) {
    if (!isProduction) {
      console.error("Booking API error:", err);
    } else {
      console.error("Booking API error");
    }
    return apiJson({ error: "Unable to complete your request." }, { status: 500 });
  }
}
