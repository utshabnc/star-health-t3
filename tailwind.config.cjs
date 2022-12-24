/** @type {import('tailwindcss').Config} */


module.exports = {
  content: [
		"./src/**/*.{js,ts,jsx,tsx}",
	],
  theme: {
    extend: {
			colors: {
				bordercolor: 'hsla(0, 0%, 100%, 0.2)',
				customgrey: 'rgba(255, 255, 255, 0.65)'
			},
			gridAutoColumns: {
				'custom': '1fr',
			},
			gridTemplateColumns: {
				'custom': '1fr 1fr',
				'custom2': '1fr 1fr auto',
				'custom3': '1fr 1fr 1fr',
			},
			gridTemplateRows: {
				'custom': 'auto',
				'custom2': 'auto auto',
			},

		},

		fontFamily: {
			custom: ['Inter', 'sans-serif'],
		}
  },
  plugins: [],
};
