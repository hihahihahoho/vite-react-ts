/** @type {import('tailwindcss').Config} */
module.exports = {
	content: [
		"./src/**/*.{js,jsx,ts,tsx}",
	],
	plugins: [
		require('@tailwindcss/container-queries'),
		require('tailwindcss-themer')({
			defaultTheme: {
				extend: {
					colors: {
						primary: 'red',
						formBorder: '#d1d5db',
						boxColor: 'white'
					}
				}
			},
			themes: [
				{
					name: 'theme-dark',
					extend: {
						colors: {
							primary: 'black',
							boxColor: '#1e293b',
							formBorder: '#6b7280'
						}
					}
				}, {
					name: 'theme-vietcombank',
					extend: {
						colors: {
							primary: 'yellow',
						}
					}
				}, {
					name: 'theme-bidv',
					extend: {
						colors: {
							primary: 'cyan',
						}
					}
				}
			]
		})
	]
}