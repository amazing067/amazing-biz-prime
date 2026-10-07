# Codex 에게 — 홈 개편 최종 검수 (2026-10-07, 한 번만)

새 첫 화면이 `app/page.tsx`(→ `components/home-2026/*`)로 들어갔다. 운영 반영 전 마지막 검수다.
**파일을 고치지 마라. 문제만 적어라.** git 상태 변경·패키지 설치 금지. 결과는 `docs/redesign-2026-10/CODEX_FINAL_REVIEW_RESULT.md` 에 한국어로.

## 볼 것
- 화면: `http://localhost:7777/` (개발 서버가 떠 있다. PC 1440 과 휴대폰 390·360 둘 다), `/amazing`, `/support/business-card`, `/support/badge`
- 코드: `app/page.tsx`, `components/home-2026/*`, `app/globals.css`(overflow-x 를 clip 으로 바꿈), `app/layout.tsx`(검색 설명 2곳),
  `public/llms.txt`, `components/AmazingDivisionSection.tsx`, `app/support/badge/page.tsx`, `app/support/business-card/page.tsx`
- 기준 문서: `docs/redesign-2026-10/BRIEF.md`, 지난 검수 `CODEX_AI_TELL_REVIEW.md`(반영됨)

## 확정 사실 (이것과 다르면 지적)
- 본부는 **067·290 두 곳**(292 는 2026-09-01 다른 사업부로 이동). 374·378 은 서버상 어메이징 소속이라 명함·배지 양식에 남긴다.
- 보메이트 = **어메이징사업부 소속 개발자가 직접 만들고 운영**(사장님 지시: 외부 프로그램처럼 보이면 안 됨).
- 고객 간편인증은 **기관 3곳(건보공단·심평원·홈택스)을 각각 승인**한다. 「한 번 인증」 금지.
- 「무상 제공·무료·0원」 금지(9/19 부터 내부 회원은 베이직 금액으로 프로). 출처 없는 비율·성약률·「업계 상위권」 금지.
- 승격 조건·지급률은 2026 영업규정집 기준(각주 있음).

## 검사 항목
1. **P0 (운영에 올리면 안 되는 것)**: 사실과 다른 문구, 깨지는 화면·가로 넘침, 지원서가 안 보내지거나 `/api/send-recruit` 의 봇 방어 전제(허니팟 `website`·보내는 값 모양)가 `components/v2/Apply.tsx` 와 달라진 것, 검색엔진 설명 오류, 보험 광고 금지어(보험사·상품명·과장·화폐기호)
2. **P1**: 글자 대비 4.5:1 미만, 터치 44px 미만, 키보드 초점 안 보임, 줄표(—·–) 화면 노출, 이유 없는 모션, `prefers-reduced-motion` 에서 내용이 안 보이는 곳, h1 이 2개 이상
3. **P2**: 나머지 다듬을 점(짧게)

형식: 항목마다 **등급 · 파일:줄 · 무엇이 문제 · 어떻게 고치면 되는지(그대로 붙일 수 있게)**. 지어낸 반례 말고 실제 화면·코드에서 확인한 것만.
마지막 줄에 「P0 n건 · P1 n건 · P2 n건」.
