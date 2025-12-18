import { NextRequest, NextResponse } from "next/server";
import nodemailer from "nodemailer";

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();

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
          help: ".env.local 파일을 프로젝트 루트에 생성하고 EMAIL_USER와 EMAIL_PASS를 설정해주세요."
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
          명찰 신청서
        </h2>
        
        <div style="margin-top: 20px;">
          <h3 style="color: #334155; margin-bottom: 15px;">신청자 정보</h3>
          <table style="width: 100%; border-collapse: collapse;">
            <tr>
              <td style="padding: 8px; border-bottom: 1px solid #e2e8f0; font-weight: bold; width: 120px;">이름</td>
              <td style="padding: 8px; border-bottom: 1px solid #e2e8f0;">${body.name}</td>
            </tr>
            <tr>
              <td style="padding: 8px; border-bottom: 1px solid #e2e8f0; font-weight: bold;">직책</td>
              <td style="padding: 8px; border-bottom: 1px solid #e2e8f0;">${body.position}</td>
            </tr>
            <tr>
              <td style="padding: 8px; border-bottom: 1px solid #e2e8f0; font-weight: bold;">본부</td>
              <td style="padding: 8px; border-bottom: 1px solid #e2e8f0;">${body.branch}</td>
            </tr>
            <tr>
              <td style="padding: 8px; border-bottom: 1px solid #e2e8f0; font-weight: bold;">지사</td>
              <td style="padding: 8px; border-bottom: 1px solid #e2e8f0;">${body.office}</td>
            </tr>
            <tr>
              <td style="padding: 8px; border-bottom: 1px solid #e2e8f0; font-weight: bold;">사원번호</td>
              <td style="padding: 8px; border-bottom: 1px solid #e2e8f0;">${body.employeeNumber}</td>
            </tr>
            <tr>
              <td style="padding: 8px; border-bottom: 1px solid #e2e8f0; font-weight: bold;">협회등록번호</td>
              <td style="padding: 8px; border-bottom: 1px solid #e2e8f0;">${body.associationNumber}</td>
            </tr>
            <tr>
              <td style="padding: 8px; border-bottom: 1px solid #e2e8f0; font-weight: bold;">전화번호</td>
              <td style="padding: 8px; border-bottom: 1px solid #e2e8f0;">${body.phone}</td>
            </tr>
          </table>
        </div>

        <div style="margin-top: 30px; padding: 15px; background-color: #fef3c7; border-radius: 8px; border-left: 4px solid #f59e0b;">
          <p style="color: #92400e; font-weight: bold; margin: 0;">
            ※ 프로필사진은 따로 보내주시기 바랍니다.
          </p>
        </div>

        <div style="margin-top: 30px; padding-top: 20px; border-top: 1px solid #e2e8f0; color: #64748b; font-size: 12px;">
          <p>이 이메일은 ${body.name}님의 명찰 신청서입니다.</p>
        </div>
      </div>
    `;

    // 이메일 전송
    await transporter.sendMail({
      from: `"명찰 신청 시스템" <${emailUser}>`,
      to: "induo@naver.com",
      subject: body.subject || `[명찰신청] ${body.name}님의 명찰 신청서`,
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
