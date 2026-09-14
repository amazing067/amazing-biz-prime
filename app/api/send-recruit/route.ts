import { NextRequest, NextResponse } from "next/server";
import nodemailer from "nodemailer";

/**
 * ★봇 스팸 차단 (2026-09-14)
 *
 * 이 양식에는 방어가 하나도 없어서 봇이 무작위 값으로 계속 메일을 넣고 있었다.
 * 실제로 받은 것: 이름 `zeSLacmwYGDhkROLnhFAUJEO` · 연락처 `863-5180-033`(한국 번호 아님)
 * · 이메일 `a.q.i.x.i.piy.e.r9.0.9@gmail.com`(점 찍기 수법) · 주소 `Bhldalnxh`.
 *
 * 사람에게 보이는 화면은 그대로 두고 넷을 막는다.
 *   ① 허니팟 — 사람 눈에 안 보이는 칸. 채워져 있으면 봇이다.
 *   ② 형식 검증 — 이름·휴대폰·이메일이 최소한 사람이 쓸 수 있는 모양인지.
 *   ③ HTML 이스케이프 — 입력이 메일 본문에 그대로 들어가 링크·이미지가 살아나던 것.
 *   ④ 호출 제한 — 같은 IP 가 짧은 시간에 반복해 넣는 것.
 */

/** 메일 본문에 그대로 꽂히던 값들을 막는다 — 스패머가 낚시 링크를 심을 수 있었다 */
function esc(v: unknown): string {
  return String(v ?? "")
    .replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;").replace(/'/g, "&#39;");
}

/** 같은 IP 의 연속 제출 — 서버 메모리로 충분하다(대량 투척만 막으면 된다) */
const recent = new Map<string, number[]>();
const WINDOW_MS = 10 * 60 * 1000;   // 10분
const MAX_IN_WINDOW = 3;            // 10분에 3건까지

function tooMany(ip: string): boolean {
  const now = Date.now();
  const hits = (recent.get(ip) ?? []).filter((t) => now - t < WINDOW_MS);
  hits.push(now);
  recent.set(ip, hits);
  if (recent.size > 500) {          // 메모리가 무한정 늘지 않게
    for (const [k, v] of recent) if (!v.some((t) => now - t < WINDOW_MS)) recent.delete(k);
  }
  return hits.length > MAX_IN_WINDOW;
}

/** 사람이 쓸 수 있는 모양인가 — 통과 못 하면 무엇이 틀렸는지 알려주지 않는다(봇에게 힌트가 된다) */
function looksHuman(body: Record<string, unknown>): boolean {
  const name = String(body.name ?? "").trim();
  const phone = String(body.phone ?? "").replace(/[^0-9]/g, "");
  const email = String(body.email ?? "").trim();

  // 이름 — 한글·영문 2~20자. 무작위 대소문자 뒤섞인 긴 문자열을 막는다
  if (!/^[가-힣a-zA-Z][가-힣a-zA-Z ."'-]{1,19}$/.test(name)) return false;
  // 휴대폰 — 010 으로 시작하는 10~11자리
  if (!/^01[016789][0-9]{7,8}$/.test(phone)) return false;
  // 이메일 — 비워 둘 수 있지만, 쓴다면 모양은 맞아야 한다
  if (email && email !== "미입력" && !/^[^\s@]+@[^\s@]+\.[a-zA-Z]{2,}$/.test(email)) return false;
  return true;
}

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const tracking = body.tracking || {};

    /* ① 허니팟 — 사람에겐 보이지 않는 칸이라, 채워져 있으면 봇이다.
          봇이 눈치채지 못하게 **성공한 것처럼** 응답하고 메일만 보내지 않는다. */
    if (String(body.website ?? "").trim() !== "") {
      return NextResponse.json({ success: true });
    }

    /* ② 호출 제한 */
    const ip = request.headers.get("x-forwarded-for")?.split(",")[0].trim()
      || request.headers.get("x-real-ip") || "unknown";
    if (tooMany(ip)) {
      return NextResponse.json({ success: true });
    }

    /* ③ 형식 검증 */
    if (!looksHuman(body)) {
      return NextResponse.json(
        { error: "이름과 연락처를 다시 확인해 주세요." },
        { status: 400 }
      );
    }

    // 환경 변수에서 이메일 설정 가져오기
    const emailUser = process.env.EMAIL_USER || "";
    const emailPass = process.env.EMAIL_PASS || "";
    const emailHost = process.env.EMAIL_HOST || "smtp.gmail.com";
    const emailPort = parseInt(process.env.EMAIL_PORT || "587");

    // 디버깅 정보 (개발 환경에서만)
    if (process.env.NODE_ENV === "development") {
      console.log("환경 변수 확인:", {
        EMAIL_USER: emailUser ? `${emailUser.substring(0, 3)}***` : "없음",
        EMAIL_PASS: emailPass ? `${emailPass.substring(0, 2)}*** (길이: ${emailPass.length})` : "없음",
        EMAIL_HOST: emailHost,
        EMAIL_PORT: emailPort,
      });
    }

    if (!emailUser || !emailPass) {
      const missingVars = [];
      if (!emailUser) missingVars.push("EMAIL_USER");
      if (!emailPass) missingVars.push("EMAIL_PASS");
      
      return NextResponse.json(
        { 
          error: "이메일 설정이 완료되지 않았습니다.",
          details: `다음 환경 변수가 설정되지 않았습니다: ${missingVars.join(", ")}`,
          help: process.env.VERCEL || process.env.NETLIFY
            ? "배포 환경입니다. 호스팅 대시보드(Vercel/Netlify 등)에서 EMAIL_USER, EMAIL_PASS 환경 변수를 추가한 뒤 재배포해주세요."
            : ".env.local 파일을 프로젝트 루트에 두고 EMAIL_USER, EMAIL_PASS를 설정한 뒤 개발 서버를 재시작해주세요."
        },
        { status: 500 }
      );
    }

    // Nodemailer transporter 생성
    const transporter = nodemailer.createTransport({
      service: 'gmail', // Gmail 서비스 사용
      auth: {
        user: emailUser,
        pass: emailPass,
      },
      // Gmail 연결을 위한 추가 옵션
      tls: {
        rejectUnauthorized: false,
      },
    });

    // 연결 테스트 (개발 환경에서만)
    if (process.env.NODE_ENV === "development") {
      try {
        await transporter.verify();
        console.log("이메일 서버 연결 성공!");
      } catch (verifyError) {
        console.error("이메일 서버 연결 실패:", verifyError);
      }
    }

    // 이메일 내용 생성
    const htmlContent = `
      <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto; padding: 20px;">
        <h2 style="color: #2563EB; border-bottom: 2px solid #2563EB; padding-bottom: 10px;">
          입사 지원서
        </h2>
        
        <div style="margin-top: 20px;">
          <h3 style="color: #334155; margin-bottom: 15px;">지원자 정보</h3>
          <table style="width: 100%; border-collapse: collapse;">
            <tr>
              <td style="padding: 8px; border-bottom: 1px solid #e2e8f0; font-weight: bold; width: 120px;">이름</td>
              <td style="padding: 8px; border-bottom: 1px solid #e2e8f0;">${esc(body.name)}</td>
            </tr>
            <tr>
              <td style="padding: 8px; border-bottom: 1px solid #e2e8f0; font-weight: bold;">연락처</td>
              <td style="padding: 8px; border-bottom: 1px solid #e2e8f0;">${esc(body.phone)}</td>
            </tr>
            <tr>
              <td style="padding: 8px; border-bottom: 1px solid #e2e8f0; font-weight: bold;">이메일</td>
              <td style="padding: 8px; border-bottom: 1px solid #e2e8f0;">${esc(body.email)}</td>
            </tr>
            <tr>
              <td style="padding: 8px; border-bottom: 1px solid #e2e8f0; font-weight: bold;">주소</td>
              <td style="padding: 8px; border-bottom: 1px solid #e2e8f0;">${esc(body.address || "미입력")}</td>
            </tr>
            <tr>
              <td style="padding: 8px; border-bottom: 1px solid #e2e8f0; font-weight: bold;">경력</td>
              <td style="padding: 8px; border-bottom: 1px solid #e2e8f0;">${esc(body.experience || "미입력")}</td>
            </tr>
          </table>
        </div>

        <div style="margin-top: 24px;">
          <h3 style="color: #334155; margin-bottom: 15px;">유입 채널 정보</h3>
          <table style="width: 100%; border-collapse: collapse;">
            <tr>
              <td style="padding: 8px; border-bottom: 1px solid #e2e8f0; font-weight: bold; width: 120px;">랜딩 경로</td>
              <td style="padding: 8px; border-bottom: 1px solid #e2e8f0;">${esc(tracking.landingPath || "미입력")}</td>
            </tr>
            <tr>
              <td style="padding: 8px; border-bottom: 1px solid #e2e8f0; font-weight: bold;">랜딩 URL</td>
              <td style="padding: 8px; border-bottom: 1px solid #e2e8f0; word-break: break-all;">${esc(tracking.landingUrl || "미입력")}</td>
            </tr>
            <tr>
              <td style="padding: 8px; border-bottom: 1px solid #e2e8f0; font-weight: bold;">Referrer</td>
              <td style="padding: 8px; border-bottom: 1px solid #e2e8f0; word-break: break-all;">${esc(tracking.referrer || "직접 유입")}</td>
            </tr>
            <tr>
              <td style="padding: 8px; border-bottom: 1px solid #e2e8f0; font-weight: bold;">UTM</td>
              <td style="padding: 8px; border-bottom: 1px solid #e2e8f0;">
                source=${esc(tracking.utmSource || "-")}, medium=${esc(tracking.utmMedium || "-")}, campaign=${esc(tracking.utmCampaign || "-")}, content=${esc(tracking.utmContent || "-")}, term=${esc(tracking.utmTerm || "-")}
              </td>
            </tr>
          </table>
        </div>

        <div style="margin-top: 30px;">
          <h3 style="color: #334155; margin-bottom: 15px;">지원 동기</h3>
          <p style="padding: 15px; background-color: #f8fafc; border-radius: 8px; color: #475569; white-space: pre-wrap;">
            ${esc(body.message || "미입력")}
          </p>
        </div>

        <div style="margin-top: 30px; padding-top: 20px; border-top: 1px solid #e2e8f0; color: #64748b; font-size: 12px;">
          <p>이 이메일은 ${esc(body.name)}님(${esc(body.email)})으로부터 전송되었습니다.</p>
        </div>
      </div>
    `;

    // 이메일 전송
    await transporter.sendMail({
      from: `"입사 지원 시스템" <${emailUser}>`,
      to: "induo@naver.com",
      replyTo: body.email,
      subject: `[입사지원] ${String(body.name).slice(0, 20)}님의 지원서`,   // ★제목을 그대로 받지 않는다(헤더 주입)
      html: htmlContent,
    });

    return NextResponse.json({ success: true, message: "이메일이 성공적으로 전송되었습니다." });
  } catch (error: any) {
    console.error("Email sending error:", error);
    
    // Gmail 관련 일반적인 오류 메시지 처리
    let errorMessage = error.message || "이메일 전송 중 오류가 발생했습니다.";
    let helpMessage = "";
    
    if (error.message?.includes("Invalid login")) {
      errorMessage = "이메일 주소 또는 앱 비밀번호가 잘못되었습니다.";
      helpMessage = "EMAIL_USER와 EMAIL_PASS를 확인해주세요.";
    } else if (error.message?.includes("Connection")) {
      errorMessage = "이메일 서버에 연결할 수 없습니다.";
      helpMessage = "인터넷 연결을 확인하거나 EMAIL_HOST와 EMAIL_PORT를 확인해주세요.";
    } else if (error.message?.includes("authentication")) {
      errorMessage = "인증에 실패했습니다.";
      helpMessage = "앱 비밀번호가 올바른지 확인해주세요. Gmail 2단계 인증이 활성화되어 있어야 합니다.";
    }
    
    return NextResponse.json(
      { 
        error: errorMessage,
        details: error.message,
        help: helpMessage,
        fullError: process.env.NODE_ENV === "development" ? error.stack : undefined
      },
      { status: 500 }
    );
  }
}
