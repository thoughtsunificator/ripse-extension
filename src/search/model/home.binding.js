import { Binding } from "domodel"

/**
 * @global
 */
class HomeBinding extends Binding {

	onCreated() {

		const { router, app } = this.properties

		this.identifier._1688.addEventListener("click", () => {
			router.emit("browse", { path: "/search/1688" })
		})

		this.identifier.taobao.addEventListener("click", () => {
			alert("Taobao is in maintenance")
			// router.emit("browse", { path: "/search/taobao" })
		})

	}

}

export default HomeBinding
