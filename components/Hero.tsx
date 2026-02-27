"use client";

import { motion } from "framer-motion";
import { ArrowDown, Sparkles, FileText, BarChart3, Video, Calendar, Zap } from "lucide-react";
import Image from "next/image";
import Link from "next/link";

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

      <div className="relative z-10 max-w-7xl mx-auto px-6 lg:px-8 text-center">
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
          className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-bold mb-6 leading-tight tracking-tight text-white"
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
          className="text-lg md:text-xl text-slate-300 mb-4 max-w-2xl mx-auto"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.25 }}
        >
          AI 콘텐츠·투명한 DB·프로 스튜디오까지. 영업에만 집중하세요.
        </motion.p>

        {/* Proof stat */}
        <motion.div
          className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white/5 border border-white/10 text-slate-300 text-sm mb-10"
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.5, delay: 0.4 }}
        >
          <Sparkles className="w-4 h-4 text-amber-400" />
          <span>3개 본부 · 통합 영업지원 시스템</span>
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
          className="mt-16 md:mt-20 flex justify-center px-2"
          initial={{ opacity: 0, y: 40, rotateX: 8 }}
          animate={{ opacity: 1, y: 0, rotateX: 0 }}
          transition={{ duration: 1, delay: 0.6, ease: "easeOut" }}
          style={{ perspective: "1000px" }}
        >
          <motion.div
            className="relative w-full max-w-3xl rounded-2xl border border-white/10 bg-white/5 backdrop-blur-xl overflow-hidden shadow-2xl"
            style={{ transform: "rotateX(5deg) rotateZ(-1deg)" }}
            whileHover={{ transform: "rotateX(2deg) rotateZ(0deg) scale(1.02)" }}
            transition={{ type: "spring", stiffness: 200 }}
          >
            {/* .env.local에 NEXT_PUBLIC_HERO_VIDEO_URL 설정 시 영상 표시 (YouTube 링크 가능) */}
            <div className="aspect-video rounded-t-2xl bg-navy-mid/90 border-b border-white/10 overflow-hidden flex items-center justify-center">
              {heroVideoUrl ? (
                <iframe
                  src={heroVideoUrl}
                  title="어메이징 영업지원 시스템 소개"
                  className="w-full h-full"
                  allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                  allowFullScreen
                />
              ) : (
                <div className="grid grid-cols-3 gap-3 p-4 md:p-5 w-full h-full min-h-0">
                  {/* AI 블로그 생성 - 문서·타이핑·그래픽 */}
                  <div className="rounded-xl bg-gradient-to-b from-white/10 to-white/5 border border-white/10 p-3 md:p-4 flex flex-col gap-2 overflow-hidden relative">
                    <div className="absolute top-0 right-0 w-16 h-16 rounded-full bg-electric-blue/10 blur-2xl" />
                    <div className="absolute bottom-2 left-2 opacity-20">
                      <FileText className="w-8 h-8 text-electric-blue" />
                    </div>
                    <div className="flex items-center gap-2 text-xs font-semibold text-electric-blue/95">
                      <Zap className="w-4 h-4" />
                      AI 블로그 생성
                    </div>
                    <div className="flex-1 flex flex-col gap-2 min-h-0">
                      {/* 문서 라인 시각화 */}
                      <div className="flex-1 rounded-lg bg-black/20 border border-white/10 p-2 space-y-1.5">
                        {[90, 70, 55, 85].map((w, i) => (
                          <motion.div
                            key={i}
                            className="h-1.5 rounded-full bg-white/20"
                            initial={{ width: 0 }}
                            animate={{ width: `${w}%` }}
                            transition={{ duration: 0.8, delay: i * 0.15, repeat: Infinity, repeatType: "reverse", repeatDelay: 0.3 }}
                          />
                        ))}
                        <div className="flex items-center gap-1 pt-0.5">
                          <span className="text-[9px] text-slate-500">생성 중</span>
                          <motion.span className="w-0.5 h-2.5 bg-electric-blue rounded" animate={{ opacity: [1, 0] }} transition={{ duration: 0.5, repeat: Infinity }} />
                        </div>
                      </div>
                      <div className="rounded bg-white/5 px-2 py-1.5 flex items-center justify-between gap-2">
                        <span className="text-[10px] text-slate-400">상위 노출</span>
                        <div className="flex-1 max-w-[60px] h-1.5 rounded-full bg-white/10 overflow-hidden">
                          <motion.div
                            className="h-full rounded-full bg-gradient-to-r from-electric-blue to-violet-500"
                            animate={{ width: ["0%", "100%"] }}
                            transition={{ duration: 2.5, repeat: Infinity, repeatDelay: 0.5 }}
                          />
                        </div>
                        <span className="text-[9px] text-electric-blue/90">30초</span>
                      </div>
                    </div>
                  </div>

                  {/* DB 현황판 - 차트·그리드·데이터 시각화 */}
                  <div className="rounded-xl bg-gradient-to-b from-cyan-500/10 to-white/5 border border-white/10 p-3 md:p-4 flex flex-col gap-2 overflow-hidden relative">
                    <div className="absolute top-1 right-1 opacity-30">
                      <BarChart3 className="w-10 h-10 text-cyan-400" />
                    </div>
                    <div className="flex items-center gap-2 text-xs font-semibold text-cyan-400/95">
                      <BarChart3 className="w-4 h-4" />
                      DB 현황판
                    </div>
                    <div className="flex-1 flex flex-col gap-2 min-h-0">
                      {/* 미니 차트 영역 */}
                      <div className="flex-1 rounded-lg bg-black/20 border border-white/10 p-2 flex flex-col justify-end">
                        <div className="flex items-end justify-between gap-1 h-10">
                          {[0.5, 0.8, 0.6, 0.9, 0.7, 0.85, 0.55].map((h, i) => (
                            <motion.div
                              key={i}
                              className="flex-1 min-w-[4px] rounded-t bg-cyan-400/70"
                              animate={{ height: [`${h * 100}%`, `${(1 - h * 0.4) * 100}%`, `${h * 100}%`] }}
                              transition={{ duration: 1.2 + i * 0.1, repeat: Infinity, ease: "easeInOut" }}
                            />
                          ))}
                        </div>
                        <div className="flex gap-0.5 mt-1 justify-center">
                          {[1, 2, 3].map((i) => (
                            <motion.div
                              key={i}
                              className="w-1 h-1 rounded-full bg-cyan-400/60"
                              animate={{ opacity: [0.3, 1, 0.3] }}
                              transition={{ duration: 1, repeat: Infinity, delay: i * 0.25 }}
                            />
                          ))}
                        </div>
                      </div>
                      <div className="rounded bg-white/5 px-2 py-1.5 flex items-center gap-2 relative overflow-hidden">
                        <span className="text-[10px] text-slate-400">이력 조회</span>
                        <motion.div
                          className="absolute top-0 bottom-0 w-0.5 bg-cyan-400/50 rounded left-0"
                          animate={{ x: [0, 72] }}
                          transition={{ duration: 2, repeat: Infinity, repeatType: "reverse" }}
                        />
                      </div>
                    </div>
                  </div>

                  {/* 스튜디오 예약 - 카메라·캘린더·미디어 그래픽 */}
                  <div className="rounded-xl bg-gradient-to-b from-violet-500/10 to-white/5 border border-white/10 p-3 md:p-4 flex flex-col gap-2 overflow-hidden relative">
                    <div className="absolute top-0 right-0 w-14 h-14 rounded-full bg-violet-500/10 blur-xl" />
                    <div className="absolute bottom-2 left-2 opacity-20">
                      <Video className="w-8 h-8 text-violet-400" />
                    </div>
                    <div className="flex items-center gap-2 text-xs font-semibold text-violet-400/95">
                      <motion.span className="w-1.5 h-1.5 rounded-full bg-red-500" animate={{ opacity: [1, 0.3] }} transition={{ duration: 0.8, repeat: Infinity }} />
                      스튜디오 예약
                    </div>
                    <div className="flex-1 flex flex-col gap-2 min-h-0">
                      {/* 필름/프레임 시각화 */}
                      <div className="flex-1 rounded-lg bg-black/20 border border-white/10 p-2 flex flex-col gap-2">
                        <div className="flex gap-1 flex-1">
                          {[1, 2, 3, 4].map((i) => (
                            <motion.div
                              key={i}
                              className="flex-1 rounded bg-white/10 border border-white/10 flex items-center justify-center min-h-[24px]"
                              animate={{ opacity: [0.6, 1, 0.6] }}
                              transition={{ duration: 1.5, repeat: Infinity, delay: i * 0.2 }}
                            >
                              <Video className="w-3 h-3 text-violet-400/70" />
                            </motion.div>
                          ))}
                        </div>
                        <div className="flex justify-between items-center">
                          <span className="text-[9px] text-slate-500">4K · DiGiCo</span>
                          <motion.span className="text-[8px] text-red-400/90 font-medium" animate={{ opacity: [0.7, 1] }} transition={{ duration: 0.8, repeat: Infinity }}>REC</motion.span>
                        </div>
                      </div>
                      {/* 캘린더 그리드 */}
                      <div className="rounded bg-white/5 px-2 py-1.5">
                        <div className="flex items-center gap-1.5 mb-1">
                          <Calendar className="w-3.5 h-3.5 text-violet-400/80" />
                          <span className="text-[10px] text-slate-400">날짜 예약</span>
                        </div>
                        <div className="grid grid-cols-5 gap-0.5">
                          {[1, 2, 3, 4, 5, 6, 7, 8, 9, 10].map((d, i) => (
                            <motion.div
                              key={d}
                              className="aspect-square rounded-sm bg-white/10 flex items-center justify-center text-[8px] text-slate-500"
                              animate={i === 4 ? { backgroundColor: ["rgba(255,255,255,0.1)", "rgba(139, 92, 246, 0.45)", "rgba(255,255,255,0.1)"] } : {}}
                              transition={{ duration: 2.5, repeat: Infinity, repeatType: "reverse" }}
                            >
                              {d}
                            </motion.div>
                          ))}
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
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
