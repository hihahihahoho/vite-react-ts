import type { Preview } from '@storybook/react';

/* TODO: update import to your tailwind styles file. If you're using Angular, inject this through your angular.json config instead */
import '../src/styles/global.css';

const preview: Preview = {
	parameters: {
		actions: { argTypesRegex: '^on[A-Z].*' },
		controls: {
			matchers: {
				color: /(background|color)$/i,
				date: /Date$/,
			},
		},
	},

	decorators: [
		// Adds theme switching support.
		// NOTE: requires setting "darkMode" to "class" in your tailwind config
		//@ts-ignore
		// withThemeByClassName({
		// 	themes: {
		// 		light: 'light-mode',
		// 		dark: 'dark-mode',
		// 		vietcombank: 'theme-vietcombank',
		// 		bidv: 'theme-bidv',
		// 	},
		// 	defaultTheme: 'light',
		// }),
	],
};

export default preview;
