"use client";

import { motion } from "framer-motion";
import { Check } from "lucide-react";
import s from "./home.module.css";
import { EASE } from "./Screens";

// 숫자 없이, 설계사가 실제로 겪는 장면만. (Codex 「AI 티」 검수 제안 문구, 2026-10-07)
// 10/9 사장님 「보장분석도 있고 더 많은 내용이 있는데 너무 간편하다 — 더 자세하게, 알아보기 쉽게」 →
//   세 줄 → 아래 도구 소개와 같은 세 단계·같은 색으로 묶은 열 줄. 줄마다 그 일을 하는 실제 도구 이름을 붙인다.
//   「보메이트와 함께」 문장은 Tools.tsx 의 도구 설명(BRIEF 3장 실제 도구)에서만 가져온다 — 없는 기능을 쓰지 않는다.
const STAGES = [
  {
    name: "자료 모으기",
    ink: "var(--sa-brand)",
    soft: "var(--sa-brand-soft)",
    rows: [
      {
        k: "고객 자료",
        tools: ["통합조회"],
        before: "진료 기록, 검진 결과, 병원비 영수증을 고객에게 하나씩 부탁하고 도착할 때까지 기다립니다.",
        after: "링크 하나를 보내면 고객 인증만으로 진료내역, 건강검진, 의료비 기록이 함께 들어옵니다.",
      },
      {
        k: "가입한 보험",
        tools: ["보험계약 조회"],
        before: "증권을 모아 달라고 부탁하고, 빠진 증권이 있는지는 모른 채 상담에 들어갑니다.",
        after: "고객 인증으로 가입한 보험 계약과 보장 내용을 불러옵니다.",
      },
      {
        k: "검사 결과",
        tools: ["건강검진 리포트", "검사지 사진 분석"],
        before: "검진표와 검사지를 받아도 수치를 하나하나 찾아 읽어야 합니다.",
        after: "공단 검진 결과는 고객이 읽기 쉬운 리포트로, 검사지는 사진만 올리면 수치를 정리해 줍니다.",
      },
      {
        k: "알릴 진료(고지)",
        tools: ["진료내역 조회"],
        before: "지난 병원 기록을 고객의 기억에 기대어 확인합니다.",
        after: "최근 진료 기록을 정리해, 가입 전에 알려야 할 진료를 먼저 짚어 봅니다.",
      },
    ],
  },
  {
    name: "보험금 찾기",
    ink: "var(--sa-amber-ink)",
    soft: "var(--sa-amber-soft)",
    rows: [
      {
        k: "놓친 보험금",
        tools: ["의료비·실손 미청구", "지급내역 대조"],
        before: "고객이 먼저 말하지 않으면 받을 수 있었던 보험금을 놓치기 쉽습니다.",
        after: "의료비 기록과 실손 지급내역을 한 건씩 맞대어, 아직 청구하지 않은 진료를 찾습니다.",
      },
      {
        k: "청구 돕기",
        tools: ["보험금 청구하기", "청구 사례집"],
        before: "보험사마다 다른 청구서 양식을 찾아 하나씩 채웁니다.",
        after: "보험사별 청구서 양식을 채워 고객의 청구를 돕고, 질병·상황별 청구 사례도 찾아봅니다.",
      },
    ],
  },
  {
    name: "상담 준비",
    ink: "var(--sa-violet)",
    soft: "var(--sa-violet-soft)",
    rows: [
      {
        k: "보장 분석",
        tools: ["보장 분석"],
        before: "증권을 한 장씩 펼쳐 놓고 가입한 보장을 손으로 정리합니다.",
        after: "보장분석 PDF를 올리면 가입한 보장을 항목별로 모아 한눈에 정리합니다.",
      },
      {
        k: "보장 비교",
        tools: ["보장 비교"],
        before: "지금 보장과 바꾼 뒤를 따로 계산해 말로 설명합니다.",
        after: "지금 보장과 바꾼 뒤를 나란히 놓고, 상담 멘트까지 정리합니다.",
      },
      {
        k: "약관 · 궁금한 점",
        tools: ["약관실", "질문방"],
        before: "약관을 뒤지거나 주변에 물어보며 답을 찾습니다.",
        after: "약관실에서 필요한 조항을 찾고, 질문방에서 근거 조항과 함께 답을 찾습니다.",
      },
      {
        k: "상담 자리",
        tools: ["통합 리포트", "세일즈 코칭"],
        before: "자료를 찾을 때마다 대화가 끊깁니다.",
        after: "진료·검진·실손·보장을 리포트 한 권으로 묶어 펴 놓고, 꺼낼 이야기와 순서도 미리 정리합니다.",
      },
    ],
  },
] as const;

export function BeforeAfter() {
  return (
    <section className="relative border-t border-[var(--sa-line)] bg-[var(--sa-paper)]">
      <div className="mx-auto max-w-[1280px] px-4 py-20 sm:px-6 lg:px-10 lg:py-28">
        <h2 className={`${s.serif} max-w-[16em] text-[clamp(2rem,4.4vw,3.5rem)] font-bold leading-[1.2]`}>
          같은 상담 준비,
          <br />
          이렇게 달라집니다
        </h2>
        <p className="mt-5 max-w-[38em] text-[clamp(1rem,1.3vw,1.125rem)] leading-[1.65] text-[var(--sa-ink2)]">
          고객 자료를 모으는 일부터 상담 자리까지, 설계사가 혼자 하던 일을 세 단계로 나눠 비교했습니다. 이름표는 그 일을 맡는 보메이트 도구입니다.
        </p>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.1 }}
          transition={{ duration: 0.7, ease: EASE }}
          className="mt-12"
        >
          {/* 열 제목 — PC 는 위에 한 번, 휴대폰은 각 칸 앞에 작게 */}
          <div className="hidden grid-cols-12 gap-6 border-b-2 border-[var(--sa-ink)] pb-3 text-[14px] font-bold lg:grid">
            <span className="col-span-3" />
            <span className="col-span-4 text-[var(--sa-dim)]">혼자 준비할 때</span>
            <span className="col-span-5 flex items-center gap-2 text-[var(--sa-brand)]">
              <span className="grid h-[20px] w-[20px] place-items-center rounded-full bg-[var(--sa-brand)] text-[var(--sa-paper)]">
                <Check size={13} strokeWidth={3} />
              </span>
              보메이트와 함께
            </span>
          </div>

          {STAGES.map((st, si) => (
            <div key={st.name} className={si === 0 ? "mt-6 lg:mt-8" : "mt-10 lg:mt-12"}>
              {/* 단계 머리 — 아래 도구 소개의 묶음과 같은 색 */}
              <p className="flex items-center gap-2.5">
                <span
                  className="grid h-7 w-7 place-items-center rounded-full text-[14px] font-bold"
                  style={{ background: st.ink, color: "var(--sa-paper)" }}
                >
                  {si + 1}
                </span>
                <span className={`${s.serif} text-[22px] font-bold`} style={{ color: st.ink }}>
                  {st.name}
                </span>
              </p>
              <dl className="mt-2">
                {st.rows.map((r) => (
                  <div
                    key={r.k}
                    className="grid grid-cols-1 gap-2 border-b border-[var(--sa-line)] py-5 lg:grid-cols-12 lg:gap-6 lg:py-6"
                  >
                    <dt className="lg:col-span-3">
                      <span className="block text-[16px] font-bold text-[var(--sa-ink)]">{r.k}</span>
                      <span className="mt-1.5 flex flex-wrap gap-1.5">
                        {r.tools.map((t) => (
                          <span
                            key={t}
                            className="rounded-full px-2.5 py-0.5 text-[12.5px] font-semibold"
                            style={{ background: st.soft, color: st.ink }}
                          >
                            {t}
                          </span>
                        ))}
                      </span>
                    </dt>
                    <dd className="text-[15.5px] leading-[1.6] text-[var(--sa-dim)] lg:col-span-4">
                      <span className="mr-2 text-[13.5px] font-semibold lg:hidden">혼자 준비할 때</span>
                      {r.before}
                    </dd>
                    <dd className="text-[16.5px] font-semibold leading-[1.55] text-[var(--sa-ink)] lg:col-span-5">
                      <span className="mr-2 text-[13.5px] font-bold text-[var(--sa-brand)] lg:hidden">보메이트와 함께</span>
                      {r.after}
                    </dd>
                  </div>
                ))}
              </dl>
            </div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}
