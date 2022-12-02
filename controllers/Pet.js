const Model = require("../models/Pet");

// Pet Controller
class PetController {
	static async create(req, res) {
		try {
			const pet = req.body;
			const petId = await Model.create(pet);

			res.status(201).json({
				status: "success",
				message: "Pet created successfully",
				data: {
					petId,
				},
			});
		} catch (error) {
			// Catch any errors
			res.status(400).json({
				status: "fail",
				message: "Something went wrong",
				errors: error.message,
			});
		}
	}
}

module.exports = PetController;
