import { NextRequest, NextResponse } from 'next/server';

// 어메이징사업부.com API URL
const AMAZING_BIZ_API_URL = process.env.NEXT_PUBLIC_AMAZING_BIZ_API_URL || 'http://localhost:3000/api';

export async function GET(request: NextRequest) {
  try {
    const token = request.headers.get('authorization')?.replace('Bearer ', '');
    
    if (!token) {
      return NextResponse.json(
        { ok: false, error: '인증 토큰이 필요합니다.' },
        { status: 401 }
      );
    }

    const { searchParams } = new URL(request.url);
    const status = searchParams.get('status') || 'all';

    // 어메이징사업부.com API로 프록시 요청
    const response = await fetch(`${AMAZING_BIZ_API_URL}/users/pending?status=${status}`, {
      method: 'GET',
      headers: {
        'Authorization': `Bearer ${token}`,
        'Content-Type': 'application/json',
      },
    });

    const data = await response.json();

    if (!response.ok) {
      return NextResponse.json(data, { status: response.status });
    }

    return NextResponse.json(data);
  } catch (error: any) {
    console.error('사용자 목록 조회 프록시 오류:', error);
    return NextResponse.json(
      { ok: false, error: error.message || '사용자 목록 조회 중 오류가 발생했습니다.' },
      { status: 500 }
    );
  }
}
