/**
 * Fallback hero slides for the client before `/api/gallery-layout` loads.
 * Keep this module free of Node-only imports so the Hero client bundle stays valid.
 */

import type { GallerySlide } from "@/lib/galleryDefaults";
import { DEFAULT_HERO_SLIDES } from "@/lib/galleryDefaults";

export type HeroShot = GallerySlide;

export const HERO_SHOTS: HeroShot[] = DEFAULT_HERO_SLIDES;
