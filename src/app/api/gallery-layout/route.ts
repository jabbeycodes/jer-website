import { NextResponse } from "next/server";

import { resolvePublicSiteMedia } from "@/lib/galleryLayout";

export const dynamic = "force-dynamic";

const CACHE_HEADER = "public, s-maxage=30, stale-while-revalidate=120";

export async function GET() {
  try {
    const media = await resolvePublicSiteMedia();
    return NextResponse.json(media, {
      headers: {
        "Cache-Control": CACHE_HEADER,
      },
    });
  } catch {
    return NextResponse.json({ error: "Unable to load gallery layout." }, { status: 500 });
  }
}
