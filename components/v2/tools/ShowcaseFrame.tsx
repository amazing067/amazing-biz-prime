"use client";

import { useState } from "react";
import { Icon } from "../Core";
import type { ShowcaseProps, ToolItem } from "./types";

function ToolRow({
  item,
  index,
  active,
  onSelect,
}: {
  item: ToolItem;
  index: number;
  active: boolean;
  onSelect: () => void;
}) {
  const isAi = item.status === "AI";
  return (
    <button
      type="button"
      onClick={onSelect}
      className="relative w-full text-left pl-5 py-3.5 border-b cursor-pointer transition-colors duration-200"
      style={{
        borderColor: "var(--line)",
        background: active ? "rgba(91,91,239,0.04)" : "transparent",
      }}
    >
      <span
        className="absolute left-0 top-3.5 bottom-3.5 w-[3px] rounded-r transition-colors duration-200"
        style={{ background: active ? "#5b5bef" : "transparent" }}
      />
      <div className="flex items-baseline gap-3">
        <h4
          className="text-[16px] tracking-tight"
          style={{ color: "var(--ink)", fontWeight: active ? 700 : 500 }}
        >
          {item.name}
        </h4>
        {isAi && (
          <span
            className="inline-flex items-center gap-1 px-1.5 py-px rounded-full text-[9px] font-medium tracking-[0.08em]"
            style={{ background: "#5b5bef", color: "#fff" }}
          >
            <Icon name="sparkles" size={8} stroke={2} /> AI
          </span>
        )}
        <span
          className="ml-auto text-[10px] transition-opacity duration-200"
          style={{ color: "#5b5bef", opacity: active ? 1 : 0 }}
        >
          ●
        </span>
      </div>
      <p className="mt-1 text-[12.5px] leading-[1.55]" style={{ color: "var(--ink-2)" }}>
        {item.desc}
      </p>
    </button>
  );
}

export default function ShowcaseFrame({
  group,
  index,
  flip = false,
  mockups,
}: ShowcaseProps) {
  const [selected, setSelected] = useState(0);

  return (
    <section aria-labelledby={`group-${group.tag}`}>
      <div className="flex items-end justify-between mb-3 pb-5 border-b border-[color:var(--line)]">
        <div>
          <h3
            id={`group-${group.tag}`}
            className="text-[28px] font-medium tracking-tight text-[color:var(--ink)]"
          >
            {group.label}
          </h3>
          <p className="mt-2 text-[13px] max-w-[560px] text-[color:var(--ink-2)]">
            {group.desc}
          </p>
        </div>
        <div className="text-right">
          <span className="text-[12px] whitespace-nowrap text-[color:var(--dim)]">
            {group.items.length}개 · 클릭해서 전환
          </span>
          <span
            className="block mt-1 text-[12px] font-semibold whitespace-nowrap"
            style={{ color: "var(--accent)" }}
          >
            {group.items[selected]?.name}
          </span>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 mt-8">
        <div
          className={`lg:col-span-7 ${flip ? "lg:order-2" : "lg:order-1"}`}
          role="img"
          aria-label={`${group.label} · ${group.items[selected]?.name} 시각`}
        >
          <div
            className="relative rounded-2xl border overflow-hidden"
            style={{
              borderColor: "var(--line)",
              background: "var(--bg-2)",
              boxShadow:
                "0 20px 48px -16px rgba(20,20,40,0.15), 0 8px 20px -8px rgba(20,20,40,0.08)",
            }}
          >
            <div
              className="relative overflow-hidden showcase-mock-container"
              style={{ aspectRatio: "4/3" }}
            >
              <div
                className="absolute top-0 left-0 origin-top-left showcase-mock-inner"
                style={{ width: "700px", aspectRatio: "4/3" }}
              >
                {mockups[selected] ?? (
                  <div className="absolute inset-0 flex items-center justify-center text-[color:var(--dim)]">
                    (목업 준비중)
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
        <div className={`lg:col-span-5 ${flip ? "lg:order-1" : "lg:order-2"}`}>
          <div className="border-t border-[color:var(--line)]">
            {group.items.map((item, i) => (
              <ToolRow
                key={item.name}
                item={item}
                index={i}
                active={i === selected}
                onSelect={() => setSelected(i)}
              />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
