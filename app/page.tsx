import Header from "@/components/Header";
import Hero from "@/components/Hero";
import StatsSection from "@/components/StatsSection";
import SectionDivider from "@/components/SectionDivider";
import SocialProofSection from "@/components/SocialProofSection";
import WhyNowStrip from "@/components/WhyNowStrip";
import DBTransparencyFlowSection from "@/components/DBTransparencyFlowSection";
import FeaturesBentoSection from "@/components/FeaturesBentoSection";
import EcosystemSection from "@/components/EcosystemSection";
import ChannelGrowthSection from "@/components/ChannelGrowthSection";
import EarningsProofSection from "@/components/EarningsProofSection";
import ProcessSection from "@/components/ProcessSection";
import OnboardingTimelineSection from "@/components/OnboardingTimelineSection";
import ProofPackSection from "@/components/ProofPackSection";
import StudioGallerySection from "@/components/StudioGallerySection";
import TestimonialsSection from "@/components/TestimonialsSection";
import RecruitSection from "@/components/RecruitSection";
import FAQSection from "@/components/FAQSection";
import FinalCTASection from "@/components/FinalCTASection";
import Footer from "@/components/Footer";
import FloatingContactDock from "@/components/FloatingContactDock";

export default function Home() {
  return (
    <main className="min-h-screen min-w-0 overflow-x-hidden">
      <Header />
      <Hero />

      <StatsSection />
      <SectionDivider variant="light" />

      <SocialProofSection />
      <WhyNowStrip />
      <DBTransparencyFlowSection />
      <SectionDivider variant="light" />

      <FeaturesBentoSection />
      <SectionDivider variant="light" />

      <EcosystemSection />
      <SectionDivider variant="light" />

      <ChannelGrowthSection />
      <SectionDivider variant="light" />

      <EarningsProofSection />
      <SectionDivider variant="light" />

      <ProcessSection />
      <SectionDivider variant="light" />

      <OnboardingTimelineSection />
      <SectionDivider variant="light" />

      <ProofPackSection />
      <SectionDivider variant="light" />

      <StudioGallerySection />
      <SectionDivider variant="light" />

      <TestimonialsSection />
      <RecruitSection />
      <FAQSection />
      <FinalCTASection />
      <Footer />

      <FloatingContactDock />
    </main>
  );
}
