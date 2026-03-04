"use client";

import { useMemo, useState } from "react";

type Field =
  | { id: string; label: string; type: "text"; placeholder?: string }
  | { id: string; label: string; type: "checkbox" }
  | { id: string; label: string; type: "radio"; options: string[] }
  | { id: string; label: string; type: "select"; options: string[] };

type Step = {
  id: string;
  title: string;
  subtitle: string;
  trainerNotes: string[];
  complianceNotes: string[];
  fields: Field[];
};

type DataFile = {
  meta: { title: string; version: string };
  steps: Step[];
  monitoringScripts: { do: string[]; dont: string[] };
  policyDeliveryScripts: string[];
};

export default function MobileEnrollWizard({ data }: { data: DataFile }) {
  const steps = data.steps;
  const [idx, setIdx] = useState(0);
  const [values, setValues] = useState<Record<string, unknown>>({});

  const step = steps[idx];
  const progress = useMemo(() => {
    if (!steps.length) return 0;
    return Math.round(((idx + 1) / steps.length) * 100);
  }, [idx, steps.length]);

  function setValue(id: string, v: unknown) {
    setValues((prev) => ({ ...prev, [id]: v }));
  }

  function next() {
    setIdx((p) => Math.min(p + 1, steps.length - 1));
  }

  function back() {
    setIdx((p) => Math.max(p - 1, 0));
  }

  function reset() {
    setIdx(0);
    setValues({});
  }

  if (!step) {
    return <div className="p-6 text-red-300">No step data found.</div>;
  }

  return (
    <div className="w-full max-w-6xl mx-auto px-4 sm:px-6">
      <div className="mb-4 flex items-center justify-between gap-3">
        <div className="min-w-0">
          <div className="text-xs text-slate-400">
            {data.meta.title} v{data.meta.version}
          </div>
          <div className="text-lg font-semibold text-white truncate">{step.title}</div>
          <div className="text-sm text-slate-300 truncate">{step.subtitle}</div>
        </div>

        <div className="flex items-center gap-2">
          <button
            type="button"
            onClick={reset}
            className="px-3 py-2 rounded-lg text-sm font-medium border border-white/15 bg-white/5 text-slate-100"
          >
            Reset
          </button>
          <div className="px-3 py-2 rounded-lg text-sm border border-white/15 bg-white/5 text-slate-100">
            {progress}%
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-[0.9fr_1.1fr] gap-4">
        <div className="rounded-3xl border border-white/15 bg-white/5 overflow-hidden">
          <div className="px-4 py-3 border-b border-white/10 flex items-center justify-between">
            <div className="text-xs text-slate-300">Mobile Enrollment (Training)</div>
            <div className="text-xs text-slate-400">
              Step {idx + 1}/{steps.length}
            </div>
          </div>

          <div className="p-4">
            <div className="rounded-2xl bg-navy-deep/60 border border-white/10 p-4">
              <div className="text-sm font-semibold text-white mb-1">{step.title}</div>
              <div className="text-xs text-slate-300 mb-4">{step.subtitle}</div>

              <div className="space-y-4">
                {step.fields.map((f) => {
                  if (f.type === "text") {
                    return (
                      <div key={f.id}>
                        <div className="text-xs text-slate-300 mb-1">{f.label}</div>
                        <input
                          value={String(values[f.id] ?? "")}
                          onChange={(e) => setValue(f.id, e.target.value)}
                          placeholder={f.placeholder ?? ""}
                          className="w-full px-3 py-2 rounded-xl bg-white/5 border border-white/10 text-slate-100 placeholder:text-slate-500 outline-none focus:border-white/25"
                        />
                      </div>
                    );
                  }

                  if (f.type === "checkbox") {
                    return (
                      <label key={f.id} className="flex items-center gap-2 text-sm text-slate-100">
                        <input
                          type="checkbox"
                          checked={Boolean(values[f.id])}
                          onChange={(e) => setValue(f.id, e.target.checked)}
                          className="h-4 w-4"
                        />
                        <span>{f.label}</span>
                      </label>
                    );
                  }

                  if (f.type === "radio") {
                    return (
                      <div key={f.id}>
                        <div className="text-xs text-slate-300 mb-2">{f.label}</div>
                        <div className="grid gap-2">
                          {f.options.map((opt) => (
                            <label
                              key={opt}
                              className="flex items-center gap-2 rounded-xl border border-white/10 bg-white/5 px-3 py-2 text-sm text-slate-100"
                            >
                              <input
                                type="radio"
                                name={f.id}
                                checked={values[f.id] === opt}
                                onChange={() => setValue(f.id, opt)}
                              />
                              <span>{opt}</span>
                            </label>
                          ))}
                        </div>
                      </div>
                    );
                  }

                  if (f.type === "select") {
                    return (
                      <div key={f.id}>
                        <div className="text-xs text-slate-300 mb-1">{f.label}</div>
                        <select
                          value={String(values[f.id] ?? "")}
                          onChange={(e) => setValue(f.id, e.target.value)}
                          className="w-full px-3 py-2 rounded-xl bg-white/5 border border-white/10 text-slate-100 outline-none focus:border-white/25"
                        >
                          <option value="" disabled>
                            Select
                          </option>
                          {f.options.map((opt) => (
                            <option key={opt} value={opt}>
                              {opt}
                            </option>
                          ))}
                        </select>
                      </div>
                    );
                  }

                  return null;
                })}
              </div>

              <div className="mt-6 flex items-center justify-between">
                <button
                  type="button"
                  onClick={back}
                  disabled={idx === 0}
                  className="px-4 py-2 rounded-xl text-sm font-medium border border-white/15 bg-white/5 text-slate-100 disabled:opacity-40 disabled:cursor-not-allowed"
                >
                  Back
                </button>
                <button
                  type="button"
                  onClick={next}
                  disabled={idx === steps.length - 1}
                  className="px-4 py-2 rounded-xl text-sm font-semibold text-white bg-gradient-to-r from-sky-500 to-violet-600 disabled:opacity-40"
                >
                  Next
                </button>
              </div>
            </div>
          </div>
        </div>

        <div className="rounded-3xl border border-white/15 bg-white/5 p-4">
          <div className="text-sm font-semibold text-white mb-2">Trainer Notes</div>
          <ul className="text-sm text-slate-200 space-y-2 mb-4">
            {step.trainerNotes.map((n, i) => (
              <li key={`trainer-${i}`} className="leading-relaxed">
                • {n}
              </li>
            ))}
          </ul>

          <div className="text-sm font-semibold text-white mb-2">Compliance</div>
          <ul className="text-sm text-slate-200 space-y-2 mb-6">
            {step.complianceNotes.map((c, i) => (
              <li key={`compliance-${i}`} className="leading-relaxed">
                • {c}
              </li>
            ))}
          </ul>

          <div className="text-sm font-semibold text-white mb-2">Monitoring (Do / Don't)</div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
            <div className="rounded-2xl border border-white/10 bg-white/5 p-3">
              <div className="text-xs font-semibold text-slate-100 mb-2">Do</div>
              <ul className="text-sm text-slate-200 space-y-1">
                {data.monitoringScripts.do.map((x, i) => (
                  <li key={`do-${i}`}>• {x}</li>
                ))}
              </ul>
            </div>
            <div className="rounded-2xl border border-white/10 bg-white/5 p-3">
              <div className="text-xs font-semibold text-slate-100 mb-2">Don't</div>
              <ul className="text-sm text-slate-200 space-y-1">
                {data.monitoringScripts.dont.map((x, i) => (
                  <li key={`dont-${i}`}>• {x}</li>
                ))}
              </ul>
            </div>
          </div>

          <div className="mt-6 text-sm font-semibold text-white mb-2">Policy Delivery Scripts</div>
          <ul className="text-sm text-slate-200 space-y-2">
            {data.policyDeliveryScripts.map((x, i) => (
              <li key={`policy-${i}`} className="leading-relaxed">
                • {x}
              </li>
            ))}
          </ul>
        </div>
      </div>
    </div>
  );
}

