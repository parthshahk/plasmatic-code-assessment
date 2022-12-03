const StoreSchema = require("../schemas/Store");

class Validator {
	static order() {
		return (req, res, next) => {
			try {
				const order = req.body;
				const { error } = StoreSchema.order().validate(order);

				if (error) {
					throw new Error(error);
				}

				next();
			} catch (error) {
				res.status(400).json({
					status: "fail",
					message: "Validation Error",
					errors: error.message,
				});
			}
		};
	}

	static getOrder() {
		return (req, res, next) => {
			try {
				const { error } = StoreSchema.getOrder().validate(req.params);

				if (error) {
					throw new Error(error);
				}

				next();
			} catch (error) {
				res.status(400).json({
					status: "fail",
					message: "Validation Error",
					errors: error.message,
				});
			}
		};
	}
}

module.exports = Validator;
