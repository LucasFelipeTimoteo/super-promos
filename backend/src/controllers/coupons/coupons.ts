import type { Request, Response } from "express";
import NodeCache from "node-cache";
import { appEnv } from "../../global/env/appEnv";
import { logger } from "../../global/logger/pino/pinoLogger";
import { apis } from "../../services/http/apis/apis";

class CouponsController {
	cache: NodeCache;

	constructor() {
		this.cache = new NodeCache({ stdTTL: appEnv.COUPONS_TTL });
	}

	async getCoupons(req: Request, res: Response) {
		const { start, limit, featured } = req.query;
		const cacheKeyname = `products?featured=${featured}&start=${start}&limit=${limit}`;

		if (!this.cache.has(cacheKeyname)) {
			logger.debug(
				`Cache not found, getting ${limit} coupons from api with offset: ${start}`,
			);

			const couponsFromApi = await apis.getCoupons(
				start as string | undefined,
				limit as string | undefined,
				featured as boolean | undefined,
			);

			this.cache.set(cacheKeyname, couponsFromApi);

			return res.status(200).json(couponsFromApi);
		}

		const couponsFromCache = this.cache.get(cacheKeyname);
		if (couponsFromCache === undefined) {
			throw new Error(
				`Unexpected server error. [couponsFromCache] should not be undefined at this point, but received: ${couponsFromCache}`,
			);
		}

		return res.status(200).json(couponsFromCache);
	}
}

export const couponsController = new CouponsController();
