/** Client-safe defaults (no Node filesystem). Server layout logic imports this too. */

export type GallerySlide = { src: string; alt: string };

/** Hero defaults when no custom layout exists in the database. */
export const DEFAULT_HERO_SLIDES: GallerySlide[] = [
  { src: "/hero-mansion.jpg", alt: "Jirapa Executive Residence — aerial view of the mansion and compound" },
  { src: "/exterior-day.jpg", alt: "Jirapa Executive Residence — mansion exterior and façade" },
  { src: "/outdoor-area.jpg", alt: "Jirapa Executive Residence — grounds and outdoor areas" },
  { src: "/interior-living.jpg", alt: "Jirapa Executive Residence — living room setting" },
  { src: "/bedroom.jpg", alt: "Jirapa Executive Residence — bedroom setting" },
  { src: "/gallery/DJI_20260421110553_0025_D.jpg", alt: "Jirapa Executive Residence — aerial compound view" },
  { src: "/gallery/DJI_20260421111621_0041_D.jpg", alt: "Jirapa Executive Residence — aerial residence view" },
];

export const DEFAULT_CORPORATE_HERO: GallerySlide = {
  src: "/exterior-day.jpg",
  alt: "Jirapa Executive Residence — mansion exterior for corporate stays",
};

export const DEFAULT_RESIDENCE_HERO: GallerySlide = {
  src: "/interior-living.jpg",
  alt: "Jirapa Executive Residence — living space for residence guests",
};

/** Copy for the four “Designed for” cards (images are configured separately). */
export const DESIGNED_FOR_CARD_META: readonly { title: string; description: string }[] = [
  {
    title: "NGO & Development Teams",
    description: "Secure base for field operations, donor visits, and regional coordination.",
  },
  {
    title: "Government Visits",
    description: "Private and professional setting for official delegations and ministerial stays.",
  },
  {
    title: "Diaspora Executives",
    description: "A home-quality residence for professionals visiting from abroad who expect privacy and reliability.",
  },
  {
    title: "Private Retreats",
    description: "Exclusive compound for personal retreats, family visits, and quiet time away from the city.",
  },
];

/** Default background image per “Designed for” card (order matches `DESIGNED_FOR_CARD_META`). */
export const DEFAULT_DESIGNED_FOR_SLIDES: GallerySlide[] = [
  { src: "/workspace.jpg", alt: "Jirapa Executive Residence — workspace for NGO and development teams" },
  { src: "/hero-mansion.jpg", alt: "Jirapa Executive Residence — exterior for government and official visits" },
  { src: "/interior-living.jpg", alt: "Jirapa Executive Residence — living space for diaspora executives" },
  { src: "/outdoor-area.jpg", alt: "Jirapa Executive Residence — grounds for private retreats" },
];
