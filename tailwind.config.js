/** @type {import('tailwindcss').Config} */
module.exports = {
	content: ['./src/**/*.{html,js,svelte,ts}'],
	theme: {
		extend: {
			fontFamily: {
				// ⚡ This maps 'font-heading' to your CSS variable
				heading: ['var(--font-heading)', 'monospace'],

				// This maps 'font-sans' to your CSS variable
				sans: ['var(--font-body)', 'sans-serif']
			},
			colors: {
				// Maps colors to variables (enables opacity like bg-primary/50)
				background: 'rgb(var(--color-canvas) / <alpha-value>)',
				surface: 'rgb(var(--color-surface) / <alpha-value>)',
				primary: 'rgb(var(--color-brand) / <alpha-value>)',
				muted: 'rgb(var(--color-muted) / <alpha-value>)'
			}
		}
	},
	plugins: []
};
