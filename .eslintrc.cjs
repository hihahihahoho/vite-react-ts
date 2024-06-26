module.exports = {
	env: {
		browser: true,
		es2021: true,
	},
	extends: [
		'react-app',
		'plugin:prettier/recommended',
		'plugin:storybook/recommended',
	],
	overrides: [],
	parser: '@typescript-eslint/parser',
	parserOptions: {
		ecmaVersion: 'latest',
		sourceType: 'module',
		project: './tsconfig.json',
	},
	plugins: ['react', 'prettier'],
	rules: {
		'prettier/prettier': 'warn',
		'@typescript-eslint/indent': ['warn', 'tab'],
		indent: 'off',
		'no-tabs': 0,
		'react/prop-types': 0,
		'react/jsx-indent': [2, 'tab'],
		'react/jsx-indent-props': [2, 'tab'],
		'react/jsx-no-target-blank': 'warn',
		'react/react-in-jsx-scope': 'off',
		'react/jsx-one-expression-per-line': 'off',
		'import/no-absolute-path': 'off',
		'import/extensions': 2,
		'no-param-reassign': 0,
		'import/no-cycle': 0,
		'@typescript-eslint/no-inferrable-types': 'warn',
		'@typescript-eslint/no-explicit-any': ['warn', { ignoreRestArgs: true }],
	},
};
