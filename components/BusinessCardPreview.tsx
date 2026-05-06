"use client";

import Image from "next/image";
import { motion } from "framer-motion";

// 색상 옵션 — 명함 배경색
export const CARD_COLOR_OPTIONS = {
  white: { bg: "#ffffff", label: "흰색", swatchBorder: true },
  gold: { bg: "#e8d4a3", label: "금색", swatchBorder: false },
  pink: { bg: "#f8d7da", label: "핑크", swatchBorder: false },
  mint: { bg: "#d4ecd8", label: "민트", swatchBorder: false },
  sky: { bg: "#d1e7f5", label: "스카이", swatchBorder: false },
} as const;

export type CardColor = keyof typeof CARD_COLOR_OPTIONS;

export const COLOR_LABEL_MAP: Record<string, string> = Object.fromEntries(
  Object.entries(CARD_COLOR_OPTIONS).map(([k, v]) => [k, v.label])
);

interface Props {
  orientation: string;
  color: string;
  name: string;
  position: string;
  branch: string;
  office: string;
  phone: string;
  fax: string;
  email: string;
  address: string;
}

// 우측 하단용 박스 로고 (prime-logo.png에서 책 부분만 잘라서 표시)
function PrimeBoxLogo({ width = 80, height = 56 }: { width?: number; height?: number }) {
  // prime-logo.png 비율: 책+PRIME ASSET 부분이 전체의 약 28%
  // 컨테이너 폭의 약 3.5배로 이미지를 늘려서 좌측만 보이게
  const imgWidth = width * 3.5;
  return (
    <div
      className="bg-no-repeat shrink-0"
      style={{
        width: `${width}px`,
        height: `${height}px`,
        backgroundImage: "url('/prime-logo.png')",
        backgroundSize: `${imgWidth}px auto`,
        backgroundPosition: "left center",
      }}
      aria-label="PRIME ASSET"
    />
  );
}

function ph(val: string, placeholder: string, italic = true) {
  if (val && val.trim()) return <span>{val}</span>;
  return <span className={`opacity-40 ${italic ? "italic" : ""}`}>{placeholder}</span>;
}

export default function BusinessCardPreview({
  orientation,
  color,
  name,
  position,
  branch,
  office,
  phone,
  fax,
  email,
  address,
}: Props) {
  const isVertical = orientation === "vertical";
  const colorKey = (color in CARD_COLOR_OPTIONS ? color : "white") as CardColor;
  const bgColor = CARD_COLOR_OPTIONS[colorKey].bg;

  const wrapperClass = isVertical
    ? "w-[min(280px,90%)] aspect-[5/9]"
    : "w-[min(500px,95%)] aspect-[9/5]";

  const branchOffice = [branch, office].filter(Boolean).join(" ");
  const positionLabel = position;

  if (isVertical) {
    return (
      <motion.div
        layout
        className={`${wrapperClass} text-slate-900 shadow-2xl mx-auto relative font-sans break-keep overflow-hidden`}
        style={{ background: bgColor }}
      >
        {/* 빨간 외곽 보더 */}
        <div className="absolute inset-[6px] border border-red-600 rounded-[2px] pointer-events-none" />

        <div className="absolute inset-0 px-5 py-6 flex flex-col items-center text-center">
          {/* 상단 가운데: 통합 로고 (책 + PRIME ASSET + 프라임에셋㈜) */}
          <div className="pt-3 flex flex-col items-center">
            <div className="relative w-[150px] h-[40px]">
              <Image
                src="/prime-logo.png"
                alt="Prime Asset"
                fill
                className="object-contain"
                priority
              />
            </div>
            <div className="text-[10px] text-slate-700 mt-1">㈜</div>
          </div>

          {/* 본부 / 직책 */}
          <div className="mt-6 text-[10px] text-slate-700">
            {ph(
              [branchOffice, positionLabel].filter(Boolean).join(" / "),
              "본부 / 직책"
            )}
          </div>

          {/* 이름 (한글, 자간 넓게) */}
          <div className="mt-1.5 text-[24px] font-bold tracking-[0.25em] text-slate-900 leading-none">
            {ph(name, "홍 길 동", false)}
          </div>

          {/* 영문 이름 placeholder */}
          {!name && (
            <div className="mt-1 text-[10px] text-slate-600 tracking-[0.15em] opacity-40 italic">
              Hong Gil dong
            </div>
          )}

          {/* 연락처 (Mobile/E-mail/Fax) */}
          <div className="mt-5 text-[10px] space-y-0.5 text-slate-800">
            <div>
              <span className="text-slate-600">Mobile </span>
              <span className="font-semibold">{ph(phone, "010-1234-5678")}</span>
            </div>
            <div>
              <span className="text-slate-600">E-mail </span>
              <span>{ph(email, "aaaa@naver.com")}</span>
            </div>
            <div>
              <span className="text-slate-600">Fax </span>
              <span>{ph(fax, "0000-000-0000")}</span>
            </div>
          </div>

          {/* 주소 */}
          <div className="mt-4 text-[9.5px] text-slate-800 leading-tight px-2">
            {ph(address, "본부 선택 시 자동 입력")}
          </div>

          {/* 하단 우측 영문 사인 placeholder */}
          <div className="mt-auto self-end italic text-slate-700 text-[11px] pb-1 pr-1">
            {!name && <span className="opacity-40">Hong Gil dong</span>}
          </div>
        </div>
      </motion.div>
    );
  }

  // 가로형
  return (
    <motion.div
      layout
      className={`${wrapperClass} text-slate-900 shadow-2xl mx-auto relative font-sans break-keep overflow-hidden`}
      style={{ background: bgColor }}
    >
      {/* 빨간 외곽 보더 */}
      <div className="absolute inset-[6px] border border-red-600 rounded-[2px] pointer-events-none" />

      <div className="absolute inset-0 px-6 py-5 flex flex-col">
        {/* 좌측 상단: 통합 로고 (책 + PRIME ASSET + 프라임에셋) */}
        <div className="relative w-[200px] h-[40px]">
          <Image
            src="/prime-logo.png"
            alt="Prime Asset"
            fill
            className="object-contain object-left"
            priority
          />
        </div>

        {/* 이름 + 직급 | 부서 */}
        <div className="mt-4 flex items-baseline gap-3 flex-wrap">
          <span className="text-[22px] font-bold tracking-[0.15em] text-slate-900">
            {ph(name, "홍 길 동", false)}
          </span>
          <span className="text-[10px] text-slate-700">
            {ph(
              [positionLabel, branchOffice].filter(Boolean).join(" | "),
              "직급 | 부서"
            )}
          </span>
        </div>

        {/* 그라데이션 디바이더 (녹색→노랑) */}
        <div className="mt-2 h-[3px] w-[60%] bg-gradient-to-r from-green-700 via-yellow-400 to-yellow-500" />

        {/* 하단: 좌측 정보 + 우측 박스 로고 */}
        <div className="mt-3 flex-grow flex flex-row items-end">
          <div className="flex-grow text-[10.5px] space-y-[3px] text-slate-800">
            <div>
              <span className="text-slate-600">M. </span>
              {ph(phone, "010-1234-5678")}
            </div>
            <div>
              <span className="text-slate-600">F. </span>
              {ph(fax, "0000-000-0000")}
            </div>
            <div>
              <span className="text-slate-600">E. </span>
              {ph(email, "aaaaa@naver.com")}
            </div>
            <div className="text-[10px] leading-tight pt-1">
              {ph(address, "본부 선택 시 자동 입력")}
            </div>
          </div>

          {/* 우측 하단: 박스 로고 (책 부분만) */}
          <div className="ml-3">
            <PrimeBoxLogo width={80} height={56} />
          </div>
        </div>
      </div>
    </motion.div>
  );
}
