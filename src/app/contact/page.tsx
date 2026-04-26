"use client";

import { useState } from "react";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";

export default function ContactPage() {
  const [form, setForm] = useState({
    name: "",
    email: "",
    organization: "",
    checkIn: "",
    checkOut: "",
    guests: "1",
    purpose: "",
    message: "",
  });
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // TODO: Wire to Supabase or email service
    console.log("Form submitted:", form);
    setSubmitted(true);
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  return (
    <>
      <Navbar />
      <main className="pt-20">
        <section className="section-padding min-h-screen">
          <div className="max-w-3xl mx-auto">
            <div className="text-center mb-10">
              <p className="text-[#C9A96E] text-sm tracking-[0.3em] uppercase mb-3">Get In Touch</p>
              <h1 className="text-3xl md:text-5xl font-bold" style={{ fontFamily: "'Playfair Display', Georgia, serif" }}>
                Request <span className="gold-gradient">Availability</span>
              </h1>
              <p className="text-gray-400 mt-4">
                Private bookings and institutional inquiries only. We&apos;ll respond within 24 hours.
              </p>
            </div>

            {submitted ? (
              <div className="bg-[#111111] border border-[#C9A96E]/30 rounded-xl p-8 text-center">
                <div className="w-16 h-16 rounded-full bg-[#C9A96E]/10 flex items-center justify-center mx-auto mb-4">
                  <svg className="w-8 h-8 text-[#C9A96E]" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" /></svg>
                </div>
                <h2 className="text-2xl font-semibold mb-2" style={{ fontFamily: "'Playfair Display', Georgia, serif" }}>
                  Inquiry Received
                </h2>
                <p className="text-gray-400">Thank you for your interest. We&apos;ll be in touch shortly.</p>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="bg-[#111111] border border-[#1F1F1F] rounded-xl p-6 md:p-8 space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <label className="block text-sm text-gray-400 mb-1.5">Full Name *</label>
                    <input
                      type="text"
                      name="name"
                      required
                      value={form.name}
                      onChange={handleChange}
                      className="w-full bg-[#0A0A0A] border border-[#1F1F1F] rounded-lg px-4 py-3 text-white focus:border-[#C9A96E] focus:outline-none transition-colors"
                      placeholder="Your name"
                    />
                  </div>
                  <div>
                    <label className="block text-sm text-gray-400 mb-1.5">Email *</label>
                    <input
                      type="email"
                      name="email"
                      required
                      value={form.email}
                      onChange={handleChange}
                      className="w-full bg-[#0A0A0A] border border-[#1F1F1F] rounded-lg px-4 py-3 text-white focus:border-[#C9A96E] focus:outline-none transition-colors"
                      placeholder="you@organization.com"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-sm text-gray-400 mb-1.5">Organization</label>
                  <input
                    type="text"
                    name="organization"
                    value={form.organization}
                    onChange={handleChange}
                    className="w-full bg-[#0A0A0A] border border-[#1F1F1F] rounded-lg px-4 py-3 text-white focus:border-[#C9A96E] focus:outline-none transition-colors"
                    placeholder="NGO, government agency, company..."
                  />
                </div>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                  <div>
                    <label className="block text-sm text-gray-400 mb-1.5">Check-in *</label>
                    <input
                      type="date"
                      name="checkIn"
                      required
                      value={form.checkIn}
                      onChange={handleChange}
                      className="w-full bg-[#0A0A0A] border border-[#1F1F1F] rounded-lg px-4 py-3 text-white focus:border-[#C9A96E] focus:outline-none transition-colors"
                    />
                  </div>
                  <div>
                    <label className="block text-sm text-gray-400 mb-1.5">Check-out *</label>
                    <input
                      type="date"
                      name="checkOut"
                      required
                      value={form.checkOut}
                      onChange={handleChange}
                      className="w-full bg-[#0A0A0A] border border-[#1F1F1F] rounded-lg px-4 py-3 text-white focus:border-[#C9A96E] focus:outline-none transition-colors"
                    />
                  </div>
                  <div>
                    <label className="block text-sm text-gray-400 mb-1.5">Guests</label>
                    <select
                      name="guests"
                      value={form.guests}
                      onChange={handleChange}
                      className="w-full bg-[#0A0A0A] border border-[#1F1F1F] rounded-lg px-4 py-3 text-white focus:border-[#C9A96E] focus:outline-none transition-colors"
                    >
                      {[1, 2, 3, 4, 5, 6].map((n) => (
                        <option key={n} value={n}>{n} {n === 1 ? "guest" : "guests"}</option>
                      ))}
                    </select>
                  </div>
                </div>

                <div>
                  <label className="block text-sm text-gray-400 mb-1.5">Purpose of Stay</label>
                  <select
                    name="purpose"
                    value={form.purpose}
                    onChange={handleChange}
                    className="w-full bg-[#0A0A0A] border border-[#1F1F1F] rounded-lg px-4 py-3 text-white focus:border-[#C9A96E] focus:outline-none transition-colors"
                  >
                    <option value="">Select...</option>
                    <option value="ngo">NGO / Development Work</option>
                    <option value="government">Government Visit</option>
                    <option value="diaspora">Diaspora Executive Stay</option>
                    <option value="private">Private Retreat</option>
                    <option value="consulting">Consulting / Audit</option>
                    <option value="other">Other</option>
                  </select>
                </div>

                <div>
                  <label className="block text-sm text-gray-400 mb-1.5">Additional Details</label>
                  <textarea
                    name="message"
                    rows={4}
                    value={form.message}
                    onChange={handleChange}
                    className="w-full bg-[#0A0A0A] border border-[#1F1F1F] rounded-lg px-4 py-3 text-white focus:border-[#C9A96E] focus:outline-none transition-colors resize-none"
                    placeholder="Any special requirements, questions, or details about your stay..."
                  />
                </div>

                <button type="submit" className="btn-gold w-full justify-center text-base py-4">
                  Submit Inquiry
                </button>
              </form>
            )}
          </div>
        </section>
      </main>
      <Footer />
    </>
  );
}