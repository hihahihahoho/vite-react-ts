/** @type {import('tailwindcss').Config} */
module.exports = {
	content: [
		"./src/**/*.{js,jsx,ts,tsx}",
	],
	safelist: [
		'theme-dark'
	],
	plugins: [
		require("tailwindcss-animate"),
		require('@tailwindcss/container-queries'),
		require('tailwindcss-themer')({
			defaultTheme: {
				container: {
					center: true,
					padding: "2rem",
					screens: {
						"2xl": "1400px",
					},
				},
				extend: {
					colors: {
						formBorder: '#d1d5db',
						boxColor: 'white',
						border: "hsl(var(--border))",
						input: "hsl(var(--input))",
						ring: "hsl(var(--ring))",
						background: "hsl(var(--background))",
						foreground: "hsl(var(--foreground))",
						primary: {
							DEFAULT: "hsl(var(--primary))",
							foreground: "hsl(var(--primary-foreground))",
						},
						secondary: {
							DEFAULT: "hsl(var(--secondary))",
							foreground: "hsl(var(--secondary-foreground))",
						},
						destructive: {
							DEFAULT: "hsl(var(--destructive))",
							foreground: "hsl(var(--destructive-foreground))",
						},
						muted: {
							DEFAULT: "hsl(var(--muted))",
							foreground: "hsl(var(--muted-foreground))",
						},
						accent: {
							DEFAULT: "hsl(var(--accent))",
							foreground: "hsl(var(--accent-foreground))",
						},
						popover: {
							DEFAULT: "hsl(var(--popover))",
							foreground: "hsl(var(--popover-foreground))",
						},
						card: {
							DEFAULT: "hsl(var(--card))",
							foreground: "hsl(var(--card-foreground))",
						},
					},
					borderRadius: {
						lg: "var(--radius)",
						md: "calc(var(--radius) - 2px)",
						sm: "calc(var(--radius) - 4px)",
					},
					keyframes: {
						"accordion-down": {
							from: { height: 0 },
							to: { height: "var(--radix-accordion-content-height)" },
						},
						"accordion-up": {
							from: { height: "var(--radix-accordion-content-height)" },
							to: { height: 0 },
						},
					},
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