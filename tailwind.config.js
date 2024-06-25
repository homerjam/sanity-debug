import typography from '@tailwindcss/typography';

/** @type {import('tailwindcss').Config} */
export default {
	content: ['./src/**/*.{html,js,svelte,ts}', '!./src/lib/sanity/**'],
	theme: {
		extend: {

		},
	},
	plugins: [typography],
};
