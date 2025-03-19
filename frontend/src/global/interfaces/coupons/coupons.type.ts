import type { z } from "zod";
import { zodCouponsValidator } from "../../validators/zod/coupons/couponsValidator";

export type couponAttributes = z.infer<
	typeof zodCouponsValidator.couponAttributesSchema
>;
export type Coupon = z.infer<typeof zodCouponsValidator.couponSchema>;
export type Coupons = z.infer<typeof zodCouponsValidator.couponsSchema>;
export type CouponsResponse = z.infer<
	typeof zodCouponsValidator.couponsResponseSchema
>;
