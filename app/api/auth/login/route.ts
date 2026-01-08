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
    const response = await fetch(`${AMAZING_BIZ_API_URL}/auth/login`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        username,
        password,
      }),
    });

    const data = await response.json();

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
