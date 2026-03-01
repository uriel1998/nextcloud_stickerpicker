<template>
	<div class="result"
		:title="sticker.title"
		@keydown.enter="$emit('click')"
		@click="$emit('click')">
		<img class="sticker-image"
			:src="sticker.thumbnailUrl"
			:alt="sticker.title">
	</div>
</template>

<script>
export default {
	name: 'StickerPickerResult',

	props: {
		sticker: {
			type: Object,
			required: true,
		},
	},

	emits: ['click'],
}
</script>

<style scoped lang="scss">
.result {
	display: flex;
	align-items: center;
	justify-content: center;
	border: 1px solid var(--color-border-maxcontrast);
	border-radius: var(--border-radius-large);
	padding: 6px;
	cursor: pointer;
	background: var(--color-main-background);

	&:hover {
		border-color: var(--color-primary-element);
	}

	.sticker-image {
		width: 100%;
		height: 100%;
		object-fit: contain;
		max-height: 130px;
	}
}
</style>
