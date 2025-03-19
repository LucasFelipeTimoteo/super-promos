import pino from "pino";
import { appEnv } from "../../env/appEnv";

class PinoLogger {
	#isDevelopment = appEnv.NODE_ENV === "development";
	#isTest = process.env.NODE_ENV === "test" || appEnv.NODE_ENV === "test";

	#logger = pino({
		level: this.#isTest ? "silent" : this.#isDevelopment ? "debug" : "info",

		...(this.#isDevelopment && { transport: { target: "pino-pretty" } }),
	});

	debug(msg: unknown) {
		this.#logger.debug(msg);
	}
	info(msg: unknown) {
		this.#logger.info(msg);
	}
	warn(msg: unknown) {
		this.#logger.warn(msg);
	}
	error(msg: unknown) {
		this.#logger.error(msg);
	}
	fatal(msg: unknown) {
		this.#logger.fatal(msg);
	}
}

export const logger = new PinoLogger();
