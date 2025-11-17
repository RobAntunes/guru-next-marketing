// @ts-check
import { defineConfig } from 'astro/config';
import tailwind from '@tailwindcss/vite';
import db from '@astrojs/db';
import vercel from '@astrojs/vercel';

export default defineConfig({
	output: 'server',
	adapter: vercel(),
	integrations: [db()],
	vite: {
		plugins: [tailwind()],
	},
});
