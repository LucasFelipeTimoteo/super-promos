import axios from "axios";
import { zodCouponsValidator } from "../../../validators/zod/coupons/couponsValidator";
import { zodProductsValidator } from "../../../validators/zod/products/productsValidator";

class Apis {
	productsApi = axios.create({
		baseURL: "https://api.divulgadorinteligente.com/api/products/",
	});

	couponsApi = axios.create({
		baseURL: "https://api.divulgadorinteligente.com/api/coupons/public",
	});

	async getProducts(
		start = "0",
		limit = "20",
		coupon?: string,
		sellers?: string,
	) {
		const productsResponse = await this.productsApi.get("/", {
			params: {
				sitename: "espionandopromos",
				start,
				limit,
				coupon,
				sellers,
			},
		});

		const products = zodProductsValidator.productsResponse(
			productsResponse.data,
		);

		return products;
	}

	async getCoupons(start = "0", limit = "10", featured = false) {
		const couponsResponse = await this.couponsApi.get("/", {
			params: {
				sitename: "espionandopromos",
				start,
				limit,
				featured,
			},
		});

		const coupons = zodCouponsValidator.couponsResponse(couponsResponse.data);

		return coupons;
	}
}

export const apis = new Apis();
