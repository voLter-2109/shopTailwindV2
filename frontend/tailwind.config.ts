/** @type {import('tailwindcss').Config} */

const twColors = require('tailwindcss/colors')

const colors = {
	transparent: twColors.transparent,
	black: '#2E3239',
	white: twColors.white,
	primary: '#FF9902',
	secondary: '#161D25',
	'bg-color': '#f2f2f5',
	aqua: '#267697',
	red: twColors.red,
	'bg-gray': 'rgb(209 213 219)'
}

module.exports = {
	content: [
		'./src/pages/**/*.{js,ts,jsx,tsx,mdx}',
		'./src/components/**/*.{js,ts,jsx,tsx,mdx}',
		'./src/app/**/*.{js,ts,jsx,tsx,mdx}',
		'./src/**/**/*.{scss, sass}',
		'./src/ui/**/*.{js,ts,jsx,tsx,mdx}',
		'./src/**/**/*.{js,ts,jsx,tsx,mdx}'
	],
	theme: {
		colors,
		extend: {}
	},
	plugins: []
}
