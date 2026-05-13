import { NextResponse } from "next/server";
import { listAllowedGallerySources } from "@/lib/galleryLayout";

export const dynamic = "force-dynamic";

export async function GET() {
  const assets = listAllowedGallerySources();
  return NextResponse.json(
    { assets },
    {
      status: 200,
      headers: {
        "Access-Control-Allow-Origin": "*",
        "Access-Control-Allow-Methods": "GET, OPTIONS",
        "Access-Control-Allow-Headers": "Content-Type",
        "Cache-Control": "no-store, no-cache, must-revalidate, private",
      },
    }
  );
}
