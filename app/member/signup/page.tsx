"use client";

import { useEffect } from "react";
import { useRouter } from "next/navigation";
import { motion } from "framer-motion";
import { UserPlus, ArrowRight, ExternalLink } from "lucide-react";
import Link from "next/link";
import Header from "@/components/Header";

// 어메이징사업부.com 회원가입 URL
// 개발 환경: http://localhost:3000/register
// 프로덕션: https://어메이징사업부.com/register
const AMAZING_BIZ_REGISTER_URL = process.env.NEXT_PUBLIC_AMAZING_BIZ_REGISTER_URL || "http://localhost:3000/register";

export default function SignupPage() {
  const router = useRouter();

  useEffect(() => {
    // 자동 리다이렉트 (선택사항 - 원하면 주석 처리)
    // router.push(AMAZING_BIZ_REGISTER_URL);
  }, [router]);

  const handleRedirect = () => {
    window.location.href = AMAZING_BIZ_REGISTER_URL;
  };

  return (
    <main className="min-h-screen bg-gradient-to-b from-white to-cool-gray">
      <Header />
      <div className="max-w-2xl mx-auto px-6 lg:px-8 py-32 pt-32">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="text-center mb-8"
        >
          <div className="inline-flex items-center justify-center w-20 h-20 bg-gradient-to-br from-electric-blue to-blue-600 rounded-3xl mb-6 shadow-lg">
            <UserPlus className="w-10 h-10 text-white" />
          </div>
          <h1 className="text-4xl md:text-5xl font-bold text-slate-900 mb-4">
            회원가입
          </h1>
          <p className="text-xl text-slate-600">
            통합 회원 시스템 안내
          </p>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          className="glass rounded-3xl p-8 md:p-10 shadow-soft border border-slate-200/50"
        >
          <div className="space-y-6 text-center">
            <div className="bg-blue-50 border border-blue-200 rounded-xl p-6">
              <h2 className="text-xl font-semibold text-slate-900 mb-3">
                통합 회원 시스템
              </h2>
              <p className="text-slate-700 leading-relaxed mb-4">
                프라임에셋.com과 어메이징사업부.com은 통합 회원 시스템을 사용합니다.
                <br />
                회원가입은 <strong>어메이징사업부.com</strong>에서만 가능하며,
                <br />
                가입하신 계정으로 두 사이트 모두 로그인하실 수 있습니다.
              </p>
            </div>

            <div className="space-y-4">
              <motion.button
                onClick={handleRedirect}
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                className="w-full bg-gradient-to-r from-electric-blue to-blue-600 text-white font-semibold py-4 rounded-xl shadow-lg hover:shadow-xl transition-all flex items-center justify-center gap-2"
              >
                <span>어메이징사업부.com에서 회원가입</span>
                <ExternalLink className="w-5 h-5" />
              </motion.button>

              <div className="pt-4 border-t border-slate-200">
                <Link
                  href="/member"
                  className="inline-flex items-center text-slate-600 hover:text-electric-blue transition-colors"
                >
                  <ArrowRight className="w-4 h-4 mr-2 rotate-180" />
                  로그인 페이지로 돌아가기
                </Link>
              </div>
            </div>
          </div>
        </motion.div>
      </div>
    </main>
  );
}
