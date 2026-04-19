"use client";

import { MOCKUP } from "../_shared/tokens";

const REGIONS = ["기억력", "주의력", "언어", "시공간", "실행", "계산", "추론", "속도"];
const SCORE = [78, 64, 88, 70, 55, 82, 60, 74];
const BASELINE = [100, 100, 100, 100, 100, 100, 100, 100];

function radarPoints(values: number[], r = 42) {
  return values
    .map((v, i) => {
      const angle = (Math.PI * 2 * i) / values.length - Math.PI / 2;
      const ratio = v / 100;
      const x = 50 + Math.cos(angle) * r * ratio;
      const y = 50 + Math.sin(angle) * r * ratio;
      return `${x.toFixed(2)},${y.toFixed(2)}`;
    })
    .join(" ");
}

const SIMS = [
  {
    year: "2026 현재",
    burden: "월 12만",
    grade: "정상",
    support: "0원",
    sub: "일상 생활 가능",
    tone: MOCKUP.fg1,
  },
  {
    year: "2036 (+10년)",
    burden: "월 148만",
    grade: "4등급 예상",
    support: "월 94만",
    sub: "방문요양 주 3회",
    tone: "#d8a040",
    highlight: true,
  },
];

const RECOMMEND = [
  { name: "간병보험", gap: "2.4억", pct: 68 },
  { name: "치매보험", gap: "1.8억", pct: 52 },
  { name: "실손 간병 특약", gap: "4천", pct: 24 },
];

export default function Cognitive() {
  return (
    <div className="absolute inset-0 flex flex-col" style={{ background: MOCKUP.bg0, color: MOCKUP.fg0, fontFeatureSettings: "'tnum' 1" }}>
      <div className="flex items-center px-4 h-9 border-b shrink-0" style={{ background: "rgba(255,255,255,0.85)", borderColor: MOCKUP.border, backdropFilter: "blur(8px)" }}>
        <div className="flex items-center gap-1.5 text-[11px]">
          <span style={{ color: MOCKUP.fg2 }}>어메이징</span>
          <span style={{ color: MOCKUP.fg3 }}>/</span>
          <span className="font-semibold" style={{ color: MOCKUP.fg0 }}>치매·요양 시뮬</span>
          <span className="ml-1.5 px-1.5 py-px rounded text-[9px] font-semibold" style={{ background: MOCKUP.bg2, color: MOCKUP.fg1 }}>김민지님 · 32세</span>
          <span className="ml-1 px-1.5 py-px rounded-full text-[9px] font-semibold" style={{ background: "rgba(216,160,64,0.14)", color: "#d8a040" }}>⚠ 약점 2영역</span>
        </div>
        <div className="ml-auto flex items-center gap-1.5">
          <span className="px-2 py-0.5 rounded-md text-[10px] font-semibold border" style={{ background: MOCKUP.bg1, borderColor: MOCKUP.border, color: MOCKUP.fg1 }}>검사 재실행</span>
          <span className="px-2 py-0.5 rounded-md text-[10px] font-semibold" style={{ background: MOCKUP.fg0, color: "#fff" }}>보장 제안</span>
        </div>
      </div>

      <div className="flex-1 min-h-0 p-3 grid grid-cols-12 gap-2">
        {/* Radar */}
        <div className="col-span-5 rounded-lg border p-3 flex flex-col" style={{ background: MOCKUP.bg1, borderColor: MOCKUP.border, boxShadow: MOCKUP.shadowSm }}>
          <div className="flex items-center justify-between mb-2">
            <div className="text-[10px] font-bold uppercase tracking-[0.08em]" style={{ color: MOCKUP.fg1 }}>인지 8영역</div>
            <div className="text-[9px] tabular-nums" style={{ color: MOCKUP.fg2 }}>평균 <b style={{ color: MOCKUP.accent }}>71</b> / 100</div>
          </div>
          <div className="flex-1 flex items-center justify-center relative">
            <svg viewBox="0 0 100 100" className="w-full max-w-[200px]" aria-hidden>
              <polygon points={radarPoints(BASELINE)} fill="none" stroke={MOCKUP.border} strokeWidth={0.4} strokeDasharray="2 2" />
              <polygon points={radarPoints([75, 75, 75, 75, 75, 75, 75, 75])} fill="none" stroke={MOCKUP.border} strokeWidth={0.3} />
              <polygon points={radarPoints([50, 50, 50, 50, 50, 50, 50, 50])} fill="none" stroke={MOCKUP.border} strokeWidth={0.3} />
              <polygon points={radarPoints(SCORE)} fill={MOCKUP.accent} fillOpacity={0.22} stroke={MOCKUP.accent} strokeWidth={0.9} />
              {REGIONS.map((r, i) => {
                const angle = (Math.PI * 2 * i) / REGIONS.length - Math.PI / 2;
                const x = 50 + Math.cos(angle) * 48.5;
                const y = 50 + Math.sin(angle) * 48.5;
                return (
                  <text key={r} x={x} y={y} fontSize={3.4} textAnchor="middle" dominantBaseline="middle" fill={MOCKUP.fg2} fontWeight="600">
                    {r}
                  </text>
                );
              })}
            </svg>
          </div>
        </div>

        {/* Score bars */}
        <div className="col-span-7 rounded-lg border p-3 flex flex-col min-h-0" style={{ background: MOCKUP.bg1, borderColor: MOCKUP.border, boxShadow: MOCKUP.shadowSm }}>
          <div className="flex items-center justify-between mb-2">
            <div className="text-[10px] font-bold uppercase tracking-[0.08em]" style={{ color: MOCKUP.fg1 }}>영역별 점수</div>
            <div className="text-[9px]" style={{ color: MOCKUP.fg2 }}>13개 뇌영역 · 15가지 검사</div>
          </div>
          <div className="flex-1 grid grid-cols-2 gap-x-3 gap-y-1.5 content-around">
            {REGIONS.map((r, i) => {
              const score = SCORE[i];
              const weak = score < 65;
              return (
                <div key={r} className="flex items-center gap-2">
                  <div className="text-[10px] font-medium w-12" style={{ color: MOCKUP.fg1 }}>{r}</div>
                  <div className="flex-1 h-2 rounded-full relative" style={{ background: MOCKUP.bg2 }}>
                    <div className="h-full rounded-full" style={{ width: `${score}%`, background: weak ? "#d8a040" : MOCKUP.accent }} />
                  </div>
                  <div className="text-[10px] tabular-nums font-bold w-6 text-right" style={{ color: weak ? "#d8a040" : MOCKUP.fg0 }}>{score}</div>
                </div>
              );
            })}
          </div>
        </div>

        {/* Simulation 10y */}
        <div className="col-span-7 grid grid-cols-2 gap-2">
          {SIMS.map((s) => (
            <div
              key={s.year}
              className="rounded-lg border p-2.5"
              style={{
                background: s.highlight ? `linear-gradient(135deg, rgba(216,160,64,0.08), ${MOCKUP.bg1})` : MOCKUP.bg1,
                borderColor: s.highlight ? "#d8a040" : MOCKUP.border,
                boxShadow: MOCKUP.shadowSm,
              }}
            >
              <div className="text-[9px] font-bold uppercase tracking-[0.06em]" style={{ color: s.tone }}>{s.year}</div>
              <div className="mt-1">
                <div className="text-[9px]" style={{ color: MOCKUP.fg2 }}>자기부담금</div>
                <div className="text-[18px] font-extrabold leading-none tabular-nums" style={{ color: s.highlight ? "#d8a040" : MOCKUP.fg0 }}>{s.burden}</div>
              </div>
              <div className="grid grid-cols-2 gap-2 mt-1.5 text-[9.5px]">
                <div>
                  <div style={{ color: MOCKUP.fg3 }}>장기요양</div>
                  <div className="font-bold" style={{ color: MOCKUP.fg0 }}>{s.grade}</div>
                </div>
                <div>
                  <div style={{ color: MOCKUP.fg3 }}>국가 지원</div>
                  <div className="font-bold" style={{ color: "#4aaa6e" }}>{s.support}</div>
                </div>
              </div>
              <div className="mt-1.5 text-[9px]" style={{ color: MOCKUP.fg2 }}>{s.sub}</div>
            </div>
          ))}
        </div>

        {/* GAP recommendations */}
        <div className="col-span-5 rounded-lg border p-2.5 flex flex-col" style={{ background: MOCKUP.bg1, borderColor: MOCKUP.border, boxShadow: MOCKUP.shadowSm }}>
          <div className="text-[10px] font-bold uppercase tracking-[0.08em] mb-1.5" style={{ color: MOCKUP.fg1 }}>보장 GAP</div>
          <div className="flex-1 flex flex-col gap-1.5 justify-around">
            {RECOMMEND.map((r) => (
              <div key={r.name}>
                <div className="flex items-center justify-between text-[10px]">
                  <span className="font-semibold" style={{ color: MOCKUP.fg0 }}>{r.name}</span>
                  <span className="tabular-nums font-bold" style={{ color: MOCKUP.accent }}>GAP {r.gap}</span>
                </div>
                <div className="h-1.5 rounded-full mt-1" style={{ background: MOCKUP.bg2 }}>
                  <div className="h-full rounded-full" style={{ width: `${r.pct}%`, background: MOCKUP.accent }} />
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
