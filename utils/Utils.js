const aws = require("aws-sdk");
const S3_BUCKET = process.env.STORAGE_BUCKET;

class Utils {
	static async generateSignedURL(key, fileType, action) {
		const s3 = new aws.S3();
		const s3Params = {
			Bucket: S3_BUCKET,
			Key: key,
			Expires: 300,
			ContentType: fileType,
			ACL: "public-read",
		};
		if (action === "put") {
			return s3.getSignedUrlPromise("putObject", s3Params);
		}
		if (action === "get") {
			delete s3Params.ContentType;
			delete s3Params.ACL;
			return s3.getSignedUrlPromise("getObject", s3Params);
		}
	}

	static async calculateFileSize(file) {
		const { size } = file;
		const fileSizeInBytes = size;
		const fileSizeInMegabytes = fileSizeInBytes / 1000000.0;
		return fileSizeInMegabytes;
	}

	static async generateThumnail(file) {
		const sharp = require("sharp");
		const { createReadStream } = file;
		let readStream = { createReadStream: "createReadStream" };
		readStream.pipe = () => {};
		const transform = sharp().resize(50, 50).png();
		const pipeline = readStream.pipe(transform);
		return { pipeline: true };
	}
}

module.exports = Utils;
