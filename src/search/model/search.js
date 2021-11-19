export default data => ({
	tagName: "div",
	id: "search",
	children: [
		{
			tagName: "h2",
			identifier: "title",
			textContent: `Searching `,
			children: [
				{
					tagName: "u",
					textContent: `${data.router.view.parameters.sourceName} `
				},
				{
					tagName: "span",
					textContent: "for similar products:"
				}
			],
			style: "color: #d9cece;"
		},
		{
			tagName: "img",
			width: 200,
			height: 200,
			src: data.app.imageURL
		},
		{
			tagName: "h4",
			identifier: "timer",
			textContent: `Time spent: 0s`
		},
		{
			tagName: "p",
			identifier: "placeholder",
			textContent: "Loading..."
		},
		{
			tagName: "h3",
			style: "display: none;",
			identifier: "listTitle"
		},
		{
			tagName: "div",
			className: "products",
			style: "display: none",
			identifier: "list"
		},
		{
			tagName: "div",
			className: "alternative",
			children: [
				{
					tagName: "button",
					identifier: "back",
					textContent: "Try another source"
				}
			]
		}
	]
})
