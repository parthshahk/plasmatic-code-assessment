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

	static async get(id) {
		try {
			const params = {
				TableName: process.env.PET_TABLE,
				Key: {
					id,
				},
			};
			const result = await dynamoDb.get(params).promise();

			// populate category by category id
			const categoryParams = {
				TableName: process.env.PET_CATEGORY_TABLE,
				Key: {
					id: result.Item.category,
				},
			};
			const categoryResult = await dynamoDb.get(categoryParams).promise();
			result.Item.category = categoryResult.Item;
			return result.Item;
		} catch (error) {
			throw new Error(error);
		}
	}

	static async update(id, pet) {
		try {
			const params = {
				TableName: process.env.PET_TABLE,
				Key: {
					id,
				},
				UpdateExpression: "set #name = :name, #category = :category, #tags = :tags, #status = :status, #photoKeys = :photoKeys",
				ExpressionAttributeNames: {
					"#name": "name",
					"#category": "category",
					"#tags": "tags",
					"#status": "status",
					"#photoKeys": "photoKeys",
				},
				ExpressionAttributeValues: {
					":name": pet.name,
					":category": pet.category,
					":tags": pet.tags,
					":status": pet.status,
					":photoKeys": pet.photoKeys,
				},
			};
			await dynamoDb.update(params).promise();
			return id;
		} catch (error) {
			throw new Error(error);
		}
	}

	static async delete(id) {
		try {
			const params = {
				TableName: process.env.PET_TABLE,
				Key: {
					id,
				},
			};
			await dynamoDb.delete(params).promise();
			return id;
		} catch (error) {
			throw new Error(error);
		}
	}

	static async findByStatus(status) {
		try {
			const params = {
				TableName: process.env.PET_TABLE,
				FilterExpression: "#status = :status",
				ExpressionAttributeValues: {
					":status": status,
				},
				ExpressionAttributeNames: {
					"#status": "status",
				},
			};
			const result = await dynamoDb.scan(params).promise();

			// populate category by category id for each pet
			for (let i = 0; i < result.Items.length; i++) {
				const categoryParams = {
					TableName: process.env.PET_CATEGORY_TABLE,
					Key: {
						id: result.Items[i].category,
					},
				};
				const categoryResult = await dynamoDb.get(categoryParams).promise();
				result.Items[i].category = categoryResult.Item;
			}

			return result.Items;
		} catch (error) {
			throw new Error(error);
		}
	}
}

module.exports = Pet;
