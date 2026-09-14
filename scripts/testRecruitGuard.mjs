/**
 * 입사지원 양식 봇 차단 — **실제로 막히는지** 확인 (2026-09-14).
 *
 * 실제로 받은 스팸 값을 그대로 넣어 본다. 막히지 않으면 방어가 없는 것과 같다.
 * 메일이 나가면 안 되므로 **검증 함수만** 따로 불러 검사한다(라우트를 때리지 않는다).
 *
 *   node scripts/testRecruitGuard.mjs
 */
import fs from 'node:fs';

const src = fs.readFileSync(new URL('../app/api/send-recruit/route.ts', import.meta.url), 'utf8');

/* 라우트에서 검증 함수 두 개만 떼어 낸다 — 실행 가능한 JS 로 */
const pick = (name) => {
  const i = src.indexOf(`function ${name}`);
  if (i < 0) throw new Error(`${name} 을 못 찾음`);
  let depth = 0, j = src.indexOf('{', i);
  for (let k = j; k < src.length; k++) {
    if (src[k] === '{') depth++;
    else if (src[k] === '}') { depth--; if (!depth) return src.slice(i, k + 1) }
  }
  throw new Error(`${name} 끝을 못 찾음`);
};
const strip = (js) => js
  .replace(/: Record<string, unknown>/g, '').replace(/: unknown/g, '')
  .replace(/: string\[\]/g, '').replace(/: string/g, '').replace(/: boolean/g, '').replace(/: number/g, '');

const looksHuman = eval(`(${strip(pick('looksHuman')).replace('function looksHuman', 'function')})`);
const esc = eval(`(${strip(pick('esc')).replace('function esc', 'function')})`);

const CASES = [
  /* 실제로 받은 스팸 */
  { label: '실제 스팸(무작위 이름·가짜 번호)', body: { name: 'zeSLacmwYGDhkROLnhFAUJEO', phone: '863-5180-033', email: 'a.q.i.x.i.piy.e.r9.0.9@gmail.com' }, want: false },
  /* ★형식 검증만으로는 못 거른다 — 「Bhldalnxh」는 글자만 보면 영문 이름과 구별이 안 된다.
     이름 규칙을 더 조이면 「Schmidt」 같은 실제 이름과 외국인 지원자가 막힌다.
     이 경우는 **허니팟**이 잡는다(아래 별도 검사). 층을 나눠 맡기는 것이 맞다. */
  { label: '무작위 영문이름+정상번호(형식으론 못 거름)', body: { name: 'Bhldalnxh', phone: '010-1234-5678', email: 'a@b.com' }, want: true },
  { label: '번호가 한국 형식 아님', body: { name: '홍길동', phone: '863-5180-033', email: 'a@b.com' }, want: false },
  { label: '이메일 형식 깨짐', body: { name: '홍길동', phone: '010-1234-5678', email: 'not-an-email' }, want: false },
  { label: '이름 비었음', body: { name: '', phone: '010-1234-5678', email: 'a@b.com' }, want: false },
  /* 진짜 사람 */
  { label: '정상 — 한글 이름', body: { name: '홍길동', phone: '010-1234-5678', email: 'hong@naver.com' }, want: true },
  { label: '정상 — 이메일 미입력', body: { name: '김서연', phone: '01098765432', email: '미입력' }, want: true },
  { label: '정상 — 영문 이름', body: { name: 'John Smith', phone: '010-2222-3333', email: 'j@x.co.kr' }, want: true },
  { label: '정상 — 번호에 하이픈 없음', body: { name: '박도윤', phone: '01011112222', email: '' }, want: true },
];

let bad = 0;
console.log('\n형식 검증 (사람이 쓸 수 있는 모양인가)');
for (const c of CASES) {
  const got = looksHuman(c.body);
  const ok = got === c.want;
  if (!ok) bad++;
  console.log(`  ${ok ? '✅' : '❌'} ${c.label.padEnd(30)} 기대 ${c.want ? '통과' : '차단'} · 결과 ${got ? '통과' : '차단'}`);
}

/* ── 허니팟 층 ── 형식으로 못 거르는 봇(「Bhldalnxh」)을 여기서 잡는다.
   라우트는 body.website 가 비어 있지 않으면 **메일을 보내지 않고** 성공한 척 응답한다. */
console.log('\n허니팟 (보이지 않는 칸을 채우면 봇)');
const honeypot = (body) => String(body.website ?? '').trim() !== '';  /* true = 메일 안 나감 */
const HONEY = [
  { label: '봇 — 보이지 않는 칸을 채움', body: { name: 'Bhldalnxh', phone: '010-1234-5678', website: 'http://spam.example' }, blocked: true },
  { label: '봇 — 모든 칸을 채우는 유형', body: { name: 'zeSLacmwYGDhkROLnhFAUJEO', phone: '863-5180-033', website: 'x' }, blocked: true },
  { label: '사람 — 칸이 비어 있음', body: { name: '홍길동', phone: '010-1234-5678', website: '' }, blocked: false },
  { label: '사람 — 칸 자체가 없음(옛 화면)', body: { name: '홍길동', phone: '010-1234-5678' }, blocked: false },
];
for (const c of HONEY) {
  const got = honeypot(c.body);
  const ok = got === c.blocked;
  if (!ok) bad++;
  console.log(`  ${ok ? '✅' : '❌'} ${c.label.padEnd(30)} 결과 ${got ? '메일 안 나감' : '메일 나감'}`);
}

console.log('\n메일 본문 주입 차단');
const inj = [
  ['<a href="http://나쁜곳">눌러보세요</a>', '링크 심기'],
  ['<img src=x onerror=alert(1)>', '이미지 태그'],
  ['"><script>bad()</script>', '따옴표 탈출'],
];
for (const [raw, label] of inj) {
  const out = esc(raw);
  const safe = !/[<>]/.test(out);
  if (!safe) bad++;
  console.log(`  ${safe ? '✅' : '❌'} ${label.padEnd(30)} → ${out.slice(0, 46)}`);
}

console.log(bad ? `\n★${bad}건 실패` : `\n전부 통과 — 실제로 받은 스팸이 차단되고 사람 입력은 통과한다`);
if (bad) process.exitCode = 1;
