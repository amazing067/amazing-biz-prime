import Header from "@/components/Header";
import Hero from "@/components/Hero";
import PrimeAssetSection from "@/components/PrimeAssetSection";
import AmazingDivisionSection from "@/components/AmazingDivisionSection";
import TechSection from "@/components/TechSection";
import MediaSection from "@/components/MediaSection";
import SimulationSection from "@/components/SimulationSection";
import RecruitSection from "@/components/RecruitSection";
import Footer from "@/components/Footer";

export default function Home() {
  return (
    <main className="min-h-screen">
      <Header />
      <Hero />
      <PrimeAssetSection />
      <AmazingDivisionSection />
      <TechSection />
      <MediaSection />
      <SimulationSection />
      <RecruitSection />
      <Footer />
    </main>
  );
}
