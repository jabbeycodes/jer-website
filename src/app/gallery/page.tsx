import fs from "node:fs";
import path from "node:path";

import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";

const GALLERY_DIR = path.join(process.cwd(), "public", "gallery");

function formatAlt(filename: string): string {
  const base = filename.replace(/\.[^.]+$/i, "").replace(/_/g, " ");
  return `Jirapa Executive Residence — ${base}`;
}

function getGalleryImages(): { src: string; alt: string }[] {
  if (!fs.existsSync(GALLERY_DIR)) return [];

  return fs
    .readdirSync(GALLERY_DIR)
    .filter((f) => /\.(jpe?g|webp)$/i.test(f))
    .sort((a, b) => a.localeCompare(b, undefined, { numeric: true, sensitivity: "base" }))
    .map((f) => ({
      src: `/gallery/${f}`,
      alt: formatAlt(f),
    }));
}

export default function GalleryPage() {
  const images = getGalleryImages();

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
                Full photography set of the residence, grounds, and surroundings ({images.length} images).
              </p>
            </div>

            {images.length === 0 ? (
              <p className="text-center text-gray-500">
                No gallery images found. Add JPEG files to <code className="text-gray-400">public/gallery/</code>.
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
              <a href="/contact" className="btn-gold">Request a Tour</a>
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </>
  );
}
