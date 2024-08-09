/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      backgroundImage: {
        "gradient-radial": "radial-gradient(var(--tw-gradient-stops))",
        "gradient-conic":
          "conic-gradient(from 180deg at 50% 50%, var(--tw-gradient-stops))",
      },
      colors: {
        primary: "hsl(var(--primary))",
        secondary: "hsl(var(--secondary))",
        tertiary: "hsl(var(--tertiary))",
        neutral: "hsl(var(--neutral))",
        accent: "hsl(var(--accent))",
        gray: "hsl(var(--gray))",
        "white-smoke": "hsl(var(--white-smoke))",
        "gray-dark": "hsl(var(--gray-dark))",
        "gray-light": "hsl(var(--gray-light))"
      },
    },
  },
  plugins: [require("tailwindcss-animate")],
};
