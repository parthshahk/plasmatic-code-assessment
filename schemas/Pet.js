const joi = require("joi");

class Pet {
	static petSchema() {
		return joi.object({
			category: joi.string().required(),
			name: joi.string().required(),
			photoKeys: joi.array().items(joi.string()).required(),
			tags: joi
				.array()
				.items(
					joi.object({
						id: joi.number().required(),
						name: joi.string().required(),
					})
				)
				.required(),
			status: joi.string().required(),
		});
	}

	static getUploadSignedURLSchema() {
		return joi.object({
			fileName: joi.string().required(),
			fileType: joi.string().required(),
		});
	}
}

module.exports = Pet;
