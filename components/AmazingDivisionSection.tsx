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
    title: ["수익보다 신뢰를,", "보험 그 이상의 가치를 증명하겠습니다"],
    description: "안녕하십니까, 어메이징사업부 067본부 대표 윤성옥입니다.\n\n보험은 가족의 삶을 지키는 가장 신중한 선택이어야 합니다.\n저희 어메이징사업부는 국내 33개 보험사의 상품을 객관적으로 비교하여, 고객의 상황에 가장 필요한 보장만을 정직하게 제안합니다.\n\n단순히 상품을 판매하는 조직이 아닌, 고객의 이야기를 경청하고 함께 미래를 고민하는 파트너가 되겠습니다.\n대한민국에서 가장 신뢰받는 보험 전문 조직으로서, 언제나 한결같은 마음으로 고객 곁을 지킬 것을 약속드립니다.",
    signature: "/067본부윤성옥서명.png",
  },
  {
    id: "290",
    name: "290본부",
    fullName: "290본부",
    directorName: "양창대 본부장",
    image: "/290본부양창대본부장님.jpg",
    title: ["객관적인 데이터와 전문성으로", "고객의 신뢰를 지키겠습니다"],
    description: "안녕하십니까, 어메이징사업부 290본부 본부장 양창대입니다.\n\n보험은 불확실한 미래를 대비하는 가장 확실한 수단입니다.\n하지만 수많은 상품 속에서 나에게 꼭 필요한 보장을 찾기란 결코 쉽지 않습니다.\n\n저희 어메이징사업부는 국내 33개 보험사를 정밀하게 분석하여, 고객의 상황에 가장 최적화된 선택지를 제공하는 데 집중하고 있습니다. 단순한 판매를 넘어, 투명한 정보 제공과 객관적인 비교 시스템을 통해 보험의 본질적인 가치를 전달하고자 합니다.\n\n고객님의 소중한 자산과 일상을 지킨다는 책임감으로, 언제나 정직하고 실력 있는 파트너가 될 것을 약속드립니다.",
    signature: "/290본부양창대서명.png",
  },
  {
    id: "292",
    name: "292본부",
    fullName: "292본부",
    directorName: "권성숙 본부장",
    image: "/292본부권성숙본부장님.png",
    title: ["기업 경영의 안정성을 완성하는", "전략적 리스크 관리 파트너"],
    description: "안녕하십니까,어메이징사업부 292본부 본부장 권성숙 입니다.\n기업컨설팅이란\n기업(창업~청산)과정중 발생하는 무상지원금/유상지원금\n세무, 노무, 법무, 가업승계, 기업 M&A등\n기업경영 전반과 맞물려 있는 고도의 전략 영업입니다.\n\n292본부는 기업영업 전문 조직으로서, 기업의 다양한 위험요소를 분석,삼일회계법인과 연계한 M&A 전략까지 통합적인 솔루션을 제공합니다.\n특히 국가정책 지원금(무상지원금/유상지원금)활용과\n각 분야전문가(세무사, 노무사, 변리사, 법무사, 행정사)들과 협업 구조를 통해 지속 가능한 조력자가 될 것을 약속 드립니다",
    signature: "/292본부권성숙서명.png",
  },
];

export default function AmazingDivisionSection() {
  const [activeTab, setActiveTab] = useState("director");
  const [selectedDirector, setSelectedDirector] = useState("067");

  return (
    <section className="py-12 md:py-16 bg-gradient-to-b from-cool-gray to-white">
      <div className="max-w-7xl mx-auto px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.8 }}
          className="text-center mb-8 md:mb-10"
        >
          <h2 className="text-4xl md:text-5xl font-bold text-slate-900 mb-3">
            어메이징 사업부
          </h2>
          <p className="text-xl text-slate-600 font-light">
            System makes Money. 완벽한 영업 지원 시스템
          </p>
        </motion.div>

        {/* Tab Navigation */}
        <div className="mb-8">
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
        <div className="min-h-[400px]">
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
                <div className="glass rounded-3xl p-4 md:p-6 lg:p-8 shadow-soft border border-slate-200/50">
                  <h3 className="text-xl md:text-2xl lg:text-3xl font-bold text-slate-900 mb-4 md:mb-6 text-center">
                    본부장 소개
                  </h3>
                  
                  <div className="flex flex-col lg:flex-row gap-6">
                    {/* 왼쪽: 본부 선택 버튼 */}
                    <div className="lg:w-auto w-full">
                      <h4 className="text-base md:text-lg font-semibold text-slate-900 mb-3">
                        본부 선택
                      </h4>
                      <div className="space-y-2 md:space-y-3">
                        {directors.map((director) => (
                          <motion.button
                            key={director.id}
                            onClick={() => setSelectedDirector(director.id)}
                            whileHover={{ scale: 1.02, x: 4 }}
                            whileTap={{ scale: 0.98 }}
                            className={`block w-full md:w-fit text-left px-4 md:px-6 py-2.5 md:py-3 rounded-xl font-medium transition-all text-sm md:text-base ${
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
                    <div className="flex-1 min-w-0">
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
                              className="grid grid-cols-1 md:grid-cols-[55%_45%] gap-4 md:gap-6 items-center"
                            >
                              <div className="order-2 md:order-1">
                                <h4 className="text-xl md:text-2xl font-bold text-slate-900 mb-2 tracking-tight">
                                  {director.directorName}
                                </h4>
                                <p className="text-slate-600 mb-3 md:mb-4 text-xs md:text-sm font-medium">
                                  {director.fullName}
                                </p>
                                {director.title && (
                                  <div className="mb-4 md:mb-6 pb-3 md:pb-4 border-b-2 border-electric-blue/30 text-center">
                                    <h5 className="text-base md:text-xl lg:text-2xl font-extrabold bg-gradient-to-r from-electric-blue via-blue-600 to-electric-blue bg-clip-text text-transparent leading-tight tracking-tight px-2">
                                      {Array.isArray(director.title) ? (
                                        <>
                                          {director.title[0]}
                                          <br />
                                          {director.title[1]}
                                        </>
                                      ) : (
                                        director.title
                                      )}
                                    </h5>
                                </div>
                                )}
                                <p className="text-slate-700 leading-relaxed text-sm md:text-base lg:text-lg whitespace-pre-line mb-3 md:mb-4 font-medium tracking-wide">
                                  {director.description}
                                </p>
                                {director.signature && (
                                  <div className="mt-3 md:mt-4 text-center">
                                    <Image
                                      src={director.signature}
                                      alt={`${director.directorName} 서명`}
                                      width={400}
                                      height={150}
                                      className="object-contain mx-auto w-full max-w-[280px] md:max-w-[350px] h-auto"
                                      quality={100}
                                    />
                                  </div>
                                )}
                              </div>
                              <div className="relative bg-gradient-to-br from-slate-100 to-slate-200 rounded-2xl aspect-square overflow-hidden shadow-lg order-1 md:order-2 w-full max-w-[300px] md:max-w-none mx-auto md:mx-0">
                                <Image
                                  src={director.image}
                                  alt={`${director.directorName} 사진`}
                                  fill
                                  className="object-cover"
                                  style={
                                    director.id === "067" || director.id === "292"
                                      ? { objectPosition: "center top" }
                                      : director.id === "290"
                                      ? { objectPosition: "center 30%" }
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

