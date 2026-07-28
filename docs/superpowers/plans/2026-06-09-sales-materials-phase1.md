# 영업 자료실 (Phase 1) Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** 어메이징사업부 업무도구(amazing-biz-server)에 "영업 자료실"을 추가해, 관리자가 심의받은 빈 전단지 PDF를 업로드(+심의필번호·유효기간)하고 회원이 본인 광고정보를 넣어 개인화 PDF를 미리보기·다운로드한다.

**Architecture:** 단일 백엔드(amazing-biz-server). Express+pg 라우트 `/api/resources/*`, PDF는 server에서 pdf-lib로 벡터 오버레이(prime v1 `generate.ts` 이식 + 로고·fit-to-box·심의필 확대). React+Vite frontend `features/salesMaterials`에 목록·상세·업로드 모달, react-router `/app/sales-materials`, Sidebar 메뉴. 인증은 기존 `requireAuth`/`requireRole(ROLES.AMAZING)`.

**Tech Stack:** Node 24, Express, PostgreSQL(pg), JWT, multer, pdf-lib, @pdf-lib/fontkit, Pretendard, React 18 + Vite + react-router-dom, lucide-react.

**작업 레포:** 모든 경로는 `C:\Users\ok\amazing-biz-server` 기준. (별도 표기 없으면 이 레포)
**참조 원본:** prime `C:\Users\ok\amazing-biz-prime\lib\flyer\generate.ts`, `public\전단지 포맷.pdf`, `public\prime-logo.png`, `assets\fonts\Pretendard-*.ttf`.

---

## File Structure

**Backend (amazing-biz-server)**
- `db/migrations/20260609_flyer_resources.sql` — 신규: `flyers` 테이블 + `users` 광고 4필드
- `scripts/run-flyer-migration.js` — 신규: 위 마이그레이션 실행기
- `src/services/flyerGenerator.js` — 신규: PDF 오버레이 생성(순수 헬퍼 + 생성 함수)
- `src/services/flyerGenerator.test.js` — 신규: 순수 헬퍼 단위 테스트(node:test)
- `src/routes/resources.js` — 신규: ad-profile·flyers·render·preview 라우트
- `src/server.js` — 수정: 라우트 등록
- `assets/fonts/Pretendard-{Medium,SemiBold,Bold}.ttf` — 신규(prime에서 복사)
- `assets/prime-logo.png` — 신규(prime에서 복사)
- `pdf-fixtures/flyer-blank.pdf` — 신규(prime 빈 전단지 복사, 테스트용)
- `uploads/flyers/` — 런타임 생성(업로드 저장)

**Frontend (amazing-biz-server/frontend)**
- `src/features/salesMaterials/types.ts` — 신규
- `src/features/salesMaterials/salesMaterialsApi.ts` — 신규(JSON: apiClient / PDF: raw fetch blob)
- `src/features/salesMaterials/SalesMaterialsListPage.tsx` — 신규
- `src/features/salesMaterials/UploadFlyerModal.tsx` — 신규
- `src/features/salesMaterials/SalesMaterialDetailPage.tsx` — 신규
- `src/features/salesMaterials/salesMaterials.css` — 신규
- `src/routes/index.tsx` — 수정(import + route 2개)
- `src/ui/Sidebar.tsx` — 수정(아이콘 import + 메뉴 1줄)

---

## Task 1: 서버 의존성 설치 + 폰트/로고 자산 복사

**Files:**
- Modify: `package.json` (npm install)
- Create: `assets/fonts/Pretendard-Medium.ttf`, `assets/fonts/Pretendard-SemiBold.ttf`, `assets/fonts/Pretendard-Bold.ttf`
- Create: `assets/prime-logo.png`
- Create: `pdf-fixtures/flyer-blank.pdf`

- [ ] **Step 1: pdf-lib + fontkit 설치**

Run (in `C:\Users\ok\amazing-biz-server`):
```powershell
npm install pdf-lib @pdf-lib/fontkit
```
Expected: package.json dependencies에 `pdf-lib`, `@pdf-lib/fontkit` 추가, 에러 없음.

- [ ] **Step 2: 폰트·로고·샘플 PDF 복사 (PowerShell)**

```powershell
New-Item -ItemType Directory -Force "C:\Users\ok\amazing-biz-server\assets\fonts" | Out-Null
Copy-Item "C:\Users\ok\amazing-biz-prime\assets\fonts\Pretendard-Medium.ttf"   "C:\Users\ok\amazing-biz-server\assets\fonts\"
Copy-Item "C:\Users\ok\amazing-biz-prime\assets\fonts\Pretendard-SemiBold.ttf" "C:\Users\ok\amazing-biz-server\assets\fonts\"
Copy-Item "C:\Users\ok\amazing-biz-prime\assets\fonts\Pretendard-Bold.ttf"     "C:\Users\ok\amazing-biz-server\assets\fonts\"
Copy-Item "C:\Users\ok\amazing-biz-prime\public\prime-logo.png" "C:\Users\ok\amazing-biz-server\assets\prime-logo.png"
New-Item -ItemType Directory -Force "C:\Users\ok\amazing-biz-server\pdf-fixtures" | Out-Null
Copy-Item "C:\Users\ok\amazing-biz-prime\public\전단지 포맷.pdf" "C:\Users\ok\amazing-biz-server\pdf-fixtures\flyer-blank.pdf"
```

- [ ] **Step 3: 자산 존재 확인**

```powershell
Get-ChildItem "C:\Users\ok\amazing-biz-server\assets\fonts","C:\Users\ok\amazing-biz-server\assets\prime-logo.png","C:\Users\ok\amazing-biz-server\pdf-fixtures\flyer-blank.pdf" | Select-Object FullName,Length
```
Expected: 폰트 3개(각 수백 KB~MB), prime-logo.png, flyer-blank.pdf 모두 존재.

- [ ] **Step 4: Commit**

```powershell
git add package.json package-lock.json assets pdf-fixtures
git commit -m "chore(resources): add pdf-lib/fontkit deps + Pretendard fonts, logo, blank fixture"
```

---

## Task 2: DB 마이그레이션 (flyers 테이블 + users 광고 4필드)

**Files:**
- Create: `db/migrations/20260609_flyer_resources.sql`
- Create: `scripts/run-flyer-migration.js`

- [ ] **Step 1: 마이그레이션 SQL 작성**

Create `db/migrations/20260609_flyer_resources.sql`:
```sql
-- 2026-06-09 영업 자료실(Phase 1)
-- flyers: 관리자가 업로드한 심의받은 빈 전단지 메타.
-- users 광고 4필드: 회원이 전단지에 넣는 표기정보(회원 프로필 full_name/phone과 독립).
-- 재실행 안전(idempotent): IF NOT EXISTS.

BEGIN;

ALTER TABLE users
  ADD COLUMN IF NOT EXISTS ad_name         VARCHAR(60),
  ADD COLUMN IF NOT EXISTS ad_position     VARCHAR(60),
  ADD COLUMN IF NOT EXISTS ad_phone        VARCHAR(40),
  ADD COLUMN IF NOT EXISTS ad_registration VARCHAR(40);

COMMENT ON COLUMN users.ad_name         IS '영업자료실 광고 표기용 이름(미입력 시 full_name fallback)';
COMMENT ON COLUMN users.ad_position     IS '영업자료실 광고 표기용 직책';
COMMENT ON COLUMN users.ad_phone        IS '영업자료실 광고 표기용 전화(미입력 시 phone fallback)';
COMMENT ON COLUMN users.ad_registration IS '손·생보 협회 등록번호';

CREATE TABLE IF NOT EXISTS flyers (
  id            SERIAL PRIMARY KEY,
  slug          VARCHAR(60) UNIQUE NOT NULL,
  title         VARCHAR(200) NOT NULL,
  subtitle      VARCHAR(300),
  category      VARCHAR(60),
  review_number VARCHAR(60),
  review_start  VARCHAR(20),
  review_end    VARCHAR(20),
  pdf_filename  VARCHAR(255) NOT NULL,
  created_by    INTEGER REFERENCES users(id),
  created_at    TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

CREATE INDEX IF NOT EXISTS flyers_created_at_idx ON flyers (created_at DESC);

COMMIT;
```

- [ ] **Step 2: 마이그레이션 실행기 작성**

Create `scripts/run-flyer-migration.js` (기존 `run-migration.js` 패턴):
```js
const { Pool } = require('pg');
const fs = require('fs');
const path = require('path');
require('dotenv').config();

const pool = new Pool({
  user: process.env.DB_USER,
  host: process.env.DB_HOST,
  database: process.env.DB_NAME,
  password: process.env.DB_PASSWORD,
  port: process.env.DB_PORT,
});

(async () => {
  let client;
  try {
    client = await pool.connect();
    const file = path.join(__dirname, '..', 'db', 'migrations', '20260609_flyer_resources.sql');
    const sql = fs.readFileSync(file, 'utf8');
    await client.query(sql); // 파일 내부에 BEGIN/COMMIT 포함
    console.log('✅ flyer_resources 마이그레이션 완료');
  } catch (e) {
    console.error('❌ 마이그레이션 실패:', e.message);
    process.exitCode = 1;
  } finally {
    if (client) client.release();
    await pool.end();
  }
})();
```

- [ ] **Step 3: 로컬 DB에 실행**

Run:
```powershell
node scripts/run-flyer-migration.js
```
Expected: `✅ flyer_resources 마이그레이션 완료`. (DB env가 로컬을 가리켜야 함. `.env` 확인)

- [ ] **Step 4: 스키마 확인**

```powershell
node -e "const p=require('./src/config/db');p.query(\"select column_name from information_schema.columns where table_name='users' and column_name like 'ad_%' order by 1\").then(r=>{console.log('ad cols:',r.rows.map(x=>x.column_name).join(','));return p.query(\"select to_regclass('public.flyers') as t\")}).then(r=>{console.log('flyers table:',r.rows[0].t);process.exit(0)}).catch(e=>{console.error(e.message);process.exit(1)})"
```
Expected: `ad cols: ad_name,ad_phone,ad_position,ad_registration` 그리고 `flyers table: flyers`.

- [ ] **Step 5: Commit**

```powershell
git add db/migrations/20260609_flyer_resources.sql scripts/run-flyer-migration.js
git commit -m "feat(resources): flyers table + users ad_* columns migration"
```

> **프로덕션 적용 안내(사용자):** 동일하게 프로덕션 DB env로 `node scripts/run-flyer-migration.js` 1회 실행 필요. (배포 시점에 안내)

---

## Task 3: PDF 생성 모듈 (generate.ts 이식 + 로고·fit-to-box·심의필 확대)

**Files:**
- Create: `src/services/flyerGenerator.js`
- Test: `src/services/flyerGenerator.test.js`

- [ ] **Step 1: 순수 헬퍼 단위 테스트 작성 (실패하는 테스트)**

Create `src/services/flyerGenerator.test.js`:
```js
const { test } = require('node:test');
const assert = require('node:assert');
const { tightHy, computeConsultSize, computeFooterSize } = require('./flyerGenerator');

test('tightHy: ASCII 하이픈을 U+2011로 치환', () => {
  assert.strictEqual(tightHy('010-2250-6507'), '010‑2250‑6507');
});

test('computeConsultSize: 좁은 박스면 size를 줄인다', () => {
  // 가짜 측정기: 글자수 * size * 0.5
  const measure = (t, s) => t.length * s * 0.5;
  const big = computeConsultSize('홍', '팀장', '010-0-0', measure, { maxW: 1000, max: 30, min: 18 });
  const small = computeConsultSize('홍', '팀장', '010-0-0', measure, { maxW: 60, max: 30, min: 18 });
  assert.strictEqual(big, 30);
  assert.ok(small < 30 && small >= 18);
});

test('computeFooterSize: 넘치면 8까지 줄이고 그 이하로는 안 내려간다', () => {
  const measure = (t, s) => t.length * s * 0.5;
  const r = computeFooterSize('x'.repeat(200), measure, { maxW: 100, max: 9, min: 8 });
  assert.strictEqual(r, 8);
});
```

- [ ] **Step 2: 테스트 실행해 실패 확인**

Run:
```powershell
node --test src/services/flyerGenerator.test.js
```
Expected: FAIL — `Cannot find module './flyerGenerator'` 또는 export 없음.

- [ ] **Step 3: 생성 모듈 구현**

Create `src/services/flyerGenerator.js`:
```js
'use strict';
const fs = require('fs');
const path = require('path');
const { PDFDocument, rgb } = require('pdf-lib');
const fontkit = require('@pdf-lib/fontkit');

const COMPANY = '프라임에셋';
const AGENCY_REG = '2009058101'; // 프라임에셋 보험대리점 등록번호(회사 고정)
const PAGE_W = 596;

const COLORS = {
  navy: rgb(0.07, 0.15, 0.42),
  black: rgb(0.1, 0.1, 0.12),
  red: rgb(0.83, 0.14, 0.14),
  blue: rgb(0.12, 0.25, 0.7),
  gray: rgb(0.3, 0.32, 0.36),
};

// 상담문의 박스(흰 영역) — 미리보기로 보정 가능
const CONSULT = { x: 160, y: 173, maxW: 400, max: 30, min: 18 };
// 로고 — 미리보기로 보정. 푸터 위 좌측 기본값
const LOGO = { x: 40, y: 150, height: 22 };

// Pretendard ASCII 하이픈은 sidebearing이 넓어 숫자에서 벌어짐 → U+2011
const tightHy = (s) => String(s).replace(/-/g, '‑');

// 박스 가용폭에 맞는 최대 size를 탐색(상담문의)
function computeConsultSize(name, position, phone, measure, opts = {}) {
  const { maxW = CONSULT.maxW, max = CONSULT.max, min = CONSULT.min } = opts;
  const label = `${name} ${position}  `;
  for (let s = max; s >= min; s -= 0.5) {
    const w = measure(label, s) + measure(tightHy(phone), s);
    if (w <= maxW) return s;
  }
  return min;
}

// 폭에 맞는 최대 size(푸터 변수줄)
function computeFooterSize(text, measure, opts = {}) {
  const { maxW = 560, max = 9, min = 8 } = opts;
  for (let s = max; s >= min; s -= 0.25) {
    if (measure(text, s) <= maxW) return s;
  }
  return min;
}

function loadFont(file) {
  return fs.readFileSync(path.join(__dirname, '..', '..', 'assets', 'fonts', file));
}
let _fontCache = null;
function fonts() {
  if (!_fontCache) {
    _fontCache = {
      medium: loadFont('Pretendard-Medium.ttf'),
      semi: loadFont('Pretendard-SemiBold.ttf'),
      bold: loadFont('Pretendard-Bold.ttf'),
    };
  }
  return _fontCache;
}
let _logoCache = null;
function logoBytes() {
  if (_logoCache === null) {
    const p = path.join(__dirname, '..', '..', 'assets', 'prime-logo.png');
    _logoCache = fs.existsSync(p) ? fs.readFileSync(p) : false;
  }
  return _logoCache;
}

/**
 * @param {{review_number,review_start,review_end}} flyer
 * @param {{name,position,phone,registration}} member
 * @param {Buffer|Uint8Array} pdfBytes  빈 전단지 PDF 바이트
 * @returns {Promise<Uint8Array>}
 */
async function generatePersonalizedFlyer(flyer, member, pdfBytes) {
  const doc = await PDFDocument.load(pdfBytes);
  doc.registerFontkit(fontkit);

  const f = fonts();
  // subset:false — pdf-lib subsetter가 CJK 글리프를 깨뜨림
  const fMedium = await doc.embedFont(f.medium, { subset: false });
  const fSemi = await doc.embedFont(f.semi, { subset: false });
  const fBold = await doc.embedFont(f.bold, { subset: false });

  const page = doc.getPage(0);
  const centeredX = (font, text, size) => (PAGE_W - font.widthOfTextAtSize(text, size)) / 2;
  const measureBold = (t, s) => fBold.widthOfTextAtSize(t, s);

  // ---- 로고 ----
  const lb = logoBytes();
  if (lb) {
    try {
      const img = await doc.embedPng(lb);
      const scale = LOGO.height / img.height;
      page.drawImage(img, { x: LOGO.x, y: LOGO.y, width: img.width * scale, height: LOGO.height });
    } catch (_) { /* 로고 임베드 실패는 무시 */ }
  }

  // ---- 상담문의(fit-to-box) ----
  const consultText = `${member.name} ${member.position}`;
  const size = computeConsultSize(member.name, member.position, member.phone, measureBold);
  let cx = CONSULT.x;
  page.drawText(consultText, { x: cx, y: CONSULT.y, size, font: fBold, color: COLORS.navy });
  cx += fBold.widthOfTextAtSize(consultText + '  ', size);
  page.drawText(tightHy(member.phone), { x: cx, y: CONSULT.y, size, font: fBold, color: COLORS.navy });

  // ---- 푸터 ----
  const period = `${flyer.review_start}~${flyer.review_end}`;
  const varLine = `설계사 ${member.name} (손·생보 협회 등록번호 ${member.registration}) / ${COMPANY} 심의필 제 ${tightHy(flyer.review_number)}호(${period})`;
  const varSize = computeFooterSize(varLine, (t, s) => fMedium.widthOfTextAtSize(t, s));
  const lines = [
    { t: `${COMPANY}   보험대리점 등록번호 제 ${AGENCY_REG}호`, s: 9, f: fSemi, c: COLORS.blue },
    { t: varLine, s: varSize, f: fMedium, c: COLORS.black },
    { t: `본 광고는 광고심의기준을 준수하였으며, 유효기간은 심의일로부터 1년입니다`, s: 8, f: fBold, c: COLORS.red },
    { t: `본 내용은 모집종사자 개인의 의견이며, 계약 체결에 따른 이익 또는 손실은 보험계약자에게 귀속됩니다`, s: 7.5, f: fMedium, c: COLORS.gray },
    { t: `보험사 및 상품별로 상이할 수 있으므로, 관련한 세부사항은 반드시 해당 약관을 참조하시기 바랍니다.`, s: 7.5, f: fMedium, c: COLORS.gray },
    { t: `보험회사 상품별, 성별, 연령, 직업 등에 따라 가입가능한 담보와 가입금액, 보험료는 달라질 수 있습니다.`, s: 7.5, f: fMedium, c: COLORS.gray },
    { t: `보험계약자가 기존 보험계약을 해지하고 새로운 보험계약을 체결하는 과정에서`, s: 7.5, f: fMedium, c: COLORS.red },
    { t: `① 질병이력, 연령증가 등으로 가입이 거절되거나 보험료가 인상될 수 있습니다.`, s: 7.5, f: fMedium, c: COLORS.gray },
    { t: `② 가입 상품에 따라 새로운 면책기간 적용 및 보장 제한 등 기타 불이익이 발생할 수 있습니다.`, s: 7.5, f: fMedium, c: COLORS.gray },
  ];
  let y = 117;
  const gap = 12.2;
  for (const ln of lines) {
    page.drawText(ln.t, { x: centeredX(ln.f, ln.t, ln.s), y, size: ln.s, font: ln.f, color: ln.c });
    y -= gap;
  }

  return doc.save();
}

module.exports = { generatePersonalizedFlyer, tightHy, computeConsultSize, computeFooterSize };
```

- [ ] **Step 4: 단위 테스트 통과 확인**

Run:
```powershell
node --test src/services/flyerGenerator.test.js
```
Expected: PASS (3 tests).

- [ ] **Step 5: 실제 PDF 생성 스모크 + 시각 확인 스크립트**

Run (임시 스크립트로 생성):
```powershell
node -e "const fs=require('fs');const g=require('./src/services/flyerGenerator');(async()=>{const blank=fs.readFileSync('pdf-fixtures/flyer-blank.pdf');const out=await g.generatePersonalizedFlyer({review_number:'2026-06-1681',review_start:'2026.06.05',review_end:'2027.06.04'},{name:'윤준민',position:'팀장',phone:'010-2250-6507',registration:'20230920003295'},blank);fs.writeFileSync('pdf-fixtures/_smoke.pdf',out);const head=Buffer.from(out.slice(0,5)).toString();console.log('head:',head,'bytes:',out.length);})()"
```
Expected: `head: %PDF- bytes: <대략 4MB>` (subset:false라 큼).

- [ ] **Step 6: 렌더 시각 검증 (Read 도구로 PDF 확인)**

`pdf-fixtures/_smoke.pdf`를 Read 도구로 열어 확인:
- 상담문의 박스에 "윤준민 팀장 010‑2250‑6507"이 박스를 적절히 채우는지
- 로고가 보이고 다른 요소와 겹치지 않는지 (겹치면 `LOGO.x/y/height` 상수 조정 후 Step 5 재실행)
- 푸터 심의필 줄이 이전보다 크고 페이지를 안 넘는지
- 한글이 두부(▦) 없이 정상인지

Expected: 위 항목 모두 정상. 로고 위치가 어색하면 `LOGO` 상수만 조정해 반복.

- [ ] **Step 7: 임시 파일 정리 + Commit**

```powershell
Remove-Item pdf-fixtures/_smoke.pdf -ErrorAction SilentlyContinue
git add src/services/flyerGenerator.js src/services/flyerGenerator.test.js
git commit -m "feat(resources): flyer PDF generator (logo, fit-to-box consult, enlarged review line)"
```

---

## Task 4: 백엔드 라우트 `/api/resources/*`

**Files:**
- Create: `src/routes/resources.js`
- Modify: `src/server.js` (require + app.use)

- [ ] **Step 1: 라우트 구현**

Create `src/routes/resources.js`:
```js
'use strict';
const express = require('express');
const multer = require('multer');
const fs = require('fs');
const path = require('path');
const pool = require('../config/db');
const { requireAuth, requireRole, ROLES } = require('../middleware/auth');
const { generatePersonalizedFlyer } = require('../services/flyerGenerator');

const router = express.Router();

const flyerDir = path.join(__dirname, '..', '..', 'uploads', 'flyers');
fs.mkdirSync(flyerDir, { recursive: true });

const pdfUpload = multer({
  storage: multer.memoryStorage(),
  limits: { fileSize: 15 * 1024 * 1024 },
  fileFilter: (req, file, cb) => {
    if (file.mimetype === 'application/pdf') cb(null, true);
    else cb(new Error('PDF 파일만 업로드할 수 있습니다.'));
  },
});

function normalizeSlug(s) {
  return String(s || '')
    .toLowerCase().trim()
    .replace(/[^a-z0-9\-]+/g, '-')
    .replace(/-+/g, '-')
    .replace(/^-|-$/g, '')
    .slice(0, 60);
}

// 광고정보(저장값, 없으면 회원 프로필 fallback)
function resolveAdProfile(row) {
  return {
    name: row.ad_name || row.full_name || '',
    position: row.ad_position || '',
    phone: row.ad_phone || row.phone || '',
    registration: row.ad_registration || '',
  };
}

async function findFlyer(idOrSlug) {
  const byId = /^\d+$/.test(String(idOrSlug));
  const sql = byId
    ? 'SELECT * FROM flyers WHERE id = $1'
    : 'SELECT * FROM flyers WHERE slug = $1';
  const { rows } = await pool.query(sql, [idOrSlug]);
  return rows[0] || null;
}

/* ── 광고정보 ── */
router.get('/ad-profile', requireAuth, async (req, res) => {
  try {
    const { rows } = await pool.query(
      'SELECT full_name, phone, ad_name, ad_position, ad_phone, ad_registration FROM users WHERE id = $1',
      [req.user.id]
    );
    if (!rows[0]) return res.status(404).json({ ok: false, error: '사용자를 찾을 수 없습니다.' });
    res.json({ ok: true, profile: resolveAdProfile(rows[0]) });
  } catch (e) {
    res.status(500).json({ ok: false, error: e.message });
  }
});

router.put('/ad-profile', requireAuth, async (req, res) => {
  try {
    const { name, position, phone, registration } = req.body || {};
    await pool.query(
      `UPDATE users SET ad_name=$1, ad_position=$2, ad_phone=$3, ad_registration=$4, updated_at=NOW() WHERE id=$5`,
      [name || null, position || null, phone || null, registration || null, req.user.id]
    );
    const { rows } = await pool.query(
      'SELECT full_name, phone, ad_name, ad_position, ad_phone, ad_registration FROM users WHERE id = $1',
      [req.user.id]
    );
    res.json({ ok: true, profile: resolveAdProfile(rows[0]) });
  } catch (e) {
    res.status(500).json({ ok: false, error: e.message });
  }
});

/* ── 전단지 목록/단건 ── */
router.get('/flyers', requireAuth, async (req, res) => {
  try {
    const { rows } = await pool.query(
      'SELECT id, slug, title, subtitle, category, review_number, review_start, review_end, created_at FROM flyers ORDER BY created_at DESC'
    );
    res.json({ ok: true, flyers: rows });
  } catch (e) {
    res.status(500).json({ ok: false, error: e.message });
  }
});

router.get('/flyers/:idOrSlug', requireAuth, async (req, res) => {
  try {
    const flyer = await findFlyer(req.params.idOrSlug);
    if (!flyer) return res.status(404).json({ ok: false, error: '전단지를 찾을 수 없습니다.' });
    const { pdf_filename, ...meta } = flyer;
    res.json({ ok: true, flyer: meta });
  } catch (e) {
    res.status(500).json({ ok: false, error: e.message });
  }
});

/* ── 관리자 업로드 ── */
router.post('/flyers', requireAuth, requireRole(ROLES.AMAZING), pdfUpload.single('file'), async (req, res) => {
  try {
    if (!req.file) return res.status(400).json({ ok: false, error: 'PDF 파일이 필요합니다.' });
    const { title, subtitle, category, review_number, review_start, review_end } = req.body || {};
    if (!title) return res.status(400).json({ ok: false, error: '제목은 필수입니다.' });
    let slug = normalizeSlug(req.body.slug) || normalizeSlug(title) || `flyer-${Date.now()}`;
    // slug 중복 회피
    const dup = await pool.query('SELECT 1 FROM flyers WHERE slug=$1', [slug]);
    if (dup.rowCount) slug = `${slug}-${Date.now().toString(36)}`;

    const filename = `${Date.now()}_${Math.random().toString(36).slice(2, 8)}.pdf`;
    fs.writeFileSync(path.join(flyerDir, filename), req.file.buffer);

    const { rows } = await pool.query(
      `INSERT INTO flyers (slug,title,subtitle,category,review_number,review_start,review_end,pdf_filename,created_by)
       VALUES ($1,$2,$3,$4,$5,$6,$7,$8,$9)
       RETURNING id, slug, title, subtitle, category, review_number, review_start, review_end, created_at`,
      [slug, title, subtitle || null, category || null, review_number || null, review_start || null, review_end || null, filename, req.user.id]
    );
    res.json({ ok: true, flyer: rows[0] });
  } catch (e) {
    res.status(500).json({ ok: false, error: e.message });
  }
});

/* ── 저장된 전단지 개인화 렌더 ── */
router.post('/flyers/:idOrSlug/render', requireAuth, async (req, res) => {
  try {
    const flyer = await findFlyer(req.params.idOrSlug);
    if (!flyer) return res.status(404).json({ ok: false, error: '전단지를 찾을 수 없습니다.' });
    const m = req.body || {};
    if (!m.name || !m.position || !m.phone || !m.registration) {
      return res.status(400).json({ ok: false, error: '이름·직책·전화번호·협회등록번호를 모두 입력해주세요.' });
    }
    const blank = fs.readFileSync(path.join(flyerDir, flyer.pdf_filename));
    const out = await generatePersonalizedFlyer(flyer, m, blank);
    res.setHeader('Content-Type', 'application/pdf');
    res.setHeader('Content-Disposition', 'inline; filename="flyer.pdf"');
    res.send(Buffer.from(out));
  } catch (e) {
    res.status(500).json({ ok: false, error: e.message });
  }
});

/* ── 업로드 전 미리보기(저장 없음, 관리자) ── */
router.post('/flyers/preview', requireAuth, requireRole(ROLES.AMAZING), pdfUpload.single('file'), async (req, res) => {
  try {
    if (!req.file) return res.status(400).json({ ok: false, error: 'PDF 파일이 필요합니다.' });
    const b = req.body || {};
    const flyer = { review_number: b.review_number || '', review_start: b.review_start || '', review_end: b.review_end || '' };
    const member = {
      name: b.name || '홍길동', position: b.position || '팀장',
      phone: b.phone || '010-0000-0000', registration: b.registration || '00000000000000',
    };
    const out = await generatePersonalizedFlyer(flyer, member, req.file.buffer);
    res.setHeader('Content-Type', 'application/pdf');
    res.setHeader('Content-Disposition', 'inline; filename="preview.pdf"');
    res.send(Buffer.from(out));
  } catch (e) {
    res.status(500).json({ ok: false, error: e.message });
  }
});

module.exports = router;
```

- [ ] **Step 2: server.js에 라우트 등록**

Modify `src/server.js`. `const insightsRoutes = require('./routes/insights');`(약 30행) 아래에 추가:
```js
const resourcesRoutes = require('./routes/resources');
```
그리고 `app.use('/api/notices', noticeRoutes);` 부근(약 965행) 다른 `app.use('/api/...')`들 사이에 추가:
```js
app.use('/api/resources', resourcesRoutes);
```

- [ ] **Step 3: 백엔드 dev 서버 기동**

Run (백그라운드):
```powershell
npm run dev
```
Expected: 3000 포트 리슨, 에러 없음. (이미 떠 있으면 재시작)

- [ ] **Step 4: 통합 검증 스크립트 (로그인 → 업로드 → 목록 → 렌더 → ad-profile)**

Run (관리자 계정 필요 — `<ADMIN_ID>`/`<ADMIN_PW>`를 실제 amazing 계정으로):
```powershell
node -e "const fs=require('fs');(async()=>{const base='http://localhost:3000/api';const login=await (await fetch(base+'/auth/login',{method:'POST',headers:{'Content-Type':'application/json'},body:JSON.stringify({username:'<ADMIN_ID>',password:'<ADMIN_PW>'})})).json();const tk=login.token;const H={Authorization:'Bearer '+tk};const fd=new FormData();fd.append('file',new Blob([fs.readFileSync('pdf-fixtures/flyer-blank.pdf')],{type:'application/pdf'}),'blank.pdf');fd.append('slug','lecanemab');fd.append('title','치매 신약 레켐비 보험');fd.append('category','질병·건강');fd.append('review_number','2026-06-1681');fd.append('review_start','2026.06.05');fd.append('review_end','2027.06.04');const up=await (await fetch(base+'/resources/flyers',{method:'POST',headers:H,body:fd})).json();console.log('upload:',up.ok,up.flyer&&up.flyer.slug);const list=await (await fetch(base+'/resources/flyers',{headers:H})).json();console.log('list count:',list.flyers.length);const rd=await fetch(base+'/resources/flyers/lecanemab/render',{method:'POST',headers:{...H,'Content-Type':'application/json'},body:JSON.stringify({name:'윤준민',position:'팀장',phone:'010-2250-6507',registration:'20230920003295'})});const buf=Buffer.from(await rd.arrayBuffer());fs.writeFileSync('pdf-fixtures/_api.pdf',buf);console.log('render:',rd.status,rd.headers.get('content-type'),buf.length);await fetch(base+'/resources/ad-profile',{method:'PUT',headers:{...H,'Content-Type':'application/json'},body:JSON.stringify({name:'윤준민',position:'팀장',phone:'010-2250-6507',registration:'20230920003295'})});const ap=await (await fetch(base+'/resources/ad-profile',{headers:H})).json();console.log('ad-profile:',JSON.stringify(ap.profile));})()"
```
Expected: `upload: true lecanemab`, `list count: 1`(이상), `render: 200 application/pdf <~4MB>`, `ad-profile: {"name":"윤준민",...}`.

- [ ] **Step 5: 렌더 결과 시각 확인**

`pdf-fixtures/_api.pdf`를 Read 도구로 열어 Task 3 Step 6과 동일 항목 확인. 정상이면 진행.

- [ ] **Step 6: 임시 파일 정리 + Commit**

```powershell
Remove-Item pdf-fixtures/_api.pdf -ErrorAction SilentlyContinue
git add src/routes/resources.js src/server.js
git commit -m "feat(resources): /api/resources routes (ad-profile, flyers CRUD, render, preview)"
```

---

## Task 5: 프론트 타입 + API 모듈

**Files:**
- Create: `frontend/src/features/salesMaterials/types.ts`
- Create: `frontend/src/features/salesMaterials/salesMaterialsApi.ts`

- [ ] **Step 1: 타입 정의**

Create `frontend/src/features/salesMaterials/types.ts`:
```ts
export interface Flyer {
  id: number
  slug: string
  title: string
  subtitle?: string | null
  category?: string | null
  review_number?: string | null
  review_start?: string | null
  review_end?: string | null
  created_at: string
}

export interface AdProfile {
  name: string
  position: string
  phone: string
  registration: string
}

export interface FlyerUploadInput {
  file: File
  slug?: string
  title: string
  subtitle?: string
  category?: string
  review_number?: string
  review_start?: string
  review_end?: string
}
```

- [ ] **Step 2: API 모듈 구현 (JSON=apiClient, PDF=raw fetch blob)**

Create `frontend/src/features/salesMaterials/salesMaterialsApi.ts`:
```ts
import apiClient from '../../lib/apiClient'
import type { Flyer, AdProfile, FlyerUploadInput } from './types'

export async function fetchFlyers(): Promise<Flyer[]> {
  const data = await apiClient('/resources/flyers')
  return data.flyers as Flyer[]
}

export async function fetchFlyer(slug: string): Promise<Flyer> {
  const data = await apiClient(`/resources/flyers/${encodeURIComponent(slug)}`)
  return data.flyer as Flyer
}

export async function fetchAdProfile(): Promise<AdProfile> {
  const data = await apiClient('/resources/ad-profile')
  return data.profile as AdProfile
}

export async function saveAdProfile(profile: AdProfile): Promise<AdProfile> {
  const data = await apiClient('/resources/ad-profile', { method: 'PUT', body: JSON.stringify(profile) })
  return data.profile as AdProfile
}

// PDF는 blob — apiClient(JSON 전용)를 못 쓰므로 raw fetch
function authHeaders(extra: Record<string, string> = {}): Record<string, string> {
  const token = localStorage.getItem('token')
  return token ? { ...extra, Authorization: `Bearer ${token}` } : extra
}

async function postForPdf(path: string, init: RequestInit): Promise<Blob> {
  const res = await fetch(`/api${path}`, init)
  if (!res.ok) {
    const msg = await res.json().catch(() => ({}))
    throw new Error((msg as any).error || 'PDF 생성에 실패했습니다.')
  }
  return res.blob()
}

export function renderFlyer(slug: string, member: AdProfile): Promise<Blob> {
  return postForPdf(`/resources/flyers/${encodeURIComponent(slug)}/render`, {
    method: 'POST',
    headers: authHeaders({ 'Content-Type': 'application/json' }),
    body: JSON.stringify(member),
  })
}

export function previewUpload(input: FlyerUploadInput, sample: AdProfile): Promise<Blob> {
  const fd = buildFormData(input)
  fd.append('name', sample.name); fd.append('position', sample.position)
  fd.append('phone', sample.phone); fd.append('registration', sample.registration)
  return postForPdf('/resources/flyers/preview', { method: 'POST', headers: authHeaders(), body: fd })
}

export async function uploadFlyer(input: FlyerUploadInput): Promise<Flyer> {
  const res = await fetch('/api/resources/flyers', { method: 'POST', headers: authHeaders(), body: buildFormData(input) })
  const data = await res.json().catch(() => ({}))
  if (!res.ok || data.ok === false) throw new Error((data as any).error || '업로드에 실패했습니다.')
  return data.flyer as Flyer
}

function buildFormData(input: FlyerUploadInput): FormData {
  const fd = new FormData()
  fd.append('file', input.file)
  if (input.slug) fd.append('slug', input.slug)
  fd.append('title', input.title)
  if (input.subtitle) fd.append('subtitle', input.subtitle)
  if (input.category) fd.append('category', input.category)
  if (input.review_number) fd.append('review_number', input.review_number)
  if (input.review_start) fd.append('review_start', input.review_start)
  if (input.review_end) fd.append('review_end', input.review_end)
  return fd
}
```

- [ ] **Step 3: 타입체크**

Run (in `frontend`):
```powershell
npx tsc --noEmit
```
Expected: salesMaterials 관련 타입 에러 없음. (기존 무관 에러가 있으면 무시하되 새 파일 관련 에러는 0)

- [ ] **Step 4: Commit**

```powershell
git add frontend/src/features/salesMaterials/types.ts frontend/src/features/salesMaterials/salesMaterialsApi.ts
git commit -m "feat(resources): frontend types + salesMaterials API client"
```

---

## Task 6: 목록 페이지 + 업로드 모달

**Files:**
- Create: `frontend/src/features/salesMaterials/salesMaterials.css`
- Create: `frontend/src/features/salesMaterials/UploadFlyerModal.tsx`
- Create: `frontend/src/features/salesMaterials/SalesMaterialsListPage.tsx`

- [ ] **Step 1: 최소 스타일**

Create `frontend/src/features/salesMaterials/salesMaterials.css`:
```css
.sm-wrap { max-width: 960px; margin: 0 auto; padding: 24px 16px 64px; }
.sm-head { text-align: center; margin-bottom: 28px; }
.sm-grid { display: grid; grid-template-columns: repeat(auto-fill, minmax(280px, 1fr)); gap: 16px; }
.sm-card { display: block; border: 1px solid #e5e7eb; border-radius: 16px; padding: 20px; background: #fff; text-decoration: none; color: inherit; transition: transform .12s; }
.sm-card:hover { transform: translateY(-3px); }
.sm-badge { font-size: 12px; color: #4f46e5; background: #eef2ff; padding: 2px 10px; border-radius: 999px; }
.sm-detail { display: grid; grid-template-columns: 2fr 3fr; gap: 24px; max-width: 1080px; margin: 0 auto; padding: 24px 16px 64px; }
.sm-field { margin-bottom: 14px; }
.sm-field label { display:block; font-size: 13px; font-weight: 600; margin-bottom: 6px; }
.sm-field input { width: 100%; padding: 10px 12px; border: 1px solid #d1d5db; border-radius: 10px; }
.sm-preview { border: 1px solid #e5e7eb; border-radius: 16px; overflow: hidden; aspect-ratio: 596/842; background: #f1f5f9; }
.sm-preview iframe { width: 100%; height: 100%; border: 0; }
.sm-btn { width:100%; padding: 12px; border:0; border-radius: 10px; background:#4f46e5; color:#fff; font-weight:600; cursor:pointer; }
.sm-btn:disabled { opacity:.5; cursor:not-allowed; }
.sm-modal-bg { position: fixed; inset: 0; background: rgba(0,0,0,.4); display:flex; align-items:center; justify-content:center; z-index: 50; }
.sm-modal { background:#fff; border-radius: 16px; padding: 24px; width: min(720px, 92vw); max-height: 90vh; overflow:auto; }
@media (max-width: 760px){ .sm-detail{ grid-template-columns: 1fr; } }
```

- [ ] **Step 2: 업로드 모달 구현**

Create `frontend/src/features/salesMaterials/UploadFlyerModal.tsx`:
```tsx
import { useState } from 'react'
import { previewUpload, uploadFlyer } from './salesMaterialsApi'
import type { FlyerUploadInput } from './types'

const SAMPLE = { name: '홍길동', position: '팀장', phone: '010-0000-0000', registration: '00000000000000' }

export default function UploadFlyerModal({ onClose, onCreated }: { onClose: () => void; onCreated: () => void }) {
  const [form, setForm] = useState({ slug: '', title: '', subtitle: '', category: '', review_number: '', review_start: '', review_end: '' })
  const [file, setFile] = useState<File | null>(null)
  const [previewUrl, setPreviewUrl] = useState('')
  const [busy, setBusy] = useState(false)
  const [err, setErr] = useState('')

  const set = (k: string, v: string) => setForm((p) => ({ ...p, [k]: v }))
  const input = (): FlyerUploadInput | null => (file ? { file, ...form } : null)

  const doPreview = async () => {
    const i = input(); if (!i) { setErr('PDF 파일을 선택하세요.'); return }
    setErr(''); setBusy(true)
    try {
      const blob = await previewUpload(i, SAMPLE)
      setPreviewUrl((prev) => { if (prev) URL.revokeObjectURL(prev); return URL.createObjectURL(blob) })
    } catch (e: any) { setErr(e.message) } finally { setBusy(false) }
  }
  const doSubmit = async () => {
    const i = input(); if (!i || !form.title) { setErr('PDF와 제목은 필수입니다.'); return }
    setErr(''); setBusy(true)
    try { await uploadFlyer(i); onCreated(); onClose() }
    catch (e: any) { setErr(e.message) } finally { setBusy(false) }
  }

  return (
    <div className="sm-modal-bg" onClick={onClose}>
      <div className="sm-modal" onClick={(e) => e.stopPropagation()}>
        <h3 style={{ marginTop: 0 }}>전단지 업로드</h3>
        <div className="sm-field"><label>PDF 파일</label>
          <input type="file" accept="application/pdf" onChange={(e) => setFile(e.target.files?.[0] || null)} /></div>
        <div className="sm-field"><label>제목 *</label><input value={form.title} onChange={(e) => set('title', e.target.value)} /></div>
        <div className="sm-field"><label>부제</label><input value={form.subtitle} onChange={(e) => set('subtitle', e.target.value)} /></div>
        <div className="sm-field"><label>카테고리</label><input value={form.category} onChange={(e) => set('category', e.target.value)} placeholder="예: 질병·건강" /></div>
        <div className="sm-field"><label>slug (URL용, 비우면 자동)</label><input value={form.slug} onChange={(e) => set('slug', e.target.value)} placeholder="예: lecanemab" /></div>
        <div className="sm-field"><label>심의필번호</label><input value={form.review_number} onChange={(e) => set('review_number', e.target.value)} placeholder="예: 2026-06-1681" /></div>
        <div className="sm-field"><label>유효기간 시작</label><input value={form.review_start} onChange={(e) => set('review_start', e.target.value)} placeholder="예: 2026.06.05" /></div>
        <div className="sm-field"><label>유효기간 종료</label><input value={form.review_end} onChange={(e) => set('review_end', e.target.value)} placeholder="예: 2027.06.04" /></div>
        {err && <p style={{ color: '#dc2626' }}>{err}</p>}
        <div style={{ display: 'flex', gap: 8, margin: '12px 0' }}>
          <button className="sm-btn" style={{ background: '#64748b' }} disabled={busy} onClick={doPreview}>미리보기</button>
          <button className="sm-btn" disabled={busy} onClick={doSubmit}>등록</button>
        </div>
        {previewUrl && <div className="sm-preview"><iframe src={previewUrl} title="미리보기" /></div>}
      </div>
    </div>
  )
}
```

- [ ] **Step 3: 목록 페이지 구현**

Create `frontend/src/features/salesMaterials/SalesMaterialsListPage.tsx`:
```tsx
import { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import { useAuthState } from '../../hooks/useAuthState'
import { fetchFlyers } from './salesMaterialsApi'
import UploadFlyerModal from './UploadFlyerModal'
import type { Flyer } from './types'
import './salesMaterials.css'

export default function SalesMaterialsListPage() {
  const { user } = useAuthState()
  const isAdmin = user?.role === 'amazing' || user?.role === 'admin'
  const [flyers, setFlyers] = useState<Flyer[]>([])
  const [showUpload, setShowUpload] = useState(false)
  const [loading, setLoading] = useState(true)

  const load = () => { setLoading(true); fetchFlyers().then(setFlyers).finally(() => setLoading(false)) }
  useEffect(() => { load() }, [])

  return (
    <div className="sm-wrap">
      <div className="sm-head">
        <h1>영업 자료실</h1>
        <p>심의받은 전단지에 내 정보(이름·연락처·협회등록번호·심의필번호)를 자동으로 넣어 인쇄용 PDF로 받아보세요.</p>
        {isAdmin && <button className="sm-btn" style={{ width: 'auto', padding: '8px 16px', marginTop: 8 }} onClick={() => setShowUpload(true)}>+ 전단지 업로드</button>}
      </div>
      {loading ? <p style={{ textAlign: 'center' }}>불러오는 중…</p> : (
        <div className="sm-grid">
          {flyers.map((f) => (
            <Link key={f.id} to={`/app/sales-materials/${f.slug}`} className="sm-card">
              {f.category && <span className="sm-badge">{f.category}</span>}
              <h3 style={{ margin: '12px 0 6px' }}>{f.title}</h3>
              {f.subtitle && <p style={{ color: '#64748b', fontSize: 14 }}>{f.subtitle}</p>}
              <span style={{ color: '#4f46e5', fontWeight: 600, fontSize: 14 }}>내 정보로 만들기 →</span>
            </Link>
          ))}
          {!flyers.length && <p style={{ color: '#94a3b8' }}>아직 등록된 전단지가 없습니다.</p>}
        </div>
      )}
      {showUpload && <UploadFlyerModal onClose={() => setShowUpload(false)} onCreated={load} />}
    </div>
  )
}
```

- [ ] **Step 4: 타입체크**

Run (in `frontend`):
```powershell
npx tsc --noEmit
```
Expected: 새 파일 관련 에러 0. (`useAuthState` 반환 타입에 `user.role` 없다는 에러가 나면, 해당 훅의 실제 export 형태에 맞춰 `const user = useAuthState().user as any`로 좁혀 사용)

- [ ] **Step 5: Commit**

```powershell
git add frontend/src/features/salesMaterials/salesMaterials.css frontend/src/features/salesMaterials/UploadFlyerModal.tsx frontend/src/features/salesMaterials/SalesMaterialsListPage.tsx
git commit -m "feat(resources): sales materials list page + admin upload modal"
```

---

## Task 7: 상세 페이지 (광고정보 폼 + 미리보기 + 다운로드)

**Files:**
- Create: `frontend/src/features/salesMaterials/SalesMaterialDetailPage.tsx`

- [ ] **Step 1: 상세 페이지 구현**

Create `frontend/src/features/salesMaterials/SalesMaterialDetailPage.tsx`:
```tsx
import { useEffect, useState } from 'react'
import { useParams, Link } from 'react-router-dom'
import { fetchFlyer, fetchAdProfile, saveAdProfile, renderFlyer } from './salesMaterialsApi'
import type { Flyer, AdProfile } from './types'
import './salesMaterials.css'

const EMPTY: AdProfile = { name: '', position: '', phone: '', registration: '' }

export default function SalesMaterialDetailPage() {
  const { slug = '' } = useParams()
  const [flyer, setFlyer] = useState<Flyer | null>(null)
  const [profile, setProfile] = useState<AdProfile>(EMPTY)
  const [pdfUrl, setPdfUrl] = useState('')
  const [busy, setBusy] = useState(false)
  const [err, setErr] = useState('')
  const [notFound, setNotFound] = useState(false)

  useEffect(() => {
    fetchFlyer(slug).then(setFlyer).catch(() => setNotFound(true))
    fetchAdProfile().then((p) => setProfile({ ...EMPTY, ...p })).catch(() => {})
  }, [slug])

  const set = (k: keyof AdProfile, v: string) => setProfile((p) => ({ ...p, [k]: v }))

  const complete = profile.name && profile.position && profile.phone && profile.registration
  const generate = async () => {
    if (!complete) { setErr('이름·직책·전화번호·협회등록번호를 모두 입력해주세요.'); return }
    setErr(''); setBusy(true)
    try {
      await saveAdProfile(profile)
      const blob = await renderFlyer(slug, profile)
      setPdfUrl((prev) => { if (prev) URL.revokeObjectURL(prev); return URL.createObjectURL(blob) })
    } catch (e: any) { setErr(e.message) } finally { setBusy(false) }
  }

  if (notFound) return <div className="sm-wrap"><p>전단지를 찾을 수 없습니다.</p><Link to="/app/sales-materials">← 영업 자료실</Link></div>
  if (!flyer) return <div className="sm-wrap"><p>불러오는 중…</p></div>

  const dlName = `${flyer.title}_${profile.name || '전단지'}.pdf`
  return (
    <div className="sm-wrap">
      <Link to="/app/sales-materials" style={{ color: '#64748b', fontSize: 14 }}>← 영업 자료실</Link>
      <div style={{ margin: '12px 0 20px' }}>
        <span style={{ color: '#059669', fontSize: 12 }}>심의완료 · 심의필 제{flyer.review_number}호</span>
        <h1 style={{ margin: '4px 0' }}>{flyer.title}</h1>
        {flyer.subtitle && <p style={{ color: '#64748b' }}>{flyer.subtitle}</p>}
      </div>
      <div className="sm-detail">
        <div>
          <h3>내 광고정보</h3>
          <p style={{ fontSize: 12, color: '#64748b' }}>한 번 입력하면 저장되어 다음 전단지에도 자동으로 들어갑니다.</p>
          <div className="sm-field"><label>이름</label><input value={profile.name} onChange={(e) => set('name', e.target.value)} placeholder="예: 윤준민" /></div>
          <div className="sm-field"><label>직책</label><input value={profile.position} onChange={(e) => set('position', e.target.value)} placeholder="예: 팀장" /></div>
          <div className="sm-field"><label>전화번호</label><input value={profile.phone} onChange={(e) => set('phone', e.target.value)} placeholder="예: 010-2250-6507" /></div>
          <div className="sm-field"><label>손·생보 협회 등록번호</label><input value={profile.registration} onChange={(e) => set('registration', e.target.value)} placeholder="예: 20230920003295" /></div>
          {err && <p style={{ color: '#dc2626' }}>{err}</p>}
          <button className="sm-btn" disabled={busy} onClick={generate}>{busy ? '생성 중…' : '미리보기 생성'}</button>
        </div>
        <div>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 8 }}>
            <h3 style={{ margin: 0 }}>미리보기</h3>
            {pdfUrl && <a href={pdfUrl} download={dlName} className="sm-btn" style={{ width: 'auto', padding: '8px 14px', textDecoration: 'none' }}>PDF 다운로드</a>}
          </div>
          <div className="sm-preview">
            {pdfUrl ? <iframe src={pdfUrl} title="전단지 미리보기" /> : <div style={{ display: 'flex', height: '100%', alignItems: 'center', justifyContent: 'center', color: '#94a3b8' }}>정보 입력 후 '미리보기 생성'을 누르세요.</div>}
          </div>
        </div>
      </div>
    </div>
  )
}
```

- [ ] **Step 2: 타입체크**

Run (in `frontend`):
```powershell
npx tsc --noEmit
```
Expected: 새 파일 관련 에러 0.

- [ ] **Step 3: Commit**

```powershell
git add frontend/src/features/salesMaterials/SalesMaterialDetailPage.tsx
git commit -m "feat(resources): sales material detail page (ad-profile form + preview + download)"
```

---

## Task 8: 라우트 등록 + 사이드바 메뉴

**Files:**
- Modify: `frontend/src/routes/index.tsx`
- Modify: `frontend/src/ui/Sidebar.tsx`

- [ ] **Step 1: 라우트 import 추가**

`frontend/src/routes/index.tsx`의 import 영역(약 16행, InsightDetailPage import 아래)에 추가:
```tsx
import SalesMaterialsListPage from '../features/salesMaterials/SalesMaterialsListPage'
import SalesMaterialDetailPage from '../features/salesMaterials/SalesMaterialDetailPage'
```

- [ ] **Step 2: 라우트 엔트리 추가**

`/app` children 배열 내(예: `{ path: 'insights', element: <InsightsListPage /> },` 근처)에 추가:
```tsx
      {
        path: 'sales-materials',
        element: <SalesMaterialsListPage />,
      },
      {
        path: 'sales-materials/:slug',
        element: <SalesMaterialDetailPage />,
      },
```

- [ ] **Step 3: 사이드바 아이콘 import 추가**

`frontend/src/ui/Sidebar.tsx`의 lucide-react import 블록(3~26행)에 `Megaphone`을 추가(알파벳 위치 무관, 한 줄 추가):
```tsx
  Megaphone,
```

- [ ] **Step 4: '업무 도구' 섹션에 메뉴 추가**

`Sidebar.tsx`에서 `title: '업무 도구'` 섹션의 items 배열, `{ to: '/app/insights', label: '보험 인사이트', icon: <Newspaper /> },` 줄 아래에 추가:
```tsx
    { to: '/app/sales-materials', label: '영업 자료실', icon: <Megaphone /> },
```
(주의: 기존 82행의 외부링크 `설계사전용방`은 Phase 5 철거 때 정리. 지금은 그대로 둔다.)

- [ ] **Step 5: 프론트 dev 서버 + 타입체크/빌드**

Run (in `frontend`):
```powershell
npx tsc --noEmit
npm run dev
```
Expected: 타입에러 0, Vite dev 서버 기동(보통 5173).

- [ ] **Step 6: Commit**

```powershell
git add frontend/src/routes/index.tsx frontend/src/ui/Sidebar.tsx
git commit -m "feat(resources): register sales-materials route + sidebar menu"
```

---

## Task 9: 엔드투엔드 시각 검증

**Files:** (없음 — 검증 전용)

- [ ] **Step 1: 백엔드/프론트 동시 기동 확인**

backend(3000)·frontend(5173) 모두 기동 상태인지 확인. 아니면 각 레포에서 `npm run dev`.

- [ ] **Step 2: 관리자로 업로드 플로우 검증 (Playwright)**

브라우저로 `http://localhost:5173/` 접속 → 관리자(amazing) 계정 로그인 → 사이드바 '업무 도구 > 영업 자료실' 클릭 → `/app/sales-materials` 진입 확인 → "+ 전단지 업로드" 모달에서 `pdf-fixtures/flyer-blank.pdf` 선택 + 제목/심의필번호/유효기간 입력 → "미리보기" 클릭 → 모달 내 iframe에 PDF 표시 확인 → "등록" → 목록에 카드 노출 확인. 스크린샷 저장 후 Read로 확인.

Expected: 업로드 카드가 목록에 보이고, 미리보기 PDF에 샘플("홍길동 팀장") + 로고 + 심의필 정상.

- [ ] **Step 3: 회원 상세 플로우 검증**

전단지 카드 클릭 → 상세 진입 → 광고정보 폼이 회원 프로필 기본값으로 prefill되는지 확인 → 직책/협회번호 입력 → "미리보기 생성" → 우측 iframe에 개인화 PDF 표시 → "PDF 다운로드" 클릭 동작 확인. 스크린샷 Read로 최종 시각 확인.

Expected: 상담문의 박스에 "이름 직책 전화"가 박스를 꽉 채우고, 푸터 심의필 줄이 크게, 로고 정상, 한글 정상.

- [ ] **Step 4: 좌표/로고 미세조정 (필요 시)**

렌더가 어긋나면 `src/services/flyerGenerator.js`의 `CONSULT`·`LOGO` 상수만 조정 → 백엔드 재기동 → 재확인. (반복)

- [ ] **Step 5: 최종 Commit (조정이 있었다면)**

```powershell
git add src/services/flyerGenerator.js
git commit -m "fix(resources): calibrate consult box / logo position from visual check"
```

---

## Self-Review 결과 (작성자 점검)

- **Spec 커버리지**: 관리자 업로드(Task 4·6) / 심의필·유효기간 입력(Task 6 모달) / 미리보기(preview·render) / 회원 광고정보 독립 4필드(Task 2·4) / 로고·fit-to-box·심의필 확대(Task 3) / server 통합·프록시 제거(전 Task) / 사이드바 메뉴(Task 8) — 모두 대응됨.
- **플레이스홀더**: 없음. `<ADMIN_ID>`/`<ADMIN_PW>`는 실행자가 채우는 런타임 자격증명(코드 아님)으로 의도적 표기.
- **타입 일관성**: `AdProfile{name,position,phone,registration}`, `Flyer{slug,...}`, 라우트 `/api/resources/*`, 함수명(`renderFlyer`,`previewUpload`,`uploadFlyer`,`fetchAdProfile`,`saveAdProfile`)이 api 모듈·페이지 전반에서 일치.
- **미정(구현 중 확정)**: `CONSULT.maxW`, `LOGO` 좌표는 Task 3·9에서 시각 보정. `useAuthState` 반환 타입은 Task 6 Step 4에 우회 지침 포함.

## 비고
- 커밋 메시지는 각 Task에 포함했으나, **실제 커밋·푸시는 사용자 명시 승인 후에만** 수행(메모리 규칙). 승인 전이면 커밋 스텝은 보류하고 변경만 유지.
- 프로덕션: 마이그레이션 1회 실행 + server 재배포(Railway) 필요.
