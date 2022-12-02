const express = require("express");
const serverless = require("serverless-http");
const Pet = require("./routes/Pet");
const Store = require("./routes/Store");

const app = express();

// Middlewares
app.use(express.json());

// Routes
app.use("/pet", Pet);
app.use("/store", Store);

// Default route
app.use((req, res, next) => {
	return res.status(404).json({
		error: "Route not found",
		route: req.url,
	});
});

/* Global Error handler middleware */
app.use((err, req, res, next) => {
	const statusCode = err.statusCode || 500;
	console.error(err.message, err.stack);
	res.status(statusCode).json({ message: err.message });
	return;
});

module.exports.handler = serverless(app, {
	request: (req, event, context) => {
		req.event = event;
		req.context = context;
	},
});
