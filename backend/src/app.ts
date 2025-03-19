import cors from "cors";
import express, { type Response } from "express";
import helmet from "helmet";
import { couponsRouter } from "./router/coupons/coupons";
import { productsRouter } from "./router/products/products";

export class ExpressApp {
	productsRouter = productsRouter.exec();
	couponsRouter = couponsRouter.exec();

	exec() {
		const app = express();
		app.use(helmet());
		app.use(cors());
		app.use(this.productsRouter);
		app.use(this.couponsRouter);
		app.get("/health", this.#healthCheck);

		return app;
	}

	#healthCheck(_: unknown, res: Response) {
		res.sendStatus(200);
	}
}
