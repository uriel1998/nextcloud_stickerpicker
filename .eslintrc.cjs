module.exports = {
	root: true,
	extends: [
		'@nextcloud',
	],
	env: {
		browser: true,
		es2022: true,
	},
	globals: {
		t: 'readonly',
		n: 'readonly',
	},
}
