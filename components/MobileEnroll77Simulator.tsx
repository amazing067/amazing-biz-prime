"use client";

import { useEffect, useMemo, useState } from "react";
import { ChevronLeft, ChevronRight } from "lucide-react";

type FieldType = "checkbox" | "radio" | "text";
type Field = {
  id: string;
  label: string;
  type: FieldType;
  required?: boolean;
  options?: string[];
  placeholder?: string;
};

type SectionKey = "select" | "summary" | "disclosure" | "docs" | "payment" | "sign" | "done";

type StepModel = {
  id: string;
  section: SectionKey;
  sectionLabel: string;
  title: string;
  subtitle: string;
  fields: Field[];
  mustScroll?: boolean;
  longConfirmText?: string[];
};

const STEPS: StepModel[] = [
  {
    id: "s01",
    section: "select",
    sectionLabel: "대상 계약 선택",
    title: "전자청약 시작 전 대상 계약 선택",
    subtitle: "고객/상품/보험기간/보험료를 먼저 맞춥니다.",
    fields: [
      { id: "contract_match", label: "대상 계약(고객명/상품명) 일치 확인", type: "checkbox", required: true },
      { id: "premium_match", label: "월 보험료/납입주기 확인", type: "checkbox", required: true },
      { id: "period_match", label: "보험기간/납입기간 확인", type: "checkbox", required: true },
    ],
  },
  {
    id: "s02",
    section: "summary",
    sectionLabel: "계약내용 확인",
    title: "회사 상품 주요 설명사항",
    subtitle: "보장 범위, 면책, 환급, 철회 조건을 핵심 문구로 안내합니다.",
    fields: [
      { id: "coverage", label: "주계약/특약 보장 범위 설명 완료", type: "checkbox", required: true },
      { id: "exclusion", label: "면책/감액/보장제한 조건 설명 완료", type: "checkbox", required: true },
      { id: "refund_notice", label: "해약환급금 유의사항 설명 완료", type: "checkbox", required: true },
      { id: "coolingoff", label: "청약철회 가능 기간 및 방법 설명 완료", type: "checkbox", required: true },
    ],
  },
  {
    id: "s03",
    section: "summary",
    sectionLabel: "중요사항 확인",
    title: "계약 중요사항 최종 확인",
    subtitle: "분쟁/민원/예금자보호 등 필수 안내를 체크합니다.",
    fields: [
      { id: "cancel", label: "계약 해지/해제/무효 사유 안내", type: "checkbox", required: true },
      { id: "dispute", label: "민원/분쟁조정 절차 안내", type: "checkbox", required: true },
      { id: "deposit_protection", label: "예금자보호 관련 안내", type: "checkbox", required: true },
      { id: "importance_check", label: "고객 이해 여부 재확인", type: "checkbox", required: true },
    ],
  },
  {
    id: "s04",
    section: "docs",
    sectionLabel: "실소유자/고객정보",
    title: "실소유자 여부 및 인적사항 확인",
    subtitle: "실소유자 확인, 성명/주민등록번호/국적 정보를 점검합니다.",
    fields: [
      {
        id: "actual_owner",
        label: "실소유자 여부",
        type: "radio",
        required: true,
        options: ["예(계약자 본인)", "아니오(실소유자 정보 별도 기재)"],
      },
      { id: "actual_owner_name", label: "실소유자 성명(해당 시)", type: "text", required: true, placeholder: "예: 홍길동" },
      { id: "actual_owner_rrn", label: "주민등록번호(마스킹)", type: "text", required: true, placeholder: "861***-*******" },
      { id: "actual_owner_nationality", label: "국적(외국인인 경우)", type: "text", required: true, placeholder: "예: 대한민국" },
    ],
  },
  {
    id: "s05",
    section: "docs",
    sectionLabel: "거래정보",
    title: "거래 목적 및 거래자금 원천 확인",
    subtitle: "모바일청약 시 자금세탁방지(AML) 항목을 체크합니다.",
    fields: [
      { id: "purpose_insurance", label: "거래 목적: 보험가입", type: "checkbox", required: true },
      { id: "purpose_retirement", label: "거래 목적: 퇴직/연금 준비", type: "checkbox", required: true },
      { id: "purpose_savings", label: "거래 목적: 저축/상속 등", type: "checkbox", required: true },
      { id: "source_salary", label: "자금 원천: 근로소득", type: "checkbox", required: true },
      { id: "source_business", label: "자금 원천: 사업소득", type: "checkbox", required: true },
      { id: "source_finance", label: "자금 원천: 금융소득", type: "checkbox", required: true },
      { id: "source_other", label: "자금 원천: 기타(본인소득)", type: "checkbox", required: true },
    ],
  },
  {
    id: "s06",
    section: "disclosure",
    sectionLabel: "고지의무 입력",
    title: "계약 전 알릴의무(기본)",
    subtitle: "질문 문구를 그대로 읽고 사실만 입력합니다.",
    fields: [
      { id: "as_written", label: "질문을 축약하지 않고 원문대로 확인함", type: "checkbox", required: true },
      {
        id: "job_change",
        label: "직업/직무 위험도 관련",
        type: "radio",
        required: true,
        options: ["해당 없음", "해당 있음(세부 확인 필요)"],
      },
      {
        id: "driving",
        label: "운전 여부/용도",
        type: "radio",
        required: true,
        options: ["해당 없음", "해당 있음(차종/용도 확인)"],
      },
      {
        id: "medical_3m",
        label: "최근 3개월 내 진단/검사/투약/입원/수술",
        type: "radio",
        required: true,
        options: ["해당 없음", "해당 있음(세부 확인 필요)"],
      },
    ],
    mustScroll: true,
    longConfirmText: [
      "고지의무는 청약서 질문 기준으로 사실대로 입력합니다.",
      "설계사에게 구두로만 말한 내용은 분쟁 시 효력이 약할 수 있습니다.",
      "불확실하면 추측 입력 금지, 고객과 확인 후 진행합니다.",
      "고지 누락/오입력은 계약 해지 또는 보장 제한 위험이 있습니다.",
      "교육원칙: 빠른 진행보다 정확한 사실 입력이 우선입니다.",
    ],
  },
  {
    id: "s07",
    section: "disclosure",
    sectionLabel: "고지의무 입력",
    title: "계약 전 알릴의무(1년/5년 이력)",
    subtitle: "최근 1년·5년 질병/입원/수술/투약 이력을 확인합니다.",
    fields: [
      {
        id: "medical_1y",
        label: "최근 1년 내 추가검사(재검사) 여부",
        type: "radio",
        required: true,
        options: ["해당 없음", "해당 있음"],
      },
      {
        id: "medical_5y",
        label: "최근 5년 내 입원/수술/7일 이상 치료/30일 이상 투약",
        type: "radio",
        required: true,
        options: ["해당 없음", "해당 있음"],
      },
      {
        id: "major_disease",
        label: "10대 질병 관련 진단/치료 이력",
        type: "radio",
        required: true,
        options: ["해당 없음", "해당 있음"],
      },
      { id: "oral_warning", label: "구두 고지만으로 처리 불가 안내 완료", type: "checkbox", required: true },
    ],
    mustScroll: true,
    longConfirmText: [
      "고객이 애매해하면 '없음'으로 유도하지 않습니다.",
      "해당 있음 선택 시 세부 사실을 확인하고 진행을 멈춥니다.",
      "질문별 기간(3개월/1년/5년) 기준을 혼동하지 않도록 다시 읽습니다.",
      "기록은 청약서 기준으로 남겨야 합니다.",
    ],
  },
  {
    id: "s08",
    section: "docs",
    sectionLabel: "서류 전달 확인",
    title: "청약서/약관/상품설명서 전달",
    subtitle: "고객이 실제로 열람/저장 가능한 상태인지 확인합니다.",
    fields: [
      { id: "app_copy", label: "청약서 사본 전달 확인", type: "checkbox", required: true },
      { id: "terms_link", label: "약관(링크/QR 포함) 전달 확인", type: "checkbox", required: true },
      { id: "guide_link", label: "상품설명서 전달 확인", type: "checkbox", required: true },
      {
        id: "opened_saved",
        label: "고객 열람/저장 상태",
        type: "radio",
        required: true,
        options: ["열람/저장 완료", "미완료(완료 후 진행)"],
      },
    ],
    mustScroll: true,
    longConfirmText: [
      "전달만 하고 끝내지 말고, 고객이 실제로 문서를 열람했는지 확인합니다.",
      "링크 발송 후 저장 위치(문자/메일/앱)까지 안내하면 분쟁이 줄어듭니다.",
      "필수 문서 미전달 상태에서는 다음 단계로 진행하지 않습니다.",
    ],
  },
  {
    id: "s09",
    section: "docs",
    sectionLabel: "신용정보 동의",
    title: "계약체결을 위한 신용정보 동의서",
    subtitle: "조회/수집/이용/제공/보유기간 항목을 분리해 확인합니다.",
    fields: [
      { id: "credit_query", label: "신용정보 조회 동의", type: "checkbox", required: true },
      { id: "credit_collect_use", label: "신용정보 수집·이용 동의", type: "checkbox", required: true },
      { id: "credit_provide", label: "신용정보 제공 동의", type: "checkbox", required: true },
      { id: "credit_retention", label: "보유·이용기간 안내 확인", type: "checkbox", required: true },
      { id: "credit_consent_name", label: "동의자 성명", type: "text", required: true, placeholder: "홍길동" },
    ],
    mustScroll: true,
    longConfirmText: [
      "동의서 항목은 '무엇을/왜/어디까지' 활용하는지 고객이 이해해야 합니다.",
      "필수 동의와 선택 동의를 구분해 안내합니다.",
      "동의 철회/열람/정정 권리 안내를 누락하지 않습니다.",
      "고객이 충분히 이해한 후 체크하도록 진행합니다.",
    ],
  },
  {
    id: "s10",
    section: "payment",
    sectionLabel: "출금이체 신청서",
    title: "출금이체 신청 및 납입정보 확인",
    subtitle: "납입계좌/예금주/관계/자동이체 동의를 확인합니다.",
    fields: [
      { id: "bank_name", label: "금융기관명", type: "text", required: true, placeholder: "예: 국민은행" },
      { id: "account_masked", label: "계좌번호(마스킹)", type: "text", required: true, placeholder: "123-****-****" },
      { id: "depositor_name", label: "예금주 성명", type: "text", required: true, placeholder: "예: 홍길동" },
      {
        id: "depositor_relation",
        label: "예금주와 계약자 관계",
        type: "radio",
        required: true,
        options: ["본인", "배우자", "직계가족", "기타(증빙 필요)"],
      },
      { id: "debit_agree", label: "출금이체 약관 동의 완료", type: "checkbox", required: true },
    ],
  },
  {
    id: "s11",
    section: "payment",
    sectionLabel: "결제/출금 정보",
    title: "보험료 납입 방식 확인",
    subtitle: "납입 주기와 초회보험료 출금 시점을 최종 확인합니다.",
    fields: [
      { id: "payer_match", label: "납입자/계약자 관계 확인", type: "checkbox", required: true },
      {
        id: "pay_cycle",
        label: "납입 주기",
        type: "radio",
        required: true,
        options: ["월납", "분기납", "반기납", "연납"],
      },
      { id: "first_withdrawal", label: "초회보험료 출금 예정일 확인", type: "checkbox", required: true },
      { id: "payment_notice", label: "미납 시 효력 관련 안내", type: "checkbox", required: true },
    ],
  },
  {
    id: "s12",
    section: "sign",
    sectionLabel: "기타 사항/완전판매",
    title: "품질보증 및 완전판매 확인",
    subtitle: "안내장 수령, 약관 수령, 품질보증 확인을 체크합니다.",
    fields: [
      { id: "mobile_notice", label: "안내장 수령방법: 모바일", type: "checkbox", required: true },
      { id: "mobile_terms", label: "약관수령방법: 모바일약관", type: "checkbox", required: true },
      { id: "quality_yes", label: "품질보증 확인(예)", type: "checkbox", required: true },
      { id: "full_sale_1", label: "계약자 본인에게 자필서명/전자서명 받음", type: "checkbox", required: true },
      { id: "full_sale_2", label: "주요내용 설명 완료", type: "checkbox", required: true },
    ],
  },
  {
    id: "s13",
    section: "sign",
    sectionLabel: "계약 체결 동의",
    title: "계약 체결 전 최종 동의",
    subtitle: "설명 충분성/자발성/본인 진행 여부를 확인합니다.",
    fields: [
      { id: "enough_explain", label: "상품 설명을 충분히 들었음을 확인", type: "checkbox", required: true },
      { id: "self_intent", label: "본인 의사로 청약 진행함을 확인", type: "checkbox", required: true },
      { id: "recheck_all", label: "입력/고지/동의 항목 재확인", type: "checkbox", required: true },
    ],
  },
  {
    id: "s14",
    section: "sign",
    sectionLabel: "전자서명",
    title: "고객/모집인 서명란",
    subtitle: "전자서명과 모집인 확인서명을 순서대로 완료합니다.",
    fields: [
      { id: "signed_by_customer", label: "고객 본인이 직접 전자서명 완료", type: "checkbox", required: true },
      { id: "sign_name", label: "고객 서명자 성명", type: "text", required: true, placeholder: "홍길동" },
      { id: "planner_name", label: "모집인 성명", type: "text", required: true, placeholder: "설계사 이름" },
      {
        id: "sign_method",
        label: "인증 수단",
        type: "radio",
        required: true,
        options: ["휴대폰 인증", "공동/금융 인증서", "간편인증(카카오/패스 등)"],
      },
    ],
  },
  {
    id: "s15",
    section: "done",
    sectionLabel: "청약 접수 완료",
    title: "청약 접수 및 사후안내",
    subtitle: "완료 후 고객 안내(모니터링/증권전달/문의처)를 전달합니다.",
    fields: [
      { id: "monitoring_guide", label: "모니터링 콜 응대 기준 안내", type: "checkbox", required: true },
      { id: "policy_delivery", label: "증권/요약서 전달 방법 안내", type: "checkbox", required: true },
      { id: "contact_guide", label: "문의처/후속 일정 안내", type: "checkbox", required: true },
    ],
  },
  {
    id: "s16",
    section: "done",
    sectionLabel: "교육 피드백",
    title: "교육생 셀프 점검",
    subtitle: "실전 투입 전 누락 위험 항목을 마지막으로 점검합니다.",
    fields: [
      {
        id: "risk_point",
        label: "오늘 가장 헷갈렸던 구간",
        type: "radio",
        required: true,
        options: ["고지의무 질문", "서류 전달/저장", "동의/전자서명", "사후안내"],
      },
      { id: "improve_note", label: "다음 상담에서 보완할 점", type: "text", required: true, placeholder: "예: 거래목적/자금원천 설명을 더 정확히 안내" },
    ],
  },
  {
    id: "s17",
    section: "done",
    sectionLabel: "종료",
    title: "전자청약 시뮬레이션 종료",
    subtitle: "실제 계약에서는 회사/상품별 문구와 화면을 반드시 다시 확인하세요.",
    fields: [{ id: "finish_confirm", label: "교육용 절차를 모두 완료했습니다.", type: "checkbox", required: true }],
  },
];

const TOTAL_STEPS = STEPS.length;

export default function MobileEnroll77Simulator() {
  const [stepIndex, setStepIndex] = useState(0);
  const [jump, setJump] = useState("1");
  const [forms, setForms] = useState<Record<number, Record<string, string | boolean>>>({});
  const [scrolledDone, setScrolledDone] = useState<Record<number, boolean>>({});

  const model = useMemo(() => STEPS[stepIndex], [stepIndex]);
  const current = forms[stepIndex] ?? {};
  const progress = Math.round(((stepIndex + 1) / TOTAL_STEPS) * 100);
  const mustScroll = model.mustScroll === true;

  useEffect(() => {
    if (!mustScroll) {
      setScrolledDone((prev) => ({ ...prev, [stepIndex]: true }));
      return;
    }

    setTimeout(() => {
      const el = document.getElementById(`scroll-confirm-${stepIndex}`);
      if (!el) return;
      const noScrollNeeded = el.scrollHeight <= el.clientHeight + 1;
      if (noScrollNeeded) {
        setScrolledDone((prev) => ({ ...prev, [stepIndex]: true }));
      }
    }, 0);
  }, [stepIndex, mustScroll]);

  function setVal(id: string, value: string | boolean) {
    setForms((prev) => ({
      ...prev,
      [stepIndex]: {
        ...(prev[stepIndex] ?? {}),
        [id]: value,
      },
    }));
  }

  function isFieldValid(field: Field) {
    if (!field.required) return true;
    const v = current[field.id];
    if (field.type === "checkbox") return v === true;
    if (field.type === "radio") return typeof v === "string" && v.length > 0;
    return typeof v === "string" && v.trim().length > 0;
  }

  const fieldsValid = model.fields.every((f) => isFieldValid(f));
  const scrollValid = !mustScroll || scrolledDone[stepIndex] === true;
  const canNext = fieldsValid && scrollValid;
  const isLast = stepIndex === TOTAL_STEPS - 1;

  function blockReason() {
    if (!fieldsValid) return "필수 체크/선택/입력 항목을 완료해 주세요.";
    if (!scrollValid) return "확인 문구를 끝까지 읽어야 다음으로 이동됩니다.";
    return "";
  }

  function go(nextIndex: number) {
    const n = Math.max(0, Math.min(TOTAL_STEPS - 1, nextIndex));
    setStepIndex(n);
    setJump(String(n + 1));
  }

  function goPrev() {
    if (stepIndex <= 0) return;
    go(stepIndex - 1);
  }

  function goNext() {
    if (isLast || !canNext) return;
    go(stepIndex + 1);
  }

  return (
    <div className="w-full max-w-7xl mx-auto px-4 sm:px-6">
      <div className="mb-4 flex items-center justify-between">
        <div>
          <h2 className="text-lg sm:text-xl font-bold text-slate-900">모바일 전자청약 실전 시뮬레이터</h2>
          <p className="text-sm text-slate-600">보험사 공통 전자청약 흐름을 기준으로 재구성한 교육용 단계형 화면입니다.</p>
        </div>
        <div className="text-sm font-semibold text-slate-700">{progress}%</div>
      </div>

      <div className="grid grid-cols-1 xl:grid-cols-[1fr_420px] gap-4">
        <div className="rounded-2xl border border-slate-200 bg-white p-4">
          <div className="mb-3 flex items-center gap-2 flex-wrap">
            <input
              value={jump}
              onChange={(e) => setJump(e.target.value.replace(/\D/g, "").slice(0, 2))}
              className="w-16 rounded-lg border border-slate-300 px-2 py-1.5 text-sm"
              inputMode="numeric"
            />
            <button type="button" onClick={() => go((Number(jump || 1) || 1) - 1)} className="rounded-lg bg-sky-600 px-3 py-1.5 text-sm font-semibold text-white">
              이동
            </button>
            <div className="ml-auto text-sm font-medium text-slate-700">
              {stepIndex + 1} / {TOTAL_STEPS}
            </div>
          </div>

          <div className="rounded-[2rem] border-[10px] border-slate-900 bg-slate-900 p-1.5 shadow-xl mx-auto w-full max-w-[430px]">
            <div className="rounded-[1.5rem] bg-white overflow-hidden min-h-[710px] flex flex-col">
              <div className="h-6 bg-slate-900" />
              <div className="px-4 py-3 border-b border-slate-100">
                <div className="flex items-center justify-between">
                  <span className="text-xs text-slate-500">모바일 전자청약 · {model.sectionLabel}</span>
                  <span className="text-xs font-semibold text-sky-700 bg-sky-100 px-2 py-0.5 rounded-full">
                    {stepIndex + 1}/{TOTAL_STEPS}
                  </span>
                </div>
                <div className="mt-2 h-1.5 rounded-full bg-slate-100">
                  <div className="h-full rounded-full bg-sky-500 transition-all" style={{ width: `${progress}%` }} />
                </div>
              </div>

              <div className="p-4 flex-1 overflow-auto">
                <h3 className="text-base font-bold text-slate-900">{model.title}</h3>
                <p className="text-sm text-slate-600 mt-1 mb-3">{model.subtitle}</p>

                <div className="space-y-3">
                  {model.fields.map((f) => (
                    <div key={f.id}>
                      {f.type === "checkbox" && (
                        <label className="flex items-start gap-2 rounded-lg border border-slate-200 p-3">
                          <input type="checkbox" checked={current[f.id] === true} onChange={(e) => setVal(f.id, e.target.checked)} className="mt-0.5" />
                          <span className="text-sm text-slate-700">{f.label}</span>
                        </label>
                      )}
                      {f.type === "radio" && (
                        <div className="rounded-lg border border-slate-200 p-3">
                          <p className="text-sm text-slate-700 mb-2">{f.label}</p>
                          <div className="space-y-1.5">
                            {(f.options ?? []).map((opt) => (
                              <label key={opt} className="flex items-center gap-2 text-sm text-slate-700">
                                <input type="radio" name={`s-${stepIndex}-${f.id}`} checked={current[f.id] === opt} onChange={() => setVal(f.id, opt)} />
                                <span>{opt}</span>
                              </label>
                            ))}
                          </div>
                        </div>
                      )}
                      {f.type === "text" && (
                        <div className="rounded-lg border border-slate-200 p-3">
                          <p className="text-sm text-slate-700 mb-2">{f.label}</p>
                          <input
                            value={String(current[f.id] ?? "")}
                            onChange={(e) => setVal(f.id, e.target.value)}
                            placeholder={f.placeholder ?? ""}
                            className="w-full rounded-lg border border-slate-300 px-3 py-2 text-sm"
                          />
                        </div>
                      )}
                    </div>
                  ))}
                </div>

                {mustScroll && model.longConfirmText && (
                  <div className="mt-4">
                    <p className="text-xs text-rose-600 mb-2">* 아래 확인 문구를 끝까지 읽어야 다음 이동 가능</p>
                    <div
                      className="max-h-36 overflow-y-auto rounded-lg border border-slate-200 bg-slate-50 p-3 text-sm text-slate-600 space-y-3"
                      id={`scroll-confirm-${stepIndex}`}
                      onScroll={(e) => {
                        const el = e.currentTarget;
                        const noNeed = el.scrollHeight <= el.clientHeight + 1;
                        const atBottom = el.scrollTop + el.clientHeight >= el.scrollHeight - 8;
                        if (noNeed || atBottom) {
                          setScrolledDone((prev) => ({ ...prev, [stepIndex]: true }));
                        }
                      }}
                    >
                      {model.longConfirmText.map((line, i) => (
                        <p key={`${model.id}-line-${i}`} className={i === model.longConfirmText!.length - 1 ? "font-semibold text-sky-700 mt-6" : i > 0 ? "mt-6" : ""}>
                          {line}
                        </p>
                      ))}
                    </div>
                  </div>
                )}

                {!canNext && !isLast && <p className="mt-3 text-xs text-rose-600">{blockReason()}</p>}

                <div className="mt-4 flex items-center gap-2">
                  <button
                    type="button"
                    onClick={goPrev}
                    disabled={stepIndex === 0}
                    className="w-1/3 inline-flex items-center justify-center gap-1 rounded-lg border border-slate-300 px-3 py-2 text-sm text-slate-700 disabled:opacity-40"
                  >
                    <ChevronLeft className="w-4 h-4" />
                    이전
                  </button>
                  <button
                    type="button"
                    onClick={goNext}
                    disabled={isLast || !canNext}
                    className="w-2/3 inline-flex items-center justify-center gap-1 rounded-lg bg-sky-600 px-3 py-2 text-sm font-semibold text-white disabled:opacity-40"
                  >
                    {isLast ? "완료됨" : "다음 단계"}
                    {!isLast && <ChevronRight className="w-4 h-4" />}
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>

        <aside className="rounded-2xl border border-slate-200 bg-white p-4">
          <div className="text-xs font-semibold text-sky-700 mb-1">Current Step</div>
          <h4 className="text-base font-bold text-slate-900">{model.title}</h4>
          <p className="text-sm text-slate-600 mt-1">{model.subtitle}</p>

          <div className="mt-4 rounded-lg border border-slate-200 bg-slate-50 p-3 text-sm text-slate-700">
            <p className="font-semibold mb-1">진행 기준</p>
            <ul className="space-y-1">
              <li>• 필수 체크/선택/입력 완료 시 다음 이동 가능</li>
              <li>• 고지의무/서류전달 구간은 스크롤 확인 필요</li>
              <li>• 점프 이동은 교육 운영 편의를 위해 허용</li>
            </ul>
          </div>

          <div className="mt-3 rounded-lg border border-sky-200 bg-sky-50 p-3 text-xs text-sky-900">
            <p className="font-semibold mb-1">구성 근거(요약)</p>
            <ul className="space-y-1">
              <li>• 보험사 전자청약 공통 단계: 계약확인 → 고지의무 → 전자서명 → 완료</li>
              <li>• 고지의무는 청약서 질문 기준의 사실 입력 원칙</li>
              <li>• 서류 전달/열람 확인과 사후안내(모니터링/증권전달) 필수</li>
            </ul>
          </div>
        </aside>
      </div>
    </div>
  );
}

