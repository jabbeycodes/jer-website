/** Default tour embed (YouTube). Override with NEXT_PUBLIC_EXPERIENCE_VIDEO_EMBED_URL in env. */
export const DEFAULT_EXPERIENCE_VIDEO_EMBED_URL =
  "https://www.youtube.com/embed/6s0ZPDT2wac?rel=0&modestbranding=1";

export function getExperienceVideoEmbedUrl(): string {
  const raw = process.env.NEXT_PUBLIC_EXPERIENCE_VIDEO_EMBED_URL?.trim();
  if (!raw) return DEFAULT_EXPERIENCE_VIDEO_EMBED_URL;
  if (!raw.startsWith("https://")) return DEFAULT_EXPERIENCE_VIDEO_EMBED_URL;
  if (raw.includes("..")) return DEFAULT_EXPERIENCE_VIDEO_EMBED_URL;
  return raw;
}
