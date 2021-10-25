import "assets/search/main.css"

import { Core, Binding } from "domodel"

import AppModel from "./model/app.js"

import AppBinding from "./model/app.binding.js"

import App from "./object/app.js"

import ErrorModel from "./model/error.js"

const searchParams = (new URL(document.location)).searchParams
const imageURL = searchParams.get("image_url")

window.addEventListener("load", function() {

	if(imageURL && (imageURL.startsWith("http://") || imageURL.startsWith("https://"))) {

		const app = new App(imageURL)

		Core.run(AppModel, {
			binding: new AppBinding({ app }),
			parentNode: document.body
		})

	} else {

		Core.run(ErrorModel({ error: `Error: "imageURL" parameter not specified or is invalid.` }), {
			parentNode: document.body
		})

	}

})
