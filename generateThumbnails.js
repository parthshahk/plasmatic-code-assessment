const log = require("lambda-log");
const AWS = require("aws-sdk");
const s3 = new AWS.S3();

module.exports = async (event, context) => {
	const body = JSON.parse(event.Records[0].body);

	const Key = body.Records[0].s3.object.key;
	const Bucket = body.Records[0].s3.bucket.name;
	const downloadParams = {
		Bucket,
		Key,
	};
	const downloadPromise = s3.getObject(downloadParams).promise();
	const downloadResult = await downloadPromise;
	const image = downloadResult.Body;
	// const resizedImage = await sharp(image).resize(100, 100).toBuffer();
	const uploadParams = {
		Bucket,
		Key: Key.replace("images", "thumbnails"),
		Body: image,
	};
	const uploadPromise = s3.putObject(uploadParams).promise();
	const uploadResult = await uploadPromise;
	log.info("Upload result", uploadResult);
	return {
		statusCode: 200,
		body: JSON.stringify({
			message: "Thumbnail Generated",
		}),
	};
};
