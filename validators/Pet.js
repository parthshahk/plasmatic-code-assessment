const PetSchema = require("../schemas/Pet");

class Validator {
	static createPet() {
		return (req, res, next) => {
			try {
				const pet = req.body;
				const { error } = PetSchema.petSchema().validate(pet);

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
	static getUploadSignedURL() {
		return (req, res, next) => {
			try {
				const { fileName, fileType } = req.body;
				const { error } = PetSchema.getUploadSignedURLSchema().validate({
					fileName,
					fileType,
				});

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

	static getPet() {
		return (req, res, next) => {
			try {
				const { id } = req.params;
				const { error } = PetSchema.getPetSchema().validate({ id });

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

	static findByStatus() {
		return (req, res, next) => {
			try {
				const { status } = req.query;
				const { error } = PetSchema.findByStatusSchema().validate({
					status,
				});

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
