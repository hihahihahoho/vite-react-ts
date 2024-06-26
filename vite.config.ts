/* eslint-disable import/no-extraneous-dependencies */
/// <reference types="vitest" />
/// <reference types="vite/client" />
import react from '@vitejs/plugin-react-swc';
import path from 'path';
import { defineConfig, loadEnv } from 'vite';
import eslintVite from 'vite-plugin-eslint';
//@ts-ignore
import checker from 'vite-plugin-checker';
import { ViteImageOptimizer } from 'vite-plugin-image-optimizer';
import svgr from 'vite-plugin-svgr';
// https://vitejs.dev/config/

export default ({ mode }: { mode: any }) => {
	process.env = { ...process.env, ...loadEnv(mode, process.cwd()) };
	const baseURL = process.env.VITE_BASE_URL || './';

	return defineConfig({
		base: baseURL,
		resolve: {
			alias: {
				'@': path.resolve(__dirname, 'src'),
				'@pages': path.resolve(__dirname, 'src/pages'),
				'@libs': path.resolve(__dirname, 'src/libs'),
				'@assets': path.resolve(__dirname, 'src/assets'),
			},
		},
		build: {
			manifest: true,
			rollupOptions: {
				external: [
					'**/*.stories.tsx',
					'**/*.stories.ts',
					'**/*.test.ts',
					'**/*.test.tsx',
				],
			},
		},
		plugins: [
			checker({
				// e.g. use TypeScript check
				typescript: true,
			}),
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
			eslintVite(),
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
