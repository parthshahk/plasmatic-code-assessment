const joi = require("joi");

class Store {
	static order() {
		return joi.object({
			order: joi
				.object({
					quantity: joi.number().required(),
					shipDate: joi.string().required(),
					status: joi.string().required(),
					complete: joi.boolean().required(),
				})
				.required(),
		});
	}
}

module.exports = Store;
