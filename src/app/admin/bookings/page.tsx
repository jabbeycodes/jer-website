"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";

import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";

type Booking = {
  id: string;
  name: string;
  email: string;
  organization: string | null;
  check_in: string;
  check_out: string;
  guests: number;
  purpose: string | null;
  message: string | null;
  status: string;
  created_at: string;
  updated_at: string;
};

const statusColors: Record<string, string> = {
  pending: "bg-yellow-500/20 text-yellow-400 border-yellow-500/30",
  confirmed: "bg-green-500/20 text-green-400 border-green-500/30",
  declined: "bg-red-500/20 text-red-400 border-red-500/30",
  completed: "bg-blue-500/20 text-blue-400 border-blue-500/30",
};

export default function AdminBookings() {
  const router = useRouter();
  const [bookings, setBookings] = useState<Booking[]>([]);
  const [loading, setLoading] = useState(true);
  const [redirecting, setRedirecting] = useState(false);
  const [actionError, setActionError] = useState<string | null>(null);
  const [logoutBusy, setLogoutBusy] = useState(false);

  useEffect(() => {
    async function load() {
      setActionError(null);
      const me = await fetch("/api/admin/me", { credentials: "same-origin" });
      if (!me.ok) {
        setRedirecting(true);
        router.replace("/admin?next=/admin/bookings");
        return;
      }

      const res = await fetch("/api/admin/bookings-list", { credentials: "same-origin" });
      if (!res.ok) {
        setActionError("Could not load bookings. Try again, or sign out and sign back in.");
        setBookings([]);
      } else {
        const data = await res.json();
        setBookings(data.bookings || []);
      }
      setLoading(false);
    }
    void load();
  }, [router]);

  async function updateStatus(id: string, status: string) {
    setActionError(null);
    if (status === "declined" && !window.confirm("Decline this booking request?")) {
      return;
    }
    try {
      const res = await fetch("/api/admin/booking-update", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        credentials: "same-origin",
        body: JSON.stringify({ id, status }),
      });
      const data = await res.json().catch(() => ({}));
      if (!res.ok) {
        setActionError(typeof data.error === "string" ? data.error : "Update failed.");
        return;
      }
      setBookings((prev) =>
        prev.map((b) => (b.id === id ? { ...b, status, updated_at: new Date().toISOString() } : b))
      );
    } catch {
      setActionError("Network error while updating.");
    }
  }

  async function handleLogout() {
    setLogoutBusy(true);
    try {
      await fetch("/api/admin/logout", { method: "POST", credentials: "same-origin" });
      router.replace("/admin");
    } finally {
      setLogoutBusy(false);
    }
  }

  if (redirecting) {
    return (
      <>
        <Navbar />
        <main className="pt-20 min-h-screen flex items-center justify-center bg-[#111111]">
          <p className="text-gray-500">Redirecting to sign in…</p>
        </main>
        <Footer />
      </>
    );
  }

  return (
    <>
      <Navbar />
      <main className="pt-20 min-h-screen bg-[#111111]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 mb-8">
            <div>
              <p className="text-[#C9A96E] text-sm tracking-[0.3em] uppercase mb-1">Admin Dashboard</p>
              <h1 className="text-2xl md:text-3xl font-bold" style={{ fontFamily: "'Playfair Display', Georgia, serif" }}>
                Booking Management
              </h1>
            </div>
            <div className="flex flex-wrap items-center gap-3">
              <div className="flex gap-4 text-sm">
                <div className="bg-[#111111] border border-[#1F1F1F] rounded-lg px-4 py-2">
                  <span className="text-yellow-400 font-bold">{bookings.filter((b) => b.status === "pending").length}</span>{" "}
                  <span className="text-gray-400">Pending</span>
                </div>
                <div className="bg-[#111111] border border-[#1F1F1F] rounded-lg px-4 py-2">
                  <span className="text-green-400 font-bold">{bookings.filter((b) => b.status === "confirmed").length}</span>{" "}
                  <span className="text-gray-400">Confirmed</span>
                </div>
              </div>
              <Link href="/admin" className="text-sm text-gray-400 hover:text-white border border-[#1F1F1F] rounded-lg px-4 py-2">
                Dashboard
              </Link>
              <button
                type="button"
                onClick={() => void handleLogout()}
                disabled={logoutBusy}
                className="text-sm text-gray-400 hover:text-white border border-[#1F1F1F] rounded-lg px-4 py-2 disabled:opacity-50"
              >
                {logoutBusy ? "Signing out…" : "Sign out"}
              </button>
            </div>
          </div>

          {actionError && (
            <div className="mb-6 rounded-lg border border-red-500/40 bg-red-500/10 px-4 py-3 text-sm text-red-300">{actionError}</div>
          )}

          {loading ? (
            <div className="text-center py-20 text-gray-500">Loading bookings...</div>
          ) : bookings.length === 0 ? (
            <div className="text-center py-20">
              <p className="text-gray-400 text-lg">No bookings yet.</p>
              <p className="text-gray-500 text-sm mt-2">Bookings from the contact form will appear here.</p>
            </div>
          ) : (
            <div className="space-y-4">
              {bookings
                .sort((a, b) => new Date(b.created_at).getTime() - new Date(a.created_at).getTime())
                .map((booking) => (
                  <div key={booking.id} className="bg-[#111111] border border-[#1F1F1F] rounded-xl p-6 card-hover">
                    <div className="flex flex-col md:flex-row md:items-start justify-between gap-4">
                      <div className="flex-1">
                        <div className="flex items-center gap-3 mb-2">
                          <h3 className="text-lg font-semibold">{booking.name}</h3>
                          <span
                            className={`text-xs px-2 py-0.5 rounded-full border ${
                              statusColors[booking.status] || "bg-gray-500/20 text-gray-400 border-gray-500/30"
                            }`}
                          >
                            {booking.status}
                          </span>
                        </div>
                        <p className="text-gray-400 text-sm">{booking.email}</p>
                        {booking.organization && <p className="text-gray-500 text-sm mt-0.5">{booking.organization}</p>}
                      </div>

                      <div className="flex flex-col md:items-end gap-1 text-sm">
                        <p className="text-gray-400">
                          <span className="text-gray-500">Check-in:</span> {new Date(booking.check_in).toLocaleDateString()}
                        </p>
                        <p className="text-gray-400">
                          <span className="text-gray-500">Check-out:</span> {new Date(booking.check_out).toLocaleDateString()}
                        </p>
                        <p className="text-gray-400">
                          <span className="text-gray-500">Guests:</span> {booking.guests}
                        </p>
                        {booking.purpose && (
                          <p className="text-gray-400">
                            <span className="text-gray-500">Purpose:</span> {booking.purpose}
                          </p>
                        )}
                      </div>
                    </div>

                    {booking.message && (
                      <p className="text-gray-400 text-sm mt-3 border-l-2 border-[#C9A96E]/30 pl-4">{booking.message}</p>
                    )}

                    {booking.status === "pending" && (
                      <div className="flex gap-2 mt-4">
                        <button
                          type="button"
                          onClick={() => void updateStatus(booking.id, "confirmed")}
                          className="px-4 py-2 rounded-lg bg-green-600/20 border border-green-500/30 text-green-400 text-sm hover:bg-green-600/30 transition-colors"
                        >
                          Confirm
                        </button>
                        <button
                          type="button"
                          onClick={() => void updateStatus(booking.id, "declined")}
                          className="px-4 py-2 rounded-lg bg-red-600/20 border border-red-500/30 text-red-400 text-sm hover:bg-red-600/30 transition-colors"
                        >
                          Decline
                        </button>
                      </div>
                    )}

                    {booking.status === "confirmed" && (
                      <div className="flex gap-2 mt-4">
                        <button
                          type="button"
                          onClick={() => void updateStatus(booking.id, "completed")}
                          className="px-4 py-2 rounded-lg bg-blue-600/20 border border-blue-500/30 text-blue-400 text-sm hover:bg-blue-600/30 transition-colors"
                        >
                          Mark Completed
                        </button>
                      </div>
                    )}
                  </div>
                ))}
            </div>
          )}
        </div>
      </main>
      <Footer />
    </>
  );
}
