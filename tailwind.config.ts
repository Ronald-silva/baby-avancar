import type { Config } from "tailwindcss";

const config: Config = {
  content: ["./src/**/*.{ts,tsx}"],
  theme: {
    extend: {
      colors: {
        // Paleta primitiva — ver docs/DESIGN_SYSTEM.md. Uso direto (blue-500, yellow-300...)
        // é para casos sem significado semântico (ilustrações, gráficos da Plataforma de
        // Talentos). Componentes de produto devem preferir os tokens semânticos abaixo.
        blue: {
          50: "#F0F9FE", 100: "#DDF2FE", 200: "#B9E4FE", 300: "#75CFFF", 400: "#30B5FF",
          500: "#0582FF", 600: "#0057D9", 700: "#0047B2", 800: "#003A8C", 900: "#02285A", 950: "#031735",
        },
        yellow: {
          50: "#FFFBEB", 100: "#FFF4D1", 200: "#FFE9A8", 300: "#FFDB70", 400: "#FFCF3D",
          500: "#FFC107", 600: "#E69D00", 700: "#BD7305", 800: "#965408", 900: "#713A09",
        },
        neutral: {
          50: "#F8FAFB", 100: "#F1F5F9", 200: "#E3E8ED", 300: "#CDD3DB", 400: "#A3ADB8",
          500: "#7C8998", 600: "#5C6A7A", 700: "#435060", 800: "#2B3646", 900: "#171F2C", 950: "#0C121D",
        },

        // Tokens semânticos (CSS vars em src/app/globals.css). Equivalência com a
        // nomenclatura do design system em docs/DESIGN_SYSTEM.md:
        //   canvas↔background · brand↔primary · secondary↔secondary · accent↔accent
        //   ink↔text · muted↔text-muted · inverse↔text-inverse
        canvas: "hsl(var(--canvas))",
        surface: "hsl(var(--surface))",
        "surface-muted": "hsl(var(--surface-muted))",
        ink: "hsl(var(--ink))",
        muted: "hsl(var(--muted))",
        inverse: "hsl(var(--inverse))",
        border: {
          DEFAULT: "hsl(var(--border))",
          strong: "hsl(var(--border-strong))",
        },
        brand: {
          DEFAULT: "hsl(var(--brand))",
          hover: "hsl(var(--brand-hover))",
          active: "hsl(var(--brand-active))",
          foreground: "hsl(var(--brand-foreground))",
        },
        secondary: {
          DEFAULT: "hsl(var(--secondary))",
          hover: "hsl(var(--secondary-hover))",
          foreground: "hsl(var(--secondary-foreground))",
        },
        accent: {
          DEFAULT: "hsl(var(--accent))",
          hover: "hsl(var(--accent-hover))",
          foreground: "hsl(var(--accent-foreground))",
        },
        success: "hsl(var(--success))",
        warning: "hsl(var(--warning))",
        error: "hsl(var(--error))",
        info: "hsl(var(--info))",
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
