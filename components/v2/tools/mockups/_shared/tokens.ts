// Design tokens extracted from amazing-biz-server workspace mockups.
// Use as inline values via `style={{ color: TOOL_COLOR.insurance }}` etc.

export const TOOL_COLOR = {
  insurance: "#8577d1",   // 보험조회 퍼플
  medical: "#d96a97",     // 진료내역 핑크
  comparison: "#5a8bd8",  // 보장비교 블루
  disclosure: "#d8a040",  // 고지의무 앰버
  consulting: "#4aaa6e",  // 보장상담 그린
  coaching: "#39a2b8",    // 세일즈코칭 사이안
} as const;

export const MOCKUP = {
  accent: "#5b5bef",
  accentSoft: "rgba(91,91,239,0.10)",
  accentRing: "rgba(91,91,239,0.22)",

  bg0: "#f5f5fa",
  bg1: "#ffffff",
  bg2: "#eceef4",
  bg3: "#dfe1ea",

  fg0: "#0a0a14",
  fg1: "#3a3a48",
  fg2: "#6e6e80",
  fg3: "#a8a8b8",

  border: "rgba(20,20,40,0.12)",
  borderStrong: "rgba(20,20,40,0.18)",

  shadowSm: "0 1px 2px rgba(20,20,40,0.06), 0 0 0 1px rgba(20,20,40,0.05)",
  shadowMd: "0 8px 24px -8px rgba(20,20,40,0.12), 0 0 0 1px rgba(20,20,40,0.06)",
} as const;
