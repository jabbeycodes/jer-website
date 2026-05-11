import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import Hero from "@/components/Hero";
import WhyJER from "@/components/WhyJER";
import Experience from "@/components/Experience";
import Infrastructure from "@/components/Infrastructure";
import DesignedFor from "@/components/DesignedFor";
import Location from "@/components/Location";
import CTASection from "@/components/CTASection";
import { getExperienceVideoEmbedUrl } from "@/lib/experienceVideo";
import { resolvePublicSiteMedia } from "@/lib/galleryLayout";

export const dynamic = "force-dynamic";

export default async function Home() {
  const { designedFor } = await resolvePublicSiteMedia();
  const experienceEmbedUrl = getExperienceVideoEmbedUrl();

  return (
    <>
      <Navbar />
      <main>
        <Hero />
        <WhyJER />
        <Experience embedUrl={experienceEmbedUrl} />
        <Infrastructure />
        <DesignedFor slides={designedFor} />
        <Location />
        <CTASection />
      </main>
      <Footer />
    </>
  );
}
