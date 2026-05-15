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

import Script from "next/script";

const structuredData = {
  "@context": "https://schema.org",
  "@type": "LodgingBusiness",
  name: "Jirapa Executive Residence",
  image: "https://www.jirapaexecutive.com/og-image.png",
  url: "https://www.jirapaexecutive.com",
  telephone: "+233-XX-XXX-XXXX",
  address: {
    "@type": "PostalAddress",
    streetAddress: "Jirapa",
    addressLocality: "Jirapa",
    addressRegion: "Upper West Region",
    addressCountry: "GH",
  },
  geo: {
    "@type": "GeoCoordinates",
    latitude: "10.5322",
    longitude: "-2.7000",
  },
  amenityFeature: [
    { "@type": "LocationFeatureSpecification", name: "Electric Fencing", value: true },
    { "@type": "LocationFeatureSpecification", name: "24/7 Surveillance", value: true },
    { "@type": "LocationFeatureSpecification", name: "Starlink Internet", value: true },
    { "@type": "LocationFeatureSpecification", name: "Private Compound", value: true },
    { "@type": "LocationFeatureSpecification", name: "Backup Power", value: true },
  ],
  priceRange: "$$$",
  starRating: {
    "@type": "Rating",
    ratingValue: "5",
  },
};

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
      <Script
        id="structured-data"
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(structuredData) }}
      />
    </>
  );
}
