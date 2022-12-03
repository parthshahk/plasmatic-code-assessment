const AWS = require("aws-sdk");
const dynamoDb = new AWS.DynamoDB.DocumentClient();
const { v4: uuidv4 } = require("uuid");

class Store {
	static async order(order) {
		try {
			// check if order.petid exists in pet table
			const pet = order.petId;

			const params = {
				TableName: process.env.PET_TABLE,
				Key: {
					id: pet,
				},
			};
			const result = await dynamoDb.get(params).promise();

			if (!result.Item) {
				throw new Error("Pet not found");
			}

			const paramsOrder = {
				TableName: process.env.ORDER_TABLE,
				Item: {
					id: uuidv4(),
					...order,
				},
			};
			await dynamoDb.put(paramsOrder).promise();
			return params.Item.id;
		} catch (error) {
			throw new Error(error);
		}
	}

	static async getOrder(orderId) {
		try {
			const params = {
				TableName: process.env.ORDER_TABLE,
				Key: {
					id: orderId,
				},
			};
			const result = await dynamoDb.get(params).promise();
			return result.Item;
		} catch (error) {
			throw new Error(error);
		}
	}

	static async deleteOrder(orderId) {
		try {
			const params = {
				TableName: process.env.ORDER_TABLE,
				Key: {
					id: orderId,
				},
			};
			await dynamoDb.delete(params).promise();
		} catch (error) {
			throw new Error(error);
		}
	}
}

module.exports = Store;
