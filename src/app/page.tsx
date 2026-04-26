import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import Hero from "@/components/Hero";
import WhyJER from "@/components/WhyJER";
import Experience from "@/components/Experience";
import Infrastructure from "@/components/Infrastructure";
import DesignedFor from "@/components/DesignedFor";
import Location from "@/components/Location";
import CTASection from "@/components/CTASection";

export default function Home() {
  return (
    <>
      <Navbar />
      <main>
        <Hero />
        <WhyJER />
        <Experience />
        <Infrastructure />
        <DesignedFor />
        <Location />
        <CTASection />
      </main>
      <Footer />
    </>
  );
}
