"use client";

import { useState } from "react";
import { BtnV2, Eyebrow, GridOverlay, Icon, Mono } from "./Core";

type Day = {
  d: number;
  title: string;
  sub: string;
  h: number;
  parts: { title: string; desc: string }[];
  numbers: { n: string; l: string }[];
  tags: string[];
  outcome: string;
};

const DAYS: Day[] = [
  {
    d: 1,
    title: "보험영업 전체 프로세스",
    sub: "+ 필수 용어 완전 정복",
    h: 2,
    parts: [
      { title: "1부 · 영업 프로세스", desc: "DB · 온라인 · 개척 · 소개 4채널 + 영업 사이클 8단계" },
      { title: "2부 · 필수 용어", desc: "계약자·피보험자·수익자 / 고지의무 / 주계약·특약 / 면책·감액·갱신" },
    ],
    numbers: [
      { n: "10분", l: "DB 골든타임" },
      { n: "8단계", l: "영업 사이클" },
      { n: "50+", l: "필수 용어" },
    ],
    tags: ["DB영업 4채널", "8단계 사이클", "용어 50+", "카페 운영 3단계"],
    outcome: "영업의 큰 그림을 말로 그릴 수 있다",
  },
  {
    d: 2,
    title: "실손보험 완전 정복",
    sub: "세대별 변천 + 4세대 구조",
    h: 2,
    parts: [
      { title: "1부 · 세대 변천사", desc: "1세대 100% → 4세대 급여/비급여 분리 / 통원 공제 / 손해율 연동 할증" },
      { title: "2부 · 핵심 5가지", desc: "건보 vs 실손 / 1인 1개 / 갱신형 / 세대 전환 / 비급여 관리" },
    ],
    numbers: [
      { n: "20·30%", l: "자기부담금" },
      { n: "3대", l: "비급여 특약" },
      { n: "1인 1개", l: "중복 불가" },
    ],
    tags: ["1~4세대 변천", "자기부담금 구조", "3대 비급여 한도", "1인 1개 원칙"],
    outcome: "실손 세대별 차이를 설명할 수 있다",
  },
  {
    d: 3,
    title: "암 · 뇌 · 심장",
    sub: "3대 질병 심층 분석",
    h: 2,
    parts: [
      { title: "1부 · 암보험 5레이어", desc: "분류·트리거·기간·재발·역할 / 일반 vs 유사·소액 / 표적·면역항암" },
      { title: "2부 · 뇌·심장 범위", desc: "뇌출혈→뇌졸중→뇌혈관 / 심근경색→허혈성→심혈관 피라미드" },
    ],
    numbers: [
      { n: "90일", l: "암 면책" },
      { n: "5,000만", l: "진단금 표준" },
      { n: "회색 4", l: "TIA·동맥류·부정맥·심부전" },
    ],
    tags: ["5레이어 지도", "유사·소액암", "범위 피라미드", "진단금 vs 치료비"],
    outcome: "3대 질병을 범위 구조로 이해하고 설명",
  },
  {
    d: 4,
    title: "수술비와 치료비",
    sub: "완전 이해",
    h: 2,
    parts: [
      { title: "1부 · 수술비 2종", desc: "분류형(1~5종) vs 정액형 / 수술·시술·치료·검사 구분 / 사고 Top 5" },
      { title: "2부 · 치료비 5종", desc: "입원일당 / 통원 / 처방약 / 특정치료(항암·방사선) / 재활" },
    ],
    numbers: [
      { n: "1~5종", l: "수술 분류" },
      { n: "Top 5", l: "수술비 사고" },
      { n: "4단계", l: "확인 루틴" },
    ],
    tags: ["분류형 vs 정액형", "수술·시술·치료·검사", "입원일당 면책", "실손 중복 관계"],
    outcome: "행위·과정 축으로 보장을 해석",
  },
  {
    d: 5,
    title: "운전자·상해·치아보험",
    sub: "특화 3종 마스터",
    h: 2,
    parts: [
      { title: "1부 · 운전자·상해", desc: "교통사고처리 · 변호사선임 · 벌금 / 급격·우연·외래 3요건 / 후유장해" },
      { title: "2부 · 치아보험", desc: "보존·보철 한도 / 면책·감액 구조 / 대기기간 / 틀니·임플란트" },
    ],
    numbers: [
      { n: "12대", l: "중과실" },
      { n: "3,000만", l: "형사합의금" },
      { n: "3~100%", l: "후유장해 지급률" },
    ],
    tags: ["12대 중과실", "상해 3요건", "후유장해 지급률", "치아 면책·감액"],
    outcome: "특화 3종을 약관 기준으로 안내",
  },
  {
    d: 6,
    title: "TA 전화 대본",
    sub: "+ 거절 대응 훈련",
    h: 2,
    parts: [
      { title: "1부 · 90초 TA 대본", desc: "오프닝 · 목적 · A/B 질문 · 클로징 4단계 / 거절 12유형 대응" },
      { title: "2부 · 실전 RP", desc: "시나리오 5개 / 속도·톤 교정 / 녹음 셀프 진단 / 팔로업 5회 원칙" },
    ],
    numbers: [
      { n: "90초", l: "TA 표준" },
      { n: "12유형", l: "거절 패턴" },
      { n: "5회", l: "팔로업 원칙" },
    ],
    tags: ["90초 프로세스", "A/B 질문", "거절 12유형", "팔로업 5회"],
    outcome: "미팅 약속을 전화 한 통으로 잠근다",
  },
  {
    d: 7,
    title: "고객 RP 실전 훈련",
    sub: "1차 미팅",
    h: 2,
    parts: [
      { title: "1부 · 50분 플로우", desc: "아이스브레이킹 · 공감 · 니즈 10문 · 건강고지 예비확인 · 다음 일정" },
      { title: "2부 · 실전 RP", desc: "고객 페르소나 3개 / 트레이너 1:1 피드백 / 태도·경청 평가" },
    ],
    numbers: [
      { n: "50분", l: "미팅 표준" },
      { n: "10문", l: "니즈 질문" },
      { n: "1:1", l: "트레이너 피드백" },
    ],
    tags: ["아이스브레이킹", "니즈 10문", "경청 태도", "고지 예비확인"],
    outcome: "1차 미팅 50분을 막힘 없이 리드",
  },
  {
    d: 8,
    title: "2차 미팅",
    sub: "설계·비교·마무리",
    h: 2,
    parts: [
      { title: "1부 · 설계 제안", desc: "설계서 순서 5단계 / 금액·보장·기간 비교 3축 / 시각 자료" },
      { title: "2부 · 클로징", desc: "클로징 4패턴 / 결정 촉진 / 가족 반대 · 가격 반론 대응" },
    ],
    numbers: [
      { n: "5단계", l: "설계서 순서" },
      { n: "3축", l: "비교 기준" },
      { n: "4패턴", l: "클로징 기법" },
    ],
    tags: ["설계서 5단계", "비교 3축", "클로징 4패턴", "가족 반대 대응"],
    outcome: "압박 없이 결정을 돕는 클로저",
  },
  {
    d: 9,
    title: "모바일 청약·고지의무",
    sub: "증권 전달",
    h: 2,
    parts: [
      { title: "1부 · 모바일 청약", desc: "청약 9단계 / 전자서명 / 고지 6문 확인 / 자동 알림 발송" },
      { title: "2부 · 유지 관리", desc: "증권 전달 스크립트 / 소개 요청 / 갱신·AS 루틴 / 유지율 관리" },
    ],
    numbers: [
      { n: "9단계", l: "청약 프로세스" },
      { n: "6문", l: "고지 질문" },
      { n: "13·25회", l: "유지율 기준" },
    ],
    tags: ["청약 9단계", "고지 6문", "증권 전달", "소개 요청"],
    outcome: "계약 체결부터 관계 유지까지",
  },
  {
    d: 10,
    title: "종합 실전 모의 훈련",
    sub: "& 최종 점검",
    h: 8,
    parts: [
      { title: "AM · TA→1차 통합", desc: "전화 → 미팅 약속 → 1차 RP 통합 시나리오 / 4시간 집중" },
      { title: "PM · 2차→청약 통합", desc: "2차 제안 → 클로징 → 모바일 청약 / 개별 피드백 · 수료 판정" },
    ],
    numbers: [
      { n: "8시간", l: "종일 RP" },
      { n: "12항목", l: "체크리스트" },
      { n: "Go / No-Go", l: "현장 투입 판정" },
    ],
    tags: ["TA→청약 통합", "개인 피드백", "체크리스트 12", "수료 인증"],
    outcome: "현장 투입 준비 완료",
  },
];

const STATS = [
  { k: "10", l: "일", sub: "완주 프로그램" },
  { k: "28h", l: "커리큘럼", sub: "1:1 멘토링 포함" },
  { k: "74p", l: "교재", sub: "실전 스크립트 수록" },
  { k: "90%", l: "수료율", sub: "2025 신입 기준" },
];

export default function Training() {
  const [active, setActive] = useState(0);
  const cur = DAYS[active];

  return (
    <section
      id="training"
      className="relative py-28 md:py-40 border-t border-[color:var(--line)] bg-[color:var(--bg-1)]"
      style={{
        ["--accent" as string]: "#d8a040",
        ["--accent-ink" as string]: "#ffffff",
        ["--accent-glow" as string]: "rgba(216,160,64,0.3)",
        ["--bg-1" as string]: "#FAF6E8",
        ["--bg-2" as string]: "#F2ECD5",
      } as React.CSSProperties}
    >
      <GridOverlay opacity={0.04} />
      <div className="relative mx-auto max-w-[1400px] px-6">
        <div className="grid grid-cols-1 md:grid-cols-12 gap-6 md:gap-12 mb-16 md:mb-24">
          <div className="md:col-span-5">
            <Eyebrow>06 — Training Academy</Eyebrow>
            <h2
              className="mt-8 text-[40px] md:text-[64px] leading-[1.02] tracking-[-0.03em] font-semibold text-[color:var(--ink)]"
              style={{ textWrap: "balance" } as React.CSSProperties}
            >
              신입도 <span className="font-serif-italic font-light text-[color:var(--accent)]">10일이면</span>
              <br />
              현장에서{" "}
              <span className="font-serif-italic font-light">말문이 트입니다</span>.
            </h2>
          </div>
          <div className="md:col-span-6 md:col-start-7 flex items-end">
            <div>
              <p className="text-[17px] md:text-[19px] leading-[1.55] text-[color:var(--ink-2)]">
                감으로 배우던 시대는 끝났습니다. 프라임에셋 아카데미는
                <strong className="text-[color:var(--ink)]">
                  {" "}
                  보험영업 프로세스 · 상품지식 · TA · RP · 청약 실무
                </strong>
                를 10일 커리큘럼으로 구조화했습니다. 교재 74쪽, 실전 스크립트 포함.
              </p>
              <div className="mt-6 flex flex-wrap gap-3">
                <Mono className="inline-flex items-center gap-2 text-[12px] px-3 py-1.5 rounded-full border text-[color:var(--ink-2)] border-[color:var(--line)]">
                  <span className="w-1.5 h-1.5 rounded-full bg-[color:var(--accent)]" />매월 1일/15일
                  개강
                </Mono>
                <Mono className="inline-flex items-center gap-2 text-[12px] px-3 py-1.5 rounded-full border text-[color:var(--ink-2)] border-[color:var(--line)]">
                  수료 즉시 DB 배정
                </Mono>
              </div>
            </div>
          </div>
        </div>

        <div className="grid grid-cols-2 md:grid-cols-4 border-t border-b border-[color:var(--line)]">
          {STATS.map((s, i) => (
            <div
              key={i}
              className={`py-8 px-4 md:px-6 ${i < 3 ? "md:border-r" : ""} ${
                i < 2 ? "border-r md:border-r border-b md:border-b-0" : ""
              } ${i === 2 ? "md:border-r" : ""} border-[color:var(--line)]`}
            >
              <div className="flex items-baseline gap-2">
                <div className="text-[40px] md:text-[56px] leading-none tracking-[-0.03em] font-semibold text-[color:var(--ink)]">
                  {s.k}
                </div>
                <div className="text-[14px] text-[color:var(--dim)]">{s.l}</div>
              </div>
              <div className="mt-2 text-[13px] text-[color:var(--ink-2)]">{s.sub}</div>
            </div>
          ))}
        </div>

        {/* Day 1 Preview — 보험영업 전체 프로세스 맛보기 */}
        <div className="mt-20 md:mt-28">
          <div className="flex items-end justify-between mb-6 pb-4 border-b border-[color:var(--line)]">
            <div>
              <Mono className="text-[11px] tracking-[0.16em] text-[color:var(--accent)]">
                PREVIEW · DAY 01 · SAMPLE
              </Mono>
              <h3 className="mt-2 text-[22px] md:text-[26px] font-medium tracking-tight text-[color:var(--ink)]">
                1일차 — 보험영업 전체 프로세스 맛보기
              </h3>
            </div>
            <Mono className="text-[10px] text-[color:var(--dim)] hidden md:block">
              교재 p.1~7 / 1부 1시간
            </Mono>
          </div>

          <div className="card-v2 overflow-hidden">
            {/* Book-style header */}
            <div className="flex items-center gap-2 px-5 py-3 border-b border-[color:var(--line)] bg-[color:var(--bg-1)]">
              <div className="flex gap-1.5">
                <span className="w-2.5 h-2.5 rounded-full bg-[#FF5F57]" />
                <span className="w-2.5 h-2.5 rounded-full bg-[#FEBC2E]" />
                <span className="w-2.5 h-2.5 rounded-full bg-[#28C840]" />
              </div>
              <Mono className="ml-3 text-[11px] text-[color:var(--dim)]">
                신입 10일 교육프로그램 · day-01.md
              </Mono>
              <Mono className="ml-auto text-[10px] text-[color:var(--dim)]">
                2시간 · 이론 + 실습
              </Mono>
            </div>

            <div className="p-6 md:p-10 space-y-10">
              {/* Eight-stage sales cycle */}
              <div>
                <Mono className="text-[10px] tracking-[0.16em] text-[color:var(--dim)]">
                  영업 사이클 8단계
                </Mono>
                <div className="mt-5 grid grid-cols-2 md:grid-cols-4 gap-px rounded-xl overflow-hidden" style={{ background: "var(--line)" }}>
                  {[
                    { n: "01", t: "고객 발굴", d: "DB · 블로그 · 개척 · 소개" },
                    { n: "02", t: "TA 접촉", d: "전화 첫 통화 · 미팅 약속" },
                    { n: "03", t: "1차 미팅", d: "니즈 파악 · 신뢰 구축" },
                    { n: "04", t: "설계 작성", d: "맞춤 상품 · 비교 자료" },
                    { n: "05", t: "2차 미팅", d: "설계 설명 · 클로징" },
                    { n: "06", t: "청약서", d: "모바일 청약 · 고지의무" },
                    { n: "07", t: "증권 전달", d: "감사 인사 · 관계 유지" },
                    { n: "08", t: "유지 관리", d: "갱신 · 추가 니즈 · 소개" },
                  ].map((s, i) => (
                    <div
                      key={s.n}
                      className="bg-[color:var(--bg-2)] p-4 md:p-5 flex flex-col gap-2"
                    >
                      <div className="flex items-center gap-2">
                        <Mono className="text-[11px] text-[color:var(--accent)] font-medium">
                          {s.n}
                        </Mono>
                        {i < 7 && (
                          <span className="text-[color:var(--dim-2)] text-[11px]">→</span>
                        )}
                      </div>
                      <div className="text-[14px] font-medium text-[color:var(--ink)]">
                        {s.t}
                      </div>
                      <div className="text-[11px] text-[color:var(--dim)] leading-[1.4]">
                        {s.d}
                      </div>
                    </div>
                  ))}
                </div>
                <p className="mt-4 text-[11px] text-[color:var(--dim)] leading-[1.6]">
                  TIP. 계약이 끝난 고객이 가장 좋은 소개 채널입니다. 증권 전달 시 &ldquo;좋은 분 한 분만 소개해주세요&rdquo;라고 자연스럽게 요청하세요.
                </p>
              </div>

              {/* DB quality grades */}
              <div className="grid grid-cols-1 md:grid-cols-[2fr_3fr] gap-6 pt-8 border-t border-[color:var(--line)]">
                <div>
                  <Mono className="text-[10px] tracking-[0.16em] text-[color:var(--dim)]">
                    DB 품질 3등급 (골든타임 10분)
                  </Mono>
                  <p className="mt-3 text-[13px] leading-[1.7] text-[color:var(--ink-2)]">
                    DB 수신 후 <strong className="text-[color:var(--ink)]">10분 이내 연락 필수</strong>. 30분 초과 시 성약률이 70% 떨어집니다.
                  </p>
                </div>
                <div className="space-y-2">
                  {[
                    { g: "HOT", c: "당일 신청", pct: 92, color: "var(--accent)" },
                    { g: "WARM", c: "3일 이내", pct: 58, color: "#FBBF24" },
                    { g: "COLD", c: "1주일 이상", pct: 22, color: "var(--dim-2)" },
                  ].map((r) => (
                    <div
                      key={r.g}
                      className="flex items-center gap-4 card-v2-flat px-4 py-3"
                    >
                      <Mono
                        className="text-[12px] font-semibold w-16"
                        style={{ color: r.color }}
                      >
                        {r.g}
                      </Mono>
                      <div className="text-[12px] text-[color:var(--ink-2)] w-24">{r.c}</div>
                      <div className="flex-1 h-1.5 rounded-full bg-[color:var(--line)] overflow-hidden">
                        <div
                          className="h-full transition-all duration-700"
                          style={{ width: `${r.pct}%`, background: r.color }}
                        />
                      </div>
                      <Mono className="text-[11px] text-[color:var(--dim)] w-12 text-right">
                        {r.pct}%
                      </Mono>
                    </div>
                  ))}
                </div>
              </div>

              {/* Callout: full curriculum tease */}
              <div className="flex items-center justify-between gap-4 pt-6 border-t border-[color:var(--line)]">
                <p className="text-[12px] text-[color:var(--dim)] leading-[1.6] max-w-[480px]">
                  * 교재 74쪽 중 1부 일부 샘플입니다. 실제 교육에서는 DB 5가지 생성 경로, 블로그/카페 운영 3단계, 개척 5유형, 필수 용어 50+개까지 전부 다룹니다.
                </p>
                <Mono className="text-[11px] tracking-[0.16em] text-[color:var(--accent)] whitespace-nowrap">
                  74p · 전체 커리큘럼 →
                </Mono>
              </div>
            </div>
          </div>
        </div>

        <div className="mt-16 md:mt-24 grid grid-cols-1 md:grid-cols-12 gap-8 md:gap-12">
          <div className="md:col-span-5">
            <Mono className="text-[11px] tracking-[0.16em] text-[color:var(--dim)]">
              CURRICULUM — DAY 01 → 10
            </Mono>
            <div className="mt-5 relative">
              <div className="absolute left-[22px] top-2 bottom-2 w-px bg-[color:var(--line)]" />
              <div className="space-y-1">
                {DAYS.map((x, i) => {
                  const on = i === active;
                  return (
                    <button
                      key={i}
                      onClick={() => setActive(i)}
                      className="group w-full text-left flex items-start gap-4 py-3 pr-3 relative cursor-pointer"
                    >
                      <div
                        className="relative z-10 shrink-0 w-11 h-11 rounded-full flex items-center justify-center border-2 transition-all"
                        style={{
                          background: on ? "var(--accent)" : "var(--bg-1)",
                          borderColor: on ? "var(--accent)" : "var(--line)",
                          color: on ? "var(--accent-ink)" : "var(--dim)",
                          boxShadow: on
                            ? `0 0 0 6px color-mix(in srgb, var(--accent) 15%, transparent)`
                            : "none",
                        }}
                      >
                        <Mono className="text-[12px] font-semibold">
                          {String(x.d).padStart(2, "0")}
                        </Mono>
                      </div>
                      <div className="flex-1 pt-1.5">
                        <div className="flex items-center gap-2">
                          <div
                            className="text-[15px] md:text-[16px] font-medium transition-colors"
                            style={{ color: on ? "var(--ink)" : "var(--ink-2)" }}
                          >
                            {x.title}
                          </div>
                          <Mono className="text-[10px] px-1.5 py-0.5 rounded text-[color:var(--dim)] bg-[color:var(--bg-2)]">
                            {x.h}h
                          </Mono>
                        </div>
                        <div className="text-[13px] mt-0.5 text-[color:var(--dim)]">{x.sub}</div>
                      </div>
                      {on && (
                        <div className="pt-4 text-[color:var(--accent)]">
                          <Icon name="arrowRight" size={16} stroke={2} />
                        </div>
                      )}
                    </button>
                  );
                })}
              </div>
            </div>
          </div>

          <div className="md:col-span-7">
            <div className="sticky top-24 card-v2 p-8 md:p-10">
              <div className="flex items-start justify-between gap-4">
                <div>
                  <Mono className="text-[11px] tracking-[0.16em] text-[color:var(--dim)]">
                    DAY {String(cur.d).padStart(2, "0")} / 10 · {cur.h}시간
                  </Mono>
                  <h3 className="mt-3 text-[28px] md:text-[36px] leading-[1.1] tracking-[-0.02em] font-medium text-[color:var(--ink)]">
                    {cur.title}
                  </h3>
                  <p className="mt-2 text-[16px] text-[color:var(--ink-2)]">{cur.sub}</p>
                </div>
                <div className="shrink-0 w-14 h-14 rounded-full flex items-center justify-center bg-[color:var(--accent)] text-[color:var(--accent-ink)]">
                  <Mono className="text-[18px] font-semibold">
                    {String(cur.d).padStart(2, "0")}
                  </Mono>
                </div>
              </div>

              <div className="mt-8 card-v2-flat overflow-hidden">
                <div className="flex items-center gap-2 px-4 py-3 border-b border-[color:var(--line)]">
                  <div className="flex gap-1.5">
                    <span className="w-2.5 h-2.5 rounded-full bg-[#FF5F57]" />
                    <span className="w-2.5 h-2.5 rounded-full bg-[#FEBC2E]" />
                    <span className="w-2.5 h-2.5 rounded-full bg-[#28C840]" />
                  </div>
                  <Mono className="ml-3 text-[11px] text-[color:var(--dim)]">
                    curriculum / day-{String(cur.d).padStart(2, "0")}.md
                  </Mono>
                  <Mono className="ml-auto text-[10px] text-[color:var(--dim)]">
                    {cur.h}시간
                  </Mono>
                </div>
                <div className="p-5 md:p-6">
                  <Mono className="text-[10px] tracking-[0.16em] text-[color:var(--dim)]">
                    LEARNING OUTCOME
                  </Mono>
                  <p className="mt-2 text-[17px] md:text-[19px] leading-[1.4] font-medium text-[color:var(--ink)]">
                    &ldquo;{cur.outcome}&rdquo;
                  </p>

                  {/* Core content — 1부/2부 breakdown */}
                  <div className="mt-5 pt-5 border-t border-[color:var(--line)]">
                    <Mono className="text-[10px] tracking-[0.16em] text-[color:var(--dim)]">
                      CORE CONTENT
                    </Mono>
                    <div className="mt-3 space-y-2">
                      {cur.parts.map((p, i) => (
                        <div
                          key={i}
                          className="card-v2-flat px-3.5 py-2.5 flex items-start gap-3"
                        >
                          <span className="shrink-0 inline-flex items-center justify-center w-5 h-5 rounded-md bg-[color:var(--accent)] text-[color:var(--accent-ink)] text-[10px] font-bold tabular-nums mt-0.5">
                            {i + 1}
                          </span>
                          <div className="min-w-0 flex-1">
                            <div className="text-[13px] font-semibold text-[color:var(--ink)]">
                              {p.title}
                            </div>
                            <div className="text-[11.5px] mt-0.5 leading-[1.5] text-[color:var(--ink-2)]">
                              {p.desc}
                            </div>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>

                  {/* Key numbers */}
                  <div className="mt-5 pt-5 border-t border-[color:var(--line)]">
                    <Mono className="text-[10px] tracking-[0.16em] text-[color:var(--dim)]">
                      KEY NUMBERS
                    </Mono>
                    <div className="mt-3 grid grid-cols-3 gap-2">
                      {cur.numbers.map((n, i) => (
                        <div
                          key={i}
                          className="card-v2-flat px-3 py-2.5"
                        >
                          <div className="text-[clamp(16px,1.8vw,20px)] tabular-nums font-semibold leading-none text-[color:var(--accent)] tracking-[-0.02em]">
                            {n.n}
                          </div>
                          <div className="mt-1.5 text-[10.5px] text-[color:var(--dim)] leading-tight">
                            {n.l}
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>

                  <div className="mt-5 pt-5 border-t border-[color:var(--line)]">
                    <Mono className="text-[10px] tracking-[0.16em] text-[color:var(--dim)]">
                      KEY TOPICS
                    </Mono>
                    <div className="mt-3 flex flex-wrap gap-2">
                      {cur.tags.map((t, i) => (
                        <span
                          key={i}
                          className="inline-flex items-center gap-1.5 text-[12px] px-2.5 py-1 rounded-md border border-[color:var(--line)] bg-[color:var(--bg-2)] text-[color:var(--ink-2)]"
                        >
                          <span className="w-1 h-1 rounded-full bg-[color:var(--accent)]" />
                          {t}
                        </span>
                      ))}
                    </div>
                  </div>
                </div>
              </div>

              <div className="mt-6 grid grid-cols-3 gap-3">
                {[
                  { l: "형식", v: cur.d === 10 ? "8시간 집중 RP" : "이론 + 실습 RP" },
                  { l: "평가", v: "트레이너 1:1" },
                  { l: "교재", v: `p.${Math.max(1, (cur.d - 1) * 7)}~${cur.d * 7}` },
                ].map((x, i) => (
                  <div
                    key={i}
                    className="card-v2-flat p-3"
                  >
                    <Mono className="text-[10px] tracking-[0.14em] text-[color:var(--dim)]">
                      {x.l}
                    </Mono>
                    <div className="mt-1 text-[13px] font-medium text-[color:var(--ink)]">
                      {x.v}
                    </div>
                  </div>
                ))}
              </div>

              <div className="mt-8 flex items-center gap-3">
                <BtnV2
                  variant="accent"
                  size="md"
                  icon={<Icon name="arrowRight" size={16} stroke={2} />}
                >
                  전체 커리큘럼 자료
                </BtnV2>
                <BtnV2 variant="ghost" size="md">
                  다음 기수 일정 →
                </BtnV2>
              </div>
            </div>
          </div>
        </div>

        <div className="mt-20 pt-10 border-t border-[color:var(--line)] flex flex-col md:flex-row items-start md:items-center justify-between gap-4">
          <p className="text-[13px] max-w-xl text-[color:var(--dim)]">
            * 교육 수료 후에도 월 1회 리프레시 세션과 상품 업데이트 스터디가 제공됩니다.
          </p>
          <Mono className="text-[11px] tracking-[0.16em] text-[color:var(--dim)]">
            ACADEMY · COHORT 2026.01
          </Mono>
        </div>
      </div>
    </section>
  );
}
