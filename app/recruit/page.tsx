import Link from "next/link";
import { ArrowDownRight, PhoneCall } from "lucide-react";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import RecruitSection from "@/components/RecruitSection";

export default function RecruitLandingPage() {
  return (
    <main className="min-h-screen min-w-0 overflow-x-hidden bg-white">
      <Header />

      <section className="pt-28 pb-10 bg-gradient-to-b from-blue-50 via-white to-white">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="inline-flex items-center rounded-full border border-blue-200 bg-blue-50 px-3 py-1 text-xs sm:text-sm text-blue-700 font-medium">
            프라임에셋 어메이징 사업부 입사지원
          </div>
          <h1 className="mt-4 text-3xl sm:text-4xl md:text-5xl font-bold text-slate-900 leading-tight">
            지금 바로 지원하고
            <br />
            빠르게 상담 받아보세요
          </h1>

          <div className="mt-8 flex flex-col sm:flex-row gap-3">
            <Link
              href="#recruit-form"
              className="inline-flex items-center justify-center gap-2 rounded-xl bg-gradient-to-r from-electric-blue to-blue-600 px-5 py-3 text-white font-semibold shadow-md hover:shadow-lg transition"
            >
              바로 지원하기
              <ArrowDownRight className="w-4 h-4" />
            </Link>
            <a
              href="tel:010-2673-5790"
              className="inline-flex items-center justify-center gap-2 rounded-xl border border-slate-300 bg-white px-5 py-3 text-slate-700 font-semibold hover:bg-slate-50 transition"
            >
              빠른 전화 상담
              <PhoneCall className="w-4 h-4" />
            </a>
          </div>
        </div>
      </section>

      <RecruitSection variant="landing" sectionId="recruit-form" />
      <Footer />
    </main>
  );
}
