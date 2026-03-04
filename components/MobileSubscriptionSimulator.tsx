"use client";

import { useMemo, useState } from "react";
import { motion } from "framer-motion";
import { CheckCircle2, ChevronLeft, ChevronRight, CircleAlert, FileText } from "lucide-react";

type SimulationData = {
  applicantName: string;
  applicantPhone: string;
  insuredRelation: string;
  hasDriving: "yes" | "no";
  drivingType: string;
  jobCategory: string;
  hadMedicalNotice3m: "yes" | "no";
  hadMedicalNotice2y: "yes" | "no";
  hadMedicalNotice5y: "yes" | "no";
  monthlyIncomeBand: string;
  acceptProductGuide: boolean;
  acceptDutyNotice: boolean;
  acceptPrivacy: boolean;
  signName: string;
};

const initialData: SimulationData = {
  applicantName: "",
  applicantPhone: "",
  insuredRelation: "본인",
  hasDriving: "no",
  drivingType: "",
  jobCategory: "",
  hadMedicalNotice3m: "no",
  hadMedicalNotice2y: "no",
  hadMedicalNotice5y: "no",
  monthlyIncomeBand: "",
  acceptProductGuide: false,
  acceptDutyNotice: false,
  acceptPrivacy: false,
  signName: "",
};

const stepTitles = [
  "기본 정보",
  "직업/운전",
  "알릴의무",
  "적합성",
  "중요 고지",
  "전자서명",
  "최종 확인",
];

const productRows = [
  { name: "주보험(간편고지형(2), 갱신형)", amount: "2,000만원", term: "10년 갱신", premium: "660원" },
  { name: "암(유사암 제외) 진단", amount: "2,000만원", term: "10년 갱신", premium: "26,500원" },
  { name: "유사암 진단", amount: "400만원", term: "10년 갱신", premium: "1,740원" },
  { name: "항암방사선치료", amount: "1,000만원", term: "10년 갱신", premium: "4,530원" },
];

function formatPhone(value: string) {
  const digits = value.replace(/\D/g, "").slice(0, 11);
  if (digits.length <= 3) return digits;
  if (digits.length <= 7) return `${digits.slice(0, 3)}-${digits.slice(3)}`;
  return `${digits.slice(0, 3)}-${digits.slice(3, 7)}-${digits.slice(7)}`;
}

export default function MobileSubscriptionSimulator() {
  const [step, setStep] = useState(0);
  const [done, setDone] = useState(false);
  const [data, setData] = useState<SimulationData>(initialData);

  const progress = ((step + 1) / stepTitles.length) * 100;

  const canProceed = useMemo(() => {
    switch (step) {
      case 0:
        return Boolean(data.applicantName && data.applicantPhone.length >= 12);
      case 1:
        return Boolean(data.jobCategory) && (data.hasDriving === "no" || Boolean(data.drivingType));
      case 2:
        return Boolean(data.hadMedicalNotice3m && data.hadMedicalNotice2y && data.hadMedicalNotice5y);
      case 3:
        return Boolean(data.monthlyIncomeBand);
      case 4:
        return data.acceptProductGuide && data.acceptDutyNotice && data.acceptPrivacy;
      case 5:
        return Boolean(data.signName.trim());
      default:
        return true;
    }
  }, [data, step]);

  const update = <K extends keyof SimulationData>(key: K, value: SimulationData[K]) => {
    setData((prev) => ({ ...prev, [key]: value }));
  };

  const next = () => {
    if (!canProceed) return;
    if (step === stepTitles.length - 1) {
      setDone(true);
      return;
    }
    setStep((s) => s + 1);
  };

  const prev = () => setStep((s) => Math.max(0, s - 1));

  const reset = () => {
    setData(initialData);
    setStep(0);
    setDone(false);
  };

  return (
    <section className="mb-12">
      <div className="rounded-3xl border border-slate-200 bg-white shadow-soft p-6 md:p-8">
        <div className="flex items-center justify-between gap-4 mb-4">
          <div>
            <h2 className="text-2xl md:text-3xl font-bold text-slate-900">가상 모바일청약 시뮬레이터</h2>
            <p className="text-sm md:text-base text-slate-600 mt-1">
              `서면청약서.pdf` 문항 기준으로 전자청약 흐름(알릴의무·적합성·동의·서명)을 체험합니다.
            </p>
          </div>
          <span className="inline-flex items-center gap-1.5 rounded-full bg-electric-blue/10 px-3 py-1 text-xs font-semibold text-electric-blue">
            Day 9 실습
          </span>
        </div>

        <div className="mb-6">
          <div className="w-full h-2 rounded-full bg-slate-100 overflow-hidden">
            <motion.div
              className="h-full bg-gradient-to-r from-electric-blue to-violet-500"
              initial={false}
              animate={{ width: `${progress}%` }}
              transition={{ duration: 0.25 }}
            />
          </div>
          <p className="mt-2 text-xs text-slate-500">
            {step + 1} / {stepTitles.length} · {stepTitles[step]}
          </p>
        </div>

        {!done ? (
          <div className="grid grid-cols-1 xl:grid-cols-[1fr_340px] gap-6">
            <div className="rounded-2xl border border-slate-200 bg-slate-50/70 p-5 md:p-6">
              {step === 0 && (
                <div className="space-y-4">
                  <h3 className="font-semibold text-slate-900">1) 기본 정보 입력</h3>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <input
                      value={data.applicantName}
                      onChange={(e) => update("applicantName", e.target.value)}
                      className="w-full rounded-xl border border-slate-200 bg-white px-4 py-3"
                      placeholder="계약자 성명"
                    />
                    <input
                      value={data.applicantPhone}
                      onChange={(e) => update("applicantPhone", formatPhone(e.target.value))}
                      className="w-full rounded-xl border border-slate-200 bg-white px-4 py-3"
                      placeholder="010-0000-0000"
                    />
                    <select
                      value={data.insuredRelation}
                      onChange={(e) => update("insuredRelation", e.target.value)}
                      className="w-full rounded-xl border border-slate-200 bg-white px-4 py-3"
                    >
                      <option value="본인">피보험자 관계: 본인</option>
                      <option value="배우자">피보험자 관계: 배우자</option>
                      <option value="자녀">피보험자 관계: 자녀</option>
                    </select>
                  </div>
                </div>
              )}

              {step === 1 && (
                <div className="space-y-4">
                  <h3 className="font-semibold text-slate-900">2) 직업/운전 정보</h3>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <select
                      value={data.jobCategory}
                      onChange={(e) => update("jobCategory", e.target.value)}
                      className="w-full rounded-xl border border-slate-200 bg-white px-4 py-3"
                    >
                      <option value="">직업군 선택</option>
                      <option value="사무/관리">사무/관리</option>
                      <option value="영업">영업</option>
                      <option value="현장/기술">현장/기술</option>
                    </select>
                    <select
                      value={data.hasDriving}
                      onChange={(e) => update("hasDriving", e.target.value as "yes" | "no")}
                      className="w-full rounded-xl border border-slate-200 bg-white px-4 py-3"
                    >
                      <option value="no">운전 여부: 아니오</option>
                      <option value="yes">운전 여부: 예</option>
                    </select>
                    {data.hasDriving === "yes" && (
                      <select
                        value={data.drivingType}
                        onChange={(e) => update("drivingType", e.target.value)}
                        className="w-full rounded-xl border border-slate-200 bg-white px-4 py-3 md:col-span-2"
                      >
                        <option value="">운전 차종 선택</option>
                        <option value="승용차(자가용)">승용차(자가용)</option>
                        <option value="승합/화물">승합/화물</option>
                        <option value="이륜차/개인형 이동장치">이륜차/개인형 이동장치</option>
                      </select>
                    )}
                  </div>
                </div>
              )}

              {step === 2 && (
                <div className="space-y-4">
                  <h3 className="font-semibold text-slate-900">3) 계약 전 알릴의무</h3>
                  <p className="text-sm text-slate-600">
                    실제 청약서 기준으로 최근 3개월/2년/5년 질문에 대한 답변을 입력합니다.
                  </p>
                  <div className="space-y-3">
                    <label className="flex items-center justify-between gap-2 rounded-xl border border-slate-200 bg-white px-4 py-3">
                      <span className="text-sm text-slate-700">최근 3개월 내 입원/수술/추가검사 소견</span>
                      <select
                        value={data.hadMedicalNotice3m}
                        onChange={(e) => update("hadMedicalNotice3m", e.target.value as "yes" | "no")}
                        className="rounded-lg border border-slate-200 px-3 py-1.5 text-sm"
                      >
                        <option value="no">없음</option>
                        <option value="yes">있음</option>
                      </select>
                    </label>
                    <label className="flex items-center justify-between gap-2 rounded-xl border border-slate-200 bg-white px-4 py-3">
                      <span className="text-sm text-slate-700">최근 2년 내 입원/수술 이력</span>
                      <select
                        value={data.hadMedicalNotice2y}
                        onChange={(e) => update("hadMedicalNotice2y", e.target.value as "yes" | "no")}
                        className="rounded-lg border border-slate-200 px-3 py-1.5 text-sm"
                      >
                        <option value="no">없음</option>
                        <option value="yes">있음</option>
                      </select>
                    </label>
                    <label className="flex items-center justify-between gap-2 rounded-xl border border-slate-200 bg-white px-4 py-3">
                      <span className="text-sm text-slate-700">최근 5년 내 7대질환 진단/입원/수술</span>
                      <select
                        value={data.hadMedicalNotice5y}
                        onChange={(e) => update("hadMedicalNotice5y", e.target.value as "yes" | "no")}
                        className="rounded-lg border border-slate-200 px-3 py-1.5 text-sm"
                      >
                        <option value="no">없음</option>
                        <option value="yes">있음</option>
                      </select>
                    </label>
                  </div>
                  <div className="rounded-xl bg-amber-50 border border-amber-200 p-3 text-xs text-amber-900">
                    고지 누락 시 계약 해지/보험금 미지급 가능성을 반드시 설명해야 합니다.
                  </div>
                </div>
              )}

              {step === 3 && (
                <div className="space-y-4">
                  <h3 className="font-semibold text-slate-900">4) 적합성(소득/납입 가능성)</h3>
                  <select
                    value={data.monthlyIncomeBand}
                    onChange={(e) => update("monthlyIncomeBand", e.target.value)}
                    className="w-full rounded-xl border border-slate-200 bg-white px-4 py-3"
                  >
                    <option value="">월 소득 구간 선택</option>
                    <option value="100미만">100만원 미만</option>
                    <option value="100~300">100~300만원</option>
                    <option value="300~500">300~500만원</option>
                    <option value="500~1000">500~1000만원</option>
                    <option value="1000이상">1000만원 이상</option>
                  </select>
                </div>
              )}

              {step === 4 && (
                <div className="space-y-4">
                  <h3 className="font-semibold text-slate-900">5) 중요 안내 확인/동의</h3>
                  <label className="flex items-start gap-2 rounded-xl border border-slate-200 bg-white p-3">
                    <input type="checkbox" checked={data.acceptProductGuide} onChange={(e) => update("acceptProductGuide", e.target.checked)} />
                    <span className="text-sm text-slate-700">상품설명서(갱신형, 해약환급금, 예금자보호)를 안내받았습니다.</span>
                  </label>
                  <label className="flex items-start gap-2 rounded-xl border border-slate-200 bg-white p-3">
                    <input type="checkbox" checked={data.acceptDutyNotice} onChange={(e) => update("acceptDutyNotice", e.target.checked)} />
                    <span className="text-sm text-slate-700">계약 전 알릴의무와 위반 시 불이익을 확인했습니다.</span>
                  </label>
                  <label className="flex items-start gap-2 rounded-xl border border-slate-200 bg-white p-3">
                    <input type="checkbox" checked={data.acceptPrivacy} onChange={(e) => update("acceptPrivacy", e.target.checked)} />
                    <span className="text-sm text-slate-700">개인정보 수집·이용 및 전자문서 전송에 동의합니다.</span>
                  </label>
                </div>
              )}

              {step === 5 && (
                <div className="space-y-4">
                  <h3 className="font-semibold text-slate-900">6) 전자서명</h3>
                  <p className="text-sm text-slate-600">실제 모바일청약처럼 서명자 성명을 입력해 전자서명을 대체합니다.</p>
                  <input
                    value={data.signName}
                    onChange={(e) => update("signName", e.target.value)}
                    className="w-full rounded-xl border border-slate-200 bg-white px-4 py-3"
                    placeholder="서명자 성명 입력"
                  />
                </div>
              )}

              {step === 6 && (
                <div className="space-y-4">
                  <h3 className="font-semibold text-slate-900">7) 최종 확인</h3>
                  <div className="rounded-xl border border-slate-200 bg-white p-4 text-sm text-slate-700 space-y-1">
                    <p>계약자: {data.applicantName || "-"}</p>
                    <p>연락처: {data.applicantPhone || "-"}</p>
                    <p>직업군: {data.jobCategory || "-"}</p>
                    <p>운전: {data.hasDriving === "yes" ? data.drivingType || "예" : "아니오"}</p>
                    <p>소득구간: {data.monthlyIncomeBand || "-"}</p>
                    <p>전자서명: {data.signName || "-"}</p>
                  </div>
                  <div className="rounded-xl bg-blue-50 border border-blue-200 p-3 text-xs text-blue-900">
                    이 단계는 교육용 가상 체험입니다. 실제 청약은 보험사 시스템에서 본인 인증/전자서명 절차를 거쳐야 합니다.
                  </div>
                </div>
              )}

              <div className="mt-6 flex items-center justify-between gap-3">
                <button
                  type="button"
                  onClick={prev}
                  disabled={step === 0}
                  className="inline-flex items-center gap-1.5 rounded-xl border border-slate-200 bg-white px-4 py-2.5 text-sm font-medium text-slate-700 disabled:opacity-40"
                >
                  <ChevronLeft className="w-4 h-4" />
                  이전
                </button>
                <button
                  type="button"
                  onClick={next}
                  disabled={!canProceed}
                  className="inline-flex items-center gap-1.5 rounded-xl bg-gradient-to-r from-electric-blue to-blue-600 px-5 py-2.5 text-sm font-semibold text-white disabled:opacity-50"
                >
                  {step === stepTitles.length - 1 ? "가상 청약 완료" : "다음"}
                  <ChevronRight className="w-4 h-4" />
                </button>
              </div>
            </div>

            <aside className="rounded-2xl border border-slate-200 bg-white p-4">
              <h4 className="font-semibold text-slate-900 mb-3">모바일 청약서 미리보기</h4>
              <div className="mx-auto w-[270px] rounded-[32px] border-[8px] border-slate-900 bg-slate-900 p-1.5 shadow-xl">
                <div className="rounded-[24px] bg-white overflow-hidden">
                  <div className="h-6 bg-slate-900" />
                  <div className="p-3 space-y-2">
                    <div className="text-[11px] font-semibold text-slate-900">전자청약서(교육용)</div>
                    <div className="text-[10px] text-slate-600">
                      계약자: {data.applicantName || "홍길동"} / {data.applicantPhone || "010-0000-0000"}
                    </div>
                    <div className="text-[10px] text-slate-600">관계: {data.insuredRelation}</div>
                    <div className="text-[10px] text-slate-600">
                      직업: {data.jobCategory || "사무/관리"} · 운전: {data.hasDriving === "yes" ? data.drivingType || "예" : "아니오"}
                    </div>
                    <div className="rounded-md bg-slate-50 border border-slate-200 p-2">
                      <p className="text-[10px] font-semibold text-slate-900 mb-1">핵심 고지 항목</p>
                      <ul className="space-y-0.5 text-[9px] text-slate-600">
                        <li>최근 3개월: {data.hadMedicalNotice3m === "yes" ? "있음" : "없음"}</li>
                        <li>최근 2년: {data.hadMedicalNotice2y === "yes" ? "있음" : "없음"}</li>
                        <li>최근 5년: {data.hadMedicalNotice5y === "yes" ? "있음" : "없음"}</li>
                      </ul>
                    </div>
                    <div className="rounded-md bg-blue-50 border border-blue-200 p-2">
                      <p className="text-[10px] font-semibold text-slate-900 mb-1">월 소득 구간</p>
                      <p className="text-[9px] text-slate-700">{data.monthlyIncomeBand || "선택 필요"}</p>
                    </div>
                    <div className="text-[9px] text-slate-500 border-t border-slate-200 pt-2">
                      서명자: {data.signName || "미입력"} / 본인인증·전자서명 단계 진행
                    </div>
                  </div>
                </div>
              </div>

              <div className="mt-3 rounded-xl border border-slate-200 bg-slate-50 p-3">
                <p className="text-xs font-semibold text-slate-900 mb-2">PDF 기준 대표 담보 예시</p>
                <ul className="space-y-1.5">
                  {productRows.map((row) => (
                    <li key={row.name} className="text-[11px] text-slate-600">
                      <span className="font-medium text-slate-800">{row.name}</span>
                      <br />
                      {row.amount} · {row.term} · {row.premium}
                    </li>
                  ))}
                </ul>
              </div>
              <a
                href="/mobile-subscription/서면청약서.pdf"
                target="_blank"
                rel="noreferrer"
                className="mt-3 inline-flex items-center gap-1 text-xs font-semibold text-electric-blue hover:text-blue-700"
              >
                <FileText className="w-3.5 h-3.5" />
                기준 문서(PDF) 열기
              </a>
            </aside>
          </div>
        ) : (
          <div className="rounded-2xl border border-emerald-200 bg-emerald-50 p-6 text-center">
            <CheckCircle2 className="w-10 h-10 text-emerald-600 mx-auto mb-2" />
            <h3 className="text-lg font-bold text-emerald-900 mb-1">가상 모바일청약 완료</h3>
            <p className="text-sm text-emerald-800">
              교육용 시뮬레이션을 마쳤습니다. 다음은 RP에서 고지의무 설명 멘트를 복습하세요.
            </p>
            <button
              type="button"
              onClick={reset}
              className="mt-4 rounded-xl bg-white border border-emerald-200 px-4 py-2 text-sm font-semibold text-emerald-800"
            >
              다시 체험하기
            </button>
          </div>
        )}

        <div className="mt-4 inline-flex items-start gap-2 rounded-xl bg-slate-50 border border-slate-200 p-3 text-xs text-slate-600">
          <CircleAlert className="w-4 h-4 mt-0.5 text-slate-500" />
          <span>
            본 시뮬레이터는 교육 목적의 가상 체험입니다. 실제 청약/인수는 보험사 전산 및 본인인증 절차를 따릅니다.
          </span>
        </div>
      </div>
    </section>
  );
}

