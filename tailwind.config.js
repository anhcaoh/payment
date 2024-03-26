/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/app/**/*.{ts,jsx,tsx,mdx}", // Note the addition of the `app` directory.
    "./src/components/**/*.{ts,jsx,tsx,mdx}",
    "./src/features/**/*.{ts,jsx,tsx,mdx}",
  ],
  theme: {
    fontFamily: {
      sans: ['"var(--font-roboto)"', "sans-serif"],
      roboto: ["var(--font-roboto)"],
    },
    fontSize: {
      heading: "2rem",
    },
    extend: {},
  },
  plugins: [],
};
