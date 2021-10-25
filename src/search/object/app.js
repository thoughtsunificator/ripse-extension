import { Observable } from "domodel"

/**
 * @global
 */
class App extends Observable {

	/**
	 * @param {string} imageURL
	 */
	constructor(imageURL) {
		super()
		this._imageURL = imageURL
	}

	/**
	 * @type {string}
	 */
	get imageURL() {
		return this._imageURL
	}

	set imageURL(imageURL) {
		this._imageURL = imageURL
	}

}

export default App
