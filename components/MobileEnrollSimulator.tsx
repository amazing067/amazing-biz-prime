"use client";

import { useEffect, useMemo, useRef, useState } from "react";
import { CheckCircle2, Loader2, RefreshCw } from "lucide-react";

type Step = {
  id: string;
  title: string;
  subtitle: string;
  notes: string[];
  compliance: string[];
};

type StepsFile = {
  meta: { title: string; version: string };
  steps: Step[];
};

export default function MobileEnrollSimulator({ data }: { data: StepsFile }) {
  const [flowStep, setFlowStep] = useState<1 | 2 | 3 | 4>(1);
  const [isVerifying, setIsVerifying] = useState(false);
  const [verifiedMethod, setVerifiedMethod] = useState("");
  const [isScrolledToBottom, setIsScrolledToBottom] = useState(false);
  const [hasSignature, setHasSignature] = useState(false);
  const [isDrawing, setIsDrawing] = useState(false);
  const [sigName, setSigName] = useState("");

  const termsRef = useRef<HTMLDivElement | null>(null);
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const baseW = 360;
  const baseH = 180;

  const currentStepMeta = useMemo(() => {
    const i = Math.min(flowStep - 1, Math.max(0, data.steps.length - 1));
    return data.steps[i];
  }, [flowStep, data.steps]);

  useEffect(() => {
    if (flowStep !== 3 || !canvasRef.current) return;
    const canvas = canvasRef.current;
    const dpr = window.devicePixelRatio || 1;
    canvas.width = Math.floor(baseW * dpr);
    canvas.height = Math.floor(baseH * dpr);
    canvas.style.width = `${baseW}px`;
    canvas.style.height = `${baseH}px`;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;
    ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
    ctx.lineWidth = 2.4;
    ctx.lineCap = "round";
    ctx.lineJoin = "round";
    ctx.strokeStyle = "#111827";
  }, [flowStep]);

  useEffect(() => {
    if (flowStep !== 2) return;
    const el = termsRef.current;
    if (!el) return;
    // Desktop/large screens can render the block without overflow.
    // In that case, allow the next button immediately.
    const noScrollNeeded = el.scrollHeight <= el.clientHeight + 1;
    setIsScrolledToBottom(noScrollNeeded);
  }, [flowStep]);

  function resetAll() {
    setFlowStep(1);
    setIsVerifying(false);
    setVerifiedMethod("");
    setIsScrolledToBottom(false);
    setHasSignature(false);
    setIsDrawing(false);
    setSigName("");
    if (termsRef.current) termsRef.current.scrollTo({ top: 0, behavior: "auto" });
    clearCanvas();
  }

  function handleVerify(method: string) {
    setIsVerifying(true);
    setTimeout(() => {
      setIsVerifying(false);
      setVerifiedMethod(method);
      setFlowStep(2);
    }, 1400);
  }

  function handleTermsScroll() {
    const el = termsRef.current;
    if (!el) return;
    const noScrollNeeded = el.scrollHeight <= el.clientHeight + 1;
    const atBottom = el.scrollTop + el.clientHeight >= el.scrollHeight - 8;
    if (noScrollNeeded || atBottom) setIsScrolledToBottom(true);
  }

  function getCanvasPos(e: React.PointerEvent<HTMLCanvasElement>) {
    const canvas = canvasRef.current;
    if (!canvas) return null;
    const rect = canvas.getBoundingClientRect();
    return { x: e.clientX - rect.left, y: e.clientY - rect.top };
  }

  function startDraw(e: React.PointerEvent<HTMLCanvasElement>) {
    e.preventDefault();
    const pos = getCanvasPos(e);
    const canvas = canvasRef.current;
    if (!canvas || !pos) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;
    canvas.setPointerCapture(e.pointerId);
    ctx.beginPath();
    ctx.moveTo(pos.x, pos.y);
    setIsDrawing(true);
    setHasSignature(true);
  }

  function onDraw(e: React.PointerEvent<HTMLCanvasElement>) {
    if (!isDrawing) return;
    e.preventDefault();
    const pos = getCanvasPos(e);
    const canvas = canvasRef.current;
    if (!canvas || !pos) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;
    ctx.lineTo(pos.x, pos.y);
    ctx.stroke();
  }

  function endDraw() {
    setIsDrawing(false);
  }

  function clearCanvas() {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;
    ctx.clearRect(0, 0, baseW, baseH);
    setHasSignature(false);
  }

  return (
    <div className="w-full max-w-6xl mx-auto px-4 sm:px-6">
      <div className="mb-4 flex items-center justify-between gap-3">
        <div className="min-w-0">
          <div className="text-xs text-slate-500">
            {data.meta.title} v{data.meta.version}
          </div>
          <div className="text-lg sm:text-xl font-bold text-slate-900 truncate">{currentStepMeta?.title ?? "모바일 청약 실습"}</div>
          <div className="text-sm text-slate-600 truncate">{currentStepMeta?.subtitle ?? "실전 흐름 기반 시뮬레이션"}</div>
        </div>
        <button
          type="button"
          onClick={resetAll}
          className="px-3 py-2 rounded-lg text-sm font-medium border border-slate-300 bg-white text-slate-800 inline-flex items-center gap-1.5"
        >
          <RefreshCw className="w-4 h-4" />
          처음부터
        </button>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-[1fr_340px] gap-4">
        <div className="rounded-2xl border border-slate-200 bg-white p-3 sm:p-5">
          <div className="mx-auto w-full max-w-[430px]">
            <div className="rounded-[2rem] border-[10px] border-slate-900 bg-slate-900 p-1.5 shadow-xl">
              <div className="rounded-[1.5rem] bg-white overflow-hidden min-h-[700px] flex flex-col">
                <div className="h-6 bg-slate-900" />
                <div className="px-4 py-3 border-b border-slate-100">
                  <div className="flex items-center justify-between">
                    <p className="text-xs text-slate-500">모바일 전자청약</p>
                    <span className="text-xs font-semibold text-sky-700 bg-sky-100 px-2 py-0.5 rounded-full">{flowStep} / 4</span>
                  </div>
                  <div className="mt-2 h-1.5 rounded-full bg-slate-100">
                    <div className="h-full rounded-full bg-sky-500 transition-all" style={{ width: `${flowStep * 25}%` }} />
                  </div>
                </div>

                <div className="flex-1 p-4">
                  {flowStep === 1 && (
                    <div className="h-full flex flex-col">
                      <h3 className="text-lg font-bold text-slate-900">계약자 본인인증</h3>
                      <p className="text-sm text-slate-600 mt-1 mb-5">전자서명을 위해 먼저 본인인증을 진행합니다.</p>

                      {isVerifying ? (
                        <div className="flex-1 flex flex-col items-center justify-center gap-3">
                          <Loader2 className="w-10 h-10 text-sky-600 animate-spin" />
                          <p className="text-sm font-medium text-sky-700">인증 정보를 확인하는 중...</p>
                        </div>
                      ) : (
                        <div className="space-y-3">
                          <button onClick={() => handleVerify("카카오톡")} className="w-full py-3.5 rounded-xl font-bold bg-[#FEE500] text-black">카카오톡 인증</button>
                          <button onClick={() => handleVerify("PASS")} className="w-full py-3.5 rounded-xl font-bold border border-slate-300 text-slate-700 bg-white">PASS 인증</button>
                          <button onClick={() => handleVerify("문자")} className="w-full py-3.5 rounded-xl font-bold border border-slate-300 text-slate-700 bg-white">휴대폰 문자 인증</button>
                        </div>
                      )}
                    </div>
                  )}

                  {flowStep === 2 && (
                    <div className="h-full flex flex-col">
                      <h3 className="text-lg font-bold text-slate-900">상품설명서/약관 동의</h3>
                      <p className="text-xs text-rose-600 mt-1 mb-3">* 내용을 맨 아래까지 확인해야 버튼이 활성화됩니다.</p>
                      <div
                        ref={termsRef}
                        onScroll={handleTermsScroll}
                        className="flex-1 max-h-[44vh] min-h-[240px] overflow-y-auto border border-slate-200 rounded-xl bg-slate-50 p-3 text-sm text-slate-700 space-y-4"
                      >
                        <p className="font-semibold text-slate-900">제1조(가입자 유의사항)</p>
                        <p>본 약관은 모바일 청약 서비스 이용과 관련한 주요 사항을 규정합니다. 계약자는 청약서 기재 내용을 확인해야 합니다.</p>
                        <p className="mt-16 text-slate-400">[스크롤 실습 영역] 실제 현장에서 고객이 끝까지 읽었는지 확인하세요.</p>
                        <p className="mt-16 text-slate-400">[추가 확인 문구] 보장개시일, 면책, 고지의무, 해지환급금 안내를 포함합니다.</p>
                        <p className="mt-16 text-slate-400">[거의 끝] 질문이 있으면 멈추고 설명 후 진행합니다.</p>
                        <p className="mt-16 font-semibold text-sky-700">※ 위 내용을 모두 확인하고 동의합니다.</p>
                      </div>
                      <button
                        type="button"
                        onClick={() => setFlowStep(3)}
                        disabled={!isScrolledToBottom}
                        className={`mt-3 w-full py-3.5 rounded-xl text-sm font-bold transition ${
                          isScrolledToBottom ? "bg-sky-600 text-white" : "bg-slate-200 text-slate-400 cursor-not-allowed"
                        }`}
                      >
                        {isScrolledToBottom ? "동의하고 다음으로" : "내용을 끝까지 확인해 주세요"}
                      </button>
                    </div>
                  )}

                  {flowStep === 3 && (
                    <div className="h-full flex flex-col">
                      <h3 className="text-lg font-bold text-slate-900">전자 서명</h3>
                      <p className="text-sm text-slate-600 mt-1 mb-3">계약자 본인이 직접 손가락으로 서명해 주세요.</p>

                      <input
                        value={sigName}
                        onChange={(e) => setSigName(e.target.value)}
                        placeholder="서명자 성명"
                        className="mb-3 w-full rounded-xl border border-slate-200 px-3 py-2.5 text-sm"
                      />

                      <div className="relative border-2 border-slate-300 rounded-xl overflow-hidden bg-white mb-3">
                        <canvas
                          ref={canvasRef}
                          className="w-full h-[180px] touch-none"
                          onPointerDown={startDraw}
                          onPointerMove={onDraw}
                          onPointerUp={endDraw}
                          onPointerCancel={endDraw}
                          onPointerLeave={endDraw}
                        />
                        {!hasSignature && (
                          <div className="absolute inset-0 pointer-events-none flex items-center justify-center">
                            <span className="text-slate-300 text-lg font-bold">여기에 서명하세요</span>
                          </div>
                        )}
                      </div>

                      <div className="mt-auto flex gap-2">
                        <button type="button" onClick={clearCanvas} className="w-1/3 py-3 border border-slate-300 rounded-xl text-sm font-semibold text-slate-700">
                          다시 쓰기
                        </button>
                        <button
                          type="button"
                          onClick={() => setFlowStep(4)}
                          disabled={!hasSignature || !sigName.trim()}
                          className={`w-2/3 py-3 rounded-xl text-sm font-bold ${
                            hasSignature && sigName.trim() ? "bg-sky-600 text-white" : "bg-slate-200 text-slate-400 cursor-not-allowed"
                          }`}
                        >
                          서명 완료
                        </button>
                      </div>
                    </div>
                  )}

                  {flowStep === 4 && (
                    <div className="h-full flex flex-col items-center justify-center text-center">
                      <CheckCircle2 className="w-14 h-14 text-emerald-600 mb-3" />
                      <h3 className="text-xl font-bold text-slate-900 mb-1">청약이 완료되었습니다</h3>
                      <p className="text-sm text-slate-600 leading-relaxed">
                        실전 모바일청약 시뮬레이션을 완료했습니다.
                        <br />
                        현장에서도 같은 순서로 안내해 보세요.
                      </p>
                      <div className="mt-4 text-xs text-slate-500">
                        인증 방식: {verifiedMethod || "-"} / 서명자: {sigName || "-"}
                      </div>
                      <button type="button" onClick={resetAll} className="mt-6 px-5 py-2.5 rounded-full bg-sky-600 text-white text-sm font-semibold">
                        처음부터 다시 연습하기
                      </button>
                    </div>
                  )}
                </div>
              </div>
            </div>
          </div>
        </div>

        <div className="rounded-2xl border border-slate-200 bg-white p-4 sm:p-5">
          <div className="text-sm font-bold text-slate-900 mb-2">진행 가이드</div>
          <ul className="text-sm text-slate-700 space-y-2 mb-5">
            {(currentStepMeta?.notes ?? []).map((n, i) => (
              <li key={`note-${i}`} className="leading-relaxed">
                • {n}
              </li>
            ))}
          </ul>

          <div className="text-sm font-bold text-slate-900 mb-2">컴플라이언스 체크</div>
          <ul className="text-sm text-slate-700 space-y-2">
            {(currentStepMeta?.compliance ?? []).map((c, i) => (
              <li key={`compliance-${i}`} className="leading-relaxed">
                • {c}
              </li>
            ))}
          </ul>
        </div>
      </div>
    </div>
  );
}

