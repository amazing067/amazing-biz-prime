// 환경 변수 확인 스크립트
// 사용법: node check-env.js

const requiredEnvVars = [
  'NEXT_PUBLIC_SUPABASE_URL',
  'NEXT_PUBLIC_SUPABASE_ANON_KEY',
  'SUPABASE_SERVICE_ROLE_KEY'
];

const optionalEnvVars = [
  'EMAIL_USER',
  'EMAIL_PASS'
];

console.log('🔍 환경 변수 확인 중...\n');

let hasError = false;

// 필수 환경 변수 확인
console.log('📋 필수 환경 변수:');
requiredEnvVars.forEach(varName => {
  const value = process.env[varName];
  if (value) {
    // URL인 경우 일부만 표시
    if (varName.includes('URL')) {
      console.log(`  ✅ ${varName}: ${value.substring(0, 30)}...`);
    } else {
      // 키인 경우 길이만 표시
      console.log(`  ✅ ${varName}: [${value.length}자]`);
    }
    
    // URL 형식 검증
    if (varName.includes('URL')) {
      try {
        new URL(value);
      } catch (e) {
        console.log(`  ❌ ${varName}: 잘못된 URL 형식`);
        hasError = true;
      }
    }
  } else {
    console.log(`  ❌ ${varName}: 설정되지 않음`);
    hasError = true;
  }
});

console.log('\n📋 선택적 환경 변수:');
optionalEnvVars.forEach(varName => {
  const value = process.env[varName];
  if (value) {
    console.log(`  ✅ ${varName}: 설정됨`);
  } else {
    console.log(`  ⚠️  ${varName}: 설정되지 않음 (이메일 기능 사용 불가)`);
  }
});

console.log('\n' + '='.repeat(50));

if (hasError) {
  console.log('❌ 필수 환경 변수가 누락되었습니다.');
  console.log('📝 .env.local 파일을 확인하고 필요한 변수를 설정하세요.');
  console.log('📖 자세한 내용은 ENV_SETUP_GUIDE.md를 참조하세요.');
  process.exit(1);
} else {
  console.log('✅ 모든 필수 환경 변수가 설정되었습니다.');
  console.log('💡 개발 서버를 시작하려면: npm run dev');
}

