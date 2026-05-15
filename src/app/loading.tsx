export default function Loading() {
  return (
    <div className="flex items-center justify-center min-h-screen bg-[#0A0A0A]">
      <div className="flex flex-col items-center gap-4">
        <div className="w-12 h-12 border-2 border-[#C9A96E] border-t-transparent rounded-full animate-spin" />
        <p className="text-[#C9A96E] text-sm tracking-wide">Loading...</p>
      </div>
    </div>
  );
}
