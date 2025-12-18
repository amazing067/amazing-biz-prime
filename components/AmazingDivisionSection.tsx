"use client";

import { motion, AnimatePresence } from "framer-motion";
import { useState } from "react";
import Image from "next/image";
import {
  User,
  Briefcase,
  GraduationCap,
  Settings,
  MapPin,
  ChevronRight,
} from "lucide-react";

const tabs = [
  { id: "director", label: "본부장 소개", icon: User },
  { id: "sales", label: "영업 방법", icon: Briefcase },
  { id: "education", label: "교육시스템", icon: GraduationCap },
  { id: "support", label: "영업지원시스템", icon: Settings },
  { id: "branches", label: "지점 소개", icon: MapPin },
];

const salesMethods = [
  {
    title: "인하우스",
    description: "사무실 내 체계적인 상담 시스템",
  },
  {
    title: "박람회",
    description: "대규모 박람회를 통한 고객 접점 확대",
  },
  {
    title: "DB영업",
    description: "데이터 기반 타겟 마케팅",
  },
  {
    title: "온라인영업",
    description: "디지털 플랫폼을 활용한 영업",
  },
];

const educationPrograms = [
  {
    title: "특별교육",
    description: "전문가 특강 및 심화 교육 프로그램",
  },
  {
    title: "원수사교육",
    description: "보험사별 맞춤 교육 과정",
  },
  {
    title: "원데이특강",
    description: "집중형 단기 특강 프로그램",
  },
  {
    title: "전산활용교육",
    description: "온라인/오프라인 전산 시스템 교육",
  },
  {
    title: "온라인영업노하우",
    description: "디지털 영업 전문 교육",
  },
];

const supportSystems = [
  { title: "청구닷컴", description: "통합 청구 관리 시스템" },
  {
    title: "DB배분프로그램",
    description: "공정한 자동 고객 배분 시스템",
  },
  { title: "블로그/품스", description: "콘텐츠 마케팅 지원" },
  {
    title: "자동차다이렉트비교견적",
    description: "자동차보험 비교 견적 시스템",
  },
  { title: "AI톡방", description: "AI 기반 고객 상담 지원" },
  { title: "개척전단지제작", description: "마케팅 자료 제작 지원" },
  {
    title: "유튜브촬영실/편집지원",
    description: "프로페셔널 영상 제작 지원",
  },
  { title: "매니저 상주", description: "전문 매니저 상주 지원" },
  {
    title: "보장분석프로그램",
    description: "고객 맞춤 보장 분석 도구",
  },
];

const directors = [
  {
    id: "067",
    name: "067본부",
    fullName: "067본부",
    directorName: "윤성옥 본부장",
    image: "/067본부윤성옥본부장님.jpg",
    description: "어메이징 사업부 067본부 본부장은 보험 영업 분야의 전문가로서, 체계적인 시스템과 혁신적인 접근으로 설계사들의 성공을 지원합니다.",
  },
  {
    id: "290",
    name: "290본부",
    fullName: "290본부",
    directorName: "양창대 본부장",
    image: "/290본부양창대본부장님.jpg",
    description: "어메이징 사업부 290본부 본부장은 보험 영업 분야의 전문가로서, 체계적인 시스템과 혁신적인 접근으로 설계사들의 성공을 지원합니다.",
  },
  {
    id: "292",
    name: "292본부",
    fullName: "292본부",
    directorName: "권성숙 본부장",
    image: "/292본부권성숙본부장님.png",
    description: "어메이징 사업부 292본부 본부장은 보험 영업 분야의 전문가로서, 체계적인 시스템과 혁신적인 접근으로 설계사들의 성공을 지원합니다.",
  },
];

export default function AmazingDivisionSection() {
  const [activeTab, setActiveTab] = useState("director");
  const [selectedDirector, setSelectedDirector] = useState("067");

  return (
    <section className="py-32 bg-gradient-to-b from-cool-gray to-white">
      <div className="max-w-7xl mx-auto px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.8 }}
          className="text-center mb-20"
        >
          <h2 className="text-4xl md:text-5xl font-bold text-slate-900 mb-4">
            어메이징 사업부
          </h2>
          <p className="text-xl text-slate-600 font-light">
            System makes Money. 완벽한 영업 지원 시스템
          </p>
        </motion.div>

        {/* Tab Navigation */}
        <div className="mb-12">
          <div className="flex flex-wrap justify-center gap-2">
            {tabs.map((tab) => {
              const Icon = tab.icon;
              return (
                <motion.button
                  key={tab.id}
                  onClick={() => setActiveTab(tab.id)}
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  className={`flex items-center space-x-2 px-6 py-3 rounded-xl font-medium transition-all ${
                    activeTab === tab.id
                      ? "bg-electric-blue text-white shadow-lg"
                      : "glass text-slate-700 hover:bg-slate-50"
                  }`}
                >
                  <Icon className="w-5 h-5" />
                  <span>{tab.label}</span>
                </motion.button>
              );
            })}
          </div>
        </div>

        {/* Tab Content */}
        <div className="min-h-[500px]">
          <AnimatePresence mode="wait">
            {activeTab === "director" && (
              <motion.div
                key="director"
                id="amazing-director"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -20 }}
                transition={{ duration: 0.3 }}
                className="scroll-mt-20"
              >
                <div className="glass rounded-3xl p-12 shadow-soft border border-slate-200/50">
                  <h3 className="text-3xl font-bold text-slate-900 mb-8 text-center">
                    본부장 소개
                  </h3>
                  
                  <div className="flex flex-col lg:flex-row gap-8">
                    {/* 왼쪽: 본부 선택 버튼 */}
                    <div className="lg:w-auto">
                      <h4 className="text-lg font-semibold text-slate-900 mb-4">
                        본부 선택
                      </h4>
                      <div className="space-y-3">
                        {directors.map((director) => (
                          <motion.button
                            key={director.id}
                            onClick={() => setSelectedDirector(director.id)}
                            whileHover={{ scale: 1.02, x: 4 }}
                            whileTap={{ scale: 0.98 }}
                            className={`block w-fit text-left px-6 py-3 rounded-xl font-medium transition-all ${
                              selectedDirector === director.id
                                ? "bg-electric-blue text-white shadow-lg"
                                : "bg-white text-slate-700 border border-slate-200 hover:border-electric-blue hover:shadow-md"
                            }`}
                          >
                            {director.name}
                          </motion.button>
                        ))}
                      </div>
                    </div>

                    {/* 오른쪽: 선택된 본부장 정보 */}
                    <div className="flex-1">
                      <AnimatePresence mode="wait">
                        {directors
                          .filter((d) => d.id === selectedDirector)
                          .map((director) => (
                            <motion.div
                              key={director.id}
                              initial={{ opacity: 0, x: 20 }}
                              animate={{ opacity: 1, x: 0 }}
                              exit={{ opacity: 0, x: -20 }}
                              transition={{ duration: 0.3 }}
                              className="grid grid-cols-1 md:grid-cols-2 gap-8 items-start"
                            >
                              <div>
                                <h4 className="text-2xl font-bold text-slate-900 mb-2">
                                  {director.directorName}
                                </h4>
                                <p className="text-slate-600 mb-4 text-sm">
                                  {director.fullName}
                                </p>
                                <p className="text-slate-600 leading-relaxed text-lg">
                                  {director.description}
                                </p>
                              </div>
                              <div className="relative bg-gradient-to-br from-slate-100 to-slate-200 rounded-2xl aspect-square overflow-hidden shadow-lg">
                                <Image
                                  src={director.image}
                                  alt={`${director.directorName} 사진`}
                                  fill
                                  className="object-cover"
                                  style={
                                    director.id === "067" || director.id === "292"
                                      ? { objectPosition: "center top" }
                                      : {}
                                  }
                                  quality={100}
                                  sizes="(max-width: 768px) 100vw, 50vw"
                                  priority
                                />
                              </div>
                            </motion.div>
                          ))}
                      </AnimatePresence>
                    </div>
                  </div>
                </div>
              </motion.div>
            )}

            {activeTab === "sales" && (
              <motion.div
                key="sales"
                id="amazing-sales"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -20 }}
                transition={{ duration: 0.3 }}
                className="scroll-mt-20"
              >
                <h3 className="text-3xl font-bold text-slate-900 mb-8 text-center">
                  영업 방법
                </h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  {salesMethods.map((method, index) => (
                    <motion.div
                      key={method.title}
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: index * 0.1 }}
                      className="glass rounded-2xl p-6 shadow-soft border border-slate-200/50 hover:shadow-soft-lg transition-all"
                    >
                      <h4 className="text-xl font-bold text-slate-900 mb-2">
                        {method.title}
                      </h4>
                      <p className="text-slate-600">{method.description}</p>
                    </motion.div>
                  ))}
                </div>
              </motion.div>
            )}

            {activeTab === "education" && (
              <motion.div
                key="education"
                id="amazing-education"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -20 }}
                transition={{ duration: 0.3 }}
                className="scroll-mt-20"
              >
                <h3 className="text-3xl font-bold text-slate-900 mb-8 text-center">
                  교육시스템
                </h3>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                  {educationPrograms.map((program, index) => (
                    <motion.div
                      key={program.title}
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: index * 0.1 }}
                      className="glass rounded-2xl p-6 shadow-soft border border-slate-200/50 hover:shadow-soft-lg transition-all group"
                    >
                      <div className="flex items-start justify-between mb-4">
                        <GraduationCap className="w-8 h-8 text-electric-blue" />
                        <ChevronRight className="w-5 h-5 text-slate-400 group-hover:text-electric-blue group-hover:translate-x-1 transition-all" />
                      </div>
                      <h4 className="text-xl font-bold text-slate-900 mb-2">
                        {program.title}
                      </h4>
                      <p className="text-slate-600">{program.description}</p>
                    </motion.div>
                  ))}
                </div>
              </motion.div>
            )}

            {activeTab === "support" && (
              <motion.div
                key="support"
                id="amazing-support"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -20 }}
                transition={{ duration: 0.3 }}
                className="scroll-mt-20"
              >
                <h3 className="text-3xl font-bold text-slate-900 mb-8 text-center">
                  영업지원시스템
                </h3>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                  {supportSystems.map((system, index) => (
                    <motion.div
                      key={system.title}
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: index * 0.05 }}
                      whileHover={{ y: -5 }}
                      className="glass rounded-2xl p-6 shadow-soft border border-slate-200/50 hover:shadow-soft-lg transition-all group cursor-pointer"
                    >
                      <div className="flex items-start justify-between mb-4">
                        <Settings className="w-8 h-8 text-electric-blue" />
                        <ChevronRight className="w-5 h-5 text-slate-400 group-hover:text-electric-blue group-hover:translate-x-1 transition-all" />
                      </div>
                      <h4 className="text-xl font-bold text-slate-900 mb-2">
                        {system.title}
                      </h4>
                      <p className="text-slate-600">{system.description}</p>
                    </motion.div>
                  ))}
                </div>
              </motion.div>
            )}

            {activeTab === "branches" && (
              <motion.div
                key="branches"
                id="amazing-branches"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -20 }}
                transition={{ duration: 0.3 }}
                className="scroll-mt-20"
              >
                <h3 className="text-3xl font-bold text-slate-900 mb-8 text-center">
                  지점 소개
                </h3>
                
                {/* 지점 목록 및 상세 정보 */}
                <div>
                  <h4 className="text-xl font-bold text-slate-900 mb-8 text-center">
                    운영 중인 지점
                  </h4>
                  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                    {[
                      {
                        name: "서울 광진2지점",
                        location: "서울특별시 광진구",
                        description: "서울 동부 지역의 핵심 지점",
                      },
                      {
                        name: "서울 금천6지점",
                        location: "서울특별시 금천구",
                        description: "서울 남서부 지역의 전문 지점",
                      },
                      {
                        name: "서울 동작2지점",
                        location: "서울특별시 동작구",
                        description: "서울 남부 지역의 중심 지점",
                      },
                      {
                        name: "원주 지사",
                        location: "강원도 원주시",
                        description: "강원 지역의 대표 지사",
                      },
                      {
                        name: "세종 지사",
                        location: "세종특별자치시",
                        description: "세종 지역의 전문 지사",
                      },
                    ].map((branch, index) => (
                      <motion.div
                        key={branch.name}
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: index * 0.1 }}
                        whileHover={{ y: -5, scale: 1.02 }}
                        className="glass rounded-2xl p-6 shadow-soft border border-slate-200/50 hover:shadow-soft-lg transition-all"
                      >
                        <div className="flex items-start space-x-3 mb-4">
                          <div className="w-12 h-12 bg-gradient-to-br from-electric-blue to-blue-600 rounded-xl flex items-center justify-center flex-shrink-0 shadow-lg">
                            <MapPin className="w-6 h-6 text-white" />
                          </div>
                          <div className="flex-1">
                            <h5 className="text-lg font-bold text-slate-900 mb-1">
                              {branch.name}
                            </h5>
                            <p className="text-sm text-slate-600 mb-2">
                              {branch.location}
                            </p>
                            <p className="text-sm text-slate-500">
                              {branch.description}
                            </p>
                          </div>
                        </div>
                      </motion.div>
                    ))}
                  </div>
                </div>

                {/* 지점 개설 안내 */}
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.5 }}
                  className="mt-12 glass rounded-3xl p-8 shadow-soft border border-slate-200/50 text-center"
                >
                  <h4 className="text-2xl font-bold text-slate-900 mb-4">
                    지점 개설 안내
                  </h4>
                  <p className="text-slate-600 leading-relaxed mb-6 max-w-2xl mx-auto">
                    어메이징 사업부는 전국 어디서든 지점 개설을 지원합니다.
                    체계적인 시스템과 전문 인력으로 새로운 지점을 함께 만들어갑니다.
                  </p>
                  <motion.a
                    href="#recruit"
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    className="inline-flex items-center space-x-2 px-8 py-4 bg-electric-blue text-white rounded-xl font-semibold shadow-lg hover:shadow-xl transition-all"
                  >
                    <span>지점 개설 문의하기</span>
                    <ChevronRight className="w-5 h-5" />
                  </motion.a>
                </motion.div>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </div>
    </section>
  );
}

