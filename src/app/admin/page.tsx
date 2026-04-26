"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";

type Counts = {
  pending: number;
  confirmed: number;
  total: number;
};

export default function AdminPage() {
  const [counts, setCounts] = useState<Counts>({ pending: 0, confirmed: 0, total: 0 });
  const [password, setPassword] = useState("");
  const [authed, setAuthed] = useState(false);
  const [error, setError] = useState("");

  useEffect(() => {
    const stored = sessionStorage.getItem("jer_admin_auth");
    if (stored === "true") {
      setAuthed(true);
      fetchCounts();
    }
  }, []);

  async function fetchCounts() {
    try {
      const res = await fetch("/api/admin/bookings-list");
      const data = await res.json();
      const bookings = data.bookings || [];
      setCounts({
        pending: bookings.filter((b: { status: string }) => b.status === "pending").length,
        confirmed: bookings.filter((b: { status: string }) => b.status === "confirmed").length,
        total: bookings.length,
      });
    } catch (err) {
      console.error("Failed to fetch counts:", err);
    }
  }

  function handleLogin(e: React.FormEvent) {
    e.preventDefault();
    if (password === "jer-admin-2026") {
      setAuthed(true);
      setError("");
      sessionStorage.setItem("jer_admin_auth", "true");
      fetchCounts();
    } else {
      setError("Invalid password");
    }
  }

  if (!authed) {
    return (
      <>
        <Navbar />
        <main className="pt-20 min-h-screen flex items-center justify-center bg-[#0A0A0A]">
          <form onSubmit={handleLogin} className="bg-[#111111] border border-[#1F1F1F] rounded-xl p-8 w-full max-w-sm">
            <h2 className="text-2xl font-bold mb-2 text-center" style={{ fontFamily: "'Playfair Display', Georgia, serif" }}>
              JER Admin
            </h2>
            <p className="text-gray-500 text-sm text-center mb-6">Enter admin password to continue</p>
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="w-full bg-[#0A0A0A] border border-[#1F1F1F] rounded-lg px-4 py-3 text-white focus:border-[#C9A96E] focus:outline-none transition-colors mb-4"
              placeholder="Admin password"
              autoFocus
            />
            {error && <p className="text-red-400 text-sm mb-4">{error}</p>}
            <button type="submit" className="btn-gold w-full justify-center">
              Sign In
            </button>
          </form>
        </main>
        <Footer />
      </>
    );
  }

  return (
    <>
      <Navbar />
      <main className="pt-20 min-h-screen bg-[#0A0A0A]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          <div className="mb-8">
            <p className="text-[#C9A96E] text-sm tracking-[0.3em] uppercase mb-1">Admin Dashboard</p>
            <h1 className="text-3xl font-bold" style={{ fontFamily: "'Playfair Display', Georgia, serif" }}>
              Jirapa Executive Residence
            </h1>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
            <div className="bg-[#111111] border border-[#1F1F1F] rounded-xl p-6">
              <p className="text-yellow-400 text-3xl font-bold">{counts.pending}</p>
              <p className="text-gray-400 text-sm mt-1">Pending Bookings</p>
            </div>
            <div className="bg-[#111111] border border-[#1F1F1F] rounded-xl p-6">
              <p className="text-green-400 text-3xl font-bold">{counts.confirmed}</p>
              <p className="text-gray-400 text-sm mt-1">Confirmed Bookings</p>
            </div>
            <div className="bg-[#111111] border border-[#1F1F1F] rounded-xl p-6">
              <p className="text-[#C9A96E] text-3xl font-bold">{counts.total}</p>
              <p className="text-gray-400 text-sm mt-1">Total Inquiries</p>
            </div>
          </div>

          <Link
            href="/admin/bookings"
            className="btn-gold inline-flex items-center"
          >
            Manage Bookings
            <svg className="w-4 h-4 ml-2" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" /></svg>
          </Link>
        </div>
      </main>
      <Footer />
    </>
  );
}