export default data => ({
	tagName: "div",
	className: "product",
	children: [
		{
			tagName: "h3",
			textContent: data.name,
			title: data.name
		},
		{
			tagName: "a",
			target: "_blank",
			href: data.url,
			children: [
				{
					tagName: "img",
					width: 200,
					src: data.src
				},
			]
		},
		{
			tagName: "div",
			children: [
				{
					tagName: "span",
					textContent: "🇨🇳 | "
				},
				{
					tagName: "span",
					style: "color: red",
					textContent: `¥${data.currency.chinese}`
				},
			]
			style: "border-bottom: 1px solid gray;"
		}
		{
			tagName: "div",
			children: [
				{
					tagName: "span",
					textContent: "🇧🇷 | "
				},
				{
					tagName: "span",
					style: "color: red",
					textContent: `R$${data.currency.brazilian}`
				},
			]
			style: "border-bottom: 1px solid gray;"
		}
	]
})
