import config from ":config"
import browser from "../browser.js"

/**
 * @global
 */
class Engine {

	constructor() {
		this._rate = null
	}

	render(selectorsStr) {
		const priceNodes = document.querySelectorAll(selectorsStr)
		for(const priceNode of priceNodes) {
			if(priceNode.classList && priceNode.classList.contains("ripse-price-converted")) {
				continue
			}
			priceNode.classList.add("ripse-price-converted")
			const value = priceNode.textContent.replace(/[^0-9.,]/, "")
			const convertedValue = this.convert(new Number(value))
			priceNode.title = `(R$$${convertedValue})`
			let span = document.createElement("span")
			span.textContent = ` (R$$${convertedValue})`
			span.style = `color:#0004ff; font-size: 12px`
			priceNode.appendChild(span)
		}
	}

	async load(selectors) {
		console.log("[ripse] Retrieving exchange rate...")
		try {
			this._rate  = await this.sendMessage("rate")
			if(!this.rate) {
				console.log("[ripse] Could not retrieve exchange rate: retrying in 5s...")
				await new Promise(resolve => {
					setTimeout(async () => {
						await this.load(selectors)
						resolve()
					}, 5000)
				})
			} else {
				console.log(`[ripse] Current rate for currency pair is ${this.rate}`)
				const selectorsStr = selectors.join(",")
				this.render(selectorsStr)
				const observer = new MutationObserver(async mutationsList => {
					for(const mutation of mutationsList) {
						for(const addedNode of mutation.addedNodes) {
							this.render(selectorsStr)
						}
					}
				})
				observer.observe(document.documentElement, { childList: true, subtree: true })
			}
		} catch(ex) {
			console.error(ex)
		}
	}

	convert(value) {
		return new Number(value * this.rate).toFixed(2)
	}

	sendMessage(message) {
		return new Promise(resolve => {
			browser.runtime.sendMessage(message, data => resolve(data))
		})
	}

	/**
	 * @readonly
	 * @type {number}
	 */
	get rate() {
		return this._rate
	}

}

export default Engine
