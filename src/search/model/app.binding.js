import { Binding } from "domodel"

import { Router, Route, RouterModel, RouterBinding } from "@domodel/router"

import HomeViewModel from "./home.js"
import HomeViewBinding from "./home.binding.js"

import SearchViewModel from "./search.js"
import SearchViewBinding from "./search.binding.js"

import browser from "../../browser.js"

/**
 * @global
 */
class AppBinding extends Binding {

	onCreated() {

		const { app } = this.properties

		const routes = [
			new Route("/", HomeViewModel, HomeViewBinding),
			new Route("/search/{sourceName}", SearchViewModel, SearchViewBinding)
		]

		const router = new Router(routes, Router.TYPE.VIRTUAL, null, "/search/1688")

		if(browser) {
			browser.runtime.onMessage.addListener(function(request, sender) {
				if (request.message === "updateImageURL") {
					app.imageURL = request.data
					router.emit("browse", { path: "/search/1688" })
				}
				return true
			})
		}

		this.run(RouterModel, {
			binding: new RouterBinding({ router, app }),
			parentNode: this.identifier.router
		})

	}

}

export default AppBinding
