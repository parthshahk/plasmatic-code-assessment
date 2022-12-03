const Model = require("../models/Pet");
const { v4: uuidv4 } = require("uuid");
const log = require("lambda-log");
const Utils = require("../utils/Utils");

log.options.meta = {
	context: "PetController",
};

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
			log.error(error);
			res.status(400).json({
				status: "fail",
				message: "Something went wrong",
				errors: error.message,
			});
		}
	}

	static async getUploadSignedURL(req, res) {
		try {
			const { fileName, fileType } = req.body;

			// Generate a unique key for the file
			const key = `images/${uuidv4()}-${fileName}`;

			// Get signed url
			const signedURL = await Utils.generateSignedURL(key, fileType, "put");

			res.status(201).json({
				status: "success",
				message: "Pet created successfully",
				data: {
					signedURL,
					key,
				},
			});
		} catch (error) {
			// Catch any errors
			log.error(error);
			res.status(400).json({
				status: "fail",
				message: "Something went wrong",
				errors: error.message,
			});
		}
	}

	static async get(req, res) {
		try {
			const { id } = req.params;

			const pet = await Model.get(id);

			// Populate photoUrls with signed urls
			// Generate signed urls for read
			const signedURLs = await Promise.all(
				// Map over the photoKeys array
				pet.photoKeys.map(async (photoUrl) => {
					const signedURL = await Utils.generateSignedURL(photoUrl, null, "get");

					return signedURL;
				})
			);

			pet.photoUrls = signedURLs;

			res.status(200).json({
				status: "success",
				message: "Pet retrieved successfully",
				data: {
					pet,
				},
			});
		} catch (error) {
			// Catch any errors
			log.error(error);
			res.status(400).json({
				status: "fail",
				message: "Something went wrong",
				errors: error.message,
			});
		}
	}

	static async update(req, res) {
		try {
			const pet = req.body;
			const { id } = req.params;
			await Model.update(id, pet);

			res.status(201).json({
				status: "success",
				message: "Pet updated successfully",
			});
		} catch (error) {
			// Catch any errors
			log.error(error);
			res.status(400).json({
				status: "fail",
				message: "Something went wrong",
				errors: error.message,
			});
		}
	}

	static async delete(req, res) {
		try {
			const { id } = req.params;

			await Model.delete(id);

			res.status(200).json({
				status: "success",
				message: "Pet deleted successfully",
			});
		} catch (error) {
			// Catch any errors
			log.error(error);
			res.status(400).json({
				status: "fail",
				message: "Something went wrong",
				errors: error.message,
			});
		}
	}

	static async findByStatus(req, res) {
		try {
			const { status } = req.query;

			const pets = await Model.findByStatus(status);

			// Populate photoUrls with signed urls
			await Promise.all(
				// Map over the pets array
				pets.map(async (pet) => {
					// Generate signed urls for read
					const signedURLs = await Promise.all(
						// Map over the photoKeys array
						pet.photoKeys.map(async (photoUrl) => {
							const signedURL = await Utils.generateSignedURL(photoUrl, null, "get");

							return signedURL;
						})
					);

					pet.photoUrls = signedURLs;

					return pet;
				})
			);

			res.status(200).json({
				status: "success",
				message: "Pets retrieved successfully",
				data: {
					pets,
				},
			});
		} catch (error) {
			// Catch any errors
			log.error(error);
			res.status(400).json({
				status: "fail",
				message: "Something went wrong",
				errors: error.message,
			});
		}
	}
}

module.exports = PetController;
