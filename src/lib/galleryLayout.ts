import fs from "node:fs";
import path from "node:path";

import {
  DEFAULT_CORPORATE_HERO,
  DEFAULT_DESIGNED_FOR_SLIDES,
  DEFAULT_HERO_SLIDES,
  DEFAULT_RESIDENCE_HERO,
  DESIGNED_FOR_CARD_META,
  type GallerySlide,
} from "@/lib/galleryDefaults";
import { getSupabaseServiceConfig } from "@/lib/supabaseServer";

export type { GallerySlide } from "@/lib/galleryDefaults";
export { DEFAULT_HERO_SLIDES } from "@/lib/galleryDefaults";

const LAYOUT_ROW_ID = "default";

/** Shape stored in Supabase and returned from admin save validation. */
export type SiteMediaLayoutRow = {
  hero: GallerySlide[];
  gallery_page: GallerySlide[];
  corporate_hero: GallerySlide;
  residence_hero: GallerySlide;
  designed_for: GallerySlide[];
};

export type PublicSiteMedia = {
  hero: GallerySlide[];
  galleryPage: GallerySlide[];
  corporateHero: GallerySlide;
  residenceHero: GallerySlide;
  designedFor: GallerySlide[];
};

function formatAltFromFilename(filename: string): string {
  const base = filename.replace(/\.[^.]+$/i, "").replace(/_/g, " ");
  return `Jirapa Executive Residence - ${base}`;
}

function isSafePublicSrc(src: string): boolean {
  if (!src.startsWith("/") || src.includes("..")) return false;
  if (src.includes("?") || src.includes("#")) return false;
  return true;
}

/** Every image under `public/` (root JPEG/WebP) and `public/gallery/`. */
export function listAllowedGallerySources(): GallerySlide[] {
  const out: GallerySlide[] = [];
  const publicDir = path.join(process.cwd(), "public");

  if (fs.existsSync(publicDir)) {
    for (const f of fs.readdirSync(publicDir)) {
      if (!/\.(jpe?g|webp)$/i.test(f)) continue;
      const src = `/${f}`;
      if (!isSafePublicSrc(src)) continue;
      out.push({ src, alt: formatAltFromFilename(f) });
    }
  }

  const galleryDir = path.join(publicDir, "gallery");
  if (fs.existsSync(galleryDir)) {
    for (const f of fs.readdirSync(galleryDir)) {
      if (!/\.(jpe?g|webp)$/i.test(f)) continue;
      const src = `/gallery/${f}`;
      if (!isSafePublicSrc(src)) continue;
      out.push({ src, alt: formatAltFromFilename(f) });
    }
  }

  out.sort((a, b) => a.src.localeCompare(b.src, undefined, { numeric: true, sensitivity: "base" }));
  return out;
}

/** Default /gallery page: only files inside `public/gallery/`. */
export function listDefaultGalleryPageSlides(): GallerySlide[] {
  return listAllowedGallerySources().filter((s) => s.src.startsWith("/gallery/"));
}

function allowedSrcSet(): Set<string> {
  return new Set(listAllowedGallerySources().map((s) => s.src));
}

function filterToAllowed(slides: GallerySlide[], allowed: Set<string>): GallerySlide[] {
  return slides.filter((s) => typeof s.src === "string" && typeof s.alt === "string" && allowed.has(s.src) && isSafePublicSrc(s.src));
}

function normalizeSlides(raw: unknown): GallerySlide[] {
  if (!Array.isArray(raw)) return [];
  const out: GallerySlide[] = [];
  for (const item of raw) {
    if (!item || typeof item !== "object") continue;
    const src = (item as { src?: unknown }).src;
    const alt = (item as { alt?: unknown }).alt;
    if (typeof src !== "string" || typeof alt !== "string") continue;
    const trimmedAlt = alt.trim().slice(0, 500);
    if (!trimmedAlt) continue;
    out.push({ src: src.trim(), alt: trimmedAlt });
  }
  return out;
}

function normalizeSingleSlide(raw: unknown): GallerySlide | null {
  if (!raw || typeof raw !== "object") return null;
  const src = (raw as { src?: unknown }).src;
  const alt = (raw as { alt?: unknown }).alt;
  if (typeof src !== "string" || typeof alt !== "string") return null;
  const trimmedAlt = alt.trim().slice(0, 500);
  if (!trimmedAlt) return null;
  return { src: src.trim(), alt: trimmedAlt };
}

function pickResolvedSingle(raw: unknown, fallback: GallerySlide, allowed: Set<string>): GallerySlide {
  const one = normalizeSingleSlide(raw);
  if (!one) {
    const fb = filterToAllowed([fallback], allowed);
    return fb[0] ?? fallback;
  }
  const ok = filterToAllowed([one], allowed);
  if (ok[0]) return ok[0];
  const fb = filterToAllowed([fallback], allowed);
  return fb[0] ?? fallback;
}

function resolveDesignedForRow(raw: unknown, allowed: Set<string>): GallerySlide[] {
  const normalized = normalizeSlides(raw);
  const filtered = filterToAllowed(normalized, allowed);
  return DESIGNED_FOR_CARD_META.map((_, i) => filtered[i] ?? DEFAULT_DESIGNED_FOR_SLIDES[i]!);
}

type DbLayoutRow = {
  hero?: unknown;
  gallery_page?: unknown;
  corporate_hero?: unknown;
  residence_hero?: unknown;
  designed_for?: unknown;
};

async function fetchLayoutRowFromSupabase(): Promise<SiteMediaLayoutRow | null> {
  const config = getSupabaseServiceConfig();
  if (!config) return null;

  const res = await fetch(
    `${config.url}/rest/v1/jer_gallery_layout?id=eq.${encodeURIComponent(LAYOUT_ROW_ID)}&select=hero,gallery_page,corporate_hero,residence_hero,designed_for`,
    {
      headers: {
        apikey: config.key,
        Authorization: `Bearer ${config.key}`,
      },
      next: { revalidate: 0 },
    }
  );

  if (!res.ok) return null;
  const rows = (await res.json()) as DbLayoutRow[];
  if (!rows?.length) return null;

  const r0 = rows[0]!;
  const allowed = allowedSrcSet();
  const designedRaw = normalizeSlides(r0.designed_for);
  return {
    hero: normalizeSlides(r0.hero),
    gallery_page: normalizeSlides(r0.gallery_page),
    corporate_hero: pickResolvedSingle(r0.corporate_hero, DEFAULT_CORPORATE_HERO, allowed),
    residence_hero: pickResolvedSingle(r0.residence_hero, DEFAULT_RESIDENCE_HERO, allowed),
    designed_for: resolveDesignedForRow(designedRaw.length > 0 ? designedRaw : DEFAULT_DESIGNED_FOR_SLIDES, allowed),
  };
}

/**
 * Full public media: homepage hero, /gallery grid, subpage heroes, and "Designed for" cards.
 */
export async function resolvePublicSiteMedia(): Promise<PublicSiteMedia> {
  const allowed = allowedSrcSet();
  const defaultGallery = listDefaultGalleryPageSlides();
  const row = await fetchLayoutRowFromSupabase();

  if (!row) {
    const hero = filterToAllowed(DEFAULT_HERO_SLIDES, allowed);
    return {
      hero: hero.length > 0 ? hero : DEFAULT_HERO_SLIDES,
      galleryPage: defaultGallery,
      corporateHero: pickResolvedSingle(null, DEFAULT_CORPORATE_HERO, allowed),
      residenceHero: pickResolvedSingle(null, DEFAULT_RESIDENCE_HERO, allowed),
      designedFor: resolveDesignedForRow(DEFAULT_DESIGNED_FOR_SLIDES, allowed),
    };
  }

  const heroFiltered = filterToAllowed(row.hero, allowed);
  const galleryFiltered = filterToAllowed(row.gallery_page, allowed);

  return {
    hero:
      heroFiltered.length > 0
        ? heroFiltered
        : filterToAllowed(DEFAULT_HERO_SLIDES, allowed).length > 0
          ? filterToAllowed(DEFAULT_HERO_SLIDES, allowed)
          : DEFAULT_HERO_SLIDES,
    galleryPage: galleryFiltered,
    corporateHero: pickResolvedSingle(row.corporate_hero, DEFAULT_CORPORATE_HERO, allowed),
    residenceHero: pickResolvedSingle(row.residence_hero, DEFAULT_RESIDENCE_HERO, allowed),
    designedFor: resolveDesignedForRow(row.designed_for, allowed),
  };
}

/** @deprecated Use `resolvePublicSiteMedia` - kept for call sites that only need hero + gallery. */
export async function resolvePublicGalleryLayout(): Promise<{ hero: GallerySlide[]; galleryPage: GallerySlide[] }> {
  const s = await resolvePublicSiteMedia();
  return { hero: s.hero, galleryPage: s.galleryPage };
}

export async function getLayoutRowForAdmin(): Promise<SiteMediaLayoutRow | null> {
  return fetchLayoutRowFromSupabase();
}

export function getDefaultLayoutForAdminEditor(): SiteMediaLayoutRow {
  return {
    hero: [...DEFAULT_HERO_SLIDES],
    gallery_page: listDefaultGalleryPageSlides(),
    corporate_hero: { ...DEFAULT_CORPORATE_HERO },
    residence_hero: { ...DEFAULT_RESIDENCE_HERO },
    designed_for: DEFAULT_DESIGNED_FOR_SLIDES.map((s) => ({ ...s })),
  };
}

export function validateLayoutForSave(
  body: unknown,
  allowed: Set<string>
): { ok: true; value: SiteMediaLayoutRow } | { ok: false; error: string } {
  if (!body || typeof body !== "object") {
    return { ok: false, error: "Invalid body" };
  }
  const b = body as Record<string, unknown>;

  const hero = filterToAllowed(normalizeSlides(b.hero), allowed);
  const gallery_page = filterToAllowed(normalizeSlides(b.galleryPage), allowed);
  const rawHero = normalizeSlides(b.hero);
  const rawGallery = normalizeSlides(b.galleryPage);

  if (rawHero.length !== hero.length) {
    return { ok: false, error: "Hero list contains unknown or invalid image paths." };
  }
  if (rawGallery.length !== gallery_page.length) {
    return { ok: false, error: "Gallery page list contains unknown or invalid image paths." };
  }
  if (hero.length === 0) {
    return { ok: false, error: "Add at least one hero slide." };
  }

  // Corporate hero: optional (defaults to built-in if empty)
  const rawCorp = normalizeSingleSlide(b.corporateHero);
  const corporate_hero = rawCorp ? filterToAllowed([rawCorp], allowed) : [];

  // Residence hero: optional (defaults to built-in if empty)
  const rawRes = normalizeSingleSlide(b.residenceHero);
  const residence_hero = rawRes ? filterToAllowed([rawRes], allowed) : [];

  // Designed for: optional (0 to 4 cards, not strictly required)
  const rawDesigned = normalizeSlides(b.designedFor);
  const designed_for = filterToAllowed(rawDesigned, allowed);

  return {
    ok: true,
    value: {
      hero,
      gallery_page,
      corporate_hero: corporate_hero[0] ?? { src: "", alt: "" },
      residence_hero: residence_hero[0] ?? { src: "", alt: "" },
      designed_for,
    },
  };
}

export async function upsertGalleryLayoutToSupabase(
  layout: SiteMediaLayoutRow
): Promise<{ ok: true } | { ok: false; status: number; message: string }> {
  const config = getSupabaseServiceConfig();
  if (!config) {
    return { ok: false, status: 503, message: "Database not configured." };
  }

  const payload = {
    id: LAYOUT_ROW_ID,
    hero: layout.hero,
    gallery_page: layout.gallery_page,
    corporate_hero: layout.corporate_hero,
    residence_hero: layout.residence_hero,
    designed_for: layout.designed_for,
    updated_at: new Date().toISOString(),
  };

  const res = await fetch(`${config.url}/rest/v1/jer_gallery_layout`, {
    method: "POST",
    headers: {
      apikey: config.key,
      Authorization: `Bearer ${config.key}`,
      "Content-Type": "application/json",
      Prefer: "resolution=merge-duplicates,return=minimal",
    },
    body: JSON.stringify(payload),
  });

  if (!res.ok) {
    const text = await res.text();
    return { ok: false, status: 502, message: text.slice(0, 200) };
  }

  return { ok: true };
}
