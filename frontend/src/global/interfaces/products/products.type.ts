import type { z } from "zod";
import { zodProductsValidator } from "../../validators/zod/products/productsValidator";

export type ProductAttributes = z.infer<
	typeof zodProductsValidator.ProductAttributesSchema
>;
export type Product = z.infer<typeof zodProductsValidator.ProductSchema>;
export type Products = z.infer<typeof zodProductsValidator.ProductsSchema>;
export type ProductsResponse = z.infer<
	typeof zodProductsValidator.ProductsResponseSchema
>;
