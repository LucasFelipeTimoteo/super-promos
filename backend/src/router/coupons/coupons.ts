import { Router } from "express";
import { couponsController } from "../../controllers/coupons/coupons";

class CouponsRouter {
	constructor() {
		this.#autoBindMethods(couponsController);
	}

	exec() {
		const router = Router();

		router.get("/coupons", couponsController.getCoupons);

		return router;
	}

	/* biome-ignore lint/suspicious/noExplicitAny: */
	#autoBindMethods(instance: any): void {
		const prototype = Object.getPrototypeOf(instance);
		Object.getOwnPropertyNames(prototype)
			.filter((prop) => typeof instance[prop] === "function")
			.forEach((method) => {
				instance[method] = instance[method].bind(instance);
			});
	}
}

export const couponsRouter = new CouponsRouter();
