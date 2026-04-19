"use client";

import { MOCKUP } from "../_shared/tokens";

const FILTER_TABS = [
  { label: "전체", count: 32, active: true },
  { label: "손보", count: 11 },
  { label: "생보", count: 15 },
  { label: "우체국", count: 6 },
];

const ACTIONS = [
  { icon: "🔐", label: "전산 시스템", sub: "ERP 로그인", tone: "accent" },
  { icon: "📋", label: "필요서류 안내", sub: "자동 매칭", tone: "default" },
  { icon: "📄", label: "청구서 PDF", sub: "자동 입력", tone: "default" },
  { icon: "🦷", label: "치과 확인서", sub: "다운로드", tone: "default" },
];

const CONTACTS = [
  { kind: "고객센터", tel: "1588-5114" },
  { kind: "모니터", tel: "1566-0553" },
  { kind: "헬프데스크", tel: "1899-5005" },
  { kind: "FAX 청구", tel: "0505-162-0872" },
];

const CARRIERS_COLLAPSED = [
  { name: "현대해상", type: "손해", cs: "1588-5656", fax: "0507-774-6060" },
  { name: "DB손해보험", type: "손해", cs: "1588-0100", fax: "0505-181-4862" },
  { name: "메리츠화재", type: "손해", cs: "1566-7711", fax: "0505-224-2999" },
  { name: "한화손해보험", type: "손해", cs: "1566-8000", fax: "0505-126-1919" },
  { name: "KB손해보험", type: "손해", cs: "1544-0114", fax: "02-2097-6200" },
  { name: "롯데손해보험", type: "손해", cs: "1588-3344", fax: "0507-761-8800" },
];

export default function ClaimHub() {
  return (
    <div
      className="absolute inset-0 flex flex-col"
      style={{ background: MOCKUP.bg0, color: MOCKUP.fg0, fontFeatureSettings: "'tnum' 1" }}
    >
      {/* Topbar — 청구.com branded */}
      <div
        className="flex items-center px-4 h-9 border-b shrink-0"
        style={{
          background: "linear-gradient(135deg, rgba(91,91,239,0.08), rgba(255,255,255,0.85))",
          borderColor: MOCKUP.border,
          backdropFilter: "blur(8px)",
        }}
      >
        <div className="flex items-center gap-1.5 text-[11px]">
          <span
            className="w-5 h-5 rounded-md flex items-center justify-center text-[10px] font-extrabold"
            style={{ background: MOCKUP.accent, color: "#fff" }}
          >
            청
          </span>
          <span className="font-extrabold text-[13px]" style={{ color: MOCKUP.fg0 }}>
            청구.com
          </span>
          <span className="ml-0.5 text-[9.5px]" style={{ color: MOCKUP.fg2 }}>
            보험금 청구 · 한 곳에서 바로
          </span>
          <span
            className="ml-2 px-1.5 py-px rounded-full text-[9px] font-semibold"
            style={{ background: "rgba(74,170,110,0.14)", color: "#4aaa6e" }}
          >
            ● 32개 보험사
          </span>
        </div>
        <div className="ml-auto flex items-center gap-1.5">
          <div
            className="rounded-md px-2 py-0.5 flex items-center gap-1 text-[10px]"
            style={{ background: MOCKUP.bg2, color: MOCKUP.fg2 }}
          >
            🔍 보험사·상품 검색
          </div>
          <span
            className="px-2 py-0.5 rounded-md text-[10px] font-semibold"
            style={{ background: MOCKUP.fg0, color: "#fff" }}
          >
            즉시 청구
          </span>
        </div>
      </div>

      {/* Quick stats */}
      <div className="grid grid-cols-4 gap-1.5 px-4 pt-2 shrink-0">
        {[
          { label: "오늘 청구", value: "78", sub: "+12 vs 어제", tone: MOCKUP.accent },
          { label: "평균 처리", value: "6분", sub: "전산 접속 포함", tone: "#4aaa6e" },
          { label: "자동 매칭", value: "92%", sub: "서류 자동 입력", tone: "#d8a040" },
          { label: "누적 청구", value: "18,420", sub: "2024년부터", tone: MOCKUP.fg1 },
        ].map((s) => (
          <div key={s.label} className="rounded-lg p-2 border flex items-center justify-between" style={{ background: MOCKUP.bg1, borderColor: MOCKUP.border }}>
            <div>
              <div className="text-[9px] font-semibold uppercase tracking-[0.06em]" style={{ color: MOCKUP.fg2 }}>{s.label}</div>
              <div className="text-[15px] font-extrabold tabular-nums leading-none mt-0.5" style={{ color: s.tone }}>{s.value}</div>
              <div className="text-[8.5px] mt-0.5" style={{ color: MOCKUP.fg3 }}>{s.sub}</div>
            </div>
          </div>
        ))}
      </div>

      {/* Filter tabs */}
      <div className="flex items-center gap-1 px-4 pt-2 shrink-0">
        {FILTER_TABS.map((t) => (
          <span
            key={t.label}
            className="flex items-center gap-1 px-2 py-0.5 rounded-md text-[10px] font-semibold"
            style={{
              background: t.active ? MOCKUP.fg0 : MOCKUP.bg1,
              color: t.active ? "#fff" : MOCKUP.fg1,
              border: `1px solid ${t.active ? MOCKUP.fg0 : MOCKUP.border}`,
            }}
          >
            {t.label} <span className="tabular-nums opacity-70">{t.count}</span>
          </span>
        ))}
        <span className="ml-auto text-[9.5px]" style={{ color: MOCKUP.fg3 }}>
          가나다 · 자주 청구 순 · 내 가입사
        </span>
      </div>

      <div className="flex-1 min-h-0 px-4 pt-2 pb-3 grid grid-cols-12 gap-2">
        {/* LEFT — carrier list with expanded */}
        <div className="col-span-7 flex flex-col gap-2 min-h-0">
          {/* Expanded Samsung card */}
          <div
            className="rounded-xl border overflow-hidden shrink-0"
            style={{ background: MOCKUP.bg1, borderColor: MOCKUP.accent, boxShadow: `0 8px 20px -8px ${MOCKUP.accentRing}` }}
          >
            <div
              className="flex items-center justify-between px-3 py-2"
              style={{
                background: `linear-gradient(135deg, ${MOCKUP.accentSoft}, transparent)`,
                borderBottom: `1px solid ${MOCKUP.border}`,
              }}
            >
              <div className="flex items-center gap-2">
                <div
                  className="w-8 h-8 rounded-md flex items-center justify-center text-[12px] font-extrabold"
                  style={{ background: MOCKUP.fg0, color: "#fff" }}
                >
                  삼성
                </div>
                <div>
                  <div className="text-[12px] font-extrabold" style={{ color: MOCKUP.fg0 }}>삼성화재</div>
                  <div className="flex items-center gap-1 mt-0.5 flex-wrap">
                    {[
                      { t: "손해", c: "#5a8bd8" },
                      { t: "실손 O", c: "#4aaa6e" },
                      { t: "유병자 실손 O", c: "#4aaa6e" },
                      { t: "태아~65세", c: MOCKUP.fg2 },
                    ].map((tag) => (
                      <span
                        key={tag.t}
                        className="px-1.5 py-0.5 rounded text-[8.5px] font-semibold"
                        style={{ background: tag.c + "1f", color: tag.c }}
                      >
                        {tag.t}
                      </span>
                    ))}
                  </div>
                </div>
              </div>
              <span className="text-[10px]" style={{ color: MOCKUP.accent }}>접힘 ▴</span>
            </div>
            <div className="p-2 grid grid-cols-4 gap-1.5">
              {ACTIONS.map((a) => (
                <div
                  key={a.label}
                  className="rounded-md p-2 border text-center cursor-pointer transition-transform"
                  style={{
                    background: a.tone === "accent" ? MOCKUP.accent : MOCKUP.bg0,
                    color: a.tone === "accent" ? "#fff" : MOCKUP.fg1,
                    borderColor: a.tone === "accent" ? MOCKUP.accent : MOCKUP.border,
                    boxShadow: a.tone === "accent" ? "0 4px 10px -4px rgba(91,91,239,0.4)" : "none",
                  }}
                >
                  <div className="text-[14px] leading-none">{a.icon}</div>
                  <div className="text-[9.5px] font-bold mt-1 leading-tight">{a.label}</div>
                  <div className="text-[8px] opacity-80">{a.sub}</div>
                </div>
              ))}
            </div>
            <div
              className="grid grid-cols-4 px-2 pb-2 gap-1.5"
              style={{ borderTop: `1px solid ${MOCKUP.border}`, paddingTop: 8 }}
            >
              {CONTACTS.map((c) => (
                <div
                  key={c.kind}
                  className="rounded-md px-2 py-1 flex items-center gap-1.5 text-[9.5px]"
                  style={{ background: MOCKUP.bg0, border: `1px solid ${MOCKUP.border}` }}
                >
                  <span style={{ color: MOCKUP.fg2 }}>📞</span>
                  <div className="min-w-0 flex-1">
                    <div className="text-[8.5px] leading-none" style={{ color: MOCKUP.fg2 }}>{c.kind}</div>
                    <div className="tabular-nums font-bold leading-tight" style={{ color: MOCKUP.fg0 }}>{c.tel}</div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Collapsed list */}
          <div
            className="rounded-lg border overflow-hidden flex-1 min-h-0 flex flex-col"
            style={{ background: MOCKUP.bg1, borderColor: MOCKUP.border, boxShadow: MOCKUP.shadowSm }}
          >
            {CARRIERS_COLLAPSED.map((c, i) => (
              <div
                key={c.name}
                className="grid grid-cols-12 items-center px-2.5 py-1.5 gap-2"
                style={{ borderTop: i === 0 ? "none" : `1px solid ${MOCKUP.border}` }}
              >
                <div className="col-span-4 flex items-center gap-1.5 min-w-0">
                  <span className="w-5 h-5 rounded flex items-center justify-center text-[9px] font-bold shrink-0" style={{ background: MOCKUP.bg2, color: MOCKUP.fg1 }}>
                    {c.name.slice(0, 2)}
                  </span>
                  <span className="text-[10.5px] font-bold truncate" style={{ color: MOCKUP.fg0 }}>{c.name}</span>
                  <span className="text-[8.5px] px-1 rounded" style={{ background: "rgba(90,139,216,0.14)", color: "#5a8bd8" }}>{c.type}</span>
                </div>
                <div className="col-span-3 text-[9px] tabular-nums" style={{ color: MOCKUP.fg2 }}>
                  CS <span className="font-semibold" style={{ color: MOCKUP.fg1 }}>{c.cs}</span>
                </div>
                <div className="col-span-3 text-[9px] tabular-nums" style={{ color: MOCKUP.fg2 }}>
                  FAX <span className="font-semibold" style={{ color: MOCKUP.fg1 }}>{c.fax}</span>
                </div>
                <div className="col-span-2 flex items-center justify-end gap-1">
                  {["🔐", "📄", "📋"].map((ic, idx) => (
                    <span
                      key={idx}
                      className="w-5 h-5 rounded flex items-center justify-center text-[10px]"
                      style={{ background: MOCKUP.bg2 }}
                    >
                      {ic}
                    </span>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* RIGHT — tools sidebar */}
        <div className="col-span-5 flex flex-col gap-2 min-h-0">
          {/* 보험나이 계산기 */}
          <div className="rounded-lg border p-2.5" style={{ background: MOCKUP.bg1, borderColor: MOCKUP.border, boxShadow: MOCKUP.shadowSm }}>
            <div className="flex items-center justify-between mb-1.5">
              <div className="text-[10px] font-bold uppercase tracking-[0.08em] flex items-center gap-1" style={{ color: MOCKUP.fg1 }}>
                <span>🎂</span> 보험나이 계산기
              </div>
              <span className="text-[8.5px]" style={{ color: MOCKUP.fg3 }}>6개월 기준</span>
            </div>
            <div className="grid grid-cols-[1fr_auto_1fr] items-center gap-1.5">
              <div className="rounded-md px-2 py-1 text-[10px]" style={{ background: MOCKUP.bg0, border: `1px solid ${MOCKUP.border}` }}>
                <div className="text-[8px]" style={{ color: MOCKUP.fg3 }}>생년월일</div>
                <div className="font-bold tabular-nums" style={{ color: MOCKUP.fg0 }}>1994.03.22</div>
              </div>
              <span className="text-[12px]" style={{ color: MOCKUP.fg3 }}>→</span>
              <div className="rounded-md px-2 py-1 text-center" style={{ background: MOCKUP.accentSoft }}>
                <div className="text-[8px]" style={{ color: MOCKUP.accent }}>보험나이</div>
                <div className="text-[16px] font-extrabold tabular-nums leading-none" style={{ color: MOCKUP.accent }}>
                  32<span className="text-[9px] font-semibold">세</span>
                </div>
              </div>
            </div>
          </div>

          {/* 실손 수령액 계산기 */}
          <div className="rounded-lg border p-2.5" style={{ background: MOCKUP.bg1, borderColor: MOCKUP.border, boxShadow: MOCKUP.shadowSm }}>
            <div className="flex items-center justify-between mb-1.5">
              <div className="text-[10px] font-bold uppercase tracking-[0.08em] flex items-center gap-1" style={{ color: MOCKUP.fg1 }}>
                <span>💊</span> 실손 예상 수령액
              </div>
              <span className="text-[8.5px]" style={{ color: MOCKUP.fg3 }}>4세대 · 통원</span>
            </div>
            <div className="space-y-1">
              {[
                { l: "급여 (의원)", cost: "45,000원", pay: "36,000원" },
                { l: "비급여 (도수)", cost: "80,000원", pay: "35,000원" },
              ].map((r) => (
                <div key={r.l} className="grid grid-cols-12 items-center gap-1 text-[9.5px]">
                  <div className="col-span-5 truncate" style={{ color: MOCKUP.fg1 }}>{r.l}</div>
                  <div className="col-span-3 text-right tabular-nums" style={{ color: MOCKUP.fg3 }}>{r.cost}</div>
                  <div className="col-span-1 text-center" style={{ color: MOCKUP.fg3 }}>→</div>
                  <div className="col-span-3 text-right tabular-nums font-bold" style={{ color: "#4aaa6e" }}>{r.pay}</div>
                </div>
              ))}
              <div className="pt-1 mt-1 border-t grid grid-cols-12 gap-1 text-[10px]" style={{ borderColor: MOCKUP.border }}>
                <div className="col-span-5 font-bold" style={{ color: MOCKUP.fg0 }}>예상 수령</div>
                <div className="col-span-3 text-right tabular-nums line-through" style={{ color: MOCKUP.fg3 }}>125,000원</div>
                <div className="col-span-1" />
                <div className="col-span-3 text-right tabular-nums font-extrabold" style={{ color: "#4aaa6e" }}>71,000원</div>
              </div>
            </div>
          </div>

          {/* Tool shortcuts */}
          <div className="grid grid-cols-2 gap-1.5 flex-1 min-h-0">
            {[
              { label: "상급종합 병원", sub: "45개 · 지도", icon: "🏥", tone: "#d96a97" },
              { label: "요양 병원", sub: "1,420개", icon: "🛏", tone: "#5a8bd8" },
              { label: "종수술 분류표", sub: "1~7종", icon: "🔪", tone: "#8577d1" },
              { label: "실손 변천사", sub: "1~4세대", icon: "📈", tone: "#4aaa6e" },
            ].map((t) => (
              <div
                key={t.label}
                className="rounded-lg border p-2 flex items-center gap-2 cursor-pointer"
                style={{ background: MOCKUP.bg1, borderColor: MOCKUP.border, boxShadow: MOCKUP.shadowSm }}
              >
                <span
                  className="w-7 h-7 rounded-md flex items-center justify-center text-[13px] shrink-0"
                  style={{ background: t.tone + "1f", color: t.tone }}
                >
                  {t.icon}
                </span>
                <div className="min-w-0 flex-1">
                  <div className="text-[10px] font-bold truncate" style={{ color: MOCKUP.fg0 }}>{t.label}</div>
                  <div className="text-[8.5px] truncate" style={{ color: MOCKUP.fg2 }}>{t.sub}</div>
                </div>
                <span className="text-[10px]" style={{ color: MOCKUP.fg3 }}>›</span>
              </div>
            ))}
          </div>

          {/* Inline CTA */}
          <div
            className="rounded-lg px-3 py-2 flex items-center justify-between shrink-0 cursor-pointer"
            style={{
              background: `linear-gradient(135deg, ${MOCKUP.accent}, #4747d6)`,
              color: "#fff",
              boxShadow: "0 4px 12px -2px rgba(91,91,239,0.4)",
            }}
          >
            <div>
              <div className="text-[10px] font-bold">AI 서류 자동 입력</div>
              <div className="text-[8.5px] opacity-85">보험사 양식 · 92% 매칭</div>
            </div>
            <span className="text-[14px]">→</span>
          </div>
        </div>
      </div>
    </div>
  );
}
