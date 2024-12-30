/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        main: "var(--main-color)",
        mainDark: "var(--main-dark-color)",
        back: "var(--back-color)",
        mainText: "var(--mainText-color)",
        secondaryText: "var(--secondaryText-color)",
        secondary: "var(--secondary-color)",
      },
    },
  },
  plugins: [],
};
