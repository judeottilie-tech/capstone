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
          dark: "#b1164f",
        },
        blue: {
          light: "#dff0fb",
          mid: "#93c9f0",
          main: "#60aee8",
          dark: "#3a7cb8",
        },
        yellow: {
          light: "#fef9db",
          mid: "#fde98a",
          main: "#f9d74c",
          dark: "#eba40a",
        },
        neutral: {
          soft: "#fdf6f9",
          border: "#f0d6e4",
        },
      },
      borderRadius: {
        pill: "9999px",
      },
    },
  },
  plugins: [],
}
