import { DESIGNED_FOR_CARD_META, type GallerySlide } from "@/lib/galleryDefaults";

type Props = {
  slides: GallerySlide[];
};

export default function DesignedFor({ slides }: Props) {
  return (
    <section className="section-padding bg-[#111111]">
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-12">
          <p className="text-[#C9A96E] text-sm tracking-[0.3em] uppercase mb-3">Our Guests</p>
          <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold" style={{ fontFamily: "'Playfair Display', Georgia, serif" }}>
            Designed <span className="gold-gradient">For</span>
          </h2>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
          {DESIGNED_FOR_CARD_META.map((audience, index) => {
            const image = slides[index]?.src ?? "";
            const label = slides[index]?.alt ?? audience.title;
            return (
              <div key={audience.title} className="group relative rounded-xl overflow-hidden card-hover">
                <div className="aspect-[3/2] relative">
                  <div
                    role="img"
                    aria-label={label}
                    className="absolute inset-0 bg-cover bg-center transition-transform duration-500 group-hover:scale-105"
                    style={image ? { backgroundImage: `url('${image}')` } : undefined}
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/40 to-transparent" />
                  <div className="absolute bottom-0 left-0 right-0 p-6">
                    <h3 className="text-xl font-semibold mb-2" style={{ fontFamily: "'Playfair Display', Georgia, serif" }}>
                      {audience.title}
                    </h3>
                    <p className="text-gray-300 text-sm leading-relaxed">{audience.description}</p>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
