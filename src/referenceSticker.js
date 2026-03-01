import {
	registerWidget,
	registerCustomPickerElement,
	NcCustomPickerRenderResult,
} from '@nextcloud/vue/components/NcRichText'

registerWidget('integration_stickers_sticker', async (el, { richObjectType, richObject, accessible }) => {
	const { createApp } = await import('vue')
	const { default: StickerReferenceWidget } = await import('./views/StickerReferenceWidget.vue')

	const app = createApp(
		StickerReferenceWidget,
		{
			richObjectType,
			richObject,
			accessible,
		},
	)
	app.mixin({ methods: { t, n } })
	app.mount(el)
}, () => {}, { hasInteractiveView: false })

registerCustomPickerElement('stickers', async (el, { providerId, accessible }) => {
	const { createApp } = await import('vue')
	const { default: StickerCustomPickerElement } = await import('./views/StickerCustomPickerElement.vue')

	const app = createApp(
		StickerCustomPickerElement,
		{
			providerId,
			accessible,
		},
	)
	app.mixin({ methods: { t, n } })
	app.mount(el)

	return new NcCustomPickerRenderResult(el, app)
}, (el, renderResult) => {
	renderResult.object.unmount()
})
