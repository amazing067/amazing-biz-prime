import { NextRequest, NextResponse } from 'next/server';
import { createClient } from '@supabase/supabase-js';

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL!;
const supabaseServiceKey = process.env.SUPABASE_SERVICE_ROLE_KEY!;

export async function POST(request: NextRequest) {
  try {
    const { username } = await request.json();

    if (!username || username.length < 3) {
      return NextResponse.json(
        { available: false, error: '아이디는 최소 3자 이상이어야 합니다.' },
        { status: 400 }
      );
    }

    // 아이디 형식 검증
    const usernameRegex = /^[a-zA-Z0-9_]+$/;
    if (!usernameRegex.test(username)) {
      return NextResponse.json(
        { available: false, error: '아이디는 영문, 숫자, 언더스코어(_)만 사용할 수 있습니다.' },
        { status: 400 }
      );
    }

    // Service Role Key로 Supabase 클라이언트 생성 (admin 권한)
    if (!supabaseServiceKey) {
      return NextResponse.json(
        { available: false, error: '서버 설정 오류가 발생했습니다.' },
        { status: 500 }
      );
    }

    const supabaseAdmin = createClient(supabaseUrl, supabaseServiceKey);

    // 아이디를 이메일 형식으로 변환
    const checkEmail = `${username}@amazing-biz.com`;

    try {
      // 사용자 목록 조회
      const { data: usersData, error: listUsersError } = await supabaseAdmin.auth.admin.listUsers();

      if (listUsersError) {
        console.error('listUsers 에러:', listUsersError);
        // 에러 발생 시 사용 가능으로 처리 (안전한 기본값)
        return NextResponse.json({ available: true });
      }

      // 이메일로 사용자 찾기
      const existingUser = usersData?.users?.find(u => u.email === checkEmail);

      // 사용자가 존재하면 중복
      if (existingUser) {
        return NextResponse.json({ available: false, error: '이미 사용 중인 아이디입니다.' });
      }

      // 사용 가능
      return NextResponse.json({ available: true });
    } catch (err: any) {
      console.error('중복 확인 예외:', err);
      // 예외 발생 시 사용 가능으로 처리 (안전한 기본값)
      return NextResponse.json({ available: true });
    }
  } catch (error: any) {
    return NextResponse.json(
      { available: false, error: error.message || '중복 확인 중 오류가 발생했습니다.' },
      { status: 500 }
    );
  }
}
