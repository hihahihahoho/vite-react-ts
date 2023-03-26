// eslint-disable-next-line import/no-extraneous-dependencies
import react from '@vitejs/plugin-react';
import { defineConfig } from 'vite';
// eslint-disable-next-line import/no-extraneous-dependencies
import eslint from 'vite-plugin-eslint';
import vitePluginFaviconsInject from 'vite-plugin-favicons-inject';

// https://vitejs.dev/config/
export default defineConfig({
	plugins: [
		react(),
		eslint(),
		vitePluginFaviconsInject('./public/favicon.svg'),
	],
	test: {
		globals: true,
		environment: 'jsdom',
		setupFiles: ['./src/setupTests.ts'],
	},
});
