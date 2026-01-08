import { createClient } from '@supabase/supabase-js'

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY

// 환경 변수 검증 함수
function validateSupabaseConfig() {
  if (!supabaseUrl || !supabaseAnonKey) {
    const error = {
      hasUrl: !!supabaseUrl,
      hasKey: !!supabaseAnonKey,
      url: supabaseUrl ? `${supabaseUrl.substring(0, 30)}...` : '없음'
    }
    
    if (typeof window !== 'undefined') {
      console.error('❌ Supabase 환경 변수 누락:', error)
    }
    return false
  }

  // URL 형식 검증
  try {
    new URL(supabaseUrl)
  } catch (urlError) {
    if (typeof window !== 'undefined') {
      console.error('❌ 잘못된 Supabase URL 형식:', supabaseUrl)
    }
    return false
  }

  // 통합 회원 시스템: Supabase는 더 이상 사용하지 않으므로 로그 제거
  // if (typeof window !== 'undefined') {
  //   console.log('✅ Supabase 클라이언트 초기화:', {
  //     url: `${supabaseUrl.substring(0, 30)}...`,
  //     keyLength: supabaseAnonKey.length
  //   })
  // }
  return true
}

// 환경 변수 검증
const isValidConfig = validateSupabaseConfig()

// 환경 변수가 없을 때도 더미 클라이언트를 생성하여 빌드 오류 방지
// 하지만 실제 사용 시 오류가 발생하도록 함
export const supabase = supabaseUrl && supabaseAnonKey && isValidConfig
  ? createClient(supabaseUrl, supabaseAnonKey, {
      auth: {
        storage: typeof window !== 'undefined' ? window.sessionStorage : undefined,
        autoRefreshToken: true,
        persistSession: true,
        detectSessionInUrl: true
      }
    })
  : createClient('https://placeholder.supabase.co', 'placeholder-key')
