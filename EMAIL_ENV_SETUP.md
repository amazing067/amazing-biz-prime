# 입사지원 이메일 전송 환경 변수 설정 가이드

## 문제
입사지원 폼 제출 시 "다음 환경 변수가 설정되지 않았습니다: EMAIL_USER, EMAIL_PASS" 오류가 발생합니다.

## 해결 방법: 환경 변수 설정

### 1. Gmail 앱 비밀번호 생성

1. Gmail 계정에 로그인
2. [Google 계정 설정](https://myaccount.google.com/) 접속
3. **보안** 탭 클릭
4. **2단계 인증** 활성화 (아직 안 했다면)
5. **앱 비밀번호** 클릭
6. 앱 선택: "메일"
7. 기기 선택: "기타(맞춤 이름)" → "Prime Asset Server" 입력
8. **생성** 클릭
9. 생성된 16자리 앱 비밀번호 복사 (예: `abcd efgh ijkl mnop`)

### 2. 로컬 개발 환경 설정 (.env.local)

프로젝트 루트에 `.env.local` 파일을 생성하고 다음 내용을 추가:

```env
EMAIL_USER=your-email@gmail.com
EMAIL_PASS=your-16-digit-app-password
EMAIL_HOST=smtp.gmail.com
EMAIL_PORT=587
```

**주의사항:**
- `EMAIL_USER`: Gmail 주소 전체 (예: `yourname@gmail.com`)
- `EMAIL_PASS`: 위에서 생성한 16자리 앱 비밀번호 (공백 없이 입력)
- `.env.local` 파일은 Git에 커밋하지 마세요 (이미 .gitignore에 포함됨)

### 3. 프로덕션 서버 환경 변수 설정

배포 플랫폼에 따라 설정 방법이 다릅니다:

#### Vercel
1. [Vercel 대시보드](https://vercel.com) 접속
2. 프로젝트 선택
3. **Settings** → **Environment Variables** 클릭
4. 다음 변수 추가:
   - `EMAIL_USER`: Gmail 주소
   - `EMAIL_PASS`: 앱 비밀번호
   - `EMAIL_HOST`: `smtp.gmail.com` (선택사항)
   - `EMAIL_PORT`: `587` (선택사항)
5. **Save** 클릭
6. **Deployments** 탭에서 최신 배포를 다시 배포

#### 다른 호스팅 서비스
- 환경 변수 설정 페이지에서 위의 변수들을 추가하세요
- 서버 재시작이 필요할 수 있습니다

### 4. 테스트

환경 변수 설정 후:
1. 개발 서버 재시작: `npm run dev`
2. 입사지원 폼 제출 테스트
3. `induo@naver.com`으로 이메일이 전송되는지 확인

## 문제 해결

### "Invalid login" 오류
- 앱 비밀번호가 올바른지 확인
- 2단계 인증이 활성화되어 있는지 확인
- Gmail 주소가 정확한지 확인

### "Connection" 오류
- 인터넷 연결 확인
- 방화벽에서 포트 587이 차단되지 않았는지 확인

### 환경 변수가 적용되지 않음
- 서버 재시작 확인
- 환경 변수 이름이 정확한지 확인 (대소문자 구분)
- `.env.local` 파일이 프로젝트 루트에 있는지 확인

## 보안 주의사항

⚠️ **중요:**
- 앱 비밀번호를 절대 Git에 커밋하지 마세요
- 프로덕션 환경에서는 환경 변수로만 관리하세요
- 정기적으로 앱 비밀번호를 갱신하는 것을 권장합니다

