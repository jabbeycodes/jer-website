import Link from "next/link";

export default function CTASection() {
  return (
    <section className="section-padding bg-[#111111]">
      <div className="max-w-4xl mx-auto text-center">
        <p className="text-[#C9A96E] text-sm tracking-[0.3em] uppercase mb-3">Book Your Stay</p>
        <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold mb-6" style={{ fontFamily: "'Playfair Display', Georgia, serif" }}>
          Secure Your Stay at <span className="gold-gradient">Jirapa Executive Residence</span>
        </h2>
        <p className="text-gray-400 text-lg mb-10 max-w-2xl mx-auto">
          Private bookings and institutional inquiries only. Contact us to check availability for your next stay in the Upper West Region.
        </p>
        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <Link href="/contact" className="btn-gold text-base px-8 py-4">
            Request Availability
          </Link>
          <a
            href="https://wa.me/14438501407"
            target="_blank"
            rel="noopener noreferrer"
            className="btn-outline text-base px-8 py-4"
          >
            <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24"><path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.149-1.255-.462-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347z"/><path d="M12 2C6.477 2 2 6.477 2 12c0 1.89.525 3.66 1.438 5.168L2 22l4.832-1.438A9.955 9.955 0 0012 22c5.523 0 10-4.477 10-10S17.523 2 12 2zm0 18c-1.66 0-3.2-.492-4.486-1.332l-.32-.192-2.898.856.856-2.898-.192-.32A7.963 7.963 0 014 12c0-4.411 3.589-8 8-8s8 3.589 8 8-3.589 8-8 8z" /></svg>
            WhatsApp Inquiry
          </a>
        </div>
      </div>
    </section>
  );
}
