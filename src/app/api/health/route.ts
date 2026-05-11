import { NextResponse } from "next/server";

/** Lightweight readiness probe for uptime monitors (no auth, no DB). */
export async function GET() {
  return NextResponse.json(
    { ok: true, service: "jer-website" },
    {
      status: 200,
      headers: {
        "Cache-Control": "no-store",
      },
    }
  );
}
