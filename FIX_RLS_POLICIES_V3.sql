-- RLS 정책 수정 SQL (최종 버전 - 완전한 무한 재귀 해결)
-- Supabase SQL Editor에서 실행하세요

-- 기존 정책 삭제
DROP POLICY IF EXISTS "Users can view own profile" ON profiles;
DROP POLICY IF EXISTS "Users can update own profile" ON profiles;
DROP POLICY IF EXISTS "Admins can view all profiles" ON profiles;
DROP POLICY IF EXISTS "Admins can update all profiles" ON profiles;
DROP POLICY IF EXISTS "Enable insert for authenticated users" ON profiles;

-- 기존 함수 삭제
DROP FUNCTION IF EXISTS public.is_admin();

-- 관리자 확인 함수 생성 (SECURITY DEFINER로 RLS 완전 우회)
-- 이 함수는 RLS를 완전히 우회하여 profiles 테이블을 직접 조회합니다
CREATE OR REPLACE FUNCTION public.is_admin()
RETURNS BOOLEAN
LANGUAGE plpgsql
SECURITY DEFINER
SET search_path = public
STABLE
AS $$
DECLARE
  user_id UUID;
  admin_check BOOLEAN;
BEGIN
  -- 현재 인증된 사용자 ID 가져오기
  user_id := auth.uid();
  
  -- user_id가 NULL이면 관리자가 아님
  IF user_id IS NULL THEN
    RETURN FALSE;
  END IF;
  
  -- RLS를 우회하여 직접 profiles 테이블 조회
  -- SECURITY DEFINER로 인해 이 함수는 RLS를 우회합니다
  SELECT EXISTS (
    SELECT 1 
    FROM public.profiles 
    WHERE id = user_id 
    AND is_admin = true
  ) INTO admin_check;
  
  RETURN COALESCE(admin_check, FALSE);
END;
$$;

-- RLS 활성화
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
-- 트리거를 통해 자동 생성되는 경우와 수동 생성 모두 허용
CREATE POLICY "Enable insert for authenticated users" ON profiles
  FOR INSERT 
  WITH CHECK (auth.uid() = id);

-- 함수 권한 부여 (필요한 역할에 대해)
GRANT EXECUTE ON FUNCTION public.is_admin() TO authenticated;
GRANT EXECUTE ON FUNCTION public.is_admin() TO anon;

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

-- 함수 확인
SELECT 
  routine_name,
  routine_type,
  security_type
FROM information_schema.routines
WHERE routine_schema = 'public' 
AND routine_name = 'is_admin';
