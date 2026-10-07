"use client";

import { motion } from "framer-motion";
import { Check } from "lucide-react";
import s from "./home.module.css";
import { EASE } from "./Screens";

// 숫자 없이, 설계사가 실제로 겪는 장면만 짧게. (Codex 「AI 티」 검수 제안 문구, 2026-10-07)
const ROWS = [
  { k: "고객 자료", before: "서류를 부탁하고 도착할 때까지 기다림", after: "링크를 보내면 진료, 검진, 의료비 기록이 도착" },
  { k: "알릴 진료", before: "지난 병원 기록을 고객 기억에 기대어 확인", after: "진료내역에서 알려야 할 기록을 먼저 확인" },
  { k: "놓친 보험금", before: "고객이 말하지 않으면 놓치기 쉬움", after: "의료비 기록에서 청구해 볼 진료를 먼저 확인" },
  { k: "보장 점검", before: "증권을 한 장씩 펼쳐 손으로 비교", after: "지금 보장과 바꾼 뒤를 나란히 비교" },
  { k: "상담 자리", before: "자료를 찾을 때마다 대화가 끊김", after: "리포트를 펴 놓고 고객 이야기에 집중" },
];

export function BeforeAfter() {
  return (
    <section className="relative border-t border-[var(--sa-line)] bg-[var(--sa-paper)]">
      <div className="mx-auto max-w-[1280px] px-4 py-20 sm:px-6 lg:px-10 lg:py-28">
        <h2 className={`${s.serif} max-w-[16em] text-[clamp(2rem,4.4vw,3.5rem)] font-bold leading-[1.2]`}>
          같은 상담 준비,
          <br />
          이렇게 달라집니다
        </h2>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.2 }}
          transition={{ duration: 0.7, ease: EASE }}
          className="mt-12"
        >
          {/* 열 제목 — PC 는 위에 한 번, 휴대폰은 각 칸 앞에 작게 */}
          <div className="hidden grid-cols-12 gap-6 border-b-2 border-[var(--sa-ink)] pb-3 text-[14px] font-bold lg:grid">
            <span className="col-span-2" />
            <span className="col-span-5 text-[var(--sa-dim)]">혼자 준비할 때</span>
            <span className="col-span-5 flex items-center gap-2 text-[var(--sa-brand)]">
              <span className="grid h-[20px] w-[20px] place-items-center rounded-full bg-[var(--sa-brand)] text-[var(--sa-paper)]">
                <Check size={13} strokeWidth={3} />
              </span>
              보메이트와 함께
            </span>
          </div>
          <dl>
            {ROWS.map((r) => (
              <div
                key={r.k}
                className="grid grid-cols-1 gap-2 border-b border-[var(--sa-line)] py-6 lg:grid-cols-12 lg:gap-6"
              >
                <dt className="text-[15px] font-bold text-[var(--sa-ink)] lg:col-span-2">{r.k}</dt>
                <dd className="text-[16px] leading-[1.55] text-[var(--sa-dim)] lg:col-span-5">
                  <span className="mr-2 text-[12.5px] font-semibold lg:hidden">혼자 준비할 때</span>
                  {r.before}
                </dd>
                <dd className="text-[17px] font-semibold leading-[1.5] text-[var(--sa-ink)] lg:col-span-5">
                  <span className="mr-2 text-[12.5px] font-bold text-[var(--sa-brand)] lg:hidden">보메이트와 함께</span>
                  {r.after}
                </dd>
              </div>
            ))}
          </dl>
        </motion.div>
      </div>
    </section>
  );
}
