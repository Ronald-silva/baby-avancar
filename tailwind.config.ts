import type { Config } from "tailwindcss";

const config: Config = {
  content: ["./src/**/*.{ts,tsx}"],
  theme: {
    extend: {
      colors: {
        canvas: "hsl(var(--canvas))",
        surface: "hsl(var(--surface))",
        ink: "hsl(var(--ink))",
        muted: "hsl(var(--muted))",
        brand: {
          DEFAULT: "hsl(var(--brand))",
          foreground: "hsl(var(--brand-foreground))",
        },
      },
      fontFamily: {
        sans: ["var(--font-body)", "ui-sans-serif", "sans-serif"],
        display: ["var(--font-display)", "ui-serif", "serif"],
      },
      fontSize: {
        fluid: "clamp(1rem, 0.96rem + 0.2vw, 1.125rem)",
        "fluid-title": ["clamp(2rem, 1.45rem + 2.75vw, 4.5rem)", { lineHeight: "0.98", letterSpacing: "-0.045em" }],
      },
      boxShadow: {
        soft: "0 12px 32px rgb(30 55 78 / 0.10)",
        glass: "0 16px 45px rgb(20 44 66 / 0.16)",
      },
      backdropBlur: { glass: "18px" },
      borderRadius: { "4xl": "2rem" },
    },
  },
  plugins: [],
};

export default config;
