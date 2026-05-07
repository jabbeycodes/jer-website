/** Hero background rotation — paths must exist under `public/` (deployed as static files). */

export type HeroShot = { src: string; alt: string };

function gallery(name: string, label: string): HeroShot {
  return {
    src: `/gallery/${name}`,
    alt: `Jirapa Executive Residence — ${label}`,
  };
}

export const HERO_SHOTS: HeroShot[] = [
  { src: "/hero-mansion.jpg", alt: "Jirapa Executive Residence — aerial view of the mansion and compound" },
  { src: "/exterior-day.jpg", alt: "Jirapa Executive Residence — mansion exterior and façade" },
  { src: "/outdoor-area.jpg", alt: "Jirapa Executive Residence — grounds and outdoor areas" },
  { src: "/interior-living.jpg", alt: "Jirapa Executive Residence — living space" },
  { src: "/workspace.jpg", alt: "Jirapa Executive Residence — workspace and meetings" },
  { src: "/bedroom.jpg", alt: "Jirapa Executive Residence — guest accommodation" },
  // Keep hero visuals curated to avoid unwanted room categories.
  gallery("DJI_20260421110553_0025_D.jpg", "aerial compound view"),
  gallery("DJI_20260421111621_0041_D.jpg", "aerial residence view"),
];
