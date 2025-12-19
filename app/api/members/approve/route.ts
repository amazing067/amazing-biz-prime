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

    const { userId, approved } = await request.json();

    if (!userId || typeof approved !== 'boolean') {
      return NextResponse.json(
        { error: '잘못된 요청입니다.' },
        { status: 400 }
      );
    }

    const supabaseAdmin = createClient(supabaseUrl, supabaseServiceKey);

    // profiles 테이블에서 승인 상태 업데이트
    const { data, error } = await supabaseAdmin
      .from('profiles')
      .update({ approved })
      .eq('id', userId)
      .select()
      .single();

    if (error) {
      console.error('승인 상태 업데이트 에러:', error);
      return NextResponse.json(
        { error: '승인 상태를 업데이트하는 중 오류가 발생했습니다.' },
        { status: 500 }
      );
    }

    return NextResponse.json({ 
      success: true, 
      message: approved ? '회원이 승인되었습니다.' : '회원 승인이 취소되었습니다.',
      profile: data 
    });
  } catch (error: any) {
    console.error('승인 상태 업데이트 예외:', error);
    return NextResponse.json(
      { error: error.message || '승인 상태를 업데이트하는 중 오류가 발생했습니다.' },
      { status: 500 }
    );
  }
}
