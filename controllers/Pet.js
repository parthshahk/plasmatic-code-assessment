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
}

module.exports = PetController;
