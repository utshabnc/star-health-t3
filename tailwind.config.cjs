/** @type {import('tailwindcss').Config} */


module.exports = {
  content: [
		"./src/**/*.{js,ts,jsx,tsx}",
	],
  theme: {
    extend: {
			colors: {
				bordercolor: 'hsla(0, 0%, 100%, 0.1)'
			},
		},

		fontFamily: {
			custom: ['Inter', 'sans-serif'],
		}
  },
  plugins: [],
};
