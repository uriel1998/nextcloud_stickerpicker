export const delay = (callback, wait = 0) => {
	let timeoutId
	return (...args) => {
		window.clearTimeout(timeoutId)
		timeoutId = window.setTimeout(() => callback.apply(null, args), wait)
	}
}
