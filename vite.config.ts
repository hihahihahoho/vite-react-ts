/* eslint-disable import/no-extraneous-dependencies */
/// <reference types="vitest" />
/// <reference types="vite/client" />
import react from '@vitejs/plugin-react';
import { defineConfig, loadEnv } from 'vite';
import eslint from 'vite-plugin-eslint';
import vitePluginFaviconsInject from 'vite-plugin-favicons-inject';
import { ViteImageOptimizer } from 'vite-plugin-image-optimizer';
import svgr from 'vite-plugin-svgr';
// https://vitejs.dev/config/
export default ({ mode }) => {
	process.env = { ...process.env, ...loadEnv(mode, process.cwd()) };
	const baseURL = process.env.VITE_BASE_URL || '.';

	return defineConfig({
		base: baseURL,
		plugins: [
			svgr({
				svgrOptions: {
					plugins: ['@svgr/plugin-svgo', '@svgr/plugin-jsx'],
					svgo: true,
					svgoConfig: {
						plugins: [
							'prefixIds',
							{
								name: 'addClassesToSVGElement',
								params: {
									className: 'svg-class',
								},
							},
						],
					},
					// replaceAttrValues: { '#fff': 'currentColor' }, // Replace the desired color with 'currentColor'
				},
			}),
			react(),
			eslint(),
			vitePluginFaviconsInject(`./public/favicon.svg`, {}),
			ViteImageOptimizer({
				test: /\.(jpe?g|png|gif|tiff|webp|avif)$/i,
				png: {
					quality: 80,
				},
				jpeg: {
					quality: 90,
				},
				jpg: {
					quality: 90,
				},
			}),
		],
	});
};
