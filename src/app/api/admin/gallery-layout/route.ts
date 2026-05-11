import { apiJson, isProduction } from "@/lib/apiResponse";
import {
  getDefaultLayoutForAdminEditor,
  getLayoutRowForAdmin,
  listAllowedGallerySources,
  upsertGalleryLayoutToSupabase,
  validateLayoutForSave,
} from "@/lib/galleryLayout";

export const dynamic = "force-dynamic";

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
    return apiJson({
      hero: defaults.hero,
      galleryPage: defaults.gallery_page,
      corporateHero: defaults.corporate_hero,
      residenceHero: defaults.residence_hero,
      designedFor: defaults.designed_for,
      persisted: false,
      builtInDefaults,
    });
  }

  const safeDesigned = defaults.designed_for.map((d, i) => {
    const slide = row.designed_for[i];
    if (!slide) return d;
    return allowed.has(slide.src) && !slide.src.includes("..") ? slide : d;
  });

  return apiJson({
    hero: filterSlidesForAdmin(row.hero, allowed),
    galleryPage: filterSlidesForAdmin(row.gallery_page, allowed),
    corporateHero: filterSlidesForAdmin([row.corporate_hero], allowed)[0] ?? defaults.corporate_hero,
    residenceHero: filterSlidesForAdmin([row.residence_hero], allowed)[0] ?? defaults.residence_hero,
    designedFor: safeDesigned,
    persisted: true,
    builtInDefaults,
  });
}

export async function PUT(req: Request) {
  const allowed = new Set(listAllowedGallerySources().map((a) => a.src));
  let body: unknown;
  try {
    body = await req.json();
  } catch {
    return apiJson({ error: "Invalid JSON." }, { status: 400 });
  }

  const parsed = validateLayoutForSave(body, allowed);
  if (!parsed.ok) {
    return apiJson({ error: parsed.error }, { status: 400 });
  }

  const result = await upsertGalleryLayoutToSupabase(parsed.value);
  if (!result.ok) {
    return apiJson(
      { error: isProduction ? "Unable to save layout." : result.message },
      { status: result.status }
    );
  }

  return apiJson({ ok: true });
}
