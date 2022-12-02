const Model = require("../models/Pet");
const AWS = require("aws-sdk");
const { v4: uuidv4 } = require("uuid");
const S3_BUCKET = process.env.STORAGE_BUCKET;

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

	static async getUploadSignedURL(req, res) {
		try {
			const { fileName, fileType } = req.body;

			const s3 = new AWS.S3();

			const key = `images/${uuidv4()}-${fileName}`;

			const s3Params = {
				Bucket: S3_BUCKET,
				Key: key,
				Expires: 300,
				ContentType: fileType,
				ACL: "public-read",
			};

			const signedURL = await s3.getSignedUrlPromise("putObject", s3Params);

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
			const s3 = new AWS.S3();

			const signedURLs = await Promise.all(
				pet.photoKeys.map(async (photoUrl) => {
					const s3Params = {
						Bucket: S3_BUCKET,
						Key: photoUrl,
						Expires: 300,
					};

					const signedURL = await s3.getSignedUrlPromise("getObject", s3Params);

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
			const petId = await Model.update(id, pet);

			res.status(201).json({
				status: "success",
				message: "Pet updated successfully",
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

	static async delete(req, res) {
		try {
			const { id } = req.params;

			const pet = await Model.delete(id);

			res.status(200).json({
				status: "success",
				message: "Pet deleted successfully",
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

	static async findByStatus(req, res) {
		try {
			const { status } = req.query;

			const pets = await Model.findByStatus(status);

			// Populate photoUrls with signed urls

			const s3 = new AWS.S3();

			await Promise.all(
				pets.map(async (pet) => {
					const signedURLs = await Promise.all(
						pet.photoKeys.map(async (photoUrl) => {
							const s3Params = {
								Bucket: S3_BUCKET,
								Key: photoUrl,
								Expires: 300,
							};

							const signedURL = await s3.getSignedUrlPromise("getObject", s3Params);

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
			res.status(400).json({
				status: "fail",
				message: "Something went wrong",
				errors: error.message,
			});
		}
	}
}

module.exports = PetController;
