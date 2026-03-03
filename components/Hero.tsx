"use client";

import { motion } from "framer-motion";
import { ArrowDown, Sparkles, FileText, BarChart3, Video, Calendar, Zap } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import HeroEcosystemTour from "@/components/HeroEcosystemTour";

// YouTube watch URL을 embed URL로 변환
function getEmbedVideoUrl(url: string | undefined): string | null {
  if (!url) return null;
  const match = url.match(/(?:youtube\.com\/watch\?v=|youtu\.be\/)([a-zA-Z0-9_-]+)/);
  if (match) return `https://www.youtube.com/embed/${match[1]}?autoplay=0&rel=0`;
  if (url.includes("youtube.com/embed/") || url.includes("vimeo.com")) return url;
  return null;
}

const heroVideoUrl = getEmbedVideoUrl(process.env.NEXT_PUBLIC_HERO_VIDEO_URL);

export default function Hero() {
  return (
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden bg-navy-deep bg-blueprint-grid bg-noise pt-24 pb-16">
      {/* 1. Mesh gradient */}
      <div className="absolute inset-0 bg-mesh-gradient opacity-90" />
      <div className="absolute inset-0 bg-gradient-to-b from-transparent via-navy-deep/50 to-navy-deep" />
      {/* 2. Glow orbs */}
      <motion.div
        className="absolute top-1/4 -right-32 w-96 h-96 bg-electric-blue/20 rounded-full blur-[120px]"
        animate={{ scale: [1, 1.2, 1], opacity: [0.4, 0.6, 0.4] }}
        transition={{ duration: 8, repeat: Infinity, ease: "easeInOut" }}
      />
      <motion.div
        className="absolute bottom-1/4 -left-32 w-80 h-80 bg-violet-500/15 rounded-full blur-[100px]"
        animate={{ scale: [1.2, 1, 1.2], opacity: [0.3, 0.5, 0.3] }}
        transition={{ duration: 10, repeat: Infinity, ease: "easeInOut" }}
      />
      {/* 3. Light streak (스캔 라인) – 가로 1개 */}
      <motion.div
        className="hero-light-streak hero-light-streak-h"
        animate={{ top: ["0%", "100%"] }}
        transition={{ duration: 6, repeat: Infinity, repeatDelay: 2, ease: "linear" }}
      />
      {/* 4. Light streak – 세로 1개 */}
      <motion.div
        className="hero-light-streak hero-light-streak-v"
        animate={{ left: ["0%", "100%"] }}
        transition={{ duration: 8, repeat: Infinity, repeatDelay: 3, ease: "linear" }}
      />

      <div className="relative z-10 w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center min-w-0">
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, ease: "easeOut" }}
          className="mb-8 flex justify-center"
        >
          <Image
            src="/prime-logo.png"
            alt="Prime Asset Amazing"
            width={200}
            height={66}
            className="h-14 md:h-20 w-auto opacity-95"
            priority
          />
        </motion.div>

        <motion.h1
          className="text-3xl sm:text-5xl md:text-6xl lg:text-7xl font-bold mb-6 leading-tight tracking-tight text-white break-words"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.1 }}
        >
          영업은 시스템이다.
          <br />
          <span className="bg-gradient-to-r from-blue-400 via-electric-blue to-violet-400 bg-clip-text text-transparent">
            DB 걱정 없는 어메이징한 성장
          </span>
        </motion.h1>

        <motion.p
          className="text-base sm:text-lg md:text-xl text-slate-300 mb-4 max-w-2xl mx-auto break-words"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.25 }}
        >
          포털 OS·AI·청구닷컴·치매검사까지. 영업에만 집중하세요.
        </motion.p>

        {/* Proof stat */}
        <motion.div
          className="inline-flex flex-wrap items-center justify-center gap-2 px-4 py-2 rounded-full bg-white/5 border border-white/10 text-slate-300 text-xs sm:text-sm mb-10 text-center max-w-full"
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.5, delay: 0.4 }}
        >
          <Sparkles className="w-4 h-4 text-amber-400" />
          <span>실제 운영 중인 4개 서비스 + 포털 OS</span>
        </motion.div>

        {/* CTA - 한 줄 CTA 강화 */}
        <motion.div
          className="flex flex-col sm:flex-row items-center justify-center gap-4"
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.5 }}
        >
          <Link href="#recruit" className="group">
            <motion.span
              className="inline-flex items-center gap-2 px-8 py-4 rounded-2xl font-semibold text-white bg-gradient-to-r from-electric-blue to-violet-600 shadow-lg shadow-electric-blue/25 hover:shadow-glow-blue transition-all duration-300"
              whileHover={{ y: -2, boxShadow: "0 20px 40px -12px rgba(37, 99, 235, 0.4)" }}
              whileTap={{ scale: 0.98 }}
            >
              1분 만에 무료 상담 신청
            </motion.span>
          </Link>
          <a
            href="#offer"
            className="text-slate-400 hover:text-white transition-colors text-sm font-medium"
          >
            지원 시스템 보기 →
          </a>
        </motion.div>

        {/* 영상/이미지 히어로: 소개 영상 또는 시스템 미리보기 */}
        <motion.div
          className="mt-16 md:mt-20 flex justify-center px-2 min-w-0 w-full"
          initial={{ opacity: 0, y: 40, rotateX: 8 }}
          animate={{ opacity: 1, y: 0, rotateX: 0 }}
          transition={{ duration: 1, delay: 0.6, ease: "easeOut" }}
          style={{ perspective: "1000px" }}
        >
          <motion.div
            className="relative w-full max-w-3xl rounded-2xl border border-white/10 bg-white/5 backdrop-blur-xl overflow-hidden shadow-2xl min-w-0"
            style={{ transform: "rotateX(5deg) rotateZ(-1deg)" }}
            whileHover={{ transform: "rotateX(2deg) rotateZ(0deg) scale(1.02)" }}
            transition={{ type: "spring", stiffness: 200 }}
          >
            {/* .env.local에 NEXT_PUBLIC_HERO_VIDEO_URL 설정 시 영상 표시 (YouTube 링크 가능) */}
            <div className="min-h-[420px] md:min-h-0 md:aspect-video rounded-t-2xl bg-navy-mid/90 border-b border-white/10 overflow-hidden flex items-center justify-center">
              {heroVideoUrl ? (
                <iframe
                  src={heroVideoUrl}
                  title="어메이징 영업지원 시스템 소개"
                  className="w-full h-full"
                  allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                  allowFullScreen
                />
              ) : (
                <HeroEcosystemTour />
              )}
            </div>
            <p className="text-center text-slate-500 text-xs py-3">어메이징 영업지원 시스템</p>
          </motion.div>
        </motion.div>

        <motion.div
          className="absolute bottom-8 left-1/2 -translate-x-1/2"
          animate={{ y: [0, 8, 0] }}
          transition={{ duration: 2, repeat: Infinity }}
        >
          <ArrowDown className="text-slate-500 w-6 h-6" aria-hidden />
        </motion.div>
      </div>
    </section>
  );
}
