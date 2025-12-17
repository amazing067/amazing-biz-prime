"use client";

import { useEffect } from "react";
import Header from "@/components/Header";
import AmazingDivisionSection from "@/components/AmazingDivisionSection";
import Footer from "@/components/Footer";

export default function AmazingPage() {
  useEffect(() => {
    // URL에 해시가 있으면 해당 섹션으로 스크롤
    const hash = window.location.hash;
    if (hash) {
      setTimeout(() => {
        const element = document.querySelector(hash);
        if (element) {
          element.scrollIntoView({ behavior: "smooth", block: "start" });
        }
      }, 100);
    }
  }, []);

  return (
    <main className="min-h-screen">
      <Header />
      <div className="pt-32">
        <AmazingDivisionSection />
      </div>
      <Footer />
    </main>
  );
}

