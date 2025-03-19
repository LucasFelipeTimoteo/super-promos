import { ExpressApp } from "./app";
import { appEnv } from "./global/env/appEnv";
import { logger } from "./global/logger/pino/pinoLogger";
const app = new ExpressApp().exec();

app.listen(appEnv.APP_PORT, () =>
	logger.info(`Running server on port: ${appEnv.APP_PORT}`),
);
