import { Metadata } from "next";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { resolvePublicGalleryLayout } from "@/lib/galleryLayout";

export const dynamic = "force-dynamic";

export const metadata: Metadata = {
  title: "Gallery",
  description: "Explore the Jirapa Executive Residence — photo gallery of the mansion, rooms, grounds, and facilities.",
  openGraph: {
    images: [{ url: "/og-image.png" }],
  },
};

export default async function GalleryPage() {
  const { galleryPage: images } = await resolvePublicGalleryLayout();

  return (
    <>
      <Navbar />
      <main className="pt-20">
        <section className="section-padding min-h-screen">
          <div className="max-w-7xl mx-auto">
            <div className="text-center mb-12">
              <p className="text-[#C9A96E] text-sm tracking-[0.3em] uppercase mb-3">See the Property</p>
              <h1 className="text-3xl md:text-5xl font-bold" style={{ fontFamily: "'Playfair Display', Georgia, serif" }}>
                The <span className="gold-gradient">Gallery</span>
              </h1>
              <p className="text-gray-400 mt-4 max-w-xl mx-auto">
                Curated photography of the residence, grounds, and surroundings ({images.length} images).
              </p>
            </div>

            {images.length === 0 ? (
              <p className="text-center text-gray-500">
                No images are selected for this page yet. Sign in to the admin dashboard under &quot;Gallery &amp; hero images&quot; to add
                photos, or add JPEG/WebP files under <code className="text-gray-400">public/gallery/</code> and save a layout.
              </p>
            ) : (
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
                {images.map((image) => (
                  <div
                    key={image.src}
                    className="group relative aspect-[4/3] rounded-xl overflow-hidden bg-[#111111] cursor-pointer"
                  >
                    {/* eslint-disable-next-line @next/next/no-img-element -- many items; native lazy decode */}
                    <img
                      src={image.src}
                      alt={image.alt}
                      loading="lazy"
                      decoding="async"
                      className="absolute inset-0 w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                    />
                    <div className="absolute inset-0 bg-black/0 group-hover:bg-black/30 transition-colors duration-300" />
                    <div className="absolute bottom-0 left-0 right-0 p-4 bg-gradient-to-t from-black/70 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                      <p className="text-white text-sm line-clamp-2">{image.alt}</p>
                    </div>
                  </div>
                ))}
              </div>
            )}

            <div className="text-center mt-12">
              <p className="text-gray-500 text-sm mb-4">Want to see more? Schedule a virtual or in-person tour.</p>
              <a href="/contact" className="btn-gold">
                Request a Tour
              </a>
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </>
  );
}
