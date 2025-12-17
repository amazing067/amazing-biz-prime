import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        'electric-blue': '#2563EB',
        'titanium-silver': '#E2E8F0',
        'cool-gray': '#F8FAFC',
      },
      backgroundImage: {
        'gradient-radial': 'radial-gradient(var(--tw-gradient-stops))',
        'gradient-conic': 'conic-gradient(from 180deg at 50% 50%, var(--tw-gradient-stops))',
      },
      boxShadow: {
        'soft': '0 20px 60px -12px rgba(0, 0, 0, 0.08)',
        'soft-lg': '0 25px 80px -12px rgba(0, 0, 0, 0.1)',
      },
    },
  },
  plugins: [],
};
export default config;

