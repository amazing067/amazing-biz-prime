"use client";

import Image from "next/image";
import { motion } from "framer-motion";
import s from "./home.module.css";
import { EASE } from "./Screens";

const LEADERS = [
  {
    name: "윤성옥",
    branch: "067본부",
    src: "/067본부윤성옥본부장님.jpg",
    width: 3338,
    height: 5000,
  },
  {
    name: "양창대",
    branch: "290본부",
    src: "/290본부양창대본부장님.jpg",
    width: 4016,
    height: 6016,
  },
];
// 본부는 067·290 두 곳이다(2026-10-07 사장님 확인, 292본부 없음).

export function Leaders() {
  return (
    <section id="leaders" className="relative scroll-mt-16 border-t border-[var(--sa-line)] bg-[var(--sa-paper)]">
      <div className="mx-auto max-w-[1280px] px-4 py-20 sm:px-6 lg:px-10 lg:py-28">
        <div className="grid gap-6 lg:grid-cols-12 lg:items-end">
          <h2 className={`${s.serif} text-[clamp(2rem,4.4vw,3.5rem)] font-bold leading-[1.2] lg:col-span-6`}>
            함께 일할
            <br />
            두 본부
          </h2>
          <p className="max-w-[38em] text-[clamp(1rem,1.3vw,1.125rem)] leading-[1.65] text-[var(--sa-ink2)] lg:col-span-6 lg:justify-self-end">
            두 본부는 하나의 어메이징사업부로 함께 일합니다. 어느 본부에서 시작해도 보메이트는 입사 첫날부터 똑같이 씁니다.
          </p>
        </div>

        {/* 휴대폰에서도 두 분을 한 줄에. PC 에서는 사진이 너무 커지지 않게 폭을 묶는다 */}
        <div className="mt-10 grid max-w-[820px] grid-cols-2 gap-3 sm:gap-5 lg:mt-16 lg:gap-8">
          {LEADERS.map((leader, index) => (
            <motion.figure
              key={leader.branch}
              initial={{ opacity: 0, y: 28 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.25 }}
              transition={{ duration: 0.7, delay: index * 0.12, ease: EASE }}
              className={index === 1 ? "mt-6 sm:mt-12" : ""}
            >
              <div className="relative aspect-[2/3] overflow-hidden rounded-[14px] bg-[var(--sa-bg)] sm:rounded-[24px]">
                <Image
                  src={leader.src}
                  alt={`${leader.branch} ${leader.name} 본부장`}
                  width={leader.width}
                  height={leader.height}
                  sizes="(max-width: 860px) 48vw, 400px"
                  className="h-full w-full object-cover"
                />
              </div>
              <figcaption className="flex flex-col gap-0.5 border-b border-[var(--sa-line)] py-3 sm:flex-row sm:items-baseline sm:justify-between sm:gap-3 sm:py-4">
                <span className={`${s.serif} text-[17px] font-bold text-[var(--sa-ink)] sm:text-[22px]`}>{leader.name}</span>
                <span className={`${s.num} text-[13px] font-semibold text-[var(--sa-brand)] sm:text-[14px]`}>{leader.branch}</span>
              </figcaption>
            </motion.figure>
          ))}
        </div>
      </div>
    </section>
  );
}
