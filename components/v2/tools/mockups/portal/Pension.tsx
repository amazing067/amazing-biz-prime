"use client";

import { MOCKUP } from "../_shared/tokens";

const INPUTS = [
  { label: "월 납입", value: "30만", hint: "20–100만" },
  { label: "납입 기간", value: "20년", hint: "10–30년" },
  { label: "은퇴 나이", value: "60세", hint: "55–65세" },
];

const PRODUCTS = [
  { co: "삼성생명", name: "변액연금 플러스", recv: "8억 2천", yield: "5.8%", tax: "세제적격", fee: "1.4%", best: true },
  { co: "한화생명", name: "연금저축 보험", recv: "7억 8천", yield: "5.4%", tax: "세제적격", fee: "1.2%" },
  { co: "KB국민", name: "IRP · 펀드", recv: "7억 5천", yield: "5.2%", tax: "세제적격", fee: "0.9%" },
  { co: "신한라이프", name: "변액유니버셜", recv: "6억 9천", yield: "4.8%", tax: "비적격", fee: "1.8%" },
  { co: "교보생명", name: "연금보험 클래식", recv: "6억 4천", yield: "4.4%", tax: "세제적격", fee: "1.1%" },
];

// 간단한 누적 곡선 — 5개 상품, 20년치
function curve(yieldPct: number) {
  const pts: string[] = [];
  const monthly = 30;
  const rate = yieldPct / 100;
  for (let y = 0; y <= 20; y++) {
    const v = monthly * 12 * y * (1 + rate * y * 0.03);
    const x = (y / 20) * 100;
    const yval = 100 - Math.min(v / 100, 95);
    pts.push(`${x.toFixed(1)},${yval.toFixed(1)}`);
  }
  return pts.join(" ");
}

export default function Pension() {
  return (
    <div className="absolute inset-0 flex flex-col" style={{ background: MOCKUP.bg0, color: MOCKUP.fg0, fontFeatureSettings: "'tnum' 1" }}>
      <div className="flex items-center px-4 h-9 border-b shrink-0" style={{ background: "rgba(255,255,255,0.85)", borderColor: MOCKUP.border, backdropFilter: "blur(8px)" }}>
        <div className="flex items-center gap-1.5 text-[11px]">
          <span style={{ color: MOCKUP.fg2 }}>어메이징</span>
          <span style={{ color: MOCKUP.fg3 }}>/</span>
          <span style={{ color: MOCKUP.fg2 }}>연금 비교</span>
          <span style={{ color: MOCKUP.fg3 }}>/</span>
          <span className="font-semibold" style={{ color: MOCKUP.fg0 }}>김민지님 시뮬</span>
          <span className="ml-1.5 px-1.5 py-px rounded-full text-[9px] font-semibold" style={{ background: "rgba(74,170,110,0.14)", color: "#4aaa6e" }}>
            ● 32개 상품 분석
          </span>
        </div>
        <div className="ml-auto flex items-center gap-1.5">
          <span className="px-2 py-0.5 rounded-md text-[10px] font-semibold border" style={{ background: MOCKUP.bg1, borderColor: MOCKUP.border, color: MOCKUP.fg1 }}>카톡 공유</span>
          <span className="px-2 py-0.5 rounded-md text-[10px] font-semibold" style={{ background: MOCKUP.fg0, color: "#fff" }}>PDF 생성</span>
        </div>
      </div>

      <div className="grid grid-cols-3 gap-1.5 px-4 py-2 shrink-0">
        {INPUTS.map((inp) => (
          <div key={inp.label} className="rounded-lg p-2 border flex items-center justify-between" style={{ background: MOCKUP.bg1, borderColor: MOCKUP.border }}>
            <div>
              <div className="text-[9px] font-semibold uppercase tracking-[0.06em]" style={{ color: MOCKUP.fg2 }}>{inp.label}</div>
              <div className="text-[18px] font-extrabold leading-none mt-1 tabular-nums" style={{ color: MOCKUP.fg0 }}>{inp.value}</div>
              <div className="text-[8.5px]" style={{ color: MOCKUP.fg3 }}>{inp.hint}</div>
            </div>
            <div className="flex flex-col gap-0.5">
              <span className="w-5 h-5 rounded flex items-center justify-center text-[11px] font-bold" style={{ background: MOCKUP.bg2, color: MOCKUP.fg1 }}>+</span>
              <span className="w-5 h-5 rounded flex items-center justify-center text-[11px] font-bold" style={{ background: MOCKUP.bg2, color: MOCKUP.fg1 }}>−</span>
            </div>
          </div>
        ))}
      </div>

      <div className="flex-1 min-h-0 px-4 pb-3 grid grid-cols-12 gap-2">
        <div className="col-span-8 rounded-lg border flex flex-col overflow-hidden" style={{ background: MOCKUP.bg1, borderColor: MOCKUP.border, boxShadow: MOCKUP.shadowSm }}>
          <div className="grid grid-cols-12 px-3 py-1.5 text-[8.5px] font-bold uppercase tracking-[0.06em] border-b" style={{ background: MOCKUP.bg0, color: MOCKUP.fg2, borderColor: MOCKUP.border }}>
            <div className="col-span-5">상품</div>
            <div className="col-span-3 text-right">60세 수령</div>
            <div className="col-span-2 text-right">수익률</div>
            <div className="col-span-2 text-right">수수료</div>
          </div>
          <div className="flex-1 flex flex-col">
            {PRODUCTS.map((p, i) => (
              <div key={p.co} className="grid grid-cols-12 items-center px-3 py-2 gap-1" style={{ borderTop: i === 0 ? "none" : `1px solid ${MOCKUP.border}`, background: p.best ? "rgba(91,91,239,0.04)" : "transparent" }}>
                <div className="col-span-5 flex items-center gap-1.5 min-w-0">
                  {p.best && <span className="text-[10px]" style={{ color: MOCKUP.accent }}>◆</span>}
                  <div className="min-w-0">
                    <div className="text-[10.5px] font-bold truncate" style={{ color: MOCKUP.fg0 }}>{p.co}</div>
                    <div className="text-[9px] truncate" style={{ color: MOCKUP.fg2 }}>{p.name} · {p.tax}</div>
                  </div>
                </div>
                <div className="col-span-3 text-right text-[11px] font-extrabold tabular-nums" style={{ color: p.best ? MOCKUP.accent : MOCKUP.fg0 }}>{p.recv}</div>
                <div className="col-span-2 text-right text-[10px] font-bold tabular-nums" style={{ color: "#4aaa6e" }}>{p.yield}</div>
                <div className="col-span-2 text-right text-[10px] tabular-nums" style={{ color: MOCKUP.fg2 }}>{p.fee}</div>
              </div>
            ))}
          </div>
        </div>

        <div className="col-span-4 rounded-lg border p-3 flex flex-col" style={{ background: MOCKUP.bg1, borderColor: MOCKUP.border, boxShadow: MOCKUP.shadowSm }}>
          <div className="text-[10px] font-bold uppercase tracking-[0.08em] mb-1.5" style={{ color: MOCKUP.fg1 }}>누적 자산 시뮬</div>
          <div className="flex-1 relative">
            <svg viewBox="0 0 100 100" preserveAspectRatio="none" className="w-full h-full">
              <line x1="0" y1="50" x2="100" y2="50" stroke={MOCKUP.bg3} strokeWidth="0.4" strokeDasharray="1 1" />
              <polyline points={curve(5.4)} fill="none" stroke={MOCKUP.fg3} strokeWidth="0.6" opacity="0.5" />
              <polyline points={curve(5.8)} fill="none" stroke={MOCKUP.accent} strokeWidth="1.2" />
              <circle cx="100" cy={100 - 82} r="1.5" fill={MOCKUP.accent} />
            </svg>
            <div className="absolute top-1 right-1 text-right">
              <div className="text-[9px] font-semibold" style={{ color: MOCKUP.fg2 }}>60세</div>
              <div className="text-[13px] font-extrabold tabular-nums" style={{ color: MOCKUP.accent }}>8억 2천</div>
            </div>
            <div className="absolute bottom-1 left-1 text-[8.5px]" style={{ color: MOCKUP.fg3 }}>40세 → 60세</div>
          </div>
          <div className="mt-2 pt-2 border-t text-[9.5px] leading-snug" style={{ borderColor: MOCKUP.border, color: MOCKUP.fg1 }}>
            <span className="font-bold">추천 · 삼성 변액연금</span>
            <span style={{ color: MOCKUP.fg2 }}> — 동일 월납 기준 +4천 수령</span>
          </div>
        </div>
      </div>
    </div>
  );
}
