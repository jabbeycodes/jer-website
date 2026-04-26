import { NextRequest, NextResponse } from "next/server";

const SUPABASE_URL = process.env.NEXT_PUBLIC_SUPABASE_URL!;
const SUPABASE_SERVICE_KEY = process.env.SUPABASE_SERVICE_KEY!;

export async function POST(req: NextRequest) {
  try {
    const { id, status } = await req.json();

    if (!id || !status) {
      return NextResponse.json({ error: "id and status required" }, { status: 400 });
    }

    if (!["pending", "confirmed", "declined", "completed"].includes(status)) {
      return NextResponse.json({ error: "Invalid status" }, { status: 400 });
    }

    const res = await fetch(`${SUPABASE_URL}/rest/v1/jer_bookings?id=eq.${id}`, {
      method: "PATCH",
      headers: {
        apikey: SUPABASE_SERVICE_KEY,
        Authorization: `Bearer ${SUPABASE_SERVICE_KEY}`,
        "Content-Type": "application/json",
        Prefer: "return=representation",
      },
      body: JSON.stringify({ status, updated_at: new Date().toISOString() }),
    });

    if (!res.ok) {
      return NextResponse.json({ error: "Failed to update booking" }, { status: 500 });
    }

    const booking = await res.json();
    return NextResponse.json({ success: true, booking: booking[0] });
  } catch (err) {
    console.error("Booking update error:", err);
    return NextResponse.json({ error: "Internal server error" }, { status: 500 });
  }
}