import { NextRequest, NextResponse } from 'next/server';

// 어메이징사업부.com API URL
const AMAZING_BIZ_API_URL = process.env.NEXT_PUBLIC_AMAZING_BIZ_API_URL || 'http://localhost:3000/api';

export async function PATCH(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    const token = request.headers.get('authorization')?.replace('Bearer ', '');
    
    if (!token) {
      return NextResponse.json(
        { ok: false, error: '인증 토큰이 필요합니다.' },
        { status: 401 }
      );
    }

    const body = await request.json();
    const { status } = body;
    const userId = params.id;

    if (!status || !['pending', 'approved', 'rejected'].includes(status)) {
      return NextResponse.json(
        { ok: false, error: '올바른 status 값이 필요합니다. (pending, approved, rejected)' },
        { status: 400 }
      );
    }

    // 어메이징사업부.com API로 프록시 요청
    const response = await fetch(`${AMAZING_BIZ_API_URL}/auth/users/${userId}/status`, {
      method: 'PATCH',
      headers: {
        'Authorization': `Bearer ${token}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ status }),
    });

    const data = await response.json();

    if (!response.ok) {
      return NextResponse.json(data, { status: response.status });
    }

    return NextResponse.json(data);
  } catch (error: any) {
    console.error('사용자 상태 변경 프록시 오류:', error);
    return NextResponse.json(
      { ok: false, error: error.message || '사용자 상태 변경 중 오류가 발생했습니다.' },
      { status: 500 }
    );
  }
}
