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
    extend: {
      fontSize: {
        base: "14px",
        heading: "2rem",
        label: "0.75rem",
      },
      colors: {
        omf: "#2659d9",
        "omf-green": "#007e7a",
      },
    },
  },
  plugins: [],
};
