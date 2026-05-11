import { apiJson } from "@/lib/apiResponse";
import { listAllowedGallerySources } from "@/lib/galleryLayout";

export const dynamic = "force-dynamic";

export async function GET() {
  const assets = listAllowedGallerySources();
  return apiJson({ assets });
}
