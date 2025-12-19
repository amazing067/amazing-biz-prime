import { NextRequest, NextResponse } from 'next/server';
import { createClient } from '@supabase/supabase-js';

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL!;
const supabaseServiceKey = process.env.SUPABASE_SERVICE_ROLE_KEY!;

export async function POST(request: NextRequest) {
  try {
    if (!supabaseServiceKey) {
      return NextResponse.json(
        { error: '서버 설정 오류가 발생했습니다.' },
        { status: 500 }
      );
    }

    const { email } = await request.json();

    if (!email) {
      return NextResponse.json(
        { error: '이메일이 필요합니다.' },
        { status: 400 }
      );
    }

    const supabaseAdmin = createClient(supabaseUrl, supabaseServiceKey);

    // 사용자 찾기 (listUsers 사용)
    const { data: usersData, error: listUsersError } = await supabaseAdmin.auth.admin.listUsers();

    if (listUsersError) {
      console.error('listUsers 에러:', listUsersError);
      return NextResponse.json(
        { error: `사용자 목록 조회 실패: ${listUsersError.message}` },
        { status: 500 }
      );
    }

    // 이메일로 사용자 찾기
    const user = usersData?.users?.find(u => u.email === email);

    if (!user) {
      return NextResponse.json(
        { error: '사용자를 찾을 수 없습니다.' },
        { status: 404 }
      );
    }

    return NextResponse.json({ 
      userId: user.id,
      email: user.email,
    });
  } catch (error: any) {
    console.error('사용자 ID 조회 예외:', error);
    return NextResponse.json(
      { error: error.message || '사용자 ID 조회 중 오류가 발생했습니다.' },
      { status: 500 }
    );
  }
}
