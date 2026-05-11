/**
 * Maps API errors to user-visible copy without exposing stack traces, env names, or DB hints.
 * Safe to import from client components (no secrets).
 */

export function bookingFormUserMessage(status: number, body: { error?: string }): string {
  const dev = process.env.NODE_ENV === "development";

  if (status === 400 && body.error) {
    return body.error;
  }

  if (dev && body.error) {
    return body.error;
  }

  if (status === 503) {
    return "Bookings are temporarily unavailable. Please try again later or contact us on WhatsApp.";
  }

  if (status === 502) {
    return "We could not save your inquiry. Please try again or use WhatsApp below.";
  }

  if (status === 429) {
    return "Too many submissions from this device. Please wait a few minutes or message us on WhatsApp.";
  }

  return "Something went wrong. Please try again or contact us directly.";
}
