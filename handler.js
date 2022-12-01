const AWS = require("aws-sdk");
const express = require("express");
const serverless = require("serverless-http");

const app = express();

const USERS_TABLE = process.env.USERS_TABLE;
const dynamoDbClient = new AWS.DynamoDB.DocumentClient();

app.use(express.json());

app.get("/users/:userId", async function (req, res) {
	const params = {
		TableName: USERS_TABLE,
		Key: {
			userId: req.params.userId,
		},
	};

	try {
		const { Item } = await dynamoDbClient.get(params).promise();
		if (Item) {
			const { userId, name } = Item;
			console.log("Item", Item);
			res.json({ userId, name });
		} else {
			res.status(404).json({ error: 'Could not find user with provided "userId"' });
		}
	} catch (error) {
		console.log(error);
		res.status(500).json({ error: "Could not retreive user" });
	}
});

app.get("/users", async function (req, res) {
	const { userId, name } = req.body;

	try {
		res.json({ userId, name, url: req.url, iteration: 1 });
	} catch (error) {
		console.log(error);
		res.status(500).json({ error: "Could not create user" });
	}
});

app.use((req, res, next) => {
	return res.status(404).json({
		error: "Not Found",
	});
});

module.exports.handler = serverless(app);