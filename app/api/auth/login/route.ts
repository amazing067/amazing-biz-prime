import { NextRequest, NextResponse } from 'next/server';

// 어메이징사업부.com API URL
// 환경에 따라 자동으로 선택: 개발 환경에서는 localhost, 프로덕션에서는 실제 도메인
// 한글 도메인은 자동으로 퓨니코드로 변환됩니다
const getAmazingBizApiUrl = () => {
  let url: string;
  
  // 명시적으로 설정된 경우 우선 사용
  if (process.env.NEXT_PUBLIC_AMAZING_BIZ_API_URL) {
    url = process.env.NEXT_PUBLIC_AMAZING_BIZ_API_URL;
  } else {
    // 환경에 따라 자동 선택
    const isDevelopment = process.env.NODE_ENV === 'development';
    
    if (isDevelopment) {
      // 개발 환경: 개발용 URL 우선, 없으면 localhost
      url = process.env.NEXT_PUBLIC_AMAZING_BIZ_API_URL_DEV || 'http://localhost:3000/api';
    } else {
      // 프로덕션 환경: 프로덕션 URL 사용
      url = process.env.NEXT_PUBLIC_AMAZING_BIZ_API_URL_PROD || 'https://어메이징사업부.com/api';
    }
  }
  
  // URL 객체를 생성하여 한글 도메인을 퓨니코드로 자동 변환
  try {
    const urlObj = new URL(url);
    return urlObj.href; // 퓨니코드로 변환된 URL 반환
  } catch (error) {
    // URL 파싱 실패 시 원본 반환
    console.warn('URL 파싱 실패, 원본 URL 사용:', url);
    return url;
  }
};

const AMAZING_BIZ_API_URL = getAmazingBizApiUrl();

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { username, password } = body;

    if (!username || !password) {
      return NextResponse.json(
        { ok: false, error: '아이디와 비밀번호를 모두 입력하세요.' },
        { status: 400 }
      );
    }

    // 어메이징사업부.com API로 프록시 요청
    let response: Response;
    try {
      response = await fetch(`${AMAZING_BIZ_API_URL}/auth/login`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          username,
          password,
        }),
      });
    } catch (fetchError: any) {
      console.error('로그인 API 연결 오류:', fetchError);
      return NextResponse.json(
        { 
          ok: false, 
          error: `어메이징사업부.com 서버에 연결할 수 없습니다. 서버가 실행 중인지 확인해주세요. (${fetchError.message || '네트워크 오류'})` 
        },
        { status: 503 }
      );
    }

    let data: any;
    try {
      data = await response.json();
    } catch (jsonError) {
      console.error('로그인 응답 파싱 오류:', jsonError);
      return NextResponse.json(
        { ok: false, error: '서버 응답을 처리할 수 없습니다.' },
        { status: 500 }
      );
    }

    if (!response.ok) {
      return NextResponse.json(data, { status: response.status });
    }

    return NextResponse.json(data);
  } catch (error: any) {
    console.error('로그인 프록시 오류:', error);
    return NextResponse.json(
      { ok: false, error: error.message || '로그인 처리 중 오류가 발생했습니다.' },
      { status: 500 }
    );
  }
}
