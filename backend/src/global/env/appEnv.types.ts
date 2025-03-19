export type EnvValues = {
	APP_PORT: number;
	NODE_ENV: NodeEnvs;
	COUPONS_TTL: number;
	PRODUCTS_TTL: number;
};

export type NodeEnvs = "production" | "development" | "test";
export type AppMachineType = "docker" | "local_machine";
