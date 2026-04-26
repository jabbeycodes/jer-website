import { NextRequest, NextResponse } from "next/server";

const SUPABASE_URL = process.env.NEXT_PUBLIC_SUPABASE_URL!;
const SUPABASE_SERVICE_KEY = process.env.SUPABASE_SERVICE_KEY!;

export async function POST(req: NextRequest) {
  try {
    const data = await req.json();

    // Validate required fields
    if (!data.name || !data.email || !data.checkIn || !data.checkOut) {
      return NextResponse.json({ error: "Name, email, check-in, and check-out are required" }, { status: 400 });
    }

    const booking = {
      name: data.name,
      email: data.email,
      organization: data.organization || null,
      check_in: data.checkIn,
      check_out: data.checkOut,
      guests: data.guests || 1,
      purpose: data.purpose || null,
      message: data.message || null,
      status: "pending",
    };

    const res = await fetch(`${SUPABASE_URL}/rest/v1/jer_bookings`, {
      method: "POST",
      headers: {
        apikey: SUPABASE_SERVICE_KEY,
        Authorization: `Bearer ${SUPABASE_SERVICE_KEY}`,
        "Content-Type": "application/json",
        Prefer: "return=representation",
      },
      body: JSON.stringify(booking),
    });

    if (!res.ok) {
      const err = await res.text();
      console.error("Supabase insert error:", err);
      return NextResponse.json({ error: "Failed to submit booking" }, { status: 500 });
    }

    const result = await res.json();
    return NextResponse.json({ success: true, booking: result[0] });
  } catch (err) {
    console.error("Booking API error:", err);
    return NextResponse.json({ error: "Internal server error" }, { status: 500 });
  }
}