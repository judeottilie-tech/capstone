/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,jsx,ts,tsx}"],
  theme: {
    extend: {
      colors: {
        pink: {
          light: "#fde8f0",
          mid: "#f9a8c9",
          main: "#f472a8",
          dark: "#c4547e",
        },
        blue: {
          light: "#dff0fb",
          mid: "#93c9f0",
          main: "#60aee8",
          dark: "#3a7cb8",
        },
        neutral: {
          soft: "#fdf6f9",
          border: "#f0d6e4",
        },
        gray: {
          light: "#cfcfcf",
          mid: "#a1a1a1",
          main: "#919191",
          dark: "#4d4d4d",
        },
      },
      borderRadius: {
        pill: "9999px",
      },
    },
  },
  plugins: [],
}
