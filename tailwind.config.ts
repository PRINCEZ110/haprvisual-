import type { Config } from "tailwindcss";

export default {
  content: ["./src/**/*.{ts,tsx}"],
  theme: {
    extend: {
      colors: {
        cream: "#F5F0E8",
        "cream-dark": "#EDE6DA",
        ink: "#171410",
        coffee: "#241E18",
        muted: "#7A7066",
        line: "#E0D8CA",
        blush: "#F7ECE8",
        espresso: "#241D19",
        "blush-line": "#E7D9D3",
        clay: "#8F7770",
      },
      fontFamily: {
        sans: [
          "var(--font-inter)",
          "Helvetica Neue",
          "Helvetica",
          "Arial",
          "sans-serif",
        ],
        serif: ["var(--font-fraunces)", "Georgia", "serif"],
      },
    },
  },
  plugins: [],
} satisfies Config;