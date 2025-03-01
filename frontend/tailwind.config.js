/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx,html}"],
  theme: {
    extend: {
      screens: {
        mi: "425px",
      },
      backgroundImage: {
        grid: "linear-gradient(to right, #004C1F 1px, transparent 1px), linear-gradient(to bottom, #004C1F 1px, transparent 1px)",
        shadow: "linear-gradient(to bottom, #020617, transparent)",
      },
      backgroundSize: {
        "grid-size": "60px 60px",
      },
      fontFamily: {
        mono: '"Share Tech Mono", monospace, serif',
      },
      colors: {
        background: "#0F172A",
        primary: "#020617",
        secondary: "#00C853",
        accent: "#E0E0E0",
      },
    },
  },
  plugins: [],
};
