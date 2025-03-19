import type { Request, Response } from "express";
import NodeCache from "node-cache";
import { appEnv } from "../../global/env/appEnv";
import type { ProductsResponse } from "../../global/interfaces/products/products.type";
import { logger } from "../../global/logger/pino/pinoLogger";
import { apis } from "../../services/http/apis/apis";

class ProductsController {
	cache: NodeCache;

	constructor() {
		this.cache = new NodeCache({ stdTTL: appEnv.PRODUCTS_TTL });
	}

	async getProducts(req: Request, res: Response) {
		const { coupon, sellers, start, limit } = req.query;
		const cacheKeyname = `products?coupon=${coupon}&sellers=${sellers}&start=${start}&limit=${limit}`;

		if (!this.cache.has(cacheKeyname)) {
			logger.debug(
				`Cache not found, getting ${limit} products from api with offset: ${start}`,
			);

			const productsFromApi = await apis.getProducts(
				start as string | undefined,
				limit as string | undefined,
				coupon as string | undefined,
				sellers as string | undefined,
			);

			this.cache.set(cacheKeyname, productsFromApi);

			return res.status(200).json(productsFromApi);
		}

		const productsFromCache = this.cache.get(cacheKeyname);

		if (productsFromCache === undefined) {
			throw new Error(
				`Unexpected server error. [productsFromCache] should not be undefined at this point, but received: ${productsFromCache}`,
			);
		}

		return res.status(200).json(productsFromCache);
	}

	async getProductsByName(req: Request, res: Response) {
		const name = req.params.name;
		const cacheKeyname = "allProducts";

		if (!this.cache.has(cacheKeyname)) {
			logger.debug("Cache not found. Getting all products from api");
			const allProductsFromApi = await apis.getProducts("0", "9999999999");

			this.cache.set(cacheKeyname, allProductsFromApi);
			const productsByName = this.#filterProductsByName(
				allProductsFromApi,
				name,
			);

			return res.status(200).json(productsByName);
		}

		const allProductsFromCache = this.cache.get<ProductsResponse>(cacheKeyname);
		if (allProductsFromCache === undefined) {
			throw new Error(
				`Unexpected server error. [allProductsFromCache] should not be undefined at this point, but received: ${allProductsFromCache}`,
			);
		}

		const productsByName = this.#filterProductsByName(
			allProductsFromCache,
			name,
		);

		return res.status(200).json(productsByName);
	}

	#filterProductsByName(products: ProductsResponse, name: string) {
		const lowercaseName = name.toLocaleLowerCase();

		const filteredProducts = products.data.filter((product) => {
			const lowercaseProductTitle =
				product.attributes.title.toLocaleLowerCase();
			return lowercaseProductTitle.includes(lowercaseName);
		});

		const filteredProductsResponse = { data: filteredProducts };
		const result = filteredProducts.length > 0 ? filteredProductsResponse : [];

		return result;
	}
}

export const productsController = new ProductsController();
