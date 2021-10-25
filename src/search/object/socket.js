import { Observable } from "domodel"

/**
 * @global
 */
class Socket extends Observable {

	/**
	 * @param {WebSocket} webSocket
	 */
	constructor(webSocket) {
		super()
		this._webSocket = webSocket
	}

	/**
	 * @event Socket#status
	 * @property {string} message
	 */

	/**
	 * @event Socket#search
	 * @property {array} products
	 * @property {string} products[].name
	 * @property {string} products[].url
	 * @property {string} products[].src
	 * @property {object} products[].currency
	 * @property {string} products[].currency.brazilian
	 * @property {string} products[].currency.chinese
	 */

	/**
	 * @type {WebSocket}
	 */
	get webSocket() {
		return this._webSocket
	}

	/**
	 * @param {string} query
	 * @param {*}      data
	 */
	send(query, data) {
		this.webSocket.send(JSON.stringify({ query, data }))
	}

}

export default Socket
