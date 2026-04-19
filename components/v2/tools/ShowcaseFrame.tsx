"use client";

import { useState } from "react";
import { Mono, Icon } from "../Core";
import type { ShowcaseProps, ToolItem } from "./types";

function ToolRow({ item, index }: { item: ToolItem; index: number }) {
  const [open, setOpen] = useState(false);
  const isAi = item.status === "AI";
  return (
    <div
      onMouseEnter={() => setOpen(true)}
      onMouseLeave={() => setOpen(false)}
      className="relative pl-5 py-4 border-b border-[color:var(--line)] cursor-default group"
    >
      <span
        className="absolute left-0 top-4 bottom-4 w-px transition-colors duration-300"
        style={{ background: open ? "var(--accent)" : "transparent" }}
      />
      <div className="flex items-baseline gap-3">
        <Mono className="text-[10px] text-[color:var(--dim-2)]">
          /{String(index + 1).padStart(2, "0")}
        </Mono>
        <h4 className="text-[16px] font-medium tracking-tight text-[color:var(--ink)]">
          {item.name}
        </h4>
        {isAi && (
          <span
            className="inline-flex items-center gap-1 px-1.5 py-px rounded-full text-[9px] font-medium tracking-[0.08em]"
            style={{ background: "var(--accent)", color: "var(--accent-ink)" }}
          >
            <Icon name="sparkles" size={8} stroke={2} /> AI
          </span>
        )}
      </div>
      <p className="mt-1.5 text-[13px] leading-[1.6] text-[color:var(--ink-2)]">
        {item.desc}
      </p>
      <div
        className="overflow-hidden transition-all duration-500"
        style={{ maxHeight: open ? "200px" : "0px", opacity: open ? 1 : 0 }}
      >
        <div className="pt-3 text-[12px] leading-[1.65] text-[color:var(--dim)]">
          {item.detail}
        </div>
      </div>
    </div>
  );
}

export default function ShowcaseFrame({ group, index, flip = false, collage }: ShowcaseProps) {
  return (
    <section aria-labelledby={`group-${group.tag}`}>
      <div className="flex items-end justify-between mb-3 pb-5 border-b border-[color:var(--line)]">
        <div>
          <Mono className="text-[11px] tracking-[0.14em] text-[color:var(--dim)]">
            0{index + 1} / {group.sub.toUpperCase()}
          </Mono>
          <h3
            id={`group-${group.tag}`}
            className="mt-2 text-[28px] font-medium tracking-tight text-[color:var(--ink)]"
          >
            {group.label}
          </h3>
          <p className="mt-2 text-[13px] max-w-[560px] text-[color:var(--ink-2)]">
            {group.desc}
          </p>
        </div>
        <Mono className="text-[11px] whitespace-nowrap ml-6 text-[color:var(--dim)]">
          {group.items.length} tools
        </Mono>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 mt-8">
        <div
          className={`lg:col-span-7 ${flip ? "lg:order-2" : "lg:order-1"}`}
          role="img"
          aria-label={`${group.label} 시각 요약`}
        >
          <div className="relative aspect-[4/3] rounded-2xl border border-[color:var(--line)] bg-[color:var(--bg-2)] overflow-hidden">
            {collage}
          </div>
        </div>
        <div className={`lg:col-span-5 ${flip ? "lg:order-1" : "lg:order-2"}`}>
          <div className="border-t border-[color:var(--line)]">
            {group.items.map((item, i) => (
              <ToolRow key={item.name} item={item} index={i} />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
