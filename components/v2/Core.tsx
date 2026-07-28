"use client";

import type { CSSProperties, ReactNode, ButtonHTMLAttributes } from "react";

type IconName =
  | "arrowRight"
  | "arrowUpRight"
  | "arrowDown"
  | "plus"
  | "minus"
  | "check"
  | "dot"
  | "spark"
  | "command"
  | "phone"
  | "menu"
  | "x"
  | "layers"
  | "cpu"
  | "bolt"
  | "shield"
  | "target"
  | "sparkles";

const ICON_PATHS: Record<IconName, string> = {
  arrowRight: "M5 12h14M13 5l7 7-7 7",
  arrowUpRight: "M7 17 17 7M7 7h10v10",
  arrowDown: "M12 5v14M19 12l-7 7-7-7",
  plus: "M12 5v14M5 12h14",
  minus: "M5 12h14",
  check: "M20 6 9 17l-5-5",
  dot: "M12 12.01",
  spark: "M12 3v3M12 18v3M3 12h3M18 12h3M5.6 5.6 7.7 7.7M16.3 16.3l2.1 2.1M5.6 18.4 7.7 16.3M16.3 7.7l2.1-2.1",
  command:
    "M18 3a3 3 0 0 0-3 3v12a3 3 0 0 0 3 3 3 3 0 0 0 3-3 3 3 0 0 0-3-3H6a3 3 0 0 0-3 3 3 3 0 0 0 3 3 3 3 0 0 0 3-3V6a3 3 0 0 0-3-3 3 3 0 0 0-3 3 3 3 0 0 0 3 3h12a3 3 0 0 0 3-3 3 3 0 0 0-3-3z",
  phone:
    "M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6A19.79 19.79 0 0 1 2.12 4.18 2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72c.13.96.37 1.9.7 2.81a2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45c.91.33 1.85.57 2.81.7A2 2 0 0 1 22 16.92z",
  menu: "M4 6h16M4 12h16M4 18h16",
  x: "M18 6 6 18M6 6l12 12",
  layers: "M12 2 2 7l10 5 10-5-10-5zM2 17l10 5 10-5M2 12l10 5 10-5",
  cpu: "M4 4h16v16H4zM9 9h6v6H9zM9 2v3M15 2v3M9 19v3M15 19v3M2 9h3M2 15h3M19 9h3M19 15h3",
  bolt: "M13 2 3 14h9l-1 8 10-12h-9l1-8z",
  shield: "M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z",
  target:
    "M12 2a10 10 0 1 0 0 20 10 10 0 0 0 0-20zM12 6a6 6 0 1 0 0 12 6 6 0 0 0 0-12zM12 10a2 2 0 1 0 0 4 2 2 0 0 0 0-4z",
  sparkles:
    "M9.5 3l1.2 3.6L14.3 7.8l-3.6 1.2L9.5 12.6l-1.2-3.6L4.7 7.8l3.6-1.2L9.5 3zM18 13l.8 2.4 2.4.8-2.4.8L18 19.4l-.8-2.4-2.4-.8 2.4-.8L18 13z",
};

export function Icon({
  name,
  size = 18,
  className = "",
  stroke = 1.5,
  style,
}: {
  name: IconName;
  size?: number;
  className?: string;
  stroke?: number;
  style?: CSSProperties;
}) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth={stroke}
      strokeLinecap="round"
      strokeLinejoin="round"
      className={className}
      style={style}
      aria-hidden
    >
      <path d={ICON_PATHS[name]} />
    </svg>
  );
}

export function Mono({
  children,
  className = "",
  style,
}: {
  children: ReactNode;
  className?: string;
  style?: CSSProperties;
}) {
  return (
    <span className={`font-mono tabular-nums tracking-tight ${className}`} style={style}>
      {children}
    </span>
  );
}

export function Eyebrow({
  children,
  className = "",
}: {
  children: ReactNode;
  className?: string;
}) {
  return (
    <div
      className={`inline-flex items-center text-[14px] font-bold tracking-[-0.01em] text-[color:var(--accent)] ${className}`}
    >
      {children}
    </div>
  );
}

type BtnVariant = "accent" | "ghost" | "inverse";
type BtnSize = "sm" | "md" | "lg";

export function BtnV2({
  children,
  variant = "accent",
  size = "md",
  icon,
  className = "",
  ...rest
}: ButtonHTMLAttributes<HTMLButtonElement> & {
  variant?: BtnVariant;
  size?: BtnSize;
  icon?: ReactNode;
}) {
  const sizes: Record<BtnSize, string> = {
    sm: "h-9 px-4 text-sm",
    md: "h-11 px-5 text-sm",
    lg: "h-14 px-7 text-[15px]",
  };
  const variants: Record<BtnVariant, string> = {
    accent:
      "bg-[color:var(--accent)] text-[color:var(--accent-ink)] hover:brightness-110 shadow-[0_8px_24px_-10px_var(--accent-glow)]",
    ghost:
      "border border-[color:var(--line)] text-[color:var(--ink)] hover:bg-[color:var(--bg-2)]",
    inverse: "bg-[color:var(--ink)] text-[color:var(--bg-1)] hover:opacity-90",
  };
  return (
    <button
      {...rest}
      className={`group inline-flex items-center justify-center gap-2 rounded-full font-medium transition-all duration-300 ${sizes[size]} ${variants[variant]} ${className}`}
    >
      {children}
      {icon && (
        <span className="transition-transform duration-300 group-hover:translate-x-0.5">
          {icon}
        </span>
      )}
    </button>
  );
}

export function Status({
  children,
  tone = "live",
}: {
  children: ReactNode;
  tone?: "live" | "dim";
}) {
  const dot = tone === "live" ? "bg-emerald-500" : "bg-[color:var(--dim)]";
  return (
    <span className="inline-flex items-center gap-2 text-[12px] font-medium text-[color:var(--dim)]">
      <span className={`w-1.5 h-1.5 rounded-full ${dot}`} />
      {children}
    </span>
  );
}

export function GridOverlay({ opacity = 0.05 }: { opacity?: number }) {
  return (
    <div
      className="pointer-events-none absolute inset-0"
      aria-hidden
      style={{
        backgroundImage: `linear-gradient(var(--line) 1px, transparent 1px), linear-gradient(90deg, var(--line) 1px, transparent 1px)`,
        backgroundSize: "80px 80px",
        opacity,
        maskImage: "radial-gradient(ellipse at center, black 40%, transparent 85%)",
        WebkitMaskImage: "radial-gradient(ellipse at center, black 40%, transparent 85%)",
      }}
    />
  );
}
