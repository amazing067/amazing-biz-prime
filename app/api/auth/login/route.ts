import { NextRequest, NextResponse } from 'next/server';

// 어메이징사업부.com API URL
const AMAZING_BIZ_API_URL = process.env.NEXT_PUBLIC_AMAZING_BIZ_API_URL || 'http://localhost:3000/api';

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
