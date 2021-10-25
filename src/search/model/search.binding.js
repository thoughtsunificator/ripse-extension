import { Binding } from "domodel"
import { Paginator, PaginatorModel, PaginatorBinding, ItemBinding } from "@domodel/paginator"

import Socket from "../object/socket.js"

import ProductModel from "./search/product.js"

import config from ":config"

/**
 * @global
 */
class SearchBinding extends Binding {

	startTimer() {
		const startDate = new Date()
		this.timerInterval = window.setInterval(() => {
			this.identifier.timer.textContent = `Time spent: ${Math.round((new Date().getTime() - startDate.getTime()) / 1000)}s`
		}, 1000)
	}

	restartTimer() {
		window.clearInterval(this.timerInterval)
		this.identifier.timer.textContent = `Time spent: 0s`
		this.startTimer()
	}

	openWebSocket() {
		this.identifier.timer.style.display = ""
		this.restartTimer()
		this.identifier.placeholder.textContent = `Connecting to server...`
		this.webSocket = new WebSocket(config.SOCKET_URL)
		this.connectTimeout = window.setTimeout(() => {
			if(this.webSocket.readyState === 0) {
				this.webSocket.close()
			}
		}, 5000)
		this.socket._webSocket = this.webSocket
		this.webSocket.addEventListener("open", event => this.onWebSocketOpen(event))
		this.webSocket.addEventListener("message", event => this.onWebSocketMessage(event))
		this.webSocket.addEventListener("close", event => this.onWebSocketClose(event))
	}

	/**
	 * @param {Event} event
	 */
	onWebSocketOpen(event) {
		window.clearTimeout(this.reconnectTimeout)
		window.clearInterval(this.reconnectInterval)
		window.clearInterval(this.connectTimeout)
		this.reconnectAttempts = 0
		this.restartTimer()
		this.identifier.placeholder.textContent = `Asking for products retrieval...`
		this.socket.send("search", { sourceName: this.properties.router.view.parameters.sourceName, imageURL: this.properties.app.imageURL })
	}

	/**
	 * @param {Event} event
	 */
	onWebSocketMessage(event) {
		if(event.data === "ping") {
			this.webSocket.send("pong")
		} else {
			let json
			try {
				json = JSON.parse(event.data)
			} catch(ex) {
				console.log(`Unknown message received: ${event.data.length >= 20 ? `${event.data.slice(0, 20)} (truncated: original size: ${event.data.length})` : event.data }`)
			}
			const { query, data } = json
			console.log(`Received query: ${query}`)
			this.socket.emit(query, data)
		}
	}

	/**
	 * @param {Event} event
	 */
	onWebSocketClose(event) {
		window.clearInterval(this.timerInterval)
		window.clearTimeout(this.reconnectTimeout)
		if(!this.productRetrieved) {
			if(this.reconnectAttempts === 3) {
				this.identifier.placeholder.textContent = `Reconnect failed.`
			} else {
				const startDate = new Date()
				this.reconnectInterval = window.setInterval((function renderTimer() {
					this.identifier.placeholder.innerHTML = `Connection failed: Reconnecting in <b>${5 - Math.round((new Date().getTime() - startDate.getTime()) / 1000)}s</b>`
					return renderTimer.bind(this)
				}).call(this), 1000)
				this.reconnectTimeout = window.setTimeout(() => {
					window.clearInterval(this.reconnectInterval)
					this.reconnectAttempts++
					this.openWebSocket()
				}, 5000)
			}
			this.identifier.timer.style.display = "none"
		}
	}

	remove() {
		this.webSocket.close()
		super.remove()
	}

	onCreated() {

		const { router, app } = this.properties

		const paginator = new Paginator(3)

		this.productRetrieved = false
		this.socket = new Socket()
		this.openWebSocket()
		this.reconnectTimeout = null
		this.reconnectAttempts = 0

		this.listen(this.socket, "status", message => {
			this.identifier.placeholder.textContent = message
		})

		this.listen(this.socket, "search", async products => {
			this.productRetrieved = true
			if(!products) {
				this.identifier.list.style.display = "none"
				this.identifier.listTitle.textContent = `An error occured.`
				this.identifier.listTitle.style.color = `rgb(191, 90, 90)`
			} else if(products.length >= 1) {
				this.identifier.timer.style.display = "none"
				this.identifier.placeholder.style.display = "none"
				window.clearInterval(this.timerInterval)
				this.identifier.listTitle.style.display = ""
				paginator.emit("itemsSet", products.map(product => ({
					model: ProductModel,
					binding: ItemBinding,
					properties: product
				})))
				this.identifier.list.style.display = ""
				this.identifier.title.textContent = `Source (${router.view.parameters.sourceName})`
				this.identifier.listTitle.textContent = `We found ${products.length} products that matched your search.`
				this.identifier.listTitle.style = `border-bottom: 1px solid #ffffff40;place-self: start;width: 100%;text-align: center;padding: 10px;`
				this.identifier.listTitle.style.color = `#5abf5a`
			} else {
				this.identifier.list.style.display = "none"
				this.identifier.listTitle.textContent = `We couldn't find any matching products.`
				this.identifier.listTitle.style.color = `rgb(191, 90, 90)`
			}
		})

		this.identifier.back.addEventListener("click", () => {
			router.emit("browse", { path: "/" })
		})

		this.run(PaginatorModel, {
			binding: new PaginatorBinding({ paginator }),
			parentNode: this.identifier.list
		})

	}

}

export default SearchBinding
