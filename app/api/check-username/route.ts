import { NextRequest, NextResponse } from 'next/server';
import { createClient } from '@supabase/supabase-js';

export async function POST(request: NextRequest) {
  try {
    const { username } = await request.json();

    // 환경 변수 검증 (가장 먼저 체크)
    const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
    const supabaseServiceKey = process.env.SUPABASE_SERVICE_ROLE_KEY;

    if (!supabaseUrl || !supabaseServiceKey) {
      console.error('환경 변수 누락:', {
        hasUrl: !!supabaseUrl,
        hasKey: !!supabaseServiceKey,
        url: supabaseUrl ? `${supabaseUrl.substring(0, 20)}...` : '없음'
      });
      return NextResponse.json(
        { 
          available: false, 
          error: '서버 설정 오류: Supabase 환경 변수가 설정되지 않았습니다. 관리자에게 문의해주세요.' 
        },
        { status: 500 }
      );
    }

    // Supabase URL 유효성 검증
    try {
      new URL(supabaseUrl);
    } catch (urlError) {
      console.error('잘못된 Supabase URL:', supabaseUrl);
      return NextResponse.json(
        { 
          available: false, 
          error: '서버 설정 오류: Supabase URL 형식이 올바르지 않습니다.' 
        },
        { status: 500 }
      );
    }

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
    const supabaseAdmin = createClient(supabaseUrl, supabaseServiceKey);

    // 아이디를 이메일 형식으로 변환
    const checkEmail = `${username}@amazing-biz.com`;

    try {
      // 사용자 목록 조회
      const { data: usersData, error: listUsersError } = await supabaseAdmin.auth.admin.listUsers();

      if (listUsersError) {
        console.error('listUsers 에러:', listUsersError);
        
        // 네트워크/DNS 오류인 경우 명확한 오류 반환
        if (listUsersError.message?.includes('Failed to fetch') || 
            listUsersError.message?.includes('ERR_NAME_NOT_RESOLVED') ||
            listUsersError.message?.includes('getaddrinfo')) {
          return NextResponse.json(
            { 
              available: false, 
              error: 'Supabase 서버에 연결할 수 없습니다. Supabase 프로젝트 URL을 확인해주세요.' 
            },
            { status: 503 }
          );
        }
        
        // 다른 오류인 경우 명확한 오류 반환 (사용 가능으로 처리하지 않음)
        return NextResponse.json(
          { 
            available: false, 
            error: `아이디 중복 확인 중 오류가 발생했습니다: ${listUsersError.message || '알 수 없는 오류'}` 
          },
          { status: 500 }
        );
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
      
      // 네트워크 오류인 경우
      if (err.message?.includes('Failed to fetch') || 
          err.message?.includes('ERR_NAME_NOT_RESOLVED') ||
          err.message?.includes('getaddrinfo')) {
        return NextResponse.json(
          { 
            available: false, 
            error: 'Supabase 서버에 연결할 수 없습니다. 네트워크 연결을 확인해주세요.' 
          },
          { status: 503 }
        );
      }
      
      // 다른 예외인 경우 명확한 오류 반환
      return NextResponse.json(
        { 
          available: false, 
          error: `아이디 중복 확인 중 오류가 발생했습니다: ${err.message || '알 수 없는 오류'}` 
        },
        { status: 500 }
      );
    }
  } catch (error: any) {
    return NextResponse.json(
      { available: false, error: error.message || '중복 확인 중 오류가 발생했습니다.' },
      { status: 500 }
    );
  }
}
