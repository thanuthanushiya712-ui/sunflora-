/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,jsx}"],
  theme: {
    extend: {
      colors: {
        cream: "#FBF6EC",
        ink: "#2B2620",
        olive: {
          DEFAULT: "#3F4B33",
          light: "#5C6B4B",
          dark: "#2C3524",
        },
        sunflower: {
          DEFAULT: "#E8A94C",
          light: "#F3C784",
        },
        clay: "#C97B4A",
        sage: "#8FA07C",
      },
      fontFamily: {
        display: ["Fraunces", "serif"],
        body: ["Work Sans", "sans-serif"],
      },
      borderRadius: {
        organic: "60% 40% 55% 45% / 45% 55% 45% 55%",
      },
    },
  },
  plugins: [],
};
