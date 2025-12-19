# Supabase 설정 가이드

## 1. Supabase 프로젝트 생성

1. [Supabase](https://supabase.com)에 접속하여 계정 생성
2. "New Project" 클릭
3. 프로젝트 이름과 데이터베이스 비밀번호 설정
4. 프로젝트 생성 완료 대기 (약 2분)

## 2. 환경 변수 설정

`.env.local` 파일에 다음 환경 변수를 추가하세요:

```env
NEXT_PUBLIC_SUPABASE_URL=your-project-url
NEXT_PUBLIC_SUPABASE_ANON_KEY=your-anon-key
SUPABASE_SERVICE_ROLE_KEY=your-service-role-key
```

**Supabase에서 URL과 Key 찾는 방법:**
1. Supabase 대시보드에서 프로젝트 선택
2. 좌측 메뉴에서 "Settings" → "API" 클릭
3. "Project URL"과 "anon public" 키를 복사하여 `.env.local`에 붙여넣기
4. **"Secret keys"** 섹션에서 **"service_role"** 키를 복사하여 `SUPABASE_SERVICE_ROLE_KEY`에 붙여넣기
   - ⚠️ **주의**: Service Role Key는 서버에서만 사용되며, 절대 클라이언트 코드에 노출되면 안 됩니다!

## 3. 데이터베이스 테이블 생성

Supabase 대시보드에서 SQL Editor를 열고 다음 SQL을 실행하세요:

```sql
-- 사용자 프로필 테이블 (Auth 사용자와 연결)
CREATE TABLE profiles (
  id UUID REFERENCES auth.users(id) PRIMARY KEY,
  name TEXT NOT NULL,
  phone TEXT,
  branch TEXT,
  office TEXT,
  position TEXT,
  approved BOOLEAN DEFAULT false,
  is_admin BOOLEAN DEFAULT false,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT TIMEZONE('utc'::text, NOW()) NOT NULL,
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT TIMEZONE('utc'::text, NOW()) NOT NULL
);

-- RLS (Row Level Security) 활성화
ALTER TABLE profiles ENABLE ROW LEVEL SECURITY;

-- 사용자는 자신의 프로필만 볼 수 있음
CREATE POLICY "Users can view own profile" ON profiles
  FOR SELECT USING (auth.uid() = id);

-- 사용자는 자신의 프로필만 수정할 수 있음
CREATE POLICY "Users can update own profile" ON profiles
  FOR UPDATE USING (auth.uid() = id);

-- 관리자만 모든 프로필을 볼 수 있음
CREATE POLICY "Admins can view all profiles" ON profiles
  FOR SELECT USING (
    EXISTS (
      SELECT 1 FROM profiles
      WHERE id = auth.uid() AND is_admin = true
    )
  );

-- 관리자만 프로필을 수정할 수 있음 (회원 관리용)
CREATE POLICY "Admins can update all profiles" ON profiles
  FOR UPDATE USING (
    EXISTS (
      SELECT 1 FROM profiles
      WHERE id = auth.uid() AND is_admin = true
    )
  );

-- 프로필 자동 생성 함수 (회원가입 시 자동으로 프로필 생성)
CREATE OR REPLACE FUNCTION public.handle_new_user()
RETURNS TRIGGER AS $$
BEGIN
  INSERT INTO public.profiles (id, name, phone, branch, office, position, is_admin)
  VALUES (
    NEW.id,
    NEW.raw_user_meta_data->>'name',
    NEW.raw_user_meta_data->>'phone',
    NEW.raw_user_meta_data->>'branch',
    NEW.raw_user_meta_data->>'office',
    NEW.raw_user_meta_data->>'position',
    false -- 기본적으로 관리자가 아님
  );
  RETURN NEW;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

-- 트리거 생성 (회원가입 시 자동 실행)
CREATE TRIGGER on_auth_user_created
  AFTER INSERT ON auth.users
  FOR EACH ROW EXECUTE FUNCTION public.handle_new_user();
```

**관리자 설정 방법:**
회원가입 후 Supabase 대시보드의 "Table Editor"에서 `profiles` 테이블을 열고, 관리자로 지정할 사용자의 `is_admin` 컬럼을 `true`로 변경하세요.

## 4. 이메일 인증 설정 (선택사항)

Supabase는 기본적으로 이메일 인증을 요구합니다. 개발 중에는 비활성화할 수 있습니다:

1. Supabase 대시보드 → "Authentication" → "Settings"
2. "Enable email confirmations" 토글을 OFF로 설정 (개발용)
3. 프로덕션에서는 다시 활성화 권장

## 5. 관리자 대시보드에서 회원 관리

Supabase 대시보드의 "Table Editor"에서 `profiles` 테이블을 열면:
- 모든 회원 목록 확인
- `approved` 컬럼을 `true`로 변경하여 승인
- 회원 정보 수정/삭제 가능

## 6. 다음 단계

- [ ] 회원가입 페이지 테스트
- [ ] 로그인 기능 테스트
- [ ] 관리자 승인 시스템 구현
- [ ] 회원전용 대시보드 페이지 생성
