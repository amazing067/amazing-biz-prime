# Supabase Storage 설정 가이드

설계사 교육방의 파일 업로드 기능을 사용하기 위해 Supabase Storage를 설정해야 합니다.

## 1. Storage 버킷 생성

1. Supabase 대시보드에 로그인
2. 왼쪽 메뉴에서 **Storage** 클릭
3. **New bucket** 버튼 클릭
4. 다음 정보 입력:
   - **Name**: `education-files`
   - **Public bucket**: ✅ 체크 (공개 버킷으로 설정)
   - **File size limit**: 원하는 최대 파일 크기 (예: 100MB)
   - **Allowed MIME types**: 비워두거나 `video/*,application/pdf,application/msword,application/vnd.openxmlformats-officedocument.*` 입력

5. **Create bucket** 클릭

## 2. Storage 정책 설정 (RLS)

Storage 버킷에 대한 접근 권한을 설정합니다.

### 2.1 업로드 정책 (INSERT)

**Supabase SQL Editor**에서 다음 SQL 실행:

```sql
-- 모든 승인된 회원이 파일을 업로드할 수 있도록 설정
CREATE POLICY "승인된 회원은 파일 업로드 가능"
ON storage.objects
FOR INSERT
TO authenticated
WITH CHECK (
  bucket_id = 'education-files' AND
  EXISTS (
    SELECT 1 FROM profiles
    WHERE profiles.id = auth.uid()
    AND profiles.approved = true
  )
);
```

### 2.2 읽기 정책 (SELECT)

```sql
-- 모든 승인된 회원이 파일을 읽을 수 있도록 설정
CREATE POLICY "승인된 회원은 파일 읽기 가능"
ON storage.objects
FOR SELECT
TO authenticated
USING (
  bucket_id = 'education-files' AND
  EXISTS (
    SELECT 1 FROM profiles
    WHERE profiles.id = auth.uid()
    AND profiles.approved = true
  )
);
```

### 2.3 삭제 정책 (DELETE) - 선택사항

관리자만 삭제할 수 있도록 설정하려면:

```sql
-- 관리자만 파일 삭제 가능
CREATE POLICY "관리자는 파일 삭제 가능"
ON storage.objects
FOR DELETE
TO authenticated
USING (
  bucket_id = 'education-files' AND
  EXISTS (
    SELECT 1 FROM profiles
    WHERE profiles.id = auth.uid()
    AND profiles.is_admin = true
  )
);
```

## 3. 파일 목록 조회 개선

현재 구현된 코드는 Storage의 `list()` API를 사용하지만, 파일 메타데이터를 더 자세히 저장하려면 별도의 테이블을 만들 수 있습니다.

### 선택사항: 파일 메타데이터 테이블 생성

```sql
-- 교육 파일 메타데이터 테이블
CREATE TABLE education_files (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  file_name TEXT NOT NULL,
  file_path TEXT NOT NULL,
  file_type TEXT NOT NULL, -- 'video' or 'document'
  file_size BIGINT,
  uploaded_by UUID REFERENCES profiles(id),
  uploaded_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  description TEXT
);

-- RLS 활성화
ALTER TABLE education_files ENABLE ROW LEVEL SECURITY;

-- 승인된 회원은 모든 파일 조회 가능
CREATE POLICY "승인된 회원은 파일 목록 조회 가능"
ON education_files
FOR SELECT
TO authenticated
USING (
  EXISTS (
    SELECT 1 FROM profiles
    WHERE profiles.id = auth.uid()
    AND profiles.approved = true
  )
);

-- 승인된 회원은 파일 업로드 가능
CREATE POLICY "승인된 회원은 파일 메타데이터 생성 가능"
ON education_files
FOR INSERT
TO authenticated
WITH CHECK (
  EXISTS (
    SELECT 1 FROM profiles
    WHERE profiles.id = auth.uid()
    AND profiles.approved = true
  )
  AND uploaded_by = auth.uid()
);
```

## 4. 테스트

1. 일반 회원으로 로그인
2. `/member/education` 페이지 접속
3. "업로드" 버튼 클릭
4. 파일 선택 후 업로드
5. 업로드된 파일이 목록에 표시되는지 확인

## 문제 해결

### "new row violates row-level security policy" 오류
- Storage 정책이 제대로 설정되었는지 확인
- 사용자 프로필의 `approved` 상태 확인

### 파일 목록이 보이지 않음
- Storage 버킷이 공개(Public)로 설정되어 있는지 확인
- `list()` API 권한 확인

### 업로드 실패
- 파일 크기가 제한을 초과하지 않는지 확인
- MIME 타입이 허용된 형식인지 확인
- Storage 정책의 INSERT 권한 확인
