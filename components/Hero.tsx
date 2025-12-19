"use client";

import { motion } from "framer-motion";
import { ArrowDown } from "lucide-react";
import Image from "next/image";

export default function Hero() {
  return (
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden bg-gradient-to-br from-white via-cool-gray to-titanium-silver pt-28">
      {/* Background Wave Animation */}
      <div className="absolute inset-0 overflow-hidden">
        <motion.div
          className="absolute -top-40 -right-40 w-96 h-96 bg-electric-blue/10 rounded-full blur-3xl"
          animate={{
            scale: [1, 1.2, 1],
            x: [0, 50, 0],
            y: [0, 30, 0],
          }}
          transition={{
            duration: 20,
            repeat: Infinity,
            ease: "easeInOut",
          }}
        />
        <motion.div
          className="absolute -bottom-40 -left-40 w-96 h-96 bg-slate-400/10 rounded-full blur-3xl"
          animate={{
            scale: [1, 1.3, 1],
            x: [0, -30, 0],
            y: [0, -50, 0],
          }}
          transition={{
            duration: 25,
            repeat: Infinity,
            ease: "easeInOut",
          }}
        />
      </div>

      <div className="relative z-10 max-w-7xl mx-auto px-6 lg:px-8 text-center">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, ease: "easeOut" }}
        >
          {/* ?? */}
          <motion.div
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.8, delay: 0.1 }}
            className="mb-8 flex justify-center"
          >
            <Image
              src="/prime-logo.png"
              alt="Prime Asset Amazing"
              width={200}
              height={66}
              className="h-16 md:h-20 w-auto"
              priority
            />
          </motion.div>

          <motion.h1
            className="text-5xl md:text-7xl font-bold mb-6 leading-tight"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
          >
            <span className="animated-gradient">
              System makes Money
            </span>
            <br />
            <span className="text-gradient">감정을 배제한</span>
            <br />
            <span className="text-slate-700">완벽한 영업 지원 시스템</span>
          </motion.h1>

          <motion.p
            className="text-xl md:text-2xl text-slate-600 mb-12 font-light"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.4 }}
          >
            Amazing Division.
          </motion.p>
        </motion.div>

        {/* Phone Mockups */}
        <motion.div
          className="relative mt-16 flex flex-col md:flex-row items-end justify-center gap-0"
          initial={{ opacity: 0, scale: 0.8, y: 50 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          transition={{ duration: 1, delay: 0.6, ease: "easeOut" }}
        >
          {/* Phone 1 - Dashboard/Portal */}
          <motion.div 
            className="relative w-48 md:w-56 z-10 md:mr-[-30px]"
            style={{ rotate: "-3deg" }}
            whileHover={{ rotate: "-1deg", scale: 1.05 }}
            transition={{ type: "spring", stiffness: 300 }}
          >
            <div className="relative bg-slate-900 rounded-[2.5rem] p-2 shadow-2xl border-2 border-slate-800">
              <div className="bg-white rounded-[2rem] overflow-hidden">
                <div className="aspect-[9/19.5] bg-white p-2 overflow-y-auto">
                  <div className="h-full flex flex-col">
                    {/* Status Bar */}
                    <div className="flex justify-between items-center mb-2">
                      <div className="text-[9px] font-semibold text-slate-900">9:41</div>
                      <div className="flex gap-0.5">
                        <div className="w-2.5 h-1.5 bg-slate-900 rounded-sm" />
                        <div className="w-2.5 h-1.5 bg-slate-900 rounded-sm" />
                      </div>
                    </div>
                    {/* Header */}
                    <div className="mb-2">
                      <div className="text-[7px] text-slate-500 mb-1">보험 영업 올인원 포털</div>
                      <div className="text-xs font-bold text-red-600 mb-1">어메이징사업부 영업지원</div>
                      <div className="text-[7px] text-slate-600 leading-tight">DB 분배, 고객 관리, 일정/할일, 목표 관리, 알림까지 한 곳에 모았습니다</div>
                    </div>
                    {/* Feature Cards Grid */}
                    <div className="grid grid-cols-2 gap-1 mb-2">
                      <div className="bg-yellow-50 rounded-md p-1.5">
                        <div className="w-4 h-4 bg-yellow-400 rounded mb-1" />
                        <div className="text-[6px] font-semibold text-slate-900 mb-0.5">DB 분배 투명성</div>
                        <div className="text-[5px] text-slate-600 leading-tight">DB 현황판, 실시간 추적, 자동 분배로 공정하게 관리합니다</div>
                      </div>
                      <div className="bg-purple-50 rounded-md p-1.5">
                        <div className="w-4 h-4 bg-purple-400 rounded mb-1" />
                        <div className="text-[6px] font-semibold text-slate-900 mb-0.5">고객 한눈에 보기</div>
                        <div className="text-[5px] text-slate-600 leading-tight">연락처·상담 메모·계약·파일·통화 기록을 한 화면에서 바로 확인하고 수정합니다</div>
                      </div>
                      <div className="bg-blue-50 rounded-md p-1.5">
                        <div className="w-4 h-4 bg-blue-400 rounded mb-1" />
                        <div className="text-[6px] font-semibold text-slate-900 mb-0.5">일정·할일 연동</div>
                        <div className="text-[5px] text-slate-600 leading-tight">고객관리 캘린더/To-Do로 미팅, 후속 액션, 목표 달성을 놓치지 않습니다</div>
                      </div>
                      <div className="bg-red-50 rounded-md p-1.5">
                        <div className="w-4 h-4 bg-red-400 rounded mb-1" />
                        <div className="text-[6px] font-semibold text-slate-900 mb-0.5">실시간 알림과 대시보드</div>
                        <div className="text-[5px] text-slate-600 leading-tight">DB 배정, 공지, 보험금 청구, 목표 달성 알림과 실적/랭킹 위젯을 제공합니다</div>
                      </div>
                    </div>
                    {/* Stats */}
                    <div className="grid grid-cols-4 gap-1 mb-2">
                      <div className="text-center bg-slate-50 rounded-md p-1">
                        <div className="text-[10px] font-bold text-slate-900">0</div>
                        <div className="text-[5px] text-slate-600">업로드</div>
                      </div>
                      <div className="text-center bg-slate-50 rounded-md p-1">
                        <div className="text-[10px] font-bold text-slate-900">0</div>
                        <div className="text-[5px] text-slate-600">배정</div>
                      </div>
                      <div className="text-center bg-orange-50 rounded-md p-1">
                        <div className="text-[10px] font-bold text-orange-500">1</div>
                        <div className="text-[5px] text-slate-600">상담중</div>
                      </div>
                      <div className="text-center bg-slate-50 rounded-md p-1">
                        <div className="text-[10px] font-bold text-slate-900">0</div>
                        <div className="text-[5px] text-slate-600">계약</div>
                      </div>
                    </div>
                    {/* DB Status */}
                    <div className="grid grid-cols-2 gap-1 mb-2">
                      <div className="bg-blue-50 rounded-md p-1.5">
                        <div className="text-[10px] font-bold text-blue-600">30</div>
                        <div className="text-[5px] text-slate-600">미배정 DB</div>
                        <div className="text-[5px] text-slate-500">배정 대기</div>
                      </div>
                      <div className="bg-green-50 rounded-md p-1.5">
                        <div className="text-[10px] font-bold text-green-600">10</div>
                        <div className="text-[5px] text-slate-600">배정 완료</div>
                        <div className="text-[5px] text-slate-500">오늘 0건</div>
                      </div>
                    </div>
                    {/* CTA Button */}
                    <div className="bg-gradient-to-r from-electric-blue to-purple-600 rounded-md p-1.5 text-center">
                      <div className="text-[7px] font-semibold text-white">지금 바로 시작하기</div>
                    </div>
                  </div>
                </div>
              </div>
              <div className="absolute top-3 left-1/2 -translate-x-1/2 w-24 h-5 bg-slate-900 rounded-full" />
            </div>
            <motion.div
              className="absolute inset-0 bg-electric-blue/20 rounded-[2.5rem] blur-2xl -z-10"
              animate={{
                scale: [1, 1.1, 1],
                opacity: [0.3, 0.5, 0.3],
              }}
              transition={{
                duration: 3,
                repeat: Infinity,
                ease: "easeInOut",
              }}
            />
          </motion.div>

          {/* Phone 2 - AI Solution */}
          <motion.div 
            className="relative w-48 md:w-56 z-20"
            style={{ rotate: "2deg" }}
            whileHover={{ rotate: "1deg", scale: 1.05 }}
            transition={{ type: "spring", stiffness: 300 }}
          >
            <div className="relative bg-slate-900 rounded-[2.5rem] p-2 shadow-2xl border-2 border-slate-800">
              <div className="bg-white rounded-[2rem] overflow-hidden">
                <div className="aspect-[9/19.5] bg-white p-2 overflow-y-auto">
                  <div className="h-full flex flex-col">
                    {/* Status Bar */}
                    <div className="flex justify-between items-center mb-2">
                      <div className="text-[9px] font-semibold text-slate-900">9:41</div>
                      <div className="flex gap-0.5">
                        <div className="w-2.5 h-1.5 bg-slate-900 rounded-sm" />
                        <div className="w-2.5 h-1.5 bg-slate-900 rounded-sm" />
                      </div>
                    </div>
                    {/* Header */}
                    <div className="mb-2">
                      <div className="text-[7px] text-slate-500 mb-1">✨ AI 기반 보험 영업 솔루션</div>
                      <div className="text-xs font-bold text-electric-blue mb-1">어메이징사업부 영업지원</div>
                      <div className="text-[7px] text-slate-600 leading-tight">AI가 자동으로 블로그 글과 Q&A를 생성해드립니다. 이제 영업에만 집중하세요.</div>
                    </div>
                    {/* Main Feature Card */}
                    <div className="bg-gradient-to-r from-electric-blue to-purple-600 rounded-lg p-2 mb-2">
                      <div className="flex items-center gap-1 mb-1">
                        <span className="text-[8px]">⭐</span>
                        <div className="text-[10px] font-bold text-white">보험 블로그 AI 생성기</div>
                      </div>
                      <div className="text-[6px] text-white/90 mb-1">30초 만에 전문가급 블로그 글 자동 작성</div>
                      <div className="grid grid-cols-3 gap-1">
                        <div className="text-center">
                          <div className="w-4 h-4 bg-white/20 rounded mx-auto mb-0.5" />
                          <div className="text-[5px] text-white">고퀄리티</div>
                          <div className="text-[4px] text-white/80">SEO 최적화</div>
                        </div>
                        <div className="text-center">
                          <div className="w-4 h-4 bg-white/20 rounded mx-auto mb-0.5" />
                          <div className="text-[5px] text-white">빠른 생성</div>
                          <div className="text-[4px] text-white/80">평균 30초</div>
                        </div>
                        <div className="text-center">
                          <div className="w-4 h-4 bg-white/20 rounded mx-auto mb-0.5" />
                          <div className="text-[5px] text-white">맞춤 디자인</div>
                          <div className="text-[4px] text-white/80">반응형 HTML</div>
                        </div>
                      </div>
                    </div>
                    {/* Feature Cards */}
                    <div className="space-y-1 mb-2">
                      <div className="bg-blue-50 rounded-md p-1.5">
                        <div className="flex items-center gap-1 mb-1">
                          <div className="w-3 h-3 bg-blue-500 rounded" />
                          <div className="text-[6px] font-semibold text-slate-900">네이버 블로그 자동 생성</div>
                        </div>
                        <div className="text-[5px] text-slate-600 leading-tight">AI가 보험 상품에 맞는 전문적인 블로그 글을 자동으로 생성합니다. 심의 규정을 준수하며, 데이터 시각화까지 포함된 완성도 높은 콘텐츠를 제공합니다.</div>
                      </div>
                      <div className="bg-purple-50 rounded-md p-1.5">
                        <div className="flex items-center gap-1 mb-1">
                          <div className="w-3 h-3 bg-purple-500 rounded" />
                          <div className="text-[6px] font-semibold text-slate-900">보험카페 Q&A 생성기</div>
                        </div>
                        <div className="text-[5px] text-slate-600 leading-tight">일반인 질문과 전문가 답변을 자동으로 생성합니다. 설계서 이미지만 업로드하면 자동으로 분석하여 질문과 답변을 만들어드립니다.</div>
                      </div>
                      <div className="bg-green-50 rounded-md p-1.5">
                        <div className="flex items-center gap-1 mb-1">
                          <div className="w-3 h-3 bg-green-500 rounded" />
                          <div className="text-[6px] font-semibold text-slate-900">설계서 자동 분석</div>
                        </div>
                        <div className="text-[5px] text-slate-600 leading-tight">설계서 이미지만 업로드하면 AI가 자동으로 분석하여 상품 정보를 추출합니다. 분석 결과를 바탕으로 질문과 답변을 자동으로 생성해드립니다.</div>
                      </div>
                    </div>
                    {/* Stats */}
                    <div className="grid grid-cols-3 gap-1">
                      <div className="bg-white border border-slate-200 rounded-md p-1.5 text-center">
                        <div className="w-3 h-3 bg-blue-500 rounded mx-auto mb-0.5" />
                        <div className="text-[10px] font-bold text-slate-900">0</div>
                        <div className="text-[5px] text-slate-600">전체 회원</div>
                      </div>
                      <div className="bg-white border border-slate-200 rounded-md p-1.5 text-center">
                        <div className="w-3 h-3 bg-yellow-500 rounded mx-auto mb-0.5" />
                        <div className="text-[10px] font-bold text-slate-900">0</div>
                        <div className="text-[5px] text-slate-600">승인 대기</div>
                      </div>
                      <div className="bg-white border border-slate-200 rounded-md p-1.5 text-center">
                        <div className="w-3 h-3 bg-green-500 rounded mx-auto mb-0.5" />
                        <div className="text-[10px] font-bold text-slate-900">0</div>
                        <div className="text-[5px] text-slate-600">승인 완료</div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
              <div className="absolute top-3 left-1/2 -translate-x-1/2 w-24 h-5 bg-slate-900 rounded-full" />
            </div>
            <motion.div
              className="absolute inset-0 bg-purple-500/20 rounded-[2.5rem] blur-2xl -z-10"
              animate={{
                scale: [1, 1.1, 1],
                opacity: [0.3, 0.5, 0.3],
              }}
              transition={{
                duration: 3,
                repeat: Infinity,
                ease: "easeInOut",
                delay: 0.5,
              }}
            />
          </motion.div>
        </motion.div>

        {/* Scroll Indicator */}
        <motion.div
          className="absolute bottom-12 left-1/2 -translate-x-1/2"
          animate={{ y: [0, 10, 0] }}
          transition={{ duration: 2, repeat: Infinity }}
        >
          <ArrowDown className="text-slate-400 w-6 h-6" />
        </motion.div>
      </div>
    </section>
  );
}
