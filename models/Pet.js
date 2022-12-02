const AWS = require("aws-sdk");
const dynamoDb = new AWS.DynamoDB.DocumentClient();
const { v4: uuidv4 } = require("uuid");

class Pet {
	static async create(pet) {
		try {
			const params = {
				TableName: process.env.PET_TABLE,
				Item: {
					id: uuidv4(),
					...pet,
				},
			};
			await dynamoDb.put(params).promise();
			return params.Item.id;
		} catch (error) {
			throw new Error(error);
		}
	}
}

module.exports = Pet;
