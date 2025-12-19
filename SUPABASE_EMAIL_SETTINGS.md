# Supabase 이메일 확인 비활성화 가이드

## 문제
현재 회원가입은 아이디만 사용하지만, Supabase Auth는 내부적으로 이메일을 사용합니다.
이메일 확인 기능이 활성화되어 있어서 로그인 시 계속 "Email not confirmed" 오류가 발생합니다.

## 해결 방법: Supabase 대시보드에서 이메일 확인 비활성화

### 1단계: Supabase 대시보드 접속
1. [Supabase](https://supabase.com)에 로그인
2. 프로젝트 선택

### 2단계: Authentication 설정
1. 좌측 메뉴에서 **"Authentication"** 클릭
2. **"Sign In / Providers"** 클릭 (CONFIGURATION 섹션 아래)
3. 페이지를 아래로 스크롤하여 **"Email"** 섹션 찾기

### 3단계: 이메일 확인 비활성화
1. **"Email"** 섹션에서 **"Confirm email"** 또는 **"Enable email confirmations"** 토글을 찾습니다
2. 토글을 **OFF**로 설정
3. 변경사항 저장 (자동 저장됨)

**참고**: 
- "Sign In / Providers" 페이지에서 Email 섹션을 찾으세요
- "Confirm email" 옵션이 있을 수 있습니다
- 또는 페이지 하단의 "Email Auth" 설정에서 찾을 수 있습니다

### 완료!
이제 이메일 확인 없이도 로그인이 가능합니다.

## 참고
- 이 설정은 프로젝트 전체에 적용됩니다
- 개발 환경에서는 이메일 확인을 비활성화해도 안전합니다
- 프로덕션 환경에서도 이메일 확인이 필요 없다면 비활성화해도 됩니다
