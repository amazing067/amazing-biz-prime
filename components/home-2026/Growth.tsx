"use client";

import Image from "next/image";
import { motion } from "framer-motion";
import s from "./home.module.css";
import { EASE } from "./Screens";

const STEPS = [
  {
    role: "설계사(FC)",
    condition: "입사 시",
    rate: "70~80%",
    added: "",
    position: "lg:col-start-1 lg:col-span-9",
    tone: "bg-[var(--sa-paper)]",
  },
  {
    role: "팀장",
    condition: "분기 전환성적 5천만 원",
    rate: "70~80%",
    added: "증원수수료",
    position: "lg:col-start-2 lg:col-span-9",
    tone: "bg-[var(--sa-paper)]",
  },
  {
    role: "지사장",
    condition: "2분기 합산 4억 원, FC 5명",
    rate: "최대 90%",
    added: "지사관리수수료, 지사분할수수료",
    position: "lg:col-start-3 lg:col-span-9",
    tone: "bg-[var(--sa-brand-soft)]",
  },
  {
    role: "본부장",
    condition: "2분기 합산 12억 원, FC 20명",
    rate: "97%",
    added: "본부관리수수료, 본부분할수수료",
    position: "lg:col-start-4 lg:col-span-9",
    tone: "bg-[var(--sa-brand)] text-[var(--sa-paper)]",
  },
];

/**
 * 용어 풀이 — 2026 영업규정집 원문을 쉬운 말로. 계산 기준은 바꾸지 않는다(Codex 10/9 검토).
 *   전환성적 18쪽 · 기준수수료·관리·분할·증원 28쪽 · 장기 지급률 29~30쪽 · 관리수수료 정산 31쪽 · 분할수수료 31~32쪽 · 자기계약 제62조
 */
const GLOSSARY: [string, string][] = [
  ["전환성적", "회사가 정한 보험사·상품별 가중치를 매달 정산 보험료에 곱한 실적"],
  ["장기보험 지급률", "회사가 매월 공지하는 장기보험 기준수수료(모집·계약관리의 대가)에 직급별로 적용하는 비율"],
  ["증원수수료", "새 설계사를 데려온 팀장에게 주는 수수료"],
  ["관리수수료", "지사장·본부장이 산하 조직을 관리하는 대가. 산하 설계사·지사와의 지급률 차액에서 증원수수료나 지사분할수수료를 뺀 나머지"],
  ["분할수수료", "지사·본부를 분할한 관리자에게, 분할된 조직의 전환성적 구간에 따라 매월 정액으로 주는 수수료(유지율 등 조건 있음)"],
  ["유지율 · 자기계약", "유지율은 모집한 계약 중 유지되는 비율, 자기계약은 본인·4촌 이내 친족·설계사(우리 회사·다른 회사)를 계약자나 피보험자로 한 계약"],
];

export function Growth() {
  return (
    <section id="growth" className="relative scroll-mt-16 border-t border-[var(--sa-line)]">
      <div className="mx-auto max-w-[1280px] px-4 py-20 sm:px-6 lg:px-10 lg:py-28">
        {/*
          제목 아래 설명 + 규정집 표지(10/9 사장님: 표지 공개 OK, 중간 크기, 설명은 제목 밑으로).
          폰: 제목 / [표지 | 설명]. PC: [제목·설명 | 표지] — 표지는 오른쪽 끝(본부장 카드 끝선), 아래쪽을 설명과 맞춘다.
          lg 첫 줄을 1fr 로 둬서, 두 줄에 걸친 표지가 키를 늘려도 제목과 설명 사이가 벌어지지 않게 한다.
        */}
        <div className="grid grid-cols-[110px_minmax(0,1fr)] gap-x-4 gap-y-6 lg:grid-cols-[minmax(0,1fr)_auto] lg:grid-rows-[1fr_auto] lg:items-end lg:gap-x-16 lg:gap-y-5">
          <h2 className={`${s.serif} col-span-2 text-[clamp(2rem,4.4vw,3.5rem)] font-bold leading-[1.2] lg:col-span-1 lg:col-start-1 lg:row-start-1`}>
            승격 기준은
            <br />
            규정집에 있습니다
          </h2>
          <figure className="col-start-1 row-start-2 self-start lg:col-start-2 lg:row-span-2 lg:row-start-1 lg:self-end lg:pr-2.5">
            {/* 종이 두 장을 겹쳐 그려 61쪽짜리 문서라는 두께감을 낸다 — 하얀 표지가 배경에 묻히지 않게 */}
            <Image
              src="/rulebook-2026-cover.jpg"
              alt="2026 영업규정 표지"
              width={720}
              height={1017}
              sizes="(min-width: 1024px) 150px, 110px"
              className="block w-[110px] rounded-[4px] border border-[var(--sa-line)] shadow-[5px_5px_0_-1px_var(--sa-paper),5px_5px_0_0_rgba(15,30,36,0.16),10px_10px_0_-1px_var(--sa-paper),10px_10px_0_0_rgba(15,30,36,0.12),0_14px_28px_rgba(15,30,36,0.16)] lg:w-[150px]"
            />
            <figcaption className="mt-4 text-center text-[13px] leading-[1.35]">
              <b className="text-[var(--sa-ink)]">2026 영업규정</b>
              <br />
              <span className="font-semibold text-[var(--sa-dim)]">전 61쪽</span>
            </figcaption>
          </figure>
          <p className="col-start-2 row-start-2 max-w-[36em] text-[clamp(1rem,1.3vw,1.125rem)] leading-[1.65] text-[var(--sa-ink2)] lg:col-start-1">
            {/* 「숫자를 달성하면 승격」 은 규정집과 달랐다 — 지사·본부는 8가지 기준 + 회사 실질심사(규정집 19~24쪽, Codex 10/9) */}
            본부장의 재량이 아닙니다. 실적·인원·유지율 같은 기준이 모두 적혀 있고, 규정집 61쪽은 설계사 누구나 볼 수 있습니다.
          </p>
        </div>

        <ol className="mt-14 grid grid-cols-1 gap-3 lg:grid-cols-12 lg:gap-y-4">
          {STEPS.map((step, index) => {
            const label = `text-[13px] font-semibold ${index === 3 ? "text-[var(--sa-brand-soft)]" : "text-[var(--sa-dim)]"}`;
            return (
            <motion.li
              key={step.role}
              initial={{ opacity: 0, y: 36 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.45 }}
              transition={{ duration: 0.65, delay: index * 0.1, ease: EASE }}
              className={`${step.position} ${step.tone} rounded-[24px] p-5 sm:p-6`}
            >
              <div className="grid gap-5 sm:grid-cols-[minmax(8rem,1fr)_2fr] sm:items-start lg:grid-cols-[minmax(8rem,1fr)_2fr_1fr_1.6fr] lg:gap-6">
                <div>
                  <span className="mb-3 block h-1 w-8 rounded-full bg-[var(--sa-amber)]" />
                  <p className={`${s.serif} text-[24px] font-bold leading-tight`}>{step.role}</p>
                </div>
                <div>
                  <p className={label}>대표 기준</p>
                  <p className="mt-1 text-[16px] font-semibold leading-[1.55]">{step.condition}</p>
                </div>
                <div>
                  <p className={label}>장기보험 지급률</p>
                  <p className={`${s.num} mt-1 text-[20px] font-bold leading-[1.4]`}>{step.rate}</p>
                </div>
                {/* 더해지는 것이 없으면(설계사) 칸 제목도 숨긴다 */}
                {step.added ? (
                  <div>
                    <p className={label}>더해지는 것</p>
                    <p className="mt-1 text-[15px] font-medium leading-[1.55]">{step.added}</p>
                  </div>
                ) : (
                  <div className="hidden lg:block" />
                )}
              </div>
            </motion.li>
            );
          })}
        </ol>

        <p className="mt-7 max-w-[72em] text-[14px] leading-[1.7] text-[var(--sa-ink2)]">
          카드에는 대표 기준만 적었습니다. 팀장은 생·손보 모집 자격이 함께 필요하고, 지사·본부는 유지율(18회 통산 90% 이상 등),
          자기계약 10% 이하, 민원 기준, 교육 이수도 채워야 합니다. 본부는 실적이 한 지사에 몰리지 않아야 하는 기준도 있습니다.
          자기계약 비율이 높은 경우처럼 규정집에 적힌 사유가 있으면, 회사가 승격이 적절한지 따로 심사합니다.
        </p>
        {/* 처음 보는 사람도 읽게 — 뜻은 2026 영업규정집 정의 조항·수수료 조항을 쉬운 말로(지어내지 않음) */}
        <dl className="mt-6 grid max-w-[72em] grid-cols-1 gap-x-8 gap-y-3 rounded-[20px] bg-[var(--sa-paper)] p-5 text-[14px] leading-[1.6] sm:grid-cols-2 sm:p-6">
          {GLOSSARY.map(([k, v]) => (
            <div key={k}>
              <dt className="font-bold text-[var(--sa-ink)]">{k}</dt>
              <dd className="mt-0.5 text-[var(--sa-ink2)]">{v}</dd>
            </div>
          ))}
        </dl>
        <p className="mt-4 max-w-[72em] text-[13px] leading-[1.7] text-[var(--sa-dim)]">
          2026 영업규정집 제12조~제26조(승격), 제34조·별표 1(장기보험 지급률) 기준. 용어 풀이는 같은 규정집의 정의·수수료 조항 기준.
        </p>
      </div>
    </section>
  );
}
