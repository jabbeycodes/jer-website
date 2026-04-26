export default function Location() {
  return (
    <section className="section-padding bg-[#111111] border-t border-[#1F1F1F]">
      <div className="max-w-7xl mx-auto">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 items-center">
          {/* Map */}
          <div className="rounded-xl overflow-hidden border border-[#1F1F1F] aspect-[4/3] lg:aspect-auto lg:h-[400px] bg-[#111111] flex items-center justify-center">
            <iframe
              src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d15530.0!2d-2.7500!3d10.5333!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0xfd1e5e5e5e5e5e5%3A0x0!2sJirapa%2C%20Upper%20West%20Region%2C%20Ghana!5e0!3m2!1sen!2sgh!4v1700000000000!5m2!1sen!2sgh"
              width="100%"
              height="100%"
              style={{ border: 0, minHeight: "300px" }}
              allowFullScreen
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
              title="Jirapa, Upper West Ghana"
            />
          </div>

          {/* Content */}
          <div className="flex flex-col gap-6">
            <div>
              <p className="text-[#C9A96E] text-sm tracking-[0.3em] uppercase mb-3">Where We Are</p>
              <h2 className="text-3xl md:text-4xl font-bold" style={{ fontFamily: "'Playfair Display', Georgia, serif" }}>
                Strategically Located in <span className="gold-gradient">Jirapa</span>
              </h2>
            </div>
            <p className="text-gray-300 leading-relaxed">
              Ideal base for Upper West operations. Jirapa sits at the crossroads of the region — accessible, connected, and central to Wa, Lawra, and the broader Upper West corridor.
            </p>
            <div className="space-y-3">
              {[
                "Proximity to Wa regional capital",
                "Accessible by road from Tamale and Kumasi",
                "Central to Upper West development corridors",
                "Starlink connectivity for seamless remote work",
              ].map((item) => (
                <div key={item} className="flex items-center gap-3">
                  <svg className="w-5 h-5 text-[#C9A96E] flex-shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" /></svg>
                  <span className="text-gray-300 text-sm">{item}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
