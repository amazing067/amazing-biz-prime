-- RLS 정책 수정 SQL (무한 재귀 문제 해결)
-- Supabase SQL Editor에서 실행하세요

-- 기존 정책 삭제
DROP POLICY IF EXISTS "Users can view own profile" ON profiles;
DROP POLICY IF EXISTS "Users can update own profile" ON profiles;
DROP POLICY IF EXISTS "Admins can view all profiles" ON profiles;
DROP POLICY IF EXISTS "Admins can update all profiles" ON profiles;
DROP POLICY IF EXISTS "Enable insert for authenticated users" ON profiles;

-- 기존 함수 삭제 (있다면)
DROP FUNCTION IF EXISTS public.is_admin();

-- 관리자 확인 함수 생성 (SECURITY DEFINER로 RLS 우회)
CREATE OR REPLACE FUNCTION public.is_admin()
RETURNS BOOLEAN
LANGUAGE plpgsql
SECURITY DEFINER
SET search_path = public
AS $$
BEGIN
  -- auth.uid()가 관리자인지 확인 (RLS 우회)
  RETURN EXISTS (
    SELECT 1 
    FROM profiles 
    WHERE id = auth.uid() 
    AND is_admin = true
  );
END;
$$;

-- RLS 활성화 (이미 활성화되어 있어도 안전하게 실행)
ALTER TABLE profiles ENABLE ROW LEVEL SECURITY;

-- 1. 사용자는 자신의 프로필만 볼 수 있음
CREATE POLICY "Users can view own profile" ON profiles
  FOR SELECT 
  USING (auth.uid() = id);

-- 2. 사용자는 자신의 프로필만 수정할 수 있음
CREATE POLICY "Users can update own profile" ON profiles
  FOR UPDATE 
  USING (auth.uid() = id);

-- 3. 관리자만 모든 프로필을 볼 수 있음 (SECURITY DEFINER 함수 사용)
CREATE POLICY "Admins can view all profiles" ON profiles
  FOR SELECT 
  USING (public.is_admin());

-- 4. 관리자만 모든 프로필을 수정할 수 있음
CREATE POLICY "Admins can update all profiles" ON profiles
  FOR UPDATE 
  USING (public.is_admin());

-- 5. 회원가입 시 프로필 생성 허용 (INSERT 정책)
CREATE POLICY "Enable insert for authenticated users" ON profiles
  FOR INSERT 
  WITH CHECK (auth.uid() = id);

-- 확인: 정책 목록 보기
SELECT 
  schemaname,
  tablename,
  policyname,
  permissive,
  roles,
  cmd,
  qual,
  with_check
FROM pg_policies 
WHERE tablename = 'profiles';
