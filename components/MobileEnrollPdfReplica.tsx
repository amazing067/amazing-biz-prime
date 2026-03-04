"use client";

import { useMemo, useState } from "react";
import { ChevronLeft, ChevronRight, Maximize2 } from "lucide-react";

const TOTAL_PAGES = 77;
const PDF_URL = "/mobile-subscription/%EC%84%9C%EB%A9%B4%EC%B2%AD%EC%95%BD%EC%84%9C.pdf";

export default function MobileEnrollPdfReplica() {
  const [page, setPage] = useState(1);
  const [inputPage, setInputPage] = useState("1");

  const progress = useMemo(() => Math.round((page / TOTAL_PAGES) * 100), [page]);
  const pdfSrc = useMemo(() => `${PDF_URL}#page=${page}&zoom=page-fit`, [page]);

  function go(nextPage: number) {
    const clamped = Math.max(1, Math.min(TOTAL_PAGES, nextPage));
    setPage(clamped);
    setInputPage(String(clamped));
  }

  function openRawPdf() {
    window.open(PDF_URL, "_blank", "noopener,noreferrer");
  }

  return (
    <div className="w-full max-w-7xl mx-auto px-4 sm:px-6">
      <div className="mb-4 flex items-center justify-between gap-3">
        <div>
          <h2 className="text-lg sm:text-xl font-bold text-slate-900">서면청약서 원본 77페이지 실습 뷰</h2>
          <p className="text-sm text-slate-600">요약형이 아닌 원본 문서를 페이지 단위로 그대로 보면서 교육합니다.</p>
        </div>
        <button
          type="button"
          onClick={openRawPdf}
          className="inline-flex items-center gap-1.5 rounded-lg border border-slate-300 bg-white px-3 py-2 text-sm font-medium text-slate-800"
        >
          <Maximize2 className="w-4 h-4" />
          원본 열기
        </button>
      </div>

      <div className="rounded-2xl border border-slate-200 bg-white p-3 sm:p-5">
        <div className="mb-3 flex flex-wrap items-center gap-2 sm:gap-3">
          <button
            type="button"
            onClick={() => go(page - 1)}
            disabled={page <= 1}
            className="inline-flex items-center gap-1 rounded-lg border border-slate-300 bg-white px-3 py-2 text-sm text-slate-700 disabled:opacity-40"
          >
            <ChevronLeft className="w-4 h-4" />
            이전 페이지
          </button>

          <button
            type="button"
            onClick={() => go(page + 1)}
            disabled={page >= TOTAL_PAGES}
            className="inline-flex items-center gap-1 rounded-lg border border-slate-300 bg-white px-3 py-2 text-sm text-slate-700 disabled:opacity-40"
          >
            다음 페이지
            <ChevronRight className="w-4 h-4" />
          </button>

          <div className="flex items-center gap-2 ml-0 sm:ml-2">
            <span className="text-sm text-slate-600">이동</span>
            <input
              value={inputPage}
              onChange={(e) => setInputPage(e.target.value.replace(/\D/g, "").slice(0, 2))}
              className="w-16 rounded-lg border border-slate-300 px-2 py-1.5 text-sm"
              inputMode="numeric"
            />
            <button
              type="button"
              onClick={() => go(Number(inputPage || 1))}
              className="rounded-lg bg-sky-600 px-3 py-1.5 text-sm font-semibold text-white"
            >
              이동
            </button>
          </div>

          <div className="ml-auto text-sm text-slate-700 font-medium">
            {page} / {TOTAL_PAGES} 페이지
          </div>
        </div>

        <div className="mb-3 h-2 w-full rounded-full bg-slate-100">
          <div className="h-full rounded-full bg-sky-500 transition-all" style={{ width: `${progress}%` }} />
        </div>

        <div className="rounded-xl overflow-hidden border border-slate-200 bg-slate-50">
          <iframe
            key={page}
            title={`서면청약서 페이지 ${page}`}
            src={pdfSrc}
            className="w-full h-[76vh] bg-white"
          />
        </div>
      </div>
    </div>
  );
}

