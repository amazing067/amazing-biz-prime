# 영업자료실 — 개인화 전단지 PDF (진행 메모)

## 목표
회원전용 라운지 > 영업자료실. 심의받은 PDF 전단지의 빈 두 박스에
회원별 고정정보(이름·직책·전화·협회등록번호)와 전단지별 심의정보(심의필번호·유효기간)를
서버에서 벡터 텍스트로 오버레이 → 미리보기 + PDF 다운로드.

## 확정 사항
- 심의필번호·유효기간 = **전단지(자료)별** 속성 (data/flyers.ts)
- 이름·직책·전화·협회등록번호 = **회원 고정정보** (회원 직접 1회 입력)
- 출력 = 브라우저 미리보기 + PDF 다운로드
- 생성 = pdf-lib 서버 오버레이 + Pretendard 임베드(**subset:false** — CJK subset 버그)
- 숫자 하이픈은 **U+2011**로 치환(ASCII 하이픈 sidebearing 벌어짐)

## 좌표(확정, A4 596x842, origin bottom-left)
- 상담문의: x=160, baseline y=173, size=27, Bold navy, `{이름} {직책}  {전화}`
- 푸터 블록: start y=117, gap=12.2, centered. 회사줄(9 SemiBold blue) → 변수줄(8 Medium) →
  "본 광고는…"(8 Bold red) → 면책 6줄(7.5 Medium, 일부 red)

## 작업 체크리스트
- [x] pdf-lib 오버레이 POC + 좌표/폰트/하이픈 확정 (scripts/_flyergen.mjs)
- [ ] lib/flyer/generate.ts (서버 생성 모듈)
- [ ] data/flyers.ts (전단지 레지스트리)
- [ ] app/api/resources/flyer/route.ts (PDF 생성 API)
- [ ] app/member/resources/page.tsx (목록)
- [ ] app/member/resources/[id]/page.tsx (광고정보 폼 + 미리보기 + 다운로드)
- [ ] 라운지 "영업 자료실" 카드 href 연결 + comingSoon 해제
- [ ] 회원 광고정보 저장: v1 localStorage (추후 Supabase 이관)
- [ ] 임시 스크립트(scripts/_*.mjs)·임시 패키지(canvas, pdfjs-dist) 정리

## 미정/확인 필요
- 전단지별 실제 심의필번호·유효기간 값 (현재 포맷2 샘플값 사용)
- 회원정보 저장 위치: SSO(amazing-biz-server) 계정과 Supabase 키 일치 여부 → 우선 localStorage
- PRIME ASSET 로고 이미지(현재 텍스트만)
