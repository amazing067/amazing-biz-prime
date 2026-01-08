# 환경 변수 설정 가이드

## 현재 문제

현재 설정된 Supabase URL: `https://zvhoqznybogvkwwjjcwg.supabase.co`

이 URL은 DNS에서 찾을 수 없습니다. 다음 중 하나일 수 있습니다:
- Supabase 프로젝트가 삭제됨
- 프로젝트가 일시 중지됨
- URL이 잘못됨

## 해결 방법

### 1. Supabase 대시보드에서 올바른 URL 확인

1. [Supabase 대시보드](https://supabase.com/dashboard)에 로그인
2. 프로젝트 목록 확인
3. 프로젝트가 **활성화**되어 있는지 확인
4. 프로젝트 클릭 → **Settings** → **API** 이동
5. 다음 정보 확인:
   - **Project URL**: `https://[프로젝트ID].supabase.co`
   - **anon public** key
   - **service_role** key (Settings → API → Service Role Key)

### 2. 로컬 환경 변수 설정 (.env.local)

프로젝트 루트에 `.env.local` 파일을 생성하거나 수정:

```env
# Supabase 설정
NEXT_PUBLIC_SUPABASE_URL=https://[올바른프로젝트ID].supabase.co
NEXT_PUBLIC_SUPABASE_ANON_KEY=[anon public key]
SUPABASE_SERVICE_ROLE_KEY=[service_role key]

# 이메일 설정 (선택사항)
EMAIL_USER=[이메일주소]
EMAIL_PASS=[이메일비밀번호]
```

**중요**: 
- `.env.local` 파일은 `.gitignore`에 포함되어 있어 Git에 커밋되지 않습니다.
- 실제 값으로 교체해야 합니다.
- `[올바른프로젝트ID]`, `[anon public key]`, `[service_role key]` 부분을 실제 값으로 교체하세요.

### 3. 프로덕션 환경 변수 설정

배포 플랫폼에 따라 다릅니다:

#### Vercel
1. Vercel 대시보드 → 프로젝트 선택
2. **Settings** → **Environment Variables**
3. 다음 변수 추가:
   - `NEXT_PUBLIC_SUPABASE_URL`
   - `NEXT_PUBLIC_SUPABASE_ANON_KEY`
   - `SUPABASE_SERVICE_ROLE_KEY`
   - `EMAIL_USER` (선택)
   - `EMAIL_PASS` (선택)

#### 다른 플랫폼
배포 플랫폼의 환경 변수 설정 메뉴에서 동일한 변수들을 설정하세요.

### 4. 환경 변수 확인 방법

#### 로컬에서 확인
```bash
# 개발 서버 재시작 (환경 변수 변경 후 필수)
npm run dev
```

브라우저 콘솔에서 다음 로그 확인:
- `✅ Supabase 클라이언트 초기화:` - 정상
- `❌ Supabase 환경 변수 누락:` - 환경 변수 문제

#### 프로덕션에서 확인
브라우저 개발자 도구 → Console 탭에서 동일한 로그 확인

### 5. Supabase 프로젝트가 없는 경우

새 프로젝트를 생성해야 합니다:

1. [Supabase 대시보드](https://supabase.com/dashboard)에서 **New Project** 클릭
2. 프로젝트 정보 입력:
   - **Name**: 프로젝트 이름
   - **Database Password**: 강력한 비밀번호 설정
   - **Region**: 가장 가까운 리전 선택
3. 프로젝트 생성 완료 후 **Settings** → **API**에서 URL과 키 확인
4. 환경 변수 업데이트

### 6. 데이터베이스 스키마 설정

새 프로젝트를 생성한 경우, 기존 SQL 스크립트를 실행해야 합니다:

1. Supabase 대시보드 → **SQL Editor**
2. 다음 파일들의 SQL 실행:
   - `SETUP_ADMIN.sql` - 관리자 계정 설정
   - `FIX_RLS_POLICIES.sql` - RLS 정책 설정
   - 기타 필요한 SQL 스크립트

### 7. 테스트

환경 변수 설정 후:

1. 개발 서버 재시작
2. 로그인 페이지 접속
3. 브라우저 콘솔에서 오류 확인
4. 로그인 시도

**정상 작동 시:**
- Supabase 클라이언트 초기화 로그 확인
- 로그인/회원가입 정상 작동

**오류 발생 시:**
- 콘솔 로그 확인
- 환경 변수 값 재확인
- Supabase 프로젝트 상태 확인

## 현재 설정 확인

현재 코드에서 환경 변수는 다음 위치에서 사용됩니다:

- `lib/supabase.ts` - Supabase 클라이언트 초기화
- `app/api/check-username/route.ts` - 아이디 중복 확인
- `app/api/create-profile/route.ts` - 프로필 생성
- `app/member/page.tsx` - 로그인
- `app/member/signup/page.tsx` - 회원가입

모든 위치에서 환경 변수 검증이 추가되어 있어, 누락 시 명확한 오류 메시지가 표시됩니다.

