import { z } from "zod";

class ZodProductsValidator {
	ProductAttributesSchema = z.object({
		updatedAt: z.string(),
		title: z.string(),
		image: z.string(),
		price_from: z.string().nullable().optional(),
		price: z.string(),
		link: z.string(),
		uuid: z.string(),
		createdAt: z.string(),
		seller: z.string(),
		highlight: z.boolean(),
		free_shipping_prime: z.boolean(),
		coupon: z.string().nullable().optional(),
		hidePrice: z.boolean(),
		extraInfo: z.unknown(),
		shipping: z.unknown(),
		installment: z.unknown(),
		updatedAt_timestamp: z.unknown(),
		updatedAt_unixTimestamp: z.number(),
		initial_link: z.unknown(),
	});

	ProductSchema = z.object({
		id: z.number(),
		attributes: this.ProductAttributesSchema,
	});

	ProductsSchema = z.array(this.ProductSchema);

	ProductsResponseSchema = z.object({
		data: this.ProductsSchema,
		meta: z.unknown(),
	});

	product(product: unknown) {
		const validatedProduct = this.ProductSchema.parse(product);

		return validatedProduct;
	}

	productsResponse(products: unknown[]) {
		const validatedProductsResponse =
			this.ProductsResponseSchema.parse(products);

		return validatedProductsResponse;
	}
}

export const zodProductsValidator = new ZodProductsValidator();
