import { NextRequest, NextResponse } from "next/server";

const SUPABASE_URL = process.env.NEXT_PUBLIC_SUPABASE_URL!;
const SUPABASE_SERVICE_KEY = process.env.SUPABASE_SERVICE_KEY!;

export async function GET() {
  try {
    const res = await fetch(`${SUPABASE_URL}/rest/v1/jer_bookings?order=created_at.desc`, {
      headers: {
        apikey: SUPABASE_SERVICE_KEY,
        Authorization: `Bearer ${SUPABASE_SERVICE_KEY}`,
      },
    });

    if (!res.ok) {
      return NextResponse.json({ error: "Failed to fetch bookings" }, { status: 500 });
    }

    const bookings = await res.json();
    return NextResponse.json({ bookings });
  } catch (err) {
    console.error("Bookings list error:", err);
    return NextResponse.json({ error: "Internal server error" }, { status: 500 });
  }
}