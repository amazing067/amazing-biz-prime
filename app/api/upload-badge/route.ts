import { NextRequest, NextResponse } from "next/server";
import { writeFile, mkdir } from "fs/promises";
import { join } from "path";
import { existsSync } from "fs";

export async function POST(request: NextRequest) {
  try {
    const formData = await request.formData();
    const file = formData.get("file") as File;

    if (!file) {
      return NextResponse.json(
        { error: "파일이 없습니다." },
        { status: 400 }
      );
    }

    // 파일 크기 체크 (2MB 제한)
    const maxSize = 2 * 1024 * 1024; // 2MB
    if (file.size > maxSize) {
      return NextResponse.json(
        { error: "파일 크기는 2MB를 초과할 수 없습니다." },
        { status: 400 }
      );
    }

    // 이미지 파일인지 확인
    if (!file.type.startsWith("image/")) {
      return NextResponse.json(
        { error: "이미지 파일만 업로드 가능합니다." },
        { status: 400 }
      );
    }

    // 파일을 바이트로 변환
    const bytes = await file.arrayBuffer();
    const buffer = Buffer.from(bytes);

    // 업로드 디렉토리 생성 (public/uploads/badge)
    const uploadDir = join(process.cwd(), "public", "uploads", "badge");
    if (!existsSync(uploadDir)) {
      await mkdir(uploadDir, { recursive: true });
    }

    // 고유한 파일명 생성
    const timestamp = Date.now();
    const randomString = Math.random().toString(36).substring(2, 15);
    const fileExtension = file.name.split(".").pop();
    const fileName = `badge-${timestamp}-${randomString}.${fileExtension}`;
    const filePath = join(uploadDir, fileName);

    // 파일 저장
    await writeFile(filePath, buffer);

    // 이미지 URL 반환
    const imageUrl = `/uploads/badge/${fileName}`;

    return NextResponse.json({
      success: true,
      imageUrl: imageUrl,
      fileName: file.name,
    });
  } catch (error) {
    console.error("File upload error:", error);
    return NextResponse.json(
      { error: "파일 업로드 중 오류가 발생했습니다." },
      { status: 500 }
    );
  }
}
