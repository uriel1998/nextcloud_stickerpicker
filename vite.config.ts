import { createAppConfig } from '@nextcloud/vite-config'
import eslint from 'vite-plugin-eslint'

const isProduction = process.env.NODE_ENV === 'production'

export default createAppConfig({
	referenceSticker: 'src/referenceSticker.js',
}, {
	config: {
		plugins: [eslint()],
	},
	inlineCSS: { relativeCSSInjection: true },
	minify: isProduction,
})
