"use client";

import Header from "@/components/Header";
import PrimeAssetTabSection from "@/components/PrimeAssetTabSection";
import Footer from "@/components/Footer";

export default function PrimeAssetPage() {
  return (
    <main className="min-h-screen">
      <Header />
      <div className="pt-20">
        <PrimeAssetTabSection />
      </div>
      <Footer />
    </main>
  );
}

