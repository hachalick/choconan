/** @type {import('tailwindcss').Config} */

module.exports = {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/layout/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      screens: {
        "2sm": "425px",
        "3sm": "375px",
        "4sm": "320px",
        print: { raw: "print" },
      },
      boxShadow: {
        "neo-sm": "3px 3px 9px #524554, -3px -3px 9px #d6d6d6",
        neo: "9px 9px 19px #4a3e4c, -9px -9px 19px #c1c1c1",
        "neo-md": "3px 3px 9px #524554, -3px -3px 9px #d6d6d6",
        "neo-lg": "3px 3px 9px #524554, -3px -3px 9px #d6d6d6",
        "neo-xl": "3px 3px 9px #524554, -3px -3px 9px #d6d6d6",
        "neo-2xl": "3px 3px 9px #524554, -3px -3px 9px #d6d6d6",
      },
      backgroundImage: {
        "gradient-radial": "radial-gradient(var(--tw-gradient-stops))",
        "gradient-radial-scroll-box-right":
          "radial-gradient(var(--tw-gradient-stops))",
        "gradient-radial-scroll-box-left":
          "radial-gradient(var(--tw-gradient-stops))",
        "gradient-conic":
          "conic-gradient(from 180deg at 50% 50%, var(--tw-gradient-stops))",
      },
      animation: {
        show: "show 1s ease-in-out",
        "gray-to-color": "gray-to-color 1s ease-in-out",
        "show-gray-to-color": "show-gray-to-color 1s ease-in-out",
        "reverse-bounce": "reverse-bounce 1s infinite;",
      },
      keyframes: {
        show: {
          "0%": { opacity: "0" },
          "100%": { opacity: "1" },
        },
        "gray-to-color": {
          "0%": { filter: "grayscale(100%)" },
          "30%": { filter: "grayscale(100%)" },
          "100%": { filter: "grayscale(0%)" },
        },
        "show-gray-to-color": {
          "0%": { filter: "grayscale(100%)", opacity: "0" },
          "30%": { filter: "grayscale(100%)" },
          "100%": { filter: "grayscale(0%)", opacity: "1" },
        },
        "reverse-bounce": {
          "0%, 100%": {
            transform: "translateY(25%)",
            animationTimingFunction: "cubic-bezier(0.8, 0, 1, 1)",
          },
          "50%": {
            transform: "translateY(0)",
            animationTimingFunction: "cubic-bezier(0, 0, 0.2, 1)",
          },
        },
      },
    },
  },
  variants: {
    extend: {
      display: ["print"],
    },
  },
  plugins: [],
};
