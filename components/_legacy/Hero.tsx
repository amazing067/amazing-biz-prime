"use client";

import { motion } from "framer-motion";
import { ArrowDown, Sparkles } from "lucide-react";
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
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden bg-gradient-to-b from-[#eef2f8] via-[#e8eef7] to-[#dde6f3] pt-24 pb-16">
      <div className="absolute inset-0 bg-blueprint-grid opacity-[0.12]" />
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,rgba(56,189,248,0.08),rgba(56,189,248,0)_60%)]" />
      <div className="absolute inset-0 bg-gradient-to-br from-sky-100/60 via-transparent to-violet-100/40" />
      <div className="absolute inset-0 bg-gradient-to-tr from-amber-100/35 via-transparent to-transparent" />
      <div className="absolute inset-0 bg-gradient-to-b from-navy-deep/6 via-transparent to-navy-deep/18" />

      <motion.div
        className="absolute top-20 left-1/3 w-[34rem] h-[34rem] bg-sky-200/34 rounded-full blur-[140px]"
        animate={{ scale: [1, 1.12, 1], opacity: [0.2, 0.3, 0.2] }}
        transition={{ duration: 10, repeat: Infinity, ease: "easeInOut" }}
      />
      <motion.div
        className="absolute top-1/4 -right-32 w-96 h-96 bg-electric-blue/16 rounded-full blur-[130px]"
        animate={{ scale: [1, 1.18, 1], opacity: [0.18, 0.28, 0.18] }}
        transition={{ duration: 8, repeat: Infinity, ease: "easeInOut" }}
      />
      <motion.div
        className="absolute bottom-1/4 -left-32 w-80 h-80 bg-violet-300/18 rounded-full blur-[115px]"
        animate={{ scale: [1.15, 1, 1.15], opacity: [0.16, 0.26, 0.16] }}
        transition={{ duration: 10, repeat: Infinity, ease: "easeInOut" }}
      />
      <motion.div
        className="absolute bottom-20 right-1/4 w-[26rem] h-[26rem] bg-amber-200/24 rounded-full blur-[120px]"
        animate={{ scale: [1, 1.12, 1], opacity: [0.14, 0.24, 0.14] }}
        transition={{ duration: 12, repeat: Infinity, ease: "easeInOut" }}
      />

      <motion.div
        className="hero-light-streak hero-light-streak-h"
        animate={{ top: ["0%", "100%"] }}
        transition={{ duration: 6, repeat: Infinity, repeatDelay: 2, ease: "linear" }}
      />
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

        {/* Copy area (NO big box) */}
        <motion.div
          initial={{ opacity: 0, y: 18 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.08, ease: "easeOut" }}
          className="mx-auto max-w-6xl px-2 sm:px-6"
        >
          <div className="relative">
            {/* Soft spotlight behind text (premium, not childish) */}
            <div className="pointer-events-none absolute -inset-x-16 -inset-y-10 bg-[radial-gradient(ellipse_at_center,rgba(255,255,255,0.14),rgba(255,255,255,0)_60%)] blur-2xl" />
            <div className="pointer-events-none absolute -inset-x-24 -inset-y-16 bg-[radial-gradient(ellipse_at_center,rgba(56,189,248,0.10),rgba(56,189,248,0)_62%)] blur-3xl" />

            <motion.h1
              className="text-3xl sm:text-5xl md:text-6xl lg:text-[5.25rem] xl:text-7xl font-bold mb-6 leading-tight tracking-tight text-slate-900"
              initial={{ opacity: 0, y: 18 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7, delay: 0.12 }}
            >
              영업은 시스템이다.
              <br />
              <span className="inline-block md:whitespace-nowrap bg-gradient-to-r from-sky-600 via-electric-blue to-violet-500 bg-clip-text text-transparent">
                DB 걱정 없는 어메이징한 성장
              </span>
            </motion.h1>

            <motion.p
              className="text-base sm:text-lg md:text-xl text-slate-700 mb-4 max-w-2xl mx-auto break-words"
              initial={{ opacity: 0, y: 18 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7, delay: 0.22 }}
            >
              포털 OS·AI·청구닷컴·치매검사까지. 영업에만 집중하세요.
            </motion.p>

            <motion.div
              className="inline-flex flex-wrap items-center justify-center gap-2 px-4 py-2 rounded-full bg-white/68 border border-slate-300 text-slate-700 text-xs sm:text-sm mb-10 text-center max-w-full shadow-sm backdrop-blur"
              initial={{ opacity: 0, scale: 0.97 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.5, delay: 0.34 }}
            >
              <Sparkles className="w-4 h-4 text-amber-500" />
              <span>실제 운영 화면 18장 · 10일 교육 로드맵 · 1:1 상담</span>
            </motion.div>

            <motion.div
              className="flex flex-col sm:flex-row items-center justify-center gap-4"
              initial={{ opacity: 0, y: 14 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.45 }}
            >
              <Link href="#recruit" className="group">
                <motion.span
                  className="inline-flex items-center gap-2 px-8 py-4 rounded-2xl font-semibold text-white bg-gradient-to-r from-sky-500 to-violet-600 shadow-lg shadow-sky-500/25 hover:shadow-glow-blue transition-all duration-300"
                  whileHover={{ y: -2, boxShadow: "0 22px 46px -14px rgba(56, 189, 248, 0.35)" }}
                  whileTap={{ scale: 0.98 }}
                >
                  1분 만에 무료 상담 신청
                </motion.span>
              </Link>

              <a
                href="#hero-tour"
                className="text-slate-600 hover:text-slate-900 transition-colors text-sm font-medium"
              >
                실제 운영 화면 먼저 보기 →
              </a>
            </motion.div>
            <p className="mt-4 text-xs text-slate-500">
              상담 후 원치 않으면 추가 연락하지 않습니다.
            </p>
          </div>
        </motion.div>

        <motion.div
          id="hero-tour"
          className="mt-14 md:mt-18 flex justify-center px-2 min-w-0 w-full"
          initial={{ opacity: 0, y: 40, rotateX: 8 }}
          animate={{ opacity: 1, y: 0, rotateX: 0 }}
          transition={{ duration: 1, delay: 0.6, ease: "easeOut" }}
          style={{ perspective: "1000px" }}
        >
          <motion.div
            className="relative w-full max-w-3xl rounded-2xl border border-slate-300 bg-white/72 backdrop-blur-xl overflow-hidden shadow-xl min-w-0"
            style={{ transform: "rotateX(5deg) rotateZ(-1deg)" }}
            whileHover={{ transform: "rotateX(2deg) rotateZ(0deg) scale(1.02)" }}
            transition={{ type: "spring", stiffness: 200 }}
          >
            <div className="min-h-[420px] md:min-h-0 md:aspect-video rounded-t-2xl bg-slate-50/90 border-b border-slate-300 overflow-hidden flex items-center justify-center">
              {heroVideoUrl ? (
                <iframe
                  src={heroVideoUrl}
                  title="Amazing Sales OS Tour"
                  className="w-full h-full"
                  allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                  allowFullScreen
                />
              ) : (
                <HeroEcosystemTour />
              )}
            </div>
            <p className="text-center text-slate-600 text-xs py-3">어메이징 영업지원 시스템</p>
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
