export default data => ({
	tagName: "div",
	id: "home",
	children: [
		{
			tagName: "div",
			children: [
				{
					tagName: "h2",
					textContent: "Welcome",
				},
				{
					tagName: "p",
					innerHTML: `This tool looks for similar images in the <a target="_blank" href="https://www.taobao.com/">Taobao</a> and <a target="_blank" href="https://www. 1688.com/">1688</a>.`
				},
			]
		},
		{
			tagName: "div",
			children: [
				{
					tagName: "h2",
					textContent: "Where do you want to look?"
				},
				{
					tagName: "button",
					identifier: "_1688",
					textContent: "1688"
				},
				{
					tagName: "button",
					identifier: "taobao",
					textContent: "Taobao"
				}
			]
		}
	]
})
