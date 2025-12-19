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

    const { userId, email, password } = await request.json();

    if (!userId && !email) {
      return NextResponse.json(
        { error: '사용자 ID 또는 이메일이 필요합니다.' },
        { status: 400 }
      );
    }

    const supabaseAdmin = createClient(supabaseUrl, supabaseServiceKey);

    let targetUserId = userId;

    // 이메일로 사용자 ID 찾기 (listUsers 사용)
    if (!targetUserId && email) {
      try {
        // listUsers를 사용하여 모든 사용자 조회 후 필터링
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

        targetUserId = user.id;
      } catch (getUserErr: any) {
        console.error('사용자 조회 예외:', getUserErr);
        return NextResponse.json(
          { error: `사용자 조회 중 오류가 발생했습니다: ${getUserErr.message}` },
          { status: 500 }
        );
      }
    }

    if (!targetUserId) {
      return NextResponse.json(
        { error: '사용자 ID를 찾을 수 없습니다.' },
        { status: 400 }
      );
    }

    // 프로필 조회 (Service Role Key로 RLS 우회)
    try {
      const { data: profile, error: profileError } = await supabaseAdmin
        .from('profiles')
        .select('*')
        .eq('id', targetUserId)
        .single();

      if (profileError) {
        console.error('프로필 조회 에러:', profileError);
        return NextResponse.json(
          { error: `프로필을 찾을 수 없습니다: ${profileError.message}` },
          { status: 404 }
        );
      }

      if (!profile) {
        return NextResponse.json(
          { error: '프로필을 찾을 수 없습니다.' },
          { status: 404 }
        );
      }

      return NextResponse.json({ profile });
    } catch (profileErr: any) {
      console.error('프로필 조회 예외:', profileErr);
      return NextResponse.json(
        { error: `프로필 조회 중 오류가 발생했습니다: ${profileErr.message}` },
        { status: 500 }
      );
    }
  } catch (error: any) {
    console.error('프로필 조회 최상위 예외:', error);
    // 상세한 에러 정보 반환 (디버깅용)
    return NextResponse.json(
      { 
        error: error.message || '프로필 조회 중 오류가 발생했습니다.',
        details: process.env.NODE_ENV === 'development' ? error.stack : undefined
      },
      { status: 500 }
    );
  }
}
