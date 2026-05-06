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
  // Additional interiors & spaces from the full shoot (DSC series)
  gallery("DSC03700.jpg", "interior"),
  gallery("DSC03704.jpg", "interior"),
  gallery("DSC03708.jpg", "interior"),
  gallery("DSC03712.jpg", "interior"),
  gallery("DSC03716.jpg", "interior"),
  gallery("DSC03720.jpg", "interior"),
  gallery("DSC03728.jpg", "interior"),
  gallery("DSC03731.jpg", "interior"),
  gallery("DSC03740.jpg", "interior"),
  gallery("DSC03770.jpg", "interior"),
  gallery("DSC03800.jpg", "interior"),
  gallery("DSC03812.jpg", "interior"),
  gallery("DSC03830.jpg", "interior"),
  gallery("DSC03849.jpg", "interior"),
  gallery("DSC03914.jpg", "interior"),
  gallery("DSC03960.jpg", "interior"),
  gallery("DSC04016.jpg", "interior"),
  gallery("DSC04045.jpg", "interior"),
  gallery("DSC04058.jpg", "interior"),
  gallery("DSC04075.jpg", "interior"),
];
