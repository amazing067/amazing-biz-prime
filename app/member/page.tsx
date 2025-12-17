"use client";

import { motion } from "framer-motion";
import { LogIn, Lock, Video, BookOpen } from "lucide-react";
import Link from "next/link";
import Header from "@/components/Header";

export default function MemberPage() {
  return (
    <main className="min-h-screen bg-gradient-to-b from-white to-cool-gray">
      <Header />
      <div className="max-w-4xl mx-auto px-6 lg:px-8 py-32 pt-32">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="text-center mb-16"
        >
          <div className="inline-flex items-center justify-center w-20 h-20 bg-gradient-to-br from-electric-blue to-blue-600 rounded-3xl mb-6 shadow-lg">
            <Lock className="w-10 h-10 text-white" />
          </div>
          <h1 className="text-4xl md:text-5xl font-bold text-slate-900 mb-4">
            회원전용 서비스
          </h1>
          <p className="text-xl text-slate-600 mb-4">
            어메이징 사업부 설계사만 이용 가능한 전용 서비스입니다
          </p>
          <p className="text-lg text-slate-500 max-w-2xl mx-auto leading-relaxed">
            본 서비스는 어메이징 사업부에 소속된 설계사만 이용하실 수 있습니다.
            <br />
            로그인 후 회원전용방과 설계사교육방에 접근하여 다양한 자료와 교육 콘텐츠를
            이용하실 수 있습니다.
          </p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-12">
          {/* 회원전용방 */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            whileHover={{ y: -5, scale: 1.02 }}
            className="glass rounded-3xl p-8 shadow-soft border border-slate-200/50 cursor-pointer group"
          >
            <div className="flex items-center space-x-4 mb-4">
              <div className="w-12 h-12 bg-gradient-to-br from-purple-500 to-pink-500 rounded-xl flex items-center justify-center">
                <LogIn className="w-6 h-6 text-white" />
              </div>
              <h2 className="text-2xl font-bold text-slate-900">
                회원전용방
              </h2>
            </div>
            <p className="text-slate-600 mb-6 leading-relaxed">
              어메이징 사업부 설계사 전용 커뮤니티 공간입니다.
              <br />
              동료 설계사들과의 정보 공유, 영업 노하우, 각종 자료실 등을
              이용하실 수 있습니다.
            </p>
            <div className="flex items-center text-electric-blue group-hover:translate-x-2 transition-transform">
              <span className="font-medium">로그인 후 이용</span>
              <span className="ml-2">→</span>
            </div>
          </motion.div>

          {/* 설계사교육방 */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3 }}
            whileHover={{ y: -5, scale: 1.02 }}
            className="glass rounded-3xl p-8 shadow-soft border border-slate-200/50 cursor-pointer group"
          >
            <div className="flex items-center space-x-4 mb-4">
              <div className="w-12 h-12 bg-gradient-to-br from-emerald-500 to-teal-500 rounded-xl flex items-center justify-center">
                <Video className="w-6 h-6 text-white" />
              </div>
              <h2 className="text-2xl font-bold text-slate-900">
                설계사교육방
              </h2>
            </div>
            <p className="text-slate-600 mb-6 leading-relaxed">
              어메이징 사업부 설계사 전용 교육 콘텐츠입니다.
              <br />
              전문가 특강 동영상, 전산 시스템 활용 교육, 온라인 영업 노하우 등
              체계적인 교육 자료를 제공합니다.
            </p>
            <div className="flex items-center text-electric-blue group-hover:translate-x-2 transition-transform">
              <span className="font-medium">로그인 후 이용</span>
              <span className="ml-2">→</span>
            </div>
          </motion.div>
        </div>

        {/* 로그인 폼 영역 */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4 }}
          className="glass rounded-3xl p-10 shadow-soft border border-slate-200/50"
        >
          <h3 className="text-2xl font-bold text-slate-900 mb-6 text-center">
            로그인
          </h3>
          <form className="space-y-4">
            <div>
              <label
                htmlFor="username"
                className="block text-sm font-medium text-slate-700 mb-2"
              >
                아이디
              </label>
              <input
                type="text"
                id="username"
                className="w-full px-4 py-3 rounded-xl border border-slate-200 bg-white focus:outline-none focus:ring-2 focus:ring-electric-blue focus:border-transparent transition-all"
                placeholder="아이디를 입력하세요"
              />
            </div>
            <div>
              <label
                htmlFor="password"
                className="block text-sm font-medium text-slate-700 mb-2"
              >
                비밀번호
              </label>
              <input
                type="password"
                id="password"
                className="w-full px-4 py-3 rounded-xl border border-slate-200 bg-white focus:outline-none focus:ring-2 focus:ring-electric-blue focus:border-transparent transition-all"
                placeholder="비밀번호를 입력하세요"
              />
            </div>
            <motion.button
              type="submit"
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              className="w-full bg-gradient-to-r from-electric-blue to-blue-600 text-white font-semibold py-4 rounded-xl shadow-lg hover:shadow-xl transition-all"
            >
              로그인
            </motion.button>
          </form>
        </motion.div>

        {/* 홈으로 돌아가기 */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.5 }}
          className="text-center mt-8"
        >
          <Link
            href="/"
            className="text-slate-600 hover:text-electric-blue transition-colors"
          >
            ← 홈으로 돌아가기
          </Link>
        </motion.div>
      </div>
    </main>
  );
}

