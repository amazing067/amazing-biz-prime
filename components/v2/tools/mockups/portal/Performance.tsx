"use client";

import { MOCKUP } from "../_shared/tokens";

const FILTERS = [
  { code: "전체순위", active: true },
  { code: "세종지사" },
  { code: "원주지사" },
  { code: "인천지사" },
  { code: "구로지사" },
];

const BRANCHES = [
  { name: "세종지사", contracts: 38, premium: "4,820만", active: true },
  { name: "원주지사", contracts: 32, premium: "3,640만" },
  { name: "인천지사", contracts: 36, premium: "3,180만" },
  { name: "구로지사", contracts: 36, premium: "2,180만" },
];

type Row = {
  rank: number;
  branch: string;
  position: string;
  name: string;
  count: number;
  premium: string;
};

const ROWS: Row[] = [
  { rank: 1, branch: "세종지사", position: "지사장", name: "최송이", count: 12, premium: "7,620,000" },
  { rank: 2, branch: "원주지사", position: "팀장", name: "김소현", count: 14, premium: "6,540,000" },
  { rank: 3, branch: "인천지사", position: "FC", name: "이진아", count: 9, premium: "4,820,000" },
  { rank: 4, branch: "구로지사", position: "FC", name: "박지훈", count: 11, premium: "3,750,000" },
  { rank: 5, branch: "세종지사", position: "FC", name: "정유진", count: 8, premium: "2,840,000" },
  { rank: 6, branch: "원주지사", position: "FC", name: "이도현", count: 7, premium: "2,130,000" },
  { rank: 7, branch: "인천지사", position: "FC", name: "최예린", count: 6, premium: "1,880,000" },
];

export default function Performance() {
  return (
    <div className="absolute inset-0 flex flex-col" style={{ background: MOCKUP.bg0, color: MOCKUP.fg0, fontFeatureSettings: "'tnum' 1" }}>
      {/* Topbar */}
      <div
        className="flex items-center px-4 h-9 border-b shrink-0"
        style={{ background: "rgba(255,255,255,0.85)", borderColor: MOCKUP.border, backdropFilter: "blur(8px)" }}
      >
        <div className="flex items-center gap-1.5 text-[11px]">
          <span style={{ color: MOCKUP.fg2 }}>어메이징</span>
          <span style={{ color: MOCKUP.fg3 }}>/</span>
          <span style={{ color: MOCKUP.fg2 }}>군자본부</span>
          <span style={{ color: MOCKUP.fg3 }}>/</span>
          <span className="font-semibold" style={{ color: MOCKUP.fg0 }}>실적 · 집계 현황</span>
          <span className="ml-1.5 px-1.5 py-px rounded-full text-[9px] font-semibold" style={{ background: "rgba(74,170,110,0.14)", color: "#4aaa6e" }}>
            ● 4개 지사 집계 완료
          </span>
        </div>
        <div className="ml-auto flex items-center gap-1.5">
          <span className="text-[10px]" style={{ color: MOCKUP.fg3 }}>마지막 업데이트 04.19</span>
          <span
            className="px-2 py-0.5 rounded-md text-[10px] font-semibold"
            style={{ background: "#FEE500", color: "#3C1E1E" }}
          >
            카톡 알림 전송
          </span>
        </div>
      </div>

      {/* Purple period box */}
      <div className="px-4 pt-2 shrink-0">
        <div
          className="rounded-xl px-4 py-2.5 flex items-center justify-between gap-3"
          style={{
            background: "linear-gradient(135deg, #667eea 0%, #764ba2 100%)",
            color: "#fff",
            boxShadow: "0 8px 24px -8px rgba(102,126,234,0.45)",
          }}
        >
          <div>
            <div className="text-[22px] font-extrabold leading-none tabular-nums whitespace-nowrap">2026년 4월</div>
            <div className="text-[9.5px] opacity-90 mt-1">군자본부 · 세종 · 원주 · 인천 · 구로</div>
          </div>
          <div className="flex items-center gap-1 flex-wrap justify-end">
            <span className="text-[9.5px] opacity-90 mr-0.5 whitespace-nowrap">지사 선택</span>
            {FILTERS.map((f) => (
              <span
                key={f.code}
                className="px-2 py-0.5 rounded text-[10px] font-semibold whitespace-nowrap"
                style={{
                  background: f.active ? "rgba(255,255,255,0.22)" : "rgba(255,255,255,0.08)",
                  border: `1.5px solid ${f.active ? "#fff" : "rgba(255,255,255,0.25)"}`,
                  color: "#fff",
                }}
              >
                {f.code}
              </span>
            ))}
          </div>
        </div>
      </div>

      {/* Summary + 4 branch cards */}
      <div className="px-4 pt-2 pb-2 grid grid-cols-5 gap-1.5 shrink-0">
        <div
          className="rounded-lg px-3 py-2 flex flex-col justify-center"
          style={{
            background: "linear-gradient(135deg, #3b82f6 0%, #2563eb 100%)",
            color: "#fff",
            boxShadow: "0 4px 12px -4px rgba(59,130,246,0.4)",
          }}
        >
          <div className="text-[9px] font-semibold opacity-85 uppercase tracking-[0.06em]">군자본부 합계</div>
          <div className="text-[15px] font-extrabold tabular-nums leading-none mt-0.5">1억 3,820만</div>
          <div className="text-[9px] opacity-90 mt-0.5">계약 142건 · 38명 FC</div>
        </div>
        {BRANCHES.map((b) => (
          <div
            key={b.name}
            className="rounded-lg px-3 py-2 border flex flex-col justify-center"
            style={{
              background: b.active ? "#eff6ff" : MOCKUP.bg1,
              borderColor: b.active ? "#3b82f6" : MOCKUP.border,
              boxShadow: b.active ? "0 4px 12px -4px rgba(59,130,246,0.2)" : MOCKUP.shadowSm,
            }}
          >
            <div
              className="text-[10px] font-bold flex items-center gap-1"
              style={{ color: b.active ? "#3b82f6" : MOCKUP.fg1 }}
            >
              {b.name}
              {b.active && (
                <span
                  className="px-1 py-px rounded text-[8px] font-semibold"
                  style={{ background: "#3b82f6", color: "#fff" }}
                >
                  최다
                </span>
              )}
            </div>
            <div className="text-[14px] font-extrabold tabular-nums leading-none mt-0.5" style={{ color: MOCKUP.fg0 }}>
              {b.premium}원
            </div>
            <div className="text-[9px] mt-0.5" style={{ color: MOCKUP.fg2 }}>
              계약 {b.contracts}건
            </div>
          </div>
        ))}
      </div>

      {/* Ranking table */}
      <div className="flex-1 min-h-0 px-4 pb-3 flex flex-col">
        <div
          className="rounded-xl border overflow-hidden flex flex-col flex-1 min-h-0"
          style={{ background: MOCKUP.bg1, borderColor: MOCKUP.border, boxShadow: MOCKUP.shadowSm }}
        >
          <div
            className="flex items-center justify-between px-4 py-2 shrink-0"
            style={{
              background: "linear-gradient(135deg, #3b82f6 0%, #2563eb 100%)",
              color: "#fff",
            }}
          >
            <span className="text-[12px] font-bold">개인성적 순위</span>
            <div className="flex items-center gap-1.5">
              <div
                className="rounded-md px-2 py-0.5 text-[9.5px] flex items-center gap-1"
                style={{ background: "rgba(255,255,255,0.18)" }}
              >
                🔍 이름 검색
              </div>
              <span
                className="px-2 py-0.5 rounded-md text-[10px] font-semibold"
                style={{ background: "rgba(255,255,255,0.2)", border: "1px solid rgba(255,255,255,0.3)" }}
              >
                📸 이미지로 저장
              </span>
            </div>
          </div>

          <div className="flex-1 overflow-hidden">
            <div
              className="grid grid-cols-12 px-3 py-1.5 text-[9px] font-bold uppercase tracking-[0.06em]"
              style={{ background: MOCKUP.bg0, color: MOCKUP.fg2, borderBottom: `1px solid ${MOCKUP.border}` }}
            >
              <div className="col-span-1 text-center">순위</div>
              <div className="col-span-3">소속 지사</div>
              <div className="col-span-2">직급</div>
              <div className="col-span-2">성명</div>
              <div className="col-span-1 text-right">건수</div>
              <div className="col-span-3 text-right">보험료</div>
            </div>

            {ROWS.map((r) => {
              const isFirst = r.rank === 1;
              const isSecond = r.rank === 2;
              const isThird = r.rank === 3;
              const rowBg = isFirst
                ? "linear-gradient(135deg, #fef3c7 0%, #fde68a 25%, #fcd34d 50%, #fde68a 75%, #fef3c7 100%)"
                : isSecond
                ? "#e0e7ff"
                : isThird
                ? "#fef3c7"
                : "transparent";
              const medal = isFirst ? "🥇" : isSecond ? "🥈" : isThird ? "🥉" : null;
              const accent = isFirst ? "#92400e" : isSecond ? "#4f46e5" : isThird ? "#92400e" : MOCKUP.fg0;
              return (
                <div
                  key={r.rank}
                  className="grid grid-cols-12 items-center px-3 py-[7px] text-[11px]"
                  style={{
                    borderBottom: `1px solid ${MOCKUP.border}`,
                    background: rowBg,
                  }}
                >
                  <div className="col-span-1 text-center">
                    {medal ? (
                      <span
                        className="text-[15px]"
                        style={{ filter: isFirst ? "drop-shadow(0 1px 2px rgba(217,119,6,0.5))" : "none" }}
                      >
                        {medal}
                      </span>
                    ) : (
                      <span className="font-bold tabular-nums" style={{ color: MOCKUP.fg2 }}>{r.rank}</span>
                    )}
                  </div>
                  <div className="col-span-3 truncate" style={{ color: isFirst ? "#92400e" : MOCKUP.fg1, fontWeight: isFirst ? 700 : 500 }}>
                    {r.branch}
                  </div>
                  <div className="col-span-2 truncate" style={{ color: isFirst ? "#92400e" : MOCKUP.fg2 }}>
                    {r.position}
                  </div>
                  <div className="col-span-2 font-bold truncate" style={{ color: accent }}>
                    {r.name}
                  </div>
                  <div className="col-span-1 text-right tabular-nums font-bold" style={{ color: isFirst ? "#92400e" : MOCKUP.fg1 }}>
                    {r.count}건
                  </div>
                  <div className="col-span-3 text-right tabular-nums font-extrabold" style={{ color: isFirst ? "#92400e" : MOCKUP.fg0 }}>
                    {r.premium}원
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </div>
  );
}
