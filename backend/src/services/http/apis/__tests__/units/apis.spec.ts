import productsFixture from "../../../../../global/fixtures/rawProducts.json";
import { apis } from "../../apis";
jest.mock("../../apis");

const mockedApis = jest.mocked(apis);

mockedApis.getProducts.mockResolvedValue(productsFixture);

describe("getProducts", () => {
	// HAPPY PATH
	it("Should return a list of products (mocked)", async () => {
		const products = await apis.getProducts();

		expect(products).toStrictEqual(productsFixture);
	});
});
