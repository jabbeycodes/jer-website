import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";

const images = [
  { src: "/interior-living.jpg", alt: "Elegant living room" },
  { src: "/hero-mansion.jpg", alt: "Residence exterior at dusk" },
  { src: "/outdoor-area.jpg", alt: "Pool and outdoor area" },
  { src: "/exterior-day.jpg", alt: "Building exterior" },
  { src: "/workspace.jpg", alt: "Modern residence" },
  { src: "/bedroom.jpg", alt: "Interior design" },
];

export default function GalleryPage() {
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
                A curated look at the residence, grounds, and amenities. Professional photography coming soon.
              </p>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
              {images.map((image, index) => (
                <div
                  key={index}
                  className="group relative aspect-[4/3] rounded-xl overflow-hidden bg-[#111111] cursor-pointer"
                >
                  <div
                    className="absolute inset-0 bg-cover bg-center transition-transform duration-500 group-hover:scale-105"
                    style={{ backgroundImage: `url('${image.src}')` }}
                  />
                  <div className="absolute inset-0 bg-black/0 group-hover:bg-black/30 transition-colors duration-300" />
                  <div className="absolute bottom-0 left-0 right-0 p-4 bg-gradient-to-t from-black/70 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                    <p className="text-white text-sm">{image.alt}</p>
                  </div>
                </div>
              ))}
            </div>

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

