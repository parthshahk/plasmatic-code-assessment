const AWS = require("aws-sdk");
const dynamoDb = new AWS.DynamoDB.DocumentClient();
const { v4: uuidv4 } = require("uuid");

class Store {
	static async order(order) {
		try {
			const params = {
				TableName: process.env.ORDER_TABLE,
				Item: {
					id: uuidv4(),
					...order,
				},
			};
			await dynamoDb.put(params).promise();
			return params.Item.id;
		} catch (error) {
			throw new Error(error);
		}
	}
}

module.exports = Store;
