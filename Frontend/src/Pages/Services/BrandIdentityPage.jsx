import { useEffect } from "react";
import AOS from "aos";
import "aos/dist/aos.css";
import StorySection from "../../Components/Servicespage/BrandIdentity/StorySection/StorySection.jsx";
import ShowcaseSection from "../../Components/Servicespage/BrandIdentity/BrandingProcess/BrandingProcess.jsx";
import ServicesSection from "../../Components/Servicespage/BrandIdentity/WhatWeOffer/WhatWeOffer.jsx";
import CTASection from "../../Components/Servicespage/BrandIdentity/CTASection/CTASection.jsx";
import "../../css/BrandIdentityPage.css";
import ServiceHero from "../../Components/Servicespage/ServiceHero";

export default function BrandIdentityPage() {
  useEffect(() => {
    AOS.init({ duration: 1200, once: true });
  }, []);

  return (
    <div className="brand-identity-page">
      <ServiceHero
        title="Craft a Brand Identity That Speaks for You."
        subtitle="At SmediaTek Solutions, we help you build a bold, consistent, and unforgettable brand — from strategy to visuals. Whether you're launching a new business or refreshing your image, we design identities that inspire trust, connect with audiences, and drive long-term growth."
        bgImage="https://media.istockphoto.com/id/2187408419/photo/tablet-office-and-black-woman-in-business-at-night-to-research-or-review-design-for-ads.jpg?s=612x612&w=0&k=20&c=IGhQceIeCNZbi2L1Or9GwwvKRwPkx7GtNRG7Ps3KyXw="
      />
      <StorySection />
      <ShowcaseSection />
      <ServicesSection />
      <CTASection />
    </div>
  );
}
