"use client";

import { motion } from "framer-motion";
import { Award, Trophy, TrendingUp, Calendar } from "lucide-react";

const historyItems = [
  {
    year: "2025",
    events: [
      "CY'24 연도대상 : 두바이 아인두바이 시상식",
    ],
  },
  {
    year: "2024",
    events: [
      "수수료 매출액 5천억 원 달성",
      "CY'23 연도대상 : 런던 런던 자연사 박물관 시상식",
    ],
  },
  {
    year: "2023",
    events: [
      "생손보 영수보험료 1조 5천억 원 돌파",
      "보험플랫폼 픽앤플랜 서비스 개시",
      "금융감독원장 표창 수상",
      "CY'22 연도대상 : 프라하 - 비엔나 비노흐라디 내셔널하우스 시상식",
    ],
  },
  {
    year: "2022",
    events: [
      "GA 최초 수수료 원장 공개",
      "생손보 사내 MS 1, 2위사 (미래, 라이나, KB손보, 현대) 수수료 명세, 법인통장 및 원장 공개",
      "CY'21 연도대상 : 싱가포르 로얄 캐리비안 스펙트럼 크루즈 시상식",
    ],
  },
  {
    year: "2020",
    events: [
      "서울사업단 설립",
      "수수료 매출액 3천억 원 달성",
    ],
  },
  {
    year: "2019",
    events: [
      "생손보 영수보험료 1조 원 돌파",
    ],
  },
  {
    year: "2016",
    events: [
      "이윤 이사회 의장 취임",
      "이용진 대표이사 사장 취임",
      "수수료 매출액 2천억 원 달성",
    ],
  },
  {
    year: "2015",
    events: [
      "지사 단위 밸류체인 시행",
      "PAMS II 서비스 개시",
    ],
  },
  {
    year: "2014",
    events: [
      "환수연대책임제 폐지",
      "생손보 영수보험료 5천억 원 돌파",
      '중앙일보 "2014 소비자 선정 최고의 브랜드 대상" GA부문 수상',
      '중앙일보 Forbes "2014 최고경영자대상" 정도경영부문 수상',
    ],
  },
  {
    year: "2012",
    events: [
      "수수료 매출액 1천억 원 달성",
    ],
  },
  {
    year: "2011",
    events: [
      "광주사업단, 대구사업단 설립",
    ],
  },
  {
    year: "2010",
    events: [
      "영업가족 5천명 돌파",
      "부산사업단 설립",
      "영업규정집 발간 - 승격과 분할에 대한 공정한 기준을 모든 영업 가족에게 공개",
    ],
  },
  {
    year: "2009",
    events: [
      "프라임에셋(주) 법인 전환",
    ],
  },
  {
    year: "2007",
    events: [
      "대전사업단 설립",
    ],
  },
  {
    year: "2006",
    events: [
      "본부단위 밸류체인 시행",
      "GA 최초 성장과 분할의 가치사슬 구축",
    ],
  },
  {
    year: "2002",
    events: [
      "프라임인스넷 창립",
      "성수동 오피스텔",
    ],
  },
];

export default function HistorySection() {
  return (
    <section id="history" className="py-8 bg-white scroll-mt-20">
      <div className="max-w-7xl mx-auto px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.8 }}
          className="text-center mb-20"
        >
          <h2 className="text-4xl md:text-5xl font-bold text-slate-900 mb-4">
            주요연혁
          </h2>
          <p className="text-xl text-slate-600 font-light">
            프라임에셋의 성장과 발전의 역사
          </p>
        </motion.div>

        <div className="relative">
          {/* 타임라인 라인 */}
          <div className="absolute left-8 md:left-1/2 top-0 bottom-0 w-0.5 bg-gradient-to-b from-electric-blue/20 via-electric-blue/40 to-slate-200 hidden md:block" />

          <div className="space-y-12">
            {historyItems.map((item, index) => {
              const isEven = index % 2 === 0;
              const hasAward = item.events.some((e) =>
                e.includes("연도대상") || e.includes("수상") || e.includes("표창")
              );

              return (
                <motion.div
                  key={item.year}
                  initial={{ opacity: 0, x: isEven ? -50 : 50 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true, margin: "-50px" }}
                  transition={{ duration: 0.6, delay: index * 0.1 }}
                  className={`relative flex items-center ${
                    isEven ? "md:flex-row" : "md:flex-row-reverse"
                  }`}
                >
                  {/* 연도 표시 */}
                  <div className="flex-shrink-0 w-32 md:w-40 text-right md:text-center">
                    <div className="inline-flex items-center justify-center w-16 h-16 bg-gradient-to-br from-electric-blue to-blue-600 rounded-full text-white font-bold text-lg shadow-lg relative z-10">
                      {hasAward && (
                        <Award className="absolute -top-1 -right-1 w-5 h-5 text-amber-400" />
                      )}
                      {item.year}
                    </div>
                  </div>

                  {/* 콘텐츠 카드 */}
                  <div
                    className={`flex-1 ml-6 md:ml-0 ${
                      isEven ? "md:mr-8" : "md:ml-8"
                    }`}
                  >
                    <div className="glass rounded-2xl p-6 shadow-soft border border-slate-200/50 hover:shadow-soft-lg transition-all">
                      <div className="space-y-3">
                        {item.events.map((event, eventIndex) => {
                          const isAward =
                            event.includes("연도대상") ||
                            event.includes("수상") ||
                            event.includes("표창");
                          const isMilestone =
                            event.includes("달성") ||
                            event.includes("돌파") ||
                            event.includes("설립");

                          return (
                            <div
                              key={eventIndex}
                              className="flex items-start space-x-3"
                            >
                              {isAward ? (
                                <Trophy className="w-5 h-5 text-amber-500 flex-shrink-0 mt-0.5" />
                              ) : isMilestone ? (
                                <TrendingUp className="w-5 h-5 text-electric-blue flex-shrink-0 mt-0.5" />
                              ) : (
                                <Calendar className="w-5 h-5 text-slate-400 flex-shrink-0 mt-0.5" />
                              )}
                              <p
                                className={`text-slate-700 leading-relaxed ${
                                  isAward ? "font-medium" : ""
                                }`}
                              >
                                {event}
                              </p>
                            </div>
                          );
                        })}
                      </div>
                    </div>
                  </div>
                </motion.div>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
}

