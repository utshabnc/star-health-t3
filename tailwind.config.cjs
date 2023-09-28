/** @type {import('tailwindcss').Config} */

module.exports = {
  content: ["./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      colors: {
        bordercolor: "hsla(0, 0%, 100%, 0.2)",
        customgrey: "rgba(255, 255, 255, 0.65)",
        bgPrimary: "#0e1936",
        royalBlue: '#502eed'
      },
      gridAutoColumns: {
        custom: "1fr",
      },
      gridTemplateColumns: {
        custom: "1fr 1fr",
        custom2: "1fr 1fr auto",
        custom3: "1fr 1fr 1fr",
      },
      gridTemplateRows: {
        custom: "auto",
        custom2: "auto auto",
      },
    },
    screens: {
      'xs': '320px',
      'sm': '640px',
      'md': '768px',
      'lg': '1024px',
      'xl': '1280px',
    },
    fontFamily: {
      custom: ["Inter", "sans-serif"],
    },
  },
  plugins: [],
};
