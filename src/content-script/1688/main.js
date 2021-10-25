import "assets/content-script/1688.css"

import Engine from "../engine.js"

const selectors = [
	".price > em",
	".price .price-container",
	".price-original-sku .value",
	".fd-clr .offer-price",
	".props-wrap .price em",
	".alife-bc-uc-number",
	".offer-price-box > .offer-price",
	".changhuo-offer-box .offer-price",
	"[class*=price-length]",
	"dd.price em.value",
	"td.price em.value",
	".price-now"
]

new Engine().load(selectors)
