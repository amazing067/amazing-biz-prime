# Codex 에게 — 새 홈 「휴대폰 속 실제 보메이트 화면 영상」 검토 (2026-10-08, 한 번만)

**아무것도 고치지 마라.** 결과는 `docs/redesign-2026-10/CODEX_REAL_SCREENS_RESULT.md` 에 한국어로. git·파일 변경 금지.

사장님 지시: 「휴대폰 속 화면이 그린 흉내라 실제로 쓰는 화면보다 못하다 → 실제 화면 돌아가는 영상으로」, 「AI 티 안 나게 Codex 랑 연계」.

바꾼 것
- `components/home-2026/Screens.tsx`: 그린 화면 5종 삭제 → `public/videos/home/bomate-{send,customer,data,analysis,report}.mp4`(+같은 이름 .jpg 첫 장면) 재생.
  단계별 영상 길이 CLIP_SECONDS, 상태 표시줄 색 CLIP_TOP, 화면 밖이면 일시정지(IntersectionObserver), 움직임 줄이기면 재생 안 함(첫 장면만).
- `components/home-2026/Hero.tsx`: 고정 시간 넘김 → 영상이 끝나면 다음 단계(onEnded), 재생이 막힌 기기용으로 길이+2초 타이머.
- `components/home-2026/Demo.tsx`: 고객 휴대폰 dark 틀 제거.
- 영상 출처: 로컬 보메이트 실제 화면을 예시 계정(「예시 설계사」)·데모 예시 데이터(「예시 고객」, 병원 OO 표기)로 녹화. 고객 인증은 서버 응답만 흉내(실제 인증 요청 없음).
  실제 앱 문구 중 「간편인증/본인 확인 **한 번**으로」 한 줄은 홈 사실(기관 3곳 각각 승인)과 어긋나 녹화 때 감춤.

볼 것 (실제 근거로만, 지어낸 반례 금지)
- P0/P1: 영상이 안 나오거나 단계가 멈추는 경로(iOS 사파리 자동재생·절전 모드·onEnded 와 타이머 이중 넘김·AnimatePresence 키로 영상 재마운트·IntersectionObserver 와 autoPlay 충돌·loop=false 인데 화면 밖 일시정지 후 onEnded 안 옴),
  레이아웃 깨짐(상태 표시줄 -mt-[46px] 덮개, object-cover object-top), 접근성(aria-label·움직임 줄이기), 성능(동시 재생 영상 수·preload=auto 로 첫 화면 데이터량 — 영상 합계 약 3.2MB).
- 내용 위험: 화면 속 글자 중 보험 광고 심의(보험회사명·상품명·과장·화폐기호)나 개인정보로 문제 될 만한 것(영상은 직접 못 보니 `_시안_확인용/5_실제화면영상/*.png` 캡처와 위 설명으로 판단).
- P2 짧게. 형식: 등급 · 파일:줄 · 문제 · 고치는 법. 마지막 줄 「P0 n · P1 n · P2 n」.
