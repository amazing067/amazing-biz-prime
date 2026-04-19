import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      fontFamily: {
        sans: ['var(--font-sans-kr)', 'Pretendard', 'system-ui', 'sans-serif'],
        mono: ['var(--font-mono)', 'SF Mono', 'ui-monospace', 'monospace'],
        'serif-italic': ['var(--font-serif-italic)', 'Noto Sans KR', 'serif'],
      },
      colors: {
        'electric-blue': '#2563EB',
        'titanium-silver': '#E2E8F0',
        'cool-gray': '#F8FAFC',
        'navy-deep': '#0f172a',
        'navy-mid': '#1e293b',
        // v2 editorial tokens (exposed as Tailwind utilities)
        'paper': '#FAFAF7',
        'paper-2': '#F0EFEA',
        'ink': '#0A0B10',
      },
      borderRadius: {
        'card': '16px',
      },
      backgroundImage: {
        'gradient-radial': 'radial-gradient(var(--tw-gradient-stops))',
        'gradient-conic': 'conic-gradient(from 180deg at 50% 50%, var(--tw-gradient-stops))',
        'mesh-gradient': 'radial-gradient(at 40% 20%, rgba(37, 99, 235, 0.25) 0px, transparent 50%), radial-gradient(at 80% 0%, rgba(139, 92, 246, 0.2) 0px, transparent 50%), radial-gradient(at 0% 50%, rgba(37, 99, 235, 0.15) 0px, transparent 50%)',
      },
      boxShadow: {
        'soft': '0 20px 60px -12px rgba(0, 0, 0, 0.08)',
        'soft-lg': '0 25px 80px -12px rgba(0, 0, 0, 0.1)',
        'glow-blue': '0 0 60px -12px rgba(37, 99, 235, 0.4)',
      },
      spacing: {
        '18': '4.5rem',
        '22': '5.5rem',
      },
    },
  },
  plugins: [],
};
export default config;
