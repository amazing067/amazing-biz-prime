# Supabase URL 연결 오류 해결 가이드

## 문제
`ERR_NAME_NOT_RESOLVED` 오류가 발생하여 로그인이 되지 않습니다.

## 원인
Supabase 프로젝트 URL이 존재하지 않거나 잘못되었습니다.

## 해결 방법

### 1. Supabase 대시보드에서 프로젝트 확인

1. [Supabase 대시보드](https://supabase.com/dashboard)에 로그인
2. 프로젝트 목록에서 해당 프로젝트 확인
3. 프로젝트가 **일시 중지** 또는 **삭제**되었는지 확인

### 2. 올바른 Supabase URL 확인

Supabase 프로젝트 설정에서:
1. **Settings** → **API** 클릭
2. **Project URL** 확인
3. 형식: `https://[프로젝트ID].supabase.co`

**중요**: 최신 Supabase는 URL 형식이 다를 수 있습니다:
- 구형: `https://[프로젝트ID].supabase.co`
- 신형: `https://[프로젝트ID].supabase.co` (동일하지만 프로젝트 ID가 다를 수 있음)

### 3. .env.local 파일 업데이트

프로젝트 루트의 `.env.local` 파일을 열고:

```env
NEXT_PUBLIC_SUPABASE_URL=https://[올바른프로젝트ID].supabase.co
NEXT_PUBLIC_SUPABASE_ANON_KEY=[새로운AnonKey]
SUPABASE_SERVICE_ROLE_KEY=[새로운ServiceRoleKey]
```

### 4. 프로젝트가 삭제된 경우

프로젝트가 삭제되었다면:
1. 새 Supabase 프로젝트 생성
2. 데이터베이스 스키마 재구성
3. 환경 변수 업데이트

### 5. DNS 확인

터미널에서 다음 명령어로 DNS 확인:

```bash
nslookup [프로젝트ID].supabase.co
```

**정상 응답 예시:**
```
Name: [프로젝트ID].supabase.co
Address: [IP주소]
```

**오류 응답:**
```
Non-existent domain
```

이 경우 Supabase 프로젝트가 존재하지 않습니다.

## 현재 설정된 URL

현재 `.env.local`에 설정된 URL:
- `https://zvhoqznybogvkwwjjcwg.supabase.co`

이 URL이 DNS에서 찾을 수 없습니다. Supabase 대시보드에서 올바른 URL을 확인하세요.

## 다음 단계

1. Supabase 대시보드에서 프로젝트 상태 확인
2. 올바른 Project URL 확인
3. `.env.local` 파일 업데이트
4. 개발 서버 재시작: `npm run dev`

