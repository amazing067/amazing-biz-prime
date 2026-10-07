# 홈 개편 최종 검수 결과

## P0

1. **P0 · `components/AmazingDivisionSection.tsx:97,107` · `/amazing`의 두 본부장 소개가 제휴사를 `33개`라고 적어 확정 사실인 생보 19곳+손보 13곳=`32개`와 다르고, `대한민국에서 가장 신뢰받는`, `가장 확실한 수단`, `가장 최적화된`처럼 근거 없는 최상급 표현도 화면에 노출된다. · 97행의 핵심 두 문장을 `저희 어메이징사업부는 생명보험 19곳과 손해보험 13곳, 총 32개 제휴사의 상품을 비교하여 고객 상황에 필요한 보장을 신중하게 제안합니다.`와 `신뢰할 수 있는 보험 전문 조직으로서, 언제나 한결같은 마음으로 고객 곁을 지킬 것을 약속드립니다.`로 바꾸고, 107행의 해당 문장은 `보험은 불확실한 미래에 대비하는 여러 수단 중 하나입니다.`와 `저희 어메이징사업부는 생명보험 19곳과 손해보험 13곳, 총 32개 제휴사의 상품을 비교하여 고객 상황에 맞는 선택지를 검토합니다.`로 바꾼다.**

2. **P0 · `public/llms.txt:35` · 검색·인용용 공개 문서에 금지 문구인 `유·무상인지`가 남아 있어 `무상` 제공 여부를 다시 노출한다. · `그 도구가 유·무상인지`를 `그 도구의 이용 조건과 비용 기준이 명확한지`로 바꾼다.**

## P1

1. **P1 · `components/home-2026/ApplyForm.tsx:42` · 지원 폼 전화번호 placeholder `#7a878b`와 입력 배경 `#fbfcfb`의 대비가 약 3.60:1로 4.5:1에 못 미친다. · `placeholder:text-[#7a878b]`를 `placeholder:text-[var(--sa-dim)]`로 바꾼다.**

2. **P1 · `app/support/business-card/page.tsx:182,247,265,285,301,495` · `app/support/badge/page.tsx:166,179,272,300,322` · 두 지원 페이지의 placeholder가 브라우저 계산값 `rgb(156,163,175)`로 표시되어 흰 배경 대비가 약 2.54:1이다. · 나열한 입력·textarea의 className에 `placeholder:text-slate-600`을 추가한다.**

3. **P1 · `components/home-2026/Footer.tsx:25-34` · 390px와 360px에서 메일·전화·카카오·포털 링크의 실제 터치 높이가 21px뿐이다. · 각 링크 className을 `flex min-h-11 items-center hover:text-[var(--sa-ink)]`로 바꾼다.**

4. **P1 · `components/Header.tsx:127-132` · `components/AmazingDivisionSection.tsx:185-197` · `/amazing`의 모바일 메뉴 버튼은 24×24px, 본부 선택 버튼은 40~42px로 44px 기준보다 작다. · 메뉴 버튼 className을 `grid h-11 w-11 place-items-center rounded-full lg:hidden text-slate-700`로 바꾸고, 본부 선택 버튼 className에는 `min-h-11`을 추가한다.**

5. **P1 · `app/support/business-card/page.tsx:500-525` · `app/support/badge/page.tsx:282-290,358-365` · 계산서·입금 상태 라디오의 label 터치 높이가 24px이고 명찰 페이지의 `찾는법` 링크는 16px뿐이다. · 라디오 label마다 `min-h-11 py-2`를 추가하고, `찾는법` 링크에는 `min-h-11 items-center`를 추가한다.**

6. **P1 · `app/support/badge/page.tsx:331-342` · 명찰 디자인 라디오는 `sr-only`인데 카드 label에 키보드 초점 스타일이 없어 Tab으로 이동해도 현재 초점이 보이지 않는다. · 두 label className에 `has-[:focus-visible]:ring-2 has-[:focus-visible]:ring-electric-blue has-[:focus-visible]:ring-offset-2`를 추가한다.**

7. **P1 · `app/support/business-card/page.tsx:502,506,531` · `app/support/badge/page.tsx:338,348` · 실제 화면에 금지된 줄표 `—`가 가격·입금 안내에 다섯 번 노출된다. · 각각 `계산서 미발행 · 22,000원`, `계산서 발행 · 24,200원 (10% 부가세 포함)`, `(계산서 발행) 국민 64930104107037 조유진 · 10% 부가세 포함`, `1안 · 12,000원`, `2안 · 10,000원`으로 바꾼다.**

8. **P1 · `components/home-2026/Join.tsx:29-32,68-70` · 10·32·74라는 정적 사실을 스크롤 진입 때마다 0부터 세는 모션은 정보 변화와 관계없는 장식 모션이다. · 68~70행을 `<dt className={...}>{f.n}<span className="ml-1 text-[0.4em] font-bold text-[var(--sa-ink)]">{f.u}</span></dt>`로 바꾸고 `CountWhenSeen`, `useRef`, `useInView`, `CountUp`을 삭제한다.**

## P2

1. **P2 · `components/AmazingDivisionSection.tsx:126-128` · `/amazing`에는 h1이 하나도 없고 페이지 제목인 `어메이징 사업부`가 h2부터 시작한다. · 여는 `<h2 ...>`와 닫는 `</h2>`를 각각 `<h1 ...>`과 `</h1>`로 바꾼다.**

2. **P2 · `components/AmazingDivisionSection.tsx:76,130` · 기준 문서에서 금지한 `AI` 표현과 영어 구호 `System makes Money.`가 `/amazing`의 영업지원시스템 탭과 첫 화면에 그대로 노출된다. · 76행을 `{ title: "상담 질문방", description: "고객 상담 질문 지원" },`로 바꾸고 130행을 `상담을 돕는 영업 지원 시스템`으로 바꾼다.**

P0 2건 · P1 8건 · P2 2건
