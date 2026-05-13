import { NextResponse } from "next/server";
import { isProduction } from "@/lib/apiResponse";
import {
  getDefaultLayoutForAdminEditor,
  getLayoutRowForAdmin,
  listAllowedGallerySources,
  upsertGalleryLayoutToSupabase,
  validateLayoutForSave,
} from "@/lib/galleryLayout";

export const dynamic = "force-dynamic";

const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Methods": "GET, PUT, OPTIONS",
  "Access-Control-Allow-Headers": "Content-Type",
};

function filterSlidesForAdmin(
  slides: { src: string; alt: string }[],
  allowed: Set<string>
): { src: string; alt: string }[] {
  return slides.filter((s) => allowed.has(s.src) && !s.src.includes(".."));
}

export async function GET() {
  const allowed = new Set(listAllowedGallerySources().map((a) => a.src));
  const row = await getLayoutRowForAdmin();
  const defaults = getDefaultLayoutForAdminEditor();

  const builtInDefaults = {
    hero: defaults.hero,
    galleryPage: defaults.gallery_page,
    corporateHero: defaults.corporate_hero,
    residenceHero: defaults.residence_hero,
    designedFor: defaults.designed_for,
  };

  if (!row) {
    return NextResponse.json(
      {
        hero: defaults.hero,
        galleryPage: defaults.gallery_page,
        corporateHero: defaults.corporate_hero,
        residenceHero: defaults.residence_hero,
        designedFor: defaults.designed_for,
        persisted: false,
        builtInDefaults,
      },
      { headers: { ...corsHeaders, "Cache-Control": "no-store" } }
    );
  }

  // Handle null values for columns added via ALTER TABLE
  const rowHero = Array.isArray(row.hero) && row.hero.length > 0 ? row.hero : defaults.hero;
  const rowGalleryPage = Array.isArray(row.gallery_page) && row.gallery_page.length > 0 ? row.gallery_page : defaults.gallery_page;
  const rowDesignedFor = Array.isArray(row.designed_for) && row.designed_for.length > 0 ? row.designed_for : defaults.designed_for;
  const rowCorporateHero = row.corporate_hero && typeof row.corporate_hero === "object" ? row.corporate_hero : defaults.corporate_hero;
  const rowResidenceHero = row.residence_hero && typeof row.residence_hero === "object" ? row.residence_hero : defaults.residence_hero;

  const safeDesigned = defaults.designed_for.map((d, i) => {
    const slide = rowDesignedFor[i];
    if (!slide || typeof slide !== "object") return d;
    return allowed.has(slide.src) && !slide.src.includes("..") ? slide : d;
  });

  return NextResponse.json(
    {
      hero: filterSlidesForAdmin(rowHero, allowed),
      galleryPage: filterSlidesForAdmin(rowGalleryPage, allowed),
      corporateHero: filterSlidesForAdmin([rowCorporateHero as { src: string; alt: string }], allowed)[0] ?? defaults.corporate_hero,
      residenceHero: filterSlidesForAdmin([rowResidenceHero as { src: string; alt: string }], allowed)[0] ?? defaults.residence_hero,
      designedFor: safeDesigned,
      persisted: true,
      builtInDefaults,
    },
    { headers: { ...corsHeaders, "Cache-Control": "no-store" } }
  );
}

export async function PUT(req: Request) {
  const allowed = new Set(listAllowedGallerySources().map((a) => a.src));
  let body: unknown;
  try {
    body = await req.json();
  } catch {
    return NextResponse.json({ error: "Invalid JSON." }, { status: 400, headers: corsHeaders });
  }

  const parsed = validateLayoutForSave(body, allowed);
  if (!parsed.ok) {
    return NextResponse.json({ error: parsed.error }, { status: 400, headers: corsHeaders });
  }

  const result = await upsertGalleryLayoutToSupabase(parsed.value);
  if (!result.ok) {
    return NextResponse.json(
      { error: isProduction ? "Unable to save layout." : result.message },
      { status: result.status, headers: corsHeaders }
    );
  }

  return NextResponse.json({ ok: true }, { headers: corsHeaders });
}
