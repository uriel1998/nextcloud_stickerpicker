<template>
	<div class="sticker-reference">
		<img class="image"
			:src="richObject.proxied_url"
			:alt="richObject.name || t('integration_stickers', 'Sticker')">
	</div>
</template>

<script>
export default {
	name: 'StickerReferenceWidget',

	props: {
		richObjectType: {
			type: String,
			default: '',
		},
		richObject: {
			type: Object,
			default: null,
		},
		accessible: {
			type: Boolean,
			default: true,
		},
	},
}
</script>

<style scoped lang="scss">
.sticker-reference {
	width: 100%;
	padding: 8px;
	display: flex;
	justify-content: center;

	.image {
		max-height: 320px;
		max-width: 100%;
		object-fit: contain;
		border-radius: var(--border-radius);
	}
}
</style>
