import dotenv from "dotenv";
import { z } from "zod";
import type { EnvValues, NodeEnvs } from "./appEnv.types";

class AppEnv {
	validatedEnv: EnvValues;

	// biome-ignore lint/suspicious/noExplicitAny: <In this case any is acceptable because the value will be validated inseide the class methods>
	constructor(private env: any) {
		this.validatedEnv = Object.freeze({
			APP_PORT: this.#numericStringValidation(this.env.APP_PORT),
			COUPONS_TTL: this.#numericStringValidation(this.env.COUPONS_TTL),
			PRODUCTS_TTL: this.#numericStringValidation(this.env.PRODUCTS_TTL),
			NODE_ENV: this.#nodeEnvValidation(this.env.NODE_ENV),
		});
	}

	#stringValidation(envVar: unknown): string {
		const schema = z.string().min(1);
		const validStringVar = schema.parse(envVar);

		return validStringVar;
	}

	#numericStringValidation(envVar: unknown): number {
		const notNumericStringErrorMessage =
			"Must be a numeric string (only contain 0-9 digits)";
		const schema = z.string().regex(/^[0-9]+$/, notNumericStringErrorMessage);
		const validNumericStringVar = schema.parse(envVar);

		return Number(validNumericStringVar);
	}

	#nodeEnvValidation(nodeEnv: unknown): NodeEnvs {
		const schema = z.enum(["development", "production", "test"]);
		const validNodeEnv = schema.parse(nodeEnv);

		return validNodeEnv;
	}
}
const env = dotenv.config().parsed;
export const appEnv = new AppEnv(env).validatedEnv;
