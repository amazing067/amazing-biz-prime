"use client";

import { Eyebrow, Mono } from "../Core";

const CARRIERS = ["삼", "한", "DB", "흥", "교", "현", "메", "라"];

const BLOG_CARDS = [
  { title: "실손 4세대 청구 가이드", date: "2026-04-12", tag: "가이드" },
  { title: "치매 진단 후 보장 정리 케이스", date: "2026-04-08", tag: "사례" },
];

export default function ShowcaseTouchpoints() {
  return (
    <div className="absolute inset-0 grid grid-cols-12 grid-rows-2 gap-3 p-5">
      {/* A. 모바일 청구.com — 좌측 풀높이 */}
      <div className="col-span-5 row-span-2 rounded-2xl border border-[color:var(--line)] bg-[color:var(--bg-1)] p-3 flex items-center justify-center">
        <div className="w-full max-w-[180px] aspect-[9/19] rounded-[28px] border-[6px] border-[color:var(--ink)] bg-[color:var(--bg-1)] p-3 flex flex-col gap-2">
          <div className="text-center">
            <Mono className="text-[9px] tracking-[0.14em] text-[color:var(--dim)]">
              청구.com
            </Mono>
          </div>
          <div className="rounded-md border border-[color:var(--line)] px-2 py-1 text-[9px] text-[color:var(--dim-2)]">
            보험사 검색…
          </div>
          <div className="grid grid-cols-4 gap-1.5 mt-1">
            {CARRIERS.map((c) => (
              <div
                key={c}
                className="aspect-square rounded-md border border-[color:var(--line)] flex items-center justify-center text-[11px] font-medium text-[color:var(--ink)]"
              >
                {c}
              </div>
            ))}
          </div>
          <div className="mt-auto text-center text-[8px] leading-tight text-[color:var(--dim)]">
            PDF 청구서 · 인콜 · FAX
          </div>
        </div>
      </div>

      {/* B. 알림톡 풍선 — 우상단 */}
      <div className="col-span-7 rounded-xl border border-[color:var(--line)] bg-[color:var(--bg-1)] p-4 flex flex-col">
        <Eyebrow>ALIMTALK</Eyebrow>
        <div className="mt-3 flex items-start gap-2 flex-1">
          <span className="w-6 h-6 shrink-0 rounded-full bg-[#FEE500] flex items-center justify-center text-[10px] font-bold text-[#3C1E1E]">
            카
          </span>
          <div className="flex-1">
            <div className="rounded-2xl rounded-tl-sm bg-[color:var(--bg-2)] px-3 py-2 text-[12px] leading-[1.55] text-[color:var(--ink)]">
              <span className="font-medium">[Amazing]</span> 김ㅇㅇ님 갱신 안내 — 5월 12일까지
              진행 부탁드립니다.
            </div>
            <Mono className="block mt-1 text-[9px] text-[color:var(--dim)]">
              오전 09:14
            </Mono>
          </div>
        </div>
      </div>

      {/* C. 블로그 카드 2개 — 우하단 */}
      <div className="col-span-7 rounded-xl border border-[color:var(--line)] bg-[color:var(--bg-1)] p-4 flex flex-col">
        <Eyebrow>BLOG · LATEST</Eyebrow>
        <div className="mt-3 space-y-2 flex-1 flex flex-col justify-center">
          {BLOG_CARDS.map((b) => (
            <div
              key={b.title}
              className="pl-3 border-l-[3px] border-[color:var(--accent)]"
            >
              <div className="text-[12px] font-medium text-[color:var(--ink)] leading-tight">
                {b.title}
              </div>
              <div className="mt-1 flex items-center gap-2 text-[10px] text-[color:var(--dim)]">
                <Mono>{b.date}</Mono>
                <span>·</span>
                <span>{b.tag}</span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
