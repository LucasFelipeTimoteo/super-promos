import type { z } from "zod";
import type { zodCouponsValidator } from "../../../validators/zod/coupons/couponsValidator";

export type couponAttributes = z.infer<
	typeof zodCouponsValidator.couponAttributesSchema
>;
export type coupon = z.infer<typeof zodCouponsValidator.couponSchema>;
export type coupons = z.infer<typeof zodCouponsValidator.couponsSchema>;
export type couponsResponse = z.infer<
	typeof zodCouponsValidator.couponsResponseSchema
>;
