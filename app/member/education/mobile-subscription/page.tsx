"use client";

import Link from "next/link";
import MemberHeader from "@/components/MemberHeader";
import MobileEnroll77Simulator from "@/components/MobileEnroll77Simulator";

export default function MobileSubscriptionTrainingPage() {
  return (
    <main className="min-h-screen bg-gradient-to-b from-slate-50 via-white to-slate-100">
      <MemberHeader />
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-28">
        <div className="mb-5 flex items-center justify-between gap-3">
          <h1 className="text-xl sm:text-2xl font-bold text-slate-900">모바일청약 실전 시뮬레이션</h1>
          <Link
            href="/member/education"
            className="text-sm font-medium text-slate-600 hover:text-slate-900 transition-colors"
          >
            교육방으로 돌아가기
          </Link>
        </div>

        <div className="rounded-2xl border border-slate-200 bg-white/70 backdrop-blur-sm p-3 sm:p-5">
          <MobileEnroll77Simulator />
        </div>
      </div>
    </main>
  );
}

