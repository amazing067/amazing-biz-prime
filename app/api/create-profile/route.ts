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

    const { userId, name, phone, branch, office, position } = await request.json();

    if (!userId) {
      return NextResponse.json(
        { error: '사용자 ID가 필요합니다.' },
        { status: 400 }
      );
    }

    // Service Role Key로 Supabase 클라이언트 생성 (RLS 우회)
    const supabaseAdmin = createClient(supabaseUrl, supabaseServiceKey);

    // 프로필 생성 (Service Role Key로 RLS 우회)
    const { data, error } = await supabaseAdmin
      .from('profiles')
      .insert({
        id: userId,
        name: name || '',
        phone: phone || '',
        branch: branch || '',
        office: office || '',
        position: position || '',
        approved: false,
        is_admin: false,
      })
      .select()
      .single();

    if (error) {
      console.error('프로필 생성 에러:', error);
      return NextResponse.json(
        { error: `프로필 생성 중 오류가 발생했습니다: ${error.message}` },
        { status: 500 }
      );
    }

    return NextResponse.json({ profile: data });
  } catch (error: any) {
    console.error('프로필 생성 예외:', error);
    return NextResponse.json(
      { error: error.message || '프로필 생성 중 오류가 발생했습니다.' },
      { status: 500 }
    );
  }
}
