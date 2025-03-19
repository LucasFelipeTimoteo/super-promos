import { z } from "zod";

class ZodCouponsValidator {
	couponAttributesSchema = z.object({
		updatedAt: z.string().datetime(),
		seller: z.string(),
		code: z.string(),
		discount: z.string(),
		title: z.string(),
		description: z.string().nullable(),
		link: z.string().nullable(),
		featured: z.boolean(),
		createdAt: z.string().datetime(),
		discount_type: z.string().nullable(),
	});

	couponSchema = z.object({
		id: z.number(),
		attributes: this.couponAttributesSchema,
	});

	couponsSchema = z.array(this.couponSchema);

	couponsResponseSchema = z.object({
		data: this.couponsSchema,
		meta: z.unknown(),
	});

	couponsResponse(coupons: unknown) {
		const validCouponsResponse = this.couponsResponseSchema.parse(coupons);

		return validCouponsResponse;
	}
}

export const zodCouponsValidator = new ZodCouponsValidator();
