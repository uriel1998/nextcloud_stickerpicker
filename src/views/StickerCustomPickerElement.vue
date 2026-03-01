<template>
	<div class="sticker-picker-content">
		<h2>{{ t('integration_stickers', 'Sticker picker') }}</h2>
		<div class="input-wrapper">
			<NcTextField ref="search-input"
				v-model="searchQuery"
				:show-trailing-button="searchQuery !== ''"
				:label="t('integration_stickers', 'Search stickers')"
				@trailing-button-click="onClear"
				@update:model-value="onInput">
				<template #trailing-button-icon>
					<CloseIcon :size="20" />
				</template>
				<template #icon>
					<MagnifyIcon :size="20" />
				</template>
			</NcTextField>
		</div>

		<div v-if="stickers.length === 0 && !loading" class="empty-message">
			{{ t('integration_stickers', 'No stickers found') }}
		</div>

		<div ref="results" class="results">
			<StickerPickerResult v-for="(sticker, i) in stickers"
				:key="`${i}-${sticker.resourceUrl}`"
				:sticker="sticker"
				@click="onSubmit(sticker)" />
		</div>

		<div class="actions">
			<NcButton v-if="hasMore"
				:disabled="loading"
				variant="secondary"
				@click="search()">
				{{ loading ? t('integration_stickers', 'Loading...') : t('integration_stickers', 'Load more') }}
			</NcButton>
		</div>
	</div>
</template>

<script>
import axios from '@nextcloud/axios'
import { generateOcsUrl } from '@nextcloud/router'
import NcTextField from '@nextcloud/vue/components/NcTextField'
import NcButton from '@nextcloud/vue/components/NcButton'
import MagnifyIcon from 'vue-material-design-icons/Magnify.vue'
import CloseIcon from 'vue-material-design-icons/Close.vue'
import StickerPickerResult from '../components/StickerPickerResult.vue'
import { delay } from '../utils.js'

const LIMIT = 60

export default {
	name: 'StickerCustomPickerElement',

	components: {
		NcTextField,
		NcButton,
		MagnifyIcon,
		CloseIcon,
		StickerPickerResult,
	},

	props: {
		providerId: {
			type: String,
			required: true,
		},
		accessible: {
			type: Boolean,
			default: false,
		},
	},

	data() {
		return {
			searchQuery: '',
			stickers: [],
			cursor: 0,
			hasMore: true,
			loading: false,
			abortController: null,
		}
	},

	mounted() {
		this.search(true)
		this.focusOnInput()
	},

	beforeUnmount() {
		this.cancelSearchRequests()
	},

	methods: {
		focusOnInput() {
			setTimeout(() => {
				this.$refs['search-input']?.$el?.getElementsByTagName('input')[0]?.focus()
			}, 250)
		},
		onSubmit(sticker) {
			this.cancelSearchRequests()
			this.$el.dispatchEvent(new CustomEvent('submit', { detail: sticker.resourceUrl, bubbles: true }))
		},
		onInput() {
			delay(() => {
				this.updateSearch()
			}, 300)()
		},
		onClear() {
			this.searchQuery = ''
			this.updateSearch()
		},
		updateSearch() {
			if (this.$refs.results?.scrollTop) {
				this.$refs.results.scrollTop = 0
			}
			this.cancelSearchRequests()
			this.stickers = []
			this.cursor = 0
			this.hasMore = true
			this.search(true)
		},
		cancelSearchRequests() {
			if (this.abortController) {
				this.abortController.abort()
			}
		},
		search(reset = false) {
			if (this.loading || (!this.hasMore && !reset)) {
				return Promise.resolve()
			}

			this.abortController = new AbortController()
			this.loading = true

			const url = generateOcsUrl(
				'apps/integration_stickers/api/v1/stickers?term={term}&cursor={cursor}&limit={limit}',
				{
					term: this.searchQuery,
					cursor: this.cursor,
					limit: LIMIT,
				},
			)

			return axios.get(url, { signal: this.abortController.signal })
				.then((response) => {
					const data = response.data?.ocs?.data || {}
					const entries = data.entries || []

					if (reset) {
						this.stickers = entries
					} else {
						this.stickers.push(...entries)
					}

					this.cursor = data.cursor === null ? this.cursor : data.cursor
					this.hasMore = data.cursor !== null && entries.length > 0
				})
				.catch((error) => {
					if (error?.name !== 'CanceledError') {
						console.debug('sticker search request error', error)
					}
				})
				.finally(() => {
					this.loading = false
				})
		},
	},
}
</script>

<style scoped lang="scss">
.sticker-picker-content {
	width: 100%;
	display: flex;
	flex-direction: column;
	align-items: center;
	padding: 12px 16px;
	max-height: 800px;
	overflow-y: auto;

	h2 {
		margin: 0;
	}

	.input-wrapper {
		width: 100%;
		margin-top: 12px;
	}

	.empty-message {
		margin-top: 24px;
		color: var(--color-text-lighter);
	}

	.results {
		width: 100%;
		display: grid;
		grid-template-columns: repeat(auto-fit, minmax(140px, 1fr));
		grid-auto-rows: 140px;
		gap: 8px;
		margin-top: 12px;
	}

	.actions {
		margin: 12px 0 4px;
	}
}
</style>
