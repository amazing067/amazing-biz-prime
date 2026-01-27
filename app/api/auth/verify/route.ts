import { NextRequest, NextResponse } from 'next/server';

// 어메이징사업부.com API URL
const getAmazingBizApiUrl = () => {
  let url: string;
  
  if (process.env.NEXT_PUBLIC_AMAZING_BIZ_API_URL) {
    url = process.env.NEXT_PUBLIC_AMAZING_BIZ_API_URL;
  } else {
    const isDevelopment = process.env.NODE_ENV === 'development';
    
    if (isDevelopment) {
      url = process.env.NEXT_PUBLIC_AMAZING_BIZ_API_URL_DEV || 'http://localhost:3000/api';
    } else {
      url = process.env.NEXT_PUBLIC_AMAZING_BIZ_API_URL_PROD || 'https://어메이징사업부.com/api';
    }
  }
  
  try {
    const urlObj = new URL(url);
    return urlObj.href;
  } catch (error) {
    console.warn('URL 파싱 실패, 원본 URL 사용:', url);
    return url;
  }
};

const AMAZING_BIZ_API_URL = getAmazingBizApiUrl();

/**
 * GET /api/auth/verify
 * 토큰 검증 및 사용자 정보 조회 (SSO용)
 */
export async function GET(request: NextRequest) {
  try {
    const searchParams = request.nextUrl.searchParams;
    const token = searchParams.get('token');

    if (!token) {
      return NextResponse.json(
        { ok: false, error: '토큰이 필요합니다.' },
        { status: 400 }
      );
    }

    // 어메이징사업부.com API로 토큰 검증 요청
    console.log('[토큰 검증] API URL:', AMAZING_BIZ_API_URL);
    console.log('[토큰 검증] 토큰 길이:', token?.length || 0);
    
    let response: Response;
    try {
      const verifyUrl = `${AMAZING_BIZ_API_URL}/auth/me`;
      console.log('[토큰 검증] 요청 URL:', verifyUrl);
      
      response = await fetch(verifyUrl, {
        method: 'GET',
        headers: {
          'Authorization': `Bearer ${token}`,
          'Content-Type': 'application/json',
        },
      });
      
      console.log('[토큰 검증] 응답 상태:', response.status, response.statusText);
    } catch (fetchError: any) {
      console.error('[토큰 검증] API 연결 오류:', fetchError);
      return NextResponse.json(
        { 
          ok: false, 
          error: `어메이징사업부.com 서버에 연결할 수 없습니다. (${fetchError.message || '네트워크 오류'})` 
        },
        { status: 503 }
      );
    }

    let data: any;
    try {
      data = await response.json();
      console.log('[토큰 검증] 응답 데이터:', { 
        ok: data.ok, 
        hasUser: !!data.user,
        error: data.error 
      });
    } catch (jsonError) {
      console.error('[토큰 검증] 응답 파싱 오류:', jsonError);
      return NextResponse.json(
        { ok: false, error: '서버 응답을 처리할 수 없습니다.' },
        { status: 500 }
      );
    }

    if (!response.ok) {
      console.warn('[토큰 검증] 실패:', { status: response.status, data });
      return NextResponse.json(data, { status: response.status });
    }

    console.log('[토큰 검증] 성공:', { username: data.user?.username });
    return NextResponse.json(data);
  } catch (error: any) {
    console.error('토큰 검증 오류:', error);
    return NextResponse.json(
      { ok: false, error: error.message || '토큰 검증 중 오류가 발생했습니다.' },
      { status: 500 }
    );
  }
}
