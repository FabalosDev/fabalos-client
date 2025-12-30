// svelte.config.js
import adapter from '@sveltejs/adapter-vercel'; // <--- PALITAN ITO (dati cloudflare)
import { vitePreprocess } from '@sveltejs/vite-plugin-svelte';

/** @type {import('@sveltejs/kit').Config} */
const config = {
	preprocess: vitePreprocess(),

	kit: {
		// Ngayon, Vercel na ang bahala sa build settings
		adapter: adapter()
	}
};

export default config;
