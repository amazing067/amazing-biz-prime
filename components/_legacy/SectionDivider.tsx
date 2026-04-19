"use client";

import { motion } from "framer-motion";

type Variant = "light" | "dark" | "gradient";

interface SectionDividerProps {
  variant?: Variant;
  className?: string;
}

const variants: Record<Variant, string> = {
  light:
    "border-t border-slate-200/80 bg-gradient-to-b from-transparent via-slate-100/50 to-transparent",
  dark:
    "border-t border-white/10 bg-gradient-to-b from-transparent via-white/5 to-transparent",
  gradient:
    "border-0 h-px bg-gradient-to-r from-transparent via-electric-blue/30 to-transparent",
};

export default function SectionDivider({ variant = "light", className = "" }: SectionDividerProps) {
  const dotClass = variant === "dark" ? "bg-white/40" : "bg-slate-300";
  return (
    <div className={`w-full py-4 ${className}`} aria-hidden>
      <div className={`h-px w-full ${variants[variant]}`} />
      <div className="flex justify-center mt-3">
        <motion.span
          className={`w-1.5 h-1.5 rounded-full ${dotClass}`}
          animate={{ opacity: [0.5, 1, 0.5] }}
          transition={{ duration: 2, repeat: Infinity }}
        />
      </div>
    </div>
  );
}
