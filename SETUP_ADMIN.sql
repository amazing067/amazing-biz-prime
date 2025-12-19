-- amazing 계정을 관리자로 설정하는 SQL
-- Supabase SQL Editor에서 실행하세요

-- 1. amazing 계정의 사용자 ID 찾기 (이메일: amazing@amazing-biz.com)
-- auth.users 테이블에서 사용자 찾기
SELECT id, email FROM auth.users WHERE email = 'amazing@amazing-biz.com';

-- 2. 해당 사용자의 프로필을 관리자로 설정
-- 위에서 찾은 id를 사용하여 실행하세요
-- 예시: id가 '123e4567-e89b-12d3-a456-426614174000'인 경우

UPDATE profiles
SET 
  is_admin = true,
  position = '관리자',
  approved = true
WHERE id = (
  SELECT id FROM auth.users WHERE email = 'amazing@amazing-biz.com'
);

-- 또는 한 번에 실행하려면:
UPDATE profiles
SET 
  is_admin = true,
  position = '관리자',
  approved = true
WHERE id IN (
  SELECT id FROM auth.users WHERE email = 'amazing@amazing-biz.com'
);

-- 이메일 확인 처리 (auth.users 테이블 직접 업데이트)
UPDATE auth.users
SET email_confirmed_at = NOW()
WHERE email = 'amazing@amazing-biz.com' AND email_confirmed_at IS NULL;

-- 확인
SELECT 
  p.id,
  u.email,
  p.name,
  p.position,
  p.is_admin,
  p.approved
FROM profiles p
JOIN auth.users u ON p.id = u.id
WHERE u.email = 'amazing@amazing-biz.com';
