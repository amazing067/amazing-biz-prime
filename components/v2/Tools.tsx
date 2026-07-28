"use client";

import { useState } from "react";
import { Eyebrow, Icon } from "./Core";
import type { ToolGroup, ToolItem } from "./tools/types";
import ShowcaseFrame from "./tools/ShowcaseFrame";
// Portal mockups
import Dashboard from "./tools/mockups/portal/Dashboard";
import LeadDistribution from "./tools/mockups/portal/LeadDistribution";
import Customers from "./tools/mockups/portal/Customers";
import Performance from "./tools/mockups/portal/Performance";
import CalendarTool from "./tools/mockups/portal/CalendarTool";
import Pension from "./tools/mockups/portal/Pension";
// Studio mockups
import CoverageCompare from "./tools/mockups/studio/CoverageCompare";
import Disclosure from "./tools/mockups/studio/Disclosure";
import Coaching from "./tools/mockups/studio/Coaching";
import ConsultAuto from "./tools/mockups/studio/ConsultAuto";
import BlogAI from "./tools/mockups/studio/BlogAI";
import Cognitive from "./tools/mockups/studio/Cognitive";
// Touchpoints mockups
import ClaimHub from "./tools/mockups/touchpoints/ClaimHub";
import RecordsLookup from "./tools/mockups/touchpoints/RecordsLookup";
import BlogPlatform from "./tools/mockups/touchpoints/BlogPlatform";
import Alimtalk from "./tools/mockups/touchpoints/Alimtalk";

/**
 * 실제 운영 중인 사내 시스템
 * 소스: amazing-biz-prime / -brain / -check / -blog / -work / cheongu-landing
 */
const GROUPS: ToolGroup[] = [
  {
    tag: "portal",
    label: "설계사 포털",
    sub: "CRM · Operations",
    desc: "설계사의 하루가 시작되는 곳. 업로드부터 계약·청구까지 한 화면에서.",
    items: [
      {
        name: "대시보드",
        tag: "dashboard",
        desc: "업로드·배정·상담중·계약을 실시간으로.",
        detail:
          "\"실시간 DB 업로드, 배정, 실적 현황을 한눈에.\" 본부·팀·개인 실적 롤업, 이달의 목표 현황(목표금액/계약건수/상담횟수) 진행률 바, 100% 달성 시 🏆 배지. 관리자·매니저·FC 권한별 뷰 자동 분기.",
        status: "LIVE",
      },
      {
        name: "DB 분배 센터",
        tag: "leads",
        desc: "나의 영업 DB · 관리자 분배 센터.",
        detail:
          "본부 공유 DB를 규칙으로 자동 배정. 상담 단계(TA→1차→2차→클로징) 진도 추적, 중복 리드 자동 탐지, 엑셀 일괄 업로드, DB 분배 현황 실시간 모니터링.",
        status: "LIVE",
      },
      {
        name: "고객 관리",
        tag: "customers",
        desc: "계약 이력·납입일·AS신청까지 단일 프로필.",
        detail:
          "고객별 전 계약 이력, 만기·갱신 알림, 청구/AS 이력, 가족 구성까지. 담당 FC 이관 시 이력이 자동 보존됩니다.",
        status: "LIVE",
      },
      {
        name: "실적 · 목표",
        tag: "performance",
        desc: "나의 실적 · 나의 목표 설정 · 목표 현황.",
        detail:
          "FC 개인·팀·본부 단위 목표 관리. 수수료 집계 자동화, 정산 복원·재계산, 목표 100% 달성 시 컨페티 이벤트까지.",
        status: "LIVE",
      },
      {
        name: "캘린더",
        tag: "calendar",
        desc: "TA 콜·미팅·교육 일정 통합.",
        detail:
          "본부 교육 일정 자동 동기화, 고객 미팅·갱신일 알림, 알림톡 발송 연동. 본부 공지 푸시까지 한 곳에서.",
        status: "LIVE",
      },
      {
        name: "연금·은행 비교",
        tag: "pension",
        desc: "시중 은행·증권사·보험사 연금 한 번에.",
        detail:
          "예상 수령액·수익률·세제 혜택 통합 비교. 상담 자료 PDF 자동 생성, 고객에게 공유 링크 한 번으로 전달.",
        status: "LIVE",
      },
    ],
  },
  {
    tag: "studio",
    label: "AI 분석 스튜디오",
    sub: "AI Studio",
    desc: "PDF 한 장이면 AI가 보장분석·고지의무·세일즈 코칭까지 전부 처리합니다.",
    items: [
      {
        name: "보장분석 전후비교",
        tag: "compare",
        desc: "현재→정리 예정→정리 후→새 제안→최종 월납 한 화면.",
        detail:
          "PDF 증권 파싱 → 32개사 계약 통합 → 담보 자동 매칭 → 5단계 KPI 실시간 재계산. 세션별 「연결 n건」 근거 제시, 미귀속 경고, PNG/PDF 캡처 출력까지. 3,800+ 줄 파이프라인.",
        status: "AI",
      },
      {
        name: "고지의무 분석기",
        tag: "disclosure",
        desc: "진료내역 → 약관·판례 대조 → 고지 대상 자동 추출.",
        detail:
          "5년 진료·처방 내역을 약관·판례에 대조. 가입거절·해지 리스크를 청약 전에 차단합니다.",
        status: "AI",
      },
      {
        name: "AI 세일즈 코칭",
        tag: "coaching",
        desc: "TA·1차·2차·클로징 단계별 AI 롤플레이.",
        detail:
          "고객 타입 분석 + 맞춤 스크립트 + 반론 대응. 실전 녹음 업로드 시 피드백 리포트로 약점 진단.",
        status: "AI",
      },
      {
        name: "보장 상담 자동화",
        tag: "consult",
        desc: "상담 음성 → 텍스트 → 요약 → 제안서까지.",
        detail:
          "한 건에 평균 40분 절감. 녹음 한 번에 고객 카드·상담일지·제안서 초안 동시 생성.",
        status: "AI",
      },
      {
        name: "블로그 자동 생성",
        tag: "blog-ai",
        desc: "네이버 블로그 초안·보험카페 Q&A 30초.",
        detail:
          "설계서 이미지를 올리면 정보성/비교분석/경험담 3가지 유형 초안 자동 생성. 심의 규정 준수·품질 관리 대시보드 내장. 주 2~3회 정기 업로드 자동 스케줄.",
        status: "AI",
      },
      {
        name: "치매검사 & 요양 시뮬",
        tag: "cognitive",
        desc: "15가지 인지검사 + 10년 후 간병비 예측.",
        detail:
          "13개 뇌영역 점수 + 레이더차트. 2026년·2036년 예상 자기부담금·장기요양등급·국가 지원금까지 자동 산출. 설계사 상담 도구로 바로 활용.",
        status: "AI",
      },
    ],
  },
  {
    tag: "touchpoints",
    label: "고객 접점 · 콘텐츠",
    sub: "Customer-Facing",
    desc: "고객이 직접 쓰는 채널. 청구·콘텐츠·브랜드까지 통합 운영.",
    items: [
      {
        name: "청구.com 허브",
        tag: "claim",
        desc: "32개 보험사 청구 링크, 한 곳에서 바로.",
        detail:
          "\"보험금 청구 링크, 한 곳에서 바로.\" 전산 접속·필요서류·보험금 청구서 PDF·치과치료확인서·고객센터·인콜·FAX까지. 보험나이·실손의료비 계산기, 종수술분류표, 상급종합병원 지도, 실손의료비 변천사 자료 포함.",
        status: "LIVE",
      },
      {
        name: "보험계약 · 진료내역 조회",
        tag: "records",
        desc: "32개사 계약·심평원 진료내역 1분 통합.",
        detail:
          "고객 인증 한 번으로 생·손보 32개사 가입 이력, 5년 진료·처방 내역을 통합 조회합니다. 실시간 상태 모니터링.",
        status: "LIVE",
      },
      {
        name: "블로그 플랫폼",
        tag: "blog",
        desc: "최신 판례·약관 변경점·보장분석 사례.",
        detail:
          "매일 업데이트. 설계사는 고객에게 링크 공유만. SEO 최적화로 신규 고객 유입까지. 블로그 콘텐츠 에디터·품질 대시보드 연동.",
        status: "LIVE",
      },
      {
        name: "알림톡 시스템",
        tag: "alimtalk",
        desc: "갱신·납입·청구 완료·AS 처리 자동 발송.",
        detail:
          "카카오 비즈 메시지 연동. 템플릿 승인·발송 이력·수신 확인까지 포털에서 관리.",
        status: "LIVE",
      },
    ],
  },
  {
    tag: "infra",
    label: "인프라 · 일체형",
    sub: "Infrastructure",
    desc: "집·사무실·태블릿까지 동일하게. 설계사의 모든 장소가 사무실이 됩니다.",
    items: [
      {
        name: "Amazing Workbench",
        tag: "workbench",
        desc: "보험사 통합 로그인 · SSO.",
        detail:
          "\"편리한 보험설계 지원 프로그램.\" 로그인 한 번으로 30+ 생·손보사 시스템에 접속. 집, 사무실, 어디서든 인터넷만 되면 접속. 승인된 설계사만 이용 가능.",
        status: "LIVE",
      },
      {
        name: "TV 대시보드",
        tag: "tv-dashboard",
        desc: "지점 TV 출근·명언·공지 통합.",
        detail:
          "본부 TV에 출근 현황, 오늘의 명언, 공지, 매니저 연락처를 실시간 표시. 태블릿 출퇴근 체크와 연동.",
        status: "LIVE",
      },
    ],
  },
];

function ToolCard({ item, index }: { item: ToolItem; index: number }) {
  const [hover, setHover] = useState(false);
  const isAi = item.status === "AI";
  return (
    <div
      onMouseEnter={() => setHover(true)}
      onMouseLeave={() => setHover(false)}
      className="relative group p-8 transition-all duration-500"
      style={{ background: hover ? "var(--bg-2)" : "var(--bg-1)" }}
    >
      <div className="flex items-center gap-2 mb-6">
        {isAi ? (
          <span
            className="inline-flex items-center gap-1.5 px-2 py-0.5 rounded-full text-[10px] font-medium tracking-[0.08em]"
            style={{ background: "var(--accent)", color: "var(--accent-ink)" }}
          >
            <Icon name="sparkles" size={10} stroke={2} /> AI
          </span>
        ) : (
          <span className="inline-flex items-center gap-1.5 text-[11px] font-medium text-[color:var(--dim)]">
            <span className="w-1 h-1 rounded-full bg-emerald-500" />
            운영중
          </span>
        )}
      </div>

      <h4 className="text-[22px] font-medium tracking-tight mb-2 text-[color:var(--ink)]">
        {item.name}
      </h4>
      <p className="text-[13px] leading-[1.6] mb-5 text-[color:var(--ink-2)]">{item.desc}</p>

      <div
        className="overflow-hidden transition-all duration-500"
        style={{ maxHeight: hover ? "220px" : "0px", opacity: hover ? 1 : 0 }}
      >
        <div className="pt-4 border-t text-[12px] leading-[1.65] border-[color:var(--line)] text-[color:var(--dim)]">
          {item.detail}
        </div>
      </div>

      <div className="mt-6 flex items-center justify-end pt-4 border-t border-[color:var(--line)]">
        <Icon
          name="arrowUpRight"
          size={14}
          className="transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5"
          style={{ color: hover ? "var(--accent)" : "var(--dim)" }}
        />
      </div>
    </div>
  );
}

export default function Tools() {
  const totalTools = GROUPS.reduce((s, g) => s + g.items.length, 0);
  const aiCount = GROUPS.reduce(
    (s, g) => s + g.items.filter((i) => i.status === "AI").length,
    0
  );

  return (
    <section
      id="tools"
      className="relative py-32 px-6 bg-[color:var(--bg-1)]"
      style={{ ["--card-accent" as string]: "#8577d1" } as React.CSSProperties}
    >
      <div className="relative max-w-[1760px] mx-auto">
        <div className="max-w-[880px] mb-16">
          <Eyebrow>전체 시스템</Eyebrow>
          <h2 className="mt-5 text-[clamp(44px,6.2vw,96px)] leading-[0.98] tracking-[-0.025em] font-semibold text-[color:var(--ink)]">
            설계사는 말만 하면 됩니다.
            <br />
            <span className="font-serif-italic text-[color:var(--dim)]">나머지는 시스템이.</span>
          </h2>
          <p className="mt-6 text-[15px] leading-[1.7] max-w-[680px] text-[color:var(--ink-2)]">
            {totalTools}개의 자체 시스템이 설계사의 손을 비워둡니다. CRM·보장분석 AI·세일즈 코칭·청구 자동화·보험사 통합 로그인까지 —
            타사가 외주로 빌려 쓰는 것을 우리는{" "}
            <em className="font-serif-italic">내부에서</em> 직접 개발·운영합니다. 현장 피드백이 곧 다음 주 업데이트로 반영됩니다.
          </p>
          <div className="mt-8 flex flex-wrap gap-6 text-[12px] text-[color:var(--dim)]">
            <span className="inline-flex items-center gap-2">
              <span className="w-1.5 h-1.5 rounded-full bg-emerald-500" /> {totalTools}개 시스템 운영중
            </span>
            <span className="inline-flex items-center gap-2">
              <span className="w-1.5 h-1.5 rounded-full bg-[color:var(--accent)]" /> AI 시스템 {aiCount}개 자체 개발
            </span>
            <span className="inline-flex items-center gap-2">
              <span className="w-1.5 h-1.5 rounded-full bg-[color:var(--dim)]" /> 공공 API · 알림톡
            </span>
            <span className="inline-flex items-center gap-2">
              <span className="w-1.5 h-1.5 rounded-full bg-[color:var(--dim)]" /> 32개 제휴사 통합
            </span>
          </div>
        </div>

        <div className="space-y-20">
          {GROUPS.map((g, gi) => {
            if (g.tag === "infra") {
              return (
                <div key={g.label}>
                  <div className="flex items-end justify-between mb-3 pb-5 border-b border-[color:var(--line)]">
                    <div>
                      <h3 className="text-[28px] font-medium tracking-tight text-[color:var(--ink)]">
                        {g.label}
                      </h3>
                      <p className="mt-2 text-[13px] max-w-[560px] text-[color:var(--ink-2)]">
                        {g.desc}
                      </p>
                    </div>
                    <span className="text-[12px] whitespace-nowrap ml-6 text-[color:var(--dim)]">
                      {g.items.length}개
                    </span>
                  </div>
                  <div
                    className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-px mt-8"
                    style={{ background: "var(--line)" }}
                  >
                    {g.items.map((it, i) => (
                      <ToolCard key={it.name} item={it} index={i} />
                    ))}
                  </div>
                </div>
              );
            }

            const mockups =
              g.tag === "portal"
                ? [
                    <Dashboard key="dashboard" />,
                    <LeadDistribution key="leads" />,
                    <Customers key="customers" />,
                    <Performance key="performance" />,
                    <CalendarTool key="calendar" />,
                    <Pension key="pension" />,
                  ]
                : g.tag === "studio"
                ? [
                    <CoverageCompare key="compare" />,
                    <Disclosure key="disclosure" />,
                    <Coaching key="coaching" />,
                    <ConsultAuto key="consult" />,
                    <BlogAI key="blog-ai" />,
                    <Cognitive key="cognitive" />,
                  ]
                : [
                    <ClaimHub key="claim" />,
                    <RecordsLookup key="records" />,
                    <BlogPlatform key="blog" />,
                    <Alimtalk key="alimtalk" />,
                  ];

            return (
              <ShowcaseFrame
                key={g.label}
                group={g}
                index={gi}
                flip={g.tag === "studio"}
                mockups={mockups}
              />
            );
          })}
        </div>

        {/* Architecture pitch */}
        <div className="mt-24 card-v2-strong p-10 md:p-14 relative overflow-hidden">
          <div className="relative max-w-[860px] mx-auto text-center">
            <Eyebrow className="justify-center">시스템 구성</Eyebrow>
            <h3 className="mt-4 text-[clamp(26px,3vw,38px)] leading-[1.15] tracking-tight font-semibold text-[color:var(--ink)]">
              외주가 아닌,{" "}
              <span className="font-serif-italic text-[color:var(--accent)]">
                직접 만든 시스템
              </span>
              으로 운영합니다.
            </h3>
            <p className="mt-5 text-[14px] md:text-[15px] leading-[1.75] text-[color:var(--ink-2)]">
              {totalTools}개 자체 서비스. 포털·보장분석 AI·보험금 청구 도구·설계사 업무 시스템까지 외부 업체 없이 전부 직접 만들어 운영합니다. 안드로이드 앱까지 같은 시스템으로 돌아가므로, 설계사 피드백이 곧 다음 주 업데이트가 되는 구조입니다.
            </p>
            <div className="mt-7 flex flex-wrap justify-center gap-2 text-[11px] text-[color:var(--dim)]">
              {[
                "100% 자체 개발",
                "보장분석 AI",
                "공공데이터 연동",
                "카카오 알림톡",
                "안드로이드 앱",
                "매주 업데이트",
              ].map((t) => (
                <span
                  key={t}
                  className="px-2.5 py-1 rounded-full border border-[color:var(--line)] bg-[color:var(--bg-1)]"
                >
                  {t}
                </span>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
