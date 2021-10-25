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
			textContent: `🇨🇳 | ¥${data.currency.chinese}`
		},
		{
			tagName: "div",
			innerHTML: `🇧🇷 | <span style="color: red">R$${data.currency.brazilian}</span>`,
			style: "border-bottom: 1px solid gray;"
		}
	]
})
