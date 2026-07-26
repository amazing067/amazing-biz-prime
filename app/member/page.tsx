import { redirect } from "next/navigation";

// 설계사 전용 라운지는 업무도구 포털(어메이징사업부.com)로 이전됨.
// 기존 링크·북마크·검색결과 유입을 포털 로그인으로 넘긴다.
// 한글 도메인은 Location 헤더에 들어갈 수 없어 punycode 표기 사용 (어메이징사업부.com)
const PORTAL_URL = "https://xn--h32b21du9cf7grcy2k20f.com/app/lounge";

export default function MemberRedirectPage() {
  redirect(PORTAL_URL);
}
