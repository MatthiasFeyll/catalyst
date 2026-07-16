import type { Config } from "tailwindcss";
import animate from "tailwindcss-animate";

// Tailwind theme — FRAMEWORK-OWNED REFERENCE (ADR-0010). The color scale binds to
// CSS-variable design tokens defined in src/index.css (hsl(var(--token))), so the
// `/design` palette flows through ONE token layer into every Cr* component and
// utility. The foundation milestone sets the project's token VALUES in index.css
// (and may extend this theme — fonts, spacing, charts) but keeps the var()-bound
// color mapping: a Cr* component must consume tokens, never hardcoded hex.
export default {
  darkMode: ["class"],
  content: ["./index.html", "./src/**/*.{ts,tsx}"],
  theme: {
    container: {
      center: true,
      padding: "2rem",
      screens: { "2xl": "1400px" },
    },
    extend: {
      colors: {
        border: "hsl(var(--border))",
        input: "hsl(var(--input))",
        ring: "hsl(var(--ring))",
        background: "hsl(var(--background))",
        foreground: "hsl(var(--foreground))",
        primary: {
          DEFAULT: "hsl(var(--primary))",
          foreground: "hsl(var(--primary-foreground))",
        },
        secondary: {
          DEFAULT: "hsl(var(--secondary))",
          foreground: "hsl(var(--secondary-foreground))",
        },
        destructive: {
          DEFAULT: "hsl(var(--destructive))",
          foreground: "hsl(var(--destructive-foreground))",
        },
        muted: {
          DEFAULT: "hsl(var(--muted))",
          foreground: "hsl(var(--muted-foreground))",
        },
        accent: {
          DEFAULT: "hsl(var(--accent))",
          foreground: "hsl(var(--accent-foreground))",
        },
        popover: {
          DEFAULT: "hsl(var(--popover))",
          foreground: "hsl(var(--popover-foreground))",
        },
        card: {
          DEFAULT: "hsl(var(--card))",
          foreground: "hsl(var(--card-foreground))",
        },
      },
      borderRadius: {
        lg: "var(--radius)",
        md: "calc(var(--radius) - 2px)",
        sm: "calc(var(--radius) - 4px)",
      },
      // Elevation scale — FRAMEWORK-OWNED (fw-ADR-0040). Literal ink-tinted shadow
      // values (NOT DTCG shadow tokens — ADR-0029 minimality) so surfaces read as
      // distinct layers instead of collapsing to one flat plane. Cr* cards/panels
      // use shadow-card by default. DARK MODE MUST RE-TUNE these separately — the
      // same values vanish on a dark canvas; /design defines the dark equivalents.
      boxShadow: {
        card: "0 1px 2px rgba(16,24,40,.06), 0 2px 8px rgba(16,24,40,.08)",
        raised: "0 4px 14px rgba(16,24,40,.10), 0 2px 6px rgba(16,24,40,.06)",
        overlay: "0 12px 32px rgba(16,24,40,.16), 0 4px 12px rgba(16,24,40,.10)",
      },
      // Reading measure — FRAMEWORK-OWNED (fw-ADR-0040). Cap content-heavy columns
      // with max-w-content so text never stretches the full width of a large
      // display. Running prose uses the built-in max-w-prose (65ch, within the
      // 65–75ch measure).
      maxWidth: {
        content: "1200px",
      },
      keyframes: {
        "accordion-down": {
          from: { height: "0" },
          to: { height: "var(--radix-accordion-content-height)" },
        },
        "accordion-up": {
          from: { height: "var(--radix-accordion-content-height)" },
          to: { height: "0" },
        },
      },
      animation: {
        "accordion-down": "accordion-down 0.2s ease-out",
        "accordion-up": "accordion-up 0.2s ease-out",
      },
    },
  },
  plugins: [animate],
} satisfies Config;
