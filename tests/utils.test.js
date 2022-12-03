const Utils = require("../utils/Utils");

describe("Utils", () => {
	test("calculate file size", async () => {
		const file = {
			size: 1000000,
		};
		const fileSize = await Utils.calculateFileSize(file);
		expect(fileSize).toEqual(1);
	});

	test("generate thumbnail", async () => {
		const file = {
			createReadStream: jest.fn(),
		};
		const thumbnail = await Utils.generateThumnail(file);
		expect(thumbnail).toBeDefined();
	});
});
