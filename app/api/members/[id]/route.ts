import { NextRequest, NextResponse } from 'next/server';
import { createClient } from '@supabase/supabase-js';

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL!;
const supabaseServiceKey = process.env.SUPABASE_SERVICE_ROLE_KEY!;

// 회원 정보 수정
export async function PUT(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    if (!supabaseServiceKey) {
      return NextResponse.json(
        { error: '서버 설정 오류가 발생했습니다.' },
        { status: 500 }
      );
    }

    const { name, phone, branch, office, position } = await request.json();
    const userId = params.id;

    if (!userId) {
      return NextResponse.json(
        { error: '회원 ID가 필요합니다.' },
        { status: 400 }
      );
    }

    const supabaseAdmin = createClient(supabaseUrl, supabaseServiceKey);

    // profiles 테이블 업데이트
    const updateData: any = {};
    if (name !== undefined) updateData.name = name;
    if (phone !== undefined) updateData.phone = phone;
    if (branch !== undefined) updateData.branch = branch;
    if (office !== undefined) updateData.office = office;
    if (position !== undefined) updateData.position = position;
    updateData.updated_at = new Date().toISOString();

    const { data, error } = await supabaseAdmin
      .from('profiles')
      .update(updateData)
      .eq('id', userId)
      .select()
      .single();

    if (error) {
      console.error('회원 정보 수정 에러:', error);
      return NextResponse.json(
        { error: '회원 정보를 수정하는 중 오류가 발생했습니다.' },
        { status: 500 }
      );
    }

    return NextResponse.json({ 
      success: true, 
      message: '회원 정보가 수정되었습니다.',
      profile: data 
    });
  } catch (error: any) {
    console.error('회원 정보 수정 예외:', error);
    return NextResponse.json(
      { error: error.message || '회원 정보를 수정하는 중 오류가 발생했습니다.' },
      { status: 500 }
    );
  }
}

// 회원 삭제
export async function DELETE(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    if (!supabaseServiceKey) {
      return NextResponse.json(
        { error: '서버 설정 오류가 발생했습니다.' },
        { status: 500 }
      );
    }

    const userId = params.id;

    if (!userId) {
      return NextResponse.json(
        { error: '회원 ID가 필요합니다.' },
        { status: 400 }
      );
    }

    const supabaseAdmin = createClient(supabaseUrl, supabaseServiceKey);

    // auth.users에서 사용자 삭제 (profiles는 CASCADE로 자동 삭제됨)
    const { error: deleteAuthError } = await supabaseAdmin.auth.admin.deleteUser(userId);

    if (deleteAuthError) {
      console.error('회원 삭제 에러:', deleteAuthError);
      return NextResponse.json(
        { error: '회원을 삭제하는 중 오류가 발생했습니다.' },
        { status: 500 }
      );
    }

    return NextResponse.json({ 
      success: true, 
      message: '회원이 삭제되었습니다.' 
    });
  } catch (error: any) {
    console.error('회원 삭제 예외:', error);
    return NextResponse.json(
      { error: error.message || '회원을 삭제하는 중 오류가 발생했습니다.' },
      { status: 500 }
    );
  }
}
