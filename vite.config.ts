import react from '@vitejs/plugin-react';
import { defineConfig } from 'vite';
import eslint from 'vite-plugin-eslint';
import vitePluginFaviconsInject from 'vite-plugin-favicons-inject';
import svgr from 'vite-plugin-svgr';

// https://vitejs.dev/config/
export default defineConfig({
	plugins: [
		svgr({
			svgrOptions: {
				svgo: true,
				svgoConfig: {
					plugins: [
						{
							name: '@svgr/plugin-svgo',
							params: {
								plugins: [
									'preset-default',
									{
										name: 'addAttributesToSVGElement',
										params: {
											attributes: ['path', 'currentColor'],
										},
									},
								],
							},
						},
					],
				},
				// replaceAttrValues: { '#fff': 'currentColor' }, // Replace the desired color with 'currentColor'
			},
		}),
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
