import config from ":config"
import browser from "../browser.js"

let tab = null

browser.contextMenus.onClicked.addListener(function(itemData) {
	if (itemData.menuItemId == "ripse") {
		if(tab) {
			browser.tabs.update(tab.id, { active: true })
			browser.tabs.sendMessage(tab.id, { message: "updateImageURL", data: itemData.srcUrl})
		} else {
			browser.tabs.create({
				active: true,
				url: `${browser.runtime.getURL("index.html")}?image_url=${encodeURIComponent(itemData.srcUrl)}`
			}, tab_ => {
				tab = tab_
			})
		}
	}
})

browser.tabs.onRemoved.addListener(function(tabId, removed) {
	if(tab && tabId === tab.id) {
		tab = null
	}
})

browser.contextMenus.create({
	id: "ripse",
	documentUrlPatterns: ["*://*.mercadolivre.com.br/*"],
	title: "Reverse Image Product Search Engine",
	contexts: ["image"]
})

browser.runtime.onMessage.addListener(function(request, sender, sendReponse) {
	if (request === "rate") {
		(async () => {
			try {
				const response = await fetch(`${config.API_URL}/currency-rate`)
				const rate = await response.json()
				sendReponse(rate)
			} catch(ex) {
				console.error(ex)
				sendReponse(null)
			}
		})()
		return true
	}
})
