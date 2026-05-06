const audiences = [
  {
    title: "NGO & Development Teams",
    description: "Secure base for field operations, donor visits, and regional coordination.",
    image: "/workspace.jpg",
  },
  {
    title: "Government Visits",
    description: "Private and professional setting for official delegations and ministerial stays.",
    image: "/hero-mansion.jpg",
  },
  {
    title: "Diaspora Executives",
    description: "A home-quality residence for professionals visiting from abroad who expect privacy and reliability.",
    image: "/interior-living.jpg",
  },
  {
    title: "Private Retreats",
    description: "Exclusive compound for personal retreats, family visits, and quiet time away from the city.",
    image: "/outdoor-area.jpg",
  },
];

export default function DesignedFor() {
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
          {audiences.map((audience) => (
            <div key={audience.title} className="group relative rounded-xl overflow-hidden card-hover">
              <div className="aspect-[3/2] relative">
                <div
                  className="absolute inset-0 bg-cover bg-center transition-transform duration-500 group-hover:scale-105"
                  style={{ backgroundImage: `url('${audience.image}')` }}
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
          ))}
        </div>
      </div>
    </section>
  );
}
