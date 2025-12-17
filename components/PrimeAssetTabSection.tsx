"use client";

import { motion, AnimatePresence } from "framer-motion";
import { useState, useEffect } from "react";
import {
  Building2,
  DollarSign,
  Network,
  FileText,
  Eye,
  CheckCircle2,
  Scale,
  Share2,
  TrendingUp,
  Clock,
} from "lucide-react";
import HistorySection from "./HistorySection";

const tabs = [
  { id: "company-info", label: "기업정보", icon: Building2 },
  { id: "history", label: "연혁", icon: Clock },
  { id: "fee", label: "수수료", icon: DollarSign },
  { id: "value", label: "벨류체인", icon: Network },
  { id: "rules", label: "영업규정집", icon: FileText },
];

export default function PrimeAssetTabSection() {
  const [activeTab, setActiveTab] = useState("company-info");

  useEffect(() => {
    // URL 해시에 따라 탭 설정
    const hash = window.location.hash.replace("#", "");
    
    // 해시를 탭 ID로 매핑
    const hashToTabId: Record<string, string> = {
      "company-info": "company-info",
      "history": "history",
      "prime-asset-fee": "fee",
      "prime-asset-value": "value",
      "prime-asset-rules": "rules",
    };
    
    if (hash && hashToTabId[hash]) {
      setActiveTab(hashToTabId[hash]);
    }
  }, []);

  // 해시 변경 감지
  useEffect(() => {
    const handleHashChange = () => {
      const hash = window.location.hash.replace("#", "");
      const hashToTabId: Record<string, string> = {
        "company-info": "company-info",
        "history": "history",
        "prime-asset-fee": "fee",
        "prime-asset-value": "value",
        "prime-asset-rules": "rules",
      };
      
      if (hash && hashToTabId[hash]) {
        setActiveTab(hashToTabId[hash]);
      }
    };

    window.addEventListener("hashchange", handleHashChange);
    return () => window.removeEventListener("hashchange", handleHashChange);
  }, []);

  const handleTabChange = (tabId: string) => {
    setActiveTab(tabId);
    // 탭 ID를 해시로 매핑
    const tabIdToHash: Record<string, string> = {
      "company-info": "company-info",
      "history": "history",
      "fee": "prime-asset-fee",
      "value": "prime-asset-value",
      "rules": "prime-asset-rules",
    };
    // URL 해시 업데이트
    window.history.replaceState(null, "", `#${tabIdToHash[tabId] || tabId}`);
  };

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
            프라임에셋 소개
          </h2>
          <p className="text-xl text-slate-600 font-light">
            신뢰와 혁신을 바탕으로 한 보험 영업의 새로운 표준
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
                  onClick={() => handleTabChange(tab.id)}
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
            {activeTab === "company-info" && (
              <motion.div
                key="company-info"
                id="company-info"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -20 }}
                transition={{ duration: 0.3 }}
                className="scroll-mt-20"
              >
                <div className="glass rounded-3xl p-12 shadow-soft border border-slate-200/50">
                  <motion.div
                    initial={{ opacity: 0, y: 30 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.6 }}
                    className="text-center mb-12"
                  >
                    <h3 className="text-3xl font-bold text-slate-900 mb-4">
                      기업정보
                    </h3>
                  </motion.div>

                  <motion.div
                    initial={{ opacity: 0, y: 30 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.6, delay: 0.2 }}
                    className="space-y-6"
                  >
                    <div className="space-y-6">
                      <div className="flex items-start space-x-4">
                        <div className="w-12 h-12 bg-gradient-to-br from-electric-blue to-blue-600 rounded-xl flex items-center justify-center flex-shrink-0 shadow-lg">
                          <Building2 className="w-6 h-6 text-white" />
                        </div>
                        <div>
                          <h4 className="text-xl font-bold text-slate-900 mb-2">
                            보험판매 법인대리점
                          </h4>
                          <p className="text-slate-600 leading-relaxed">
                            프라임에셋은 보험판매 법인대리점입니다.
                          </p>
                        </div>
                      </div>

                      <div className="border-t border-slate-200 pt-6">
                        <p className="text-lg text-slate-700 leading-relaxed">
                          우리는 고객의 삶을 위험에서 보호하고, 고객의 자산을 효율적으로
                          관리하고, 우리 자신의 행복을 추구하기 위하여 보험을 판매하는
                          멋진 사람들입니다.
                        </p>
                      </div>
                    </div>
                  </motion.div>
                </div>
              </motion.div>
            )}

            {activeTab === "history" && (
              <motion.div
                key="history"
                id="history"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -20 }}
                transition={{ duration: 0.3 }}
                className="scroll-mt-20"
              >
                <div className="py-8">
                  <HistorySection />
                </div>
              </motion.div>
            )}

            {activeTab === "fee" && (
              <motion.div
                key="fee"
                id="prime-asset-fee"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -20 }}
                transition={{ duration: 0.3 }}
                className="scroll-mt-20"
              >
                <div className="space-y-8">
                  <motion.div
                    initial={{ opacity: 0, y: 30 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.6 }}
                    className="text-center mb-12"
                  >
                    <div className="inline-flex items-center justify-center w-16 h-16 bg-gradient-to-br from-emerald-500 to-teal-500 rounded-2xl mb-6 shadow-lg">
                      <Eye className="w-8 h-8 text-white" />
                    </div>
                    <h3 className="text-3xl font-bold text-slate-900 mb-4">
                      모든 수수료를 투명하게
                    </h3>
                    <p className="text-xl text-slate-600 font-light">
                      투명성
                    </p>
                  </motion.div>

                  <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 mb-16">
                    <motion.div
                      initial={{ opacity: 0, x: -50 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ duration: 0.6 }}
                      className="glass rounded-3xl p-10 shadow-soft border border-slate-200/50"
                    >
                      <h4 className="text-2xl font-bold text-slate-900 mb-6">
                        투명성
                      </h4>
                      <p className="text-slate-700 leading-relaxed text-lg mb-6">
                        프라임에셋은 지급액과 지급률 모두를 명확하게 공개하여,
                        투명성을 입증한 최초의 GA입니다.
                      </p>
                      <div className="flex items-center space-x-2 text-electric-blue">
                        <CheckCircle2 className="w-5 h-5" />
                        <span className="font-medium">지급액 공개</span>
                      </div>
                      <div className="flex items-center space-x-2 text-electric-blue mt-2">
                        <CheckCircle2 className="w-5 h-5" />
                        <span className="font-medium">지급률 공개</span>
                      </div>
                    </motion.div>

                    <motion.div
                      initial={{ opacity: 0, x: 50 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ duration: 0.6, delay: 0.2 }}
                      className="glass rounded-3xl p-10 shadow-soft border border-slate-200/50"
                    >
                      <div className="flex items-center space-x-4 mb-6">
                        <div className="w-12 h-12 bg-gradient-to-br from-blue-500 to-cyan-500 rounded-xl flex items-center justify-center shadow-lg">
                          <FileText className="w-6 h-6 text-white" />
                        </div>
                        <h4 className="text-2xl font-bold text-slate-900">
                          급여명세서
                        </h4>
                      </div>
                      <p className="text-slate-700 leading-relaxed text-lg">
                        프라임에셋의 급여명세서는 모든 정보를 공개합니다.
                        수수료 항목을 계약 별로 투명하게 확인할 수 있으며,
                        각 수수료의 모수와 개인의 지급율을 명확하게 공개합니다.
                      </p>
                    </motion.div>
                  </div>

                  <motion.div
                    initial={{ opacity: 0, y: 50 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.6, delay: 0.4 }}
                    className="glass rounded-3xl p-12 shadow-soft-lg border border-slate-200/50 bg-gradient-to-br from-electric-blue/5 to-slate-50"
                  >
                    <div className="text-center mb-12">
                      <h4 className="text-3xl font-bold text-slate-900 mb-4">
                        노력이 즉시 보상받는 순간
                      </h4>
                      <p className="text-2xl font-semibold text-electric-blue">
                        강력한 선지급
                      </p>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                      <div className="bg-white rounded-2xl p-8 shadow-sm border border-slate-200">
                        <h5 className="text-xl font-bold text-slate-900 mb-4">
                          선지급
                        </h5>
                        <p className="text-slate-700 leading-relaxed">
                          수수료, 시상금 모두 프라임에셋의 자기자본으로 미리 지급됩니다.
                          탁월한 재무 안정성을 바탕으로 지속가능한 선지급을 약속합니다.
                        </p>
                      </div>

                      <div className="bg-white rounded-2xl p-8 shadow-sm border border-slate-200">
                        <h5 className="text-xl font-bold text-slate-900 mb-4">
                          수수료
                        </h5>
                        <p className="text-slate-700 leading-relaxed">
                          프라임에셋만이 가지고 있는 재무 안정성을 바탕으로
                          안정적인 수수료 지급을 약속합니다.
                          프라임에셋은 업계에서 경쟁력 있는 수수료 선지급을 보장합니다.
                        </p>
                      </div>
                    </div>
                  </motion.div>
                </div>
              </motion.div>
            )}

            {activeTab === "value" && (
              <motion.div
                key="value"
                id="prime-asset-value"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -20 }}
                transition={{ duration: 0.3 }}
                className="scroll-mt-20"
              >
                <div className="space-y-8">
                  <motion.div
                    initial={{ opacity: 0, y: 30 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.6 }}
                    className="text-center mb-12"
                  >
                    <div className="inline-flex items-center justify-center w-16 h-16 bg-gradient-to-br from-purple-500 to-pink-500 rounded-2xl mb-6 shadow-lg">
                      <Network className="w-8 h-8 text-white" />
                    </div>
                    <h3 className="text-3xl font-bold text-slate-900 mb-4">
                      성장과 분할의 밸류체인
                    </h3>
                    <p className="text-xl text-slate-600 font-light max-w-3xl mx-auto leading-relaxed">
                      개인영업의 한계를 넘어, 관리자로 성장하는 비전을 제시합니다
                    </p>
                  </motion.div>

                  <motion.div
                    initial={{ opacity: 0, y: 50 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.6 }}
                    className="glass rounded-3xl p-12 shadow-soft-lg border border-slate-200/50 mb-16"
                  >
                    <p className="text-lg text-slate-700 leading-relaxed mb-6">
                      성장은 결과가 아닙니다. 단지 과정의 표현일 뿐입니다.
                      그래서 GA에서의 성장은 항상 분열의 결과를 반복했습니다.
                    </p>
                    <p className="text-lg text-slate-700 leading-relaxed mb-6">
                      프라임에셋은 설계사의 성장을 공동체와 공유하며,
                      공동체의 성장을 다시 설계사와 공유하는 성장의 선순환 시스템을
                      구축했습니다. 바로 <span className="font-bold text-electric-blue">밸류체인</span>입니다.
                    </p>
                    <p className="text-lg text-slate-700 leading-relaxed">
                      밸류체인에 의한 성장은 공정기준에 의한 분할로 이어집니다.
                      밸류체인에 의한 분할은 가치공유에 의한 소득 상승과 지속성으로 이어집니다.
                      그래서 프라임에셋의 밸류체인은
                      <span className="font-bold text-electric-blue"> 지속가능한 미래를 약속하는 강력한 비전</span>입니다.
                    </p>
                  </motion.div>

                  <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                    <motion.div
                      initial={{ opacity: 0, x: -50 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ duration: 0.6 }}
                      className="glass rounded-3xl p-10 shadow-soft border border-slate-200/50"
                    >
                      <div className="flex items-center space-x-4 mb-6">
                        <div className="w-12 h-12 bg-gradient-to-br from-amber-500 to-orange-500 rounded-xl flex items-center justify-center shadow-lg">
                          <Scale className="w-6 h-6 text-white" />
                        </div>
                        <h4 className="text-2xl font-bold text-slate-900">
                          공정기준
                        </h4>
                      </div>
                      <p className="text-slate-700 leading-relaxed mb-6">
                        공정기준은 프라임에셋 공동체 누구에게나 동일한 기준이 적용되고,
                        동일한 기준에 의해서 누구나 관리자로 승격할 수 있는 제도입니다.
                      </p>

                      <div className="bg-white rounded-2xl p-6 shadow-sm border border-slate-200">
                        <h5 className="font-bold text-slate-900 mb-4 flex items-center">
                          <TrendingUp className="w-5 h-5 text-electric-blue mr-2" />
                          공정기준에 의한 기회의 평등
                        </h5>
                        <div className="space-y-3 text-slate-700 text-sm leading-relaxed">
                          <p>
                            모든 GA는 설계사의 증원을 목표로 합니다.
                            일부 GA에 승격 제도가 있지만 기존 관리자와 승격된 관리자 사이에는
                            가치 분배에 대한 이해충돌이 발생합니다.
                          </p>
                          <p>
                            그래서 기존 관리자와 동일한 지급률의 관리자 승격은 불가능합니다.
                          </p>
                          <p className="font-semibold text-electric-blue">
                            프라임에셋은 공정기준에 의한 직급 승격을 누구에게나 보장합니다.
                            모든 본부가 밸류체인에 의한 단일가치로 연결되어
                            기존 관리자와 승격된 관리자 사이의 이해충돌이 발생하지 않기 때문입니다.
                          </p>
                        </div>
                      </div>
                    </motion.div>

                    <motion.div
                      initial={{ opacity: 0, x: 50 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ duration: 0.6, delay: 0.2 }}
                      className="glass rounded-3xl p-10 shadow-soft border border-slate-200/50"
                    >
                      <div className="flex items-center space-x-4 mb-6">
                        <div className="w-12 h-12 bg-gradient-to-br from-emerald-500 to-teal-500 rounded-xl flex items-center justify-center shadow-lg">
                          <Share2 className="w-6 h-6 text-white" />
                        </div>
                        <h4 className="text-2xl font-bold text-slate-900">
                          가치공유
                        </h4>
                      </div>
                      <p className="text-slate-700 leading-relaxed mb-6">
                        가치공유란 조직이 분할되어도 기존 관리자와 분할된 관리자 사이에
                        가치분배에 대한 이해충돌 대신 가치공유에 의한
                        소득의 지속가능성을 약속하는 제도입니다.
                      </p>

                      <div className="bg-white rounded-2xl p-6 shadow-sm border border-slate-200">
                        <h5 className="font-bold text-slate-900 mb-4 flex items-center">
                          <Share2 className="w-5 h-5 text-emerald-500 mr-2" />
                          지속가능한 소득
                        </h5>
                        <div className="space-y-3 text-slate-700 text-sm leading-relaxed">
                          <p>
                            조직 분할 시 발생하는 일반적인 문제는
                            기존 관리자와 분할된 관리자 사이의 가치 분배 갈등입니다.
                          </p>
                          <p className="font-semibold text-emerald-600">
                            프라임에셋의 가치공유 제도는 이러한 갈등을 해소하고,
                            양쪽 모두에게 지속가능한 소득을 보장합니다.
                          </p>
                        </div>
                      </div>
                    </motion.div>
                  </div>
                </div>
              </motion.div>
            )}

            {activeTab === "rules" && (
              <motion.div
                key="rules"
                id="prime-asset-rules"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -20 }}
                transition={{ duration: 0.3 }}
                className="scroll-mt-20"
              >
                <div className="glass rounded-3xl p-12 shadow-soft border border-slate-200/50">
                  <div className="text-center mb-12">
                    <div className="inline-flex items-center justify-center w-16 h-16 bg-gradient-to-br from-amber-500 to-orange-500 rounded-2xl mb-6 shadow-lg">
                      <FileText className="w-8 h-8 text-white" />
                    </div>
                    <h3 className="text-3xl font-bold text-slate-900 mb-4">
                      영업규정집
                    </h3>
                    <p className="text-xl text-slate-600 font-light">
                      명확하고 투명한 영업 규정으로 공정한 업무 환경
                    </p>
                  </div>

                  <div className="space-y-6">
                    <motion.div
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: 0.1 }}
                      className="bg-white rounded-2xl p-8 shadow-sm border border-slate-200"
                    >
                      <h4 className="text-xl font-bold text-slate-900 mb-4">
                        공정한 기준의 영업 규정
                      </h4>
                      <p className="text-slate-700 leading-relaxed mb-4">
                        프라임에셋의 영업규정집은 모든 영업 가족에게 공개되며,
                        승격과 분할에 대한 공정한 기준을 명확하게 제시합니다.
                      </p>
                      <p className="text-slate-700 leading-relaxed">
                        2010년 영업규정집 발간 이후, 프라임에셋은 투명성과
                        공정성을 바탕으로 한 영업 환경을 구축해왔습니다.
                      </p>
                    </motion.div>

                    <motion.div
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: 0.2 }}
                      className="bg-white rounded-2xl p-8 shadow-sm border border-slate-200"
                    >
                      <h4 className="text-xl font-bold text-slate-900 mb-4">
                        명확한 승격 기준
                      </h4>
                      <p className="text-slate-700 leading-relaxed">
                        모든 설계사는 동일한 기준에 따라 관리자로 승격할 수
                        있으며, 이러한 기준은 영업규정집에 명시되어 있습니다.
                        공정기준에 의한 기회의 평등을 보장합니다.
                      </p>
                    </motion.div>

                    <motion.div
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: 0.3 }}
                      className="bg-white rounded-2xl p-8 shadow-sm border border-slate-200"
                    >
                      <h4 className="text-xl font-bold text-slate-900 mb-4">
                        투명한 분할 규정
                      </h4>
                      <p className="text-slate-700 leading-relaxed">
                        조직 분할 시에도 명확한 규정에 따라 진행되며,
                        가치공유를 통한 지속가능한 소득을 보장합니다.
                      </p>
                    </motion.div>
                  </div>
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </div>
    </section>
  );
}

