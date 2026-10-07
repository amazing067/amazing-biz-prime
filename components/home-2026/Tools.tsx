"use client";

import { motion } from "framer-motion";
import s from "./home.module.css";
import { EASE } from "./Screens";

// 보메이트 실제 도구 이름(BRIEF 3장). 설명은 숫자·과장 없이 「무엇을 하는지」만.
// 패널 3개를 늘어놓지 않고 굵은 선으로 나눈 긴 목록 하나로 둔다(Codex 「AI 티」 검수, 2026-10-07).
const GROUPS = [
  {
    name: "자료를 모읍니다",
    tools: [
      ["통합조회", "링크 하나로 진료내역, 건강검진, 의료비 기록을 함께 불러옵니다."],
      ["진료내역 조회", "최근 진료 기록을 정리하고 가입 전에 알릴 진료를 짚어 봅니다."],
      ["건강검진 리포트", "공단 검진 결과를 고객이 읽기 쉬운 리포트로 만듭니다."],
    ],
  },
  {
    name: "놓친 보험금을 찾습니다",
    tools: [
      ["의료비·실손 미청구", "의료비 기록에서 아직 청구하지 않은 진료를 찾습니다."],
      ["정밀 미청구", "실손 세대와 보장 한도까지 따져 받을 수 있는지 더 자세히 봅니다."],
      ["청구 누락 체크", "가입한 보장과 진료 기록을 맞춰 빠진 청구를 찾습니다."],
      ["청구 사례집", "질병과 상황별 청구 사례를 찾아봅니다."],
    ],
  },
  {
    name: "상담을 준비합니다",
    tools: [
      ["보장 비교", "지금 보장과 바꾼 뒤를 나란히 놓고 상담 멘트까지 정리합니다."],
      ["통합 리포트", "진료, 검진, 실손, 보장을 고객에게 건넬 리포트 한 권으로 묶습니다."],
      ["세일즈 코칭", "고객 자료를 바탕으로 상담에서 꺼낼 이야기와 순서를 정리합니다."],
      ["약관실", "보험사 약관을 모아 두고 필요한 조항을 찾아봅니다."],
      ["질문방", "약관, 청구, 심사 질문에 근거 조항과 함께 답을 찾아 줍니다."],
    ],
  },
];

export function Tools() {
  return (
    <section className="relative border-t border-[var(--sa-line)]">
      <div className="mx-auto max-w-[1280px] px-4 py-20 sm:px-6 lg:px-10 lg:py-28">
        <h2 className={`${s.serif} text-[clamp(2rem,4.4vw,3.5rem)] font-bold leading-[1.2]`}>
          사서 쓰는 프로그램이
          <br />
          아닙니다
        </h2>
        <p className="mt-5 max-w-[36em] text-[clamp(1rem,1.3vw,1.125rem)] leading-[1.65] text-[var(--sa-ink2)]">
          보메이트는 어메이징사업부 소속 개발자가 직접 만들고 운영합니다. 설계사가 상담하며 불편했던 점을 듣고 고쳐 나갑니다. 입사하면 첫날부터 아래 도구를 휴대폰과 PC에서 씁니다.
        </p>

        <div className="mt-14">
          {GROUPS.map((g) => (
            <motion.div
              key={g.name}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.3 }}
              transition={{ duration: 0.6, ease: EASE }}
              className="grid grid-cols-1 gap-6 border-t-2 border-[var(--sa-ink)] py-10 lg:grid-cols-12 lg:gap-10"
            >
              <p className={`${s.serif} text-[24px] font-bold leading-tight lg:col-span-4 lg:text-[28px]`}>{g.name}</p>
              <dl className="grid grid-cols-1 gap-x-10 gap-y-6 sm:grid-cols-2 lg:col-span-8">
                {g.tools.map(([name, desc]) => (
                  <div key={name}>
                    <dt className="text-[17px] font-bold text-[var(--sa-ink)]">{name}</dt>
                    <dd className="mt-1 text-[15px] leading-[1.6] text-[var(--sa-dim)]">{desc}</dd>
                  </div>
                ))}
              </dl>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
