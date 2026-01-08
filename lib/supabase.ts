import { createClient } from '@supabase/supabase-js'

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY

// 통합 회원 시스템: Supabase는 더 이상 사용하지 않으므로 환경 변수 검증 로그 제거
// education 페이지의 파일 업로드/다운로드에서만 사용 (선택적)
function validateSupabaseConfig() {
  if (!supabaseUrl || !supabaseAnonKey) {
    // 통합 회원 시스템: 오류 로그 제거 (조용히 처리)
    return false
  }

  // URL 형식 검증
  try {
    new URL(supabaseUrl)
  } catch (urlError) {
    // 통합 회원 시스템: 오류 로그 제거 (조용히 처리)
    return false
  }

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
