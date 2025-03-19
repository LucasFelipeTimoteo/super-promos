import { Router } from "express";
import { productsController } from "../../controllers/products/products";

class ProductsRouter {
	constructor() {
		this.#autoBindMethods(productsController);
	}

	exec() {
		const router = Router();

		router.get("/products", productsController.getProducts);
		router.get("/products/:name", productsController.getProductsByName);

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

export const productsRouter = new ProductsRouter();
