// Nav(데스크톱 상단)와 ActionBar(모바일 하단)가 같은 목록을 쓰도록 한 곳에서 관리한다.
export const NAV_LINKS: [string, string][] = [
  ["핵심 서비스", "#pillars"],
  ["입사 10일", "#process"],
  ["시스템 전체", "#tools"],
  ["회사 지원", "#benefits"],
  ["승격 단계", "#career"],
  ["자주 묻는 질문", "#faq"],
];

// 배경이 어두워 상단 Nav 글자가 묻히는 섹션. 각 섹션이 인라인 style로
// --bg-1 을 어둡게 재정의하는 곳들과 일치해야 한다.
export const DARK_SECTION_IDS = ["pillars", "training", "apply"];
