import { NextRequest, NextResponse } from 'next/server';
import { createClient } from '@supabase/supabase-js';

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL!;
const supabaseServiceKey = process.env.SUPABASE_SERVICE_ROLE_KEY!;

export async function GET(request: NextRequest) {
  try {
    if (!supabaseServiceKey) {
      return NextResponse.json(
        { error: '서버 설정 오류가 발생했습니다.' },
        { status: 500 }
      );
    }

    const supabaseAdmin = createClient(supabaseUrl, supabaseServiceKey);

    // 쿼리 파라미터에서 필터링 옵션 가져오기
    const { searchParams } = request.nextUrl;
    const approved = searchParams.get('approved');
    const branch = searchParams.get('branch');

    // profiles 테이블에서 회원 목록 조회
    let query = supabaseAdmin
      .from('profiles')
      .select('*')
      .order('created_at', { ascending: false });

    // 승인 상태 필터링
    if (approved !== null) {
      query = query.eq('approved', approved === 'true');
    }

    // 본부 필터링
    if (branch) {
      query = query.eq('branch', branch);
    }

    const { data, error } = await query;

    if (error) {
      console.error('회원 목록 조회 에러:', error);
      return NextResponse.json(
        { error: '회원 목록을 불러오는 중 오류가 발생했습니다.' },
        { status: 500 }
      );
    }

    // auth.users에서 이메일 정보 가져오기 (아이디 추출)
    const userIds = data?.map(profile => profile.id) || [];
    const { data: usersData } = await supabaseAdmin.auth.admin.listUsers();

    // 이메일에서 아이디 추출 (username@amazing-biz.com -> username)
    const membersWithUsername = data?.map(profile => {
      const user = usersData?.users.find(u => u.id === profile.id);
      const email = user?.email || '';
      const username = email.replace('@amazing-biz.com', '');
      
      return {
        ...profile,
        username,
        email,
      };
    }) || [];

    return NextResponse.json({ members: membersWithUsername });
  } catch (error: any) {
    console.error('회원 목록 조회 예외:', error);
    return NextResponse.json(
      { error: error.message || '회원 목록을 불러오는 중 오류가 발생했습니다.' },
      { status: 500 }
    );
  }
}
